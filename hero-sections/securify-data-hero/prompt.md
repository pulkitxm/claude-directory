# Securify — Data-Security Hero Section

## Overview

Build a full-screen hero section for a data-security SaaS landing page called "Securify" using React, TypeScript, and Tailwind CSS. The hero features a looping fullscreen background video, a floating pill-shaped navbar, large staggered typography, and three statistic blocks pinned to the corners. All visible copy is lowercase.

## Tech Stack

- **Framework:** React 18 (`react` / `react-dom` `^18.3.1`) with `StrictMode`, bundled by Vite (`^5.4.10`) via `@vitejs/plugin-react`.
- **Language:** TypeScript (`^5.6.3`); build runs `tsc --noEmit && vite build`.
- **Styling:** Tailwind CSS (`^3.4.14`) with `postcss` (`^8.4.49`) and `autoprefixer` (`^10.4.20`).
- **Font:** Google Font Readex Pro (weights 300, 400, 500, 600, 700).
- **Testing/tooling:** Vitest (`^2.1.4`) with jsdom, Testing Library, Playwright.
- **Notable techniques:** fullscreen autoplaying looped background video, `backdrop-blur` glass pill navbar, viewport-relative (`vw`) responsive typography, absolutely-positioned staggered headline words, diagonally-rotated divider rules.

## Global Setup

### Fonts

Load the Google Font Readex Pro with weights 300, 400, 500, 600, 700. In `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

Page `<title>`: `securify — protect your data`. Meta description: `securify — guarding your data with utmost care, empowering you with privacy everywhere.`

### Global styles (`src/index.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body,
#root {
  height: 100%;
}

body {
  font-family: 'Readex Pro', system-ui, -apple-system, sans-serif;
  background: #000;
  color: #fff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.hero-title {
  letter-spacing: -0.04em;
  line-height: 0.95;
}
```

- Body font family: `'Readex Pro', system-ui, -apple-system, sans-serif`, background `#000`, color `#fff`, antialiased.
- `html`, `body`, `#root` all have `height: 100%`.
- The `.hero-title` class applies `letter-spacing: -0.04em` and `line-height: 0.95`.

### Tailwind config

Extend the theme with the sans font family so utilities pick up Readex Pro:

```js
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Readex Pro"', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

## Layout

### Section container

A `<section>` with classes: `relative h-screen w-full overflow-hidden bg-black`. It contains, in order: the background `<video>`, the navbar `<header>`, and the foreground content wrapper.

### Background video

A `<video>` with `className="absolute inset-0 w-full h-full object-cover"` and the attributes `autoPlay loop muted playsInline`. The source is the full CloudFront URL:

```tsx
const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4';
```

The MP4 originates from this CloudFront URL `https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4`. (In the built app it is vendored locally and served from `public/assets/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4`.)

```tsx
<video
  className="absolute inset-0 w-full h-full object-cover"
  autoPlay
  loop
  muted
  playsInline
  src={VIDEO_SRC}
/>
```

## Navbar

A `<header>` with `absolute top-0 left-0 right-0 z-20 px-6 md:px-10 pt-6`, containing a `<nav>` with `flex items-center justify-between gap-4`.

### Left brand pill

An anchor (`href="#home"`) with `flex items-center gap-2 bg-neutral-900/90 backdrop-blur rounded-full pl-4 pr-6 py-3` containing:

- A custom white SVG logo: `viewBox="0 0 256 256"`, `className="h-5 w-5"`, `aria-hidden="true"`, `focusable="false"`, with a single `<path>` filled `#ffffff`. The path data:

```
M 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 128 L 64 128 Z
M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z
M 128 64 L 128 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 Z
M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 128 0 L 192 0 Z
```

- Brand text `securify` in a `<span>` with `text-white text-sm font-normal tracking-tight`.

### Center pill (hidden on mobile)

A `<div>` with `hidden md:flex items-center gap-1 bg-neutral-900/90 backdrop-blur rounded-full px-3 py-2` containing four anchor links generated from `['platform', 'solutions', 'company', 'support']`. Each link uses `href={`#${link}`}` and `className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full"`. Link labels: `platform`, `solutions`, `company`, `support`.

### Right button

A `<button type="button">` reading `get started` with `bg-white text-black text-sm font-normal rounded-full px-6 py-3 hover:bg-neutral-200 transition-colors`.

## Hero Foreground Content

A wrapper `<div>` with `relative h-full w-full` rendered after the navbar (above the video).

### Staggered headline words

Three giant `<h1>` words, each sharing the base class string:

```tsx
const HEADLINE_BASE =
  'hero-title absolute text-white font-medium text-[14vw] md:text-[13vw]';
```

Per-word positioning (all lowercase):

- `protect` — `left-4 md:left-10 top-[18%]`
- `your` — `right-4 md:right-10 top-[38%]`
- `data` — `left-[18%] md:left-[28%] top-[58%]`

### Description paragraph

An absolutely positioned `<p>` with `absolute left-6 md:left-10 top-[46%] max-w-[240px] text-[15px] leading-snug text-white/90`, reading:

> we can guarding your data with utmost care, empowering you with privacy everywhere

### Stat number style

All stat numbers share:

```tsx
const STAT_NUMBER = 'text-4xl md:text-5xl font-medium tracking-tight';
```

### Stat block — top-right

Container: `absolute right-6 md:right-24 top-[14%]`.

- Row: `flex items-center gap-3 justify-end` — a diagonal divider (`hidden md:block h-px w-24 bg-white/40 rotate-[20deg]`) then the number `+65k` (uses `STAT_NUMBER`).
- Sublabel `<p>`: `startups use` with `text-xs md:text-sm text-white/70 mt-1 text-right`.

### Stat block — bottom-left

Container: `absolute left-6 md:left-20 bottom-20 md:bottom-24`.

- Row: `flex items-center gap-3` — the number `+1.5b` (uses `STAT_NUMBER`) then a divider `hidden md:block h-px w-24 bg-white/40 rotate-[-20deg]`.
- Sublabel `<p>`: `gb data was protected` with `text-xs md:text-sm text-white/70 mt-1`.

### Stat block — bottom-right

Container: `absolute right-6 md:right-20 bottom-16 md:bottom-20`.

- Row: `flex items-center gap-3 justify-end` — a diagonal divider `hidden md:block h-px w-24 bg-white/40 rotate-[-20deg]` then the number `+300k` (uses `STAT_NUMBER`).
- Sublabel `<p>`: `downloads` with `text-xs md:text-sm text-white/70 mt-1 text-right` (right-aligned).

### Bottom gradient overlay

A `<div>` with `pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-black`.

## Color Palette

- No purple/indigo anywhere.
- Palette is pure black (`bg-black`, `#000`), white (`text-white`, `#fff`), `neutral-900`, `neutral-300` (nav links), and white opacity variants (`white/40`, `white/70`, `white/90`).
- Navbar pills use `bg-neutral-900/90 backdrop-blur`.

## Animations & Interactions

- The only transitions are `hover:text-white` on nav links and `hover:bg-neutral-200` on the button (both via `transition-colors`).
- Background video plays automatically, loops, is muted, and plays inline.

## Responsive Behavior

- Mobile hides the center nav-link pill (`hidden md:flex`) and the diagonal dividers (`hidden md:block`).
- Typography scales via viewport-width units: headlines are `text-[14vw]` on mobile, `md:text-[13vw]` on larger screens.
- Horizontal padding and stat-block offsets shift at the `md` breakpoint (e.g. `px-6 md:px-10`, `right-6 md:right-24`).

## File Structure

- `index.html` — entry HTML, font preconnect/links, title, meta description, mounts `#root`, loads `/src/main.tsx`.
- `src/main.tsx` — React entry; renders `<App />` inside `<StrictMode>` via `createRoot`.

  ```tsx
  import { StrictMode } from 'react';
  import { createRoot } from 'react-dom/client';
  import App from './App';
  import './index.css';

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  ```

- `src/App.tsx` — default-exported `App` component plus `Logo` and `Navbar` helper components and the module-level constants (`VIDEO_SRC`, `LOGO_PATH`, `NAV_LINKS`, `HEADLINE_BASE`, `STAT_NUMBER`).
- `src/index.css` — Tailwind layers, global resets, and the `.hero-title` class.
- `public/assets/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4` — vendored background video.
- Config: `tailwind.config.js`, `postcss.config.js`, `vite.config.ts`, `tsconfig.json`.

## Notes

- All visible text is lowercase.
- `NAV_LINKS` is defined as `['platform', 'solutions', 'company', 'support'] as const`.
- `LOGO_PATH` is concatenated from four `M … Z` subpaths (one per logo quadrant).
