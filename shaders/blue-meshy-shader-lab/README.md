# Blue Meshy Lab — WebGL2 Domain-Warped fBm Sea Shader Background (React + TypeScript + WebGL2 + Tailwind CSS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A procedural WebGL2 background component (`WavyBackground`) rendering a domain-warped fractal-noise (fBm) sea using a 20-step blue palette, from deep-abyss transparency to bright sea-blue, on a single full-screen quad. The shader applies sine-based domain warping and swirl distortion over 10 fBm octaves, with the darkest noise values rendered transparent for compositing flexibility. Framed as a shadcn integration lab with a live hero preview, setup guide, component anatomy, props and shader-parameter reference, and a usage gallery. Generated with Claude Fable 5.

Built with **React + TypeScript + Vite + Tailwind CSS** on the **shadcn**
project structure, exactly as the prompt requires. The component and its demo
are consumed verbatim from `components/ui`.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
```

## What's here

- **Live hero** — the verbatim `WavyBackground` component as a true
  `min-h-screen` full-bleed background, carrying the shipped demo's *“Turning
  Ideas Into Impact”* lockup over a legibility scrim, corner reticle brackets
  and a scroll cue.
- **Setup guide** — the shadcn CLI / Tailwind / TypeScript steps, the `@/*`
  path alias, and the `cn()` helper, each in a copyable code block.
- **Anatomy** — what actually powers the effect (raw WebGL2, zero deps,
  transparent compositing, a self-cleaning render loop).
- **API reference** — the two component props plus the full table of
  module-level shader constants so the look can be forked.
- **Usage gallery** — three patterns the transparent background suits.

## Design notes

- **Subject:** a component lab for a single drop-in WebGL background. The shader
  *is* the hero — no stock photography is needed for the effect itself.
- **Type:** Space Grotesk (display), Inter (body/UI), JetBrains Mono
  (code/telemetry). All three are **vendored locally** (latin `woff2` in
  `src/fonts/`) so the project runs fully offline — no runtime CDN calls.
- **Palette:** a deep **abyss** console (`#03070f`) with a **sea** accent ramp
  (`#0a73bf → #b3e6ff`) mirrored directly from the shader's own 20-step blue
  palette.
- **Signature element:** the live field is framed as something *under
  observation* — corner reticle brackets, a vignette + top/bottom scrims for
  text legibility, and a sticky glass nav.
- **Assets:** the three usage-gallery thumbnails are generated locally (ffmpeg)
  into `public/img/` rather than hotlinked, keeping the project fully
  self-contained. Icons are `lucide-react`.

---

# Integration guide (answering the prompt)

The prompt is a shadcn-style *“integrate this component”* brief. Here are the
answers it asks for.

## 1. Project prerequisites (shadcn + Tailwind + TypeScript)

This project already ships the required stack. To drop the component into a
**fresh** app instead:

```bash
# Scaffold a Vite + React + TypeScript app
npm create vite@latest my-app -- --template react-ts
cd my-app && npm install

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Initialise shadcn (writes components.json + lib/utils.ts)
npx shadcn@latest init
```

Then make sure the `@/*` alias the component imports rely on exists, in both
`tsconfig.json` and `vite.config.ts`:

```jsonc
// tsconfig.json
{ "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["./src/*"] } } }
```

## 2. Default paths — and why `components/ui` matters

shadcn resolves two aliases from `components.json`: `ui → @/components/ui` and
`utils → @/lib/utils`. **If your default component path is not
`/components/ui`, create it.** It is the convention every shadcn component (and
the CLI's `add` command) writes to and imports from. Keeping it consistent
means the `@/` imports in `blue-meshy-background.tsx` resolve unchanged,
generated components land in a predictable place, and your low-level primitives
stay cleanly separated from composed app components.

This project ships exactly that layout:

```
src/
  components/
    ui/blue-meshy-background.tsx   · the verbatim component
    ui/demo.tsx                    · the verbatim demo
    code-block.tsx                 · lab chrome
    section.tsx                    · lab chrome
  lib/utils.ts                     · cn() helper
```

## 3. Dependencies, props, state & assets

- **External dependencies:** only `react`, plus `clsx` + `tailwind-merge` for
  the `cn()` helper. The component uses **raw WebGL2** — no `three.js`, no
  shader library. `lucide-react` is used for the lab's icons.
- **Props:** `children: React.ReactNode` (overlay content — give it `z-10`) and
  an optional `className` (merged via `cn()` — set height/layout here, e.g.
  `flex min-h-screen items-center justify-center`). There are **no data props**;
  every visual is a baked-in module constant.
- **State / context:** none external. A single `useEffect` owns the WebGL
  context, the `requestAnimationFrame` loop and a resize listener, and releases
  every GL resource on unmount. No providers or hooks to install.
- **Assets:** **none required** for the effect — it is fully procedural.
- **Responsive behaviour:** the canvas tracks `window.innerWidth/innerHeight`
  every frame, so it always fills the viewport and re-fits on resize.
- **Best place to use it:** a full-bleed `min-h-screen` hero background behind a
  headline + CTA (the shipped pattern), or height-constrained as a section band.
  Mount one instance per view — each spins up its own GL context.

## 4. Faithfulness — what was kept verbatim, and the two deltas

`src/components/ui/blue-meshy-background.tsx` and `src/components/ui/demo.tsx`
are the prompt's code. Exactly **two** minimal changes were applied so the
artifact compiles and works in a standard shadcn (React 18 **StrictMode**)
project:

1. **`.join(", ")`** — the pasted source split this separator string across a
   line, which is not valid JavaScript (a string literal can't contain a raw
   newline). It is written as the intended `", "` so the GLSL palette array
   builds correctly.
2. **`cancelAnimationFrame` on cleanup** — the original render loop is never
   cancelled. Under React 18 StrictMode's dev mount→unmount→remount, the first
   loop keeps running against GL objects deleted in cleanup, spamming
   `INVALID_OPERATION` and leaving the canvas blank. Capturing the frame handle
   and cancelling it in the effect's cleanup (the same pattern every other
   shader here uses) makes the verbatim component StrictMode-safe. No visual or
   API behaviour changes.

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
