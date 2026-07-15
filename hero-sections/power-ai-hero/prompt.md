# Power AI — Cinematic Dark Hero Section

## Overview

Build a full-screen dark hero section for "Power AI," an AI product for talent acquisition. It features a looping background video with a custom JS-driven fade loop, a navbar, a massive gradient headline, a subtitle, a CTA button, and an infinite logo marquee pinned to the bottom. All foreground content sits above the video, lifted into view by a staggered "rise" entrance animation.

## Tech Stack

- **Framework:** React 18 (`react` ^18.3.1, `react-dom` ^18.3.1) with TypeScript (`typescript` ^5.6.3).
- **Build tool:** Vite ^5.4.10 (`@vitejs/plugin-react` ^4.3.3). Preview server runs on port `4861` (`strictPort`).
- **Styling:** Tailwind CSS ^3.4.14 with PostCSS ^8.4.49 and Autoprefixer ^10.4.20.
- **Icons:** Lucide (`lucide-react` ^0.460.0) — `ChevronDown`.
- **Class utilities:** `class-variance-authority` ^0.7.1, `clsx` ^2.1.1, `tailwind-merge` ^2.6.0 (combined in a `cn()` helper).
- **Fonts:**
  - Body: **Geist Sans** via `@fontsource/geist-sans` ^5.1.0 (weights 400, 500, 600 imported).
  - Headline/display: **General Sans** loaded from Fontshare.
- **Notable techniques:** `requestAnimationFrame`-driven video opacity fade loop (no CSS transitions), `bg-clip-text` gradient text, a `liquid-glass` frosted surface with a masked gradient rim, an infinite CSS marquee with edge mask fades, and `prefers-reduced-motion` handling.

## Global Setup

### Fonts

- In `index.html`, preconnect to and load General Sans from Fontshare:
  ```html
  <link rel="preconnect" href="https://api.fontshare.com" crossorigin />
  <link rel="preconnect" href="https://cdn.fontshare.com" crossorigin />
  <link
    href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
    rel="stylesheet"
  />
  ```
- In `src/main.tsx`, import Geist Sans weights and the stylesheet, then mount the app in `StrictMode`:
  ```tsx
  import "@fontsource/geist-sans/400.css"
  import "@fontsource/geist-sans/500.css"
  import "@fontsource/geist-sans/600.css"
  import "./index.css"

  import { StrictMode } from "react"
  import { createRoot } from "react-dom/client"

  import App from "./App"

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  ```

### `index.html` head

- `lang="en"`, charset UTF-8, responsive viewport.
- Meta description: `Power AI — the most powerful AI ever deployed in talent acquisition.`
- `theme-color`: `#06010e`.
- Title: `Power AI — AI for Talent Acquisition`.

### Theme & colors (`src/index.css` CSS variables)

Defined under `@layer base` on `:root` (HSL channel values, used via `hsl(var(--…))`):

- `--background: 260 87% 3%` — deep dark blue-purple.
- `--foreground: 40 6% 95%` — off-white.
- `--hero-sub: 40 6% 82%` — hero subtitle text.

Base layer also sets:

- `html { -webkit-text-size-adjust: 100%; }`
- `body { @apply bg-background font-body text-foreground antialiased; }`
- `::selection { background: rgba(168, 85, 247, 0.35); color: hsl(var(--foreground)); }`

### Tailwind config (`tailwind.config.ts`)

- `content: ["./index.html", "./src/**/*.{ts,tsx}"]`
- **Font families:**
  - `display`: `["General Sans", "Geist Sans", "ui-sans-serif", "system-ui", "sans-serif"]`
  - `body`: `["Geist Sans", "ui-sans-serif", "system-ui", "sans-serif"]`
- **Colors:** `background`, `foreground`, and `hero-sub` mapped to their HSL variables.
- **Keyframes:**
  ```ts
  keyframes: {
    marquee: {
      from: { transform: "translateX(0%)" },
      to: { transform: "translateX(-50%)" },
    },
    rise: {
      // `to` deliberately omits opacity so the animation settles on each
      // element's own computed opacity (e.g. the subtitle's opacity-80).
      from: { opacity: "0", transform: "translateY(28px)" },
      to: { transform: "translateY(0)" },
    },
  },
  ```
- **Animations:**
  - `marquee: "marquee 20s linear infinite"`
  - `rise: "rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both"`

### Path alias

- Vite `resolve.alias`: `"@"` → `./src` (and the matching `paths` mapping `"@/*": ["./src/*"]` in `tsconfig.json`).
- `src/lib/utils.ts` exports the `cn` helper:
  ```ts
  import { clsx, type ClassValue } from "clsx"
  import { twMerge } from "tailwind-merge"

  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
  }
  ```

## Layout / Section Structure

The page composes `BackgroundVideo`, `Navbar`, the hero content, and `LogoMarquee` (`src/pages/Index.tsx`). Root structure:

- Outer wrapper: `relative min-h-screen overflow-hidden bg-background`, with `<BackgroundVideo />` behind everything.
- Foreground container: `relative z-10` sits above the video.
- Hero `<section>`: `relative flex min-h-screen flex-col overflow-visible` (column layout — navbar at top, content centered via `flex-1`, marquee at bottom; `overflow-visible` so the blur plate is not clipped).

The page-level layout:

```tsx
const VIDEO_URL =
  "/assets/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4"

export default function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <BackgroundVideo src={VIDEO_URL} />

      <div className="relative z-10">
        <section className="relative flex min-h-screen flex-col overflow-visible">
          {/* Blurred plate that keeps the headline legible over the video */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[527px] w-[984px] -translate-x-1/2 -translate-y-1/2 bg-gray-950 opacity-90 blur-[82px]"
            aria-hidden="true"
          />

          <Navbar />

          <div className="relative flex flex-1 items-center justify-center">
            {/* hero content */}
          </div>

          <LogoMarquee />
        </section>
      </div>
    </div>
  )
}
```

> **Note on the video URL:** the original brief referenced a remote CloudFront URL (`https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4`). The shipped source vendors the asset locally and uses the path `/assets/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4` — treat the local path as the canonical value.

## Background Video (`src/components/BackgroundVideo.tsx`)

A full-bleed `<video>` with a JS-controlled fade loop. No CSS transitions, no gradient overlays.

- **Element:** `<video>` positioned `absolute inset-0 h-full w-full object-cover`, starting at inline `style={{ opacity: 0 }}`. Attributes: `autoPlay`, `muted`, `playsInline`, `preload="auto"`, `aria-hidden="true"`, `tabIndex={-1}`.
- **Constants:** `FADE_SECONDS = 0.5`, `REPLAY_DELAY_MS = 100`.
- **Fade behavior (driven by `requestAnimationFrame`):** on each tick, while the video has not ended and has a finite, positive `duration`, compute:
  - `fadeIn = Math.min(currentTime / FADE_SECONDS, 1)`
  - `fadeOut = Math.min(Math.max(duration - currentTime, 0) / FADE_SECONDS, 1)`
  - Set opacity to `Math.max(0, Math.min(fadeIn, fadeOut)).toFixed(3)` — i.e. 0.5s fade-in at the start, 0.5s fade-out at the end.
- **On `ended`:** set opacity to `"0"`, wait `100ms`, then reset `currentTime = 0` and replay from the beginning.
- **Cleanup:** cancel the RAF, clear the replay timer, and remove the `ended` listener on unmount.

```tsx
import { useEffect, useRef } from "react"

const FADE_SECONDS = 0.5
const REPLAY_DELAY_MS = 100

export default function BackgroundVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let rafId = 0
    let replayTimer: number | undefined

    const tick = () => {
      const { currentTime, duration } = video
      if (!video.ended && Number.isFinite(duration) && duration > 0) {
        const fadeIn = Math.min(currentTime / FADE_SECONDS, 1)
        const fadeOut = Math.min(
          Math.max(duration - currentTime, 0) / FADE_SECONDS,
          1,
        )
        video.style.opacity = Math.max(0, Math.min(fadeIn, fadeOut)).toFixed(3)
      }
      rafId = requestAnimationFrame(tick)
    }

    const handleEnded = () => {
      video.style.opacity = "0"
      replayTimer = window.setTimeout(() => {
        video.currentTime = 0
        void video.play().catch(() => {})
      }, REPLAY_DELAY_MS)
    }

    video.addEventListener("ended", handleEnded)
    void video.play().catch(() => {})
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.clearTimeout(replayTimer)
      video.removeEventListener("ended", handleEnded)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      src={src}
      className="absolute inset-0 h-full w-full object-cover"
      style={{ opacity: 0 }}
      autoPlay
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
    />
  )
}
```

## Blurred Overlay Plate

A centered blur plate that keeps the headline legible over the video (placed inside the hero section, above the video but behind the content):

- Classes: `pointer-events-none absolute left-1/2 top-1/2 h-[527px] w-[984px] -translate-x-1/2 -translate-y-1/2 bg-gray-950 opacity-90 blur-[82px]`
- `aria-hidden="true"`.
- The hero section uses `overflow-visible` so this blur is not clipped.

## Navbar (`src/components/Navbar.tsx`)

- **Wrapper:** `<header>` with `relative animate-rise`.
- **Nav bar:** `<nav>` `flex w-full flex-row items-center justify-between px-8 py-5`, `aria-label="Primary"`.
- **Left — logo:** `<a href="/">` (`flex shrink-0 items-center`, `aria-label="Power AI home"`) wrapping `<img src={logo} alt="Power AI" className="h-8 w-auto" height={32} />`. Logo asset: `src/assets/logo.png`, imported via `import logo from "@/assets/logo.png"`, rendered at 32px height.
- **Center — nav items:** hidden on mobile, shown as `hidden items-center gap-8 md:flex`. Items, defined in a `NAV_ITEMS` array:
  - `Features` (with chevron)
  - `Solutions`
  - `Plans`
  - `Learning` (with chevron)
  - Each is a `<button type="button">` with `group flex items-center gap-1.5 text-sm font-medium text-foreground/90 transition-colors duration-200 hover:text-foreground`.
  - When `chevron` is true, render a Lucide `<ChevronDown>` with `h-4 w-4 opacity-60 transition-transform duration-200 group-hover:translate-y-0.5 group-hover:opacity-100` and `aria-hidden="true"`.
- **Right — Sign Up button:** `<Button variant="heroSecondary" className="rounded-full px-4 py-2">Sign Up</Button>`.
- **Divider below navbar:** `mt-[3px] h-px w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent` (a 1px gradient line, offset by `mt-[3px]`).

## Hero Content

Vertically centered in the remaining space (`relative flex flex-1 items-center justify-center`), inside a `flex flex-col items-center px-6 text-center` column:

### Headline

- `<h1>` with `animate-rise font-display text-[88px] font-normal leading-[1.02] tracking-[-0.024em] sm:text-[120px] md:text-[160px] lg:text-[200px] xl:text-[220px]` and `style={{ animationDelay: "0.1s" }}`. (Top-end size `text-[220px]`; uses the General Sans `font-display` family.)
- `"Power "` — plain `<span className="text-foreground">`.
- `"AI"` — gradient text via `<span className="bg-clip-text text-transparent">` with inline `style`:
  ```tsx
  style={{
    backgroundImage:
      "linear-gradient(to left, #6366f1, #a855f7, #fcd34d)",
  }}
  ```
  (indigo → purple → amber)

### Subtitle

- `<p>` with `mt-[9px] max-w-md animate-rise text-lg leading-8 text-hero-sub opacity-80` and `style={{ animationDelay: "0.25s" }}`.
- Copy (with a `<br />` between the two lines):
  > The most powerful AI ever deployed
  > in talent acquisition

### CTA

- `<Button variant="heroSecondary" className="mt-[25px] animate-rise px-[29px] py-[24px] text-base" style={{ animationDelay: "0.35s" }}>Schedule a Consult</Button>`.

## Logo Marquee (`src/components/LogoMarquee.tsx`)

Pinned to the bottom of the hero, with `pb-10`. Entrance via `animate-rise` at `animationDelay: "0.45s"`.

- **Outer wrapper:** `relative w-full animate-rise pb-10`.
- **Inner container:** `mx-auto flex max-w-5xl flex-col items-center gap-12 px-8 md:flex-row` (`gap-12` between the label and the marquee strip; stacks on mobile, row on `md`).
- **Left — static label:** `<p className="shrink-0 text-center text-sm leading-5 text-foreground/50 md:text-left">` with a `<br />`:
  > Relied on by brands
  > across the globe
- **Right — scrolling marquee:**
  - Mask wrapper: `marquee-mask min-w-0 flex-1 self-stretch overflow-hidden md:self-auto`.
  - Track: `flex w-max animate-marquee items-center` containing two `<BrandRow>` instances (the second with `hidden` to duplicate for a seamless loop).
- **Brands list:** `["Vortex", "Nimbus", "Prysma", "Cirrus", "Kynder", "Halcyn"]` (`as const`).
- **`BrandRow`:** `flex shrink-0 items-center gap-16 pr-16` (`gap-16` between logos), `aria-hidden={hidden || undefined}`. For each brand:
  - Icon: `<span className="liquid-glass flex h-6 w-6 items-center justify-center rounded-lg font-display text-[11px] font-semibold leading-none text-foreground/90">` showing the brand's first letter (`name[0]`). (A 24×24 / `h-6 w-6` `rounded-lg` liquid-glass icon.)
  - Name: `<span className="text-base font-semibold text-foreground">{name}</span>`.
- **Marquee animation:** `translateX(0%)` → `translateX(-50%)`, `20s linear infinite` (from the Tailwind `marquee` animation).

```tsx
const BRANDS = ["Vortex", "Nimbus", "Prysma", "Cirrus", "Kynder", "Halcyn"] as const

function BrandRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-16 pr-16"
      aria-hidden={hidden || undefined}
    >
      {BRANDS.map((name) => (
        <div key={name} className="flex items-center gap-3">
          <span className="liquid-glass flex h-6 w-6 items-center justify-center rounded-lg font-display text-[11px] font-semibold leading-none text-foreground/90">
            {name[0]}
          </span>
          <span className="text-base font-semibold text-foreground">{name}</span>
        </div>
      ))}
    </div>
  )
}
```

## Button Component (`src/components/ui/button.tsx`)

Built with `class-variance-authority` (`cva`) and forwarded refs.

- **Base classes:** `inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50`.
- **Variants:**
  - `default`: `rounded-full bg-foreground text-background hover:bg-foreground/90`.
  - `heroSecondary`: `liquid-glass rounded-full text-foreground hover:bg-white/[0.07] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_0_28px_rgba(168,85,247,0.18)] active:scale-[0.98]`.
- **Default variant:** `default`.
- `ButtonProps` extends `ButtonHTMLAttributes<HTMLButtonElement>` and `VariantProps<typeof buttonVariants>`. The component renders a `<button>` with `cn(buttonVariants({ variant }), className)` and sets `Button.displayName = "Button"`.

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "rounded-full bg-foreground text-background hover:bg-foreground/90",
        heroSecondary:
          "liquid-glass rounded-full text-foreground hover:bg-white/[0.07] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_0_28px_rgba(168,85,247,0.18)] active:scale-[0.98]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)
```

## Liquid Glass Utility (`src/index.css`)

A frosted surface with a hairline specular rim traced by a masked gradient border.

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
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.45) 0%,
    rgba(255, 255, 255, 0.15) 20%,
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, 0) 60%,
    rgba(255, 255, 255, 0.15) 80%,
    rgba(255, 255, 255, 0.45) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

## Marquee Edge Mask (`src/index.css`)

A soft fade at both edges of the scrolling logo strip:

```css
.marquee-mask {
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 12%,
    black 88%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 12%,
    black 88%,
    transparent 100%
  );
}
```

## Animations

- **`rise` (entrance):** `rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both` — from `opacity: 0; translateY(28px)` to `translateY(0)`. The `to` keyframe deliberately omits opacity so each element settles on its own computed opacity (e.g. the subtitle's `opacity-80`). Staggered via inline `animationDelay`: navbar (default), headline `0.1s`, subtitle `0.25s`, CTA `0.35s`, marquee `0.45s`.
- **`marquee`:** `marquee 20s linear infinite` — `translateX(0%)` → `translateX(-50%)`.
- **Background video:** custom RAF-driven 0.5s fade-in / 0.5s fade-out loop (see Background Video section).

### Reduced motion (`src/index.css`)

```css
@media (prefers-reduced-motion: reduce) {
  .animate-marquee {
    animation-play-state: paused;
  }

  .animate-rise {
    animation: none;
  }
}
```

## Color Palette

- **Background:** `hsl(260 87% 3%)` — deep dark blue-purple (`--background`).
- **Foreground:** `hsl(40 6% 95%)` — off-white (`--foreground`).
- **Hero subtitle:** `hsl(40 6% 82%)` (`--hero-sub`).
- **`theme-color` meta:** `#06010e`.
- **Headline "AI" gradient:** `linear-gradient(to left, #6366f1, #a855f7, #fcd34d)` (indigo → purple → amber).
- **Blur plate:** `bg-gray-950` at `opacity-90`, `blur-[82px]`.
- **Selection:** `rgba(168, 85, 247, 0.35)`.
- **`heroSecondary` hover glow:** `0 0 28px rgba(168,85,247,0.18)` plus `inset 0 1px 1px rgba(255,255,255,0.18)`.

## File Structure

```
power-ai-hero/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── App.tsx                       # renders <Index />
    ├── main.tsx                      # font imports + React mount in StrictMode
    ├── index.css                     # Tailwind layers, CSS vars, liquid-glass, marquee mask, reduced-motion
    ├── vite-env.d.ts
    ├── assets/
    │   └── logo.png                  # Power AI logo (rendered at 32px height)
    ├── lib/
    │   └── utils.ts                  # cn() helper (clsx + tailwind-merge)
    ├── components/
    │   ├── BackgroundVideo.tsx       # RAF fade-loop full-bleed video
    │   ├── LogoMarquee.tsx           # infinite brand marquee
    │   ├── Navbar.tsx                # logo, nav items, Sign Up, divider
    │   └── ui/
    │       └── button.tsx            # cva Button (default / heroSecondary)
    └── pages/
        └── Index.tsx                 # hero composition
```

`App.tsx` simply renders `<Index />`:

```tsx
import Index from "./pages/Index"

export default function App() {
  return <Index />
}
```
