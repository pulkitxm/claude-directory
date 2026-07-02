# Interactive Flux Shader — Cursor-Reactive WebGL FBM Field Synthesizer (React + TypeScript + WebGL2)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A full-screen WebGL2 fractal-noise (FBM) field whose hue, speed, intensity, and complexity are live uniforms and whose flow warps toward the cursor — integrated as a shadcn `@/components/ui` component and framed as **FLUX·01**, a Eurorack-style "field synthesizer." The four shader parameters become engraved aluminium faders, the generative field sits in a recessed scope window with a tracking crosshair reticle, and a live telemetry stack reads per-frame GPU output via `gl.readPixels`. Built with React, TypeScript, Vite, and Tailwind CSS following the shadcn project structure, with no external rendering dependency — raw WebGL2 only. Generated with Claude Fable 5.

## Design notes

- **Subject:** a single hardware synth module — "Aperture Labs · FLUX·01 · Field
  Synthesizer." The shader *is* the instrument's output, so no stock photography
  is needed.
- **Type:** Space Grotesk (machined display grotesque, used once for the
  `FLUX·01` lockup), JetBrains Mono (engraved silkscreen labels, telemetry,
  readouts) and Inter (docs prose). All three are **vendored locally** (latin
  variable woff2 in `src/fonts/`) so the project runs fully offline.
- **Signature element:** the engraved **fader bank** plus a live **signal
  scope.** Each fader is milled into the faceplate with an amber LED level fill;
  beside the field, the scope plots the shader's sampled centre luminance over
  time — data read straight off the framebuffer via `gl.readPixels` — and a
  swatch reports the field's dominant hue. Drag the Hue fader and the readout
  hue follows the pixels, not the slider.
- **Palette:** a cool brushed-graphite chassis (`chassis` / `alu` ramps) with a
  single warm `amber` signal LED and a `patch`-cable cyan that echoes the
  component's own `accent-cyan-400` sliders. The chassis stays neutral so the
  shader's coloured field reads as the live signal.
- Respects `prefers-reduced-motion`; keyboard focus is visible on every fader.

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
compose pages out of. Keeping `interactive-shader` there (rather than next to a
single page) means:

- the `@/components/ui/...` import path stays stable and predictable, so the
  shadcn CLI and any other component can reference it the same way;
- primitives are clearly separated from feature/page code, which keeps the
  dependency direction clean (pages import UI, never the reverse);
- it matches the import the demo already uses:
  `import ShaderComponent from "@/components/ui/interactive-shader"`.

Here the resolved paths are: components → `src/components`, ui → `src/components/ui`,
utils → `src/lib/utils`, styles → `src/index.css` (see `components.json`).

## 3. Dependencies

The component needs **no external runtime libraries.** It is raw **WebGL2** (with
a WebGL fallback) — there is no `three.js` and nothing to `npm install` for the
shader itself:

```bash
# nothing required for the component — it is dependency-free WebGL
```

`lucide-react` is used by the surrounding showcase (a few module icons) per the
prompt's "use lucide-react icons" guideline; `clsx` + `tailwind-merge` back the
shadcn `cn()` helper. The shader does not require any of them.

The source was authored with **untyped** params and refs; it has been ported to
**TypeScript** so the strict build passes, with behaviour preserved exactly.

## 4. Component contract — props & state

The default export `ShaderComponent` is the prompt's component verbatim (its own
title + glass slider panel). To make the field observable by a host UI without
changing that default, the building blocks are also exported and accept one
optional callback:

| Export                | Kind      | Purpose |
|-----------------------|-----------|---------|
| `ShaderComponent`     | default   | The brief's self-contained component (sliders + title). |
| `ShaderCanvas`        | named     | Just the field canvas — props `hue`, `speed`, `intensity`, `complexity`, optional `onSample`, optional `className`. |
| `useShaderAnimation`  | named     | The WebGL hook, so a host can reuse the exact shader. |
| `ShaderParams`        | type      | `{ hue; speed; intensity; complexity }`. |
| `ShaderSample`        | type      | `{ luminance; hue; fps }` — the per-frame readout. |

`ShaderCanvas` / `useShaderAnimation` props:

| Prop         | Type                          | Range / default | Purpose |
|--------------|-------------------------------|-----------------|---------|
| `hue`        | `number`                      | 0–360           | Base hue uniform (degrees). |
| `speed`      | `number`                      | 0–2.0           | Flow speed multiplier. |
| `intensity`  | `number`                      | 0.1–3.0         | Field brightness / contrast. |
| `complexity` | `number`                      | 1–10            | FBM octave count. |
| `onSample`   | `(s: ShaderSample) => void`   | — (opt-in)      | Fires ~12×/s with the rendered frame's sampled luminance, dominant hue and draw rate, read off the GPU. Sampling is skipped entirely when omitted, so the default `ShaderComponent` is untouched. |
| `className`  | `string`                      | full-bleed      | Overrides the default absolute-fill canvas class. |

State is internal: a single `useEffect` owns the WebGL context, program,
animation loop and cleanup. No context providers or external state libraries are
required. A throttled `mousemove` handler (≈60 fps) feeds the `u_mouse` warp, and
the latest `onSample` closure is held in a ref so passing a new one never tears
down the GL context.

## 5. Assets

None required by the component — it draws procedurally, so there are **no
images** to fill in. (The prompt's "fill image assets with Unsplash" step does
not apply: a generated noise field needs no photography, and vendoring fonts
keeps the project self-contained.)

## 6. Responsive behaviour

The field canvas re-reads its client size every frame, so it always fills its
container at any breakpoint. The faceplate is a two-column grid on `lg`
(scope + control column) and collapses to a single stack on smaller screens, with
the scope window switching to a fixed `16/11` aspect ratio so it never collapses.
The top-rail status pills hide below `sm`. Verified with no horizontal overflow
down to 390 px.

## 7. Where to use it

`ShaderComponent` is a drop-in **interactive full-page background / hero** —
anything that benefits from a living, tunable, generative backdrop with a
cursor-reactive warp (a creative-tools landing, a launch teaser, a generative-art
wall). Mount it once near the root with real content layered above; or use
`ShaderCanvas` directly when you want to own the controls and chrome, as this
module's `demo.tsx` does.

## Files

```
src/
  components/
    ui/
      interactive-shader.tsx   # the integrated component (the prompt's payload)
    flux-faders.tsx            # signature engraved fader bank
    signal-telemetry.tsx       # live GPU readout (luminance scope, hue, fps, octaves)
  lib/utils.ts                 # shadcn cn() helper
  demo.tsx                     # DemoOne — the FLUX·01 integration in use
  App.tsx · main.tsx · index.css
  fonts/                       # vendored variable woff2 (offline)
```

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
