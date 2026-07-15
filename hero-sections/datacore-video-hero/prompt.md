# Datacore — Cinematic Video Hero Section

## Overview

Build a responsive, full-screen hero section for a hotel/stay-booking web application. A full-bleed, opaque HTML5 video plays in the background while a transparent navbar and centered hero content (tagline pill, serif headline, subtext, and two CTA buttons) layer on top.

## Tech Stack

- **Framework:** React with Tailwind CSS.
- **Icons:** `ChevronDown`, `Menu`, `X`.
- **Fonts:** Manrope (UI/nav), Cabin (buttons/tags), Instrument Serif (headlines), Inter (body text).
- **Notable techniques:** Full-screen autoplaying muted looping video background, glassmorphism tagline pill.

## Design System

### Fonts

Load and use the following font families:

- **Manrope** — UI / navigation.
- **Cabin** — buttons / tags.
- **Instrument Serif** — headlines.
- **Inter** — body text.

### Colors

- **Primary color:** purple `#7B39FC`.
- **Secondary / dark color:** dark purple `#2B2344`.

## Layout — App Shell

- Root `<main>` uses `relative min-h-screen overflow-hidden bg-dark`.
- A full-screen opaque video background sits behind everything (no overlay — keep it opaque):

  ```tsx
  <video
    className="absolute inset-0 z-0 h-full w-full object-cover"
    src={VIDEO_URL}
    autoPlay
    loop
    muted
    playsInline
    preload="auto"
    aria-hidden="true"
    tabIndex={-1}
  />
  ```

  - The video must autoplay, loop, be muted, and play inline, covering the viewport (`min-h-screen` on the parent, `object-cover` on the video) with no overlay (keep it opaque).
  - **Video URL:** `https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4`
- Render order inside `<main>`: `<video>`, then `<Navbar />`, then `<Hero />`.

## Navbar (`src/components/Navbar.tsx`)

Top overlay bar that layers above the video.

- **Container:** `<header>` with `relative z-20 w-full bg-transparent`.
- **Inner row:** `flex w-full items-center px-6 py-[16px] lg:px-[120px]` — full width, transparent, padding `px-6` (mobile) up to `lg:px-[120px]` (desktop), and `py-[16px]`.

### Logo (left)

Rendered by `src/components/Logo.tsx`.

- Wrapping anchor: `<a href="/">` with `flex items-center gap-2.5 transition-opacity hover:opacity-80` and `aria-label="Datacore home"`.
- Inline SVG mark (the "Future" logo shape), `width="28" height="24" viewBox="0 0 28 24"`, three `<path>` elements all `fill="white"`:

  ```tsx
  <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M1.04356 6.35771L13.6437 0.666504L26.2438 6.35771L13.6437 12.0489L1.04356 6.35771Z"
      fill="white"
    />
    <path d="M1.04356 9.80249L12.0937 14.7933V23.3335L1.04356 18.3427V9.80249Z" fill="white" />
    <path d="M26.2438 9.80249L15.1937 14.7933V23.3335L26.2438 18.3427V9.80249Z" fill="white" />
  </svg>
  ```

- Wordmark next to the icon: `Datacore`, styled `font-manrope text-[17px] font-bold tracking-tight text-white`.

### Navigation Links (center-left, desktop only)

- Nav element: `ml-12 hidden items-center gap-8 lg:flex`, `aria-label="Primary"`.
- Items (in order), driven by a `NAV_ITEMS` array `{ label, hasChevron }`:
  - `Home`
  - `Services` (with a trailing `ChevronDown` icon, `size={16}`, `strokeWidth={2}`)
  - `Reviews`
  - `Contact us`
- Each link: `<a href="#">` with `flex items-center gap-1 font-manrope text-[14px] font-medium text-white transition-opacity hover:opacity-80` — Manrope, medium weight, 14px, white, hover `opacity-80`.

### Action Buttons (right, desktop only)

- Container: `ml-auto hidden items-center gap-3 lg:flex`.
- **Sign In:** white background, thin gray border (`#d4d4d4`), rounded `8px`, black text (`#171717`), Manrope semibold 14px:
  `rounded-[8px] border border-[#d4d4d4] bg-white px-4 py-2 font-manrope text-[14px] font-semibold text-[#171717]`.
- **Get Started:** primary purple background (`#7b39fc`), rounded `8px`, white text (`#fafafa`), Manrope semibold 14px, subtle shadow:
  `rounded-[8px] bg-primary px-4 py-2 font-manrope text-[14px] font-semibold text-[#fafafa] shadow-[0_4px_16px_rgba(123,57,252,0.4)]`.

### Hamburger + Mobile Overlay Menu (mobile only)

- On mobile, the desktop links and action buttons are hidden and a white `Menu` icon (hamburger) is shown instead.
- Trigger button (`ml-auto text-white transition-opacity hover:opacity-80 lg:hidden`, `aria-label="Open menu"`) renders the `Menu` icon at `size={26}` and sets `menuOpen` state to `true`.
- State: `const [menuOpen, setMenuOpen] = useState(false)`.
- When `menuOpen`, render a full-screen black overlay: `fixed inset-0 z-50 flex flex-col bg-black lg:hidden`.
  - Top bar: `flex items-center justify-between px-6 py-[16px]` containing the `Logo` and a close button (`X` icon `size={26}`, `aria-label="Close menu"`) that sets `menuOpen` to `false`.
  - Nav: `mt-10 flex flex-col gap-2 px-6`, `aria-label="Mobile"`. Each item links to `#`, closes the menu on click, and uses `flex items-center justify-between border-b border-white/10 py-4 font-manrope text-2xl font-medium text-white transition-opacity hover:opacity-80`. `Services` shows a `ChevronDown` at `size={22}`.
  - Bottom CTAs: `mt-auto flex flex-col gap-3 px-6 pb-10`, containing full-width **Sign In** and **Get Started** buttons:
    - Sign In: `w-full rounded-[8px] border border-[#d4d4d4] bg-white py-3.5 font-manrope text-[14px] font-semibold text-[#171717]`.
    - Get Started: `w-full rounded-[8px] bg-primary py-3.5 font-manrope text-[14px] font-semibold text-[#fafafa] shadow-[0_4px_16px_rgba(123,57,252,0.4)]`.

## Hero (`src/components/Hero.tsx`)

- **Section container:** `relative z-10 mt-32 flex flex-col items-center px-6 pb-28 text-center` — centered horizontally, top margin `mt-32`, `z-10` above the video.

### Tagline Pill (glassmorphism)

- Wrapper: `flex h-[38px] items-center gap-2.5 rounded-[10px] border border-[rgba(164,132,215,0.5)] bg-[rgba(85,80,110,0.4)] py-1 pl-1.5 pr-4 backdrop-blur-md`.
  - Glassmorphism: background `rgba(85,80,110,0.4)`, `backdrop-blur-md`, border `rgba(164,132,215,0.5)`, rounded `10px`, height `38px`.
- Inner badge: `rounded-[6px] bg-primary px-2.5 py-1 font-cabin text-[13px] font-medium leading-none text-white` reading `New` (primary purple background, rounded 6px).
- Following text: `font-cabin text-[14px] font-medium text-white` reading `Say Hello to Datacore v3.2`.

### Headline

- `<h1>`: `mt-7 max-w-[1024px] font-instrument text-5xl/[1.1] text-white md:text-7xl/[1.1] lg:text-[96px]/[1.1]`.
- Instrument Serif, white, line-height `1.1`, size scales `5xl` (mobile) → `md:text-7xl` → `lg:text-[96px]`.
- Copy with a responsive `<br>` and an italicized "and" with horizontal spacing:

  ```tsx
  Book your perfect stay
  <br className="hidden sm:block" /> instantly <em className="mx-2 italic lg:mx-3">and</em> hassle-free
  ```

### Subtext

- `<p>`: `mt-6 max-w-[662px] font-inter text-[18px] font-normal leading-relaxed text-white/70`.
- Inter, normal weight, 18px, white at 70% opacity (`text-white/70`), max width `662px`.
- Copy: `Discover handpicked hotels, resorts, and stays across your favorite destinations. Enjoy exclusive deals, fast booking, and 24/7 support.`

### Call-to-Action Buttons (row)

- Container: `mt-10 flex flex-col gap-4 sm:flex-row` — stacks on mobile, row on `sm` and up.
- **Button 1 — `Book a Free Demo`:** primary purple (`#7b39fc`), rounded 10px, Cabin medium 16px, white:
  `rounded-[10px] bg-primary px-7 py-3.5 font-cabin text-[16px] font-medium text-white shadow-[0_8px_28px_rgba(123,57,252,0.45)] transition-colors`.
- **Button 2 — `Get Started Now`:** dark purple (`#2b2344`), rounded 10px, Cabin medium 16px, off-white `#f6f7f9`:
  `rounded-[10px] bg-dark px-7 py-3.5 font-cabin text-[16px] font-medium text-[#f6f7f9] shadow-[0_8px_28px_rgba(20,12,40,0.45)] transition-colors`.
- Hover effects slightly lighten each button's background.

## Color Palette

| Token | Hex / value | Usage |
| --- | --- | --- |
| `primary` | `#7b39fc` | Primary purple — badges, primary buttons, accents |
| `dark` | `#2b2344` | Dark purple — app/page background, secondary button |
| (literal) | `#171717` | Sign In button text |
| (literal) | `#fafafa` | Get Started button text |
| (literal) | `#d4d4d4` | Sign In button border |
| (literal) | `#f6f7f9` | "Get Started Now" off-white text |
| (literal) | `rgba(85,80,110,0.4)` | Tagline pill glass background |
| (literal) | `rgba(164,132,215,0.5)` | Tagline pill border |
| (literal) | `rgba(123,57,252,0.4)` / `(...,0.45)` | Purple button shadows |
| (literal) | `rgba(20,12,40,0.45)` | Dark button shadow |
| (literal) | `text-white/70` | Subtext color |

## File Structure

```
datacore-video-hero/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── public/
│   └── assets/
│       └── hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    └── components/
        ├── Navbar.tsx
        ├── Logo.tsx
        └── Hero.tsx
```
