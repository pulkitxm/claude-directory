# Stellar.ai — Landing Page Hero Section

## Overview

Build the hero section for a "Stellar.ai" AI-productivity landing page. It is a single-screen, centered, white-background layout featuring a navbar, a gradient headline, a CTA, an auto-cycling tab bar, a looping background video with four tab-driven overlay cards, and a row of company logos. Everything animates in with a staggered fade-in-up effect.

## Tech Stack

- **Framework:** React 18 (`react` `^18.3.1`, `react-dom` `^18.3.1`), bootstrapped with `React.StrictMode`.
- **Build tool:** Vite (`vite` `^5.4.11`) with `@vitejs/plugin-react` (`^4.3.4`).
- **Styling:** Tailwind CSS (`tailwindcss` `^3.4.17`) with `postcss` (`^8.4.49`) and `autoprefixer` (`^10.4.20`). Default config, no theme extensions.
- **Icons:** Lucide React (`lucide-react` `^0.468.0`).
- **Font:** Inter (weights 400, 500, 600, 700) imported from Google Fonts.
- **Testing tooling:** Playwright (`playwright` `^1.60.0`).
- **Notable techniques:** Custom CSS keyframe animations with staggered inline `animationDelay`, an auto-cycling tab state via `setInterval`, and conditional overlay components keyed off the active tab.

## Global Setup

### Fonts

Import Inter (weights 400, 500, 600, 700) from Google Fonts in `index.html` (with `preconnect` hints):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

Set the body font in `src/index.css`:

```css
body {
  font-family: 'Inter', sans-serif;
}
```

### `index.html`

- `lang="en"`, `charset="UTF-8"`, viewport `width=device-width, initial-scale=1.0`.
- `<title>`: `Stellar.ai — Work Smarter. Move Faster.`
- `<meta name="description">`: `Intelligent automation syncs with the tools you love to streamline tasks, boost output, and save time.`
- Root mount: `<div id="root"></div>` with `<script type="module" src="/src/main.jsx"></script>`.

### Entry point (`src/main.jsx`)

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### Tailwind config (`tailwind.config.js`)

Default config with no custom theme extensions. Content paths:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### PostCSS config (`postcss.config.js`)

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### Vite config (`vite.config.js`)

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

## Animations

Defined in `src/index.css` on top of the Tailwind layers (`@tailwind base;` `@tailwind components;` `@tailwind utilities;`).

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInOverlay {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in-overlay {
  animation: fadeInOverlay 0.4s ease-out forwards;
}

@keyframes fadeInDialog {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-slide-up-overlay {
  animation: fadeInDialog 0.5s ease-out forwards;
  transform: translate(-50%, -50%);
}
```

- **`fadeInUp`** → `from { opacity: 0; transform: translateY(30px) }` to `{ opacity: 1; transform: translateY(0) }`. Class `.animate-fade-in-up` runs it with `0.6s ease-out forwards`.
- **`fadeInOverlay`** → `from { opacity: 0 }` to `{ opacity: 1 }`. Class `.animate-fade-in-overlay` runs it with `0.4s ease-out forwards`.
- **`fadeInDialog`** → `from { opacity: 0 }` to `{ opacity: 1 }`. Class `.animate-slide-up-overlay` runs it with `0.5s ease-out forwards` and applies `transform: translate(-50%, -50%)` (for the centered dialog card).
- Every major section uses `.animate-fade-in-up` with a staggered inline `animationDelay` (starting at `0.1s` and incrementing by `0.1s`). Each element starts with inline `opacity: 0` so the animation fills it to visible.

## Layout

- Root wrapper: `bg-white min-h-screen text-black`.
- Page is built from a `<Navigation />` header plus a centered `<main>`.
- `<main>` classes: `px-6 pt-24 pb-32 max-w-7xl mx-auto text-center`.

## Navbar

Wrapped in a `<header>` with `animate-fade-in-up` and inline `style={{ opacity: 0, animationDelay: '0.1s' }}`. The `<nav>` uses `px-6 py-4 flex items-center justify-between max-w-7xl mx-auto`.

- **Left (logo):** an `<a href="#" className="flex items-center gap-2">` containing a Lucide `Star` icon (`w-5 h-5 fill-black text-black`) and the brand text `Stellar.ai` in a `<span className="text-lg font-semibold">`.
- **Center (hidden on mobile):** `hidden md:flex items-center gap-8`. Four links:
  - `Solutions` with a `ChevronDown` icon (`w-4 h-4`), link classes `flex items-center gap-1 text-sm text-gray-700 hover:text-black transition-colors`.
  - `For Teams` with a `ChevronDown` icon (`w-4 h-4`), same link classes.
  - `About Us` — `text-sm text-gray-700 hover:text-black transition-colors`.
  - `Learn Hub` — `text-sm text-gray-700 hover:text-black transition-colors`.
- **Right:** `flex items-center gap-4`.
  - `Login` link — `text-sm text-gray-700 hover:text-black transition-colors`.
  - `Get started free` button — `bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors`.

## Hero

All hero elements live inside `<main>` and use `animate-fade-in-up` with staggered inline delays.

### Reviews badge (delay `0.2s`)

- Wrapper: `inline-flex items-center gap-2 mb-8`.
- A bordered square: `w-6 h-6 border border-gray-300 rounded flex items-center justify-center` containing a filled `Star` icon (`w-3.5 h-3.5 fill-black text-black`).
- Text: `4.9 rating from 18.3K+ users` in `text-sm font-medium text-black`.

### Main heading (delay `0.3s`)

- `<h1>` classes: `text-6xl md:text-7xl lg:text-[80px] font-normal leading-[1.1] tracking-tight mb-5`.
- First line: `Work Smarter. Move Faster.`
- `<br />`
- Second line (gradient text): `AI Powers You Up.` wrapped in a `<span>` with `bg-gradient-to-r from-black via-gray-500 to-gray-400 bg-clip-text text-transparent`.

### Subheading (delay `0.4s`)

- `<p>` classes: `text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto`.
- Text: `Intelligent automation syncs with the tools you love to streamline tasks, boost output, and save time.`

### CTA button (delay `0.5s`)

- Wrapped in a `div` with `animate-fade-in-up` and inline `style={{ opacity: 0, animationDelay: '0.5s' }}`.
- Button classes: `bg-black text-white px-8 py-3 rounded-full text-base font-medium hover:bg-gray-800 transition-colors mb-12`.
- Text: `Begin Free Trial`.

## Tab Bar (delay `0.6s`)

Wrapper: `animate-fade-in-up flex justify-center mb-8` with inline `style={{ opacity: 0, animationDelay: '0.6s' }}`.

Four tabs, defined as a `TABS` constant:

```jsx
const TABS = [
  { id: 'analyse', label: 'Analyse', icon: BarChart3 },
  { id: 'train', label: 'Train', icon: BookOpen },
  { id: 'testing', label: 'Testing', icon: Users },
  { id: 'deploy', label: 'Deploy', icon: Rocket },
]
```

- **Mobile (`md:hidden`):** a 2×2 grid — `md:hidden grid grid-cols-2 gap-1 bg-gray-100 rounded-lg p-1` — rendering all four buttons.
- **Desktop (`hidden md:flex`):** a row — `hidden md:flex items-center bg-gray-100 rounded-lg p-1` — with a vertical divider before every button except the first: `<div className="w-px h-5 bg-gray-300 mx-1" />`.
- **Each tab button:** `flex items-center justify-center gap-2 px-5 py-2 rounded-md text-sm font-medium transition-colors`, with a Lucide icon (`w-4 h-4`) and the label.
  - **Active:** `bg-white text-black shadow-sm`.
  - **Inactive:** `text-gray-600`.
- Tabs auto-cycle every `4000ms` (4s) via `setInterval` inside a `useEffect`, advancing to the next tab id (wrapping around). State: `useState('analyse')`. The interval is cleared on unmount.

```jsx
useEffect(() => {
  const interval = setInterval(() => {
    setActiveTab((current) => {
      const index = TABS.findIndex((tab) => tab.id === current)
      return TABS[(index + 1) % TABS.length].id
    })
  }, 4000)
  return () => clearInterval(interval)
}, [])
```

## Video + Overlay Section (delay `0.7s`)

- **Container:** `animate-fade-in-up relative rounded-3xl overflow-hidden h-[400px] md:h-[500px]` with inline `style={{ opacity: 0, animationDelay: '0.7s' }}`.
- **Video element:** `autoPlay`, `loop`, `muted`, `playsInline`, classes `w-full h-full object-cover`. Source comes from a `VIDEO_SRC` constant:

  ```jsx
  const VIDEO_SRC =
    '/assets/hf_20260319_165750_358b1e72-c921-48b7-aaac-f200994f32fb.mp4'
  ```

  > **Note:** The original brief referenced a remote CloudFront URL (`https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260319_165750_358b1e72-c921-48b7-aaac-f200994f32fb.mp4`). The asset has since been vendored locally and the source now points to `/assets/hf_20260319_165750_358b1e72-c921-48b7-aaac-f200994f32fb.mp4` (served from `public/assets/`). The local path is the ground truth.

- **Active overlay:** `<ActiveOverlay key={activeTab} />` — the overlay component is chosen from an `OVERLAYS` map keyed by the active tab id, and remounted on each tab change (via the `key`) to retrigger its animation.

```jsx
const OVERLAYS = {
  analyse: AnalyseOverlay,
  train: TrainOverlay,
  testing: TestingOverlay,
  deploy: DeployOverlay,
}
```

### Shared overlay shell (`OverlayCard`)

Each overlay is wrapped in a reusable `OverlayCard` component that renders the dim backdrop and the centered animated dialog card:

```jsx
function OverlayCard({ children }) {
  return (
    <div className="absolute inset-0 animate-fade-in-overlay" style={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/30" />
      <div
        className="animate-slide-up-overlay absolute top-1/2 left-1/2 w-[calc(100%-3rem)] max-w-sm bg-white rounded-2xl shadow-2xl p-6 text-left"
        style={{ opacity: 0 }}
      >
        {children}
      </div>
    </div>
  )
}
```

- Outer wrapper: `absolute inset-0 animate-fade-in-overlay` with inline `opacity: 0`.
- Backdrop: `absolute inset-0 bg-black/30`.
- Inner card: `animate-slide-up-overlay absolute top-1/2 left-1/2 w-[calc(100%-3rem)] max-w-sm bg-white rounded-2xl shadow-2xl p-6 text-left` with inline `opacity: 0`.

### Overlay A — Analyse: "Set Up Your AI Workspace"

A 4-step setup wizard with a purple progress bar at 25%.

- Header row (`flex items-center justify-between mb-1`): title `<h3 className="text-base font-semibold text-black">Set Up Your AI Workspace</h3>` and a step counter `<span className="text-xs font-medium text-gray-500">Step 1 of 4</span>`.
- Subtext (`text-xs text-gray-500 mb-4`): `A few quick steps and Stellar.ai is ready to work.`
- Progress track: `h-1.5 w-full bg-gray-100 rounded-full mb-5 overflow-hidden` with fill `h-full w-1/4 bg-purple-600 rounded-full`.
- Step list (`<ul className="space-y-3">`), four items:
  1. `Connect your tools` — state `active`
  2. `Import workspace data` — state `pending`
  3. `Configure AI assistant` — state `pending`
  4. `Invite your team` — state `pending`
- Each step: a numbered badge `w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold` and a label.
  - Active badge: `bg-purple-600 text-white`; active label: `font-medium text-black`.
  - Pending badge: `bg-gray-100 text-gray-400`; pending label: `text-gray-500`.

### Overlay B — Train: "AI Model Training"

A training panel with an orange progress bar at 67% and four metric cards.

- Header row (`flex items-center justify-between mb-1`): title `<h3 className="text-base font-semibold text-black">AI Model Training</h3>` and a status pill `flex items-center gap-1.5 text-xs font-medium text-orange-600` containing a pulsing dot (`w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse`) and the text `Running`.
- Subtext (`text-xs text-gray-500 mb-4`): `Fine-tuning on your workspace data.`
- Progress label row (`flex items-center justify-between text-xs font-medium mb-1.5`): `Training progress` (`text-gray-500`) and `67%` (`text-black`).
- Progress track: `h-1.5 w-full bg-gray-100 rounded-full mb-5 overflow-hidden` with fill `h-full w-[67%] bg-orange-500 rounded-full`.
- Metrics grid (`grid grid-cols-2 gap-3`), four cards (`rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5`):
  - `Accuracy` → `94.2%`
  - `Loss` → `0.018`
  - `Epoch` → `8 / 12`
  - `ETA` → `14 min`
- Each card: label `text-[11px] uppercase tracking-wide text-gray-400 font-medium` and value `text-sm font-semibold text-black`.

### Overlay C — Testing: "Test Suite Results"

A green success panel showing 127/127 tests passing.

- Header row (`flex items-center gap-3 mb-4`): an icon badge `w-10 h-10 rounded-full bg-green-100 flex items-center justify-center` with a `CheckCircle2` icon (`w-5 h-5 text-green-600`), then a title block — `<h3 className="text-base font-semibold text-black">Test Suite Results</h3>` and `<p className="text-xs text-green-600 font-medium">All tests passed</p>`.
- Count row (`flex items-end justify-between mb-1.5`): `127` in `text-2xl font-bold text-black leading-none` followed by `<span className="text-gray-400 font-medium"> / 127</span>`, and `100% passing` in `text-xs font-medium text-gray-500`.
- Progress track: `h-1.5 w-full bg-gray-100 rounded-full mb-5 overflow-hidden` with a full green fill `h-full w-full bg-green-500 rounded-full`.
- Suite list (`<ul className="space-y-2.5">`):
  - `Unit` → `84 passed`
  - `Integration` → `31 passed`
  - `End-to-end` → `12 passed`
- Each row (`flex items-center justify-between text-sm`): left side `flex items-center gap-2 text-gray-600` with a `Check` icon (`w-4 h-4 text-green-500`) and the label; right side `font-medium text-black` showing `{count} passed`.

### Overlay D — Deploy: "Deploy to Production"

A pre-launch checklist with a deploy button.

- Title: `<h3 className="text-base font-semibold text-black mb-1">Deploy to Production</h3>`.
- Subtext (`text-xs text-gray-500 mb-4`): `Everything checks out. You are clear for launch.`
- Checklist (`<ul className="space-y-2.5 mb-5">`), four items:
  - `Build completed in 42s`
  - `All 127 tests passing`
  - `Security scan clean`
  - `Preview approved`
- Each item (`flex items-center gap-2.5 text-sm text-gray-700`): a check badge `w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0` with a `Check` icon (`w-3 h-3 text-green-600`), then the text.
- Deploy button: `w-full bg-black text-white py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2`, containing a `Rocket` icon (`w-4 h-4`) and the text `Deploy Now`.

## Company Logos (delay `0.8s`)

Wrapper: `animate-fade-in-up mt-24 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 text-gray-400` with inline `style={{ opacity: 0, animationDelay: '0.8s' }}`.

Six logo treatments, in order:

1. **Interscope** — `INTERSCOPE` in `text-sm font-semibold tracking-[0.3em]`.
2. **Spotify** — `SPOTIFY` in `text-sm font-bold tracking-[0.25em]`.
3. **Nexera** — `flex items-center gap-2`: a 3×3 dot grid (`grid grid-cols-3 gap-0.5` with nine `w-1 h-1 rounded-full bg-gray-400` dots) followed by `Nexera` in `text-base font-semibold tracking-tight`.
4. **M3** — `M3` in `font-serif italic text-2xl`.
5. **Laura Cole** — `flex items-center gap-2`: an `LC` circle (`w-7 h-7 rounded-full border border-gray-400 flex items-center justify-center text-[10px] font-semibold`) followed by `LAURA COLE` in `text-xs font-medium tracking-[0.25em]`.
6. **Vertex** — `flex items-center gap-1.5`: `vertex` in `text-base font-semibold tracking-tight lowercase`, followed by a two-dot cluster (`flex gap-1`) with `w-1.5 h-1.5 rounded-full bg-gray-400` and `w-1.5 h-1.5 rounded-full bg-gray-300`.

## Color Palette

Built entirely from Tailwind's default palette utilities — no custom theme colors. Key tokens used:

- **Base:** `bg-white`, `text-black`, `fill-black`.
- **Grays:** `text-gray-700`, `text-gray-600`, `text-gray-500`, `text-gray-400`, `bg-gray-800` (hover), `bg-gray-100`, `bg-gray-50`, `border-gray-300`, `border-gray-400`, `border-gray-100`, `bg-gray-300`.
- **Heading gradient:** `bg-gradient-to-r from-black via-gray-500 to-gray-400`.
- **Accent — purple (Analyse):** `bg-purple-600`.
- **Accent — orange (Train):** `text-orange-600`, `bg-orange-500`.
- **Accent — green (Testing/Deploy):** `bg-green-100`, `text-green-600`, `bg-green-500`, `text-green-500`.
- **Overlay backdrop:** `bg-black/30`.

## Icons (Lucide React)

Imported from `lucide-react`: `BarChart3`, `BookOpen`, `Check`, `CheckCircle2`, `ChevronDown`, `Rocket`, `Star`, `Users`.

## File Structure

```
stellar-ai-landing-hero/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── assets/
│       └── hf_20260319_165750_358b1e72-c921-48b7-aaac-f200994f32fb.mp4
└── src/
    ├── main.jsx
    ├── App.jsx
    └── index.css
```

### `src/App.jsx` component breakdown

- **`Navigation`** — the header/navbar.
- **`AnalyseOverlay`**, **`TrainOverlay`**, **`TestingOverlay`**, **`DeployOverlay`** — the four tab overlay panels.
- **`OverlayCard`** — shared backdrop + centered dialog shell for the overlays.
- **`TabBar`** — the mobile (2×2 grid) and desktop (row with dividers) tab selector.
- **`CompanyLogos`** — the logo row.
- **`App`** (default export) — composes everything, owns the `activeTab` state, the auto-cycle `useEffect`, and the `OVERLAYS` map lookup.

Module-level constants: `TABS`, `VIDEO_SRC`, `OVERLAYS`.
