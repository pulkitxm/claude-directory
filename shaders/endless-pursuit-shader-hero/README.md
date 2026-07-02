# Endless Pursuit — Monochrome Shader Hero Section (React + TypeScript + Vite + Tailwind CSS v4)

A full-viewport landing hero section built around the UIMIX "ENDLESS PURSUIT" monochrome design — bold serif headline, corner frame accents, CTA buttons, and a live animated background. The remote UnicornStudio scene is preserved verbatim and layered over a dependency-free WebGL fallback shader (drifting cosmic nebula, endless orbit arc, parallax twinkling stars) so the hero is alive even offline, with a pure-CSS starfield as a final no-WebGL fallback. Adapts from Next.js to plain Vite + React with no behaviour change. Generated with Claude Fable 5.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check (tsc -b) + production build
npm run verify   # build verification (see below)
```

## Integration notes (answering the prompt)

This repo already satisfies the required stack, so no project bootstrap was needed:

- **shadcn project structure** — `components.json` is present, the `@` alias resolves to `./src`
  (configured in both `vite.config.ts` and `tsconfig`), the `cn()` helper lives in
  `src/lib/utils.ts`, and UI components live in **`src/components/ui/`**.
- **Tailwind CSS** — Tailwind **v4** via `@tailwindcss/vite`; the entry stylesheet `src/index.css`
  begins with `@import "tailwindcss";` and `@import "tw-animate-css";`.
- **TypeScript** — strict mode, project references (`tsconfig.app.json` / `tsconfig.node.json`).

If you were starting from scratch instead, you would:

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install tailwindcss @tailwindcss/vite tw-animate-css
npx shadcn@latest init          # creates components.json + the @/ alias + src/lib/utils.ts
```

### Why `components/ui`

shadcn's `components.json` pins the `ui` alias to `@/components/ui`. Generated primitives
(`npx shadcn add …`) land there, and ecosystem imports are written as `@/components/ui/<name>`.
Keeping this exact folder means the prompt's `import Home from "@/components/ui/hero-ascii-one"`
resolves unchanged. This project's default component path **is** `src/components/ui`, so the
component was copied there and adapted to be Vite/TypeScript-correct.

### What changed from the pasted snippet (and why)

The snippet is written for **Next.js**; two of its features don't exist in a plain Vite + React
project, so they were adapted (behaviour preserved):

- **`'use client'`** — a Next.js directive with no meaning in Vite; removed.
- **`<style jsx>`** — styled-jsx is a Next.js feature. Its two classes (`.dither-pattern`,
  `.stars-bg`) were moved **verbatim** into the global `src/index.css`.
- **Robustness** — the cleanup now clears every timer and guards `removeChild` (so React 18
  StrictMode's double-mount can't throw), and a WebGL fallback + detection was added.

### Component questions

- **Props / data** — the component is self-contained and takes no required props. The internal
  `ShaderBackdrop` manages its own `iTime` / `iResolution` uniforms.
- **State** — local `useState` only (`unicornActive` — flips once the remote UnicornStudio canvas
  actually mounts, fading the offline backdrop out behind it). No global store or context required.
- **Assets** — there are **no `<img>` assets** in this design; the background is shader-driven, so
  no Unsplash imagery was needed. Icons are `lucide-react` (`Infinity`, `Mountain`, `ArrowUpRight`,
  `LoaderCircle`), and **JetBrains Mono** is self-hosted under `public/fonts/`.
- **Responsive behavior** — full-bleed on every breakpoint. On `lg+` the UnicornStudio scene and the
  desktop-only technical accents show; on small screens the layout collapses to the CSS/WebGL
  starfield with the hero copy, with no horizontal overflow.
- **Best placement** — a full-viewport landing hero. `DemoOne` mounts it in a `w-screen h-screen`
  shell, matching the provided `demo.tsx`.

## The one remote dependency

The UnicornStudio scene (`data-us-project="OMzqyUv6M3kSnv0JeAtC"`) is a license-locked, server-hosted
resource loaded by id from UnicornStudio's CDN — it **cannot be vendored** locally. The embed and its
loader are kept exactly as provided, but because of the bundled WebGL + CSS fallbacks the project is
fully functional and self-contained without it (e.g. offline, on locked-down networks, or in CI). It
is the only external dependency in the project; everything else is local.

## Verification

`npm run verify` (`scripts/verify.mjs`) runs in two phases:

- **Static (always):** parses the production `dist/` output to prove the component integrated and
  bundled — the hero copy, the UnicornStudio embed, the offline WebGL GLSL, the vendored JetBrains
  Mono woff2s, and the moved global CSS classes. Needs no browser.
- **Live (best-effort):** if a Chromium is discoverable (`CHROME_PATH` or a common system path) and
  `playwright` is importable, it serves `dist/` and asserts the DOM renders and the shader field
  paints non-flat-black pixels. Skipped cleanly when no browser is present.

## Demo

[![Watch Demo](./poster.jpg)](./demo.mp4)

Recorded with the repo recorder:

```bash
cd scripts/record-demos && npm install
./record-one.sh ../../shaders/endless-pursuit-shader-hero
```

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
