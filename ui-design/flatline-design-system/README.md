# Flatline — Flat Design System

A complete, polished marketing page that showcases an entire **flat design system**:
confident reduction, bold color blocking, geometric purity, and typography that
carries the whole hierarchy. **Zero box-shadows, anywhere.** No fake depth, no
vibrant gradients — interest comes from solid color, scale, and the layering of
flat shapes (the "poster" look).

Generated with Claude Fable 5 for the [claude-directory](../../README.md).

## What it demonstrates

- **Centralized design tokens** — the entire palette, the Outfit typeface, and the
  radii live in one Tailwind v4 `@theme` block (`src/index.css`). Buttons, cards,
  inputs and focus rings all compose those tokens; no hard-coded one-offs.
- **Color as structure** — sharp full-section color blocks rotate White → Blue
  hero → Fog features → **Emerald** benefits → **dark** how-it-works → Pricing →
  FAQ → **Amber** CTA → **dark** footer. Color separates sections, never lines.
- **Component kit** — every spec'd component: primary / secondary / outline buttons
  (thick `border-4` outlines that fill on hover), tinted color-block cards with
  icons in solid circles, the gray→hard-blue-border input, pill tags, and a
  dedicated "swatches & specimens" showcase section.
- **The bold factor** — large decorative geometry behind the hero, abstract
  overlapping-shape compositions, multi-color stat count-ups, a pricing tier that
  **rests larger** and scales more on hover, big multi-color numbered steps, and a
  FAQ that uses thick `border-2` rules (the one allowed divider).
- **Snappy, accessible motion** — 200ms transitions, scale + color-fill hover
  feedback, scroll reveals, and high-contrast **solid** focus rings (no glow,
  since there are no shadows to lean on). Respects `prefers-reduced-motion`.

## Stack

React 18, TypeScript, Vite 6, Tailwind CSS v4, Motion, lucide-react.

The **Outfit** typeface is self-hosted (`public/fonts/*.woff2`) so the project runs
fully offline — no font CDN.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

## Verify

Headless CLI verification asserts the design-system contract — no shadows on any
element, the exact palette tokens, the self-hosted Outfit font, every color block,
button/card/input/focus behaviours, the scaled pricing tier, the thick FAQ rules,
and the responsive mobile menu:

```bash
npm run build
npm run preview -- --port 4173 --strictPort &
npm run verify http://localhost:4173
# Use a specific browser binary if needed:
# CHROME_PATH=/path/to/chrome npm run verify http://localhost:4173
```
