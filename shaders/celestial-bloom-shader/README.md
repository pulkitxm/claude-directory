# Celestial Bloom Shader — Procedural Nebula & Star Field GLSL Background (React + Three.js + Tailwind)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A procedural GLSL fragment shader rendering a slowly rotating five-petalled nebula with a glowing star core and twinkling star field — rendered full-viewport via Three.js and framed as an observatory specimen plate UI with live telemetry HUD. The component is integrated verbatim at the shadcn `@/components/ui` path, wrapped in an engraved hero lockup, surveyor reticle, and a bottom telemetry bar reporting shader time, FPS, petal count, and pipeline state — ideal as a dark hero section background or standalone interactive animation. Generated with Claude Fable 5.

The shader component from the prompt is integrated verbatim (shader code,
animation loop, resize handling, and cleanup unchanged) at
`src/components/ui/celestial-bloom-shader.tsx`, the canonical shadcn
`@/components/ui` location. It is wrapped in a deliberate piece of chrome:

- **Engraved hero lockup** — `Celestial Bloom` set in Fraunces over the bloom,
  with the brief's required `app-container` / `content-overlay` structure and
  the `A Procedural Shader Animation` subtitle intact.
- **Reticle / registration frame** — corner brackets, a faint surveyor's grid,
  scanlines and a centre cross-hair aligned to the bloom core.
- **Live telemetry HUD (signature element)** — the shader emits per-frame
  telemetry (`time`, `fps`, `pixelRatio`) through an `onFrame` callback, and the
  bottom bar reports the shader's own state: a mission clock that advances with
  shader time, smoothed render FPS, the petal count, sample rate and pipeline.

Palette and type are derived from the shader's own GLSL constants (deep-space
violet `#0d0019`, nebula `#8033cc`, star `#fffce6`). Type pairing: Fraunces
(display) · Inter (body) · Space Mono (data). Icons from `lucide-react`.
The entrance reveal and the live pulse both respect `prefers-reduced-motion`.

## Stack

React 18, TypeScript, Vite 6, Tailwind CSS v4 (`@tailwindcss/vite`), Three.js,
`lucide-react`. shadcn-style `@/*` path alias → `./src`.

## Assets

Fully self-contained / offline-ready. The Fraunces, Inter and Space Mono web
fonts (latin subset) are vendored locally to `public/fonts/` and referenced via
`src/fonts.css` — no remote Google Fonts requests at runtime. The visual is
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
  (`@/components/ui/celestial-bloom-shader`) resolves unchanged and the
  component sits alongside the rest of your design-system primitives.
- **Dependencies** — only `three` is required by the component itself;
  `lucide-react` is used by the surrounding demo for icons.
- **Props / state** — the original component took no props. It is preserved as
  a zero-config fixed background; the optional `petals`, `className` and
  `onFrame` props are additive and default to the brief's behavior.
- **Images** — none. The procedural shader is the entire visual, so no Unsplash
  stock imagery is needed.

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
