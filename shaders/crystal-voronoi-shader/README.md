# Crystal Voronoi Shader — Interactive WebGL Voronoi Lattice Crystallography Lab (React + TypeScript + Vite + Tailwind CSS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

Crystal Voronoi Shader is a React + TypeScript + Vite + Tailwind CSS integration of a raw WebGL fragment shader that draws a two-pass, warped Voronoi lattice with a cursor-driven repel field — framed as a *Cryolite Lab* crystallography specimen station. The shader is the specimen: a fixed, full-viewport WebGL field producing a cyan-to-ice-to-violet spectral cast on obsidian, coloured by `0.5 + 0.5*cos(t*0.5 + vec3(0,0.2,0.4))`. Layered above it is a caliper frame, a counter-rotating goniometer reticle, a live specimen read-out (real FPS meter, centre-pixel luminance read back via `gl.readPixels`, spectral RGB live from the GPU), and a four-axis calibration deck controlling `cellDensity`, `animationSpeed`, `warpFactor`, and `mouseInfluence`. Type is Fraunces (display serif for the hero lockup), Inter (body), and Space Mono (telemetry) — all vendored locally as woff2 for offline operation. Icons from `lucide-react`. Generated with Claude Fable 5.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run verify   # headless Playwright checks (needs a running server URL)
```

## Design notes

- **Subject:** the *Cryolite Lab* — "Specimen VN-04 · Voronoi Lattice". The
  shader is the hero, framed as a crystal growing on an instrument stage. No
  stock photography needed.
- **Type:** Fraunces (editorial display serif, used once for the hero lockup),
  Inter (body), Space Mono (telemetry / data). All three are **vendored
  locally** (`src/fonts/*.woff2`) so the project runs fully offline — no runtime
  CDN calls.
- **Palette (`cryo`):** sampled straight off the shader's own colour ramp,
  `0.5 + 0.5*cos(t*0.5 + vec3(0,0.2,0.4))` — a cyan → ice → violet spectral cast
  on obsidian. The chrome echoes the specimen instead of fighting it.
- **Signature element:** the `SpecimenTelemetry` read-out and the `Goniometer`
  reticle. The telemetry isn't decoration — `Render` is a real FPS meter,
  `Core lum` is the centre pixel read back via `gl.readPixels`, and `Spectral
  cast` shows the exact RGB the shader is painting that frame.
- Respects `prefers-reduced-motion`; keyboard focus is visible on every control,
  and the faders are fully keyboard-operable.

---

# Integration guide (answering the prompt)

The prompt is a shadcn-style "integrate this component" brief. Here are the
answers it asks for.

## 1. Project prerequisites (shadcn + Tailwind + TypeScript)

This project already ships the required stack. To drop the component into a
**fresh** app instead, set the stack up first:

```bash
# Vite + React + TypeScript
npm create vite@latest my-app -- --template react-ts
cd my-app

# Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# shadcn (creates components.json, the @/* alias, and lib/utils.ts)
npx shadcn@latest init
```

Make sure `tsconfig.json` and your bundler resolve the `@/*` alias to `src/*`
(see `tsconfig.json` + `vite.config.ts` here for the exact wiring).

## 2. Why `/components/ui`

The prompt asks for the component to live in `/components/ui`. That folder is the
shadcn convention for **primitive, reusable UI building blocks** — the pieces you
compose pages from. Keeping `InteractiveShader` there (rather than next to a
single page) means:

- the `@/components/ui/...` import path stays stable and predictable, so the
  shadcn CLI and any other component reference it the same way;
- primitives are clearly separated from feature/page code, keeping the
  dependency direction clean (pages import UI, never the reverse);
- it matches the import the demo already uses:
  `import InteractiveShader from "@/components/ui/crystal-shader"`.

Here the resolved paths are: components → `src/components`, ui →
`src/components/ui`, utils → `src/lib/utils`, styles → `src/index.css` (see
`components.json`).

## 3. Dependencies

The shader itself needs **nothing beyond React** — it's hand-rolled WebGL with no
Three.js, no helper libraries. The surrounding showcase adds:

```bash
npm install lucide-react       # icons in the HUD (per the prompt's guideline)
npm install clsx tailwind-merge # the shadcn cn() helper in src/lib/utils.ts
```

No context providers, state managers, or hooks libraries are required.

## 4. Component contract — props & state

The component is already a typed, controllable primitive. The four original
props are preserved verbatim with their original defaults; one optional probe
was added for the HUD (additive — it never changes what's drawn):

| Prop             | Type      | Default | Purpose |
|------------------|-----------|---------|---------|
| `cellDensity`    | `number`  | `8.0`   | Cells in the Voronoi grid. |
| `animationSpeed` | `number`  | `0.2`   | Time multiplier driving the field. |
| `warpFactor`     | `number`  | `0.6`   | How strongly the 2nd Voronoi pass warps the 1st. |
| `mouseInfluence` | `number`  | `0.15`  | How much the cursor repels the lattice. |
| `onSample`       | `(s: { luminance: number; rgb: [number,number,number] }) => void` | — | Fires ~12×/s with the centre-pixel read-back, for external HUDs. |
| `className` / `style` | — | — | Override the default fixed full-viewport canvas. |

State is internal: a single `useEffect` owns the WebGL context, program,
animation loop, and cleanup. Refs mirror the latest prop values so the loop
reads them live **without** rebuilding the GL context on every change — the
original re-ran its whole effect on each prop change, which tore the context
down and back up; this integration fixes that while keeping the pixels identical.

> **Bug fixes vs. the pasted source.** The original referenced
> `iResolutionLoc` inside `resizeCanvas()` *before* the `const` was declared
> (a temporal-dead-zone error the moment the first resize ran). Locations are
> now looked up before the resize helper is defined and called. `getContext`
> also opts into `preserveDrawingBuffer` so the HUD's `readPixels` probe is
> well-defined.

## 5. Assets

None required by the component — it draws **procedurally**, so there are no
images to fill in. (The prompt's "fill image assets with Unsplash" step does not
apply: a generated crystal field needs no photography, and vendoring the fonts
keeps the project self-contained and offline-safe.) Icons come from
`lucide-react`, per the prompt's guideline.

## 6. Responsive behaviour

The canvas is `position: fixed` at `100vw × 100vh` and re-reads its size on
`resize`, so it always fills the viewport at any breakpoint (with DPR clamped to
2 for crisp-but-cheap rendering). The HUD is responsive: the live read-out hides
below `md`, the faders reflow from two columns to one on small screens, and the
hero + shader stay the focus on mobile.

## 7. Where to use it

It's an ambient **full-page background** for a landing/hero — anything that wants
a living, generative, cursor-reactive backdrop (a design tool, a launch teaser,
a crypto/AI/data product, a "now playing" wall). Mount it once near the root with
your real content layered above at a higher `z-index`, exactly as `demo.tsx`
does.

## Files

```
src/
  components/
    ui/
      crystal-shader.tsx       # the integrated component (the prompt's payload)
    calibration-fader.tsx      # one precision fader (the prompt's range input)
    specimen-telemetry.tsx     # signature live GPU read-out
    goniometer.tsx             # signature crystallography reticle
  lib/utils.ts                 # shadcn cn() helper
  demo.tsx                     # DemoOne — the integration in use
  App.tsx · main.tsx · index.css
  fonts/                       # vendored woff2 (offline)
scripts/verify.mjs             # headless CLI verification
```

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
