# Claymakers — High-Fidelity Claymorphism Design System

A complete, polished showcase landing page that fully expresses the **High-Fidelity
Claymorphism** design system: a tangible world built from _premium digital clay_.
Every surface is lit by a soft top-left light and stacks **four shadow layers**, so
elements feel dense and physical rather than like flat vector art. Candy-shop color,
super-rounded corners, zero-gravity float, and exaggerated **squish-on-press** physics.

Generated with Claude Fable 5 for the [claude-directory](../../README.md).

## What it demonstrates

- **Centralized design tokens** — the entire candy-shop palette, the two self-hosted
  typefaces, the super-rounded radii, the 4-layer shadow stacks, and every keyframe
  live in one Tailwind v4 `@theme` + `@layer` block (`src/index.css`). Components never
  hard-code a hex or a one-off shadow — they compose `bg-clay-*`, `shadow-clay-*`,
  `rounded-clay-*` and the `display` font object.
- **The depth engine** — four reusable shadow utilities map exactly to the spec:
  `shadow-clay-deep` (surfaces/trays), `shadow-clay-card` (floating cards),
  `shadow-clay-button` (convex buttons), and `shadow-clay-pressed` (recessed inputs &
  active states). Orbs get a hue-tinted drop via a `--orb` custom property.
- **Composable primitives** — `Card`, `Button`/`ButtonLink`, `Input`, `IconOrb`,
  `Badge`, `Blobs`, `ClayShape`, `SectionHeading` and `Reveal` encode the clay physics
  once: convex bulge, concave press, the `active:scale-[0.92]` squish, the hover lift,
  and the springy scroll-in entrance.
- **The full surface area** — a hero with multi-stop gradient text and an abstract
  nested-clay composition, a trusted-by marquee, breathing **stat orbs** that count up,
  an asymmetric **bento feature grid** (a 2×2 hero card with a "peeking" panel), a
  **live playground** (press the buttons to feel the squish, focus the field to watch
  it rise), a 50/50 **split benefits** section with a fanned clay-tablet composition,
  numbered **how-it-works** circles, a **pricing** trio whose popular tier rests larger
  with a badge breaking its edge, **testimonials**, an ARIA **FAQ accordion** whose open
  panel presses into the surface, a working **email-capture CTA**, and a clay footer.
- **Buoyant, accessible motion** — four float keyframes, breathing orbs, two-axis
  background blobs, count-ups, and a `prefers-reduced-motion` query that stills the
  entire world. WCAG-AA text floor, 44px+ targets, visible focus rings, full keyboard
  support (escape closes the mobile menu).

## Stack

React 18, TypeScript, Vite 6, Tailwind CSS v4, lucide-react.

**Nunito** (display) and **DM Sans** (body) are self-hosted as variable `.woff2` files
in `public/fonts/` and preloaded — the project runs fully offline, no font CDN.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

## Verify

Headless CLI verification (Playwright) asserts the design-system contract — the exact
palette tokens resolve from one place, both self-hosted fonts render, cards & buttons
carry genuine **4-layer** shadow stacks, inputs rest recessed and rise to white on
focus, there are **no sharp corners**, the button press registers (the live squish
counter increments), stat count-ups reach their targets, the popular pricing tier rests
larger, the billing toggle flips prices, the FAQ open-panel goes recessed, the CTA form
confirms, and the mobile menu toggles:

```bash
npm run build
npm run preview -- --port 4173 --strictPort &
npm run verify http://localhost:4173
# Use a specific browser binary if needed:
# CHROME_PATH=/path/to/chrome npm run verify http://localhost:4173
```
