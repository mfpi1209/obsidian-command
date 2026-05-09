# NOVA OS — Design System

> "A commercial operating system from the future."
> Reference for tokens, utilities and patterns defined in `src/styles.css`.
> **Rule #1:** never hard‑code colors / shadows / fonts in components — always go through tokens or utilities below.

---

## 1. Themes

Three themes are shipped. Switch by toggling a class on `<html>` (or any ancestor):

| Theme | Class | Mood |
|---|---|---|
| Dark (default) | *(none)* | Graphite + petrol, luminous blue |
| Light | `.light` | Porcelain Command — daylight, ink type |
| Carbon | `.carbon` | Tactical Terminal — neon lime, hot magenta |

All tokens below are redefined per theme. **Always reference the token, never the raw oklch value.**

---

## 2. Color tokens

Use as Tailwind classes (`bg-background`, `text-foreground`, `border-border`, …) or via `var(--token)` for arbitrary values.

### 2.1 Canvas & surfaces
| Token | Tailwind | Use |
|---|---|---|
| `--background` | `bg-background` | App canvas |
| `--foreground` | `text-foreground` | Primary text |
| `--surface` | `bg-surface` | Base panel |
| `--surface-raised` | `bg-surface-raised` | Cards, inputs, secondary buttons |
| `--surface-overlay` | `bg-surface-overlay` | Popovers, hovered panels |
| `--card` / `--card-foreground` | `bg-card` / `text-card-foreground` | Card |
| `--popover` / `--popover-foreground` | `bg-popover` / `text-popover-foreground` | Floating menus |

### 2.2 Brand & semantic
| Token | Tailwind | Use |
|---|---|---|
| `--primary` / `--primary-foreground` | `bg-primary` / `text-primary-foreground` | CTAs, focus, brand accents |
| `--secondary` / `--secondary-foreground` | `bg-secondary` / `text-secondary-foreground` | Secondary actions |
| `--muted` / `--muted-foreground` | `bg-muted` / `text-muted-foreground` | Subdued surfaces / labels |
| `--accent` / `--accent-foreground` | `bg-accent` / `text-accent-foreground` | Subtle emphasis |
| `--amber` | `bg-amber` / `text-amber` | Smart / IA hint, warnings |
| `--cyan` | `bg-cyan` / `text-cyan` | Info, neutral signal |
| `--success` | `bg-success` / `text-success` | Positive states |
| `--warning` | `bg-warning` / `text-warning` | Caution |
| `--destructive` / `--destructive-foreground` | `bg-destructive` / `text-destructive-foreground` | Errors, destructive |

### 2.3 Borders & inputs
| Token | Tailwind | Use |
|---|---|---|
| `--border` | `border-border` | Default 1px |
| `--border-strong` | `border-border-strong` | Emphasized edge / dividers |
| `--hairline` | `border-hairline` | Chips, micro‑badges, table cells |
| `--input` | `border-input` | Form controls |
| `--ring` | `ring-ring` | Focus ring |

> **Don't:** `bg-white`, `bg-slate-50`, `text-emerald-600`, `border-slate-200`, `#f59e0b`, `bg-foreground/5`.
> **Do:** `bg-card`, `bg-foreground/[0.04]`, `text-success`, `border-hairline`, `bg-amber text-background`.

### 2.4 Composed gradients
Apply via `[background:var(--gradient-x)]` or arbitrary class.

| Token | Use |
|---|---|
| `--gradient-aurora` | App backdrop (already on `body`) |
| `--gradient-glass` | Glass surfaces (use `.glass` / `.glass-strong` instead) |
| `--gradient-metal` | Metallic surfaces (use `.metal`) |
| `--gradient-primary` | Primary buttons, hero CTAs |
| `--gradient-amber` | Smart / IA emphasis |

---

## 3. Typography

| Token | Tailwind | Stack |
|---|---|---|
| `--font-display` | `font-display` | Space Grotesk → Inter Tight |
| `--font-sans` | `font-sans` | Inter Tight → Inter |
| `--font-mono` | `font-mono` | JetBrains Mono |

Rules:
- Headings (`h1–h4`) use `--font-display` automatically with `letter-spacing: -0.02em`.
- Body uses `--font-sans` with OpenType features `ss01, cv11, cv02, tnum`.
- For numbers in dashboards / KPIs, add `.num` (tabular + tighter tracking).
- For brand titles, use the gradient utility `.text-aurora`.

Sizing follows Tailwind defaults (`text-xs … text-5xl`). Avoid one‑off `text-[13px]`.

---

## 4. Radius

| Token | Tailwind |
|---|---|
| `--radius-sm` | `rounded-sm` |
| `--radius-md` | `rounded-md` |
| `--radius-lg` | `rounded-lg` (= `--radius`, base 0.875rem) |
| `--radius-xl` | `rounded-xl` |
| `--radius-2xl` | `rounded-2xl` |
| `--radius-3xl` | `rounded-3xl` |

Cards/panels: `rounded-xl` or `rounded-2xl`. Buttons: `rounded-lg`. Chips/badges: `rounded-md`.

---

## 5. Depth — elevation & glow

Always use shadow tokens, never hand‑rolled `shadow-[0_8px_…]`.

| Token | Use |
|---|---|
| `--elev-1` | Subtle inset, inputs, list rows |
| `--elev-2` | Cards, panels, default buttons |
| `--elev-3` | Floating menus, hovered cards |
| `--elev-4` | Modals, command palette |
| `--glow-primary` | Brand focus / hovered CTA |
| `--glow-amber` | Smart / IA emphasis |
| `--glow-cyan` | Info pulse |

Apply: `shadow-[var(--elev-2)]`, `shadow-[var(--elev-2),var(--glow-primary)]`.
Convenience utilities: `.glow-primary`, `.glow-amber`, `.glow-cyan`.

---

## 6. Signature utilities

Defined under `@layer utilities` in `src/styles.css`.

| Utility | What it gives |
|---|---|
| `.glass` | Blurred panel + `--elev-2` + border |
| `.glass-strong` | Stronger blur + `--elev-3` (modals, palettes) |
| `.hairline` | 1px luminous divider line |
| `.metal` | Metallic surface (sidebars, headers) |
| `.lux-card` | Signature card: cursor‑tracked radial highlight + magnetic lift. Use the `<LuxCard>` component (`src/components/nova/lux-card.tsx`). |
| `.magnetic` | Lift on hover (-2px Y) |
| `.text-aurora` | Brand gradient text |
| `.num` | Tabular numerics |
| `.hud-grid` | HUD grid backdrop (radially masked) |
| `.shimmer` | Loading/AI shimmer sweep |
| `.pulse-ring` | Brand pulsing focus ring |
| `.anim-in` | Fade + rise entrance |
| `.float-soft` | Idle hover float |
| `.scan-line` | Scanning vertical sweep (cyan) |
| `.glow-primary` / `.glow-amber` / `.glow-cyan` | Box glow |

---

## 7. Motion

| Token | Value | Use |
|---|---|---|
| `--ease-out-cinema` | `cubic-bezier(0.22,1,0.36,1)` | Default UI motion |
| `--ease-spring` | `cubic-bezier(0.34,1.56,0.64,1)` | Pop‑ins, success |
| `--ease-soft` | `cubic-bezier(0.4,0,0.2,1)` | Idle / ambient |
| `--dur-1` | 120ms | Micro hover |
| `--dur-2` | 240ms | Standard transition |
| `--dur-3` | 420ms | Panel / glow |
| `--dur-4` | 680ms | Entrance |

Pattern: `transition-all duration-200 ease-[var(--ease-out-cinema)]`.
For complex orchestration use `framer-motion` and respect the same easings/durations.

Predefined keyframes in CSS: `shimmer`, `pulse-ring`, `fade-up` (→ `.anim-in`), `float-soft`, `scan`.
Tailwind animations available: `animate-fade-in`, `animate-scale-in`, `animate-slide-in-right`, `animate-accordion-down/up`, `animate-enter`, `animate-exit`, plus `.hover-scale` and `.story-link`.

---

## 8. Component conventions

### Buttons (`src/components/ui/button.tsx`)
Variants: `default` (gradient + glow on hover), `secondary`, `ghost`, `outline`, `floating` (glass + lift), `smart` (amber IA accent), `destructive`, `link`.
Sizes: `sm`, `default`, `lg`, `icon`.
**Do not** override colors via `className`; pick the variant.

### Cards
- Standard panel → `bg-card border border-border rounded-xl shadow-[var(--elev-2)]`.
- Hero / signature → `<LuxCard glow="primary|amber|cyan">`.
- Glassy floating → `.glass` / `.glass-strong`.

### Inputs / chips
- Border: `border-border` for inputs, `border-hairline` for chips/badges.
- Background hover: `bg-foreground/[0.04]` (never `bg-foreground/5` — keep the explicit `[0.04]`).

### Status & channels (Inbox / Chat)
Use semantic tokens, not Tailwind brand colors:
- Online → `bg-success`, away → `bg-amber`, offline → `bg-muted-foreground`.
- Errors → `text-destructive`. Info → `text-cyan` (or `text-info` if defined). Positive → `text-success`. Brand action → `text-primary`.

---

## 9. QA checklist (before merging a screen)

Run from the repo root:

```bash
git grep -nE 'bg-(white|black|slate|gray|neutral|zinc|stone)-[0-9]|text-(slate|gray|emerald|rose|blue|violet|sky|red|indigo|orange|yellow|amber|pink)-[0-9]|border-(slate|emerald|rose|blue|violet|sky|red|indigo|orange|yellow|amber)-[0-9]|#(f59e0b|fff|FFF|000)\b|shadow-\[0_' src
```
Expected: **no matches** inside `src/components/nova/**` and `src/routes/**`.

Also verify:
- [ ] No raw `bg-white` / `text-white` (use `bg-card` / `text-primary-foreground`).
- [ ] No `bg-foreground/5` — must be `bg-foreground/[0.04]`.
- [ ] All shadows reference `var(--elev-*)` or `var(--glow-*)`.
- [ ] Headings use display font (no `font-serif`, no Inter/Poppins overrides).
- [ ] Cards render correctly across `.light` and `.carbon` (toggle on `<html>`).
- [ ] Numbers/KPIs use `.num`.
- [ ] Glow/animation utilities used instead of inline keyframes.

---

## 10. Quick cheat sheet

```tsx
// Card
<div className="bg-card border border-border rounded-xl p-6 shadow-[var(--elev-2)]">…</div>

// Hero card
<LuxCard glow="primary" className="p-8">…</LuxCard>

// Primary CTA
<Button>Save deal</Button>

// Smart / IA hint
<Button variant="smart">Ask Lumen</Button>

// Glass floating panel
<div className="glass-strong rounded-2xl p-4">…</div>

// Tabular KPI
<span className="num text-3xl font-display">R$ 128.4k</span>

// Brand gradient title
<h1 className="text-aurora text-4xl font-display">NOVA OS</h1>

// Status dot
<span className="size-2 rounded-full bg-success ring-2 ring-background" />
```
