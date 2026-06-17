# Shader Animation — shadcn/ui + Three.js component integration

A self-contained reference for dropping the **`ShaderAnimation`** component into a
shadcn/ui project. It is a GPU-driven WebGL fragment shader (radiating RGB lines)
wrapped as a zero-prop React component — and this app both **uses it** as a
full-bleed hero and **documents the integration** end to end.

The page answers every question in the integration brief: prerequisites, the
default `components/ui` path and why it matters, the single `three` dependency,
copy-paste usage, and a Q&A on props, state, assets, responsiveness, and where
to mount it.

## What's in the box

- **`src/components/ui/shader-animation.tsx`** — the component, pasted verbatim
  into the shadcn `ui` folder. Initializes a Three.js `WebGLRenderer`, a
  full-screen plane with a custom GLSL vertex + fragment shader, a
  resize-aware `requestAnimationFrame` loop, and a complete teardown on unmount.
- **`src/components/demo.tsx`** — the brief's `DemoOne` example, rendered
  untouched (the 650px bordered card with a centered wordmark).
- **`src/App.tsx`** — the showcase: a full-viewport shader hero, a live preview
  of `demo.tsx`, the setup / `components/ui` / install / usage sections, and the
  integration Q&A.

## The shadcn structure (the part the brief asks about)

This project ships the canonical shadcn/ui contract so the component's import
(`@/components/ui/shader-animation`) works untouched:

| File | Role |
|------|------|
| `components.json` | shadcn config — `style`, `tsx`, Tailwind paths, and the `aliases` block (`ui → @/components/ui`). |
| `tsconfig.json` | `"@/*": ["./src/*"]` path alias. |
| `vite.config.ts` | matching Vite `resolve.alias` for `@`. |
| `src/lib/utils.ts` | the `cn()` helper (`clsx` + `tailwind-merge`). |
| `src/index.css` | `@tailwind` layers + the HSL CSS-variable token set. |
| `tailwind.config.js` | tokens mapped to `hsl(var(--…))`, `tailwindcss-animate`. |

### If your project does **not** have shadcn / Tailwind / TypeScript

```bash
# Vite + React + TypeScript
npm create vite@latest my-app -- --template react-ts
cd my-app

# Tailwind CSS (v3) + PostCSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# shadcn/ui — writes components.json, the @/ alias, lib/utils.ts and CSS tokens
npx shadcn@latest init
```

### Why the component goes in `components/ui`

shadcn/ui resolves its `ui` alias to `components/ui` in `components.json`. Keeping
the file there means: (1) the demo's import path works as-is, (2) the shadcn CLI
can find / `diff` / update it later, and (3) reusable primitives stay separate
from app screens, in the one place every shadcn project shares. If your
`components.json` points `ui` elsewhere, either create `components/ui` and update
the alias, or change the import to match your layout.

## Install (in any shadcn project)

```bash
npm install three          # the only runtime dependency
npm install -D @types/three  # TypeScript users
# then paste components/ui/shader-animation.tsx
```

## Integration notes

- **Props:** none — it is self-driving (the `resolution` / `time` GLSL uniforms
  are managed internally).
- **State / context:** none — Three.js objects live in `useRef`s; the render loop
  is one self-disposing `useEffect`. No store, no provider.
- **Assets:** none — the visual is pure GPU maths (no images/textures). Icons on
  the page are `lucide-react`; the Geist fonts are vendored locally.
- **Responsive:** the renderer listens to `window.resize`, re-reads its container,
  and honours `devicePixelRatio`. Its root is `w-full h-screen`.
- **Placement:** best as an ambient hero / section background — overlay your
  headline and CTA on top. The hero in `App.tsx` mounts it inside an
  `absolute inset-0` layer so its `h-screen` measures against a deterministic box
  (a plain flex child gets squeezed and the canvas renders short).

## Stack

React 18 · TypeScript · Vite · Tailwind CSS · **Three.js** · shadcn/ui · Lucide.
Geist + Geist Mono (variable WOFF2) are **vendored locally** in `public/fonts` —
no CDN, fully runnable offline. The shader needs no image assets.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```
