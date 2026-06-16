# Northwind — Corporate Trust Design System

A complete, production-quality landing experience that fully expresses the
**"Corporate Trust"** design system: the modern enterprise-SaaS aesthetic —
professional yet approachable, sophisticated yet friendly. It rejects the cold
formality of traditional corporate sites for a warm, confident presence built on
**indigo → violet gradients, colored (blue/violet-tinted) shadows, isometric 3D
depth, and refined motion**.

Northwind is a fictional operations / workflow platform — the brand exists purely
to give the system a real personality to dress.

Generated with Claude Fable 5 for the [claude-directory](../../README.md).

## What it demonstrates

- **Centralized design tokens** — the full indigo/violet/slate palette, the
  self-hosted Plus Jakarta Sans typeface, radii, and the signature *colored*
  shadows all live in one Tailwind v4 `@theme` block (`src/index.css`). Every
  button, card, input, eyebrow and focus ring composes those tokens via
  `@layer components` / `@utility` — no component hard-codes a raw hex, shadow,
  or gradient.
- **The visual DNA, verified** — colored shadows (`rgba(79,70,229,…)`, never
  neutral gray), `bg-clip-text` gradient headlines, large blurred gradient blobs
  for atmospheric depth, and elevated white cards that lift on hover.
- **Isometric depth & 3D transforms** — the hero dashboard sits in a
  `perspective` scene with a `rotateX/rotateY` resting tilt that eases toward the
  viewer on hover; the zig-zag deep-dives ride tilted gradient slabs; feature
  cards take a subtle `rotateY` on hover.
- **Every spec'd section** — sticky glass navbar with a mobile drawer, a
  two-column hero with floating accent cards, a marquee trust strip, a 3-up
  feature grid, alternating zig-zag deep-dives, a dark count-up stats band,
  three glowing numbered steps, testimonials, a 3-tier pricing block whose
  center tier **rests larger** (`md:scale-105`) with gradient ring, a
  `details/summary` FAQ accordion, a dramatic dark `indigo-900 → indigo-950`
  final CTA with a working email capture, and a 4-column footer.
- **Refined, accessible motion** — `whileInView` fade-up reveals on a single
  shared easing, count-ups that fire on scroll, micro-interactions (arrow
  nudges, chevron rotation, image/icon scale), a single `<h1>`, a skip link,
  always-visible focus rings, and a full `prefers-reduced-motion` fallback.

## Stack

React 18, TypeScript, Vite 6, Tailwind CSS v4, Motion, lucide-react.

The **Plus Jakarta Sans** typeface is self-hosted (`public/fonts/*.woff2`) so the
project runs fully offline — no font CDN.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

## Verify

Headless CLI verification (`scripts/verify.mjs`, 47 assertions) checks the
design-system contract against a running server: the self-hosted font, the exact
token palette, the **colored-shadow signature**, gradient text, the isometric 3D
hero transform, card hover lift, the glowing step badges, the scaled popular
pricing tier, input focus rings, the FAQ accordion, the working CTA form, stat
count-ups, accessibility hygiene, and responsive behavior — all with zero console
errors.

```bash
npm run build
npm run preview -- --port 4173 --strictPort &
npm run verify http://localhost:4173
# Use a specific browser binary if needed:
# CHROME_PATH=/path/to/chrome npm run verify http://localhost:4173
```
