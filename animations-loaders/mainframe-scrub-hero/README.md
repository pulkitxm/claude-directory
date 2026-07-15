# Mainframe® — Cursor-Scrubbed Contact Hero Section (React + Vite + Tailwind CSS + Framer Motion)

[![Watch Demo](./poster.jpg)](./demo.mp4)

An interactive contact hero section for the fictional studio **Mainframe®**, featuring a full-bleed background video scrubbed frame-by-frame by horizontal mouse movement on desktop. The cursor position drives `video.currentTime` directly — one full viewport sweep covers ~80% of the timeline — with seeks serialised through the `seeked` event for smooth frame-to-frame tracking. Below the `lg` breakpoint scrubbing is disabled and the video autoplays, making this hero fully responsive. The headline types itself out with a custom `useTypewriter` hook (blinking block cursor, removed on completion), and a multi-select service pill row feeds a spring-animated status banner via Framer Motion `AnimatePresence`. Built as a studio contact page hero with a clean dark-green palette on white. Generated with Claude Fable 5.

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS v4 (`@tailwindcss/vite`, Inter via Google Fonts, `--font-sans` theme token)
- Framer Motion (`motion/react`) — drop-in reveals, spring check icons, `AnimatePresence` banner swap
- lucide-react icons
- Playwright (headless verification)

## Architecture notes

- `src/components/BackgroundVideo.tsx` — full-bleed `<video>`; desktop mousemove
  scrubbing with delta-based targeting, clamping, and a one-seek-in-flight queue
  (no-op seeks are skipped — the browser fires no `seeked` for them, which would
  wedge the queue); mobile autoplay hook.
- `src/components/Navbar.tsx` — fixed transparent navbar; comma-separated desktop
  links; hamburger that morphs into an ✕; full-screen blurred mobile overlay. The
  overlay renders *inside* the fixed `z-10` header so it stacks above the white
  mobile content layer (also `z-10`, later in the DOM).
- `src/hooks/useTypewriter.ts` — `setTimeout` + `setInterval`, returns
  `{ displayed, done }`.
- `src/components/ServicePicker.tsx` — multi-select pills with spring check icons
  and the `AnimatePresence mode="wait"` placeholder/banner swap.
- `src/App.tsx` — the spec's layout shell. One addition: `pt-24 lg:pt-12` on `main`
  so the fixed header never overlaps the headline on small screens.

## Run

```sh
npm install
npm run dev
```

## Verify

```sh
npm run build    # tsc --noEmit + vite build
npm run verify   # headless Playwright suite against the built app
```

`scripts/verify.mjs` serves `dist/` via `vite preview` and intercepts the CloudFront
video URL with a local 4-second fixture (`scripts/fixtures/scrub-fixture.mp4`),
served with proper `Accept-Ranges`/206 semantics so Chromium treats it as seekable.
That keeps all 49 checks — including actual scrub-forward / rewind-and-clamp
assertions and mobile autoplay — deterministic and offline-safe.

---

Part of the [Animations & loaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
