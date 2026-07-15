# Viktor Oddy — Creative Studio Landing Page

## Overview

Build a single-page marketing landing page for a creative design studio called "Viktor Oddy". The page has a white background throughout, uses two custom fonts, and is composed of a centered hero, an infinite image marquee, a parallax testimonial, a pricing grid, an auto-scrolling testimonial carousel, a project showcase, an interactive partner CTA, a footer, a copyright bar, and a fixed floating bottom nav. Scroll-triggered fade-in animations are used throughout.

## Tech Stack

- **Framework:** React 18 (`react` `^18.3.1`, `react-dom` `^18.3.1`) with TypeScript (`typescript` `^5.7.3`).
- **Build tool:** Vite (`vite` `^5.4.14`) with `@vitejs/plugin-react` (`^4.3.4`). Build script: `tsc -b && vite build`.
- **Styling:** Tailwind CSS (`tailwindcss` `^3.4.17`) with `postcss` (`^8.5.1`) and `autoprefixer` (`^10.4.20`).
- **Icons:** `lucide-react` (`^0.469.0`) — `Quote`, `Star`, `ChevronLeft`, `ChevronRight`, `ArrowUpRight`.
- **Fonts:** PP Neue Montreal (body, loaded from Webflow CDN) and PP Mondwest (serif accent, loaded from a local `/PPMondwest-Regular.woff2` file). The body default font is PP Neue Montreal with system fallbacks (`font-sans`).
- **Notable techniques:** `IntersectionObserver`-driven scroll reveals, a CSS marquee, a `requestAnimationFrame` parallax image, an auto-playing infinite carousel with snap-back, and a cursor-trail effect that spawns image thumbnails on mouse move.

## Global Setup

### `index.html`

- `lang="en"`, charset UTF-8, viewport meta.
- Description meta: `Viktor Oddy — the creative studio of Viktor Oddy. Build the next wave, the bold way.`
- Title: `Viktor Oddy — Creative Studio`.
- Inline SVG favicon (data URI): a rounded square `fill='%23051A24'` with a serif "V" in `fill='%23F6FCFF'`.
- Preload the font: `<link rel="preload" href="/PPMondwest-Regular.woff2" as="font" type="font/woff2" crossorigin />`.
- Root element `<div id="root"></div>` mounted by `/src/main.tsx`.

### `src/main.tsx`

Standard React 18 entry. Renders `<App />` inside `<StrictMode>` and imports `./index.css`.

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

### `src/index.css` — fonts and global base

Includes the three `@tailwind` directives, the `@font-face` declarations, a base layer, and the keyframe animations.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@font-face {
  font-family: 'PP Neue Montreal';
  src: url('https://assets.website-files.com/6009ec8cda7f305645c9d91b/60176f9bb43e36419997ecfe_PPNeueMontreal-Book.otf')
    format('opentype');
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: 'PP Neue Montreal';
  src: url('https://assets.website-files.com/6009ec8cda7f305645c9d91b/60176f9b39c5673e51a86f5a_PPNeueMontreal-Medium.otf')
    format('opentype');
  font-weight: 500;
  font-display: swap;
}

@font-face {
  font-family: 'PP Mondwest';
  src: url('/PPMondwest-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-white font-sans text-[#051A24] antialiased;
  }
}
```

Configure Tailwind so that `font-serif` maps to PP Mondwest and `font-sans` to PP Neue Montreal (with system fallbacks).

## Layout (`src/App.tsx`)

The root `<div id="top">` uses `min-h-screen bg-white pb-32`. Sections render in this order:

1. `Hero`
2. `Marquee`
3. `TestimonialSection`
4. `PricingSection`
5. `TestimonialCarousel`
6. `ProjectsSection`
7. `PartnerSection` (receives `images={MARQUEE_IMAGES}`)
8. `Footer`
9. `CopyrightBar`
10. `BottomNav`

### Shared constants

- `BOOK_URL = 'https://halaskastudio.com/./book'` — used by primary/secondary CTAs throughout.
- `MARQUEE_IMAGES` — eight GIF paths (also reused by `PartnerSection`):

```ts
const MARQUEE_IMAGES = [
  '/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  '/assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif',
  '/assets/hero-velorah-preview-CJNTtbpd.gif',
  '/assets/hero-asme-preview-B_nGDnTP.gif',
  '/assets/hero-transform-data-preview-Cx5OU29N.gif',
  '/assets/hero-aethera-preview-DknSlcTa.gif',
  '/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  '/assets/hero-nexora-preview-cx5HmUgo.gif',
];
```

> **Asset note:** These GIFs (and the avatar/parallax images below) are vendored locally under `public/assets/`. They originate from `https://motionsites.ai/assets/...` (e.g. `https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif`), with case-sensitive filenames matching the local paths.

## Hero (`Hero` in `src/App.tsx`)

Centered, narrow column: `<section id="about">` with `mx-auto w-full max-w-[440px] px-6 pt-12 md:pt-16`. Uses the `useInViewAnimation` hook for staggered reveals.

- **Logo text:** `Viktor Oddy` in an `<h1>`, classes `mb-4 font-serif text-[32px] font-semibold tracking-tight text-[#051A24] md:text-[40px] lg:text-[44px]`. Animation delay `0.1s`.
- **Tagline:** `The creative studio of Viktor Oddy` in a `<p>`, classes `mb-2 font-mono text-xs text-[#051A24] md:text-sm`. Animation delay `0.2s`.
- **Main heading (`<h2>`):** two lines — `Build the next wave,` / `the bold way.` — where `next wave` and `bold way.` are wrapped in `<span className="font-serif">`. Classes `whitespace-nowrap text-[32px] leading-[1.1] tracking-tight text-[#0D212C] md:text-[40px] lg:text-[44px]`. A `<br />` separates the lines. Animation delay `0.3s`.
- **Description:** a `flex flex-col gap-6` container with classes `mt-5 ... text-sm leading-relaxed text-[#051A24] md:mt-6 md:text-base`, three paragraphs. Animation delay `0.4s`:
  - Paragraph 1: `I spent seven years at Apple crafting products used by over a billion people. I founded Vortex Studio to bring that same level of thinking to innovators shaping what comes next.`
  - Paragraph 2: `The studio is deliberately small. I guide the creative vision on every project, backed by a veteran design crew that moves fast without cutting corners.`
  - Paragraph 3: `Projects start at $5,000 per month.`
- **Buttons:** a `flex flex-col gap-3 sm:flex-row md:mt-6 md:gap-4` container, `mt-5`, animation delay `0.5s`:
  - `Start a chat` — `variant="primary"`, `href={BOOK_URL}`.
  - `View projects` — `variant="secondary"`, `href="#work"`.

## Infinite Marquee (`Marquee` in `src/App.tsx`)

Full-width horizontally scrolling image strip.

- Wrapper: `mb-16 mt-16 w-full overflow-hidden md:mt-20`.
- Track: `animate-marquee flex w-max`.
- The eight `MARQUEE_IMAGES` are duplicated (`[...MARQUEE_IMAGES, ...MARQUEE_IMAGES]`, 16 total). Each `<img>` has `key={i}`, `alt=""`, `aria-hidden={i >= MARQUEE_IMAGES.length}` (the duplicate copy is hidden from assistive tech), and classes `mx-3 h-[280px] w-auto rounded-2xl object-cover shadow-lg md:h-[500px]`.
- Animation (CSS): `translateX(0)` to `translateX(-50%)`, `30s linear infinite` on desktop, `10s` on mobile.

## Testimonial / Parallax Section (`src/components/TestimonialSection.tsx`)

`<section>` with `mx-auto max-w-2xl px-6 py-12 text-center`. Uses `useInViewAnimation` plus a custom `useParallax` hook.

- **Quote icon:** Lucide `Quote`, classes `mx-auto h-6 w-6 text-slate-900`, wrapped in a `<div>` with animation delay `0.1s`.
- **Large quote (`<blockquote>`):** `‘I left ` + `<span className="font-serif">Apple</span>` + ` to build the studio I always wanted to work with’` (uses `&lsquo;` / `&rsquo;` curly quotes). Classes `mt-6 text-[32px] leading-[1.1] tracking-tight text-[#0D212C] md:text-[40px] lg:text-[44px]`. Animation delay `0.2s`.
- **Author:** `Viktor Oddy` in a `<p>`, classes `mt-6 text-sm italic text-[#273C46]`. Animation delay `0.3s`.
- **Company logos (as text):** a `mt-12 flex items-center justify-center gap-8` row, animation delay `0.4s`. Each is a `<span>` with classes `text-[24px] font-medium text-slate-900` and an inline `width`:
  - `Apple` — `80px`
  - `IDEO` — `83px`
  - `Polygon` — `110px`
- **Parallax image:** a `<div ref={parallaxRef}>` with `mt-16` and animation delay `0.5s`, containing an `<img>`:
  - `src` = `/assets/hf_20260330_103804_7aa5494f-4d5b-432e-9dc7-20715275f143.webp`
  - `alt="Chris Halaska"`, `loading="lazy"`
  - Classes `mx-auto w-full max-w-xs rounded-2xl shadow-lg will-change-transform`
  - Inline `style={{ transform: \`translateY(${offset.toFixed(2)}px)\` }}`

> **Asset note:** The parallax image is vendored locally as the `.webp` above. It originally came from `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzzbokvigwjottwixh07lwa1p%2Fhf_20260330_103804_7aa5494f-4d5b-432e-9dc7-20715275f143.png&w=1280&q=85`.

### `useParallax` hook

```ts
const PARALLAX_MAX_OFFSET = 200;
```

- Tracks an element with an `IntersectionObserver` (sets a `visible` flag) plus passive `scroll` and `resize` listeners.
- On update, computes progress `(viewportHeight - rect.top) / (viewportHeight + rect.height)` clamped to `[0, 1]`, then `next = (clamped - 0.5) * 2 * PARALLAX_MAX_OFFSET`, clamped to `[-200, 200]` px.
- Updates are scheduled via `requestAnimationFrame` and only run while the element is visible; the frame and listeners are cleaned up on unmount.

## Pricing Section (`src/components/PricingSection.tsx`)

`<section id="services">` with `w-full px-6 py-12`. Inner wrapper `md:flex md:justify-end`; the grid is `grid grid-cols-1 gap-8 md:max-w-4xl md:grid-cols-2` (right-aligned on desktop). Uses `useInViewAnimation`. `BOOK_URL = 'https://halaskastudio.com/./book'`.

### Card 1 — Monthly Partnership (dark)

`<article>` classes: `rounded-[40px] bg-[#051A24] pb-10 pl-10 pr-10 pt-3 shadow-[inset_0_2px_16px_0_rgba(246,252,255,0.12)] md:pr-24`. Animation delay `0.1s`.

- **Title (`<h3>`):** `Monthly Partnership` — `mt-7 text-[22px] font-medium text-[#F6FCFF]`.
- **Description (`<p>`):** `A dedicated creative design team.` `<br />` `You work directly with Viktor.` — `mt-3 text-sm leading-relaxed text-[#E0EBF0]`.
- **Price:** `$5,000` in `mt-8 text-2xl text-[#F6FCFF]`, then `Monthly` in `mt-1 text-sm text-[#E0EBF0]`.
- **Buttons** (`mt-8 flex flex-col gap-3 sm:flex-row`): `Start a chat` (`variant="primary"`) and `How it works` (`variant="secondary"`), both `href={BOOK_URL}`.

### Card 2 — Custom Project (light)

`<article>` classes: `rounded-[40px] bg-white pb-10 pl-10 pr-10 pt-3 shadow-[0_4px_16px_rgba(0,0,0,0.08)] md:pr-24`. Animation delay `0.2s`.

- **Title (`<h3>`):** `Custom Project` — `mt-7 text-[22px] font-medium text-[#0D212C]`.
- **Description (`<p>`):** `Fixed scope, fixed timeline.` `<br />` `Same team, same standards.` — `mt-3 text-sm leading-relaxed text-[#273C46]`.
- **Price:** `$5,000` in `mt-8 text-2xl text-[#0D212C]`, then `Minimum` in `mt-1 text-sm text-[#273C46]`.
- **Button** (`mt-8 flex`): `Start a chat` (`variant="tertiary"`), `href={BOOK_URL}`.

## Testimonial Carousel (`src/components/TestimonialCarousel.tsx`)

`<section>` with `w-full overflow-hidden py-20`. Uses `useInViewAnimation`.

### Header row

A `flex flex-col gap-8 md:ml-auto md:max-w-4xl md:flex-row md:items-end md:justify-between` container (animation delay `0.1s`):

- **Title (`<h2>`):** `What ` + `<span className="font-serif">builders</span>` + ` say`, classes `text-[32px] leading-[1.1] tracking-tight text-[#0D212C] md:text-[40px] lg:text-[44px]`.
- **Right cluster** (`flex flex-col items-start gap-4 md:items-end`):
  - Five Lucide `Star` icons (`h-5 w-5 fill-black text-black`) inside a `flex` wrapper labeled `aria-label="5 out of 5 stars"`, followed by `Clutch 5/5` in `text-sm text-[#051A24]`.
  - Prev/next buttons in a `flex gap-3`: each `flex h-12 w-12 items-center justify-center rounded-full border border-[#0D212C]/20 text-[#0D212C] transition-colors hover:bg-[#0D212C]/5`, containing Lucide `ChevronLeft` / `ChevronRight` (`h-5 w-5`) with `aria-label` "Previous testimonial" / "Next testimonial".

### Carousel mechanics

```ts
const COUNT = TESTIMONIALS.length;
const TRIPLED = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
const GAP = 24; // gap-6
const DESKTOP_CARD_WIDTH = 427.5;
const AUTOPLAY_MS = 3000;
```

- State: `index` (starts at `COUNT`), `animate`, `hovered`, `cardWidth`.
- Card width updates on resize: `window.innerWidth >= 768 ? DESKTOP_CARD_WIDTH : window.innerWidth - 48` (i.e. 427.5px on desktop, full width minus 48px on mobile).
- Auto-advance every `3000ms` via `setInterval`; pauses while `hovered` (`onMouseEnter` / `onMouseLeave` on the track wrapper).
- The testimonials are tripled for an infinite-scroll illusion. `handleTransitionEnd` snaps the index back into the middle copy without animation when it drifts past `COUNT * 2` or below `COUNT` (re-enabling `animate` after a double `requestAnimationFrame`).
- Track container: `mt-12 pl-6` (animation delay `0.2s`). Inner track: `flex gap-6 will-change-transform` with inline `transform: translateX(-offset px)` where `offset = index * (cardWidth + GAP)`, and `transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'` when animating (`'none'` otherwise).

### Cards

Each `<article>`: `shrink-0 rounded-[32px] bg-white px-6 py-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)] md:rounded-[40px] md:pl-10 md:pr-24`, inline `width: ${cardWidth}px`. Exited cards (`i < index`) fade and scale down: `opacity: 0` and `transform: scale(0.9)` with `transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)`.

Card content:

- **`QuoteMark` SVG** — a custom `28x22` (`viewBox="0 0 28 22"`) double-quote glyph filled `#0D212C`:

```tsx
<svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path
    d="M0 22V14.3C0 11.5 0.56 9 1.68 6.8C2.84 4.56 4.72 2.3 7.32 0L11.6 3.1C10 4.62 8.82 6.04 8.06 7.36C7.34 8.68 6.94 10.06 6.86 11.5H12.2V22H0ZM15.8 22V14.3C15.8 11.5 16.36 9 17.48 6.8C18.64 4.56 20.52 2.3 23.12 0L27.4 3.1C25.8 4.62 24.62 6.04 23.86 7.36C23.14 8.68 22.74 10.06 22.66 11.5H28V22H15.8Z"
    fill="#0D212C"
  />
</svg>
```

- **Quote text (`<p>`):** `mt-5 text-base leading-relaxed text-[#0D212C]`.
- **Author row** (`mt-7 flex items-center gap-4`): circular avatar `<img>` (`h-12 w-12 rounded-full object-cover`, `loading="lazy"`, `alt={name}`), name in `text-sm font-semibold text-[#051A24]`, role/company in `text-sm text-[#273C46]` prefixed with `→` (`&rarr;`): `→ {role}, {company}`.

### Testimonials data

| Name | Role | Company | Avatar |
| --- | --- | --- | --- |
| `Marcus Anderson` | `CEO` | `Data.storage` | `/assets/pexels-2379004.jpg` |
| `alexwu` | `Founder` | `Nexgate` | `/assets/pexels-220453.jpg` |
| `James Mitchell` | `VP Product` | `LaunchPad` | `/assets/pexels-614810.jpg` |
| `Rachel Foster` | `Co-founder` | `Nexus Labs` | `/assets/pexels-774909.jpg` |
| `David Zhang` | `Head of Design` | `Paradigm Labs` | `/assets/pexels-1222271.jpg` |

Quotes (verbatim):

1. `With very little guidance team delivered designs that were consistently spot on. They understood our brand from day one, and every iteration landed closer than anything we could have briefed ourselves.`
2. `Viktor led the creation of our best fundraising deck to date! Investors kept commenting on the design before we even got to the numbers. Worth every dollar and then some.`
3. `Working with Viktor transformed our product vision into an interface our users genuinely love. Every screen feels considered — nothing shipped until it earned its place.`
4. `The design quality exceeded our expectations at every single milestone. It felt like having a world-class in-house design team without the overhead of building one.`
5. `Incredible work from start to finish. Fast, opinionated in the best way, and relentlessly polished. The crew moves like a team three times its size.`

> **Asset note:** Avatars are vendored locally from Pexels (`pexels-*.jpg`).

## Projects Section (`src/components/ProjectsSection.tsx`)

`<section id="work">` with `mx-auto max-w-[1200px] px-6 py-12`. Inner stack: `flex flex-col gap-16 md:gap-20`. Each `ProjectItem` independently triggers a fade-in via its own `useInViewAnimation`.

Each `ProjectItem` (animation delay `0.1s`):

- Text block offset left: `<div className="ml-20 mb-6 md:ml-28">` with the project name (`<h3>`, `font-serif text-2xl font-semibold text-[#051A24] md:text-3xl`) and description (`<p>`, `mt-2 text-sm text-[#051A24]/70 md:text-base`).
- Full-width `<img>` below: `w-full rounded-2xl object-cover shadow-lg`, `loading="lazy"`, `alt={\`${name} — ${description}\`}`.

Projects data:

| Name | Description | Image |
| --- | --- | --- |
| `evr` | `From idea to millions raised for a web3 AI product` | `/assets/hero-evr-ventures-preview-DZxeVFEX.gif` |
| `Automation Machines` | `Streamlining industrial automation processes` | `/assets/hero-automation-machines-preview-DlTveRIN.gif` |
| `xPortfolio` | `Modern portfolio management platform` | `/assets/hero-xportfolio-preview-D4A8maiC.gif` |

> **Asset note:** Project GIFs are vendored locally; original origin `https://motionsites.ai/assets/...`.

## Partner Section (`src/components/PartnerSection.tsx`)

`<section>` with `w-full px-6 py-12`. Receives `images: string[]` (the `MARQUEE_IMAGES`). Uses `useInViewAnimation`.

```ts
const SPAWN_INTERVAL_MS = 80;
const TRAIL_LIFETIME_MS = 1000;
const AVATAR = '/assets/pexels-415829.jpg';
```

- **Container** (`ref={containerRef}`, `onMouseMove={handleMouseMove}`): `relative mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-white py-48 text-center shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_4px_30px_rgba(0,0,0,0.06)]`. Animation delay `0.1s`.
- **Cursor trail:** on `mousemove`, no more often than every `80ms` (`performance.now()` throttle), a `TrailItem` is spawned at the cursor position (`event.clientX/Y` minus the container rect) with a random `rotation` of `Math.random() * 20 - 10` (i.e. −10° to +10°), cycling through `images`. Each trail `<img>` is `animate-trail-fade pointer-events-none absolute z-0 w-36 rounded-lg shadow-lg`, positioned via inline `left`/`top`, and sets the CSS custom property `--trail-rotation`. Items are removed after `1000ms` via `setTimeout`; all timeouts are tracked in a `Set` and cleared on unmount.
- **Foreground** (`pointer-events-none relative z-10`):
  - Heading (`<h2>`): `Partner with us`, classes `mb-12 font-serif text-[48px] leading-[1.05] text-[#0D212C] md:text-[64px] lg:text-[80px]`.
  - CTA `Button variant="primary"`, `href="https://halaskastudio.com/./book"`, extra classes `pointer-events-auto py-2 pl-2`, containing a circular avatar `<img src={AVATAR}>` (`h-10 w-10 rounded-full object-cover`, `aria-hidden`) and the label `Start chat with Viktor`.

> **Asset note:** The avatar (`pexels-415829.jpg`) is vendored locally from Pexels.

## Footer (`src/components/Footer.tsx`)

`<footer>` with `mx-auto w-full max-w-[1200px] px-6 py-12`, animation delay `0.1s` (via `useInViewAnimation`).

- Inner `flex flex-col justify-between gap-12 md:flex-row`.
- **Left:** `Start a chat` (`variant="primary"`, `href="https://halaskastudio.com/./book"`).
- **Right** (`flex items-start gap-8`): Lucide `ArrowUpRight` (`mt-1 h-5 w-5 text-[#051A24]`), then two `<nav>` columns of links (`flex flex-col gap-3`):
  - **Anchor links** (`aria-label="Site"`): `Services` → `#services`, `Work` → `#work`, `About` → `#about`.
  - **External links** (`aria-label="Social"`, `target="_blank"`, `rel="noopener noreferrer"`): `x.com` → `https://x.com`, `LinkedIn` → `https://www.linkedin.com`.
- All links: `text-base text-[#051A24] transition-opacity hover:opacity-70`.

## Copyright Bar (`src/components/CopyrightBar.tsx`)

A `<div>` with `mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-4 text-sm text-[#051A24]`. Left `<span>`: `Vortex Studio Limited`. Right `<span>`: `Austin, USA`.

## Fixed Bottom Nav (`src/components/BottomNav.tsx`)

A floating pill `<nav aria-label="Quick actions">` fixed to the bottom and horizontally centered: `fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-6 rounded-full bg-white px-8 py-2`, with a layered shadow:

```
shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_1px_2px_0_rgba(5,26,36,0.1),0_4px_4px_0_rgba(5,26,36,0.09),0_9px_6px_0_rgba(5,26,36,0.05),0_17px_7px_0_rgba(5,26,36,0.01),0_4px_30px_rgba(0,0,0,0.08)]
```

Contents:

- A `V` link (`href="#top"`, `aria-label="Back to top"`) in `font-serif text-2xl font-semibold text-[#051A24]`.
- A `Start a chat` button (`variant="primary"`, `href="https://halaskastudio.com/./book"`, extra classes `px-5 py-2.5`).

## Button Component (`src/components/Button.tsx`)

A reusable anchor-based button. Props extend `AnchorHTMLAttributes<HTMLAnchorElement>` with `variant?: 'primary' | 'secondary' | 'tertiary'` (default `'primary'`) and `children`.

Base classes:

```
inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 py-3 text-sm font-medium transition-transform duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0
```

Variant classes:

- **primary:** `bg-[#051A24] text-white` + `PRIMARY_SHADOW`
- **secondary:** `bg-white text-[#051A24]` + `SECONDARY_SHADOW`
- **tertiary:** `bg-white text-[#051A24]` + `TERTIARY_SHADOW`

Shadow tokens (critical for the design feel):

```
PRIMARY_SHADOW =
  'shadow-[0_1px_2px_0_rgba(5,26,36,0.1),0_4px_4px_0_rgba(5,26,36,0.09),0_9px_6px_0_rgba(5,26,36,0.05),0_17px_7px_0_rgba(5,26,36,0.01),0_26px_7px_0_rgba(5,26,36,0),inset_0_2px_8px_0_rgba(255,255,255,0.5)]'

SECONDARY_SHADOW =
  'shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_4px_30px_rgba(0,0,0,0.08)]'

TERTIARY_SHADOW =
  'shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_4px_30px_rgba(0,0,0,0.08),0_1px_2px_0_rgba(5,26,36,0.1),0_4px_4px_0_rgba(5,26,36,0.09),0_9px_6px_0_rgba(5,26,36,0.05)]'
```

## Animations

### `useInViewAnimation` hook (`src/hooks/useInViewAnimation.ts`)

A generic scroll-trigger hook. It observes a `ref`d element with an `IntersectionObserver` (`threshold: 0.1`), flips `inView` to `true` once when at least 10% enters the viewport (then disconnects, so it triggers only once), and returns `{ ref, inView, animationClass }` where `animationClass` is `'animate-fade-in-up'` when in view and `'opacity-0'` otherwise.

```ts
import { useEffect, useRef, useState } from 'react';

export function useInViewAnimation<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const animationClass = inView ? 'animate-fade-in-up' : 'opacity-0';

  return { ref, inView, animationClass };
}
```

Each element within a section uses staggered `animationDelay` values (`0.1s`, `0.2s`, `0.3s`, etc.).

### CSS keyframes (in `src/index.css`)

```css
/* ---- Infinite marquee ---- */
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}

@media (max-width: 767px) {
  .animate-marquee {
    animation-duration: 10s;
  }
}

/* ---- Scroll-triggered fade in ---- */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

/* ---- Cursor trail thumbnails (PartnerSection) ---- */
@keyframes trail-fade {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(var(--trail-rotation, 0deg)) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--trail-rotation, 0deg)) scale(0.6);
  }
}

.animate-trail-fade {
  animation: trail-fade 1000ms ease-out forwards;
}

@media (prefers-reduced-motion: reduce) {
  .animate-marquee,
  .animate-fade-in-up,
  .animate-trail-fade {
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
  }
}
```

> Note: the trail keyframe scales to `0.6` and the `.animate-fade-in-up` rule keeps `opacity: 0` so elements stay hidden until their delayed animation runs. A `prefers-reduced-motion: reduce` block neutralizes all three animations.

## Color Palette

- **Primary dark:** `#051A24` (also body text)
- **Secondary dark:** `#0D212C`
- **Light text on dark:** `#F6FCFF`, `#E0EBF0`
- **Muted text:** `#273C46`
- **Background:** white throughout

## File Structure

- `index.html` — favicon, font preload, root mount.
- `src/main.tsx` — React entry (`StrictMode`, imports `index.css`).
- `src/App.tsx` — main layout with `Hero`, `Marquee`, and section composition; defines `MARQUEE_IMAGES` and `BOOK_URL`.
- `src/components/Button.tsx` — reusable button (primary/secondary/tertiary variants).
- `src/components/TestimonialSection.tsx` — quote with parallax image (`useParallax`).
- `src/components/PricingSection.tsx` — two pricing cards.
- `src/components/TestimonialCarousel.tsx` — auto-scrolling testimonial cards.
- `src/components/ProjectsSection.tsx` — project showcase items.
- `src/components/PartnerSection.tsx` — interactive mouse-trail CTA section.
- `src/components/Footer.tsx` — footer with links.
- `src/components/CopyrightBar.tsx` — copyright line.
- `src/components/BottomNav.tsx` — fixed floating bottom nav.
- `src/hooks/useInViewAnimation.ts` — `IntersectionObserver` scroll-trigger hook.
- `src/index.css` — font faces, marquee animation, fade-in-up animation, cursor-trail animation.
- `public/PPMondwest-Regular.woff2` — local serif accent font.
- `public/assets/` — vendored GIF previews, Pexels avatars, and the parallax `.webp`.
