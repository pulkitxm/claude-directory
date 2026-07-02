# LUMIÈRE — Cinematic Streaming Hero Section (React + TypeScript + Tailwind CSS v4 + Liquid Glass)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A full-viewport, no-scroll cinematic streaming hero for a movie/streaming brand. A looping background video fills the viewport behind a masked `backdrop-blur-xl` veil that dissolves toward the middle of the screen (blur only — no dark gradient). Reusable liquid-glass pill buttons carry a 1.4px masked gradient rim, and a `blurFadeUp` entrance animates every element in with staggered delays from 0 to 900 ms. Fully responsive with a mobile hamburger menu and `prefers-reduced-motion` support. Generated with Claude Fable 5.

**Stack:** React 18 + TypeScript + Vite + Tailwind CSS v4 + Lucide React, Inter (300–700) from Google Fonts.

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build
npm run verify   # headless Chromium spec verification (Playwright)
```

`npm run verify` builds nothing itself — run `npm run build` first. It boots
`vite preview`, then asserts every `prompt.md` requirement: video attributes
and layering, mask gradients, liquid-glass computed styles (including the
`::before` rim), animation stagger timing, hero copy, responsive visibility
at 1440/768/375px, and the mobile menu open/close interaction. Screenshots
land in `screenshots/`.

---

Part of the [Hero sections](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
