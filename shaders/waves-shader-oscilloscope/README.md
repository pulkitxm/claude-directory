# Waves Shader Oscilloscope — Coswarp Interference Field with Signal Analyzer Console (React + Three.js + Tailwind CSS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A full-screen black-and-white coswarp interference field rendered on a single Three.js quad, integrated as a shadcn/Tailwind/TypeScript drop-in component and framed as a phosphor waveform observation deck. The shader produces warped concentric wave bands via multi-octave coswarp domain distortion; the surrounding console treats it as a signal under measurement — corner reticles, a phosphor live-trace readout tracking elapsed time and frame rate from the same `requestAnimationFrame` clock, a channel legend labeling the field's component bands, and a bottom scope deck with amplitude, sweep rate, phase-lock meter, and a phosphor sweep head. Generated with Claude Fable 5.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
```

## What you see

- **Live coswarp field** — the verbatim shader's interference pattern animating
  on `THREE.Clock`, full-bleed behind the console.
- **Live trace HUD** (top-left) — elapsed time, derived phase / frequency, frame
  count, and render FPS, all sampled from the **same `requestAnimationFrame`
  clock** the shader runs on, so the numbers move with the field rather than on a
  detached timer.
- **Channel legend** (right) — labels the field's component bands (the `10×` and
  `20×` rings, the coswarp octaves, the carrier) as if they were oscilloscope
  inputs, each with a per-channel activity meter that breathes with the clock.
- **Scope deck** (bottom) — amplitude (rms), sweep rate (Hz), octave count, a
  live **phase-lock** meter, and a phosphor **sweep head** tracking across the
  base.

## Design notes

- **Subject:** an imaginary waveform observation deck — a phosphor signal
  analyzer for watching a living interference field. The shader *is* the hero;
  no stock photography is needed.
- **Type:** Space Grotesk (geometric display grotesque), Inter (body/utility),
  Space Mono (telemetry/data). All three are **vendored locally** (latin woff2
  in `src/fonts/`) so the project runs fully offline — no runtime CDN calls.
- **Signature element:** the field is framed as a CRT screen *under observation*
  — corner reticle brackets, scanlines, an edge vignette, and a `Readout` /
  `ScopeDeck` whose FPS, phase, and uptime run on the same real
  `requestAnimationFrame` clock the shader animates on, so the data tracks the
  trace.
- **Palette:** a cold graphite chassis (`#050608`) lit by a CRT **phosphor**
  green-cyan (`#22f5b0`) signal accent with a warm **amber** alarm — derived
  from the shader's own grayscale field rather than a generic gradient.
- Responsive: the channel legend hides on narrow screens while the HUD and deck
  reflow; the canvas re-reads window size on `resize` exactly as the verbatim
  component defines.

---

# Integration guide (answering the prompt)

The prompt is a shadcn-style *"integrate this component"* brief. Here are the
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
(see [`tsconfig.json`](./tsconfig.json) and [`vite.config.ts`](./vite.config.ts)
here for the exact config).

## 2. Why `components/ui`

The brief asks to copy the component into `/components/ui`. That folder is the
shadcn convention for **primitive, reusable building blocks** — the layer you
copy in and own, as opposed to app-specific composites. Keeping
`waves-shader` there means:

- the `@/components/ui/*` import path stays stable and matches every other
  shadcn primitive, so the `ui` alias in `components.json` resolves it without
  special-casing;
- it reads as a drop-in dependency (own it, restyle it) rather than page code;
- app composites — here `reticle`, `readout`, `channel-legend`, `scope-deck` —
  live one level up in `@/components/` and frame the primitive, keeping the
  boundary between *reusable shader* and *this page's console* clear.

So the verbatim component lives at
[`src/components/ui/waves-shader.tsx`](./src/components/ui/waves-shader.tsx).

## 3. Dependencies

The only external runtime dependency the component needs is **three** (it also
uses `cn` from `@/lib/utils`, which pulls in `clsx` + `tailwind-merge`):

```bash
npm install three
# dev: types for the editor / strict build
npm install -D @types/three
```

`lucide-react` (icons in the console chrome) rounds out the install — all
already in [`package.json`](./package.json).

## 4. Answers to the brief's questions

- **What props does it take?** **None.** `ShaderComponent` is a fully
  self-contained, zero-prop component — it owns its own `THREE.Clock`, uniforms
  (`u_time`, `u_resolution`), animation loop, and `resize` handling internally.
  So the console here does **not** feed it props; instead it reads the same rAF
  clock to keep its telemetry in sync with what the shader draws.
- **State management?** None required for the component. The host page uses a
  single `useSignalClock` hook (plain React `useState` + `requestAnimationFrame`)
  to drive the readouts — no context or store.
- **Required assets?** None. The shader is fully procedural; the only vendored
  assets are the three local fonts. No imagery is needed for a shader surface,
  so the brief's *"fill with Unsplash stock images"* step does not apply.
  Icons in the chrome use **lucide-react** per the brief's icon guidance.
- **Responsive behaviour?** The component sizes its WebGL canvas to
  `window.innerWidth/innerHeight` and re-reads on `resize`. The console chrome
  reflows around it (the channel legend collapses below the `sm` breakpoint).
- **Best place to use it?** As a full-bleed ambient background or an interactive
  hero — anywhere you want a living, measured-looking signal field behind your
  content.

## 5. A note on the verbatim copy

The component is copied **byte-for-byte** from the brief, including its GLSL,
uniforms, and cleanup. The single concession to this repo's **strict** TypeScript
config is capturing `containerRef.current` into a local `const container` right
after the existing null-guard (so the later `container.appendChild(...)` type-
checks) — a behaviour-identical idiom, the same one shadcn-style Three.js
components use. No shader, uniform, or animation logic was changed.

## 6. The verbatim demo

The brief's minimal `demo.tsx` (`<ShaderComponent />` full-bleed) is preserved
verbatim as [`src/demo.tsx`](./src/demo.tsx) (`DemoOne`); the richer observation
deck in [`src/App.tsx`](./src/App.tsx) is what the app renders.

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
