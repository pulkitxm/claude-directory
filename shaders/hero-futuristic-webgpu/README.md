# Hero Futuristic — WebGPU / TSL

A faithful integration of the **Hero Futuristic** React component — a
depth-mapped portrait dissolved into a scanning **dot-matrix** field and rendered
through a **Three.js WebGPU** pipeline written entirely in **TSL** (Three Shading
Language). A colour texture and its companion depth map feed a node material that
displaces the image by the cursor, masks it into a cellular-noise dot grid, and
sweeps a depth-driven reveal down the frame — then a **TSL post-processing** pass
adds **bloom** and a travelling **red scan line** over the whole scene.

Built with **React + TypeScript + Vite + Tailwind CSS** on the **shadcn** project
structure, exactly as the prompt requires. The component drops into
`@/components/ui/hero-futuristic` and is consumed verbatim.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
```

## What it does

- **Depth parallax** — moving the cursor offsets the colour texture's UVs by the
  depth map's red channel (`uPointer * depth * strength`), so nearer regions of
  the portrait shift more than far ones.
- **Dot-matrix dissolve** — the image is tiled into a cell-noise dot grid
  (`mx_cell_noise_float` + `smoothstep` discs) and screen-blended back over
  itself, so it reads as a holographic point cloud rather than a flat photo.
- **Scan reveal + bloom** — a `uProgress` value sweeps a thin band along the
  depth gradient (the bright dot flow follows it), while a full-screen TSL pass
  layers bloom and a red scan-line overlay that travels top-to-bottom.
- **Sequenced headline** — "Build Your Dreams" reveals word-by-word with a
  per-word glitch offset, followed by the subtitle and a "scroll to explore"
  affordance.

## Integration notes (answering the prompt's questions)

- **Project structure / default paths** — this is a Vite + React + TS app wired
  for shadcn (`components.json`, `@` → `src` alias, Tailwind + `cn()` in
  `@/lib/utils`). shadcn's default component path is **`@/components/ui`**, which
  is exactly where the component lives. Keeping shared primitives under
  `components/ui` is what lets the shadcn CLI (and humans) find, add, and update
  them predictably — so the folder is created and used as the canonical home.
- **Dependencies** — `three` (used via the `three/webgpu` + `three/tsl`
  entrypoints for the WebGPU renderer, node material, TSL ops, and the
  `BloomNode` post pass), plus `@react-three/fiber` and `@react-three/drei`
  (`useTexture`, `useAspect`). The async-renderer `gl` callback that returns a
  `WebGPURenderer` requires **@react-three/fiber v9** (React 19); v8 silently
  falls back to a WebGL renderer that lacks `renderAsync`.
- **Props / state** — the hero takes no props (the texture, depth map, and copy
  are baked in). Internal state drives the staggered word/subtitle reveal and the
  texture-load fade-in; the shader uniforms (`uPointer`, `uProgress`) are mutated
  per-frame in `useFrame`.
- **Assets** — the portrait colour texture (`img-4.png`) and its depth map
  (`raw-4.webp`) are **vendored locally** under `src/assets/`. The depth map is
  what makes the parallax and scan reveal work, so it is kept rather than swapped
  for an unrelated Unsplash photo (which ships no matching depth pass). Fonts
  (Space Grotesk, Space Mono) are vendored under `src/fonts/`. The project runs
  fully offline with no runtime CDN calls.
- **Responsive behaviour** — the canvas fills `100svh`; the headline scales
  across `text-3xl → 2xl:text-7xl` breakpoints and the page chrome reflows its
  padding for mobile vs desktop.
- **Where to use it** — as a site's above-the-fold hero / landing splash.

## Rendering & verification

WebGPU with an **automatic WebGL2 fallback** (via `WebGPURenderer`), so it runs
in headless Chromium too — verified with a Playwright probe (`gpu: true`, zero
page errors, non-black render) and captured in `demo.mp4` / `poster.jpg`. Type
check + production build pass via `npm run build`.

## Stack

React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui, Three.js (WebGPU + TSL),
@react-three/fiber v9, @react-three/drei, Lucide.
