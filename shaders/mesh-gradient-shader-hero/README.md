# Mesh Gradient Shader Hero — Live Palette Studio with MeshGradient (React + Vite + Tailwind CSS + paper-design/shaders-react)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A full-featured shader hero integration built around the `@paper-design/shaders-react` **`MeshGradient`** component, framed as an interactive **palette studio**. The live hero sits behind a registration-bracketed plate with a frosted veil; a right-hand control deck drives the shader's real props — color stops, distortion, swirl, speed, and offset — in real time. A tabbed dock documents the install, the full props API, a live copy-paste usage snippet, and the shadcn `components/ui` story. Generated with Claude Fable 5.

## What's wired up

| Control | Drives | Range |
|---------|--------|-------|
| **Palette presets** | the whole `colors[]` stop set + matching geometry & copy | 5 curated + Random |
| **Color stops** | each `colors[i]` (native swatch pickers) | live, per-stop |
| **Distortion** | `distortion` — organic noise warp | `0 – 2` |
| **Swirl** | `swirl` — vortex warp | `0 – 2` |
| **Speed** | `speed` — animation time multiplier | `0 – 2×` |
| **Offset X** | `offsetX` — horizontal centre offset | `−1 … 1` |
| **Light / Dark** | the component's `dark:` veil branch (`bg-white/20 dark:bg-black/25`) | toggle |

A live telemetry strip across the top reads real **FPS · frame · uptime · stops**
off `requestAnimationFrame`, the CTA's `onButtonClick` increments an on-stage
counter, and the **Usage** tab emits a ready-to-paste `<HeroSection … />` call
that reflects the current deck state.

## A note on the component API

The prompt's component targets the **current** `@paper-design/shaders-react`
API, so it's integrated verbatim with no edits: every prop it passes to
`MeshGradient` — `colors`, `distortion`, `swirl`, `grainMixer`, `grainOverlay`,
`speed`, `offsetX`, `width`, `height` — exists in the pinned
**`@paper-design/shaders-react@0.0.76`**. The accompanying `demo.tsx` from the
prompt (a thin `<HeroSection distortion={1.2} speed={0.8} />` wrapper) is
realised here as the studio's live default-plus-overrides, rather than copied as
a second file.

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
npm i @paper-design/shaders-react lucide-react
```

### Why `/components/ui`

shadcn/ui doesn't ship a runtime package — its CLI **copies source into your
repo**, and the convention is `@/components/ui`, resolved through a `@/*` path
alias declared in both `tsconfig` (`paths`) and `vite.config.ts` (`resolve.alias`).
Putting the component there means:

- `npx shadcn@latest add …` drops new primitives in the same predictable place;
- the import `@/components/ui/hero-section-with-smooth-bg-shader` resolves no
  matter how deeply nested the importing file is;
- owned UI primitives stay separate from app/feature components — easy to find,
  easy to theme.

This project mirrors that exactly: the alias lives in `tsconfig.app.json` +
`vite.config.ts`, and the verbatim component lives at
`src/components/ui/hero-section-with-smooth-bg-shader.tsx`.

## Stack

React 19, TypeScript, Vite 7, Tailwind CSS v4, `@paper-design/shaders-react`,
`lucide-react`.

## Design

| Token | Value |
|-------|-------|
| Bench / paper | `#efeae0` / `#f7f3ea` |
| Engraved hairline | `#d8d1c2` |
| Signal (live) mint | `#6fbfae` / deep `#2f8a78` |
| Warm accent (coral) | `#e98a6a` |
| Near-black ink | `#1c2128` |
| Type | Onest Variable (vendored locally) |

A warm "daylight bench" in light mode and a graphite night bench in dark mode,
both deferring to the pastel mesh which owns the viewport. Signature: the live
gradient seated in a registration-bracketed plate with an inner vignette, a
pulsing live tally, and a travelling signal-sweep on the bottom bus.

## Assets

- **Font.** The component requests `Satoshi` — a Fontshare-proprietary face that
  is *not* redistributable via npm / Google Fonts, so it can't be vendored
  offline. We vendor **Onest** (SIL OFL, `assets/fonts/Onest-OFL.txt`) — a modern
  geometric grotesque with near-identical proportions and character — under
  `assets/fonts/*.woff2`, and register it under both `Onest Variable` **and** the
  family name `Satoshi`, so the component's `fontFamily: "Satoshi, …"` resolves
  to the local file with **no remote font calls** and **no edit to the verbatim
  component**.
- **Icons.** `lucide-react` (no remote SVGs).
- **Images.** None — the shader hero is image-free, so the project is fully
  self-contained and runs offline.

## Run

```bash
npm install
npm run dev       # dev server
npm run build     # type-check (tsc -b) + production build
npm run preview   # serve the production build
npm run verify    # headless Playwright checks (boots its own dev server)
```

`npm run verify` boots a dev server, drives a headless Chromium with software
WebGL, and asserts: the header renders, the `MeshGradient` canvas mounts with a
real WebGL context, the hero uses the vendored font, a palette preset re-tints
the live shader (canvas pixels change), the speed fader sweeps `0.00 → 2.00`, the
docs dock renders the Props API table, and no page/console errors fire.

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
