# Simplex Dither Bench — Bayer Ordered-Dithering Shader Instrument (WebGL2 + React 18 + TypeScript + Tailwind CSS v4)

[![Watch Demo](./poster.jpg)](./demo.mp4)

An integration of `dithering-shader.tsx` into a shadcn-style, Tailwind CSS v4, TypeScript Vite project, framed as a darkroom / pre-press halftone instrument: **Simplex · Dither Bench**. The shader is the hero — a continuous field (ripple, simplex, swirl, and more) crushed through a Bayer ordered-dithering matrix into two tones of ink entirely on the GPU using raw WebGL2 (GLSL ES 3.00), with no textures or images. The brief's `demo.tsx` is full-bleed behind a centred "Simplex" lockup, surrounded by a live Bayer threshold-matrix panel, a control rail wired to the uniforms, and a telemetry HUD (FPS, shader clock, cell size, drawing-buffer resolution) fed off the render loop. Generated with Claude Fable 5.

## Stack

- React 18 + TypeScript + Vite 5
- Tailwind CSS **v4** via `@tailwindcss/vite` (+ `tw-animate-css`), tokens in `@theme`
- `lucide-react` icons, shadcn-style `cn()` + `@/` alias + `components.json`
- Raw **WebGL2 (GLSL ES 3.00)** — no Three.js, no shader libraries
- Self-hosted Space Grotesk / Inter / Space Mono (latin `woff2`, vendored locally)

## Project layout (the integration target)

```
src/
  components/ui/dithering-shader.tsx   ← the prompt's dependency component (typed, controllable)
  components/ui/simplex.tsx            ← the prompt's component + demo.tsx, realized verbatim
  components/Slider.tsx                ← lab-instrument slider used by the rail
  components/ThresholdMatrix.tsx       ← the live Bayer threshold-matrix panel
  lib/utils.ts                         ← shadcn cn() helper
  fonts/                               ← self-hosted woff2 + fonts.css
  index.css                            ← Tailwind v4 + design tokens + reveal keyframes
  App.tsx                              ← the Simplex dither-bench surface
```

## Integrating the component (answering the prompt)

This repo already supports the three requirements, so no scaffolding was needed:

- **shadcn structure** — `components.json` + the `@/` alias resolve `@/components/ui/*`.
- **Tailwind** — Tailwind v4 is wired through the Vite plugin; `src/index.css` opens
  with `@import "tailwindcss"`.
- **TypeScript** — strict TS throughout; `npm run build` runs `tsc` first.

**Default paths.** Components live under `src/components/ui` (aliased `@/components/ui`
in `components.json`); styles live in `src/index.css`. Both `simplex.tsx` and its
`dithering-shader` dependency are dropped into `components/ui` exactly as the brief asks.

**Why `components/ui`?** shadcn treats `components/ui/` as the home for primitive,
copy-in components that you own and edit (as opposed to app-specific composition in
`components/`). Keeping the shader there means the `@/components/ui/dithering-shader`
import in `demo.tsx` resolves with zero config and the component stays a reusable
primitive you can drop into any shadcn app.

Answers to the prompt's integration questions:

- **Props/data** — none are required (it self-renders with the brief's preset). The
  component is fully controllable: `shape`, `type`, `colorBack`, `colorFront`, `pxSize`,
  `speed`, plus `fill` (`"fixed"` | `"window"`), `paused`, and an `onTelemetry` callback.
- **State** — local `useState` only; no context or store needed. `App.tsx` lifts the
  controls into its own state and reads telemetry via the callback (kept out of React
  state, written to DOM refs, so the tree doesn't re-render 60×/sec).
- **Assets** — the prompt mentions Unsplash, but this component renders **entirely on the
  GPU** and has **no image assets**, so none were added. The only vendored assets are the
  three self-hosted fonts; icons come from `lucide-react`.
- **Responsive** — single non-scrolling viewport at every width; the canvas is DPR-aware
  (capped at 2×) and resizes with its parent; the rail / matrix / HUD reflow on mobile.
- **Best placement** — as a full-bleed background / hero behind UI chrome, which is
  exactly how `App.tsx` uses it (and what `demo.tsx` demonstrates).

## Run

```bash
npm install
npm run dev
```

## Verify (CLI only)

```bash
npm run build
npm run preview &   # serves dist on :4173
npm run verify      # headless Playwright: WebGL paint + palette, HUD ticks, pause freeze,
                    # matrix/field swaps, reset-to-brief, no-scroll, vendored fonts, mobile
```

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
