# Living Nebula Shader — Cursor-Lensing FBM Gas Cloud WebGL Shader (React + TypeScript + Three.js)

[![Watch Demo](./poster.jpg)](./demo.mp4)

An interactive WebGL fragment shader rendering a two-layer fractal-Brownian-motion gas cloud — magenta plasma and ion-blue, rotating slowly and lensing around the cursor like a gravitational well — rendered full-viewport with Three.js and framed as a deep-sky radio-observatory sky-feed console. The live telemetry HUD reports shader time, smoothed FPS, and warp-center coordinates sampled directly from the render loop. Built with React 18, TypeScript, Vite 6, and Tailwind CSS v4 using Three.js as the WebGL host. Generated with Claude Fable 5.

The shader component from the prompt is integrated at
`src/components/ui/living-nebula.tsx`, the canonical shadcn `@/components/ui`
location. The Three.js setup, the vertex/fragment shaders, the
`iTime` / `iResolution` / `iMouse` uniforms, the resize + mousemove handlers,
the `setAnimationLoop` render loop, and the cleanup are all preserved exactly as
in the brief. It is wrapped in a deliberate piece of instrument chrome:

- **Hero lockup (the brief's `demo.tsx`)** — `Living Nebula` set in Space Grotesk
  over the feed, with the brief's required `app-container` / `overlay-content`
  structure and the `An Interactive WebGL Shader` subtitle intact.
- **Console framing** — corner brackets, a faint scope scanline sweep, a soft
  vignette, and a `DSO·N7` masthead with a live/no-signal feed indicator.
- **Live telemetry HUD (signature element)** — the component emits per-frame
  state (`time`, `fps`, and the live **warp center**) through an `onFrame`
  callback. The warp center is computed with the *same* normalization the
  fragment shader uses (`(iMouse − 0.5·iResolution) / iResolution.y`), so the
  bottom rail reports the shader's own GPU state: a feed clock that advances with
  shader time, smoothed render FPS, the live cursor-warp coordinates, the active
  gas-layer count, and the fbm octave count.
- **Cursor lens reticle** — the brief's `cursor-aura` becomes a crosshair lens
  marker (ring + four ticks) that tracks the pointer and marks the warp center.

Palette and type are derived from the shader's own GLSL constants — `gasColor1`
magenta `vec3(0.8, 0.2, 0.5)` → `#cc3380`, `gasColor2` ion-blue
`vec3(0.2, 0.3, 0.9)` → `#3349e6`, over deep space `#02010a`, with a cyan signal
readout `#7af5ff`. Type pairing: Space Grotesk (display) · Inter (body) ·
IBM Plex Mono (telemetry/data). Icons from `lucide-react`. The entrance reveal,
the scanline, the signal pulse and the reticle breathe all respect
`prefers-reduced-motion`.

## Stack

React 18, TypeScript, Vite 6, Tailwind CSS v4 (`@tailwindcss/vite`), Three.js,
`lucide-react`. shadcn-style `@/*` path alias → `./src`.

## Assets

Fully self-contained / offline-ready. The Space Grotesk, Inter and IBM Plex Mono
web fonts (latin subset) are vendored locally to `public/fonts/` and referenced
via `src/fonts.css` — no remote Google Fonts requests at runtime. The visual is
generated entirely on the GPU, so there are no image assets.

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
  CSS v4 and the shadcn `@/components/ui` convention already wired up (the `@`
  alias is configured in both `vite.config.ts` and `tsconfig.json`). If you are
  dropping the component into your own app instead, scaffold with the shadcn CLI
  (`npx shadcn@latest init`), which sets up Tailwind, TypeScript and the
  `components.json` alias map for you.
- **Why `/components/ui`** — shadcn treats `components/ui` as the home for
  primitive, copy-in UI building blocks resolved through the `@/components/ui`
  alias. Keeping the shader there means the import in the brief
  (`@/components/ui/living-nebula`) resolves unchanged and the component sits
  alongside the rest of your design-system primitives.
- **Dependencies** — only `three` is required by the component itself;
  `lucide-react` is used by the surrounding console demo for icons.
- **Props / state** — the original component took no props and held a single
  `mousePos` state for the cursor aura, both preserved. The optional `onFrame`
  and `onContext` props are additive (defaulting to no-ops), so the component
  still drops in zero-config; they exist only to let an enclosing UI read the
  shader's live state and WebGL availability.
- **Images / icons** — none required. The procedural shader is the entire
  visual, so no Unsplash stock imagery is needed; the only icons are
  `lucide-react` glyphs in the surrounding HUD.
- **Responsive behavior** — the feed is full-viewport at every size; the
  telemetry rail collapses from five columns to a 2×2 grid and the long lede is
  dropped on small screens. WebGL failures fall back to a static deep-space CSS
  gradient so the layout never goes black.

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
