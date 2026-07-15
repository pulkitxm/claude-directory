# Velorah — Cinematic Hero Section

## Overview

Build a single-page hero section with a fullscreen looping background video, a glassmorphic ("liquid glass") navigation bar and call-to-action buttons, and cinematic display typography. The layout is minimalist and vertically centered — the video provides all the visual depth, with no decorative blobs, radial gradients, or overlays.

## Tech Stack

- **Framework:** React 18 (`react` / `react-dom` `^18.3.1`) with TypeScript (`^5.7.3`)
- **Build tool:** Vite (`^5.4.14`) via `@vitejs/plugin-react` (`^4.3.4`)
- **Styling:** Tailwind CSS (`^3.4.17`) with `tailwindcss-animate` (`^1.0.7`), `autoprefixer` (`^10.4.20`), `postcss` (`^8.5.1`)
- **UI components:** shadcn/ui (`default` style, `neutral` base color, CSS variables enabled), built with `class-variance-authority` (`^0.7.1`), `clsx` (`^2.1.1`), and `tailwind-merge` (`^2.6.0`)
- **Fonts:** Instrument Serif (display) and Inter weights 400/500 (body), from Google Fonts
- **Notable techniques:** fullscreen autoplaying background video, a custom `.liquid-glass` glassmorphism effect (backdrop blur + gradient border mask), and CSS keyframe fade-and-rise entrance animations with staggered delays

## Global Setup

### HTML (`index.html`)

- `<html lang="en">`, `<meta charset="UTF-8" />`, viewport meta `width=device-width, initial-scale=1.0`.
- `<meta name="theme-color" content="#002b42" />`
- Meta description: `Velorah — tools for deep thinkers, bold creators, and quiet rebels. Digital spaces for sharp focus and inspired work.`
- Preconnect to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (the latter with `crossorigin`).
- Load Google Fonts via stylesheet link:

  ```html
  <link
    href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
  ```

- `<title>Velorah — Where dreams rise through the silence.</title>`
- Body contains `<div id="root"></div>` and `<script type="module" src="/src/main.tsx"></script>`.

### Fonts

- CSS variables: `--font-display: 'Instrument Serif', serif;` and `--font-body: 'Inter', sans-serif;`.
- Body uses `font-family: var(--font-body);`.
- Headings use an inline style `fontFamily: "'Instrument Serif', serif"` (defined once as a `displayFont` constant and reused).
- Tailwind `fontFamily` extension maps `display: "var(--font-display)"` and `body: "var(--font-body)"`.

### Entry point (`src/main.tsx`)

```tsx
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import App from "./App"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

### Vite (`vite.config.ts`)

Use `@vitejs/plugin-react` and an `@` alias pointing at `./src`:

```ts
import path from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
})
```

### PostCSS (`postcss.config.js`)

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## Color Palette

Dark theme defined as HSL channel values on CSS variables in `:root` (consumed via `hsl(var(--token))` in the Tailwind config):

- `--background: 201 100% 13%` (deep navy blue)
- `--foreground: 0 0% 100%` (white)
- `--muted-foreground: 240 4% 66%` (muted gray)
- `--primary: 0 0% 100%`, `--primary-foreground: 0 0% 4%`
- `--secondary: 0 0% 10%`, `--secondary-foreground: 0 0% 100%`
- `--muted: 0 0% 10%`
- `--accent: 0 0% 10%`, `--accent-foreground: 0 0% 100%`
- `--border: 0 0% 18%`, `--input: 0 0% 18%`
- `--ring: 0 0% 100%`
- `--radius: 0.5rem`

Base layer rules:

- `*` gets `@apply border-border;`.
- `body` gets `@apply bg-background text-foreground antialiased;` plus `font-family: var(--font-body);`.
- `::selection` uses `background: hsl(var(--foreground) / 0.92);` and `color: hsl(var(--background));`.

### Tailwind config (`tailwind.config.ts`)

- `darkMode: ["class"]`, `content: ["./index.html", "./src/**/*.{ts,tsx}"]`, `plugins: [animate]` (from `tailwindcss-animate`).
- `theme.extend.colors` maps each token to `hsl(var(--token))`, with `primary`, `secondary`, `muted`, and `accent` each exposing `DEFAULT` and `foreground`.
- `theme.extend.borderRadius`: `lg: "var(--radius)"`, `md: "calc(var(--radius) - 2px)"`, `sm: "calc(var(--radius) - 4px)"`.

## Layout (`src/App.tsx`)

Root container: `relative flex min-h-screen flex-col overflow-hidden bg-background`.

### Video Background

A fullscreen `<video>` element placed first inside the root container:

- Classes: `absolute inset-0 z-0 h-full w-full object-cover`.
- Attributes: `autoPlay`, `loop`, `muted`, `playsInline`, plus `aria-hidden="true"` and `tabIndex={-1}` for accessibility.
- Source (`VIDEO_SRC` constant), served as a local asset: `/assets/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4`.

> Note: the asset is vendored locally under `public/assets/`. It originally came from a CloudFront URL (`https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4`); the rebuild should reference the local `/assets/...` path used in the source. The host/scheme are lowercased here; the path segments are preserved verbatim from the source filename.

### Navbar (`<header>`)

- Container: `relative z-10 mx-auto flex w-full max-w-7xl flex-row items-center justify-between px-8 py-6`.
- **Logo:** an `<a href="/">` with `Velorah®` where the `®` is a `<sup className="text-xs">&reg;</sup>`. Classes `text-3xl tracking-tight text-foreground`, styled with the `displayFont` (Instrument Serif), `aria-label="Velorah home"`.
- **Nav links:** a `<nav className="hidden items-center gap-9 md:flex" aria-label="Primary">` (hidden on mobile, shown at `md`).
  - First link **Home**: `<a href="/">` with `text-sm text-foreground transition-colors` and `aria-current="page"` (active state).
  - Remaining links from a `NAV_LINKS = ["Studio", "About", "Journal", "Reach Us"]` array, each rendered as `<a>` with `href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}` and classes `text-sm text-muted-foreground transition-colors hover:text-foreground`.
- **CTA button:** the shadcn `Button` with `variant="glass"` and `size="pill"`, label `Begin Journey`, extra classes `px-6 py-2.5 text-sm text-foreground hover:scale-[1.03]`.

### Hero (`<main>`)

- Container: `relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-40 pt-32 text-center py-[90px]`.
- **Heading (`<h1>`):**
  - Classes: `animate-fade-rise max-w-7xl text-5xl font-normal leading-[0.95] tracking-[-2.46px] sm:text-7xl sm:leading-[0.95] md:text-8xl md:leading-[0.95]`, styled with the `displayFont` (Instrument Serif).
  - Copy: `Where dreams rise through the silence.` — where the words `dreams` and `through the silence.` are each wrapped in `<em className="not-italic text-muted-foreground">` for color contrast (rendered upright, muted gray).
- **Subtext (`<p>`):**
  - Classes: `animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg`.
  - Copy: `We're designing tools for deep thinkers, bold creators, and quiet rebels. Amid the chaos, we build digital spaces for sharp focus and inspired work.` (use the `&rsquo;` entity for the apostrophe in "We're").
- **CTA button:** the shadcn `Button` with `variant="glass"` and `size="pill"`, label `Begin Journey`, extra classes `animate-fade-rise-delay-2 mt-12 cursor-pointer px-14 py-5 text-base text-foreground hover:scale-[1.03]`.

### App constants

```tsx
const VIDEO_SRC =
  "/assets/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"

const NAV_LINKS = ["Studio", "About", "Journal", "Reach Us"]

const displayFont = { fontFamily: "'Instrument Serif', serif" }
```

## Button Component (`src/components/ui/button.tsx`)

A shadcn/ui `Button` built with `class-variance-authority`, forwarding refs and merging classes via the `cn` helper.

- **Base classes:** `inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50`.
- **Variants:**
  - `default`: `bg-primary text-primary-foreground transition-colors hover:bg-primary/90`
  - `secondary`: `bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/80`
  - `ghost`: `transition-colors hover:bg-accent hover:text-accent-foreground`
  - `glass`: `liquid-glass text-foreground transition-transform duration-300 ease-out will-change-transform`
- **Sizes:**
  - `default`: `h-10 rounded-md px-4 py-2`
  - `sm`: `h-9 rounded-md px-3`
  - `lg`: `h-11 rounded-md px-8`
  - `pill`: `rounded-full`
- **Default variants:** `variant: "default"`, `size: "default"`.

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground transition-colors hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/80",
        ghost:
          "transition-colors hover:bg-accent hover:text-accent-foreground",
        glass:
          "liquid-glass text-foreground transition-transform duration-300 ease-out will-change-transform",
      },
      size: {
        default: "h-10 rounded-md px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

### `cn` helper (`src/lib/utils.ts`)

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Liquid Glass Effect

A custom `.liquid-glass` component class (defined in `@layer components`) provides the glassmorphism look: a near-transparent white fill with luminosity blend, a 4px backdrop blur, an inset highlight shadow, and a gradient "border" rendered via a masked `::before` pseudo-element.

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

## Animations

Keyframe-based fade-and-rise entrance animations (defined in `@layer utilities`), each running `0.8s ease-out` with `both` fill mode and staggered delays. Animations are disabled under `prefers-reduced-motion: reduce`.

```css
@keyframes fade-rise {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-rise { animation: fade-rise 0.8s ease-out both; }
.animate-fade-rise-delay { animation: fade-rise 0.8s ease-out 0.2s both; }
.animate-fade-rise-delay-2 { animation: fade-rise 0.8s ease-out 0.4s both; }

@media (prefers-reduced-motion: reduce) {
  .animate-fade-rise,
  .animate-fade-rise-delay,
  .animate-fade-rise-delay-2 {
    animation: none;
  }
}
```

Application:

- `<h1>` gets `animate-fade-rise` (no delay).
- Subtext `<p>` gets `animate-fade-rise-delay` (0.2s delay).
- Hero CTA button gets `animate-fade-rise-delay-2` (0.4s delay).

## File Structure

```
velorah-hero-landing/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── components.json            # shadcn/ui config (default style, neutral base, CSS variables)
├── public/
│   └── assets/
│       └── hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4
└── src/
    ├── main.tsx               # React entry point (StrictMode + createRoot)
    ├── App.tsx                # Hero page: video bg, navbar, hero
    ├── index.css              # Tailwind layers, theme variables, liquid-glass, animations
    ├── components/
    │   └── ui/
    │       └── button.tsx     # shadcn/ui CVA Button (glass variant, pill size)
    └── lib/
        └── utils.ts           # cn() class-merge helper
```
