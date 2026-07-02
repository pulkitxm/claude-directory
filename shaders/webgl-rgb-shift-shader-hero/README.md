# CHROMA OSC — WebGL RGB-Split Shader Hero (React + Three.js + Tailwind CSS + shadcn)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A live oscilloscope instrument hero framed in a shadcn-structured React app, built around a `RawShaderMaterial` GLSL pass that draws three additive sine ribbons on pure black with R/G/B channels distorted by a radial term — chromatic aberration baked directly into the math. The surrounding instrument card keeps a hairline `#27272a` border, corner brackets, an RGB-split mirrored headline, a sweeping scan line, a pinging green "available" pulse dot, and a `LiquidButton` CTA. Top and bottom mono telemetry strips read the page's real frame rate and shader uptime, sampled from `requestAnimationFrame`. Generated with Claude Fable 5.

## Stack

React 18 · TypeScript · Vite · Tailwind CSS · shadcn structure · three.js · CVA ·
`@radix-ui/react-slot` · lucide-react

## Project shape (shadcn defaults)

The default component path is `@/components/ui` — required so the prompt's
`@/components/ui/web-gl-shader` and `@/components/ui/liquid-glass-button` imports resolve.
The `@` alias maps to `./src` (`vite.config.ts` + `tsconfig`), `cn` lives in
`@/lib/utils`, and tokens/theme are defined in `src/index.css` + `tailwind.config.ts`.

```
src/
  components/
    demo.tsx                       # the prompt's DemoOne, verbatim
    ui/
      web-gl-shader.tsx            # the prompt's WebGLShader, verbatim
      liquid-glass-button.tsx      # the prompt's LiquidButton/Button/MetalButton, verbatim
  lib/utils.ts                     # cn()
  App.tsx                          # the framed instrument hero
  index.css                        # tokens + vendored @font-face
public/fonts/                      # Space Grotesk, JetBrains Mono, Inter (woff2, offline)
```

## Assets

All fonts (Space Grotesk display, JetBrains Mono telemetry, Inter body) are vendored
locally in `public/fonts/` as variable woff2 files — no external requests, fully offline.
The shader needs no image assets; it is generated entirely in GLSL.

## Run

```sh
npm install
npm run dev      # dev server
npm run build    # type-check + production build
npm run preview  # serve the production build
```

See `prompt.md` for the original integration prompt.

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
