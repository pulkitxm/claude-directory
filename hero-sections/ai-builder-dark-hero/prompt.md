# Build Faster — AI Website Builder Dark Hero

## Overview

A dark-mode hero section for an AI website builder. It pairs a full-bleed, muted, looping background video (streamed via HLS) with a black overlay, soft decorative gradient glows, and centered, motion-animated copy. A fixed transparent navbar sits on top, and the hero closes with a primary pill CTA and a secondary text-link CTA.

## Tech Stack

- **Framework:** React 19 (`react` `^19.1.0`, `react-dom` `^19.1.0`) with TypeScript (`typescript` `^5.8.0`).
- **Build tool:** Vite (`vite` `^6.3.5`) with `@vitejs/plugin-react` `^4.5.0`.
- **Styling:** Tailwind CSS v4 (`tailwindcss` `^4.1.8`) via `@tailwindcss/vite` `^4.1.8` (CSS-first config using `@import "tailwindcss"` and an `@theme` block).
- **Animation:** Motion (`motion` `^12.23.24`), imported from `motion/react`.
- **Video streaming:** HLS.js (`hls.js` `^1.6.15`) with native Safari HLS fallback.
- **Icons:** Lucide (`lucide-react` `^0.487.0`).
- **Fonts:** Instrument Sans and Instrument Serif (Google Fonts).
- **Testing/tooling:** Playwright (`playwright` `^1.52.0`); a `verify` script at `scripts/verify.mjs`.

## Global Setup

### Fonts and base CSS (`src/index.css`)

Import the Google Fonts and Tailwind, then register the font families in an `@theme` block:

```css
@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Instrument+Serif:ital@0;1&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Instrument Sans", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Instrument Serif", ui-serif, Georgia, serif;
}

html,
body {
  background-color: #000000;
}

body {
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background-color: #3054ff;
  color: #ffffff;
}
```

- `font-sans` resolves to Instrument Sans; `font-serif` resolves to Instrument Serif.
- Page background is pure black (`#000000`); text selection uses the accent blue `#3054ff` on white.

### HTML document (`index.html`)

- `lang="en"`, `<meta charset="UTF-8" />`, viewport meta `width=device-width, initial-scale=1.0`.
- `<meta name="theme-color" content="#000000" />`.
- `<meta name="description" content="Build Faster — create fully functional, SEO-optimized websites in seconds with our advanced AI engine." />`.
- `<title>Build Faster — AI Website Builder</title>`.
- Body contains `<div id="root"></div>` and `<script type="module" src="/src/main.tsx"></script>`.

### App entry

- `src/main.tsx` mounts `<App />` inside `<StrictMode>` using `createRoot` from `react-dom/client`, importing `./index.css`.
- `src/App.tsx` renders a `<main className="bg-black">` wrapping `<Navbar />` then `<Hero />`.

## Layout Structure

### Navbar component (`src/components/Navbar.tsx`)

A fixed, transparent navbar.

- **Container** (`<header>`): `fixed top-0 left-0 z-50 w-full bg-transparent px-6 py-4`.
- **Inner `<nav>`**: `flex items-center justify-between`, with `aria-label="Main"`.

**Left section:**
- Home link (`href="#"`, `aria-label="Home"`) wrapping a custom 24×24 SVG sunburst icon in white.
- The `SunburstIcon` is a `24×24` SVG (`viewBox="0 0 24 24"`, `fill="none"`, `className="text-white"`) drawing a center `<circle cx="12" cy="12" r="3.5" fill="currentColor" />` plus 12 evenly spaced rays generated with `Array.from({ length: 12 }, ...)`:
  - For each index `i`, `angle = (i * 30 * Math.PI) / 180`.
  - Inner point: `x1 = 12 + Math.cos(angle) * 6`, `y1 = 12 + Math.sin(angle) * 6`.
  - Outer point: `x2 = 12 + Math.cos(angle) * 11`, `y2 = 12 + Math.sin(angle) * 11`.
  - Each `<line>` uses `stroke="currentColor"`, `strokeWidth="1.8"`, `strokeLinecap="round"`.

**Center section** (hidden on mobile, visible on `md`): container `hidden items-center gap-8 md:flex`.
- First link is **Products** with a trailing `ChevronDown` icon (`size={14}`, `strokeWidth={2}`): `flex items-center gap-1 font-sans text-sm font-medium text-white/80 transition-colors hover:text-white`.
- Remaining links rendered from `const NAV_LINKS = ["Customer Stories", "Resources", "Pricing"];`, each: `font-sans text-sm font-medium text-white/80 transition-colors hover:text-white`.

**Right section:** container `flex items-center gap-6`.
- **Book A Demo** link (hidden on small screens, shown from `sm`): `hidden font-sans text-sm font-medium text-white/80 transition-colors hover:text-white sm:block`.
- **Get Started** button/link: `rounded-full bg-white px-5 py-2.5 font-sans text-sm font-semibold text-black transition-transform hover:scale-105`.

### Hero section component (`src/components/Hero.tsx`)

**Container** (`<section>`): `relative min-h-screen w-full overflow-hidden bg-[#000000] text-white`.

**Background video layer** — a `BackgroundVideo` subcomponent:
- Video source (HLS manifest): `https://stream.mux.com/T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g.m3u8` (the path is case-sensitive; use this exact casing).
- Poster image: vendored locally at `/assets/unsplash-photo-1647356191320-d7a1f80ca777.jpg` (stored under `public/assets/`). The original Unsplash source for this asset was `https://images.unsplash.com/photo-1647356191320-d7a1f80ca777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhcmslMjB0ZWNobm9sb2d5JTIwbmV1cmFsJTIwbmV0d29ya3xlbnwxfHx8fDE3Njg5NzIyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080`; in the implementation it is served from the local path above rather than the remote URL.
- `<video>` attributes: `muted`, `loop`, `playsInline`, `poster={POSTER_SRC}`, `aria-hidden="true"`.
- `<video>` classes: `absolute inset-0 h-full w-full object-cover opacity-60` (object-fit cover, 60% opacity).
- Playback wired up with HLS.js plus native Safari fallback (see snippet below).

**Video overlay:** a sibling `<div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />`.

**Decorative gradients** (both `pointer-events-none`, `rounded-full`, `blur-[120px]`, `mix-blend-screen`, `aria-hidden="true"`):
- Top-left glow: `absolute top-[-20%] left-[20%] h-[600px] w-[600px] bg-blue-900/20`.
- Bottom-right glow: `absolute bottom-[-10%] right-[20%] h-[500px] w-[500px] bg-indigo-900/20`.

**Content container:**
- Outer wrapper: `relative z-10 flex min-h-screen items-center justify-center px-6`.
- Inner wrapper: `mx-auto mt-20 flex max-w-5xl flex-col items-center space-y-12 text-center`.

**Pre-headline** (`motion.p`):
- Text: `Design at the speed of thought`.
- Classes: `font-serif text-3xl leading-[1.1] text-white sm:text-5xl lg:text-[48px]`.
- Animation: `initial={{ opacity: 0, y: 20 }}` `animate={{ opacity: 1, y: 0 }}` `transition={{ duration: 0.6 }}`.

**Main headline** (`motion.h1`):
- Text: `Build Faster`.
- Classes: `bg-gradient-to-b from-white via-white to-[#b4c0ff] bg-clip-text font-sans text-6xl leading-[0.9] font-semibold tracking-tighter text-transparent sm:text-8xl lg:text-[136px]`.
- Gradient text effect: `bg-gradient-to-b` from white via white to `#b4c0ff`, clipped to the text with transparent fill.
- Animation: `initial={{ opacity: 0, scale: 0.9 }}` `animate={{ opacity: 1, scale: 1 }}` `transition={{ delay: 0.2, duration: 0.6 }}`.

**Subheadline** (`motion.p`):
- Text: `Create fully functional, SEO-optimized websites in seconds with our advanced AI engine.`
- Classes: `max-w-xl font-sans text-lg leading-[1.65] text-white sm:text-[20px]` (opacity comes from the animated value below).
- Animation: `initial={{ opacity: 0 }}` `animate={{ opacity: 0.7 }}` `transition={{ delay: 0.4, duration: 0.6 }}`.

**CTA buttons** — wrapped in a `motion.div`:
- Wrapper classes: `flex flex-col items-center gap-6 sm:flex-row`.
- Wrapper animation: `initial={{ opacity: 0, y: 20 }}` `animate={{ opacity: 1, y: 0 }}` `transition={{ delay: 0.6, duration: 0.5 }}`.

**Primary button** (white pill with blue arrow):
- `<button type="button">`, classes: `group flex items-center gap-4 rounded-full bg-white py-2 pl-6 pr-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]`.
- Label `<span>`: text `Start Building Free`, classes `font-sans text-lg font-medium text-[#0a0400]`.
- Arrow container `<span>`: `flex h-10 w-10 items-center justify-center rounded-full bg-[#3054ff] transition-colors duration-300 group-hover:bg-[#2040e0]` (40×40 circle).
- Icon: `ArrowRight` (Lucide) with `size={20}`, `className="text-white"`, `aria-hidden="true"`.

**Secondary button** (text link with arrow):
- `<button type="button">`, classes: `group flex items-center gap-2 rounded-lg px-4 py-2 font-sans text-white/70 backdrop-blur-sm transition-colors duration-300 hover:bg-white/5 hover:text-white`.
- Text: `See Examples`.
- Icon: `ArrowRight` with `size={16}`, `className="transition-transform duration-300 group-hover:translate-x-1"`, `aria-hidden="true"`.

## HLS.js Video Implementation

The background video uses HLS.js when supported, falling back to native HLS playback in Safari. Exact implementation:

```tsx
import { useEffect, useRef } from "react";
import Hls from "hls.js";

const VIDEO_SRC =
  "https://stream.mux.com/T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g.m3u8";

const POSTER_SRC = "/assets/unsplash-photo-1647356191320-d7a1f80ca777.jpg";

function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(VIDEO_SRC);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((e) => console.log("Auto-play prevented:", e));
      });
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = VIDEO_SRC;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch((e) => console.log("Auto-play prevented:", e));
      });
    }
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      poster={POSTER_SRC}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover opacity-60"
    />
  );
}
```

## Motion Animations

Import: `import { motion } from "motion/react"`. Animation summary:

- **Pre-headline:** `initial={{ opacity: 0, y: 20 }}` `animate={{ opacity: 1, y: 0 }}` `transition={{ duration: 0.6 }}`.
- **Main headline:** `initial={{ opacity: 0, scale: 0.9 }}` `animate={{ opacity: 1, scale: 1 }}` `transition={{ delay: 0.2, duration: 0.6 }}`.
- **Subheadline:** `initial={{ opacity: 0 }}` `animate={{ opacity: 0.7 }}` `transition={{ delay: 0.4, duration: 0.6 }}`.
- **Buttons:** `initial={{ opacity: 0, y: 20 }}` `animate={{ opacity: 1, y: 0 }}` `transition={{ delay: 0.6, duration: 0.5 }}`.

## Color Palette

- **Background:** `#000000` (pure black).
- **Primary text:** white.
- **Secondary text:** `white/80`, `white/70`.
- **Primary button background:** white.
- **Primary button text:** `#0a0400`.
- **Primary button accent:** `#3054ff`, hover `#2040e0`.
- **Headline gradient end color:** `#b4c0ff`.
- **Decorative gradients:** `bg-blue-900/20`, `bg-indigo-900/20`.
- **Text selection:** background `#3054ff`, color `#ffffff`.

## File Structure

```
ai-builder-dark-hero/
├── index.html
├── package.json
├── public/
│   └── assets/
│       └── unsplash-photo-1647356191320-d7a1f80ca777.jpg
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    └── components/
        ├── Navbar.tsx
        └── Hero.tsx
```

## Notes

- The poster image is vendored locally under `public/assets/` and referenced at `/assets/unsplash-photo-1647356191320-d7a1f80ca777.jpg` rather than fetched from the original Unsplash URL (`https://images.unsplash.com/photo-1647356191320-d7a1f80ca777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhcmslMjB0ZWNobm9sb2d5JTIwbmV1cmFsJTIwbmV0d29ya3xlbnwxfHx8fDE3Njg5NzIyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080`).
- The HLS video manifest path (`T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g`) is case-sensitive — copy it exactly.
