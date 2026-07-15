# Lovable WebGL Hero — Full-Viewport WebGL Landing Page Recreation (TanStack Start + React 19 + Tailwind v4)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A pixel-accurate 1:1 recreation of the Lovable landing page: a black, full-viewport WebGL hero driven by the real `CoreRenderer` runtime, a glass navbar with full-width hover dropdowns, an animated typewriter prompt input with a rotating-gradient send button, and a 3D trusted-by logo carousel. Built on the Lovable default stack — TanStack Start, React 19, and Tailwind v4 — with `framer-motion` and `lucide-react`. Generated with Claude Fable 5.

## WebGL hero

The hero is **not** a CSS/canvas/video/Three.js approximation. It loads the exact
vendored runtime and project data and lets `CoreRenderer` paint a live WebGL
canvas:

- `public/vendor/core-renderer.js` — the CoreRenderer runtime (byte-for-byte original)
- `public/vendor/hero-project.js` — the hero project data (references `/vendor/back-gl-3.png`)
- `public/vendor/back-gl-3.png` — the hero shader texture

All assets are vendored locally under `public/vendor/` so the project runs offline.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Verify / build

```bash
npm run typecheck
npm run build
node scripts/verify.mjs   # headless Chromium checks (needs a running server on VERIFY_URL)
```

## Demo

`demo.mp4` is a headless-Chromium walkthrough recorded with the repo's
`scripts/record-demos/record-one.sh`.

---

Part of the [3D & games](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
