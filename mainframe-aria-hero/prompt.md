# Mainframe® — A.R.I.A Cinematic Hero

## Overview

Build a full-screen hero landing page for a creative agency called "Mainframe". The page layers a mouse-scrub-controlled background video behind a fixed navbar and a hero block that introduces an AI agent named A.R.I.A via a blurred intro label, a typewriter line, and a row of action pill buttons. Built with React, TypeScript, Vite, and Tailwind CSS.

## Tech Stack

- **Framework:** React 18 (`react` `^18.3.1`, `react-dom` `^18.3.1`) with `React.StrictMode`.
- **Build tool:** Vite (`vite` `^5.4.10`) with `@vitejs/plugin-react` (`^4.3.3`).
- **Language:** TypeScript (`typescript` `^5.6.3`), `@types/react` `^18.3.12`, `@types/react-dom` `^18.3.1`.
- **Styling:** Tailwind CSS (`tailwindcss` `^3.4.14`) with `postcss` `^8.4.49` and `autoprefixer` `^10.4.20`.
- **Fonts:** Helvetica Now Display — `HelveticaNowDisplay-Medium` (headings) and `HelveticaNowDisplayW01-Rg` (body), loaded from local `@font-face` stylesheets.
- **Available but unused:** `lucide-react` (`^0.460.0`) is a dependency but is not used in any component (the copy icon is an inline SVG).
- **Notable techniques:** serialized video seeking via the `seeked` event to avoid seek-flooding, a custom `useTypewriter` hook, and CSS-driven cursor blink / pill fade-in animations.

## Global Setup

### Dependencies

Only React, ReactDOM, Tailwind CSS, and Vite are used. No other UI libraries. `lucide-react` is installed but not used in this component.

`package.json` scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "verify": "node scripts/verify.mjs"
  }
}
```

### Config

- **`vite.config.ts`** — `defineConfig({ plugins: [react()] })`.
- **`postcss.config.js`** — plugins `tailwindcss: {}` and `autoprefixer: {}`.
- **`tailwind.config.js`** — `content: ['./index.html', './src/**/*.{ts,tsx}']`, empty `theme.extend` and `plugins`.

### Entry HTML

`index.html` sets `<title>Mainframe® — A.R.I.A</title>`, mounts `<div id="root">`, loads `/src/main.tsx` as a module, and links the two font stylesheets:

```html
<link rel="stylesheet" href="/fonts/HelveticaNowDisplay-Medium.css" />
<link rel="stylesheet" href="/fonts/HelveticaNowDisplayW01-Rg.css" />
```

### Entry script

`src/main.tsx` renders `<App />` inside `<React.StrictMode>` into `#root` using `ReactDOM.createRoot`.

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### App composition

`src/App.tsx` renders three components in order inside a fragment: `<BackgroundVideo />`, `<Navbar />`, `<Hero />`.

## Fonts

Two fonts are loaded via local stylesheet links in `index.html` (vendored under `public/fonts/`). The original external sources were:

- **Heading:** `https://db.onlinewebfonts.com/c/5ac3fe7c6abd2f62067f266d89671492?family=HelveticaNowDisplay-Medium`
- **Body:** `https://db.onlinewebfonts.com/c/1aa3377e489837a26d019bba501e779d?family=HelveticaNowDisplayW01-Rg`

> Note: the live project vendors these locally rather than fetching the onlinewebfonts URLs. The host part of those URLs is lowercased here per casing rules; the hashed path segments are kept verbatim.

The local `@font-face` definitions live in `public/fonts/HelveticaNowDisplay-Medium.css` and `public/fonts/HelveticaNowDisplayW01-Rg.css`:

```css
@font-face {
  font-family: "HelveticaNowDisplay-Medium";
  src: url("/fonts/5ac3fe7c6abd2f62067f266d89671492.woff2") format("woff2"),
       url("/fonts/5ac3fe7c6abd2f62067f266d89671492.woff") format("woff"),
       url("/fonts/5ac3fe7c6abd2f62067f266d89671492.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "HelveticaNowDisplayW01-Rg";
  src: url("/fonts/1aa3377e489837a26d019bba501e779d.woff2") format("woff2"),
       url("/fonts/1aa3377e489837a26d019bba501e779d.woff") format("woff"),
       url("/fonts/1aa3377e489837a26d019bba501e779d.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

In `src/index.css`, define CSS variables and a base `font-family`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-heading: 'HelveticaNowDisplay-Medium', 'Helvetica Neue', Arial, sans-serif;
  --font-body: 'HelveticaNowDisplayW01-Rg', 'Helvetica Neue', Arial, sans-serif;
}

body {
  font-family: var(--font-body);
}
```

The entire page uses `var(--font-body)` except the logo text, which uses `var(--font-heading)`.

## Background Video (Mouse-Scrub Controlled)

Component: `src/components/BackgroundVideo.tsx`.

- A full-screen `<video>` element styled with Tailwind `fixed inset-0 z-0 h-full w-full object-cover`, plus inline style `objectPosition: '70% center'`.
- **Video source:** `/assets/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4` (defined as `const VIDEO_SRC`).
  - > Note: this asset is vendored locally under `public/assets/`. The original source was the CloudFront URL `https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4`.
- The video is `muted`, `playsInline`, `preload="auto"`, plus `aria-hidden="true"` and `tabIndex={-1}`. It does **not** autoplay.
- The video scrubs forward/backward based on horizontal mouse movement.

### Scrub behavior

Use a `mousemove` event listener on `window`. Track `prevX`, compute `delta = currentX - prevX`, and convert it to a time offset:

```
offset = (delta / window.innerWidth) * SENSITIVITY * video.duration
```

where `const SENSITIVITY = 0.8`. Clamp `targetTime` between `0` and `video.duration`. Use `video.currentTime` to seek, and a `seeked` event handler to queue the next seek if `targetTime` has moved — preventing seek-flooding while a seek is in flight.

```tsx
import { useEffect, useRef } from 'react';

const VIDEO_SRC =
  '/assets/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4';

const SENSITIVITY = 0.8;

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let prevX: number | null = null;
    let targetTime = 0;
    let seeking = false;

    const seekTo = (time: number) => {
      seeking = true;
      video.currentTime = time;
    };

    const handleSeeked = () => {
      seeking = false;
      if (Math.abs(targetTime - video.currentTime) > 0.01) {
        seekTo(targetTime);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (prevX === null) {
        prevX = event.clientX;
        return;
      }
      const delta = event.clientX - prevX;
      prevX = event.clientX;

      const { duration } = video;
      if (!Number.isFinite(duration) || duration <= 0) return;

      const offset = (delta / window.innerWidth) * SENSITIVITY * duration;
      targetTime = Math.min(Math.max(targetTime + offset, 0), duration);
      if (!seeking) seekTo(targetTime);
    };

    video.addEventListener('seeked', handleSeeked);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      video.removeEventListener('seeked', handleSeeked);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={VIDEO_SRC}
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      className="fixed inset-0 z-0 h-full w-full object-cover"
      style={{ objectPosition: '70% center' }}
    />
  );
}
```

## Navbar (Fixed, z-index 10)

Component: `src/components/Navbar.tsx`. Holds `menuOpen` state for the mobile menu; `closeMenu` sets it to `false`.

- **Header:** fixed to top, full width. Classes: `fixed left-0 top-0 z-10 flex w-full items-center justify-between px-5 py-4 sm:px-8 sm:py-5`.
- **Logo (left):** an anchor with `flex items-center gap-3 text-black`.
  - Text "Mainframe®" (using the registered-trademark symbol) at `text-[21px] tracking-tight sm:text-[26px]`, inline style `fontFamily: 'var(--font-heading)'`.
  - Beside it, a decorative asterisk character `✳︎` at `text-[25px] sm:text-[30px]`, `select-none`, `aria-hidden="true"`, inline style `letterSpacing: '-0.02em'`.
- **Desktop nav links (center, hidden below `md`):** `<nav>` with `hidden text-[23px] text-black md:flex` and `aria-label="Primary"`. Links come from `const NAV_LINKS = ['Labs', 'Studio', 'Openings', 'Shop']`, each wrapped in a `<span className="whitespace-pre">`. Each link `<a>` has `transition-opacity hover:opacity-60`. A `, ` separator is rendered after every link except the last (`index < NAV_LINKS.length - 1 && ', '`).
- **Desktop CTA (right, hidden below `md`):** an anchor "Get in touch" with `hidden text-[23px] text-black underline underline-offset-2 transition-opacity hover:opacity-60 md:inline-block`.
- **Mobile hamburger (visible below `md`):** a button with `flex flex-col gap-[5px] md:hidden`, `aria-expanded={menuOpen}`, and `aria-label` toggling between `'Close menu'` and `'Open menu'`. It contains 3 bars, each `h-[2px] w-6 bg-black transition-all duration-300`:
  - Top bar — when open adds `translate-y-[7px] rotate-45`.
  - Middle bar — when open adds `opacity-0`.
  - Bottom bar — when open adds `-translate-y-[7px] -rotate-45`.
- **Mobile overlay (z-index 9):** a `<div>` with `fixed inset-0 z-[9] flex flex-col items-start justify-center gap-8 bg-white/95 px-8 backdrop-blur-sm transition-opacity duration-300 md:hidden`. When open it is `opacity-100`; when closed it is `pointer-events-none opacity-0`. It lists the same `NAV_LINKS` plus "Get in touch", each an anchor at `text-[32px] font-medium text-black` (the "Get in touch" link additionally `underline`), each calling `closeMenu` on click.

## Hero Section (z-index 1)

Component: `src/components/Hero.tsx`.

- **Section:** `relative z-[1] flex h-screen flex-col justify-end overflow-hidden px-5 pb-12 sm:px-8 md:justify-center md:px-10 md:pb-0`. (On mobile: `justify-end` with `pb-12`; on `md:`: `justify-center` with `pb-0`. Horizontal padding `px-5 sm:px-8 md:px-10`.)
- **Content container:** `relative z-10 max-w-xl`.

### Constants

```tsx
const TYPED_TEXT =
  'Glad you stopped in. Good taste tends to find us. Now, what are we building?';
const EMAIL = 'hello@mainframe.co';
const PILL_ACTIONS = [
  'Pitch us an idea',
  'Come work here',
  'Send a brief hello',
  'See how we operate',
];
```

State: `const { displayed, done } = useTypewriter(TYPED_TEXT)` and `const [pillsVisible, setPillsVisible] = useState(false)`.

### 1. Blurred Intro Label

- A `<p>` with classes `pointer-events-none mb-5 select-none sm:mb-6`.
- Inline style: `fontSize: 'clamp(18px, 4vw, 26px)'`, `lineHeight: 1.3`, `fontWeight: 400`, `color: '#000'`, `filter: 'blur(4px)'`.
- Two lines of text separated by a `<br />`:
  - Line 1: "Hey there, meet A.R.I.A,"
  - Line 2: "Mainframe's Adaptive Response Interface Agent" (rendered as `Mainframe&apos;s Adaptive Response Interface Agent`).

### 2. Typewriter Text

- Text: `"Glad you stopped in. Good taste tends to find us. Now, what are we building?"`.
- Rendered in a `<p>` with classes `mb-5 min-h-[54px] text-black sm:mb-6` and inline style `fontSize: 'clamp(18px, 4vw, 26px)'`, `lineHeight: 1.35`, `fontWeight: 400`.
- While typing (`!done`), show a blinking cursor `<span>` with `aria-hidden="true"` and classes `cursor-blink ml-[2px] inline-block h-[1.1em] w-[2px] bg-black align-middle`. The cursor disappears when `done` is `true`.

The cursor blink is a CSS animation defined in `src/index.css`:

```css
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.cursor-blink {
  animation: blink 1s step-end infinite;
}
```

#### `useTypewriter` hook

File: `src/hooks/useTypewriter.ts`. Takes `text`, `speed` (default `38` ms per character), and `startDelay` (default `600` ms). On mount it resets state, then after `startDelay` starts an interval that reveals one more character every `speed` ms via `text.slice(0, count)` until the full text is displayed, at which point it clears the interval and sets `done`. Returns `{ displayed, done }`. Cleans up the timeout and interval on unmount/dependency change.

```ts
import { useEffect, useState } from 'react';

export function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);

    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      let count = 0;
      interval = window.setInterval(() => {
        count += 1;
        setDisplayed(text.slice(0, count));
        if (count >= text.length) {
          window.clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
```

### 3. Action Pill Buttons

- The pill container appears with a fade-in + slide-up animation. The pills become visible 400 ms after page load, independent of the typewriter (they do **not** wait for typing to finish):

  ```tsx
  useEffect(() => {
    const timeout = window.setTimeout(() => setPillsVisible(true), 400);
    return () => window.clearTimeout(timeout);
  }, []);
  ```

- **Container:** `flex flex-wrap gap-y-1`, with inline style:
  - `opacity: pillsVisible ? 1 : 0`
  - `transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)'`
  - `transition: 'opacity 0.4s ease, transform 0.4s ease'`

- **4 white pill buttons** (mapped from `PILL_ACTIONS`): "Pitch us an idea", "Come work here", "Send a brief hello", "See how we operate". Each is a `<button type="button">` with classes:

  ```
  mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center whitespace-nowrap rounded-full border border-black/10 bg-white px-4 py-[0.3em] text-[13px] text-black transition-colors duration-200 hover:bg-black hover:text-white sm:px-5 sm:text-[15px]
  ```

- **1 outline pill button:** a `<button type="button">` with `onClick={copyEmail}` and `aria-label={`Copy ${EMAIL} to clipboard`}`. Classes:

  ```
  mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white bg-transparent px-4 py-[0.3em] text-[13px] text-white transition-colors duration-200 hover:bg-white hover:text-black sm:gap-3 sm:px-5 sm:text-[15px]
  ```

  - Contents: a `<span>` reading `Reach us: ` followed by the email in a nested `<span className="underline underline-offset-1">` (the email is `hello@mainframe.co`).
  - Then a 12×12 inline copy SVG icon of two overlapping rectangles:

    ```tsx
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <rect x="3.9" y="3.9" width="7.4" height="7.4" rx="1" />
      <rect x="0.7" y="0.7" width="7.4" height="7.4" rx="1" />
    </svg>
    ```

  - On click, `copyEmail` copies `hello@mainframe.co` to the clipboard via `navigator.clipboard.writeText(EMAIL)`, catching and ignoring errors (clipboard unavailable due to permissions / insecure context).

## Color Palette

- **Black:** `#000` / Tailwind `text-black`, `bg-black`, `border-black/10` — primary text, logo, asterisk, hamburger bars, cursor, white-pill hover background.
- **White:** Tailwind `bg-white`, `text-white`, `border-white`, `bg-white/95` — pill backgrounds, outline-pill text/border, mobile overlay background.

## File Structure

```
mainframe-aria-hero/
├─ index.html
├─ package.json
├─ vite.config.ts
├─ postcss.config.js
├─ tailwind.config.js
├─ tsconfig.json
├─ public/
│  ├─ assets/
│  │  └─ hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4
│  └─ fonts/
│     ├─ HelveticaNowDisplay-Medium.css
│     ├─ HelveticaNowDisplayW01-Rg.css
│     ├─ 5ac3fe7c6abd2f62067f266d89671492.{woff2,woff,ttf}
│     └─ 1aa3377e489837a26d019bba501e779d.{woff2,woff,ttf}
└─ src/
   ├─ main.tsx
   ├─ App.tsx
   ├─ index.css
   ├─ components/
   │  ├─ BackgroundVideo.tsx
   │  ├─ Hero.tsx
   │  └─ Navbar.tsx
   └─ hooks/
      └─ useTypewriter.ts
```
