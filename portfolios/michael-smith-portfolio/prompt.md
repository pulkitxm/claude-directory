# Michael Smith — Dark Portfolio Landing Page

## Overview

Build a single-page, forced-dark portfolio landing page for a fictional designer/developer "Michael Smith" based in Chicago. The page opens with an animated loading screen, then reveals a full-viewport hero backed by a looping HLS video, followed by selected works, a journal feed, a scroll-driven parallax gallery, animated stats, and a contact/footer section with a marquee and a second HLS video. Animations are driven by GSAP (entrance timelines, ScrollTrigger pinning/parallax, marquee) and Framer Motion (in-view reveals, route/page transitions, presence transitions).

## Tech Stack

- **Framework:** React 18 (`react` / `react-dom` `^18.3.1`) with `react-router-dom` `^6.28.0`.
- **Build tool:** Vite `^5.4.11` with `@vitejs/plugin-react` `^4.3.4`.
- **Language:** TypeScript `^5.6.3` (`build` runs `tsc --noEmit && vite build`).
- **Styling:** Tailwind CSS `^3.4.15` + `tailwindcss-animate` `^1.0.7`, `postcss` `^8.4.49`, `autoprefixer` `^10.4.20`.
- **Animation:** GSAP `^3.12.5` (with `ScrollTrigger` plugin), Framer Motion `^11.15.0`.
- **Video:** `hls.js` `^1.5.17` for HLS background video, loaded lazily via dynamic `import()`, with native HLS fallback for Safari.
- **Fonts:** Inter (weights 300–700) and Instrument Serif (roman + italic, 400), loaded from Google Fonts.
- **Notable techniques:** `requestAnimationFrame` counters, scroll-spy navbar, GSAP `ScrollTrigger.create` pin + scrubbed parallax, animated CSS gradient ring borders, forced dark theme.

## Global Setup

### `index.html`

- `<html lang="en" class="dark">`.
- `<meta name="description" content="Michael Smith — designer & developer crafting seamless digital interactions in Chicago." />`.
- `<title>Michael Smith — Portfolio</title>`.
- Preconnect to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (the latter `crossorigin`).
- Inline SVG data-URI favicon: a circle with a `#89aacc → #4e85bf` linear-gradient stroke and italic Georgia serif text "JA" filled `#f5f5f5`.
- Mounts `<div id="root"></div>` and loads `/src/main.tsx` as a module.

### Fonts

Google Fonts import at the top of `index.css`:

```css
@import url("https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap");
```

Tailwind font families (`tailwind.config.ts`):

- `font-body` → `["Inter", "sans-serif"]`
- `font-display` → `["'Instrument Serif'", "serif"]`

### CSS custom properties (HSL channels, no `hsl()` wrapper — Tailwind adds it)

Defined under `@layer base` in `:root`:

```css
--bg: 0 0% 4%;
--surface: 0 0% 8%;
--text: 0 0% 96%;
--muted: 0 0% 53%;
--stroke: 0 0% 12%;
--accent: 0 0% 96%;
```

### Tailwind custom colors

In `tailwind.config.ts`, each color uses the `<alpha-value>` syntax so opacity modifiers work:

```ts
colors: {
  bg: "hsl(var(--bg) / <alpha-value>)",
  surface: "hsl(var(--surface) / <alpha-value>)",
  "text-primary": "hsl(var(--text) / <alpha-value>)",
  muted: "hsl(var(--muted) / <alpha-value>)",
  stroke: "hsl(var(--stroke) / <alpha-value>)",
}
```

Tailwind config also sets `content: ["./index.html", "./src/**/*.{ts,tsx}"]` and registers the `tailwindcss-animate` plugin.

### Base styles (`@layer base`)

- `html { scroll-behavior: smooth; }`.
- `body` gets `@apply bg-bg font-body text-text-primary antialiased;` — this is the forced dark theme (no light-mode toggle).
- `::selection { background: #4e85bf; color: hsl(var(--text)); }`.
- Custom scrollbar: `::-webkit-scrollbar { width: 10px; }`, track `background: hsl(var(--bg));`, thumb `background: hsl(var(--stroke)); border-radius: 9999px; border: 2px solid hsl(var(--bg));`, thumb hover `background: hsl(var(--muted));`.

### Accent gradient utilities (`@layer components`)

```css
.accent-gradient {
  background: linear-gradient(90deg, #89aacc 0%, #4e85bf 100%);
}

.accent-gradient-reverse {
  background: linear-gradient(90deg, #4e85bf 0%, #89aacc 100%);
}

/* Animated gradient ring — oversized background so gradient-shift has room to travel */
.accent-gradient-animated {
  background: linear-gradient(90deg, #89aacc 0%, #4e85bf 50%, #89aacc 100%);
  background-size: 200% 200%;
  animation: gradient-shift 6s ease infinite;
}
```

The accent gradient (`#89aacc → #4e85bf`) is used on the logo ring, hover border rings, and progress bars.

### Keyframes and animation utilities

```css
@keyframes scroll-down {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(200%); }
}

@keyframes role-fade-in {
  0% { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

Under `@layer utilities`:

- `.animate-scroll-down { animation: scroll-down 1.5s ease-in-out infinite; }`
- `.animate-role-fade-in { animation: role-fade-in 0.4s ease-out; }`
- `.animate-gradient-shift { animation: gradient-shift 6s ease infinite; }`

## App Structure & Routing

### `src/main.tsx`

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
```

### `src/App.tsx`

Wraps `<Routes>` in `<AnimatePresence mode="wait">`, keyed by `location.pathname` (from `useLocation()`), for page transitions:

- `/` → `<Index />`
- `*` → `<NotFound />`

### `src/pages/Index.tsx`

- `isLoading` state, initially `true`.
- `useEffect` locks body scroll while loading: `document.body.style.overflow = isLoading ? "hidden" : "";` (resets to `""` on cleanup).
- Renders inside `<PageTransition>`:
  - `<AnimatePresence>{isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}</AnimatePresence>`
  - `<Navbar />`
  - `<main>` containing `<Hero active={!isLoading} />`, `<SelectedWorks />`, `<Journal />`, `<Explorations />`, `<Stats />`
  - `<Footer />`

### `src/components/PageTransition.tsx`

Shared route-level fade/slide wrapper using Framer Motion `motion.div`:

- `initial={{ opacity: 0, y: 12 }}`, `animate={{ opacity: 1, y: 0 }}`, `exit={{ opacity: 0, y: -12 }}`
- `transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}`

### `src/pages/NotFound.tsx`

Wrapped in `<PageTransition>`. Centered `<main>` (`flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-center`):

- Eyebrow: "Error 404" — `mb-6 text-xs uppercase tracking-[0.3em] text-muted`.
- Heading: "Lost in `space.`" (the word "space." wrapped in `<span className="text-muted">`) — `mb-8 font-display text-7xl italic leading-[0.9] tracking-tight md:text-9xl`.
- Body: "The page you're looking for doesn't exist — but the work does." — `mb-12 max-w-md text-sm text-muted md:text-base`.
- `<Link to="/">` "Back home" button: `group relative inline-flex transition-transform duration-300 hover:scale-105` with an `accent-gradient-animated absolute -inset-[2px] rounded-full` ring (opacity 0 → 100 on group hover) and an inner span `relative rounded-full bg-text-primary px-7 py-3.5 text-sm font-medium text-bg ... group-hover:bg-bg group-hover:text-text-primary`.

## HLS Video Hook (`src/hooks/useHlsVideo.ts`)

Attaches an HLS stream to a `<video>` element. `hls.js` is loaded lazily via dynamic `import("hls.js")` and used where MSE is available, falling back to native HLS otherwise.

```ts
import { useEffect, useRef } from "react";
import type Hls from "hls.js";

export function useHlsVideo(src: string) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    let cancelled = false;

    const setup = async () => {
      const { default: HlsLib } = await import("hls.js");
      if (cancelled) return;

      if (HlsLib.isSupported()) {
        hls = new HlsLib({ enableWorker: true });
        hls.loadSource(src);
        hls.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
      }
    };

    void setup();

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, [src]);

  return videoRef;
}

export const HERO_STREAM =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
```

> The HLS source path is case-sensitive — use `Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8` exactly.

## Shared Button: `GradientRingButton` (`src/components/GradientRingButton.tsx`)

A pill `<a>` that reveals an animated accent-gradient border ring on hover. The ring is an oversized gradient layer sitting `-inset-[2px]` proud of the opaque inner pill. Extends `AnchorHTMLAttributes<HTMLAnchorElement>` and accepts a `variant` plus `children`.

- Outer `<a>`: `group relative inline-flex transition-transform duration-300 hover:scale-105` (plus any passed `className`).
- Ring span: `accent-gradient-animated absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100` (`aria-hidden`).
- Inner span: `relative inline-flex items-center gap-2 rounded-full transition-colors duration-300` + the variant's inner styles.

Variants (`Variant = "solid" | "outline" | "pill"`):

- **`solid`:** `bg-text-primary px-7 py-3.5 text-sm font-medium text-bg group-hover:bg-bg group-hover:text-text-primary`
- **`outline`:** `border-2 border-stroke bg-bg px-7 py-3.5 text-sm font-medium text-text-primary group-hover:border-transparent`
- **`pill`:** `border border-stroke bg-bg px-5 py-2.5 text-sm text-muted group-hover:border-transparent group-hover:text-text-primary`

## Section 1 — Loading Screen (`src/components/LoadingScreen.tsx`)

Full-screen overlay. Props: `onComplete: () => void`.

Constants:

- `WORDS = ["Design", "Create", "Inspire"]`
- `COUNT_DURATION = 2700` (ms)
- `WORD_INTERVAL = 900` (ms)
- `COMPLETE_DELAY = 400` (ms)

Behavior:

- A `requestAnimationFrame` loop counts the progress `000 → 100` over `2700ms` (`setCount(Math.round(progress * 100))`). When progress hits 1, a `400ms` `setTimeout` calls `onComplete`. Uses an `onCompleteRef` (a `useRef` kept in sync) so the effect can run with an empty dependency array. Cleans up via `cancelAnimationFrame` and `clearTimeout`.
- Rotating words cycle every `900ms` via `setInterval` (`(i) => (i + 1) % WORDS.length`).

Markup — root `motion.div` with `exit={{ opacity: 0 }}`, `transition={{ duration: 0.6, ease: "easeInOut" }}`, `className="fixed inset-0 z-[9999] bg-bg"`, `aria-label="Loading"`:

- **Top-left label** "Portfolio" (`motion.p`): `initial={{ y: -20, opacity: 0 }}`, `animate={{ y: 0, opacity: 1 }}`, `transition={{ duration: 0.6, ease: "easeOut" }}`, `className="absolute left-6 top-6 text-xs uppercase tracking-[0.3em] text-muted md:left-10 md:top-8"`.
- **Center rotating word** inside `flex h-full items-center justify-center`, wrapped in `<AnimatePresence mode="wait">`. A `motion.span` keyed by `wordIndex`: `initial={{ y: 20, opacity: 0 }}`, `animate={{ y: 0, opacity: 1 }}`, `exit={{ y: -20, opacity: 0 }}`, `transition={{ duration: 0.35, ease: "easeOut" }}`, `className="font-display text-4xl italic text-text-primary/80 md:text-6xl lg:text-7xl"`.
- **Bottom-right counter** (`absolute bottom-6 right-6 md:bottom-8 md:right-10`): a span `font-display text-6xl tabular-nums leading-none text-text-primary md:text-8xl lg:text-9xl` showing `String(count).padStart(3, "0")`.
- **Bottom progress bar** (`absolute inset-x-0 bottom-0 h-[3px] bg-stroke/50`): inner div `accent-gradient h-full w-full origin-left` with inline style `{ transform: scaleX(count / 100), boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)" }`.

## Section 2 — Hero (`src/components/Hero.tsx`)

Full-viewport `<section id="home">` with `relative flex min-h-screen items-center justify-center overflow-hidden`. Props: `active: boolean` (the entrance timeline waits until the loading screen has cleared).

Constants:

- `ROLES = ["Creative", "Fullstack", "Founder", "Scholar"]`
- `ROLE_INTERVAL = 2000` (ms)

### Background HLS video

Wrapper `absolute inset-0` (`aria-hidden`):

- `<video>` via `useHlsVideo(HERO_STREAM)`, attributes `autoPlay muted loop playsInline`, `className="absolute left-1/2 top-1/2 h-auto w-auto min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"`.
- Dark overlay: `absolute inset-0 bg-black/20`.
- Bottom fade: `absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent`.

### Role rotation

`setInterval` every `2000ms` cycling `roleIndex` through `ROLES`.

### GSAP entrance timeline

Runs when `active` becomes true (guarded by `active` and `sectionRef.current`), inside `gsap.context(..., sectionRef)`, with `defaults: { ease: "power3.out" }`. Reverts via `ctx.revert()` on cleanup.

```tsx
const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
tl.fromTo(
  ".name-reveal",
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 1.2, delay: 0.1 },
  0,
);
tl.fromTo(
  ".blur-in",
  { opacity: 0, y: 20, filter: "blur(10px)" },
  { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, stagger: 0.1, delay: 0.3 },
  0,
);
```

### Centered content (`relative z-10 flex flex-col items-center px-6 text-center`)

- **Eyebrow** "Collection '26": `blur-in mb-8 text-xs uppercase tracking-[0.3em] text-muted opacity-0`.
- **Name** "Michael Smith": `<h1>` with `name-reveal mb-6 font-display text-6xl italic leading-[0.9] tracking-tight text-text-primary opacity-0 md:text-8xl lg:text-9xl`.
- **Role line**: `blur-in mb-3 text-base text-muted opacity-0 md:text-lg`, reading `A {role} lives in Chicago.` — the role word is a span keyed by `roleIndex` (to re-trigger the CSS animation) with `animate-role-fade-in inline-block font-display italic text-text-primary`.
- **Description**: `blur-in mb-12 max-w-md text-sm text-muted opacity-0 md:text-base` — "Designing seamless digital interactions by focusing on the unique nuances which bring systems to life."
- **CTA buttons** inside `blur-in inline-flex gap-4 opacity-0`:
  - `<GradientRingButton variant="solid" href="#work">See Works</GradientRingButton>`
  - `<GradientRingButton variant="outline" href="mailto:hello@michaelsmith.com">Reach out...</GradientRingButton>`

### Scroll indicator

Bottom-center (`absolute bottom-8 left-1/2 z-10 -translate-x-1/2`), inner `blur-in flex flex-col items-center gap-3 opacity-0`:

- Label "Scroll": `text-xs uppercase tracking-[0.2em] text-muted`.
- A vertical line `relative block h-10 w-px overflow-hidden bg-stroke` containing an animated highlight span `animate-scroll-down absolute inset-x-0 top-0 h-1/2 bg-text-primary`.

## Navbar (`src/components/Navbar.tsx`)

Fixed floating pill at top center. Header: `fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6`.

`NAV_LINKS`: `Home → #home`, `Work → #work`, `Resume → #resume`.

State & scroll behavior (`useEffect`, listener `{ passive: true }`, also called once on mount):

- `setScrolled(window.scrollY > 100)`.
- **Scroll-spy:** `probe = window.scrollY + window.innerHeight * 0.4`; iterate `NAV_LINKS`, and the last link whose target element's `offsetTop <= probe` becomes `active` (default `"#home"`).

`<nav aria-label="Primary">` pill: `inline-flex items-center rounded-full border border-white/10 bg-surface px-2 py-2 backdrop-blur-md transition-shadow duration-500`, plus `shadow-md shadow-black/10` when `scrolled`.

Contents (left to right):

1. **Logo** `<a href="#home" aria-label="Michael Smith — home">`: `group relative mr-1 flex h-9 w-9 shrink-0 items-center justify-center transition-transform duration-300 hover:scale-110`. Two absolute rounded-full ring spans — `accent-gradient absolute inset-0 rounded-full` and `accent-gradient-reverse absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100` (reverses direction on hover). Inner: `relative flex h-[calc(100%-4px)] w-[calc(100%-4px)] items-center justify-center rounded-full bg-bg font-display text-[13px] italic text-text-primary` containing "JA".
2. **Divider** — `<span aria-hidden className="mx-1 hidden h-5 w-px bg-stroke sm:block" />` (hidden on mobile).
3. **Nav links** — each `<a>`: `rounded-full px-3 py-1.5 text-xs transition-colors duration-300 sm:px-4 sm:py-2 sm:text-sm`. Active: `bg-stroke/50 text-text-primary`. Inactive: `text-muted hover:bg-stroke/50 hover:text-text-primary`.
4. **Divider** (again).
5. **"Say hi" link** `<a href="mailto:hello@michaelsmith.com">`: `group relative ml-1 inline-flex`. Hover ring: `accent-gradient-animated absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100`. Inner: `relative inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-xs text-text-primary backdrop-blur-md sm:px-4 sm:py-2 sm:text-sm` with the text "Say hi" and an `↗` arrow span `transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5`.

## Shared `SectionHeader` (`src/components/SectionHeader.tsx`)

Shared section intro using Framer Motion. Props: `eyebrow: string`, `heading: ReactNode`, `subtext: string`, optional `cta: { label; href }`.

Root `motion.div`: `initial={{ opacity: 0, y: 30 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: "-100px" }}`, `transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}`, `className="mb-12 flex items-end justify-between gap-8 md:mb-16"`.

- Eyebrow row (`mb-5 flex items-center gap-4`): a rule `aria-hidden h-px w-8 bg-stroke` + `text-xs uppercase tracking-[0.3em] text-muted` eyebrow text.
- Heading `<h2>`: `mb-4 text-4xl tracking-tight text-text-primary md:text-5xl`.
- Subtext `<p>`: `max-w-md text-sm text-muted md:text-base`.
- Optional CTA via `GradientRingButton variant="pill"` with `className="hidden shrink-0 md:inline-flex"` (desktop only), containing the label and an `→` arrow span `transition-transform duration-300 group-hover:translate-x-0.5`.

## Section 3 — Selected Works (`src/components/SelectedWorks.tsx`)

`<section id="work" className="bg-bg py-12 md:py-16">`; inner container `mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16`.

Header via `SectionHeader`:

- eyebrow "Selected Work"
- heading: `Featured <span className="font-display italic">projects</span>`
- subtext "A selection of projects I've worked on, from concept to launch."
- cta `{ label: "View all work", href: "#work" }`

Bento grid: `grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6`. Four projects (`PROJECTS`):

| Title | Category | Image | Span | Aspect |
|---|---|---|---|---|
| Automotive Motion | Art Direction | `/assets/unsplash-photo-1503376780353-7e6692767b70.jpg` | `md:col-span-7` | `aspect-[4/3] md:aspect-[7/5]` |
| Urban Architecture | Photography | `/assets/unsplash-photo-1487958449943-2429e8be8625.jpg` | `md:col-span-5` | `aspect-[4/3] md:aspect-square` |
| Human Perspective | Editorial | `/assets/unsplash-photo-1500648767791-00dcc994a43e.jpg` | `md:col-span-5` | `aspect-[4/3] md:aspect-square` |
| Brand Identity | Identity | `/assets/unsplash-photo-1561070791-2526d30994b5.jpg` | `md:col-span-7` | `aspect-[4/3] md:aspect-[7/5]` |

Each project is a `motion.div` keyed by title: `initial={{ opacity: 0, y: 40 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: "-50px" }}`, `transition={{ duration: 0.9, delay: (i % 2) * 0.12, ease: [0.25, 0.1, 0.25, 1] }}`, `className={project.span}`. Inside:

- `<article className="group relative overflow-hidden rounded-3xl border border-stroke bg-surface {aspect}">`.
- `<img>` (`loading="lazy"`): `absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105`.
- **Halftone overlay** (`aria-hidden`): `absolute inset-0 opacity-20 mix-blend-multiply` with inline style `HALFTONE_STYLE = { backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "4px 4px" }`.
- **Hover veil + label**: `absolute inset-0 flex items-center justify-center bg-bg/70 opacity-0 backdrop-blur-lg transition-opacity duration-500 group-hover:opacity-100`, containing a pill: outer `relative inline-flex`, ring `accent-gradient-animated absolute -inset-[2px] rounded-full`, inner `relative inline-flex items-center gap-1.5 rounded-full bg-white px-6 py-3 text-sm text-neutral-900` reading `View — <span className="font-display italic">{title}</span>`.
- **Mobile caption** (`mt-3 flex items-baseline justify-between px-1 md:hidden`): `<h3>` title `font-display text-lg italic text-text-primary` + category span `text-xs uppercase tracking-[0.2em] text-muted`.

## Section 4 — Journal (`src/components/Journal.tsx`)

`<section id="journal" className="bg-bg py-16 md:py-24">`; same `mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16` container.

Header via `SectionHeader`:

- eyebrow "Journal"
- heading: `Recent <span className="font-display italic">thoughts</span>`
- subtext "Field notes on design, engineering, and everything in between."
- cta `{ label: "View all", href: "#journal" }`

Entries list: `flex flex-col gap-4`. Four entries (`ENTRIES`):

| Title | Read time | Date | Image |
|---|---|---|---|
| Designing with intent: systems over screens | 6 min read | May 28, 2026 | `/assets/unsplash-photo-1558655146-d09347e92766.jpg` |
| The quiet power of micro-interactions | 4 min read | Apr 14, 2026 | `/assets/unsplash-photo-1545235617-9465d2a55698.jpg` |
| From Figma to production without losing the soul | 8 min read | Mar 02, 2026 | `/assets/unsplash-photo-1498050108023-c5249f4df085.jpg` |
| Notes on building in public | 5 min read | Jan 19, 2026 | `/assets/unsplash-photo-1499951360447-b19be8fe80f5.jpg` |

Each entry is a `motion.article` keyed by title: `initial={{ opacity: 0, y: 24 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: "-50px" }}`, `transition={{ duration: 0.7, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}`, `className="group flex cursor-pointer items-center gap-4 rounded-[40px] border border-stroke bg-surface/30 p-4 transition-colors duration-300 hover:bg-surface sm:gap-6 sm:rounded-full"`. Inside:

- `<img alt="" loading="lazy">`: `h-16 w-16 shrink-0 rounded-[24px] object-cover sm:h-20 sm:w-20 sm:rounded-full`.
- Text block `min-w-0 flex-1`: `<h3>` title `mb-1 text-base text-text-primary sm:text-lg` + read-time `<p>` `text-xs text-muted sm:text-sm`.
- Date span `hidden shrink-0 text-sm text-muted lg:block`.
- Arrow `↗` span (`aria-hidden`): `flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stroke text-muted transition-all duration-300 group-hover:rotate-45 group-hover:border-text-primary/30 group-hover:text-text-primary sm:mr-2`.

## Section 5 — Explorations / Parallax Gallery (`src/components/Explorations.tsx`)

`<section ref={sectionRef} className="relative min-h-[300vh] bg-bg">`. Registers `gsap.registerPlugin(ScrollTrigger)` at module level. State: `lightbox` (`Exploration | null`).

`ITEMS` (six explorations), split into two columns via `COLUMN_ONE = ITEMS.filter((_, i) => i % 2 === 0)` and `COLUMN_TWO = ITEMS.filter((_, i) => i % 2 === 1)`:

| Title | Image | Rotate |
|---|---|---|
| Chromatic study 01 | `/assets/unsplash-photo-1541701494587-cb58502866ab.jpg` | `rotate-3` |
| Dark matter | `/assets/unsplash-photo-1550684376-efcbd6e3f031.jpg` | `-rotate-2` |
| Glass refraction | `/assets/unsplash-photo-1557672172-298e090bd0f1.jpg` | `rotate-1` |
| Soft geometry | `/assets/unsplash-photo-1618005182384-a83a8bd57fbe.jpg` | `-rotate-3` |
| Field lines | `/assets/unsplash-photo-1620121692029-d088224ddc74.jpg` | `rotate-2` |
| Liquid light | `/assets/unsplash-photo-1604076913837-52ab5629fba9.jpg` | `-rotate-1` |

### GSAP scroll effects

Inside `gsap.context(..., sectionRef)`:

- **Pin** the centre content while the gallery scrolls past:

```tsx
ScrollTrigger.create({
  trigger: sectionRef.current,
  start: "top top",
  end: "bottom bottom",
  pin: pinRef.current,
  pinSpacing: false,
});
```

- **Scrubbed parallax** per column (each column drifts at its own speed):

```tsx
const parallax = (target, from, to) =>
  gsap.fromTo(
    target,
    { y: from },
    {
      y: to,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    },
  );

parallax(colOneRef.current, 80, -340);
parallax(colTwoRef.current, 260, -620);
```

Cleanup via `ctx.revert()`. A separate `useEffect` closes the lightbox on `Escape` (only attaches the `keydown` listener while `lightbox` is set).

### Layer 1 — pinned centre (`ref={pinRef}`, `z-10 flex h-screen flex-col items-center justify-center px-6 text-center`)

- Eyebrow row (`mb-5 flex items-center justify-center gap-4`): rule `h-px w-8 bg-stroke` + "Explorations" span `text-xs uppercase tracking-[0.3em] text-muted` + a second rule `h-px w-8 bg-stroke`.
- Heading `<h2 className="mb-4 text-4xl tracking-tight text-text-primary md:text-5xl">`: `Visual <span className="font-display italic">playground</span>`.
- Subtext `mb-10 max-w-md text-sm text-muted md:text-base`: "Off-hours experiments in colour, form, and motion — unfiltered and unfinished on purpose."
- `<GradientRingButton variant="pill" href="https://dribbble.com" target="_blank" rel="noreferrer">` reading "Follow on Dribbble" + an `↗` arrow span (`transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5`).

### Layer 2 — parallax columns

Wrapper `pointer-events-none absolute inset-0 z-20 overflow-hidden`; grid `mx-auto grid h-full max-w-[1400px] grid-cols-2 gap-12 px-6 md:gap-40 md:px-12`:

- Column one (`ref={colOneRef}`): `flex flex-col items-end gap-20 pt-[35vh] md:gap-32`.
- Column two (`ref={colTwoRef}`): `flex flex-col items-start gap-20 pt-[70vh] md:gap-32`.

Each renders `GalleryCard` for its items.

### `GalleryCard`

A `<button onClick={() => onOpen(item)} aria-label={`Open ${item.title}`}>`: `group pointer-events-auto block w-full max-w-[320px] {item.rotate} transition-transform duration-500 hover:rotate-0`. Inner span `block aspect-square overflow-hidden rounded-3xl border border-stroke bg-surface shadow-2xl shadow-black/40` wrapping `<img loading="lazy">` `h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110`.

### Lightbox

Inside `<AnimatePresence>`, when `lightbox` is set: a `motion.div` overlay `initial={{ opacity: 0 }}` / `animate={{ opacity: 1 }}` / `exit={{ opacity: 0 }}`, `transition={{ duration: 0.3 }}`, `onClick={() => setLightbox(null)}`, `className="fixed inset-0 z-[200] flex items-center justify-center bg-bg/90 p-6 backdrop-blur-xl"`, `role="dialog" aria-modal="true" aria-label={lightbox.title}`.

- `motion.figure`: `initial={{ scale: 0.92, opacity: 0 }}`, `animate={{ scale: 1, opacity: 1 }}`, `exit={{ scale: 0.95, opacity: 0 }}`, `transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}`, `onClick={(e) => e.stopPropagation()}`, `className="flex max-w-3xl flex-col items-center gap-5"`. Contains the image `max-h-[75vh] w-auto rounded-3xl border border-stroke object-contain` and a `<figcaption className="flex items-center gap-4 text-sm text-muted">` with the title span `font-display text-lg italic text-text-primary` followed by "Click anywhere to close".
- Close `<button aria-label="Close lightbox">`: `absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-stroke bg-surface text-text-primary transition-transform duration-300 hover:rotate-90`, containing `✕`.

## Section 6 — Stats (`src/components/Stats.tsx`)

`<section id="resume" className="bg-bg py-16 md:py-24">`; container `mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16`. Grid `grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-stroke`.

`STATS`: `{ value: 20, suffix: "+", label: "Years Experience" }`, `{ value: 95, suffix: "+", label: "Projects Done" }`, `{ value: 200, suffix: "%", label: "Satisfied Clients" }`. `COUNT_DURATION = 1600`.

Each stat is a `motion.div` keyed by label: `initial={{ opacity: 0, y: 30 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: "-80px" }}`, `transition={{ duration: 0.8, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}`, `className="flex flex-col items-center gap-4 text-center sm:px-8"`. Contains a `StatValue` and a label span `text-xs uppercase tracking-[0.3em] text-muted`.

### `StatValue`

Uses Framer Motion `useInView(ref, { once: true, margin: "-80px" })`. When in view, a `requestAnimationFrame` count-up over `1600ms` with cubic ease-out (`eased = 1 - Math.pow(1 - progress, 3)`) sets `display = Math.round(eased * value)`. Rendered as a span `font-display text-6xl tabular-nums leading-none text-text-primary md:text-7xl lg:text-8xl`, with the `display` number followed by the suffix in a `font-display italic` span.

## Section 7 — Contact / Footer (`src/components/Footer.tsx`)

`<footer id="contact" className="relative overflow-hidden bg-bg pb-8 pt-16 md:pb-12 md:pt-20">`.

`SOCIALS`: Twitter → `https://twitter.com`, LinkedIn → `https://linkedin.com`, Dribbble → `https://dribbble.com`, GitHub → `https://github.com`. `MARQUEE_REPEATS = 10`.

### Background video

Same `HERO_STREAM` via `useHlsVideo`, but flipped vertically. Wrapper `absolute inset-0` (`aria-hidden`):

- `<video autoPlay muted loop playsInline>`: `absolute left-1/2 top-1/2 h-auto w-auto min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-y-[-1] object-cover`.
- Heavier dark overlay: `absolute inset-0 bg-black/60`.
- Top fade: `absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg to-transparent`.

### GSAP marquee

Inside `gsap.context`, animate the marquee row: `gsap.to(marqueeRef.current, { xPercent: -50, duration: 40, ease: "none", repeat: -1 })`. Cleanup via `ctx.revert()`.

Container (`relative z-10`):

- Marquee strip: `overflow-hidden border-y border-white/10 py-6 md:py-8`, inner row `ref={marqueeRef}` `flex w-max whitespace-nowrap`. Renders `Array.from({ length: 10 })` of spans `px-4 font-display text-5xl italic text-text-primary/90 md:text-7xl` reading `BUILDING THE FUTURE ` followed by a bullet span `not-italic text-muted` ("•").

### CTA block (`mx-auto flex max-w-[1200px] flex-col items-center px-6 py-20 text-center md:py-28`)

- Eyebrow "Got a project in mind?": `mb-6 text-xs uppercase tracking-[0.3em] text-muted`.
- Heading `<h2 className="mb-10 text-4xl tracking-tight text-text-primary md:text-6xl">`: `Let's make something <span className="font-display italic">together</span>`.
- `<GradientRingButton variant="solid" href="mailto:hello@michaelsmith.com">` reading "hello@michaelsmith.com" + an `↗` arrow span (`aria-hidden`).

### Footer bar (`mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 border-t border-white/10 px-6 pt-8 sm:flex-row md:px-10 lg:px-16`)

- `<nav aria-label="Social links" className="flex items-center gap-5">` with each social `<a target="_blank" rel="noreferrer">`: `text-sm text-muted transition-colors duration-300 hover:text-text-primary`.
- Availability indicator (`flex items-center gap-3`): a green pulsing dot — outer `relative flex h-2.5 w-2.5` containing a pinging span `absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75` and a solid span `relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500` — followed by "Available for projects" span `text-sm text-muted`.
- Copyright `<p className="text-sm text-muted">© 2026 Michael Smith</p>`.

## File Structure

```
michael-smith-portfolio/
├─ index.html
├─ package.json
├─ tailwind.config.ts
├─ public/
│  └─ assets/                # 14 local Unsplash-derived JPGs (see lists above)
└─ src/
   ├─ main.tsx               # React root + BrowserRouter
   ├─ App.tsx                # Routes + AnimatePresence page transitions
   ├─ index.css              # Fonts, tokens, base styles, gradients, keyframes
   ├─ vite-env.d.ts
   ├─ hooks/
   │  └─ useHlsVideo.ts       # HLS hook + HERO_STREAM constant
   ├─ pages/
   │  ├─ Index.tsx            # Home page assembly + loading state
   │  └─ NotFound.tsx         # 404 page
   └─ components/
      ├─ LoadingScreen.tsx
      ├─ Navbar.tsx
      ├─ Hero.tsx
      ├─ GradientRingButton.tsx
      ├─ SectionHeader.tsx
      ├─ SelectedWorks.tsx
      ├─ Journal.tsx
      ├─ Explorations.tsx
      ├─ Stats.tsx
      ├─ Footer.tsx
      └─ PageTransition.tsx
```

## Color Palette

| Token | Tailwind | HSL channels | Notes |
|---|---|---|---|
| Background | `bg-bg` | `0 0% 4%` | Near-black page background |
| Surface | `bg-surface` | `0 0% 8%` | Cards, navbar pill |
| Text | `text-text-primary` | `0 0% 96%` | Primary text |
| Muted | `text-muted` | `0 0% 53%` | Secondary text |
| Stroke | `border-stroke` | `0 0% 12%` | Borders, dividers |
| Accent (var) | — | `0 0% 96%` | `--accent` (unused in components) |
| Accent gradient | `.accent-gradient` | — | `linear-gradient(90deg, #89aacc 0%, #4e85bf 100%)` |
| Selection | — | — | `background: #4e85bf` |
| Available dot | `bg-emerald-400` / `bg-emerald-500` | — | Pulsing status indicator |

## Assets

All project/journal/exploration images are served from `/assets/` (i.e. `public/assets/`):

```
unsplash-photo-1487958449943-2429e8be8625.jpg
unsplash-photo-1498050108023-c5249f4df085.jpg
unsplash-photo-1499951360447-b19be8fe80f5.jpg
unsplash-photo-1500648767791-00dcc994a43e.jpg
unsplash-photo-1503376780353-7e6692767b70.jpg
unsplash-photo-1541701494587-cb58502866ab.jpg
unsplash-photo-1545235617-9465d2a55698.jpg
unsplash-photo-1550684376-efcbd6e3f031.jpg
unsplash-photo-1557672172-298e090bd0f1.jpg
unsplash-photo-1558655146-d09347e92766.jpg
unsplash-photo-1561070791-2526d30994b5.jpg
unsplash-photo-1604076913837-52ab5629fba9.jpg
unsplash-photo-1618005182384-a83a8bd57fbe.jpg
unsplash-photo-1620121692029-d088224ddc74.jpg
```

The hero and footer share one HLS stream: `https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8`.

## Notes

- Forced dark theme: `<html class="dark">` and the body classes; there is no light-mode toggle.
- Smooth scroll is enabled globally via `html { scroll-behavior: smooth; }`, and the navbar provides scroll-spy + in-page anchor navigation (`#home`, `#work`, `#resume`, `#journal`, `#contact`).
- Page-level enter/exit transitions are handled by `PageTransition` + `AnimatePresence` in `App.tsx`.
- `npm run build` runs `tsc --noEmit && vite build`; `npm run lint` runs `tsc --noEmit`.
