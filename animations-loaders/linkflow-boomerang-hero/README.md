# LinkFlow — Boomerang Video Hero Section (React 18 + Vite + Tailwind CSS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A full-screen hero section for the fictional automation product LinkFlow™, featuring a custom canvas-based "boomerang" background: video frames are captured into offscreen canvases as the video plays once, then replayed forward and backward in a seamless 30fps ping-pong loop — no looping video element. Includes a glassmorphic pill navbar with a sliding mobile drawer using staggered cubic-bezier transitions, all in pure CSS with no animation library. Built with React 18, TypeScript, Vite, and Tailwind CSS. Generated with Claude Fable 5.

Built in React 18 + TypeScript with Vite and Tailwind CSS. Frame capture is driven by `requestVideoFrameCallback` with a `requestAnimationFrame` fallback (`BoomerangVideoBg.tsx`). Over the video sit a glassmorphic pill navbar with a sliding mobile drawer (staggered, cubic-bezier transitions), centered hero copy, a bottom-left CTA block, and a bottom-right video link — all motion is pure CSS `transition-*` classes, no animation library. Icons come from `lucide-react`; type uses Inter and self-hosted Neue Haas Grotesk over a green palette (`#1f2a1d` / `#336443` / `#85AB8B`).

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
