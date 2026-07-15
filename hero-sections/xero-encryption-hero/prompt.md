# Xero — Encryption Hero Section

## Overview

Build a single-page React + TypeScript (Vite) landing hero for a product called **Xero**. The page recreates one section exactly: a navbar, a rounded dark hero card featuring an animated icon pipeline (a beam of light that travels between three neumorphic nodes, splashing as it passes through the central Xero "X" logo), and a row of five monochrome brand logos. Styling is plain global CSS — do **not** use Tailwind utility classes for the hero. There is no purple/indigo branding outside the specified pink-magenta gradient arc.

## Tech Stack

- **Framework:** React + TypeScript, built with Vite.
- **Styling:** Plain CSS in a global stylesheet (CSS variables, neumorphic box-shadows, radial/linear gradients, CSS mask, keyframe animation). No CSS framework — do **not** use Tailwind utility classes for the hero.
- **Font:** Inter from Google Fonts, weights 300, 400, 500, 600, 700, 800.
- **Notable techniques:** SVG `linearGradient` in `userSpaceOnUse` mode whose bright window is slid along a stroked path; a `requestAnimationFrame` state machine driving the beam; `getBoundingClientRect()` math to recompute the beam path on mount and resize; CSS `mask-image` to clip the grid to the arc; neumorphic (soft-UI) shadows.

## Global Setup

### Body & base

- The body uses `display: flex; flex-direction: column; align-items: center; padding: 14px;` and `font-family: 'Inter', sans-serif;`.

### CSS variables (on `:root`)

```css
:root {
  --bg: #0a0a0f;
  --surface: #111118;
  --text: #f0f0f5;
  --text-muted: #8888a8;
  --accent: #c8a0e0;
  --accent-pink: #b04090;
  --border: rgba(255, 255, 255, 0.08);
}
```

## Layout & Structure

`App` renders three top-level blocks (no wrapping element — a React fragment), centered on the black page, each constrained to `max-width: 1600px`, in this vertical order:

1. `<nav>` — top bar (visually at the top; not actually `position: sticky`).
2. `<section class="hero-card">` — the rounded dark hero card with the animated icon pipeline.
3. `<div class="brands">` — a row of five monochrome brand logos.

## Navbar

`nav`: `width: 100%; max-width: 1600px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; padding: 12px 24px; margin-bottom: 14px;`.

- **Left** — `<span class="nav-logo">Xero</span>`: `font-size: 1.05rem; font-weight: 700; letter-spacing: -0.01em; justify-self: start;`.
- **Center** — `<ul class="nav-links">` with three `<a href="#">` items, labels: **Method**, **Pricing**, **Docs** (in that order).
  - `.nav-links`: `list-style: none; display: flex; align-items: center; gap: 32px;`.
  - `.nav-links a`: color `var(--text-muted)`, `text-decoration: none; font-size: 0.85rem; font-weight: 500; transition: color 0.2s ease;`. Hover: color `var(--text)`.
- **Right** — `<div class="nav-actions">` (`display: flex; align-items: center; gap: 10px; justify-self: end;`) containing two pill buttons:
  - `.btn-login` — text **Log in**. `background: rgba(255, 255, 255, 0.06); border: 1px solid var(--border); color: var(--text); font-weight: 500;`. Hover: `background: rgba(255, 255, 255, 0.12);`.
  - `.btn-signup` — text **Sign up**. `background: #ffffff; border: 1px solid #ffffff; color: #0a0a0f; font-weight: 600;`. Hover: `opacity: 0.88;`.
  - Shared button styles (`.btn-login, .btn-signup`): `font-family: inherit; padding: 7px 18px; border-radius: 999px; font-size: 0.82rem; cursor: pointer; transition: background 0.2s ease, opacity 0.2s ease;`.
- **`.nav-menu` wrapper** uses `display: contents` on desktop so the `<ul>` and `.nav-actions` become direct grid children of `<nav>`.

### Mobile (≤ 768px)

- `nav` becomes `display: flex; justify-content: space-between; align-items: center;`.
- A `.menu-toggle` hamburger button appears (`display: block`). Markup: a `<button type="button">` with two `<span />` children, `aria-label="Toggle navigation menu"`, `aria-expanded` bound to the open state, and class `menu-toggle active` when open.
  - `.menu-toggle`: `position: relative; width: 24px; height: 14px; background: none; border: none; cursor: pointer; z-index: 1001;`.
  - `.menu-toggle span`: `position: absolute; left: 0; width: 100%; height: 2px; background: #ffffff; border-radius: 2px; transition: transform 0.3s ease;`. First span `top: 0`, last span `bottom: 0`.
  - When `.active`: first span `transform: translateY(6px) rotate(45deg)`, last span `transform: translateY(-6px) rotate(-45deg)` to form an X.
- `.nav-menu` becomes a full-screen overlay: `display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 44px; position: fixed; top: 0; right: -100%; width: 100%; height: 100vh; background: var(--bg); transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1); z-index: 1000;`. `.nav-menu.active { right: 0; }` slides it in.
  - `.nav-links` stack: `flex-direction: column; gap: 28px;`; links grow to `font-size: 1.1rem;`.
  - `.nav-actions` stack: `flex-direction: column; width: min(320px, 78vw); gap: 12px;`; buttons become full width: `width: 100%; text-align: center; padding: 12px 18px; font-size: 0.95rem;`.
- Toggling the menu sets `document.body.style.overflow = 'hidden'`.

## Hero Card

`.hero-card`: `width: 100%; max-width: 1600px; border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.07); overflow: hidden; position: relative; background: #0d0b12; padding: 80px 40px 70px; min-height: 640px; display: flex; flex-direction: column; align-items: center; text-align: center;`.

### `::before` gradient arc (the signature visual)

An absolutely-positioned (`inset: 0`) pseudo-element with many manually-tuned radial stops producing a smooth dark → pink → white arc near the top, plus a faint purple lift below:

```css
.hero-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 50% -70%,
      transparent 60%,
      rgba(176, 48, 136, 0.03) 63%,
      rgba(176, 48, 136, 0.08) 65%,
      rgba(176, 48, 136, 0.16) 67%,
      rgba(176, 48, 136, 0.28) 69%,
      rgba(176, 48, 136, 0.4) 71%,
      rgba(176, 48, 136, 0.52) 73%,
      rgba(176, 48, 136, 0.64) 75%,
      rgba(176, 48, 136, 0.74) 77%,
      rgba(176, 48, 136, 0.82) 79%,
      rgba(210, 70, 175, 0.92) 85%,
      rgba(240, 110, 210, 0.88) 87%,
      rgba(255, 205, 250, 0.92) 91%,
      rgba(255, 240, 255, 0.98) 93%,
      #ffffff 95%),
    radial-gradient(circle at 50% 35%, rgba(120, 40, 180, 0.08) 0%, transparent 50%);
  z-index: 0;
  pointer-events: none;
}
```

### `.hero-grid` overlay

A separate absolutely-positioned `<div class="hero-grid" aria-hidden="true" />` rendering a crosshatch grid, masked so it only shows inside the arc area:

```css
.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px);
  background-size: 40px 40px;
  -webkit-mask-image: radial-gradient(circle at 50% -70%, transparent 60%, black 78%);
  mask-image: radial-gradient(circle at 50% -70%, transparent 60%, black 78%);
  z-index: 0;
  pointer-events: none;
}
```

## Icon Pipeline (the animated centerpiece)

Container `<div class="icon-pipeline" ref={pipelineRef}>`: `position: relative; display: flex; align-items: center; justify-content: center; max-width: 700px; margin-bottom: 52px; z-index: 1;`.

Children in this exact order:

### 1. Beam SVG

`<svg class="beam-svg" aria-hidden="true">` — absolutely positioned over the whole pipeline: `position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; z-index: 2; pointer-events: none;`. It contains:

- `<defs>` with:
  - `<filter id="glow" x="-50%" y="-50%" width="200%" height="200%">` → `<feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />` then `<feComposite in="SourceGraphic" in2="blur" operator="over" />`.
  - `<linearGradient id="beam-gradient" gradientUnits="userSpaceOnUse" x1="-5%" y1="0%" x2="5%" y2="0%" ref={gradientRef}>` with five stops:
    - `0%` → `stopColor="#b04090" stopOpacity="0"`
    - `20%` → `stopColor="#b04090" stopOpacity="0.8"`
    - `50%` → `stopColor="#fff" stopOpacity="1"`
    - `80%` → `stopColor="#c8a0e0" stopOpacity="0.8"`
    - `100%` → `stopColor="#c8a0e0" stopOpacity="0"`
- A `<g class="beam-glow">` (`opacity: 0.6`) wrapping the **glow path**: `<path ref={beamGlowRef} stroke="url(#beam-gradient)" strokeWidth="2" fill="none" filter="url(#glow)" />`.
- The **core path**: `<path ref={beamCoreRef} stroke="url(#beam-gradient)" strokeWidth="0.8" fill="none" />`.

Both paths get the same computed `d` (see Beam Animation).

### 2. Left node (stack / layers icon)

`<div class="icon-node node-light-right" id="node-stack" ref={nodeStackRef}>` — a Lucide-style **Layers** SVG (`viewBox="0 0 24 24"`, three stacked diamonds):

```html
<svg viewBox="0 0 24 24" aria-hidden="true">
  <polygon points="12 2 2 7 12 12 22 7 12 2" />
  <polyline points="2 17 12 22 22 17" />
  <polyline points="2 12 12 17 22 12" />
</svg>
```

### 3. Left pipeline line

`<div class="pipeline-line" />` — `width: 160px; height: 1px; flex-shrink: 0; background: linear-gradient(90deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.07));`.

### 4. Center wrapper

`<div class="pipeline-center">` (`position: relative; display: flex; align-items: center; justify-content: center; flex-shrink: 0;`) containing, in order:

- **`.splash`** — `<div class="splash" ref={splashRef} />`: `position: absolute; top: 50%; left: 50%; width: 100px; height: 100px; margin: -50px 0 0 -50px; border-radius: 50%; background: radial-gradient(circle, rgba(255, 77, 200, 0.6) 0%, transparent 70%); opacity: 0; transform: scale(0.4); z-index: 2; pointer-events: none;`.
- **`.icon-node-center`** — `<div class="icon-node-center" id="node-x" ref={nodeXRef}>` containing the Xero "X" logoipsum SVG (`viewBox="0 0 40 40"`):

  ```html
  <svg viewBox="0 0 40 40" aria-hidden="true">
    <path d="M5 4H13L21.2 15.9L17.2 21.7ZM27 4H35L25 18.5L21 12.7ZM22.9 18.3L35 36H27L18.9 24.2ZM13 36H5L15 21.5L19 27.3Z" />
  </svg>
  ```

### 5. Right pipeline line

`<div class="pipeline-line right" />` — same `160px × 1px` line with the gradient reversed: `.pipeline-line.right { background: linear-gradient(90deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.15)); }`.

### 6. Right node (shield-check icon)

`<div class="icon-node node-light-left" id="node-shield" ref={nodeShieldRef}>` — a Lucide-style **Shield-Check** SVG (`viewBox="0 0 24 24"`):

```html
<svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  <polyline points="9 12 11 14 15 10" />
</svg>
```

### Side node styling

`.icon-node`: `position: relative; width: 46px; height: 46px; border-radius: 50%; background: #1a1a24; display: flex; align-items: center; justify-content: center; flex-shrink: 0; cursor: pointer; z-index: 3; transition: transform 0.2s ease, box-shadow 0.2s ease;` with a neumorphic shadow stack:

```css
box-shadow:
  6px 6px 12px rgba(0, 0, 0, 0.4),
  -4px -4px 10px rgba(255, 255, 255, 0.03),
  inset 1px 1px 1px rgba(255, 255, 255, 0.05),
  inset 4px 4px 8px rgba(0, 0, 0, 0.4);
```

- `.icon-node::after` — dotted outer ring: `content: ''; position: absolute; inset: -7px; border-radius: 50%; border: 1px dotted #1a1a24; pointer-events: none;`.
- Hover: `transform: translateY(-1px);` with stronger shadows.
- Active: inset-only shadows.
- `.icon-node svg`: `width: 20px; height: 20px; stroke: rgba(255, 255, 255, 0.7); stroke-width: 1.5; fill: none; stroke-linecap: round; stroke-linejoin: round;`.

### Center node styling

`.icon-node-center`: `position: relative; width: 64px; height: 64px; border-radius: 50%; background: #1e1e2c; display: flex; align-items: center; justify-content: center; flex-shrink: 0; z-index: 3;` with a stronger neumorphic shadow:

```css
box-shadow:
  8px 8px 16px rgba(0, 0, 0, 0.5),
  -6px -6px 14px rgba(255, 255, 255, 0.04),
  inset 1px 1px 2px rgba(255, 255, 255, 0.06),
  inset 6px 6px 12px rgba(0, 0, 0, 0.5);
```

- `.icon-node-center svg`: `width: 28px; height: 28px; fill: #ffffff;`.

### Side-light glows

Shared base (`.node-light-right::before, .node-light-left::before`): `content: ''; position: absolute; inset: -8px; border-radius: 50%; opacity: 0; transition: opacity 300ms ease; z-index: 4; pointer-events: none;`.

- `.node-light-right::before` — `background: radial-gradient(circle at right, rgba(200, 200, 200, 0.45) 0%, transparent 70%);`.
- `.node-light-left::before` — `background: radial-gradient(circle at left, rgba(200, 100, 255, 0.5) 0%, transparent 70%);`.
- When the node has `.active`, the glow becomes `opacity: 1` (`.node-light-right.active::before, .node-light-left.active::before { opacity: 1; }`).

### Splash keyframe

```css
.splash.animate {
  animation: splash-anim 0.8s ease-out forwards;
}

@keyframes splash-anim {
  0% {
    transform: scale(0.4);
    opacity: 0.8;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}
```

Triggered by adding the `.animate` class to `.splash`.

## Beam Animation (JavaScript / requestAnimationFrame)

Use `useRef` for the pipeline, the three nodes (`nodeStackRef`, `nodeXRef`, `nodeShieldRef`), both beam paths (`beamGlowRef`, `beamCoreRef`), the gradient (`gradientRef`), and the splash (`splashRef`). Use one `useEffect` (empty dependency array) to set up the resize listener and the `requestAnimationFrame` loop, and clean both up on unmount.

Declare these constants:

```ts
type BeamState = 'p1' | 'splash' | 'p2' | 'idle';

const P1_DURATION = 800;
const SPLASH_DURATION = 800;
const P2_DURATION = 800;
const IDLE_DURATION = 1000;
const HALF_WIDTH = 5; // gradient window half-width, percentage units
```

### Recompute the beam path

On mount and on every window `resize`, recompute the SVG path from the live node positions (relative to the pipeline's rect), then set the same `d` on both beam paths:

```ts
const computePath = () => {
  const pRect = pipeline.getBoundingClientRect();
  const sRect = nodeStack.getBoundingClientRect();
  const xRect = nodeX.getBoundingClientRect();
  const shRect = nodeShield.getBoundingClientRect();
  const startX = sRect.left + sRect.width / 2 - pRect.left;
  const startY = sRect.top + sRect.height / 2 - pRect.top;
  const midX = xRect.left + xRect.width / 2 - pRect.left;
  const midY = xRect.top + xRect.height / 2 - pRect.top;
  const endX = shRect.left + shRect.width / 2 - pRect.left;
  const endY = shRect.top + shRect.height / 2 - pRect.top;
  const d = `M ${startX},${startY} L ${midX},${midY} L ${endX},${endY}`;
  beamGlow.setAttribute('d', d);
  beamCore.setAttribute('d', d);
};

computePath();
window.addEventListener('resize', computePath);
```

### Slide the gradient window

Animate the gradient by mutating `x1` / `x2` of `#beam-gradient` (which is in `userSpaceOnUse`) so the bright window slides along the path. `center = percentage * 100`, `HALF_WIDTH = 5`, with `y1` / `y2` fixed at `0%`:

```ts
const setGradientWindow = (percentage: number) => {
  const center = percentage * 100;
  gradient.setAttribute('x1', `${center - HALF_WIDTH}%`);
  gradient.setAttribute('y1', '0%');
  gradient.setAttribute('x2', `${center + HALF_WIDTH}%`);
  gradient.setAttribute('y2', '0%');
};
```

### State machine

Run a `requestAnimationFrame` loop tracking a `lastStateChange` timestamp (initialized from `performance.now()`), starting in state `p1`. On each `tick(now)` compute `elapsed = now - lastStateChange` and switch on state:

| State | Duration | Behavior |
|---|---|---|
| **`p1`** | 800 ms | `p = Math.min(elapsed / P1_DURATION, 1)`. `setGradientWindow(p * 0.5)` (beam travels from the stack node toward the X node). Toggle `.active` on `node-stack` while `p < 0.4`. At end (`elapsed >= P1_DURATION`): remove `.active` from `node-stack`, switch to `splash`, set `beamGlow.style.opacity = '0'` and `beamCore.style.opacity = '0'`, add `.animate` to the splash. |
| **`splash`** | 800 ms | Wait while the impact splash plays and the beam is hidden. At end: switch to `p2`, remove `.animate` from the splash, restore `beamGlow`/`beamCore` opacity to `'1'`, and call `setGradientWindow(0.5)`. |
| **`p2`** | 800 ms | `p = Math.min(elapsed / P2_DURATION, 1)`. `setGradientWindow(0.5 + p * 0.5)` (beam travels from the X node toward the shield node). Toggle `.active` on `node-shield` while `p > 0.6`. At end: remove `.active` from `node-shield`, switch to `idle`. |
| **`idle`** | 1000 ms | Wait, then switch back to `p1`. |

Each branch that changes state sets `lastStateChange = now`. The loop re-arms via `rafId = requestAnimationFrame(tick)`. Total cycle is ≈ 3.4 seconds, looping infinitely. Cleanup removes the resize listener and calls `cancelAnimationFrame(rafId)`.

## Hero Text

`<div class="hero-content">` — `position: relative; max-width: 620px; z-index: 1;`.

```html
<h1 class="hero-heading">
  The simple way
  <strong>encryption your data</strong>
</h1>
<p class="hero-sub">
  Fully managed data encrypting service and annotation
  <br />
  platform for teams of all industries.
</p>
<a href="#" class="btn-cta">Get Started</a>
```

- `.hero-heading`: `font-size: clamp(2.4rem, 5.5vw, 4rem); font-weight: 300; line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 22px;`.
- `.hero-heading strong`: `display: block; font-weight: 400; margin-top: 4px; background: linear-gradient(to right, #ffffff, #a98597); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;`.
- `.hero-sub`: `font-size: 0.9rem; font-weight: 400; line-height: 1.65; color: rgba(255, 255, 255, 0.4); max-width: 440px; margin: 0 auto 36px;`.
- `.btn-cta`: `display: inline-block; background: #ffffff; color: #0a0a0f; padding: 12px 32px; border-radius: 999px; font-size: 0.9rem; font-weight: 600; text-decoration: none; transition: opacity 0.2s ease, transform 0.2s ease;`. Hover: `opacity: 0.9; transform: translateY(-1px);`.

## Brands Row

`.brands`: `width: 100%; max-width: 1600px; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 64px; padding: 32px 24px 10px;`.

Each `.brand-item`: `display: flex; align-items: center; gap: 10px; color: rgba(255, 255, 255, 0.35); font-size: 1.1rem; font-weight: 500; white-space: nowrap;`. Each leading SVG is `width: 22px; height: 22px; flex-shrink: 0;` (`.brand-item svg`).

Five items, in order:

1. **Expedia** — circle + bars, then the text `Expedia`:
   ```html
   <svg viewBox="0 0 24 24" aria-hidden="true">
     <circle cx="12" cy="12" r="10" fill="currentColor" />
     <path fill="var(--bg)" d="M8 9h8v2H8zm0 4h6v2H8z" />
   </svg>
   ```
2. **asana** — three filled circles, then the text `asana`:
   ```html
   <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
     <circle cx="12" cy="7" r="4" />
     <circle cx="5" cy="16" r="3.5" />
     <circle cx="19" cy="16" r="3.5" />
   </svg>
   ```
3. **zenefits** — three stroked horizontal polylines, then the text `zenefits`:
   ```html
   <svg
     viewBox="0 0 24 24"
     fill="none"
     stroke="currentColor"
     stroke-width="2"
     stroke-linecap="round"
     aria-hidden="true"
   >
     <polyline points="4 8 20 8" />
     <polyline points="4 12 12 12" />
     <polyline points="4 16 20 16" />
   </svg>
   ```
4. **HubSpot** — small filled circle, stroked circle, and connecting paths, then the text `HubSp` + a superscript dot + `t`:
   ```html
   <svg viewBox="0 0 24 24" aria-hidden="true">
     <circle cx="15.5" cy="8.5" r="2.5" fill="currentColor" />
     <circle cx="8.5" cy="8.5" r="2" fill="none" stroke="currentColor" stroke-width="1.5" />
     <path d="M10.5 8.5h2.5" stroke="currentColor" stroke-width="1.5" fill="none" />
     <path
       d="M15.5 11v3.5M15.5 14.5l-2.5 3M15.5 14.5l2.5 3"
       stroke="currentColor"
       stroke-width="1.5"
       fill="none"
       stroke-linecap="round"
     />
   </svg>
   <span>HubSp<span class="hubspot-dot" />t</span>
   ```
   - `.hubspot-dot`: `display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: currentColor; margin: 0 1px; transform: translateY(-7px);` (a small round superscript dot).
5. **loom** — globe-with-X, then the text `loom`:
   ```html
   <svg
     viewBox="0 0 24 24"
     fill="none"
     stroke="currentColor"
     stroke-width="1.5"
     aria-hidden="true"
   >
     <circle cx="12" cy="12" r="9" />
     <line x1="12" y1="3" x2="12" y2="21" />
     <line x1="3" y1="12" x2="21" y2="12" />
     <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" />
     <line x1="18.4" y1="5.6" x2="5.6" y2="18.4" />
   </svg>
   ```

## Responsive Breakpoints

- **≤ 860px:** `.icon-pipeline { gap: 0; margin-bottom: 40px; }` and `.pipeline-line { width: 80px; }`.
- **≤ 768px:** enable the mobile hamburger menu (see Navbar → Mobile); `.icon-node` shrinks to `38px × 38px`; `.icon-node-center` shrinks to `52px × 52px`; `.hero-card { padding: 60px 20px 60px; min-height: auto; }`; `.brands { gap: 32px; }`.
- **≤ 480px:** `.hero-card { border-radius: 16px; }`; `.brands { gap: 24px; }`.

## Z-Index Stack (critical for splash/beam layering)

- `0` — gradient arc (`.hero-card::before`) + grid overlay (`.hero-grid`).
- `1` — pipeline container (`.icon-pipeline`), hero text (`.hero-content`).
- `2` — beam SVG (`.beam-svg`), splash (`.splash`).
- `3` — all icon nodes (`.icon-node`, `.icon-node-center`).
- `4` — node side-light glows (`.node-light-right::before`, `.node-light-left::before`).
- `1000` / `1001` — mobile nav overlay (`.nav-menu`) and toggle (`.menu-toggle`).

## Implementation Notes

Implement all of the above exactly. Use `useRef` for the pipeline, the three nodes, both beam paths, the gradient, and the splash. Use one `useEffect` to set up the resize listener and the `requestAnimationFrame` loop, and clean both up on unmount.
