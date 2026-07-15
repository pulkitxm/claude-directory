# Equilibrium — Liquid Glass Hero Section

## Overview

Build a full-screen, single-page hero section for a wellness brand called **Equilibrium**. The hero sits on top of a looping background video and overlays a "liquid glass" UI: a frosted, blurred navbar pill, glassy CTA buttons, and a bottom-left headline block. The entire experience is one screen tall with no scrolling.

## Tech Stack

- **Framework:** React 18 (`react` ^18.3.1, `react-dom` ^18.3.1) with TypeScript (~5.6.3)
- **Build tool:** Vite ^5.4.11 with `@vitejs/plugin-react` ^4.3.4
- **Styling:** Tailwind CSS ^3.4.16 (with `postcss` ^8.4.49 and `autoprefixer` ^10.4.20)
- **Icons:** `lucide-react` ^0.468.0 (no other UI libraries)
- **Font:** Geist (loaded from Google Fonts)
- **Notable techniques:** CSS `backdrop-filter` blur plus a gradient-border pseudo-element via mask compositing; looping muted autoplay `<video>` background

## Global Setup

### Fonts and global CSS (`src/index.css`)

- Import Geist from Google Fonts at the top of the file:

  ```css
  @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap');
  ```

- Include the Tailwind layer directives:

  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

- Apply Geist globally:

  ```css
  * {
    font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
  ```

- Define the `.liquid-glass` class and its `::before` gradient-border pseudo-element:

  ```css
  .liquid-glass {
    background: rgba(255, 255, 255, 0.01);
    background-blend-mode: luminosity;
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    border: none;
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
  }

  .liquid-glass::before {
    content: '';
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
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
  ```

### Tailwind configuration (`tailwind.config.js`)

Default config with content globs for the index HTML and source files:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### HTML (`index.html`)

- `<html lang="en">`, `<meta charset="UTF-8" />`, viewport meta `width=device-width, initial-scale=1.0`.
- `<title>`: `Equilibrium — Live Better, Feel Whole Every Day`
- Body contains `<div id="root"></div>` and `<script type="module" src="/src/main.tsx"></script>`.

### Entry point (`src/main.tsx`)

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

## Component (`src/App.tsx`)

- Import `useState` from React and `ChevronDown`, `Infinity`, `Menu`, `X` from `lucide-react`.
- Background video constant points to a remote CloudFront URL:

  ```ts
  const BG_VIDEO =
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260511_230229_7c9bc431-46cf-489a-948d-e8144d8eb5d4.mp4'
  ```

- Define a `NavLink` interface and a `navLinks` array:

  ```ts
  interface NavLink {
    label: string
    active?: boolean
    dropdown?: boolean
  }

  const navLinks: NavLink[] = [
    { label: 'Home', active: true },
    { label: 'Wellness', dropdown: true },
    { label: 'Routine' },
    { label: 'Our Team' },
  ]
  ```

- `menuOpen` state via `useState(false)`, toggled by the mobile menu button.

## Layout

- **Root:** `<div className="relative w-full h-screen overflow-hidden">`.
- **Background `<video>`:** absolutely positioned `absolute inset-0 w-full h-full object-cover`, with attributes `autoPlay`, `muted`, `loop`, `playsInline`, and `src={BG_VIDEO}`.

## Navbar

Container: `absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 sm:px-8 py-5`.

- **Logo (left):** `flex items-center gap-2 text-white font-medium text-base`, containing `<Infinity size={22} strokeWidth={1.5} />` followed by `<span>Equilibrium</span>`.
- **Nav pill (center, `hidden md:flex`):** `liquid-glass hidden md:flex items-center gap-1 rounded-xl px-2 py-2`. Map over `navLinks`. Each button: `flex items-center gap-0.5 px-3 py-1.5 rounded-md text-sm transition-colors`. The active link gets `bg-white/15 text-white`; others get `text-white/70 hover:text-white`. Dropdown links additionally render `<ChevronDown size={13} className="mt-px" />`.
- **Desktop CTAs (right, `hidden md:flex items-center gap-3`):**
  - "Log in": `liquid-glass text-white text-sm font-medium px-4 py-2.5 rounded-full hover:bg-white/5 transition-colors`
  - "Begin Now": `bg-white text-black text-sm font-medium px-4 py-2.5 rounded-full hover:bg-white/90 transition-colors`
- **Mobile toggle (`md:hidden`):** `md:hidden liquid-glass text-white p-2 rounded-lg`, with `aria-label` of `Close menu` when open or `Open menu` when closed. Renders `<X size={18} />` when `menuOpen` is true, otherwise `<Menu size={18} />`. `onClick` toggles `menuOpen`.

## Mobile Menu

Rendered only when `menuOpen` is true: `absolute top-[72px] left-4 right-4 z-30 md:hidden liquid-glass rounded-2xl p-4 flex flex-col gap-1`.

- Same `navLinks` rendered as buttons: `flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm transition-colors`. Active gets `bg-white/15 text-white`; others `text-white/70 hover:text-white`. Dropdown links render `<ChevronDown size={13} className="mt-px" />`.
- Bottom CTA row: `flex gap-2 mt-2 pt-3 border-t border-white/10` containing two `flex-1` buttons matching the desktop styles:
  - "Log in": `flex-1 liquid-glass text-white text-sm font-medium px-4 py-2.5 rounded-full hover:bg-white/5 transition-colors`
  - "Begin Now": `flex-1 bg-white text-black text-sm font-medium px-4 py-2.5 rounded-full hover:bg-white/90 transition-colors`

## Hero Content (Bottom-Left)

Container: `absolute bottom-0 left-0 z-20 px-6 sm:px-12 pb-10 sm:pb-16 max-w-2xl`.

- **Heading `<h1>`:** `text-white text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight tracking-tight mb-4`
  - Text: `Live Better, Feel Whole Every Day`
- **Paragraph `<p>`:** `text-white/60 text-sm leading-relaxed mb-7 max-w-md`
  - Text: `Take charge of how you feel with a companion built for your journey—build routines, follow your growth, and unlock tailored insights for a steadier, more vibrant life each day.` (the em dash is written as `&mdash;` in the source).
- **Buttons row:** `flex flex-wrap items-center gap-3`
  - "Start Today": `bg-white text-black text-sm sm:text-base font-medium px-6 sm:px-7 py-3 rounded-full hover:bg-white/90 transition-colors`
  - "Discover How": `liquid-glass text-white text-sm sm:text-base font-medium px-6 sm:px-7 py-3 rounded-full hover:bg-white/5 transition-colors`

## Animations / Interactions

- All buttons use the Tailwind `transition-colors` utility for hover state changes.
- The liquid-glass effect relies on `backdrop-filter: blur(4px)` plus the animated-looking gradient-border `::before` pseudo-element.
- No additional keyframe animations. The looping background video itself provides all the motion on the page.

## File Structure

```
equilibrium-liquid-glass-hero/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    └── vite-env.d.ts
```

### Supporting config files

**`postcss.config.js`:**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**`vite.config.ts`:**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

## Dependencies

- **dependencies:** `react` (^18.3.1), `react-dom` (^18.3.1), `lucide-react` (^0.468.0)
- **devDependencies:** `@types/react` (^18.3.12), `@types/react-dom` (^18.3.1), `@vitejs/plugin-react` (^4.3.4), `autoprefixer` (^10.4.20), `postcss` (^8.4.49), `tailwindcss` (^3.4.16), `typescript` (~5.6.3), `vite` (^5.4.11)
- **scripts:** `dev` → `vite`, `build` → `tsc && vite build`, `preview` → `vite preview`
