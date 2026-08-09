# Design Language & System

Portfolio design reference for `reymartlouie.vercel.app`. Derived from build sessions — update when patterns change.

---

## Philosophy

- **Apple.com-adjacent, frosted glass** — off-white page, translucent blurred
  glass surfaces on structural chrome, generous radius, no harsh lines
- **Headline outside, content inside** — every section leads with a big bold
  `font-display` headline sitting directly on the page bg, *outside* any
  bento/card chrome; the cards below hold pure content, never a duplicate title
- **Bento cards keep their own identity** — each card's original color
  (jewel-tone gradients, per-project accents, novelty-card black/gold/ivory)
  is untouched; cards contrast against the light page, they don't get
  reskinned to match it
- **Black nav for contrast** — `StatusBar` chrome is dark frosted glass,
  deliberately the inverse of the light page behind it. There is no separate
  floating nav pill anymore — section nav lives in the center of `StatusBar`
- **Hero cards are a draggable carousel, not a free-drag canvas** — all bento
  cards render at one fixed size and sit in a horizontal snap-scroll strip you
  can drag with the mouse or swipe on touch, like `Works`/`Achievements`
- **Per-project identity** — each project owns a color, icon, and accent system
- **Data-light cards** — show just enough to hook; details live in modals
- **Crafted copy** — active voice, no filler words, "Crafting" over "Ongoing"

---

## Frosted Glass System

Page background is a soft off-white mesh (`--page-bg: #f5f5f7` + low-opacity
radial color blooms, defined on `.layout-overlay` in `globals.css`) — no more
full-black canvas or `/bg.webp`. Two reusable surface classes sit on top of it,
used for **structural chrome only** — section wrappers, modals — not for
individual bento cards, which keep their original per-project backgrounds:

| Class | Use | Definition |
|---|---|---|
| `.glass` | Section wrapper surface (Works, Achievements, Pricing) | `rgba(255,255,255,0.62)` bg, `blur(28px) saturate(160%)`, `1px solid rgba(0,0,0,0.07)` border, soft diffused shadow |
| `.glass-strong` | Modals, popovers | `rgba(255,255,255,0.78)` bg, `blur(32px) saturate(180%)`, stronger border/shadow |

`StatusBar` uses its own dark frosted-glass tokens (`--bar-bg`, `--nav-bg` ≈
80% opacity near-black + blur) — kept black on purpose so it reads clearly
against the light page. The desktop bar is a 3-column grid (`grid-cols-[1fr_auto_1fr]`):
left = RL menu + text links, **center = the Canvas/Work/Contact icon nav**
(moved here from the old standalone floating `Navbar` pill, which no longer
exists), right = wifi/battery/clock.

Text on light structural surfaces uses the `--ink*` scale (`--ink` `#1d1d1f`
down to `--ink-25`). Text inside individual bento cards keeps whatever
scheme that card originally used (white-on-dark for Hero/TechStack/Quote/
GitHub, project-accent colors for Works/Achievements cards, gold/ivory for
the novelty cards) — only shadows were re-tuned for the light bg, never the
card's own palette.

Resting `box-shadow` on the Hero carousel cards (Hero, TechStack, Quote,
GitHub) and the Works project cards was tried as a "floating tile" effect
for the light bg, but the horizontal `overflow-x-auto` scroll strips force
`overflow-y` to `auto` too, which hard-clips any shadow past the strip's
bottom padding into a flat grey band instead of a soft fade — it read as a
rendering bug, not depth. Those shadows were removed; cards now rely on
their `border`/`background` alone for definition inside the carousels.
`PayPalCard` sits outside the scroll strips and keeps its own resting
shadow.

`TechStackCard` keeps its `/tech-bg.webp` tile-facade photo (the texture is
part of its identity) but the dark overlay was lightened (`0.72→0.60` /
`0.52→0.42` / `0.70→0.62`) so it reads through more, and the card grew a
two-line header block — small-caps label, then a `font-display` headline
("Tools I build with.") — above its tags, so content fills the fixed card
height instead of leaving dead space below a thin top block.

`PayPalCard` uses `/paypal-bg.webp` — a tap-to-pay contactless photo (electric
blue NFC wave + "pay" glyphs on black) — as its background in place of the
old flat `#111→#0a0a0a` gradient; the blue in the photo already matches
`paypalTheme.blue` (`#009cde`), so the heart glyph and glow read as part of
the same palette rather than a color clash. A top-to-bottom dark gradient
wash (`rgba(6,8,14,0.42)→rgba(2,3,6,0.86)`) sits between the photo and the
content layer — lighter near the heart so the photo's texture still shows
through, darker toward the footer/PayPal button where legibility matters
most.

`GitHubCard` now mirrors that same header pattern (label row + `font-display`
headline, "Consistency, committed.") for visual consistency between the two
dark-green cards. Its contribution grid briefly moved to sit left-aligned
inside the card's own `p-6` (matching `TechStackCard`'s tag inset), but that
was reverted — it's back to breaking out of the `p-6` via `mx-[-24px]
px-[15px]`, running edge-to-edge with the card at its own tighter 15px
gutter, right-aligned (`justify-end`) so the most recent week sits flush
against that gutter. Grid width is measured directly off the grid row
(`gridRef` + `ResizeObserver`) to compute how many week-columns fit, sized
dynamically (no fixed week cap). Dots are `11px` with `3px` gaps
(GitHub's own proportions — a prior pass at `16px` spanning the full card
width read as one solid green block), and the level-0 color is
`rgba(255,255,255,0.04)` so empty days nearly vanish into the card bg and
only actual activity reads as texture. Vertically the grid sits at the
golden-ratio point of the space between header and footer (~62% down, not
dead-center) via two `aria-hidden` spacer divs above/below it grown
`1.618`:`1`. The whole card is a link to the GitHub profile (small mark
icon, top-right of the header row, nudges on hover). `Quote`
(AboutCard) swapped its static `/about-bg.webp`
for a muted/looped `<video>` background (`/quote-bg.mp4`, `about-bg.webp`
kept as `poster` fallback); playback is gated behind an `IntersectionObserver`
(pauses off-screen in the carousel) and skipped entirely under
`prefers-reduced-motion`.

### Hero Carousel

The old free-drag `BentoCanvas`/`DraggableBento` system (2D positioning, resize
handles, edit mode, collision solver, `localStorage`-persisted layout) was
removed. `Hero.tsx` now renders every card — `HeroIntroCard`, `PhotoCard`,
`TechStackCard`, `Quote` (AboutCard), `GitHubCard`, plus any Supabase
testimonial `CustomCard`s — at one fixed size (`CARD_W: 320`, `CARD_H: 380`)
inside a `no-scrollbar overflow-x-auto snap-x snap-mandatory` row, identical
in spirit to the `Works`/`Achievements` carousels. A `pointerdown`/`pointermove`
handler on the row drives `scrollLeft` directly so the strip is draggable with
a mouse, not just touch — a small movement threshold (6px) keeps normal clicks
on card buttons from being swallowed as a drag.

---

## Layout & Containers

| Element | Value |
|---|---|
| Section headline | `font-display text-[44px] md:text-[56px] font-black text-stone-900`, left-aligned, lives at the **page level** (`page.tsx`'s `SectionHeadline`) directly on the page bg — never inside a card |
| Section wrapper (Works/Achievements/Pricing) | `rounded-[32px]` `overflow-hidden` `.glass` |
| Project cards | `rounded-[24px]` `h-[400px]` `w-full` snap-scroll |
| Modal | `max-w-2xl` `rounded-[32px]` `max-h-[90vh]` `.glass-strong` |
| Modal inner sections | `rounded-[20px]` or `rounded-2xl` |
| Card padding | `px-6 py-6` |
| Modal body padding | `p-5 md:p-10` |

### Works Carousel

```
Outer container: .glass rounded-[32px]
  Header: "Selected Work." (font-display) + UI/UX button
  Scroll row: snap-x, snap-mandatory, px-4 gap-4 pb-4, scrollPaddingLeft 1rem
  Dot indicators: bottom-center, active = 20px wide pill
```

---

## Typography

| Role | Class | Notes |
|---|---|---|
| Section heading | `font-display text-[44px] md:text-[56px] font-black` | "Selected Work." |
| Card title | `font-display text-4xl leading-tight` | dynamic color via `isDark` |
| Card label | `font-sans text-xs uppercase tracking-widest` | `01 · Category · Date` |
| Card description | `font-sans text-sm leading-relaxed line-clamp-2` | max 2 lines |
| Tag text | `font-sans text-xs px-3 py-1 rounded-full` | max 4 tags shown in card |
| Modal title | `font-display text-xl` | |
| Modal body | `font-sans text-sm leading-relaxed` | `text-stone-500` |
| Modal section label | `font-sans text-xs uppercase tracking-widest` | `text-stone-400` |
| CTA link | `font-sans text-sm font-medium` | "View Details →" |

### Copy Rules

- Active voice only — "Built from scratch", not "was built"
- Date format: `Month YYYY – Month YYYY` (full 4-digit years, no abbreviation)
- Active projects: `Month YYYY – Crafting` ("Crafting" not "Ongoing")
- Card label numbering: oldest = highest number (`04 · Thesis · Sept 2025 – Mar 2026`)

---

## Icon Design Language

All project icons share the same visual grammar as the FitnessMadness dumbbell.

### Rules

- **ViewBox:** `120 × 120`, `fill="none"` at root SVG
- **Shapes:** `<rect rx>` for geometric, `<path>` for organic curves
- **Color depth:** 3 tones — dark / mid / light — all from the same brand hue
- **No outlines or strokes** (except mug handle — `stroke` path only)
- **Scale:** displayed at `w-28 h-28` (`112px`) on cards

### Icon Reference

| Project | Icon | Shape method | Colors (dark → mid → light) |
|---|---|---|---|
| FitnessMadness | Dumbbell | 5 rects | `#991b1b` / `#dc2626` / `#ef4444` |
| Brewed | Coffee mug + steam | Rects + stroke path handle | `#78350f` / `#b45309` / `#d97706` |
| Gracey Logistics | Side-view truck | Rects | `#1f2937` / `#9ca3af` / `#ea580c` (cab) |
| FireSafe | Layered flame | 3 nested paths | `#991b1b` / `#ea580c` / `#fb923c` |

### Mug Handle Pattern

```svg
<path d="M92 58 Q116 58 116 76 Q116 94 92 94"
  stroke="#78350f" stroke-width="14" stroke-linecap="round" fill="none"/>
```

### Flame Layer Pattern

```svg
<!-- outer → mid → inner, each path progressively smaller and lighter -->
<path d="M60 8 C42 32 16 50 16 74 ..." fill="#991b1b"/>
<path d="M60 30 C48 48 34 60 34 76 ..." fill="#ea580c"/>
<path d="M60 56 C54 66 48 72 48 80 ..." fill="#fb923c"/>
```

---

## Project Color System

Each project owns a full color token set applied to: card bg, card border, card shadow, divider, label, view-details link, tags, and modal accents.

### FitnessMadness — White / Red

| Token | Value |
|---|---|
| Card bg | `linear-gradient(145deg, #fff1f2 0%, #ffe4e6 100%)` |
| Border | `rgba(239,68,68,0.18)` |
| Shadow | `rgba(239,68,68,0.10)` |
| Divider | `rgba(239,68,68,0.45)` |
| Label | `rgba(153,27,27,0.55)` |
| View Details | `rgba(185,28,28,0.85)` |
| Tag text | `rgba(153,27,27,0.85)` |
| Tag bg | `rgba(239,68,68,0.08)` |
| Modal accent | `rgba(239,68,68,…)` + label `rgba(185,28,28,…)` |

### Brewed — Amber / Coffee

| Token | Value |
|---|---|
| Card bg | `linear-gradient(145deg, #fdf8f0 0%, #fdefd8 100%)` |
| Border | `rgba(180,120,40,0.12)` |
| Divider | `rgba(180,120,40,0.35)` |
| Label | `rgba(120,70,20,0.55)` |
| View Details | `rgba(140,80,20,0.85)` |
| Modal accent | `rgba(180,120,40,…)` + label `rgba(120,70,20,…)` |

### Gracey Logistics — Gray / Orange

| Token | Value |
|---|---|
| Card bg | `linear-gradient(145deg, #f9fafb 0%, #f3f4f6 100%)` |
| Border | `rgba(107,114,128,0.18)` |
| Divider | `rgba(234,88,12,0.55)` ← orange accent on gray |
| Label | `rgba(55,65,81,0.55)` |
| View Details | `rgba(194,65,12,0.85)` ← orange |
| Tag text | `rgba(55,65,81,0.85)` |
| Tag bg | `rgba(107,114,128,0.08)` |
| Modal structural | `rgba(107,114,128,…)` |
| Modal buttons | `rgba(234,88,12,…)` |

### FireSafe — Orange / Red (fire)

| Token | Value |
|---|---|
| Card bg | `linear-gradient(145deg, #fff7f0 0%, #ffede0 100%)` |
| Border | `rgba(234,88,12,0.18)` |
| Divider | `rgba(220,38,38,0.45)` |
| Label | `rgba(153,27,27,0.55)` |
| View Details | `rgba(194,65,12,0.85)` |
| Modal accent | `rgba(234,88,12,…)` + label `rgba(153,27,27,…)` |

---

## Card Structure

```
[rounded-[24px] h-[400px] — project gradient bg]
  ↕ flex-col justify-between px-6 py-6

  TOP — Label row
    [1px divider] [01 · Category · Month YYYY – Month YYYY]

  MIDDLE — Icon (centered)
    [w-28 h-28 SVG icon, drop-shadow-xl, group-hover:scale-105]

  BOTTOM — Info block
    [Title — font-display text-4xl]
    [Description — text-sm line-clamp-2 text-stone-500*]
    [View Details → — accent color]
    [Tags — max 4, rounded-full, brand tint]
```

> `*` On `isDark: true` cards: title → `#f5f5f4`, description → `rgba(255,255,255,0.60)`

---

## Modal Structure

```
[Backdrop — rgba(0,0,0,0.75) blur(12px), modalBackdropIn 200ms]
  [Card — white, max-w-2xl, rounded-[32px], modalCardIn 350ms spring]

    HEADER (flex-shrink-0, sticky)
      [Category · Date Range]        ← text-xs uppercase tracking-widest
      [Project Title]                ← font-display text-xl
      [Action button] [Close ✕]

    BODY (overflow-y-auto p-5 md:p-10)
      1. Preview image               ← h-52 rounded-2xl object-cover object-top
                                        border: project brand color 0.12–0.18
      2. Intro paragraph             ← subtitle (url/context) + description
      3. The Brief / The Problem     ← branded tint box, section label
      4. Features / Deliverables     ← 2-col grid, rounded-2xl items
      5. Stack / Hardware / Software ← 2-col grid
      6. My Role / My Roles          ← flex-col, full-width cards
      7. CTA buttons                 ← flex-row md:justify-end, btn-spring
```

### Modal Color Tint Scale

```
bg fill (lightest):   rgba(R,G,B, 0.04–0.05)
border (default):     rgba(R,G,B, 0.10–0.12)
button bg:            rgba(R,G,B, 0.08)
button border:        rgba(R,G,B, 0.18–0.20)
label text:           rgba(dark, 0.55–0.60)
interactive text:     rgba(dark, 0.85)
```

---

## Project Timelines

| Project | Timeline | Status |
|---|---|---|
| FitnessMadness | May 31, 2026 – Crafting | Active |
| Brewed | May 29, 2026 – Crafting | Active |
| Gracey Logistics | Dec 1, 2025 – May 29, 2026 | Shipped |
| FireSafe | Sept 25, 2025 – Mar 26, 2026 | Shipped |

---

## Animation Tokens

| Animation | Value |
|---|---|
| Modal backdrop in | `modalBackdropIn 200ms ease both` |
| Modal card in | `modalCardIn 350ms cubic-bezier(0.34,1.2,0.64,1) both` |
| Icon hover scale | `group-hover:scale-105 transition-transform duration-500` |
| Button | `btn-spring` (custom spring class in globals.css) |
| Dot indicator | `transition-all duration-200` |
| Carousel scroll | `behavior: 'smooth'` |

---

## File Map

```
src/
  components/
    sections/
      Works.tsx          — carousel, card render, modal triggers
    ui/
      BrewedModal.tsx
      FitnessMadnessModal.tsx
      GraceyLogisticsModal.tsx
      FireSafeModal.tsx
      UIUXModal.tsx
public/
  fitnessmadness-logo.svg  — dumbbell icon (red)
  brewed-icon.svg          — coffee mug icon (amber)
  gracey-icon.svg          — truck icon (gray + orange)
  firesafe-icon.svg        — flame icon (orange/red)
  brewed-preview.webp
  fitnessmadness-preview.webp
  gracey-preview.webp
```

---

## Works Data Shape

```typescript
type Work = {
  id: WorkId                  // 'fitnessmadness' | 'firesafe' | 'gracey' | 'brewed'
  year: number                // kept for reference
  dateRange: string           // "Month YYYY – Month YYYY" or "Month YYYY – Crafting"
  category: string            // shown in card label
  title: string
  description: string
  cardBg: string              // linear-gradient
  cardBorder: string
  cardShadow: string
  dividerColor: string        // 1px vertical rule in label
  labelColor: string          // category label + date text
  viewDetailsColor: string    // "View Details →" accent
  image: string               // /public/*.svg
  imageAlt: string
  imageClass: string          // always w-28 h-28 + drop-shadow + hover scale
  tags: string[]              // card shows max 4, modal shows all
  tagColor: string
  tagBg: string
  tagBorder: string
  isDark?: boolean            // true = white title + 60% white description
}
```

---

*Last updated: August 2026 — removed clipped resting shadows from Hero/Works carousel cards; PayPalCard background swapped to `/paypal-bg.webp` tap-to-pay photo, derived from design sessions in Claude Code*
