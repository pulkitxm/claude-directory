# Fearless Vision Delivered — Full-Screen Cinematic Hero

## Overview

Build a full-screen, fully mobile-responsive hero section with an autoplaying looping background video. The layout is a single flex column with three vertical zones (navigation, a right-aligned stats row, and a bottom content block), all rendered in uppercase Inter with a deep-purple accent. Every element animates in on page load via Framer Motion, including a clip-reveal slide-up of the large stacked main heading.

## Tech Stack

- **Framework:** React 18 (`react` `^18.3.1`, `react-dom` `^18.3.1`), JSX (`.jsx`, no TypeScript).
- **Build tool:** Vite (`vite` `^5.4.11`) with `@vitejs/plugin-react` `^4.3.4`.
- **Styling:** Tailwind CSS 3 (`tailwindcss` `^3.4.17`) with `postcss` `^8.4.49` and `autoprefixer` `^10.4.20`.
- **Animation:** Framer Motion (`framer-motion` `^11.18.2`) — `motion`.
- **Icons:** Lucide (`lucide-react` `^0.468.0`) — `ArrowUpRight`, `X`.
- **Font:** Inter; semibold (600) used throughout.
- **Notable techniques:** full-viewport autoplaying muted background video, `clamp()` fluid typography, overflow-hidden clip reveal for heading words, staggered load animations via custom variant index.

## Global Setup

### `index.html`

- `lang="en"`, `<meta charset="UTF-8" />`, `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`.
- Meta description: `Fearless Vision Delivered — creative studios built around elevating your vision into striking reality.`
- `<title>Fearless Vision Delivered</title>`.
- Uses the Inter font.
- Mounts `<div id="root"></div>` and loads `/src/main.jsx` as a module.

### `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body,
#root {
  height: 100%;
}

body {
  background: #fff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### `src/main.jsx`

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### `tailwind.config.js`

Content globs `./index.html` and `./src/**/*.{js,jsx}`. Theme extensions:

```js
theme: {
  extend: {
    colors: {
      accent: "#5E0ED7",
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
  },
},
```

## Color Palette

- **Accent:** `#5E0ED7` (deep purple), exposed as the Tailwind `accent` color. Used for the logo dot, the `+` symbols in the stats, and the "Work With Us" CTA link text.
- **Body text:** black (`text-black` / `#000`).
- **Page background:** white (`#fff`); the background video sits behind all content.

## Typography

- **Font family:** `'Inter', sans-serif`, applied inline to the root container.
- **Casing:** all text is uppercase (`uppercase`) with wide letter-spacing (`tracking-widest`, occasionally `tracking-wide`).
- **Weight:** semibold (600 / `font-semibold`) throughout.

## Layout

The root is a flex column filling at least the viewport:

```
<div className="relative flex min-h-screen flex-col overflow-hidden text-black"
     style={{ fontFamily: "'Inter', sans-serif" }}>
```

Three stacked, vertically-arranged zones plus the background video:

1. **Background video** — absolutely positioned, fills the viewport.
2. **Nav** (`<header>`, top, fixed height).
3. **Stats row** (`<section>`, `flex-1`, vertically centered, right-aligned).
4. **Bottom content** (`<footer>`, pinned to the bottom with padding).

All foreground zones use `relative z-10` so they layer above the video.

### Background Video

- Full-screen autoplaying, looping, muted video covering the entire viewport.
- Source path: `/assets/hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4` (vendored locally under `public/assets/`).
  - Note: the original brief referenced the remote source `https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4`; the project ships the same file locally.
- Positioned `absolute inset-0` with `h-full w-full object-cover` to fill the viewport.
- Attributes: `autoPlay`, `loop`, `muted`, `playsInline`, `aria-hidden="true"`, `tabIndex={-1}`, and `pointer-events-none`.

```jsx
<video
  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
  src={VIDEO_URL}
  autoPlay
  loop
  muted
  playsInline
  aria-hidden="true"
  tabIndex={-1}
/>
```

## Navigation Bar

`<header>` is a horizontal flex, items centered, justified between, with padding `px-5 pt-5 sm:px-8 md:px-12 md:pt-6`.

- **Left — logo:** a 32px round div with a 2px accent border, containing a 10px solid accent circle:
  ```jsx
  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-accent">
    <span className="h-2.5 w-2.5 rounded-full bg-accent" />
  </div>
  ```
- **Center (hidden on mobile, visible `md+`):** four nav links — "Story", "Expertise", "Studios", "Feedback". Container `hidden items-center gap-10 md:flex`. Each link: `text-sm font-semibold uppercase tracking-widest text-black`, with `href={#${link.toLowerCase()}}`.
- **Right — hamburger button:** a 36px round black button with three horizontal white lines (three `<span>` elements, each `h-0.5 w-4 bg-white`, stacked with `gap-1`). Classes `flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-full bg-black`. Clicking it opens the mobile menu (`onClick={() => setMenuOpen(true)}`), `aria-label="Open menu"`, `aria-expanded={menuOpen}`.

## Mobile Menu Overlay

Triggered by the hamburger. Fixed, full-screen, `z-50`, white background:

```
className="fixed inset-0 z-50 flex flex-col bg-white px-5 pb-8 pt-5 sm:px-8 md:px-12 md:pt-6"
```

- **Top row:** the same logo (left) and a 36px round black close button with an `X` icon (right). Close button: `flex h-9 w-9 items-center justify-center rounded-full bg-black`, `aria-label="Close menu"`, containing `<X size={18} className="text-white" />`.
- **Nav list:** vertical list of the 4 nav links, container `mt-16 flex flex-col gap-8`, each link `text-3xl font-semibold uppercase tracking-widest text-black` with `href={#${link.toLowerCase()}}`. Clicking a link closes the menu.
- **Bottom (`mt-auto`):** the "Work With Us" CTA (accent color, `ArrowUpRight` icon), `text-xl`. Clicking it closes the menu.

## Stats Row (Middle Section)

Container `<section>`: `flex flex-1 items-center justify-end px-5 py-8 sm:px-8 md:px-12 md:py-0` (same horizontal padding as the nav; `py-8` on mobile collapsing to `md:py-0`).

Inner row of three stat items: `flex items-center gap-5 sm:gap-8 md:gap-10`, each `text-right`:

- **+300** — Crafted / Brands
- **+200** — Digital / Products
- **+100** — Ventures / Funded

Data source:

```jsx
const STATS = [
  { value: "300", label: "Crafted\nBrands" },
  { value: "200", label: "Digital\nProducts" },
  { value: "100", label: "Ventures\nFunded" },
];
```

- **Number styling:** `font-semibold text-black` with inline `style={{ fontSize: "clamp(1.5rem, 5vw, 3.5rem)", lineHeight: 1.05 }}`. The `+` is rendered in a separate `<span className="text-accent" style={{ fontSize: "0.5em" }}>` (accent color, half-size); the number is black.
- **Label:** `mt-1 whitespace-pre-line text-[10px] font-semibold uppercase leading-tight tracking-widest text-black sm:text-xs md:text-sm`. The `\n` in each label plus `whitespace-pre-line` produces a line break between the two words.

## Bottom Section

`<footer>`: `flex flex-col gap-6 px-5 pb-8 sm:px-8 md:gap-12 md:px-12 md:pb-12`.

### Row A — Tagline + CTA

Container: `flex items-center justify-between gap-4`.

- **Left — tagline paragraph:** `max-w-[130px] text-[10px] font-semibold uppercase tracking-widest text-black sm:max-w-[160px] sm:text-xs md:max-w-xs md:text-sm`, with `<br />` line breaks:
  ```
  Shaping Bold
  Visions Into Power
  For Your Tribe
  ```
- **Right — CTA link:** "Work With Us" with `ArrowUpRight` icon, accent color, `whitespace-nowrap`. Sizing `gap-1 text-base sm:gap-2 sm:text-xl md:text-2xl`; icon `h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]`.

### Row B — Description + Main Heading

Container: `flex items-end justify-between gap-3 sm:gap-4`.

- **Left — description block:** a fixed-width, shrink-0 container `w-[120px] shrink-0 sm:w-[180px] md:w-[280px]`, containing a paragraph: "Creative Studios Built Around Elevating Your Vision Into Striking Reality". Paragraph classes: `text-left text-[9px] font-semibold uppercase tracking-widest text-black sm:text-xs md:text-right md:text-sm`.
- **Right — main heading (`<h1>`):** three words stacked vertically — "Fearless", "Vision", "Delivered". `text-right font-semibold uppercase text-black`, inline `style={{ fontSize: "clamp(2rem, 9vw, 9rem)", lineHeight: 0.88 }}`. Each word lives in its own `overflow-hidden` wrapper for the clip-reveal effect:
  ```jsx
  {HEADING_WORDS.map((word, i) => (
    <span key={word} className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ delay: 0.4 + i * 0.14, duration: 0.7, ease: EASE }}
      >
        {word}
      </motion.span>
    </span>
  ))}
  ```

## Animations (Framer Motion)

Shared easing: `const EASE = [0.22, 1, 0.36, 1];`. All entrance animations fire on page load (`initial="hidden"` → `animate="visible"`), driven by a per-element custom index.

**1. `fadeDown` variant (nav elements):**

```jsx
const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: EASE },
  }),
};
```

- Delay `i * 0.1s`, duration `0.5s`, ease `EASE`.
- Applied to: logo (`custom={0}`), each nav link (`custom={i + 1}`, i.e. 1–4), hamburger (`custom={5}`).

**2. `fadeUp` variant (stats + bottom content):**

```jsx
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: EASE },
  }),
};
```

- Delay `i * 0.12s`, duration `0.6s`, ease `EASE`.
- Applied to: each stat card (`custom={i + 2}`, i.e. 2,3,4), tagline paragraph (`custom={5}`), CTA link (`custom={6}`), description block (`custom={7}`).

**3. Heading slide-up (main heading words):**

- Each word slides from `y: "110%"` to `y: 0` inside its `overflow-hidden` parent (clip-reveal).
- Delay `0.4 + i * 0.14` (so 0.4s, 0.54s, 0.68s), duration `0.7s`, ease `EASE`.

## Responsive Breakpoints

- Mobile-first, three tiers: default (mobile), `sm:` (640px), `md:` (768px).
- Center nav links are hidden on mobile and shown `md+`; the hamburger opens the full-screen mobile menu for small screens.
- Spacing, font sizes, and fixed widths scale up at each breakpoint.

## Constants

```jsx
const VIDEO_URL =
  "/assets/hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4";
const EASE = [0.22, 1, 0.36, 1];
const NAV_LINKS = ["Story", "Expertise", "Studios", "Feedback"];
const HEADING_WORDS = ["Fearless", "Vision", "Delivered"];
```

## File Structure

```
fearless-vision-hero/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── public/
│   └── assets/
│       └── hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4
└── src/
    ├── main.jsx
    ├── App.jsx
    └── index.css
```

## Dependencies

- React 18 (`react`, `react-dom` `^18.3.1`)
- Tailwind CSS 3 (`tailwindcss` `^3.4.17`, `postcss`, `autoprefixer`)
- `framer-motion` `^11.18.2`
- `lucide-react` `^0.468.0` (`ArrowUpRight`, `X` icons)
- Build tooling: Vite `^5.4.11`, `@vitejs/plugin-react` `^4.3.4`
