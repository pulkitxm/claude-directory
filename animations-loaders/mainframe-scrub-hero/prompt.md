# Mainframe® — Cursor-Scrubbed Contact Hero

## Overview

Build a modern, interactive contact hero section for a studio called **Mainframe®**. A full-bleed background film fills the viewport and is "scrubbed" frame-by-frame by horizontal cursor motion on desktop (and autoplays on mobile). Layered above it is a typewriter headline, a description, and a multi-select service picker with a contingent feedback banner. The page is built with React, Tailwind CSS v4, and Motion (Framer Motion).

## Tech Stack

- **Framework:** React 18.3 (`react` / `react-dom` `^18.3.1`) with `StrictMode`.
- **Build tool:** Vite `^6.0.3` with `@vitejs/plugin-react` `^4.3.4`.
- **Language:** TypeScript `~5.6.2` (build runs `tsc --noEmit && vite build`).
- **Styling:** Tailwind CSS `^4.0.0` via the `@tailwindcss/vite` `^4.0.0` plugin (CSS-first config with `@import 'tailwindcss'` and an `@theme` block — no `tailwind.config.js`).
- **Animation:** Motion `^12.0.0`, imported from `motion/react` (`motion`, `AnimatePresence`).
- **Icons:** `lucide-react` `^0.468.0` (`Check`, `ArrowRight`).
- **Font:** Inter (variable, italic + roman) from Google Fonts.
- **Notable techniques:** native HTML5 video scrubbing via `currentTime` driven by `mousemove`; a custom `useTypewriter` hook; multi-select pill state with spring-animated check icons and an `AnimatePresence` status banner.

## Global Setup

### Fonts

- Import the Inter font from Google Fonts (in `index.html`).
- In the CSS setup, configure Tailwind to use Inter by default through an `@theme` block that sets `--font-sans`:

  ```css
  @import 'tailwindcss';

  @theme {
    /* Inter (imported from Google Fonts in index.html) as the default sans stack. */
    --font-sans:
      'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif;
  }
  ```

### Global keyframe animation

Create a keyframe animation named `blink` for the typewriter cursor, plus the `.animate-blink` utility (in `src/index.css`):

```css
/* Typewriter cursor blink. */
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.animate-blink {
  animation: blink 1s step-end infinite;
}
```

### Entry point (`src/main.tsx`)

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

## Page Structure (`App.tsx`)

Wrap the entire application in a container `div` with these classes:

`relative bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen`

Inside, in order:

1. `<Navbar />`
2. `<BackgroundVideo />` — the background film, scrubbed by the cursor on desktop, autoplaying on mobile.
3. A content grouping layer, stacked above the video:
   - Outer `div`: `relative z-10 flex flex-col order-first lg:order-none w-full bg-white lg:bg-transparent pb-8 lg:pb-0 lg:min-h-screen`
   - Inside it, the overarching layout engine `<main>`:
     - `id="spade-hero"`
     - classes: `w-full max-w-7xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center`
     - contains `<HeroContent />`

```tsx
export default function App() {
  return (
    <div className="relative bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen">
      <Navbar />
      <BackgroundVideo />
      <div className="relative z-10 flex flex-col order-first lg:order-none w-full bg-white lg:bg-transparent pb-8 lg:pb-0 lg:min-h-screen">
        <main
          id="spade-hero"
          className="w-full max-w-7xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center"
        >
          <HeroContent />
        </main>
      </div>
    </div>
  );
}
```

## Background Video Component (with native scrubbing)

`src/components/BackgroundVideo.tsx`. Full-bleed background film. On desktop (≥ 1024px) the cursor's horizontal motion scrubs the film natively via `currentTime`; on smaller screens the video simply autoplays.

- **Container element:** a `div` with classes
  `order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 lg:bg-transparent`
- **Video element:** `<video>` with `ref`, `muted`, `playsInline`, `preload="auto"`, and classes
  `w-full h-full object-cover object-right lg:object-right-bottom`.
- **Video source:** the asset is vendored locally and referenced as
  `/assets/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4`.
  > Note: the original brief specified a remote CloudFront source, `https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4`. The shipped source loads the same file from the local `/assets/` path instead (only the scheme + host of the remote URL were normalized to lowercase here; the path is preserved verbatim).

### Constants

- `DESKTOP_MIN_WIDTH = 1024` — breakpoint below which scrubbing is disabled and normal playback kicks in.

### Scrubbing / playback logic (`useEffect` hooks)

- **Desktop mouse scrubbing hook:** listen to the window `mousemove` event.
  - If `window.innerWidth < DESKTOP_MIN_WIDTH`, ignore (scrubbing disabled on mobile frames).
  - Store the mouse's previous X coordinate to compute the delta against the current X.
  - Update the target scrub time based on `(delta / window.innerWidth) * 0.8 * video.duration`. Clamp the time between `0` and `duration`. Set `video.currentTime = targetTime`.
  - Bind a `seeked` event listener to ensure smooth tracking frame to frame.
- **Mobile autoplay hook:** because scrubbing is disabled on mobile frames, trigger normal playback for screens `< 1024` wide — set `video.autoplay = true` and call `video.play()` (catching/ignoring muted-autoplay policy rejections).

```tsx
import { useEffect, useRef } from 'react';

const VIDEO_SRC = '/assets/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4';
const DESKTOP_MIN_WIDTH = 1024;

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Desktop mouse scrubbing.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let previousX: number | null = null;
    let targetTime: number | null = null;

    const handleSeeked = () => {
      if (targetTime !== null) {
        video.currentTime = targetTime;
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (window.innerWidth < DESKTOP_MIN_WIDTH) return;
      if (previousX === null) {
        previousX = event.clientX;
        return;
      }
      const delta = event.clientX - previousX;
      previousX = event.clientX;

      const { duration } = video;
      if (!duration || Number.isNaN(duration)) return;

      const base = targetTime ?? video.currentTime;
      targetTime = Math.min(
        Math.max(base + (delta / window.innerWidth) * 0.8 * duration, 0),
        duration,
      );
      video.currentTime = targetTime;
    };

    window.addEventListener('mousemove', handleMouseMove);
    video.addEventListener('seeked', handleSeeked);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, []);

  // Mobile autoplay.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.innerWidth < DESKTOP_MIN_WIDTH) {
      video.autoplay = true;
      video.play().catch(() => {});
    }
  }, []);

  return (
    <div className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 lg:bg-transparent">
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover object-right lg:object-right-bottom"
      />
    </div>
  );
}
```

## Interactive Navbar (`src/components/Navbar.tsx`)

- **Header wrapper:**
  `<header className="fixed top-0 inset-x-0 z-10 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center bg-transparent">`
- **Nav links data:** `const NAV_LINKS = ['Labs', 'Studio', 'Openings', 'Shop'];`
- Local state: `isMobileMenuOpen` via `useState(false)`.

### Logo (left)

An `<a href="#">` flex row with `gap-3`:

- **Text:** `Mainframe&reg;` (using the `®` symbol). Classes: `text-[21px] sm:text-[26px] tracking-tight text-black font-medium select-none`.
- **Icon block beside it:** an asterisk `&#10033;` (`✱`), `aria-hidden="true"`. Classes: `text-[25px] sm:text-[30px] text-black select-none tracking-[-0.02em] font-medium leading-none mb-1`.

### Desktop nav links (center)

- `<nav aria-label="Primary" className="hidden md:flex flex-row text-[23px] text-black">`
- Map over `NAV_LINKS`; each link is an `<a href="#" className="hover:opacity-60 transition-opacity">`.
- Links are separated by a divider `<span className="opacity-40">,&nbsp;</span>` rendered between items (i.e. for every item except the last).

### Desktop CTA (right)

A link reading **Get in touch**, hidden on mobile:
`<a href="#" className="hidden md:inline text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity">`

### Mobile menu logic

- **Hamburger `<button>`**, visible below `md`, kept above the overlay so it can close the menu:
  `className="md:hidden relative z-10 flex flex-col items-center justify-center gap-[5px] w-10 h-10 -mr-2"`, with `type="button"`, `aria-expanded={isMobileMenuOpen}`, and `aria-label` toggling between `Open menu` and `Close menu`. `onClick` toggles `isMobileMenuOpen`.
- It has three `w-6 h-[2px] bg-black` spans, each with `transition-all duration-300`. When open, animate the burger into an "X":
  - top bar: `rotate-45 translate-y-[7px]`
  - middle bar: `opacity-0`
  - bottom bar: `-rotate-45 -translate-y-[7px]`
- **Full-screen mobile navigation overlay** `div` (`data-testid="mobile-overlay"`, `aria-hidden={!isMobileMenuOpen}`), hidden on desktop:
  `className="md:hidden fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm transition-opacity duration-300"`. When `isMobileMenuOpen` is true apply `opacity-100 pointer-events-auto`; otherwise `opacity-0 pointer-events-none`. (Rendered inside the fixed `z-10` header so it stacks above the white content layer; within the header it sits at `z-[9]`, below the hamburger.)
  - Inside: a `<nav aria-label="Mobile">` listing the `NAV_LINKS`, each an `<a href="#">` that closes the menu on click.

## Hero Content (`src/components/HeroContent.tsx`)

Composes the typewriter headline, the secondary description, and the `ServicePicker`. Each block is wrapped in a `motion.div` that drops in (`initial={{ opacity: 0, y: 20 }}`, `animate={{ opacity: 1, y: 0 }}`).

### Typewriter hook (`src/hooks/useTypewriter.ts`)

Implement a custom `useTypewriter(text, speed = 38, startDelay = 600)` React hook. It uses `setTimeout` and `setInterval` to iteratively build the string slice by slice. It returns an object `{ displayed: string, done: boolean }`.

```ts
import { useEffect, useState } from 'react';

export interface TypewriterState {
  displayed: string;
  done: boolean;
}

export function useTypewriter(text: string, speed = 38, startDelay = 600): TypewriterState {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);

    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      let index = 0;
      interval = setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      if (interval !== undefined) clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
```

### Headline

- Run the hook with the string `"we'd love to\nhear from you!"` (defined as `const HEADLINE = "we'd love to\nhear from you!";`).
- Wrap the headline in a `motion.div` configured to drop in: `initial={{ opacity: 0, y: 20 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.6 }}`.
- Render the hook text inside:
  `<h1 className="text-5xl md:text-6xl lg:text-[76px] font-normal tracking-tight text-black leading-[1.08] mb-8 select-none w-full whitespace-pre-wrap">`
- While typing (`!done`), output a blinking cursor span at the end of the displayed text:
  `<span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink" />`

### Secondary description

- Another `motion.div`, delayed `0.1s` from the headline (`transition={{ duration: 0.6, delay: 0.1 }}`).
- Content: a `<p>` reading:
  > Whether you have questions, feedback, `<br />` drop us a message and we'll get back to you as soon as possible.
- Classes: `text-lg md:text-xl text-[#5A635A] leading-relaxed font-normal mb-14 max-w-2xl`.

### Service picker wrapper

A third `motion.div` wrapping `<ServicePicker />`, delayed `0.2s` (`transition={{ duration: 0.6, delay: 0.2 }}`).

## Interactive Multi-Select Service Pills (`src/components/ServicePicker.tsx`)

- Use `useState<string[]>([])` (`services` / `setServices`) to track selections over the options `const SERVICE_OPTIONS = ['Brand', 'Digital', 'Campaign', 'Other'];`.
- `toggleService(option)` adds the option if absent, removes it if present (multi-select).
- Wrap everything in `<section aria-label="Service selection">`.
- **Prompt title:** `What sort of service?` — `<h2 className="text-2xl font-medium tracking-tight mb-2">`.
- **Subtitle:** `Select all that apply` — `<p className="opacity-85 text-[#738273] mb-8">`.

### Pills

- Container: `<div className="flex flex-wrap gap-3 mb-7">`.
- Iterate over `SERVICE_OPTIONS`, rendering a `motion.button` per option (`type="button"`, `whileTap={{ scale: 0.96 }}`, `aria-pressed={isActive}`, `onClick` toggles the service).
- Base classes: `inline-flex items-center gap-2 rounded-full border px-6 py-3 text-base font-medium cursor-pointer transition-colors duration-300`.
- **Active traits:** `border-transparent bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/5 transform`.
- **Inactive traits:** `bg-white text-[#1C2E1E] border-[#F1F3F1] hover:bg-[#F1F3F1]/55`.
- When active, show a check icon (`Check` from `lucide-react`, `size={16}`, `strokeWidth={2.5}`, `aria-hidden="true"`) wrapped in an `AnimatePresence` `motion.span` that drops in:
  `initial={{ scale: 0, y: -10, opacity: 0 }}`, `animate={{ scale: 1, y: 0, opacity: 1 }}`, `exit={{ scale: 0, opacity: 0 }}`, `transition={{ type: 'spring', stiffness: 300, damping: 20 }}`, `className="inline-flex"`.

### Contingent feedback status banner

Underneath the pills, an `<AnimatePresence mode="wait">` that tracks the selection array length:

- **Empty (`services.length === 0`):** show a placeholder `motion.p` (key `"empty"`) reading **Please click to select services above.** at fifty-percent opacity:
  `initial={{ opacity: 0 }}`, `animate={{ opacity: 0.5 }}`, `exit={{ opacity: 0 }}`, `transition={{ duration: 0.25 }}`, `className="italic text-xs text-[#1C2E1E]"`.
- **Active selection:** swap into a `motion.div` (key `"selected"`) that springs its height gracefully:
  `initial={{ opacity: 0, height: 0 }}`, `animate={{ opacity: 1, height: 'auto' }}`, `exit={{ opacity: 0, height: 0 }}`, `transition={{ type: 'spring', stiffness: 260, damping: 28 }}`, `className="overflow-hidden max-w-2xl"`.
  - Inside, a banner `<div className="flex items-center justify-between gap-4 bg-[#FAFBF9] border border-[#E9EEE7] rounded-2xl px-5 py-4">`.
  - Acknowledgment text: `<p className="text-sm text-[#1C2E1E]">Ready to inquire about: <span className="font-medium">{services.join(', ')}</span></p>`.
  - Arrow call-to-action button reading **Let's Go**:
    `<button type="button" className="inline-flex items-center gap-1.5 text-[#4D6D47] uppercase text-xs font-semibold tracking-[0.12em] whitespace-nowrap hover:opacity-70 transition-opacity">` with an `ArrowRight` icon (`size={14}`, `aria-hidden="true"`) from `lucide-react`.

## Color Palette

- **White / surfaces:** `bg-white`, `bg-neutral-50`, `bg-[#FAFBF9]`
- **Primary text / dark green:** `text-neutral-900`, `text-black`, `#1C2E1E`
- **Selection:** `selection:bg-[#EAECE9]`, `selection:text-[#1C2E1E]`
- **Muted greens:** `#5A635A` (description), `#738273` (subtitle), `#4D6D47` (CTA)
- **Borders:** `#F1F3F1` (inactive pill), `#E9EEE7` (banner)
- **Active pill shadow:** `shadow-emerald-950/5`

## File Structure

```
mainframe-scrub-hero/
├── index.html
├── package.json
├── public/
│   └── assets/
│       └── hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── components/
    │   ├── Navbar.tsx
    │   ├── BackgroundVideo.tsx
    │   ├── HeroContent.tsx
    │   └── ServicePicker.tsx
    └── hooks/
        └── useTypewriter.ts
```
