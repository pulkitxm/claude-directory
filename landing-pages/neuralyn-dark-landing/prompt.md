# Neuralyn — Dark Analytics Landing Page

## Overview

Build a dark, full-bleed landing page for **Neuralyn**, an analytics dashboard SaaS. The page has two sections: a full-viewport hero with a parallax dashboard composited over a looping background video, and a scroll-driven testimonial where each word lights up as you scroll. The aesthetic is pure-black background, white type, a single italic serif accent word, and a "liquid glass" tag pill.

## Tech Stack

- **Framework:** React 18 (`react` `^18.3.1`, `react-dom` `^18.3.1`) with Vite (`vite` `^5.4.10`, `@vitejs/plugin-react` `^4.3.3`)
- **Language:** TypeScript (`typescript` `^5.6.3`)
- **Styling:** Tailwind CSS (`tailwindcss` `^3.4.14`) with PostCSS (`postcss` `^8.4.49`) and Autoprefixer (`autoprefixer` `^10.4.20`)
- **Animation:** Framer Motion (`framer-motion` `^11.11.17`) — `useScroll`, `useTransform`, `motion` components
- **Icons:** Lucide (`lucide-react` `^0.460.0`) — `ChevronDown`
- **UI primitives (shadcn/ui style):** `@radix-ui/react-slot` `^1.1.0`, `class-variance-authority` `^0.7.0`, `clsx` `^2.1.1`, `tailwind-merge` `^2.5.4`
- **Fonts (self-hosted via Fontsource):**
  - Inter (`@fontsource/inter` `^5.1.0`) — weights 400, 500, 600, 700 — body/UI
  - Instrument Serif (`@fontsource/instrument-serif` `^5.1.0`) — 400 and 400-italic — for the italic accent word
- **Notable techniques:** full-bleed `w-screen` with `marginLeft: calc(-50vw + 50%)`, `mix-blend-mode: luminosity` image compositing, scroll-linked parallax and word-by-word color reveal, CSS "liquid glass" border via masked pseudo-element.

## Global Setup

### Path alias

`@` resolves to `./src` in both `vite.config.ts` (`path.resolve(__dirname, "./src")`) and `tsconfig.json` (`"@/*": ["./src/*"]`).

### Entry point (`src/main.tsx`)

Import the font CSS, then global CSS, then mount the app:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### App shell (`src/App.tsx`)

```tsx
import Hero from "@/components/Hero";
import Testimonial from "@/components/Testimonial";

export default function App() {
  return (
    <main>
      <Hero />
      <Testimonial />
    </main>
  );
}
```

### HTML document (`index.html`)

- `<html lang="en">`, `<meta name="theme-color" content="#000000" />`
- Favicon: `<link rel="icon" type="image/png" href="/src/assets/logo.png" />`
- Meta description: "Neuralyn helps teams track metrics, goals, and progress with precision."
- Title: `Neuralyn — Your Insights. One Clear Overview.`
- Inline style to avoid flash: `html { background: #000; }`

### Tailwind config (`tailwind.config.ts`)

- `content: ["./index.html", "./src/**/*.{ts,tsx}"]`
- `fontFamily.sans`: `["Inter", "system-ui", "-apple-system", "sans-serif"]`
- `fontFamily.serif`: `["'Instrument Serif'", "Georgia", "serif"]`
- Colors map to CSS variables via `hsl(var(--...))`: `background`, `foreground`, `border`, `input`, `ring`, and the `DEFAULT`/`foreground` pairs for `card`, `primary`, `secondary`, `muted`, `accent`, `destructive`.

### Utility helper (`src/lib/utils.ts`)

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Color Palette

All colors are HSL CSS variables defined in `:root` (dark mode by default) in `src/index.css`:

| Variable | Value | Notes |
| --- | --- | --- |
| `--background` | `0 0% 0%` | pure black |
| `--foreground` | `0 0% 100%` | pure white |
| `--card` | `0 0% 5%` | |
| `--card-foreground` | `0 0% 100%` | |
| `--primary` | `0 0% 100%` | |
| `--primary-foreground` | `0 0% 0%` | |
| `--secondary` | `0 0% 10%` | |
| `--secondary-foreground` | `0 0% 100%` | |
| `--muted` | `0 0% 10%` | |
| `--muted-foreground` | `0 0% 65%` | |
| `--accent` | `0 0% 10%` | |
| `--accent-foreground` | `0 0% 100%` | |
| `--destructive` | `0 84% 60%` | |
| `--destructive-foreground` | `0 0% 100%` | |
| `--border` | `0 0% 20%` | |
| `--input` | `0 0% 20%` | |
| `--ring` | `0 0% 65%` | |
| `--hero-subtitle` | `210 17% 95%` | hero subtitle color |

### Base layer (`src/index.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-background font-sans text-foreground antialiased;
  }
}
```

## Liquid Glass CSS

Add to `src/index.css`. Provides a frosted pill with a masked gradient border:

```css
.liquid-glass {
  background: rgba(255, 255, 255, 0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
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
    rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
    rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
    rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

## Section 1 — Hero (`src/components/Hero.tsx`)

The whole section is `relative h-screen overflow-hidden` (full viewport height) with `data-testid="hero"`. A `sectionRef` (`useRef<HTMLElement>`) drives the scroll-linked parallax.

### Scroll setup

```tsx
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ["start start", "end start"],
});

const contentY = useTransform(scrollYProgress, [0, 1], [0, -200]);
const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
const dashboardY = useTransform(scrollYProgress, [0, 1], [0, -250]);
```

- **Hero text content group:** `y: [0, -200]` and `opacity: [1, 0]` (opacity fades over the first 50% of scroll).
- **Dashboard image:** `y: [0, -250]`.

### Navbar

`<header>` is `relative z-40 flex items-center justify-between px-8 py-4 md:px-28`.

- **Left cluster** — `flex items-center gap-12 md:gap-20`:
  - Logo link (`<a href="/">`, `flex items-center gap-2.5`):
    - `<img src={logo} alt="Neuralyn logo" className="h-8 w-8" />`
    - Brand text: `<span className="text-xl font-bold tracking-tight">Neuralyn</span>`
  - Nav (`hidden items-center gap-1 md:flex`, `aria-label="Main"`) — links rendered from `const NAV_LINKS = ["Home", "Services", "Reviews", "Contact us"];`. Links are hidden on mobile. Each link: `<a href="#">` with `flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground`. The **Services** link additionally renders a `<ChevronDown className="h-4 w-4" aria-hidden="true" />` after its label.
- **Right** — Sign In button (the shadcn `Button` component): `rounded-lg bg-foreground text-sm font-semibold text-background transition-opacity hover:bg-foreground hover:opacity-90`. Label: `Sign In`.

### Hero content

A `motion.div` (`data-testid="hero-content"`) styled with `{ y: contentY, opacity: contentOpacity }` and classes `relative z-20 mt-16 flex flex-col items-center px-4 text-center md:mt-20`. Contains, in order:

1. **Tag pill** — `motion.div` with class `liquid-glass mb-6 flex items-center gap-2 rounded-lg px-3 py-2`:
   - Inner "New" badge: `<span className="rounded-md bg-white px-2 py-0.5 text-sm font-medium text-black">New</span>`
   - Label: `<span className="text-sm font-medium text-muted-foreground">Say Hello to Corewave v3.2</span>`
2. **Title** — `motion.h1` with `mb-3 text-5xl font-medium leading-tight tracking-[-2px] md:text-7xl md:leading-[1.15]`:
   - Line 1: `Your Insights.`
   - `<br />`
   - Line 2: `One Clear ` then the accent word in Instrument Serif italic: `<span className="font-serif font-normal italic">Overview.</span>`
3. **Subtitle** — `motion.p` (`data-testid="hero-subtitle"`) with `mb-8 text-lg font-normal leading-6 opacity-90` and inline `style={{ color: "hsl(var(--hero-subtitle))" }}`:
   - `Neuralyn helps teams track metrics, goals,` `<br />` `and progress with precision.`
4. **CTA button** — `motion.button` with `rounded-full bg-foreground px-8 py-3.5 text-base font-medium text-background`, `whileHover={{ scale: 1.03 }}`, `whileTap={{ scale: 0.98 }}`. Label: `Get Started for Free`.

### Dashboard + video area

A `motion.div` (`data-testid="dashboard-area"`) with `relative z-10 mt-12 w-screen md:mt-16` and inline `style={{ marginLeft: "calc(-50vw + 50%)", aspectRatio: "16 / 9" }}` to break out to full viewport width.

- **Background video** — `<video>` with `absolute inset-0 h-full w-full object-cover`, attributes `autoPlay muted loop playsInline`. `src` is `VIDEO_URL`:

  ```tsx
  const VIDEO_URL =
    "/assets/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4";
  ```

  > Note: the original prompt referenced the remote source `https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4`. The asset has since been vendored locally to `public/assets/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4` and is referenced via the local path above. (The original URL was supplied in all-caps in the prompt; scheme and host are lowercased here per convention while the path is preserved verbatim.)

- **Dashboard image** — wrapped in `<div className="absolute inset-0 flex items-center justify-center">`, the image is a `motion.img` (`data-testid="dashboard-image"`) with `src={heroDashboard}`, `alt="Neuralyn analytics dashboard"`, class `w-[90%] max-w-5xl rounded-2xl`, and inline `style={{ y: dashboardY, mixBlendMode: "luminosity" }}`.

### Bottom gradient fade

A `<div>` (`data-testid="hero-fade"`) with `pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-40 bg-gradient-to-t from-background to-transparent`.

### Hero entrance animations

Each element uses `initial={{ opacity: 0, y }}` → `animate={{ opacity: 1, y: 0 }}`, staggered:

| Element | `y` | `duration` | `delay` |
| --- | --- | --- | --- |
| Tag pill | 10 | 0.5s | 0 |
| Title | 20 | 0.6s | 0.1 |
| Subtitle | 20 | 0.6s | 0.2 |
| CTA | 20 | 0.6s | 0.3 |
| Dashboard area | 40 | 0.8s | 0.4 |

### Hero imports

```tsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import heroDashboard from "@/assets/hero-dashboard.png";
```

## Section 2 — Testimonial (`src/components/Testimonial.tsx`)

Section is `flex min-h-screen items-center justify-center px-8 py-24 md:px-28 md:py-32` with `data-testid="testimonial"`. Inside, a container `<div ref={containerRef}>` is `mx-auto flex w-full max-w-3xl flex-col items-start gap-10` (max width `3xl`, left-aligned, gap-10 between elements).

### Quote text

```tsx
const QUOTE =
  "Neuralyn revolutionized how we handle financial insights using smart analytics. We are now driving better outcomes quicker than we ever imagined! Neuralyn revolutionized how we handle financial insights using smart analytics.";
```

### Layout, top to bottom

1. **Quote symbol image** — `<img src={quoteSymbol} alt="" aria-hidden="true" className="h-10 w-14 object-contain" />`.
2. **Testimonial paragraph** — `<p data-testid="testimonial-quote" className="flex flex-wrap text-4xl font-medium leading-[1.2] md:text-5xl">`. The quote is split on spaces (`QUOTE.split(" ")`) and each word is rendered as a `<Word>` component. After the words, a closing quotation mark: `<span className="ml-2 text-muted-foreground">&rdquo;</span>`.
3. **Author row** — `<div className="flex items-center gap-4">`:
   - Avatar: `<img src={avatar} alt="Brooklyn Simmons" className="h-14 w-14 rounded-full border-[3px] border-foreground object-cover" />`
   - Name: `<p className="text-base font-semibold leading-7 text-foreground">Brooklyn Simmons</p>`
   - Role: `<p className="text-sm font-normal leading-5 text-muted-foreground">Product Manager</p>`

### Scroll-driven word reveal

The container drives a scroll progress used by each word:

```tsx
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start end", "end center"],
});

const words = QUOTE.split(" ");
```

Each word maps to a sequential range `[i / words.length, (i + 1) / words.length]`. Inside the `Word` component, that range animates:

```tsx
function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const color = useTransform(progress, range, [
    "hsl(0 0% 35%)",
    "hsl(0 0% 100%)",
  ]);

  return (
    <motion.span style={{ opacity, color }} className="mr-[0.3em]">
      {children}
    </motion.span>
  );
}
```

- **opacity:** `[0.2, 1]`
- **color:** `["hsl(0 0% 35%)", "hsl(0 0% 100%)"]`
- Each word span has `mr-[0.3em]`.

### Testimonial imports

```tsx
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import quoteSymbol from "@/assets/quote-symbol.png";
import avatar from "@/assets/testimonial-avatar.png";
```

## Button Component (`src/components/ui/button.tsx`)

shadcn/ui-style button built with `class-variance-authority` and Radix `Slot`:

```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

## Assets

Stored under `src/assets/` and imported via the `@/assets/...` alias:

- `logo.png` — small logo icon (also used as the favicon)
- `hero-dashboard.png` — dashboard screenshot
- `quote-symbol.png` — decorative quote mark
- `testimonial-avatar.png` — circular headshot

Background video lives in `public/assets/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4` and is served from `/assets/...`.

## File Structure

```
neuralyn-dark-landing/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
├── public/
│   └── assets/
│       └── hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── vite-env.d.ts
    ├── assets/
    │   ├── logo.png
    │   ├── hero-dashboard.png
    │   ├── quote-symbol.png
    │   └── testimonial-avatar.png
    ├── components/
    │   ├── Hero.tsx
    │   ├── Testimonial.tsx
    │   └── ui/
    │       └── button.tsx
    └── lib/
        └── utils.ts
```

## Scripts (`package.json`)

- `dev`: `vite`
- `build`: `tsc --noEmit && vite build`
- `preview`: `vite preview`
- `assets`: `node scripts/generate-assets.mjs`
- `verify`: `node scripts/verify.mjs`
