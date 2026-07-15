# Mainframe — Cinematic Hero Landing Page

## Overview

Build a full-screen hero landing page for a creative agency called "Mainframe". The page features a fixed background video that scrubs forward and backward in response to horizontal mouse movement, an AI-assistant-themed hero with a blurred intro label and a typewriter headline, and a row of pill-shaped action buttons. It is built with React, TypeScript, Vite, and Tailwind CSS v3.

## Tech Stack

- **Framework:** React 19 (`react` and `react-dom` `^19.2.6`) with TypeScript (`typescript` `~6.0.2`)
- **Build tool:** Vite (`vite` `^8.0.12`) with `@vitejs/plugin-react` (`^6.0.1`), scaffolded via `npm create vite@latest` using the react-ts template
- **Styling:** Tailwind CSS v3 (`tailwindcss` `^3.4.19`) with `postcss` (`^8.5.15`) and `autoprefixer` (`^10.5.0`)
- **Fonts:** HelveticaNowDisplay-Medium (headings/logo) and HelveticaNowDisplayW01-Rg (body), vendored locally and loaded via `@font-face` CSS files
- **No other UI libraries.** Only React, ReactDOM, Tailwind CSS, and Vite are used.
- **Notable techniques:** mouse-scrub video seeking with anti-flooding via the `seeked` event, a custom `useTypewriter` hook, CSS-keyframe blinking cursor, and clipboard copy via `navigator.clipboard.writeText()`.

## Global Setup

### Fonts

The two fonts are vendored locally. Two stylesheet files live under `public/fonts/` and are loaded from `index.html` via `<link rel="stylesheet">` tags pointing at `/fonts/HelveticaNowDisplay-Medium.css` and `/fonts/HelveticaNowDisplayW01-Rg.css`.

Each CSS file defines an `@font-face` rule that points at locally vendored `.woff2`, `.woff`, and `.ttf` files (also under `public/fonts/`).

`public/fonts/HelveticaNowDisplay-Medium.css`:

```css
@font-face{
    font-family: "HelveticaNowDisplay-Medium";
    src: url("/fonts/5ac3fe7c6abd2f62067f266d89671492.woff2")format("woff2"),
        url("/fonts/5ac3fe7c6abd2f62067f266d89671492.woff")format("woff"),
        url("/fonts/5ac3fe7c6abd2f62067f266d89671492.ttf")format("truetype");
    font-weight:normal;
    font-style:normal;
    font-display:swap;
}
```

`public/fonts/HelveticaNowDisplayW01-Rg.css`:

```css
@font-face{
    font-family: "HelveticaNowDisplayW01-Rg";
    src: url("/fonts/1aa3377e489837a26d019bba501e779d.woff2")format("woff2"),
        url("/fonts/1aa3377e489837a26d019bba501e779d.woff")format("woff"),
        url("/fonts/1aa3377e489837a26d019bba501e779d.ttf")format("truetype");
    font-weight:normal;
    font-style:normal;
    font-display:swap;
}
```

> Note: The underlying font assets originate from `db.onlinewebfonts.com` (the hashes `5ac3fe7c6abd2f62067f266d89671492` → `HelveticaNowDisplay-Medium` and `1aa3377e489837a26d019bba501e779d` → `HelveticaNowDisplayW01-Rg` match the original source URLs), but they are served locally in this project rather than fetched from a CDN.

In `src/index.css`, define CSS variables for the fonts and set the body font:

```css
:root {
  --font-heading: 'HelveticaNowDisplay-Medium', 'Helvetica Neue', Arial, sans-serif;
  --font-body: 'HelveticaNowDisplayW01-Rg', 'Helvetica Neue', Arial, sans-serif;
}
body {
  font-family: var(--font-body);
}
```

The entire page uses `var(--font-body)` except the logo text, which uses `var(--font-heading)`.

### `src/index.css`

In addition to the font variables above, this file:

- Imports Tailwind layers at the top:

  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

- Adds base/reset styles on `body`: `margin: 0; padding: 0; overflow-x: hidden;` (in addition to `font-family: var(--font-body);`).
- Defines the `blink` keyframe animation and a `.cursor-blink` helper class for the typewriter cursor:

  ```css
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .cursor-blink {
    animation: blink 1s step-end infinite;
  }
  ```

### `index.html`

- Standard Vite React HTML boilerplate.
- `<title>Mainframe</title>`.
- Load the two font stylesheets via `<link rel="stylesheet">` tags before the title:

  ```html
  <link rel="stylesheet" href="/fonts/HelveticaNowDisplay-Medium.css" />
  <link rel="stylesheet" href="/fonts/HelveticaNowDisplayW01-Rg.css" />
  ```

- Mounts the React app at `<div id="root"></div>` with `<script type="module" src="/src/main.tsx"></script>`.

## Background Video (Mouse-Scrub Controlled)

- A full-screen `<video>` element is `position: fixed; inset: 0; z-index: 0; object-fit: cover; object-position: 70% center;`. In Tailwind terms it is `fixed inset-0 z-0 w-full h-full object-cover` with an inline style of `objectPosition: '70% center'`.
- **Video source URL:** `/assets/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4` (vendored locally under `public/assets/`).

  > Note: The original source for this asset was `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4`, but it is served locally in this project.

- The video is `muted`, `playsInline`, `preload="auto"`. It does **not** autoplay.
- The video scrubs forward/backward based on horizontal mouse movement. Use a `mousemove` event listener on `window`. Track `prevX`, compute `delta = currentX - prevX`, and convert it to a time offset:

  ```ts
  const offset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
  ```

  where `SENSITIVITY = 0.8`. Clamp the resulting `targetTime` between `0` and `video.duration`. Use `video.currentTime` to seek, and a `seeked` event handler to queue the next seek if `targetTime` has moved, preventing seek-flooding.

The exact effect logic from `src/components/Hero.tsx`:

```tsx
const VIDEO_URL =
  '/assets/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4';

const SENSITIVITY = 0.8;

// inside the component:
const videoRef = useRef<HTMLVideoElement>(null);
const prevXRef = useRef<number | null>(null);
const targetTimeRef = useRef(0);
const seekingRef = useRef(false);

useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  const handleSeeked = () => {
    seekingRef.current = false;
    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.01) {
      seekingRef.current = true;
      video.currentTime = targetTimeRef.current;
    }
  };

  video.addEventListener('seeked', handleSeeked);

  const handleMouseMove = (e: MouseEvent) => {
    if (!video || !video.duration) return;

    const currentX = e.clientX;
    if (prevXRef.current === null) {
      prevXRef.current = currentX;
      return;
    }

    const delta = currentX - prevXRef.current;
    prevXRef.current = currentX;

    const offset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
    const newTime = Math.max(0, Math.min(video.duration, targetTimeRef.current + offset));
    targetTimeRef.current = newTime;

    if (!seekingRef.current) {
      seekingRef.current = true;
      video.currentTime = newTime;
    }
  };

  window.addEventListener('mousemove', handleMouseMove);
  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    video.removeEventListener('seeked', handleSeeked);
  };
}, []);
```

## Navbar (Fixed, z-index 10)

Fixed to top, full width: `fixed top-0 left-0 right-0 z-10`. Padding: `px-5 sm:px-8 py-4 sm:py-5`. Flex row, `justify-between`, `items-center`.

Nav links are defined once as an array: `['LABS', 'STUDIO', 'OPENINGS', 'SHOP']`.

### Logo (Left)

- Flex row with `gap-3`.
- Text **"MAINFRAME®"** (use the registered trademark symbol) at `text-[21px] sm:text-[26px]`, `tracking-tight`, black, using `style={{ fontFamily: 'var(--font-heading)' }}`.
- Beside it, a decorative asterisk character **`✳︎`** at `text-[25px] sm:text-[30px]`, black, `select-none`, with inline style `letterSpacing: '-0.02em'` and `aria-hidden="true"`.

### Desktop Nav Links (Center, hidden below md)

- `hidden md:flex flex-row items-center text-[23px] text-black`.
- Links: "LABS", "STUDIO", "OPENINGS", "SHOP", separated by commas rendered as `, ` (each non-final link is followed by a `<span className="mr-1">,</span>`).
- Each link is an `<a href="#">` with `hover:opacity-60 transition-opacity`.

### Desktop CTA (Right, hidden below md)

- An anchor **"GET IN TOUCH"** with classes `hidden md:block text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity`.

### Mobile Hamburger (visible below md)

- A `<button>` with `md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8`, `aria-label="Toggle menu"`, toggling a `menuOpen` state.
- 3 horizontal bars, each `w-6 h-[2px] bg-black block transition-all duration-300`.
- On toggle:
  - Top bar (`origin-center`): `transform: 'rotate(45deg) translateY(7px)'` when open, else `'none'`.
  - Middle bar: `opacity: 0` when open, else `1`.
  - Bottom bar (`origin-center`): `transform: 'rotate(-45deg) translateY(-7px)'` when open, else `'none'`.
- All transitions use `duration-300`.

### Mobile Overlay (z-index 9)

- `md:hidden fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm flex flex-col justify-center items-start px-8 gap-8 transition-all duration-300`.
- Inline style toggles visibility: `opacity: menuOpen ? 1 : 0` and `pointerEvents: menuOpen ? 'auto' : 'none'`.
- The same links at `text-[32px] font-medium text-black hover:opacity-60 transition-opacity`, each closing the menu on click (`onClick={() => setMenuOpen(false)}`).
- Plus a **"GET IN TOUCH"** anchor at `text-[32px] font-medium text-black underline underline-offset-2 hover:opacity-60 transition-opacity`, also closing the menu on click.
- Hidden on md+.

## Hero Section (z-index 1)

- Full `h-screen`, flex column. On mobile: `justify-end pb-12`. On `md:`: `md:justify-center md:pb-0`. Horizontal padding: `px-5 sm:px-8 md:px-10`. `overflow-hidden`. Wrapper classes: `relative z-[1] h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden`.
- Content container: `max-w-xl relative z-10`.

### 1. Blurred Intro Label

- Classes: `mb-5 sm:mb-6 pointer-events-none select-none`.
- Inline style: `fontSize: 'clamp(18px, 4vw, 26px)'`, `lineHeight: 1.3`, `fontWeight: 400`, `color: '#000'`, `filter: 'blur(4px)'`.
- Two lines of text separated by a `<br />`:
  - Line 1: `Hey there, meet A.R.I.A,`
  - Line 2: `Mainframe's Adaptive Response Interface Agent`

### 2. Typewriter Text

- Headline text: `"Glad you stopped in. Good taste tends to find us. Now, what are we building?"`
- Driven by a custom `useTypewriter` hook (see File Structure). The hook takes `text`, `speed` (default 38ms per character), and `startDelay` (default 600ms). After the delay, an interval reveals one character at a time. It returns `{ displayed, done }`.
- In the hero, it is invoked as:

  ```tsx
  const { displayed, done } = useTypewriter({
    text: "Glad you stopped in. Good taste tends to find us. Now, what are we building?",
    speed: 38,
    startDelay: 600,
  });
  ```

- Rendered in a `<p>` tag with classes `text-black mb-5 sm:mb-6` and inline style `fontSize: 'clamp(18px, 4vw, 26px)'`, `lineHeight: 1.35`, `fontWeight: 400`, `minHeight: '54px'`.
- While typing (`!done`), show a blinking cursor: a `<span>` with classes `inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] cursor-blink`. The `cursor-blink` class applies `animation: blink 1s step-end infinite` (`opacity: 1` at 0%/100%, `0` at 50%). The cursor disappears when `done` is `true`.

### 3. Action Pill Buttons

- The whole pill group appears with a fade-in + slide-up animation, applied via inline style on the container: `opacity` `0 → 1`, `transform: translateY(8px) → translateY(0)`, with `transition: 'opacity 0.4s ease, transform 0.4s ease'`. They become visible 400ms after page load, independent of the typewriter animation (do not wait for typing to finish):

  ```tsx
  const [pillsVisible, setPillsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPillsVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);
  ```

- Container: `flex flex-wrap gap-y-1` with the inline transition style above.
- **4 white pill buttons.** Labels: `Pitch us an idea`, `Come work here`, `Send a brief hello`, `See how we operate`. Each button:
  - Classes: `inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 mx-[0.2em] mb-[0.4em] hover:bg-black hover:text-white transition-colors duration-200 whitespace-nowrap`.
  - Inline style for vertical padding: `paddingTop: '0.3em', paddingBottom: '0.3em'`.
- **1 outline pill button (email).** Content: `Reach us: ` followed by `hello@mainframe.co` (the email wrapped in `<span className="underline underline-offset-1">`), then a small 12×12 copy icon (inline SVG of two overlapping rectangles).
  - Classes: `inline-flex items-center justify-center gap-2 sm:gap-3 text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 mx-[0.2em] mb-[0.4em] hover:bg-white hover:text-black transition-colors duration-200 whitespace-nowrap`.
  - Inline style for vertical padding: `paddingTop: '0.3em', paddingBottom: '0.3em'`.
  - `gap-2 sm:gap-3` separates the text from the icon.
  - On click, copies `hello@mainframe.co` to clipboard via `navigator.clipboard.writeText('hello@mainframe.co')`.
  - Copy icon SVG:

    ```tsx
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="3" y="0" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <rect x="0" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
    ```

## Animations Summary

- **Typewriter:** one character revealed every 38ms after a 600ms start delay.
- **Cursor blink:** `blink 1s step-end infinite` (opacity 1 → 0 → 1).
- **Pill group entrance:** opacity and translateY transition over `0.4s ease`, triggered 400ms after load.
- **Hamburger morph:** bars rotate/translate/fade over `duration-300`.
- **Mobile overlay:** opacity and pointer-events transition over `duration-300`.
- **Video scrub:** seek-driven, throttled by the `seeked` event with a `0.01` second deadband.

## Color Palette

- Black text and UI: `text-black`, `bg-black`, `#000`.
- White surfaces and pills: `bg-white`, `text-white`, `border-white`.
- Subtle borders: `border-black/10`.
- Mobile overlay scrim: `bg-white/95` with `backdrop-blur-sm`.

## File Structure

The project is scaffolded with `npm create vite@latest` using the react-ts template, with Tailwind CSS v3.

- **`index.html`** — loads the two local font stylesheets via `<link rel="stylesheet">`; standard Vite React HTML boilerplate; `<title>Mainframe</title>`.
- **`src/main.tsx`** — standard Vite entry: imports `./index.css`, renders `<App />` inside `<StrictMode>` via `createRoot(document.getElementById('root')!)`.
- **`src/index.css`** — Tailwind layers, the font CSS variables, base/reset styles, and the `blink` keyframe + `.cursor-blink` class.
- **`src/hooks/useTypewriter.ts`** — the custom typewriter hook.
- **`src/components/Navbar.tsx`** — navbar with mobile hamburger and overlay.
- **`src/components/Hero.tsx`** — hero section with video scrub, blurred label, typewriter, and pill buttons.
- **`src/App.tsx`** — composes `<Navbar />` + `<Hero />`.
- **`public/fonts/`** — the two `@font-face` CSS files plus their `.woff2`/`.woff`/`.ttf` assets.
- **`public/assets/`** — the background video MP4.
- **`tailwind.config.js`** and **`postcss.config.js`** — standard Tailwind v3 config.

### `src/App.tsx`

```tsx
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
}

export default App;
```

### `src/hooks/useTypewriter.ts`

```ts
import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  startDelay?: number;
}

interface UseTypewriterReturn {
  displayed: string;
  done: boolean;
}

export function useTypewriter({
  text,
  speed = 38,
  startDelay = 600,
}: UseTypewriterOptions): UseTypewriterReturn {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);

    const delayTimer = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(delayTimer);
  }, [text, speed, startDelay]);

  return { displayed, done };
}
```

## Dependencies

Only React, ReactDOM, Tailwind CSS, and Vite. No other UI libraries.

## Build

The final result should be a clean build with `npm run build` passing (the build script is `tsc -b && vite build`).
