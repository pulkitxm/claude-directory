# Roman & Quill — Serif Editorial Design System Showcase (React + TypeScript + Tailwind CSS)

A standalone, fully self-contained showcase page expressing the **Serif** design system — typographic elegance through classical restraint. Built around a fictional private publishing house, **Roman & Quill**, the page evokes the feeling of opening a beautifully designed hardcover book: editorial, timeless, warm, and refined, combining the finest literary magazine conventions with luxury brand identity details — illuminated-manuscript gold leaf (`#B8860B`), fine binding aesthetics, and generous whitespace. Generated with Claude Fable 5.

## Sections

- **Header** — sticky, transparent-to-ivory on scroll, with a Playfair wordmark
  (a gold ampersand that rotates on hover), small-caps tracked nav with growing
  gold underlines, and a slide-in mobile overlay menu.
- **Hero** — a dramatic Playfair headline (`clamp(2.5rem → 4.75rem)`) with a
  gold-italic emphasis line, a rule-flanked small-caps eyebrow, a drop-cap-ready
  lede, primary + outline CTAs, and a bespoke "Standing Volumes" engraving plate
  inside a double offset accent/border frame. A horizontal **type marquee**
  closes the section.
- **Stats** — four large Playfair display numbers (`text-5xl → 6xl`) between two
  ornament rules; 2-col on mobile / 4-col on desktop with vertical hairline
  dividers between columns only.
- **Features (The House)** — drop-cap intro, a 3-column grid of accent-top hover
  cards with Roman-numeral kickers and engraving plates (a typographic specimen,
  a wax-sealed letter, a quill & inkwell).
- **Benefits (The Craft)** — the signature **asymmetric** `1.3fr / 0.7fr` split:
  a rule-separated numbered process on the wide side, and a sticky "Composing
  Room" atelier plate plus a gold-bordered margin pull-quote on the narrow side.
- **Testimonials** — oversized decorative gold quote marks (`text-accent/15` and
  `/70`), an elevated lead quote, and two supporting cards, each with a bespoke
  SVG portrait medallion.
- **Pricing (Membership)** — three tiers; the featured "Subscriber" tier carries
  a 6% gold-wash opaque surface, a 2px accent top border, a "Most chosen" ribbon,
  elevation, and a `-translate-y-4` lift. Large Playfair prices.
- **Journal** — a 3-card blog grid with bound-journal plates (distinct gold
  motifs), small-caps category/date/read-time meta, and gold "Read" links.
- **FAQ (Enquiries)** — accessible accordion (`aria-expanded`, 44px touch
  targets, `touch-manipulation`) with a grid-rows height transition and a gold
  plus-to-× icon, on a sticky-rail `0.7fr / 1.3fr` layout.
- **Correspond** — an inverted rich-black panel (the ivory breaks for contrast)
  with an ambient gold glow, an invitation, and a labelled request **form**
  demonstrating the input spec (`h-12`, transparent ground, gold focus ring +
  border, subtle placeholder).
- **Footer** — multi-column editorial footer with wordmark, address, an ornament
  rule, and a bottom meta row.

## The "Bold Factor" (signature elements)

1. **Dramatic serif headlines** — oversized Playfair Display throughout.
2. **Rule-line system** — hairline rules as section dividers, decorative
   underlines, card accents, and the `SectionLabel` (rule · small-caps · rule).
3. **Small-caps labels** — IBM Plex Mono, `0.15em` tracking, uppercase, on every
   section label and meta string.
4. **Burnished gold accent** (`#B8860B`) — the single warm accent, used sparingly.
5. **Generous whitespace** — `py-24 → py-40` section rhythm, `max-w-5xl` measure.
6. **Large display numbers** — stats and pricing in serif `5xl+`.
7. **Decorative quote marks** — large opening quotes in faint/again gold.
8. **Asymmetric layouts** — `1.3fr/0.7fr` benefits, `0.7fr/1.3fr` FAQ.
9. **Layered depth abstracts** — bespoke SVG plates with gradient grounds,
   low-opacity rings, offset frames, and hatch texture.
10. **Paper-texture overlay** — fixed `feTurbulence` SVG grain at ~30%, `multiply`.
11. **Ambient glow** — two large blurred gold circles at ~5% opacity.
12. **Micro-interactions** — primary-button lift-and-return, card bg/border/shadow
    shifts, growing underlines, all at a restrained `200ms ease-out`.

## Design tokens (centralized)

Tokens are the single source of truth: hex + space-separated **channel** RGB vars
in `src/index.css` `:root`, consumed by `tailwind.config.js` as
`rgb(var(--x-rgb) / <alpha-value>)` so both solid utilities **and opacity
modifiers** (`bg-muted/40`, `text-accent/15`) generate real CSS.

| Token | Value | Use |
|-------|-------|-----|
| Background (warm ivory) | `#FAFAF8` | primary canvas |
| Foreground (rich black) | `#1A1A1A` | primary text |
| Muted | `#F5F3F0` | secondary surfaces |
| Muted foreground (warm gray) | `#6B6B6B` | secondary text |
| Accent (burnished gold) | `#B8860B` | links, highlights |
| Accent secondary | `#D4A84B` | gradients / hover |
| Border (warm gray) | `#E8E4DF` | rules, dividers |
| Card | `#FFFFFF` | card surfaces |
| Radius | `6px` / `8px` (md / lg) | buttons / cards |

**Typography:** Playfair Display (display), Source Sans 3 (body, `1.75` leading),
IBM Plex Mono (small-caps labels) — all vendored, all `font-display: swap`.

## Stack

React 18 · TypeScript · Vite 5 · Tailwind CSS v3 (postcss + autoprefixer) ·
lucide-react (thin strokes, used sparingly).

> The spec mentions Tailwind v4; this build uses the repo's idiomatic, verified
> Tailwind v3 setup and implements every token / utility faithfully via the
> Tailwind config + a CSS `@layer`.

## Assets — all vendored locally

- **Fonts** (`assets/fonts/`): Playfair Display (variable normal + italic),
  Source Sans 3 (variable), IBM Plex Mono (400 + 500) — latin-subset `.woff2`,
  declared via local `@font-face`.
- **Illustrations**: all imagery is **bespoke inline SVG** "engraving plates"
  (`src/components/Plates.tsx`) drawn in the Serif palette — no raster images, no
  hotlinks. The project runs fully offline.

## Run

```bash
npm install
npm run dev        # vite dev server
npm run build      # tsc --noEmit && vite build
npm run preview    # preview the production build
```

## Verify (CLI / headless)

```bash
npm run dev -- --port 5188 --strictPort        # in one shell
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
  node scripts/verify.mjs --url http://localhost:5188/   # in another
```

`scripts/verify.mjs` drives a headless Chromium and asserts (42 checks): exact
design tokens resolve, all three vendored fonts load, every section renders,
signature elements exist (small-caps, rules, gold, large numbers, paper grain,
ambient glow), the FAQ accordion + mobile menu work, opacity-modifier utilities
emit real colour (regression guard), touch targets are ≥ 44px, there is no
horizontal overflow at 375px or 1366px, and the console is error-free.

---

Part of the [UI design](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
