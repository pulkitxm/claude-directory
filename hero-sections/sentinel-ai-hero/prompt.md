# Sentinel AI — Cinematic Security Hero Section

## Overview

Build a full-screen, dark hero landing page for a security company called "Sentinel AI". The page floats a fixed transparent navbar and a bottom-left-anchored content block over an embedded Spline 3D scene that fills the viewport. Clicks pass through the content area to the interactive 3D scene, except for the buttons, which re-enable pointer events. There is no light mode and no mobile hamburger menu — the nav links and CTA simply hide below the `md` breakpoint.

## Tech Stack

- **Framework:** React with Vite, TypeScript.
- **Styling:** Tailwind CSS with the `tailwindcss-animate` plugin.
- **UI primitives:** shadcn/ui `Button` component built with `class-variance-authority` for the button variants.
- **3D embed:** `@splinetool/react-spline` and `@splinetool/runtime` for the embedded 3D Spline scene used as the background.
- **Font:** Google Fonts "Sora" (weights 300, 400, 500, 600, 700).
- **Notable techniques:** lazily-loaded Spline scene via `React.lazy` + `Suspense`, fluid `clamp()` typography, staggered fade-up entrance animations, `pointer-events-none` passthrough with `pointer-events-auto` button re-enable, dark-only HSL CSS custom properties mapped into Tailwind.

## Global Setup

### `index.html`

Load the Sora font in the `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

## Color Palette

All colors are HSL CSS custom properties, dark only — there is no light mode. Define them on `:root` in `src/index.css` and map them in Tailwind config using the `hsl(var(--variable))` pattern.

| Token | Value | Notes |
| --- | --- | --- |
| `--background` | `0 0% 10%` | Dark charcoal |
| `--foreground` | `0 0% 96%` | Near-white |
| `--primary` | `119 99% 46%` | Vivid green |
| `--primary-foreground` | `0 0% 4%` | Near-black |
| `--secondary` | `0 0% 18%` | |
| `--secondary-foreground` | `0 0% 96%` | |
| `--muted` | `0 0% 16%` | |
| `--muted-foreground` | `0 0% 60%` | |
| `--accent` | `119 99% 46%` | Same vivid green as primary |
| `--accent-foreground` | `0 0% 4%` | |
| `--destructive` | `0 84% 60%` | |
| `--border` | `0 0% 20%` | |
| `--input` | `0 0% 20%` | |
| `--ring` | `119 99% 46%` | |
| `--radius` | `0.5rem` | |
| `--nav-button` | `0 0% 18%` | Custom token |
| `--hero-bg` | `0 0% 8%` | The darkest background, nearly black |

Add two custom Tailwind color tokens: `nav-button` and `hero-bg`.

### `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 10%;
    --foreground: 0 0% 96%;

    --primary: 119 99% 46%;
    --primary-foreground: 0 0% 4%;

    --secondary: 0 0% 18%;
    --secondary-foreground: 0 0% 96%;

    --muted: 0 0% 16%;
    --muted-foreground: 0 0% 60%;

    --accent: 119 99% 46%;
    --accent-foreground: 0 0% 4%;

    --destructive: 0 84% 60%;

    --border: 0 0% 20%;
    --input: 0 0% 20%;
    --ring: 119 99% 46%;

    --radius: 0.5rem;

    --nav-button: 0 0% 18%;
    --hero-bg: 0 0% 8%;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-sora antialiased;
  }

  ::selection {
    @apply bg-primary text-primary-foreground;
  }
}
```

## Tailwind Config — `tailwind.config.ts`

- `darkMode: ["class"]`, `content: ["./index.html", "./src/**/*.{ts,tsx}"]`.
- `fontFamily.sora: ["Sora", "sans-serif"]` — the body uses `font-sora antialiased`.
- Map every color token above via `hsl(var(--…))`, including the `primary`, `secondary`, `muted`, and `accent` color groups with their `DEFAULT` + `foreground` members, plus the standalone `border`, `input`, `ring`, `background`, `foreground`, `destructive`, `nav-button`, and `hero-bg` tokens.
- `borderRadius`: `lg: var(--radius)`, `md: calc(var(--radius) - 2px)`, `sm: calc(var(--radius) - 4px)`.
- Plugin: `tailwindcss-animate`.

```ts
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sora: ["Sora", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
        },
        "nav-button": "hsl(var(--nav-button))",
        "hero-bg": "hsl(var(--hero-bg))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
            filter: "blur(4px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
            filter: "blur(0)",
          },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
```

## Animations

Two custom keyframes/animations defined in Tailwind config:

- **`fade-up`** — `0%`: `opacity: 0`, `transform: translateY(20px)`, `filter: blur(4px)`; `100%`: `opacity: 1`, `transform: translateY(0)`, `filter: blur(0)`. Animation: `fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards`.
- **`fade-in`** — `0%`: `opacity: 0`; `100%`: `opacity: 1`. Animation: `fade-in 0.5s ease-out forwards`.

Animated content elements start at `opacity-0` with the `animate-fade-up` class, and stagger their entrance with an inline `style={{ animationDelay: "Xs" }}`.

## Layout & Page Wrapper

### App shell

`src/App.tsx` simply renders the page:

```tsx
import Index from "@/pages/Index";

const App = () => <Index />;

export default App;
```

### Page — `src/pages/Index.tsx`

A simple wrapper containing `<Navbar />` and `<HeroSection />`:

```tsx
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";

const Index = () => (
  <div className="bg-hero-bg min-h-screen">
    <Navbar />
    <HeroSection />
  </div>
);

export default Index;
```

## Navbar

Fixed, transparent, floating over the Spline scene.

- **Container:** `<header>` with `fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16 py-5`.
- **Left — logo:** `<a href="#">` text `SENTINEL`, classes `text-foreground text-xl font-semibold tracking-tight`.
- **Center — nav links:** a `<nav>` with `hidden md:flex items-center gap-8` (hidden on mobile). Render from the array `["Services", "About Us", "Projects", "Team", "Contacts"]`. Each link is an `<a>` with classes `text-sm text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest`, keyed by its label, with `href` derived from the label via a `toAnchor` helper that lowercases and replaces whitespace with hyphens (e.g. `About Us` → `#about-us`).
- **Right — CTA:** shadcn `Button` with `variant="navCta"` and `size="lg"`, text `Get Quote`, plus classes `hidden md:inline-flex rounded-lg uppercase text-xs tracking-widest px-6`.

```tsx
import { Button } from "@/components/ui/button";

const NAV_LINKS = ["Services", "About Us", "Projects", "Team", "Contacts"];

const toAnchor = (label: string) =>
  `#${label.toLowerCase().replace(/\s+/g, "-")}`;

const Navbar = () => (
  <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16 py-5">
    <a
      href="#"
      className="text-foreground text-xl font-semibold tracking-tight"
    >
      SENTINEL
    </a>

    <nav className="hidden md:flex items-center gap-8">
      {NAV_LINKS.map((link) => (
        <a
          key={link}
          href={toAnchor(link)}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
        >
          {link}
        </a>
      ))}
    </nav>

    <Button
      variant="navCta"
      size="lg"
      className="hidden md:inline-flex rounded-lg uppercase text-xs tracking-widest px-6"
    >
      Get Quote
    </Button>
  </header>
);

export default Navbar;
```

## Hero Section

Full-screen section with content anchored to the bottom-left.

### Structure

- **Outer `<section>`:** `relative min-h-screen flex items-end bg-hero-bg overflow-hidden`.
- **Spline 3D background (absolute, full-size):** lazily loaded via `lazy(() => import("@splinetool/react-spline"))`, wrapped in `<Suspense>` with the fallback `<div className="absolute inset-0 bg-hero-bg" />`. The `<Spline>` component receives the scene via a `SPLINE_SCENE` constant and `className="w-full h-full"`, all placed inside `<div className="absolute inset-0">`.
- **Dark overlay** (for content legibility): `<div className="absolute inset-0 bg-black/30 z-[1] pointer-events-none" />`.
- **Content container:** `relative z-10 pointer-events-none w-full max-w-[90%] sm:max-w-md lg:max-w-2xl px-6 md:px-10 pb-10 md:pb-10 pt-32`. The whole container is `pointer-events-none` so clicks pass through to the interactive Spline scene; only the buttons re-enable clicks with `pointer-events-auto`.

### Content elements (staggered `animate-fade-up`, each starting `opacity-0`)

1. **Heading** (`animationDelay: "0.2s"`): an `<h1>` reading `SENTINEL ` in white plus ` AI` in primary green. The `AI` part is wrapped in `<span className="text-primary">`. Classes: `opacity-0 animate-fade-up text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.05] tracking-[-0.05em] text-foreground mb-2 md:mb-4 uppercase`.
2. **Subheading** (`animationDelay: "0.4s"`): a `<p>` reading `We implement security correctly.` Classes: `opacity-0 animate-fade-up text-foreground/80 text-[clamp(1.125rem,2.5vw,1.875rem)] font-light mb-3 md:mb-6`.
3. **Description** (`animationDelay: "0.55s"`): a `<p>` reading `Enterprise security systems built in days. AI-powered surveillance deployed with zero-trust architecture. Smart access control set up for your entire facility. All of it done right, not just fast.` Classes: `opacity-0 animate-fade-up text-muted-foreground text-[clamp(0.875rem,1.5vw,1.25rem)] font-light mb-4 md:mb-8`.
4. **Two CTA buttons** (`animationDelay: "0.7s"`): wrapped in `<div className="opacity-0 animate-fade-up flex flex-wrap gap-3 font-bold">`. Both are plain `<button type="button">` elements (not the shadcn `Button`) with `pointer-events-auto` to re-enable clicks:
   - **`Book a Call`** — `pointer-events-auto bg-primary text-primary-foreground px-6 py-3 md:px-8 md:py-4 text-sm rounded-sm cursor-pointer hover:brightness-110 transition-all active:scale-[0.97]`.
   - **`Our Work`** — `pointer-events-auto bg-white text-background px-6 py-3 md:px-8 md:py-4 text-sm rounded-sm cursor-pointer hover:brightness-90 transition-all active:scale-[0.97]`.
5. **Trust line** (`animationDelay: "0.85s"`): a `<p>` reading `Trusted security partner. Columbus, OH. 12 systems deployed.` Classes: `opacity-0 animate-fade-up text-muted-foreground/60 text-xs font-light mt-4 md:mt-6`.

### `src/components/HeroSection.tsx`

```tsx
import { lazy, Suspense } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

const SPLINE_SCENE = "/spline/scene.splinecode";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-end bg-hero-bg overflow-hidden">
    {/* Spline 3D background */}
    <div className="absolute inset-0">
      <Suspense fallback={<div className="absolute inset-0 bg-hero-bg" />}>
        <Spline scene={SPLINE_SCENE} className="w-full h-full" />
      </Suspense>
    </div>

    {/* Dark overlay for content legibility */}
    <div className="absolute inset-0 bg-black/30 z-[1] pointer-events-none" />

    {/* Content — anchored bottom-left, clicks pass through to the scene */}
    <div className="relative z-10 pointer-events-none w-full max-w-[90%] sm:max-w-md lg:max-w-2xl px-6 md:px-10 pb-10 md:pb-10 pt-32">
      <h1
        className="opacity-0 animate-fade-up text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.05] tracking-[-0.05em] text-foreground mb-2 md:mb-4 uppercase"
        style={{ animationDelay: "0.2s" }}
      >
        SENTINEL <span className="text-primary">AI</span>
      </h1>

      <p
        className="opacity-0 animate-fade-up text-foreground/80 text-[clamp(1.125rem,2.5vw,1.875rem)] font-light mb-3 md:mb-6"
        style={{ animationDelay: "0.4s" }}
      >
        We implement security correctly.
      </p>

      <p
        className="opacity-0 animate-fade-up text-muted-foreground text-[clamp(0.875rem,1.5vw,1.25rem)] font-light mb-4 md:mb-8"
        style={{ animationDelay: "0.55s" }}
      >
        Enterprise security systems built in days. AI-powered surveillance
        deployed with zero-trust architecture. Smart access control set up for
        your entire facility. All of it done right, not just fast.
      </p>

      <div
        className="opacity-0 animate-fade-up flex flex-wrap gap-3 font-bold"
        style={{ animationDelay: "0.7s" }}
      >
        <button
          type="button"
          className="pointer-events-auto bg-primary text-primary-foreground px-6 py-3 md:px-8 md:py-4 text-sm rounded-sm cursor-pointer hover:brightness-110 transition-all active:scale-[0.97]"
        >
          Book a Call
        </button>
        <button
          type="button"
          className="pointer-events-auto bg-white text-background px-6 py-3 md:px-8 md:py-4 text-sm rounded-sm cursor-pointer hover:brightness-90 transition-all active:scale-[0.97]"
        >
          Our Work
        </button>
      </div>

      <p
        className="opacity-0 animate-fade-up text-muted-foreground/60 text-xs font-light mt-4 md:mt-6"
        style={{ animationDelay: "0.85s" }}
      >
        Trusted security partner. Columbus, OH. 12 systems deployed.
      </p>
    </div>
  </section>
);

export default HeroSection;
```

### Spline scene asset

The `<Spline>` `scene` prop points to a locally vendored asset: `/spline/scene.splinecode` (served from `public/spline/scene.splinecode`). The original prompt specifies the exact remote Spline scene URL `https://prod.spline.design/SLK6B8KZ3LRLKIYK/scene.splinecode` — if rebuilding from scratch you can use the remote URL directly, or vendor it locally as done here.

## shadcn/ui Button — `src/components/ui/button.tsx`

The shadcn `Button` is built with `class-variance-authority`. In addition to the standard variants it defines three custom variants — `navCta`, `hero`, and `heroOutline`:

- **`navCta`** — `text-foreground bg-nav-button hover:bg-nav-button/80 active:scale-[0.97] transition-all` (used by the navbar CTA).
- **`hero`** — `bg-primary text-primary-foreground rounded-sm font-bold hover:brightness-110 active:scale-[0.97] transition-all`.
- **`heroOutline`** — `bg-white text-background rounded-sm font-bold hover:brightness-90 active:scale-[0.97] transition-all`.

```tsx
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        navCta:
          "text-foreground bg-nav-button hover:bg-nav-button/80 active:scale-[0.97] transition-all",
        hero: "bg-primary text-primary-foreground rounded-sm font-bold hover:brightness-110 active:scale-[0.97] transition-all",
        heroOutline:
          "bg-white text-background rounded-sm font-bold hover:brightness-90 active:scale-[0.97] transition-all",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
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

## Implementation Notes

- The entire content area uses `pointer-events-none` so clicks pass through to the Spline scene; the two hero buttons re-enable interaction with `pointer-events-auto`.
- Responsive fluid typography uses `clamp()` for the heading, subheading, and description.
- The hero content is anchored to the bottom-left of the viewport via `flex items-end` on the section combined with padding-bottom on the content container.
- No hamburger menu on mobile — the nav links and CTA simply hide (`hidden md:flex` / `hidden md:inline-flex`).
- Dark only — there is no light mode.

## File Structure

```
sentinel-ai-hero/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
├── public/
│   └── spline/
│       └── scene.splinecode
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── components/
    │   ├── HeroSection.tsx
    │   ├── Navbar.tsx
    │   └── ui/
    │       └── button.tsx
    ├── lib/
    │   └── utils.ts
    └── pages/
        └── Index.tsx
```
