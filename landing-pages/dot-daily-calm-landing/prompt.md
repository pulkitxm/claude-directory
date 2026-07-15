# dot. — Daily Calm Landing Page

## Overview

Build a single-screen marketing landing page for "dot.", a calm-messaging product that links you with one anonymous peer for a single message each day. The hero is a full-screen looping background video of a phone, with an animated headline and a typewriter effect that types and deletes short messages positioned to sit on the phone's screen.

## Tech Stack

- **Framework:** React 19 (`react` `^19.0.0`, `react-dom` `^19.0.0`) with TypeScript (`typescript` `~5.8.0`)
- **Build tool:** Vite (`vite` `^6.0.0`) with `@vitejs/plugin-react` (`^4.3.4`)
- **Styling:** Tailwind CSS v4 (`tailwindcss` `^4.0.0`) via `@tailwindcss/vite` (`^4.0.0`)
- **Animation:** Motion (`motion` `^12.0.0`), imported as `motion/react`
- **Fonts:** Instrument Serif and Inter (Google Fonts); "Nokia Cellphone FC Small" (self-hosted custom font for the on-screen typing effect)
- **Notable techniques:** HTML5 `<video>` background, a typewriter (type/delete) effect driven by `useState` + `setTimeout` in `useEffect`, and a blinking cursor via Motion

## Global Setup

### Fonts in `index.html`

Add the Google Fonts for Instrument Serif and Inter in `index.html`, with preconnect hints:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@100..900&display=swap"
  rel="stylesheet"
/>
```

- **Instrument Serif:** upright and italic (`ital@0;1`).
- **Inter:** full weight range (`wght@100..900`).

Set the document `<title>` to `dot. — Short notes. Daily calm.` and a meta description of `Linked with a single anonymous peer. One message every day. A quiet rhythm in the digital noise.`

### Custom Nokia font (self-hosted)

The on-screen typing text uses the "Nokia Cellphone FC Small" font. It is self-hosted under `public/fonts/`. Import the font stylesheet at the top of `src/index.css`:

```css
@import url('/fonts/nokia-cellphone-fc-small.css');
```

That stylesheet declares the `@font-face` (sourced from the `440b53b1a1c65037f944ff19259d8014` files in `public/fonts/` — `.eot`, `.woff`, `.woff2`, `.ttf`, `.svg`):

```css
@font-face {
  font-family: "Nokia Cellphone FC Small";
  src: url("/fonts/440b53b1a1c65037f944ff19259d8014.eot");
  src: url("/fonts/440b53b1a1c65037f944ff19259d8014.eot?#iefix") format("embedded-opentype"),
    url("/fonts/440b53b1a1c65037f944ff19259d8014.woff") format("woff"),
    url("/fonts/440b53b1a1c65037f944ff19259d8014.woff2") format("woff2"),
    url("/fonts/440b53b1a1c65037f944ff19259d8014.ttf") format("truetype"),
    url("/fonts/440b53b1a1c65037f944ff19259d8014.svg#Nokia Cellphone FC Small") format("svg");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

> Note: this font was originally sourced from `https://db.onlinewebfonts.com/c/440b53b1a1c65037f944ff19259d8014?family=Nokia+Cellphone+FC+Small` (Web Fonts, licensed CC BY 4.0) and has since been vendored locally.

### Tailwind theme and root styles (`src/index.css`)

After importing the Nokia font CSS, import Tailwind and configure the theme variables:

```css
@import url('/fonts/nokia-cellphone-fc-small.css');
@import "tailwindcss";

@theme {
  --font-instrument: "Instrument Serif", serif;
  --font-serif: "Instrument Serif", serif;
  --font-sans: "Inter", sans-serif;
  --font-nokia: "Nokia Cellphone FC Small", monospace;
}

@utility font-instrument {
  font-family: "Instrument Serif", serif;
}

:root {
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
```

- Define the `font-instrument` utility so `font-instrument` is usable as a class.
- The root font family is `var(--font-sans)` (Inter), with anti-aliasing applied.

### Entry point (`src/main.tsx`)

Standard React 19 entry: import `./index.css`, mount `App` into `#root` with `createRoot` inside `<StrictMode>`.

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

## Component Structure

Create one main `src/App.tsx` file containing four components: `TypingMessages`, `Navbar`, `Hero`, and the default-exported `App`. `App` renders a `<main>` wrapping `<Navbar />` and `<Hero />`.

### Shared constants (top of `App.tsx`)

```tsx
import { useEffect, useState } from "react";
import { motion } from "motion/react";

const MESSAGES = ["Are you here?", "Yes, I am.", "Speak soon."];
const TYPING_SPEED = 100;
const DELETING_SPEED = 50;
const PAUSE_BEFORE_DELETE = 2000;

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const VIDEO_SRC =
  "/assets/hf_20260427_054418_a6d194f0-ac86-4df9-abe5-ded73e596d7c.mp4";

const NAV_LINKS = ["Philosophy", "Trust", "Access", "Tribe"];
```

> Note: the video lives at `public/assets/hf_20260427_054418_a6d194f0-ac86-4df9-abe5-ded73e596d7c.mp4`. It was originally served from `https://d8j0ntlcm91z4.cloudfront.net/user_38XZZBokVIGWJoTtWiXh07lWa1p/hf_20260427_054418_a6d194f0-ac86-4df9-abe5-ded73e596d7c.mp4` and has since been vendored locally.

## Navbar Component

A floating pill navbar fixed near the top of the viewport.

- **Container (`<header>`):** fixed to the top with `fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 pointer-events-none` — centered horizontally, 95% width capped at `max-w-5xl`, above other layers, and non-interactive at the wrapper level.
- **Nav (`<nav>`):** `pointer-events-auto flex items-center justify-between rounded-full border border-black/10 bg-transparent backdrop-blur-md px-5 py-2.5 md:px-7` — interactive, a rounded-full transparent pill with a `border-black/10` border, backdrop blur, and flex space-between layout.
- **Logo:** an `<a href="#">` with text `dot.`, styled `font-instrument text-[28px] tracking-tight text-[#1a1a1a] leading-none`.
- **Links:** map over `NAV_LINKS` (`Philosophy`, `Trust`, `Access`, `Tribe`). Container is `hidden md:flex items-center gap-10` (hidden on mobile, flex on desktop with `gap-10`). Each link is an `<a>` with `href={`#${link.toLowerCase()}`}` styled `font-sans text-[14px] text-[#1a1a1a] transition-opacity duration-200 hover:opacity-50`.
- **CTA button ("Link up"):** an `<a href="#access">` styled `group relative overflow-hidden rounded-full bg-[#0871E7] px-5 py-2 font-sans text-[14px] text-white shadow-[inset_0_-4px_4px_rgba(255,255,255,0.39)] outline-1 outline-[#0871E7] -outline-offset-1`.
  - **Top glint:** an absolutely positioned `<span aria-hidden="true">` inside the button: `absolute w-[80%] h-4 left-[10%] top-[1px] bg-gradient-to-b from-[#DEF0FC] to-transparent rounded-[12px] transition-transform duration-300 group-hover:scale-x-105` — a subtle highlight rectangle near the top that widens slightly on group hover.
  - **Label:** a `<span className="relative">Link up</span>` so the text sits above the glint.

## Hero Component

A full-screen hero with a looping background video and centered text.

- **Container (`<section>`):** `relative min-h-screen bg-[#F3F4ED] pt-24 md:pt-32 flex flex-col items-center overflow-hidden`.
- **Video background:** an absolutely positioned wrapper `absolute inset-0 z-0` containing an HTML5 `<video>` styled `h-full w-full object-cover`, with `src={VIDEO_SRC}` and the attributes `autoPlay`, `loop`, `muted`, `playsInline`. Over the video, add an empty overlay `<div className="absolute inset-0 bg-white/5" />` for a slight tint.
- **Text container:** `relative z-20 pointer-events-none flex flex-col items-center px-6 text-center`.
- **Main headline:** `Short notes. <br /> Daily calm.` wrapped in a `motion.div` that animates `initial={{ opacity: 0, scale: 0.95 }}` to `animate={{ opacity: 1, scale: 1 }}` with `transition={{ duration: 1.5, ease: EASE_OUT_EXPO }}`. The `<h1>` is styled `font-instrument text-[38px] md:text-[56px] lg:text-[72px] leading-[0.85] tracking-tight text-[#1a1a1a] mb-6`.
- **Sub-headline:** `Linked with a single anonymous peer. One message every day. A quiet rhythm in the digital noise.` wrapped in a `motion.div` that animates `initial={{ opacity: 0, y: 20 }}` to `animate={{ opacity: 1, y: 0 }}` with `transition={{ duration: 1.2, delay: 0.3, ease: EASE_OUT_EXPO }}`. The `<p>` is styled `font-sans text-[16px] md:text-[18px] text-[#1a1a1a]/70 leading-relaxed font-normal max-w-xl mx-auto`.
- **On-screen messages:** render `<TypingMessages />` as the last child of the section so it overlaps the phone screen shown in the video.

## TypingMessages Component

A typewriter effect that types and deletes short messages, positioned to sit on the phone screen inside the video.

### Logic

- State: `messageIndex` (current message), `text` (currently visible string), and `isDeleting` (typing vs. deleting).
- Cycle through `MESSAGES` (`["Are you here?", "Yes, I am.", "Speak soon."]`).
- Timing: type at `TYPING_SPEED` (`100`ms per char), delete at `DELETING_SPEED` (`50`ms per char), and pause `PAUSE_BEFORE_DELETE` (`2000`ms) once a message is fully typed before deleting.
- When a message is fully typed (`!isDeleting && text === message`), set a `2000`ms timeout to begin deleting.
- When fully deleted while deleting (`isDeleting && text === ""`), stop deleting and advance to the next message via `(index + 1) % MESSAGES.length`.
- Otherwise, on each tick add or remove one character using `message.slice(0, text.length + 1)` (typing) or `message.slice(0, text.length - 1)` (deleting).
- Drive everything from a single `useEffect` keyed on `[text, isDeleting, messageIndex]`, clearing the timeout in cleanup.

```tsx
function TypingMessages() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const message = MESSAGES[messageIndex];

    if (!isDeleting && text === message) {
      const pause = setTimeout(() => setIsDeleting(true), PAUSE_BEFORE_DELETE);
      return () => clearTimeout(pause);
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setMessageIndex((index) => (index + 1) % MESSAGES.length);
      return;
    }

    const tick = setTimeout(
      () => {
        setText(
          isDeleting
            ? message.slice(0, text.length - 1)
            : message.slice(0, text.length + 1),
        );
      },
      isDeleting ? DELETING_SPEED : TYPING_SPEED,
    );

    return () => clearTimeout(tick);
  }, [text, isDeleting, messageIndex]);

  // ...render
}
```

### Positioning and style

- **Wrapper:** `absolute left-[48.5%] md:left-[47.5%] lg:left-[48.5%] -translate-x-1/2 bottom-[32%] z-30 w-[110px] sm:w-[130px] flex justify-start text-left` — absolutely positioned to land on the phone screen across breakpoints.
- **Text (`<p>`):** `font-nokia text-[#2A3616] text-[10px] sm:text-[14px] leading-tight break-words min-h-[1.5em]`, rendering the current `{text}`.
- **Cursor:** a blinking `motion.span` styled `inline-block w-1.5 h-3 bg-[#2A3616] ml-1 align-middle`, with `animate={{ opacity: [0, 1, 0] }}` and `transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}`.

## Color Palette

- **Hero background:** `#F3F4ED`
- **Primary text / logo:** `#1a1a1a` (also used at `/70` opacity for the sub-headline)
- **CTA blue:** `#0871E7` (background and outline)
- **CTA glint gradient:** from `#DEF0FC` to transparent
- **CTA inner shadow highlight:** `rgba(255,255,255,0.39)`
- **Navbar border:** `black/10`
- **Video tint overlay:** `white/5`
- **Nokia typing text and cursor:** `#2A3616`

## Animations Summary

- **Headline:** opacity `0 → 1`, scale `0.95 → 1`, over `1.5`s, ease `[0.16, 1, 0.3, 1]` (`EASE_OUT_EXPO`).
- **Sub-headline:** opacity `0 → 1`, `y` `20 → 0`, over `1.2`s with `0.3`s delay, ease `[0.16, 1, 0.3, 1]`.
- **CTA glint:** `scale-x-105` on group hover with `transition-transform duration-300`.
- **Nav links:** `hover:opacity-50` with `transition-opacity duration-200`.
- **Typing cursor:** opacity `[0, 1, 0]` over `0.8`s, `repeat: Infinity`, `ease: "linear"`.
- **Typewriter:** type `100`ms/char, delete `50`ms/char, `2000`ms pause before deleting.

## File Structure

```
dot-daily-calm-landing/
├── index.html
├── package.json
├── public/
│   ├── assets/
│   │   └── hf_20260427_054418_a6d194f0-ac86-4df9-abe5-ded73e596d7c.mp4
│   └── fonts/
│       ├── nokia-cellphone-fc-small.css
│       ├── 440b53b1a1c65037f944ff19259d8014.eot
│       ├── 440b53b1a1c65037f944ff19259d8014.svg
│       ├── 440b53b1a1c65037f944ff19259d8014.ttf
│       ├── 440b53b1a1c65037f944ff19259d8014.woff
│       └── 440b53b1a1c65037f944ff19259d8014.woff2
└── src/
    ├── main.tsx        # React entry point
    ├── App.tsx         # TypingMessages, Navbar, Hero, App
    ├── index.css       # font import, Tailwind, @theme, root styles
    └── vite-env.d.ts
```

## Scripts (`package.json`)

- `dev`: `vite`
- `build`: `tsc && vite build`
- `preview`: `vite preview`
