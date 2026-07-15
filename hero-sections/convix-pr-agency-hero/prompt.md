# Convix Software — Shaping Agencies of Tomorrow (PR Agency Hero)

## Overview

Build a fully responsive, full-viewport hero section for a PR-agency SaaS called "Convix Software". The hero clips a looping muted background video, floating pill navbar, centered headline/CTA, and a partial dashboard preview (three analytics cards) together inside one rounded container, so the dashboard cards bleed off the bottom edge.

## Fonts (`src/styles/fonts.css`)

Import from Google Fonts:

- Inter weights 400, 500, 600, 700
- Instrument Serif regular + italic

## Layout (`src/app/App.tsx`)

- **Outer wrapper (`<main>`):** `min-h-screen w-full bg-[#ededed] p-3 sm:p-4`, with inline style `fontFamily: "'Inter', sans-serif"`.
- **Hero container (`<section>`, clips everything inside):** `relative h-[calc(100vh-24px)] w-full overflow-hidden rounded-2xl bg-[#d9d9d9] sm:h-[calc(100vh-32px)] sm:rounded-3xl`.

### Background video

- **Element:** `<video>` with classes `pointer-events-none absolute inset-0 h-full w-full object-cover`.
- **Source:** the demo uses a locally vendored asset at `/assets/hf_20260424_064411_9e9d7f84-9277-41f4-ab10-59172d89e6be.mp4`. (The original design URL was `https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260424_064411_9e9d7f84-9277-41f4-ab10-59172d89e6be.mp4` — host lowercased per convention; the path is the same filename, now served locally. Note: only the scheme+host were lowercased; the original prompt presented the whole URL in caps.)
- **Poster fallback:** locally vendored `/assets/unsplash-photo-1557683316-973673baf926.jpg` (original design poster: `https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&q=60`).
- **Attributes:** `autoPlay`, `loop`, `muted`, `playsInline`, `preload="auto"`, `disableRemotePlayback`, plus legacy inline-playback attributes for older iOS / QQ & WeChat (X5) webviews: `webkit-playsinline="true"`, `x5-playsinline="true"`.

```tsx
const VIDEO_SRC =
  '/assets/hf_20260424_064411_9e9d7f84-9277-41f4-ab10-59172d89e6be.mp4'
const POSTER_SRC = '/assets/unsplash-photo-1557683316-973673baf926.jpg'

/** Legacy inline-playback attributes for older iOS / QQ & WeChat (X5) webviews. */
const legacyPlaysInlineAttrs = {
  'webkit-playsinline': 'true',
  'x5-playsinline': 'true',
}
```

- **Overlay above the video:** `<div className="absolute inset-0 bg-white/10" aria-hidden="true" />`.
- **Foreground content wrapper:** `relative z-10`, containing (in order) `<Navbar />`, the hero content block, then `<DashboardPreview />`.

## Navbar (`src/app/components/Navbar.tsx`)

Floating pill navbar, responsive with a hamburger menu. Uses `useState` for the open/close toggle.

- **Wrapper (`<header>`):** `flex justify-center px-3 pt-4 sm:px-4 sm:pt-6`.
- **Pill (`<nav>`):** `relative flex w-full max-w-[760px] items-center rounded-full border border-neutral-200 bg-white py-2 pl-2 pr-2 shadow-sm`.

### Logo

- Left, `shrink-0 pl-1.5`, wrapped in `<a href="#" aria-label="Convix Software home">`.
- `FlowerLogo` SVG: orange `#ef4d23` 8-petal flower — 8 circles at radius 10 around center `(16,16)` plus a center circle, all `r=3.5`, `viewBox="0 0 32 32"`, rendered with `h-7 w-7 sm:h-8 sm:w-8`.

```tsx
const ORANGE = '#ef4d23'
const NAV_LINKS = ['Home', 'Features', 'About', 'Pages'] as const

/** 8-petal flower: 8 circles at radius 10 around (16,16) plus a center circle, all r=3.5. */
function FlowerLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role="img" aria-label="Convix Software logo">
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * Math.PI) / 4
        return (
          <circle
            key={i}
            cx={16 + 10 * Math.cos(angle)}
            cy={16 + 10 * Math.sin(angle)}
            r={3.5}
            fill={ORANGE}
          />
        )
      })}
      <circle cx={16} cy={16} r={3.5} fill={ORANGE} />
    </svg>
  )
}
```

### Desktop links

- Container: `hidden items-center gap-6 pl-5 text-[14px] md:flex`.
- Items from `NAV_LINKS = ['Home', 'Features', 'About', 'Pages']`. Each is an `<a href="#">` with `inline-flex items-center gap-1.5 font-medium text-neutral-900 transition-colors hover:text-neutral-500`.
- **"Home"** is preceded by a `1.5`-unit black dot: `h-1.5 w-1.5 rounded-full bg-black`.
- **"Features"** and **"About"** render plainly.
- **"Pages"** is colored orange (`style={{ color: ORANGE }}`) and is followed by a `ChevronDown` icon at `h-3.5 w-3.5` (`strokeWidth={2}`).

### Right cluster

- Container: `ml-auto flex items-center gap-1.5 sm:gap-2`.
- **Cart button (hidden on mobile):** `hidden p-2 text-neutral-700 transition-colors hover:text-neutral-900 md:inline-flex`, holding a `ShoppingCart` icon `h-5 w-5` (`strokeWidth={1.75}`), `aria-label="Cart"`.
- **Early-access CTA button:** `inline-flex items-center gap-2 rounded-full bg-[#ef4d23] py-1.5 pl-4 pr-1.5 text-[13px] font-medium text-white transition-opacity hover:opacity-90 sm:text-[14px]`.
  - Label `Get early access` on desktop (`hidden sm:inline`), `Early access` on mobile (`sm:hidden`).
  - Trailing inner circle: `flex h-6 w-6 items-center justify-center rounded-full bg-white/20` holding a `ChevronRight` icon `h-4 w-4` (`strokeWidth={2}`).
- **Hamburger button (mobile only, `md:hidden`):** `inline-flex p-2 text-neutral-800`, `aria-label="Toggle menu"`, `aria-expanded={open}`, `onClick={() => setOpen((value) => !value)}`, holding a `Menu` icon `h-5 w-5` (`strokeWidth={2}`).

### Mobile dropdown panel (when `open`)

- `absolute left-2 right-2 top-full z-20 mt-2 rounded-2xl border border-neutral-200 bg-white p-3 shadow-lg md:hidden`.
- Lists the same `NAV_LINKS` vertically, each as `<a href="#">` with `flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-[14px] font-medium text-neutral-900 hover:bg-neutral-50`, `"Pages"` colored orange, and `onClick={() => setOpen(false)}`.

## Hero Content (centered, in `App.tsx`)

- **Container:** `flex flex-col items-center px-4 pb-8 pt-10 text-center sm:pb-12 sm:pt-16`.
- **Badge:** `inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[13px] shadow-sm` — an orange dot (`h-2 w-2 rounded-full bg-[#ef4d23]`, `aria-hidden`) followed by the text `Convix Software`.
- **Headline `<h1>`:** classes `mt-5 max-w-4xl text-neutral-900 sm:mt-6` with inline style:
  - `fontSize: 'clamp(36px, 8vw, 72px)'`
  - `lineHeight: 1.05`
  - `fontWeight: 500`
  - `letterSpacing: '-0.02em'`
  - Content: `Shaping ` + an italic Instrument Serif `<span>` reading `Agencies` (`style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400 }}`) + `<br />` + `of tomorrow`.
- **Subtitle `<p>`:** `mt-4 px-2 text-neutral-700 sm:mt-6` with inline `fontSize: 'clamp(13px, 3.5vw, 16px)'`; text: `The All-In-One Software Powering the Future of PR Agencies`.
- **CTA button:** `mt-6 inline-flex items-center gap-3 rounded-full bg-[#0b0f1a] py-2 pl-6 pr-2 text-[14px] font-medium text-white sm:mt-8 sm:py-2.5 sm:pl-7`; label `Get Started` + trailing inner circle `flex h-6 w-6 items-center justify-center rounded-full bg-white/15 sm:h-7 sm:w-7` holding a `ChevronRight` icon `h-4 w-4` (`strokeWidth={2}`).

## Dashboard Preview (`src/app/components/DashboardPreview.tsx`)

- **Outer container:** `px-3 sm:px-4`.
- **Tray:** `mx-auto w-full max-w-[880px] rounded-3xl bg-[#f5f2ee] p-4 sm:p-6`.
- **Grid:** `grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3`, holding `ClicksCard`, `TargetsFormCard`, `VideoStartsCard` in order.

### Shared subcomponents

- **`CardHeader({ title, period })`:** `flex items-center justify-between text-[13px]` — orange title (`font-medium text-[#ef4d23]`) + neutral period (`text-neutral-500`).
- **`TogglePill({ active, inactive })`:** `flex rounded-full bg-neutral-100 p-1 text-[12px] font-medium`. The active button: `flex-1 rounded-full bg-white px-3 py-1.5 text-neutral-900 shadow`; the inactive button: `flex-1 rounded-full px-3 py-1.5 text-neutral-500`.
- **`Dropdown({ label, value })`:** label `mb-1 block text-[12px] text-neutral-700`; button `flex w-full items-center justify-between rounded-lg border border-neutral-200 px-3 py-2 text-left text-[13px] text-neutral-900` with a trailing `ChevronDown` icon `h-4 w-4 text-neutral-500` (`strokeWidth={2}`).
- **`TargetInput({ label, defaultValue })`:** Label `mb-1 block text-[12px] text-neutral-700`; field wrapper `flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2` with a `#` prefix (`text-[13px] text-neutral-400`) and an `<input type="text">` `w-full bg-transparent text-[13px] text-neutral-900 outline-none`.

### Card 1 — Clicks (`ClicksCard`)

- Card: `flex flex-col rounded-2xl bg-white p-5`.
- Header: title `Clicks`, period `This Month`.
- Big number row (`mt-3 flex items-center gap-2`): `6,896` (`text-[28px] font-semibold leading-none`) + red pill `inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-medium text-red-600` containing a `TrendingDown` icon (`h-3 w-3`, `strokeWidth={2}`) and text `-3,382 (33%)`.
- Caption: `mt-1 text-[11px] text-neutral-500` reading `Compared to yesterday`.
- Centered label: `mt-4 text-center text-[12px] text-neutral-600` reading `Month Target achieved`.
- Gauge (`mt-1`): `<Gauge value={92} color={ORANGE} showLabels min="389K" max="425K" />`.
- Footer toggle (`mt-auto pt-4`): `<TogglePill active="Impressions" inactive="Clicks" />`.

### Card 2 — Targets Form (`TargetsFormCard`)

- Card: `flex flex-col gap-3 rounded-2xl bg-white p-5`.
- Two dropdown groups:
  - `Show figures for` → `This month`
  - `Compare period by` → `Month-to-date (MTD)`
- Two target-input groups (with `#` prefix):
  - `Ste targets (This month)` → `10`
  - `Ste targets (This year)` → `100`
- Footer (`mt-auto flex items-center gap-4 pt-1`):
  - Orange `Save` button: `rounded-lg bg-[#ef4d23] px-5 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90`.
  - Underlined `Cancel` button: `text-[13px] text-neutral-700 underline underline-offset-2`.
  - Close button pushed right (`ml-auto p-1 text-neutral-500 hover:text-neutral-800`, `aria-label="Close"`) holding an `X` icon `h-4 w-4` (`strokeWidth={2}`).

### Card 3 — Video Starts (`VideoStartsCard`)

- Card: `flex flex-col rounded-2xl bg-white p-5`.
- Header: title `Video Starts`, period `today`.
- Big number row (`mt-3 flex items-center gap-2`): `0` (`text-[28px] font-semibold leading-none`) + neutral pill `inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-600` containing a `TrendingUp` icon (`h-3 w-3`, `strokeWidth={2}`) and text `0`.
- Caption: `mt-1 text-[11px] text-neutral-500` reading `Compared to yesterday`.
- Gauge (`mt-5`): `<Gauge value={68} color="#9ca3af" />` (no end labels).
- Footer toggle (`mt-auto pt-4`): `<TogglePill active="Video Clicks" inactive="Video Starts" />`.

## Gauge Component (`src/app/components/Gauge.tsx`)

Reusable semi-circular tick gauge.

- **Props:** `value: number`, `color?: string` (default `'#ef4d23'`), `showLabels?: boolean` (default `false`), `min?: string`, `max?: string`.
- **Constants:** `TICKS = 40`, `CENTER_X = 100`, `CENTER_Y = 100`, `OUTER_RADIUS = 80`, `INNER_RADIUS = OUTER_RADIUS - 10` (= 70).
- **Wrapper:** `mx-auto w-full` with inline `style={{ maxWidth: 260 }}`.
- **SVG:** `viewBox="0 0 200 120"`, class `block w-full`, `role="img"`, `aria-label={`Gauge at ${value}%`}`.
- **Ticks:** 40 `<line>` marks spanning a 180° arc — angle `Math.PI + (i / (TICKS - 1)) * Math.PI` (i.e. start at π, sweep to 2π). Active tick count = `Math.round((value / 100) * TICKS)`. Each line goes from `INNER_RADIUS` to `OUTER_RADIUS` around center `(100,100)`, `strokeWidth={2.5}`, `strokeLinecap="round"`. Active ticks (`i < activeCount`) use `color`; inactive use `#d4d4d8`.
- **Center text:** `<text x={100} y={105} textAnchor="middle" fontSize={22} fontWeight={600}>{value}%</text>` (`fontSize` 22, `fontWeight` 600).
- **Labels (if `showLabels`):** a small flex row below the SVG: `flex justify-between text-[11px] text-neutral-500` showing `min` (left) and `max` (right).

```tsx
const TICKS = 40
const CENTER_X = 100
const CENTER_Y = 100
const OUTER_RADIUS = 80
const INNER_RADIUS = OUTER_RADIUS - 10

interface GaugeProps {
  value: number
  color?: string
  showLabels?: boolean
  min?: string
  max?: string
}

export default function Gauge({ value, color = '#ef4d23', showLabels = false, min, max }: GaugeProps) {
  const activeCount = Math.round((value / 100) * TICKS)

  return (
    <div className="mx-auto w-full" style={{ maxWidth: 260 }}>
      <svg viewBox="0 0 200 120" className="block w-full" role="img" aria-label={`Gauge at ${value}%`}>
        {Array.from({ length: TICKS }, (_, i) => {
          const angle = Math.PI + (i / (TICKS - 1)) * Math.PI
          const cos = Math.cos(angle)
          const sin = Math.sin(angle)
          return (
            <line
              key={i}
              x1={CENTER_X + INNER_RADIUS * cos}
              y1={CENTER_Y + INNER_RADIUS * sin}
              x2={CENTER_X + OUTER_RADIUS * cos}
              y2={CENTER_Y + OUTER_RADIUS * sin}
              stroke={i < activeCount ? color : '#d4d4d8'}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          )
        })}
        <text x={100} y={105} textAnchor="middle" fontSize={22} fontWeight={600}>
          {value}%
        </text>
      </svg>
      {showLabels && (
        <div className="flex justify-between text-[11px] text-neutral-500">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  )
}
```

## Color Palette

- **Primary orange:** `#ef4d23`
- **Dark CTA:** `#0b0f1a`
- **Page background:** `#ededed`
- **Hero background:** `#d9d9d9`
- **Dashboard tray:** `#f5f2ee`
- **Video Starts gauge color:** `#9ca3af`
- **Inactive gauge ticks:** `#d4d4d8`

## Icons (lucide-react)

`ChevronDown`, `ChevronRight`, `ShoppingCart`, `Menu`, `TrendingDown`, `TrendingUp`, `X`.

## File Structure

```
src/
  app/
    App.tsx
    components/
      Navbar.tsx
      DashboardPreview.tsx
      Gauge.tsx
  styles/
    fonts.css
```

## Behavior & Responsiveness

- **No custom animations** — only the native looping muted background video.
- The **entire hero** (video + content + dashboard) is clipped together by the rounded container, so the dashboard cards bleed off the bottom edge.
- **Fully responsive:** the navbar collapses to a hamburger menu under `md`, the headline and CTA scale via `clamp()`, and the dashboard grid steps from 1 → 2 → 3 columns (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`).
