# Shader Spectral Clock — SPECTRA CLOCK

A self-contained **React + TypeScript + Vite + Tailwind CSS v4** project that integrates the
provided `shader-clock.tsx` component — a raw **WebGL** spectral-field shader (an eight-iteration
cosine/sine domain warp coloured by a wavelength→RGB spectrum) with a live clock, editable location
and °C/°F toggle floating over it — and frames it as **SPECTRA CLOCK**, a shadcn-style component lab.

The live shader fills the hero stage. Over it floats a frosted clock card, a **live telemetry HUD**
that reads the shader's own per-frame state (its `iTime`, measured FPS, and the centre-pixel colour
read straight back off the GPU), plus a viewfinder reticle and a cursor crosshair. A **control deck**
promotes the four numbers the brief baked into its GLSL (`for(i<8)`, `p *= 2.0`, `p.y * 50.0`, the
`iTime` clock) to live uniforms, and a **world-preset bank** snaps the field — and the clock's city,
zone and mock temperature — to six cities at once. Below the fold is the integration story: an
anatomy walkthrough, the five integration-brief questions answered, a props API, copyable source
tabs, and the **verbatim** `demo.tsx` embedded untouched.

![demo](./demo.mp4)

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check (tsc -b) + production build
```

## Integration notes (answering the prompt)

This repo already satisfies the required stack, so no project bootstrap was needed:

- **shadcn project structure** — `components.json` is present, the `@` alias resolves to `./src`
  (configured in both `vite.config.ts` and `tsconfig`), the `cn()` helper lives in
  `src/lib/utils.ts`, and UI components live in **`src/components/ui/`**.
- **Tailwind CSS** — Tailwind **v4** via `@tailwindcss/vite`; the entry stylesheet
  `src/index.css` begins with `@import "tailwindcss";` and `@import "tw-animate-css";`.
- **TypeScript** — strict mode with project references (`tsconfig.app.json` / `tsconfig.node.json`).

If you were starting from scratch instead:

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install tailwindcss @tailwindcss/vite tw-animate-css
npx shadcn@latest init          # creates components.json + the @/ alias + src/lib/utils.ts
npm install lucide-react        # the only external dependency the lab adds
```

### Why `components/ui`

shadcn's `components.json` pins the `ui` alias to `@/components/ui`. The CLI (`npx shadcn add …`)
writes generated primitives there, and every component import in the ecosystem is written as
`@/components/ui/<name>`. Keeping this exact folder means the brief's
`import { ShaderBackground, TimeDisplay } from "@/components/ui/shader-clock"` resolves unchanged,
and any future `shadcn add` lands its files in the same place without churn. This project's default
component path **is** `src/components/ui`, so the component (`shader-clock.tsx`) and the brief's
`demo.tsx` were copied there verbatim.

### Component questions

- **Props / data** — the source component takes **no props**; `<ShaderBackground />`, `<TimeDisplay />`
  and the default `<Dashboard />` render exactly as in the brief. The integrated `ShaderBackground`
  adds optional props — `iterations`, `warpScale`, `spectralSpread`, `speed`, `paused`, `onTelemetry`,
  `onReady`, `className` — every one of which **defaults to the brief's exact baked value** (8 / 2.0 /
  50 / 1.0), so the untouched render is byte-for-byte the original.
- **State** — local only. `TimeDisplay` keeps the clock interval, the editable-city string, the
  temperature value and its °C/°F unit in `useState`. The lab lifts the four uniforms and the selected
  preset into `useState` in `App.tsx` and feeds per-frame telemetry through a `ref`. No store, context
  or provider is required.
- **Assets** — the widget itself needs **none** (colour is procedural GLSL). The brief asks to "fill
  image assets with Unsplash" and "use lucide-react for icons": the sandbox's network proxy blocks
  `images.unsplash.com` (and every image CDN) with HTTP 403, so to keep the project self-contained and
  offline-runnable the six world-preset skyline stills are **generated locally** (`scripts/gen-assets.mjs`,
  vendored to `assets/images/*.jpg`) instead of hotlinked, and all chrome icons are **lucide-react**.
  Fonts (Space Grotesk + JetBrains Mono) are vendored to `assets/fonts/*.woff2`.
- **Responsive behavior** — the canvas fills its container and resizes on `window.resize`; the clock
  is centred with `flex` and scales via `clamp()`. The control deck reflows from one to two columns,
  the preset grid from two to three, tables scroll rather than overflow, and there is no horizontal
  overflow at 390 px.
- **Best placement** — as an ambient hero / dashboard background, a "now" screen, or a login/splash
  backdrop. The canvas fills its parent, so the idiomatic use is a `relative h-screen` (or `fixed
  inset-0`) wrapper with foreground content layered on top — exactly what the default `Dashboard`
  export and the verbatim `demo.tsx` demonstrate.

## Robustness

`getContext("webgl")` is guarded; if WebGL is unavailable the lab renders an animated **CSS spectral
aurora** fallback (`data-shader-fallback`) instead of going flat black, and `onReady(false)` lets a
host react. The render loop accumulates a virtual clock (`dt * speed`) so **Freeze** and the speed
fader never snap the field, frees its GL program / shaders / buffer on unmount and cancels its rAF, so
React StrictMode's dev double-mount re-initialises cleanly. Device pixel ratio is capped at 2 so the
per-pixel eight-fold loop stays affordable on high-density screens, and `prefers-reduced-motion`
disables the page's smooth-scroll and the fallback drift.

## Verification

`scripts/verify.mjs` is a headless check (Playwright, run against a live dev server) that asserts no
console / page errors, that the WebGL canvas mounts and **paints visible spectral light** (it decodes
a screenshot region of the hero, not just `readPixels`), that the wordmark / import path / telemetry /
control deck / six preset chips / anatomy / API / install all render, that **both** canvases (hero +
verbatim drop-in demo) are present, that the **Freeze** control flips the HUD to `FROZEN`, that
switching a world preset updates the clock's location, and that the mobile layout has no horizontal
overflow. It adapts to the environment (WebGL present → asserts the canvas; absent → asserts the CSS
fallback engaged).

```bash
# from the project folder, with Playwright resolvable:
URL=http://localhost:5314/ node scripts/verify.mjs
```

The skyline preset stills are regenerated deterministically with:

```bash
node scripts/gen-assets.mjs    # writes assets/images/*.jpg
```
