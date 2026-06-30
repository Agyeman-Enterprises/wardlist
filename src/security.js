// ─── SECURITY ENGINE FOR CLINICAL DATA (PHI) ──────────────────────────────
// Uses Web Crypto API (AES-GCM 256 + PBKDF2) to encrypt/decrypt local data.

const SALT_KEY = "wl_secure_salt";
const PIN_HASH_KEY = "wl_secure_pin_hash";

// Get or create a cryptographic salt
function getSalt() {
  let saltStr = localStorage.getItem(SALT_KEY);
  if (!saltStr) {
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    saltStr = b64Encode(salt);
    localStorage.setItem(SALT_KEY, saltStr);
  }
  return b64Decode(saltStr);
}

// Convert ArrayBuffer/Uint8Array to Base64
function b64Encode(buf) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(buf)));
}

// Convert Base64 to Uint8Array
function b64Decode(str) {
  return new Uint8Array(
    atob(str)
      .split("")
      .map((c) => c.charCodeAt(0))
  );
}

// Derive a CryptoKey from a PIN using PBKDF2
async function deriveKey(pin, salt) {
  const enc = new TextEncoder();
  const baseKey = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(pin),
    { name: "PBKDF2" },
    false,
    ["deriveKey", "deriveBits"]
  );

  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

// Check if a PIN is already set
export function isPinSet() {
  return !!localStorage.getItem(PIN_HASH_KEY);
}

// Set a new PIN and save its hash (for quick verification)
export async function setPin(pin) {
  const enc = new TextEncoder();
  const hashBuf = await window.crypto.subtle.digest("SHA-256", enc.encode(pin));
  localStorage.setItem(PIN_HASH_KEY, b64Encode(hashBuf));
}

// Verify if the PIN matches the saved hash
export async function verifyPin(pin) {
  if (!isPinSet()) return false;
  const enc = new TextEncoder();
  const hashBuf = await window.crypto.subtle.digest("SHA-256", enc.encode(pin));
  const currentHash = localStorage.getItem(PIN_HASH_KEY);
  return b64Encode(hashBuf) === currentHash;
}

// Encrypt plaintext string using the PIN
export async function encryptData(plaintext, pin) {
  try {
    const salt = getSalt();
    const key = await deriveKey(pin, salt);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const enc = new TextEncoder();
    const ciphertextBuf = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv },
      key,
      enc.encode(plaintext)
    );

    // Combine IV and ciphertext into one payload
    const payload = new Uint8Array(iv.length + ciphertextBuf.byteLength);
    payload.set(iv, 0);
    payload.set(new Uint8Array(ciphertextBuf), iv.length);

    return b64Encode(payload);
  } catch (e) {
    console.error("Encryption failed:", e);
    throw new Error("Encryption failed. Verify PIN.");
  }
}

// Decrypt ciphertext string using the PIN
export async function decryptData(ciphertextBase64, pin) {
  try {
    const salt = getSalt();
    const key = await deriveKey(pin, salt);
    const payload = b64Decode(ciphertextBase64);

    // Split IV and ciphertext
    const iv = payload.slice(0, 12);
    const ciphertext = payload.slice(12);

    const decryptedBuf = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv },
      key,
      ciphertext
    );

    const dec = new TextDecoder();
    return dec.decode(decryptedBuf);
  } catch (e) {
    console.error("Decryption failed:", e);
    throw new Error("Decryption failed. Incorrect PIN or corrupted data.");
  }
}

// Clear all local data (Panic / Self-Wipe)
export function wipeAllData() {
  localStorage.removeItem(SALT_KEY);
  localStorage.removeItem(PIN_HASH_KEY);
  localStorage.removeItem("wl_encrypted_patients");
  sessionStorage.clear();
}
