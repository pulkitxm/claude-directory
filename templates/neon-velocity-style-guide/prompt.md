# NEON VELOCITY — BRUTALIST × FUTURISTIC GLASS STYLE GUIDE

> BUILD A SINGLE-PAGE, SELF-CONTAINED STYLE-GUIDE / LANDING TEMPLATE NAMED **NEON VELOCITY**, REPRODUCED SAME-TO-SAME (PIXEL-FAITHFUL) FROM THE REFERENCE DRAFT AT `HTTPS://P.SUPERDESIGN.DEV/DRAFT/28F49947-E9F9-46A7-86E2-97B9F2C7BB36`. SHIP IT AS PLAIN STATIC HTML + CSS + A SMALL AMOUNT OF VANILLA JS, RUNNABLE OFFLINE WITH ALL FONTS VENDORED LOCALLY. NO BUILD STEP REQUIRED.

# SUMMARY

THE 'NEON VELOCITY' STYLE GUIDE IS A MINIMALIST YET AGGRESSIVE DESIGN SYSTEM THAT BLENDS BRUTALIST STRUCTURE (HEAVY BORDERS, MASSIVE TYPE) WITH FUTURISTIC GLASS EFFECTS. IT FOCUSES ON HIGH CONTRAST, UPPERCASE TECHNICAL LABELS, AND IMMERSIVE BACKGROUND GLOWS TO CREATE A PREMIUM, 'ELITE' SOFTWARE ATMOSPHERE.

# STYLE

THE STYLE IS BUILT ON A HIGH-CONTRAST FOUNDATION OF DEEP BLACKS (`#050505`) AND VIBRANT NEON LIME (`#BFFF00`). IT EMPLOYS 'PLUS JAKARTA SANS' (800 WEIGHT) FOR HEAVY, TIGHTLY-TRACKED HEADLINES AND 'GEIST MONO' FOR TECHNICAL, WIDE-TRACKED LABELS. KEY VISUAL TECHNIQUES INCLUDE 3D PERSPECTIVE TRANSFORMS, GRAIN/NOISE OVERLAYS FOR TEXTURE, AND LUMINOSITY-BASED HOVER STATES THAT MAKE COMPONENTS FEEL LIGHT-EMITTING.

## SPEC

### CORE AESTHETICS

- **COLOR PALETTE**: PRIMARY BACKGROUND: `#050505`; ACCENT GREEN: `#BFFF00`; TEXT PRIMARY: `#FFFFFF`; TEXT SECONDARY: `rgba(255, 255, 255, 0.4)`; BORDERS: `rgba(255, 255, 255, 0.1)`.
- **TYPOGRAPHY**:
  - **HEADLINES**: 'PLUS JAKARTA SANS', WEIGHT 800, TRACKING `-0.05em`, UPPERCASE. FLUID SIZING: `clamp(2.6rem, 10vw, 8.75rem)`.
  - **TECHNICAL META**: 'GEIST MONO', WEIGHT 400-600, TRACKING `0.2em` TO `0.5em`, UPPERCASE, FONT-SIZE: `10px`-`12px`.
  - **BODY**: 'INTER', WEIGHT 300-400, LEADING-RELAXED.
- **VISUAL EFFECTS**:
  - **NOISE OVERLAY**: SUBTLE SVG FRACTAL NOISE AT 3% OPACITY FIXED TO THE VIEWPORT.
  - **REFRACTION GLOW**: LARGE, BLURRED RADIAL GRADIENTS (`#BFFF00` AT 15% OPACITY) ACTING AS BACKGROUND AMBIANCE.
  - **GLASSMORPHISM**: `backdrop-filter: blur(12px)` WITH 1PX SOLID WHITE BORDERS AT 8% OPACITY.
- **ANIMATIONS**: USE `cubic-bezier(0.16, 1, 0.3, 1)` FOR ALL TRANSITIONS. IMPLEMENT SCROLL-REVEAL EFFECTS WHERE ELEMENTS TRANSLATE 40PX Y-AXIS WHILE FADING IN.

# LAYOUT & STRUCTURE

THE LAYOUT IS A SINGLE-COLUMN FLOW WITH WIDE CONTAINERS (MAX-WIDTH 1600PX). IT USES A '3D GLASS' BACKGROUND TO ANCHOR THE HERO AND A MODULAR BENTO-GRID FOR FEATURE SECTIONS.

## HEADER

FULL-WIDTH CONTAINER (MAX 1600PX). LEFT: LOGO IN 'PLUS JAKARTA SANS' BOLD UPPERCASE. RIGHT: NAVIGATION LINKS USING 'GEIST MONO' 10PX, TRACKING `0.3em`. INCLUDE A PRIMARY 'LASER BUTTON' WITH ROUNDED-FULL SHAPE FOR THE CTA.

## HERO SECTION

A CENTRAL STACKED LAYOUT. BACKGROUND: A '3D GLASS' CARD TILTED AT 15DEG USING `perspective(1000px) rotateX(15deg)`. FOREGROUND: A MASSIVE HEADLINE WRAPPED IN A WHITE BORDER BOX (BORDER-WIDTH: 12PX). BELOW THE HEADLINE, A SPLIT-ROW METADATA SECTION: LEFT SIDE CONTAINS A LOCATION/STATUS TAG; RIGHT SIDE CONTAINS A LARGE COUNTDOWN TIMER IN 'PLUS JAKARTA SANS' USING `font-variant-numeric: tabular-nums`.

# FEATURE BENTO GRID

3-COLUMN GRID (COLLAPSING TO 1 ON MOBILE). EACH CARD (LUMINOSITY CARD) SHOULD HAVE A 2REM BORDER-RADIUS, MINIMUM HEIGHT OF 450PX, AND USE A RADIAL-GRADIENT TOP-LEFT GLOW. CONTENT: TOP-ALIGNED MONO INDEX (E.G., 01/ETHOS), MIDDLE-ALIGNED LARGE HEADLINE, BOTTOM-ALIGNED DESCRIPTION.

## SOCIAL PROOF & FORM

AVATAR STACK WITH 5 OVERLAPPING IMAGES, EACH HAVING A 2PX `#BFFF00` BORDER AND NEON SHADOW. HORIZONTAL FORM: A PILL-SHAPED CONTAINER WITH `rgba(255,255,255,0.05)` BACKGROUND AND BLUR, CONTAINING A BORDERLESS MONO INPUT AND A ROUNDED-FULL 'LASER BUTTON'.

## MOBILE NAVIGATION

A FIXED BOTTOM NAVIGATION PILL. `background: rgba(10, 10, 10, 0.8)`, `backdrop-filter: blur(20px)`, 1PX BORDER. ICONS SHOULD BE CENTERED WITH HIGH-CONTRAST HOVER STATES TO `#BFFF00`.

# SPECIAL COMPONENTS

## LASER BUTTON

A HIGH-ENERGY INTERACTIVE BUTTON WITH A SWEEPING LIGHT EFFECT.

BACKGROUND COLOR: `#BFFF00`; COLOR: `#000000`; BORDER-RADIUS: 9999PX; BOX-SHADOW: `0 0 20px rgba(191, 255, 0, 0.3)`. ON HOVER: AN ABSOLUTE-POSITIONED PSEUDO-ELEMENT WITH A LINEAR-GRADIENT (TRANSPARENT, WHITE 40%, TRANSPARENT) TRANSLATES ACROSS THE BUTTON AT A 45-DEGREE ANGLE OVER 0.6S.

## LUMINOSITY CARD

A RESPONSIVE CONTAINER THAT REACTS TO MOUSE PROXIMITY WITH LIGHT.

BACKGROUND: `radial-gradient(circle at top left, rgba(255, 255, 255, 0.03), transparent)`. BORDER: 1PX SOLID `rgba(255, 255, 255, 0.05)`. TRANSITION: 0.5S EASE. HOVER STATE: CHANGE BORDER-COLOR TO `rgba(191, 255, 0, 0.3)` AND BACKGROUND TO A RADIAL-GRADIENT USING THE ACCENT GREEN `#BFFF00` AT 5% OPACITY.

# SPECIAL NOTES

MUST: USE UPPERCASE FOR ALL TECHNICAL LABELS AND HEADLINES TO MAINTAIN THE BRUTALIST FEEL. MUST: USE `tabular-nums` FOR THE COUNTDOWN TO PREVENT HORIZONTAL LAYOUT SHIFT DURING TICKS. MUST: MAINTAIN A MINIMUM TOUCH TARGET OF 48PX FOR THE MOBILE BOTTOM NAV BUTTONS. DO NOT: USE STANDARD ROUNDED CORNERS ON THE LARGE HERO BORDER-BOX; KEEP THEM SHARP (0PX) TO CONTRAST WITH THE ROUNDED CARDS BELOW. DO NOT: USE PURE BLACK (`#000`) FOR BACKGROUNDS; STICK TO THE SLIGHTLY LIGHTER `#050505` TO ALLOW THE NOISE TEXTURE TO BE VISIBLE.

---

# IMPLEMENTATION NOTES (FOR FAITHFUL REPRODUCTION)

THE FOLLOWING ARE THE CONCRETE BUILD DECISIONS, EXACT VALUES, AND CORE CODE NEEDED TO RECREATE THE SAME UI. SHIP AS A SINGLE `index.html` + `styles.css` + `script.js`, WITH FONTS VENDORED INTO `assets/fonts/` AND AVATARS INTO `assets/avatars/`.

## GLOBAL TOKENS (CSS CUSTOM PROPERTIES)

```css
:root {
  --bg: #050505;
  --accent: #BFFF00;
  --text: #FFFFFF;
  --text-dim: rgba(255, 255, 255, 0.4);
  --border: rgba(255, 255, 255, 0.1);
  --glass: rgba(255, 255, 255, 0.05);
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  --max: 1600px;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: "Inter", system-ui, sans-serif;
  font-weight: 300;
  overflow-x: hidden;
}
.container { max-width: var(--max); margin: 0 auto; padding: 0 clamp(1.25rem, 4vw, 3rem); }
.mono { font-family: "Geist Mono", ui-monospace, monospace; text-transform: uppercase; }
.headline { font-family: "Plus Jakarta Sans", sans-serif; font-weight: 800; letter-spacing: -0.05em; text-transform: uppercase; line-height: 0.92; }
.tag { font-family: "Geist Mono", monospace; text-transform: uppercase; font-size: 10px; letter-spacing: 0.3em; color: var(--text-dim); }
```

## FONTS (VENDORED LOCALLY)

VENDOR PLUS JAKARTA SANS (800), GEIST MONO (400/500/600), AND INTER (300/400) INTO `assets/fonts/` AS WOFF2 AND DECLARE WITH `@font-face` (`font-display: swap`). DO NOT HOTLINK GOOGLE FONTS — THE PROJECT MUST RUN OFFLINE.

## NOISE OVERLAY (FIXED, 3% OPACITY)

INLINE SVG FRACTAL NOISE AS A FIXED FULL-VIEWPORT LAYER (`pointer-events:none; z-index:100; mix-blend-mode: overlay`).

```css
.noise {
  position: fixed; inset: 0; z-index: 100; pointer-events: none; opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

## REFRACTION GLOW (AMBIENT BACKGROUND)

LARGE BLURRED RADIAL GLOWS OF THE ACCENT AT 15% OPACITY, FIXED BEHIND CONTENT.

```css
.glow { position: fixed; border-radius: 9999px; filter: blur(120px); z-index: -1; pointer-events: none; }
.glow--a { top: -10%; left: -5%; width: 50vw; height: 50vw; background: radial-gradient(circle, rgba(191,255,0,0.15), transparent 70%); }
.glow--b { bottom: -20%; right: -10%; width: 55vw; height: 55vw; background: radial-gradient(circle, rgba(191,255,0,0.10), transparent 70%); }
```

## LASER BUTTON (CORE)

```css
.laser-btn {
  position: relative; overflow: hidden; display: inline-flex; align-items: center; gap: 0.5rem;
  background: var(--accent); color: #000; border: none; cursor: pointer;
  font-family: "Geist Mono", monospace; font-size: 12px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.15em;
  padding: 0.9rem 1.6rem; border-radius: 9999px;
  box-shadow: 0 0 20px rgba(191,255,0,0.3);
  transition: box-shadow 0.4s var(--ease), transform 0.4s var(--ease);
}
.laser-btn::after {
  content: ""; position: absolute; top: -50%; left: -60%; width: 50%; height: 200%;
  background: linear-gradient(120deg, transparent, rgba(255,255,255,0.9) 40%, transparent);
  transform: rotate(45deg) translateX(-180%); pointer-events: none;
}
.laser-btn:hover { box-shadow: 0 0 35px rgba(191,255,0,0.6); transform: translateY(-2px); }
.laser-btn:hover::after { transition: transform 0.6s var(--ease); transform: rotate(45deg) translateX(320%); }
```

## LUMINOSITY CARD (CORE)

```css
.lum-card {
  position: relative; min-height: 450px; border-radius: 2rem; padding: 2.5rem;
  display: flex; flex-direction: column; justify-content: space-between;
  background: radial-gradient(circle at top left, rgba(255,255,255,0.03), transparent 60%);
  border: 1px solid rgba(255,255,255,0.05);
  transition: border-color 0.5s ease, background 0.5s ease, transform 0.5s var(--ease);
}
.lum-card:hover {
  border-color: rgba(191,255,0,0.3);
  background: radial-gradient(circle at top left, rgba(191,255,0,0.05), transparent 60%);
  transform: translateY(-6px);
}
```
ENHANCE WITH A MOUSE-PROXIMITY SPOTLIGHT: ON `mousemove`, SET `--mx`/`--my` TO THE CURSOR POSITION INSIDE THE CARD AND RENDER A `radial-gradient(circle at var(--mx) var(--my), rgba(191,255,0,0.08), transparent 40%)` AS A `::before` OVERLAY (FADE IN ON HOVER).

## HERO 3D GLASS TRANSFORM (CORE)

THE BACKGROUND IS A LARGE GLASS CARD TILTED ON THE X-AXIS. THE FOREGROUND HEADLINE SITS IN A SHARP-CORNERED 12PX WHITE BORDER BOX.

```css
.hero { position: relative; padding: clamp(6rem, 14vh, 11rem) 0 5rem; }
.hero__glass {
  position: absolute; inset: 8% 4% auto 4%; height: 70%;
  transform: perspective(1000px) rotateX(15deg);
  transform-origin: center top;
  background: linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01));
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 2rem; z-index: -1;
}
.hero__box { border: 12px solid #fff; border-radius: 0; padding: clamp(1.5rem, 4vw, 3.5rem); }
.hero__title { font-size: clamp(2.6rem, 10vw, 8.75rem); }
.hero__meta { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1.5rem; margin-top: 2.5rem; }
.countdown { font-family: "Plus Jakarta Sans", sans-serif; font-weight: 800; font-variant-numeric: tabular-nums; font-size: clamp(2rem, 5vw, 3.5rem); letter-spacing: -0.03em; }
```

## COUNTDOWN (TABULAR-NUMS, JS)

TARGET A FIXED FUTURE DATE; UPDATE EVERY SECOND. RENDER `DD : HH : MM : SS` WITH ZERO-PADDING. THE `tabular-nums` PREVENTS LAYOUT SHIFT.

```js
const target = new Date(Date.now() + 12 * 864e5).getTime();
const pad = (n) => String(n).padStart(2, "0");
function tick() {
  const d = Math.max(0, target - Date.now());
  const days = Math.floor(d / 864e5);
  const hrs = Math.floor((d % 864e5) / 36e5);
  const min = Math.floor((d % 36e5) / 6e4);
  const sec = Math.floor((d % 6e4) / 1e3);
  el.textContent = `${pad(days)} : ${pad(hrs)} : ${pad(min)} : ${pad(sec)}`;
}
tick(); setInterval(tick, 1000);
```

## BENTO GRID (3 → 1 COLUMN)

```css
.bento { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
@media (max-width: 900px) { .bento { grid-template-columns: 1fr; } }
```
THREE CARDS WITH MONO INDICES `01 / ETHOS`, `02 / VELOCITY`, `03 / SYSTEM` (TOP), LARGE UPPERCASE HEADLINE (MIDDLE), DIM BODY DESCRIPTION (BOTTOM).

## SOCIAL PROOF AVATARS

5 OVERLAPPING CIRCULAR AVATARS, 48PX, `margin-left:-14px`, EACH `border: 2px solid #BFFF00` AND `box-shadow: 0 0 12px rgba(191,255,0,0.4)`. VENDOR 5 PORTRAIT IMAGES LOCALLY.

## HORIZONTAL FORM (PILL)

```css
.form-pill {
  display: flex; align-items: center; gap: 0.5rem; max-width: 560px;
  background: rgba(255,255,255,0.05); backdrop-filter: blur(12px);
  border: 1px solid var(--border); border-radius: 9999px; padding: 0.5rem 0.5rem 0.5rem 1.5rem;
}
.form-pill input { flex: 1; background: transparent; border: none; outline: none; color: #fff;
  font-family: "Geist Mono", monospace; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; }
```

## MOBILE BOTTOM NAV (FIXED PILL)

```css
.mnav {
  position: fixed; bottom: 1.25rem; left: 50%; transform: translateX(-50%); z-index: 90;
  display: flex; gap: 0.25rem; padding: 0.4rem;
  background: rgba(10,10,10,0.8); backdrop-filter: blur(20px);
  border: 1px solid var(--border); border-radius: 9999px;
}
.mnav a { min-width: 48px; min-height: 48px; display: grid; place-items: center; border-radius: 9999px;
  color: var(--text-dim); transition: color 0.3s var(--ease), background 0.3s var(--ease); }
.mnav a:hover, .mnav a.active { color: var(--accent); background: rgba(191,255,0,0.08); }
@media (min-width: 900px) { .mnav { display: none; } }
```

## SCROLL REVEAL (JS)

USE AN `IntersectionObserver`: ELEMENTS START AT `opacity:0; transform: translateY(40px)` AND TRANSITION TO `opacity:1; translateY(0)` OVER `0.9s var(--ease)` WHEN THEY ENTER THE VIEWPORT (STAGGER VIA `transition-delay`).

## SECTIONS ORDER

HEADER → HERO (3D GLASS + 12PX BORDER BOX + COUNTDOWN META) → FEATURE BENTO GRID (3 LUMINOSITY CARDS) → SOCIAL PROOF & FORM → FOOTER → FIXED MOBILE BOTTOM NAV. ALL HEADLINES AND TECHNICAL LABELS UPPERCASE; HERO BORDER BOX KEEPS SHARP 0PX CORNERS; CARDS USE 2REM RADIUS.
