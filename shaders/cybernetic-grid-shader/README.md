# Cybernetic Grid Shader — Interactive Three.js WebGL Lattice with Mouse Warp (React, TypeScript, GLSL)

[![Watch Demo](./poster.jpg)](./demo.mp4)

An interactive Three.js / WebGL "Cybernetic Grid" shader — a pulsing cobalt lattice with magenta energy crawling the intersections and a bright glow that warps the grid around the cursor — framed inside a lattice-integrity diagnostic console with a live probe caliper, field-health gauge, and real-time telemetry readouts. The component lives at the shadcn `@/components/ui` path and drops cleanly into any Vite + React + TypeScript project with Tailwind CSS. Generated with Claude Fable 5.

## Integration story (per the brief)

The brief asks for a codebase with **shadcn structure + Tailwind + TypeScript**,
and for the component to live at **`/components/ui`**. This project ships that:

- **shadcn project structure** — `@/` resolves to `src/` (see `vite.config.ts`
  and `tsconfig.app.json`), and the canonical helpers live where shadcn expects
  them (`@/lib/utils`). The component sits at `@/components/ui/cybernetic-grid-shader`.
- **Why `components/ui`** — shadcn's generator copies primitives into
  `components/ui` and rewrites imports against the `@/` alias. Keeping the file
  there means the brief's import path
  `import CyberneticGridShader from "@/components/ui/cybernetic-grid-shader"`
  resolves unchanged, and any future `npx shadcn@latest add ...` lands its
  components alongside this one without path surprises.
- **Tailwind + TypeScript** — Tailwind v3 is wired through `postcss.config.js`
  and `tailwind.config.js` (the shader palette is exposed as design tokens), and
  the whole project is strict TypeScript.

If you are starting from scratch, the equivalent setup is:

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p
npx shadcn@latest init          # sets up @/ alias + components/ui + lib/utils
npm install three @types/three
# then drop cybernetic-grid-shader.tsx into src/components/ui/
```

### Answers to the brief's integration questions

- **Props / data** — the original component takes none. This integration adds
  two optional, no-op-default props (`paused`, `onFrame`) layered on top of the
  unchanged render path, so `<CyberneticGridShader />` still behaves exactly as
  the prompt's drop-in. `demo.tsx` preserves that minimal example verbatim.
- **State** — no global state or context is required; everything lives in the
  component's WebGL effect and the console's local React state.
- **Assets / icons** — no images are needed (the visual is GPU-generated).
  SVGs/logos use **lucide-react** as the brief suggests. Fonts are vendored.
- **Responsive** — the canvas is fixed full-viewport and resizes with the
  window; the HUD reflows (the integrity gauge hides below `lg`, the telemetry
  rail collapses to two columns on small screens).
- **Where to use it** — as a full-bleed animated background behind a hero or, as
  here, a diagnostic/landing surface.

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS (shadcn-style structure, `@/` → `src/`)
- Three.js (WebGL shader background)
- lucide-react (HUD icons)
- Chakra Petch / Inter / IBM Plex Mono — vendored locally in `public/fonts`

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
npm run verify     # headless Chromium checks (canvas, warp, freeze)
```

## Controls

- **Move the cursor** — deflects the grid; energy and a bright glow warp around
  the probe.
- **Hold lattice** — pauses the animation clock; the field holds in place.
- **Re-seed** — remounts the shader and resets the field clock to zero.

Everything is self-contained and runs offline — no remote assets.

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
