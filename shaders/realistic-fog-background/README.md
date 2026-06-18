# HAAR — Realistic Fog Background

A shadcn-style integration of the prompt's **realistic-fog-background** component — a
WebGL fragment-shader fog (six octaves of domain-warped fBm noise on a single full-screen
quad, with a cursor "lighthouse beam" glow) — dropped into `@/components/ui` and framed as
a **sea-fog observation instrument**.

> *haar* — the cold sea fog that rolls in off the North Sea.

## What's here

- **`src/components/ui/demo.tsx`** — the verbatim `MistBackground`, untouched. Mount it and
  the fog runs, fixed and full-viewport at `z-[-1]`, with zero runtime dependencies.
- **`src/components/ui/realistic-fog-background.tsx`** — the verbatim `Component` example from
  the brief.
- **`src/components/ui/mist-field.tsx`** — a parameterized variant of the same shader: every
  baked constant (density, drift, octaves, warp, accent, beam, exposure) is promoted to a live
  uniform, and the render loop reads a 48×48 centre block back with `gl.readPixels` for telemetry.

## The signature

A **visibility gauge** — a transmissometer dial reading runway visual range in metres. It is
driven by the *actual* mean luminance the shader paints, sampled straight off the framebuffer,
so thicker fog genuinely drops the reported range and the cursor beam sweeps the needle toward
the dense (amber hazard) end as it lights the fog up close.

The control deck promotes the shader's constants to faders and ships a five-patch bank — **Sea
Haar** (the verbatim default), **Pea Souper**, **Dry Ice**, **Moor Drift**, **Clear Dawn** — that
spans the gauge from MIST through FOG to THICK FOG.

## Stack

React · TypeScript · Vite · Tailwind CSS v4 · shadcn/ui structure · WebGL · GLSL fBm · Lucide.
Fonts (Anton, Inter, Space Mono) are vendored locally in `public/fonts`. The fog is fully
procedural — no image assets.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run verify   # headless Playwright checks (needs a running dev server on $URL)
```

Part of the [claude-directory](../../README.md).
