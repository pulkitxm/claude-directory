# NHM — Natural History Museum Paleontology Landing

## Overview

Build a single-page, monochrome landing page for the Natural History Museum's paleontology collection. The page is one continuous scroll with three sections — a full-viewport hero with a delayed background video and a geometric "NHM" logotype, an "Explore Our World" intro section, and a dark "Ancient Collection" chapter browser featuring an SVG-filter sand/dissolve image transition. The entire page is a single `App.tsx` component plus a `SandTransitionImage` helper and a `LeafIcon` helper in the same file.

## Tech Stack

- **Framework:** React 19 (`react`, `react-dom` `^19.0.1`) with `StrictMode`
- **Build tool:** Vite 6 (`vite` `^6.2.3`, `@vitejs/plugin-react` `^5.0.4`)
- **Language:** TypeScript (`typescript` `~5.8.2`, `@types/react` `^19.0.10`, `@types/react-dom` `^19.0.4`)
- **Styling:** Tailwind CSS 4 (`tailwindcss` `^4.1.14`, `@tailwindcss/vite` `^4.1.14`) — CSS-first config via `@theme`
- **Animation:** Motion / Framer Motion (`motion` `^12.23.24`), imported from `motion/react`
- **Icons:** Lucide (`lucide-react` `^0.546.0`)
- **Fonts (Google Fonts):** Inter (sans, weights 300/400/500/600) and JetBrains Mono (mono, weights 400/500)
- **Notable techniques:** delayed background video reveal, auto-cycling chapter carousel, SVG `feTurbulence` / `feDisplacementMap` sand-dissolve filter driven by `requestAnimationFrame`, geometric polygon logotype animated per-polygon, `whileInView` scroll reveals.

## Global Setup

### `index.html`

- `lang="en"`, `<meta charset="UTF-8" />`, viewport meta `width=device-width, initial-scale=1.0`.
- Description meta: `NHM — Natural History Museum. Exploring the story of life on earth through science, discovery and wonder.`
- Title: `NHM — Natural History Museum`
- Root: `<div id="root"></div>` and `<script type="module" src="/src/main.tsx"></script>`.

### `src/main.tsx`

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

### `src/index.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
}

@layer base {
  body {
    background-color: #fcfcfc;
    color: #111;
    overflow-x: hidden;
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }

  ::selection {
    background-color: #000;
    color: #fff;
  }
}

@layer utilities {
  .text-mega {
    font-size: 21vw;
    line-height: 0.75;
    letter-spacing: -0.04em;
  }
}
```

**Global styling summary:** background `#fcfcfc`, text `#111`, selection `#000` background / `#fff` text, `overflow-x: hidden`, default font `font-sans` (Inter), antialiased. The `.text-mega` utility (`font-size: 21vw`, `line-height: 0.75`, `letter-spacing: -0.04em`) is defined though not required by every layout.

## Data, State & Constants

### Imports

```tsx
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, usePresence } from "motion/react";
import type { Variants } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Bone,
  BookOpen,
  Dna,
  Gem,
  Leaf,
  Plus,
} from "lucide-react";
```

### Asset URLs (local, vendored under `/assets/`)

> Note: assets are served locally from `/assets/...`, not from a remote CDN. The original brief referenced Cloudinary URLs; the project vendors them locally with these exact (lowercase, case-sensitive) filenames.

```tsx
const VIDEO_URL =
  "/assets/magnific_use-img-2-as-the-exact-ba_Piu3X0W42C_wnrc8f.mp4";

const PTERODACTYL_URL =
  "/assets/ChatGPT_Image_May_23_2026_12_24_44_PM_1_lv1dne.png";
```

### Chapters data

```tsx
const chaptersData = [
  { name: "Age of Dinosaurs",         image: "/assets/01_udnber.png" },
  { name: "Fossils of Ancient Life",  image: "/assets/02_pmvxxl.png" },
  { name: "Reptiles of the Mesozoic", image: "/assets/03_hcp3jc.png" },
  { name: "Marine Fossil Gallery",    image: "/assets/04_get63z.png" },
  { name: "Prehistoric Giants",       image: "/assets/05_kz1tyu.png" },
];
```

### Other constants

```tsx
const NAV_LINKS = ["Visit", "Exhibitions", "Discover", "Learn", "About"];

const ACTION_PILLS = [
  { icon: Bone, label: "Dinosaurs" },
  { icon: Dna, label: "Ancient Life" },
  { icon: Gem, label: "Minerals" },
  { icon: Leaf, label: "Fossils" },
  { icon: BookOpen, label: "Learn More" },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
```

### Component state (inside `App`)

```tsx
const [showVideo, setShowVideo] = useState(false);
const [activeChapter, setActiveChapter] = useState(2); // starts at "Reptiles of the Mesozoic"
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
```

- `showVideo` flips to `true` after a **2800ms** `setTimeout` (cleared on unmount).
- `activeChapter` auto-cycles every **3500ms** via `setInterval`, wrapping `(prev + 1) % 5` (cleared on unmount).

## Animation Variants

```tsx
const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const fadeUpTransition = { duration: 0.8, ease: "easeOut" as const };

const letterBlock: Variants = {
  initial: { y: 120, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 1.2, ease: EASE },
  },
};

const logoVariants: Variants = {
  initial: { scale: 1.03 },
  animate: {
    scale: 1,
    transition: {
      duration: 1.2,
      ease: EASE,
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const staggerHeader: Variants = {
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const staggerLeft: Variants = {
  animate: { transition: { staggerChildren: 0.15, delayChildren: 0.6 } },
};

const staggerRight: Variants = {
  animate: { transition: { staggerChildren: 0.15, delayChildren: 0.9 } },
};

const staggerPills: Variants = {
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};
```

## Layout

Root element: `<main className="w-full">` containing three `<section>` blocks.

---

## Section 1 — Hero (full viewport height)

Container: `relative flex min-h-screen w-full flex-col overflow-hidden`

### 1D. Background video

Rendered first (sits behind everything), gated by `showVideo` inside `AnimatePresence`.

- Wrapper `motion.div`: `initial={{ opacity: 0 }}`, `animate={{ opacity: 1 }}`, `transition={{ duration: 1.4, ease: "easeOut" }}`, class `pointer-events-none absolute top-0 left-0 z-0 h-full w-full`.
- `<video>`: `autoPlay loop muted playsInline`, `src={VIDEO_URL}`, class `h-full w-full object-cover`.

### 1A. Header — NHM logotype

`motion.header` with `initial="initial" animate="animate" variants={staggerHeader}`, class `relative z-20 px-6 pt-6 md:px-16`.

- `motion.h1` uses `variants={logoVariants}`, class `w-full`. Contains an `<span className="sr-only">NHM — Natural History Museum</span>` plus the inline SVG.
- SVG: `viewBox="0 0 840 100"`, class `w-full overflow-hidden fill-[#111]`, `aria-hidden="true"`.
- Letters are data-driven from `LOGO_LETTERS`; each letter is a `<g transform={letter.translate}>`, and each polygon is a `motion.polygon` with `variants={letterBlock}` (slides up from `y: 120`).

```tsx
const LOGO_LETTERS: { translate: string; polygons: string[] }[] = [
  {
    // N
    translate: "translate(0,0)",
    polygons: [
      "0,0 14,0 14,100 0,100",
      "200,0 214,0 214,100 200,100",
      "0,0 33,0 214,100 181,100",
    ],
  },
  {
    // H
    translate: "translate(280,0)",
    polygons: [
      "0,0 14,0 14,100 0,100",
      "200,0 214,0 214,100 200,100",
      "14,43 200,43 200,57 14,57",
    ],
  },
  {
    // M
    translate: "translate(560,0)",
    polygons: [
      "0,0 14,0 14,100 0,100",
      "266,0 280,0 280,100 266,100",
      "0,0 26,0 153,100 127,100",
      "254,0 280,0 153,100 127,100",
    ],
  },
];
```

### 1B. Sub-nav bar

`motion.div` with `variants={fadeUp} transition={fadeUpTransition}`, class `mt-8 flex items-start justify-between gap-3 font-mono text-[10px] tracking-[0.2em] uppercase md:text-[11px]`.

- **Left column** (`w-[15%]`): three `<p>` lines — `Natura` / `History` / `Museum`.
- **Arrow separator** (`hidden w-[5%] justify-center md:flex`): Lucide `ArrowRight`, `size={14}`, `strokeWidth={1}`, class `text-gray-400`.
- **Center column** (`flex-1 leading-relaxed font-mono text-gray-800 md:flex-none md:w-[30%]`): the copy "Exploring the story of life on earth through science, discovery and wonder." split into 3 lines on desktop (`hidden md:block`) and 4 lines on mobile (`md:hidden`):
  - Desktop: `Exploring the story of life` / `on earth through science,` / `discovery and wonder.`
  - Mobile: `Exploring the story` / `of life on earth` / `through science,` / `discovery and wonder.`
- **Arrow separator** (same as above, `hidden w-[5%] justify-center md:flex`).
- **Right column / nav** (`hidden w-[15%] md:block`): `<ul className="space-y-1 text-gray-800">` mapping `NAV_LINKS` — Visit, Exhibitions, Discover, Learn, About — each an `<a href="#">` with class `transition-colors hover:text-black hover:underline`.
- **Hamburger button** (far right, `md:hidden`): `<button type="button">` with `aria-label` toggling between `Open menu` / `Close menu`, `aria-expanded={isMobileMenuOpen}`, `onClick` toggling `isMobileMenuOpen`, class `group z-60 flex flex-col items-end gap-[6px] py-2 pl-4 md:hidden`.
  - Two `<span>` bars, each base class `h-[1.5px] bg-black transition-all duration-300`.
  - When open: first bar `w-8 translate-y-[3.75px] rotate-45`; second bar `w-8 -translate-y-[3.75px] -rotate-45` (forms an X).
  - When closed: first bar `w-8 group-hover:w-6`; second bar `w-8 group-hover:w-10`.

### 1C. Mobile menu overlay

`AnimatePresence` wrapping a `motion.div` shown when `isMobileMenuOpen`.

- `initial={{ y: -20, opacity: 0 }}`, `animate={{ y: 0, opacity: 1 }}`, `exit={{ y: -20, opacity: 0 }}`, `transition={{ duration: 0.4, ease: EASE }}`.
- Class: `absolute top-full right-0 left-0 z-50 border-b border-gray-200 bg-[#fcfcfc] shadow-xl md:hidden`.
- `<nav className="px-6 py-10">` with `<ul className="space-y-6 font-mono text-sm tracking-[0.2em] uppercase">` mapping the same `NAV_LINKS`; each link's `onClick` closes the menu (`setIsMobileMenuOpen(false)`), class `transition-colors hover:text-black hover:underline`.

### Hero body wrapper

`<div className="relative z-10 flex w-full flex-1 items-start justify-between">` holds the left and right sidebars.

### 1E. Left sidebar content

`motion.div` with `initial="initial" animate="animate" variants={staggerLeft}`, class `mt-20 w-[320px] px-10 sm:mt-28 md:mt-32 md:px-16`.

- **Section indicator** (`motion.div variants={fadeUp}`, class `flex items-center gap-4 font-mono text-xs`): `<span>01</span>` + `<span className="h-[1.5px] w-16 bg-black/20" />`.
- **Headline** (`motion.h2 variants={fadeUp}`, class `mt-6 text-[3.5rem] leading-[1] font-normal tracking-tight md:text-[5rem]`): `TIMELESS` `<br />` `WONDERS`.
- **Description** (`motion.p variants={fadeUp}`, class `mt-6 w-[240px] text-[13px] leading-[1.6] text-gray-700 md:text-[14px]`): `Step into the natural world and` / `discover the stories written` / `millions of years ago.` (line breaks between each phrase).
- **CTA button** (`motion.div variants={fadeUp}`, class `mt-10`): a `<button type="button">` with class `group relative overflow-hidden rounded-md border border-[#1a1a1a] bg-[#1a1a1a] px-6 py-3.5 shadow-sm transition-all duration-300 hover:-translate-y-[0.5px] hover:shadow-[3px_3px_0px_rgba(17,17,17,0.5)] active:translate-y-0 active:shadow-sm`.
  - **Sliding background panel** (`<span aria-hidden="true">`): `absolute inset-0 -translate-x-[101%] bg-[#fcfcfc] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0`.
  - **Inner content** (`<span className="relative flex items-center gap-3">`):
    - `LeafIcon` with class `h-5 w-5 text-white transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12 group-hover:-translate-y-1 group-hover:text-[#111]`.
    - Label `<span>Explore Now</span>` with class `text-[15px] font-medium text-white transition-colors duration-500 group-hover:text-[#111]`.

### 1F. Right sidebar (hidden on mobile)

`motion.div` with `initial="initial" animate="animate" variants={staggerRight}`, class `mt-12 mr-10 hidden w-[200px] flex-col gap-10 md:mt-20 md:mr-16 md:flex`.

- **Specimen info** (`motion.div variants={fadeUp}`):
  - `<h3 className="font-mono text-[10px] font-bold tracking-widest uppercase">Tyrannosaurus Rex</h3>`
  - `<p className="mt-2 text-[12px] leading-[1.6] text-gray-600">` — `Late Cretaceous period` / `68-66 million years ago` (with `<br />`).
- **Stats** (`motion.div variants={fadeUp}`, class `flex gap-10`): two stacks.
  - Label `<p className="font-mono text-[10px] tracking-widest text-gray-500 uppercase">Length</p>` + value `<p className="mt-1 text-[13px] font-medium">12.3 m</p>`.
  - Label `Height` + value `4.0 m` (same classes).
- **View Details button** (`motion.button type="button" variants={fadeUp}`, class `group flex items-center gap-4`):
  - Circle `<span className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-400 transition-colors duration-300 group-hover:border-black group-hover:bg-[#111]">` containing Lucide `Plus`, `size={16}`, `strokeWidth={1.5}`, class `transition-colors duration-300 group-hover:text-white`.
  - Label `<span className="font-mono text-[10px] font-bold tracking-widest uppercase">View Details</span>`.

### 1G. Bottom-left "Scroll to explore"

`motion.div`: `initial={{ opacity: 0, y: 20 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}`, class `absolute bottom-10 left-[2.5rem] z-10 hidden items-center gap-4 md:left-[4rem] md:flex`.

- Circle `<span className="flex h-12 w-12 items-center justify-center gap-[4px] rounded-full border border-gray-300">` containing two thin vertical lines (`<span className="h-[12px] w-[1px] bg-gray-600" />` × 2) forming a pause icon.
- Label `<span className="font-mono text-[10px] font-semibold tracking-widest text-gray-500 uppercase">Scroll to explore</span>`.

---

## Section 2 — Explore Our World

Container: `relative z-20 flex min-h-[75vh] w-full flex-col items-center bg-[#fcfcfc] pt-24 pb-0 md:min-h-screen md:pt-32`

### 2A. Section label

`<p className="mb-12 font-mono text-[10px] tracking-[0.2em] md:text-[11px]">`:
- `<span className="text-gray-500">[ 02 ]</span>` then `{" "}` then `<span className="font-bold text-gray-900 uppercase">Explore Our World</span>`.

### 2B. Main heading

`motion.h2`: `initial={{ y: 40, opacity: 0 }}`, `whileInView={{ y: 0, opacity: 1 }}`, `viewport={{ once: true, margin: "-100px" }}`, `transition={{ duration: 1, ease: EASE }}`, class `mb-12 max-w-[1000px] px-6 text-center text-[2.2rem] leading-[1.1] font-medium tracking-tight text-[#111] md:mb-16 md:text-[3.5rem] lg:text-[4.2rem]`.

Copy: `Unearth the stories of our planet's past` + `<br className="hidden md:block" />` + ` through fossils, minerals, and ancient wonders.` (the desktop-only break falls after "past").

### 2C. Action pills

`motion.div`: `initial="initial"`, `whileInView="animate"`, `viewport={{ once: true }}`, `variants={staggerPills}`, class `mb-10 flex flex-wrap justify-center gap-3 px-6 md:mb-24 md:gap-4`.

Maps `ACTION_PILLS` to `motion.button type="button"` items with `variants={fadeUp} transition={fadeUpTransition}`, class `flex items-center gap-2 rounded-full border border-gray-300 bg-white/50 px-5 py-2.5 text-[11px] font-medium tracking-wider text-gray-800 uppercase backdrop-blur-sm transition-colors duration-300 hover:border-black hover:bg-black hover:text-white`. Each contains the Lucide icon (`size={14}`, `strokeWidth={2}`) plus the label:

1. `Bone` + Dinosaurs
2. `Dna` + Ancient Life
3. `Gem` + Minerals
4. `Leaf` + Fossils
5. `BookOpen` + Learn More

### 2D. Spacer

`<div className="min-h-[220px] w-full md:min-h-[450px]" />` — provides room for the Section 3 pterodactyl image to overlap upward.

### 2E. Bottom text

`<div className="pointer-events-none absolute bottom-0 left-0 flex w-full justify-between px-8 pb-8 md:px-16 md:pb-12">` with two `<p>` elements (both `hidden font-mono text-[10px] font-medium tracking-widest text-gray-500 uppercase md:block`):
- Left: `WE DON'T JUST TELL STORIES.`
- Right: `PALEONTOLOGY (C) 2026`

---

## Section 3 — Ancient Collection (dark)

Container: `relative z-30 flex w-full flex-col bg-[#0a0a0a] text-white`

### 3A. Pterodactyl image (overlapping upward)

`motion.img` with `src={PTERODACTYL_URL}`, `alt="Pterodactyl fossil skeleton in flight"`:
- `initial={{ y: "-65%", x: "-50%", opacity: 0 }}`, `whileInView={{ y: "-78%", x: "-50%", opacity: 1 }}`, `viewport={{ once: true, margin: "100px" }}`, `transition={{ duration: 1.4, ease: "easeOut" }}`.
- Class: `pointer-events-none absolute top-0 left-1/2 z-0 w-[160vw] max-w-none md:w-[1100px]`.

### 3B. Heading area

`<div className="z-10 mb-16 flex flex-col justify-between gap-12 px-8 pt-32 md:px-16 md:pt-48 xl:flex-row">`.

**Left — main heading** `<h2 className="max-w-[860px] text-[1.8rem] leading-[1.15] font-medium tracking-tight text-white md:text-[3rem] lg:text-[3.8rem] xl:text-[4rem]">`:
- Text `Curated from millions of years of wonder` then an inline icon group `<span className="mx-2 inline-flex translate-y-[-4px] gap-2 align-middle md:mx-4 md:gap-3">` then `& discovery.`
- The icon group maps `[Bone, Dna, Leaf]`; each is `<span className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-600 bg-black text-gray-400 transition-colors duration-300 hover:border-white hover:bg-white hover:text-black md:h-14 md:w-14">` containing the icon at `size={22}`, `strokeWidth={1.5}`.

**Right — tagline + pills** `<div className="shrink-0 xl:text-right">`:
- Tagline `<p className="mb-6 font-mono text-[9px] leading-relaxed tracking-widest text-gray-400 uppercase md:text-[10px]">` — `WE DON'T JUST DISPLAY FOSSILS` / `WE SHARE EARTH'S STORY` (with `<br />`).
- Pill row `<div className="flex flex-wrap gap-3 xl:justify-end">` mapping `["Educational", "Authentic", "Inspiring"]` to `<button type="button">` items with class `rounded-full border border-gray-600 px-5 py-2 font-mono text-[9px] tracking-widest text-gray-300 uppercase transition-colors duration-300 hover:border-white hover:bg-white hover:text-black`.

### 3C. Two-column panel

Preceded by a divider `<div className="z-10 h-[1px] w-full bg-gray-800" />`. Wrapper: `<div className="z-10 flex w-full flex-col md:flex-row">`.

**Left panel — specimen viewer** (`relative flex min-h-[400px] w-full flex-col justify-between border-b border-gray-800 p-8 md:min-h-[500px] md:w-[35%] md:border-r md:border-b-0`):
- Top: `<p className="relative z-10 text-xl tracking-[0.3em] text-gray-500">***</p>`.
- Center: `<div className="absolute inset-0">` wrapping `<AnimatePresence mode="wait">` and a `SandTransitionImage` keyed by `chaptersData[activeChapter].image`, with `src`/`alt` from the active chapter and class `absolute inset-0 m-auto h-[80%] w-[80%] object-contain mix-blend-lighten`.
- Bottom — chapter counter `<div className="relative z-10 flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase">`:
  - Animated numeral inside `<span className="relative block h-[14px] w-[18px] overflow-hidden text-[#888]">` → `AnimatePresence mode="wait"` → `motion.div` keyed by `activeChapter`, `initial={{ y: 14 }}`, `animate={{ y: 0 }}`, `exit={{ y: -14 }}`, `transition={{ duration: 0.4, ease: EASE }}`, class `absolute inset-0 leading-[14px]`, rendering `0{activeChapter + 1}`.
  - Divider `<span className="text-[#333]">/</span>` and `<span className="text-[#888]">05</span>`.

**Right panel — chapter list** (`w-full md:w-[65%]`):
- Top bar `<div className="flex items-center justify-between border-b border-gray-800 p-8 font-mono text-[10px] tracking-widest text-gray-400 uppercase">`:
  - `<span>Explore the past. Understand the present.</span>`
  - Animated chapter label inside `<span className="relative block h-[14px] w-[72px] overflow-hidden text-right">` → `AnimatePresence mode="wait"` → `motion.span` keyed by `activeChapter`, `initial={{ y: 14 }}`, `animate={{ y: 0 }}`, `exit={{ y: -14 }}`, `transition={{ duration: 0.4, ease: EASE }}`, class `absolute inset-0 leading-[14px]`, rendering `Chapter 0{activeChapter + 1}`.
- Chapter list: maps `chaptersData` to `<button type="button" onClick={() => setActiveChapter(index)}>` with base class `flex w-full items-center justify-between border-b border-gray-800/80 px-8 py-8 text-left transition-colors duration-300`, plus `text-white` when active or `text-[#444] hover:text-[#999]` when inactive.
  - Chapter name `<span className="text-2xl font-medium tracking-tight md:text-[2rem]">{chapter.name}</span>`.
  - Active item shows, inside `AnimatePresence`, a `motion.span` (`initial={{ opacity: 0, scale: 0.6 }}`, `animate={{ opacity: 1, scale: 1 }}`, `exit={{ opacity: 0, scale: 0.6 }}`, `transition={{ duration: 0.3, ease: "easeOut" }}`) wrapping Lucide `ArrowUpRight` (`size={22}`, `strokeWidth={1}`, class `text-gray-400`).

### 3D. Bottom footer

- Divider `<div className="z-10 h-[1px] w-full bg-gray-800" />`.
- `<p className="z-10 bg-[#0a0a0a] px-8 py-8 font-mono text-[10px] tracking-widest text-gray-500 uppercase">DIGGING INTO OUR PLANET'S PAST</p>`.

---

## Helper Components

### `SandTransitionImage` — SVG-filter sand/particle dissolve

A custom component creating a sand/particle dissolve effect via an SVG filter chain, driven by `requestAnimationFrame`. It uses `usePresence()` from `motion/react` so it cooperates with `AnimatePresence` (delaying removal until the exit animation finishes via `safeToRemove()`). A unique `filterId` is generated per instance via a module-level counter held in `useRef`.

- **Duration:** `900ms`.
- **Easing:** entering = quartic ease-out `1 - Math.pow(1 - t, 4)`; exiting = cubic `Math.pow(t, 3)`.
- **Dissolve mapping** (`0` = fully resolved image, `1` = fully scattered): alpha `Math.max(0, 1 - dissolve * 1.2)`.
- **Filter chain (`feTurbulence` → `feDisplacementMap` → `feOffset` → `feGaussianBlur` → `feColorMatrix`):**
  - `feTurbulence`: `type="fractalNoise"`, `baseFrequency="1.8"`, `numOctaves="4"`, `result="sandNoise"`.
  - `feDisplacementMap`: `in="SourceGraphic"`, `in2="sandNoise"`, `scale` driven to `150 * dissolve`, `xChannelSelector="R"`, `yChannelSelector="G"`, `result="displaced"`.
  - `feOffset`: `dx` = `(entering ? -30 : 30) * dissolve`, `dy` = `(entering ? -80 : 120) * dissolve`, `result="drifted"`.
  - `feGaussianBlur`: `stdDeviation` = `6 * dissolve`, `result="softened"`.
  - `feColorMatrix`: `type="matrix"`, values `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${alpha} 0`.
- The hidden `<svg aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">` holds the `<filter>` (`x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB"`).
- The `<img>` has `crossOrigin="anonymous"`, `referrerPolicy="no-referrer"`, the passed `className`, and `style={{ filter: \`url(#${filterId})\` }}`.

```tsx
let sandFilterInstance = 0;

function SandTransitionImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [isPresent, safeToRemove] = usePresence();
  const filterId = useRef(`sand-filter-${++sandFilterInstance}`).current;
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const offsetRef = useRef<SVGFEOffsetElement>(null);
  const blurRef = useRef<SVGFEGaussianBlurElement>(null);
  const colorRef = useRef<SVGFEColorMatrixElement>(null);

  useEffect(() => {
    const DURATION = 900;
    const entering = isPresent;
    let start: number | null = null;
    let frame = 0;

    // dissolve: 0 = fully resolved image, 1 = fully scattered into sand
    const applyDissolve = (dissolve: number) => {
      const alpha = Math.max(0, 1 - dissolve * 1.2);
      displacementRef.current?.setAttribute("scale", String(150 * dissolve));
      offsetRef.current?.setAttribute("dx", String((entering ? -30 : 30) * dissolve));
      offsetRef.current?.setAttribute("dy", String((entering ? -80 : 120) * dissolve));
      blurRef.current?.setAttribute("stdDeviation", String(6 * dissolve));
      colorRef.current?.setAttribute(
        "values",
        `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${alpha} 0`,
      );
    };

    const tick = (now: number) => {
      if (start === null) start = now;
      const t = Math.min(1, (now - start) / DURATION);
      const eased = entering ? 1 - Math.pow(1 - t, 4) : Math.pow(t, 3);
      applyDissolve(entering ? 1 - eased : eased);
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else if (!entering) {
        safeToRemove();
      }
    };

    applyDissolve(entering ? 1 : 0);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isPresent, safeToRemove]);

  // ...renders the hidden <svg> filter + the <img> styled with filter: url(#filterId)
}
```

### `LeafIcon` — custom CTA leaf glyph

A stylized leaf SVG built from 4 paths.

```tsx
function LeafIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 21V9" />
      <path d="M12 13C8.2 13 5.2 10.6 4.5 6.5C8.6 5.9 11.5 8.4 12 13Z" />
      <path d="M12 13C15.8 13 18.8 10.6 19.5 6.5C15.4 5.9 12.5 8.4 12 13Z" />
      <path d="M12 9C12 5.8 13.2 3.8 15.5 2.8" />
    </svg>
  );
}
```

## Color Palette

- `#fcfcfc` — off-white page background.
- `#111` — near-black text / logo fill.
- `#1a1a1a` — CTA button background/border.
- `#0a0a0a` — dark Section 3 background.
- `#888` / `#333` / `#444` / `#999` — dark-section muted grays for counters and inactive chapter rows.
- Tailwind gray scale `gray-200` through `gray-900` for borders, labels, and body text.
- Strictly monochrome black / white / gray — no purple, indigo, or other hues.

## Key Design Notes

- **Typography hierarchy:** large display headings (`text-[2.2rem]` up to `text-[5rem]` / `text-[4.2rem]`), mono labels (`text-[9px]`–`text-[11px]`), body text (`text-[12px]`–`text-[14px]`). Inter for headings/body, JetBrains Mono for labels.
- **Spacing:** broadly an 8px base system.
- **Transitions:** most hover transitions run 300–700ms. The CTA slide panel and letter/heading animations use the cubic-bezier `EASE = [0.16, 1, 0.3, 1]` (`cubic-bezier(0.16,1,0.3,1)`).
- **Structure:** the page is entirely one `App.tsx` component plus the `SandTransitionImage` and `LeafIcon` helpers in the same file.

## File Structure

```
nhm-paleontology-landing/
├── index.html
├── package.json
└── src/
    ├── main.tsx
    ├── index.css
    └── App.tsx
```
