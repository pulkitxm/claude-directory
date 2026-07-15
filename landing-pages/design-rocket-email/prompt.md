# Design Rocket Certificates — Email-Style Marketing Page

## Overview

Build a single-page React + TypeScript app that renders an email-style marketing page for the "Design Rocket Certificates" AI leadership course, built in collaboration with Microsoft. The page is laid out as a narrow 640px email container on a dark background, with a video hero, intro copy, two content sections (each pairing a looping video with copy and a CTA), a lime call-to-action card, and a footer with social icons and legal links.

## Tech Stack

- **Framework:** React 18 (`react` `^18.3.1`, `react-dom` `^18.3.1`) with `StrictMode`.
- **Build tool:** Vite `^6.3.5` with `@vitejs/plugin-react` `^4.5.0`.
- **Language:** TypeScript `~5.8.3` (`@types/react` `^18.3.20`, `@types/react-dom` `^18.3.7`).
- **Styling:** Tailwind CSS `^3.4.17` with `postcss` `^8.5.4` and `autoprefixer` `^10.4.21`.
- **Icons:** `lucide-react` `^0.515.0`. No other UI libraries.
- **Fonts:** Instrument Serif (display headings) and Inter (body / UI), loaded from Google Fonts.
- **Notable techniques:** auto-playing muted looped `<video>` backgrounds, CSS `linear-gradient` overlay, inline `style` for the display font and hero `aspect-ratio`, hover transitions on buttons and video cards.

## Global Setup

### `index.html`

- **Title:** `Newsletter Design Build Out`
- `lang="en"`, `charset="UTF-8"`, viewport `width=device-width, initial-scale=1.0`.
- Preconnect to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (the latter with `crossorigin`).
- Load Google Fonts — Instrument Serif (ital `0;1`) and Inter (weights `400;500;600;700`) with `display=swap`:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

- Root mount point `<div id="root"></div>` and module script `<script type="module" src="/src/main.tsx"></script>`.

### `src/main.tsx`

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-display: 'Instrument Serif', serif;
  --font-body: 'Inter', sans-serif;
}

body {
  font-family: var(--font-body);
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
}
```

Headings use the inline style `style={{ fontFamily: "'Instrument Serif', serif" }}`. Body copy uses Inter (the default). In `App.tsx` define a shared constant:

```tsx
const displayFont: CSSProperties = { fontFamily: "'Instrument Serif', serif" }
```

## Assets (Videos)

Three looping videos are served from the local `public/assets/` directory (paths are lowercase). Define them as a constant in `App.tsx`:

```tsx
const VIDEOS = {
  hero: '/assets/hf_20260419_064822_f120e48a-d545-45dd-a02d-facb07829888.mp4',
  transform:
    '/assets/hf_20260419_065931_e3ca7b53-d32e-4ad5-81de-dc9d6fcfda6d.mp4',
  roadmap:
    '/assets/hf_20260417_110451_9f82b157-dc92-4a9f-a341-c25594ec20e1.mp4',
} as const
```

> Note: the original brief referenced these as CloudFront URLs under `https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/...`. They have since been vendored locally; the source uses the lowercase `/assets/` paths above.

## Page Shell

- **Outer page:** `min-h-screen bg-[#050505] py-10 px-4 font-sans`
- **Email container:** `max-w-[640px] mx-auto shadow-2xl overflow-hidden ring-1 ring-white/5`
- **Content card (`<main>`):** `bg-[#111111] text-[#F2F2F2]` — holds the Hero, Intro, Transform, Roadmap, and Lime CTA sections.
- The `<Footer>` sits inside the email container, below the `<main>` card.

Top-level structure:

```tsx
export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] py-10 px-4 font-sans">
      <div className="max-w-[640px] mx-auto shadow-2xl overflow-hidden ring-1 ring-white/5">
        <main className="bg-[#111111] text-[#F2F2F2]">
          <Hero />
          <IntroSection />
          <TransformSection />
          <RoadmapSection />
          <LimeCtaSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
```

## Shared Components

### `Step` — numbered row

- **Props:** `{ number: number; children: ReactNode }`
- **Wrapper:** `flex items-start gap-5 mb-6 last:mb-0`
- **Number badge:** `flex-shrink-0 w-7 h-7 rounded-md bg-[#DCFF00] flex items-center justify-center text-[#0A0A0A] font-bold text-xs mt-1`, rendering `{number}.` (the number followed by a period).
- **Text:** `<p>` with `text-[17px] leading-[1.55] text-[#E8E8E8]` rendering `{children}`.

### `Divider`

- `<div className="py-8 flex justify-center">` containing `<div className="h-px w-24 bg-white/20" />`.

### `PrimaryButton` — lime CTA with arrow

- **Props:** `{ label: string }`; renders an `<a href="#">`.
- **Classes:** `inline-flex items-center gap-3 bg-[#DCFF00] text-[#0A0A0A] font-bold rounded-lg px-6 py-3 hover:bg-[#c9ea00] hover:-translate-y-0.5 transition-all duration-200`
- Contains the `{label}` followed by a Lucide `ArrowRight` icon: `<ArrowRight className="w-5 h-5" strokeWidth={2.5} />`.

### `SolidButton` — white pill

- **Props:** `{ label: string }`; renders an `<a href="#">`.
- **Classes:** `inline-block bg-white text-[#0A0A0A] font-bold rounded-lg px-8 py-3 hover:bg-[#E8E8E8] hover:-translate-y-0.5 transition-all duration-200`

### `VideoCard` — rounded hover-zoom video

- **Props:** `{ src: string }`
- **Outer:** `px-[42px] pb-10`
- **Anchor:** `<a href="#" className="block overflow-hidden rounded-[14px] group">`
- **Video:** `autoPlay muted loop playsInline` with `className="w-full h-[370px] object-cover rounded-[14px] transition-transform duration-700 group-hover:scale-[1.03]"`.

## Section 1 — Hero (Video Background)

- **Wrapper `<section>`:** `relative w-full overflow-hidden` with inline `style={{ aspectRatio: '640 / 820' }}`.
- **Background video** (`VIDEOS.hero`): `autoPlay muted loop playsInline` with `className="absolute inset-0 w-full h-full object-cover"`.
- **Overlay gradient** (`absolute inset-0`) via inline style:

```css
linear-gradient(to bottom, rgba(17,17,17,0) 45%, rgba(17,17,17,0.45) 68%, rgba(17,17,17,0.9) 88%, rgba(17,17,17,1) 100%)
```

- **Foreground stack:** `relative z-10 h-full flex flex-col items-center text-center px-6 pt-12 pb-10`.
- **Top brand block** (white):
  - `Design Rocket` — Instrument Serif, `text-[28px] leading-[0.95] tracking-tight`.
  - `CERTIFICATES` — `text-[13px] tracking-[0.22em] font-medium mt-1`.
- **Spacer + eyebrow:** a `<p>` with `mt-40 text-white text-[13px] tracking-[0.28em] font-semibold` reading `NOW AVAILABLE`.
- **Flex spacer:** `<div className="flex-1" />` to push the headline to the bottom.
- **Headline** `<h1>` (Instrument Serif): `text-white text-[58px] leading-[1.02] tracking-tight max-w-[560px]`, with a `<br />`:

  > Learn to lead AI
  > and unlock new value

- **CTA pill** — note this uses `#D8F90A` (the lime variant), not the card lime `#DCFF00`:
  - `<a href="#">` with `mt-10 inline-flex items-center gap-3 bg-[#D8F90A] text-[#1E1E1E] font-semibold rounded-full px-8 py-4 hover:bg-[#c9ea00] hover:-translate-y-0.5 transition-all duration-200`.
  - Label `Enroll Now` followed by `<ArrowRight className="w-5 h-5" strokeWidth={2.5} />`.

## Section 2 — Intro Copy + CTA

- Container `px-[78px] pb-8 pt-4` with a centered paragraph `text-center text-[18px] leading-[1.55]`:

  > Built in collaboration with Microsoft, this certificate course gives you the toolkit to lead AI transformation across your organization. Learn to spot opportunities, launch AI pilots, and scale adoption grounded in responsible practices and proven frameworks.

- `<div className="flex justify-center pb-14">` containing `<PrimaryButton label="Get Started" />`.
- `<Divider />`.

## Section 3 — "Transform how you lead with AI"

- **Heading** container `px-9 pb-8`; `<h2>` (Instrument Serif) `text-center text-[46px] leading-[1.05] tracking-tight`:

  > Transform how you lead with AI

- `<VideoCard src={VIDEOS.transform} />`.
- **Steps list:** container `px-[76px] pb-10`, inner `max-w-[489px] mx-auto`, mapping the `STEPS` array into four `<Step>` components (`number={i + 1}`):

```tsx
const STEPS = [
  'Learn how to spot AI opportunities that boost productivity across roles and deliver visible results.',
  'Build structures that support your team so AI efficiencies multiply across the organization.',
  'Gain the skills to drive culture change like securing buy-in and reducing resistance.',
  'Get frameworks to deliver AI pilots that prove impact fast and build credibility with measurable results.',
]
```

- `<div className="flex justify-center pb-14">` containing `<SolidButton label="Enroll Now" />`.
- `<Divider />`.

## Section 4 — "Build your AI transformation roadmap"

- **Heading** container `pb-7 px-9`; `<h2>` (Instrument Serif) `text-center text-[46px] leading-[1.05] tracking-tight` with a `<br />`:

  > Build your AI
  > transformation roadmap

- `<VideoCard src={VIDEOS.roadmap} />` (same classes as Section 3).
- **Paragraph** container `px-[78px] pb-8`, centered `text-center text-[18px] leading-[1.55]`:

  > You'll finish this hands-on course with a personal AI Transformation Plan: your playbook for pilot proposals, data strategy and governance. Use it to help secure buy-in, guide rollout, and scale adoption responsibly.

- `<div className="flex justify-center pb-14">` containing `<SolidButton label="Learn More" />`.

## Section 5 — Lime CTA Card

- **Outer `<section>`:** `px-14 pb-12`.
- **Card:** `bg-[#D8F90A] rounded-[10px] px-8 py-12 text-center`.
- **Heading** `<h2>` (Instrument Serif): `text-[#1E1E1E] text-[52px] leading-[1.02] tracking-tight mb-3` with a `<br />`:

  > Ready to lead AI
  > at work?

- **Subtext** `<p>`: `text-[#1E1E1E] text-[18px] leading-[1.5] mb-8 px-4`:

  > Enroll now and be the leader your team has been waiting for.

- `<PrimaryButton label="Enroll Now" />`.

## Footer

- **Footer:** `bg-[#080808] text-white pt-12 px-10 text-center border-t border-white/5`.
- **Wordmark link:** wrapped in `<div className="pb-8 flex justify-center">`; the `<a href="#">` has `text-[30px] font-bold tracking-tight text-white hover:text-[#DCFF00] transition-colors` and reads `Design Rocket`.
- **Disclaimer** `<p>`: `text-[12px] text-[#83837D] leading-[1.5] pb-8`, with a `<br />`:

  > Microsoft is a collaborator on this specific course. Microsoft does not endorse
  > Design Rocket generally or other Design Rocket products.

- **Divider:** `<div className="flex justify-center pb-8">` containing `<div className="h-px w-24 bg-white/20" />`.
- **Social icon row:** `<div className="flex justify-center gap-5 pb-5">` mapping the `SOCIALS` array. Each item renders an `<a href="#">` with `aria-label={label}` and `className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#1E1E1E] hover:border-white transition-colors"`, containing the icon `<Icon className="w-[18px] h-[18px]" />`.

```tsx
const SOCIALS = [
  { label: 'Facebook', Icon: Facebook },
  { label: 'Twitter', Icon: Twitter },
  { label: 'Instagram', Icon: Instagram },
  { label: 'YouTube', Icon: Youtube },
  { label: 'LinkedIn', Icon: Linkedin },
  { label: 'TikTok', Icon: Music2 },
]
```

  All icons are from `lucide-react`: `Facebook`, `Twitter`, `Instagram`, `Youtube`, `Linkedin`, `Music2` (used for TikTok).

- **Unsubscribe note** `<p>`: `text-[10px] text-[#83837D] pb-4 leading-[1.6]`, with a `<br />`:

  > If you no longer want to receive updates on Design Rocket Certificates,
  > you can unsubscribe at any time by clicking "unsubscribe" below.

- **Link row:** `<div className="text-[12px] pb-3 space-x-2">` with four `<a href="#" className="hover:underline">` links — `Support`, `Privacy`, `Terms`, `Unsubscribe` — separated by `<span className="text-[#8F8E88]">|</span>` pipes.
- **Copyright anchor** `<a href="#">`: `text-[12px] text-white/80 hover:text-white inline-block`:

  > ©2026 Design Rocket, 660 4th Street #443, San Francisco, CA 94107 USA

- **Trailing spacer:** `<div className="pb-10" />`.

## Animation / Interaction Summary

- **All buttons:** `hover:-translate-y-0.5 transition-all duration-200` plus a background-color change on hover.
- **Video cards:** wrapper `overflow-hidden rounded-[14px] group`; the video scales on hover via `transition-transform duration-700 group-hover:scale-[1.03]`.
- **Footer wordmark and social icons:** smooth color transitions via `transition-colors`.
- **Videos** auto-play muted, loop, and use `playsInline` for mobile autoplay.

## Color Palette

- **Backgrounds:** page `#050505`, card `#111111`, footer `#080808`.
- **Text:** primary `#F2F2F2`, secondary `#E8E8E8`, muted `#83837D`, divider/pipes `#8F8E88`.
- **Lime:** primary `#DCFF00`, variant `#D8F90A`, hover `#c9ea00`.
- **Dark text on lime:** `#0A0A0A` and `#1E1E1E`.

## Fonts

- **Display:** Instrument Serif — all large headings and the hero wordmark.
- **Body / UI:** Inter.

## File Structure

```
design-rocket-email/
├── index.html
├── package.json
├── public/
│   └── assets/
│       ├── hf_20260417_110451_9f82b157-dc92-4a9f-a341-c25594ec20e1.mp4
│       ├── hf_20260419_064822_f120e48a-d545-45dd-a02d-facb07829888.mp4
│       └── hf_20260419_065931_e3ca7b53-d32e-4ad5-81de-dc9d6fcfda6d.mp4
└── src/
    ├── App.tsx      (all components: Step, Divider, PrimaryButton, SolidButton,
    │                 VideoCard, Hero, IntroSection, TransformSection,
    │                 RoadmapSection, LimeCtaSection, Footer, App)
    ├── index.css
    └── main.tsx
```
