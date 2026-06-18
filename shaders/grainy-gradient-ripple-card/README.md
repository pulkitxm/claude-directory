# Grainy Gradient Ripple Card

A faithful integration of the prompt's `gradient-shader-card` component — a
**grainy, multi-stop gradient** rendered on a single Three.js quad with
**React Three Fiber**, that ripples where you tap it — dropped into a distinctive
**Chroma Foundry** pigment-lab console. The card is the live specimen plate;
everything around it (a left **instrument rail** with a pigment-stop reference, a
field-control deck, a named **patch bank**, and a **telemetry** strip) is a calm,
opinionated surface that drives the shader's uniforms and reads its per-frame
state back out.

Built with **React + TypeScript + Vite + Tailwind CSS** on the **shadcn**
project structure, exactly as the brief requires. The component drops into
`@/components/ui/gradient-shader-card` and is consumed verbatim (the brief's own
`demo.tsx` is preserved alongside it at `@/components/ui/demo`).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run verify   # headless WebGL + interaction checks (see below)
```

## What you can do

- **Tune the field** — five faders (Grain, Grain Scale, Grain Drift, Warp, Flow)
  map straight onto the shader's baked `noise*` / `waveNoise*` uniforms and
  retune the gradient live. Flow scales the three internal wave-speed uniforms in
  the proportion they ship with.
- **Recall a patch** — five named regimes (Foundry, Silk, Marble, Static, Tide)
  each snap the whole field to a stored uniform set. Move any fader and the
  active patch flips to **Custom**.
- **Cast ripples** — click (or focus + Enter) the plate to send a clean expanding
  ring through the pigment, exactly as the brief's `ripples` prop drives the
  shader. A tactile DOM ring marks each origin, and the **telemetry** strip
  counts live + total ripples straight off the shader loop.
- **Read the palette** — the rail renders the exact 7 hex stops the shader's
  `multiColorGradient` mixes, as a continuous bar plus labelled chips.

## Design notes

- **Subject:** an imaginary *pigment foundry* — a bench for mixing a pourable
  gradient. The shader *is* the hero; no stock photography is needed (the brief's
  "fill image assets with Unsplash" step doesn't apply — this component renders
  its own imagery procedurally).
- **Type:** Fraunces (optical-size display serif), Inter (body/utility),
  JetBrains Mono (telemetry/data). All three are **vendored locally** (latin
  woff2 in `src/fonts/`) so the project runs fully offline — no runtime CDN
  calls.
- **Signature element:** the plate is framed as something *under analysis* —
  corner reticle brackets, a registration grid, and a `Telemetry` strip whose
  FPS + clock run on the same `requestAnimationFrame` loop the shader animates
  on (the clock is sampled from the component's imperative handle), so the
  numbers move with the gradient rather than being faked.
- **Palette:** warm foundry paper (`#f6f2ea`) and espresso ink (`#1c1812`) with
  accents (ember `#fc681e`, cobalt `#0d5df4`) lifted straight from the shader's
  own gradient stops.
- **Icons:** [lucide-react](https://lucide.dev) (`FlaskConical`, `Droplets`,
  `Crosshair`, `MousePointerClick`), per the brief's "use lucide-react for svgs"
  step.
- Responsive (the rail stacks above the plate on small screens, and the plate
  scales to fit the fold), respects `prefers-reduced-motion` (the auto-ripple
  demonstrator pauses), and keeps visible keyboard focus on every control.

## How it was verified

`npm run verify` boots the dev server and drives a headless Chromium
(CLI-only — no GUI) to assert that:

1. the R3F `<canvas>` mounts and is sized,
2. the WebGL frame paints the multi-stop gradient (dozens of distinct colour
   buckets, ~100 % non-black) rather than a blank/solid frame,
3. clicking the plate casts a ripple (DOM markers appear, telemetry "ripples
   live" rises),
4. a fader mutates the live shader uniform (`noiseIntensity` 1.55 → 2.80),
5. the palette / preset / telemetry chrome is present, with no runtime errors.

All checks pass (9/9).

---

# Integration guide (answering the prompt)

The prompt is a shadcn-style *"integrate this component"* brief. Here are the
answers it asks for.

## 1. Project prerequisites (shadcn + Tailwind + TypeScript)

This project already ships the required stack. To drop the component into a
**fresh** app instead, set the stack up first:

```bash
# 1. Scaffold a Vite + React + TypeScript app
npm create vite@latest my-app -- --template react-ts
cd my-app

# 2. Install + initialise Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
# → set content: ["./index.html", "./src/**/*.{ts,tsx}"] in tailwind.config.js
# → add @tailwind base/components/utilities to src/index.css

# 3. Initialise shadcn (writes components.json + the @ alias + lib/utils)
npx shadcn@latest init
```

`shadcn init` is what establishes the **default component path**. With the
aliases below, components resolve to **`@/components/ui`**:

```jsonc
// components.json
"aliases": {
  "components": "@/components",
  "ui": "@/components/ui",
  "utils": "@/lib/utils"
}
```

The `@` alias must also be declared in `tsconfig.json` (`paths`) and
`vite.config.ts` (`resolve.alias`) — both are wired up in this repo.

## 2. Why the component goes in `/components/ui`

shadcn's convention is that **primitive, reusable UI** lives in
`@/components/ui`, while app-specific compositions live in `@/components`. The
brief's import is `@/components/ui/gradient-shader-card`, so the file **must**
sit at that path for the import to resolve. Keeping it there means:

- the documented import path works unchanged,
- `shadcn add` updates land in a predictable place,
- the drop-in shader is cleanly separated from the bespoke console
  (`shader-stage`, `fader-deck`, `preset-bank`, `palette-strip`, `telemetry`)
  that consumes it.

If your project doesn't have that folder yet, create it (`mkdir -p
src/components/ui`) before pasting the component.

## 3. Dependencies

The brief lists `three` and `@react-three/fiber`. The verbatim `demo.tsx` also
imports `framer-motion` (the card's hover spring + drop-shadow), so it's
installed too:

```bash
npm install three @react-three/fiber framer-motion
npm install -D @types/three
```

`lucide-react`, `clsx`, and `tailwind-merge` round out the shadcn baseline.

## 4. The component's props, state & context

`GrainyGradient` (the default export of `gradient-shader-card`) takes:

| prop           | type                       | purpose                                              |
| -------------- | -------------------------- | ---------------------------------------------------- |
| `ripples`      | `Ripple[]`                 | active ripples (`{ id, x, y, startTime }`), max 10   |
| `onTimeUpdate` | `(time: number) => void`   | per-frame callback with the shader's elapsed clock   |
| `ref`          | imperative handle          | exposes `{ material, uniforms, getCurrentTime() }`   |

It **must** render inside an `@react-three/fiber` `<Canvas>` — it calls
`useThree()` and `useFrame()`, which require the R3F context provider. The
component owns its uniforms (via `useMemo`); the parent owns ripple **state** and
(here) pushes field-control values onto the live uniforms through the ref.

This integration adds a thin `ShaderStage` wrapper that:

- mounts the verbatim component in the `<Canvas>` exactly like the brief's demo,
- maps click coordinates into the shader's 800 × 600 space so ripples land
  correctly even when the plate is rendered smaller (responsive),
- forwards the shader's clock + live ripple count up to the console telemetry.

## 5. Assets & responsive behaviour

- **Assets:** none external. The component is fully procedural, so the brief's
  "fill image assets with Unsplash" step is intentionally **not** applicable —
  there is no `<img>` to fill. Fonts and the favicon are vendored locally.
- **Responsive:** the console is a fold-height layout on desktop (rail + plate
  side by side, rail scrolls internally) and stacks vertically on mobile, with
  the plate scaling down to fit. The shader reads `window.innerWidth/Height`
  into `iResolution` each frame, so it always fills its canvas.

## 6. Where to use it

Anywhere you want a premium, living gradient surface: a hero backdrop, a feature
card, an auth/landing splash, or — as here — the centrepiece of a controllable
shader showcase. The drop-in `gradient-shader-card` is the reusable piece; the
`Chroma Foundry` console around it is one opinionated way to present it.
