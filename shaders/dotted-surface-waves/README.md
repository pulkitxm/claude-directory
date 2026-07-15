# Dotted Surface Waves — Three.js Animated Dot Lattice Background (React + TypeScript + Three.js + Tailwind CSS)

A full-viewport Three.js `Points` lattice (40 × 60 = 2,400 dots) whose Y position is displaced by two crossing sine waves, creating a mesmerising animated dot field. Wrapped in a "field generator" showcase with a live dark/light theme toggle that swaps the dot colour palette (light dots on dark, dark dots on light). Ideal as a hero section background or ambient landing page visual. Generated with Claude Fable 5.

[![Watch Demo](./poster.jpg)](./demo.mp4)

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
- **TypeScript** — strict mode, project references (`tsconfig.app.json` / `tsconfig.node.json`).

If you were starting from scratch instead, you would:

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install tailwindcss @tailwindcss/vite tw-animate-css
npx shadcn@latest init          # creates components.json + the @/ alias + src/lib/utils.ts
```

### Why `components/ui`

shadcn's `components.json` pins the `ui` alias to `@/components/ui`. The CLI (`npx shadcn add …`)
writes generated primitives there, and every component import in the ecosystem is written as
`@/components/ui/<name>`. Keeping this exact folder means the prompt's
`import { DottedSurface } from "@/components/ui/dotted-surface"` resolves unchanged, and any future
`shadcn add` lands its files in the same place without churn. This project's default component path
**is** `src/components/ui`, so the component was copied there verbatim.

### `next-themes` outside Next.js

The component calls `useTheme()` from **`next-themes`**, so the tree is wrapped in a
`<ThemeProvider attribute="class" defaultTheme="dark">` in `src/main.tsx`. `next-themes` is not
Next-specific — it just toggles `class="dark"` on `<html>` and persists the choice — so it works
under plain Vite. The `'use client'` directive at the top of the component is a harmless no-op
here (Vite has no React Server Components boundary). The component reads `theme` to choose its
particle colour: `rgb(200,200,200)` light dots in dark mode, `rgb(0,0,0)` dark dots in light mode.

### Component questions

- **Props / data** — `DottedSurface` takes the native `div` props minus `ref`; the only one used
  here is `className` (`"size-full"`). The wave geometry/uniforms are managed internally.
- **State** — no local component state. The only state is `next-themes`' theme (and a small
  `mounted` flag in the page chrome to avoid a hydration flash on the toggle icon). No global store.
- **Assets** — **none are required.** This is pure `three.js` geometry — no images, textures, or
  models — so the prompt's "fill image assets with Unsplash" step does not apply. The only icons are
  `lucide-react` (`Sun` / `Moon` / `Waves`). Two self-hosted **Geist / Geist Mono** woff2 files live
  in `public/fonts/`; nothing is hotlinked, so the project runs fully offline.
- **Responsive behavior** — full-bleed on every breakpoint; the header/footer wrap on small screens,
  the heading scales (`text-5xl → text-7xl`), and there is no horizontal overflow.
- **Best placement** — as a background. The surface is `pointer-events-none fixed inset-0`, so any
  foreground section (here: the centred lockup + radial glow) sits on top of it.

## Verification

`scripts/verify.mjs` is a headless check (Playwright, run against a live dev server) that asserts no
fatal console/page errors, the three.js `<canvas>` mounts full-viewport and **paints** the dot field
(it decodes a screenshot band below the heading and checks for real luminance contrast — light dots
on a dark ground), the centred heading / brand / telemetry render, Geist Mono is applied, and then
**flips the theme via the real toggle** and asserts the field re-renders markedly brighter (dark dots
on a light ground). It finishes with a mobile pass (heading visible, no overflow).

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
