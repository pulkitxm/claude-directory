# Digital Petals — Interactive WebGL Polar-Coordinate Flower Shader (Three.js, GLSL, React, TypeScript)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A shadcn-style integration of the `DigitalPetalsShader` component — a polar-coordinate GLSL flower rendered on a single full-screen Three.js quad — framed as a herbarium specimen plate for a living digital cultivar, with a Petal Dial radial gauge that tracks the shader's live petal count, a cultivation log reading per-frame GPU state, and mouse-driven bloom lighting. The corolla breathes between three and seven petals, mixing magenta and blue pigments, and the specimen plate catalogues binomial name, plate number, and growth clock — all self-contained, fully offline, and interactive. Generated with Claude Fable 5.

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS v3 (shadcn-style `@/` alias, `components/ui` slot, `lib/utils`)
- Three.js (`ShaderMaterial` on an `OrthographicCamera` full quad)
- lucide-react icons
- Fraunces / Inter / JetBrains Mono — all vendored locally in `public/fonts`,
  so the project runs fully offline.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
npm run verify   # headless-Chromium checks (see below)
```

## What `npm run verify` checks

A headless Chromium drives the production preview and asserts:

1. the WebGL `<canvas>` is mounted under the brief's exact `aria-label`,
2. the WebGL context is live and the bloom is actually drawing **and animating**
   (composited-frame heuristics),
3. moving the cursor toward the plate center changes the live **Bloom index**
   (the shader's hidden `smoothstep` interaction is surfaced and real), and
4. **Press specimen** freezes the growth clock.

## Project structure (shadcn conventions)

```
src/
  components/
    ui/
      digital-petals-shader.tsx   # the brief's component (verbatim GLSL), typed
    demo.tsx                       # the canonical minimal example from the brief
  lib/
    utils.ts                       # cn() helper
  App.tsx                          # the specimen-plate showcase
  main.tsx
  index.css                        # Tailwind + vendored @font-face + demo styles
```

## Integration story (answering the brief)

The brief asks to drop an existing React component into a project that supports
the **shadcn structure, Tailwind CSS, and TypeScript**, copy it into
`/components/ui`, and install `three`.

**If you are starting from scratch**, scaffold an equivalent project and add the
component:

```bash
# 1) Vite + React + TypeScript
npm create vite@latest my-app -- --template react-ts
cd my-app

# 2) Tailwind CSS (v3)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
#   → set content: ["./index.html", "./src/**/*.{ts,tsx}"]
#   → add `@tailwind base; @tailwind components; @tailwind utilities;` to index.css

# 3) shadcn structure (the "@/components/ui" path alias)
npx shadcn@latest init        # choose the defaults; this wires up @/ and lib/utils
#   (or set the alias by hand in tsconfig + vite.config — see below)

# 4) the component's runtime dependency
npm install three
npm install -D @types/three
```

**Why `components/ui` matters.** shadcn's convention is that primitive,
copy-in components live under `@/components/ui`, while composed app pieces live
in `@/components`. The brief imports the shader as
`@/components/ui/digital-petals-shader`, so the folder must exist at exactly that
path for the import to resolve. Keeping it there also means the component reads
as a drop-in library primitive (like any other shadcn `ui` piece) rather than
app glue, and it stays portable: anyone can copy that one file into their own
`components/ui` and use it unchanged.

The `@/` alias is wired in two places so both the type-checker and the bundler
agree:

```ts
// tsconfig.app.json
"baseUrl": ".",
"paths": { "@/*": ["./src/*"] }

// vite.config.ts
resolve: { alias: { "@": path.resolve(__dirname, "./src") } }
```

### Answers to the brief's integration questions

- **What props are passed?** The brief's component takes none. This integration
  adds three optional, output-neutral props — `fitToParent`, `paused`, and an
  `onFrame(telemetry)` callback — so the plate can frame the shader and read its
  live state. With no props it behaves exactly like the brief (fixed,
  full-viewport, behind content, non-interactive).
- **State management?** None beyond local React state in the showcase. The shader
  owns a `requestAnimationFrame`/`setAnimationLoop` loop internally; the page
  mirrors props into refs so the loop never has to be torn down and rebuilt.
- **Required assets?** No images. The brief mentioned Unsplash/lucide-react as
  general guidance — this shader paints itself entirely on the GPU, so the only
  vendored assets are the three fonts, and lucide-react supplies the plate icons.
- **Responsive behavior?** The shader sizes to its host box via a
  `ResizeObserver`; the plate reflows from a four-column cultivation log on
  desktop down to a stacked two-column grid on mobile.
- **Best place to use it?** As an ambient, full-bleed background behind a hero,
  splash, or loading state — which is the framing shown here.

## Credit

Shader component from the integration brief. Everything around it
(specimen-plate framing, Petal Dial, cultivation log, verification) was built
for this experiment.

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
