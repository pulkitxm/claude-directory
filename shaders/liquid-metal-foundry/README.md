# LiquidMetal Foundry

A runnable, self-contained integration of the prompt's `background-shades.tsx` —
a full-bleed, `framer-motion`–animated `@paper-design/shaders-react`
**`LiquidMetal`** field that lives behind the page. Instead of dropping it on a
blank screen, it's framed as a **molten-metal foundry console**: the live shader
pours into a registration-bracketed crucible plate while a right-hand **casting
deck** drives the shader's *actual* props — tint, shape, repetition, softness,
distortion, contour, chromatic shift, rotation, scale, speed and the soft-focus
blur — in real time, with a tabbed dock that documents the install, the full
props API, a live copy-paste usage snippet, the **integration notes**, and the
shadcn `components/ui` story.

The prompt's component is pasted **verbatim** at
`src/components/ui/background-shades.tsx` (the shadcn path), exactly as given.
The console renders a reconciled, fully-typed wrapper next to it
(`src/components/ui/liquid-metal-foundry.tsx`) that preserves the verbatim
intent — a fixed, `pointer-events-none`, `-z-10` full-bleed layer; the
`filter: blur(10px)` soft-focus; the 8s opacity/scale/rotate breathing loop —
while exposing every real `LiquidMetal` prop so it can be themed and driven live.

## A note on the component API (verbatim → reconciled)

The component is kept **byte-for-byte** as provided, so it's excluded from the
strict typecheck. Auditing it against the pinned
**`@paper-design/shaders-react@0.0.76`** surfaced two API mismatches, reconciled
in the wrapper the console actually renders (and documented in the
**Integration notes** tab):

1. **`PulsingBorder` is imported but never rendered.** The design is a single
   liquid-metal plane, so the unused import is dropped in the wrapper. (Both
   `LiquidMetal` and `PulsingBorder` *do* exist in `0.0.76`, so the verbatim
   import still resolves.)
2. **`shape="plane"` is not a `LiquidMetalShape`.** In `0.0.76` the generative
   shapes are `none · circle · daisy · diamond · metaballs`. With no `image`
   supplied, an invalid shape paints an empty mask — so the wrapper defaults to
   `circle` (the package's own default) and the console exposes the full shape
   picker.

The accompanying `demo.tsx` from the prompt (a thin
`<ShadersBackground />` wrapper) is realised here as the console's live
default — the **Molten Copper** alloy reproduces the verbatim look exactly
(tint `hsl(29, 77%, 49%)`, `repetition 4`, `softness 0.6`, `shiftRed/Blue 0.25`,
`distortion 0.12`, `contour 1`, `rotation 25°`, `speed 2×`, `blur 10px`).

## What's wired up

| Control | Drives | Range |
|---------|--------|-------|
| **Alloy presets** | the whole `LiquidMetal` parameter set + tint | 5 curated + Random |
| **Tint** | `colorTint` — color-burn overlay (HSL picker + hue fader) | live |
| **Shape** | `shape` — generative mask | `none · circle · daisy · diamond · metaballs` |
| **Repetition** | `repetition` — stripe-pattern density | `1 – 10` |
| **Softness** | `softness` — edge hardness → smoothness | `0 – 1` |
| **Distortion** | `distortion` — noise warp on the stripes | `0 – 1` |
| **Contour** | `contour` — edge-distortion strength | `0 – 1` |
| **Shift Red / Blue** | `shiftRed` / `shiftBlue` — chromatic dispersion | `−1 … 1` |
| **Rotation** | `rotation` — overall angle | `0 – 360°` |
| **Scale** | `scale` — overall zoom | `0.2 – 3×` |
| **Speed** | `speed` — animation time multiplier | `0 – 5×` |
| **Blur** | the canvas `filter: blur()` (the verbatim soft-focus) | `0 – 30px` |
| **Forge / Anneal** | dark ↔ light console theme | toggle |

A live telemetry strip across the top reads real **FPS · frame · uptime · shape**
off `requestAnimationFrame`, the **Usage** tab emits a ready-to-paste
`<LiquidMetalBackground … />` call that reflects the current deck, and the
console honours `prefers-reduced-motion` — pausing the `framer-motion` breathing
loop and flagging a blue **"quenched"** status on the bottom bus.

## shadcn / Tailwind / TypeScript setup

This is a fresh **Vite + React + TypeScript** project, set up to match the
shadcn structure the prompt asks for. To reproduce that scaffold from scratch:

```bash
# 1. Vite + React + TypeScript
npm create vite@latest my-app -- --template react-ts
cd my-app

# 2. Tailwind CSS v4 (Vite plugin)
npm i tailwindcss @tailwindcss/vite
#    add `@import "tailwindcss";` to your global stylesheet
#    add the tailwindcss() plugin to vite.config.ts

# 3. shadcn-style structure + the @/ alias
npx shadcn@latest init        # writes components.json and the @/* path alias

# 4. the component's runtime deps
npm i @paper-design/shaders-react framer-motion lucide-react
```

### Why `/components/ui`

shadcn/ui doesn't ship a runtime package — its CLI **copies source into your
repo**, and the convention is `@/components/ui`, resolved through a `@/*` path
alias declared in both `tsconfig` (`paths`) and `vite.config.ts` (`resolve.alias`).
Putting the component there means:

- `npx shadcn@latest add …` drops new primitives in the same predictable place;
- the import `@/components/ui/background-shades` resolves no matter how deeply
  nested the importing file is;
- owned UI primitives stay separate from app/feature components — easy to find,
  easy to theme.

This project mirrors that exactly: the alias lives in `tsconfig.app.json` +
`vite.config.ts`, the verbatim component lives at
`src/components/ui/background-shades.tsx`, and the reconciled wrapper at
`src/components/ui/liquid-metal-foundry.tsx`.

## Where to use it

`ShadersBackground` / `LiquidMetalBackground` is an **app-shell background** —
it renders a fixed, `pointer-events-none`, `-z-10` layer, so it's meant to sit
once at the root of a page (a hero, a landing shell, an auth screen) with your
real content layered above it. It takes no data props and needs no context
providers; the only "state" is the parameter set you pass in (the console keeps
that state in React and feeds it live). No images are required — the shape is
generated procedurally — so it's fully self-contained.

## Stack

React 19, TypeScript, Vite 7, Tailwind CSS v4, `@paper-design/shaders-react`,
`framer-motion`, `lucide-react`.

## Design

| Token | Value (forge / anneal) |
|-------|------------------------|
| Steel bench | `#13110f` / `#e9e2d6` |
| Raised module | `#1c1916` / `#f4eee3` |
| Scribed hairline | `#322c26` / `#d3cabb` |
| Molten signal (29°) | `#f0954c` / `#d9762f`, cooling `#b5611f` / `#a0511c` |
| Coolant (quench) blue | `#5fb6d6` / `#2f86a8` |
| Hot-rolled ink | `#f3ede4` / `#1d1916` |
| Type | Space Grotesk + JetBrains Mono Variable (vendored locally) |

A near-black "forge floor" by default and a cooled "annealed bench" in light
mode, both deferring to the molten field that owns the viewport. Signature: the
live shader seated in a registration-bracketed crucible with an inner vignette,
brushed-steel chrome, a pulsing molten tally, an ember heat-shimmer on the brand
mark, and a travelling molten-light sweep on the bottom bus.

## Assets

- **Fonts.** **Space Grotesk** (display) and **JetBrains Mono** (readouts), both
  **SIL OFL** (`assets/fonts/*-OFL.txt`), vendored as variable `*.woff2` under
  `assets/fonts/` and registered at runtime via the JS FontFace API — **no
  remote font calls**, fully offline.
- **Icons.** `lucide-react` (no remote SVGs).
- **Images.** None — `LiquidMetal` generates its shape procedurally, so the
  project is image-free and runs offline. (The prompt's "fill image assets with
  Unsplash" step is N/A: this component takes no images.)

## Run

```bash
npm install
npm run dev       # dev server
npm run build     # type-check (tsc -b) + production build
npm run preview   # serve the production build
npm run verify    # headless Playwright checks (boots its own dev server)
```

`npm run verify` boots a dev server, drives a headless Chromium with software
WebGL, and asserts: the header renders, the `LiquidMetal` canvas mounts with a
real WebGL context, the chrome uses the vendored font, an alloy preset re-tints
the live shader (canvas pixels change), switching the generative shape
re-renders it, the speed fader sweeps `0.00 → 5.00`, the docs dock renders the
Props API table and the integration-notes panel, and no page/console errors fire.
