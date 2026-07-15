# Axion Studio — Design Agency Landing Page

## Overview

Build a single-page landing site for "Axion Studio", a strategy-led design agency. The page is composed of three stacked sections — a full-viewport animated-shader hero, an introductory "about" section, and a featured case-studies section — rendered as a React + Vite + TypeScript app styled with Tailwind CSS. Match every concrete detail below exactly.

## Tech Stack

- **Framework:** React 18 (`react` `^18.3.1`, `react-dom` `^18.3.1`) + TypeScript (`~5.6.3`) + Vite (`^5.4.11`, via `@vitejs/plugin-react` `^4.3.4`)
- **Styling:** Tailwind CSS `^3.4.17` (default config, no custom theme extensions), with `postcss` `^8.4.49` and `autoprefixer` `^10.4.20`
- **Shaders:** `shaders` `^2.5.129` — the hero background uses `Shader`, `Swirl`, `ChromaFlow`, `FlutedGlass`, and `FilmGrain` imported from `shaders/react`. (`pixi.js` `^8.0.0` is a required peer dependency of `shaders`.)
- **Icons:** `lucide-react` `^0.515.0` — `ArrowRight`, `Clock`, `Menu`, `X`
- **Font:** system default (no custom font loaded)
- **Notable techniques:** animated WebGL shader stack, a hover "text-roll" CTA interaction, a live London wall-clock, a slide-up mobile bottom-sheet menu, and CSS hover-expanding pill buttons over autoplaying video
- **Testing:** `playwright` `^1.60.0`; a `verify` script (`node scripts/verify.mjs`)

## Global Setup

### `index.html`

- `lang="en"`, charset `UTF-8`, viewport `width=device-width, initial-scale=1.0`.
- `<title>`: `Axion Studio — We craft digital experiences`
- Meta description: `Axion Studio is a strategy-led design agency crafting digital experiences for brands ready to dominate their category online.`
- Root `<div id="root">` plus `<script type="module" src="/src/main.tsx">`.

### Entry (`src/main.tsx`)

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### Root component (`src/App.tsx`)

A single `<main>` rendering `<Hero />`, `<About />`, `<CaseStudies />` in order.

### Global styles (`src/index.css`)

Standard Tailwind directives plus two utility classes (defined but not actively used in the current layout):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

.liquid-glass {
  position: relative;
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  box-shadow: inset 0 0 12px rgba(255, 255, 255, 0.25);
}

.liquid-glass::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.08)
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

.liquid-glass-strong {
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  box-shadow: inset 0 0 12px rgba(255, 255, 255, 0.25);
}
```

### Shared conventions

- **Max content width:** `1440px`, centered with `mx-auto` (`max-w-[1440px]`).
- **Responsive breakpoints:** default Tailwind (`sm:` 640px, `md:` 768px, `lg:` 1024px, `xl:` 1280px).
- **Signature easing token** (reused across components): `ease-[cubic-bezier(0.25,0.1,0.25,1)]` with `duration-500` unless noted otherwise.

## Shared Components

### `RollButton` (`src/components/RollButton.tsx`)

A pill CTA with the signature hover interactions: the label "rolls up" (a duplicated copy slides into view) while the arrow rotates `-45deg`.

**Props:**

| Prop | Type | Purpose |
| --- | --- | --- |
| `label` | `string` | Button text |
| `className` | `string` | Background, text size, and padding of the pill |
| `circleClassName` | `string` | Sizing of the circle holding the arrow |
| `arrowClassName` | `string` | Color of the arrow inside the circle |
| `arrowSize?` | `number` | Defaults to `14` |
| `onClick?` | `() => void` | Optional click handler |

**Structure:**

- Outer `<button type="button">`: `group flex items-center gap-3 rounded-full font-medium transition-colors duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]` plus the passed `className`.
- Label wrapper: `flex h-[20px] flex-col overflow-hidden`. Inside, an inner column `flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2` containing the label **twice** (second copy `aria-hidden="true"`), each in `flex h-[20px] items-center whitespace-nowrap`.
- Arrow circle: `flex items-center justify-center rounded-full bg-white` plus `circleClassName`. Inside, a Lucide `ArrowRight` (`size={arrowSize}`) with `transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45` plus `arrowClassName`.

### `PartnerIcon` (`src/components/PartnerIcon.tsx`)

A starburst/compass mark shown inside the certified-partner badge. Accepts an optional `className`. Renders an inline `<svg>` (`xmlns="http://www.w3.org/2000/svg"`, `viewBox="0 0 100 100"`, `aria-hidden="true"`) with a single `<path>`:

```tsx
<path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z" />
```

### `useLondonTime` hook (`src/hooks/useLondonTime.ts`)

Returns the live London wall-clock time in `HH:MM`, updated every second.

```ts
import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function londonTime(): string {
  return formatter.format(new Date());
}

export default function useLondonTime(): string {
  const [time, setTime] = useState(londonTime);

  useEffect(() => {
    const id = window.setInterval(() => setTime(londonTime()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}
```

## Section 1: Hero (`src/components/Hero.tsx`)

Full viewport height: `<section className="relative flex min-h-screen flex-col overflow-hidden bg-[#EFEFEF]">`.

### Shader background

A full-screen animated shader overlay: `<Shader className="pointer-events-none absolute inset-0 z-10">` containing this exact stack (imported from `shaders/react`):

```tsx
import { ChromaFlow, FilmGrain, FlutedGlass, Shader, Swirl } from "shaders/react";

<Shader className="pointer-events-none absolute inset-0 z-10">
  <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
  <ChromaFlow
    baseColor="#ffffff"
    downColor="#ff5f03"
    leftColor="#ff5f03"
    rightColor="#ff5f03"
    upColor="#ff5f03"
    momentum={13}
    radius={3.5}
  />
  <FlutedGlass
    aberration={0.61}
    angle={31}
    frequency={8}
    highlight={0.12}
    highlightSoftness={0}
    lightAngle={-90}
    refraction={4}
    shape="rounded"
    softness={1}
    speed={0.15}
  />
  <FilmGrain strength={0.05} />
</Shader>
```

### Layout

After the shader, render `<Navbar />`, then a flexible spacer `<div className="flex-1" />`, then the hero content — this pins the content to the bottom of the viewport.

### Hero content

Container: `relative z-20 mx-auto w-full max-w-[1440px] px-5 pb-14 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20`.

- **Small label** `<p>`: text `Axion Studio` — `mb-5 text-[13px] tracking-wide text-gray-900 sm:mb-8 sm:text-[14px]`.
- **Headline** `<h1>`: `text-[length:clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 sm:text-[length:clamp(2.5rem,5vw,4.2rem)]`. Copy with line breaks hidden on mobile (each `<br className="hidden sm:block" />` paired with a `<span className="sm:hidden"> </span>` fallback space):
  - `We craft digital experiences`
  - `for brands ready to dominate`
  - `their category online.`
- **CTA row** `<div className="mt-8 flex flex-col items-start gap-4 sm:mt-12 sm:flex-row sm:items-center sm:gap-5">`:
  - **Orange `RollButton`** — `label="Start a project"`, `className="bg-[#F26522] py-2 pl-5 pr-2 text-[13px] text-white hover:bg-[#e05a1a] sm:pl-6 sm:text-[14px]"`, `circleClassName="h-7 w-7 sm:h-8 sm:w-8"`, `arrowClassName="text-[#F26522]"`.
  - **Partner badge** — an `<a href="#">`: `flex items-center gap-2 rounded-[4px] bg-white px-3 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-shadow duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] sm:gap-2.5 sm:px-4 sm:py-2.5`. Contains:
    - `<PartnerIcon className="h-5 w-5 fill-current text-[#E8704E] sm:h-6 sm:w-6" />`
    - `<span>` `Certified Partner` — `text-[13px] font-medium text-gray-900 sm:text-[14px]`
    - `<span>` `Featured` — `rounded bg-gray-900 px-1.5 py-0.5 text-[10px] text-white sm:px-2 sm:text-[11px]`

## Navbar (`src/components/Navbar.tsx`)

State: `menuOpen` (`useState(false)`); the live time comes from `useLondonTime()`. A `useEffect` locks `document.body.style.overflow` to `"hidden"` while the menu is open and restores it on cleanup. Nav-link list constant: `["Projects", "Studio", "Journal", "Connect"]`.

Header: `<header className={`relative ${menuOpen ? "z-[60]" : "z-20"}`}>`.

### Pill navbar

Outer container: `relative z-[70] mx-auto max-w-[1440px] p-2 sm:p-3`. Inside, a `<nav>`: `flex items-center justify-between rounded-full bg-white p-[5px]`.

**Left group** (`flex items-center gap-6 pl-0 md:pr-2`):

- **Logo** — `<a href="#" aria-label="Axion Studio home">` styled `flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 sm:h-10 sm:w-10`, containing a `<span>` with text `AX` (`text-[10px] font-bold tracking-tight text-white sm:text-[11px]`).
- **Nav links** (`hidden items-center gap-6 md:flex`) — map over `NAV_LINKS`, each an `<a href="#">` with `text-[14px] text-gray-900 transition-colors duration-300 hover:text-gray-500`.

**Right group** (`hidden items-center gap-5 md:flex`):

- `<span>` `Taking on projects for Q1 2026` — `hidden text-[13px] text-gray-600 lg:block`.
- Time `<span>` `flex items-center gap-1.5 text-[13px] text-gray-600` containing `<Clock size={14} />` followed by `{time} in London`.
- **`RollButton`** — `label="Book a strategy call"`, `className="bg-gray-900 py-2 pl-5 pr-2 text-[13px] text-white"`, `circleClassName="h-6 w-6"`, `arrowClassName="text-gray-900"`, `arrowSize={12}`.

**Mobile toggle** `<button type="button">` (`md:hidden`): `flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2.5 text-[13px] font-medium text-white`, with `aria-expanded={menuOpen}` and `aria-label` of `"Close menu"`/`"Open menu"`. Shows `<X size={15} />` + `Close` when open, else `<Menu size={15} />` + `Menu`.

### Mobile menu overlay

Wrapper: `fixed inset-0 z-50 md:hidden`. When closed it is `pointer-events-none invisible [transition:visibility_0s_0.5s]`; when open, `visible`. `aria-hidden={!menuOpen}`.

- **Backdrop** `<div>` (click closes): `absolute inset-0 bg-black/60 transition-opacity duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]` toggling `opacity-100` / `opacity-0`.
- **Bottom sheet** `<div>`: `absolute inset-x-0 bottom-0 mx-3 mb-3 rounded-2xl bg-white p-5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]` toggling `translate-y-0` (open) / `translate-y-[calc(100%+0.75rem)]` (closed). Contains:
  - **Time badge** `<span>`: `inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-[13px] text-gray-600` with `<Clock size={14} />` + `{time} in London`.
  - **Nav** (`mt-6 flex flex-col gap-2`): each link an `<a href="#">` (closes the menu on click) styled `text-[28px] font-medium text-gray-900 sm:text-[32px]`.
  - **`RollButton`** in `<div className="mt-8 flex">` — `label="Start a project"`, `onClick` closes the menu, `className="bg-[#F26522] py-2 pl-5 text-[13px] text-white hover:bg-[#e05a1a] sm:pl-6 sm:text-[14px] pr-2"`, `circleClassName="h-7 w-7 sm:h-8 sm:w-8"`, `arrowClassName="text-[#F26522]"`.

## Section 2: About (`src/components/About.tsx`)

`<section className="overflow-hidden bg-white pb-12 pt-16 sm:pb-16 sm:pt-20 lg:pb-24 lg:pt-32">` wrapping a `mx-auto max-w-[1440px]` container.

A small inner `AboutButton` component renders a `RollButton`: `label="About our studio"`, `className="bg-[#F26522] py-2 pl-5 pr-2 text-[13px] text-white hover:bg-[#e05a1a] sm:pl-6 sm:text-[14px]"`, `circleClassName="h-7 w-7 sm:h-8 sm:w-8"`, `arrowClassName="text-[#F26522]"`.

### Badge row

`mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12`:

- **Numbered circle** `<span>`: text `1` — `flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white sm:h-7 sm:w-7 sm:text-[12px]`.
- **Pill label** `<span>`: text `Introducing Axion` — `rounded-full border border-gray-200 px-3 py-1 text-[12px] font-medium text-gray-900 sm:px-4 sm:py-1.5 sm:text-[13px]`.

### Heading

In a `px-5 sm:px-8 lg:px-12` wrapper, `<h2 className="mb-12 text-[length:clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 sm:mb-16 lg:mb-28">`. Copy (with `<br className="hidden sm:block" />` + `<span className="sm:hidden"> </span>` fallback):

- `Strategy-led creatives, delivering`
- `results in digital and beyond.`

### Content area (responsive)

**Mobile / tablet layout** (`px-5 sm:px-8 lg:hidden`):

- **Paragraph** `<p className="text-[15px] font-medium leading-[1.6] text-gray-900 sm:text-[17px]">`: `Through research, creative thinking and iteration we help growing brands realize their digital full potential.`
- **Button** in `<div className="mt-6 flex">`: `<AboutButton />`.
- **Two images** in `<div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-5">`:
  - First `<img>` — `aspect-[438/346] w-full rounded-xl object-cover sm:w-[45%] sm:rounded-2xl`, `loading="lazy"`, `alt="Axion Studio team collaborating in the studio"`.
  - Second `<img>` — `aspect-[900/600] w-full rounded-xl object-cover sm:w-[55%] sm:rounded-2xl`, `loading="lazy"`, `alt="Design work in progress at Axion Studio"`.

**Desktop layout** (`hidden grid-cols-[26%_1fr_48%] items-end gap-6 px-12 lg:grid xl:gap-8`):

- **Left column** `<div className="self-end">`: small `<img>` — `aspect-[438/346] w-full rounded-2xl object-cover`, `loading="lazy"`, same alt as above.
- **Center column** `<div className="flex justify-end self-start">` wrapping a `<div>` with:
  - `<p className="whitespace-nowrap text-[16px] font-medium leading-[1.65] text-gray-900 xl:text-[18px]">` using literal `<br/>` between the three lines:
    - `Through research, creative thinking and`
    - `iteration we help growing brands realize`
    - `their digital full potential.`
  - `<div className="mt-8">` with `<AboutButton />`.
- **Right column** `<div className="self-end">`: large `<img>` — `aspect-[3/2] w-full rounded-2xl object-cover`, `loading="lazy"`, same alt as the second mobile image.

### Image sources

The original design brief specifies these source URLs (served through the `images.higgs.ai` proxy, `output=webp`, `w=1280&q=85`, wrapping the underlying CloudFront `.PNG` originals):

- **Small image:** `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzzbokvigwjottwixh07lwa1p%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.PNG&w=1280&q=85`
- **Large image:** `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzzbokvigwjottwixh07lwa1p%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.PNG&w=1280&q=85`

In this implementation these assets were vendored locally as `.webp` and are served from the local `public/assets/` directory, so the module constants reference the local paths instead. Defined as module constants and reused in both layouts:

```ts
const SMALL_IMAGE =
  "/assets/hf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.webp";
const LARGE_IMAGE =
  "/assets/hf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.webp";
```

> Note: these assets are served from the local `public/assets/` directory (the original CDN images referenced above were vendored locally as `.webp`). Keep the lowercase file paths exactly as shown — paths are case-sensitive.

## Section 3: Case Studies (`src/components/CaseStudies.tsx`)

`<section className="bg-[#F5F5F5] pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">` wrapping a `mx-auto max-w-[1440px]` container.

### Badge row

Same pattern as the About badge row (`mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12`), but:

- **Numbered circle**: text `2` (same classes as section 2).
- **Pill label**: text `Featured client work` — note `border-gray-300` instead of `border-gray-200`: `rounded-full border border-gray-300 px-3 py-1 text-[12px] font-medium text-gray-900 sm:px-4 sm:py-1.5 sm:text-[13px]`.

### Heading

In a `px-5 sm:px-8 lg:px-12` wrapper, `<h2 className="mb-10 text-[length:clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 sm:mb-14 sm:text-[length:clamp(2.5rem,5vw,4.2rem)] lg:mb-16">` with text `Our projects` (same clamp sizing as the hero headline).

### Link icon helper

A `LinkIcon` component renders the Lucide "link" icon manually with its two arc paths:

```tsx
function LinkIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}
```

### Cards grid

`grid grid-cols-1 gap-5 px-5 sm:gap-6 sm:px-8 md:grid-cols-2 lg:gap-7 lg:px-12`. Each card is an `<article>`.

**Card 1 (Narrativ):**

- **Video container** `<div className="group relative aspect-[329/246] cursor-pointer overflow-hidden rounded-2xl bg-[#1a1d2e]">`.
- **Video** — `src={NARRATIV_VIDEO}`, `autoPlay`, `muted`, `loop`, `playsInline`, `className="h-full w-full object-cover"`.
- **Hover button** `<div className="absolute bottom-4 left-4 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white transition-all duration-300 ease-in-out group-hover:w-[148px]">` containing:
  - `<span>` `Learn more` — `max-w-0 overflow-hidden whitespace-nowrap text-[13px] font-medium text-gray-900 opacity-0 transition-all delay-100 duration-300 ease-in-out group-hover:mr-2 group-hover:max-w-[110px] group-hover:opacity-100`.
  - `<LinkIcon className="shrink-0 -rotate-45 text-gray-900 transition-transform duration-300 ease-in-out group-hover:rotate-0" />`.
- **Description** `<p className="mt-4 text-[13px] leading-relaxed text-gray-600 sm:text-[14px]">`: `Winner of Site of the Month 2025 - an interactive 3D showcase driving record engagement`.
- **Title** `<h3 className="mt-1 text-[14px] font-semibold text-gray-900 sm:text-[15px]">`: `Narrativ`.

**Card 2 (Luminar):**

- **Video container** `<div className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-[#6b6b6b]">`.
- **Video** — `src={LUMINAR_VIDEO}`, `autoPlay`, `muted`, `loop`, `playsInline`, `className="h-full w-full object-cover"`.
- **Hover button** `<div className="absolute bottom-4 left-4 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gray-900 transition-all duration-300 ease-in-out group-hover:w-[168px]">` containing:
  - `<span>` `View case study` — `max-w-0 overflow-hidden whitespace-nowrap text-[13px] font-medium text-white opacity-0 transition-all delay-100 duration-300 ease-in-out group-hover:mr-2 group-hover:max-w-[120px] group-hover:opacity-100`.
  - `<ArrowRight size={14} className="shrink-0 -rotate-45 text-white transition-transform duration-300 ease-in-out group-hover:rotate-0" />`.
- **Description** `<p className="mt-4 text-[13px] leading-relaxed text-gray-600 sm:text-[14px]">`: `Transforming a dated platform into a conversion-focused brand experience`.
- **Title** `<h3 className="mt-1 text-[14px] font-semibold text-gray-900 sm:text-[15px]">`: `Luminar`.

### Video sources

The original design brief specifies these CloudFront source URLs:

- **Narrativ (Card 1):** `https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260516_122702_390f5305-8719-41d5-ae80-d23ab3796c28.MP4`
- **Luminar (Card 2):** `https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260516_123323_f909c2b8-ff6c-4edf-882b-8ebcdbe389b5.MP4`

In this implementation these CDN `.mp4` files were vendored locally and are served from the local `public/assets/` directory, so the module constants reference the local paths instead:

```ts
const NARRATIV_VIDEO =
  "/assets/hf_20260516_122702_390f5305-8719-41d5-ae80-d23ab3796c28.mp4";
const LUMINAR_VIDEO =
  "/assets/hf_20260516_123323_f909c2b8-ff6c-4edf-882b-8ebcdbe389b5.mp4";
```

> Note: the case-study videos are served from local `public/assets/` (the original CDN `.mp4` files referenced above were vendored locally). Keep the lowercase paths exactly as shown.

## Animations Summary

- **Text-roll CTA** (`RollButton`): on `group-hover`, the duplicated-label column translates `-translate-y-1/2` and the `ArrowRight` rotates `group-hover:-rotate-45`, both `duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]`.
- **Nav links**: `transition-colors duration-300 hover:text-gray-500`.
- **Partner badge**: `transition-shadow duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]`, shadow `0_2px_8px_rgba(0,0,0,0.08)` → `0_4px_16px_rgba(0,0,0,0.12)` on hover.
- **Mobile menu**: backdrop `transition-opacity duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]`; bottom sheet `transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]` sliding from `translate-y-[calc(100%+0.75rem)]` to `translate-y-0`; visibility delayed via `[transition:visibility_0s_0.5s]` when closing.
- **Case-study hover buttons**: pill expands width (`group-hover:w-[148px]` / `group-hover:w-[168px]`) with `transition-all duration-300 ease-in-out`; label fades/grows in (`opacity-0` → `group-hover:opacity-100`, `max-w-0` → `group-hover:max-w-[110px]`/`[120px]`, `delay-100`); icon rotates `-rotate-45` → `group-hover:rotate-0`.
- **Live clock**: `useLondonTime` updates every second via `setInterval`, formatting `Europe/London` time as `HH:MM`.

## Color Palette

- **Hero background:** `#EFEFEF`
- **Orange accent (buttons):** `#F26522`, hover `#e05a1a`
- **Partner icon fill:** `#E8704E`
- **Shader orange (ChromaFlow up/down/left/right):** `#ff5f03`
- **Shader whites:** `#ffffff`, `#f0f0f0`
- **Case-studies section background:** `#F5F5F5`
- **Narrativ card background:** `#1a1d2e`
- **Luminar card background:** `#6b6b6b`
- **Dark UI elements (logo, CTAs, badges):** `bg-gray-900`
- **Muted text:** `text-gray-600`; **primary text:** `text-gray-900`

## File Structure

```text
axion-studio-landing/
├── index.html
├── package.json
├── public/
│   └── assets/
│       ├── hf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.webp
│       ├── hf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.webp
│       ├── hf_20260516_122702_390f5305-8719-41d5-ae80-d23ab3796c28.mp4
│       └── hf_20260516_123323_f909c2b8-ff6c-4edf-882b-8ebcdbe389b5.mp4
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── vite-env.d.ts
    ├── hooks/
    │   └── useLondonTime.ts
    └── components/
        ├── Hero.tsx
        ├── Navbar.tsx
        ├── About.tsx
        ├── CaseStudies.tsx
        ├── RollButton.tsx
        └── PartnerIcon.tsx
```
