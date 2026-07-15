# Forma — Full-Screen Video-Background Landing Page

## Overview

Build a single-page landing site for a digital product studio called **Forma**. The page is one large rounded card with a looping full-bleed background video, a glassy pill navbar across the top, a bold headline anchored to the bottom-left, and a self-contained contact form card on the bottom-right. The contact form supports multi-select service chips and a fake submit flow that swaps the form for a success state.

## Tech Stack

- **Framework:** React 18 (`^18.3.1`) with TypeScript (`~5.6.2`), built with Vite (`^6.0.3`) via `@vitejs/plugin-react` (`^4.3.4`).
- **Styling:** Tailwind CSS (`^3.4.16`) with `postcss` (`^8.4.49`) and `autoprefixer` (`^10.4.20`).
- **Icons:** `lucide-react` (`^0.468.0`).
- **Fonts:** Inter (weights 300–700) and Instrument Serif (regular + italic), loaded from Google Fonts.
- **Notable techniques:** native HTML `<video>` autoplay loop background, `backdrop-blur-md` glassmorphism navbar, Tailwind-only transitions (no external animation library), responsive viewport-locked card sizing via `calc()` min-heights, controlled form state with a simulated async submit.

## Global Setup

### File Structure

- `src/App.tsx` — the entire page component plus the `SocialBtn` helper.
- `src/main.tsx` — React entry point; renders `<App />` inside `<StrictMode>` via `createRoot`.
- `src/index.css` — Google Fonts `@import`, Tailwind directives, and the global font-family rule.
- `index.html` — Vite HTML shell.
- Standard Vite + Tailwind config (`tailwind.config.js`, `postcss.config.js`, `vite.config.ts`, `tsconfig*.json`).

### `index.html`

- `<title>`: `Forma — We craft bold ideas and ship them as products`
- `<meta name="description">`: `Forma is a digital product studio. We craft bold ideas and ship them as products.`
- Mounts `<div id="root"></div>` and loads `/src/main.tsx` as a module.

### `src/main.tsx`

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

### `tailwind.config.js`

Scan `./index.html` and `./src/**/*.{ts,tsx}`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### Fonts — `src/index.css`

Import the fonts from Google Fonts, add the Tailwind directives, and set Inter globally:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  font-family: 'Inter', sans-serif;
}
```

Instrument Serif (italic, weight 400) is used inline for one accent word in the headline (see Headline below).

## Constants (top of `src/App.tsx`)

- **`VIDEO_URL`** — the background video source. The video is vendored locally and served from the public assets folder:
  ```
  /assets/hf_20260602_150901_c45b90ec-18d7-42ff-90e2-b95d7109e330.mp4
  ```
  > Note: the original upstream source was the CloudFront URL `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260602_150901_c45b90ec-18d7-42ff-90e2-b95d7109e330.mp4`; it has been localized to the `/assets/...` path above. Paths are case-sensitive.

- **`SERVICES`** — service-chip labels, in this exact order:
  `Website`, `Mobile App`, `Web App`, `E-Commerce`, `Visual Identity`, `3D & Motion`, `Digital Marketing`, `Growth & Consulting`, `Other`.

- **`NAV_LINKS`** — navbar links, in order: `Our story`, `Expertise`, `Our work`, `Journal`.

- **`INPUT_CLASS`** — shared input/textarea class string:
  ```
  flex-1 min-w-0 text-sm px-3 py-2.5 rounded-xl border border-gray-200 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition
  ```

```tsx
const VIDEO_URL =
  '/assets/hf_20260602_150901_c45b90ec-18d7-42ff-90e2-b95d7109e330.mp4';

const SERVICES = [
  'Website',
  'Mobile App',
  'Web App',
  'E-Commerce',
  'Visual Identity',
  '3D & Motion',
  'Digital Marketing',
  'Growth & Consulting',
  'Other',
];

const NAV_LINKS = ['Our story', 'Expertise', 'Our work', 'Journal'];
```

## Layout & Sizing

- **Root:** `min-h-screen bg-white p-3 sm:p-4 md:p-6` (white background, responsive padding).
- **Card:** one large rounded container with `relative rounded-2xl sm:rounded-3xl overflow-hidden`. Height ladder:
  `min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-32px)] md:min-h-[calc(100vh-48px)] lg:h-[calc(100vh-48px)]`.
  On desktop (`lg`) it locks to the viewport height; on tablet/mobile it grows to fit content.
- **Background video:** fills the card with `absolute inset-0 w-full h-full object-cover`. The `<video>` element has `autoPlay`, `muted`, `loop`, `playsInline` and `src={VIDEO_URL}`.
- **Content layer:** `relative z-10 flex flex-col` with the same min-height ladder as the card plus `lg:h-full`, padding `p-4 sm:p-6 md:p-8`, and `gap-6`.

```tsx
<div className="min-h-screen bg-white p-3 sm:p-4 md:p-6">
  <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-32px)] md:min-h-[calc(100vh-48px)] lg:h-[calc(100vh-48px)]">
    <video
      className="absolute inset-0 w-full h-full object-cover"
      src={VIDEO_URL}
      autoPlay
      muted
      loop
      playsInline
    />
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-32px)] md:min-h-[calc(100vh-48px)] lg:h-full p-4 sm:p-6 md:p-8 gap-6">
      {/* navbar, spacer, bottom row */}
    </div>
  </div>
</div>
```

## Navbar (top)

- Wrapped in a `<header className="flex">`.
- `<nav>` is a glassy pill: `bg-white/60 backdrop-blur-md rounded-2xl shadow-sm pl-3 sm:pl-4 pr-2 py-2 w-full sm:w-auto flex items-center gap-3 sm:gap-6`.
- **Logo:** a 32×32 inline `<svg>` (`viewBox="0 0 256 256"`, `xmlns="http://www.w3.org/2000/svg"`) wrapped in an `<a href="#" aria-label="Forma home" className="shrink-0">`. Two black-filled paths form a stylized "M":
  - `<path d="M 256 256 L 128 256 L 0 128 L 128 128 Z" fill="black" />`
  - `<path d="M 256 128 L 128 128 L 0 0 L 128 0 Z" fill="black" />`
- **Links:** rendered from `NAV_LINKS` inside a `<div className="hidden sm:flex items-center gap-6">` (hidden on mobile). Each `<a href="#">` uses `text-gray-800 text-sm font-medium hover:opacity-60 transition-opacity whitespace-nowrap`.
- **CTA button:** a black pill on the right, `ml-auto bg-black text-white text-sm font-medium px-4 sm:px-5 py-2 rounded-xl hover:bg-gray-800 transition-colors whitespace-nowrap`, label `Start a project`. `ml-auto` floats it right (notably on mobile, where the links are hidden).

## Spacer

- A `<div className="flex-1 min-h-[2rem]" />` between the navbar and the bottom row, pushing content to the bottom.

## Bottom Row (headline + form)

- Container: `flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6`.

### Headline (left)

- A `<p>` with white text: `text-white text-3xl sm:text-4xl xl:text-5xl font-medium leading-tight drop-shadow-lg lg:max-w-lg xl:max-w-2xl shrink-0`.
- Content, with a `<br />` between the two lines:
  - Line 1: `We craft bold ideas`
  - Line 2: `and ship them as ` followed by the accent word `products`
- The word **`products`** is wrapped in a `<span>` with the inline style:
  ```tsx
  style={{
    fontFamily: "'Instrument Serif', serif",
    fontStyle: 'italic',
    fontWeight: 400,
  }}
  ```
- Note the trailing space before the span via the `{' '}` JSX literal.

```tsx
<p className="text-white text-3xl sm:text-4xl xl:text-5xl font-medium leading-tight drop-shadow-lg lg:max-w-lg xl:max-w-2xl shrink-0">
  We craft bold ideas
  <br />
  and ship them as{' '}
  <span
    style={{
      fontFamily: "'Instrument Serif', serif",
      fontStyle: 'italic',
      fontWeight: 400,
    }}
  >
    products
  </span>
</p>
```

### Contact Form Card (right)

- **Outer wrapper:** `w-full lg:w-[min(480px,45%)] shrink-0`.
- **Card:** `bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden p-4 sm:p-6 flex flex-col gap-4`.

#### 1. Heading

- `<h2>` with text `Say hello! 👋`, class `text-xl sm:text-2xl font-semibold text-black tracking-tight`.

#### 2. Email + socials row (always horizontal)

- Row container: `flex flex-row items-center justify-between gap-3 bg-gray-50 rounded-2xl px-4 py-2.5`.
- **Left** (`min-w-0`): a small grey label `<p className="text-xs text-gray-500">Drop us a line</p>`, then a mailto link to `hello@forma.co` (`href="mailto:hello@forma.co"`) styled `block text-blue-600 font-semibold hover:underline truncate`.
- **Right** (`flex items-center gap-1.5 shrink-0`): four social buttons rendered via the `SocialBtn` helper, using Lucide icons at `size={13}`:
  - `Twitter` icon — label `Twitter` — `bg-gray-100 text-gray-800`
  - `Circle` icon — label `Dribbble` — `bg-pink-100 text-pink-500`
  - `Instagram` icon — label `Instagram` — `bg-orange-100 text-orange-400`
  - `Linkedin` icon — label `LinkedIn` — `bg-blue-100 text-blue-600`

##### `SocialBtn` helper

Each button is 32×32 (`w-8 h-8`), rounded, centered, with a hover-opacity transition. The `className` prop appends the per-icon background/text colors.

```tsx
interface SocialBtnProps {
  icon: LucideIcon;
  label: string;
  className: string;
}

function SocialBtn({ icon: Icon, label, className }: SocialBtnProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`w-8 h-8 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity ${className}`}
    >
      <Icon size={13} />
    </button>
  );
}
```

#### 3. "OR" divider

- A horizontal divider: `<div className="flex items-center gap-3">` containing a left line `<div className="flex-1 h-px bg-gray-200" />`, the word `OR` (`<span className="text-gray-400 font-medium text-sm">`), and a matching right line.

#### 4. Form

The form region conditionally renders: the success state when `sent` is true, otherwise the `<form>`.

- `<form onSubmit={handleSubmit} className="flex flex-col gap-4">`.
- **Label:** `<label htmlFor="contact-name" className="text-sm font-medium text-black">Tell us about your vision</label>`.
- **Name + email inputs**, side by side on `sm:` (`flex flex-col sm:flex-row gap-2`), both using `INPUT_CLASS`:
  - Name: `id="contact-name"`, `type="text"`, placeholder `Full name`, bound to `name`.
  - Email: `type="email"`, placeholder `Email`, bound to `email`.
- **Textarea:** `rows={4}`, placeholder `What are you looking to build or improve...`, bound to `message`, class `` `${INPUT_CLASS} resize-none` ``.
- **Service tags section** (`flex flex-col gap-2`):
  - Label `<p className="text-sm font-medium text-black">I need help with...</p>`.
  - Tags wrap in `<div className="flex flex-wrap gap-1.5">`.
  - Each tag is a `<button type="button">` mapped from `SERVICES`, with `aria-pressed={active}` and `onClick={() => toggleService(service)}`. Base class `text-xs font-medium px-3 py-2 rounded-lg border transition-all`, then:
    - **Active (selected):** `bg-gray-100 text-black border-black`.
    - **Inactive:** `bg-white text-gray-700 border-gray-200 hover:border-gray-400`.
- **Submit button:** `<button type="submit" disabled={sending} className="w-full bg-black text-white text-sm font-semibold py-3 rounded-2xl hover:bg-gray-800 transition-colors disabled:opacity-60">`. Label is `Sending...` while `sending` is true, otherwise `Send my message`.

#### 5. Success state

When `sent` is true, render in place of the form a centered column `flex flex-col items-center justify-center text-center py-6 gap-3`:

- A 48×48 green check pill: `<div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-xl text-green-600">✓</div>`.
- Heading: `<p className="text-base font-semibold text-gray-900">You're all set!</p>`.
- Subtext: `<p className="text-sm text-gray-500">Expect a reply within 24 hours.</p>`.

## State & Behavior

Component state via `useState`:

- `selected: string[]` — toggled service chips (initial `[]`).
- `name`, `email`, `message` — strings (initial `''`).
- `sending`, `sent` — booleans (initial `false`).

```tsx
const toggleService = (service: string) => {
  setSelected((prev) =>
    prev.includes(service)
      ? prev.filter((s) => s !== service)
      : [...prev, service],
  );
};

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setSending(true);
  await new Promise((r) => setTimeout(r, 1000));
  setSending(false);
  setSent(true);
};
```

- **Service chips:** multi-select toggle — clicking adds/removes the service from `selected`.
- **Submit:** prevent default, set `sending = true`, await a 1-second fake delay (`new Promise((r) => setTimeout(r, 1000))`), then set `sending = false` and `sent = true`, which swaps the form for the success state.

## Imports

```tsx
import { useState, type FormEvent } from 'react';
import {
  Twitter,
  Circle,
  Instagram,
  Linkedin,
  type LucideIcon,
} from 'lucide-react';
```

## Animations & Transitions

- All interactive elements rely on Tailwind `transition-*` utilities (`transition-opacity`, `transition-colors`, `transition-all`, `transition`) for hover/focus feedback.
- No external animation library; the only "motion" beyond CSS transitions is the looping background video and the `backdrop-blur-md` glass effect on the navbar.

## Color Palette

- **Page background:** white (`bg-white`).
- **Navbar glass:** `bg-white/60` with `backdrop-blur-md`.
- **Primary action / dark surfaces:** black (`bg-black`), hover `bg-gray-800`; CTA and submit text white.
- **Headline text:** white with `drop-shadow-lg`.
- **Form card:** white with `shadow-2xl`; muted row background `bg-gray-50`.
- **Links / mailto / LinkedIn:** blue (`text-blue-600`, `bg-blue-100`).
- **Social accents:** grey (`bg-gray-100` / `text-gray-800`), pink (`bg-pink-100` / `text-pink-500`), orange (`bg-orange-100` / `text-orange-400`), blue (`bg-blue-100` / `text-blue-600`).
- **Success state:** green pill (`bg-green-50`, `text-green-600`), heading `text-gray-900`, subtext `text-gray-500`.
- **Borders / dividers:** `border-gray-200`, `bg-gray-200`; active chip border `border-black`.
