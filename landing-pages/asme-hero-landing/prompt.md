# Asme — Cinematic Dark Hero Landing Page

## Overview

Build a full-screen, dark, single-screen (100vh, no scroll) hero landing page for "Asme". The page has a black background with a fullscreen looping background video, a glassmorphism navbar, and a centered hero with an animated email-capture CTA. The headline uses an elegant serif display font, and most elements animate in on load with Motion.

## Tech Stack

- **Framework:** React 19 (`react` `^19.2.7`, `react-dom` `^19.2.7`) with Vite (`vite` `^8.0.16`) via `@vitejs/plugin-react` `^6.0.2`.
- **Styling:** Tailwind CSS v4 (`tailwindcss` `^4.3.0`) integrated through `@tailwindcss/vite` `^4.3.0` (the `@import "tailwindcss";` + `@theme` approach, no `tailwind.config.js`).
- **Animation:** Motion (Framer Motion) `motion` `^12.40.0`, imported from `motion/react` (`motion`, `AnimatePresence`).
- **Icons:** Lucide (`lucide-react` `^1.17.0`) — `Globe`, `ArrowRight`, `Check`.
- **Video:** HLS playback via HLS.js (`hls.js` `^1.6.16`), with native HLS fallback for Safari.
- **Fonts:** Inter (base sans-serif) and Instrument Serif (hero heading), loaded from Google Fonts.
- **Notable techniques:** glassmorphism with a masked gradient border, gradient-clipped text, typewriter placeholder effect, `AnimatePresence` state toggle between a button and an email form.

## Global Setup

### Entry HTML (`index.html`)

- `<html lang="en">`, `<meta charset="UTF-8" />`, `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`.
- `<title>`: `Asme — A new way to think and create with computers`
- `<meta name="description" content="Build a no-code AI app in minutes. Get early access to Asme." />`
- Favicon is an inline SVG data URI of a white globe icon:

  ```html
  <link
    rel="icon"
    href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20'/%3E%3Cpath d='M2 12h20'/%3E%3C/svg%3E"
  />
  ```

- Body contains `<div id="root"></div>` and `<script type="module" src="/src/main.jsx"></script>`.

### React entry (`src/main.jsx`)

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

### Styles (`src/index.css`)

Import order: both Google Fonts URLs first, then Tailwind, then theme/base rules.

- **Fonts (Google Fonts):**
  - Inter, weights 300, 400, 500, 600 — base sans-serif font.
  - Instrument Serif, regular and italic — used for the hero heading.

  ```css
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap");
  @import "tailwindcss";
  ```

- **Theme:**

  ```css
  @theme {
    --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  }
  ```

- **Root variables and body:**

  ```css
  :root {
    --background: #000000;
    --foreground: #ffffff;
  }

  body {
    background-color: var(--background);
    color: var(--foreground);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    letter-spacing: -0.01em;
  }
  ```

- **`.liquid-glass`** — glassmorphism surface with a masked gradient border via `::before`:

  ```css
  .liquid-glass {
    background: rgba(255, 255, 255, 0.01);
    background-blend-mode: luminosity;
    /* Prefixed first: keeps the standard property as the winning declaration
       after LightningCSS merges the pair during minification. */
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    border: none;
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
  }

  .liquid-glass::before {
    content: "";
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
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: exclude;
    pointer-events: none;
  }
  ```

- **`.glass-pill`** — pill-shaped glass surface (defined for completeness):

  ```css
  .glass-pill {
    background: rgba(255, 255, 255, 0.04);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    backdrop-filter: blur(16px) saturate(180%);
    border-radius: 9999px;
    box-shadow: none !important;
  }
  ```

## App Root Layout (`src/App.jsx`)

- `<main>` with classes `relative bg-black h-screen w-screen flex flex-col overflow-hidden selection:bg-white selection:text-black shrink-0`.
- Text selection is styled white background with black text (`selection:bg-white selection:text-black`).
- Render order: `BackgroundVideo`, `Navbar`, `Hero`.

```jsx
import BackgroundVideo from "./components/BackgroundVideo.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";

export default function App() {
  return (
    <main className="relative bg-black h-screen w-screen flex flex-col overflow-hidden selection:bg-white selection:text-black shrink-0">
      <BackgroundVideo />
      <Navbar />
      <Hero />
    </main>
  );
}
```

## Background Video (`src/components/BackgroundVideo.jsx`)

- Renders an absolutely positioned `<div>` covering the full parent: `absolute inset-0 overflow-hidden pointer-events-none`.
- Contains a `<video>` element with `autoPlay`, `muted`, `loop`, `playsInline`, classes `w-full h-full object-cover opacity-100`, and a `ref`.
- **Video source URL** (an HLS stream hosted on Mux — note: this is a Mux `.m3u8` stream, not a CloudFront URL): `https://stream.mux.com/kimF2ha9zLrX64H00UgLGPflCzNtl1T0215MlAmeOztv8.m3u8`
- **Playback logic with HLS.js:** in a `useEffect`, if the browser natively supports HLS (`video.canPlayType("application/vnd.apple.mpegurl")`), set `video.src` directly. Otherwise, if `Hls.isSupported()`, instantiate `new Hls()`, call `loadSource`, then `attachMedia`, and clean up with `hls.destroy()`. The `.m3u8` format requires HLS.js for non-Safari browsers.

```jsx
import { useEffect, useRef } from "react";
import Hls from "hls.js";

const VIDEO_SRC =
  "https://stream.mux.com/kimF2ha9zLrX64H00UgLGPflCzNtl1T0215MlAmeOztv8.m3u8";

export default function BackgroundVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = VIDEO_SRC;
      return undefined;
    }

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(VIDEO_SRC);
      hls.attachMedia(video);
      return () => hls.destroy();
    }

    return undefined;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover opacity-100"
      />
    </div>
  );
}
```

## Navbar (`src/components/Navbar.jsx`)

- Animates in with `motion.nav`: `initial={{ y: -20, opacity: 0 }}`, `animate={{ y: 0, opacity: 1 }}`.
- Outer `motion.nav` classes: `relative z-20 px-6 py-6 w-full`.
- Inner container: `liquid-glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto`.
- **Left side** (`flex items-center gap-8`):
  - **Logo:** `Globe` icon from Lucide (`w-6 h-6 text-white`) + the brand text "Asme" (`text-white font-semibold text-lg`), inside a `flex items-center gap-2` wrapper.
  - **Nav links:** "Features", "Pricing", "About" — defined as a `NAV_LINKS` array and mapped. Hidden on mobile (`hidden md:flex items-center gap-8 text-white/80 text-sm font-medium`). Each `<a>` uses `href={`#${link.toLowerCase()}`}` and classes `hover:text-white transition-colors duration-300`.
- **Right side** (`flex items-center gap-4`):
  - **"Sign Up"** plain text button: `text-white hover:text-white/80 transition-colors text-sm font-medium cursor-pointer`.
  - **"Login"** glassmorphism button: `liquid-glass rounded-full px-6 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity cursor-pointer`.

```jsx
import { motion } from "motion/react";
import { Globe } from "lucide-react";

const NAV_LINKS = ["Features", "Pricing", "About"];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative z-20 px-6 py-6 w-full"
    >
      <div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-white" />
            <span className="text-white font-semibold text-lg">Asme</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-white/80 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="hover:text-white transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="text-white hover:text-white/80 transition-colors text-sm font-medium cursor-pointer"
          >
            Sign Up
          </button>
          <button
            type="button"
            className="liquid-glass rounded-full px-6 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
```

## Hero (`src/components/Hero.jsx`)

### Layout

- `<section>` with `relative flex-1 flex flex-col items-center justify-center px-6`.
- Content wrapper: `relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center justify-center w-full gap-12`.

### Tagline (`motion.p`)

- Text: "Build a no-code AI app in minutes".
- Classes: `text-white/80 text-[10px] md:text-[11px] font-medium tracking-[0.2em] uppercase mb-4`.
- Animates: `initial={{ opacity: 0, y: 10 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ delay: 0.1 }}`.

### Heading (`motion.h1`)

- Text: "A new way to think and create with computers", with a `<br className="hidden md:block" />` inserted after "create" (i.e. `A new way to think and create{" "}` then the `<br />`, then `with computers`).
- Font set via inline style: `style={{ fontFamily: "'Instrument Serif', serif" }}`.
- Classes: `text-4xl md:text-[64px] font-medium tracking-[-0.01em] leading-[1.1] mb-6 bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent max-w-4xl`.
- Animates: `initial={{ opacity: 0, y: 20 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}`.

### CTA area (`motion.div`)

- Wrapper classes: `min-h-[50px] mt-2 w-full flex items-center justify-center`.
- Animates: `initial={{ opacity: 0, y: 10 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ delay: 0.4 }}`.
- Uses `AnimatePresence mode="wait"` to toggle between two states. Both states use `initial={{ opacity: 0, scale: 0.95 }}`, `animate={{ opacity: 1, scale: 1 }}`, `exit={{ opacity: 0, scale: 0.95 }}`, `transition={{ duration: 0.2 }}`.

- **Button state** (`motion.button`, `key="cta-button"`): text "Get early access". Classes `px-10 py-3 text-[14px] font-medium border border-white/10 rounded-full hover:border-white/30 hover:bg-white/[0.02] transition-all duration-300 text-white/90 backdrop-blur-sm cursor-pointer`. On click, calls `setShowForm(true)` to switch to the email form.

- **Email form state** (`motion.form`, `key="email-form"`): classes `flex items-center gap-2 pl-5 pr-1.5 py-1.5 text-[14px] font-medium border border-white/20 rounded-full bg-white/[0.02] backdrop-blur-sm w-full max-w-[320px] focus-within:border-white/40 transition-colors duration-300`. Contains:
  - An email `<input type="email">` with `flex-1 min-w-0 bg-transparent text-white placeholder-white/45 outline-none`, `autoFocus`, `readOnly={submitted}`, `aria-label="Email address"`, value bound to `email` state.
  - A submit `<button type="submit">` with classes `shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white bg-white/10 hover:bg-white/20 transition-colors duration-300 cursor-pointer` and `aria-label={submitted ? "Email submitted" : "Submit email"}`. It renders the `Check` icon (`w-4 h-4`) when submitted, otherwise the `ArrowRight` icon (`w-4 h-4`).

- **Typewriter placeholder:** when the email form opens, the placeholder text "Enter Your Email Here For Early Access" types in character by character at 60 ms intervals. After submission, it types "You Will Receive Notifications By Email" instead. Four seconds after submission, the UI resets back to the button state.

### "Play Video Demo" link (`motion.div`)

- Below the CTA, a `motion.div` fades in with `initial={{ opacity: 0 }}`, `animate={{ opacity: 1 }}`, `transition={{ delay: 0.8 }}`.
- Contains a `<button type="button">` with text "Play Video Demo" and classes `text-white/80 hover:text-white/40 transition-colors duration-300 text-[13px] font-medium tracking-wide cursor-pointer`.

### State and effects

- State: `showForm`, `submitted`, `email`, `placeholder`.
- Constants: `PLACEHOLDER_PROMPT = "Enter Your Email Here For Early Access"`, `PLACEHOLDER_CONFIRM = "You Will Receive Notifications By Email"`, `TYPE_INTERVAL_MS = 60`, `RESET_DELAY_MS = 4000`.
- `handleSubmit`: `event.preventDefault()`; if already submitted or `email` is empty (`!email.trim()`), return; otherwise `setSubmitted(true)` and clear the email.

```jsx
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

const PLACEHOLDER_PROMPT = "Enter Your Email Here For Early Access";
const PLACEHOLDER_CONFIRM = "You Will Receive Notifications By Email";
const TYPE_INTERVAL_MS = 60;
const RESET_DELAY_MS = 4000;

export default function Hero() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  // Typewriter effect for the input placeholder.
  useEffect(() => {
    if (!showForm) {
      setPlaceholder("");
      return undefined;
    }

    const target = submitted ? PLACEHOLDER_CONFIRM : PLACEHOLDER_PROMPT;
    setPlaceholder("");
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setPlaceholder(target.slice(0, index));
      if (index >= target.length) clearInterval(interval);
    }, TYPE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [showForm, submitted]);

  // After submission, return to the button state.
  useEffect(() => {
    if (!submitted) return undefined;

    const timeout = setTimeout(() => {
      setShowForm(false);
      setSubmitted(false);
      setEmail("");
    }, RESET_DELAY_MS);

    return () => clearTimeout(timeout);
  }, [submitted]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (submitted || !email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  // ...JSX as described above
}
```

## Color Palette

- **Background:** `#000000` (`--background`, also applied via `bg-black`).
- **Foreground / text:** `#ffffff` (`--foreground`).
- **Glass surfaces:** white at very low opacity — `rgba(255, 255, 255, 0.01)` (`.liquid-glass`), `rgba(255, 255, 255, 0.04)` (`.glass-pill`), `bg-white/[0.02]` (form/button fills), `bg-white/10` and `bg-white/20` (submit button).
- **Text opacities:** `text-white/90`, `text-white/80`, `text-white/70` (heading gradient stop), `text-white/40` (hover), `placeholder-white/45`.
- **Borders:** `border-white/10`, `border-white/20`, `border-white/30`, `border-white/40`.
- **Heading gradient:** `bg-gradient-to-b from-white via-white/95 to-white/70`, clipped to text.

## Animation Summary

- **Navbar:** slides down + fades in (`y: -20 → 0`, `opacity: 0 → 1`).
- **Tagline:** fade + rise (`y: 10 → 0`) with `delay: 0.1`.
- **Heading:** fade + rise (`y: 20 → 0`) with `duration: 1` and easing `[0.16, 1, 0.3, 1]`.
- **CTA area:** fade + rise (`y: 10 → 0`) with `delay: 0.4`; inner button/form crossfade + scale (`0.95 ↔ 1`) at `duration: 0.2` via `AnimatePresence mode="wait"`.
- **Play Video Demo:** fade in with `delay: 0.8`.
- **Typewriter:** placeholder types one character every 60 ms; auto-resets 4000 ms after submission.

## File Structure

```
asme-hero-landing/
├── index.html
├── package.json
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx
    └── components/
        ├── BackgroundVideo.jsx
        ├── Navbar.jsx
        └── Hero.jsx
```
