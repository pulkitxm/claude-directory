# Shader Lines Showcase — GLSL Line-Field Component Integration for shadcn (Three.js + React + TypeScript)

A shadcn-style component library documentation page that integrates the **Shader Lines** GLSL fragment shader — a generative full-screen line field rendered with Three.js inside a single React component (`ShaderAnimation`). The shader accumulates five offset lines per colour channel, producing warm chromatic streaks at 60 fps. The docs page presents it live, documents the drop-in API, and explains its anatomy for teams adopting it in their own shadcn + Tailwind + TypeScript apps. Generated with Claude Fable 5.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc type-check + production build
npm run preview    # serve the production build
```

## Project shape (shadcn-ready)

This project already supports the three things the brief asks for:

- **shadcn project structure** — `components.json` declares the aliases, and the
  component lives at `src/components/ui/shader-lines.tsx`.
- **Tailwind CSS** — `tailwind.config.js` + `postcss.config.js`, tokens in
  `src/index.css`.
- **TypeScript** — `tsconfig.json` with the `@/*` → `src/*` path alias, mirrored
  in `vite.config.ts` so the demo's import resolves verbatim.

If you are starting from scratch instead, the equivalent setup is:

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm i -D tailwindcss postcss autoprefixer && npx tailwindcss init -p
npx shadcn@latest init        # writes components.json + the @/ alias
```

### Why `/components/ui` matters

shadcn's convention is that copy-pasteable primitives live in
`@/components/ui`. The demo imports the component as
`@/components/ui/shader-lines`. That import only resolves because:

1. the `@` alias points at `src` (set in both `tsconfig.json` and
   `vite.config.ts`), and
2. the file physically sits in `src/components/ui/`.

If the folder doesn't exist (or the alias points elsewhere), the import fails to
resolve and the build breaks. Keeping the file in `components/ui` is the
contract every other shadcn component relies on — so create the folder and the
rest is copy-paste.

## The component

`src/components/ui/shader-lines.tsx` — exports `ShaderAnimation`.

```tsx
import { ShaderAnimation } from "@/components/ui/shader-lines";

<div className="relative h-[650px] w-full overflow-hidden rounded-xl">
  <ShaderAnimation />
  <span className="absolute inset-0 grid place-items-center text-7xl text-white">
    Shader Lines
  </span>
</div>
```

### Integration notes (answers to the brief's questions)

- **Props / data** — none are required. The component takes two *optional*
  props: `className` (classes for the canvas host; defaults to filling its
  parent) and `speed` (clock multiplier, default `1`). It carries no internal
  app state and needs no context providers.
- **State management** — self-contained. It keeps Three.js handles in a ref and
  tears them down on unmount.
- **Required assets** — **no images or icons** are needed by the shader itself,
  so the brief's "fill image assets with Unsplash" step does not apply. The only
  runtime dependency is Three.js, which is **vendored locally** (see below). The
  surrounding docs page uses `lucide-react` icons, per the brief.
- **Responsive behaviour** — the canvas fills whatever box you give it. A
  `ResizeObserver` watches the *parent element* (not just the window), so the
  field re-samples correctly inside flex/grid layouts and on rotation. Give the
  parent a height (`h-[650px]`, `h-screen`, etc.) and the rest is automatic.
- **Best place to use it** — as an ambient background behind a hero headline or
  CTA, or as a self-contained "live" card. It is `aria-hidden` and
  `pointer-events: none`-friendly, so it never steals focus or clicks from the
  content layered on top.

## Changes made vs. the raw snippet

The behaviour and shader are identical; the integration hardens it for real use:

- **Three.js is vendored** to `public/vendor/three.min.js` (r89) and loaded from
  there instead of a CDN, so the component runs fully offline.
- **One shared loader** — the `<script>` is injected once and reused, so a second
  instance (or React 18 StrictMode's double-mount) doesn't load Three.js twice.
- **`ResizeObserver`** tracks the parent box, not only `window` resizes.
- **Clean teardown** — animation frame cancelled, renderer disposed, WebGL
  context released, and the canvas removed on unmount.
- **`className` + `speed` props** for reuse without forking the file.

## Assets — all vendored, runs offline

- `public/vendor/three.min.js` — Three.js **r89**, downloaded from
  `https://cdnjs.cloudflare.com/ajax/libs/three.js/89/three.min.js`.
- `public/fonts/*.woff2` — Space Grotesk (display), Inter (body), JetBrains Mono
  (code/data), latin subsets from Google Fonts, declared with `@font-face` in
  `src/index.css`. No external font requests at runtime.

## Verification (CLI only)

- `npm run build` — `tsc` (strict, `noUnusedLocals`) + Vite production build.
- Headless Chromium (Playwright) confirmed: the shader canvas mounts and the
  browser compositor renders the colourful line field; fonts load locally; the
  tabbed code panel, copy buttons, and speed dial all work; **zero** console
  errors and **zero** failed network requests (all assets served same-origin).

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
