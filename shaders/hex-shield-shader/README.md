# Hex Shield Shader

An animated full-screen **hex-sphere** shield — a 100-step fragment shader that
folds a mirrored hexagonal lattice onto a sphere distortion, accumulates a
glowing cyan→violet arc field, and tonemaps it with `tanh` — framed inside the
**AEGIS deflector-array diagnostics console**.

The shader is the verbatim drop-in from the integration brief
(`src/components/ui/shield-shader.tsx`, a `three` + `@react-three/fiber`
fullscreen quad), placed in the shadcn `components/ui` folder and imported
through the `@/` alias exactly as the brief expects. A typed, instrument-driven
sibling (`src/components/ui/aegis-shield.tsx`) runs the **same GLSL** but
promotes every baked constant — dome bias, curvature, hex scale, drift, edge
gain, arc gain, falloff and the arc tint — to a live uniform, adds a soft
cursor "impact" light and a freeze control, and taps the field's per-frame
state back out through an `onFrame` callback.

> The shield is a single hex sphere behind glass — move your cursor over the
> dome to light an impact point, switch deflector profiles to change its
> regime, and freeze the field to hold a frame. Every readout (shield clock,
> render rate, impact charge, integrity) is sampled straight off the GPU loop.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS (shadcn-style structure, `@/` → `src/`)
- three + @react-three/fiber (the brief's runtime deps)
- lucide-react (console icons)
- Chakra Petch / Inter / JetBrains Mono — vendored locally in `public/fonts`

Everything is self-contained and runs **offline** — no remote assets, no CDNs.
The field is 100% procedural; there are no images or textures.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
npm run verify     # headless Chromium checks (canvas, draw, faders, freeze, charge)
```

## What the console does

- **Live shield hero** — the `AegisShield` fills the viewport behind caliper
  brackets and a scanline veil. A cursor-tracked **impact reticle** rides the
  exact point the shader lights, and a bottom telemetry strip reads the shield
  clock, render FPS, impact charge and impact x·y off the GPU frame.
- **Shield Integrity gauge** — a circular gauge driven by the field's measured
  render headroom and impact load; it slides to "strained" / amber under load.
- **Field Calibration deck** — seven faders promote the shader's baked
  constants to live uniforms, plus an R/G/B **arc-tint** editor. Five
  **deflector profiles** (Standard Aegis / Breach Alert / Cold Lattice /
  Plasma Bloom / Deep Scan) snap the shield to named regimes; *Standard Aegis*
  reproduces the brief's exact constants.
- **Freeze / Resume** — halts and restarts the shield clock in place.
- **Impact scope + live readout** — a 2D dome scope plots the live impact
  point, and a readout grid mirrors the active uniform values.
- **Field Manual** — the integration story: scaffold + install, why
  `components/ui`, a props ↔ GLSL-literal table, the brief's questions answered,
  and copy-paste usage for both the verbatim drop-in and the typed sibling.

## The component

The brief's drop-in takes no props — it renders a fixed full-screen field from
`iTime` / `iResolution` only:

```tsx
// src/components/demo.tsx — exactly as pasted
import { Component } from "@/components/ui/shield-shader";

export default function DemoOne() {
  return <Component />;
}
```

The typed sibling promotes the GLSL literals to props so the deck can drive the
GPU live:

| prop        | GLSL literal   | effect                  |
| ----------- | -------------- | ----------------------- |
| `domeBias`  | `.2`           | sphere projection bias  |
| `curve`     | `.3`           | dome curvature          |
| `hexScale`  | `/ .9`         | hex cell size           |
| `drift`     | `t * .2`       | lattice drift speed     |
| `hexEdge`   | `* 1.5`        | edge anisotropy         |
| `gain`      | `/ 2e3`        | per-step arc gain       |
| `falloff`   | `i * .09`      | outward depth falloff   |
| `tint`      | `vec4(2,3,5)`  | arc colour weighting    |

```tsx
import { AegisShield } from "@/components/ui/aegis-shield";

<AegisShield
  drift={0.55}
  gain={1.35}
  tint={[6, 3.2, 1.4]}              // "Breach Alert"
  onFrame={(s) => console.log(s.fps, s.charge)}
/>;
```

## Why `components/ui`

shadcn's `components.json` resolves the `ui` alias to `components/ui`. The
pasted import is `@/components/ui/shield-shader`, so the file must live there or
the alias won't resolve, and keeping primitives in `components/ui` lets
`shadcn add` drop siblings beside it without collisions.
