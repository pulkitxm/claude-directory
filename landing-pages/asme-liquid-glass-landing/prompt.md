# Asme — Liquid Glass Landing Page

## Overview

Build a single-page, dark-themed marketing landing site for "Asme" with a full-viewport looping hero video and a signature "liquid glass" surface treatment (frosted blur + gradient border) reused across every UI element. Below the hero, four scroll-revealed sections (about, featured video, philosophy, services) animate into view, all set against a pure-black background with Instrument Serif accents.

## Tech Stack

- **Framework:** React 18.3.1 with TypeScript 5.6.3, bundled by Vite 5.4.10 (`@vitejs/plugin-react` 4.3.3).
- **Styling:** Tailwind CSS 3.4.14 with PostCSS 8.4.49 and Autoprefixer 10.4.20.
- **Animation:** Framer Motion 11.11.17 (`motion`, `useInView`, `MotionConfig`).
- **Icons:** Lucide React 0.460.0 (`ArrowRight`, `ArrowUpRight`, `Globe`, `Instagram`, `Twitter`).
- **Fonts:** Instrument Serif (regular + italic) loaded via Google Fonts.
- **Notable techniques:** Reusable `.liquid-glass` component class (backdrop blur + masked gradient border via `::before`), vanilla JS / `requestAnimationFrame` crossfade loop for the hero video (no CSS transitions), `useInView` scroll-triggered entrance animations, locally vendored `.mp4` assets served from `/assets/`.

## Global Setup

### Document (`index.html`)

- `<html lang="en" class="bg-black">` and `<body class="bg-black">`.
- Favicon is an inline SVG data URI of a white globe/circle (`stroke='white'`, `stroke-width='2'`).
- `<title>`: `Asme — Know it all.`
- Meta description: `Asme — Know it all. Stay updated with the latest news and insights.`
- Viewport meta: `width=device-width, initial-scale=1.0`.
- Mounts to `<div id="root"></div>` and loads `/src/main.tsx` as a module.

### Entry point (`src/main.tsx`)

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import Index from './pages/Index';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <Index />
    </MotionConfig>
  </React.StrictMode>,
);
```

### Tailwind config (`tailwind.config.js`)

- `content`: `['./index.html', './src/**/*.{ts,tsx}']`.
- Extend `theme.fontFamily` with a custom `instrument` family so the `font-instrument` utility maps to `'Instrument Serif', serif`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        instrument: ["'Instrument Serif'", 'serif'],
      },
    },
  },
  plugins: [],
};
```

### Global styles (`src/index.css`)

Import the font first, then the Tailwind layers, then base and component layers.

```css
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply bg-black;
  }

  body {
    @apply bg-black text-white antialiased;
  }

  ::selection {
    background: rgba(255, 255, 255, 0.25);
    color: #000;
  }

  :focus-visible {
    outline: 1px solid rgba(255, 255, 255, 0.5);
    outline-offset: 2px;
  }
}
```

### Liquid glass class (`src/index.css`, inside `@layer components`)

Create a reusable `.liquid-glass` class used on every glass element. It pairs a near-transparent luminosity-blended background with a 4px backdrop blur and an inset top highlight; a masked `::before` paints a thin (`1.4px`) vertical gradient border that is brightest at the top and bottom.

```css
@layer components {
  .liquid-glass {
    background: rgba(255, 255, 255, 0.01);
    background-blend-mode: luminosity;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: none;
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
  }

  .liquid-glass::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.4px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.45) 0%,
      rgba(255, 255, 255, 0.15) 20%,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0) 60%,
      rgba(255, 255, 255, 0.15) 80%,
      rgba(255, 255, 255, 0.45) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
}
```

## Layout & Page Structure (`src/pages/Index.tsx`)

The page root is `<main className="bg-black">` containing, in order: the hero `<section>`, then `<AboutSection />`, `<FeaturedVideoSection />`, `<PhilosophySection />`, and `<ServicesSection />`.

Constants defined at module scope:

- `HERO_VIDEO_URL = '/assets/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4'`
- `FADE_MS = 500`
- `FADE_OUT_LEAD_S = 0.55`
- `RESTART_DELAY_MS = 100`
- `NAV_LINKS = ['Features', 'Pricing', 'About']`

> **Asset note:** All five videos are vendored locally and served from `/assets/`. The filenames originate from CloudFront uploads (e.g. `hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4`) but the app references the relative `/assets/...` paths, not any external host.

## Section 1 — Hero (full viewport)

Container: `<section className="min-h-screen overflow-hidden relative flex flex-col">`.

### Background video

- `<video>` with `ref={videoRef}`, classes `absolute inset-0 w-full h-full object-cover object-bottom`, `src={HERO_VIDEO_URL}`.
- Attributes: `muted`, `autoPlay`, `playsInline`, `preload="auto"`, `aria-hidden="true"`, `tabIndex={-1}`.
- Inline style `style={{ opacity: 0 }}` — starts fully transparent.

### Video fade logic (vanilla JS via refs, no CSS transitions)

Implemented in a `useEffect` using `useRef` handles: `videoRef`, `rafRef` (active `requestAnimationFrame` id), `restartTimerRef` (restart `setTimeout` id), `hasStartedRef`, and `isFadingOutRef`.

- **`animateOpacity(from, to, onDone?)`:** cancels any in-flight frame, captures `performance.now()` as the start, and on each `requestAnimationFrame` step computes `t = Math.min((now - start) / FADE_MS, 1)`, setting `video.style.opacity = String(from + (to - from) * t)`. When `t >= 1` it clears `rafRef` and calls `onDone`.
- **On `canplay`:** if not already started, mark `hasStartedRef`, call `video.play()` (swallowing autoplay-block rejections), then `animateOpacity(0, 1)`.
- **On `timeupdate`:** if not already fading out and `video.duration` is finite, compute `remaining = video.duration - video.currentTime`; when `remaining <= FADE_OUT_LEAD_S` (0.55s), set `isFadingOutRef`, read the current opacity (`Number.parseFloat(video.style.opacity || '1')`), and `animateOpacity(current, 0)`.
- **On `ended`:** set `opacity = '0'`, then after `RESTART_DELAY_MS` (100ms) reset `currentTime = 0`, `play()` again, clear `isFadingOutRef`, and `animateOpacity(0, 1)`.
- The effect cleanup removes all three listeners, cancels any pending frame, and clears the restart timer.

This produces a seamless loop with a smooth crossfade to black between plays.

### Navbar

`<header className="relative z-20 px-6 py-6">` containing a `<nav className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">`.

- **Left group** (`flex items-center`):
  - Brand link (`flex items-center gap-2.5`, `aria-label="Asme home"`): `Globe` icon (`size={24}`, `text-white`) + `<span className="text-white font-semibold text-lg">Asme</span>`.
  - Nav links container `hidden md:flex items-center gap-8 ml-8` rendering each item of `NAV_LINKS` ("Features", "Pricing", "About") as an `<a>` with classes `text-white/80 hover:text-white text-sm font-medium transition-colors`.
- **Right group** (`flex items-center gap-4`):
  - "Sign Up" text button: `text-white text-sm font-medium`.
  - "Login" button: `liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium hover:bg-white/5 transition-colors`.

### Hero content

`<div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[20%]">`:

- **Heading** `<h1>` with classes `text-7xl md:text-8xl lg:text-9xl text-white tracking-tight whitespace-nowrap mb-10` and inline `style={{ fontFamily: "'Instrument Serif', serif" }}`. Content: `Know it <em className="italic">all</em>.` (renders "Know it *all*.").
- **Email form** `<form className="liquid-glass rounded-full max-w-xl w-full pl-6 pr-2 py-2 flex items-center gap-3">` with `onSubmit` calling `event.preventDefault()`:
  - `<input type="email" autoComplete="email" placeholder="Enter your email" aria-label="Email address" className="flex-1 min-w-0 bg-transparent text-white placeholder:text-white/40 text-sm outline-none" />`.
  - Submit button (`type="submit"`, `aria-label="Subscribe"`): `bg-white rounded-full p-3 text-black shrink-0 hover:bg-white/90 transition-colors`, containing an `ArrowRight` icon (`size={20}`).
- **Subtitle** `<p className="text-white text-sm leading-relaxed px-4 mt-6 max-w-md">`: "Stay updated with the latest news and insights. Subscribe to our newsletter today and never miss out on exciting updates."
- **Manifesto button** `<button type="button" className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors mt-8">` with text "Manifesto".

### Social icons footer

`<footer className="relative z-10 flex justify-center gap-4 pb-12">` mapping over `[{ label: 'Instagram', Icon: Instagram }, { label: 'Twitter', Icon: Twitter }, { label: 'Website', Icon: Globe }]`. Each renders an `<a>` (`href="#"`, `aria-label={label}`) with classes `liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all` containing the icon at `size={20}`.

## Section 2 — About (`src/components/AboutSection.tsx`)

- Uses `useRef` + `useInView(ref, { once: true, margin: '-100px' })`.
- Section: `<section ref={ref} className="relative bg-black pt-32 md:pt-44 pb-10 md:pb-14 px-6 overflow-hidden">`.
- Radial gradient overlay (`absolute inset-0`, `aria-hidden`): `bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)]`.
- Inner wrapper: `relative max-w-5xl mx-auto text-center`.
- **Label** `motion.p` with classes `text-white/40 text-sm tracking-widest uppercase mb-8`, text "About Us". Animates `initial={{ opacity: 0, y: 20 }}` → `{ opacity: 1, y: 0 }` when in view, `transition={{ duration: 0.6 }}`.
- **Heading** `motion.h2` with classes `text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight`. Animates `initial={{ opacity: 0, y: 40 }}` → `{ opacity: 1, y: 0 }`, `transition={{ duration: 0.8, delay: 0.1 }}`. Structure:
  - `Pioneering ` then `<span className="font-instrument italic text-white/60">ideas</span>` then ` for `
  - `<br className="hidden md:block" />`
  - `minds that ` then `<span className="font-instrument italic text-white/60">create, build, and inspire.</span>`

## Section 3 — Featured Video (`src/components/FeaturedVideoSection.tsx`)

- `FEATURED_VIDEO_URL = '/assets/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4'`.
- Same `useInView` pattern (`{ once: true, margin: '-100px' }`).
- Section: `<section ref={ref} className="bg-black pt-6 md:pt-10 pb-20 md:pb-32 px-6 overflow-hidden">`, inner `max-w-6xl mx-auto`.
- **Video container** `motion.div className="relative rounded-3xl overflow-hidden aspect-video"`, animating `initial={{ opacity: 0, y: 60 }}` → `{ opacity: 1, y: 0 }`, `transition={{ duration: 0.9 }}`.
  - `<video className="w-full h-full object-cover" src={FEATURED_VIDEO_URL}>` with `muted`, `autoPlay`, `loop`, `playsInline`, `preload="auto"`, `aria-hidden`, `tabIndex={-1}`.
  - Gradient overlay (`absolute inset-0`, `aria-hidden`): `bg-gradient-to-t from-black/60 via-transparent to-transparent`.
  - **Bottom overlay** `<div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">`:
    - **Left card** `<div className="liquid-glass rounded-2xl p-6 md:p-8 max-w-md">`:
      - Label `<p className="text-white/50 text-xs tracking-widest uppercase mb-3">`: "Our Approach".
      - Body `<p className="text-white text-sm md:text-base leading-relaxed">`: "We believe in the power of curiosity-driven exploration. Every project starts with a question, and every answer opens a new door to innovation."
    - **Right button** `motion.button` with classes `liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium self-start md:self-auto shrink-0`, text "Explore more", `whileHover={{ scale: 1.05 }}`, `whileTap={{ scale: 0.95 }}`.

## Section 4 — Philosophy / Innovation × Vision (`src/components/PhilosophySection.tsx`)

- `PHILOSOPHY_VIDEO_URL = '/assets/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4'`.
- `TEXT_BLOCKS` array of two `{ label, body }` objects (see below). Same `useInView` pattern.
- Section: `<section ref={ref} className="bg-black py-28 md:py-40 px-6 overflow-hidden">`, inner `max-w-6xl mx-auto`.
- **Heading** `motion.h2 className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16 md:mb-24"`, animating `initial={{ opacity: 0, y: 40 }}` → `{ opacity: 1, y: 0 }`, `transition={{ duration: 0.8 }}`. Content: `Innovation ` then `<span className="font-instrument italic text-white/40">x</span>` then ` Vision`.
- **Two-column grid** `grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12`:
  - **Left** `motion.div className="rounded-3xl overflow-hidden aspect-[4/3]"`, animating `initial={{ opacity: 0, x: -40 }}` → `{ opacity: 1, x: 0 }`, `transition={{ duration: 0.8, delay: 0.1 }}`. Contains `<video className="w-full h-full object-cover" src={PHILOSOPHY_VIDEO_URL}>` with `muted`, `autoPlay`, `loop`, `playsInline`, `preload="auto"`, `aria-hidden`, `tabIndex={-1}`.
  - **Right** `motion.div className="flex flex-col justify-center"`, animating `initial={{ opacity: 0, x: 40 }}` → `{ opacity: 1, x: 0 }`, `transition={{ duration: 0.8, delay: 0.2 }}`. Maps over `TEXT_BLOCKS`; for every block after the first, render a divider `<div className="w-full h-px bg-white/10 my-10" aria-hidden="true" />` before it. Each block:
    - Label `<p className="text-white/40 text-xs tracking-widest uppercase mb-4">`.
    - Body `<p className="text-white/70 text-base md:text-lg leading-relaxed">`.
  - **Block 1** — label "Choose your space"; body: "Every meaningful breakthrough begins at the intersection of disciplined strategy and remarkable creative vision. We operate at that crossroads, turning bold thinking into tangible outcomes that move people and reshape industries."
  - **Block 2** — label "Shape the future"; body: "We believe that the best work emerges when curiosity meets conviction. Our process is designed to uncover hidden opportunities and translate them into experiences that resonate long after the first impression."

## Section 5 — Services / What We Do (`src/components/ServicesSection.tsx`)

- `SERVICES` array of two `{ videoUrl, tag, title, description }` objects (see below). Imports `ArrowUpRight` from `lucide-react`. Same `useInView` pattern.
- Section: `<section ref={ref} className="relative bg-black py-28 md:py-40 px-6 overflow-hidden">`.
- Radial gradient overlay (`absolute inset-0`, `aria-hidden`): `bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]`.
- Inner wrapper: `relative max-w-6xl mx-auto`.
- **Header row** `motion.div className="flex items-end justify-between mb-12 md:mb-16"`, animating `initial={{ opacity: 0, y: 30 }}` → `{ opacity: 1, y: 0 }`, `transition={{ duration: 0.7 }}`:
  - `<h2 className="text-3xl md:text-5xl text-white tracking-tight">What we do</h2>`.
  - `<p className="hidden md:block text-white/40 text-sm">Our services</p>`.
- **Two-card grid** `grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8`, mapping over `SERVICES` (keyed on `service.tag`). Each card `motion.article className="liquid-glass rounded-3xl overflow-hidden group"`, animating `initial={{ opacity: 0, y: 50 }}` → `{ opacity: 1, y: 0 }`, `transition={{ duration: 0.8, delay: index * 0.15 }}` (staggered by 0.15s):
  - **Video area** `<div className="relative aspect-video overflow-hidden">`:
    - `<video className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={service.videoUrl}>` with `muted`, `autoPlay`, `loop`, `playsInline`, `preload="auto"`, `aria-hidden`, `tabIndex={-1}`.
    - Gradient overlay (`absolute inset-0`, `aria-hidden`): `bg-gradient-to-t from-black/40 to-transparent`.
  - **Card body** `<div className="p-6 md:p-8">`:
    - Header row `flex items-center justify-between mb-4`: tag `<p className="uppercase tracking-widest text-white/40 text-xs">{service.tag}</p>` and an `ArrowUpRight` icon (`size={18}`) inside `<span className="liquid-glass rounded-full p-2 text-white" aria-hidden="true">`.
    - Title `<h3 className="text-white text-xl md:text-2xl mb-3 tracking-tight">{service.title}</h3>`.
    - Description `<p className="text-white/50 text-sm leading-relaxed">{service.description}</p>`.
  - **Card 1** — `videoUrl: '/assets/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4'`; tag "Strategy"; title "Research & Insight"; description: "We dig deep into data, culture, and human behavior to surface the insights that drive meaningful, lasting change."
  - **Card 2** — `videoUrl: '/assets/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4'`; tag "Craft"; title "Design & Execution"; description: "From concept to launch, we obsess over every detail to deliver experiences that feel effortless and look extraordinary."

## Color Palette

- **Background:** pure black via `bg-black` / `#000000` (also set on `<html>` and `<body>`).
- **Foreground text:** white at varying opacities — `text-white`, `text-white/80`, `text-white/70`, `text-white/60`, `text-white/50`, `text-white/40`; placeholder `placeholder:text-white/40`.
- **Glass surfaces:** `rgba(255, 255, 255, 0.01)` background, inset highlight `rgba(255, 255, 255, 0.1)`, gradient border stops `rgba(255, 255, 255, 0.45 / 0.15 / 0)`.
- **Selection:** background `rgba(255, 255, 255, 0.25)`, text `#000`.
- **Focus outline:** `1px solid rgba(255, 255, 255, 0.5)` with `outline-offset: 2px`.
- **Subtle overlays:** `rgba(255,255,255,0.03)` (about), `rgba(255,255,255,0.02)` (services); video gradients use `from-black/60`, `from-black/40`, `via-transparent`, `to-transparent`; dividers use `bg-white/10`.

## Animations Summary

- **Hero video:** vanilla `requestAnimationFrame` opacity crossfade — fade in over 500ms on `canplay`, fade out over 500ms when ≤0.55s remain, and a 100ms-gap restart loop on `ended`.
- **Scroll reveals (Framer Motion `useInView`, `{ once: true, margin: '-100px' }`):**
  - About label: `opacity 0→1`, `y 20→0`, 0.6s.
  - About heading: `opacity 0→1`, `y 40→0`, 0.8s, delay 0.1s.
  - Featured video container: `opacity 0→1`, `y 60→0`, 0.9s.
  - Philosophy heading: `opacity 0→1`, `y 40→0`, 0.8s.
  - Philosophy left video: `opacity 0→1`, `x -40→0`, 0.8s, delay 0.1s.
  - Philosophy right column: `opacity 0→1`, `x 40→0`, 0.8s, delay 0.2s.
  - Services header: `opacity 0→1`, `y 30→0`, 0.7s.
  - Services cards: `opacity 0→1`, `y 50→0`, 0.8s, staggered by `index * 0.15s`.
- **Interactive:** "Explore more" button `whileHover={{ scale: 1.05 }}` / `whileTap={{ scale: 0.95 }}`; service card video `group-hover:scale-105` with `transition-transform duration-700`; assorted `hover:bg-white/5`, `hover:text-white`, `transition-colors` / `transition-all`.
- **Accessibility:** `MotionConfig reducedMotion="user"` globally honors the user's reduced-motion preference.

## File Structure

```
asme-liquid-glass-landing/
├── index.html
├── package.json
├── tailwind.config.js
├── public/
│   └── assets/
│       ├── hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4   (hero)
│       ├── hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4   (featured)
│       ├── hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4   (philosophy)
│       ├── hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4   (services card 1)
│       └── hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4   (services card 2)
└── src/
    ├── main.tsx
    ├── index.css
    ├── pages/
    │   └── Index.tsx
    └── components/
        ├── AboutSection.tsx
        ├── FeaturedVideoSection.tsx
        ├── PhilosophySection.tsx
        └── ServicesSection.tsx
```

### Scripts (`package.json`)

- `dev`: `vite`
- `build`: `tsc --noEmit && vite build`
- `preview`: `vite preview`
- `verify`: `node scripts/verify.mjs`
