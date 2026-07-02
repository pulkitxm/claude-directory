# Animated Shader Hero — WebGL2 Ember Field Hero Section (React + TypeScript + WebGL2 + Tailwind CSS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A full-viewport hero section backed by a live WebGL2 fragment shader rendering a drifting fractal ember field by Matthias Hurrle ([@atzedent](https://twitter.com/atzedent)) that reacts to pointer drags. The reusable `Hero` component accepts `trustBadge`, `headline`, `subtitle`, and `buttons` props, and pairs with a live uniforms HUD in the corner reporting real-time `time`, `resolution`, `pointerCount`, and FPS — proving it is a live WebGL program rather than a video loop. Built as a drop-in for shadcn + Tailwind CSS + TypeScript projects. Generated with Claude Fable 5.

This project adapts the prompt's "integrate this component into a shadcn/Tailwind/TS
codebase" task into a complete, working build. The exact `<Hero />` usage from the
prompt's `demo.tsx` drives the above-the-fold; the rest of the page is the showcase.

## Design

**Emberfield** — a generative hero studio. The palette is sampled from the shader's
own emitted colors (deep warm void + ember filaments), so the page chrome and the
canvas read as one material. Type pairs `Space Grotesk` (display), `Inter` (body), and
`JetBrains Mono` (the technical/code register). The signature element is the **live
uniforms HUD** in the top-right corner: it reports the shader's real-time `time`,
`resolution`, `pointerCount`, and FPS — proving the hero is a live WebGL program, not a
video loop, and that it responds to the pointer.

## Stack

- React 18, TypeScript (strict), Vite 5
- Tailwind CSS 3 (+ `cn` helper, shadcn-style `@/` alias)
- WebGL2 (ships inside the component — no 3D library)
- `lucide-react` for icons

## Structure (shadcn convention)

```
src/
  components/
    ui/
      animated-shader-hero.tsx   # the reusable, drop-in hero (the prompt's component)
      uniforms-hud.tsx           # live shader-telemetry overlay (signature element)
    showcase-sections.tsx        # integration / uniforms / how-to-use sections
  lib/
    utils.ts                     # cn() — clsx + tailwind-merge
  demo.tsx                       # the prompt's HeroDemo, wired into the showcase
  main.tsx
  index.css                      # Tailwind + hero keyframes + studio chrome
```

The hero lives in `@/components/ui` — the folder shadcn's `components.json` aliases to
`ui` — so `import Hero from "@/components/ui/animated-shader-hero"` resolves exactly as
written, with no path rewrites.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build (strict type-check + production build)
npm run verify     # headless Playwright checks (see below)
```

## Verification

`npm run verify` builds the project, serves the production bundle, and drives headless
Chromium (WebGL2 via Chromium's renderer) to assert:

1. the hero `<canvas>` has a live WebGL2 context with backing pixels;
2. the shader actually paints a non-black, warm (ember) field;
3. the live uniforms HUD renders and the `time` uniform advances frame to frame;
4. dragging the canvas registers pointer interaction ("disturbing the field");
5. the integration / `/components/ui` rationale / how-to-use sections render;
6. there are no console or page errors.

All 12 checks pass.

## Assets

Fully self-contained and offline-capable. The fonts (Space Grotesk, Inter, JetBrains
Mono — latin subsets) are vendored locally under `public/fonts/`. The component needs
no image assets (the background is a procedural shader, not a photo).

## Credit

Fragment shader by Matthias Hurrle ([@atzedent](https://twitter.com/atzedent)).

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
