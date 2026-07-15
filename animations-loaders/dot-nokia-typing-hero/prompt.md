# dot. — Nokia Typing Hero Landing Page

## Overview

Build a single-screen React landing page for "dot.", a calm-messaging product. The hero features a full-bleed background video of a Nokia-style phone, with a live typing/deleting animation rendered in a Nokia cellphone font overlaid precisely on the phone screen. A floating pill navbar sits at the top. Build the page exactly as specified below.

## Tech Stack

- **Framework:** React 19.
- **Styling:** Tailwind CSS v4. Single `@import "tailwindcss";` entry in `src/index.css`.
- **Animation:** Motion, imported as `motion/react`.
- **Fonts:** Instrument Serif (display/headlines), Inter (body/UI), and a custom Nokia Cellphone FC Small font (typing animation).
- **Notable techniques:** Typewriter effect with `useState` + `useEffect` + `setTimeout`; HTML5 background `<video>`; backdrop-blur glass navbar; layered absolute positioning to place text on the in-video phone screen.

## Global Setup

### Fonts (`index.html`)

Import these Google Fonts:

- **Instrument Serif** — weights 400 + italic 400.
- **Inter** — weights 100 to 900.

### Custom Nokia font (`src/index.css`)

Import the custom Nokia text font via a remote `@import`:

```css
@import url('https://db.onlinewebfonts.com/c/440b53b1a1c65037f944ff19259d8014?family=Nokia+Cellphone+FC+Small');
```

### Tailwind theme variables (`src/index.css`)

Start the file with `@import "tailwindcss";`, then configure the theme:

```css
@theme {
  --font-instrument: "Instrument Serif", serif;
  --font-serif: "Instrument Serif", serif;
  --font-sans: "Inter", sans-serif;
  --font-nokia: "Nokia Cellphone FC Small", monospace;
}
```

Create a custom utility for the instrument font:

```css
@utility font-instrument {
  font-family: "Instrument Serif", serif;
}
```

Set the root font-family to `var(--font-sans)` and apply anti-aliasing:

```css
:root {
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
```

## Component Structure

Create one main `src/App.tsx` file containing four components: `TypingMessages`, `Navbar`, `Hero`, and `App`.

## `App` Component

Renders the page wrapper, then the navbar and hero:

```tsx
export default function App() {
  return (
    <div className="min-h-screen bg-[#F3F4ED]">
      <Navbar />
      <Hero />
    </div>
  );
}
```

## `Navbar` Component

- **Container** (`<header>`): fixed to the top `top-6`, centered horizontally `left-1/2 -translate-x-1/2`, width 95% `w-[95%]` `max-w-5xl`, `z-50`, `pointer-events-none`.
- **Nav** (`<nav>`): `pointer-events-auto`, backdrop blur (`backdrop-blur-md`), rounded full pill shape (`rounded-full`), transparent background (`bg-transparent`) with border `border border-black/10`. Flex with items spaced between: `flex items-center justify-between`. Padding `pl-7 pr-2.5 py-2.5`.
- **Logo:** text `dot.` styled `font-instrument text-[28px] tracking-tight text-[#1a1a1a]`.
- **Links:** `Philosophy`, `Trust`, `Access`, `Tribe`. Hidden on mobile, flex on desktop (`gap-10`). Styled `font-sans text-[14px] text-[#1a1a1a]` with hover opacity fading.
- **CTA button** (`Link up`):
  - Background `#0871E7`, rounded full, white text `font-sans text-[14px]`.
  - Shadow: `shadow-[inset_0_-4px_4px_rgba(255,255,255,0.39)] outline-1 outline-[#0871E7] -outline-offset-1`.
  - **Top glint:** an absolutely positioned rectangle inside the button: `w-[80%] h-4 left-[10%] top-[1px] bg-gradient-to-b from-[#DEF0FC] to-transparent rounded-[12px]` — it scales wider on group hover (`group-hover:scale-x-105`).

Define the links as:

```tsx
const NAV_LINKS = ["Philosophy", "Trust", "Access", "Tribe"];
```

## `Hero` Component

- **Container** (`<section>`): `relative min-h-screen bg-[#F3F4ED] pt-24 md:pt-32 flex flex-col items-center overflow-hidden`.
- **Video background:** an HTML5 `<video>` with `absolute inset-0 z-0 w-full h-full object-cover`, set to `autoPlay`, `loop`, `muted`, `playsInline`.
  - Video source, exactly (case-preserved):
    `https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260427_054418_a6d194f0-ac86-4df9-abe5-ded73e596d7c.mp4`
- **Tint overlay:** an empty `<div aria-hidden="true">` with `absolute inset-0 z-10 bg-white/5` for a slight tint.
- **Hero text container:** `relative z-20 pointer-events-none text-center px-6`.
- **Main headline:** `Short notes. <br /> Daily calm.`
  - Wrapped in a `motion.div` animating from `{ opacity: 0, scale: 0.95 }` to `{ opacity: 1, scale: 1 }` over `duration: 1.5` with `ease: [0.16, 1, 0.3, 1]`.
  - Heading (`<h1>`) style: `font-instrument text-[38px] md:text-[56px] lg:text-[72px] leading-[0.85] tracking-tight text-[#1a1a1a] mb-6`.
- **Sub-headline:** `Linked with a single anonymous peer. One message every day. A quiet rhythm in the digital noise.`
  - Wrapped in a `motion.div` animating from `{ opacity: 0, y: 20 }` to `{ opacity: 1, y: 0 }` over `duration: 1.2`, `delay: 0.3`, `ease: [0.16, 1, 0.3, 1]`.
  - Paragraph (`<p>`) style: `font-sans text-[16px] md:text-[18px] text-[#1a1a1a]/70 leading-relaxed font-normal max-w-xl mx-auto`.
- Render the `TypingMessages` component last, inside the hero, so it overlaps the phone screen in the video.

## `TypingMessages` Component

A typewriter effect that types and deletes a cycle of short messages on the Nokia phone screen visible in the hero video.

- **Messages & timing constants:**
  ```ts
  const MESSAGES = ["Are you here?", "Yes, I am.", "Speak soon."];
  const TYPING_SPEED_MS = 100;
  const DELETING_SPEED_MS = 50;
  const PAUSE_BEFORE_DELETE_MS = 2000;
  ```
- **State:** `messageIndex` (current message, starts `0`), `text` (currently displayed substring, starts `""`), `isDeleting` (boolean, starts `false`).
- **Logic** (`useEffect` keyed on `[text, isDeleting, messageIndex]`):
  - If not deleting and `text.length < message.length`: after `TYPING_SPEED_MS`, append the next character (`message.slice(0, text.length + 1)`).
  - If not deleting and the full message is shown: after `PAUSE_BEFORE_DELETE_MS`, set `isDeleting` to `true`.
  - If deleting and `text.length > 0`: after `DELETING_SPEED_MS`, remove the last character (`message.slice(0, text.length - 1)`).
  - If deleting and text is empty: immediately (`0` ms) set `isDeleting` to `false` and advance to the next message with `(i + 1) % MESSAGES.length`.
  - Always `clearTimeout(timeout)` in the effect cleanup.
- **Positioning** (wrapper `<div>`): absolutely positioned to sit on the phone screen — `absolute left-[48.5%] md:left-[47.5%] lg:left-[48.5%] -translate-x-1/2 bottom-[32%] z-30 w-[110px] sm:w-[130px] flex justify-start text-left`.
- **Text style** (`<p>`): `font-nokia text-[#2A3616] text-[10px] sm:text-[14px] leading-tight break-words min-h-[1.5em]`. Renders `{text}` followed by the cursor.
- **Cursor:** a blinking `motion.span` styled `inline-block w-1.5 h-3 bg-[#2A3616] ml-1 align-middle`, with `animate={{ opacity: [0, 1, 0] }}` and `transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}`.

## Color Palette

- **Page / hero background:** `#F3F4ED`
- **Primary text (ink):** `#1a1a1a` (sub-headline uses 70% opacity via `text-[#1a1a1a]/70`)
- **CTA blue:** `#0871E7`
- **CTA glint gradient start:** `#DEF0FC` (to transparent)
- **CTA inner shadow highlight:** `rgba(255,255,255,0.39)`
- **Nav border:** `black/10`
- **Tint overlay:** `white/5`
- **Nokia typing text & cursor:** `#2A3616`

## Animations

- **Headline:** opacity `0 → 1`, scale `0.95 → 1`, `duration: 1.5`, `ease: [0.16, 1, 0.3, 1]`.
- **Sub-headline:** opacity `0 → 1`, `y: 20 → 0`, `duration: 1.2`, `delay: 0.3`, `ease: [0.16, 1, 0.3, 1]`.
- **Typing cursor:** opacity `[0, 1, 0]`, `duration: 0.8`, `repeat: Infinity`, `ease: "linear"`.
- **CTA glint:** `scale-x-105` on group hover.
- **Nav links:** hover opacity fading.
- **Typewriter:** type at 100 ms/char, pause 2000 ms when complete, delete at 50 ms/char, then advance to the next message.
