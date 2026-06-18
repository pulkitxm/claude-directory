# Cosmic Plasma Web · Field Resonance Console

The brief's verbatim **`<PlasmaWeb>`** — an [OGL](https://github.com/oframe/ogl)
fragment shader that paints a layered plasma lattice of pulsing nodes, flowing
connective streams and excited particles — dropped untouched into a shadcn
`components/ui` project and framed as a **cursor-driven field-resonance console**.

The shader is entirely cursor-reactive (its `uMouse` / `uMouseAttraction`
uniforms pull the field toward the pointer), so the console leans into that: a
**cursor-tracking reticle** stands in for the pointer, faders re-drive the
shader's props live, named presets snap the lattice between regimes, and a
telemetry panel reads render rate + cursor position + an **engagement** signal
straight off the loop.

> Built for the fable demo recorder: a single, non-scrolling viewport so the
> recorder takes its **static** path and drives the cursor across the canvas —
> exactly the mouse-gesture footage this shader wants. `demo.mp4` shows the
> plasma bending toward the moving reticle.

## Answers to the integration brief

- **Does the codebase support shadcn / Tailwind / TypeScript?** Yes — this is a
  Vite + React + TypeScript project wired the shadcn way: `@` resolves to
  `./src` (see `vite.config.ts` + `tsconfig.app.json` `paths`), Tailwind is
  configured in `tailwind.config.js` / `postcss.config.js`, and `@/lib/utils`
  exports `cn`. If you were starting cold:
  ```bash
  npm create vite@latest my-app -- --template react-ts
  cd my-app && npm i -D tailwindcss postcss autoprefixer && npx tailwindcss init -p
  npx shadcn@latest init        # sets up components.json + the @ alias
  ```
- **Default component path → `components/ui`.** The component imports itself as
  `@/components/ui/cosmic-plasma-web`, so it lives at
  `src/components/ui/cosmic-plasma-web.tsx`. Keeping the `components/ui` folder
  is what lets shadcn's `@/components/ui/*` imports resolve consistently — every
  generated primitive (and this drop-in) expects that exact path, so a shared
  alias means no per-file path fixups when you add more pieces.
- **Dependency installed:** `ogl` (plus `lucide-react` for the console icons).
- **Props passed to the component:** `hueShift`, `density`, `glowIntensity`,
  `saturation`, `brightness`, `energyFlow`, `pulseIntensity`,
  `attractionStrength`, `speed`, `disableAnimation`, `mouseAttraction`,
  `mouseInteraction`, `transparent` — all wired to the console's faders /
  presets / freeze control.
- **State management:** none required — local React state in `App.tsx` holds the
  fader values; the shader owns its own animation + cursor smoothing internally.
- **Required assets:** none external. No images are needed (the shader is fully
  procedural), so the brief's "fill with Unsplash images" step doesn't apply.
  Fonts (Chakra Petch / Inter / JetBrains Mono) are **vendored locally** under
  `public/fonts/`; icons come from `lucide-react`.
- **Responsive behavior:** the canvas fills its container and re-sizes on
  `resize`; the console is a full-viewport overlay best viewed on desktop
  (≥ 1024px), where the cursor interaction is the point.
- **Best place to use it:** as a full-bleed hero / section background behind
  light foreground content, or — as here — as a standalone interactive shader
  showcase.

## Files

| Path | Role |
|------|------|
| `src/components/ui/cosmic-plasma-web.tsx` | **Verbatim** brief component (`PlasmaWeb`) |
| `src/components/demo.tsx` | **Verbatim** brief `DemoOne` usage |
| `src/App.tsx` | The console: reticle, faders, presets, telemetry |
| `scripts/verify.mjs` | Headless CLI checks (canvas, animation, faders, cursor, freeze) |

The two verbatim files are preserved exactly as pasted and are excluded from the
strict type-check only (never edited); the typed console is fully checked.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # tsc -b && vite build
npm run verify    # boots the app headless and asserts the shader + cursor work
```

## Verification

`npm run verify` boots the dev server, drives a headless Chromium and asserts:
the `<PlasmaWeb>` canvas mounts, the WebGL context is live and sized, the
lattice draws and animates, the Hue Shift fader re-drives the shader, the cursor
excites the field (Engagement climbs `0% → ~98%` on pointer move), the Freeze
control flips the status to `FROZEN`, and no runtime errors fire — **9/9 pass**.

## Stack

React · TypeScript · Vite · Tailwind CSS · shadcn structure · OGL · Lucide
