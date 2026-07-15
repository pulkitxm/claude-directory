# Vanguard — Cinematic Hero Landing

## Overview

Build a fullscreen hero landing page for a creative agency called "Vanguard". The page is a single viewport-height section with a looping background video and all content overlaid on top. It is built with React, Tailwind CSS, and Vite as a single `App.tsx` component using `useState` for a mobile menu toggle. No routing is needed.

## Tech Stack

- **Framework:** React 18 (`react` `^18.3.1`, `react-dom` `^18.3.1`) in `StrictMode`, written in TypeScript (`^5.6.3`).
- **Build tool:** Vite (`^5.4.10`) with `@vitejs/plugin-react` (`^4.3.3`).
- **Styling:** Tailwind CSS (`^3.4.14`) with PostCSS (`^8.4.49`) and Autoprefixer (`^10.4.20`).
- **Icons:** `lucide-react` (`^0.460.0`) — `ArrowUpRight`, `Award`, `Crown`, and `X`.
- **Fonts:** "FSP DEMO - PODIUM Sharp 4.11" (brand name and main heading) and Inter (body text, nav links, stats, CTAs).
- **Testing:** Vitest (`^2.1.4`) with `jsdom` (`^25.0.1`), `@testing-library/react` (`^16.0.1`), and `@testing-library/dom` (`^10.4.0`).
- **Notable techniques:** fullscreen autoplaying looped background video, CSS `@keyframes` staggered fade-up entrance animations, a gradient scrim for text legibility, and a fullscreen mobile menu overlay with staggered transition delays.

## Global Setup

### `index.html`

- `lang="en"`, `charset="UTF-8"`, viewport meta `width=device-width, initial-scale=1.0`.
- Title: `VANGUARD — World-Class Digital Collective`.
- Meta description: `VANGUARD is a world-class digital collective building fierce brand identities. Design. Disrupt. Conquer.`
- Preconnect to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (the latter with `crossorigin`).
- Load the Podium font stylesheet: `<link href="/fonts/fsp-demo-podium-sharp.css" rel="stylesheet" />`.
- Load Inter from Google Fonts (weights 400, 500, 600, 700): `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />`.
- Mount point `<div id="root"></div>` and `<script type="module" src="/src/main.tsx"></script>`.

### Fonts

1. **"FSP DEMO - PODIUM Sharp 4.11"** — used for the brand name and main heading. Exposed via a local `@font-face` stylesheet at `/fonts/fsp-demo-podium-sharp.css` and registered in Tailwind as `fontFamily.podium`.

   > **Note:** the original brief loaded this font directly from `https://db.onlinewebfonts.com/c/8b75d9dcff6a48c35a46656192adf019?family=FSP+DEMO+-+PODIUM+Sharp+4.11`. In the current source it has been vendored locally — the font files live under `/public/fonts/` (`8b75d9dcff6a48c35a46656192adf019.{eot,woff,woff2,ttf,svg}`) and are referenced by `fsp-demo-podium-sharp.css`:

   ```css
   /*
         www.OnlineWebFonts.Com
         Font made from Web Fonts is licensed by CC BY 4.0
         font-family: "FSP DEMO - PODIUM Sharp 4.11";
         Localized for offline use.
   */

   @font-face {
     font-family: "FSP DEMO - PODIUM Sharp 4.11";
     src: url("/fonts/8b75d9dcff6a48c35a46656192adf019.eot");
     src: url("/fonts/8b75d9dcff6a48c35a46656192adf019.eot?#iefix") format("embedded-opentype"),
       url("/fonts/8b75d9dcff6a48c35a46656192adf019.woff") format("woff"),
       url("/fonts/8b75d9dcff6a48c35a46656192adf019.woff2") format("woff2"),
       url("/fonts/8b75d9dcff6a48c35a46656192adf019.ttf") format("truetype"),
       url("/fonts/8b75d9dcff6a48c35a46656192adf019.svg#FSP DEMO - PODIUM Sharp 4.11") format("svg");
     font-weight: normal;
     font-style: normal;
     font-display: swap;
   }
   ```

2. **Inter** — from Google Fonts (weights 400, 500, 600, 700), used for body text, nav links, stats, and CTAs. Registered in Tailwind as `fontFamily.inter`.

### `tailwind.config.js`

Register both font families:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        podium: ['"FSP DEMO - PODIUM Sharp 4.11"', 'Impact', 'Haettenschweiler', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### `postcss.config.js`

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### `src/main.tsx`

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

## Layout

The root is a `relative h-screen w-full overflow-hidden bg-black` container holding three stacked layers:

1. **Background video** — `absolute inset-0 h-full w-full object-cover`, filling the entire viewport.
2. **Gradient scrim** — `absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10`. This keeps the white text legible over bright video frames.
3. **Content layer** — `relative z-10 flex h-full flex-col`, containing the navbar (`header`), the mobile menu overlay, and the hero (`main`).

### Background Video

Use a fullscreen `<video>` element with `autoPlay`, `muted`, `loop`, and `playsInline` attributes, set to `object-cover` to fill the entire viewport.

- In source the video is referenced via a constant: `const VIDEO_URL = '/assets/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4'` (vendored locally under `/public/assets/`).

  > **Note:** the original brief specified this exact CloudFront URL: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4`. The file has since been vendored locally to the `/assets/...` path above.

```tsx
<video
  className="absolute inset-0 h-full w-full object-cover"
  src={VIDEO_URL}
  autoPlay
  muted
  loop
  playsInline
/>
```

## Navbar

A horizontal bar at the top: `flex items-center justify-between px-6 py-5 sm:px-10 lg:px-16 lg:py-7`.

- **Left — brand name:** "VANGUARD" as a link in `font-podium`, white, bold, uppercase, `text-2xl sm:text-3xl`, `tracking-wider` (`font-podium text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl`).
- **Center (hidden below `md`):** four nav links — "Projects", "Studio", "Offerings", "Inquire" — rendered from a `NAV_LINKS` array. Container is `hidden items-center gap-8 md:flex lg:gap-10`. Each link is `font-inter text-sm uppercase tracking-widest text-white/80 transition-colors hover:text-white`.
- **Right (hidden below `md`):** a "GET IN TOUCH" link with an `ArrowUpRight` icon (`h-4 w-4`), styled as a bordered button: `hidden items-center gap-2 border border-white/30 px-6 py-3 font-inter text-xs uppercase tracking-widest text-white transition-colors hover:border-white/60 hover:bg-white/10 md:flex`.
- **Right (visible below `md`):** a hamburger button (`aria-label="Open menu"`, `onClick={() => setMenuOpen(true)}`, `space-y-1.5 md:hidden`) made of three white `div` bars: `h-0.5 w-6 bg-white`, `h-0.5 w-6 bg-white`, and `h-0.5 w-4 bg-white`.

## Mobile Menu Overlay (below `md` only)

- Fixed fullscreen overlay: `fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm transition-all duration-500 md:hidden`. Has `data-testid="mobile-menu"`.
- Toggles visibility via React `useState` (`menuOpen`) — when open: `visible opacity-100`; when closed: `invisible opacity-0`.
- **Header row** matches the navbar (`flex items-center justify-between px-6 py-5 sm:px-10`): brand name "VANGUARD" on the left (`font-podium text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl`), and an `X` close icon on the right (`h-7 w-7`, `aria-label="Close menu"`, `onClick={() => setMenuOpen(false)}`).
- **Centered nav** (`flex flex-1 flex-col items-center justify-center gap-8`): each of the 4 nav links rendered in `font-podium text-4xl uppercase text-white transition-all duration-500 sm:text-5xl`, with staggered entrance animations via inline `style`:
  - `transitionDelay: ${i * 80 + 100}ms`
  - `opacity: menuOpen ? 1 : 0`
  - `transform: menuOpen ? 'translateY(0)' : 'translateY(20px)'`
- **Below the links:** a "GET IN TOUCH" bordered button with the same staggered animation pattern: `mt-6 flex items-center gap-2 border border-white/30 px-8 py-4 font-inter text-xs uppercase tracking-widest text-white transition-all duration-500 hover:border-white/60 hover:bg-white/10`, with an `ArrowUpRight` icon (`h-4 w-4`). Its inline `style` uses `transitionDelay: ${NAV_LINKS.length * 80 + 100}ms` plus the same `opacity`/`transform` rules.
- All links and the button call `setMenuOpen(false)` on click.

## Hero Content

Vertically centered, left-aligned: `main` is `flex flex-1 items-center px-6 sm:px-10 lg:px-16` wrapping a single content `div`. All hero elements use staggered `animate-fade-up` animations (see [Animations](#animations)); each successive element has an additional `0.2s` delay.

1. **Tagline** (`animate-fade-up`, no delay, `mb-6 lg:mb-8`, `flex items-center gap-3`): a `Crown` icon (`h-4 w-4 text-white/70`) followed by "World-Class Digital Collective" in `font-inter text-xs uppercase tracking-[0.3em] text-white/70 sm:text-sm`.

2. **Main heading** (`animate-fade-up-delay-1`, 0.2s delay): an `h1` in `font-podium uppercase leading-[0.92] tracking-tight text-white`, with three lines, each a `span` of `block text-[clamp(2.8rem,8vw,7rem)]`:
   - "Design."
   - "Disrupt."
   - "Conquer."

3. **Subtext** (`animate-fade-up-delay-2`, 0.4s delay, `mt-6 lg:mt-8`): a `p` in `max-w-md font-inter text-sm leading-relaxed text-white/70 sm:text-base`, reading "We build fierce brand identities" then a line break `<br />`, then "that don't just turn heads — " (the em dash uses `&apos;` for the apostrophe in "don't"), followed by bold white "they lead." (`<span className="font-bold text-white">they lead.</span>`).

4. **CTA row** (`animate-fade-up-delay-3`, 0.6s delay, `mt-8 lg:mt-10`, `flex flex-wrap items-center gap-4 sm:gap-6`):
   - **Black button "SEE OUR WORK"** with an `ArrowUpRight` icon: `group flex items-center gap-2 bg-black px-5 py-3 font-inter text-[11px] uppercase tracking-widest text-white transition-colors hover:bg-neutral-900 sm:px-7 sm:py-4 sm:text-xs`. The arrow (`h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5`).
   - **Award badge (hidden on mobile, `hidden items-center gap-3 sm:flex`):** an `Award` icon (`h-8 w-8 text-white/50`) beside two lines of text in `font-inter text-xs uppercase tracking-wider text-white/60`: "Top-Rated" / "Brand Studio".

5. **Stats row** (`animate-fade-up-delay-4`, 0.8s delay, `mt-8 sm:mt-10 lg:mt-14`, `flex flex-wrap gap-6 sm:gap-12 lg:gap-16`): three stats rendered from a `STATS` array:
   - "250+" / "Brands Transformed"
   - "95%" / "Client Retention"
   - "10+" / "Years in the Game"

   Values are in `font-inter text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl`. Labels are in `mt-1 font-inter text-[9px] uppercase tracking-widest text-white/50 sm:text-xs`.

## Animations

Defined in `src/index.css` under `@layer utilities`. The keyframes:

```css
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

The utility classes (each `0.8s ease-out`, with `forwards` fill-mode and starting `opacity: 0`):

```css
.animate-fade-up {
  animation: fade-up 0.8s ease-out forwards;
  opacity: 0;
}
.animate-fade-up-delay-1 {
  animation: fade-up 0.8s ease-out 0.2s forwards;
  opacity: 0;
}
.animate-fade-up-delay-2 {
  animation: fade-up 0.8s ease-out 0.4s forwards;
  opacity: 0;
}
.animate-fade-up-delay-3 {
  animation: fade-up 0.8s ease-out 0.6s forwards;
  opacity: 0;
}
.animate-fade-up-delay-4 {
  animation: fade-up 0.8s ease-out 0.8s forwards;
  opacity: 0;
}
.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
  opacity: 0;
}
.animate-fade-in-delay {
  animation: fade-in 0.8s ease-out 0.3s forwards;
  opacity: 0;
}
```

The `fade-up` keyframes translate from `translateY(30px), opacity: 0` to `translateY(0), opacity: 1`. The mobile menu items use inline-style transitions (not these utility classes) — see [Mobile Menu Overlay](#mobile-menu-overlay-below-md-only).

## Color Palette

- **Base background:** `bg-black` (`#000000`), with the black CTA button also `bg-black` and its hover state `bg-neutral-900`.
- **Scrim gradient:** left-to-right `from-black/60 via-black/30 to-black/10`.
- **Text:** white at varying opacities — `text-white`, `text-white/80` (nav links), `text-white/70` (tagline, subtext), `text-white/60` (award badge text), `text-white/50` (award icon, stat labels).
- **Borders:** `border-white/30` with `hover:border-white/60`; button hover background `hover:bg-white/10`.
- **Mobile overlay:** `bg-black/95 backdrop-blur-sm`.

## Responsive Behavior

- Mobile-first layout with breakpoints at `sm` (640px), `md` (768px), and `lg` (1024px).
- Nav links and the "GET IN TOUCH" button show at `md`+; the hamburger shows below `md`.
- The award badge hides on mobile (`hidden sm:flex`).
- All text sizes, paddings, gaps, and margins scale up through `sm:` and `lg:` prefixes.
- The stats and CTA rows use `flex-wrap` to prevent overflow on small screens.
- Make everything fully mobile responsive.

## File Structure

- `index.html` — entry HTML with font links and metadata.
- `src/main.tsx` — React entry; renders `<App />` in `StrictMode`.
- `src/App.tsx` — single component holding all UI, with `useState` for the menu toggle and the `VIDEO_URL`, `NAV_LINKS`, and `STATS` constants.
- `src/index.css` — Tailwind layers plus the `@layer utilities` animations.
- `tailwind.config.js`, `postcss.config.js`, `vite.config.ts`, `tsconfig.json` — build configuration.
- `public/fonts/` — vendored Podium font files and `fsp-demo-podium-sharp.css`.
- `public/assets/` — vendored background video.

### `src/App.tsx` structure reference

The component begins with the shared constants:

```tsx
import { useState } from 'react'
import { ArrowUpRight, Award, Crown, X } from 'lucide-react'

const VIDEO_URL =
  '/assets/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4'

const NAV_LINKS = ['Projects', 'Studio', 'Offerings', 'Inquire']

const STATS = [
  { value: '250+', label: 'Brands Transformed' },
  { value: '95%', label: 'Client Retention' },
  { value: '10+', label: 'Years in the Game' },
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  // ...
}
```
