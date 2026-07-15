# Taskly — Liquid Glass Hero Section

## Overview

Build a high-fidelity "liquid glass" landing-page hero for a fictional task-management product called Taskly. It pairs a frosted-glass sticky navbar and a glassmorphic primary CTA with a vivid, color-graded "glassy orb" video on the right, all set against a pure-white page with a soft layered blue gradient glow in the top-left. The design must be fully responsive, transitioning from a single-column mobile layout to a dual-column desktop layout.

## Tech Stack

- **Framework:** React with TypeScript.
- **Build tool:** Vite.
- **Styling:** Tailwind CSS (with PostCSS and Autoprefixer). Heavy use of arbitrary-value utilities (e.g. `backdrop-blur-[50px]`, `bg-[rgba(0,132,255,0.8)]`, `[box-shadow:inset_...]`, `[filter:...]`).
- **Fonts:** Fustat (headlines + brand) and Inter (body + UI), loaded from Google Fonts.
- **Notable techniques:** `mix-blend-screen` over a dark radial field to knock out a video's black background; CSS `filter` color grading to recolor the orb; CSS keyframe entrance choreography with staggered delays; `prefers-reduced-motion` support; a CSS fallback orb when the remote `.webm` is unreachable.

(The original brief does not pin specific dependency versions or mandate a testing harness; choose versions and any verification tooling at your discretion.)

## Global Setup

### Fonts

Load Fustat and Inter from Google Fonts in `index.html` `<head>`, with preconnects:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Fustat:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

Expose them through Tailwind in `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        fustat: ['Fustat', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- **Headlines & brand:** use Fustat (bold), via `font-fustat`.
- **Body & UI:** use Inter (normal/medium), via `font-inter`.

### Document head

In `index.html`:

- **Title / description / favicon:** set a document title, meta description, and favicon as appropriate for the Taskly product. Exact copy and favicon artwork are at the implementer's discretion (the original brief does not specify them).
- **Viewport:** `width=device-width, initial-scale=1.0`.
- Root mount: `<div id="root"></div>` plus `<script type="module" src="/src/main.tsx"></script>`.

### Base styles (`src/index.css`)

Start with Tailwind layers, then base resets:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply font-inter bg-white text-[#0B1526];
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
  ::selection {
    background: rgba(0, 132, 255, 0.18);
  }
}
```

- Apply `-webkit-font-smoothing: antialiased` for the sharpest typography.
- Default body text color is `#0B1526`; selection highlight is `rgba(0, 132, 255, 0.18)`.

### Entry point (`src/main.tsx`)

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

## Layout (`src/App.tsx`)

- Outer wrapper: `relative min-h-screen overflow-x-clip bg-white`.
- **Background glow** — a `pointer-events-none absolute inset-0` layer (`aria-hidden="true"`) holding subtle, layered blurred ellipses in the top-left, behind everything, using light blue `#60B1FF` and `#319AFF`:
  - `absolute -left-[260px] -top-[220px] h-[620px] w-[940px] rounded-full bg-[#60B1FF] opacity-[0.33] blur-[140px]`
  - `absolute -left-[120px] -top-[140px] h-[430px] w-[640px] rounded-full bg-[#319AFF] opacity-[0.26] blur-[110px]`
- **Main container (z-10):** `relative z-10 mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14`, containing the `Navbar`, then a `<main>` with `Hero` and `TrustedBy`.

## Navbar — Strong Liquid Glass (`src/components/Navbar.tsx`)

A centered, sticky, content-width frosted-glass bar (`aria-label="Primary"`):

```
reveal sticky top-[30px] z-50 mx-auto flex w-fit items-center gap-1 rounded-[16px] border border-black/10 bg-white/30 py-2 pl-3 pr-2 backdrop-blur-[50px] [box-shadow:inset_0px_4px_4px_0px_rgba(255,255,255,0.25),0_18px_50px_-20px_rgba(13,42,89,0.25)]
```

- **Position:** sticky at `top-[30px]`, centered (`mx-auto`), `w-fit`.
- **Visuals:** `backdrop-blur-[50px]`, background `bg-white/30` (rgba(255,255,255,0.3)), `rounded-[16px]`.
- **Fidelity details:**
  - Outer stroke: `border border-black/10` (1px solid rgba(0,0,0,0.1)).
  - Inner highlight shadow: `inset 0px 4px 4px 0px rgba(255,255,255,0.25)` (plus an ambient drop shadow `0 18px 50px -20px rgba(13,42,89,0.25)`).

### Brand

An anchor (`aria-label="Taskly home"`, `mr-2 flex items-center gap-2 pl-1 pr-2`) containing:

- A 26×26 SVG logo on a 32×32 viewBox: a `rgba(0,132,255,0.85)` rounded square (`rx="9"`), overlaid with a diagonal white shine gradient (`tasklyShine`, white `stopOpacity="0.45"` → white `stopOpacity="0"` at offset `0.5`), and a white check path `M9 16.5l5 5 9-10` (`strokeWidth="3.2"`, round caps/joins).
- The wordmark `Taskly` in `font-fustat text-[21px] font-bold tracking-[-0.5px] text-[#0B1526]`.

### Nav links

Rendered from `const LINKS = ['Home', 'Features', 'Company', 'Pricing']`, hidden on mobile and shown on `md` (`hidden items-center md:flex`). Each link:

```
rounded-[10px] px-4 py-2 text-[15px] font-medium text-slate-700 transition-colors duration-200 hover:bg-white/60 hover:text-slate-950
```

### Glassy SignUp button

A glassy button reading `SignUp` with a trailing arrow icon:

```
group ml-2 flex items-center gap-2 rounded-[12px] border border-black/10 bg-white/45 px-4 py-2 text-[15px] font-semibold text-[#0B1526] backdrop-blur-[10px] transition-all duration-200 [box-shadow:inset_0px_4px_4px_0px_rgba(255,255,255,0.4)] hover:bg-white/70
```

- The arrow icon nudges right on hover (`group-hover:translate-x-0.5`).

### Arrow icon

A reusable 15×15 SVG on a `0 0 24 24` viewBox, `stroke="currentColor"`, `strokeWidth="2.4"`, round caps/joins, paths `M5 12h14` and `m13 6 6 6-6 6`:

```tsx
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}
```

## Hero (`src/components/Hero.tsx`)

A responsive two-column grid: single column on mobile, dual column on `lg`.

- **Section:** `grid grid-cols-1 items-center gap-8 pt-14 sm:pt-20 lg:grid-cols-2 lg:gap-4 lg:pt-8`.
- A small helper applies staggered entrance delays via a CSS custom property:

  ```tsx
  const delay = (s: number) => ({ '--d': `${s}s` }) as CSSProperties
  ```

### Hero left (content column)

Wrapper: `pt-2 lg:py-24`.

- **Social proof badge** (`delay(0.05)`):
  - Container: a `w-fit` rounded-full glassy pill (`flex items-center gap-2.5`, light border, `bg-white/60`, `backdrop-blur-[20px]`).
  - Five orange `#FF801E` stars (the exact star SVG geometry/viewBox is at the implementer's discretion).
  - Text (`text-[14px] font-medium tracking-[-0.2px] text-slate-700`): `Rated` **`4.9/5`** (`font-semibold text-[#0B1526]`) `by 2700+ customers`.

- **Headline** (`delay(0.15)`):
  - Classes: `reveal mt-7 font-fustat text-[clamp(44px,7vw,64px)] font-bold leading-[1.05] tracking-[-2px] text-[#0B1526] xl:text-[75px]`.
  - Copy: `Work smarter,` then a `<br />`, then `achieve faster` rendered as a gradient-clipped span `bg-gradient-to-r from-[#0084FF] via-[#319AFF] to-[#60B1FF] bg-clip-text text-transparent`.
  - At `xl` the size resolves to 75px; line-height `1.05`; tracking `-2px`.

- **Subheadline** (`delay(0.25)`):
  - Classes: `reveal mt-6 max-w-[560px] font-inter text-[18px] leading-[1.65] tracking-[-1px] text-slate-600` (18px Inter, `-1px` tracking).
  - Copy: `Effortlessly manage your projects, collaborate with your team, and achieve your goals with our intuitive task management tool.`

- **Primary CTA** (`delay(0.35)`, wrapper `reveal mt-9`):
  - Button copy: `Get Started Now`.
  - Classes: `group flex items-center gap-3.5 rounded-[16px] bg-[rgba(0,132,255,0.8)] py-2.5 pl-7 pr-2.5 font-inter text-[17px] font-semibold text-white backdrop-blur-[2px] transition-transform duration-300 ease-out [box-shadow:inset_0px_4px_4px_0px_rgba(255,255,255,0.35),0_22px_45px_-18px_rgba(0,132,255,0.7)] hover:scale-[1.02]`.
  - **Color:** `rgba(0,132,255,0.8)` with `backdrop-blur-[2px]`.
  - **Details:** `rounded-[16px]`, white text, inner highlight shadow `inset 0px 4px 4px 0px rgba(255,255,255,0.35)` (plus glow shadow `0 22px 45px -18px rgba(0,132,255,0.7)`).
  - **Animation:** scales to `1.02` on hover with a smooth transition (`transition-transform duration-300 ease-out`).
  - **Arrow icon:** a white circular button (`flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0084FF]`) holding a 17×17 arrow SVG (`0 0 24 24`, `stroke="currentColor"`, `strokeWidth="2.6"`, round caps/joins, paths `M5 12h14` and `m13 6 6 6-6 6`) that nudges right on hover (`group-hover:translate-x-0.5`).

### Hero right (orb column)

Wrapper `reveal` with `delay(0.3)`, rendering the `GlassyOrb` component.

## Glassy Orb (`src/components/GlassyOrb.tsx`)

The hero's right-side visual: a vivid electric-blue orb produced by screen-blending a remote `.webm` over a dark radial energy field.

- **Source URL:** `https://future.co/images/homepage/glassy-orb/orb-purple.webm` (stored as `const ORB_SRC`).
- **Concept:** the source video is a bright orb on a solid black background. `mix-blend-screen` knocks the black out — but screen-blending over pure white renders nothing (screen only lightens). So a deep ink-blue radial energy field sits *behind* the video: the orb screens over its dark core in vivid electric blue, and the field's fade-to-transparent edge lets the video's black background dissolve seamlessly into the white page.

### Structure

- **Outer container** (`aria-hidden="true"`): `relative mx-auto h-[420px] w-full max-w-[620px] sm:h-[540px] lg:h-[800px] lg:max-w-none lg:translate-x-[6%]`.
- **Dark field behind the video:** a deep ink-blue radial gradient that fades to transparent at its edge, sitting behind the video so `mix-blend-screen` has a dark core to lighten.
- **Floating wrapper** (so the float transform never touches the video's scale): an absolutely positioned layer containing the video.

### Video element (`data-orb-video`)

```
absolute inset-0 m-auto aspect-square w-[105%] max-w-none scale-125 object-cover mix-blend-screen [filter:hue-rotate(-55deg)_saturate(250%)_brightness(1.2)_contrast(1.1)]
```

- **Attributes:** `autoPlay loop muted playsInline preload="auto"` (HTML: `autoplay loop muted playsinline`).
- **Blending mode:** `mix-blend-screen` to filter out the black background.
- **Scaling:** `scale-125` to make it massive and bleed slightly off-center.
- **Exact color grade (CSS filter):** `hue-rotate(-55deg) saturate(250%) brightness(1.2) contrast(1.1)` — transforms the purple asset into a vibrant, high-end "electric brand blue" matching the primary CTA.

> Optional resilience (not in the original brief): if the remote `.webm` fails to load, you may swap in a pure-CSS fallback orb. The exact fallback markup, gradient, and load-failure handling are at the implementer's discretion.

## Trusted By (`src/components/TrustedBy.tsx`)

A footer-logo section reading "Trusted by Top-tier product companies" with five grayscale SVG logos.

- **Section** (`reveal`, `--d: 0.5s`): `reveal pb-20 pt-10 lg:pb-24 lg:pt-2`.
- **Heading** (`p`): `text-center font-inter text-[14px] font-medium tracking-[0.02em] text-slate-500`, copy `Trusted by Top-tier product companies`.
- **Logo row** (`data-logo-row`): `mt-9 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 text-gray-400 lg:gap-x-[100px]` — note the desktop spacing is `gap-[100px]`.

### Logo component

Five grayscale SVG logos — placeholder logos for tech companies — each combining a simple geometric mark with a wordmark label. Exact brand names, mark shapes, and SVG geometry are at the implementer's discretion; render them in a single grayscale color so they read as a uniform "trusted by" row.

## Animations (`src/index.css`)

The original brief does not define specific keyframes, durations, or stagger delays; the following are suggested motion treatments, with exact timings at the implementer's discretion.

- **Entrance choreography:** elements fade and rise into place on mount, with a gentle per-element stagger (e.g. via a `--d` custom property set inline) so the navbar, badge, headline, subheadline, orb, CTA, and Trusted By row appear in sequence.
- **Orb motion:** a slow vertical float for the orb plus a subtle "breathe" (scale/opacity pulse) on the dark field behind it.
- **Reduced motion:** honor `prefers-reduced-motion: reduce` by disabling the entrance and orb animations and collapsing transition durations.

## Color Palette

- **Page background:** white (`#ffffff`).
- **Default text / brand ink:** `#0B1526`.
- **Primary brand blue (CTA / accents):** `#0084FF` / `rgba(0,132,255,0.8)` (CTA fill), `rgba(0,132,255,0.85)` (logo mark).
- **Gradient glow blues:** `#60B1FF`, `#319AFF`; headline gradient `from-[#0084FF] via-[#319AFF] to-[#60B1FF]`.
- **Orb energy field:** a deep ink-blue radial wash that fades to transparent (exact stops at the implementer's discretion).
- **Star rating orange:** `#FF801E`.
- **Selection highlight:** `rgba(0,132,255,0.18)`.
- **Muted UI text:** `text-slate-700`, `text-slate-600`, `text-slate-500`, `text-gray-400` (logos).

## Key Technical Specs

- **Video tag:** `autoplay loop muted playsinline`.
- **Container layering:** use a `relative` wrapper for the background glow and a `z-10` main container for the content.
- **Smoothing:** apply `-webkit-font-smoothing: antialiased` for the sharpest typography.
- **Max width:** the main content container is capped at `max-w-[1600px]`.

## File Structure

```
taskly-liquid-glass-hero/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    └── components/
        ├── Navbar.tsx
        ├── Hero.tsx
        ├── GlassyOrb.tsx
        └── TrustedBy.tsx
```

### Build configuration

- **`vite.config.ts`:** `defineConfig({ plugins: [react()] })`.
- **`postcss.config.js`:** plugins `tailwindcss` and `autoprefixer`.
- **Scripts:** `dev` (`vite`), `build` (`tsc && vite build`), `preview` (`vite preview`).
