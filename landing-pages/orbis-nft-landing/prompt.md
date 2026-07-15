# Orbis.Nft — Dark Space NFT Landing Page

## Overview

Build a single-page NFT landing page called **Orbis.Nft** with four full-bleed sections on a dark space theme. The page leans on looping muted background videos, a "liquid glass" UI effect, a fixed grain/texture overlay, and a tight color/font system. Recreate it exactly as described below.

## Tech Stack

- **Framework:** React 18 (`react` `^18.3.1`, `react-dom` `^18.3.1`) + TypeScript (`^5.6.3`)
- **Build tool:** Vite (`^5.4.10`) with `@vitejs/plugin-react` (`^4.3.3`); entry point `src/main.tsx` rendered into `<div id="root">`
- **Styling:** Tailwind CSS (`^3.4.14`) with `postcss` (`^8.4.49`) and `autoprefixer` (`^10.4.20`)
- **Icons:** Lucide (`lucide-react` `^0.460.0`) — `Mail`, `Twitter`, `Github`
- **Fonts:** Anton and Condiment via Google Fonts; system monospace for body copy
- **Notable techniques:** looping muted autoplay HTML video backgrounds, CSS liquid-glass effect (`backdrop-filter` blur + gradient border mask), fixed full-screen texture overlay with `mix-blend-mode`, padding-bottom square aspect-ratio trick, responsive sizing with `sm:`/`md:`/`lg:` breakpoints
- **No additional packages** are needed beyond what Vite + React + Tailwind provide.

> The original background/card videos were served from a CloudFront origin (`https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/...`). In the project they are vendored locally under `public/assets/` and referenced with `/assets/...` paths (see each section below). The local lowercase filenames are the ground truth.

## Global Setup

### Fonts (Google Fonts)

- **Anton** — used for all headings and navigation text (aliased as `font-grotesk` in Tailwind).
- **Condiment** — a cursive script used for accent/overlay text (aliased as `font-condiment` in Tailwind).
- **System monospace font** (`font-mono`) — used for body/description paragraphs.

Loaded in `index.html` (with preconnect hints):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Anton&family=Condiment&display=swap"
  rel="stylesheet"
/>
```

The document `<title>` is `Orbis.Nft — Beyond Earth` and the meta description is `Orbis.Nft — a collection of space objects beyond earth and its familiar boundaries.`

### Color System (Tailwind config)

Extend the Tailwind theme with these named colors:

- `background`: `#010828` — deep dark navy blue
- `cream`: `#EFF4FF` — off-white, used for all text
- `neon`: `#6FFF00` — bright green, used for accent cursive text and underline bars

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#010828',
        cream: '#EFF4FF',
        neon: '#6FFF00',
      },
      fontFamily: {
        grotesk: ['Anton', 'sans-serif'],
        condiment: ['Condiment', 'cursive'],
      },
    },
  },
  plugins: [],
}
```

### Base styles (`src/index.css`)

Tailwind layers plus base body styling, the liquid-glass component classes, and the texture overlay:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  background-color: #010828;
  color: #eff4ff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@layer components {
  .liquid-glass {
    background: rgba(255, 255, 255, 0.01);
    background-blend-mode: luminosity;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
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
    background: linear-gradient(180deg,
      rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
      rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
      rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .texture-overlay {
    position: fixed;
    inset: 0;
    z-index: 50;
    pointer-events: none;
    background-image: url('/texture.png');
    background-size: cover;
    mix-blend-mode: lighten;
    opacity: 0.6;
  }
}
```

### Liquid glass effect

Applied via the `.liquid-glass` class. It is used on the navbar, social icon buttons, NFT cards, and card overlays. The effect combines a near-transparent white background with `background-blend-mode: luminosity`, a `blur(4px)` backdrop filter, an `inset` highlight box-shadow, and a gradient-masked `::before` pseudo-element that draws a subtle 1.4px highlighted border.

### Texture overlay

A full-screen fixed texture overlay sits on top of everything (`z-50`, `pointer-events: none`). It uses a `/texture.png` image with `mix-blend-mode: lighten` at `opacity: 0.6`, covering the entire viewport with `background-size: cover`. It is rendered last in `App` as `<div className="texture-overlay" aria-hidden="true" />`.

## App Structure

`App` renders a single `<main className="bg-background text-cream">` wrapping the four sections in order, followed by the texture overlay:

```tsx
import About from './components/About'
import Collection from './components/Collection'
import Cta from './components/Cta'
import Hero from './components/Hero'

export default function App() {
  return (
    <main className="bg-background text-cream">
      <Hero />
      <About />
      <Collection />
      <Cta />
      {/* Full-screen grain overlay above everything */}
      <div className="texture-overlay" aria-hidden="true" />
    </main>
  )
}
```

### Shared socials data (`src/socials.ts`)

A shared `SOCIALS` array drives every social-icon list (hero desktop, hero mobile, and CTA):

```ts
import { Github, Mail, Twitter, type LucideIcon } from 'lucide-react'

export interface Social {
  label: string
  href: string
  Icon: LucideIcon
}

export const SOCIALS: Social[] = [
  { label: 'Email', href: 'mailto:signal@orbis.nft', Icon: Mail },
  { label: 'Twitter', href: 'https://twitter.com', Icon: Twitter },
  { label: 'Github', href: 'https://github.com', Icon: Github },
]
```

## Global Layout Conventions

- **Max content width:** `1831px` across all sections (`max-w-[1831px]`, centered with `mx-auto`).
- **Horizontal padding:** `px-5 sm:px-8 lg:px-12` on the inner containers.
- **Responsive:** mobile-first with `sm:`, `md:`, `lg:` breakpoints throughout.
- **All videos:** `autoPlay loop muted playsInline` attributes.
- **Casing:** all text is uppercase except the Condiment cursive accents, which are normal-case (`normal-case`). In JSX the copy is written in natural case and rendered uppercase via the `uppercase` utility.

## Section 1 — Hero (`src/components/Hero.tsx`)

Full viewport: `<section className="relative h-screen overflow-hidden rounded-b-[32px]">` — note the `rounded-b-[32px]` bottom corners that clip the video.

- **Background:** full-bleed looping muted autoplaying video covering the entire section with `object-cover` (`className="absolute inset-0 h-full w-full object-cover"`).
  - **Video:** `/assets/hf_20260331_045634_e1c98c76-1265-4f5c-882a-4276f2080894.mp4`
- **Container:** `relative z-10 mx-auto flex h-full max-w-[1831px] flex-col px-5 sm:px-8 lg:px-12`.

### Header

`<header className="relative flex items-center justify-between pt-6 lg:pt-8">`

- **Left logo:** `Orbis.Nft` link in Anton, `text-[16px]`, uppercase, `tracking-wide text-cream` (`font-grotesk text-[16px] uppercase tracking-wide text-cream`).
- **Center navigation:** a liquid-glass nav, `rounded-[28px] px-[52px] py-[24px]`, absolutely centered (`absolute left-1/2 -translate-x-1/2`) and hidden on mobile (`hidden ... lg:block`). It contains a `flex items-center gap-10` list of 5 links: **Homepage**, **Gallery**, **Buy NFT**, **FAQ**, **Contact**. Each link is Anton `text-[13px]` uppercase `tracking-wide text-cream` with `transition-colors hover:text-neon`.
- **Social icons (desktop):** a `hidden flex-col gap-3 lg:flex` column in the top-right, rendering 3 `SocialButton`s.

### Hero content

A vertically centered block: `flex flex-1 flex-col items-start justify-center`, with the heading group offset by `lg:ml-32`.

- **Heading** (`<h1>`) in Anton, uppercase, `text-cream`, responsive `text-[40px]` mobile / `sm:text-[60px]` / `md:text-[75px]` / `lg:text-[90px]`; leading `leading-[1.05]` mobile, `sm:leading-[1]` tablet+; max width `max-w-[640px]` rising to `lg:max-w-[780px]`. Copy (with a `<br />` between lines):

  ```
  Beyond earth
  and ( its ) familiar boundaries
  ```

- **Overlaid cursive accent:** the text `Nft collection` in Condiment (`font-condiment`), `normal-case`, neon green (`text-neon`), `opacity-90 mix-blend-exclusion`, slightly rotated (`-rotate-1`), positioned absolute to the right of the heading (`absolute -right-2 bottom-[18%]` → `sm:-right-6` → `lg:-right-16`). Responsive sizing: `text-[24px]` / `sm:text-[32px]` / `md:text-[40px]` / `lg:text-[48px]`.

- **Social icons (mobile):** the same 3 buttons centered horizontally below the heading (`mt-10 flex w-full justify-center gap-4 lg:hidden`).

### `SocialButton` (hero)

Each is a `56×56px` square (`h-14 w-14`) liquid-glass anchor, `rounded-[1rem]`, centered icon, `text-cream`, with `transition hover:bg-white/10`. The Lucide icon is `h-5 w-5` (`20×20px`) with `strokeWidth={1.75}`:

```tsx
function SocialButton({ label, href, Icon }: (typeof SOCIALS)[number]) {
  return (
    <a
      href={href}
      aria-label={label}
      className="liquid-glass flex h-14 w-14 items-center justify-center rounded-[1rem] text-cream transition hover:bg-white/10"
    >
      <Icon className="h-5 w-5" strokeWidth={1.75} />
    </a>
  )
}
```

## Section 2 — About / Intro (`src/components/About.tsx`)

Full viewport: `<section className="relative min-h-screen overflow-hidden">`

- **Background:** full-bleed looping muted autoplaying video with `object-cover` (`absolute inset-0 h-full w-full object-cover`).
  - **Video:** `/assets/hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4`
- **Container:** same `max-w-[1831px]`, centered, `flex min-h-screen ... flex-col justify-between` with generous vertical padding `py-16 md:py-20 lg:py-24` and `px-5 sm:px-8 lg:px-12`.

### Top row

`flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between`

- **Left heading** (`<h2>`) in Anton, uppercase, `text-cream`, `leading-[1.05]`, responsive `text-[32px]` / `sm:text-[40px]` / `md:text-[48px]` / `lg:text-[60px]`. Copy (with a `<br />`):

  ```
  Hello!
  I'm orbis
  ```

  (The apostrophe is the `&rsquo;` entity: `I&rsquo;m orbis`.)

- **Overlaid cursive accent:** `Orbis` in Condiment, `normal-case`, neon green (`text-neon`), `mix-blend-exclusion`, slightly rotated (`-rotate-2`), positioned absolute at the bottom-right of the heading (`absolute -bottom-6 -right-10` → `sm:-right-16` → `lg:-bottom-8 lg:-right-24`). Responsive sizing: `text-[36px]` / `sm:text-[48px]` / `md:text-[56px]` / `lg:text-[68px]`.

- **Right paragraph:** monospace, uppercase, cream, `max-w-[266px]`, responsive `text-[14px]` → `lg:text-[16px]`, `leading-relaxed`. Text:

  > A digital object fixed beyond time and place. An exploration of distance, form, and silence in space

### Bottom row — decorative ghost copy

`mt-16 flex justify-between` containing two `GhostParagraphs` columns. The right column is `hidden lg:block`.

Each `GhostParagraphs` is a `flex max-w-[266px] flex-col gap-8` column of **2 identical paragraphs** using the same about copy. They are styled `font-mono text-[14px] uppercase leading-relaxed text-[#010828] opacity-10 lg:text-[16px] lg:text-cream` — i.e. nearly invisible decorative copy (`opacity-10`); on mobile the text color is `text-[#010828]` (dark, effectively invisible against the video), switching to `lg:text-cream` on desktop.

## Section 3 — NFT Collection Grid (`src/components/Collection.tsx`)

`<section className="bg-[#010828] py-16 md:py-20 lg:py-24">` — solid `#010828` background, **no video**.

- **Container:** same `max-w-[1831px]`, centered, `px-5 sm:px-8 lg:px-12`.

### Header row

`mb-12 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between lg:mb-16`

- **Left heading** (`<h2>`) in Anton, uppercase, `text-cream`, `leading-[1.1]`, responsive `text-[32px]` / `sm:text-[40px]` / `md:text-[48px]` / `lg:text-[60px]`:

  ```
  Collection of
    Space objects
  ```

  The second line is a `block` indented with `ml-12 sm:ml-24 lg:ml-32`. Within it, `Space ` is Condiment cursive neon green (`font-condiment normal-case text-neon`) and `objects` stays in Anton.

- **Right "See all creators" button:** an `<a>` link, `group inline-block shrink-0`. `See` is large (`text-[32px]` / `sm:text-[40px]` / `md:text-[48px]` / `lg:text-[60px]`, `leading-none`), with `All` and `Creators` stacked smaller in a column next to it (`text-[20px]` / `sm:text-[24px]` / `md:text-[30px]` / `lg:text-[36px]`, `leading-[1.05]`), all Anton uppercase cream, laid out `flex items-end gap-3`. Below the text is a neon green bar (`mt-3 block h-[6px] w-full bg-neon ... md:h-[8px] lg:h-[10px]`) that turns cream on hover (`transition group-hover:bg-cream`).

### NFT card grid

`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3` — 1 column mobile, 2 tablet, 3 desktop, `24px` gap.

Each card is rendered by `NftCard` from this data:

```ts
const CARDS = [
  {
    video:
      '/assets/hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4',
    score: '8.7/10',
    name: 'Orbis #001',
  },
  {
    video:
      '/assets/hf_20260331_054411_511c1b7a-fb2f-42ef-bf6c-32c0b1a06e79.mp4',
    score: '9/10',
    name: 'Orbis #002',
  },
  {
    video:
      '/assets/hf_20260331_055427_ac7035b5-9f3b-4289-86fc-941b2432317d.mp4',
    score: '8.2/10',
    name: 'Orbis #003',
  },
]
```

### `NftCard`

- **Card container:** `<article className="liquid-glass rounded-[32px] p-[18px] transition hover:bg-white/10">` — liquid-glass, `rounded-[32px]`, `18px` padding, `hover:bg-white/10`.
- **Square video container:** `relative overflow-hidden rounded-[24px] pb-[100%]` — the `pb-[100%]` padding-bottom trick produces a square aspect ratio; the video fills it absolutely (`absolute inset-0 h-full w-full object-cover`).
- **Rarity overlay bar:** a liquid-glass bar pinned to the bottom (`absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-[20px] px-5 py-4`).
  - **Label:** `Rarity score:` in monospace, `text-[11px]`, uppercase, `tracking-wide`, `text-cream/70`.
  - **Score value:** the card's `score` (e.g. `8.7/10`) in Anton, `text-[16px]`, uppercase, `text-cream`.
  - **Circular button:** a `48×48px` (`h-12 w-12`) `shrink-0` circular purple gradient button (`rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed]`), `text-cream`, `shadow-lg shadow-purple-500/50`, `transition hover:scale-110`, with `aria-label={`Open ${name}`}`. Inside is a right-arrow chevron SVG:

    ```tsx
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
    ```

## Section 4 — CTA / Final Section (`src/components/Cta.tsx`)

`<section className="relative overflow-hidden">`

- **Background:** full-width video that displays at its native aspect ratio — `className="block h-auto w-full"` (i.e. **not** `object-cover`; `w-full h-auto` block).
  - **Video:** `/assets/hf_20260331_055729_72d66327-b59e-4ae9-bb70-de6ccb5ecdb0.mp4`

### Text content (positioned absolute over the video)

A right-aligned block: `absolute inset-0 flex items-center justify-end px-6 sm:px-10 lg:pl-[15%] lg:pr-[20%]`, inner `relative text-right`.

- **Cursive accent:** `Go beyond` in Condiment, `normal-case`, neon green (`text-neon`), `mix-blend-exclusion`, rotated (`-rotate-2`), positioned absolute at the top-left of the heading block (`absolute -left-6 -top-4` → `sm:-left-12 sm:-top-8` → `md:-left-20` → `lg:-left-28 lg:-top-12`). Responsive sizing: `text-[17px]` / `sm:text-[34px]` / `md:text-[51px]` / `lg:text-[68px]`.

- **Heading** (`<h2>`) in Anton, uppercase, `text-cream`, `leading-[1.15]`, responsive `text-[16px]` / `sm:text-[30px]` / `md:text-[45px]` / `lg:text-[60px]`:

  ```
  Join us.
  Reveal what's hidden.
  Define what's next.
  Follow the signal.
  ```

  `Join us.` is wrapped in a `block` with extra bottom margin (`mb-4 sm:mb-6 md:mb-8 lg:mb-12`) before the remaining lines (which use `<br />` separators). The apostrophes use the `&rsquo;` entity (`what&rsquo;s`).

### Social icons (bottom-left, absolute positioned)

A vertical liquid-glass container positioned at `left-[8%]` with a responsive bottom offset and radius: `absolute bottom-[12%] left-[8%] flex flex-col rounded-[0.5rem] sm:bottom-[14%] sm:rounded-[0.75rem] md:bottom-[16%] md:rounded-[1rem] lg:bottom-[20%] lg:rounded-[1.25rem]`.

It maps over `SOCIALS` (Mail, Twitter, Github) to render 3 stacked anchor buttons:

- **Responsive widths/heights** mixing viewport units and rem: `h-[10vw] w-[14vw]` → `sm:h-[4.5rem] sm:w-[14.375rem]` → `md:h-[3.75rem] md:w-[10.78125rem]` → `lg:h-[5.25rem] lg:w-[16.77rem]`.
- Centered icon, `text-cream`, `transition hover:bg-white/10`.
- Buttons are separated by `border-b border-white/10` dividers, applied to every button **except the last** (`index < SOCIALS.length - 1 ? 'border-b border-white/10' : ''`).
- The Lucide icon is responsive: `h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6` with `strokeWidth={1.75}`.

## File Structure

```
orbis-nft-landing/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── public/
│   ├── texture.png
│   └── assets/
│       ├── hf_20260331_045634_e1c98c76-1265-4f5c-882a-4276f2080894.mp4   (Hero)
│       ├── hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4   (About)
│       ├── hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4   (Card 1 — 8.7/10)
│       ├── hf_20260331_054411_511c1b7a-fb2f-42ef-bf6c-32c0b1a06e79.mp4   (Card 2 — 9/10)
│       ├── hf_20260331_055427_ac7035b5-9f3b-4289-86fc-941b2432317d.mp4   (Card 3 — 8.2/10)
│       └── hf_20260331_055729_72d66327-b59e-4ae9-bb70-de6ccb5ecdb0.mp4   (CTA)
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── socials.ts
    └── components/
        ├── Hero.tsx
        ├── About.tsx
        ├── Collection.tsx
        └── Cta.tsx
```
