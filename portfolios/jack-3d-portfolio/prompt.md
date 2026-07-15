# Jack — 3D Creator Portfolio Landing Page

## Overview

Build a single-page, dark-themed portfolio landing page for a 3D creator named "Jack." The page is a vertical scroll experience composed of five sections (hero, scroll-driven image marquee, about, services, and projects) with scroll-reactive animations, a mouse-following magnetic portrait, scroll-revealed text, and sticky-stacking project cards.

## Tech Stack

- **Framework:** React 18 (`react` / `react-dom` `^18.3.1`) with TypeScript (`^5.5.3`).
- **Build tool:** Vite (`^5.4.2`) with `@vitejs/plugin-react` (`^4.3.1`).
- **Styling:** Tailwind CSS (`^3.4.1`) with `postcss` (`^8.4.35`) and `autoprefixer` (`^10.4.18`).
- **Animation:** Framer Motion (`framer-motion` `^12.38.0`) — `motion`, `useScroll`, `useTransform`, `motion.create()`.
- **Icons:** Lucide React (`lucide-react` `^0.344.0`).
- **Font:** Kanit from Google Fonts, weights 300–900.
- **Notable techniques:** scroll-position-driven marquee, mouse-magnetic hover, character-by-character scroll-reveal text, sticky card stacking with scroll-linked scale, fluid `clamp()` typography.

## Global Setup

### Document (`index.html`)

- **Page title:** `Jack — 3D Creator`.
- **Fonts:** load Kanit from Google Fonts (weights 300–900).
- **Root + entry:** `<div id="root"></div>` and `<script type="module" src="/src/main.tsx"></script>`.

### Tailwind config (`tailwind.config.js`)

- `content: ['./index.html', './src/**/*.{ts,tsx}']`.
- Extend `fontFamily` with `kanit: ['Kanit', 'sans-serif']` (exposes the `font-kanit` utility).
- No plugins.

### PostCSS config (`postcss.config.js`)

- Plugins: `tailwindcss` and `autoprefixer`.

### Global styles (`src/index.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

html,
body,
#root {
  background-color: #0c0c0c;
}

body {
  font-family: 'Kanit', sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.hero-heading {
  background: linear-gradient(180deg, #646973 0%, #bbccd7 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
```

The `.hero-heading` class produces the silver gradient text used by all major headings.

### App entry (`src/main.tsx`)

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

### Root layout (`src/App.tsx`)

A `<main>` wrapper with `className="min-h-screen bg-[#0C0C0C] font-kanit"` and inline `style={{ overflowX: 'clip' }}`. Renders the sections in this order:

1. `HeroSection`
2. `MarqueeSection`
3. `AboutSection`
4. `ServicesSection`
5. `ProjectsSection`

## Assets

All media is vendored locally and served from the `public/assets/` directory (referenced at runtime as `/assets/...`). The list below maps each local path to its original external source URL.

**Portrait**

- `/assets/Rectangle_40443.81459862.png` — original: `https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png`

**Marquee GIFs (21, originals from motionsites.ai)**

| Local path | Original URL |
| --- | --- |
| `/assets/hero-space-voyage-preview-eECLH3Yc.gif` | `https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif` |
| `/assets/hero-codenest-preview-Cgppc2qV.gif` | `https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif` |
| `/assets/hero-vex-ventures-preview-BczMFIiw.gif` | `https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif` |
| `/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif` | `https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif` |
| `/assets/hero-asme-preview-B_nGDnTP.gif` | `https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif` |
| `/assets/hero-transform-data-preview-Cx5OU29N.gif` | `https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif` |
| `/assets/hero-vitara-preview-Cjz2QYyU.gif` | `https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif` |
| `/assets/hero-terra-preview-BFjrCr7T.gif` | `https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif` |
| `/assets/hero-skyelite-preview-DHaZIgUv.gif` | `https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif` |
| `/assets/hero-aethera-preview-DknSlcTa.gif` | `https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif` |
| `/assets/hero-designpro-preview-D8c5_een.gif` | `https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif` |
| `/assets/hero-stellar-ai-preview-D3HL6bw1.gif` | `https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif` |
| `/assets/hero-xportfolio-preview-D4A8maiC.gif` | `https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif` |
| `/assets/hero-orbit-web3-preview-BXt4OttD.gif` | `https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif` |
| `/assets/hero-nexora-preview-cx5HmUgo.gif` | `https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif` |
| `/assets/hero-evr-ventures-preview-DZxeVFEX.gif` | `https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif` |
| `/assets/hero-planet-orbit-preview-DWAP8Z1P.gif` | `https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif` |
| `/assets/hero-new-era-preview-CocuDUm9.gif` | `https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif` |
| `/assets/hero-wealth-preview-B70idl_u.gif` | `https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif` |
| `/assets/hero-luminex-preview-CxOP7ce6.gif` | `https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif` |
| `/assets/hero-celestia-preview-0yO3jXO8.gif` | `https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif` |

**About decorative 3D images (originals from figma.site)**

- `/assets/moon_icon.11395d36.png` — original: `https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png`
- `/assets/p59_1.4659672e.png` — original: `https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png`
- `/assets/lego_icon-1.703bb594.png` — original: `https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png`
- `/assets/Group_134-1.2e04f3ce.png` — original: `https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png`

**Project images (9 `.webp`)** — originals served via the `images.higgs.ai` proxy pointing at the `d8j0ntlcm91z4.cloudfront.net` bucket; vendored as `.webp` and listed per-project (with their full original proxy source URLs) in the [Projects Section](#5-projects-section).

## Color Palette

- **Background (dark):** `#0C0C0C` — html, body, `#root`, main wrapper, hero, marquee, projects, and project cards.
- **Light text / accents:** `#D7E2EA`.
- **Heading gradient:** `linear-gradient(180deg, #646973 0%, #bbccd7 100%)`.
- **Services background (light):** `white` (`#FFFFFF`).
- **Contact button gradient:** `linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)`.
- **Service item border:** `rgba(12,12,12,0.15)`.

## Reusable Components

### `FadeIn` (`src/components/FadeIn.tsx`)

A Framer Motion wrapper that fades and slides content in when it scrolls into view.

- Props: `children`, `as` (one of `'div' | 'nav' | 'span' | 'section' | 'header' | 'footer'`, default `'div'`), `className`, `style`, `delay` (default `0`), `duration` (default `0.7`), `x` (default `0`), `y` (default `30`).
- Uses `motion.create(as)` (memoized) to support dynamic element types.
- `initial={{ opacity: 0, x, y }}`, `whileInView={{ opacity: 1, x: 0, y: 0 }}`.
- `viewport={{ once: true, margin: '50px', amount: 0 }}`.
- `transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}`.

```tsx
import { useMemo } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'framer-motion'

type FadeInTag = 'div' | 'nav' | 'span' | 'section' | 'header' | 'footer'

interface FadeInProps {
  children: ReactNode
  as?: FadeInTag
  className?: string
  style?: CSSProperties
  delay?: number
  duration?: number
  x?: number
  y?: number
}

export default function FadeIn({
  children,
  as = 'div',
  className,
  style,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
}: FadeInProps) {
  const MotionTag = useMemo(() => motion.create(as), [as])

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </MotionTag>
  )
}
```

### `Magnet` (`src/components/Magnet.tsx`)

A mouse-following magnetic hover effect: the wrapped content drifts toward the cursor (offset divided by `strength`) once the cursor comes within `padding` px of the element's edge, then eases back when it leaves.

- Props: `children`, `padding` (default `100`), `strength` (default `2`), `activeTransition` (default `'transform 0.3s ease-out'`), `inactiveTransition` (default `'transform 0.6s ease-in-out'`), `className`.
- Tracks the mouse via a `window` `mousemove` listener; computes element center from `getBoundingClientRect()`.
- Active when `distX < width / 2 + padding && distY < height / 2 + padding`; then sets `position` to `(clientX - centerX) / strength`, `(clientY - centerY) / strength`. Otherwise resets to `{ x: 0, y: 0 }`.
- Applies `transform: translate3d(${x}px, ${y}px, 0)` with `transition` toggled between active/inactive and `willChange: 'transform'`.

```tsx
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface MagnetProps {
  children: ReactNode
  padding?: number
  strength?: number
  activeTransition?: string
  inactiveTransition?: string
  className?: string
}

export default function Magnet({
  children,
  padding = 100,
  strength = 2,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className,
}: MagnetProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const wrapper = wrapperRef.current
      if (!wrapper) return

      const { left, top, width, height } = wrapper.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2
      const distX = Math.abs(centerX - e.clientX)
      const distY = Math.abs(centerY - e.clientY)

      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        setIsActive(true)
        setPosition({
          x: (e.clientX - centerX) / strength,
          y: (e.clientY - centerY) / strength,
        })
      } else {
        setIsActive(false)
        setPosition({ x: 0, y: 0 })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [padding, strength])

  return (
    <div ref={wrapperRef} className={className} style={{ position: 'relative' }}>
      <div
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: isActive ? activeTransition : inactiveTransition,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  )
}
```

### `AnimatedText` (`src/components/AnimatedText.tsx`)

A character-by-character scroll-reveal paragraph: each character fades from opacity `0.2` to `1` as the paragraph moves through the viewport. Characters are grouped per word (`inline-block`) so line wrapping only happens at spaces.

- Props: `text`, `className?`, `style?`.
- Uses `useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] })` on the `<p>` element.
- For each character, an inner `Char` maps `useTransform(progress, range, [0.2, 1])` to opacity, where `range = [globalIndex / totalChars, Math.min((globalIndex + 1) / totalChars, 1)]`.
- Each `Char` renders an invisible placeholder (`<span className="invisible">`) plus an absolutely positioned animated `motion.span` (`absolute left-0 top-0`).

```tsx
import { useRef } from 'react'
import type { CSSProperties } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  style?: CSSProperties
}

interface CharProps {
  char: string
  progress: MotionValue<number>
  range: [number, number]
}

function Char({ char, progress, range }: CharProps) {
  const opacity = useTransform(progress, range, [0.2, 1])

  return (
    <span className="relative inline-block">
      <span className="invisible">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  )
}

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const words = text.split(' ')
  const totalChars = text.length
  let charCursor = 0

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, wordIndex) => {
        const wordStart = charCursor
        charCursor += word.length + 1
        return (
          <span key={wordIndex}>
            <span className="inline-block">
              {word.split('').map((char, charIndex) => {
                const globalIndex = wordStart + charIndex
                return (
                  <Char
                    key={charIndex}
                    char={char}
                    progress={scrollYProgress}
                    range={[
                      globalIndex / totalChars,
                      Math.min((globalIndex + 1) / totalChars, 1),
                    ]}
                  />
                )
              })}
            </span>
            {wordIndex < words.length - 1 ? ' ' : null}
          </span>
        )
      })}
    </p>
  )
}
```

### `ContactButton` (`src/components/ContactButton.tsx`)

A rounded-full pill button with the gradient background. Label: **Contact Me**.

- Classes: `inline-block rounded-full px-8 py-3 text-center text-xs font-medium uppercase tracking-widest text-white transition-[filter,transform] duration-200 hover:scale-[1.03] hover:brightness-110 active:scale-[0.98] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base`.
- Inline style:
  - `background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)'`
  - `boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset'`
  - `outline: '2px solid #FFFFFF'`, `outlineOffset: '-3px'`

### `LiveProjectButton` (`src/components/LiveProjectButton.tsx`)

A ghost/outline pill `<button type="button">`. Label: **Live Project**.

- Classes: `rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base`.

## Sections

### 1. Hero Section

File: `src/sections/HeroSection.tsx`. A `<section>` with `className="relative flex h-screen flex-col"` and inline `style={{ overflowX: 'clip' }}` — full viewport height, flex column.

**Navbar** — a `FadeIn as="nav"` (`delay={0}`, `y={-20}`) with `className="flex items-center justify-between px-6 pt-6 md:px-10 md:pt-8"`. Four links, each styled `text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]`:

| Label | `href` |
| --- | --- |
| About | `#about` |
| Price | `#price` |
| Projects | `#projects` |
| Contact | _(no href)_ |

**Hero heading** — wrapped in a `overflow-hidden` container, then a `FadeIn` (`delay={0.15}`, `y={40}`) holding an `<h1>` with the `hero-heading` gradient text. Copy: `Hi, i&apos;m jack` (lowercase "i", curly apostrophe via `&apos;`).

- Classes: `hero-heading mt-6 w-full whitespace-nowrap text-center text-[14vw] font-black uppercase leading-none tracking-tight sm:mt-4 sm:text-[15vw] md:-mt-5 md:text-[16vw] lg:text-[17.5vw]`.

**Hero portrait** — centered, in an absolutely positioned wrapper: `absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:translate-y-0` (vertically centered on mobile; pinned to the bottom from `sm` up). Inside: `FadeIn` (`delay={0.6}`, `y={30}`) wrapping a `Magnet` (`padding={150}`, `strength={3}`, `activeTransition="transform 0.3s ease-out"`, `inactiveTransition="transform 0.6s ease-in-out"`) wrapping the image.

- Image `src`: `/assets/Rectangle_40443.81459862.png`, `alt="Portrait of Jack, 3D creator"`, `draggable={false}`.
- Image classes: `pointer-events-none w-[280px] select-none sm:w-[360px] md:w-[440px] lg:w-[520px]`.

**Bottom bar** — a flex container pushed to the bottom: `mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10`.

- **Left:** `FadeIn` (`delay={0.35}`, `y={20}`) wrapping a `<p>`. Copy: `a 3d creator driven by crafting striking and unforgettable projects`.
  - Classes: `max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]`; inline `style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}`.
- **Right:** `FadeIn` (`delay={0.5}`, `y={20}`, `className="relative z-20"`) wrapping `ContactButton`.

**Hero fade-in timing summary:** navbar `delay 0, y -20`; heading `delay 0.15, y 40`; left text `delay 0.35, y 20`; contact button `delay 0.5, y 20`; portrait `delay 0.6, y 30`.

### 2. Marquee Section

File: `src/sections/MarqueeSection.tsx`. Two rows of images that scroll horizontally based on page scroll position.

- `<section>` classes: `flex flex-col gap-3 bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40`.
- The 21 marquee GIFs (see [Assets](#assets)) are split: **Row 1** = first 11 images (`slice(0, 11)`); **Row 2** = remaining 10 images (`slice(11)`).
- Each row is **tripled** (`[...images, ...images, ...images]`) for seamless looping.
- Row container classes: `flex w-max gap-3` with `style={{ transform: rowTransform(initialOffset), willChange: 'transform' }}`.
- Each image tile: `h-[270px] w-[420px] shrink-0 rounded-2xl object-cover`, `loading="lazy"`, empty `alt=""`.

**Scroll behavior.** Rows are pre-shifted left by one copy via `translateX(calc(-33.3333% + ${offsetPx}px))` so the scroll-driven offset can move them in either direction without exposing an edge gap.

```ts
const rowTransform = (offsetPx: number) => `translateX(calc(-33.3333% + ${offsetPx}px))`
```

On `scroll` (passive listener) and `resize`, compute:

```ts
const offset = (window.scrollY - section.offsetTop + window.innerHeight) * 0.3
rowOne.style.transform = rowTransform(offset - 200)   // moves right on scroll
rowTwo.style.transform = rowTransform(-(offset - 200)) // moves left on scroll
```

- Initial offsets: Row 1 `initialOffset={-200}`, Row 2 `initialOffset={200}`.
- `update()` runs once on mount; listeners are cleaned up on unmount.

### 3. About Section

File: `src/sections/AboutSection.tsx`. A full-height centered section: `<section id="about" className="relative flex min-h-screen flex-col items-center justify-center px-5 py-20 sm:px-8 md:px-10">`.

**Four decorative 3D images** positioned absolutely in the corners, each wrapped `pointer-events-none absolute ${position}` then a `FadeIn` (`y={0}`, `duration={0.9}`) wrapping an `<img>` (`alt=""`, `loading="lazy"`, `draggable={false}`) with the listed width classes:

| Image (`src`) | Position classes | Width classes | `delay` | `x` |
| --- | --- | --- | --- | --- |
| `/assets/moon_icon.11395d36.png` (top-left moon) | `top-[4%] left-[1%] sm:left-[2%] md:left-[4%]` | `w-[120px] sm:w-[160px] md:w-[210px]` | `0.1` | `-80` |
| `/assets/p59_1.4659672e.png` (bottom-left 3D object) | `bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]` | `w-[100px] sm:w-[140px] md:w-[180px]` | `0.25` | `-80` |
| `/assets/lego_icon-1.703bb594.png` (top-right lego) | `top-[4%] right-[1%] sm:right-[2%] md:right-[4%]` | `w-[120px] sm:w-[160px] md:w-[210px]` | `0.15` | `80` |
| `/assets/Group_134-1.2e04f3ce.png` (bottom-right 3D group) | `bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]` | `w-[130px] sm:w-[170px] md:w-[220px]` | `0.3` | `80` |

**Content stack** — outer wrapper `flex flex-col items-center gap-16 sm:gap-20 md:gap-24`. Inside, an inner stack `flex flex-col items-center gap-10 sm:gap-14 md:gap-16` containing:

- **Heading:** `FadeIn` (`delay={0}`, `y={40}`) wrapping an `<h2>`. Copy: `About me`.
  - Classes: `hero-heading text-center font-black uppercase leading-none tracking-tight`; inline `style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}`.
- **Animated paragraph:** `AnimatedText` with the text below.
  - Classes: `max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]`; inline `style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}`.
  - Text (verbatim): `With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!`
    - Note: the apostrophe in "Let's" is a curly apostrophe (`’`).

Below the inner stack: a `FadeIn` (`delay={0.15}`, `y={20}`) wrapping `ContactButton`.

### 4. Services Section

File: `src/sections/ServicesSection.tsx`. A white-background panel with rounded top corners: `<section id="price" className="relative rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">`.

**Heading** — `FadeIn` (`delay={0}`, `y={40}`) wrapping an `<h2>`. Copy: `Services`.

- Classes: `mb-16 text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C] sm:mb-20 md:mb-28`; inline `style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}`.

**Service list** — centered container `mx-auto max-w-5xl`. Five items, each a `FadeIn` with `delay={i * 0.1}` (staggered). Every item except the last gets `className="border-b border-[rgba(12,12,12,0.15)]"`.

Each item is a row `flex items-start gap-6 py-8 sm:gap-10 sm:py-10 md:gap-14 md:py-12`:

- **Number** — `<span className="font-black leading-none text-[#0C0C0C]">` with inline `style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}`.
- **Name + description** stacked — wrapper `flex flex-col gap-2 pt-1 sm:gap-3 sm:pt-2`:
  - **Name** `<h3 className="font-medium uppercase text-[#0C0C0C]">`, inline `style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}`.
  - **Description** `<p className="max-w-2xl font-light leading-relaxed text-[#0C0C0C]">`, inline `style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.6 }}`.

Service data (verbatim):

1. **01 — 3D Modeling:** `Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.`
2. **02 — Rendering:** `High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.`
3. **03 — Motion Design:** `Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.`
4. **04 — Branding:** `Crafting cohesive visual identities — from logos to full brand systems — that communicate a clear and memorable presence.`
5. **05 — Web Design:** `Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.`

### 5. Projects Section

File: `src/sections/ProjectsSection.tsx`. A dark panel pulled up over the services section: `<section id="projects" className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-16 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10">`.

**Heading** — `FadeIn` (`delay={0}`, `y={40}`) wrapping an `<h2>` with the `hero-heading` gradient. Copy: `Project` (singular).

- Classes: `hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28`; inline `style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}`.

**Card stack** — container `<div ref={containerRef} className="mx-auto max-w-7xl">`. Scroll progress is tracked with `useScroll({ target: containerRef, offset: ['start start', 'end end'] })`. Three sticky-stacking project cards scale down as you scroll past them.

**`ProjectCard`** behavior:

- Outer wrapper `h-[85vh]`; inner `sticky top-24 md:top-32`.
- A `motion.div` with classes `${CARD_RADIUS} border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8`, where `CARD_RADIUS = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]'`.
- Inline style: `scale` (a `MotionValue`), `top: \`${index * 28}px\``, `position: 'relative'`, `transformOrigin: 'top center'`.
- Scale math:
  ```ts
  const targetScale = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])
  ```

**Card top row** — `flex flex-wrap items-center justify-between gap-x-6 gap-y-4 px-2 pb-4 sm:px-4 sm:pb-6 md:px-6 md:pb-8`. Left group `flex items-center gap-4 sm:gap-6 md:gap-8`:

- **Number** `<span className="hero-heading font-black leading-none">`, inline `style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}`.
- A `flex flex-col gap-1` stack:
  - **Category** `<span className="font-light uppercase tracking-widest text-[#D7E2EA]">`, inline `style={{ fontSize: 'clamp(0.7rem, 1.2vw, 1rem)', opacity: 0.6 }}`.
  - **Name** `<h3 className="font-medium uppercase leading-tight text-[#D7E2EA]">`, inline `style={{ fontSize: 'clamp(1.1rem, 2.4vw, 2.2rem)' }}`.

On the right: `LiveProjectButton`.

**Card bottom row** — two-column image grid `flex gap-3 sm:gap-4`:

- **Left column (40%)** `flex w-[40%] flex-col gap-3 sm:gap-4` with two stacked images, both `${CARD_RADIUS} w-full object-cover`:
  - Top image (`col1[0]`), `alt="${project.name} — visual 1"`, inline `style={{ height: 'clamp(130px, 16vw, 230px)' }}`.
  - Bottom image (`col1[1]`), `alt="${project.name} — visual 2"`, inline `style={{ height: 'clamp(160px, 22vw, 340px)' }}`.
- **Right column (60%)** `w-[60%]` with one tall image (`col2`), `alt="${project.name} — visual 3"`, classes `${CARD_RADIUS} h-full w-full object-cover`.
- All images `loading="lazy"`.

**Project data** (numbers, names, categories, and local `.webp` image paths mapped to their original `images.higgs.ai` proxy source URLs):

**Project 01 — Nextlevel Studio (Client)**
- col1 image 1: `/assets/hf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.webp` — original: `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85`
- col1 image 2: `/assets/hf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.webp` — original: `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85`
- col2 image: `/assets/hf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.webp` — original: `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85`

**Project 02 — Aura Brand Identity (Personal)**
- col1 image 1: `/assets/hf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.webp` — original: `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85`
- col1 image 2: `/assets/hf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.webp` — original: `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85`
- col2 image: `/assets/hf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.webp` — original: `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85`

**Project 03 — Solaris Digital (Client)**
- col1 image 1: `/assets/hf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.webp` — original: `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85`
- col1 image 2: `/assets/hf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.webp` — original: `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85`
- col2 image: `/assets/hf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.webp` — original: `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85`

## Responsive Breakpoints

All sections use Tailwind's default breakpoints (`sm`: 640px, `md`: 768px, `lg`: 1024px) with a mobile-first approach. Heavy use of `clamp()` provides fluid typography, and the entire design scales gracefully from mobile to ultra-wide screens.

## Key Dependencies

- `react`, `react-dom` (`^18.3.1`)
- `framer-motion` (`^12.38.0`)
- `lucide-react` (`^0.344.0`)
- `tailwindcss` (`^3.4.1`)
- `vite` (`^5.4.2`), `typescript` (`^5.5.3`)
- Dev: `@types/react` (`^18.3.5`), `@types/react-dom` (`^18.3.0`), `@vitejs/plugin-react` (`^4.3.1`), `autoprefixer` (`^10.4.18`), `postcss` (`^8.4.35`)
