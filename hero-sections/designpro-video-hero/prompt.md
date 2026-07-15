# DesignPro — Cinematic Video Hero Section

## Overview

Build a full-screen, immersive hero section for a product design education platform called **DesignPro**. The section fills the viewport with a looping muted video background, layered with a legibility scrim, a pill-style navigation bar, two short intro paragraphs, and a large centered headline whose second line carries an animated, continuously sweeping shiny gradient. Entrance animations stagger the content into view, and a rounded call-to-action button invites enrollment.

## Tech Stack

- **Framework:** React 18 (`react` `^18.3.1`, `react-dom` `^18.3.1`) with TypeScript (`typescript` `~5.6.2`).
- **Build tool:** Vite (`vite` `^6.0.3`) with `@vitejs/plugin-react` `^4.3.4`.
- **Styling:** Tailwind CSS v4 (`tailwindcss` `^4.0.0`) via the `@tailwindcss/vite` `^4.0.0` plugin, imported with `@import 'tailwindcss';`.
- **Animation:** Motion / Framer Motion (`framer-motion` `^11.15.0`) — used for entrance fades, the shiny-text sweep, and the mobile menu transitions.
- **Icons:** Lucide React (`lucide-react` `^0.468.0`) — `ArrowRight`, `ArrowUpRight`, `Menu`, `X`.
- **Font:** Inter (weights 400, 500, 600), loaded from Google Fonts.
- **Testing:** Playwright (`playwright` `^1.60.0`).
- **Notable techniques:** `background-clip: text` with a transparent text fill for the gradient shine, animated `backgroundPosition` for the continuous sweep, a `MotionConfig` with `reducedMotion="user"` to respect accessibility preferences, and a legibility gradient scrim over the video.

## Global Setup

### `index.html`

- `lang="en"`, `charset="UTF-8"`, viewport `width=device-width, initial-scale=1.0`.
- Meta description: `DesignPro — transformative programs that turn emerging product designers into product leaders.`
- Page title: `DesignPro — Become Product Leader.`
- Preconnect to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (the latter with `crossorigin`).
- Load Inter via `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap`.
- Inline `<style>` setting `html { background-color: #000000; }`.
- Root element `<div id="root"></div>` and module script `/src/main.tsx`.

### `src/main.tsx`

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
);
```

### `src/index.css`

```css
@import 'tailwindcss';

@theme {
  --font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
}

html,
body,
#root {
  height: 100%;
}

body {
  margin: 0;
  background-color: #000000;
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

::selection {
  background-color: #64cefb;
  color: #000000;
}
```

## Layout (`src/App.tsx`)

- Root is a `<section>` with classes `relative h-screen overflow-hidden bg-black font-sans` — full viewport height, black background, Inter font.
- **Background video:** an `absolute inset-0 h-full w-full object-cover` `<video>` element that is `autoPlay`, `loop`, `muted`, `playsInline`, and `aria-hidden`. Its `src` points to the local asset.
  - Source uses the vendored local path: `/assets/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4` (stored at `public/assets/...`).
  - Note: the original brief specified an external CloudFront URL — `https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4` — but the implementation vendors this video locally. (The scheme/host above are lowercased from the all-caps original; the path is kept verbatim apart from case, since the canonical source uses the local path.)
- **Legibility scrim:** a `pointer-events-none absolute inset-0` div with `bg-gradient-to-b from-black/55 via-black/15 to-black/60`, `aria-hidden`, to keep type crisp over bright video frames.
- **Content wrapper:** `relative z-10 flex h-full flex-col` so all content sits above the video.
- **Bottom spacer:** a final `h-10 md:h-14` `aria-hidden` div for breathing room so the centered hero sits optically true.
- Container max width throughout is `max-w-7xl`, centered with `mx-auto`, padded `px-4 sm:px-6 lg:px-8`.

### Entrance Animation Helper

Shared easing and a reusable `fadeUp` factory drive the staggered entrance:

```tsx
const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});
```

## Navbar (`src/components/Navbar.tsx`)

- `<header>` with `relative z-20`.
- The nav is a `motion.nav` animating in from `{ opacity: 0, y: -16 }` to `{ opacity: 1, y: 0 }` over `duration: 0.7` with ease `[0.22, 1, 0.36, 1]`.
- Nav classes: `mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 sm:px-6 md:py-6 lg:px-8`, `aria-label="Primary"`.

### Logo

- Anchor with class `group flex items-center gap-2.5`.
- Outer mark: `flex h-9 w-9 items-center justify-center rounded-full border-2 border-white transition-transform duration-300 group-hover:rotate-90` (a circle with a 2px white border that rotates 90° on hover).
- Inner mark: `h-3.5 w-3.5 rounded-full bg-white transition-transform duration-300 group-hover:scale-110` (a smaller filled white circle that scales up on hover).
- Wordmark: `text-lg font-medium tracking-tight text-white` reading **DesignPro**.

### Desktop Pill Navigation (lg and up)

- Container: `hidden items-center gap-1 rounded-full border border-gray-700 bg-black/30 p-1.5 backdrop-blur-md lg:flex`.
- Link list comes from:

```tsx
const NAV_LINKS = ['Home', 'About Us', 'Courses', 'Instructors', 'Testimonials', 'Blog'];
```

- Each link: `rounded-full px-4 py-2 text-sm text-white/80 transition-colors duration-300 hover:bg-white/10 hover:text-white`.
- A final **Contact us** link with an `ArrowUpRight` icon: container class `group/contact flex items-center gap-1.5 rounded-full px-4 py-2 text-sm text-white/80 transition-colors duration-300 hover:bg-white/10 hover:text-white`. The icon is `h-4 w-4 transition-transform duration-300 group-hover/contact:translate-x-0.5 group-hover/contact:-translate-y-0.5` so it nudges up and to the right on hover.

### Mobile Hamburger (below lg)

- A `<button>` toggling `menuOpen` state via `useState(false)`, with `aria-expanded={menuOpen}` and `aria-label` of `'Close menu'` / `'Open menu'`.
- Class: `flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 bg-black/30 text-white/80 backdrop-blur-md transition-colors duration-300 hover:text-white lg:hidden`.
- Shows `<X className="h-5 w-5" />` when open, `<Menu className="h-5 w-5" />` when closed (both `aria-hidden`).

### Mobile Menu Panel

- Wrapped in `<AnimatePresence>`; rendered only when `menuOpen`.
- Panel: `motion.div` animating `initial={{ opacity: 0, y: -12, scale: 0.98 }}`, `animate={{ opacity: 1, y: 0, scale: 1 }}`, `exit={{ opacity: 0, y: -12, scale: 0.98 }}`, `transition={{ duration: 0.25, ease: 'easeOut' }}`.
- Panel class: `absolute inset-x-4 top-full rounded-3xl border border-gray-700 bg-black/80 p-3 backdrop-blur-xl sm:inset-x-6 lg:hidden`.
- Each link item is a `motion.li` staggered by `delay: 0.04 * index`, `duration: 0.25`, animating from `{ opacity: 0, x: -8 }` to `{ opacity: 1, x: 0 }`.
- Each link anchor: `block rounded-2xl px-4 py-3 text-sm text-white/80 transition-colors duration-300 hover:bg-white/10 hover:text-white`, and closes the menu on click.
- A trailing **Contact us** item (delay `0.04 * NAV_LINKS.length`) with an `ArrowUpRight` icon (`h-4 w-4`), anchor class `flex items-center gap-1.5 rounded-2xl px-4 py-3 text-sm text-white/80 transition-colors duration-300 hover:bg-white/10 hover:text-white`.

## Hero Content

### Top Section (below nav)

- Container: `mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 md:pt-8 lg:px-8`.
- Grid: `grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8` — two columns on large screens, stacked on mobile.
- **Left paragraph** (`motion.p`, `fadeUp(0.15)`), class `max-w-md text-sm text-white/80 md:text-base`:
  > We deliver transformative programs that empower emerging product designers with cutting-edge expertise and vision to thrive globally.
- **Right paragraph** (`motion.p`, `fadeUp(0.25)`), right-aligned on lg+, class `text-sm text-white/80 md:text-base lg:text-right`:
  > 8000+ Talented Designers Launched !

### Hero Center

- Outer wrapper: `flex flex-1 items-center justify-center`; inner: `mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8`.
- **Eyebrow** (`motion.p`, `fadeUp(0.35)`), class `text-xs uppercase tracking-tight text-white/80 md:text-sm`:
  > Seats for Next Program Opening Soon
- **Main heading** `<h1>` with class `mt-4 text-5xl leading-[0.85] tracking-tighter sm:text-6xl md:mt-6 md:text-7xl lg:text-8xl xl:text-9xl` (font size scales `text-5xl` → `text-9xl`, line height `0.85`, tight letter spacing):
  - **Line 1** (`motion.span`, `fadeUp(0.45)`), class `block font-medium text-white`: **Become**
  - **Line 2** (`motion.span`, `fadeUp(0.55)`), class `mt-1 block md:mt-2`: renders the `ShinyText` component with `text="Product Leader."`, `speed={3}`, `spread={100}`, `baseColor="#64CEFB"`, `shineColor="#ffffff"`, `className="font-medium"`.

### CTA Button

- Wrapper (`motion.div`, `fadeUp(0.7)`): `mt-10 flex justify-center md:mt-14`.
- Anchor (`href="#"`) class: `group inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 text-sm font-medium text-white shadow-lg shadow-black/40 ring-1 ring-white/10 transition-all duration-300 hover:bg-gray-900 hover:ring-white/20 md:px-8 md:py-4 md:text-base`.
  - Black background, hover to `gray-900`, fully rounded pill, padding `px-6 py-3` scaling to `md:px-8 md:py-4`.
- Label text: **Apply for Next Enrollment**.
- Trailing `ArrowRight` icon, class `h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 md:h-5 md:w-5` (translates right on hover via group hover), `aria-hidden`.

## ShinyText Component (`src/components/ShinyText.tsx`)

A `motion.span` that paints a sweeping gradient onto its glyphs using `background-clip: text` with transparent text fill, animating the background position for a seamless left-to-right shine loop.

### Props

```tsx
interface ShinyTextProps {
  /** The text to render with the shiny sweep effect. */
  text: string;
  /** Seconds for one full left-to-right sweep. */
  speed?: number;
  /** Gradient angle in degrees. */
  spread?: number;
  /** Resting color of the text. */
  baseColor?: string;
  /** Color of the moving shine band. */
  shineColor?: string;
  className?: string;
}
```

- Defaults: `speed = 3`, `spread = 100`, `baseColor = '#64CEFB'`, `shineColor = '#ffffff'`, `className = ''`.

### Implementation

```tsx
import { motion } from 'framer-motion';

export default function ShinyText({
  text,
  speed = 3,
  spread = 100,
  baseColor = '#64CEFB',
  shineColor = '#ffffff',
  className = '',
}: ShinyTextProps) {
  return (
    <motion.span
      className={className}
      style={{
        backgroundImage: `linear-gradient(${spread}deg, ${baseColor} 35%, ${shineColor} 50%, ${baseColor} 65%)`,
        backgroundSize: '200% 100%',
        backgroundRepeat: 'repeat',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
      }}
      initial={{ backgroundPosition: '100% 0%' }}
      animate={{ backgroundPosition: '-100% 0%' }}
      transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
    >
      {text}
    </motion.span>
  );
}
```

### How the sweep works

- The gradient is `linear-gradient(${spread}deg, ${baseColor} 35%, ${shineColor} 50%, ${baseColor} 65%)` — a `spread`-degree (default 100°) sweep with the shine band centered.
- `backgroundSize: '200% 100%'` makes the background twice the element width, and Framer Motion slides `backgroundPosition` from `100% 0%` to `-100% 0%` forever (`repeat: Infinity`, `ease: 'linear'`).
- Because the tile period equals the background width, the loop restart is seamless; the decreasing position translates the gradient image rightward so the shine band sweeps across the text from left to right.
- `speed` controls the seconds for one full sweep (default 3s).

## Color Palette

- **Background:** black `#000000`.
- **Body text:** white at 80% opacity (`text-white/80`); headings and hover states are full white.
- **Shiny base color:** `#64CEFB` (also used as `#64cefb` for `::selection` background).
- **Shiny shine color:** `#ffffff`.
- **Selection:** background `#64cefb`, text `#000000`.
- **Borders / accents:** `border-gray-700` (nav pill, hamburger, mobile panel), `ring-white/10` → `ring-white/20` on the CTA, `bg-white/10` hover fills.

## Typography

- Font family Inter (sans-serif), set via the `--font-sans` theme token and `font-sans` utility.
- Body text uses white/80 opacity; headings and hover states use full white.

## Responsive Breakpoints

- Mobile-first design.
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px (the desktop pill nav appears; hamburger hides)
- `xl`: 1280px (headline reaches `text-9xl`)

## File Structure

```
designpro-video-hero/
├── index.html
├── package.json
├── public/
│   └── assets/
│       └── hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    └── components/
        ├── Navbar.tsx
        └── ShinyText.tsx
```

## Implementation Notes

- Build the complete implementation including the `ShinyText` component with proper Framer Motion animation logic.
- Smooth transitions on all interactive elements (`transition-colors` / `transition-transform` / `transition-all` with `duration-300`).
- The video uses absolute positioning with `inset-0` and `object-cover`; content sits in a `relative z-10` stack above it.
- `MotionConfig reducedMotion="user"` ensures the animations honor users who prefer reduced motion.
