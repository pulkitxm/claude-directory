# ATC Aperture Transit Corridor — WebGL2 Ray-March Warp Tunnel Shader (React + TypeScript + WebGL2)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A single WebGL2 fullscreen fragment-shader pass that ray-marches through cosine-folded space with a per-fragment `mat2` rotation, building an iridescent chromatic warp tunnel that drifts toward a vanishing point forever. Framed as a deep-space aperture transit instrument with a vertical aperture-depth gauge, a chromatic-split wordmark echoing the shader's RGB colour split, a live telemetry rail reporting corridor depth and smoothed render FPS, and a Hold/Resume control. The entrance respects `prefers-reduced-motion`. Built with React 18, TypeScript, Vite 5, Tailwind CSS v3, and raw WebGL2 with no Three.js dependency. Generated with Claude Fable 5.

The shader is preserved faithfully at
`src/components/ui/atc-shader.tsx` — same GLSL, same fullscreen-triangle vertex
buffer, same `requestAnimationFrame` render loop and cleanup. The only changes to
the original paste are:

- the broken string-literal newline in the WebGL error path fixed to a real `\n`;
- two **additive** props — an optional `paused` flag and an `onSample` callback —
  so the host page can read the shader's own per-frame clock for telemetry
  without touching the draw path. With no props the component is the brief's
  zero-config fixed background.

The chrome reads the corridor as a transit instrument:

- **Vertical aperture-depth gauge (signature element)** — a fixed tick ladder
  whose cyan reticle rides the fractional part of the corridor depth, so it
  physically tracks the shader's own marching cadence
  (`depth = time × 5 u/s`, matching the GLSL `t / 0.2` advance) instead of running
  a decorative timer.
- **Chromatic-split wordmark** — `Aperture / Transit` set in Space Grotesk with an
  RGB separation that echoes the shader's GLSL colour split.
- **Live telemetry rail** — the bottom bar reports the shader's real per-frame
  state sampled off the GPU loop: corridor depth and smoothed render FPS, plus the
  static pass facts (`GLSL · 50 STEPS`, `TANH · 0.2`).
- **Hold / Resume control** — drives the shader's `paused` prop directly, freezing
  and resuming the corridor (and the gauge/telemetry stay in sync).

An aperture vignette and faint scanlines pull the eye down the corridor throat and
read the whole thing as a CRT transit display. The entrance reveals respect
`prefers-reduced-motion`.

## Stack

React 18, TypeScript, Vite 5, Tailwind CSS v3, raw WebGL2 (no Three.js),
`lucide-react`. shadcn-style `@/*` path alias → `./src`.

## Assets

Fully self-contained / offline-ready. The Space Grotesk, Inter and JetBrains Mono
web fonts are vendored locally to `public/fonts/` and referenced from
`src/index.css` — no remote font requests at runtime. The visual is generated
entirely on the GPU, so there are no image assets.

## Run

```bash
npm install
npm run dev       # dev server
npm run build     # type-check + production build
npm run preview   # serve the production build
```

## Integration notes (per the prompt)

- **Project structure** — this is a Vite + React + TypeScript app with Tailwind
  CSS and the shadcn `@/components/ui` convention already wired up (the `@` alias
  is configured in both `vite.config.ts` and `tsconfig.json`). To drop the
  component into your own app instead, scaffold with the shadcn CLI
  (`npx shadcn@latest init`), which sets up Tailwind, TypeScript and the
  `components.json` alias map for you.
- **Why `/components/ui`** — shadcn treats `components/ui` as the home for
  primitive, copy-in UI building blocks resolved through the `@/components/ui`
  alias. Keeping the shader there means the import in the brief
  (`@/components/ui/atc-shader`) resolves unchanged and the component sits
  alongside the rest of your design-system primitives.
- **Dependencies** — the shader component itself needs nothing beyond React; it
  talks to WebGL2 directly. `lucide-react` is used only by the surrounding demo
  for icons.
- **Props / state** — the original component took no props and is preserved that
  way by default. The optional `paused` and `onSample` props are additive and
  default to the brief's behaviour.
- **Images** — none. The procedural shader is the entire visual, so no Unsplash
  stock imagery is needed.

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
