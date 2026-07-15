# LinkFlow — Boomerang Video Hero Section

## Overview

Build a single full-screen hero section for a fictional integration/automation product called **LinkFlow™**. The hero fills the viewport with a looping background video that is rendered through a custom "boomerang" effect: the video's frames are captured into canvases as it plays once, then replayed forward and backward in a seamless loop at 30fps. On top of the video sit a glassmorphic navbar (with a sliding mobile drawer), centered hero copy, a bottom-left CTA block, and a bottom-right "watch the video" link. All animations are pure CSS `transition-*` classes — no animation library.

## Tech Stack

- **Framework:** React 18 (`react` / `react-dom` `^18.3.1`)
- **Build tool:** Vite `^5.4.2` with `@vitejs/plugin-react` `^4.3.1`
- **Language:** TypeScript `^5.5.3`
- **Styling:** Tailwind CSS `^3.4.1` (with `postcss` `^8.4.35` and `autoprefixer` `^10.4.18`)
- **Icons:** `lucide-react` `^0.344.0` — `LogIn`, `UserPlus`, `Play`, `Sparkles`, `Menu`, `X`
- **Fonts:** Inter (Google Fonts) and Neue Haas Grotesk (Text Pro + Display Pro 55 Roman)
- **Notable technique:** Canvas-based boomerang video playback driven by `requestVideoFrameCallback` (with `requestAnimationFrame` fallback)
- **No Framer Motion / Motion** — all motion is CSS transitions

## Global Setup

### `index.html`

**Font loading (in `<head>`):**

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
<link href="/fonts/neue-haas-grotesk-text-pro.css" rel="stylesheet" />
<link href="https://db.onlinewebfonts.com/c/dec0d9b4e22ca588dc20e1e2e09a59b5?family=Neue+Haas+Grotesk+Display+Pro+55+Roman" rel="stylesheet" />
```

> Note: Neue Haas Grotesk Text Pro is served from a local stylesheet (`/fonts/neue-haas-grotesk-text-pro.css`) that `@font-face`-declares the family from local `woff2`/`woff`/`ttf` files (originally from OnlineWebFonts, hash `6e47ef470dd19698c911332a9b4d1cf4`). Neue Haas Grotesk Display Pro 55 Roman is still loaded from `db.onlinewebfonts.com`.

### `public/fonts/neue-haas-grotesk-text-pro.css`

```css
@font-face {
  font-family: "Neue Haas Grotesk Text Pro";
  src: url("/fonts/6e47ef470dd19698c911332a9b4d1cf4.woff2") format("woff2"),
       url("/fonts/6e47ef470dd19698c911332a9b4d1cf4.woff") format("woff"),
       url("/fonts/6e47ef470dd19698c911332a9b4d1cf4.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

### `src/index.css`

Body/root font stack:

```css
html, body, #root {
  height: 100%;
  margin: 0;
  font-family: 'Neue Haas Grotesk Display Pro 55 Roman', 'Neue Haas Grotesk Text Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
```

### Background video

The hero background source is a local asset:

```
/assets/hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6.mp4
```

> Note: this video was originally hosted on CloudFront at `https://d8j0ntlcm91z4.cloudfront.net/user_38XZzbOKVigwjOtTwiXh07lwa1P/hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6.mp4` and has been vendored into `public/assets/` (lowercase filename). Reference it via the local path in `App.tsx`.

## Color Palette

| Token                         | Hex                                |
| ----------------------------- | ---------------------------------- |
| Dark green (text, buttons)    | `#1f2a1d`                          |
| Medium dark green             | `#2d3a2a`                          |
| Button hover                  | `#2a3827`                          |
| Body text green               | `#4b5b47`                          |
| Heading primary               | `#336443`                          |
| Heading accent                | `#85AB8B` (note: uppercase in source) |
| Bottom-left text              | `#3d5638`                          |
| Bottom-left button background | `#3d5638`, hover `#2d4228`         |

## Architecture

Two component files under `src/`:

1. **`BoomerangVideoBg.tsx`** — captures the video's frames into canvases, then plays them forward/backward in a seamless boomerang loop at 30fps (960px max capture width).
2. **`App.tsx`** — the full hero section.

## Layout & Spacing Notes

- **Root section:** `relative w-full min-h-screen sm:h-screen overflow-hidden`
- **Navbar padding:** `px-4 sm:px-6 md:px-10 py-4 sm:py-6`
- **Desktop pill nav:** `bg-white/70 backdrop-blur-md rounded-full pl-6 pr-1 py-1 shadow-sm border border-white/60`
- **Hero copy block:** `pt-24 sm:pt-28 md:pt-32`; heading font sizes `text-[2rem] sm:text-4xl md:text-5xl lg:text-[4.75rem] xl:text-[5.25rem]`, `leading-[0.95]`, inline `letterSpacing: '-0.035em'`
- **Bottom-left block:** `absolute left-4 right-4 sm:right-auto sm:left-6 md:left-10 bottom-6 sm:bottom-8 md:bottom-10`
- **Bottom-right video link:** `absolute right-6 md:right-10 bottom-8 md:bottom-10`

## Components

### `BoomerangVideoBg.tsx`

A component that takes a video `src` and an optional `className`. On mount it plays the (muted, inline) video once and captures every distinct frame into an off-screen `<canvas>` (max width 960px, height scaled proportionally). When the video `ended` event fires it flips `framesReady` to `true`, hides the `<video>`, shows the display `<canvas>`, and starts a `requestAnimationFrame` render loop that draws the captured frames forward then backward at a 30fps interval (`1000 / 30`), reversing `direction` at each end.

- Frame capture is driven by `requestVideoFrameCallback` when available (feature-detected via `hasVFC`), otherwise by a `requestAnimationFrame` loop.
- Capture skips when `video.readyState < 2` or when `currentTime` hasn't advanced since `lastTime`.
- The `<video>` uses `muted`, `playsInline`, `preload="auto"`, `crossOrigin="anonymous"`, and `object-cover`.
- Both `<video>` and display `<canvas>` toggle visibility via inline `style={{ display: ... }}` based on `framesReady`.

Exact implementation:

```tsx
import { useEffect, useRef, useState } from 'react';

type Props = {
  src: string;
  className?: string;
};

export default function BoomerangVideoBg({ src, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const [framesReady, setFramesReady] = useState(false);
  const framesRef = useRef<HTMLCanvasElement[]>([]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const frames: HTMLCanvasElement[] = [];
    let capturing = true;
    let lastTime = -1;
    const MAX_WIDTH = 960;

    const captureFrame = () => {
      if (!capturing || video.readyState < 2) return;
      if (video.currentTime === lastTime) return;
      lastTime = video.currentTime;

      const vw = video.videoWidth;
      const vh = video.videoHeight;
      if (!vw || !vh) return;

      const scale = Math.min(1, MAX_WIDTH / vw);
      const w = Math.round(vw * scale);
      const h = Math.round(vh * scale);

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(video, 0, 0, w, h);
      frames.push(canvas);
    };

    type VFCVideo = HTMLVideoElement & {
      requestVideoFrameCallback?: (cb: () => void) => number;
    };
    const vfcVideo = video as VFCVideo;
    const hasVFC = typeof vfcVideo.requestVideoFrameCallback === 'function';

    let rafId = 0;
    const rafLoop = () => {
      captureFrame();
      if (capturing) rafId = requestAnimationFrame(rafLoop);
    };

    const vfcLoop = () => {
      captureFrame();
      if (capturing && vfcVideo.requestVideoFrameCallback) {
        vfcVideo.requestVideoFrameCallback(vfcLoop);
      }
    };

    const onEnded = () => {
      capturing = false;
      if (frames.length > 0) {
        framesRef.current = frames;
        setFramesReady(true);
      }
    };

    const onLoaded = () => {
      video.play().catch(() => {});
      if (hasVFC) {
        vfcVideo.requestVideoFrameCallback!(vfcLoop);
      } else {
        rafId = requestAnimationFrame(rafLoop);
      }
    };

    video.addEventListener('loadedmetadata', onLoaded);
    video.addEventListener('ended', onEnded);
    if (video.readyState >= 1) onLoaded();

    return () => {
      capturing = false;
      cancelAnimationFrame(rafId);
      video.removeEventListener('loadedmetadata', onLoaded);
      video.removeEventListener('ended', onEnded);
    };
  }, [src]);

  useEffect(() => {
    if (!framesReady) return;
    const canvas = displayCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const frames = framesRef.current;
    if (frames.length === 0) return;

    const first = frames[0];
    canvas.width = first.width;
    canvas.height = first.height;

    let index = 0;
    let direction = 1;
    let last = performance.now();
    const interval = 1000 / 30;
    let rafId = 0;

    const render = (now: number) => {
      if (now - last >= interval) {
        last = now;
        ctx.drawImage(frames[index], 0, 0);
        index += direction;
        if (index >= frames.length - 1) {
          index = frames.length - 1;
          direction = -1;
        } else if (index <= 0) {
          index = 0;
          direction = 1;
        }
      }
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, [framesReady]);

  return (
    <div className={className ?? 'absolute inset-0 w-full h-full'}>
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        style={{ display: framesReady ? 'none' : 'block' }}
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
      />
      <canvas
        ref={displayCanvasRef}
        className="w-full h-full object-cover"
        style={{ display: framesReady ? 'block' : 'none' }}
      />
    </div>
  );
}
```

### `App.tsx`

The full hero. Holds a single piece of state, `menuOpen`, that toggles the mobile drawer and locks body scroll (`document.body.style.overflow = 'hidden'`) while open.

**Nav links** (array `navLinks`):

- `{ href: '#mission', label: 'Purpose' }`
- `{ href: '#how', label: 'The Process' }`
- `{ href: '#pricing', label: 'Tariffs' }`

#### Navbar (`<nav>`)

- **Brand (left):** `LinkFlow` with a `<sup>` reading `TM` (`text-[10px] sm:text-xs font-medium`), in container `text-[#2d3a2a]`, brand text `text-lg sm:text-xl md:text-2xl font-semibold tracking-tight`.
- **Desktop pill nav (`hidden lg:flex`):** maps `navLinks` into `<a>` links (`text-sm px-3 py-2 transition-colors`). The first link (`i === 0`) is `font-semibold text-[#1f2a1d]`; the rest are `font-medium text-[#4b5b47] hover:text-[#1f2a1d]`. Followed by a **Try it Live** button: `ml-2 bg-[#1f2a1d] hover:bg-[#2a3827] text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors`.
- **Right cluster:** two `hidden sm:flex` links — **Sign Me Up!** (with `UserPlus` icon `w-4 h-4`) and **Enter** (with `LogIn` icon `w-4 h-4`), each `text-sm font-medium hover:opacity-80 transition-opacity` linking to `#signup` / `#login`. Then a `lg:hidden` hamburger toggle button.
- **Hamburger button:** `w-10 h-10 rounded-full bg-white/70 backdrop-blur-md border border-white/60 text-[#1f2a1d] transition-all duration-300 hover:bg-white/90`. `aria-label` is `Close menu` when open else `Open menu`, with `aria-expanded={menuOpen}`. It layers `Menu` and `X` icons (both `w-5 h-5 absolute transition-all duration-300`) that cross-fade/rotate based on `menuOpen`.

#### Mobile menu overlay

A `lg:hidden fixed inset-0 z-20 transition-opacity duration-300` div (clicking it closes the menu) containing a backdrop `absolute inset-0 bg-[#1f2a1d]/40 backdrop-blur-sm`. Toggles `opacity-100 pointer-events-auto` (open) vs `opacity-0 pointer-events-none` (closed).

#### Mobile menu drawer

A right-anchored drawer: `lg:hidden fixed top-0 right-0 bottom-0 z-20 w-[85%] max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`, sliding between `translate-x-0` (open) and `translate-x-full` (closed). Inner container: `flex flex-col h-full pt-24 px-8 pb-8`.

- **Nav links list:** maps `navLinks` into large links `text-2xl font-semibold text-[#1f2a1d] py-4 border-b border-[#1f2a1d]/10 transition-all duration-500`, each closing the menu on click and staggered via inline `transitionDelay: menuOpen ? \`${150 + i * 70}ms\` : '0ms'`. Open state adds `translate-x-0 opacity-100`; closed adds `translate-x-8 opacity-0`.
- **CTA group:** `mt-8 flex flex-col gap-4 transition-all duration-500` with inline `transitionDelay: menuOpen ? '400ms' : '0ms'`. Contains the `sm:hidden` **Sign Me Up!** and **Enter** links (`text-sm font-medium text-[#2d3a2a]`) and a **Try it Live** button (`mt-2 bg-[#1f2a1d] hover:bg-[#2a3827] text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors`).

#### Hero copy

Centered block `relative z-10 flex flex-col items-center text-center pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6`.

- **Heading (`<h1>`):** `font-normal leading-[0.95] text-[#336443] text-[2rem] sm:text-4xl md:text-5xl lg:text-[4.75rem] xl:text-[5.25rem] max-w-5xl`, with inline `fontFamily: '"Neue Haas Grotesk Display Pro 55 Roman", "Neue Haas Grotesk Text Pro", "Helvetica Neue", Helvetica, Arial, sans-serif'` and `letterSpacing: '-0.035em'`. Copy: `Close the rift ` followed by a `text-[#85AB8B]` span reading `linking` then a `<br className="hidden sm:block" />` and ` signals and action`.
- **Paragraph (`<p>`):** `mt-6 sm:mt-8 text-[#4b5b47] text-sm sm:text-base md:text-lg leading-relaxed max-w-md px-2` — copy: `Shape scattered signals into meaningful outcomes via AI-driven workflows.`

#### Bottom-left CTA block

`absolute left-4 right-4 sm:right-auto sm:left-6 md:left-10 bottom-6 sm:bottom-8 md:bottom-10 z-10 max-w-sm`.

- **Eyebrow row:** `flex items-center gap-2 text-[#3d5638] sm:text-white/95 mb-3` — a `Sparkles` icon (`w-4 h-4`) and `FluxEngine` with a `TM` `<sup>` (`text-[10px]`); label `text-sm font-semibold sm:font-medium`.
- **Paragraph:** `text-[#3d5638]/90 sm:text-white/85 text-xs leading-relaxed mb-6 max-w-xs font-medium sm:font-normal` — copy: `LinkFlow smoothly unites your company systems, streamlining data paths between services without having to write custom scripts.`
- **Button row:** `flex items-center gap-4 flex-wrap` containing:
  - **Try it Live** button: `bg-[#3d5638] sm:bg-white hover:bg-[#2d4228] sm:hover:bg-white/90 text-white sm:text-[#1f2a1d] text-sm font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-colors shadow-sm`.
  - **Know More.** button: `text-[#3d5638] sm:text-white text-sm font-semibold sm:font-medium hover:opacity-80 transition-opacity`.

#### Bottom-right video link

`hidden sm:flex absolute right-6 md:right-10 bottom-8 md:bottom-10 z-10 items-center gap-2 text-white/90 text-sm`.

- Circular play button `flex items-center justify-center w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors` wrapping a `Play` icon (`w-3 h-3 fill-white text-white ml-0.5`).
- Label `<span className="font-medium">How we build?</span>` and a duration `<span className="text-white/60">1:35</span>`.

Exact implementation:

```tsx
import { useState, useEffect } from 'react';
import { LogIn, UserPlus, Play, Sparkles, Menu, X } from 'lucide-react';
import BoomerangVideoBg from './BoomerangVideoBg';

const BG_VIDEO =
  '/assets/hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6.mp4';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navLinks = [
    { href: '#mission', label: 'Purpose' },
    { href: '#how', label: 'The Process' },
    { href: '#pricing', label: 'Tariffs' },
  ];

  return (
    <section className="relative w-full min-h-screen sm:h-screen overflow-hidden">
      <BoomerangVideoBg src={BG_VIDEO} className="absolute inset-0 w-full h-full" />
      <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 sm:py-6">
        <div className="flex items-center gap-2 text-[#2d3a2a]">
          <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
            LinkFlow<sup className="text-[10px] sm:text-xs font-medium">TM</sup>
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-1 bg-white/70 backdrop-blur-md rounded-full pl-6 pr-1 py-1 shadow-sm border border-white/60">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm px-3 py-2 transition-colors ${
                i === 0 ? 'font-semibold text-[#1f2a1d]' : 'font-medium text-[#4b5b47] hover:text-[#1f2a1d]'
              }`}
            >
              {link.label}
            </a>
          ))}
          <button className="ml-2 bg-[#1f2a1d] hover:bg-[#2a3827] text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors">
            Try it Live
          </button>
        </div>

        <div className="flex items-center gap-3 sm:gap-6 text-[#2d3a2a]">
          <a href="#signup" className="hidden sm:flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity">
            <UserPlus className="w-4 h-4" />
            Sign Me Up!
          </a>
          <a href="#login" className="hidden sm:flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity">
            <LogIn className="w-4 h-4" />
            Enter
          </a>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden relative flex items-center justify-center w-10 h-10 rounded-full bg-white/70 backdrop-blur-md border border-white/60 text-[#1f2a1d] transition-all duration-300 hover:bg-white/90"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <Menu
              className={`w-5 h-5 absolute transition-all duration-300 ${
                menuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
              }`}
            />
            <X
              className={`w-5 h-5 absolute transition-all duration-300 ${
                menuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-20 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-[#1f2a1d]/40 backdrop-blur-sm" />
      </div>

      {/* Mobile menu drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 bottom-0 z-20 w-[85%] max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-8">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-2xl font-semibold text-[#1f2a1d] py-4 border-b border-[#1f2a1d]/10 transition-all duration-500 ${
                  menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: menuOpen ? `${150 + i * 70}ms` : '0ms' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div
            className={`mt-8 flex flex-col gap-4 transition-all duration-500 ${
              menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}
            style={{ transitionDelay: menuOpen ? '400ms' : '0ms' }}
          >
            <a href="#signup" className="flex items-center gap-2 text-sm font-medium text-[#2d3a2a] sm:hidden">
              <UserPlus className="w-4 h-4" />
              Sign Me Up!
            </a>
            <a href="#login" className="flex items-center gap-2 text-sm font-medium text-[#2d3a2a] sm:hidden">
              <LogIn className="w-4 h-4" />
              Enter
            </a>
            <button className="mt-2 bg-[#1f2a1d] hover:bg-[#2a3827] text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors">
              Try it Live
            </button>
          </div>
        </div>
      </div>

      {/* Hero copy */}
      <div className="relative z-10 flex flex-col items-center text-center pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6">
        <h1
          className="font-normal leading-[0.95] text-[#336443] text-[2rem] sm:text-4xl md:text-5xl lg:text-[4.75rem] xl:text-[5.25rem] max-w-5xl"
          style={{ fontFamily: '"Neue Haas Grotesk Display Pro 55 Roman", "Neue Haas Grotesk Text Pro", "Helvetica Neue", Helvetica, Arial, sans-serif', letterSpacing: '-0.035em' }}
        >
          Close the rift{' '}
          <span className="text-[#85AB8B]">
            linking
            <br className="hidden sm:block" /> signals and action
          </span>
        </h1>
        <p className="mt-6 sm:mt-8 text-[#4b5b47] text-sm sm:text-base md:text-lg leading-relaxed max-w-md px-2">
          Shape scattered signals into meaningful outcomes via AI-driven workflows.
        </p>
      </div>

      {/* Bottom-left CTA block */}
      <div className="absolute left-4 right-4 sm:right-auto sm:left-6 md:left-10 bottom-6 sm:bottom-8 md:bottom-10 z-10 max-w-sm">
        <div className="flex items-center gap-2 text-[#3d5638] sm:text-white/95 mb-3">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-semibold sm:font-medium">
            FluxEngine<sup className="text-[10px]">TM</sup>
          </span>
        </div>
        <p className="text-[#3d5638]/90 sm:text-white/85 text-xs leading-relaxed mb-6 max-w-xs font-medium sm:font-normal">
          LinkFlow smoothly unites your company systems, streamlining data paths between services without having to write custom scripts.
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <button className="bg-[#3d5638] sm:bg-white hover:bg-[#2d4228] sm:hover:bg-white/90 text-white sm:text-[#1f2a1d] text-sm font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-colors shadow-sm">
            Try it Live
          </button>
          <button className="text-[#3d5638] sm:text-white text-sm font-semibold sm:font-medium hover:opacity-80 transition-opacity">
            Know More.
          </button>
        </div>
      </div>

      {/* Bottom-right video link */}
      <div className="hidden sm:flex absolute right-6 md:right-10 bottom-8 md:bottom-10 z-10 items-center gap-2 text-white/90 text-sm">
        <button className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
          <Play className="w-3 h-3 fill-white text-white ml-0.5" />
        </button>
        <span className="font-medium">How we build?</span>
        <span className="text-white/60">1:35</span>
      </div>
    </section>
  );
}

export default App;
```

## Animation Details (all CSS, no Framer Motion)

| Element                    | Property                                                               | Values                                                                                                                 |
| -------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Hamburger Menu/X icon swap | `transition-all duration-300`                                          | Open: `Menu` gets `opacity-0 rotate-90 scale-50`, `X` gets `opacity-100 rotate-0 scale-100`. Closed: reverse.          |
| Mobile overlay backdrop    | `transition-opacity duration-300`                                      | Open: `opacity-100 pointer-events-auto`. Closed: `opacity-0 pointer-events-none`.                                      |
| Mobile drawer slide        | `transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]` | Open: `translate-x-0`. Closed: `translate-x-full`.                                                                     |
| Mobile nav links stagger   | `transition-all duration-500`                                          | Open: `translate-x-0 opacity-100`, delay per item: `150ms + i * 70ms`. Closed: `translate-x-8 opacity-0`, delay `0ms`. |
| Mobile CTA group           | `transition-all duration-500`                                          | Open: `translate-x-0 opacity-100`, delay `400ms`. Closed: `translate-x-8 opacity-0`, delay `0ms`.                      |
| Nav buttons                | `transition-colors`                                                    | Default Tailwind duration (150ms).                                                                                     |
| Opacity links              | `transition-opacity`                                                   | `hover:opacity-80`.                                                                                                    |

## File Structure

```
linkflow-boomerang-hero/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.ts
├── public/
│   ├── assets/
│   │   └── hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6.mp4
│   └── fonts/
│       └── neue-haas-grotesk-text-pro.css
└── src/
    ├── App.tsx
    ├── BoomerangVideoBg.tsx
    └── index.css
```

## Dependencies (`package.json`)

```json
{
  "dependencies": {
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "vite": "^5.4.2"
  }
}
```
