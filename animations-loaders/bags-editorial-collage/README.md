# Bags Editorial Collage — Scroll-Driven Fashion Landing Page (React + Vite + Framer Motion)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A three-section animated bags landing page with a warm cream editorial sticker hero, a scroll-driven envelope-reveal product collection, and an orbiting bag carousel — built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion. Features instanced signature serif glow words, a parallax sticker collage, and a canvas `requestAnimationFrame` orbit engine. Generated with Claude Fable 5.

The page renders three sections back-to-back, with no wrappers between them:

1. **Hero** (`src/sections/Hero.tsx`) — a warm cream editorial sticker collage.
   The headline "Bags crafted / to move with / _your_ story" anchors a model
   photo surrounded by floating stickers (snap polaroid, gift card, smile,
   sticks, arrow, text-heart), a LOVE BAG label, a `(01)` watermark, and two
   tilted polaroid thumbnails that lift on hover.

2. **Collection** (`src/sections/Collection.tsx`) — a true-black, 4× viewport-tall
   scroll stage. A sticky envelope unfolds as you scroll: its triangular flap
   folds upward, six product photos peek out of the V opening, then fan into a
   single horizontal row while their captions stagger in. The envelope visuals
   fade out via `envelopeIn`, but the photos stay fully visible to the end of
   the section.

3. **PerfectMatch** (`src/sections/PerfectMatch.tsx`) — a torn-paper bridge into a
   soft grey field where six matching bags orbit slowly (a `requestAnimationFrame`
   engine) around the headline "Find your perfect _match_", pausing on hover with
   a 1.12 lift.

The four signature serif accent words — **your**, **elegance**, **new**,
**match** — share one component (`src/components/SerifGlowWord.tsx`): a dual-layer
`#EAFE79` glow halo behind a solid `#545454` fill, with a "tubular curl" sticker
entrance.

## Assets

Every image referenced by the spec
(`https://qclay.design/lovable/bags/${file}`) is **vendored locally** under
`public/assets/` and served from the site root, so the project is fully
self-contained and runs offline. `src/lib/constants.ts` keeps the original
`${ASSET}/${file}` join semantics.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc + vite production build
```

---

Part of the [Animations & loaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
