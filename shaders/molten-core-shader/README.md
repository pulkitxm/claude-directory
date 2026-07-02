# Molten Core Shader — Procedural FBM Lava Background with Telemetry HUD (React + Three.js + Vite + Tailwind CSS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A full-viewport procedural lava GLSL fragment shader rendered via Three.js, wrapped in a *foundry core monitor* showcase. The shader is the fixed background; a charred instrument frame, scanning reticle, live **core-temperature telemetry** panel, base-color toggle, and melt-intensity dial compose a calm metallurgical HUD that reads real GPU state and steers the shader's `theme` and `intensity` uniforms. Built with React + TypeScript + Vite + Tailwind CSS on a shadcn project structure. Generated with Claude Fable 5.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
```

## Design notes

- **Subject:** an imaginary foundry's molten-core containment cell ("Astra Forge
  · Core-09"). The shader *is* the hero — no stock photography needed.
- **Type:** Cormorant Garamond (display serif, used once for the title), Space
  Mono (telemetry / data), Inter (utility). All three are **vendored locally**
  (latin woff2 in `src/fonts/`) so the project runs fully offline.
- **Signature element:** `CoreTelemetry` maps the shader's centre-pixel
  luminance — read straight off the GPU via `gl.readPixels` — to a plausible
  temperature (≈760–1480 °C), viscosity, flux, and a rolling thermal sparkline.
  Nothing is faked; the panel breathes with the lava.
- **Palette:** an `ember`/`forge` ramp derived from the shader's own lava stops
  (char → ember → gold).
- Respects `prefers-reduced-motion`; keyboard focus is visible on all controls.

---

# Integration guide (answering the prompt)

The prompt is a shadcn-style "integrate this component" brief. Here are the
answers it asks for.

## 1. Project prerequisites (shadcn + Tailwind + TypeScript)

This project already ships the required stack. If you are dropping the component
into a **fresh** app instead, set the stack up first:

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

Make sure your `tsconfig.json` and bundler resolve the `@/*` alias to `src/*`
(see `tsconfig.json` + `vite.config.ts` here for the exact wiring).

## 2. Why `/components/ui`

The prompt asks the component be placed in `/components/ui`. That folder is the
shadcn convention for **primitive, reusable UI building blocks** — the things you
compose pages out of. Keeping `MoltenCoreShader` there (rather than next to a
single page) means:

- the `@/components/ui/...` import path stays stable and predictable, so the
  shadcn CLI and any other component can reference it the same way;
- primitives are clearly separated from feature/page code, which keeps the
  dependency direction clean (pages import UI, never the reverse);
- it matches the import the demo already uses:
  `import MoltenCoreShader from "@/components/ui/molten-core-shader"`.

Here the resolved paths are: components → `src/components`, ui → `src/components/ui`,
utils → `src/lib/utils`, styles → `src/index.css` (see `components.json`).

## 3. Dependencies

The only external runtime dependency the component needs is **three**:

```bash
npm install three
npm install -D @types/three   # TypeScript types
```

`lucide-react` is used by the surrounding showcase (icons), per the prompt's
"use lucide-react icons" guideline; the shader itself does not require it.

## 4. Component contract — props & state

The original component took no props and read the OS theme once. It has been
integrated as a typed, controllable primitive while keeping the original
behaviour as the default:

| Prop        | Type                              | Default     | Purpose |
|-------------|-----------------------------------|-------------|---------|
| `theme`     | `"light" \| "dark" \| "system"`   | `"system"`  | Drives the `theme` uniform — lava melts onto white / black, or follows the OS preference (original behaviour). Eased so toggles cross-fade. |
| `intensity` | `number` (0–1)                    | `0.8`       | Blend of lava over the base (the original's fixed `0.8`). |
| `onSample`  | `(luminance: number) => void`     | —           | Fires ~12×/s with the rendered frame's centre luminance, for external HUDs. |
| `className` | `string`                          | —           | Overrides the default fixed full-viewport container class. |

State is internal: a single `useEffect` owns the Three.js scene, renderer,
animation loop, and cleanup. No context providers or external state libraries
are required. Refs mirror the latest prop values so the loop reads them without
rebuilding the WebGL context on every change.

## 5. Assets

None required by the component — it draws procedurally, so there are **no
images** to fill in. (The prompt's "fill image assets with Unsplash" step does
not apply: a generated lava field needs no photography, and vendoring fonts
keeps the project self-contained.)

## 6. Responsive behaviour

The shader container is `position: fixed` at `100vw × 100vh` and re-reads its
size on `resize`, so it always fills the viewport at any breakpoint. The
showcase HUD is responsive: the telemetry panel and bottom ledger hide below
`md`, and the toggle/labels collapse on small screens, leaving the title and the
shader as the focus on mobile.

## 7. Where to use it

It's an ambient **full-page background** for a landing/hero — anything that
benefits from a living, warm, generative backdrop (a forge/energy/AI product, a
launch teaser, a "now playing" wall). Mount it once near the root with your real
content layered above at a higher `z-index`, exactly as `demo.tsx` does.

## Files

```
src/
  components/
    ui/
      molten-core-shader.tsx   # the integrated component (the prompt's payload)
    core-telemetry.tsx         # signature live GPU readout
    forge-controls.tsx         # theme toggle + intensity dial
  lib/utils.ts                 # shadcn cn() helper
  demo.tsx                     # DemoOne — the integration in use
  App.tsx · main.tsx · index.css
  fonts/                       # vendored woff2 (offline)
```

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
