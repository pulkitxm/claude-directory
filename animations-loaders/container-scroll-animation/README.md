# Container Scroll Animation — Perspective Tilt Component Showcase (React + Vite + Framer Motion)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A component-integration showcase built around the Aceternity Container Scroll Animation: a perspective device card that tilts from `rotateX: 20°` to flat as the section scrolls through the viewport, driven by Framer Motion's `useScroll` + `useTransform`. The codebase integrates the component into a full dark dev-tooling site with three live product mockups, an install guide, and a live scroll-telemetry HUD. Built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion. Generated with Claude Fable 5.

The component (`src/components/ui/container-scroll-animation.tsx`) is the exact
primitive from the prompt: a perspective device card that tilts from `rotateX:
20°` to flat, scales toward 1, and lifts its heading as the section scrolls
through the viewport — driven by framer-motion's `useScroll` + `useTransform`.

## What was integrated

The brief was a "copy this component into `/components/ui`" task. The repo is
scaffolded to satisfy every requirement it lists:

- **shadcn project structure** — `components.json` pins the `ui` alias to
  `@/components/ui`, `cn()` lives in `src/lib/utils.ts`, and the `@/*` path alias
  is wired in both `tsconfig.json` and `vite.config.ts`.
- **Tailwind CSS** — `tailwind.config.js` + `postcss.config.js`, tokens and
  vendored `@font-face` in `src/index.css`.
- **TypeScript** — strict mode, `tsc` clean (`noUnusedLocals` /
  `noUnusedParameters` on).
- **framer-motion** — the single runtime dependency the component needs.

The component file is the prompt's source verbatim (only the Next-specific
`next/image` demo is replaced — see below). It additionally accepts one
**optional, backward-compatible** prop, `offset`, threaded into `useScroll`;
omit it for the original behaviour.

## The page

A dark dev-tooling showcase (graphite canvas, periwinkle **iris** `#7C82FF` +
warm **ember** `#F0A35E` accents; Space Grotesk / Inter / JetBrains Mono):

1. **Hero** (`sections/Hero.tsx`) — "The product card that stands up as you
   scroll", with the scroll cue leading into the stages.
2. **Stages** (`sections/Stages.tsx`) — the same `ContainerScroll` used **three
   times** (`01 / 02 / 03`); only its `children` change. Each frames a different
   self-contained product UI from `components/mockups.tsx`:
   - **01** an analytics dashboard (keeps the prompt's "Unleash the power of
     Scroll Animations" heading),
   - **02** a Linear-style kanban board,
   - **03** a code editor showing the component's own source under review.
3. **Install** (`sections/Install.tsx`) — three-step setup (shadcn CLI →
   `npm i framer-motion` → drop the file in), plus a callout on **why the folder
   must be `/components/ui`**.
4. **API reference** (`sections/ApiReference.tsx`) — props, the scroll→transform
   map, the `isMobile` state it owns, and responsive behaviour.

### Signature: the scroll telemetry HUD

`sections/TelemetryHud.tsx` is a fixed right-rail that exposes the very
MotionValues the component computes — live `scrollY %`, `rotateX` (20° → 0°) and
`scale` — so the invisible transform math becomes a readable, on-brand readout
that ticks in lockstep with the cards standing upright.

## On the `offset` and the original demo

- The prompt's `demo.tsx` nested a single hosted screenshot via `next/image`.
  This is a plain Vite app, so the device `children` are real, **locally
  rendered** product UIs instead — no `next/image`, no remote screenshot, fully
  offline. You can still pass any node (an `<img>`, a video, a live component).
- `useScroll({ target })` only updates the **first** instance on a page when no
  `offset` is given (later targets keep a degenerate measured range and freeze
  at 20°). Passing `offset={["start end", "center center"]}` fixes this for all
  three instances **and** lands each card flat exactly as it reaches mid-screen.

## Assets

Fully self-contained — runs offline. Fonts (Space Grotesk, Inter, JetBrains
Mono) are vendored as `woff2` under `public/fonts/` and declared with
`@font-face`. There are **no remote images**: every "screenshot" inside the
cards is real markup + Tailwind + lucide-react icons. (Unsplash and other image
CDNs are network-blocked in this environment, which also makes local rendering
the correct, self-contained choice.)

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc + vite production build
```

---

Part of the [Animations & loaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
