# Radial Aperture Shader — APERTURE — WebGL2 Radial Bloom Instrument (React + Vite + Tailwind CSS v4 + WebGL2)

A full-viewport WebGL2 radial-bloom hero framed as an optical instrument called APERTURE. The GLSL shader renders nine accumulating blades gated by an angular `smoothstep`, tone-mapped with `tanh`, on a single full-screen triangle — no Three.js, no textures, purely procedural. The page surrounds the live shader with a real-time telemetry HUD, a control deck that promotes the shader's baked constants (`9` blades, `0.03` gain, hue phase) to live uniforms, a GLSL anatomy walkthrough, a "field captures" gallery rendered headless from the shader itself, and a full integration story with copyable source. Integrated as a shadcn `@/components/ui` drop-in. Generated with Claude Fable 5.

[![Watch Demo](./poster.jpg)](./demo.mp4)

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check (tsc -b) + production build
npm run specimens  # re-render the gallery stills (headless)
```

## Integration notes (answering the brief)

This repo already satisfies the required stack, so no bootstrap was needed:

- **shadcn project structure** — `components.json` is present, the `@` alias resolves to `./src`
  (configured in both `vite.config.ts` and the tsconfigs), the `cn()` helper lives in
  `src/lib/utils.ts`, and UI components live in **`src/components/ui/`**.
- **Tailwind CSS** — Tailwind **v4** via `@tailwindcss/vite`; the entry stylesheet `src/index.css`
  begins with `@import "tailwindcss";`.
- **TypeScript** — strict mode with project references (`tsconfig.app.json` / `tsconfig.node.json`).

If you were starting from scratch instead:

```bash
npm create vite@latest aperture -- --template react-ts
cd aperture
npm install tailwindcss @tailwindcss/vite tw-animate-css
npm install clsx tailwind-merge lucide-react
npx shadcn@latest init          # creates components.json + the @/ alias + src/lib/utils.ts
# then drop the component into src/components/ui/raidal-2.tsx
```

### Why `components/ui`

shadcn's `components.json` pins the `ui` alias to `@/components/ui`. The CLI (`npx shadcn add …`)
writes generated primitives there, and every component import in the ecosystem is written as
`@/components/ui/<name>`. Keeping this exact folder means the brief's
`import Component from "@/components/ui/raidal-2"` resolves unchanged, and any future `shadcn add`
lands in the same place. This project's default component path **is** `src/components/ui`, so the
component was copied there verbatim (made TypeScript-correct).

### The drop-in vs. the showcase

- **`src/components/ui/raidal-2.tsx`** — the brief's component, kept faithful. The default export
  `Component` (a fixed, full-viewport bloom) and the inner `ShaderCanvas` are unchanged in behaviour.
  Only deliberate edits: dropped the meaningless `"use client"` (Vite SPA, not RSC), switched the
  unused `import React` to named hooks (strict `noUnusedLocals`), initialised the GLSL loop counter,
  and additionally **exported** `ShaderCanvas` + `SHADER_SRC` so the showcase can reuse the exact
  shader.
- **`src/components/ui/demo.tsx`** — the brief's demo, verbatim.
- **`src/components/aperture-canvas.tsx`** — an *additive* interactive driver: the **same** field
  with `9` / `0.03` / hue-phase promoted to `uBlades` / `uGain` / `uHue`, plus smoothed pointer
  parallax and a per-frame telemetry callback. The drop-in is never modified.

### Component questions

- **Props / data** — the drop-in needs **none**; it is fully self-contained and manages its own
  uniforms. The showcase's `<ApertureCanvas>` adds optional tuning props (`blades`, `spin`, `gain`,
  `hue`, `paused`, `pointerReact`, `pixelRatio`, `onFrame`).
- **State** — local `useState`/refs only. No context or store. Per-frame telemetry is written to DOM
  refs so the 60fps stream never triggers a React re-render.
- **Assets** — no external images. Two vendored `woff2` fonts (Space Grotesk + JetBrains Mono), an
  SVG favicon, and six locally-rendered specimen stills. All icons are `lucide-react`. Nothing is
  hotlinked — the project runs fully offline.
- **Responsive behaviour** — full-bleed at every breakpoint; the canvas tracks its box via
  `ResizeObserver` and clamps DPR to 1–2. The nav collapses its links on small screens and there is
  no horizontal overflow.
- **Best placement** — a hero / section background, or any positioned box. The default export is
  `fixed inset-0` for a full-viewport backdrop; `<ShaderCanvas>` (absolute `inset-0`) drops into any
  `relative` container.

## A note on the gallery

The brief's step *"fill image assets with Unsplash stock images"* can't be honoured literally here:
this build sandbox's network policy blocks every external image CDN (Unsplash, Picsum, Wikimedia,
NASA all return `403`), and hotlinking would break the offline/headless demo. Instead the **field
captures** gallery is rendered headless from this very shader at six presets and vendored under
`public/assets/specimens/` — real image assets, on-theme, fully self-contained. Swap in photos by
dropping files there and editing `SPECIMENS` in `src/App.tsx` if a networked environment is
available.

## Robustness

WebGL2 context creation is guarded (a null context bails instead of throwing out of the effect), and
`webglcontextlost` / `webglcontextrestored` are handled so a lost GPU context pauses and resumes
cleanly rather than crashing the React tree. Every canvas disposes its buffers/VAO on unmount.

## Verification

`scripts/verify.mjs` is a headless check (Playwright against a live dev server) that asserts no
console/page errors, that the WebGL2 hero actually paints a non-black, colored bloom (it decodes a
screenshot — not just `readPixels`), that all three live canvases mount, that the instrument UI,
control sliders, presets, integration copy and the six vendored specimens are present and decode,
that Space Grotesk loads, and that the mobile layout has no horizontal overflow.

```bash
URL=http://localhost:5312/ CHROME_PATH=/path/to/chrome node scripts/verify.mjs
```

## Tech

React 18 · TypeScript (strict) · Vite 6 · Tailwind CSS v4 · raw WebGL2 (no three.js) · lucide-react ·
Space Grotesk + JetBrains Mono (vendored).

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
