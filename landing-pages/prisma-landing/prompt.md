# Prisma — Creative Studio Landing Page

## Overview

Build a single-page, dark, moody and cinematic landing page for a creative studio called **Prisma**. The page has three stacked sections — **Hero**, **About**, and **Features** — over a black background with a warm cream accent palette. Animations use Framer Motion (pull-up text reveals, fade-ins, scroll-linked character opacity, and staggered card entrances) and icons come from Lucide.

## Tech Stack

- **Framework:** Vite + React 18.
- **Language:** TypeScript.
- **Styling:** Tailwind CSS 3.
- **Animation:** Framer Motion (`framer-motion`) — pull-up text, fade-in, scroll-linked opacity, card entrances.
- **Icons:** Lucide (`lucide-react`) — `ArrowRight`, `Check`.
- **Fonts:** Almarai (weights 300, 400, 700, 800) as the global default; Instrument Serif (italic only) for accent text.
- **Notable techniques:** inline SVG `feTurbulence` noise textures, `useInView`-triggered word reveals, `useScroll` + `useTransform` per-character scroll-linked opacity.

## Global Setup

### Fonts (`index.html`)

Load two Google Fonts in the document head:

- **Almarai** (weights 300, 400, 700, 800) — used as the global default font.
- **Instrument Serif** (italic only) — used for italic accent text in the About section.

### Global CSS (`src/index.css`)

Import Tailwind's layers and set the global font family:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  font-family: 'Almarai', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background-color: #000000;
}
```

Two SVG noise-texture utility classes, both built from inline SVG data URIs using a `feTurbulence` filter:

```css
.noise-overlay {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

.bg-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}
```

- `.noise-overlay` — fractal noise (`baseFrequency` 0.85, `numOctaves` 3), used as an overlay on the hero video.
- `.bg-noise` — fractal noise (`baseFrequency` 0.9, `numOctaves` 4), used as a subtle background in the Features section.

### Tailwind config (`tailwind.config.js`)

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#DEDBC8',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif'],
      },
    },
  },
  plugins: [],
};
```

- `colors.primary`: `#DEDBC8` (warm cream, used for utility classes like `text-primary`, `text-primary/70`, `bg-primary`).
- `fontFamily.serif`: `['"Instrument Serif"', 'serif']` (used via `font-serif` for italic accent text).

### App shell (`src/App.tsx`)

The root renders a `<main className="min-h-screen bg-black">` containing `<Hero />`, `<About />`, and `<Features />` in order. Entry point `src/main.tsx` mounts `<App />` inside `<React.StrictMode>` via `ReactDOM.createRoot` and imports `./index.css`.

## Color Palette

- **Background:** black (`#000000`) globally; `#101010` for the About card; `#212121` for Features cards 2–4.
- **Primary text color:** `#E1E0CC` (applied via inline `style`, slightly different from the Tailwind primary).
- **Tailwind primary:** `#DEDBC8` (used for utility classes such as `text-primary`, `text-primary/70`, `bg-primary`).
- **Gray text:** `text-gray-400`, `text-gray-500`.
- **Navbar link color:** `rgba(225, 224, 204, 0.8)`, hover `#E1E0CC`.

## Shared Animation Components

### `WordsPullUp` (`src/components/WordsPullUp.tsx`)

Splits `text` by spaces; each word is a `motion.span` (`inline-block whitespace-pre`) that slides up from `{ y: 20, opacity: 0 }` to `{ y: 0, opacity: 1 }` with a staggered `delay` of `i * 0.08`, `duration: 0.75`, `ease: [0.16, 1, 0.3, 1]`. Triggered by `useInView(ref, { once: true })`.

Props: `text`, `className`, `style`, `showAsterisk`. When `showAsterisk` is true, the last word renders inside a `relative inline-block` wrapper with a superscript asterisk:

```tsx
<span className="relative inline-block">
  {word}
  <span className="absolute -right-[0.3em] top-[0.65em] text-[0.31em]">*</span>
</span>
```

### `WordsPullUpMultiStyle` (`src/components/WordsPullUpMultiStyle.tsx`)

Takes a `segments` array of `{ text, className }` objects, flat-maps every segment into individual words while preserving each word's per-segment `className`. Same pull-up animation as `WordsPullUp` (`y: 20 → 0`, `delay: i * 0.08`, `duration: 0.75`, `ease: [0.16, 1, 0.3, 1]`, `useInView` once). The container is wrapped with `inline-flex flex-wrap justify-center` plus the passed `className`; each word is `inline-block whitespace-pre` with its segment class.

```tsx
const words = segments.flatMap((segment) =>
  segment.text.split(' ').map((word) => ({ word, className: segment.className ?? '' }))
);
```

## Section 1: Hero (`src/components/Hero.tsx`)

Full viewport height (`h-screen`) with `p-4 md:p-6` padding to create an inset effect. Inside is a container: `relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]`.

Shared constant: `const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];`

### Background video

- **Source:** `/assets/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4` (local asset; vendored from the original `https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4`).
- Attributes: `autoPlay loop muted playsInline`, class `absolute inset-0 h-full w-full object-cover` (fills the entire container).
- **Noise overlay** on top: `noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay`.
- **Gradient overlay:** `pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60`.

### Navbar

Absolutely positioned at top center: `nav` is `absolute left-1/2 top-0 z-20 -translate-x-1/2`. Inside, a black pill that hangs from the top edge:

`flex items-center gap-3 rounded-b-2xl bg-black px-4 py-2 sm:gap-6 md:gap-12 md:rounded-b-3xl md:px-8 lg:gap-14`

- **5 nav items** (`const NAV_ITEMS`): `Our story`, `Collective`, `Workshops`, `Programs`, `Inquiries`.
- Each is an `<a href="#">` with `whitespace-nowrap text-[10px] transition-colors duration-300 sm:text-xs md:text-sm`.
- **Link color** via inline style: `rgba(225, 224, 204, 0.8)`; on `onMouseEnter` set to `#E1E0CC`, on `onMouseLeave` back to `rgba(225, 224, 204, 0.8)`.

### Hero content (bottom-aligned)

Wrapper: `absolute bottom-0 left-0 right-0 z-10`. Inner grid: `grid grid-cols-12 items-end gap-y-6 px-5 pb-6 sm:px-7 md:gap-x-6 md:px-9 md:pb-5`.

- **Left 8 columns** (`col-span-12 md:col-span-8`): giant heading `Prisma` rendered with `WordsPullUp`, `showAsterisk`, color `#E1E0CC`, classes:
  `text-[26vw] font-medium leading-[0.85] tracking-[-0.07em] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]`.
  The superscript asterisk sits on the final "a" of "Prisma" via `absolute -right-[0.3em] top-[0.65em] text-[0.31em]`.

- **Right 4 columns** (`col-span-12 flex flex-col items-start gap-5 sm:gap-6 md:col-span-4 md:pb-10`):
  - **Description paragraph** (`motion.p`): copy verbatim —
    > "Prisma is a worldwide network of visual artists, filmmakers and storytellers bound not by place, status or labels but by passion and hunger to unlock potential through our unique perspectives."

    Classes `max-w-md text-xs text-primary/70 sm:text-sm md:text-base`, inline `style={{ lineHeight: 1.2 }}`. Animation: `initial={{ y: 20, opacity: 0 }}` → `animate={{ y: 0, opacity: 1 }}`, `transition={{ delay: 0.5, duration: 0.9, ease: EASE }}`.
  - **CTA button** (`motion.button`): pill shape `group flex items-center gap-2 rounded-full bg-primary py-1.5 pl-5 pr-1.5 transition-all duration-300 hover:gap-3`.
    - Label span: `Join the lab` — `text-sm font-medium text-black sm:text-base`.
    - Trailing black circle: `flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10`, containing an `ArrowRight` icon `h-4 w-4 sm:h-5 sm:w-5` with inline `style={{ color: '#E1E0CC' }}`.
    - Hover: gap increases (`hover:gap-3`) and the circle scales up (`group-hover:scale-110`).
    - Animation: `initial={{ y: 20, opacity: 0 }}` → `animate={{ y: 0, opacity: 1 }}`, `transition={{ delay: 0.7, duration: 0.9, ease: EASE }}`.

## Section 2: About (`src/components/About.tsx`)

`section` is `bg-black p-4 md:p-6`. Inner card: `mx-auto max-w-6xl rounded-2xl bg-[#101010] px-6 py-16 text-center sm:px-10 sm:py-20 md:rounded-[2rem] md:py-28`.

- **Top label:** `<p className="text-[10px] text-primary sm:text-xs">Visual arts</p>`.
- **Main heading** uses `WordsPullUpMultiStyle` (wrapper `mt-6 sm:mt-8`), color `#E1E0CC`, container classes `mx-auto max-w-3xl text-3xl leading-[0.95] sm:text-4xl sm:leading-[0.9] md:text-5xl lg:text-6xl xl:text-7xl`, with three segments:
  1. `I am Marcus Chen,` — `font-normal` (Almarai)
  2. `a self-taught director.` — `font-serif italic` (Instrument Serif italic)
  3. `I have skills in color grading, visual effects, and narrative design.` — `font-normal`

  Each word animates in with the pull-up effect (`y: 20 → 0`, staggered `delay: i * 0.08`).

- **Body paragraph** with scroll-linked character opacity animation, wrapped in `mx-auto mt-10 max-w-2xl sm:mt-14`. Rendered by a `ScrollRevealParagraph` with class `text-xs text-[#DEDBC8] sm:text-sm md:text-base`. Copy verbatim:
  > "Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals."

### Scroll-reveal mechanics

- The paragraph ref drives `useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] })`.
- Text is split into words (each word a `span` with `inline-block whitespace-pre`), and each word is split into individual characters, each wrapped in an `AnimatedLetter` `motion.span`.
- Per-character staggering: `charProgress = index / totalChars`; opacity is `useTransform(progress, [charProgress - 0.1, charProgress + 0.05], [0.2, 1])` — so each character's opacity transitions from `0.2` to `1` based on scroll position, creating a progressive text reveal.

```tsx
function AnimatedLetter({ char, index, totalChars, progress }: AnimatedLetterProps) {
  const charProgress = index / totalChars;
  const opacity = useTransform(progress, [charProgress - 0.1, charProgress + 0.05], [0.2, 1]);
  return <motion.span style={{ opacity }}>{char}</motion.span>;
}
```

## Section 3: Features (`src/components/Features.tsx`)

`section` is `relative min-h-screen bg-black px-4 py-16 sm:py-20 md:px-6 md:py-28`, with a subtle noise overlay `bg-noise pointer-events-none absolute inset-0 opacity-[0.15]`. Content wrapper: `relative z-10 mx-auto max-w-7xl`.

Shared constant: `const CARD_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];`

### Header

Inside `mx-auto mb-12 max-w-3xl text-center md:mb-16`, a `WordsPullUpMultiStyle` (color `#E1E0CC`, classes `text-xl font-normal sm:text-2xl md:text-3xl lg:text-4xl`) with two segments:

1. `Studio-grade workflows for visionary creators.` — class `''` (cream / `#E1E0CC`)
2. `Built for pure vision. Powered by art.` — `text-gray-500`

### Card grid

Grid ref drives `useInView(gridRef, { once: true, margin: '-100px' })`. Grid classes: `grid grid-cols-1 gap-3 sm:gap-2 md:grid-cols-2 md:gap-1 lg:h-[480px] lg:grid-cols-4`.

Each card animates in with a staggered entrance: `initial={{ opacity: 0, scale: 0.95 }}` → `animate={{ opacity: 1, scale: 1 }}` (when in view), `transition={{ duration: 0.7, ease: CARD_EASE }}`. The video card uses `delay: 0`; the three content cards use `delay: (i + 1) * 0.15` (i.e. 0.15s, 0.30s, 0.45s).

**Card 1 — video card:** `relative h-[420px] overflow-hidden rounded-2xl md:h-[480px] lg:h-full`.
- Full-bleed video: source `/assets/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4` (local asset; vendored from `https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4`), `autoPlay loop muted playsInline`, `absolute inset-0 h-full w-full object-cover`.
- Gradient: `absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent`.
- Bottom caption: `absolute bottom-5 left-5 right-5 text-base sm:text-lg`, color `#E1E0CC`, text `Your creative canvas.`

**Cards 2–4 (content cards):** `flex flex-col rounded-2xl bg-[#212121] p-5 sm:p-6`. Each renders:
- An icon `<img>` (`h-10 w-10 rounded sm:h-12 sm:w-12`, `loading="lazy"`, `alt="{title} icon"`).
- An `<h3 className="mt-5 text-lg sm:mt-6 sm:text-xl">` (color `#E1E0CC`) with the title followed by a superscript number: `<sup className="text-[10px] text-gray-500 sm:text-xs">({number})</sup>`.
- A checklist `<ul className="mt-4 flex flex-col gap-2.5 sm:mt-5 sm:gap-3">`; each `<li className="flex items-start gap-2">` has a Lucide `Check` icon `mt-0.5 h-3.5 w-3.5 shrink-0 text-primary sm:h-4 sm:w-4` and a `<span className="text-xs text-gray-400 sm:text-sm">`.
- A "Learn more" link: `<a href="#" className="group mt-auto inline-flex items-center gap-1.5 pt-6 text-xs text-primary sm:text-sm">` with text `Learn more` followed by an `ArrowRight` icon `h-3.5 w-3.5 -rotate-45 transition-transform duration-300 group-hover:rotate-0 sm:h-4 sm:w-4` (rotated -45deg, straightens on hover).

#### Card data (`const CARDS`)

**Card `01` — `Project Storyboard.`**
- Icon: `/assets/hf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.webp` (vendored from `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzzbokvigwjottwixh07lwa1p%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85`).
- 4 checklist items with green check icons.

**Card `02` — `Smart Critiques.`**
- Icon: `/assets/hf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.webp` (vendored from `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzzbokvigwjottwixh07lwa1p%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85`).
- 3 checklist items about AI analysis, creative notes, and tool integrations.

**Card `03` — `Immersion Capsule.`**
- Icon: `/assets/hf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.webp` (vendored from `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzzbokvigwjottwixh07lwa1p%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85`).
- 3 checklist items about notification silencing, ambient soundscapes, and schedule syncing.

> Note: All four media assets are served locally from `public/assets/` (lowercased filenames). The `https://` / external URLs above record the original sources they were vendored from; if rebuilding against the originals, lowercase only the scheme and host and keep the path exactly as shown.

## Responsive Behavior

The page is fully responsive across mobile, tablet, and desktop:

- **Features cards** switch from 1 column (mobile) to 2 columns (`md`) to 4 columns (`lg`).
- **Hero heading** scales from `26vw` down to `19vw` across breakpoints.
- **Navbar** items compress with smaller gaps on mobile (`gap-3` → `lg:gap-14`).
- All padding, font sizes, and spacing use Tailwind responsive prefixes (`sm` / `md` / `lg` / `xl` / `2xl`).

## File Structure

```
prisma landing/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── public/
│   └── assets/
│       ├── hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4   (hero video)
│       ├── hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4   (features card 1 video)
│       ├── hf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.webp  (card 01 icon)
│       ├── hf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.webp  (card 02 icon)
│       └── hf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.webp  (card 03 icon)
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── vite-env.d.ts
    └── components/
        ├── Hero.tsx
        ├── About.tsx
        ├── Features.tsx
        ├── WordsPullUp.tsx
        └── WordsPullUpMultiStyle.tsx
```
