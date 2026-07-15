# TOONHUB — 3D Character-Figurine Carousel Hero

## Overview

Build a single, full-viewport hero section: a character-figurine carousel called **TOONHUB**. Four 3D character figurines rotate through four positional roles (center, left, right, back); clicking the navigation arrows advances the carousel and crossfades the background color, image positions, scales, blurs, and opacities simultaneously. A giant ghost headline ("3D SHAPE") sits behind the figurines, which are anchored to the bottom of the screen and overlap that text.

## Tech Stack

- **Framework:** React with TypeScript.
- **Build tool:** Vite.
- **Styling:** Tailwind CSS. Inline `style` objects are used for the dynamic/role-based values.
- **Icons:** `lucide-react` — `ArrowLeft`, `ArrowRight`.
- **Fonts (Google Fonts):** Inter (body) and Anton (display).
- **Notable techniques:** image preloading via `new Image()` on mount, an animation lock keyed to a 650 ms transition window, role-derived per-item CSS, and an inline SVG `fractalNoise` grain overlay.

## Fonts

Load the fonts in the `index.html` `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

- **Body font:** `'Inter', sans-serif`.
- **Display font** (giant ghost text + bottom-right link): `'Anton', sans-serif`.

## Data & Constants

Four figurine images, each with a background color (`bg`) and an unused-but-paired panel color (`panel`), using the exact URLs and colors below:

```ts
const IMAGES = [
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png', bg: '#F4845F', panel: '#F79B7F' },
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png', bg: '#6BBF7A', panel: '#85CC92' },
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png', bg: '#E882B4', panel: '#ED9DC4' },
  { src: 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png', bg: '#6EB5FF', panel: '#8DC4FF' },
];
```

Other module-level constants:

```ts
const COUNT = IMAGES.length;          // 4
const DURATION_MS = 650;
const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';
const ANTON = "'Anton', sans-serif";

type Role = 'center' | 'left' | 'right' | 'back';
```

## State & Logic (`src/ToonHubHero.tsx`)

The whole hero is one default-exported component, `ToonHubHero`.

### State

- `activeIndex` — number, `0`–`3`, initial `0`.
- `isAnimating` — boolean lock, initial `false`.
- `isMobile` — boolean, lazily initialized to `typeof window !== 'undefined' && window.innerWidth < 640`; updated on resize.
- `lockTimeoutRef` — a `useRef<number | undefined>` holding the lock-release timeout id.

### Effects

- **Preload** all four images on mount via `new Image()` (set `img.src` for each entry in `IMAGES`).
- **Resize listener:** on `resize`, set `isMobile = window.innerWidth < 640`; clean up the listener on unmount.
- **Cleanup:** on unmount, `window.clearTimeout(lockTimeoutRef.current)`.

### Navigation

`navigate(direction: 'next' | 'prev')`, wrapped in `useCallback` (depends on `isAnimating`):

- If `isAnimating`, return early (ignore the click).
- Set `isAnimating = true`.
- Update `activeIndex`: for `'next'` use `(prev + 1) % COUNT`; for `'prev'` use `(prev + COUNT - 1) % COUNT`.
- Release the lock after `DURATION_MS` (650 ms) via `window.setTimeout`, storing the id in `lockTimeoutRef`.

### Role derivation

```ts
function roleFor(index: number, activeIndex: number): Role {
  if (index === activeIndex) return 'center';
  if (index === (activeIndex + 3) % COUNT) return 'left';
  if (index === (activeIndex + 1) % COUNT) return 'right';
  return 'back';
}
```

So: `center = activeIndex`, `left = (activeIndex + 3) % 4`, `right = (activeIndex + 1) % 4`, `back = (activeIndex + 2) % 4`.

## Grain Overlay

An inline SVG `fractalNoise` filter encoded as a data URI, used as a repeating background image:

```ts
const GRAIN_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='0.08'/></svg>`;
const GRAIN_URL = `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`;
```

- `baseFrequency = 0.9`, `numOctaves = 4`, rect `opacity = 0.08` inside the SVG.
- Container element: `aria-hidden="true"`, classes `absolute inset-0 pointer-events-none`, inline `zIndex: 50`, `opacity: 0.4`, `backgroundImage: GRAIN_URL`, `backgroundSize: '200px 200px'`, `backgroundRepeat: 'repeat'`.

## Layout Structure

### Outer wrapper

`<div className="relative w-full overflow-hidden">` with inline style:

- `backgroundColor: IMAGES[activeIndex].bg`
- `transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)'`
- `fontFamily: "'Inter', sans-serif"`

### Stage

Inside, a `<div className="relative w-full">` with inline `style={{ height: '100vh', overflow: 'hidden' }}`. All layers below are positioned within this stage.

### 1. Grain overlay

As described in **Grain Overlay** above (`zIndex: 50`).

### 2. Giant ghost text "3D SHAPE"

Container: `<div className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none">` with `style={{ zIndex: 2, top: '18%' }}`.

Inner `<h1>` text content **`3D SHAPE`** with inline style:

- `fontFamily: ANTON`
- `fontSize: 'clamp(90px, 28vw, 380px)'`
- `fontWeight: 900`
- `color: '#ffffff'`
- `opacity: 1`
- `lineHeight: 1`
- `textTransform: 'uppercase'`
- `letterSpacing: '-0.02em'`
- `whiteSpace: 'nowrap'`

### 3. Top-left brand label "TOONHUB"

A `<span>` with classes `absolute top-6 left-4 sm:left-8 text-xs font-semibold uppercase` and inline style `{ zIndex: 60, color: '#ffffff', opacity: 0.9, letterSpacing: '0.18em' }`. Text: **`TOONHUB`**.

### 4. Carousel

A `<div className="absolute inset-0">` with `style={{ zIndex: 3 }}`. Map over all four `IMAGES`; for each, compute `roleFor(index, activeIndex)` and render an item `<div key={image.src} data-role={role} style={itemStyle(role, isMobile)}>` containing the `<img>`.

The `<img>` uses `src={image.src}`, `alt={`Character figurine ${index + 1}`}`, `draggable={false}`, and inline style:

```ts
{
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  objectPosition: 'bottom center',
}
```

#### `itemStyle(role, isMobile)`

Shared base for every item:

```ts
const base: CSSProperties = {
  position: 'absolute',
  aspectRatio: '0.6 / 1',
  transition: [
    `transform ${DURATION_MS}ms ${EASE}`,
    `filter ${DURATION_MS}ms ${EASE}`,
    `opacity ${DURATION_MS}ms ${EASE}`,
    `left ${DURATION_MS}ms ${EASE}`,
  ].join(', '),
  willChange: 'transform, filter, opacity',
};
```

Per-role overrides (merged over `base`):

| Role | `transform` | `filter` | `opacity` | `zIndex` | `left` | `height` | `bottom` |
|---|---|---|---|---|---|---|---|
| **center** | `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})` | `'none'` | `1` | `20` | `'50%'` | `isMobile ? '60%' : '92%'` | `isMobile ? '22%' : 0` |
| **left** | `translateX(-50%) scale(1)` | `blur(2px)` | `0.85` | `10` | `isMobile ? '20%' : '30%'` | `isMobile ? '16%' : '28%'` | `isMobile ? '32%' : '12%'` |
| **right** | `translateX(-50%) scale(1)` | `blur(2px)` | `0.85` | `10` | `isMobile ? '80%' : '70%'` | `isMobile ? '16%' : '28%'` | `isMobile ? '32%' : '12%'` |
| **back** | `translateX(-50%) scale(1)` | `blur(4px)` | `1` | `5` | `'50%'` | `isMobile ? '13%' : '22%'` | `isMobile ? '32%' : '12%'` |

(Right is identical to left except for `left`.)

### 5. Bottom-left text + nav buttons

Container: `<div className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24">` with `style={{ zIndex: 60, maxWidth: 320 }}`.

- **Heading `<p>`** — classes `font-bold uppercase tracking-widest mb-2 sm:mb-3 text-base sm:text-[22px]`, inline style `{ color: '#ffffff', opacity: 0.95, letterSpacing: '0.02em' }`. Text: **`TOONHUB FIGURINES`**.
- **Body `<p>`** (hidden on mobile) — classes `hidden sm:block text-xs sm:text-sm mb-4 sm:mb-5`, inline style `{ color: '#ffffff', opacity: 0.85, lineHeight: 1.6 }`. Text, verbatim:
  > The artwork is stunning, shipped fully prepared. The finish is a vision, the 3D craft is flawless. Many thanks! Wishing you the win. Order now.
- **Button row** — `<div className="flex items-center gap-3 sm:gap-4">` containing two circular buttons:
  - Each `<button type="button">` has classes `w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-transparent transition-[transform,background-color] duration-150 hover:scale-[1.08] hover:bg-white/[0.12]` and inline style `{ border: '2px solid #ffffff', color: '#ffffff' }`.
  - **Previous** button: `aria-label="Previous figurine"`, `onClick={() => navigate('prev')}`, renders `<ArrowLeft size={26} strokeWidth={2.25} />`.
  - **Next** button: `aria-label="Next figurine"`, `onClick={() => navigate('next')}`, renders `<ArrowRight size={26} strokeWidth={2.25} />`.
  - Hover effect (from the Tailwind classes): scale `1.08` and background `rgba(255, 255, 255, 0.12)`, transitioning `transform` and `background-color` over `150ms`.

### 6. Bottom-right link "DISCOVER IT"

`<a href="#discover">` with classes `absolute bottom-6 right-4 sm:bottom-20 sm:right-10 flex items-center gap-2 sm:gap-3 opacity-95 hover:opacity-100 transition-opacity duration-200` and inline style:

- `zIndex: 60`
- `fontFamily: ANTON`
- `fontSize: 'clamp(20px, 4vw, 56px)'`
- `fontWeight: 400`
- `color: '#ffffff'`
- `letterSpacing: '-0.02em'`
- `lineHeight: 1`
- `textTransform: 'uppercase'`
- `textDecoration: 'none'`

Content: text **`DISCOVER IT`** followed by `<ArrowRight className="w-5 h-5 sm:w-8 sm:h-8" strokeWidth={2.25} />`. Opacity animates `0.95 → 1` on hover over `200ms`.

## Animation / Behavior Summary

- Clicking an arrow calls `navigate('prev' | 'next')`, which rotates the role assignments by changing `activeIndex`.
- The background color, each figurine's position (`left`/`bottom`/`height`), scale, blur, and opacity all crossfade **simultaneously over 650 ms** using `cubic-bezier(0.4, 0, 0.2, 1)`.
- While a transition is in flight, `isAnimating` blocks further navigation until the 650 ms lock releases.
- The character images sit at the bottom of the screen (`objectPosition: 'bottom center'`) and overlap the giant "3D SHAPE" ghost text behind them.

## Color Palette

- **Figurine background / panel pairs:** `#F4845F` / `#F79B7F`, `#6BBF7A` / `#85CC92`, `#E882B4` / `#ED9DC4`, `#6EB5FF` / `#8DC4FF`.
- **Foreground / UI:** white `#ffffff` (text, borders, icons), with opacities `0.85`–`0.95` for most text and `0.4` for the grain layer.
- **Button hover background:** `rgba(255, 255, 255, 0.12)` (`bg-white/[0.12]`).
