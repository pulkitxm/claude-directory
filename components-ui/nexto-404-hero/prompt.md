# nexto. — 404 "Page Not Found" Hero

## Overview

Build a 404 "Page Not Found" hero page as a single full-viewport (`100vh`, no scroll) React + Vite + Tailwind CSS application. It features a centered hero block over a layered spaceship/gradient background, a desktop navbar with a slide-in mobile overlay, floating gradient icon decorations, and two navigation cards anchored to the bottom. The page must match the specification below exactly.

## Tech Stack

- **Framework:** React 19 (`react` / `react-dom` `^19.2.6`) with `StrictMode`, bootstrapped via Vite (`vite` `^8.0.12`, `@vitejs/plugin-react` `^6.0.1`).
- **Language:** TypeScript (`~6.0.2`); the app is authored in `.tsx`.
- **Styling:** Tailwind CSS (`^3.4.19`) with `@tailwind base/components/utilities`, plus a large hand-written CSS layer in `src/index.css`. PostCSS (`^8.5.15`) + Autoprefixer (`^10.5.0`).
- **Fonts:** DM Sans (Google Fonts, variable) and Material Symbols Rounded (Google icon font).
- **Icons:** Google Material Symbols Rounded for decorations; inline SVGs for the CTA chevron and the two navigation-card icons.
- **Notable techniques:** layered `background-image` (PNG over gradient) with `background-attachment: fixed`, gradient text fill via `-webkit-background-clip: text`, CSS keyframe float animation, dashed border drawn with a repeating linear-gradient on a `::after` pseudo-element, and a `transform: translateX` slide-in mobile overlay.

## Fonts & External Resources

- **Google Font:** DM Sans (all weights, variable: `opsz 9..40, wght 100..1000`). Loaded in `index.html`:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,100..1000&display=swap"
    rel="stylesheet"
  />
  ```
- **Google Material Symbols Rounded:** axes `opsz,wght,FILL,GRAD@24,400,1,0`:
  ```html
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0"
    rel="stylesheet"
  />
  ```
- **Logo image:** served locally at `/assets/logoipsum-415.svg`, rendered with `filter: brightness(0)` to make it black, height `28px`. (This asset was originally sourced from `https://pub-f170a2592d2c4a1485466404c36807be.r2.dev/tests/logoipsum-415.svg` and is now vendored under `public/assets/`.)
- **Background spaceship image:** served locally at `/assets/alien-spaceship.png`. (Originally `https://pub-e68758f43067417dba612b2371819aa1.r2.dev/viktor-components/alien-spaceship.png`, now vendored under `public/assets/`.)
- **Favicon:** `<link rel="icon" type="image/svg+xml" href="/assets/logoipsum-415.svg" />`.
- **Document title:** `nexto. — Page Not Found`.

## Global Setup & Layout

- The entire page is exactly `100vh` with `overflow: hidden` on `html`, `body`, and `#root`. No scrolling.
- `html`: `height: 100vh; overflow: hidden`.
- `body`: `margin: 0; height: 100vh; overflow: hidden; display: flex; flex-direction: column`. Font stack `'DM Sans', ui-sans-serif, system-ui, -apple-system, sans-serif`, `color: var(--text-main)`, with `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale`.
- `#root`: `height: 100vh; display: flex; flex-direction: column; overflow: hidden`.

### Background

The `body` has a layered background:

1. The spaceship PNG (`url('/assets/alien-spaceship.png')`) positioned at `center 40%`, sized `contain`.
2. A `linear-gradient(to top left, #F5F5F5, #F7F7F7)` covering the full page, sized `cover`.

Both layers are `background-repeat: no-repeat, no-repeat` and `background-attachment: fixed, fixed`.

```css
background-image:
  url('/assets/alien-spaceship.png'),
  linear-gradient(to top left, #F5F5F5, #F7F7F7);
background-position: center 40%, center;
background-size: contain, cover;
background-repeat: no-repeat, no-repeat;
background-attachment: fixed, fixed;
```

### Color Variables (CSS custom properties)

Defined on `:root`:

```css
--text-main: #1a1a1a;
--text-secondary: #888888;
--bg-page: #F5F5F5;
--card-bg: #ffffff;
```

### Material Symbols Rounded helper

The `.material-symbols-rounded` class sets `font-family: 'Material Symbols Rounded'`, `font-weight: normal`, `font-style: normal`, `line-height: 1`, `letter-spacing: normal`, `text-transform: none`, `display: inline-block`, `white-space: nowrap`, `word-wrap: normal`, `direction: ltr`, and `font-variation-settings: 'opsz' 24, 'wght' 400, 'FILL' 1, 'GRAD' 0`.

## Component Structure

Rendered from `App` (top-level fragment):

- `<Navbar>` — receives `menuOpen` and `onToggleMenu`.
- `<MobileNav>` — receives `open` and `onClose`.
- `<main className="main-content">` — lost text, title wrapper (with decorations), subtext, and nav cards.

`App` holds a single `useState` boolean `menuOpen` (initial `false`). The hamburger toggles it (`setMenuOpen((v) => !v)`); mobile links and the mobile CTA close it (`setMenuOpen(false)`).

```tsx
import { useState, type ReactNode } from 'react'

const LOGO_URL = '/assets/logoipsum-415.svg'
const NAV_LINKS = ['Our Team', 'Solutions', 'Showcase', 'News']
```

## Navbar

- `width: 100%; max-width: 1100px; margin: 0 auto; padding: 28px 40px; display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 100; flex-shrink: 0`.
- **Dashed bottom border** via a `::after` pseudo-element: `position: absolute; bottom: 0; left: 40px; right: 40px; height: 1px;` with `background-image: linear-gradient(to right, rgba(0, 0, 0, 0.08) 2px, transparent 2px); background-size: 6px 1px; background-repeat: repeat-x;`.

### Left — Logo

An `<a href="#home" class="logo">` with `aria-label="nexto home"`: `display: flex; align-items: center; gap: 9px; text-decoration: none`.

- The SVG image (`<img>` with empty `alt`, `draggable={false}`, Tailwind `select-none`): `height: 28px; display: block; filter: brightness(0)`.
- The text **"nexto."** in a `.logo-text` span (Tailwind `whitespace-nowrap`): `font-size: 20px; font-weight: 700; letter-spacing: -0.3px; color: #111`.

### Center — Nav links

`<nav class="nav-links" aria-label="Primary">`. Absolutely centered: `position: absolute; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 36px`.

- Links: **Our Team**, **Solutions**, **Showcase**, **News**, each `href={#${label.toLowerCase().replace(/\s+/g, '-')}}`.
- Link style: `font-size: 14px; font-weight: 400; color: var(--text-main); text-decoration: none; opacity: 0.65; transition: opacity 0.2s ease`. On hover: `opacity: 1`.
- The **Solutions** link includes a dropdown arrow character (`&#9662;`, ▾) in a `.drop-arrow` span: `display: inline-block; font-size: 9px; margin-left: 5px; vertical-align: 1px`.

### Right — CTA button

An `<a href="#connect" class="cta-button">` reading **"Let's Connect"** (`Let&apos;s Connect`):

- `display: inline-flex; align-items: center; gap: 10px; background: linear-gradient(180deg, #2c2c2c 0%, #111111 100%); color: #ffffff; font-size: 13px; font-weight: 500; border: none; border-radius: 40px; padding: 5px 16px 5px 5px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15); text-decoration: none; cursor: pointer`.
- `transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease`.
- On hover: `transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28); filter: brightness(1.1)`.
- **Arrow icon** (`.cta-arrow`, `aria-hidden="true"`): a `24px` white circle on the left — `width: 24px; height: 24px; border-radius: 50%; background: #ffffff; color: #111111; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0`. It contains a chevron SVG sized `13px × 13px`:
  ```tsx
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
  ```

### Hamburger (mobile only)

A `<button class="hamburger select-none">` with `aria-label="Toggle navigation menu"` and `aria-expanded={menuOpen}`, containing 3 `<span>` bars. Gets the `active` class when `menuOpen`.

- `.hamburger`: `display: none; flex-direction: column; justify-content: center; gap: 5px; padding: 0; background: none; border: none; cursor: pointer; z-index: 120`.
- Each bar (`span`): `display: block; width: 24px; height: 2px; border-radius: 2px; background: #111; transition: transform 0.3s ease, opacity 0.3s ease`.
- When `.active`: bar 1 `transform: translateY(7px) rotate(45deg)`; bar 2 `opacity: 0`; bar 3 `transform: translateY(-7px) rotate(-45deg)` — animating to an X.
- Hidden on desktop; shown (`display: flex`) at max-width `768px`.

## Mobile Navigation

`<nav class="mobile-nav" aria-label="Mobile" aria-hidden={!open}>`, gaining the `open` class when active.

- Fixed full-screen overlay: `position: fixed; inset: 0; z-index: 90; background: var(--bg-page); display: flex; flex-direction: column; justify-content: center; align-items: flex-start; padding: 96px 28px 48px`.
- Slides in from the right: `transform: translateX(100%)` → `translateX(0)` when `.open`, `transition: transform 0.55s cubic-bezier(0.77, 0, 0.175, 1)`.
- **Links** (`.mobile-nav-link`), left-aligned and large: `width: 100%; font-size: 38px; font-weight: 800; letter-spacing: -1.5px; color: var(--text-main); text-decoration: none; text-align: left; padding: 24px 0; border-bottom: 1px solid rgba(0, 0, 0, 0.08)`. Same four labels as the desktop nav. Each calls `onClose` on click; `tabIndex` is `0` when open, `-1` when closed.
- **Last item is the CTA button**, styled like the navbar CTA but larger: `margin-top: 36px; font-size: 15px; padding: 6px 20px 6px 6px`, and its arrow circle is `32px × 32px` with a `15px × 15px` SVG. The mobile CTA also calls `onClose`.

## Main Content Area

`<main class="main-content">`: `flex: 1; min-height: 0; width: 100%; max-width: 700px; margin: 0 auto; padding: 20px 20px 30px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center`.

### Lost text

`<p class="lost-text">` reading **"Seems you've wandered off..."** (`Seems you&apos;ve wandered off...`): `margin-top: auto` (pairs with the nav cards' `auto` margin to center the hero block), `font-size: 15px; font-weight: 400; color: var(--text-secondary); margin-bottom: 12px`.

### Title wrapper

`<div class="title-wrapper">`: `position: relative; display: inline-block; margin-bottom: 14px`.

- **Cloud decoration:** a Material Symbols `cloud` icon (`.deco.deco-cloud`, also Tailwind `pointer-events-none select-none`, `aria-hidden="true"`). Positioned `top: -18px; left: -24px`, `font-size: 42px`, `animation-duration: 5s`, `animation-delay: 0.3s`.
- **Title:** `<h1 class="title">` reading **"Whoops! Nothing here yet"**: `margin: 0; font-size: clamp(34px, 5vw, 52px); font-weight: 500; letter-spacing: -1.5px; line-height: 1.08; color: #0f0f0f`.
- **Heart decoration:** a Material Symbols `favorite` icon (`.deco.deco-heart`, same Tailwind helpers and `aria-hidden`). Positioned `bottom: -15px; right: 20px`, `font-size: 32px`, `animation-duration: 4.5s`, `animation-delay: 1s`.

**Shared `.deco` style:** `position: absolute`; gradient text fill via `background: linear-gradient(to bottom, #F7B2FB 50%, #786EF1 80%, #5588FB 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent`; a white drop-shadow outline:

```css
filter:
  drop-shadow(0 1px 0 #ffffff)
  drop-shadow(0 -1px 0 #ffffff)
  drop-shadow(1px 0 0 #ffffff)
  drop-shadow(-1px 0 0 #ffffff);
animation: floatSlow 5s ease-in-out infinite;
```

### Subtext

`<p class="subtext">`: `font-size: 14px; color: var(--text-secondary); line-height: 1.7; max-width: 470px; margin: 0 auto 28px`. Copy (verbatim, with two highlighted words):

> Grab a 30-minute `chat` to explore your ideas, scope, and vision. We'll find common ground, sync and `define` a clear roadmap.

The words **"chat"** and **"define"** are wrapped in `<span class="tag">`: `display: inline-flex; align-items: center; background: #E0E2E7; color: #4b4e57; font-size: 12.5px; font-weight: 600; padding: 2px 12px; border-radius: 6px`. (In JSX, "We'll" is `We&apos;ll`.)

## Navigation Cards

`<div class="nav-cards">`: `margin-top: auto; display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 460px`. Anchored to the bottom via `margin-top: auto`.

Each card is an `<a class="nav-card">`: `display: flex; align-items: center; justify-content: space-between; background: var(--card-bg); border: 1px solid rgba(0, 0, 0, 0.05); border-radius: 18px; padding: 18px 22px; text-decoration: none; color: var(--text-main); text-align: left; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04); transition: transform 0.25s ease, box-shadow 0.25s ease`. On hover: `transform: translateY(-3px); box-shadow: 0 8px 28px rgba(0, 0, 0, 0.08)`.

Internal structure: a left group (`.card-left`: `display: flex; align-items: center; gap: 14px`) holding the icon container and a text block (`.card-title` + `.card-sub`), and a right chevron (`.card-arrow`).

- **Icon container** (`.card-icon`): `width: 48px; height: 48px; border-radius: 50%; background: #eaecf0; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: transform 0.25s ease`. On card hover: `transform: scale(1.05)`.
- **Card title** (`.card-title`): `margin: 0; font-size: 15px; font-weight: 600`.
- **Card subtitle** (`.card-sub`): `margin: 0; font-size: 12px; color: var(--text-secondary)`.
- **Right chevron** (`.card-arrow`, `aria-hidden="true"`): the `&rsaquo;` (›) character — `font-size: 21px; line-height: 1; color: #9a9da3; transition: transform 0.25s ease`. On card hover: `transform: translateX(6px)`.

### Card 1 — "Main Page"

- `href="#home"`, title **"Main Page"**, subtitle **"Back where it all begins..."**.
- **House SVG icon** (`20 × 20`, `viewBox="0 0 24 24"`): body path `M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z` filled `#1a1a1a`, plus a white door path `M9 21V12h6v9` filled `#ffffff`.

### Card 2 — "Showcase"

- `href="#showcase"`, title **"Showcase"**, subtitle **"Where we walk the walk"**.
- **Circle-dot SVG icon** (`20 × 20`, `viewBox="0 0 24 24"`): an outer `<circle cx="12" cy="12" r="9" fill="#1a1a1a" />` and an inner `<circle cx="12" cy="12" r="3.5" fill="#ffffff" />`.

## Animations

```css
@keyframes floatSlow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(3deg); }
}
```

Both decorations use `floatSlow` (`ease-in-out infinite`); the cloud runs `5s` with `0.3s` delay, the heart runs `4.5s` with `1s` delay.

## Responsive Breakpoints

### 768px and below (`@media (max-width: 768px)`)

- `body`: `background-size: 90%, cover; background-position: center 45%, center`.
- `.navbar`: `padding: 20px`; the `::after` dashed border uses `left: 20px; right: 20px`.
- Hide `.nav-links` and the navbar `.cta-button` (`display: none`); show `.hamburger` (`display: flex`); show the mobile CTA (`.mobile-nav .cta-button { display: inline-flex }`).
- `.title`: `font-size: 30px`.
- `.deco-cloud`: `font-size: 32px; top: -14px; left: -16px`.
- `.deco-heart`: `font-size: 24px; bottom: -11px; right: 12px`.
- `.nav-cards`: `max-width: 100%; gap: 10px`.
- `.nav-card`: `padding: 14px 16px; border-radius: 16px`.
- `.card-icon`: `width: 40px; height: 40px`; its SVG `width: 17px; height: 17px`.

### 480px and below (`@media (max-width: 480px)`)

- `body`: `background-size: 100%, cover`.
- `.title`: `font-size: 26px`.
- `.deco-cloud`: `font-size: 26px; top: -12px; left: -10px`.
- `.deco-heart`: `font-size: 20px; bottom: -9px; right: 8px`.

## File Structure

- `index.html` — entry document, font/favicon links, `<div id="root">`, `<script type="module" src="/src/main.tsx">`.
- `src/main.tsx` — bootstraps React into `#root` inside `<StrictMode>` and imports `./index.css`.
- `src/App.tsx` — all components: `CtaButton`, `Logo`, `Navbar`, `MobileNav`, `HouseIcon`, `CircleDotIcon`, `NavCard`, and default-exported `App`.
- `src/index.css` — Tailwind directives, design tokens, page shell, and all component styles.
- `public/assets/logoipsum-415.svg`, `public/assets/alien-spaceship.png` — vendored logo and background.
- Config: `vite.config.ts`, `tailwind.config.js`, `postcss.config.js`, `tsconfig*.json`, `eslint.config.js`.
