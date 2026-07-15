# Digital Epoch — Cinematic Hero Section with Logo Marquee

## Overview

Build a modern, high-performance landing page section featuring a full-bleed video-backed hero card with a floating bottom navbar, plus a seamless infinite logo marquee scroller beneath it. The section is built with React, TypeScript, Tailwind CSS v4, and Motion (Framer Motion), and must match the exact specifications below.

## Tech Stack

- **Framework:** React with TypeScript.
- **Build tool:** Vite.
- **Styling:** Tailwind CSS v4; theme configured in CSS.
- **Animation:** Motion, imported from `motion/react`.
- **Icons:** Lucide (`lucide-react`).
- **Class utilities:** `clsx` and `tailwind-merge`, combined into a `cn()` helper.
- **Fonts:** Inter (`--font-sans`) and Outfit (`--font-display`), loaded from Google Fonts.
- **Notable techniques:** pure CSS `@keyframes` marquee (GPU-composited), CSS mask-image edge fade, autoplaying muted background video.

> **Install:** `lucide-react`, `motion`, `clsx`, and `tailwind-merge` (no specific versions required).

## Global Setup

### Fonts and CSS theme (`src/index.css`)

- Import the Inter and Outfit fonts from Google Fonts, then import Tailwind:

  ```css
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600&display=swap');
  @import 'tailwindcss';
  ```

- Configure the Tailwind theme with Inter as `--font-sans` and Outfit as `--font-display`:

  ```css
  @theme {
    --font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
    --font-display: 'Outfit', ui-sans-serif, system-ui, sans-serif;
  }
  ```

- Style the global `body`: background `#f9fafb`, `font-family: var(--font-sans)`, with `-webkit-font-smoothing: antialiased` and `text-rendering: optimizeLegibility`.

  ```css
  body {
    background-color: #f9fafb;
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  ```

### Marquee keyframes (`src/index.css`)

The track holds two identical halves, so `-50%` lands exactly one half-width to the left and the loop restarts imperceptibly:

```css
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.marquee-track {
  animation: marquee linear infinite;
  will-change: transform;
}

.marquee:hover .marquee-track {
  animation-play-state: paused;
}
```

### Class-merge helper (`src/lib/utils.ts`)

Merge conditional class names and resolve Tailwind conflicts:

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge conditional class names and resolve Tailwind conflicts. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
```

### App entry (`src/App.tsx`)

- `App` renders a `<main>` wrapper containing `<Hero />` followed by `<LogoMarquee />`.

## Layout

The page is a single `<main>` column: the hero card on top and the logo marquee below it, both centered and constrained to `max-w-[1400px]`.

## Hero (`src/components/Hero.tsx`)

Imports: `motion` from `motion/react`, `ChevronRight` from `lucide-react`, and `cn` from `../lib/utils`.

Module constants:

```ts
const VIDEO_SRC =
  '/assets/hf_20260505_101331_74f9b798-3f00-4e86-8a01-377aa16ffeaa.mp4'

const NAV_LINKS = ['Products', 'Docs'] as const
```

### Hero container and video background

- The hero is a `<section>` with these exact classes: `relative w-full max-w-[1400px] mx-auto rounded-[48px] bg-white border border-slate-200/50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] overflow-hidden h-[600px] flex flex-col`.
- Inside, an absolutely positioned underlying layer for the background video, classes: `absolute inset-0 pointer-events-none z-0 overflow-hidden select-none`.
- The `<video>` tag points to `VIDEO_SRC`. It must include `autoPlay`, `loop`, `muted`, and `playsInline` attributes, with classes `w-full h-full object-cover scale-105 transition-transform duration-1000`. No overlays.

  > **Asset note:** the video is vendored locally and served at `/assets/hf_20260505_101331_74f9b798-3f00-4e86-8a01-377aa16ffeaa.mp4` (file lives in `public/assets/`). It was originally sourced from `https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260505_101331_74f9b798-3f00-4e86-8a01-377aa16ffeaa.mp4`. (The original prompt URL was uppercased; the case-sensitive path is preserved verbatim here.)

### Hero text content

- A content wrapper positioned relative with classes `relative z-20 flex-1 px-8 md:px-16 pt-12 md:pt-16 flex flex-col items-start`.
- Use `motion.div` from `motion/react` to animate the text layer in (fade in, slide up slightly), with `className="flex flex-col items-start"`.
- **Headline** (`<h1>`): text `Foundation of the` then `<br />` then `new digital epoch`. Classes: `font-display text-[42px] md:text-[56px] font-medium tracking-tight leading-[1.08] text-[#0a1b33]`.
- **Subheadline** (`<p>`): text `Designing products, powering ecosystems and laying the foundation of a decentralized web for enterprises, builders and communities alike.` Classes: `mt-5 max-w-[440px] font-sans text-[14px] md:text-[15px] leading-relaxed text-[#64748b]`.
- **Contact button** (`motion.button`, `type="button"`): text `Contact Us`. Classes: `mt-8 bg-[#0a152d] text-white rounded-full px-7 py-3 text-[13px] font-semibold tracking-wide shadow-[0_16px_32px_-12px_rgba(10,21,45,0.45)] cursor-pointer`. Hover/tap scale animations via `motion.button`.

### Floating bottom navbar

- An absolutely positioned wrapper at bottom center of the hero: `absolute bottom-10 left-1/2 -translate-x-1/2 z-30`.
- The nav element uses `motion.nav` to fade in and slide up, delayed after the text. Classes: `flex items-center bg-white/90 backdrop-blur-2xl px-1.5 py-1.5 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-slate-200/40`.
- **Nav elements:**
  - A small circular logo placeholder on the left containing the star character `✦`. Marked `aria-hidden`, classes: `w-9 h-9 shrink-0 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center text-[15px] leading-none text-[#0a1b33]`.
  - Two text buttons mapped from `NAV_LINKS` (`Products` and `Docs`), each `type="button"` with classes via `cn(...)`: `'px-4 py-2 text-[12px] font-semibold text-slate-500 hover:text-[#0a1b33]'` and `'transition-colors cursor-pointer'`.
  - A `Get in touch` button on the right (`type="button"`) containing the text plus a `ChevronRight` icon from Lucide (`className="w-3.5 h-3.5"`, `strokeWidth={2.5}`). Styled identically to the marquee cards: `ml-1 flex items-center gap-1 bg-white px-5 py-2 rounded-full text-[12px] font-semibold text-[#0a1b33] border border-slate-200/60 shadow-sm hover:border-slate-300 transition-all cursor-pointer`.

## Logo Marquee (`src/components/LogoMarquee.tsx`)

A custom, highly performant seamless infinite logo scroller rendered below the hero (`mt-10`).

### Data model

```ts
interface Logo {
  src: string
  alt: string
  gradient: { from: string; to: string }
}
```

### Logos list

Supply an array of 8 logo objects with `src` URLs, `alt` names, and hex gradient objects. Each `src` is vendored locally under `/assets/*.svg` (files live in `public/assets/`); the SVGs were originally sourced from svgl.app. Render the list **twice inline** to ensure a seamless loop.

| `alt` | `src` | Gradient |
| --- | --- | --- |
| `Procure` | `/assets/procure.svg` | blue gradient |
| `Shopify` | `/assets/shopify.svg` | yellow gradient |
| `Blender` | `/assets/blender.svg` | blue gradient |
| `Figma` | `/assets/figma.svg` | purple gradient |
| `Spotify` | `/assets/spotify.svg` | pink/red gradient |
| `Lottielab` | `/assets/lottielab.svg` | yellow/green |
| `Google Cloud` | `/assets/google-cloud.svg` | light blue |
| `Bing` | `/assets/bing.svg` | cyan/teal |

### Card design (`LogoCard`)

- Each card matches the `Get in touch` navbar button's styling. The container classes must be exactly: `group relative h-24 w-40 shrink-0 flex items-center justify-center rounded-full bg-white border border-slate-200/60 shadow-sm hover:border-slate-300 transition-all overflow-hidden`.
- Inside the card, add an absolutely positioned gradient div (`aria-hidden`) scaled at 1.5 with 0 opacity, dropping to scale 1 and full opacity on group-hover. Classes: `absolute inset-0 scale-150 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100`, with inline style:

  ```ts
  style={{
    backgroundImage: `linear-gradient(135deg, ${logo.gradient.from}, ${logo.gradient.to})`,
  }}
  ```

- The `<img>` (`loading="lazy"`, `draggable={false}`) inverts/turns black on hover. Classes: `relative z-10 h-9 w-auto max-w-[104px] object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert`.

### Scroller wrapper (`LogoMarquee`)

- Uses the pure CSS `@keyframes` animation defined above for infinite scrolling, pausing on hover. No title or description text above the scroller.
- Outer div classes: `marquee mt-10 w-full max-w-[1400px] mx-auto overflow-hidden`, with a left/right masking gradient applied via inline style (`maskImage` / `WebkitMaskImage`) using a horizontal `linear-gradient` that fades to transparent on the edges.

- Inner track div classes: `marquee-track flex w-max py-2`.
- Render the duplicated halves by mapping over `[false, true]`; each half is a div with classes `flex items-center gap-5 pr-5`, mapping `LOGOS` to `<LogoCard />`. The duplicate half is marked `aria-hidden`.

## Color Palette

- **Body background:** `#f9fafb`
- **Headline / accent ink:** `#0a1b33`
- **Subheadline text:** `#64748b`
- **Contact button background:** `#0a152d`
- **Hero card / surfaces:** `bg-white`, borders `slate-200/50`, `slate-200/60`, `slate-200/40`, `slate-100`
- **Nav text:** `slate-500` (hover `#0a1b33`)
- **Logo gradients:** see the logos table above.

## Animations

- **Hero text:** fade + slide up.
- **Navbar:** fade + slide up, delayed after the text.
- **Contact button:** scale on hover / tap.
- **Video:** `scale-105` with `transition-transform duration-1000`.
- **Marquee:** CSS `marquee` keyframes, `linear infinite`, `translateX(0)` → `translateX(-50%)`; pauses on `.marquee:hover`.
- **Logo card hover:** gradient `scale-150 opacity-0` → `scale-100 opacity-100`; image `group-hover:brightness-0 group-hover:invert`.

## File Structure

```
digital-epoch-hero/
├── public/
│   └── assets/                # vendored video + logo SVGs (served at /assets/…)
└── src/
    ├── App.tsx                # <main> → <Hero /> + <LogoMarquee />
    ├── index.css              # font imports, @theme, body, marquee keyframes
    ├── lib/
    │   └── utils.ts           # cn() helper
    └── components/
        ├── Hero.tsx
        └── LogoMarquee.tsx
```
