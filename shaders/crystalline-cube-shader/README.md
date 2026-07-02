# Crystalline Cube Shader — Interactive WebGL Ray-Marched SDF Gem Viewer (React, TypeScript, GLSL, shadcn/ui)

[![Watch Demo](./poster.jpg)](./demo.mp4)

An interactive WebGL ray-marched crystalline cube rendered entirely on the GPU — a sine-carved SDF box lit by a mouse-driven key light and tinted by an Inigo-Quilez procedural palette — packaged as a shadcn `@/components/ui` component and framed as a lapidary analysis bench with live specimen presets, a facet console, and a telemetry strip. The shader's four props (`complexity`, `colorShift`, `lightIntensity`, `mouseInfluence`) are exposed as calibrated faders with gemological labels, and four crystal presets (Aurora Quartz, Vermilion Garnet, Fissure Beryl, Glacier Spinel) snap all parameters at once. Generated with Claude Fable 5.

## Stack

React 18, TypeScript, Vite 5, Tailwind CSS v3 (PostCSS), `lucide-react`.
shadcn-style `@/*` path alias → `./src` (configured in both `vite.config.ts` and
`tsconfig`).

## Assets

Fully self-contained / offline-ready. The Fraunces, Space Grotesk and Space Mono
web fonts (latin subset) are vendored locally to `public/fonts/` and referenced
from `src/index.css` — no remote Google Fonts requests at runtime. The visual is
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
  CSS and the shadcn `@/components/ui` convention already wired up. To drop the
  component into your own app instead, scaffold with the shadcn CLI
  (`npx shadcn@latest init`), which sets up Tailwind, TypeScript and the
  `components.json` alias map for you.
- **Why `/components/ui`** — shadcn treats `components/ui` as the home for
  primitive, copy-in UI building blocks resolved through the `@/components/ui`
  alias. Keeping the shader there means the prompt's import
  (`@/components/ui/crystalline-cube`) resolves unchanged and the component sits
  alongside the rest of your design-system primitives.
- **Props / state** — the component takes the four numeric props from the brief
  (`complexity`, `colorShift`, `lightIntensity`, `mouseInfluence`), all with the
  brief's default values. The bench owns them as React state and feeds them
  straight back in, so every fader and preset re-renders the live shader.
- **Dependencies** — the shader itself needs nothing beyond React (raw WebGL,
  no Three.js); `lucide-react` is used by the surrounding bench for icons.
- **Images** — none. The procedural shader is the entire visual, so no Unsplash
  stock imagery is needed.
- **The reference demo** — the prompt's minimal slider demo is preserved as
  `src/components/demo.tsx` as a known-good copy-paste starting point; the
  polished bench in `src/App.tsx` is what the app renders.

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
