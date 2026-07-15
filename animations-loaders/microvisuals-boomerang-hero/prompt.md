# MicroVisuals — Boomerang Video Hero Section

## Overview

Build a fullscreen hero section for an AI image-generation product called **MicroVisuals**. A background video plays once, every frame is snapshotted into offscreen canvases, and the frames then ping-pong forward and backward forever (a "boomerang" loop) on a display canvas. A liquid-glass navbar, an oversized italic serif title, mouse-driven parallax on the background, and a bottom action row complete the layout.

## Tech Stack

- **Framework:** React 18 (`react` `^18.3.1`, `react-dom` `^18.3.1`) with TypeScript (`~5.6.3`).
- **Build tool:** Vite (`^6.0.3`) with `@vitejs/plugin-react` (`^4.3.4`).
- **Styling:** Tailwind CSS (`^3.4.15`) with `postcss` (`^8.4.49`) and `autoprefixer` (`^10.4.20`).
- **Animation:** GSAP (`gsap` `^3.12.5`) — used only for the parallax `gsap.set` transform.
- **Icons:** `lucide-react` (`^0.468.0`) is a dependency. No other UI libraries.
- **Fonts:** Instrument Serif and Barlow (Google Fonts), plus a self-hosted `Dirtyline` display face.
- **Notable techniques:** `requestVideoFrameCallback` (with `requestAnimationFrame` fallback) for frame capture; canvas-based boomerang playback; pointer-lerp parallax; CSS "liquid glass" backdrop-filter cards with gradient-masked borders.

> Build a fullscreen hero section in a Vite + React + TypeScript + Tailwind CSS project. Use `gsap` and `lucide-react`. No other UI libraries.

## Global Setup

### Fonts (in `src/index.css`)

Import at the very top of `index.css`, **before** the `@tailwind` directives:

```css
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Barlow:wght@300;400;500;600&display=swap');

@font-face {
  font-family: 'Dirtyline';
  src: url('https://fonts.cdnfonts.com/s/15011/Dirtyline36DaysofType.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

Then the Tailwind layers and the body base styles:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Barlow', sans-serif;
  background: #000;
}
```

- **Body font:** `'Barlow', sans-serif`.
- **Background:** `#000`.

### Tailwind config (`tailwind.config.js`)

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Instrument Serif', 'serif'],
        body: ['Barlow', 'sans-serif'],
        dirtyline: ['Dirtyline', 'sans-serif'],
      },
      borderRadius: { DEFAULT: '9999px' },
    },
  },
  plugins: [],
}
```

> Note: The Tailwind default `borderRadius` is overridden to `9999px` (full pill), so every `rounded` class in the markup produces pill corners.

### Custom CSS (append to `src/index.css`)

```css
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

.liquid-glass-strong {
  background: rgba(255, 255, 255, 0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  border: none;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.15);
  position: relative;
  overflow: hidden;
}
.liquid-glass-strong::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, 0) 60%,
    rgba(255, 255, 255, 0.2) 80%,
    rgba(255, 255, 255, 0.5) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.hero-title {
  font-family: 'Instrument Serif', serif;
  font-style: italic;
  font-size: clamp(96px, 18vw, 280px);
  line-height: 0.92;
  letter-spacing: -0.02em;
  color: white;
  text-align: center;
}
```

## Component (`src/App.tsx`)

### Imports & constants

```tsx
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const NAV_LINKS = ['Gallery', 'Styles', 'API', 'Pricing', 'Blog']
const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260511_080827_a9e5ad52-b6ee-4e79-b393-d936f179cfd7.mp4'
```

- **`NAV_LINKS`** = `['Gallery', 'Styles', 'API', 'Pricing', 'Blog']`.
- **`VIDEO_SRC`** = `'https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260511_080827_a9e5ad52-b6ee-4e79-b393-d936f179cfd7.mp4'`. The URL is case-sensitive — keep it exactly as shown.

Use `requestVideoFrameCallback` when available, with a `requestAnimationFrame` fallback.

### `LogoMark` — inline SVG

Width `44`, height `26`, `viewBox="0 0 44 26"`, `fill="none"`, `aria-hidden="true"`. Three white rects at `y="3"`, height `20`, `rx="3"`:

```tsx
function LogoMark() {
  return (
    <svg width="44" height="26" viewBox="0 0 44 26" fill="none" aria-hidden="true">
      <rect x="0" y="3" width="14" height="20" rx="3" fill="white" />
      <rect x="16" y="3" width="12" height="20" rx="3" fill="white" />
      <rect x="30" y="3" width="14" height="20" rx="3" fill="white" />
    </svg>
  )
}
```

### State & refs

- `mounted` — boolean, set `true` in a mount effect to drive the fade-in.
- `framesReady` — boolean state, flipped `true` once frame capture completes.
- `videoRef` — `useRef<HTMLVideoElement>(null)`.
- `videoBgRef` — `useRef<HTMLDivElement>(null)`.
- `displayCanvasRef` — `useRef<HTMLCanvasElement>(null)`.
- `framesRef` — `useRef<HTMLCanvasElement[]>([])`.

```tsx
const [mounted, setMounted] = useState(false)
const [framesReady, setFramesReady] = useState(false)
const videoRef = useRef<HTMLVideoElement>(null)
const videoBgRef = useRef<HTMLDivElement>(null)
const displayCanvasRef = useRef<HTMLCanvasElement>(null)
const framesRef = useRef<HTMLCanvasElement[]>([])
```

Mount effect:

```tsx
useEffect(() => {
  setMounted(true)
}, [])
```

### Effect 1 — Frame capture (boomerang setup)

On mount, grab `videoRef.current`; bail if absent. Play the video once and snapshot every frame into offscreen canvases. Use `requestVideoFrameCallback` when available, with a `requestAnimationFrame` fallback.

- Locals: `capturing = true`, `lastTime = -1`, `rafId = 0`, `vfcId = 0`, `MAX_WIDTH = 960`, `frames: HTMLCanvasElement[] = []`, and `supportsVFC = typeof video.requestVideoFrameCallback === 'function'`.
- **`captureFrame()`:** bail if `!capturing`. If `video.readyState < 2` or `video.currentTime === lastTime`, reschedule and return. Otherwise update `lastTime`, compute `scale = Math.min(1, MAX_WIDTH / video.videoWidth)`, derive rounded `w`/`h`, create an offscreen `<canvas>` at that size, `ctx.drawImage(video, 0, 0, w, h)`, and push the canvas into `frames`. Then reschedule.
- **`scheduleCapture()`:** if still capturing, use `video.requestVideoFrameCallback(captureFrame)` when supported, else `requestAnimationFrame(captureFrame)`.
- **`onLoaded()`:** `video.play().catch(() => {})` then `scheduleCapture()`.
- **`onEnded()`:** set `capturing = false`, store `framesRef.current = frames`, and `setFramesReady(true)`.
- Add `loadedmetadata` → `onLoaded` and `ended` → `onEnded` listeners. If `video.readyState >= 1`, invoke `onLoaded()` immediately.
- **Cleanup:** set `capturing = false`, remove both listeners, cancel any pending `rafId` / `vfcId`.

```tsx
useEffect(() => {
  const video = videoRef.current
  if (!video) return

  let capturing = true
  let lastTime = -1
  let rafId = 0
  let vfcId = 0
  const MAX_WIDTH = 960
  const frames: HTMLCanvasElement[] = []
  const supportsVFC = typeof video.requestVideoFrameCallback === 'function'

  const captureFrame = () => {
    if (!capturing) return
    if (video.readyState < 2 || video.currentTime === lastTime) {
      scheduleCapture()
      return
    }
    lastTime = video.currentTime
    const scale = Math.min(1, MAX_WIDTH / video.videoWidth)
    const w = Math.round(video.videoWidth * scale)
    const h = Math.round(video.videoHeight * scale)
    const frame = document.createElement('canvas')
    frame.width = w
    frame.height = h
    const ctx = frame.getContext('2d')
    if (ctx) {
      ctx.drawImage(video, 0, 0, w, h)
      frames.push(frame)
    }
    scheduleCapture()
  }

  const scheduleCapture = () => {
    if (!capturing) return
    if (supportsVFC) {
      vfcId = video.requestVideoFrameCallback!(captureFrame)
    } else {
      rafId = requestAnimationFrame(captureFrame)
    }
  }

  const onLoaded = () => {
    video.play().catch(() => {})
    scheduleCapture()
  }

  const onEnded = () => {
    capturing = false
    framesRef.current = frames
    setFramesReady(true)
  }

  video.addEventListener('loadedmetadata', onLoaded)
  video.addEventListener('ended', onEnded)
  if (video.readyState >= 1) onLoaded()

  return () => {
    capturing = false
    video.removeEventListener('loadedmetadata', onLoaded)
    video.removeEventListener('ended', onEnded)
    if (rafId) cancelAnimationFrame(rafId)
    if (vfcId && video.cancelVideoFrameCallback) video.cancelVideoFrameCallback(vfcId)
  }
}, [])
```

### Effect 2 — Boomerang render

Runs when `framesReady` is `true`. Ping-pong through the captured frames at ~30fps on the display canvas. Never touches `video.currentTime`.

- Grab `displayCanvasRef.current` and `framesRef.current`; bail if no canvas or `frames.length === 0`.
- Size the canvas from `frames[0]`: `canvas.width = frames[0].width`, `canvas.height = frames[0].height`.
- Locals: `index = 0`, `direction = 1`, `last = performance.now()`, `interval = 1000 / 30`, `rafId = 0`.
- In a `requestAnimationFrame(render)` loop: when `now - last >= interval`, update `last`, draw `frames[index]`, then `index += direction`. If `index >= frames.length - 1`, clamp to `frames.length - 1` and flip `direction = -1`; else if `index <= 0`, clamp to `0` and flip `direction = 1`.
- **Cleanup:** `cancelAnimationFrame(rafId)`.

```tsx
useEffect(() => {
  if (!framesReady) return
  const canvas = displayCanvasRef.current
  const frames = framesRef.current
  if (!canvas || frames.length === 0) return

  canvas.width = frames[0].width
  canvas.height = frames[0].height
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let index = 0
  let direction = 1
  let last = performance.now()
  const interval = 1000 / 30
  let rafId = 0

  const render = (now: number) => {
    if (now - last >= interval) {
      last = now
      ctx.drawImage(frames[index], 0, 0)
      index += direction
      if (index >= frames.length - 1) {
        index = frames.length - 1
        direction = -1
      } else if (index <= 0) {
        index = 0
        direction = 1
      }
    }
    rafId = requestAnimationFrame(render)
  }

  rafId = requestAnimationFrame(render)
  return () => cancelAnimationFrame(rafId)
}, [framesReady])
```

### Effect 3 — Parallax mouse tracking (GSAP)

Lerp toward the pointer and move the video background layer with GSAP.

- `strength = 20`. Track `targetX`/`targetY` and `currentX`/`currentY` (all start `0`), plus `rafId = 0`.
- **`onMouseMove(event)`:** with `cx = window.innerWidth / 2` and `cy = window.innerHeight / 2`, set `targetX = ((event.clientX - cx) / cx) * strength` and `targetY = ((event.clientY - cy) / cy) * strength`.
- **`tick()`:** each frame lerp `currentX += (targetX - currentX) * 0.06` (same for `currentY`), then `gsap.set(videoBgRef.current, { x: currentX, y: currentY })` when the ref exists; reschedule with `requestAnimationFrame(tick)`.
- Add a `window` `mousemove` listener and kick off the `tick` loop.
- **Cleanup:** remove the listener and `cancelAnimationFrame(rafId)`.

```tsx
useEffect(() => {
  const strength = 20
  let targetX = 0
  let targetY = 0
  let currentX = 0
  let currentY = 0
  let rafId = 0

  const onMouseMove = (event: MouseEvent) => {
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    targetX = ((event.clientX - cx) / cx) * strength
    targetY = ((event.clientY - cy) / cy) * strength
  }

  const tick = () => {
    currentX += (targetX - currentX) * 0.06
    currentY += (targetY - currentY) * 0.06
    if (videoBgRef.current) {
      gsap.set(videoBgRef.current, { x: currentX, y: currentY })
    }
    rafId = requestAnimationFrame(tick)
  }

  window.addEventListener('mousemove', onMouseMove)
  rafId = requestAnimationFrame(tick)

  return () => {
    window.removeEventListener('mousemove', onMouseMove)
    cancelAnimationFrame(rafId)
  }
}, [])
```

### Fade-in helper

```tsx
const fadeIn = mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
```

## Layout & JSX Structure

Root: `<div className="min-h-screen bg-black text-white font-body overflow-x-hidden">`.

### 1. Video background layer

`<div ref={videoBgRef} className="fixed top-0 left-0 w-full h-full z-0 scale-[1.08] origin-center">` containing:

- **`<video>`** with `src={VIDEO_SRC}`, `muted`, `playsInline`, `preload="auto"`, `crossOrigin="anonymous"`, `className="w-full h-full object-cover"`, and `style={{ display: framesReady ? 'none' : 'block' }}`.
- **`<canvas ref={displayCanvasRef}>`** with `className="w-full h-full object-cover"` and `style={{ display: framesReady ? 'block' : 'none' }}`.

### 2. Hero title

A fixed div, `left-0 right-0 z-20 w-full px-4`, with inline `style={{ top: '126px' }}`. It fades in via `transition-all duration-1000` plus the `fadeIn` classes (`opacity-100 translate-y-0` when mounted, else `opacity-0 translate-y-6`).

Inside: `<h1 className="hero-title select-none">MicroVisuals</h1>`.

### 3. Navbar

`<nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap">` wrapping a `liquid-glass flex items-center gap-6 rounded px-4 py-2.5` pill that contains:

- `<LogoMark />`.
- A `<div className="flex items-center gap-5">` mapping `NAV_LINKS` to `<a href="#">` links, each with `className="text-sm font-body font-light text-white/70 hover:text-white transition-colors duration-200"`.
- A right cluster `<div className="flex items-center gap-3 ml-4">`:
  - **"Sign in"** — an `<a href="#">` with the same link classes (`text-sm font-body font-light text-white/70 hover:text-white transition-colors duration-200`).
  - **"Try it free"** — a `<button type="button">` with `className="liquid-glass-strong text-sm font-body font-medium text-white rounded px-4 py-1.5 transition-all duration-200 hover:scale-[1.04] hover:shadow-[0_0_16px_2px_rgba(255,255,255,0.12)] active:scale-[0.97]"`.

### 4. Bottom row

A fixed div, `bottom-12 left-0 right-0 px-10 flex items-end justify-between z-20`, that fades in via `transition-all duration-1000 delay-300` plus the `fadeIn` classes.

- **Left `<p>`:** `className="text-sm font-body font-light text-white/75 max-w-[220px] leading-relaxed"`, text: "Forma's AI understands context, composition, and style like a creative director would." (the apostrophe is escaped as `&apos;` in JSX).
- **Center cluster:** `<div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex items-center gap-3">` with two buttons:
  - **Primary** `<button type="button">` with `className="group relative bg-white text-black text-sm font-body font-medium rounded px-6 py-3 overflow-hidden active:scale-[0.97] transition-all duration-200 shadow-[0_0_0_0_rgba(255,255,255,0)] hover:shadow-[0_0_24px_4px_rgba(255,255,255,0.25)] hover:scale-[1.03]"`. Contents:
    - `<span className="relative z-10">Start generating</span>`.
    - Overlay `<span className="absolute inset-0 bg-gradient-to-b from-white to-white/85 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />`.
  - **Secondary** `<button type="button">` with `className="liquid-glass group text-white text-sm font-body font-medium rounded px-6 py-3 active:scale-[0.97] transition-all duration-200 hover:scale-[1.03] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_20px_2px_rgba(255,255,255,0.07)]"`, label "See templates".
- **Right `<p>`:** same classes as the left paragraph plus `text-right` (`text-sm font-body font-light text-white/75 max-w-[220px] leading-relaxed text-right`), text: "Describe what you see in your head — get images that actually match."

## UI Copy (verbatim)

- Logo title / hero `<h1>`: `MicroVisuals`
- Nav links: `Gallery`, `Styles`, `API`, `Pricing`, `Blog`
- `Sign in`
- `Try it free`
- Left paragraph: `Forma's AI understands context, composition, and style like a creative director would.`
- `Start generating`
- `See templates`
- Right paragraph: `Describe what you see in your head — get images that actually match.`

## Color Palette

- **Page background:** `#000` / `bg-black`.
- **Text:** white, with muted variants `text-white/70` (nav links) and `text-white/75` (bottom paragraphs).
- **Primary button:** `bg-white text-black`.
- **Glass tints:** `rgba(255, 255, 255, 0.01)` fills with white gradient-masked borders ranging from `0.15`–`0.5` alpha; shadows use `rgba(255, 255, 255, …)` and `rgba(0, 0, 0, 0.05)`.

## Animation Summary

- **Fade-in:** mounted toggle drives `opacity-0 translate-y-6` → `opacity-100 translate-y-0` over `duration-1000`; the bottom row adds `delay-300`.
- **Boomerang playback:** ~30fps (`interval = 1000 / 30`) ping-pong over the captured `frames[]` array.
- **Parallax:** pointer-lerp at factor `0.06`, magnitude `strength = 20`, applied via `gsap.set` translate on the background layer (which is pre-scaled `scale-[1.08]`).
- **Hover micro-interactions:** scale (`1.03`/`1.04`) and glow shadows on buttons; `active:scale-[0.97]` press states; `transition-colors duration-200` on links.

## File Structure

- `index.html` — entry HTML that mounts `/src/main.tsx`.
- `src/main.tsx` — React entry that renders `<App />` and imports `index.css`.
- `src/App.tsx` — the hero component (constants, `LogoMark`, three effects, JSX).
- `src/index.css` — font imports, `@font-face`, Tailwind layers, body styles, `.liquid-glass`, `.liquid-glass-strong`, `.hero-title`.
- `src/vite-env.d.ts` — Vite type references.
- `tailwind.config.js`, `postcss.config.js`, `vite.config.ts`, `tsconfig.json` — tooling config.

## Notes

- The Tailwind default border radius is overridden to `9999px` (full pill), so every `rounded` in the markup produces pill corners.
- Do not use `video.currentTime` to reverse — the boomerang uses the captured `frames[]` array only.
- The video element stays mounted (hidden once `framesReady`) so the canvas keeps drawing snapshots.
