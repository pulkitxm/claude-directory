# Digital Epoch — Cinematic Hero Section with Logo Marquee (React + TypeScript + Tailwind CSS v4 + Framer Motion)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A cinematic landing-page hero: a full-bleed, video-backed rounded hero card with a floating bottom navbar, followed by a seamless infinite logo marquee. The hero card plays an autoplaying muted background video behind a fade-and-slide-up text layer; logo cards reveal a gradient wash and invert their mark on hover. The marquee uses a pure CSS `@keyframes` scroller — two identical halves translated to `-50%` for an imperceptible loop — with a `mask-image` edge fade and a pause-on-hover state. Type pairs Inter (`--font-sans`) with Outfit (`--font-display`). Background video and logo SVGs are vendored locally under `public/assets/`. Generated with Claude Fable 5.

## Run

```sh
npm install
npm run dev      # start the Vite dev server
npm run build    # type-check (tsc) and build for production
npm run preview  # preview the production build
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.

---

Part of the [Hero sections](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
