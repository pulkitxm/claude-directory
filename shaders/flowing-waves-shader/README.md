# Flowing Waves Shader — Interactive Cosine Wave Fragment Shader (React + TypeScript + Vite + Tailwind CSS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A full-viewport interactive Three.js fragment-shader wave field — a nine-iteration cosine displacement rippling across a full-screen quad — wrapped in a tidal field observatory showcase. The shader is the ambient background; layered over it is a live "Meridian Tidal Lab" oceanographic HUD with a buoy telemetry panel (significant wave height, wave period, turbulence index), a sea-state mode selector, a center-clarity toggle, and an amplitude dial. GPU luminance is sampled via `gl.readPixels` to drive real telemetry — nothing faked. Built following the shadcn component structure with full TypeScript typing. Generated with Claude Fable 5.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
```

## Design notes

- **Subject:** an imaginary oceanographic field station ("Meridian Tidal Lab ·
  Buoy-07"). The shader *is* the hero — no stock photography needed.
- **Type:** Fraunces (optical display serif, used once for the title), IBM Plex
  Mono (telemetry / data), Space Grotesk (utility). All three are **vendored
  locally** (latin woff2 in `src/fonts/`) so the project runs fully offline.
- **Signature element:** `TideTelemetry` maps the shader's sampled luminance —
  read straight off the GPU via `gl.readPixels` (three points averaged) — to a
  plausible significant wave height (≈0.4–4.2 m), wave period, turbulence index,
  and a rolling 48-sample trace; the pointer feeds a station bearing/depth.
  Nothing is faked; the panel breathes with the waves.
- **Palette:** a `tide` / `kelp` / `abyss` ramp derived from the shader's own
  three branch colors (neutral grey, blue swell, green forecast).
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
shadcn convention for **primitive, reusable UI building blocks**. Keeping
`FlowingWavesShader` there (rather than next to a single page) means:

- the `@/components/ui/...` import path stays stable and predictable, so the
  shadcn CLI and any other component can reference it the same way;
- primitives are clearly separated from feature/page code, which keeps the
  dependency direction clean (pages import UI, never the reverse);
- it matches the import the demo already uses:
  `import FlowingWavesShader from "@/components/ui/flowing-waves-shader"`.

Here the resolved paths are: components → `src/components`, ui →
`src/components/ui`, utils → `src/lib/utils`, styles → `src/index.css` (see
`components.json`).

## 3. Dependencies

The only external runtime dependency the component needs is **three**:

```bash
npm install three
npm install -D @types/three   # TypeScript types
```

`lucide-react` is used by the surrounding showcase (icons), per the prompt's
"use lucide-react icons" guideline; the shader itself does not require it.

## 4. Component contract — props & state

The original component owned its three booleans internally and used untyped refs
(`useRef(null)` / `useRef()`) and an untyped `onMouseMove` handler. It has been
ported to a typed, **controllable** primitive — the three booleans are now
props, so the showcase drives them — while preserving the original shader math
and resting behaviour as the defaults:

| Prop              | Type                                    | Default     | Purpose |
|-------------------|-----------------------------------------|-------------|---------|
| `mode`            | `"neutral" \| "active" \| "upcoming"`   | `"neutral"` | Collapses the original `hasActiveReminders` / `hasUpcomingReminders` booleans into one exclusive color branch (grey / blue / green). Eased so changes cross-fade. |
| `dimmingDisabled` | `boolean`                               | `false`     | The original `disableCenterDimming` — lifts the soft center vignette. Eased. |
| `intensity`       | `number` (0–1)                          | `1`         | Overall brightness of the field (a natural extension; original behaviour at `1`). |
| `onSample`        | `(luminance: number) => void`           | —           | Fires ~12×/s with the rendered frame's averaged luminance, for external HUDs. |
| `onPointer`       | `(x: number, y: number) => void`        | —           | Fires with the normalized pointer position over the canvas (the original `iMouse` wiring). |
| `className`       | `string`                                | —           | Overrides the default fixed full-viewport container class. |

State is internal: a single `useEffect` owns the Three.js scene, renderer,
animation loop, and cleanup. No context providers or external state libraries
are required. Refs mirror the latest prop values so the loop reads them without
rebuilding the WebGL context on every change.

## 5. Assets

None required by the component — it draws procedurally, so there are **no
images** to fill in. (The prompt's "fill image assets with Unsplash" step does
not apply: a generated wave field needs no photography, and vendoring fonts
keeps the project self-contained. Icons come from `lucide-react`, per the
guideline.)

## 6. Responsive behaviour

The shader container is `position: fixed` at `100vw × 100vh` and re-reads its
size on `resize`, so it always fills the viewport at any breakpoint. The
showcase HUD is responsive: the telemetry panel and bottom ledger hide below
`md`, control labels collapse to icons on small screens, and the controls wrap,
leaving the title and the waves as the focus on mobile.

## 7. Where to use it

It's an ambient **full-page background** for a landing/hero — anything that
benefits from a living, cool, generative backdrop (a weather/maritime product, a
launch teaser, an ambient status wall). The blue/green/grey branches make it a
natural fit for the original use case too: signalling an app's reminder state
(active / upcoming / none) behind the UI. Mount it once near the root with your
real content layered above at a higher `z-index`, exactly as `demo.tsx` does.

## Files

```
src/
  components/
    ui/
      flowing-waves-shader.tsx   # the integrated component (the prompt's payload)
    tide-telemetry.tsx           # signature live GPU readout
    wave-controls.tsx            # mode selector + clarity toggle + amplitude dial
  lib/utils.ts                   # shadcn cn() helper
  demo.tsx                       # DemoOne — the integration in use
  App.tsx · main.tsx · index.css
  fonts/                         # vendored woff2 (offline)
```

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
