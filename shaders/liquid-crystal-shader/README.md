# Liquid Crystal Shader — Interactive WebGL Simplex-Noise Interference Bands (React + TypeScript + WebGL)

[![Watch Demo](./poster.jpg)](./demo.mp4)

An interactive raw-WebGL fragment shader featuring simplex-noise interference bands on a full-screen quad, warped by the pointer, integrated as a shadcn `@/components/ui` component and framed as a polarized-light microscopy bench. The six live uniforms — hue, speed, noise, warp, zoom, brightness — are controlled by the prompt's `ControlsPanel`, while a specimen reticle, instrument telemetry rail, and optical mineralogy band readout complete the microscopy metaphor. Built with React 18, TypeScript, Vite 6, and Tailwind CSS v3 using raw WebGL — no Three.js. Generated with Claude Fable 5.

The component from the prompt is integrated verbatim at
`src/components/ui/liquid-crystal.tsx`, the canonical shadcn `@/components/ui`
location. The GLSL shader source, the raw-WebGL management hook, the uniform
wiring, the `ControlsPanel`, and the `InteractiveShader` quad are unchanged from
the brief; the JS was ported to TypeScript and given one additive, optional
`onFrame` telemetry callback so the host page can read live shader state (time,
FPS, mouse-warp centre) straight off the render loop. (A small correctness fix:
the loop now reads its params from a ref, so dragging a slider re-tints the
field instead of tearing down and restarting the animation.)

It is wrapped in a deliberate piece of chrome:

- **The prompt's `ControlsPanel`**, kept exactly where the brief places it
  (top-left), driving the six uniforms — `hue`, `speed`, `noise`, `warp`,
  `zoom`, `brightness`.
- **Specimen reticle (signature element)** — a crossed-polarizer graticule with
  degree ticks and a centre crosshair that floats over the field and tracks the
  mouse-warp centre, tying the abstract bands to the microscopy metaphor. Purely
  decorative and `pointer-events: none`.
- **Instrument rail** — a brushed-metal eyepiece column reading live telemetry
  off the shader's own per-frame callback: uptime, frame rate, the dominant
  interference band, hue, warp coordinates and field of view.
- **Integration docket** — a collapsible drawer that tells the shadcn
  integration story: where the component lives, why it belongs in
  `@/components/ui`, the dependencies it needs, and a copyable usage snippet.

The "band" readout maps the `hue` uniform onto the vocabulary of optical
mineralogy (`src/lib/birefringence.ts`): under crossed polarizers a birefringent
specimen shows interference colours that climb through Newton's orders, so the
HUD names the colour the way a petrographer would rather than printing a number.
Type pairing: Fraunces (display) · Inter (body) · Space Mono (data). Icons from
`lucide-react`.

## Stack

React 18, TypeScript, Vite 6, Tailwind CSS v3, raw WebGL (no three.js),
`lucide-react`, `clsx` + `tailwind-merge` (`cn()` helper). shadcn-style `@/*`
path alias → `./src`.

## Assets

Fully self-contained / offline-ready. The Fraunces, Inter and Space Mono web
fonts (latin subset) are vendored locally to `src/fonts/` and referenced via
`src/fonts/fonts.css` — no remote Google Fonts requests at runtime. The visual
is generated entirely on the GPU, so there are no image assets.

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
  CSS and the shadcn `@/components/ui` convention already wired up (the `@` alias
  is configured in both `vite.config.ts` and `tsconfig.json`, and a
  `components.json` is present). To drop the component into your own app instead,
  scaffold with the shadcn CLI (`npx shadcn@latest init`), which sets up Tailwind,
  TypeScript and the `components.json` alias map for you.
- **Why `/components/ui`** — shadcn treats `components/ui` as the home for
  primitive, copy-in UI building blocks resolved through the `@/components/ui`
  alias. Keeping the shader there means the brief's import
  (`@/components/ui/liquid-crystal`) resolves unchanged and the component sits
  alongside the rest of your design-system primitives.
- **Dependencies** — the shader itself is raw WebGL with **no external
  rendering dependency** (no three.js); `lucide-react` is used only by the
  surrounding bench chrome for icons. No context provider or hook is required.
- **Props / state** — `InteractiveShader` takes the six `ShaderParams` uniforms
  as controlled props plus an optional, additive `onFrame` callback;
  `ControlsPanel` takes `params` and a curried `onParamChange` handler, exactly
  as in the brief's `demo.tsx`.
- **Images** — none. The procedural shader is the entire visual, so no Unsplash
  stock imagery is needed.

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
