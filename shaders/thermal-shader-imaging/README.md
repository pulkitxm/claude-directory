# thermal-shader-imaging

A self-contained, runnable integration of the prompt's **`ThermalEffect`** — an
Apple-style thermal-imaging shader that paints a live, pointer-reactive heat
gradient _inside a logo's alpha mask_ — into a shadcn + Tailwind + TypeScript
project. The component (a three.js renderer with a ping-pong "draw" pass for
mouse heat and a 7-stop thermal LUT) is dropped in **verbatim** under
`@/components/ui`; the page around it is the showcase the brief asks for: where
the component lives, why that folder matters, the props API, the palette, and
how to use it.

## Design

**THERMA — Thermal Imaging Bay.** The page is framed as a piece of thermographic
hardware: a deep graphite instrument with corner-bracketed viewports, faint
scanlines, a reticle crosshair, and a live **telemetry HUD** (sensor clock,
measured frame rate, a breathing "core temperature"). The chrome speaks the
component's own language — its 7-stop thermal palette (`#000000 → #073dff →
#53d5fd → #fefcdd → #ffec6a → #f9d400 → #a61904`) is surfaced as Tailwind tokens
and as a calibration ramp in the page.

The above-the-fold is the brief's exact two-up — `logo × logo` — with a flame
and a delta specimen; a **specimen tray** below repeats the _same_
`<ThermalEffect />` across an aperture, a spark, and a hex, changing only
`logoUrl`. Hold and drag any viewport to pump heat into the mask; release and it
cools back to the resting procedural wave.

## Masks (no broken remote logos)

The component reads the **alpha channel** of `logoUrl` as the stencil the heat is
painted inside. The original prompt pointed `logoUrl` at remote PNG logos; to
keep this experiment fully offline and guarantee a clean alpha channel, the
masks are **drawn on a 2D canvas at runtime** (white shape on transparent field)
and handed to the component as PNG **data URLs** (`src/lib/logo-masks.ts`). No
network, no asset files, no broken links.

## Stack

- React 18, TypeScript (strict), Vite 5
- Tailwind CSS 3 (+ `cn` helper, shadcn-style `@/` alias, `components.json`)
- [three.js](https://threejs.org/) 0.169 (the one external dependency the component needs)
- `lucide-react` for icons

## Structure (shadcn convention)

```
src/
  components/
    ui/
      thermal-shader.tsx     # the prompt's ThermalEffect, dropped in VERBATIM
    showcase-sections.tsx    # integration / why-ui / palette / props / how-to-use
    telemetry-hud.tsx        # live sensor readout (signature element)
  lib/
    logo-masks.ts            # canvas-drawn alpha masks -> PNG data URLs (offline)
    use-telemetry.ts         # rAF clock + measured FPS
    utils.ts                 # cn()
  demo.tsx                   # the prompt's two-up usage, wired into the bay
  main.tsx
  index.css                  # Tailwind + instrument chrome
scripts/
  verify.mjs                 # headless verification
```

The component lives in `@/components/ui` — the folder shadcn's `components.json`
aliases to `ui` — so the brief's own
`import { ThermalEffect } from "@/components/ui/thermal-shader"` resolves exactly
as written, with no path rewrites. `tsconfig.app.json` relaxes
`noUnusedLocals`/`noUnusedParameters` so the verbatim component (which keeps a
few forward-looking public methods it doesn't call itself) compiles unmodified.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build (strict type-check + production build)
npm run verify     # headless Playwright checks (see below)
```

## Verification

`npm run verify` builds the project, serves the production bundle with
`vite preview`, and drives headless Chromium with **software WebGL
(SwiftShader)** so it runs on a GPU-less box. Rather than fight
`preserveDrawingBuffer`, it takes real element screenshots and decodes the PNGs
itself (no deps) to inspect painted pixels. It asserts:

1. all five live `<canvas>` viewports mount with a WebGL2 context and backing pixels;
2. the hero canvas paints a non-black field…
3. …in saturated thermal-palette colors (not grayscale);
4. the procedural heat wave animates (frame N differs from frame N+1);
5. the telemetry clock renders and advances (the bay is live);
6. a pointer drag pumps heat without breaking rendering;
7. the shadcn / Tailwind / TypeScript integration story renders (install, the
   `components/ui` rationale, thermal LUT, props, how-to-use);
8. there are no unexpected console or page errors.

All 15 checks pass. The harness honors `CHROME_PATH` / a provisioned
`/opt/pw-browsers/chromium` when present, falling back to Playwright's bundled
Chromium otherwise.

## Assets

Fully self-contained and offline-capable. There are **no image files and no
remote URLs** — every logo mask is generated procedurally on a canvas at
runtime. Type falls back to `system-ui` / monospace stacks, so nothing is
fetched over the network.

## Credit

`ThermalEffect` component from the integration brief (Apple-style thermal
imaging effect, originally from [Dalim UI](https://github.com/dalim-in/dalim)),
preserved verbatim in `prompt.md`.
