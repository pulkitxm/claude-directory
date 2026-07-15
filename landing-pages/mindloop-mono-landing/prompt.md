# Mindloop — Dark Monochrome Newsletter Landing Page

## Overview

Build a single-page, pure-black monochrome marketing site for **Mindloop**, a newsletter/content platform. The entire theme is a pure black (`#000`) background with white foreground — no colors or gradients beyond monochrome. Typography does the talking: Inter for structure and Instrument Serif italics for accent words. The page is a vertical scroll of seven sections (Navbar, Hero, "Search has changed", Mission, Solution, CTA, Footer) with looping background videos, a liquid-glass UI treatment, and Framer Motion entrances plus a scroll-driven word-by-word reveal.

## Tech Stack

- **Framework:** React + Vite + TypeScript
- **Styling:** Tailwind CSS with the `tailwindcss-animate` plugin; shadcn/ui primitives (`Input`)
- **Animation:** Framer Motion — entrances, scroll-driven word reveal, micro-interactions
- **Video streaming:** `hls.js` (lazy-loaded) for the HLS background video in the CTA section
- **Fonts:** `@fontsource/inter` (sans, weights 400, 500, 600, 700) and `@fontsource/instrument-serif` (serif, weights 400 and 400-italic, used for italic accent words)
- **Icons:** `lucide-react`
- **Notable techniques:** `useScroll` + `useTransform` scroll-driven per-word opacity reveal; lazy dynamic `import("hls.js")` with native-HLS fallback for Safari; CSS liquid-glass effect with a masked gradient border via `mask-composite`

## Design System

### CSS variables (`src/index.css`)

All design tokens are HSL channel values (no `hsl()` wrapper in the variable — just the values), defined under `@layer base` on `:root`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 0%;
    --foreground: 0 0% 100%;
    --card: 0 0% 5%;
    --card-foreground: 0 0% 100%;
    --primary: 0 0% 100%;
    --primary-foreground: 0 0% 0%;
    --secondary: 0 0% 12%;
    --secondary-foreground: 0 0% 85%;
    --muted: 0 0% 15%;
    --muted-foreground: 0 0% 65%;
    --accent: 170 15% 45%;
    --accent-foreground: 0 0% 100%;
    --border: 0 0% 20%;
    --input: 0 0% 18%;
    --ring: 0 0% 40%;
    --hero-subtitle: 210 17% 95%;
  }

  * {
    @apply border-border;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-background font-sans text-foreground antialiased;
    text-rendering: optimizeLegibility;
  }

  ::selection {
    @apply bg-foreground text-background;
  }
}
```

### Color palette (HSL channel values)

| Token | Value | Notes |
| --- | --- | --- |
| `--background` | `0 0% 0%` | pure black |
| `--foreground` | `0 0% 100%` | white |
| `--card` | `0 0% 5%` | |
| `--card-foreground` | `0 0% 100%` | |
| `--primary` | `0 0% 100%` | |
| `--primary-foreground` | `0 0% 0%` | |
| `--secondary` | `0 0% 12%` | |
| `--secondary-foreground` | `0 0% 85%` | |
| `--muted` | `0 0% 15%` | |
| `--muted-foreground` | `0 0% 65%` | |
| `--accent` | `170 15% 45%` | |
| `--accent-foreground` | `0 0% 100%` | |
| `--border` | `0 0% 20%` | |
| `--input` | `0 0% 18%` | |
| `--ring` | `0 0% 40%` | |
| `--hero-subtitle` | `210 17% 95%` | near-white, slightly cool |

### Tailwind config (`tailwind.config.ts`)

- `darkMode: ["class"]`, content globs `./index.html` and `./src/**/*.{ts,tsx}`, plugin `tailwindcss-animate`.
- **Fonts:** `sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]`; `serif: ["'Instrument Serif'", "ui-serif", "Georgia", "serif"]`.
- **Colors:** map each token to `hsl(var(--token))`, including `"hero-subtitle": "hsl(var(--hero-subtitle))"`, and the nested `DEFAULT`/`foreground` pairs for `card`, `primary`, `secondary`, `muted`, `accent`.

### Liquid glass effect (`.liquid-glass`)

A global CSS class with a translucent fill, blur, and a masked gradient border drawn via `::before`:

```css
/* ————— Liquid glass ————— */
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

## Animation Pattern

Every section uses a reusable fade-up helper with staggered delays. Defined in `src/lib/motion.ts` and spread onto a `motion.*` element (`<motion.div {...fadeUp(0.1)} />`):

```ts
/**
 * Reusable fade-up entrance shared by every section.
 * Spread onto a `motion.*` element: `<motion.div {...fadeUp(0.1)} />`
 */
export const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});
```

## App Composition (`src/App.tsx`)

A `min-h-screen bg-background text-foreground` wrapper. `<Navbar />`, then a `<main>` containing `<Hero />`, `<SearchChanged />`, `<Mission />`, `<Solution />`, `<CtaSection />`, then `<Footer />` outside `<main>`.

## Shared Components

### Logo mark (`src/components/Logo.tsx`)

Concentric-circles Mindloop mark — a centered flex `span` (outer) wrapping a smaller `span` (inner). Accepts `className`, `outerClassName`, `innerClassName` and composes them with `cn`. Marked `aria-hidden`.

- **Outer:** `flex items-center justify-center rounded-full h-7 w-7 border-2 border-foreground/60`.
- **Inner:** `block rounded-full h-3 w-3 border border-foreground/60`.

### Input (`src/components/ui/input.tsx`)

A shadcn/ui `Input` primitive, used for the email field in the Hero subscribe form.

## Page Structure (top to bottom)

### 1. Navbar (`src/components/sections/Navbar.tsx`)

Fixed and fully transparent — no background. A `motion.header` that animates in: `initial={{ opacity: 0, y: -16 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.8, ease: "easeOut" }}`. Container classes: `fixed inset-x-0 top-0 z-50 px-8 py-4 md:px-28`. Inner `<nav>` is `flex items-center` with `aria-label="Primary"`.

- **Left — brand:** `<a href="#home" className="flex items-center gap-2.5">` containing `<LogoMark />` and `<span className="text-lg font-bold tracking-tight">Mindloop</span>`.
- **Center-left — nav links:** `ml-12 hidden items-center gap-4 lg:flex`. Links: `Home` → `#home`, `How It Works` → `#how-it-works`, `Philosophy` → `#philosophy`, `Use Cases` → `#use-cases`. Separated by a `•` dot before every link after the first (`<span aria-hidden className="text-[10px] text-muted-foreground/50">•</span>`). Each link: `text-sm text-muted-foreground transition-colors hover:text-foreground`.
- **Right — socials:** `ml-auto flex items-center gap-3`. Three liquid-glass circular buttons for `Instagram` (`https://instagram.com`), `LinkedIn` (`https://linkedin.com`), `Twitter` (`https://twitter.com`) using the matching `lucide-react` icons. Each anchor opens in a new tab (`target="_blank" rel="noreferrer"`), has an `aria-label`, and classes `liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:text-foreground`; each icon is `className="h-4 w-4" strokeWidth={1.75}`.

### 2. Hero (`src/components/sections/Hero.tsx`)

Full-viewport section, id `home`: `relative flex min-h-screen items-center justify-center overflow-hidden`.

- **Background video:** an autoplaying, looping, muted `<video>` covering the section — `absolute inset-0 h-full w-full object-cover`, with `autoPlay loop muted playsInline aria-hidden`. Source: `/assets/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4`.
- **Bottom fade:** a non-interactive gradient for a smooth fade into the black page below — `pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent`.
- **Content wrapper:** `relative z-10 flex w-full flex-col items-center px-6 pt-28 text-center md:pt-32`.
- **Avatar / social-proof row** (`{...fadeUp(0)}`, `mb-8 flex items-center gap-3`): three overlapping circular avatars in a `flex -space-x-2` group — each `<img>` `width={32} height={32}` with classes `h-8 w-8 rounded-full border-2 border-background object-cover` (alt `Subscriber avatar`), sourced from `@/assets/avatar-1.png`, `avatar-2.png`, `avatar-3.png`. Followed by `<p className="text-sm text-muted-foreground">7,000+ people already subscribed</p>`.
- **Heading** (`motion.h1`, `{...fadeUp(0.1)}`): `text-5xl font-medium tracking-[-2px] md:text-7xl lg:text-8xl`. Copy: `Get <em className="font-serif font-normal italic">Inspired</em> with Us` — i.e. "Inspired" rendered in Instrument Serif italic, normal weight.
- **Subtitle** (`motion.p`, `{...fadeUp(0.2)}`): `mt-6 max-w-xl text-lg text-hero-subtitle`. Copy: `Join our feed for meaningful updates, news around technology and a shared journey toward depth and direction.`
- **Email form** (`motion.form`, `{...fadeUp(0.3)}`): liquid-glass pill container `liquid-glass mt-10 flex w-full max-w-lg items-center gap-2 rounded-full p-2`.
  - State via `useState`: `email` string and `subscribed` boolean. `handleSubmit` calls `event.preventDefault()`, bails if `!email.trim()`, otherwise sets `subscribed` true.
  - An `sr-only` label (`htmlFor="hero-email"`, text `Email address`) precedes the `<Input>` (`id="hero-email" type="email" required`, placeholder `Enter your email`) with classes `h-auto flex-1 border-0 bg-transparent px-5 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-0`. Changing the input resets `subscribed` to false.
  - Submit `motion.button`: `whileHover={{ scale: 1.03 }}`, `whileTap={{ scale: 0.98 }}`, classes `flex shrink-0 items-center gap-2 rounded-full bg-foreground px-8 py-3 text-sm font-semibold tracking-wide text-background`. Shows `SUBSCRIBE` by default; once `subscribed`, shows a `Check` icon (`className="h-4 w-4" strokeWidth={3}`) plus `SUBSCRIBED`.

### 3. "Search has changed" (`src/components/sections/SearchChanged.tsx`)

Section id `how-it-works`: `px-6 pb-6 pt-52 md:pb-9 md:pt-64`. Inner wrapper `mx-auto max-w-6xl text-center`.

- **Heading** (`motion.h2`, `{...fadeUp(0)}`): `text-5xl font-medium tracking-[-2px] md:text-7xl lg:text-8xl`. Copy: `Search has <em className="font-serif font-normal italic">changed.</em>` then a `<br />` then `Have you?` — "changed." in serif italic.
- **Subtitle** (`motion.p`, `{...fadeUp(0.1)}`): `mx-auto mb-24 mt-6 max-w-2xl text-lg text-muted-foreground`. Copy: `People no longer browse — they ask. Your audience is getting its answers from AI, and the voices those answers draw on are being chosen right now.`
- **Platform cards:** `mb-20 grid gap-12 md:grid-cols-3 md:gap-8`. Each is a `motion.article` (`{...fadeUp(0.15 + i * 0.1)}`, `flex flex-col items-center`) with a `200×200` icon `<img>` (`width={200} height={200}`, classes `mb-8 h-[200px] w-[200px]`, alt `` `${name} icon` ``), an `<h3 className="text-base font-semibold">` name, and a `<p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">` description:
  - **ChatGPT** (icon `@/assets/icon-chatgpt.png`): `Hundreds of millions of people now ask ChatGPT first. If your ideas aren't part of the answer, they're invisible.`
  - **Perplexity** (icon `@/assets/icon-perplexity.png`): `Answer engines cite sources in real time. Depth and authority decide who gets referenced — and who gets skipped.`
  - **Google AI** (icon `@/assets/icon-google.png`): `AI Overviews answer before anyone clicks. The open web rewards creators whose writing is worth surfacing.`
- **Bottom tagline** (`motion.p`, `{...fadeUp(0.2)}`): `text-center text-sm text-muted-foreground`. Copy: `If you don't answer the questions, someone else will.`

### 4. Mission (`src/components/sections/Mission.tsx`)

Section id `philosophy`: `px-6 pb-32 pt-0 md:pb-44`.

- **Video** (wrapped in `motion.div {...fadeUp(0)} className="mx-auto flex justify-center"`): a large square looping autoplaying muted `<video>` — `aspect-square w-full max-w-[800px] object-cover`, with `autoPlay loop muted playsInline aria-hidden`. Source: `/assets/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4`.
- **Scroll-driven word reveal:** a `textRef` `<div>` (`mx-auto mt-16 max-w-5xl text-center md:mt-24`) tracked with `useScroll`:
  ```ts
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.85", "end 0.45"],
  });
  ```
  Each paragraph is split on spaces; the combined `total` word count drives per-word ranges via `rangeFor(index) = [index / total, (index + 1) / total]`. A `Word` component maps its range to opacity with `useTransform(progress, range, [0.15, 1])` — i.e. each word fades from opacity `0.15` to `1` as scroll progresses through its range — rendered as a `motion.span` whose class is `text-foreground` when highlighted, otherwise `text-hero-subtitle`. Highlight test: a word is highlighted if its lowercased value with `[^a-z']` stripped is in the set `{ "curiosity", "meets", "clarity" }`.
  - **Paragraph 1** (`<p className="text-2xl font-medium tracking-[-1px] md:text-4xl lg:text-5xl">`): `We're building a space where curiosity meets clarity — where readers find depth, writers find reach, and every newsletter becomes a conversation worth having.` Highlighted words: **curiosity**, **meets**, **clarity** (in `--foreground`); the rest in `--hero-subtitle`.
  - **Paragraph 2** (`<p className="mt-10 text-xl font-medium md:text-2xl lg:text-3xl">`): `A platform where content, community, and insight flow together — with less noise, less friction, and more meaning for everyone involved.` (no highlights — passed `highlighted={false}`).

### 5. Solution (`src/components/sections/Solution.tsx`)

Section id `use-cases`: `border-t border-border/30 px-6 py-32 md:py-44`. Inner wrapper `mx-auto max-w-6xl`.

- **Label** (`motion.p`, `{...fadeUp(0)}`): `text-center text-xs uppercase tracking-[3px] text-muted-foreground`. Copy: `Solution`.
- **Heading** (`motion.h2`, `{...fadeUp(0.1)}`): `mt-6 text-center text-4xl font-medium tracking-[-1px] md:text-6xl`. Copy: `The platform for <em className="font-serif font-normal italic">meaningful</em> content` — "meaningful" in serif italic.
- **Video** (`motion.div {...fadeUp(0.2)} className="mt-16 md:mt-20"`): a `<video>` with `aspect-[3/1] w-full rounded-2xl object-cover`, `autoPlay loop muted playsInline aria-hidden`. Source: `/assets/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4`.
- **Feature grid:** `mt-16 grid gap-8 md:mt-20 md:grid-cols-4`. Each is a `motion.article` (`{...fadeUp(0.25 + i * 0.08)}`) with an `<h3 className="text-base font-semibold">` title and `<p className="mt-2 text-sm leading-relaxed text-muted-foreground">` description:
  - **Curated Feed:** `A signal-first stream tuned to your curiosity — no engagement bait, no infinite noise, just writing worth your time.`
  - **Writer Tools:** `A focused editor, smart drafts, and analytics that explain resonance — everything you need to publish with intent.`
  - **Community:** `Threads that stay thoughtful. Readers and writers meet in conversations designed for depth, not dunks.`
  - **Distribution:** `Email, web, and AI-readable formats from one publish button — your words travel to wherever answers are made.`

### 6. CTA (`src/components/sections/CtaSection.tsx`)

Section: `relative overflow-hidden border-t border-border/30 py-32 md:py-44`.

- **Background HLS video:** a `<video ref={videoRef}>` with `absolute inset-0 z-0 h-full w-full object-cover`, `autoPlay loop muted playsInline aria-hidden`. Streamed via `hls.js`, lazy-loaded in a `useEffect` so it stays out of the main chunk:
  ```ts
  const HLS_SRC =
    "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | undefined;
    let cancelled = false;

    void import("hls.js").then(({ default: HlsModule }) => {
      if (cancelled) return;

      if (HlsModule.isSupported()) {
        hls = new HlsModule();
        hls.loadSource(HLS_SRC);
        hls.attachMedia(video);
        return;
      }

      // Safari plays HLS natively.
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = HLS_SRC;
      }
    });

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, []);
  ```
  Import the type as `import type Hls from "hls.js"`.
- **Overlay:** `absolute inset-0 z-[1] bg-background/45`.
- **Content** (`relative z-10 flex flex-col items-center px-6 text-center`):
  - **Logo** (`motion.div {...fadeUp(0)}`): the concentric-circles `<LogoMark outerClassName="h-10 w-10" innerClassName="h-5 w-5" />`.
  - **Heading** (`motion.h2`, `{...fadeUp(0.1)}`): `mt-8 text-5xl font-medium tracking-[-2px] md:text-7xl`. Copy: `Start Your <em className="font-serif font-normal italic">Journey</em>` — "Journey" in serif italic.
  - **Subtitle** (`motion.p`, `{...fadeUp(0.2)}`): `mt-5 max-w-md text-lg text-muted-foreground`. Copy: `One feed for readers. One home for writers. Zero noise for everyone.`
  - **Buttons** (`motion.div {...fadeUp(0.3)} className="mt-10 flex flex-col gap-4 sm:flex-row"`): both `motion.a` with `whileHover={{ scale: 1.03 }}` and `whileTap={{ scale: 0.98 }}`.
    - **Subscribe Now** → `#home`: `rounded-lg bg-foreground px-8 py-3.5 text-sm font-semibold text-background`.
    - **Start Writing** → `#use-cases`: `liquid-glass rounded-lg px-8 py-3.5 text-sm font-semibold text-foreground`.

### 7. Footer (`src/components/sections/Footer.tsx`)

A simple `<footer className="px-8 py-12 md:px-28">`. Inner row: `flex flex-col items-center justify-between gap-4 sm:flex-row`.

- **Left:** `<p className="text-sm text-muted-foreground">© 2026 Mindloop. All rights reserved.</p>`.
- **Right:** a `<nav aria-label="Footer" className="flex items-center gap-6">` with links `Privacy` → `#privacy`, `Terms` → `#terms`, `Contact` → `#contact`, each `text-sm text-muted-foreground transition-colors hover:text-foreground`.

## Assets

Local PNGs under `src/assets/`:

- **Avatars:** `avatar-1.png`, `avatar-2.png`, `avatar-3.png`.
- **Platform icons:** `icon-chatgpt.png`, `icon-perplexity.png`, `icon-google.png`.

Background videos are served from `public/assets/` (referenced by absolute `/assets/...` paths):

- Hero: `hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4`
- Mission: `hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4`
- Solution: `hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4`

The CTA background streams from the external Mux HLS source `https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8`.

> **Note on video sources:** an earlier version of this brief pointed the Hero/Mission/Solution videos at external CloudFront URLs of the form `https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/HF_20260325_*.mp4`. Those assets have since been vendored locally into `public/assets/` and are referenced by the lowercase `/assets/hf_20260325_*.mp4` paths shown above (the local filenames are lowercase; the CloudFront path segments retain their original casing). Use the local paths.

## File Structure

```
mindloop-mono-landing/
├── tailwind.config.ts
└── src/
    ├── App.tsx                         # section composition
    ├── index.css                       # tokens, liquid-glass
    ├── lib/
    │   └── motion.ts                   # fadeUp helper
    ├── components/
    │   ├── Logo.tsx                    # LogoMark (concentric circles)
    │   ├── ui/
    │   │   └── input.tsx               # shadcn Input
    │   └── sections/
    │       ├── Navbar.tsx
    │       ├── Hero.tsx
    │       ├── SearchChanged.tsx
    │       ├── Mission.tsx
    │       ├── Solution.tsx
    │       ├── CtaSection.tsx
    │       └── Footer.tsx
    ├── assets/                         # avatar-*.png, icon-*.png
    └── public/assets/                  # background MP4s
```
