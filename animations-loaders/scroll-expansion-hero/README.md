# Scroll Expansion Hero — ScrollExpandMedia Component Integration (React + Vite + Framer Motion + shadcn)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A **component-integration** showcase: the **ScrollExpandMedia** scroll-driven hero dropped into a real shadcn-style codebase and built out into a self-contained cinematic showcase. A compact media card sits over a full-bleed backdrop and **hijacks the wheel/touch** to drive a `0 → 1` progress value — as progress climbs the card grows from `300×400` toward fullscreen, the title's first word and remaining words translate apart, the background dissolves, and once fully expanded the page below becomes scrollable and an editorial "about" section fades in. Supports both video and image modes with the same expansion engine. Built with a dark graphite canvas, periwinkle iris `#7C82FF` accent, Space Grotesk / Inter / JetBrains Mono typography, and all media vendored locally. Generated with Claude Fable 5.

## What was integrated

The brief was a "copy this component into `/components/ui`" task. The repo is
scaffolded to satisfy every requirement it lists:

- **shadcn project structure** — `components.json` pins the `ui` alias to
  `@/components/ui`, `cn()` lives in `src/lib/utils.ts`, and the `@/*` path alias
  is wired in both `tsconfig.json` and `vite.config.ts`. The component lives in
  `src/components/ui/`, the canonical shadcn destination.
- **Tailwind CSS** — `tailwind.config.js` + `postcss.config.js`, design tokens
  and vendored `@font-face` in `src/index.css`.
- **TypeScript** — strict mode, `tsc` clean (`noUnusedLocals` /
  `noUnusedParameters` on).
- **framer-motion** — the single runtime dependency the component needs;
  **lucide-react** supplies the toggle / cue icons.

The component file is the prompt's source verbatim, with two faithful changes
for a Vite (non-Next) app:

1. `next/image` is swapped for a tiny local `@/components/ui/image` shim that
   renders a plain `<img>` and ignores Next-only props — so the JSX body is
   otherwise unchanged.
2. A `resetSection` event listener is added so the in-page "Replay the reveal"
   button and the media toggle can collapse the hero back to its start state
   (the prompt's own `demo.tsx` already dispatches this exact event).

## The page (UNFURL)

A dark cinematic showcase (graphite canvas, periwinkle **iris** `#7C82FF`
accent; Space Grotesk / Inter / JetBrains Mono):

- A fixed **brand mark**, a **Video / Image** segmented toggle, and a blended
  **scroll cue** sit over the stage.
- The hero wraps `ScrollExpandMedia` with `textBlend` on. **Video mode** plays a
  vendored, looping muted cosmos clip; **Image mode** swaps in a single still —
  same expansion engine, zero video weight.
- After full expansion, `MediaContent` reveals an editorial block: an overview,
  a stats rail, three "how it works" cards, and a button that replays the reveal.

## Assets

All media is vendored locally under `public/media/` (cosmos loop transcoded to a
~0.9 MB 12s 720p mp4, plus Unsplash stills for backgrounds, foreground media and
the video poster). Fonts are self-hosted `woff2` under `public/fonts/`. Nothing
is fetched from a CDN at runtime — the project runs fully offline.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc + vite build
```

Scroll (wheel) or swipe up to expand the media; scroll back to the top to
collapse it, or hit **Replay the reveal**.

---

Part of the [Animations & loaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
