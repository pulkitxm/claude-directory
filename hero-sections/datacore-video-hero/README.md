# Datacore — Cinematic Video Hero Section (React + TypeScript + Tailwind CSS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A responsive, full-screen hero section for a hotel-booking web app built over a fully opaque, full-bleed HTML5 video background. The transparent navbar overlays the video with the "Future" logo mark, center-left Manrope nav links, and Sign In / Get Started action buttons; on mobile it collapses to a hamburger that opens a full-screen black overlay with staggered link reveals and body scroll-lock. The centered hero content features a glassmorphism tagline pill, an Instrument Serif headline scaling from 5xl to 96px, Inter subtext at 70% white opacity, and Cabin CTA buttons in brand purple `#7b39fc` and dark purple `#2b2344`. All elements rise in on page load with staggered delays; motion is disabled under `prefers-reduced-motion`. Generated with Claude Fable 5.

## Fonts

Manrope (UI/nav) · Cabin (buttons/tags) · Instrument Serif (headline) · Inter (body), loaded
via Google Fonts.

## Run

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build
npm run preview   # serve dist on :4173
```

## Verify (CLI, headless)

```bash
npm run build && npm run preview &
npm run verify    # Playwright checks: desktop 1440px + mobile 390px
```

---

Part of the [Hero sections](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
