# Aethera — Cinematic Hero Section with Looping Video Background

## Overview

Build a fullscreen, single-page hero section for a fictional studio brand called "Aethera". The page pairs a monochrome editorial layout (white background, black ink, gray accents) with a looping background video that custom-fades in and out at each playthrough, an editorial serif headline with italicized emphasis, a glassmorphic navigation bar, and a staggered "fade-rise" entrance animation.

## Tech Stack

- **Framework:** React `^18.3.1` with `react-dom` `^18.3.1`
- **Build tool:** Vite `^6.3.5` with `@vitejs/plugin-react` `^4.4.1`
- **Language:** TypeScript `^5.8.3`
- **Styling:** Tailwind CSS `^4.1.7` via the `@tailwindcss/vite` `^4.1.7` plugin (CSS-first config using the `@theme` directive — no `tailwind.config.js`)
- **Fonts:** Instrument Serif (display) and Inter (body), loaded from Google Fonts
- **Testing/tooling:** Playwright `^1.60.0` (dev dependency)
- **Notable techniques:** custom `requestAnimationFrame`-driven video fade loop, CSS keyframe entrance choreography, `prefers-reduced-motion` support, glassmorphic backdrop blur on the navbar

## Global Setup

### Entry HTML (`index.html`)

- `<html lang="en">`, `<meta charset="UTF-8" />`, `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`.
- Meta description: `Aethera — Beyond silence, we build the eternal. Digital havens for deep work and pure flows.`
- Preconnect to Google Fonts: `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (the latter with `crossorigin`).
- Inline SVG favicon (`data:image/svg+xml,...`): a `32×32` rounded rect (`rx='16'`) filled `#000000` with a centered white (`#ffffff`) letter "A" in `Georgia,serif` at `font-size='18'`.
- Page `<title>`: `Aethera® — Beyond silence, we build the eternal.`
- Body contains `<div id="root"></div>` and loads `<script type="module" src="/src/main.tsx"></script>`.

### React entry (`src/main.tsx`)

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

### Stylesheet imports (`src/index.css`)

Import order matters — fonts first, then Tailwind, then theme:

```css
@import "./styles/fonts.css";
@import "tailwindcss";
@import "./styles/theme.css";
```

## Fonts (`src/styles/fonts.css`)

- **Display text** (headings, logo): Instrument Serif (roman + italic, used for headline emphasis).
- **Body text** (navigation, descriptions, buttons): Inter.
- Both fonts are imported via a single Google Fonts `@import`:

```css
@import url("https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap");
```

## Color Palette & Theme Tokens (`src/styles/theme.css`)

Define design tokens inside Tailwind's `@theme` block so they are available as utilities (e.g. `bg-background`) and CSS variables:

```css
@theme {
  --color-background: #ffffff;
  --color-ink: #000000;
  --color-muted: #6f6f6f;

  --font-display: "Instrument Serif", "Georgia", "Times New Roman", serif;
  --font-body:
    "Inter", -apple-system, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
}
```

Color usage summary:

- **Background:** white (`#ffffff`)
- **Headlines / logo / buttons:** black (`#000000`)
- **Descriptions / inactive menu items / italic emphasis words:** gray (`#6f6f6f`)
- **Button text:** white (`#ffffff` / `#FFFFFF`)

### Base styles

Also in `theme.css`:

```css
::selection {
  background: #000000;
  color: #ffffff;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background-color: var(--color-background);
  color: var(--color-ink);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
```

## Layout Structure (`src/App.tsx`)

A single root container holds three stacked layers:

```tsx
import VideoBackground from "./components/VideoBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default function App() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <VideoBackground />
      <Navbar />
      <Hero />
    </div>
  );
}
```

- **Container:** `relative min-h-screen w-full overflow-hidden bg-background`.
- **Background video layer** sits at `z-0`.
- **Gradient overlay** is rendered over the video.
- **Navigation bar** and **hero section** both sit at `z-10`.
- All elements should be responsive and maintain the glassmorphic aesthetic with the specified padding, positioning, and smooth animations.

## Video Background (`src/components/VideoBackground.tsx`)

### Source

- The video asset is served locally from `/assets/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4` (a `VIDEO_SRC` constant). The original asset was sourced from `https://d8j0ntlcm91z4.cloudfront.net/USER_38XZZBOKVIGWJOTTWIXH07LWA1P/HF_20260328_083109_283F3553-E28F-428B-A723-D639C617EB2B.MP4` and has been vendored into the project's `public/assets/` directory (the local filename is lowercased). Note: the CloudFront URL appeared fully uppercased in the original brief; only its scheme+host casing has been normalized here (the case-sensitive path segment and `.MP4` extension are preserved as-is) — the local path is the ground-truth source.

### Positioning

- The `<video>` element uses `position: absolute` with inline style `inset: "auto 0 0 0"` and `top: "300px"`, plus `opacity: 0` (driven by JS) and `willChange: "opacity"`.
- Classes on the video: `absolute w-full object-cover`.
- Wrapper: `<div aria-hidden="true" className="absolute inset-0 z-0">`.
- Video attributes: `muted`, `playsInline`, `autoPlay`, `preload="auto"`.

### Custom fade-in / fade-out loop logic

Implemented with React `useEffect` and `useRef`:

- A `requestAnimationFrame` loop continuously monitors `currentTime` and `duration`.
- **Fade in** over `0.5s` at the start (opacity `0 → 1`).
- **Fade out** over `0.5s` before the end (opacity `1 → 0`).
- On the `ended` event: set opacity to `0`, wait `100ms`, reset `currentTime = 0`, then call `play()` again.
- This creates a seamless manual loop with smooth fade transitions.
- Constants: `FADE_SECONDS = 0.5` (fade window applied at both ends), `RESTART_DELAY_MS = 100` (pause between loops before restart).

Reference implementation:

```tsx
import { useEffect, useRef } from "react";

const VIDEO_SRC =
  "/assets/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4";

/** Fade window, in seconds, applied at both ends of each playthrough. */
const FADE_SECONDS = 0.5;

/** Pause between loops before the video restarts, in milliseconds. */
const RESTART_DELAY_MS = 100;

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let frameId = 0;
    let restartTimer: number | undefined;

    const updateOpacity = () => {
      const { currentTime, duration } = video;

      if (Number.isFinite(duration) && duration > 0) {
        const fadeIn = currentTime / FADE_SECONDS;
        const fadeOut = (duration - currentTime) / FADE_SECONDS;
        const opacity = Math.min(Math.max(Math.min(fadeIn, fadeOut), 0), 1);
        video.style.opacity = opacity.toFixed(3);
      }

      frameId = requestAnimationFrame(updateOpacity);
    };

    const handleEnded = () => {
      video.style.opacity = "0";
      restartTimer = window.setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {
          /* autoplay interrupted — the rAF loop keeps the layer hidden */
        });
      }, RESTART_DELAY_MS);
    };

    video.addEventListener("ended", handleEnded);
    frameId = requestAnimationFrame(updateOpacity);

    video.play().catch(() => {
      /* Autoplay can be deferred by the browser; muted playback retries
         automatically once the media is allowed to start. */
    });

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(restartTimer);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0 z-0">
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        playsInline
        autoPlay
        preload="auto"
        className="absolute w-full object-cover"
        style={{
          inset: "auto 0 0 0",
          top: "300px",
          opacity: 0,
          willChange: "opacity",
        }}
      />
      {/* Gradient veil: dissolves the video into the page at both edges. */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
    </div>
  );
}
```

### Gradient overlay

A sibling `<div>` over the video: `absolute inset-0 bg-gradient-to-b from-background via-transparent to-background` — dissolves the video into the page at the top and bottom edges.

## Navigation Bar (`src/components/Navbar.tsx`)

- **Header wrapper:** `<header className="relative z-10 bg-white/70 backdrop-blur-md">` — the glassmorphic blur effect.
- **Nav element:** `aria-label="Primary"`, classes `mx-auto flex max-w-7xl items-center justify-between px-8 py-6`.
- **Logo:** `Aethera®` where the registered-trademark symbol (`&reg;`) is rendered as a superscript via `<sup className="text-[0.45em]">`. Logo `<a href="#">` styling: `font-display text-3xl tracking-tight text-[#000000]`.
- **Menu items** (rendered from a `MENU_ITEMS` array, hidden on small screens via `hidden items-center gap-8 md:flex`):
  - `Home` — `href="#"`, active, color `text-[#000000]`
  - `Studio` — `href="#studio"`
  - `About` — `href="#about"`
  - `Journal` — `href="#journal"`
  - `Reach Us` — `href="#reach-us"`
  - Inactive items: `text-[#6F6F6F] hover:text-[#000000]`. All items: `text-sm transition-colors`. The active item also sets `aria-current="page"`.
- **CTA button:** label `Begin Journey`, classes `rounded-full bg-[#000000] px-6 py-2.5 text-sm text-white transition-transform duration-300 ease-out hover:scale-103`.

```tsx
const MENU_ITEMS = [
  { label: "Home", href: "#", active: true },
  { label: "Studio", href: "#studio", active: false },
  { label: "About", href: "#about", active: false },
  { label: "Journal", href: "#journal", active: false },
  { label: "Reach Us", href: "#reach-us", active: false },
];

export default function Navbar() {
  return (
    <header className="relative z-10 bg-white/70 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6"
      >
        <a
          href="#"
          className="font-display text-3xl tracking-tight text-[#000000]"
        >
          Aethera<sup className="text-[0.45em]">&reg;</sup>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {MENU_ITEMS.map(({ label, href, active }) => (
            <li key={label}>
              <a
                href={href}
                aria-current={active ? "page" : undefined}
                className={`text-sm transition-colors ${
                  active
                    ? "text-[#000000]"
                    : "text-[#6F6F6F] hover:text-[#000000]"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="rounded-full bg-[#000000] px-6 py-2.5 text-sm text-white transition-transform duration-300 ease-out hover:scale-103"
        >
          Begin Journey
        </button>
      </nav>
    </header>
  );
}
```

## Hero Section (`src/components/Hero.tsx`)

### Positioning & layout

- **Section:** `relative z-10 flex flex-col items-center justify-center px-6 pb-40 text-center` with inline `style={{ paddingTop: "calc(8rem - 75px)" }}`.

### Headline

- **Text:** "Beyond *silence,* we build *the eternal.*" — the words `silence,` and `the eternal.` are wrapped in `<em className="italic text-[#6F6F6F]">` for italic emphasis; the rest is `#000000`.
- **Classes:** `animate-fade-rise max-w-7xl font-display text-5xl font-normal text-[#000000] sm:text-7xl md:text-8xl`.
- **Inline style:** `lineHeight: 0.95`, `letterSpacing: "-2.46px"`.
- **Font:** Instrument Serif (`font-display`).
- **Animation:** `animate-fade-rise`.

### Description

- **Text:** `Building platforms for brilliant minds, fearless makers, and thoughtful souls. Through the noise, we craft digital havens for deep work and pure flows.`
- **Classes:** `animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-[#6F6F6F] sm:text-lg`.
- **Color:** `#6F6F6F`.
- **Animation:** `animate-fade-rise-delay`.

### Hero CTA button

- **Text:** `Begin Journey`.
- **Classes:** `animate-fade-rise-delay-2 mt-12 rounded-full bg-[#000000] px-14 py-5 text-base text-[#FFFFFF] transition-transform duration-300 ease-out hover:scale-103`.
- **Colors:** black background (`#000000`), white text (`#FFFFFF`).
- **Hover:** scale `1.03` (`hover:scale-103`).
- **Animation:** `animate-fade-rise-delay-2`.

```tsx
export default function Hero() {
  return (
    <section
      className="relative z-10 flex flex-col items-center justify-center px-6 pb-40 text-center"
      style={{ paddingTop: "calc(8rem - 75px)" }}
    >
      <h1
        className="animate-fade-rise max-w-7xl font-display text-5xl font-normal text-[#000000] sm:text-7xl md:text-8xl"
        style={{ lineHeight: 0.95, letterSpacing: "-2.46px" }}
      >
        Beyond <em className="italic text-[#6F6F6F]">silence,</em> we build{" "}
        <em className="italic text-[#6F6F6F]">the eternal.</em>
      </h1>

      <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-[#6F6F6F] sm:text-lg">
        Building platforms for brilliant minds, fearless makers, and thoughtful
        souls. Through the noise, we craft digital havens for deep work and
        pure flows.
      </p>

      <button
        type="button"
        className="animate-fade-rise-delay-2 mt-12 rounded-full bg-[#000000] px-14 py-5 text-base text-[#FFFFFF] transition-transform duration-300 ease-out hover:scale-103"
      >
        Begin Journey
      </button>
    </section>
  );
}
```

## Animations (`src/styles/theme.css`)

The entrance choreography uses a single `fade-rise` keyframe with three staggered helper classes:

- **`fade-rise`:** opacity `0 → 1`, `translateY(20px) → translateY(0)`, duration `0.8s`, `ease-out`.
- **`.animate-fade-rise`:** `fade-rise 0.8s ease-out both`.
- **`.animate-fade-rise-delay`:** same as fade-rise but with a `0.2s` delay.
- **`.animate-fade-rise-delay-2`:** same as fade-rise but with a `0.4s` delay.
- **Reduced motion:** under `@media (prefers-reduced-motion: reduce)`, all three classes settle instantly (`animation-duration: 0.01ms; animation-delay: 0ms;`) — no rise.

```css
/* ---- Entrance choreography ------------------------------------- */

@keyframes fade-rise {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-rise {
  animation: fade-rise 0.8s ease-out both;
}

.animate-fade-rise-delay {
  animation: fade-rise 0.8s ease-out 0.2s both;
}

.animate-fade-rise-delay-2 {
  animation: fade-rise 0.8s ease-out 0.4s both;
}

/* Respect reduced-motion preferences: settle instantly, no rise. */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-rise,
  .animate-fade-rise-delay,
  .animate-fade-rise-delay-2 {
    animation-duration: 0.01ms;
    animation-delay: 0ms;
  }
}
```

## File Structure

```
aethera-cinematic-hero/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── public/
│   └── assets/
│       └── hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── vite-env.d.ts
    ├── components/
    │   ├── VideoBackground.tsx
    │   ├── Navbar.tsx
    │   └── Hero.tsx
    └── styles/
        ├── fonts.css
        └── theme.css
```

## Scripts (`package.json`)

- `dev`: `vite`
- `build`: `tsc -b && vite build`
- `preview`: `vite preview`
