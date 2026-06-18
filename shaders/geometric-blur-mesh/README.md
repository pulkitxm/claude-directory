# Geometric Blur Mesh

An interactive WebGL wireframe shader — eight rotating geometric solids drawn as
analytically-blurred line segments, where **moving the cursor defocuses the
specimen instead of sharpening it**. Integrated as a shadcn `@/components/ui`
component and framed as an **optical geometry bench** called the *Polyhedral
Scope*.

The shader component from the prompt is integrated **verbatim** (vertex/fragment
GLSL, the eight-solid `drawWireframe` switch, the inverted blur-on-hover falloff,
mouse damping, resize and cleanup) at `src/components/ui/geometric-blur-mesh.tsx`
— the canonical shadcn `@/components/ui` location — and wired straight through by
`src/components/demo.tsx`, exactly as the prompt's `demo.tsx` specifies.

The app itself mounts that same shader through a thin instrumented wrapper
(`src/components/ScopeShader.tsx`, which recompiles the identical exported shader
sources) so the surrounding chrome can read and drive the interaction:

- **Specimen stage** — the wireframe fills the viewport on pure black. The
  defining behaviour is inverted optics: the nearer the cursor sits to the solid
  at centre, the **blurrier** the edges become (`blur = mix(0.0001, 0.05,
  mouseInfluence)` in the GLSL).
- **Focusing reticle (signature cursor)** — the OS pointer is hidden and
  replaced by a crosshair that itself *loses focus* — rotating and swelling — the
  more it defocuses the specimen, so the cause of the blur is visible on screen.
- **Defocus dial (signature readout)** — a ring bottom-right fills from 0–100%
  using the exact aspect-correct `smoothstep(0, 0.5, dist)` falloff the fragment
  shader uses for blur, so the instrument reading tracks the GPU 1:1.
- **Specimen registry** — the eight solids (Cube, Tetrahedron, Octahedron,
  Icosahedron, Pyramid, Diamond, Hexagonal Prism, Morphing) as a clickable list
  with real vertex/edge counts; the active row is mirrored from the shader.
- **Autopilot** — on load a virtual cursor sweeps across the specimen and cycles
  the solids on a timer, so the cursor-defocus choreography is legible
  immediately. The first real pointer move, click or number key hands control
  back to you.
- **Controls** — move to defocus · click anywhere to cycle · number keys `1`–`8`
  jump straight to a solid (the prompt's full interaction contract).

Palette and type stay cool and analytical on purpose — the cold blue-white light
comes entirely from the wireframe. Type pairing: Fraunces (display) · Space
Grotesk (body) · Space Mono (data). Icons from `lucide-react`. The entrance
reveal and hairline pulse respect `prefers-reduced-motion`.

## Stack

React 18, TypeScript, Vite 5, Tailwind CSS v3 (PostCSS), `lucide-react`, raw
WebGL (no Three.js). shadcn-style `@/*` path alias → `./src` (configured in both
`vite.config.ts` and `tsconfig`).

## Assets

Fully self-contained / offline-ready. The Fraunces, Space Grotesk and Space Mono
web fonts (latin subset) are vendored locally to `public/fonts/` and referenced
from `src/index.css` — no remote font requests at runtime. The visual is
generated entirely on the GPU, so there are no image assets (no Unsplash imagery
is needed for this component).

## Run

```bash
npm install
npm run dev       # dev server
npm run build     # type-check + production build
npm run preview   # serve the production build on :4173
npm run verify    # headless Playwright checks against the preview server
```

## Integration notes (per the prompt)

- **Project structure** — this is a Vite + React + TypeScript app with Tailwind
  CSS and the shadcn `@/components/ui` convention already wired up. To drop the
  component into your own app instead, scaffold with the shadcn CLI
  (`npx shadcn@latest init`), which sets up Tailwind, TypeScript and the
  `components.json` alias map for you.
- **Why `/components/ui`** — shadcn treats `components/ui` as the home for
  primitive, copy-in UI building blocks resolved through the `@/components/ui`
  alias. Keeping the shader there means the prompt's import
  (`@/components/ui/geometric-blur-mesh`) resolves unchanged and the component
  sits alongside the rest of your design-system primitives.
- **Props / state** — the verbatim `GeometricBlurMesh` takes **no props**; it
  owns its current-shape state internally and cycles on click / number keys. The
  bench lifts that interaction model up (the registry and keys drive shape,
  the per-frame cursor sample drives the telemetry) without changing the shader.
- **Dependencies** — the shader needs nothing beyond React (raw WebGL);
  `lucide-react` supplies the bench icons.
- **Images** — none. The procedural wireframe is the entire visual.
- **The one integration change** — the verbatim paste began with
  `import React, { ... }`; under Vite's automatic JSX runtime with
  `noUnusedLocals` the default `React` binding is unused and fails the strict
  build, so it was dropped. Every hook and both shader sources are otherwise
  byte-for-byte intact.
- **The reference demo** — the prompt's `demo.tsx` (`<Component />`) is preserved
  as `src/components/demo.tsx` as a known-good copy-paste starting point; the
  polished Polyhedral Scope in `src/App.tsx` is what the app renders.
