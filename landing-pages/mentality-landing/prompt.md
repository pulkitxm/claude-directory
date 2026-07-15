# mėntality — Cinematic Mental-Health Landing Hero

## Overview

Build a modern, highly polished React landing page using Vite, Tailwind CSS, and Motion (Motion/React) for elegant animations. The page centers on an aesthetic hero section with a full-bleed background video that blends seamlessly into a soft `#edeef5` base, topped by a glassmorphic navigation bar. The brand is "mėntality", a mental-health resources product.

## Tech Stack

- **Framework:** React 19 (`react` `^19.1.0`, `react-dom` `^19.1.0`) with `StrictMode`.
- **Build tool:** Vite `^6.3.5` with `@vitejs/plugin-react` `^4.5.2`.
- **Styling:** Tailwind CSS `^4.1.10` via the `@tailwindcss/vite` `^4.1.10` plugin (CSS-first `@theme` configuration — no `tailwind.config.js`).
- **Animation:** Motion `^12.18.1` (imported from `motion/react` — `motion`, `AnimatePresence`).
- **Language/types:** TypeScript `^5.8.3`, `@types/react` `^19.1.8`, `@types/react-dom` `^19.1.6`.
- **Fonts:** Inter (sans / body) and Outfit (display) from Google Fonts.
- **Notable techniques:** glassmorphism (`backdrop-blur`), gradient masking to blend video into the base color, `clamp()` fluid headline sizing, an animated SVG hamburger, a blinking inline "eye/pupil" pill, and an animated language toggle.
- **Dev dependency note:** `playwright-core` `^1.60.0` is present for tooling/testing.

## Global Setup

### `package.json` scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview"
  }
}
```

### `index.html`

- `<html lang="en">`, UTF-8, responsive viewport meta.
- Meta description: `mėntality — information and resources to help you manage your mental wellbeing.`
- Title: `mėntality — mental health tools`.
- Favicon is an inline SVG data URI of the four-circle clover mark (fill `#1a1a1a`):

```html
<link
  rel="icon"
  type="image/svg+xml"
  href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='%231a1a1a'%3E%3Ccircle cx='12' cy='7.2' r='4.8'/%3E%3Ccircle cx='12' cy='16.8' r='4.8'/%3E%3Ccircle cx='7.2' cy='12' r='4.8'/%3E%3Ccircle cx='16.8' cy='12' r='4.8'/%3E%3C/g%3E%3C/svg%3E"
/>
```

- Mounts `<div id="root"></div>` and loads `<script type="module" src="/src/main.tsx"></script>`.

### Entry point — `src/main.tsx`

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

### Typography & global CSS — `src/index.css`

- Import Inter and Outfit from Google Fonts, then import Tailwind:

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Outfit:wght@300;400;500;600;700&display=swap");
@import "tailwindcss";
```

- Define theme tokens via `@theme`. Set `--font-sans` to Inter and `--font-display` to Outfit; set `--color-brand-green` to `#9fff00` and `--color-bg-base` strictly to `#edeef5`:

```css
@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Outfit", ui-sans-serif, system-ui, sans-serif;
  --color-brand-green: #9fff00;
  --color-bg-base: #edeef5;
}
```

- Apply the base background to `body` so the `#edeef5` color carries throughout the entire page:

```css
@layer base {
  body {
    @apply bg-bg-base text-zinc-900 font-sans antialiased;
  }
}
```

## Component Structure — `src/App.tsx`

Import `Navbar` and `Hero` and return a wrapper `div` containing `<Navbar />` and `<main><Hero /></main>`. The wrapper carries the classes `min-h-screen bg-bg-base selection:bg-brand-green selection:text-black`.

```tsx
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default function App() {
  return (
    <div className="min-h-screen bg-bg-base selection:bg-brand-green selection:text-black">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
}
```

## Navbar — `src/components/Navbar.tsx`

A fixed, glassmorphic header that fades from a translucent light gray into transparency.

### Container & layout

- `<header>` styling: `fixed top-0 left-0 w-full z-50 py-6 md:py-10 bg-gradient-to-b from-[#f1f1f1]/80 to-transparent backdrop-blur-[2px]`.
- Inner `<nav aria-label="Primary">` is a 12-column grid: `grid grid-cols-12 max-w-7xl mx-auto items-center gap-x-4 md:gap-x-8 px-8 md:px-16 lg:px-20`.

### Left — brand (cols 1–3)

- An `<a href="#">` brand link: `col-span-6 md:col-span-3 flex items-center gap-2.5 group`, `aria-label="mėntality — home"`.
- A geometric flower/clover SVG icon beside the brand name `mėntality` set in the display font.
- Brand wordmark span: `font-display text-xl md:text-2xl font-medium tracking-tight text-[#1a1a1a]` with text `mėntality`.

The clover icon is a reusable component drawn as four overlapping circles filled `#1a1a1a`, with a hover rotation:

```tsx
function CloverIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g fill="#1a1a1a">
        <circle cx="12" cy="7.1" r="4.9" />
        <circle cx="12" cy="16.9" r="4.9" />
        <circle cx="7.1" cy="12" r="4.9" />
        <circle cx="16.9" cy="12" r="4.9" />
      </g>
    </svg>
  );
}
```

- Icon instance classes: `w-6 h-6 md:w-7 md:h-7 transition-transform duration-500 ease-out group-hover:rotate-90`.

### Center — desktop links (cols 4–9)

- Defined once as a constant: `const NAV_LINKS = ["service", "patient resources", "about us", "education center"];`
- Rendered in a `<ul>`: `hidden md:flex col-span-6 items-center justify-center gap-6 lg:gap-9` (desktop only; hidden on mobile).
- Each link `<a href="#">`: `text-[13px] lowercase tracking-wide text-zinc-600 hover:text-[#1a1a1a] transition-colors duration-200 whitespace-nowrap`.
- Link labels (lowercase): "service", "patient resources", "about us", "education center".

### Right — actions (cols 10–12)

- Container: `col-span-6 md:col-span-3 flex items-center justify-end gap-4 lg:gap-6`.
- A "find help" anchor link (desktop only): `hidden md:inline-block text-[13px] lowercase tracking-wide text-zinc-600 hover:text-[#1a1a1a] transition-colors duration-200 whitespace-nowrap`.
- A black rounded "get started" button (anchor): `hidden sm:inline-flex items-center gap-2 bg-[#1a1a1a] text-white text-[13px] lowercase tracking-wide rounded-full pl-5 pr-4 py-2.5 transition-all duration-300 hover:bg-black hover:gap-3 whitespace-nowrap`. Text reads `get started` followed by a `&rarr;` (→) arrow span (`aria-hidden="true"`).
- An elegant animated hamburger toggle button for mobile.

### Animated hamburger toggle

- State: `const [open, setOpen] = useState(false);`
- `<button type="button">` with `onClick={() => setOpen((v) => !v)}`, `aria-expanded={open}`, `aria-controls="mobile-drawer"`, `aria-label={open ? "Close menu" : "Open menu"}`, classes `md:hidden relative w-10 h-10 -mr-2 flex flex-col items-center justify-center gap-[7px]`.
- Two `motion.span` bars, each `block w-6 h-[2px] bg-[#1a1a1a] rounded-full origin-center`:
  - Top bar animates `open ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }`.
  - Bottom bar animates `open ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }`.
  - Both use `transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}`.

### Mobile drawer

Wrapped in `AnimatePresence`; rendered when `open` is true.

- `motion.div id="mobile-drawer"` with `initial={{ opacity: 0, y: -16 }}`, `animate={{ opacity: 1, y: 0 }}`, `exit={{ opacity: 0, y: -16 }}`, `transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}`, classes `md:hidden absolute top-full left-0 w-full px-4`.
- Inner panel `div`: `rounded-2xl bg-white/95 backdrop-blur-2xl border border-white/60 shadow-[0_24px_48px_-16px_rgba(26,26,26,0.18)] p-6`.
- A `<ul className="flex flex-col">` iterating over `[...NAV_LINKS, "find help"]`. Each item is a `motion.li` with `initial={{ opacity: 0, x: -10 }}`, `animate={{ opacity: 1, x: 0 }}`, `transition={{ delay: 0.06 * i + 0.08, duration: 0.3 }}`, classes `border-b border-black/[0.06] last:border-none`. Each contains an `<a href="#">` (closing the drawer on click) with classes `block py-3.5 font-display text-lg lowercase text-[#1a1a1a]`.
- A trailing `motion.a` "get started" CTA: `initial={{ opacity: 0, y: 8 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ delay: 0.4, duration: 0.3 }}`, classes `mt-5 flex items-center justify-center gap-2 bg-[#1a1a1a] text-white text-sm lowercase tracking-wide rounded-full py-3.5`. Text `get started` followed by a `&rarr;` (→) span (`aria-hidden="true"`). Closes the drawer on click.

## Hero — `src/components/Hero.tsx`

### Section shell

```tsx
<section className="relative min-h-[110vh] sm:min-h-[140vh] w-full flex flex-col items-center justify-start overflow-hidden bg-bg-base">
```

Ensure there are no artificial margins/padding below the video so it occupies exactly 100% of the hero viewport, while the `#edeef5` base anchors the entire page cleanly.

### Background video container

- Absolute wrapper: `absolute top-[15vh] sm:top-[20vh] left-0 w-full h-[95vh] sm:h-[120vh] z-0 pointer-events-none`.
- The video element: `<video autoPlay loop muted playsInline src={VIDEO_SRC} className="w-full h-full object-cover opacity-100" />`.
- **Video source:** the asset is vendored locally and referenced via:

  ```tsx
  const VIDEO_SRC =
    "/assets/hf_20260603_132049_036591b8-6e92-4760-b94c-a7ea6eef315c.mp4";
  ```

  This was originally sourced from the CloudFront URL `https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260603_132049_036591b8-6e92-4760-b94c-a7ea6eef315c.mp4`. (Host/scheme lowercased; the path is reproduced verbatim from the original prompt, which was all-caps — the local vendored file is the ground-truth runtime source.)

- **Gradient mask:** inside the wrapper, below the video, add `<div className="absolute top-0 left-0 w-full h-24 sm:h-32 bg-gradient-to-b from-bg-base to-transparent"></div>` to smoothly blend the top of the video into the `#edeef5` background.

### Hero content alignment

- Content grid wrapper: `max-w-7xl w-full mx-auto px-8 md:px-16 lg:px-20 relative z-10 grid grid-cols-12 gap-x-4 md:gap-x-8 pt-28 sm:pt-32 md:pt-44`.
- Text column: `col-span-12 md:col-span-10 md:col-start-2`.

### Hero header (`motion.h1`)

- Animation: `initial={{ opacity: 0, y: 15 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.8 }}` (slide-up fade).
- Classes: `font-display font-medium tracking-[-0.02em] text-[clamp(30px,4.3vw,56px)] leading-[1.12]`.
- Exact text formatting (with per-segment colors and line breaks):
  - `[#1a1a1a]` — "Remix: Mentality offers"
  - `[#8e8e8e]` — "information"
  - *(line break)*
  - `[#8e8e8e]` — "and resources to help you manage"
  - *(line break)*
  - `[#8e8e8e]` — "your" `<EyePill />` "mental wellbeing."

```tsx
<motion.h1 /* … */ className="font-display font-medium tracking-[-0.02em] text-[clamp(30px,4.3vw,56px)] leading-[1.12]">
  <span className="text-[#1a1a1a]">Remix: Mentality offers</span>{" "}
  <span className="text-[#8e8e8e]">information</span>
  <br />
  <span className="text-[#8e8e8e]">
    and resources to help you manage
  </span>
  <br />
  <span className="text-[#8e8e8e]">
    your <EyePill /> mental wellbeing.
  </span>
</motion.h1>
```

### EyePill — inline "pupil" element

Between "your" and "mental", render an inline pill-shaped visual: a rounded-full bordered capsule containing a tiny solid black dot that blinks.

```tsx
function EyePill() {
  return (
    <span className="w-[16px] md:w-[42px] lg:w-[62px] h-[16px] md:h-[26px] lg:h-[34px] border-[2px] border-[#1a1a1a] rounded-full inline-flex items-center justify-center align-middle mx-1 md:mx-2 overflow-hidden">
      <motion.span
        aria-hidden="true"
        animate={{ scaleY: [1, 1, 0.12, 1] }}
        transition={{
          duration: 3.4,
          times: [0, 0.9, 0.95, 1],
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-2 h-2 rounded-full bg-black block"
      />
    </span>
  );
}
```

- Pill: `w-[16px] md:w-[42px] lg:w-[62px]` wide, `h-[16px] md:h-[26px] lg:h-[34px]` tall, `border-[2px] border-[#1a1a1a] rounded-full inline-flex items-center justify-center align-middle mx-1 md:mx-2 overflow-hidden`.
- Dot: `w-2 h-2 rounded-full bg-black block`, with a blink loop (`scaleY: [1, 1, 0.12, 1]`, `duration: 3.4`, `times: [0, 0.9, 0.95, 1]`, `repeat: Infinity`, `ease: "easeInOut"`).

### Search pill

A delayed slide-up capsule beneath the header text.

- `motion.div` animation: `initial={{ opacity: 0, y: 15 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.8, delay: 0.15 }}`.
- Classes: `bg-white rounded-[6px] border border-black/[0.05] p-1 pl-4 flex items-center shadow-sm mt-8 md:mt-10 w-full max-w-sm md:max-w-md focus-within:shadow-md transition-shadow duration-300`.
- An `<input type="text" placeholder="Ask me anything..." aria-label="Ask me anything">` with a transparent background so it looks integrated: `flex-1 min-w-0 bg-transparent outline-none border-none text-sm md:text-[15px] text-zinc-800 placeholder:text-zinc-400 py-2 pr-3`.
- Trailing action button: `<button type="button" aria-label="Submit question" className="bg-[#1a1a1a] text-white w-9 h-9 rounded-full relative shrink-0 transition-transform duration-300 hover:scale-105 active:scale-95">` containing an SVG chevron/arrow icon:

```tsx
<svg
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="absolute inset-0 m-auto w-4 h-4"
  aria-hidden="true"
>
  <path d="M9 6l6 6-6 6" />
</svg>
```

### Architectural edge anchors

**Language switcher pill (absolute middle-right edge).** A glassmorphic pill for language switching between `pl` and `en`.

```tsx
function LanguagePill() {
  const [lang, setLang] = useState<"pl" | "en">("en");
  const option = (code: "pl" | "en") => (
    <button
      type="button"
      onClick={() => setLang(code)}
      aria-pressed={lang === code}
      className={`px-2.5 py-1 rounded-full lowercase transition-colors duration-300 ${
        lang === code
          ? "bg-[#1a1a1a] text-white"
          : "text-zinc-600 hover:text-[#1a1a1a]"
      }`}
    >
      {code}
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.5 }}
      className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 flex items-center gap-0.5 rounded-full bg-white/30 backdrop-blur-md border border-white/50 shadow-sm p-1 text-[11px] tracking-wide"
      aria-label="Switch language"
    >
      {option("pl")}
      <span aria-hidden="true" className="text-zinc-500/70 select-none">
        &mdash;
      </span>
      {option("en")}
    </motion.div>
  );
}
```

- Default selected language is `en`. The two options `pl` and `en` are separated by an `&mdash;` (—) divider. The selected option is `bg-[#1a1a1a] text-white`; unselected is `text-zinc-600 hover:text-[#1a1a1a]`.

**Bottom-left corner — "2024".** A `motion.span`: `initial={{ opacity: 0 }}`, `animate={{ opacity: 1 }}`, `transition={{ duration: 0.7, delay: 0.6 }}`, classes `absolute bottom-5 left-6 md:left-8 z-20 text-[11px] tracking-[0.18em] text-zinc-700/80 select-none`. Text: `2024`.

**Bottom-right corner — "mental health tools".** A `motion.span`: `initial={{ opacity: 0 }}`, `animate={{ opacity: 1 }}`, `transition={{ duration: 0.7, delay: 0.6 }}`, classes `absolute bottom-5 right-6 md:right-8 z-20 text-[11px] lowercase tracking-[0.18em] text-zinc-700/80 select-none`. Text: `mental health tools`.

## Color Palette

- **Base background:** `#edeef5` (`--color-bg-base`).
- **Brand green (selection highlight):** `#9fff00` (`--color-brand-green`).
- **Ink / primary text & icon fill:** `#1a1a1a`.
- **Muted headline text:** `#8e8e8e`.
- **Navbar gradient top:** `#f1f1f1` at 80% opacity (`from-[#f1f1f1]/80`).
- **Body text:** `text-zinc-900`; secondary/links `text-zinc-600`; placeholders `text-zinc-400`; edge anchors `text-zinc-700/80`.

## Animation Summary

- **Navbar hamburger:** two bars rotate ±45° and shift on `y` to form an X; `duration: 0.3`, `ease: [0.32, 0.72, 0, 1]`.
- **Mobile drawer:** slides down with `y: -16 → 0` fade; `duration: 0.35`, `ease: [0.32, 0.72, 0, 1]`. Drawer links stagger in from the left (`x: -10 → 0`, `delay: 0.06 * i + 0.08`); CTA fades up (`delay: 0.4`).
- **Brand clover:** rotates 90° on hover (`duration-500 ease-out`).
- **Hero headline:** slide-up fade `y: 15 → 0`, `duration: 0.8`.
- **EyePill dot:** blinks via `scaleY: [1, 1, 0.12, 1]`, `duration: 3.4`, looping forever.
- **Search pill:** slide-up fade `y: 15 → 0`, `duration: 0.8`, `delay: 0.15`.
- **Language pill:** slide-in fade `x: 12 → 0`, `duration: 0.7`, `delay: 0.5`.
- **Edge anchor labels ("2024", "mental health tools"):** fade in, `duration: 0.7`, `delay: 0.6`.

## File Structure

```
mentality-landing/
├── index.html
├── package.json
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    └── components/
        ├── Navbar.tsx
        └── Hero.tsx
```
