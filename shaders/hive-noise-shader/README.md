# Hive — Noise Field

A self-contained **React + TypeScript + Vite + Tailwind CSS v4** project that integrates the
provided `hive.tsx` component — a raw **WebGL2** fragment shader that raymarches a 20-step noise
field and tints it with a warm amber&nbsp;&rarr;&nbsp;magenta cosine spectrum, flowing right to
left — and frames it as **HIVE**, a shadcn-style component lab.

The live shader is mounted **unedited** as a fixed, full-viewport background. Floating over it: a
frosted-glass hero, a compact **shader-spec HUD** (the component exposes no live stats, so the HUD
surfaces the shader's real shape — its two uniforms, raymarch step count and DPR clamp — rather than
faking telemetry), and an integration ticker. Below the fold is the full integration story — the
shadcn drop-in path, the default component/style paths, why `components/ui` matters, from-scratch
setup, copyable source, a render-pipeline walkthrough, and a props/state/assets Q&A.

![demo](./demo.mp4)

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check (tsc -b) + production build
```

## Integration notes (answering the prompt)

This repo already satisfies the required stack, so no project bootstrap was needed:

- **shadcn project structure** — `components.json` is present, the `@` alias resolves to `./src`
  (configured in both `vite.config.ts` and `tsconfig`), the `cn()` helper lives in
  `src/lib/utils.ts`, and UI components live in **`src/components/ui/`**.
- **Tailwind CSS** — Tailwind **v4** via `@tailwindcss/vite`; the entry stylesheet
  `src/index.css` begins with `@import "tailwindcss";` and `@import "tw-animate-css";`.
- **TypeScript** — strict mode with project references (`tsconfig.app.json` / `tsconfig.node.json`)
  and the `@/* → ./src/*` path mapping.

If you were starting from scratch instead:

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install tailwindcss @tailwindcss/vite tw-animate-css
npx shadcn@latest init          # creates components.json + the @/ alias + src/lib/utils.ts
```

### Default paths

Straight from `components.json`: the **components** path is **`@/components/ui`** and the **styles**
path is **`src/index.css`**. Both `hive.tsx` and `demo.tsx` were copied to `src/components/ui/`,
exactly where the prompt's `import ShaderDemo from "@/components/ui/hive"` resolves.

### Why `components/ui`

shadcn's `components.json` pins the `ui` alias to `@/components/ui`. The CLI (`npx shadcn add …`)
writes generated primitives there, and every component import in the ecosystem is written as
`@/components/ui/<name>`. Keeping this exact folder means the prompt's
`import ShaderDemo from "@/components/ui/hive"` resolves **unchanged**, hand-added and generated
primitives sit side by side, and the file stays portable into any other shadcn project. This
project's default component path **is** `src/components/ui`, so the component was copied there
verbatim.

### Component questions

- **Props / data** — **none.** `ShaderDemo` takes no props and is fully self-driving; the only thing
  a caller controls is the size of the wrapping element, which the `<canvas>` fills. The component is
  used exactly as provided.
- **State** — local only, and entirely inside one `useEffect`: the GL context, the linked program,
  the `u_res`/`u_time` uniform locations and the `requestAnimationFrame` handle. Nothing is lifted to
  props or context; no global store or provider is required.
- **Hooks / context** — only React's built-in `useRef` and `useEffect`. There is no custom hook to
  install and no provider to mount.
- **Assets** — **none.** The visual is 100% procedural GLSL — no images, no textures, no 3D models,
  no Three.js. Type uses a system font stack and every glyph in the lab is `lucide-react`, so the
  project runs fully offline. (The prompt's "fill image assets with Unsplash" step doesn't apply —
  the shader needs no imagery; the brand mark is an inline SVG and all UI icons are Lucide, per the
  "use lucide-react for svgs/logos" step.)
- **Responsive behavior** — full-bleed shader on every breakpoint. The component's own resize handler
  re-matches the drawing buffer to the element on each `resize` event, clamping DPR to **1–2×** so it
  stays crisp on retina without over-rendering on phones. The hero headline scales via
  `clamp(2.6rem, 7vw, 4.6rem)`, the spec HUD is shown from `lg` up, the docs grids reflow from 1 → 2
  → 3 columns, and there is no horizontal overflow at 390 px.
- **Best placement** — as a hero / section background. The canvas fills its parent, so the idiomatic
  use is a `fixed inset-0 -z-10` (or `relative h-screen`) wrapper with foreground content layered on
  top — exactly what `App.tsx` and `src/components/ui/demo.tsx` demonstrate.

## Verification

`scripts/verify.mjs` is a headless check (Playwright, run against a live dev server) that asserts no
console/page errors, that the **WebGL2 canvas mounts and paints visible light** (it decodes a
screenshot of the canvas — not just `readPixels` — and confirms the warm cosine palette by checking
red > blue), that the top bar / hero / docs / anatomy / "why `/components/ui`" sections all render,
that a docs copy button toggles to **Copied**, and it captures a desktop and a mobile screenshot.

Playwright is intentionally **not** a dependency of this project (so `npm install` never triggers a
browser download). The script resolves it from the shared demo recorder under
`scripts/record-demos`, or from `PLAYWRIGHT_PKG` if set.

```bash
# from the project folder, with Playwright resolvable:
URL=http://localhost:5314/ node scripts/verify.mjs
```
