# Dither Lab — WebGL2 Ordered Bayer Dithering Shader Workbench (React, TypeScript, GLSL ES 3.00)

A darkroom-bench integration of the drop-in `DitheringShader` — a WebGL2 / GLSL ES 3.00 fragment shader that pixelises an animated field and resolves it to two inks through an ordered (Bayer) or white-noise dithering matrix — framed as a live print instrument with seven shape modes (wave, simplex, warp, dots, ripple, swirl, sphere), four matrix types (random, 2×2, 4×4, 8×8), real-time ink pickers, pixel-size and speed faders, freeze/resume transport, five curated presets, and a telemetry HUD reading FPS, shader clock, resolution, and pixel-cell grid directly from the GPU each frame. Generated with Claude Fable 5.

[![Watch Demo](./poster.jpg)](./demo.mp4)

Part of the [claude-directory](../../README.md) · category [shaders](../README.md).

---

## What it does

- **Full-bleed shader stage.** The shader fills the viewport (DPR-aware), framed by reticle corner brackets, a faint print dot-screen, and a single drifting scan line.
- **All 7 shapes, all 4 matrices, live.** Switch between `wave · simplex · warp · dots · ripple · swirl · sphere` and `random · 2×2 · 4×4 · 8×8` with zero shader recompiles — everything is a uniform push.
- **Live inks.** Front/back colours are native swatch pickers; the field re-tints instantly.
- **Uniform faders.** `pxSize` (pixel grid, 1–10) and `speed` (clock, 0–2×).
- **Transport.** Freeze/Resume the shader clock (without tearing down the GL context), Randomise, and Reset to the Wave demo. Five curated presets (Wave, Aurora, Orbit, Vortex, Sonar) show off the shape × matrix space.
- **Telemetry HUD.** FPS (rolling), shader clock (`u_time`), drawing-buffer resolution, and the resolved pixel-cell grid (`buffer / pxSize`) — all read from the stage every frame.

## The component

The verbatim drop-in lives at [`src/components/ui/dithering-shader.tsx`](./src/components/ui/dithering-shader.tsx) and is consumed exactly as the prompt's `demo.tsx` shows:

```tsx
import { DitheringShader } from "@/components/ui/dithering-shader";

<DitheringShader
  shape="wave"
  type="8x8"
  colorBack="#001122"
  colorFront="#ff0088"
  pxSize={3}
  speed={0.6}
/>;
```

### Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `shape` | `"simplex" \| "warp" \| "dots" \| "wave" \| "ripple" \| "swirl" \| "sphere"` | `"simplex"` | The animated field rendered before dithering. |
| `type` | `"random" \| "2x2" \| "4x4" \| "8x8"` | `"8x8"` | Dithering matrix — white noise or an ordered Bayer threshold map. |
| `colorBack` / `colorFront` | `string` (`#rrggbb`) | `#000000` / `#ffffff` | The two inks the field resolves to. |
| `pxSize` | `number` | `4` | Pixelisation cell size in px. |
| `speed` | `number` | `1` | Clock multiplier; `0` renders a single static frame. |
| `width` / `height` | `number` | `800` | Fixed canvas size for the drop-in (the lab uses a responsive stage instead — see below). |
| `className` / `style` | — | — | Forwarded to the wrapper. |

### Drop-in vs. the lab stage

The copy-pasted `DitheringShader` is **fixed-size** (`width`/`height` props) and rebuilds its render loop whenever a prop changes. To get a responsive, full-window stage with live telemetry and a freeze that doesn't tear down WebGL, the lab adds a sibling engine, [`src/components/DitherStage.tsx`](./src/components/DitherStage.tsx), that runs the **identical GLSL** (same simplex/hash helpers, same 2×2/4×4/8×8 Bayer tables, same 7 shape branches) but builds the program once and pushes all parameters as per-frame uniforms. The drop-in is kept untouched so it still copies cleanly into any project.

## shadcn / Tailwind / TypeScript

This project is already a shadcn-style, Tailwind v4, TypeScript setup, so the component drops straight in:

- **Components path is `src/components/ui/`** and the `@/*` alias maps to `src/` ([`components.json`](./components.json), [`vite.config.ts`](./vite.config.ts), [`tsconfig.json`](./tsconfig.json)). Keeping shared primitives under `components/ui` is the shadcn convention the CLI and registry assume: it's the default `ui` alias, so anything you add with `npx shadcn@latest add …` lands beside this file and imports like `@/components/ui/dithering-shader` resolve everywhere without per-file relative paths.
- **`cn` helper** lives at [`src/lib/utils.ts`](./src/lib/utils.ts) (`clsx` + `tailwind-merge`), matching the `@/lib/utils` import in the prompt's `wave-1.tsx`.

If you're starting from scratch instead, the equivalent setup is:

```bash
# Vite + React + TypeScript
npm create vite@latest my-app -- --template react-ts && cd my-app
# Tailwind CSS v4 (Vite plugin)
npm i -D tailwindcss @tailwindcss/vite
# shadcn project structure (creates components.json, lib/utils, the @/ alias)
npx shadcn@latest init
# Runtime deps this component/showcase uses
npm i clsx tailwind-merge lucide-react
```

Then add `@import "tailwindcss";` to your CSS entry and copy `dithering-shader.tsx` into `src/components/ui/`.

## Run it

```bash
npm install
npm run dev      # Vite dev server
npm run build    # tsc --noEmit + vite build
npm run verify   # headless WebGL2 checks (see below)
```

## Verification

`npm run verify` ([`scripts/verify.mjs`](./scripts/verify.mjs)) builds the project, serves the Vite preview, and drives headless Chromium (WebGL2 via SwiftShader) to assert:

1. A single `<canvas>` with a live WebGL2 context and backing pixels.
2. The shader paints a non-black field carrying the magenta front ink.
3. The telemetry HUD renders an FPS readout and its clock advances.
4. Selecting a shape re-labels the hero (Wave → Sphere).
5. Switching the dithering matrix keeps the canvas alive.
6. **Freeze** halts the shader clock.
7. No console / page errors throughout.

```
10 passed, 0 failed
ALL CHECKS PASSED ✓
```

## Notes

- **Assets are vendored locally.** Space Grotesk, Inter, and JetBrains Mono are self-hosted as latin-subset `.woff2` under [`src/fonts/`](./src/fonts/) — no network calls at runtime. The shader generates all of its own imagery, so there are no stock images to vendor.
- **Icons** are [`lucide-react`](https://lucide.dev) (Aperture, Waves, Cloud, Spline, Grip, Radio, Tornado, Globe, …).
- **Responsive.** The control deck is a right rail on desktop and a bottom sheet on mobile; the hero readout reflows so it never collides with the deck. A `prefers-reduced-motion` guard disables the chrome animations.
- **Fallback.** If WebGL2 is unavailable the stage shows a graceful message instead of a blank canvas.

Component credit: `designali-in/dithering-shader`.

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
