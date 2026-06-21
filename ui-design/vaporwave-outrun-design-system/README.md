# NEONWAVE OS — Vaporwave / Outrun Design System Landing Page (React + Vite + Tailwind CSS v4)

A complete, polished landing page that fully expresses a **Vaporwave / Outrun design system**: digital nostalgia meets neon future. Hot magenta, electric cyan, and a sunset gradient pierce an infinite perspective grid under CRT scanlines — nothing is subtle, every element glows, skews, or pulses. The whole page reads like commanding a vintage terminal from the year 2088. Generated with Claude Fable 5.

## What it demonstrates

- **Centralized design tokens** — the entire neon palette, the Orbitron / Share
  Tech Mono typefaces, radii and the glow/skew/window component classes all live
  in one place (`src/index.css`: a Tailwind v4 `@theme` block plus `@layer`
  component tokens). Every section composes those tokens — no hard-coded one-offs.
- **Composable primitives** — `src/components/primitives.tsx` ships the reusable
  kit: skewed `Button`/`ButtonLink` (primary / secondary / outline / ghost), the
  dual-border `Card`, the terminal `Window` + file-explorer `Explorer` chrome, the
  glowing terminal `Field`, the rotating `Diamond` icon, the `Eyebrow` badge, and a
  scroll `Reveal`. Pages are assembled, never restyled.
- **The full system, every section** — a typing-terminal hero with gradient
  headline, an infinite logo marquee, a 6-module feature grid, a count-up telemetry
  band, an alternating-checkpoint "boot sequence" timeline, an interactive
  file-explorer benefits browser, IRC-style `<username>` testimonials, a 3-tier
  pricing table with a scaled "most loaded" tier, a `<Plus>`-rotating FAQ accordion,
  a final glowing CTA with terminal input, and a multi-column footer.
- **The bold factor** — all eleven mandated signatures: `-skew-x-12` buttons that
  un-skew on hover, a global CRT scanline + RGB chromatic-aberration overlay, a
  fixed receding perspective grid floor, gradient text fills clipped to headlines,
  `rotate-45 → 90` diamond icon containers, dual cyan/magenta neon-tube borders,
  vintage window chrome with colored dots, a 600px blurred sun, IRC chat
  formatting, an alternating timeline, and 2–3× glow amplification on hover.
- **Snappy, accessible motion** — `200ms linear` transitions (no organic curves),
  un-skew + color-invert + glow on hover, cards lift, a blinking terminal cursor.
  Semantic landmarks, a skip link, `aria-expanded`/`aria-pressed`, focus-visible
  rings, and a `prefers-reduced-motion` fallback that stills the scanlines, marquee
  and pulses.

## Stack

React 18, TypeScript, Vite 6, Tailwind CSS v4, Motion, lucide-react.

The **Orbitron** (variable, 400–900) and **Share Tech Mono** typefaces are
self-hosted (`public/fonts/*.woff2`) so the project runs fully offline — no font
CDN, no remote assets.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

## Verify

Headless CLI verification asserts the design-system contract — the self-hosted
Orbitron / Share Tech Mono fonts, the exact neon palette tokens, the void
background, the fixed grid floor / blurred sun / CRT scanline layers at their right
z-indices, `rounded-none` geometry, buttons that un-skew and glow on hover, the
cyan-glow card titles, the rotating diamond, every section, the interactive
file-explorer, the scaled pricing tier, the FAQ accordion, the glowing terminal
input, the CTA confirmation, the count-up stats, the IRC testimonials, and the
responsive mobile menu:

```bash
npm run build
npm run preview -- --port 4173 --strictPort &
npm run verify http://localhost:4173
# Use a specific browser binary if needed:
# CHROME_PATH=/path/to/chrome npm run verify http://localhost:4173
```

---

Part of the [UI design](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
