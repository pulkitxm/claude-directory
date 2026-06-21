# Grainfield — GrainGradient Corners Shader Lab (@paper-design/shaders-react + React + Tailwind CSS)

A shadcn/ui integration of the `@paper-design/shaders-react` **GrainGradient** shader painting the `corners` shape, built into a live instrument console called Grainfield. The verbatim `GradientBackground` component is preserved as a full-bleed WebGL background with all shader uniforms — shape, palette, softness, intensity, grain, scale, rotation, and speed — exposed as drivable faders, with a telemetry strip reading real FPS, clock, and frame count from the render loop. Generated with Claude Fable 5.

---

## Answering the prompt

The prompt is a component-integration brief. Here is the integration story it asks for.

### Does the codebase support shadcn / Tailwind / TypeScript?

This experiment ships them from the start, so no retrofitting was needed:

- **TypeScript** — strict mode, `tsconfig.app.json` + `tsconfig.node.json`, project references.
- **Tailwind CSS v4** — wired through the official `@tailwindcss/vite` plugin and a
  single `@import "tailwindcss"` in `src/index.css`. The shadcn design tokens are
  declared as CSS variables and surfaced to utilities via `@theme inline`.
- **shadcn project structure** — the `@/*` path alias resolves to `src/*` (in both
  `vite.config.ts` and `tsconfig.app.json`), exactly the alias shadcn's
  `components.json` writes, so the prompt's `import … from "@/components/ui/…"` works
  unchanged.

If you are starting from nothing, the **setup** tab in the app (and
`src/source-snippets.ts`) prints the from-scratch commands:

```bash
# 1 · scaffold a TypeScript + Tailwind app, then init shadcn
npm create vite@latest my-app -- --template react-ts
cd my-app
npm i -D tailwindcss @tailwindcss/vite
npx shadcn@latest init   # writes components.json -> aliases @/components
```

### Default path for components & styles — why `components/ui`

shadcn's `components.json` defines two aliases: `aliases.components` (default
`@/components`) and, nested under it, `aliases.ui` (default `@/components/ui`). The
CLI installs every primitive into **`components/ui`**, and the prompt's component
imports from `@/components/ui/paper-design-shader-background`. So the folder is not
cosmetic: it is the contract the import path and the shadcn registry both assume. If
`components/ui` does not exist, that import cannot resolve and `npx shadcn add …`
has nowhere to write — which is why creating it is the first step. This project keeps
the convention exactly:

```
src/
  components/ui/
    paper-design-shader-background.tsx   ← the prompt's verbatim GradientBackground
    grain-gradient-stage.tsx             ← parametric twin used by the lab
  lib/
    utils.ts          ← cn() / clamp() / pct()
    useTelemetry.ts    ← rAF FPS + mission-clock readout
  App.tsx              ← the GrainGradient console
  source-snippets.ts   ← copyable integration source shown in the UI
```

Styles live in `src/index.css` (the Tailwind entry + tokens + the fader/scanline CSS).

### The component, pasted verbatim

`components/ui/paper-design-shader-background.tsx` is the supplied component, exported
as `GradientBackground` with the prompt's exact props (`colorBack="hsl(0, 0%, 0%)"`,
`softness={0.76}`, `intensity={0.45}`, `noise={0}`, `shape="corners"`, `speed={1}`
and the orange/amber/pink `colors`). It is left as a faithful drop-in.

`grain-gradient-stage.tsx` is a thin **parametric twin** that renders the same
`GrainGradient` but promotes every uniform to a prop (plus a `paused` flag that forces
`speed` to 0). That is the surface the console drives — keeping the verbatim component
untouched while still exercising the full API.

---

## The integration guidelines, point by point

The prompt's guideline list is answered concretely:

- **Required dependencies** — exactly one external package,
  `@paper-design/shaders-react` (which pulls in `@paper-design/shaders`). No Three.js,
  no react-three-fiber: `GrainGradient` is a self-contained WebGL shader mount.
- **Component arguments & state** — `GrainGradient` is fully controlled; it has no
  internal state. Its props are `colorBack`, `colors` (≤ 7), `softness` (0..1),
  `intensity` (0..1), `noise` (0..1), `shape`
  (`wave·dots·truchet·corners·ripple·blob·sphere`), plus sizing (`scale`, `rotation`,
  `offsetX/Y`) and motion (`speed`). The lab holds those in a single `ShaderState`
  object and passes them straight down.
- **Context providers / hooks** — none are required by the component. The only hook
  added is the lab's own `useTelemetry`, a self-contained `requestAnimationFrame` loop.
- **Data / props passed in** — the console; nothing is fetched.
- **State management** — local `useState` is sufficient; no store needed.
- **Required assets** — **none for the shader.** `GrainGradient` is 100% procedural
  (its grain comes from a noise texture bundled inside the package), so there are no
  image slots to fill. The guideline's "fill image assets with Unsplash" step does not
  apply here — there is no `<img>` in the component. The only vendored assets are the
  **Geist Sans / Geist Mono** woff2 files under `assets/fonts/`, served locally so the
  project runs fully offline.
- **lucide-react icons** — used throughout the chrome (shape glyphs, fader icons,
  freeze/play, copy/check) per the guideline.
- **Responsive behaviour** — the shader fills the viewport at any size; the hero text
  scales `text-4xl → text-6xl`; the left shape/palette rail appears at `lg`, the right
  control deck at `md`, and the telemetry strip drops columns progressively on small
  screens. A **Focus** toggle hides all chrome to show the bare background.
- **Best place to use it** — behind any above-the-fold hero or full-screen section, as
  the prompt's `DemoOne` shows. The **usage** tab reproduces that exact placement.

---

## What's in the lab

- **Live GrainGradient stage** — the shader as a full-bleed, `-z-10` background, with
  the prompt's `bg-black/20` dimming layer kept on top.
- **Shape selector** — all seven `u_shape` modes; `corners` (the prompt default) is
  selected on load.
- **Palettes** — five named colour profiles (`Ember` is the verbatim default, plus
  `Abyss`, `Spring`, `Mono`, `Candy`), each a `colorBack` + up to three `colors`.
- **Uniforms deck** — faders for softness, intensity, grain (`noise`), scale, rotation
  and speed, wired straight to the shader; a **Reset** restores the prompt's defaults.
- **Freeze / Resume** — forces `speed` to 0 and flips the telemetry flag to `FROZEN`.
- **Integration tabs** — copyable source for the verbatim component, the prompt's usage,
  the parametric twin, and the shadcn setup, plus the one-line install command.
- **Telemetry strip** — live FPS, mission clock, current shape/palette, soft·int, grain
  and frame count, sampled off a `requestAnimationFrame` loop.

---

## Run it

```bash
npm install
npm run dev       # vite dev server
npm run build     # tsc -b && vite build
npm run verify    # headless Chromium WebGL render check (see below)
```

Install the single external dependency on its own with:

```bash
npm i @paper-design/shaders-react
```

---

## Verification

`npm run verify` boots the dev server and drives a headless Chromium (WebGL forced on
via SwiftShader so the shader compiles without a GPU). It asserts:

- the root mounts and the preserved **"Backgrounds are awesome :)"** hero + `GRAINFIELD`
  wordmark render;
- the `GrainGradient` produces a live, non-empty `<canvas>` with a real WebGL context;
- switching **shape** (`corners → blob`) keeps a live canvas;
- switching **palette** (`Ember → Abyss`) keeps a live canvas;
- the speed fader sweeps its readout `0.00 → 3.00`;
- **Freeze** flips the telemetry flag to `FROZEN`;
- no uncaught page errors and no console errors fire along the way.

All ten checks pass. The walkthrough in `demo.mp4` was recorded with the repo's
`scripts/record-demos` recorder.

---

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · `@paper-design/shaders-react`
(GrainGradient) · shadcn structure · lucide-react. Geist fonts vendored locally.

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
