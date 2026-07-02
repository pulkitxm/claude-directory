# DesignPro — Cinematic Video Hero Section (React + TypeScript + Tailwind CSS v4 + Framer Motion)

[![Watch Demo](./poster.jpg)](./demo.mp4)

Full-screen hero section for a product design education platform: a looping CloudFront video background sits under a legibility scrim, a pill navigation bar, and a "Become / Product Leader." headline whose second line uses a custom `ShinyText` component — a Framer Motion-driven gradient (`#64CEFB` base, white shine, 100° spread) clipped to the glyphs and sweeping left to right every 3 seconds. Entrance animations stagger all elements into view with `fadeUp`, and a pill-style CTA button invites enrollment. `MotionConfig reducedMotion="user"` respects accessibility preferences. Generated with Claude Fable 5.

## Stack

React 18 + TypeScript · Vite 6 · Tailwind CSS 4 · Framer Motion · Lucide React

## Scripts

```bash
npm install
npm run dev        # dev server
npm run build      # type-check + production build
npm run preview -- --port 4180   # serve the build
node scripts/verify.mjs          # headless Playwright spec verification (51 checks)
```

---

Part of the [Hero sections](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
