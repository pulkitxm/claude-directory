# OBSIDIAN ELITE — "MODERN OBSIDIAN" MONOCHROME EDITORIAL TEMPLATE

> SPECIAL CONTEXT FOR THIS BUILD: THE EXPERIMENT WAS COMMISSIONED AS A SUPERDESIGN-STYLE TEMPLATE TO BE REPRODUCED **SAME-TO-SAME** (PIXEL-FAITHFUL) FROM A REFERENCE DRAFT AT `HTTPS://P.SUPERDESIGN.DEV/DRAFT/ACE14BE0-7BEF-49C3-BDC1-C13FD975C283`. THE TARGET HOST WAS NOT REACHABLE FROM THE BUILD SANDBOX (HTTP 403 / NOT IN EGRESS ALLOWLIST), SO THE BUILD WAS GROUNDED ENTIRELY IN THE DETAILED PROSE SPEC BELOW. SHIP IT AS PLAIN STATIC HTML + CSS + A SMALL AMOUNT OF VANILLA JS, RUNNABLE OFFLINE WITH ALL FONTS VENDORED LOCALLY. NO BUILD STEP REQUIRED. CATEGORY: `templates`.

# SUMMARY

A MINIMALIST, DARK-THEMED DESIGN SYSTEM CHARACTERIZED BY EDITORIAL TYPOGRAPHY, TECHNICAL MONOSPACE LABELS, AND FROSTED-GLASS UI ELEMENTS FOR A PREMIUM 'ELITE' DIGITAL EXPERIENCE.

# STYLE

THE STYLE ESSENCE IS 'MODERN OBSIDIAN'. IT PAIRS HIGH-IMPACT SERIF ITALICS WITH TECHNICAL MONOSPACE AND FUNCTIONAL SANS-SERIF. THE PALETTE IS STRICTLY MONOCHROMATIC (#080808 TO #FFFFFF) WITH SILVER GRADIENTS. LAYOUTS USE EXTREME SPACING (FLUID 92VW) AND A NOISE-TEXTURED BACKGROUND TO CREATE DEPTH WITHOUT COLOR. ANIMATION IS PURPOSEFUL, USING CUBIC-BEZIER CURVES FOR SLIDE-UP ENTRY AND SMOOTH TRANSITIONS.

## SPEC

### CORE STYLE SPECS
- **PALETTE**: OBSIDIAN BACKGROUND (#080808), PURE WHITE (#FFFFFF), SILVER TEXT (#E2E8F0), SILVER GRADIENT (LINEAR-GRADIENT 135DEG, #F8FAFC 0%, #94A3B8 100%).
- **TYPOGRAPHY**:
  - **SERIF (HEADLINES)**: 'DM SERIF DISPLAY', ITALICIZED, TRACKING-TIGHTER, LEADING-0.85. HERO SIZE: CLAMP(42PX, 10VW, 140PX).
  - **MONO (SYSTEM/UI)**: 'GEIST MONO', WEIGHT 100-900. USED FOR LABELS, BUTTONS, AND METADATA AT 10PX-14PX. TRACKING: 0.2EM TO 0.5EM UPPERCASE.
  - **SANS (BODY)**: 'INTER', WEIGHT 300-600. USED FOR READABILITY AT 14PX-18PX.
- **BORDERS & CORNERS**: BORDER COLOR `RGBA(255, 255, 255, 0.08)`. HERO RADIUS: 4REM (DESKTOP), 2REM (MOBILE). CARD RADIUS: 1REM (16PX).
- **EFFECTS**:
  - **NOISE**: SVG FRACTAL NOISE OVERLAY AT 0.05 OPACITY.
  - **GLASS**: `BACKGROUND: RGBA(255, 255, 255, 0.02)`, `BACKDROP-FILTER: BLUR(24PX)`.
  - **BUTTONS**: SILVER GRADIENT BACKGROUND, BLACK TEXT, 1PX LIFT ON HOVER WITH `BOX-SHADOW: 0 0 20PX RGBA(255,255,255,0.15)`.
- **TRANSITIONS**: `CUBIC-BEZIER(0.16, 1, 0.3, 1)` FOR ALL ENTRY ANIMATIONS (0.8S DURATION).

# LAYOUT & STRUCTURE

THE PAGE FOLLOWS A VERTICAL NARRATIVE FLOW: NAVIGATION -> EXPLOSIVE HERO -> DATA METADATA -> CAPTURE FORM -> URGENCY/SOCIAL PROOF -> FEATURE BENTO -> VALUE PROPOSITION -> TESTIMONIALS -> FINAL CTA -> FOOTER.

## HEADER / NAVIGATION

FULL WIDTH (92VW), PADDING 8 (32PX). LEFT SIDE: MONOSPACE BRAND LOGO WITH UPPERCASE TRACKING. RIGHT SIDE (DESKTOP): FLEX CONTAINER WITH BORDER-SEPARATED LINKS (`BG-WHITE/5`, `BORDER-WHITE/10`) AND A SOLID WHITE 'JOIN' BUTTON. MOBILE: SINGLE HAMBURGER ICON OR MINIMALIST LABEL.

## HERO SECTION

CONTAINER: 92VW. CENTERED LAYOUT. BACKGROUND: FAINT FROSTED GLASS CONTAINER (`OPACITY-30`) WITH LARGE 4REM RADIUS. CONTENT: MASSIVE SERIF HEADLINE WITH ITALICIZED SILVER-GRADIENT SPAN. BELOW HEADLINE: A FLUID THREE-COLUMN 'METADATA BAR' IN MONOSPACE (EST. DATE, DESCRIPTION, LOCATION/LIMIT). SPACING: `PY-12` TO `PY-32` DEPENDING ON VIEWPORT.

## BETA CAPTURE FORM

WIDTH: MAX-W-2XL. STRUCTURE: HORIZONTAL FLEX (SM:ROW) INSIDE A `FROSTED-GLASS` 2XL-ROUNDED CONTAINER. INPUT: TRANSPARENT BACKGROUND, `FONT-MONO` TEXT, NO-BORDER, 100% WIDTH. BUTTON: `SILVER-BTN`, HIGH-CONTRAST BLACK TEXT, `FONT-MONO` BOLD, UPPERCASE TRACKING, `ROUNDED-XL`.

## BENTO FEATURE GRID

GRID: 1 COL (MOBILE), 2 COL (MD), 4 COL (LG). BORDERS: `BORDER-Y` AND `BORDER-R` USING `WHITE/10` TO CREATE A TECHNICAL GRID LOOK. CARDS: `BENTO-CARD` WITH HOVER EFFECTS (BACKGROUND `WHITE/0.03` AND BORDER `WHITE/0.2`). CONTENT: TOP-LEFT INDEX (E.G., 01 / EFFICIENCY) IN 10PX MONO, FOLLOWED BY 4XL SERIF HEADLINE AND MONO-CASE BODY TEXT.

## TESTIMONIALS

FULL WIDTH BACKGROUND `WHITE/[0.01]`. HEADLINE: MASSIVE CENTERED SERIF ITALICS. CONTENT: TWO-COLUMN GRID WITH DEEP `PL-16` BORDER-LEFT ACCENT. TYPOGRAPHY: 5XL SERIF FOR THE QUOTE, MONOSPACE FOR THE ATTRIBUTION/TITLE. AVATARS: GRAYSCALE WITH CONTRAST-125 FILTER.

# SPECIAL COMPONENTS

## COUNTDOWN TIMER

EDITORIAL STYLE COUNTDOWN WITH SERIF NUMERALS AND SLASH SEPARATORS.

FONT: 'DM SERIF DISPLAY', SIZE: 5XL TO 120PX. COLOR: WHITE/90. SEPARATORS: `/` AT OPACITY-10. LAYOUT: FLEX-ROW WITH INDIVIDUAL CONTAINERS FOR HH / MM / SS. SUB-LABELS (IF ANY) IN 10PX MONOSPACE ABOVE DIGITS.

## FLOATING MOBILE BOTTOM NAV

A PILL-SHAPED NAVIGATION BAR THAT APPEARS ONLY AFTER THE HERO SECTION IS PASSED.

POSITION: FIXED, BOTTOM-6, CENTERED. STYLE: `MOBILE-NAV-BLUR` (BLUR 24PX, OBSIDIAN 85% OPACITY). SHAPE: FULLY ROUNDED (PILL). CONTENT: 5-ITEM FLEX LAYOUT. MIDDLE ITEM IS A PRIMARY ACTION BUTTON (WHITE BG, BLACK TEXT). OTHER ITEMS: ICON + 8PX MONOSPACE LABEL. TRANSITION: `TRANSLATE-Y-32` AND `OPACITY-0` WHEN HIDDEN.

## MEMBER REGISTRY CARD

A BENTO CARD SHOWING SMALL USER BADGES WITH HOVER INTERACTIONS.

GRID: 2X2 LAYOUT INSIDE A BENTO CARD. ITEMS: 10PX GRAYSCALE AVATAR + 8PX MONOSPACE TITLE. HOVER: `TRANSLATE-X-1`, TEXT COLOR TRANSITIONS TO FULL WHITE, AVATAR SCALES TO 1.1X. BACKGROUND: LARGE DECORATIVE ICON (E.G., ID CARD) AT 5% OPACITY IN BOTTOM RIGHT.

# SPECIAL NOTES

MUST MAINTAIN THE STRICT MONOCHROME/SILVER PALETTE; ANY STANDARD COLORS (BLUE, RED, GREEN) WILL BREAK THE PREMIUM AESTHETIC. MUST USE 'GEIST MONO' FOR ALL TECHNICAL LABELS TO MAINTAIN THE 'ENGINEERED' FEEL. MUST USE FLUID WIDTH (92VW) INSTEAD OF STANDARD TAILWIND CONTAINERS TO MAXIMIZE EDITORIAL IMPACT. MUST NOT USE STANDARD BOX-SHADOWS; USE BORDERS OR BACKDROP-BLURS FOR DEPTH. MUST NOT USE NON-ITALICIZED SERIF FOR HEADLINES.

---

# REFERENCE IMPLEMENTATION NOTES (CORE CODE)

THE FOLLOWING ARE THE ESSENTIAL IMPLEMENTATION DETAILS PRODUCED FOR THIS TEMPLATE. REGENERATING FROM THESE SHOULD YIELD THE SAME OUTPUT. THE PRODUCT IS A FICTIONAL INVITE-ONLY PLATFORM CALLED **OBSIDIAN** (TAGLINE: "BY INVITATION ONLY"), A WAITLIST/BETA-CAPTURE LANDING PAGE.

## FONTS (VENDORED LOCALLY, WOFF2 IN `./assets/fonts/`)

```css
@font-face{font-family:'DM Serif Display';src:url('./assets/fonts/dm-serif-italic.woff2') format('woff2');font-weight:400;font-style:italic;font-display:swap;}
@font-face{font-family:'Geist Mono';src:url('./assets/fonts/geist-mono.woff2') format('woff2');font-weight:100 900;font-display:swap;}
@font-face{font-family:'Inter';src:url('./assets/fonts/inter.woff2') format('woff2');font-weight:300 600;font-display:swap;}
```

## CSS TOKENS

```css
:root{
  --obsidian:#080808; --white:#FFFFFF; --silver:#E2E8F0;
  --silver-grad:linear-gradient(135deg,#F8FAFC 0%,#94A3B8 100%);
  --border:rgba(255,255,255,0.08); --border-strong:rgba(255,255,255,0.20);
  --glass:rgba(255,255,255,0.02); --glass-2:rgba(255,255,255,0.03);
  --ease:cubic-bezier(0.16,1,0.3,1);
  --serif:'DM Serif Display',Georgia,serif;
  --mono:'Geist Mono',ui-monospace,monospace;
  --sans:'Inter',system-ui,sans-serif;
}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--obsidian);color:var(--silver);font-family:var(--sans);font-weight:300;-webkit-font-smoothing:antialiased;overflow-x:hidden}
.wrap{width:92vw;max-width:1500px;margin:0 auto}
```

## NOISE SVG OVERLAY (FIXED, 0.05 OPACITY, POINTER-EVENTS NONE)

```css
.noise{position:fixed;inset:0;z-index:1;pointer-events:none;opacity:.05;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}
```

## CORE CLASSES

```css
.mono{font-family:var(--mono);text-transform:uppercase;letter-spacing:.3em;font-size:11px;color:rgba(226,232,240,.5)}
.serif{font-family:var(--serif);font-style:italic;line-height:.85;letter-spacing:-.03em}
.silver-text{background:var(--silver-grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.glass{background:var(--glass);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid var(--border)}
.silver-btn{background:var(--silver-grad);color:#080808;font-family:var(--mono);font-weight:700;text-transform:uppercase;letter-spacing:.2em;border:none;border-radius:.75rem;cursor:pointer;transition:transform .4s var(--ease),box-shadow .4s var(--ease)}
.silver-btn:hover{transform:translateY(-1px);box-shadow:0 0 20px rgba(255,255,255,.15)}
.bento-card{border:1px solid var(--border);background:transparent;transition:background .6s var(--ease),border-color .6s var(--ease)}
.bento-card:hover{background:var(--glass-2);border-color:var(--border-strong)}
```

## ENTRY ANIMATION (SLIDE-UP, 0.8S, IntersectionObserver toggles `.in`)

```css
.reveal{opacity:0;transform:translateY(40px);transition:opacity .8s var(--ease),transform .8s var(--ease)}
.reveal.in{opacity:1;transform:none}
```

## HERO MARKUP (SHAPE)

```html
<section class="hero wrap">
  <div class="hero-glass glass"></div>   <!-- opacity:.3 frosted bg with border-radius:4rem -->
  <p class="mono">EST. 2026 — APPLICATIONS NOW OPEN</p>
  <h1 class="serif hero-title">An elite circle for <span class="silver-text">the obsessed.</span></h1>
  <div class="meta-bar">  <!-- 3-col monospace grid, border-t -->
    <div><span class="mono">EST.</span><p>JUNE 2026</p></div>
    <div><span class="mono">MANDATE</span><p>A private network for builders…</p></div>
    <div><span class="mono">CAPACITY</span><p>500 SEATS / GLOBAL</p></div>
  </div>
</section>
```

## COUNTDOWN (SERIF NUMERALS, SLASH SEPARATORS AT OPACITY .1, JS TICKS EVERY 1S)

```html
<div class="countdown">
  <div class="cd-unit"><span class="mono">DAYS</span><span class="serif cd-num" id="d">00</span></div>
  <span class="cd-sep serif">/</span>
  <div class="cd-unit"><span class="mono">HRS</span><span class="serif cd-num" id="h">00</span></div>
  <span class="cd-sep serif">/</span>
  …MIN / SEC…
</div>
```
```css
.cd-num{font-size:clamp(2.5rem,8vw,7.5rem);color:rgba(255,255,255,.9)}
.cd-sep{font-size:clamp(2rem,6vw,5rem);opacity:.1}
```

## FLOATING MOBILE BOTTOM NAV

FIXED `bottom:1.5rem`, CENTERED, PILL (`border-radius:999px`), `.mobile-nav-blur{background:rgba(8,8,8,.85);backdrop-filter:blur(24px)}`. 5 ITEMS, MIDDLE IS WHITE-BG/BLACK-TEXT ACTION. HIDDEN BY DEFAULT (`transform:translateY(8rem);opacity:0`); JS ADDS `.show` AFTER HERO IS SCROLLED PAST. ON DESKTOP (>900PX) IT IS `display:none`.

## SECTIONS, IN ORDER

1. NAV (92vw, brand "OBSIDIAN◆" mono left; bordered glass links + white JOIN button right).
2. HERO (glass bg, italic serif headline w/ silver-gradient span, 3-col metadata bar).
3. COUNTDOWN ("APPLICATIONS CLOSE IN" — serif HH/MM/SS with slash separators, live JS).
4. BETA CAPTURE FORM (max-w 2xl glass pill: transparent mono input + silver-btn "REQUEST ACCESS"; JS shows "✓ ON THE LIST — POSITION #0xxx" success state).
5. URGENCY / SOCIAL PROOF (mono stat row: "2,481 APPLICANTS · 500 SEATS · 18% ACCEPTANCE").
6. BENTO FEATURE GRID (4 cards lg / 2 md / 1 mobile, index "01 / EFFICIENCY" mono + 4xl serif title + mono body; includes the MEMBER REGISTRY CARD with 2x2 grayscale avatars and a large 5%-opacity decorative SVG id-card icon bottom-right).
7. VALUE PROPOSITION (large centered italic serif statement with silver-gradient emphasis).
8. TESTIMONIALS (bg white/[0.01], centered italic serif headline; 2-col quotes with pl-16 border-left accent, 5xl serif quote, mono attribution, grayscale contrast-125 avatars).
9. FINAL CTA (massive italic serif + silver-btn).
10. FOOTER (mono columns, fine border-t, copyright).

## VENDORED AVATARS

GRAYSCALE PORTRAIT IMAGES ARE GENERATED LOCALLY AS DETERMINISTIC SVG DATA-PLACEHOLDERS (MONOCHROME GRADIENT DISCS WITH INITIALS) SO THE PROJECT STAYS FULLY OFFLINE AND ON-PALETTE — NO REMOTE IMAGE HOTLINKS.
