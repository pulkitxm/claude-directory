# Bloom — Nested Squares Animated Loader (React + Framer Motion + shadcn/ui)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A looping animated loader built as a shadcn/ui-style component: twenty-five concentric square outlines that scale and rotate in an endlessly reversing bloom, staggered by per-index delay so the rings ripple outward and back. Built with React, TypeScript, Tailwind CSS, and Framer Motion, using gradient border-image across a violet/purple palette. Generated with Claude Fable 5.

The component (`NestedSquares`) is a React + TypeScript piece styled with Tailwind CSS and animated with Framer Motion. Each square uses a gradient `border-image` running through a violet/purple palette (rgb 147,51,234 → 124,58,237), animating `scale` 0 → 2 and `rotate` 0 → 180 over a 2s `easeInOut` tween that repeats with `repeatType: "reverse"`.

## Run

```sh
npm install
npm run dev       # dev server
npm run build     # production build
npm run preview   # serve the build
npm run verify    # project verification script
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.

---

Part of the [Animations & loaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
