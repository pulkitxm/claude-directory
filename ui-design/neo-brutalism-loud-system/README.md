# Neo-Brutalism — LOUDHOUSE

A single-page design-system showcase for a fictional component kit
("**LOUDHOUSE**"), built to express the **Neo-brutalism** design system end to
end: the digital-punk rebellion against clean SaaS — thick black strokes, hard
offset shadows, highlighter color blocks, sticker rotations, and mechanical
click-down interactions. _If it doesn't have a border, it doesn't exist._

It is a full landing page — sticky nav with a mobile drawer, a chaos-zone hero,
a live token gallery, a six-card feature grid, a count-up stats band, an
interactive component playground, a four-step process, scaled pricing tiers, a
testimonials marquee, a keyboard-operable FAQ, a CTA form, and a five-column
footer — color-blocked top to bottom for high-contrast rhythm.

## Signature elements (the "bold factor")

- **Hard offset shadows** — solid ink rectangles, **zero blur, zero spread**,
  bottom-right, at four discrete sizes (`4/8/12/16px`). Registered as
  `--shadow-neo*` tokens so the `hover:`/`focus:`/`active:` variants are real
  Tailwind utilities. A white-shadow set is used on black sections.
- **Mechanical interactions** — buttons **click DOWN** onto their shadow on
  `:active` (translate `+6px`, shadow removed); cards **lift UP** on hover
  (translate up, shadow grows); badges **spin further** (`hover:rotate-12`).
  Fast, snappy `ease-out` — nothing fades.
- **Hollow text-stroke display type** — massive headlines use
  `-webkit-text-stroke: 2px` with a transparent fill, layered against solid
  color-blocked words rotated like stickers.
- **Sticker layering & organized chaos** — cards, badges and text blocks are
  rotated (`±1–3°`) and slapped on at angles; the hero right side is a
  deliberate "chaos zone" of stacked shapes, overlapping badges, a spinning
  star and a towering background word; layouts favor 60/40 splits.
- **Two marquees** — a black "warning-tape" trust band of principles under the
  nav, and a testimonials carousel of rotated quote cards, both via
  `react-fast-marquee` with no gradient edges.
- **Texture everywhere** — backgrounds are never flat: halftone dots, big
  radial dots, graph-paper grids (light and inverted), a diagonal hatch, and an
  SVG `feTurbulence` noise grain overlay.
- **Live token gallery** — color swatches print their own hex, the shadow scale
  is shown on real boxes, geometry and type are spelled out. Everything reads
  from one centralized `@theme` block.

## Color & geometry (the DNA)

Cream canvas `#FFFDF5`, pure-black ink `#000000`, and three highlighter
accents — Hot Red `#FF6B6B`, Vivid Yellow `#FFD93D`, Soft Violet `#C4B5FD` —
plus white for contrast panels. Sharp `0px` corners by default (`rounded-full`
only for pill badges), `border-4` as the signature thickness (`border-8` for
major dividers), heavy weights only.

## Accessibility

- **`prefers-reduced-motion`** is fully honoured: marquees mount a static,
  wrapped rail instead of the animated library, the count-ups jump to their
  final value, entrance reveals show immediately, and every loop/transition
  collapses to instant — layout, color blocking, shadows and hierarchy are
  unchanged.
- Skip-to-content link, a single `<main>` landmark, semantic `<header>`/`<nav>`,
  thick black focus rings by default with a **yellow-flood** focus on inputs,
  `aria-label`s on icon-only buttons, `aria-hidden` on decorative shapes, and a
  FAQ accordion that is keyboard-operable with `aria-expanded` / `aria-controls`
  wiring (panel regions stay mounted so idrefs never dangle).
- Mobile-first: hamburger drawer with body-scroll lock, `≥44px` touch targets,
  full-width buttons, and shadows/type that scale down without going "generic".
- WCAG AA+ contrast: ink on cream ≈ 20.6:1, ink on yellow ≈ 15.2:1, ink on
  violet ≈ 11.4:1, ink on red ≈ 7.6:1, white on ink ≈ 21:1.

## Architecture

Design tokens are centralized in `src/index.css` via Tailwind v4 `@theme` (the
six `--color-neo-*` colors, the `--shadow-neo-*` hard-shadow scale, the
`--radius`, the `Space Grotesk` font, and the looping animations), so every
component reads from one source of truth and a recolor is a three-line change.
Reusable primitives live in `src/components/` (`Button`, `Card`, `Badge`,
`Input`/`Textarea`, `Marquee`, `Decor` shapes, `Section` label/reveal); each
page section is its own file in `src/sections/`; copy/data is in
`src/content.ts`; shared behaviour (`useReducedMotion`, `useInView`,
`useCountUp`) is in `src/hooks.ts`. The **Space Grotesk** font is vendored
locally under `public/fonts/` — the project runs fully offline.

## Run

```bash
npm install
npm run dev       # dev server
npm run build     # type-check + production build
npm run preview   # serve the production build on :4173
npm run verify    # headless Playwright checks against the preview server
```

## Verify

`npm run verify` boots headless Chromium and asserts the design system is
actually present and behaving: the tokens resolve on real elements, structure
is enforced with thick black borders, shadows are hard (zero blur, zero soft
shadows), display type is Space Grotesk / uppercase / tight-tracked with stroke
text, sticker rotations are applied, buttons click down (translate + shadow
removed), cards lift, the marquees animate (and use `role="group"`, not the
invalid `role="marquee"`), the input floods yellow on focus, the stat counters
count up, the FAQ is single-open and keyboard-operable, the mobile drawer
toggles, the core color combos pass WCAG AA, the texture/noise overlays are
present, and `prefers-reduced-motion` switches all motion off while keeping the
content. **60 checks, all green.**

Stack: React 18, TypeScript, Vite, Tailwind CSS v4, react-fast-marquee, Lucide,
Space Grotesk (vendored).
