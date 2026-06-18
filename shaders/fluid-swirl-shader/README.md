# fluid-swirl-shader — FLUX PIGMENT LAB

A self-contained shader experiment that integrates the **`FluidSwirl`** React
component (a procedural WebGL fragment field that folds **three pigments** into
an endless paint vortex) into a polished **pigment-mixing console** — drag to
steer the spin, re-mix the three colours live, and watch a rolling oscilloscope
of the field's _actual_ brightness sampled straight off the GL framebuffer.

> **FLUX** — _Three pigments, one vortex, decided on the GPU._ The integration
> prompt ships a full-viewport swirl in cyan/rose/gold; here it becomes a live
> console: swap each pigment, push contrast and spin, freeze the flow, flip on a
> kaleidoscopic polar warp, and read real luma off the framebuffer.

## What's here

- `src/components/ui/fluid-swirl-shader.tsx` — the integrated component. The
  prompt's vertex + fragment shaders are preserved **verbatim**; the existing
  `render()` uniforms were lifted into an **additive, fully backward-compatible**
  props API (see _Integration notes_).
- `src/components/ui/fluid-swirl-shader.demo.tsx` — the canonical demo from the
  prompt (`<FluidSwirl />` with no props), shipped alongside the component.
- `src/components/pigment-trace.tsx` — the signature panel: a rolling
  oscilloscope whose trace is sampled from the **actual GL framebuffer** (a real
  `readPixels` luma probe), not estimated.
- `src/App.tsx` — the full instrument (field + wordmark + mixing console +
  pigment trace + a footer that doubles as the integration cheatsheet).
- `src/lib/utils.ts` — shadcn's `cn()` helper (clsx + tailwind-merge).

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b (type-check) + production build
npm run typecheck  # type-check only
```

## Integration notes (the prompt's task)

This repo **already supports the shadcn project structure, Tailwind CSS, and
TypeScript**, so no scaffolding was required. The relevant decisions:

- **Default component path is `@/components/ui`.** The `@` alias maps to `src/`
  via both `vite.config.ts` (`resolve.alias`) and `tsconfig.app.json`
  (`compilerOptions.paths`); `components.json` records the shadcn aliases
  (`ui → @/components/ui`).
- **Why `/components/ui` matters:** shadcn distributes components by copying
  their source into _your_ tree and expects them under `components/ui`. Keeping
  that folder means the `@/components/ui/fluid-swirl-shader` import in the demo
  resolves out of the box, the shadcn CLI (`npx shadcn@latest add …`) drops
  future primitives in the right place, and library components stay separated
  from composed app code.

### Questions the prompt asks

- **What data/props will be passed?** The pasted `FluidSwirl()` took **no
  props** — every uniform was a constant inside `render()`. The integration
  keeps that exact default and additionally exposes those uniforms as
  **optional** props so the console can drive them (all backward-compatible):

  | Prop | Type | Default | Notes |
  |------|------|---------|-------|
  | `colorOne` / `colorTwo` / `colorThree` | `#rrggbb` | `#e64d66` / `#4d80e6` / `#e6cc4d` | the three mixed pigments (the prompt's exact `colour_1/2/3`) |
  | `contrast` | `number` | `2.0` | paint banding / contrast |
  | `spinAmount` | `number` | `0.36` | how tightly the vortex winds |
  | `spinSpeed` | `number` | `1.0` | flow speed (`0` freezes the field) |
  | `pixelFilter` | `number` | `700` | pixelisation — lower = chunkier |
  | `offset` | `[number, number]` | `[0, 0]` | field recentre |
  | `polar` / `polarRepeat` / `polarZoom` | `boolean` / `number` | `false` / `2` / `1` | kaleidoscopic polar warp |
  | `pointerReactive` | `boolean` | `true` | steer `spin_rotation` with pointer-X (the original demo behaviour) |
  | `fill` | `boolean` | `false` | **added** — track the parent box via `ResizeObserver` for a full-bleed background instead of `window` size |
  | `onSample` | `(luminance: number) => void` | — | **added** — fires a few times/sec with the field's average luma, read off the GL framebuffer |
  | `className` / `style` | — | `"w-full h-screen"` | passthrough to the `<canvas>` |

- **State management requirements?** None external. The component owns its WebGL
  lifecycle; all app state is just the current controls, held in `App.tsx` with
  `useState` (no context, no store, no providers).
- **Required assets (images, icons)?** **No images** — the field is fully
  procedural, so the prompt's "fill with Unsplash stock images" step does not
  apply (there is nothing for a photo to fill). Icons use **lucide-react** as
  the prompt directs (`Droplets`, `Aperture`, `Gauge`, `Wind`, `Spline`,
  `Sparkles`, `Shuffle`, `Play`/`Pause`, `Activity`). The only vendored media
  are two self-hosted fonts.
- **Expected responsive behaviour?** The canvas is full-bleed and re-sizes via
  `ResizeObserver` (fill mode) for any breakpoint and devicePixelRatio. The
  instrument panels float in the corners on desktop and **stack in normal flow**
  below a centred wordmark on mobile; pointer _and_ touch both steer the spin.
- **Best place to use it?** As an ambient, full-viewport hero/background — which
  is exactly how `App.tsx` mounts it (`fill` behind the whole console).

### Changes applied to the pasted component

1. **Props API** — the constants the original `render()` hard-coded
   (`colors`, `contrast 2.0`, `spin_amount 0.36`, `pixel_filter 700`, the polar
   flags, the offset) are now optional props read live from a ref each frame, so
   changing them never tears down and rebuilds the GL program. With **no props**
   the output is identical to the pasted file.
2. **`fill` mode** — an optional `ResizeObserver` path so one component can back
   a fixed full-viewport demo _and_ a responsive full-bleed background.
3. **`onSample` probe** — `preserveDrawingBuffer` + a throttled `readPixels`
   reports average luma, which drives the pigment-trace oscilloscope.

The vertex and fragment shader sources are unchanged from the prompt.

### If you were starting from an empty project

```bash
npm create vite@latest my-app -- --template react-ts   # React + TypeScript
cd my-app
npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p
npx shadcn@latest init       # creates components.json, the @/ alias, components/ui
# then drop fluid-swirl-shader.tsx into src/components/ui/
```

## Assets

Everything is vendored locally for offline use — no runtime CDN calls:

- **Fonts** (`public/fonts/`): Space Grotesk (display) and JetBrains Mono
  (telemetry/data), latin `.woff2` subsets self-hosted via `@font-face`.
- **No image assets** — the swirl is 100% procedural (raw WebGL).

## Stack

React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui structure, lucide-react,
raw WebGL.

## Credit

Component: the **`FluidSwirl`** fluid-swirl shader from the integration prompt
(a "Mainframe / cosmic spin" style ordered paint field).
