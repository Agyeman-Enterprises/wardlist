# WardList — Design Aesthetic & System

**Applied to:** WardList — GMH Hospitalist Daily Rounds Tool  
**Date:** 2026-06-30  
**Design Philosophy:** *"Clinical clarity. Zero decoration. Every pixel earns its place."*

---

## 1. Design Pillars

| Pillar | Meaning |
|--------|---------|
| **Legible** | High contrast, generous type sizing, no eye strain. Physicians read these cards at a glance, often one-handed, mid-rounds. |
| **Calm** | Muted, warm-neutral backgrounds. Nothing shouts. The data is already stressful — the chrome shouldn't be. |
| **Dense but Scannable** | 82 fields per patient. Visual hierarchy must let the eye jump to the right section instantly. |
| **Print-native** | Screen and paper are equal citizens. No print-only hacks — the card should read as well on a clipboard as on a phone. |
| **Professional, Not Corporate** | Feels like a well-designed medical chart, not a SaaS dashboard. No gradients, no drop shadows everywhere, no "delight" animations. |

---

## 2. Color System

Move away from the default Tailwind blue/slate toward a **warm-clinical** palette.
The core insight: **blue signals technology; warm-neutral signals medicine.**

### 2.1 Palette Tokens

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOKEN           HEX         TAILWIND MAP      USAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Page BG         #F5F3EF     warm-stone-50     App shell background
Card BG         #FEFDFB     white-warm        Patient cards
Surface BG      #FAF8F5     stone-50          Modals, sections
Border          #E7E3DC     stone-200         Card borders, dividers
Border Strong   #D4CFC6     stone-300         Focus rings, active
Text Primary    #1E1B18     stone-900         All body text, labels
Text Secondary  #6B6560     stone-500         Placeholders, hints
Text Muted      #9D9790     stone-400         Disabled, dim fields
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 2.2 Accent Colors (minimal, purposeful)

| Role | Color | Token | Usage |
|------|-------|-------|-------|
| **Primary action** | `#0D554A` | deep-teal-900 | Save, primary buttons, active tab |
| **Primary hover** | `#0A3F37` | deeper-teal | Button hover state |
| **Info / AI features** | `#5B4F8B` | muted-violet-700 | Dictate button, Scan Census |
| **Info hover** | `#443A6B` | muted-violet-800 | Hover states |
| **Orders / CareVue** | `#2D6A4F` | forest-700 | Scan Orders button, teal sections |
| **Orders hover** | `#1E4D38` | forest-800 | Hover states |
| **Danger / delete** | `#B91C1C` | red-700 | Remove, Delete |
| **Danger hover** | `#991B1B` | red-800 | Hover states |
| **Success** | `#166534` | green-800 | Save confirmation |
| **Warning** | `#92400E` | amber-800 | Connection errors |

### 2.3 Checkbox States (replace amber/emerald with warmer, more clinical tones)

```
Current → Proposed:

State 0 (blank)  : slate-100/400  → stone-100 / stone-400     (warm gray)
State 1 (Ordered): amber-100/700  → warm-clay-100 / clay-700  (#FEF3C7 → #D97706, softer amber)
State 2 (Done)   : emerald-100/700 → sage-100 / sage-700      (#DCFCE7 → #15803D, muted green)
```

### 2.4 Section Header Color Coding (keep but warm up)

```
Patient Info     → blue-100/700    → warm-indigo-50 / warm-indigo-700  (#EEF2FF → #4338CA)
History          → blue-100/700    → warm-indigo-50 / warm-indigo-700
Diet / Orders    → blue-100/700    → sky-50 / sky-700                  (#F0F9FF → #0369A1)
Assessment       → blue-100/700    → sky-50 / sky-700
Pending          → amber-100/700   → amber-50 / amber-700             (#FFFBEB → #B45309)
Prophylaxis      → orange-100/700  → warm-clay-50 / clay-700          (#FFF7ED → #C2410C)
Consults         → indigo-100/700  → indigo-50 / indigo-700           (#EEF2FF → #4338CA)
Discharge        → emerald-100/700 → sage-50 / sage-700              (#F0FDF4 → #15803D)
Nursing          → rose-100/700    → rose-50 / rose-700               (#FFF1F2 → #BE123C)
```

---

## 3. Typography

### 3.1 Font Stack

```
Primary:   'Inter', system-ui, -apple-system, sans-serif
Monospace: 'JetBrains Mono', 'Fira Code', monospace  (for MRN, dates, vitals)
```

**Rationale:** Inter is excellent at small sizes (patient cards are dense) and has a neutral, clinical voice. Monospace for MRNs and vitals improves scannability of tabular data.

### 3.2 Type Scale

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `text-2xs` | 10px | 600 | Section headers, label badges, overline |
| `text-xs` | 12px | 500 | Field labels, checkbox labels, secondary text |
| `text-sm` | 14px | 400/500 | Body text, textareas, saved-record summaries |
| `text-base` | 16px | 600 | Patient card name, modal title, tab labels |
| `text-lg` | 18px | 700 | App title (WardList) |
| `text-xl` | 20px | 700 | Modal headings (sparingly) |

### 3.3 Label Convention

Field labels use `text-2xs font-semibold uppercase tracking-[0.12em]`.  
Current uses `tracking-widest` which is too wide — pull back for better readability.

---

## 4. Spacing & Layout

### 4.1 Grid System

Patient cards use a 2-column grid. Current gutters are adequate. Refine:

```
Column gap:  gap-x-4  (16px) — keep
Row gap:     gap-y-3  (12px)  — keep
Card padding: p-5 (20px)      — reduce to p-4 (16px) for tighter density
Section gap:  mt-4 mb-2       — reduce to mt-3 mb-1.5
```

### 4.2 Whitespace Philosophy

**"Tight but not crowded."**  
- Between sections: 12px breathing room (a visible gut but not wasteful)
- Between related fields: 8px
- Between unrelated field groups (like two checkboxes): 2px
- Card-to-card spacing on screen: `mb-4` (16px)
- Card-to-card in print: 0 (handled by page-break)

### 4.3 Max Width

Main content area: `max-w-3xl` (768px) — appropriate for a phone-held-in-portrait or tablet. Keep.

---

## 5. Component Styling

### 5.1 Header Bar

```
Current:  bg-white border-b border-slate-200 shadow-sm
Proposed: bg-warm-white (#FEFDFB) border-b border-stone-200
          No shadow — the border alone is enough hierarchy.
          Slightly thinner: py-2 instead of py-3.
```

### 5.2 Tab Buttons

```
Current:  bg-blue-600 text-white  (active)
          text-slate-500          (inactive)
          
Proposed: bg-deep-teal-900 text-white  (active)  
          text-stone-500               (inactive)
          
Shape:    rounded-md (6px) instead of rounded-lg (8px) — less pill-like, more chart-like
```

### 5.3 Action Bar Buttons

```
Primary (Save, Scan):  bg-deep-teal-900 text-white  → hover: bg-deeper-teal
Ghost (Add Patient):   border-stone-300 text-stone-700  → hover: bg-stone-100
Danger (Remove):       text-red-600  → hover: text-red-800  (no bg, just type)
Print controls:        text-xs bg-stone-200 text-stone-700  (selected: bg-stone-700 text-white)

All: rounded-md, py-1.5 px-3, text-sm font-medium
     (Reduce border-radius globally from rounded-lg → rounded-md for a more clinical, less "web app" feel)
```

### 5.4 Patient Card

```
Current:  bg-white border border-slate-200 rounded-xl shadow-sm p-5
Proposed: bg-card-warm (#FEFDFB) border border-stone-200 rounded-lg shadow-none p-4
          
Key changes:
- Drop the shadow entirely        → cleaner, more like paper
- Slightly tighter padding (p-4)  → more fields visible
- rounded-lg instead of rounded-xl → sharper, more professional
- Off-white background (#FEFDFB)   → warmer than pure white, easier on eyes
```

### 5.5 Text Inputs & Textareas

```
Current:  bg-transparent border-b border-slate-300 focus:border-blue-600
Proposed: bg-transparent border-b border-stone-300 focus:border-deep-teal-700
          
Add:      placeholder:text-stone-400 (ensure placeholders are muted)
          Height on inputs: h-7 → h-8 (slightly taller tap target for mobile)
```

### 5.6 Section Headers

```
Current:  text-[10px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded
Proposed: text-2xs font-bold uppercase tracking-[0.12em] px-2 py-0.5 rounded-sm

          With subtle left-accent bar (2px width, matching section color)
          instead of just a pill. This creates vertical scanning rhythm.
          
Implementation:
  <div class="flex items-center gap-2 mt-3 mb-1.5">
    <div class="w-0.5 h-4 bg-deep-teal-700 rounded-full"></div>
    <span class="text-2xs font-bold uppercase tracking-[0.12em] text-stone-500">
      Patient Info
    </span>
    <div class="flex-1 h-px bg-stone-200"></div>
  </div>
```

### 5.7 Checkbox Pill Buttons

```
Current:  rounded-full, text-[10px] font-bold,
          state-based bg/text/border colors
          
Proposed: rounded-md (match app radius), text-2xs font-semibold,
          min-width: 60px (slightly wider for "Ordered"),
          
State 0: bg-stone-100 text-stone-400 border-stone-200
State 1: bg-amber-50 text-amber-700 border-amber-200   (warmer, softer)
State 2: bg-green-50 text-green-700 border-green-200   (muted, calm)
          
Add subtle transition: transition-all duration-150
```

### 5.8 Modals

```
Current:  bg-white rounded-2xl shadow-2xl, bg-black/60 backdrop
Proposed: bg-warm-white rounded-xl shadow-xl, bg-stone-900/50 backdrop

Key changes:
- rounded-xl instead of 2xl → less iOS, more clinical
- Darker backdrop (stone-900 vs black) → warmer, less harsh
- Remove shadow-2xl → shadow-xl is plenty
- Modal close button: text-stone-300 hover:text-stone-500 (subtler)
```

### 5.9 Saved Tab Rows

```
Current:  bg-white border border-slate-200 rounded-xl shadow-sm
Proposed: bg-card-warm border border-stone-200 rounded-lg shadow-none
          
Load button:  bg-deep-teal-900 text-white
Delete:       bg-red-50 text-red-600 → hover: bg-red-100
Confirm:      bg-red-600 text-white  → hover: bg-red-700
Cancel:       bg-stone-100 text-stone-600 → hover: bg-stone-200
```

### 5.10 Toast / Status Messages

```
Success:  bg-green-50 text-green-800 border-l-4 border-green-600
Error:    bg-red-50 text-red-800 border-l-4 border-red-600
Warning:  bg-amber-50 text-amber-800 border-l-4 border-amber-600
Info:     bg-sky-50 text-sky-800 border-l-4 border-sky-600

Use left-border accent instead of full background color.
This is more medical-chart-like and less banner-ad-like.
```

### 5.11 Dictation Modal States

```
Listening pulse: Use stone-700 instead of red-500 for the dot.
                 Red signals danger/error, not "active listening."
                 Proposed: bg-stone-50 border-stone-200 with stone-700 pulsing dot.

Processing:      Replace ⚙️ emoji with a simple CSS spinner in deep-teal.
                 Proposed: border-2 border-stone-200 border-t-deep-teal-700 rounded-full animate-spin

Done:            Green checkmark, emerald tones — keep, but mute the green.
```

---

## 6. Print Design

Print is a **first-class citizen** — rounds lists are printed and carried.

### 6.1 Print-specific Styles

```css
@media print {
  body {
    margin: 0.3in;           /* small margin for hole-punching */
    background: white;
    font-size: 10pt;          /* base size for 4/pg density */
  }
  
  .patient-card {
    border: 0.5pt solid #999 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    padding: 10pt !important;
    margin-bottom: 6pt !important;
    background: white !important;
  }
  
  /* Section headers in print should have visible left-accent bar */
  .section-accent {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
```

### 6.2 Print Density

Keep the 1/pg, 2/pg, 4/pg control. Add:
- **1/pg**: 12pt body, full textarea height → 1 patient per sheet
- **2/pg**: 10pt body, textareas at 60px → 2 patients per sheet
- **4/pg**: 8pt body, textareas at 36px → 4 patients per sheet (compact rounds list)

### 6.3 Print Header

Consider a small print-only header on page 1:
```
GMH Hospitalist — WardList Rounds     [Date]     Printed by [Name]
```

---

## 7. Iconography

Move away from emoji toward consistent, semantic indicators:

| Current | Proposed | Rationale |
|---------|----------|-----------|
| `📷 Scan Census` | Camera icon + "Scan Census" | Consistent icon style |
| `+ Add Patient` | Plus icon | Keep — it's universal |
| `🖨 Print` | Printer icon | Keep |
| `🎙 Dictate` | Mic icon | Keep — recognizable |
| `🖥️ Scan Orders` | Monitor/camera icon | Keep |
| `✕` close | X icon | Keep |

**Recommendation:** If staying with emoji (acceptable for an internal tool), standardize them:
- Always at the start of the label
- Same size context
- No emoji in print view

If upgrading: use a lightweight icon set (Heroicons mini, 16px, via inline SVG or a small sprite).

---

## 8. Dark Mode (Future)

Not needed for v1 (hospital lighting is always bright, device screens are always on). But structure CSS custom properties so it's possible later:

```css
:root {
  --color-page: #F5F3EF;
  --color-card: #FEFDFB;
  --color-text: #1E1B18;
  /* ... */
}

/* Future: */
/* @media (prefers-color-scheme: dark) { ... } */
```

---

## 9. CSS Architecture

### 9.1 Custom Properties (add to `index.css`)

Replace the bare-minimum `index.css` with a design token layer:

```css
:root {
  /* ── Page ── */
  --color-page:       #F5F3EF;
  --color-card:       #FEFDFB;
  --color-surface:    #FAF8F5;
  
  /* ── Borders ── */
  --color-border:     #E7E3DC;
  --color-border-strong: #D4CFC6;
  
  /* ── Text ── */
  --color-text:       #1E1B18;
  --color-text-secondary: #6B6560;
  --color-text-muted: #9D9790;
  
  /* ── Accents ── */
  --color-primary:    #0D554A;
  --color-primary-hover: #0A3F37;
  --color-info:       #5B4F8B;
  --color-orders:     #2D6A4F;
  --color-danger:     #B91C1C;
  --color-success:    #166534;
  --color-warning:    #92400E;
  
  /* ── Radius ── */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  
  /* ── Type ── */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  /* ── Shadows (used sparingly) ── */
  --shadow-modal: 0 20px 60px rgba(0,0,0,0.12);
}
```

Then use these in Tailwind's `theme.extend` or via arbitrary values.

### 9.2 Tailwind Config Extension (`tailwind.config.js` — create if not present)

If adding Tailwind properly (currently just using classes inline without config), add:

```js
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'page': '#F5F3EF',
        'card': '#FEFDFB',
        'surface': '#FAF8F5',
        'deep-teal': {
          900: '#0D554A',
          800: '#0A3F37',
        },
        'clay': {
          50: '#FFF7ED',
          100: '#FEF3C7',
          700: '#C2410C',
        },
        'sage': {
          50: '#F0FDF4',
          100: '#DCFCE7',
          700: '#15803D',
        },
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '14px', letterSpacing: '0.04em' }],
      },
      borderRadius: {
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
      },
    },
  },
};
```

---

## 10. Visual Priority Map (Patient Card)

The eye should travel in this order when scanning a card:

```
1. Patient name + Room           (top-left, largest type, bold)
2. Section color bars            (vertical scanning — left-edge accent bars)
3. Checkbox statuses             (color-coded pills — Ordered/Done jump out)
4. Body fields                   (read on demand)
5. AI action buttons             (top-right, visible but not dominant)
```

Achieve this with:
- Name field gets `text-base font-bold` instead of the standard text-sm
- Room/MRN on same visual level as Dx → promote Name above them
- Section accent bars at left edge of each section (see 5.6)
- Checkbox pills get the strongest color contrast (amber/green on white)

---

## 11. Before/After Summary

| Element | Before | After |
|---------|--------|-------|
| **Page background** | `bg-slate-50` (#F8FAFC, cool gray) | `bg-[#F5F3EF]` (warm stone) |
| **Card background** | `bg-white` | `bg-[#FEFDFB]` (off-white, warm) |
| **Card shadow** | `shadow-sm` | none |
| **Card radius** | `rounded-xl` (12px) | `rounded-lg` (8px) |
| **Border color** | `border-slate-200` | `border-[#E7E3DC]` |
| **Primary CTA** | `bg-blue-600` | `bg-[#0D554A]` (deep teal) |
| **AI buttons** | `bg-violet-600` / `bg-teal-600` | muted violet / forest — softer |
| **Section headers** | colored pills | left-accent bar + muted label |
| **Checkbox pills** | `rounded-full`, bright amber/emerald | `rounded-md`, muted clay/sage |
| **Input underline** | `border-slate-300 focus:border-blue-600` | `border-[#D4CFC6] focus:border-[#0D554A]` |
| **Modals** | `rounded-2xl shadow-2xl bg-black/60` | `rounded-xl shadow-xl bg-stone-900/50` |
| **Toast messages** | full background color | left-border accent + muted bg |
| **Type** | all Inter | Inter + JetBrains Mono for MRN/vitals |

---

## 12. Implementation Priority

1. **Color palette** (replace all blue/slate → warm-neutral + deep-teal) — highest impact
2. **Remove card shadows** — instant "chart on paper" feel
3. **Section header redesign** (pills → accent bars) — improves scanning
4. **Checkbox states** (tone down the bright amber/emerald)
5. **Button radius reduction** (rounded-xl → rounded-md) — less toy-like
6. **CSS custom properties** — foundation for maintainability
7. **Toast restyle** (left-border accents)
8. **Monospace for MRN/vitals** — subtle, professional touch
9. **Print optimization** (margins, forced colors)
10. **Tailwind config** — if formalizing the utility approach

---

## 13. What Stays the Same

- 2-column grid layout (works)
- Overall card structure (all fields logically grouped)
- Print density controls (1/2/4 per page)
- Modal patterns (Scan, Dictate, Orders)
- Tab structure (Today's List / Saved)
- AI integration patterns
- PWA manifest colors (blue theme color is fine for OS chrome)
- Responsive breakpoints and mobile behavior
