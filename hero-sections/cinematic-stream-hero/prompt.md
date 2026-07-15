# Lumière — Cinematic Streaming Hero Section

## Overview

Build a full-viewport cinematic movie/streaming hero section. The entire page is a single full-height hero — no scrolling, no additional sections. A muted, looping background video fills the viewport, a masked backdrop blur fades the bottom of the screen, and every element resolves in with a staggered blur-fade-up entrance animation. All interactive controls use a reusable "liquid glass" treatment, with the lone exception of the solid white "Watch Now" button.

## Tech Stack

- **Framework:** React 18 (`react` / `react-dom` `^18.3.1`) with TypeScript (`^5.8.3`).
- **Build tool:** Vite (`^6.3.5`) with `@vitejs/plugin-react` (`^4.4.1`).
- **Styling:** Tailwind CSS v4 (`tailwindcss` `^4.1.7`) via the `@tailwindcss/vite` plugin (`^4.1.7`), imported with `@import "tailwindcss";`. Custom CSS for the liquid-glass effect, bottom blur mask, and entrance animation.
- **Icons:** Lucide (`lucide-react` `^0.475.0`).
- **Font:** Inter from Google Fonts (weights `300;400;500;600;700`), set as `font-family: "Inter", sans-serif` on the body.
- **Notable techniques:** CSS `mask-image` for the bottom blur veil; a masked `::before` gradient stroke for the glass rim; a `@keyframes blurFadeUp` entrance with per-element `animationDelay` stagger; `prefers-reduced-motion` handling.

## Global Setup

### `index.html`

- `lang="en"`, charset `UTF-8`, viewport `width=device-width, initial-scale=1.0`.
- Title: `LUMIÈRE — Step Through. Work Smarter.`
- Meta description: `A full-viewport cinematic streaming hero — a voyage through forgotten realms, where past and future intertwine.`
- Inline SVG favicon (a circle with a play triangle, white stroke/fill):

  ```html
  <link
    rel="icon"
    href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='15' fill='none' stroke='white' stroke-width='1.5'/%3E%3Cpath d='M13 10.5v11l9-5.5z' fill='white'/%3E%3C/svg%3E"
  />
  ```

- Google Fonts setup with preconnect hints:

  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
    rel="stylesheet"
  />
  ```

- Mounts `<div id="root"></div>` and loads `/src/main.tsx` as a module.

### `src/main.tsx`

- Renders `<App />` inside React `StrictMode` via `createRoot(document.getElementById("root")!)`.
- Imports `./index.css`.

### Vite config

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### Base styles (`src/index.css`)

- `@import "tailwindcss";`
- `html, body { height: 100%; overflow: hidden; background: #000; }`
- `body { font-family: "Inter", sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }`

## Layout

The root container is a full-height flex column that clips overflow, on a pure-black background with white text:

```
relative flex h-dvh flex-col overflow-hidden bg-black text-white
```

Stacking order (z-index):

- Background video — `z-0`
- Bottom blur veil — `z-[1]`
- Mobile menu dropdown — `z-40`
- Navbar (`header`) — `z-50`
- Hero content (`main`) — `z-10`

## Background Video

A full-screen background video plays on loop, muted, autoplaying, covering the entire viewport with `object-cover`. It is fixed-positioned behind everything at z-index 0.

- Classes: `fixed inset-0 z-0 h-full w-full object-cover`
- Attributes: `autoPlay`, `muted`, `loop`, `playsInline`, `preload="auto"`, `tabIndex={-1}`, `aria-hidden="true"`.
- Source (vendored locally under `public/assets/`):

  ```ts
  const VIDEO_SRC =
    "/assets/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4";
  ```

> Note: the original brief referenced an external CloudFront URL (`https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4`). The asset has been vendored locally and is served from `/assets/...`; that local path is the ground truth.

## Bottom Blur Overlay (No Gradient Darkening)

Over the video sits a single fixed, full-screen overlay div that applies a strong `backdrop-blur-xl`. It uses a CSS mask so the blur only appears at the bottom and fades to transparent toward the middle of the screen. There is **no** dark gradient overlay — only blur. It is `pointer-events-none` and sits at z-index 1.

- Element classes: `bottom-blur-mask pointer-events-none fixed inset-0 z-[1] backdrop-blur-xl`, with `aria-hidden="true"`.
- The mask (with `-webkit-` prefix too):

  ```css
  .bottom-blur-mask {
    -webkit-mask-image: linear-gradient(to top, black 0%, transparent 45%);
    mask-image: linear-gradient(to top, black 0%, transparent 45%);
  }
  ```

## Liquid Glass Effect

A reusable `.liquid-glass` class used on multiple buttons — a nearly invisible luminosity glass with a gradient stroke painted on a masked `::before` so only the 1.4px rim shows.

```css
.liquid-glass {
  position: relative;
  overflow: hidden;
  border: none;
  background: rgba(255, 255, 255, 0.01);
  background-blend-mode: luminosity;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
  transition:
    background-color 0.35s ease,
    box-shadow 0.35s ease,
    transform 0.35s ease;
}

.liquid-glass:hover {
  background-color: rgba(255, 255, 255, 0.09);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2);
}

.liquid-glass:active {
  transform: scale(0.96);
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
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
}
```

Key properties to preserve exactly:

- **Background:** `rgba(255, 255, 255, 0.01)` with `background-blend-mode: luminosity`.
- **Backdrop filter:** `blur(4px)` (with `-webkit-` prefix).
- **Border:** `none`.
- **Box shadow:** `inset 0 1px 1px rgba(255, 255, 255, 0.1)`.
- **Position/overflow:** `relative` / `hidden`.
- The `::before` gradient-stroke rim uses `-webkit-mask` with `linear-gradient(#fff 0 0) content-box` and `linear-gradient(#fff 0 0)`, combined with `-webkit-mask-composite: xor` and `mask-composite: exclude` to create a border-only gradient stroke, padded `1.4px`, with `pointer-events: none`.

## Blur-Fade-Up Animation

Used on every element with staggered delays.

```css
@keyframes blurFadeUp {
  from {
    opacity: 0;
    filter: blur(20px);
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
}

.animate-blur-fade-up {
  opacity: 0;
  animation: blurFadeUp 1s ease-out forwards;
}
```

- `from`: `opacity: 0; filter: blur(20px); transform: translateY(40px)`.
- `to`: `opacity: 1; filter: blur(0); transform: translateY(0)`.
- The `.animate-blur-fade-up` class applies this as `animation: blurFadeUp 1s ease-out forwards` with initial `opacity: 0`. Each element gets a staggered `animationDelay` via inline style.

### Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  .animate-blur-fade-up {
    animation-duration: 0.01ms;
    animation-delay: 0ms !important;
  }

  .liquid-glass,
  .liquid-glass:active {
    transition: none;
    transform: none;
  }
}
```

## Navbar

A horizontal `header` at z-index 50, relative positioned, with `justify-between`. Classes:

```
relative z-50 flex items-center justify-between px-4 py-4 sm:px-6 md:px-12 md:py-6
```

### Left — text logo

An anchor (`href="#"`, `aria-label="LUMIÈRE — home"`) styled `animate-blur-fade-up flex h-8 items-center md:h-10`, with blur-fade-up animation at delay `0ms`. The brand wordmark is `LUMIÈRE`, where the `È` is bolded:

```tsx
<span className="text-lg font-light leading-none tracking-[0.35em] md:text-xl">
  LUMI<span className="font-semibold">È</span>RE
</span>
```

### Center — navigation links (desktop only, hidden below lg)

- Container `nav`: `hidden items-center gap-8 lg:flex`, `aria-label="Primary"`.
- Links, in order: `"Movies"`, `"TV Series"`, `"Editor's Pick"`, `"Interviews"`, `"User Reviews"`.
- Each is an anchor with `animate-blur-fade-up text-sm transition-colors hover:text-gray-300`, and staggered blur-fade-up delays from `100ms` to `300ms` in `50ms` increments via `animationDelay: ${100 + i * 50}ms`.

### Right — buttons

Container `flex items-center gap-3`.

- **Search button** (visible on `sm` and up): rounded-full liquid-glass pill with a Lucide `Search` icon (`size={18}`) and the text `Search`. Classes: `liquid-glass animate-blur-fade-up hidden items-center gap-2 rounded-full px-4 py-2 text-sm sm:flex md:px-6`. Blur-fade-up at `350ms`.
- **User/profile circle button** (visible on `sm` and up): `liquid-glass animate-blur-fade-up hidden h-10 w-10 items-center justify-center rounded-full sm:flex`, with a Lucide `User` icon (`size={18}`), `aria-label="Your profile"`. Blur-fade-up at `400ms`.
- **Hamburger menu button** (visible only below `lg`): `liquid-glass animate-blur-fade-up flex h-10 w-10 items-center justify-center rounded-full lg:hidden`, blur-fade-up at `350ms`. Toggles `menuOpen` state; `aria-expanded={menuOpen}`, `aria-controls="mobile-menu"`, `aria-label` switches between `"Open menu"` and `"Close menu"`. It animates between the Lucide `Menu` and `X` icons (both `size={18}`, absolutely positioned) using a `transition-all duration-500 ease-out` rotate/scale/opacity crossfade:
  - `Menu`: open → `rotate-180 scale-50 opacity-0`; closed → `rotate-0 scale-100 opacity-100`.
  - `X`: open → `rotate-0 scale-100 opacity-100`; closed → `-rotate-180 scale-50 opacity-0`.

## Mobile Menu (below lg breakpoint)

An absolutely positioned dropdown below the navbar, `id="mobile-menu"`, at z-index 40. It slides in when open and hides when closed via `transition-all duration-500 ease-out`. Base classes:

```
absolute inset-x-0 top-[72px] z-40 border-t border-b border-gray-800 bg-gray-900/95 shadow-2xl backdrop-blur-lg transition-all duration-500 ease-out lg:hidden
```

- **Open:** `translate-y-0 opacity-100`.
- **Closed:** `pointer-events-none -translate-y-4 opacity-0`.
- Background: `bg-gray-900/95 backdrop-blur-lg` with `border-t border-b border-gray-800 shadow-2xl`.

### Nav links

- Container `nav`: `flex flex-col gap-1 px-4 py-4 sm:px-6`, `aria-label="Mobile"`.
- The same five nav links, each an anchor (`href="#"`) with `rounded-lg px-3 py-3 text-sm transition-all duration-500 ease-out hover:bg-gray-800/50`.
- Each link: `tabIndex={menuOpen ? 0 : -1}`, and `onClick` closes the menu (`setMenuOpen(false)`).
- Open → `translate-x-0 opacity-100`; closed → `-translate-x-4 opacity-0`.
- Staggered slide-in via inline `transitionDelay: menuOpen ? ${i * 50}ms : "0ms"` (50ms increments).

### Search and profile (below sm)

A bordered section at the bottom, `flex items-center gap-3 border-t border-gray-800 px-4 py-4 sm:hidden`:

- A liquid-glass `Search` pill: `liquid-glass flex items-center gap-2 rounded-full px-4 py-2 text-sm` with Lucide `Search` (`size={18}`) and text `Search`.
- A liquid-glass profile circle: `liquid-glass flex h-10 w-10 shrink-0 items-center justify-center rounded-full`, `aria-label="Your profile"`, with Lucide `User` (`size={18}`).

## Hero Content (bottom of viewport)

A `main` element that grows to fill remaining space and aligns content to the bottom, at z-index 10:

```
relative z-10 flex flex-1 flex-col justify-end px-4 pb-8 sm:px-6 md:px-12 md:pb-16
```

Inside, a `flex flex-col items-end gap-8 md:flex-row` layout.

### Left side (`w-full flex-1`)

**Metadata row** — a horizontal flex-wrap row, blur-fade-up at `300ms`:

```
animate-blur-fade-up mb-6 flex flex-wrap items-center gap-3 text-xs sm:gap-6 sm:text-sm md:mb-8
```

Three `span` items (each `flex items-center gap-2`):

- Lucide `Star` icon (`size={16}`, classes `fill-white sm:h-5 sm:w-5`) + `8.7/10 IMDB` — this span is `font-medium`.
- Lucide `Clock` icon (`size={16}`) + `132 min`.
- Lucide `Calendar` icon (`size={16}`) + `April, 2025`.

**Title** — `h1`, blur-fade-up at `400ms`, text `Step Through. Work Smarter.`:

```
animate-blur-fade-up mb-4 text-3xl font-normal tracking-[-0.04em] sm:text-5xl md:mb-6 md:text-6xl lg:text-7xl
```

(Letter-spacing is `-0.04em` via `tracking-[-0.04em]`.)

**Description** — `p`, blur-fade-up at `500ms`, text `A voyage through forgotten realms, where past and future intertwine.`:

```
animate-blur-fade-up mb-6 max-w-2xl text-base text-gray-400 sm:text-lg md:mb-12 md:text-xl
```

**CTA buttons** — `flex flex-wrap gap-3 sm:gap-4`:

- **Watch Now** — solid white pill with black text. Classes: `animate-blur-fade-up flex items-center gap-2 rounded-full bg-white px-6 py-2.5 font-medium text-black transition-colors hover:bg-gray-200 sm:px-8 sm:py-3`. Lucide `Play` icon (`size={18}`, `className="fill-black"`). Blur-fade-up at `600ms`.
- **Learn More** — liquid-glass pill. Classes: `liquid-glass animate-blur-fade-up rounded-full px-6 py-2.5 font-medium sm:px-8 sm:py-3`. Blur-fade-up at `700ms`.

### Right side (navigation arrows)

A row of two pill buttons, aligned right on desktop and left on mobile:

```
flex w-full items-center gap-3 sm:gap-4 md:w-auto md:justify-end
```

- **Previous** — `liquid-glass animate-blur-fade-up flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm sm:px-6 sm:py-3`, with a Lucide `ChevronLeft` icon (`size={18}`) before the text `Previous`. Blur-fade-up at `800ms`.
- **Next** — same styling, with the text `Next` followed by a Lucide `ChevronRight` icon (`size={18}`). Blur-fade-up at `900ms`.

## Color Palette

- **Background:** pure black (`bg-black`, `#000`).
- **Text:** white, with `text-gray-400` for the subtitle/description.
- All interactive glass elements use the `.liquid-glass` class (nearly transparent white with blur).
- The only solid-colored element is the "Watch Now" button (white background, black text).

## Stagger Timing Summary

| Element | Delay |
| --- | --- |
| Logo | `0ms` |
| Nav links | `100ms`, `150ms`, `200ms`, `250ms`, `300ms` |
| Search button | `350ms` |
| User button | `400ms` |
| Hamburger menu button | `350ms` |
| Metadata row | `300ms` |
| Title | `400ms` |
| Description | `500ms` |
| Watch Now | `600ms` |
| Learn More | `700ms` |
| Previous | `800ms` |
| Next | `900ms` |

(Mobile-menu nav links use `transitionDelay` of `i * 50ms` when open, not `animationDelay`.)

## Responsive Breakpoints

- **Below sm (< 640px):** smaller text, tighter padding; the navbar Search/User buttons are hidden (available in the mobile menu's bottom section).
- **Below lg (< 1024px):** desktop nav links hidden, hamburger menu shown; mobile menu dropdown available.
- **md and up:** side-by-side layout for hero content and navigation arrows (`md:flex-row`).
- **lg and up:** full desktop navbar with all links visible.

## File Structure

```
cinematic-stream-hero/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── public/
│   └── assets/
│       └── hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4
└── src/
    ├── main.tsx        # React entry, mounts <App /> in StrictMode
    ├── App.tsx         # Entire hero UI
    ├── index.css       # Tailwind import + liquid-glass, mask, animation
    └── vite-env.d.ts
```

### Component state

`App` holds a single piece of state: `const [menuOpen, setMenuOpen] = useState(false);` controlling the mobile menu and the hamburger/X icon crossfade.
