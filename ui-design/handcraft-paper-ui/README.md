# Handcraft — Hand-Drawn Paper UI Landing Page for Scribbly (React, TypeScript, Tailwind CSS v4, Kalam, Patrick Hand)

A complete landing page that fully expresses the Hand-Drawn design system through the fictional whiteboard product "Scribbly" — every container, button, card, and frame rejects geometric perfection in favour of wobbly irregular border-radii, hard cut-paper offset shadows (zero blur), warm paper-grain radial-gradient texture, and exclusively handwritten type (Kalam for headings, Patrick Hand for body). Composable primitives in `src/components/primitives.tsx` cover `Button`, `Card` (with tape and tack decorations and a post-it variant), `Input`, `Textarea`, `StickyTag`, `IconCircle`, `AvatarStack`, and a set of hand-drawn SVG scribbles including `ScribbleArrow`, `SquigglyLine`, `CornerFrames`, `Tape`, `Tack`, and `WavyDivider`. The full landing page includes a sticky wobbly-pill nav, two-column hero with a fully hand-drawn whiteboard sketch, doodled logo strip, organic blob count-up stats, a six-card feature grid, squiggly-connected how-it-works steps, a drop-cap product detail, scaled "most loved" pricing tier ringed by a dashed circle, speech-bubble testimonials with geometric tails, and a lift-on-hover blog grid. Generated with Claude Fable 5.

## What's inside

- **Centralized tokens** — the entire palette (warm paper, soft pencil black,
  old-paper muted, correction-marker red, ballpoint blue, post-it yellow), the
  two handwritten fonts, the hard-offset shadow scale, and the reusable wobbly
  radii live in `src/index.css` (`@theme`) and `src/lib/tokens.ts`. No one-off
  colors or magic numbers in the components.
- **Composable primitives** (`src/components/primitives.tsx`) — `Button`,
  `LinkButton`, `Card` (with `tape` / `tack` decorations + post-it variant),
  `Input`, `Textarea`, `StickyTag`, `IconCircle`, `AvatarStack`, and the
  hand-drawn SVG scribbles (`ScribbleArrow`, `SquigglyLine`, `CornerFrames`,
  `Tape`, `Tack`, `WavyDivider`).
- **Full landing page** — sticky wobbly-pill nav with a mobile sticky-note
  sheet, a two-column hero with a fully hand-drawn whiteboard sketch, a doodled
  logo strip, organic-blob count-up stats, a six-card feature grid, a
  squiggly-connected "how it works", a drop-cap product detail, a scaled
  "most loved" pricing tier ringed by a dashed circle, speech-bubble
  testimonials with geometric tails, a lift-on-hover blog grid, an email-capture
  CTA, and a footer with wavy-underline headers and line-through hover links.

## Design-system signatures

- **No straight lines** — irregular elliptical `border-radius` everywhere
  (e.g. `255px 15px 225px 15px / 15px 225px 15px 255px`), never plain `rounded-*`.
- **Hard offset shadows** — solid `4px 4px 0 #2d2d2d` cut-paper shadows that
  reduce on hover and vanish on `:active` so buttons "press flat". No blur.
- **Paper texture** — `radial-gradient` dot grain fixed on the body background.
- **Handwritten type** — Kalam (marker headings) + Patrick Hand (body), both
  self-hosted and vendored as `.woff2` in `public/fonts` (fully offline).
- **Scribbled decoration** — dashed arrows, squiggly connectors, tape strips,
  thumbtacks, corner frame marks, sticky-note tags, and a rotating hero `!`.
- **Playful motion** — `transition-transform duration-100` snappy jiggles,
  gentle 3s bobbing decorations, and a `prefers-reduced-motion` fallback that
  freezes the loops.

## Stack

React 18, TypeScript, Vite 6, Tailwind CSS v4, Lucide icons. No runtime CSS
framework beyond Tailwind; all hand-drawn graphics are inline SVG.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc --noEmit && vite build
npm run preview    # serve the production build on :4173
```

## Verify (headless, CLI-only)

```bash
npm run build
npm run preview -- --port 4173 --strictPort &   # serve the build
npm run verify                                   # asserts the design contract
```

`scripts/verify.mjs` drives headless Chromium (Playwright) and asserts the
design-system contract programmatically: the exact token palette resolves, the
self-hosted handwritten fonts load and render, **every** shadow on the page is a
hard offset with zero blur, borders are wobbly, the paper grain is present, all
sections exist, the button/input/form states behave, the popular pricing tier
rests scaled, the stat count-ups reach their targets, and the layout collapses
correctly on mobile — with no console errors. All 45 checks pass.

## Assets

All assets are vendored locally for a self-contained, offline-runnable project:
the Kalam and Patrick Hand font subsets (`public/fonts/*.woff2`, downloaded from
Google Fonts) and the favicon. Every illustration — the hero whiteboard, doodle
avatars, arrows, and connectors — is inline SVG, so there are no remote
dependencies.

---

Part of the [UI design](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
