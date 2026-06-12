# Mainframe — Interactive Contact Hero Section

## Overview

Build a modern, interactive "get in touch" hero section for a fictional studio named **Mainframe**. The page pairs a full-bleed background video (scrubbed by horizontal mouse movement on desktop, autoplayed on mobile) with a typewriter headline, an animated description, and a multi-select set of service "pills" that reveal a contextual confirmation banner. The layout is responsive: a stacked single column on mobile and a layered full-screen composition on large screens.

## Tech Stack

- **Framework:** React 18 (`react` / `react-dom` `^18.3.1`) with TypeScript (`^5.6.3`).
- **Build tool:** Vite (`^5.4.10`) with `@vitejs/plugin-react` (`^4.3.3`).
- **Styling:** Tailwind CSS (`^3.4.14`) with `postcss` (`^8.4.49`) and `autoprefixer` (`^10.4.20`).
- **Animation:** Motion / Framer Motion (`motion` `^12.0.0`), imported from `motion/react` (`motion`, `AnimatePresence`).
- **Icons:** Lucide (`lucide-react` `^0.460.0`) — `Check` and `ArrowRight`.
- **Font:** Inter (loaded from Google Fonts).
- **Notable techniques:** native HTML5 video scrubbing via `video.currentTime` driven by `mousemove` deltas; a custom typewriter hook built on `setTimeout` + `setInterval`; `AnimatePresence` mode swapping.

## Global Setup

### Fonts and global animations

Import the Inter font from Google Fonts and configure Tailwind to use it by default via a `--font-sans` CSS variable. Define a `blink` keyframe animation for the typewriter cursor and expose it as an `.animate-blink` utility class.

`src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.animate-blink {
  animation: blink 1s step-end infinite;
}
```

## Page Structure and Layout

Wrap the entire application in a container `<div>` with these classes:

```
relative bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen
```

The container holds, in order: the `Navbar`, the `BackgroundVideo`, and the content layer.

### Content layout container

Below the background video and positioned relative to it, add a content grouping layer:

```html
<div className="relative z-10 flex flex-col order-first lg:order-none w-full bg-white lg:bg-transparent pb-8 lg:pb-0 lg:min-h-screen">
```

Inside it, the overarching layout `<main>`:

```html
<main id="spade-hero" className="w-full max-w-7xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center">
```

This `<main>` contains three stacked `motion.div` blocks (headline, description, service pills), each animating in with `initial={{ opacity: 0, y: 20 }}`, `animate={{ opacity: 1, y: 0 }}`, and a `transition` of `duration: 0.6`. The description uses `delay: 0.1`.

## Background Video Component (`src/components/BackgroundVideo.tsx`)

A `<div>` containing a `<video>` element with native scrubbing.

### Container element classes

```
order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 lg:bg-transparent
```

### Video element

Use `<video>` with `muted`, `playsInline`, and `preload="auto"`. Classes:

```
w-full h-full object-cover object-right lg:object-right-bottom
```

**Video source:** the clip is vendored locally and served from `/assets/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4`.

> Note: the original brief referenced this clip from an external CDN at `https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4`. The asset has since been vendored into `public/assets/` and is referenced by the local path above. (The CDN path's casing is preserved verbatim except the scheme/host.)

### Desktop mouse scrubbing hook (`useEffect`)

Listen to the `window` `mousemove` event. Implementation details:

- If `window.innerWidth < 1024`, ignore the event (scrubbing disabled on small screens).
- Store the mouse "previous X" coordinate to calculate the delta against the "current X".
- Update the target scrub time based on `(delta / window.innerWidth) * 0.8 * video.duration`. Clamp the time between `0` and `duration`. Set `video.currentTime = targetTime`.
- Bind a `seeked` event listener to ensure smooth tracking frame to frame.

### Mobile autoplay hook (`useEffect`)

Because scrubbing is disabled on mobile frames, trigger normal playback for screens `< 1024` width: set `video.autoplay = true` and call `video.play()`.

## Navbar (`src/components/Navbar.tsx`)

### Header wrapper

```html
<header className="fixed top-0 inset-x-0 z-10 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center bg-transparent">
```

### Logo (left side)

A flex row with `gap-3`, containing:

- **Wordmark:** `Mainframe®` (use the `&reg;` entity). Classes:
  `text-[21px] sm:text-[26px] tracking-tight text-black font-medium select-none`.
- **Asterisk icon** right beside it: `✳` (the `&#10033;` entity). Classes:
  `text-[25px] sm:text-[30px] text-black select-none tracking-[-0.02em] font-medium leading-none mb-1`.

### Desktop nav links (center)

A `<nav>` with classes `hidden md:flex flex-row text-[23px] text-black`. The links are `'Labs'`, `'Studio'`, `'Openings'`, `'Shop'`. Map over them, wrapping each in a `<span className="flex flex-row">` that holds:

- An `<a href="#" className="hover:opacity-60 transition-opacity">` with the label.
- A divider `<span className="opacity-40">,&nbsp;</span>` after every link except the last.

### Desktop CTA (right)

```html
<a href="#spade-hero" className="hidden md:inline-block text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity">
  Get in touch
</a>
```

### Mobile menu logic

Hook it to a local state `isMobileMenuOpen`.

**Hamburger `<button>`** visible below `md`. It contains three `w-6 h-[2px] bg-black` spans, each with `transition-all duration-300`. When open, animate the burger into an "X":

- Top bar: `rotate-45 translate-y-[7px]`
- Middle bar: `opacity-0`
- Bottom bar: `-rotate-45 -translate-y-[7px]`

**Full-screen mobile navigation overlay** `<div>`, hidden on desktop:

```
md:hidden fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm
```

When `isMobileMenuOpen` is true, apply `opacity-100 pointer-events-auto`; otherwise `opacity-0 pointer-events-none`.

## Typewriter Hook and Headline

### Typewriter hook (`src/hooks/useTypewriter.ts`)

Implement a custom `useTypewriter(text, speed = 38, startDelay = 600)` hook. It uses `setTimeout` and `setInterval` to iteratively build a string slice by slice. It must return an object: `{ displayed: string, done: boolean }`.

### Headline

In `App.tsx`, run the hook with the headline string:

```ts
const HEADLINE_TEXT = "we'd love to\nhear from you!";
const { displayed, done } = useTypewriter(HEADLINE_TEXT);
```

Wrap the headline in the first `motion.div` (drop-in: `initial={{ opacity: 0, y: 20 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.6 }}`). Render `displayed` inside:

```html
<h1 className="text-5xl md:text-6xl lg:text-[76px] font-normal tracking-tight text-black leading-[1.08] mb-8 select-none w-full whitespace-pre-wrap">
```

While typing (`!done`), append a blinking cursor span at the end of the displayed text:

```html
<span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink" />
```

## Secondary Description Text

The second `motion.div` (`transition={{ duration: 0.6, delay: 0.1 }}`) holds a `<p>`:

```html
<p className="text-lg md:text-xl text-[#5A635A] leading-relaxed font-normal mb-14 max-w-2xl">
  Whether you have questions, feedback, <br /> drop us a message and we&apos;ll get back to you as soon as
  possible.
</p>
```

## Interactive Multi-Select Service Pills (`src/components/ServicePills.tsx`)

Rendered inside the third `motion.div` of `<main>`.

Track selections with `const [services, setServices] = useState<string[]>([]);` over the options `const SERVICE_OPTIONS = ['Brand', 'Digital', 'Campaign', 'Other'];`. A `toggleService(option)` handler adds the option if absent or removes it if present, allowing multiple selections.

### Section heading

- **Title:** `<h2 className="text-2xl font-medium tracking-tight mb-2">What sort of service?</h2>`
- **Subtitle:** `<p className="opacity-85 text-[#738273] mb-8">Select all that apply</p>`

### Pills

A flex-wrap container: `<div className="flex flex-wrap gap-3 mb-7">`. Map over `SERVICE_OPTIONS` rendering a `motion.button` for each:

- `type="button"`, `onClick={() => toggleService(option)}`, `whileTap={{ scale: 0.96 }}`.
- Base classes: `flex items-center gap-2 px-6 py-3 rounded-full text-base font-medium transition-colors duration-200`.
- **Active** (selected) classes: `bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/5 transform`.
- **Inactive** classes: `bg-white text-[#1C2E1E] border border-[#F1F3F1] hover:bg-[#F1F3F1]/55`.

When selected, render a check icon that drops in via an `AnimatePresence initial={false}` wrapping a `motion.span`:

- `initial={{ scale: 0, opacity: 0, y: -8 }}`, `animate={{ scale: 1, opacity: 1, y: 0 }}`, `exit={{ scale: 0, opacity: 0 }}`.
- `transition={{ type: 'spring', stiffness: 300, damping: 20 }}`, classes `flex items-center justify-center`.
- Inside: `<Check size={15} strokeWidth={3} aria-hidden="true" />` from `lucide-react`.

The option label text follows the check span. The icon span appears before the label.

### Contingent feedback status banner

Underneath the pills, an `<AnimatePresence mode="wait">` that switches on `services.length`:

**Empty state** — a placeholder `motion.p` (`key="placeholder"`):

- `initial={{ opacity: 0 }}`, `animate={{ opacity: 0.5 }}`, `exit={{ opacity: 0 }}`, `transition={{ duration: 0.25 }}`.
- Classes: `italic text-xs text-[#1C2E1E]`.
- Text: `Please click to select services above.`

**Active selection** — a `motion.div` (`key="banner"`) that springs its height open:

- `initial={{ opacity: 0, height: 0 }}`, `animate={{ opacity: 1, height: 'auto' }}`, `exit={{ opacity: 0, height: 0 }}`.
- Springs the height open with a `type: 'spring'` transition, classes `overflow-hidden max-w-2xl`.

Inside, an acknowledgment banner:

```html
<div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 bg-[#FAFBF9] border border-[#ECF0EB] rounded-2xl px-6 py-4">
  <p className="text-sm text-[#1C2E1E]">
    Ready to inquire about: <span className="font-medium">{services.join(', ')}</span>
  </p>
  <button
    type="button"
    className="flex items-center gap-1.5 text-[#4D6D47] uppercase text-xs font-semibold tracking-[0.08em] hover:opacity-70 transition-opacity"
  >
    Let&apos;s Go
    <ArrowRight size={14} aria-hidden="true" />
  </button>
</div>
```

The displayed selection list is `services.join(', ')`. The CTA button reads `Let's Go` followed by an `ArrowRight` icon (`size={14}`) from `lucide-react`.

## Color Palette

- `#EAECE9` — selection background.
- `#1C2E1E` — selection text, active pill background, inactive/banner text, placeholder text.
- `#5A635A` — secondary description text.
- `#738273` — service subtitle text.
- `#F1F3F1` — inactive pill border and hover background (`/55` opacity on hover).
- `#FAFBF9` — banner background.
- `#ECF0EB` — banner border.
- `#4D6D47` — banner CTA text.
- `bg-black` / `text-black` — logo, headline, cursor, hamburger bars.
- `bg-white`, `text-neutral-900`, `bg-neutral-50`, `bg-white/95` — surfaces.
- `shadow-emerald-950/5` — active pill shadow tint.
