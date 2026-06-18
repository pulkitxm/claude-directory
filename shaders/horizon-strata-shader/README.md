# STRATA — Horizon Field Scanner

The prompt's `lab.tsx` WebGL2 component — a single fullscreen fragment-shader pass
that ray-marches forward through space folded into repeating **horizon strata**
(`p.y = abs(mod(d - 2.0, 4.0) - 2.0)`) over a cosine-tube ground plane
(`length(cos(p.xz)) - 0.4`), flown toward the vanishing point (`p.z -= t`) and
tone-mapped with `tanh`. It is integrated at the canonical shadcn
`@/components/ui` location and framed as a deep-field **stratigraphy scanner**.

The component is preserved faithfully at `src/components/ui/lab.tsx` — the GLSL
(`SHADER_SRC` / `VERT_SRC`), the fullscreen-triangle vertex buffer, the uniform
wiring (`iResolution` / `iTime` / `iFrame` / `iMouse`), the mouse handlers, the
`ResizeObserver`, the `requestAnimationFrame` loop and the full WebGL teardown are
byte-for-byte the brief's original. The only changes to the paste are **additive,
opt-in props** that never touch the draw path:

- `paused` — freezes the march clock so the strata corridor holds its current frame;
- `onSample` — fires ~2×/second with the shader's own `iTime` / `iFrame` / fps so
  the host page can drive telemetry without re-reading the GPU;
- `fill` — lets the canvas fill its parent (`100%/100%`) instead of the original
  `100vw/100vh`, so it can be framed inside the lab.

With no props (`<Component />`, exactly the brief's `demo.tsx`) it behaves
identically to the original fixed-background paste.

The chrome reads the field as a survey instrument:

- **Right-edge stratigraphy gauge (signature element)** — a fixed tick ladder
  whose cyan reticle rides the fractional part of the strata count, so it
  physically tracks the shader's marching cadence (one full sweep per horizon band,
  `layers = depth / 4` matching the GLSL `mod(…, 4.0)` fold) rather than running a
  decorative timer.
- **Chromatic-split wordmark** — `STRATA` set in Space Grotesk with a cyan/amber
  separation that echoes the shader's own luminance banding.
- **Live layer readout + telemetry rail** — a floating panel counts strata crossed,
  and the bottom bar reports the shader's real per-frame state sampled off the GPU
  loop (field depth, frame counter, smoothed render FPS) alongside the static pass
  facts (`GLSL · 30 STEPS`, `TANH · /400`).
- **Hold / Resume control** — drives the component's `paused` prop directly,
  freezing and resuming the field (gauge, layer count and telemetry stay in sync).

A horizon vignette, faint CRT scanlines and a slow scan-sweep bar read the whole
thing as a deep-field survey display. A **CSS-strata fallback** renders banded
horizon lines if WebGL2 is unavailable, so the page never goes blank. All entrance
reveals and the sweep respect `prefers-reduced-motion`.

## Stack

React 18, TypeScript, Vite 5, Tailwind CSS v3, raw WebGL2 (no Three.js),
`lucide-react`. shadcn-style `@/*` path alias → `./src`.

## Assets

Fully self-contained / offline-ready. The Space Grotesk, Inter and JetBrains Mono
web fonts are vendored locally to `public/fonts/` (Latin subsets) and referenced
from `src/index.css` — no remote font requests at runtime. The visual is generated
entirely on the GPU, so there are no image assets.

## Run

```bash
npm install
npm run dev       # dev server
npm run build     # type-check + production build
npm run preview   # serve the production build
```

## Integration notes (answering the prompt)

- **Project structure** — this is a Vite + React + TypeScript app with Tailwind
  CSS and the shadcn `@/components/ui` convention already wired up (the `@` alias
  is configured in both `vite.config.ts` and `tsconfig.json`, and `components.json`
  records the alias map). To drop the component into your own app instead, scaffold
  with the shadcn CLI: `npx shadcn@latest init` (it installs/wires Tailwind,
  TypeScript and the alias map for you); if you are starting from scratch,
  `npm create vite@latest my-app -- --template react-ts` first, then run the shadcn
  init.
- **Why `/components/ui`** — shadcn treats `components/ui` as the home for
  primitive, copy-in UI building blocks resolved through the `@/components/ui`
  alias. The brief's own `demo.tsx` imports from `@/components/ui/lab`, so placing
  the file there is what makes that import resolve unchanged; it also keeps the
  shader alongside the rest of your design-system primitives. If your default
  components path is not `components/ui`, create it (and point the `ui` alias at
  it) so copy-in components and their documented imports line up across projects.
- **Dependencies** — the shader component needs nothing beyond React; it talks to
  WebGL2 directly. `lucide-react` is used only by the surrounding scanner UI for
  icons. No context providers or custom hooks are required.
- **Props / state** — the original component took no props and is preserved that
  way by default. The added `paused`, `onSample` and `fill` props are optional and
  additive; the host (`App.tsx`) keeps `paused` in React state and derives depth /
  layer / fps readouts from the `onSample` payload.
- **Images** — none. The procedural shader is the entire visual, so no Unsplash
  stock imagery is needed (the prompt's "fill image assets" step does not apply to
  a fully procedural GPU visual).
- **Responsive behaviour** — the canvas fills the viewport at any size and
  re-resolves to device pixels via `ResizeObserver` + DPR clamp. The gauge and the
  layer panel are hidden below the `sm` breakpoint; the centered lockup and
  telemetry rails reflow down to mobile.
- **Best place to use it** — as a full-bleed hero / landing background, a loading
  or "system online" backdrop, or a section divider where a living, depth-marching
  texture is wanted behind foreground content.
