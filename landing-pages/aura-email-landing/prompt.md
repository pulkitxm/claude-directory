# Aura — AI-Native Email Client Landing Page

## Overview

Build a premium, AI-native email client landing page called **Aura**. The aesthetic is dark (base `#0c0c0c`), cinematic, and glassy, featuring a looping fullscreen background video, a shiny gradient headline, a macOS-style menu bar, a realistic inbox mockup, and a custom "liquid-glass" card treatment. Reproduce exactly — fonts, gradient stops, noise filters, copy strings, animation delays, and all values below.

## Tech Stack

- **Framework:** React 18 (`react` `^18.3.1`, `react-dom` `^18.3.1`) with TypeScript (`typescript` `~5.6.3`), in `StrictMode`.
- **Build tool:** Vite (`vite` `^5.4.11`) with `@vitejs/plugin-react` `^4.3.4`. Build script: `tsc --noEmit && vite build`.
- **Styling:** Tailwind CSS `^3.4.17` with `postcss` `^8.4.49` and `autoprefixer` `^10.4.20`.
- **Animation:** Motion / Framer Motion (`motion` `^12.0.0`, import from `motion/react`).
- **Icons:** Lucide (`lucide-react` `^0.468.0`).
- **Other dependency:** `@supabase/supabase-js` `^2.47.10` (listed in `package.json`; not wired into UI).
- **Font:** Google Fonts Inter, weights 400, 500, 600, 700, 800, 900.
- **Notable techniques:** SVG noise filters (`feTurbulence`), gradient-clip shiny text animation, CSS mask-composite border for glass cards, fixed fullscreen background video.

## Global Setup

### `package.json`

- Name `aura-email-landing`, version `1.0.0`, `"type": "module"`, `"private": true`.
- Scripts: `dev: vite`, `build: tsc --noEmit && vite build`, `preview: vite preview`.
- Dependencies: `@supabase/supabase-js`, `lucide-react`, `motion`, `react`, `react-dom`.
- Dev dependencies: `@types/react`, `@types/react-dom`, `@vitejs/plugin-react`, `autoprefixer`, `postcss`, `tailwindcss`, `typescript`, `vite`.

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Aura — the premier AI-native inbox platform. Your email. Revitalized." />
    <title>Aura — Your email. Revitalized</title>
    <style>html { background-color: #0c0c0c; }</style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### `tailwind.config.js`

- `content: ['./index.html', './src/**/*.{ts,tsx}']`.
- `theme.extend.colors` adds `brand: '#3D81E3'`.
- `theme.extend.fontFamily` sets `sans: ['Inter', 'system-ui', 'sans-serif']`.
- No plugins.

### `src/main.tsx`

Mounts `<App />` inside `<StrictMode>` via `createRoot(document.getElementById('root')!)`, importing `./index.css`.

### `src/index.css`

- First line imports Inter:
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  ```
- Then `@tailwind base; @tailwind components; @tailwind utilities;`.
- Base styles:
  ```css
  html,
  body {
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  body {
    @apply bg-[#0c0c0c] text-white;
  }

  ::selection {
    @apply bg-brand/30;
  }
  ```
- Plus the shiny-headline animation, liquid-glass utility, and pricing CSS detailed below.

## Layout (`src/App.tsx`)

Root wrapper: `relative min-h-screen overflow-x-hidden bg-[#0c0c0c] text-white`.

Render order inside the root:

1. **Fixed background video** (behind everything).
2. **Two fixed vertical guide lines** at the 36rem container edges.
3. **Root SVG noise filter** (`c3-noise`, multiply blend) for the shiny headline.
4. **Content wrapper** `relative z-10` containing `<Navbar />` then a `<main>` with, in order: `<Hero />`, `<MenuBar />`, `<InboxMockup />`, `<FeatureTriage />`, `<LogoCloud />`, `<Testimonials />`, `<Pricing />`, `<FinalCTA />`.

### Global background video (fixed, behind everything)

The video source is a local vendored asset stored at `public/assets/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4` and referenced via a `VIDEO_URL` constant:

```tsx
const VIDEO_URL =
  '/assets/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4'
```

> **Note:** The original brief referenced an external CloudFront URL `https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4`. In the actual source the asset is vendored locally under `/assets/…` (same filename, lowercased), so use the local path.

```tsx
<div className="fixed inset-0 z-0 pointer-events-none">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-cover pointer-events-none"
    src={VIDEO_URL}
  />
</div>
```

### Fixed vertical guide lines

Two lines, hidden on mobile, at the 36rem container edges:

```tsx
<div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 -translate-x-[calc(50%+36rem)] w-px bg-white/10 z-[5]" />
<div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 translate-x-[calc(-50%+36rem)] w-px bg-white/10 z-[5]" />
```

## Global SVG Noise Filters (two, both `id="c3-noise"`)

- **Root level** (subtle grain, multiply blend) — used by the shiny headline.
- **Inside the Pricing section** (fractal noise, overlay blend) — used by the watermark.

### Root filter (in `App.tsx`)

Wrapped in `<svg className="absolute w-0 h-0" aria-hidden="true">`:

```tsx
<filter id="c3-noise">
  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
  <feColorMatrix
    type="matrix"
    values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0"
  />
  <feComposite in2="SourceGraphic" operator="in" result="noise" />
  <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
</filter>
```

### Pricing filter (in `Pricing.tsx`)

Also wrapped in `<svg className="absolute w-0 h-0" aria-hidden="true">`:

```tsx
<filter id="c3-noise">
  <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" stitchTiles="stitch" />
  <feComponentTransfer>
    <feFuncA type="linear" slope="0.075" />
  </feComponentTransfer>
  <feComposite in2="SourceGraphic" operator="in" result="noise" />
  <feBlend in="SourceGraphic" in2="noise" mode="overlay" />
</filter>
```

## Shared Primitives

### `AppleLogo` (`src/components/AppleLogo.tsx`)

Inline SVG Apple mark, `viewBox="0 0 384 512"`, `fill="currentColor"`, `aria-hidden="true"`. Accepts a `className` prop defaulting to `w-4 h-4`. Path:

```
M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z
```

### `LogoMark` (`src/components/LogoMark.tsx`)

Abstract 4-quadrant curve mark, `viewBox="0 0 256 256"`, `fill="#fff"`, `aria-label="Aura"`. Accepts a `className` prop defaulting to `w-8 h-8`. Path:

```
M 0 128 C 70.692 128 128 185.308 128 256 L 64 256 C 64 220.654 35.346 192 0 192 Z M 256 192 C 220.654 192 192 220.654 192 256 L 128 256 C 128 185.308 185.308 128 256 128 Z M 128 0 C 128 70.692 70.692 128 0 128 L 0 64 C 35.346 64 64 35.346 64 0 Z M 192 0 C 192 35.346 220.654 64 256 64 L 256 128 C 185.308 128 128 70.692 128 0 Z
```

### `AppleButton` (`src/components/AppleButton.tsx`)

Rounded-full white pill containing the Apple logo, a `label`, and a `ChevronRight` (from `lucide-react`). The chevron translates `+1px` on group hover. Accepts `label` (default `'Download Aura'`) and `full` (default `false`) props; when `full` is true, append `' w-full'` to the class string.

```tsx
<button
  type="button"
  className={`group inline-flex items-center justify-center gap-2 rounded-full bg-white text-black font-medium text-sm px-5 py-3 transition-all hover:bg-white/90 active:scale-[0.98]${full ? ' w-full' : ''}`}
>
  <AppleLogo />
  <span>{label}</span>
  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-[1px]" />
</button>
```

### `SectionEyebrow` (`src/components/SectionEyebrow.tsx`)

Accepts `label` (required) and `tag` (optional). Outer `div`: `inline-flex items-center gap-2.5`. Contains:

- `<span className="w-1.5 h-1.5 rounded-full bg-white" />`
- `<span className="text-sm font-medium text-white/80">{label}</span>`
- Optional tag pill: `<span className="text-xs px-2 py-0.5 rounded-full border border-white/10 text-white/50">{tag}</span>`

### Gradient style (shiny headline word "Revitalized")

Defined as an inline `CSSProperties` object in `Hero.tsx`:

```tsx
const gradientStyle: CSSProperties = {
  backgroundImage:
    'linear-gradient(to right, #091020 0%, #0B2551 12.5%, #A4F4FD 32.5%, #00d2ff 50%, #0B2551 67.5%, #091020 87.5%, #091020 100%)',
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  WebkitTextFillColor: 'transparent',
  filter: 'url(#c3-noise)',
}
```

### Shiny animation (`.animate-shiny`)

```css
.animate-shiny {
  animation: shiny 6s linear infinite;
}

@keyframes shiny {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}
```

## Liquid-Glass Utility (used across cards)

```css
.liquid-glass {
  background: rgba(255, 255, 255, 0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(4px);
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
    rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.15) 20%,
    rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0) 60%,
    rgba(255, 255, 255, 0.15) 80%, rgba(255, 255, 255, 0.45) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

## Section 1 — Navbar (`src/components/Navbar.tsx`)

`motion.nav` with `className="relative z-20"`; enters fading/sliding down (`initial={{ opacity: 0, y: -10 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.6, ease: 'easeOut' }}`).

Inner container: `max-w-6xl mx-auto px-6 h-20 flex items-center justify-between`.

- **Left:** anchor (`aria-label="Aura home"`) wrapping just the `<LogoMark />` (no "Aura" word).
- **Center** (`hidden md:flex gap-8`): links `['Solutions', 'Pricing', 'Blog', 'Documentation', 'Careers']`, each a `motion.a` with `className="text-white/70 text-sm font-medium hover:text-white transition-colors"` and staggered entrance (`initial={{ opacity: 0, y: -8 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: 'easeOut' }}`).
- **Right (desktop):** `hidden md:block` wrapping `<AppleButton />` (default label "Download Aura").
- **Right (mobile):** `md:hidden w-10 h-10 rounded-full border border-white/10 bg-white/5 inline-flex items-center justify-center` button (`aria-label="Open menu"`) containing a `Menu` icon (`w-4 h-4 text-white`).

## Section 2 — Hero (`src/components/Hero.tsx`)

Section: `pt-16 md:pt-28 pb-20 text-center flex flex-col items-center px-6`. Shared easing: `const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]`.

- **`motion.h1`** (`initial={{ opacity: 0, y: 20 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.8, delay: 0.3, ease: EASE }}`), `className="text-4xl md:text-7xl font-semibold tracking-tight leading-[0.9]"`:
  - Line 1: `<span className="block">Your email.</span>`
  - Line 2: `<span className="block animate-shiny" style={gradientStyle}>Revitalized</span>`
- **`motion.p`** (delay `0.5`, otherwise same transition), `className="mt-8 text-white/60 max-w-md text-base leading-[1.5]"`:
  > Aura is the premier inbox platform for the current era. It leverages powerful AI to organize, prioritize, and refine your messages into total clarity.
- **`motion.div`** (delay `0.7`), `className="mt-10 flex flex-col items-center gap-3"` containing `<AppleButton />` and `<span className="text-xs text-white/40">Download for Intel / Apple Silicon</span>`.

## Section 3 — macOS Menu Bar Strip (`src/components/MenuBar.tsx`)

`motion.div` full-width bar, `className="h-10 bg-black/40 backdrop-blur-md border-t border-b border-white/10"`, entering with `initial={{ opacity: 0 }}`, `animate={{ opacity: 1 }}`, `transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}`.

Inner container: `max-w-6xl mx-auto px-6 h-full flex items-center justify-between text-xs`.

- **Left** (`flex items-center gap-4 text-white/70`): `<AppleLogo className="w-3.5 h-3.5" />`, then `<span className="font-bold text-white">Aura</span>`, then menu items `['File', 'Edit', 'View', 'Go', 'Window', 'Help']` with progressive hiding via a helper:
  ```tsx
  function menuItemVisibility(index: number): string {
    if (index > 3) return 'hidden md:inline'
    if (index > 2) return 'hidden sm:inline'
    return ''
  }
  ```
- **Right** (`flex items-center gap-3 text-white/70`): `<Search className="w-3.5 h-3.5" />` + `<span>Wed May 6 1:09 PM</span>`.

## Section 4 — Inbox Mockup (`src/components/InboxMockup.tsx`)

Section: `max-w-6xl mx-auto px-6 py-16 md:py-24`. Shared `EASE = [0.22, 1, 0.36, 1]`. Lucide icons used: `Archive, File, Forward, Inbox, MoreHorizontal, Paperclip, Reply, Search, Send, Sparkles, Star, Trash2`.

Outer `motion.div`: `relative rounded-2xl overflow-hidden border border-white/10 bg-[#0e1014]/90 backdrop-blur-2xl`, entering with `initial={{ opacity: 0, y: 40 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.8, delay: 1.1, ease: EASE }}`.

### Title bar

`relative flex items-center h-10 px-4 border-b border-white/10`. Three traffic lights `['#ff5f57', '#febc2e', '#28c840']`, each `<span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />`. Centered label: `<span className="absolute left-1/2 -translate-x-1/2 text-xs text-white/50">Aura — Inbox</span>`.

### Body

`grid grid-cols-12 h-[520px]`.

**Sidebar** — `hidden md:block md:col-span-3 border-r border-white/10 bg-black/30 p-4`:

- Compose button: `w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-white text-black text-xs font-semibold px-3 py-2 transition-colors hover:bg-white/90` containing `<Sparkles className="w-3.5 h-3.5" />` and the text `Compose with Aura`.
- Nav (`mt-4 space-y-0.5`), each item an anchor with icon + label + optional count. Active item: `bg-white/10 text-white`; others: `text-white/60 hover:bg-white/5`. Base classes: `flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors`. Icon `w-3.5 h-3.5`, label in `flex-1`, count `text-[10px] text-white/40`. Items:
  - `Inbox`, label "Inbox", count 12, **active**
  - `Star`, label "Starred", count 3
  - `Send`, label "Sent"
  - `File`, label "Drafts", count 2
  - `Archive`, label "Archive"
  - `Trash2`, label "Trash"
- Labels section (`mt-6`): title `<p className="px-2.5 text-[10px] font-semibold uppercase tracking-widest text-white/30">Labels</p>`, then four color dots (each anchor `flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs text-white/60 hover:bg-white/5 transition-colors`, dot `w-2 h-2 rounded-full`):
  - Work `#00d2ff`
  - Personal `#A4F4FD`
  - Travel `#f59e0b`
  - Finance `#10b981`

**Message list** — `hidden sm:flex sm:flex-col sm:col-span-5 md:col-span-4 border-r border-white/10`:

- Search header: `flex items-center gap-2 px-4 h-11 border-b border-white/10 text-white/40` with `<Search className="w-3.5 h-3.5" />` + `<span className="text-xs">Search mail</span>`.
- Scroll area `flex-1 overflow-y-auto`. Each message is a button (`w-full text-left px-4 py-3 border-b border-white/5 transition-colors`; active → `bg-white/[0.07]`, else `hover:bg-white/[0.03]`). Top row: name (`text-xs truncate`; unread → `font-semibold text-white`, else `font-medium text-white/70`) + time (`text-[10px] text-white/40 shrink-0`). Second row: if unread, a `w-1.5 h-1.5 rounded-full bg-[#00d2ff] shrink-0` dot, then subject (`text-xs truncate`; unread → `text-white`, else `text-white/60`). Preview: `mt-0.5 text-xs text-white/40 truncate`. Messages:
  - **Linear** — "Weekly product digest" — "Your team shipped 23 issues this week..." — 9:41 AM — unread + active
  - **Sophia Chen** — "Re: Q3 roadmap review" — "Thanks for sending the deck over. I had a few thoughts..." — 8:12 AM — unread
  - **Figma** — "Marcus commented on your file" — "Love the new direction on the landing hero." — Yesterday
  - **Stripe** — "Payout of $12,480.00 sent" — "Your payout is on its way to your bank..." — Yesterday
  - **Vercel** — "Deployment ready for aura-web" — "Preview is live at aura-web-g3f.vercel.app" — Mon
  - **GitHub** — "[aura/core] PR #482 approved" — "david-lim approved your pull request." — Mon

**Reader** — `col-span-12 sm:col-span-7 md:col-span-5 flex flex-col`:

- Toolbar: `flex items-center justify-between px-4 h-11 border-b border-white/10`. Left group (`flex items-center gap-1`) has icon buttons for `Reply` (label "Reply"), `Forward` ("Forward"), `Archive` ("Archive"), `Trash2` ("Delete"), each `w-7 h-7 rounded-md hover:bg-white/5 inline-flex items-center justify-center text-white/60 transition-colors` with a `w-3.5 h-3.5` icon. Right: a `MoreHorizontal` button (`aria-label="More options"`) with the same button classes.
- Body (`flex-1 overflow-y-auto p-5`):
  - Heading: `<h3 className="text-sm font-semibold text-white">Weekly product digest</h3>`.
  - Sender row (`mt-3 flex items-center gap-2.5`): avatar bubble `w-7 h-7 rounded-full bg-gradient-to-br from-[#00d2ff] to-[#0B2551] inline-flex items-center justify-center text-[10px] font-bold text-white` containing "L"; name "Linear" (`text-xs font-medium text-white`) and "to me · 9:41 AM" (`text-[11px] text-white/40`); a "Work" pill (`inline-flex items-center gap-1.5 text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-white/50`) with a `w-1.5 h-1.5 rounded-full bg-[#00d2ff]` dot.
  - Summary card: `liquid-glass rounded-lg p-3 mt-4`. Header has `<Sparkles className="w-3.5 h-3.5" style={{ color: '#A4F4FD' }} />` + `<span className="text-[11px] font-semibold text-white">Summary by Aura</span>`. Body `<p className="mt-1.5 text-xs text-white/70 leading-[1.6]">`:
    > Your team closed 23 issues, merged 14 PRs, and shipped 2 features. Top contributor: Marcus. No action needed.
  - Body paragraphs (`mt-4 space-y-3`, each `text-xs text-white/70 leading-[1.7]`):
    - "Hi team,"
    - "Here is your weekly digest of everything happening across your projects. This was a strong week with significant progress on the Q3 roadmap."
    - "Twenty-three issues were closed, fourteen pull requests were merged, and two customer-facing features went out. The velocity trend continues to climb."
    - "Let me know if you would like a deeper breakdown by project or contributor."
    - Then a sign-off `<p className="text-xs text-white/50 leading-[1.7]">— The Linear team</p>`.
  - Attachment pill: `mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/70 hover:bg-white/[0.06] transition-colors` with `<Paperclip className="w-3.5 h-3.5" />` and text `digest-may-6.pdf`.

## Section 5 — Feature Triage (`src/components/FeatureTriage.tsx`)

Section: `max-w-6xl mx-auto px-6 py-20 md:py-28`. Inner grid: `grid md:grid-cols-2 gap-10 md:gap-16 items-start`. Shared `EASE = [0.22, 1, 0.36, 1]`.

**Left column** — `motion.div` (`initial={{ opacity: 0, y: 20 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: '-80px' }}`, `transition={{ duration: 0.7, ease: EASE }}`):

- `<SectionEyebrow label="Triage" tag="AI-native" />`
- `<h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.02]">` with "Clear your inbox" `<br />` "in a single pass."
- `<p className="mt-6 text-white/60 text-base leading-[1.6] max-w-md">`:
  > Aura reads every message, understands intent, and routes the noise away from the signal. Focus on what moves your day forward — the rest handles itself.
- Chips row (`mt-8 flex flex-wrap gap-2`), each `text-xs text-white/70 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]`: "Auto-categorize", "Snooze for later", "Silent newsletters", "One-tap unsubscribe".

**Right column** — `motion.div` (same enter, with `delay: 0.15`), `className="liquid-glass rounded-2xl p-5"`:

- Eyebrow: `<p className="text-xs text-white/50">Today · 42 messages triaged</p>`.
- Four sub-cards (`mt-4 space-y-3`, each `liquid-glass rounded-lg p-3`). Header row (`flex items-center gap-2`): dot `w-2 h-2 rounded-full` (color via inline style), name `text-sm font-medium text-white`, count `text-xs text-white/40` rendered as `({count})`. Items list (`mt-2 space-y-1`), each `text-xs text-white/50 truncate`:
  - **Priority** (4) `#ffffff` — "Sophia Chen — Q3 review", "David Lim — contract signoff"
  - **Follow-up** (7) `#e5e5e5` — "Marcus — design review", "Figma — comment thread"
  - **Updates** (18) `#a3a3a3` — "Vercel — deploy ready", "GitHub — PR #482 merged"
  - **Archived** (13) `#525252` — "Stripe payout · Newsletter · Receipts"

## Section 6 — Logo Cloud (`src/components/LogoCloud.tsx`)

Section: `max-w-6xl mx-auto px-6 py-16 md:py-20`.

- Centered kicker: `<p className="text-center text-xs uppercase tracking-widest text-white/40">Trusted by the world's most thoughtful teams</p>`.
- Grid `mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6`, each name a `motion.span` (`initial={{ opacity: 0, y: 10 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: '-60px' }}`, `transition={{ duration: 0.5, delay: i * 0.05, ease: 'easeOut' }}`), `className="text-center text-sm font-semibold tracking-tight text-white/50 hover:text-white transition-colors cursor-default"`. Names: `Linear`, `Vercel`, `Figma`, `Stripe`, `Ramp`, `Notion`, `Loom`, `Arc`.

## Section 7 — Testimonials (`src/components/Testimonials.tsx`)

Section: `max-w-6xl mx-auto px-6 py-20 md:py-28 border-t border-white/10`. Grid: `grid md:grid-cols-3 gap-6`. Shared `EASE = [0.22, 1, 0.36, 1]`.

Each `motion.figure` (`initial={{ opacity: 0, y: 20 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: '-80px' }}`, `transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}`), `className="liquid-glass rounded-2xl p-6"`:

- `<blockquote className="text-sm text-white/80 leading-[1.6]">` wrapping the quote in curly quotes (`“` … `”`).
- `<figcaption className="mt-6 pt-5 border-t border-white/10">` with name `text-sm font-semibold`, role `text-xs text-white/50`, and company `mt-1 text-xs text-white font-semibold tracking-wide`.

Testimonials:

- "Aura gave our leadership team four hours of their week back. It reads like email from the future." — **Parker Wilf**, Group Product Manager, **MERCURY**
- "The command palette alone has changed how I process messages. I can't imagine going back to a traditional client." — **Andrew von Rosenbach**, Senior Engineering Program Manager, **COHERE**
- "Triage that actually understands context. Our team stopped dreading Monday morning inboxes." — **Mathies Christensen**, Engineering Manager, **LUNAR**

## Section 8 — Pricing (`src/components/Pricing.tsx`)

Uses custom CSS classes (not Tailwind) for cinematic typography. Holds a single piece of state: `const [yearly, setYearly] = useState(false)`.

Outer `<section className="c3-pricing-section">` first renders its own `<svg>` defining the pricing `c3-noise` filter (see above).

### Watermark (giant hero headline as backdrop)

```tsx
<div className="c3-watermark-container">
  <div className="c3-watermark-main">
    <span className="c3-watermark-line-1">Your email.</span>
    <span className="c3-watermark-line-2">Revitalized</span>
  </div>
</div>
```

### Plans grid

`<div className="c3-grid">` maps over three plans, each `<div className={'c3-card' + (pro ? ' c3-card-pro' : '')}>` rendering: `c3-tier-small` (tier name), `c3-tier-large` (price — shows `yearly` price when the toggle is on, else `monthly`), `c3-desc`, a `c3-list` of feature rows, and a `c3-btn` button labeled "Choose Plan".

Each feature row is `<li>` containing a `<span className="c3-check">` (white circle) wrapping a white check SVG, then the feature text:

```tsx
<span className="c3-check">
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
</span>
```

Plans:

- **Free** — monthly "Free" / yearly "Free" — "For creators taking their first steps with Forma." — features: "Up to 3 projects in the cloud", "Image export up to 1080p", "Basic editing tools", "Free templates and icons", "Access via web and mobile app". `pro: false`.
- **Standard** — monthly "$9,99/m" / yearly "$99,99/y" — "For freelancers and small teams who need more freedom and flexibility." — features: "Up to 50 projects in the cloud", "Export up to 4K", "Advanced editing toolkit", "Team collaboration (up to 5 members)", "Access to premium template library". `pro: false`.
- **Pro** (adds `c3-card-pro`) — monthly "$19,99/m" / yearly "$199,99/y" — "For studios, agencies, and professional creators working with brands." — features: "Unlimited projects", "Export up to 8K + animations", "AI-powered content generation tools", "Unlimited team members", "Brand customization". `pro: true`.

### Yearly toggle

`<div className="c3-toggle-wrap">` contains a `<span className="text-sm text-white/70">Yearly</span>` label and a pill toggle button (`role="switch"`, `aria-checked={yearly}`, `aria-label="Toggle yearly billing"`, `className={'c3-toggle' + (yearly ? ' active' : '')}`, `onClick={() => setYearly((v) => !v)}`) wrapping a `<span className="c3-toggle-knob" />`. The knob is black when off; when `.active`, the track background becomes `rgba(255,255,255,0.2)` and the knob turns white and translates 24px.

### Pricing CSS (include exactly)

```css
.c3-pricing-section { position: relative; padding: 40px 20px 80px; display: flex; flex-direction: column; align-items: center; overflow-x: hidden; }
.c3-watermark-container { position: relative; width: 100%; max-width: 1100px; text-align: center; margin-top: 40px; z-index: 2; }
.c3-watermark-main { font-size: 9rem; font-weight: 800; line-height: 0.9; letter-spacing: -0.05em; filter: url(#c3-noise); display: flex; flex-direction: column; align-items: center; }
.c3-watermark-line-1 { color: #fff; }
.c3-watermark-line-2 { background: linear-gradient(to right, #091020 0%, #0B2551 25%, #A4F4FD 65%, #00d2ff 100%); -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent; }
.c3-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; width: 100%; max-width: 1100px; margin-top: 60px; transform: translateX(20px); position: relative; z-index: 3; }
.c3-card { background: linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.4)); backdrop-filter: blur(14px) brightness(0.91); border: 1px solid rgba(255,255,255,1); border-radius: 44px; padding: 50px 24px; min-height: 580px; display: flex; flex-direction: column; transition: all 0.6s cubic-bezier(.22,1,.36,1); overflow: hidden; position: relative; }
.c3-card::before { content:''; position:absolute; inset:0; border-radius:inherit; background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%); pointer-events:none; }
.c3-card:hover { background: rgba(15,15,15,0.6); border-color: rgba(34,211,238,0.7); transform: translateY(-12px) scale(1.01); }
.c3-card-pro { background: linear-gradient(135deg, rgba(0,0,0,0.85), rgba(0,0,0,0.55)); }
.c3-tier-small { font-size: 1.1rem; font-weight: 400; color: rgba(255,255,255,0.6); }
.c3-tier-large { font-size: 2.8rem; font-weight: 500; letter-spacing: -0.02em; color: #fff; margin-top: 8px; }
.c3-desc { font-size: 0.88rem; color: rgba(255,255,255,0.45); min-height: 3.2em; margin-top: 16px; margin-bottom: 40px; line-height: 1.5; }
.c3-list { list-style: none; margin: 0; padding: 0; }
.c3-list li { display:flex; align-items:flex-start; gap: 14px; font-size: 0.92rem; color: rgba(255,255,255,0.8); margin-bottom: 18px; line-height: 1.4; }
.c3-check { width:28px; height:28px; border-radius:50%; background: rgba(255,255,255,0.15); display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; }
.c3-btn { background:#fff; color:#000; padding: 10px 32px; border-radius: 100px; font-weight:600; font-size: 0.88rem; margin-top:auto; border:none; cursor:pointer; align-self:center; transition: all 0.3s cubic-bezier(.22,1,.36,1); }
.c3-btn:hover { background:#f5f5f5; transform:scale(1.02); box-shadow: 0 8px 24px rgba(255,255,255,0.15); }
.c3-toggle-wrap { display:flex; align-items:center; justify-content:flex-end; gap:12px; width:100%; max-width:1100px; margin-top:32px; padding-right:20px; }
.c3-toggle { width:52px; height:28px; background:#fff; border-radius:100px; position:relative; cursor:pointer; border:none; transition: background 0.3s cubic-bezier(.4,0,.2,1); padding:0; }
.c3-toggle-knob { width:20px; height:20px; background:#000; border-radius:50%; position:absolute; top:4px; left:4px; transition: all 0.3s cubic-bezier(.4,0,.2,1); }
.c3-toggle.active { background: rgba(255,255,255,0.2); }
.c3-toggle.active .c3-toggle-knob { transform: translateX(24px); background:#fff; }

@media (max-width: 1024px) {
  .c3-watermark-main { font-size: 3.5rem; filter: none; }
  .c3-watermark-line-2 { background: none; -webkit-text-fill-color: #00d2ff; color: #00d2ff; }
  .c3-grid { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; transform: none; width: 100vw; padding: 0 20px; gap: 16px; scrollbar-width: none; }
  .c3-card { flex: 0 0 320px; scroll-snap-align: center; }
  .c3-grid::-webkit-scrollbar { display: none; }
  .c3-toggle-wrap { justify-content: center; padding-right: 0; }
}
```

## Section 9 — Final CTA (`src/components/FinalCTA.tsx`)

Section: `max-w-6xl mx-auto px-6 py-20 md:py-32`. Shared `EASE = [0.22, 1, 0.36, 1]`.

`motion.div`: `liquid-glass relative overflow-hidden rounded-3xl px-8 py-16 md:py-24 text-center`, entering with `initial={{ opacity: 0, y: 30 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: '-80px' }}`, `transition={{ duration: 0.8, ease: EASE }}`.

- Radial glow overlay: `<div className="absolute inset-0 opacity-30 pointer-events-none">` with `background: 'radial-gradient(600px circle at 50% 0%, rgba(255,255,255,0.15), transparent 70%)'`.
- Content wrapper `relative`:
  - `<h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.02]">` with "Close the tabs." `<br />` "Open your day."
  - `<p className="mt-6 text-white/60 max-w-md mx-auto text-sm leading-[1.6]">`:
    > Join thousands of builders, founders, and operators who treat email like a tool — not an obligation.
  - Buttons row (`mt-10 flex flex-col sm:flex-row items-center justify-center gap-3`): `<AppleButton label="Download Aura" />` and a secondary button `group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 text-white text-sm font-medium px-5 py-3 hover:bg-white/5 transition-colors` with text "Talk to sales" + `<ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-[1px]" />`.

## Color Palette

| Token | Hex |
|---|---|
| Background base | `#0c0c0c` |
| Brand (Tailwind `brand`) | `#3D81E3` |
| Inbox container bg | `#0e1014` (`bg-[#0e1014]/90`) |
| Gradient deep navy | `#091020` |
| Gradient navy | `#0B2551` |
| Gradient ice blue | `#A4F4FD` |
| Gradient cyan | `#00d2ff` |
| Traffic lights | `#ff5f57`, `#febc2e`, `#28c840` |
| Labels | Work `#00d2ff`, Personal `#A4F4FD`, Travel `#f59e0b`, Finance `#10b981` |
| Triage categories | Priority `#ffffff`, Follow-up `#e5e5e5`, Updates `#a3a3a3`, Archived `#525252` |
| Pricing card hover border | `rgba(34,211,238,0.7)` |

## Animations Summary

- **Navbar:** fade/slide down, `duration 0.6`, `easeOut`. Links stagger with `delay 0.1 + i * 0.05`.
- **Hero:** h1 `delay 0.3`, paragraph `delay 0.5`, button block `delay 0.7`; all `duration 0.8`, ease `[0.22, 1, 0.36, 1]`.
- **Menu bar:** opacity fade, `duration 0.6`, `delay 0.9`, `easeOut`.
- **Inbox mockup:** slide up from `y: 40`, `duration 0.8`, `delay 1.1`, ease `[0.22, 1, 0.36, 1]`.
- **Feature triage:** in-view, left `duration 0.7`, right `delay 0.15`.
- **Logo cloud:** in-view stagger `delay i * 0.05`, `duration 0.5`, `easeOut`.
- **Testimonials:** in-view stagger `delay i * 0.1`, `duration 0.6`.
- **Final CTA:** in-view, slide up from `y: 30`, `duration 0.8`.
- **Shiny headline:** `shiny 6s linear infinite`, background-position `-200% center` → `200% center`.

## File Structure

```
aura-email-landing/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
├── public/
│   └── assets/
│       └── hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    └── components/
        ├── AppleButton.tsx
        ├── AppleLogo.tsx
        ├── FeatureTriage.tsx
        ├── FinalCTA.tsx
        ├── Hero.tsx
        ├── InboxMockup.tsx
        ├── LogoCloud.tsx
        ├── LogoMark.tsx
        ├── MenuBar.tsx
        ├── Navbar.tsx
        ├── Pricing.tsx
        ├── SectionEyebrow.tsx
        └── Testimonials.tsx
```
