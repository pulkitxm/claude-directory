# Morphing Light Shader

A faithful integration of the brief's **`MorphingLight`** React component — a
Three.js fragment shader that paints radially symmetric **morphing interference
fringes** (a pink↔cyan spectrum bent around the optical axis) on a single
full-screen quad — reframed as **FRINGE**, a *tabletop interferometer*. The
shader is the live observation window; everything around it is a calm, precise
instrument console: a left rail of **beam faders**, a **source bank**, and a
live **detector** strip that reads the shader's own per-frame state back off the
GPU.

Built with **React + TypeScript + Vite + Tailwind CSS** on the **shadcn**
project structure, exactly as the prompt requires. The component drops into
`@/components/ui/morphing-light` and is consumed verbatim — `<MorphingLight />`
with no props renders byte-for-byte the original shader.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
```

## What you can do

- **Tune the beam** — four faders (Sweep rate, Inner fringes, Outer fringes,
  Hue shift) promote the shader's baked-in constants (`2.5`, `4.0`, `8.0`, and a
  new HSV hue rotation) to live uniforms. Every default equals the value the
  original shader hard-coded.
- **Recall a source** — five named emission sources (Calibration, Sodium-D,
  Argon-Ion, Near-UV, He-Ne) each snap the field to a stored set of uniforms.
  Nudge any fader and the active source flips to **Custom**.
- **Probe the fringes** — moving the pointer over the window drives a caliper
  that reports the **fringe order** `m` at the cursor's radius from the optical
  axis, derived from the shader's own ring frequency.
- **Close the shutter** — freeze the clock without tearing down the GL context.

## How it integrates (shadcn / Tailwind / TypeScript)

This repo is already a shadcn-style TypeScript project, so the component lands in
its canonical home — **`src/components/ui/morphing-light.tsx`** — with the `@/`
alias resolving to `src/` (`components.json` + `vite.config.ts` + `tsconfig`).
The `@/components/ui` folder matters because that is the path the shadcn CLI and
the `@/components/ui/...` import in the brief's `demo.tsx` both expect; keeping it
there means the component is a true drop-in.

If you were starting from scratch:

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app && npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p
npx shadcn@latest init           # sets up components.json + @/components/ui
npm install three @types/three   # the component's only runtime dependency
```

## Design notes

- **Subject:** a tabletop interferometer. The shader literally draws concentric
  interference fringes, so the instrument frames them as something *measured*,
  not decorated — no stock photography needed.
- **Signature element:** a concentric **fringe reticle** centered on the optical
  axis — a 72-mark graticule, measurement rings, and counter-rotating sweep that
  mirror the shader's own radial symmetry.
- **Type:** Sora (technical display), Inter (body/utility), Space Mono
  (telemetry). All vendored locally (latin `woff2` in `src/fonts/`) so the
  project runs fully offline — no runtime CDN calls.
- **Telemetry is real:** clock, FPS, axis intensity and spectral cast are read
  from the live render loop via `gl.readPixels` on the center pixel.
- **`src/demo.tsx`** keeps the verbatim drop-in example from the brief.

## Assets

Fully self-contained. The visual is 100% procedural (no images), and the three
fonts are vendored locally. No remote dependencies at runtime.
