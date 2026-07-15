# Nexora — The Future of Smarter Automation (Hero Section)

## Overview

Build a single-screen SaaS landing-page hero for a fictional automation product called **Nexora**. The navbar plus hero fill exactly 100vh with no scroll, sit over a fullscreen looping background video, and culminate in a custom-coded (not image) frosted-glass dashboard preview that overflows the bottom of the viewport and is clipped. The page is light-mode only and uses Framer Motion staggered fade-up entrances.

## Tech Stack

- **Framework:** React 18 (`react` / `react-dom` `^18.3.1`) with TypeScript (`^5.6.3`), bootstrapped via Vite (`^5.4.11`) using `@vitejs/plugin-react` (`^4.3.4`).
- **Styling:** Tailwind CSS (`^3.4.17`) with the `tailwindcss-animate` (`^1.0.7`) plugin, PostCSS (`^8.4.49`) and Autoprefixer (`^10.4.20`).
- **Animation:** Framer Motion (`framer-motion` `^11.18.2`) for all entrance animations.
- **Icons:** Lucide (`lucide-react` `^0.468.0`).
- **UI primitives:** A shadcn/ui-style `Button` component built with `class-variance-authority` (`^0.7.1`), `@radix-ui/react-slot` (`^1.1.1`), `clsx` (`^2.1.1`) and `tailwind-merge` (`^2.6.0`).
- **Fonts:** Two Google Fonts imported via CSS — Instrument Serif (display/headings, including italic) and Inter (body text).
- **Notable techniques:** A hand-crafted cubic Bézier SVG area chart (no charting library), semantic Tailwind color tokens driven by HSL CSS variables, and a frosted-glass (`backdrop-blur`) dashboard panel.

## Global Setup

### Entry Files

- **`index.html`** — `lang="en"`, root `<div id="root">`, module script `/src/main.tsx`. Document `<title>`: `Nexora — The Future of Smarter Automation`. Meta description: `Automate your busywork with intelligent agents that learn, adapt, and execute — so your team can focus on what matters most.`
- **`src/main.tsx`** — mounts `<App />` inside `<React.StrictMode>` via `ReactDOM.createRoot`, importing `./index.css`.

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

- **`src/App.tsx`** — the whole page is `flex h-screen flex-col overflow-hidden bg-background`, rendering `<Navbar />` then `<Hero />`. The navbar + hero fill exactly 100vh with no scroll.

```tsx
import Navbar from './components/Navbar'
import Hero from './components/Hero'

export default function App() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <Navbar />
      <Hero />
    </div>
  )
}
```

### Fonts & Design Tokens (`src/index.css`)

Import the fonts and Tailwind layers, then define design tokens on `:root`.

```css
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 210 14% 17%;
    --primary: 210 14% 17%;
    --primary-foreground: 0 0% 100%;
    --secondary: 0 0% 96%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96%;
    --muted-foreground: 184 5% 55%;
    --accent: 239 84% 67%;
    --accent-foreground: 0 0% 100%;
    --border: 0 0% 90%;
    --ring: 239 84% 67%;
    --radius: 0.5rem;
    --font-display: 'Instrument Serif', serif;
    --font-body: 'Inter', sans-serif;
    --shadow-dashboard: 0 25px 80px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.06);
    --success: 152 64% 33%;
    --warning: 35 92% 40%;
    --destructive: 0 72% 46%;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background font-body text-foreground antialiased;
  }
}
```

### Tailwind Config (`tailwind.config.js`)

- `content`: `['./index.html', './src/**/*.{ts,tsx}']`.
- Register the `tailwindcss-animate` plugin (imported as `animate`).
- `theme.extend.colors` maps every color token through the `hsl(var(--token))` pattern: `background`, `foreground`, `primary` (+ `foreground`), `secondary` (+ `foreground`), `muted` (+ `foreground`), `accent` (+ `foreground`), `border`, `ring`, `success`, `warning`, `destructive`.
- `theme.extend.fontFamily`: `display: 'var(--font-display)'`, `body: 'var(--font-body)'`.
- `theme.extend.borderRadius`: `lg: 'var(--radius)'`, `md: 'calc(var(--radius) - 2px)'`, `sm: 'calc(var(--radius) - 4px)'`.

```js
import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
        destructive: 'hsl(var(--destructive))',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [animate],
}
```

### Utility Helper (`src/lib/utils.ts`)

A `cn()` class-merge helper combining `clsx` and `tailwind-merge`.

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Color Palette

All values are HSL channel triples consumed via `hsl(var(--token))`. Use semantic Tailwind tokens in components, never raw color values.

| Token | Value | Meaning |
| --- | --- | --- |
| `--background` | `0 0% 100%` | white |
| `--foreground` | `210 14% 17%` | dark charcoal |
| `--primary` | `210 14% 17%` | primary |
| `--primary-foreground` | `0 0% 100%` | primary text |
| `--secondary` | `0 0% 96%` | secondary surface |
| `--secondary-foreground` | `0 0% 9%` | secondary text |
| `--muted` | `0 0% 96%` | muted surface |
| `--muted-foreground` | `184 5% 55%` | muted text |
| `--accent` | `239 84% 67%` | indigo/blue accent |
| `--accent-foreground` | `0 0% 100%` | accent text |
| `--border` | `0 0% 90%` | borders |
| `--ring` | `239 84% 67%` | focus ring |
| `--success` | `152 64% 33%` | positive/green |
| `--warning` | `35 92% 40%` | pending/amber |
| `--destructive` | `0 72% 46%` | negative/red |

Other tokens: `--radius: 0.5rem`, `--font-display: 'Instrument Serif', serif`, `--font-body: 'Inter', sans-serif`, `--shadow-dashboard: 0 25px 80px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.06)`.

## Button Component (`src/components/ui/button.tsx`)

A shadcn/ui-style button using `cva`, `@radix-ui/react-slot`, and the `cn` helper. Supports an `asChild` prop (renders via `Slot`).

- **Base classes:** `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`
- **Variants:**
  - `default`: `bg-primary text-primary-foreground hover:bg-primary/90`
  - `secondary`: `bg-secondary text-secondary-foreground hover:bg-secondary/80`
  - `outline`: `border border-border bg-background hover:bg-secondary hover:text-secondary-foreground`
  - `ghost`: `hover:bg-secondary hover:text-secondary-foreground`
  - `link`: `text-foreground underline-offset-4 hover:underline`
- **Sizes:** `default`: `h-10 px-4 py-2` · `sm`: `h-9 px-3` · `lg`: `h-11 px-8` · `icon`: `h-10 w-10`
- **Defaults:** `variant: 'default'`, `size: 'default'`.

## Navbar (`src/components/Navbar.tsx`)

- `<header>`: `relative z-20 flex items-center justify-between px-6 py-5 font-body md:px-12 lg:px-20`
- **Left — logo:** an `<a href="#">` with classes `text-xl font-semibold tracking-tight text-foreground`, text `✦ Nexora`.
- **Right cluster:** `flex items-center gap-8` containing:
  - **Nav links** (`<nav>` `hidden items-center gap-8 md:flex`, `aria-label="Main"`): the array `['Home', 'Pricing', 'About', 'Contact']` rendered as `<a href="#">` links with classes `text-sm text-muted-foreground transition-colors hover:text-foreground`.
  - **CTA button:** `<Button className="rounded-full px-5 text-sm font-medium">` with text `Get Started`.

## Hero (`src/components/Hero.tsx`)

### Layout

- `<section>`: `relative flex flex-1 flex-col items-center px-6 pt-8 md:pt-12`
- **Background video:** a `<video>` with `className="absolute inset-0 z-0 h-full w-full object-cover"`, `autoPlay muted loop playsInline`, `aria-hidden="true"`, `src={VIDEO_URL}`.
  - `const VIDEO_URL = '/assets/hf_20260319_015952_e1deeb12-8fb7-4071-a42a-60779fc64ab6.mp4'` (a locally vendored asset; the path is case-sensitive and lowercase).
  - The video file lives at `public/assets/hf_20260319_015952_e1deeb12-8fb7-4071-a42a-60779fc64ab6.mp4`.
- **Content wrapper:** `relative z-10 flex w-full flex-col items-center`.

### Animation Helper

A reusable fade-up factory drives every element's entrance. Easing is `easeOut`.

```tsx
const fadeUp = (y: number, duration: number, delay = 0) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration, delay, ease: 'easeOut' as const },
})
```

### 1. Badge

- **Animation:** `fadeUp(10, 0.5)` — fade up from `y: 10`, duration `0.5`s.
- **Element:** `motion.div`, classes `mb-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-1.5 font-body text-sm text-muted-foreground`.
- **Content:** a `<span>` with text `Now with GPT-5 support`, followed by a separate `<span aria-hidden="true">` containing `✨`.

### 2. Headline

- **Animation:** `fadeUp(16, 0.6, 0.1)` — fade up from `y: 16`, duration `0.6`s, delay `0.1`s.
- **Element:** `motion.h1`, classes `max-w-xl text-center font-display text-5xl leading-[0.95] tracking-tight text-foreground md:text-6xl lg:text-[5rem]`.
- **Content:** `The Future of <em className="italic">Smarter</em> Automation` — the word "Smarter" renders in Instrument Serif italic via the `<em className="italic">`.

### 3. Subheadline

- **Animation:** `fadeUp(16, 0.6, 0.2)` — fade up from `y: 16`, duration `0.6`s, delay `0.2`s.
- **Element:** `motion.p`, classes `mt-4 max-w-[650px] text-center font-body text-base leading-relaxed text-muted-foreground md:text-lg`.
- **Text:** `Automate your busywork with intelligent agents that learn, adapt, and execute—so your team can focus on what matters most.`

### 4. CTA Buttons

- **Animation:** `fadeUp(16, 0.6, 0.3)` — fade up from `y: 16`, duration `0.6`s, delay `0.3`s.
- **Wrapper:** `motion.div`, classes `mt-5 flex items-center gap-3`.
- **Primary button:** `<Button className="rounded-full px-6 py-5 font-body text-sm font-medium">` with text `Book a demo`.
- **Play button:** `<Button variant="ghost" size="icon" aria-label="Watch product video" className="h-11 w-11 rounded-full border-0 bg-background shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:bg-background/80">` containing a Lucide `Play` icon with classes `h-4 w-4 fill-foreground text-foreground`.

### 5. Dashboard Preview Wrapper

- **Animation:** `fadeUp(30, 0.8, 0.5)` — fade up from `y: 30`, duration `0.8`s, delay `0.5`s.
- **Outer wrapper:** `motion.div`, classes `mt-8 w-full max-w-5xl`.
- **Frosted-glass panel:** an inner `<div className="overflow-hidden rounded-2xl p-3 backdrop-blur-xl md:p-4">` with inline styles:

```tsx
style={{
  background: 'rgba(255, 255, 255, 0.4)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  boxShadow: 'var(--shadow-dashboard)',
}}
```

- It renders `<DashboardPreview />`. The dashboard overflows toward the bottom of the viewport and is clipped by `overflow-hidden` on the page parent.

## Dashboard Preview (`src/components/DashboardPreview.tsx`)

Entirely coded in React — not an image. The root is `<div className="select-none overflow-hidden rounded-xl border border-border/60 bg-background text-[11px] pointer-events-none">` containing a `<TopBar />`, then a `flex` row of `<Sidebar />` and `<MainContent />`. Base font size is `text-[11px]`; the whole thing is `select-none` and `pointer-events-none`.

### Data

- **`NAV_ITEMS`** (each `{ icon, label, active?, badge?, chevron? }`):
  - `Home` (icon `Home`, `active: true`)
  - `Tasks` (icon `ListChecks`, `badge: '10'`)
  - `Transactions` (icon `ArrowLeftRight`)
  - `Payments` (icon `ArrowUpRight`, `chevron: true`)
  - `Cards` (icon `CreditCard`)
  - `Capital` (icon `Landmark`)
  - `Accounts` (icon `Wallet`, `chevron: true`)
- **`WORKFLOW_ITEMS`:**
  - `Trake rutes` (icon `Route`) — note: spelled `Trake rutes` verbatim
  - `Payments` (icon `Send`)
  - `Notifications` (icon `Bell`)
  - `Settings` (icon `Settings`)
- **`QUICK_ACTIONS`:** `['Request', 'Transfer', 'Deposit', 'Pay Bill', 'Create Invoice']`
- **`ACCOUNTS`** (`[name, amount]` tuples): `['Credit', '$98,125.50']`, `['Treasury', '$6,750,200.00']`, `['Operations', '$1,592,864.82']`
- **`TRANSACTIONS`** (`{ date, description, amount, positive?, status }`):
  - `Jun 10` · `AWS` · `-$5,200` · `Pending`
  - `Jun 09` · `Client Payment` · `+$125,000` · `positive: true` · `Completed`
  - `Jun 08` · `Payroll` · `-$85,450` · `Completed`
  - `Jun 06` · `Office Supplies` · `-$1,200` · `Completed`
- **`CHART_CURVE`** (hand-crafted cubic Bézier path string):

```
M0 62 C30 58, 50 40, 85 44 C120 48, 140 64, 175 56 C210 48, 225 24, 260 28 C295 32, 315 50, 345 38 C365 26, 385 16, 400 12
```

### Lucide Icons Used

`ArrowLeftRight`, `ArrowUpRight`, `BadgeCheck`, `Bell`, `ChevronDown`, `ChevronRight`, `CreditCard`, `Home`, `Landmark`, `ListChecks`, `MoreVertical`, `Plus`, `Route`, `Search`, `Send`, `Settings`, `Wallet` (and the `LucideIcon` type).

### SidebarLink

- Row: `flex items-center gap-2 rounded-md px-2 py-1.5`. When `active`, append `bg-secondary font-medium text-foreground`; otherwise `text-muted-foreground`.
- Icon: `h-3 w-3 shrink-0`. Label: `<span className="truncate">`.
- Optional badge: `<span className="ml-auto rounded-full bg-secondary px-1.5 py-px text-[9px] font-medium text-secondary-foreground">`.
- Optional chevron: `<ChevronRight className="ml-auto h-3 w-3 shrink-0" />`.

### TopBar

`flex items-center justify-between gap-4 border-b border-border px-3 py-2`, with three groups:

- **Left (logo):** `flex shrink-0 items-center gap-1.5` — a `div` `flex h-5 w-5 items-center justify-center rounded-md bg-primary font-display text-primary-foreground` containing `N`, then `<span className="font-medium text-foreground">Nexora</span>`, then `<ChevronDown className="h-3 w-3 text-muted-foreground" />`.
- **Center (search):** `hidden max-w-[260px] flex-1 items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1.5 text-muted-foreground sm:flex` — a `Search` icon `h-3 w-3 shrink-0`, a `flex-1` span reading `Search`, and a shortcut `<span className="rounded border border-border bg-background px-1 text-[9px]">⌘K</span>`.
- **Right (actions):** `flex shrink-0 items-center gap-2.5` — a pill `<span className="rounded-md bg-primary px-2.5 py-1 font-medium text-primary-foreground">Move Money</span>`, a `Bell` icon `h-3.5 w-3.5 text-muted-foreground`, and an avatar `<div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-[9px] font-semibold text-accent">JB</div>`.

### Sidebar

`<aside className="hidden w-40 shrink-0 flex-col gap-0.5 border-r border-border p-2 md:flex">` — renders the `NAV_ITEMS` as `SidebarLink`s, then a section label `<p className="mt-3 px-2 pb-1 text-[9px] font-medium uppercase tracking-wider text-muted-foreground">Workflows</p>`, then the `WORKFLOW_ITEMS` as `SidebarLink`s.

### MainContent

`<div className="flex-1 bg-secondary/30 p-3 md:p-4">`:

- **Greeting:** `<h3 className="text-sm font-semibold text-foreground">Welcome, Jane</h3>`.
- **Quick-action row:** `mt-2.5 flex flex-wrap items-center gap-1.5`:
  - Primary action pill `<span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-medium text-accent-foreground">Send</span>`.
  - Each `QUICK_ACTIONS` entry as `<span className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] text-foreground">`.
  - Trailing `<span className="ml-auto text-[10px] text-muted-foreground">Customize</span>`.
- **Cards row:** `<div className="mt-3 flex gap-3">` holding `<BalanceCard />` and `<AccountsCard />` side by side (each `min-w-0 flex-1 basis-0`, equal width).
- **`<TransactionsTable />`** below the cards.

### BalanceCard

- Card: `min-w-0 flex-1 basis-0 overflow-hidden rounded-lg border border-border bg-background p-3`.
- Header row `flex items-center gap-1`: `<span className="font-medium text-foreground">Mercury Balance</span>` + `<BadgeCheck className="h-3 w-3 text-accent" />`.
- Amount: `<p className="mt-1.5 text-lg font-semibold tracking-tight text-foreground">$8,450,190<span className="text-xs text-muted-foreground">.32</span></p>` (the cents `.32` render in `text-xs text-muted-foreground`).
- Stats row `mt-1 flex items-center gap-3`: `Last 30 Days` (muted), `+$1.8M` (`font-medium text-success`), `-$900K` (`font-medium text-destructive`).
- **Chart SVG:** `viewBox="0 0 400 80"`, `preserveAspectRatio="none"`, `className="mt-2 h-20 w-full text-accent"`, `aria-hidden="true"`.
  - `<defs>` holds a vertical `linearGradient` `id="balance-fill"` (`x1="0" y1="0" x2="0" y2="1"`): stop `0%` `stopColor="currentColor" stopOpacity="0.15"`, stop `100%` `stopColor="currentColor" stopOpacity="0"`.
  - Fill path: `d={`${CHART_CURVE} L400 80 L0 80 Z`}` with `fill="url(#balance-fill)"`.
  - Stroke path: `d={CHART_CURVE}`, `fill="none"`, `stroke="currentColor"`, `strokeWidth="1.5"`, `strokeLinecap="round"`.
  - Because the SVG sets `text-accent`, `currentColor` resolves to the accent color for both fill gradient and stroke.

### AccountsCard

- Card: `min-w-0 flex-1 basis-0 overflow-hidden rounded-lg border border-border bg-background p-3`.
- Header `flex items-center justify-between`: `<span className="font-medium text-foreground">Accounts</span>` + an icon group `flex items-center gap-1.5 text-muted-foreground` with `<Plus className="h-3 w-3" />` and `<MoreVertical className="h-3 w-3" />`.
- Rows (`mt-1` container): each `ACCOUNTS` tuple renders `<div className="flex items-center justify-between gap-2 py-3 text-xs">` with the name (`text-muted-foreground`) and amount (`whitespace-nowrap font-medium text-foreground`). No dividers between rows.

### TransactionsTable

- Card: `mt-3 rounded-lg border border-border bg-background p-3`.
- Heading: `<h4 className="font-medium text-foreground">Recent Transactions</h4>`.
- `<table className="mt-2 w-full">`:
  - **Header row** `text-left text-[10px] text-muted-foreground` with `<th>`s (all `font-normal`): `Date`, `Description`, `Amount` (`text-right`), `Status` (`text-right`).
  - **Body rows** keyed by description:
    - Date cell: `py-1.5 text-muted-foreground`.
    - Description cell: `py-1.5 font-medium text-foreground`.
    - Amount cell: `py-1.5 text-right font-medium` plus `text-success` when `positive`, else `text-foreground`.
    - Status cell: `py-1.5 text-right` wrapping a pill `<span>` `inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium` — `bg-warning/10 text-warning` when status is `Pending`, otherwise `bg-success/10 text-success`.

## Animation Summary

| Element | `y` | Duration | Delay |
| --- | --- | --- | --- |
| Badge | 10 | 0.5s | 0 |
| Headline | 16 | 0.6s | 0.1s |
| Subheadline | 16 | 0.6s | 0.2s |
| CTA buttons | 16 | 0.6s | 0.3s |
| Dashboard preview | 30 | 0.8s | 0.5s |

All animations use Framer Motion (`opacity: 0 → 1`, translate from `y` to `0`) with `ease: 'easeOut'`.

## Key Design Decisions

- The dashboard overflows toward the bottom of the viewport and is clipped by `overflow-hidden` on the page parent — the navbar + hero occupy exactly 100vh with no scroll.
- Light mode only — no dark mode.
- All colors use semantic Tailwind tokens (`hsl(var(--token))`), never raw color values in components (the only inline color values are the frosted-glass panel's `rgba(255, 255, 255, …)` and the dashboard shadow).
- The SVG balance chart uses a hand-crafted cubic Bézier path, not a charting library.

## File Structure

```
nexora-automation-hero/
├── index.html
├── package.json
├── tailwind.config.js
├── public/
│   └── assets/
│       └── hf_20260319_015952_e1deeb12-8fb7-4071-a42a-60779fc64ab6.mp4
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── lib/
    │   └── utils.ts
    └── components/
        ├── Navbar.tsx
        ├── Hero.tsx
        ├── DashboardPreview.tsx
        └── ui/
            └── button.tsx
```
