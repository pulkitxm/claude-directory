# USD Halo — Premium Fintech Stablecoin Landing Page

## Overview

Build a premium, fintech-style landing page for a stablecoin product called **Halo / USD Halo**. The page leans into a tight, modern fintech aesthetic: a custom "halo" logo mark, full-bleed background videos, two infinite brand marquees, and bold display headings with negative letter-spacing. The page background is `#F5F5F5` throughout, and `font-medium` (600) is the heaviest weight used anywhere.

## Tech Stack

- **Framework:** React 18 (`react` / `react-dom` `^18.3.1`) + TypeScript (`^5.6.3`)
- **Build tool:** Vite (`^5.4.10`) with `@vitejs/plugin-react` (`^4.3.3`)
- **Styling:** Tailwind CSS (`^3.4.14`) with `postcss` (`^8.4.49`) and `autoprefixer` (`^10.4.20`)
- **Icons:** `lucide-react` (`^0.468.0`) — `ArrowRight` only. No other UI libraries.
- **Primary font:** TT Norms Pro (loaded via `@font-face`); the hero paragraph uses Inter as an inline override
- **Notable techniques:** custom inline-`<svg>` logo using `currentColor`; CSS `@keyframes` marquees with a duplicated track for seamless looping; `<video>` backgrounds with `autoplay`/`muted`/`loop`/`playsInline`

## Global Setup

- Tailwind `base` + `components` + `utilities` at the top of `src/index.css`:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- Load **TT Norms Pro** via `@font-face` with `font-display: swap`:
  ```css
  @font-face {
    font-family: 'TT Norms Pro';
    src: url('/fonts/tt-norms-pro-regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'TT Norms Pro';
    src: url('/fonts/tt-norms-pro-semibold.woff2') format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
  ```
- Apply the font to `html, body` and inherit on `*`, then set the page background:
  ```css
  html,
  body {
    font-family: 'TT Norms Pro', ui-sans-serif, system-ui, -apple-system,
      'Segoe UI', Helvetica, Arial, sans-serif;
  }

  * {
    font-family: inherit;
  }

  body {
    margin: 0;
    background-color: #f5f5f5;
  }
  ```
- **Page wrapper:** `flex flex-col bg-[#F5F5F5]`. The first section (Navbar + Hero) is wrapped in a `relative h-screen flex flex-col overflow-hidden` container.
- **Inner content max width** across sections: `max-w-[88rem] mx-auto`.

### HTML document (`index.html`)

- `lang="en"`, favicon at `/favicon.svg`.
- Meta description: `USD Halo — an automated, reward-powered digital dollar built for native passive earnings and effortless connection into DeFi.`
- Title: `Halo — Your Wealth Works`
- Mount point `<div id="root"></div>` and `<script type="module" src="/src/main.tsx">`.

### Custom Logo Icon

Create an SVG component `LogoIcon` that accepts an optional `className`, uses `fill="currentColor"`, `viewBox="0 0 256 256"`, `aria-hidden="true"`, and renders this single path (a stylized "halo" mark made of two interlocking rounded squares):

```tsx
const LOGO_PATH =
  'M 128.005 191.173 C 128.448 156.208 156.93 128 192 128 L 192 64 L 128 64 C 128 99.346 99.346 128 64 128 L 64 192 L 128 192 Z M 192 256 L 64 256 C 28.654 256 0 227.346 0 192 L 0 64 L 64 64 L 64 0 L 192 0 C 227.346 0 256 28.654 256 64 L 256 192 L 192 192 Z'

export default function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d={LOGO_PATH} />
    </svg>
  )
}
```

## Composition

`App` renders, in order:

1. A `relative h-screen flex flex-col overflow-hidden` wrapper containing the **Navbar** (absolute) + **HeroSection**.
2. **InfoSection**
3. **BackedBySection**
4. **UseCasesSection**

```tsx
export default function App() {
  return (
    <div className="flex flex-col bg-[#F5F5F5]">
      <div className="relative h-screen flex flex-col overflow-hidden">
        <Navbar />
        <HeroSection />
      </div>
      <InfoSection />
      <BackedBySection />
      <UseCasesSection />
    </div>
  )
}
```

All section backgrounds are `#F5F5F5`. All headings use negative letter-spacing for the tight, modern fintech feel.

## 1. Navbar (absolute, transparent over hero)

- `nav` is `absolute top-0 left-0 right-0 z-20 px-6 py-5`.
- Inner row: `max-w-[88rem] mx-auto flex items-center justify-between`.
- **Left:** an `a` (`flex items-center gap-2.5`) containing `LogoIcon` (`w-7 h-7 text-black`) + the word "Halo" in a `span` (`text-2xl font-medium tracking-tight text-black`).
- **Center (hidden below md):** container `hidden md:flex items-center gap-8`. Links **Network**, **Ecosystem**, **Rewards**, **Help**, **News** (from a `NAV_LINKS` array), each `text-base text-gray-700 hover:text-black font-medium transition-colors duration-200`.
- **Right:** a black pill `<button type="button">` labeled "Open Wallet" — `bg-black text-white text-base font-medium px-7 py-2.5 rounded-full hover:bg-gray-800 transition-colors duration-200`.

## 2. Hero Section

- **Outer:** `section` with `flex-1 px-6 pt-20 pb-6 flex items-end`.
- **Inner card:** `relative w-full max-w-[88rem] mx-auto rounded-2xl overflow-hidden` with inline style `height: 'calc(100vh - 96px)'`.
- **Background video** — `<video>` with `autoPlay muted loop playsInline`, classes `absolute inset-0 w-full h-full object-cover`. Source video:
  - In source it is vendored locally at `/assets/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4`.
  - Original asset URL (note: only scheme/host lowercased; path kept verbatim): `https://d8j0ntlcm91z4.cloudfront.net/user_38XZzbokvIgWjottwiXH07Lwa1P/HF_20260423_161253_C72B1869-400F-45ED-AC0C-52F68C2ED5BD.mp4`
- **Content overlay:** `relative z-10 flex flex-col items-start justify-start h-full p-12 pt-36`.
  - **H1** with a `<br />`: "Your Wealth" / "Works" — `text-black text-5xl md:text-6xl font-medium leading-tight max-w-xl mb-4`, inline `letterSpacing: '-0.04em'`.
  - **Paragraph:** "An automated, reward-powered digital dollar built for native passive earnings and effortless connection into DeFi." — `text-black/70 text-base md:text-lg max-w-md mb-8 leading-relaxed`, inline `fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif"`.
  - **Pill button** "Join us" with arrow circle (`PillButton` with `large` — see below).
  - Followed by the **brand marquee** below the button.

### Brand Marquee (inside hero, below button)

- Container: `mt-24 w-full max-w-md overflow-hidden`.
- Rendered with the shared `Marquee` component: `trackClass="marquee-track"`, `keyframesName="marquee"`, `durationSeconds={22}`, `itemClass="mx-7 shrink-0 text-black/60 whitespace-nowrap"`.
- Brand list (each rendered as a `span` with inline `style`):

| Brand | `fontFamily` | `fontWeight` | `letterSpacing` | `fontSize` | Other |
|---|---|---|---|---|---|
| Stripe | `Georgia, 'Times New Roman', serif` | 700 | `-0.02em` | `15px` | |
| Coinbase | `Arial, Helvetica, sans-serif` | 900 | `0.08em` | `13px` | `textTransform: 'uppercase'` |
| Uniswap | `'Trebuchet MS', sans-serif` | 600 | `0.01em` | `15px` | `fontStyle: 'italic'` |
| Aave | `'Courier New', monospace` | 700 | `0.12em` | `13px` | `textTransform: 'uppercase'` |
| Compound | `Palatino, 'Book Antiqua', serif` | 400 | `-0.01em` | `16px` | |
| MakerDAO | `Impact, 'Arial Narrow', sans-serif` | 400 | `0.04em` | `14px` | |
| Chainlink | `Verdana, sans-serif` | 700 | `-0.03em` | `13px` | |

## 3. Info Section ("Meet USD Halo.")

- `section` is `bg-[#F5F5F5] px-6 py-24` with inner `max-w-[88rem] mx-auto`.
- **Row 1** — 2-col grid: `grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start`.
  - **Left:** H2 "Meet USD Halo." — `text-black text-4xl md:text-5xl font-medium leading-tight mb-8`, inline `letterSpacing: '-0.03em'`. Below it, the black pill `PillButton` labeled "Discover it" (default size, `text-base`).
  - **Right:** paragraph "USD Halo is a reward-earning dollar coin that lets your savings grow while remaining tied to the U.S. dollar." — `text-black/70 text-2xl md:text-3xl leading-relaxed`.
- **Row 2** — 4-col card grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`.
  - **Card 1 (spans 2 cols on lg):** `lg:col-span-2 rounded-2xl p-7 min-h-80 flex flex-col justify-between` with inline background image (`backgroundSize: 'cover'`, `backgroundPosition: 'center'`):
    - In source the image is vendored locally at `/assets/hf_20260423_164207_f243351d-ed59-48ec-83a0-a5e996bdbe3c.webp`.
    - Original asset URL (image proxy wrapping a CloudFront PNG; path kept verbatim): `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38XZzbokvIgWjottwiXH07Lwa1P%2FHF_20260423_164207_F243351D-ED59-48EC-83A0-A5E996BDBE3C.PNG&w=1280&q=85`
    - **Title (top):** H3 "Savings that bloom" — `text-black text-2xl font-medium leading-snug`, inline `letterSpacing: '-0.02em'`.
    - **Body (bottom):** "Gain steady returns as your dollar tokens are routed into top-performing DeFi strategies." — `text-black/70 text-base max-w-xs`.
  - **Card 2:** solid `bg-[#2B2644] rounded-2xl p-7 min-h-80 flex flex-col justify-between`. White H3 with `<br />` "Always fluid," / "always pegged." — `text-white text-2xl font-medium leading-snug`, inline `letterSpacing: '-0.02em'`. Body "Keep fully dollar-anchored with on-demand access to funds — no lockups or waits." — `text-white/60 text-base`.
  - **Card 3:** same `bg-[#2B2644]` styling. H3 with `<br />` "Fully" / "automated". Body "Skip the task of tuning positions yourself. USD Halo runs in the background for you."

## 4. Backed By Section (marquee row)

- `section` is `bg-[#F5F5F5] px-6` with inner `max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-center`.
- **Left col (1/4):** paragraph `text-black/70 text-base leading-relaxed` with a `<br />` — "Funded by premier partners" / "and forward-thinking leaders."
- **Right col (3/4):** wrapper `md:col-span-3 overflow-hidden` containing the shared `Marquee` (same pattern as the hero marquee but slower): `trackClass="backers-track"`, `keyframesName="backers-marquee"`, `durationSeconds={30}`, `itemClass="mx-10 shrink-0 text-black/50 whitespace-nowrap"`.
- Backer list (each a `span` with inline `style`):

| Brand | `fontFamily` | `fontWeight` | `letterSpacing` | `fontSize` | Other |
|---|---|---|---|---|---|
| Fundamental Labs | `'Times New Roman', serif` | 400 | `0.02em` | `14px` | |
| KUCOIN | `'Arial Black', Arial, sans-serif` | 900 | `0.08em` | `16px` | |
| NGC | `Impact, sans-serif` | 700 | `0.05em` | `18px` | |
| NxGen | `Georgia, serif` | 600 | `-0.02em` | `17px` | |
| Matter Labs | `Helvetica, Arial, sans-serif` | 700 | `-0.01em` | `15px` | |
| DEXTools | `Verdana, sans-serif` | 700 | `0.06em` | `14px` | `textTransform: 'uppercase'` |
| NGRAVE | `'Courier New', monospace` | 700 | `0.18em` | `14px` | |
| Polychain | `Palatino, 'Book Antiqua', serif` | 500 | `0.03em` | `15px` | |

## 5. Use Cases Section

- `section` is `bg-[#F5F5F5] px-6 py-24`. Inner: `max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start`.
- **Left column** (`md:pr-12 md:pt-2`):
  - **Eyebrow:** "USD Halo in Practice" — `text-black/60 text-sm mb-2`.
  - **H2** "Use modes" — `text-black text-5xl md:text-6xl font-medium leading-none mb-6`, inline `letterSpacing: '-0.04em'`.
  - **Paragraph:** "USD Halo powers a wide range of modes for builders, companies and treasuries wanting safe and rewarding stablecoin integrations plus more" — `text-black/60 text-base leading-relaxed max-w-sm`.
- **Right column:** `relative rounded-3xl overflow-hidden min-h-[720px]` with a background `<video>` (`autoPlay muted loop playsInline`, `absolute inset-0 w-full h-full object-cover`):
  - In source the video is vendored locally at `/assets/hf_20260423_183428_ab5e672a-f608-4dcb-b319-f3e040f02e2d.mp4`.
  - Original asset URL (path kept verbatim): `https://d8j0ntlcm91z4.cloudfront.net/user_38XZzbokvIgWjottwiXH07Lwa1P/HF_20260423_183428_AB5E672A-F608-4DCB-B319-F3E040F02E2D.mp4`
  - **Overlay content** `relative z-10 p-10 md:p-12`:
    - **H3** "Commerce" — `text-black text-4xl md:text-5xl font-medium leading-tight mb-5`, inline `letterSpacing: '-0.03em'`.
    - **Paragraph:** "Lift customer retention by offering USD Halo, a trusted dollar-backed stablecoin with strong yields, letting your patrons earn with zero effort on your platform." — `text-black/70 text-base max-w-md mb-8`.
    - **Inline-flex link** "Know more" with a leading circular icon. The `a` is `group inline-flex items-center gap-3 text-black text-base font-medium`; the circle is `w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center group-hover:bg-white transition-colors duration-200` containing `<ArrowRight className="w-4 h-4 text-black" />`. (Icon precedes the "Know more" label.)

## Shared Components

### `PillButton`

Black pill button with a trailing white arrow circle. Accepts `label: string` and an optional `large?: boolean` (default `false`) that bumps the label to `text-lg` on md+ screens (used by the hero "Join us").

```tsx
import { ArrowRight } from 'lucide-react'

interface PillButtonProps {
  label: string
  large?: boolean
}

export default function PillButton({ label, large = false }: PillButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-3 bg-black text-white ${
        large ? 'text-base md:text-lg' : 'text-base'
      } font-medium pl-8 pr-2 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200`}
    >
      <span>{label}</span>
      <span className="bg-white rounded-full p-2">
        <ArrowRight className="w-5 h-5 text-black" />
      </span>
    </button>
  )
}
```

### `Marquee`

Infinite horizontal marquee. The brand list is rendered twice and the track translates `0 → -50%` so the loop is seamless. A scoped `<style>` block injects the `@keyframes` and track rule.

```tsx
import type { CSSProperties } from 'react'

export interface MarqueeBrand {
  name: string
  style: CSSProperties
}

interface MarqueeProps {
  brands: MarqueeBrand[]
  trackClass: string
  keyframesName: string
  durationSeconds: number
  itemClass: string
}

export default function Marquee({
  brands,
  trackClass,
  keyframesName,
  durationSeconds,
  itemClass,
}: MarqueeProps) {
  return (
    <>
      <style>{`
        @keyframes ${keyframesName} {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .${trackClass} {
          display: flex;
          width: max-content;
          animation: ${keyframesName} ${durationSeconds}s linear infinite;
        }
      `}</style>
      <div className={trackClass}>
        {[...brands, ...brands].map((brand, index) => (
          <span
            key={`${brand.name}-${index}`}
            className={itemClass}
            style={brand.style}
          >
            {brand.name}
          </span>
        ))}
      </div>
    </>
  )
}
```

## Animations & Interactions

- **Two CSS keyframe marquees** — 22s for hero brands (`marquee` / `.marquee-track`) and 30s for backers (`backers-marquee` / `.backers-track`), both `linear infinite` and translating `0 → -50%` on a duplicated track for seamless looping.
- All buttons use `transition-colors duration-200` with hover state `hover:bg-gray-800` (or `hover:bg-white` for the white "Know more" circle, which uses `group-hover:bg-white`).
- Nav links transition on hover from `text-gray-700` to `text-black`.
- Videos `autoPlay` `muted` with `playsInline` for mobile compatibility.

## File Structure

```
usd-halo-landing/
├── index.html
├── package.json
├── public/
│   ├── favicon.svg
│   ├── assets/                # vendored hero/use-cases videos + card webp image
│   └── fonts/                 # tt-norms-pro-regular.woff2, tt-norms-pro-semibold.woff2
└── src/
    ├── main.tsx               # createRoot + <StrictMode><App /></StrictMode>
    ├── App.tsx
    ├── index.css              # Tailwind directives + @font-face + base styles
    └── components/
        ├── LogoIcon.tsx
        ├── Navbar.tsx
        ├── HeroSection.tsx
        ├── InfoSection.tsx
        ├── BackedBySection.tsx
        ├── UseCasesSection.tsx
        ├── PillButton.tsx
        └── Marquee.tsx
```

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

## Color Palette

- **Page / section background:** `#F5F5F5` (CSS `#f5f5f5`)
- **Dark cards:** `#2B2644`
- **Foreground / brand:** black, with opacity variants `text-black/70`, `text-black/60`, `text-black/50`, and on dark cards `text-white/60`
- **Nav links:** `text-gray-700` → `text-black` on hover
- **Buttons:** `bg-black` → `hover:bg-gray-800`; arrow circles `bg-white` / `bg-white/80`
