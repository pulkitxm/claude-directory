# Astra — Cinematic Space-Travel Landing Page

## Overview

Build a single-page space-travel landing site with two full-height sections — a hero and a capabilities showcase — both layered over looping background videos that crossfade via a custom rAF-driven JavaScript routine (no CSS transitions). The page shares a "liquid glass" design system for all chrome (nav, chips, cards, CTAs) and uses Motion (Framer Motion) for entrance animations, including a word-by-word blur-in headline. All text is white over full-bleed video with no dark overlay; contrast comes entirely from the liquid-glass chrome.

## Tech Stack

- **Runtime / framework:** React 18.3.1 (UMD development build, loaded from CDN — no bundler).
- **JSX compilation:** in-browser via Babel Standalone 7.29.0; every component is a `<script type="text/babel">` file that exports itself onto `window.X = X`.
- **Animation:** Framer Motion 11.11.17 (UMD build, exposed as `window.Motion`).
- **Styling:** Tailwind CSS via the CDN `<script>` (`https://cdn.tailwindcss.com`) with an inline `tailwind.config`, plus a hand-written `<style>` block for the liquid-glass utilities.
- **Fonts:** Google Fonts — Instrument Serif (`ital@0;1`) for headings, Barlow (`wght@300;400;500;600`) for body.
- **Mount point:** a React app mounted on `#root` via `ReactDOM.createRoot`.
- **Notable techniques:** custom rAF crossfade looping video, IntersectionObserver-triggered blur-in text, liquid-glass gradient borders via a masked `::before` pseudo-element.

## Global Setup

### `index.html`

- `<html lang="en">`, charset UTF-8, responsive viewport meta.
- `<title>`: `astra — Venture Past Our Sky`.
- Favicon: an inline SVG data URI — a black `rounded` rect (`rx='16'`) with an italic Georgia serif lowercase white `a` centered.
- Body: `<body class="bg-black antialiased">` containing only `<div id="root"></div>` followed by the script tags.
- `html, body { background: #000; }` set in the `<style>` block.

### CDN scripts (pinned, CDN-only)

Load in this order inside `<head>`:

```html
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>
<script src="https://unpkg.com/framer-motion@11.11.17/dist/framer-motion.js"></script>
<script>window.Motion = window.FramerMotion;</script>
```

### Fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Barlow:wght@300;400;500;600&display=swap" rel="stylesheet" />
```

### Tailwind config

Inline before the components, extend the theme:

```js
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Instrument Serif"', 'serif'],
        body: ['Barlow', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '9999px',
      },
    },
  },
};
```

- `font-heading` → `'Instrument Serif', serif` (always used italic).
- `font-body` → `'Barlow', sans-serif`.
- Default border-radius override `DEFAULT: '9999px'` so a bare `rounded` becomes a pill.

### Framer Motion dev-warning suppression

Framer Motion's dev warnings about list keys are benign; filter them out with a `console.error` wrapper:

```js
(function () {
  var origError = console.error;
  console.error = function () {
    var first = arguments[0];
    if (typeof first === 'string' && (first.indexOf('unique "key" prop') !== -1 || first.indexOf('Each child in a list') !== -1)) return;
    origError.apply(console, arguments);
  };
})();
```

### Component script load order

At the end of `<body>`, load each Babel component file in order:

```html
<script type="text/babel" src="js/icons.js"></script>
<script type="text/babel" src="js/FadingVideo.js"></script>
<script type="text/babel" src="js/BlurText.js"></script>
<script type="text/babel" src="js/Navbar.js"></script>
<script type="text/babel" src="js/Hero.js"></script>
<script type="text/babel" src="js/Capabilities.js"></script>
<script type="text/babel" src="js/App.js"></script>
```

## Liquid-Glass Utilities

Two variants in the `<style>` block — `.liquid-glass` (subtle, for nav / chips / cards) and `.liquid-glass-strong` (heavier blur, for the primary CTA). Each draws a gradient border via a masked `::before` pseudo-element.

```css
.liquid-glass {
  background: rgba(255,255,255,0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: none;
  box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
  position: relative;
  overflow: hidden;
}
.liquid-glass::before {
  content: "";
  position: absolute; inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(180deg,
    rgba(255,255,255,0.45) 0%,
    rgba(255,255,255,0.15) 20%,
    rgba(255,255,255,0) 40%,
    rgba(255,255,255,0) 60%,
    rgba(255,255,255,0.15) 80%,
    rgba(255,255,255,0.45) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
.liquid-glass-strong {
  background: rgba(255,255,255,0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  border: none;
  box-shadow: 4px 4px 4px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.15);
  position: relative;
  overflow: hidden;
}
.liquid-glass-strong::before {
  content: "";
  position: absolute; inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(180deg,
    rgba(255,255,255,0.5) 0%,
    rgba(255,255,255,0.2) 20%,
    rgba(255,255,255,0) 40%,
    rgba(255,255,255,0) 60%,
    rgba(255,255,255,0.2) 80%,
    rgba(255,255,255,0.5) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

- The strong variant is identical to the subtle one except for: `backdrop-filter: blur(50px)`, the box-shadow (`4px 4px 4px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.15)`), and the `::before` gradient stops (`0.5 / 0.2 / 0 / 0 / 0.2 / 0.5`).

## Icons — `js/icons.js`

Inline Lucide-style SVG icons (currentColor stroke) plus Material Icon glyphs. Each is assigned to `window`. Wrap everything in an IIFE.

- **`ArrowUpRight({ className })`** — `24×24`, `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `strokeWidth="2"`, round caps/joins, `aria-hidden`. Two paths: `M7 17L17 7` and `M7 7h10v10`.
- **`PlayIcon({ className })`** — `24×24`, `viewBox="0 0 24 24"`, `fill="currentColor"`, `stroke="none"`, `aria-hidden`. Filled polygon `points="6 4 20 12 6 20 6 4"`.
- **`ClockIcon`** — a white `28×28` outline SVG icon (the clock), used for stat card 1.
- **`GlobeIcon`** — a white `28×28` outline SVG icon (the globe), used for stat card 2.
- **Material Icons SVG** — a white Material Icons SVG (`fill currentColor`, `h-6 w-6 text-white`), used inside the capability cards.

## FadingVideo — `js/FadingVideo.js`

Custom JS crossfade looping video. No CSS transitions: every fade is rAF-driven, and looping is implemented manually via the `ended` event (the native `loop` attribute is OFF).

- Constants: `FADE_MS = 500`, `FADE_OUT_LEAD = 0.55` (seconds before the end to start fading out).
- `FadingVideo({ src, className, style })` renders `<video ref muted autoPlay playsInline preload="auto" />` with `style={{ opacity: 0, ...style }}` (starts at `opacity: 0`).
- Refs via `React.useRef`: `videoRef`, `rafRef` (current rAF id), `fadingOutRef` (boolean).
- All wiring lives in a `React.useEffect(..., [src])`.

**`fadeTo(target, duration = FADE_MS)`:**
- If `rafRef.current !== null`, call `cancelAnimationFrame(rafRef.current)` before starting (so a new fade interrupts the previous one).
- Read the starting value with `parseFloat(video.style.opacity || '0')` so each new fade resumes from wherever the last one left off.
- Use `performance.now()` for the start time; in each `requestAnimationFrame` tick compute `t = Math.min((now - start) / duration, 1)`, set `video.style.opacity = String(from + (target - from) * t)`, and continue requesting frames until `t >= 1`, then set `rafRef.current = null`.

**Event handlers:**
- `loadeddata`: set `opacity = '0'`, `video.play().catch(() => {})`, then `fadeTo(1)`.
- `timeupdate`: `remaining = video.duration - video.currentTime`; if `!fadingOutRef.current && remaining <= FADE_OUT_LEAD && remaining > 0`, set `fadingOutRef.current = true` and `fadeTo(0)`.
- `ended`: set `opacity = '0'`, then after `setTimeout(..., 100)` reset `currentTime = 0`, `play()`, clear `fadingOutRef.current = false`, and `fadeTo(1)`.
- If `video.readyState >= 2` when listeners attach, call `onLoadedData()` immediately.

**Cleanup on unmount:** cancel the rAF (`cancelAnimationFrame(rafRef.current)`) and remove all three listeners.

## BlurText — `js/BlurText.js`

Word-by-word blur-in headline, triggered at 10% visibility. Pulls `const { motion } = window.Motion`. Constant `STEP_DURATION = 0.35`.

- `BlurText({ text, className, delay = 100 })`.
- An IntersectionObserver with `{ threshold: 0.1 }` sets `inView = true` on first intersection, then `observer.unobserve(el)`; disconnect on cleanup.
- Split the text on spaces: `const words = text.split(' ')`.
- Render a `<p ref className>` styled `display: flex; flexWrap: wrap; justifyContent: center; rowGap: 0.1em`.
- Each word is a `motion.span` with `key={`${word}-${i}`}`:
  - `initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}`.
  - When in view, animate keyframes:
    ```js
    {
      filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
      opacity: [0, 0.5, 1],
      y: [50, -5, 0],
    }
    ```
    Otherwise stay at `{ filter: 'blur(10px)', opacity: 0, y: 50 }`.
  - `transition={{ duration: STEP_DURATION * 2, times: [0, 0.5, 1], ease: 'easeOut', delay: (i * delay) / 1000 }}`.
  - `style={{ display: 'inline-block', marginRight: '0.28em' }}` — `marginRight` is used instead of a non-breaking space because the `-4px` letter-spacing eats an nbsp.

## Navbar — `js/Navbar.js`

Floating liquid-glass chrome. Pulls `const { ArrowUpRight } = window`. `NAV_LINKS = ['Home', 'Voyages', 'Worlds', 'Innovation', 'Plan Launch']`.

- `<nav>` classes: `fixed top-4 left-0 right-0 z-50 px-8 lg:px-16 flex items-center justify-between`.
- **Logo (left):** an `<a href="#" aria-label="astra home">` with `liquid-glass rounded-full w-12 h-12 flex items-center justify-center shrink-0`. Inside: `<span class="font-heading italic text-white text-2xl leading-none -translate-y-px">a</span>` (italic serif lowercase "a").
- **Center pill (desktop only):** `<div class="hidden md:flex items-center liquid-glass rounded-full px-1.5 py-1.5">` holding:
  - The 5 nav links, each `<a href="#" key={link}>` with `px-3 py-2 text-sm font-medium text-white/90 font-body whitespace-nowrap hover:text-white`.
  - A white pill button: `<a href="#" class="flex items-center gap-1.5 bg-white text-black rounded-full px-4 py-2 text-sm font-medium font-body whitespace-nowrap">` with text `Claim a Spot` followed by `<ArrowUpRight className="h-4 w-4" />`.
- **Right:** an invisible 48×48 spacer to balance the logo — `<div class="w-12 h-12 invisible shrink-0" aria-hidden="true" />`.

## Section 1 — Hero (`js/Hero.js`)

Full-viewport section: crossfading video, navbar, blur-in headline, CTAs, stat cards, partners row. Pulls `const { motion } = window.Motion` and `const { FadingVideo, BlurText, Navbar, ArrowUpRight, PlayIcon, ClockIcon, GlobeIcon } = window`.

- `HERO_VIDEO = 'assets/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4'`.

**Entrance animation helper:** all hero content animates with Motion using:

```js
const HIDDEN = { filter: 'blur(10px)', opacity: 0, y: 20 };
const VISIBLE = { filter: 'blur(0px)', opacity: 1, y: 0 };
const enter = (delay) => ({
  initial: HIDDEN,
  animate: VISIBLE,
  transition: { duration: 0.8, delay, ease: 'easeOut' },
});
```

**Data:**

```js
const STATS = [
  { Icon: ClockIcon, value: '34.5 Min', label: 'Average Videos Watch Time' },
  { Icon: GlobeIcon, value: '2.8B+', label: 'Users Across the Globe' },
];
const PARTNERS = ['Aeon', 'Vela', 'Apex', 'Orbit', 'Zeno'];
```

### Layout

- `<section class="relative min-h-screen overflow-hidden bg-black">`.
- **Background video** — `<FadingVideo>` oversized and anchored to the top of frame (focal point is the top of the frame):
  - `src={HERO_VIDEO}`.
  - `className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0"`.
  - `style={{ width: '120%', height: '120%' }}`.
  - No overlay.
- A `z-10` layer (`<div class="relative z-10 flex flex-col min-h-screen">`) holds, in order: `<Navbar />`, the hero content (flex-1, centered), then the partners block.

### Hero content

`<div class="flex-1 flex flex-col items-center justify-center text-center pt-24 px-4">`:

- **Badge** (`enter(0.4)`): `motion.div` with `liquid-glass rounded-full flex items-center gap-3 p-1`. Contains a white pill chip `<span class="bg-white text-black rounded-full px-3 py-1 text-xs font-semibold font-body">New</span>` and `<span class="text-sm text-white/90 pr-3 font-body">Maiden Crewed Voyage to Mars Arrives 2026</span>`.
- **Headline** — `<BlurText>` with `text="Venture Past Our Sky Across the Universe"` and `className="mt-6 text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] max-w-2xl justify-center tracking-[-4px]"`.
- **Subheading** (`enter(0.8)`): `motion.p` with `mt-4 text-sm md:text-base text-white max-w-2xl font-body font-light leading-tight`. Text: `Discover the universe in ways once unimaginable. Our pioneering vessels and breakthrough engineering bring deep-space exploration within reach&mdash;secure and extraordinary.` (the `&mdash;` renders an em dash).
- **CTAs** (`enter(1.1)`): `motion.div` with `flex items-center gap-6 mt-6`:
  - Primary: `<a href="#" class="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white font-body flex items-center gap-2">` with `Start Your Voyage` + `<ArrowUpRight className="h-5 w-5" />`.
  - Secondary: bare text link `<a href="#" class="flex items-center gap-2 text-sm font-medium text-white font-body">` with `View Liftoff` + `<PlayIcon className="h-4 w-4" />`.
- **Stats row** (`enter(1.3)`): `motion.div` with `flex items-stretch gap-4 mt-8`. Map over `STATS`; each card `<div key={value} class="liquid-glass p-5 w-[220px] rounded-[1.25rem] flex flex-col items-start text-left">` renders:
  - `<Icon />` at the top (28×28 white outline icon — clock for card 1, globe for card 2).
  - A bottom block `<div class="mt-auto pt-6">` with the value `<div class="font-heading italic text-white text-4xl tracking-[-1px] leading-none">{value}</div>` and the label `<div class="text-xs text-white font-body font-light mt-2">{label}</div>`.

### Partners (bottom of hero)

`motion.div` (`enter(1.4)`) with `flex flex-col items-center gap-4 pb-8`:

- A liquid-glass chip: `<div class="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body">Collaborating with top aerospace pioneers globally</div>`.
- A row of the 5 partner names: `<div class="flex flex-wrap items-center justify-center gap-12 md:gap-16">` mapping `PARTNERS`, each `<span key={name} class="font-heading italic text-white text-2xl md:text-3xl tracking-tight">{name}</span>` — Aeon, Vela, Apex, Orbit, Zeno.

## Section 2 — Capabilities (`js/Capabilities.js`)

`min-h-screen` section: full-bleed crossfading video, oversized serif heading, three liquid-glass feature cards. Pulls `const { motion } = window.Motion` and `const { FadingVideo, MaterialIcon } = window`.

- `CAPABILITIES_VIDEO = 'assets/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4'`.

**Material icon paths:**

```js
const ICON_PATHS = {
  image:
    'M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21H5Zm1-4h12l-3.75-5-3 4L9 13l-3 4Z',
  movie:
    'M4 6.47 5.76 10H20v8H4V6.47M22 4h-4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.89-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4Z',
  lightbulb:
    'M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1Zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7Z',
};
```

**Cards data:**

```js
const CARDS = [
  {
    icon: ICON_PATHS.image,
    tags: ['Natural Context', 'Photo Realism', 'Infinite Settings', 'Eco-Vibe'],
    title: 'AI Scenery',
    body:
      'AI analyzes your product to create indistinguishable natural environments — from Icelandic cliffs to misty forests.',
  },
  {
    icon: ICON_PATHS.movie,
    tags: ['Scale Fast', 'Visual Consistency', 'Time Saver', 'Ready to Post'],
    title: 'Batch Production',
    body:
      'Style your entire product line in minutes. Create a unified visual identity for catalogues and social media without weeks of retouching.',
  },
  {
    icon: ICON_PATHS.lightbulb,
    tags: ['Ray Tracing', 'Physical Shadows', 'Studio Quality', 'Sunlight Sync'],
    title: 'Smart Lighting',
    body:
      'Automatic lighting and material adjustment. Achieve flawless integration with realistic shadows and sunlight.',
  },
];
```

**Reveal animation helper** (uses `whileInView` instead of `animate`):

```js
const HIDDEN = { filter: 'blur(10px)', opacity: 0, y: 20 };
const VISIBLE = { filter: 'blur(0px)', opacity: 1, y: 0 };
const reveal = (delay) => ({
  initial: HIDDEN,
  whileInView: VISIBLE,
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, delay, ease: 'easeOut' },
});
```

### Layout

- `<section class="relative min-h-screen overflow-hidden bg-black">`.
- **Background video** (full bleed, no 120% scale, same `FadingVideo` treatment, no overlay): `<FadingVideo src={CAPABILITIES_VIDEO} className="absolute inset-0 w-full h-full object-cover z-0" />`.
- **Content wrapper:** `<div class="relative z-10 px-8 md:px-16 lg:px-20 pt-24 pb-10 flex flex-col min-h-screen">`.

### Header (`mb-auto`)

- **Kicker** (`reveal(0)`): `motion.p` with `text-sm font-body text-white/80 mb-6`, text `// Capabilities` (rendered as the literal string `{'// Capabilities'}`).
- **Heading** (`reveal(0.15)`): `motion.h2` with `font-heading italic text-white text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px]`. Two lines with a `<br />` between: `Production` then `evolved`.

### Three cards

`<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">`, mapping `CARDS`; each is a `motion.div` with `key={card.title}`, spread `reveal(0.2 + i * 0.15)`, and class `liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col`.

- **Top row** (`flex items-start justify-between gap-4`):
  - **Left:** a nested liquid-glass square `<div class="liquid-glass rounded-[0.75rem] w-11 h-11 flex items-center justify-center shrink-0">` holding `<MaterialIcon d={card.icon} className="h-6 w-6 text-white" />`.
  - **Right:** `<div class="flex flex-wrap justify-end gap-1.5 max-w-[70%]">` mapping `card.tags`; each tag `<span key={tag} class="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap">{tag}</span>`.
- **Spacer:** `<div class="flex-1" />`.
- **Bottom** (`mt-6`):
  - `<h3 class="font-heading italic text-white text-3xl md:text-4xl tracking-[-1px] leading-none">{card.title}</h3>`.
  - `<p class="mt-3 text-sm text-white/90 font-body font-light leading-snug max-w-[32ch]">{card.body}</p>`.

Card titles: **AI Scenery**, **Batch Production**, **Smart Lighting**. Tags and body copy are listed in the `CARDS` data above.

## App — `js/App.js`

Mounts the page on `#root`:

```jsx
function App() {
  return (
    <main className="bg-black">
      <Hero />
      <Capabilities />
    </main>
  );
}
window.App = App;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

## Color Palette

- Page / section background: `#000` (black) — `bg-black` and `html, body { background: #000; }`.
- All text: white (`text-white`, `text-white/90`, `text-white/80`).
- White-on-black chips/buttons: `bg-white text-black`.
- Liquid-glass surfaces: `rgba(255,255,255,0.01)` fill with white-gradient borders and `rgba(255,255,255,0.1)`–`0.15` inset highlights.
- No green, no gradient page backgrounds.

## File Structure

```
space-voyage-landing/
├── index.html
├── assets/
│   ├── hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4   (hero video)
│   └── hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4   (capabilities video)
└── js/
    ├── icons.js          (ArrowUpRight, PlayIcon, ClockIcon, GlobeIcon, MaterialIcon)
    ├── FadingVideo.js
    ├── BlurText.js
    ├── Navbar.js
    ├── Hero.js
    ├── Capabilities.js
    └── App.js
```

## Notes

- All text is white; no green, no gradient backgrounds.
- No CSS transitions on the videos — fades must be rAF-driven per the FadingVideo spec.
- Videos are full-bleed with no dark overlay; contrast comes from the liquid-glass chrome.
- Framer Motion dev warnings about list keys can be suppressed with the `console.error` filter wrapper — they are benign.
- The two background videos are vendored locally under `assets/` and referenced with relative paths (`assets/hf_20260418_...mp4`). The filenames are lowercase; keep the casing exactly as shown.
