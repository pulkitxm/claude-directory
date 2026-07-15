# Smart Prosthetics — Cinematic Hero Section

## Overview

Build a single-page, full-screen hero section for a smart-prosthetics brand. A muted, autoplaying, looping background video fills the viewport, with a centered pill-style navbar at the top and bottom-left-aligned hero content (badge, headline, subtext, and CTA). The entire page lives in `src/App.tsx` with no routing, no backend, and no extra UI libraries.

## Tech Stack

- **Framework:** React 18 (`react` `^18.3.1`, `react-dom` `^18.3.1`) with `StrictMode`.
- **Build tool:** Vite (`vite` `^5.4.11`) via `@vitejs/plugin-react` (`^4.3.4`).
- **Language:** TypeScript (`typescript` `^5.6.3`), `@types/react` `^18.3.12`, `@types/react-dom` `^18.3.1`.
- **Styling:** Tailwind CSS (`tailwindcss` `^3.4.17`) with PostCSS (`postcss` `^8.4.49`) and Autoprefixer (`autoprefixer` `^10.4.20`).
- **Icons:** `lucide-react` `^0.468.0` is installed, but the only graphic used is an inline SVG logo (no Lucide icon is rendered in the hero).
- **Fonts:** Default Tailwind sans-serif system font stack — no custom font is loaded.
- **Notable techniques:** full-bleed `<video>` background with `object-cover`, group-hover arrow micro-interactions, fully responsive spacing/typography via Tailwind breakpoints.

> Allowed libraries are limited to `react`, `react-dom`, `lucide-react`, and Tailwind CSS. Do not add any other libraries.

## Global Setup

### `index.html`

- `lang="en"`, `<meta charset="UTF-8" />`, `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`.
- Title: `Smart Prosthetics — Reclaim Your Movement`.
- Body contains `<div id="root"></div>` and `<script type="module" src="/src/main.tsx"></script>`.

### `src/main.tsx`

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### `src/index.css`

Only the three Tailwind layer directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### `tailwind.config.js`

- `content: ['./index.html', './src/**/*.{ts,tsx}']`, empty `theme.extend`, no plugins.

### `postcss.config.js`

- Plugins: `tailwindcss` and `autoprefixer`.

### `vite.config.ts`

- `defineConfig` with the `react()` plugin.

## Constants

Defined at the top of `src/App.tsx`:

```ts
const VIDEO_URL =
  '/assets/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4'

const NAV_LINKS = ['Story', 'Products', 'Help', 'Support']
```

- **Video asset:** the background video is served locally from `public/assets/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4` (vendored). The original source was a CloudFront URL — `https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4` — but the project references the local `/assets/...` path. Use the local path.

## Layout

- **Root wrapper** `<div>`: `relative min-h-screen overflow-hidden bg-[#f0f0ee]`.
- **Background `<video>`:** absolutely positioned, full-bleed — `absolute inset-0 w-full h-full object-cover`. Attributes: `src={VIDEO_URL}`, `autoPlay`, `muted`, `loop`, `playsInline`.
- **Foreground content wrapper** `<div>`: `relative z-10 flex flex-col min-h-screen`.

## Logo (Inline SVG Component)

A `Logo()` function component rendering a single inline SVG:

- `width="18"`, `height="18"`, `viewBox="0 0 256 256"`, `fill="none"`, `xmlns="http://www.w3.org/2000/svg"`.
- One `<path>` with `fill="rgb(84, 84, 84)"` and:

```tsx
function Logo() {
  return (
    <svg width="18" height="18" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="rgb(84, 84, 84)"
        d="M 160 88 L 194 34 L 216 0 L 256 0 L 256 40 L 221.5 93.5 L 200 128 L 256 128 L 256 256 L 96 256 L 96 168 L 64.246 220 L 40 256 L 0 256 L 0 216 L 34 162 L 56 128 L 0 128 L 0 0 L 160 0 Z"
      />
    </svg>
  )
}
```

## Navbar (Centered, Pill-Style, Two Separate Pills)

- `<nav>` classes: `flex items-center justify-center pt-4 sm:pt-6 px-4 sm:px-8 gap-2 sm:gap-3`.
- **Left circular logo container:** `flex items-center justify-center rounded-full w-10 h-10 sm:w-11 sm:h-11 shrink-0`, with inline style `style={{ backgroundColor: '#EDEDED' }}`, containing the `<Logo />`.
- **Right pill container:** `flex items-center gap-4 sm:gap-10 rounded-xl px-4 sm:px-8 py-2.5 sm:py-3`, with inline style `style={{ backgroundColor: '#EDEDED' }}`.
- **Nav links:** map over `NAV_LINKS` (`['Story', 'Products', 'Help', 'Support']`). Each is an `<a href="#" key={link}>` with classes:
  - `text-[12px] sm:text-[14px] font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200`.

## Hero Content (Bottom-Left Aligned)

- **Outer container:** `flex-1 flex items-end pb-10 sm:pb-16 lg:pb-20 px-6 sm:px-12 md:px-20 lg:px-28`.
- **Inner container:** `max-w-xs`, holding four stacked elements (the first three each carry `mb-3`; see exact classes below).

### 1. Badge link

- `<a href="#">` with classes: `inline-flex items-center gap-1.5 text-[11.5px] font-medium text-blue-500 hover:text-blue-600 transition-colors mb-3 group`.
- Text: `Seen on Shark Tank in India`, followed by an arrow `→` inside a `<span>` with classes `inline-block transition-transform duration-200 group-hover:translate-x-0.5`.

### 2. Headline `<h1>`

- Classes: `text-[1.5rem] sm:text-[1.75rem] leading-[1.15] font-medium text-gray-900 tracking-tight mb-3`.
- Text: `Simple, smart prosthetics made for people who keep fighting.`

### 3. Subtext `<p>`

- Classes: `text-[13px] text-gray-400 font-normal mb-3`.
- Text: `Reclaim your movement now.`

### 4. CTA anchor

- `<a href="#">` with classes: `inline-flex items-center gap-2 text-[13px] font-medium text-blue-500 border border-blue-400 rounded-full px-5 py-2.5 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-200 group`.
- Text: `Try a free fitting`, plus an arrow `→` inside a `<span>` with classes `transition-transform duration-200 group-hover:translate-x-0.5`.

## Animations / Micro-Interactions

- Arrow spans translate right by `0.5` on group hover (`group-hover:translate-x-0.5`).
- The CTA fills blue on hover — background, text, and border all transition (`hover:bg-blue-500 hover:text-white hover:border-blue-500`, `transition-all duration-200`).
- Nav links shift from `text-gray-700` to `text-gray-900` on hover (`transition-colors duration-200`).

## Typography

- Default Tailwind sans-serif system font stack — no custom font.
- All sizes are exact pixel/rem values: `11.5px`, `12px`, `13px`, `14px`, `1.5rem`, `1.75rem`.

## Color Palette

- **Page background:** `#f0f0ee` (applied via `bg-[#f0f0ee]`).
- **Pill backgrounds:** `#EDEDED` (applied via inline `backgroundColor`).
- **Logo fill:** `rgb(84, 84, 84)`.
- **Accent:** `blue-500` / `blue-600` / `blue-400` (links, CTA border, hover fill).
- **Text:** `gray-900` (headline), `gray-700` (nav links), `gray-400` (subtext).
- **CTA hover text:** `white`.

## File Structure

```
smart-prosthetics-hero/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── public/
│   └── assets/
│       └── hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4
└── src/
    ├── App.tsx      # entire page: Logo component + App
    ├── index.css    # Tailwind directives only
    └── main.tsx     # React entry, StrictMode
```

## Constraints

- The entire page lives in `src/App.tsx`.
- Do not add any other sections, no Supabase wiring, no routing. Only the single hero page as described.
