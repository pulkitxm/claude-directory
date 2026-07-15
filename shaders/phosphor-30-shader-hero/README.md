# Phosphor 30 — Field of Light — CRT Phosphor GLSL Hero (React + Vite + Tailwind CSS + WebGL2)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A full-viewport CRT phosphor instrument hero built around the `phosphor-30` WebGL2 GLSL shader — an 80-step signed-distance-field raymarch that accumulates ribbons of glowing light (`tanh(o / 5e3)`) on pure black, solved entirely in GLSL ES 3.00 with no textures and no geometry. The hero frames the live shader behind a hairline bezel with corner brackets, a drifting CRT scanline, a phosphor-glow "FIELD OF LIGHT" headline, and a mono telemetry strip reporting real render FPS and session uptime. Integrated as a shadcn `@/components/ui` drop-in following the canonical React + TypeScript + Vite + Tailwind CSS project structure. Generated with Claude Fable 5.

## The component (copied verbatim)

The prompt's two files are dropped in **unchanged**, exactly as a shadcn user
would paste them:

```
src/components/ui/phosphor-30.tsx   # the prompt's default-export <Component/> (fixed, fullscreen)
src/components/demo.tsx             # the prompt's DemoOne — import Component from "@/components/ui/phosphor-30"
```

`phosphor-30.tsx` is the canonical drop-in: a `position: fixed; inset: 0`
fullscreen takeover. Because it was authored for a looser tsconfig (it carries an
unused `React` import and relies on non-strict null-narrowing inside the render
loop), it is **excluded from this project's strict `tsc -b`** (see
`tsconfig.app.json`) so it can stay byte-identical to the prompt. It still
works as a drop-in in any standard shadcn project, whose default tsconfig is not
this strict.

The **running** hero uses a composable sibling, `phosphor-canvas.tsx`, which
runs the exact same GLSL and WebGL2 runtime (1:1 shader source) but as an
absolutely-positioned layer that fills its parent instead of the viewport — so
typography, the bezel and the CTA can stack on top of it. That file *is* fully
type-checked and is what the verification drives.

## Integration notes (answering the prompt's questions)

- **Props / data.** The shader is self-contained — its only inputs are the
  uniforms it computes itself (`iResolution`, `iTime`, `iFrame`, `iMouse`). The
  composable `PhosphorCanvas` adds two optional props: `pixelRatio` (clamped to
  `[1, 2]`) and `onFps` (reports the live render rate for the telemetry chrome).
- **State / context.** None required. No providers, no stores. The canvas owns
  its own `requestAnimationFrame` loop and tears everything down (VAO/VBO/program,
  every listener, the `ResizeObserver`) on unmount, and survives WebGL context
  loss.
- **Assets.** The shader needs **no images** — it is generated entirely in GLSL,
  so there are no Unsplash stock photos to fetch. The only assets are the two
  vendored fonts (below). Icons in the HUD are **lucide-react**.
- **Responsive behaviour.** Fluid from phone to desktop: the headline scales with
  `clamp()`, the nav collapses under `md`, the telemetry strip reflows from a
  2-column grid to a single row, and `100dvh` + `viewport-fit=cover` keep it
  honest on mobile. `prefers-reduced-motion` stops the scan line and ping.
- **Where it belongs.** As the above-the-fold hero / landing background — the
  shader is the page's centrepiece, with the HUD layered over it.

## Project shape (shadcn defaults)

The default component path is **`@/components/ui`** — this matters because the
prompt's `demo.tsx` imports `@/components/ui/phosphor-30`, and shadcn's
`components.json` declares `"ui": "@/components/ui"`; anything the CLI adds lands
there. The `@` alias maps to `./src` (`vite.config.ts` + `tsconfig`), `cn` lives
in `@/lib/utils`, and the design tokens (including the `--phosphor` colour) are
defined in `src/index.css` + `tailwind.config.ts`.

```
src/
  components/
    demo.tsx                    # prompt's DemoOne (verbatim)
    phosphor-hero.tsx           # the framed instrument hero
    ui/
      phosphor-30.tsx           # prompt's component (verbatim drop-in)
      phosphor-canvas.tsx       # composable, type-checked twin (same GLSL)
      button.tsx                # shadcn-pattern CVA button (phosphor / ghost)
  lib/
    utils.ts                    # cn()
    use-clock.ts                # session-uptime hook + formatter
  App.tsx
  index.css                     # tokens + vendored @font-face
public/
  fonts/                        # Space Grotesk + JetBrains Mono (woff2, offline)
  favicon.svg
scripts/verify.mjs              # headless CLI verification
```

## Assets

All fonts are **vendored locally** in `public/fonts/` as latin-subset variable
woff2 files — no external requests, fully offline:

- **Space Grotesk** (display headline)
- **JetBrains Mono** (telemetry / chrome)

No image assets are used; the visual is 100% shader.

## If your project isn't set up yet

This repo ships ready to run, but to reproduce the scaffold from scratch:

```sh
# 1. Vite + React + TypeScript
npm create vite@latest my-app -- --template react-ts && cd my-app

# 2. Tailwind
npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p

# 3. shadcn (creates components.json and the @/components/ui path)
npx shadcn@latest init

# 4. dependencies this component needs
npm install lucide-react class-variance-authority clsx tailwind-merge \
  @radix-ui/react-slot tailwindcss-animate
```

> **Why `/components/ui`?** shadcn writes every generated primitive into the
> `ui` alias from `components.json` (here `@/components/ui`). Keeping that folder
> is what lets the prompt's `import Component from "@/components/ui/phosphor-30"`
> resolve, and keeps future `npx shadcn add ...` output colocated with this
> component.

## Run

```sh
npm install
npm run dev       # dev server
npm run build     # strict type-check (tsc -b) + production build
npm run preview   # serve the production build
npm run verify    # headless Chromium check (canvas + shader + HUD)
```

See `prompt.md` for the original integration prompt.

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
