# MicroVisuals — Boomerang Video Hero Section (React + Vite + GSAP + Canvas API)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A fullscreen hero section for the fictional AI image-generation product **MicroVisuals**, built around a canvas-based boomerang video loop. The background video plays once, every frame is snapshotted into offscreen canvases using `requestVideoFrameCallback` (with a `requestAnimationFrame` fallback), and the captured frames ping-pong forward and backward forever at ~30fps on a display canvas — without ever touching `video.currentTime`. A GSAP pointer-lerp parallax nudges the pre-scaled background layer toward the cursor for depth. The dark black canvas is framed by a liquid-glass navbar (backdrop-filter cards with gradient-masked borders), an oversized italic Instrument Serif title, and a bottom action row. Fonts used: Instrument Serif, Barlow, and a self-hosted Dirtyline display face. Generated with Claude Fable 5.

## Run

```sh
npm install
npm run dev       # dev server
npm run build     # production build
npm run preview   # serve the build
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.

---

Part of the [Animations & loaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
