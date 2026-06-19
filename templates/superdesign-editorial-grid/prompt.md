# SUPERDESIGN — EDITORIAL GRID (EDITORIAL TECH AESTHETIC)

> NOTE: THE LIVE REFERENCE LINK (`COMPONENT-287DAD7E-...PREVIEW.SUPERDESIGN.DEV`) WAS BLOCKED BY THE BUILD ENVIRONMENT'S NETWORK EGRESS ALLOWLIST (HTTP 403 ON EVERY `*.SUPERDESIGN.DEV` HOST), SO THE PAGE COULD NOT BE SCRAPED OR SCREENSHOTTED FROM HERE. THE ORIGINAL PROMPT BELOW IS ITSELF A COMPLETE SPEC (EXACT COLORS, FONTS, EASINGS, TIMINGS, AND EVERY SECTION), AND THE BUILD WAS PRODUCED SAME-TO-SAME FROM IT, ENRICHED WITH THE IMPLEMENTATION DETAILS AND CORE CODE BELOW.

---

## ORIGINAL PROMPT (VERBATIM)

### SUMMARY

A SOPHISTICATED EDITORIAL-STYLE UI FEATURING A FIXED BACKGROUND GRID, HIGH-CONTRAST SERIF TYPOGRAPHY, AND TECHNICAL MONOSPACE ACCENTS WITH A MUTED FOREST GREEN PRIMARY COLOR.

### STYLE

THE DESIGN USES A TRIO OF TYPEFACES: PLAYFAIR DISPLAY (SERIF) FOR HEADERS AND EMOTIONAL IMPACT, SPACE GROTESK (SANS) FOR READABILITY, AND SPACE MONO (MONO) FOR ALL TECHNICAL DATA, LABELS, AND BUTTONS. THE COLOR PALETTE IS ORGANIC AND MUTED: BACKGROUND (#F7F6F2), FOREGROUND (#1C1C1C), AND PRIMARY ACCENT (#3D7068). LAYOUTS ARE GOVERNED BY A STRICT 4-COLUMN VERTICAL GUIDE SYSTEM AND 1PX BORDERS. TRANSITIONS USE A CUSTOM 'EDITORIAL' CUBIC-BEZIER(0.16, 1, 0.3, 1) FOR A SMOOTH, HIGH-FASHION FEEL.

#### SPEC

APPLY AN EDITORIAL TECH AESTHETIC USING BACKGROUND #F7F6F2 AND FOREGROUND #1C1C1C. TYPOGRAPHY: HEADINGS IN 'PLAYFAIR DISPLAY' (LIGHT WEIGHT, TIGHT TRACKING), UI LABELS AND BUTTONS IN 'SPACE MONO' (UPPERCASE, TRACKING 0.2EM-0.3EM), AND BODY TEXT IN 'SPACE GROTESK'. USE #3D7068 AS THE PRIMARY ACCENT COLOR FOR BUTTONS AND HIGHLIGHTS. IMPLEMENT 1PX BORDERS USING #E5E4DE. ALL ANIMATIONS MUST USE CUBIC-BEZIER(0.16, 1, 0.3, 1) WITH A 700MS-1000MS DURATION. INCLUDE A FIXED BACKGROUND GRID OF 40PX SQUARES WITH A RADIAL MASK THAT FADES TOWARD THE EDGES.

### LAYOUT & STRUCTURE

THE LAYOUT IS BUILT ON A MAX-WIDTH 7XL CONTAINER WITH VISIBLE STRUCTURAL VERTICAL DIVIDERS. SECTIONS ARE CLEARLY DEMARCATED BY 1PX HORIZONTAL BORDERS. THE NAVIGATION IS A FLOATING-TO-FIXED TRANSITION ELEMENT WITH BACKDROP BLUR.

#### STRUCTURAL GRID

CREATE A FIXED BACKGROUND LAYER WITH VERTICAL LINES AT 25%, 50%, AND 75% WIDTH USING 1PX #E5E4DE. OVERLAY A 40PX SQUARE GRID PATTERN WITH A RADIAL TRANSPARENCY MASK (40% CENTER OPACITY, 0% EDGE OPACITY).

#### HEADER NAVIGATION

A FIXED TOP NAV STARTING WITH 32PX PADDING-TOP. ON SCROLL, IT TRANSITIONS TO A BORDER-BOTTOM FIXED BAR WITH #F7F6F2/80 BACKDROP-BLUR. THE BRAND LOGO IS A SERIF 'SUPERDESIGN' IN 20PX FONT-SIZE, FLANKED BY TWO HORIZONTAL BARS OF VARYING WIDTHS (24PX AND 32PX). LINKS ARE 10PX UPPERCASE SPACE MONO WITH 0.3EM TRACKING.

#### HERO SECTION

CENTER-ALIGNED HERO WITH A PULSE-DOT BADGE. THE H1 SHOULD BE MASSIVE (9VW), SERIF, LIGHT WEIGHT, AND UPPERCASE. USE AN ITALICIZED SECONDARY COLOR (#B4B4B4) FOR KEY WORDS. PRIMARY CTA BUTTON SHOULD BE #3D7068 WITH A 'SPACE MONO' LABEL THAT INCREASES CHARACTER TRACKING FROM 0.2EM TO 0.4EM ON HOVER.

#### STATISTICS GRID

A 3-COLUMN GRID WITH 1PX #E5E4DE DIVIDERS. EACH CELL HAS 40PX PADDING, A 48PX BORDERED ICON BOX, A LARGE SERIF NUMBER (4XL), AND AN UPPERCASE MONO LABEL. CELLS TRANSITION TO A WHITE BACKGROUND ON HOVER.

#### TEXT REVEAL SECTION

A SCROLL-INTERACTIVE SECTION WHERE EACH WORD OF A LARGE SERIF PARAGRAPH (3XL TO 6XL) INCREASES OPACITY FROM 0.15 TO 1.0 AS THE USER SCROLLS, CREATING A 'READING' EFFECT.

#### INTERACTIVE WORKFLOW

TWO-COLUMN LAYOUT. LEFT SIDE: VERTICAL STEPS (01, 02, 03) IN MONO. CLICKING A STEP EXPANDS A DESCRIPTION AND REDUCES THE OPACITY OF INACTIVE STEPS TO 0.4. RIGHT SIDE: A STICKY CARD WITH A GRAYSCALE IMAGE (60% OPACITY, MULTIPLY BLEND MODE) AND A 'SCAN-LINE' PROGRESS BAR USING #3B82F6.

#### USE CASE TABS

A CENTERED TAB SWITCHER WITH PILL-SHAPED BUTTONS. CONTENT BELOW IS A LARGE BORDERED CARD (#F7F6F2) FEATURING A MASSIVE 240PX GHOST ICON (5% OPACITY) IN THE BACKGROUND AND A 3-COLUMN BENEFIT GRID AT THE BOTTOM.

#### CONTACT FORM

TWO-COLUMN GRID. LEFT SIDE: LARGE SERIF HEADING 'REQUEST ACCESS'. RIGHT SIDE: FORM WITH INPUTS THAT ARE ONLY BOTTOM-BORDERED (#E5E4DE). PLACEHOLDER TEXT IN 10PX MONO. SUBMIT BUTTON IS FULL-WIDTH WITH 0.4EM LETTER-SPACING AND A #3D7068 SHADOW-DROP.

### SPECIAL COMPONENTS

#### SCAN-LINE PROGRESS BAR

A TECHNICAL LOADING INDICATOR USED FOR STATUS UPDATES.

CREATE A 2PX HEIGHT CONTAINER WITH #E5E4DE BACKGROUND. INSIDE, A #3B82F6 LINE THAT ANIMATES FROM -100% TO 100% WIDTH/POSITION USING A 2S INFINITE CUBIC-BEZIER(0.8, 0, 0.2, 1) 'SLIDE' ANIMATION.

#### ANIMATED CTA BUTTON

HIGH-INTENT BUTTON WITH CHARACTER-SPACING AND BACKGROUND-FILL TRANSITIONS.

BUTTON WITH #3D7068 BACKGROUND, #FFFFFF TEXT, 'SPACE MONO' FONT, 10PX SIZE, 0.25EM TRACKING. ON HOVER: TRACKING INCREASES TO 0.4EM AND A WHITE/20% OVERLAY SLIDES UP FROM THE BOTTOM (TRANSLATE-Y-FULL TO 0).

#### EDITORIAL WORD REVEAL

SCROLL-SYNCED TYPOGRAPHY EFFECT.

SPLIT TEXT INTO INDIVIDUAL <SPAN> ELEMENTS. SET DEFAULT OPACITY TO 0.15. USING JS INTERSECTIONOBSERVER OR SCROLL LISTENER, MAP THE SCROLL PROGRESS OF THE CONTAINER TO THE INDEX OF THE SPANS, SETTING OPACITY TO 1.0 AS THEY 'ACTIVATE'.

### SPECIAL NOTES

MUST: MAINTAIN THE #F7F6F2 BACKGROUND TO AVOID A 'CLINICAL' WHITE LOOK. MUST: USE 1PX BORDERS INSTEAD OF SHADOWS FOR SECTION SEPARATION. MUST: ENSURE 'SPACE MONO' IS USED FOR ALL METADATA AND NUMERIC DATA. MUST NOT: USE ROUNDED CORNERS LARGER THAN 2PX. MUST NOT: USE VIBRANT GRADIENTS; STICK TO SOLID FILLS AND SIMPLE OPACITY TRANSITIONS.

---

## IMPLEMENTATION DETAILS (FOR SAME-TO-SAME REPRODUCTION)

SHIP AS A SINGLE SELF-CONTAINED STATIC PAGE: `INDEX.HTML` + `STYLE.CSS` + INLINE VANILLA JS. NO BUILD STEP. VENDOR ALL THREE FONTS LOCALLY (WOFF2 UNDER `ASSETS/FONTS/`) AND DECLARE WITH `@FONT-FACE` — NO REMOTE FONT HOTLINKS. VENDOR THE WORKFLOW IMAGE LOCALLY UNDER `ASSETS/`.

### DESIGN TOKENS (CSS CUSTOM PROPERTIES)

```css
:root{
  --bg:#f7f6f2; --fg:#1c1c1c; --primary:#3d7068; --border:#e5e4de;
  --muted:#b4b4b4; --scan:#3b82f6;
  --ease:cubic-bezier(0.16,1,0.3,1);          /* editorial easing */
  --maxw:80rem;                               /* tailwind 7xl = 1280px */
  --serif:"Playfair Display",Georgia,serif;
  --sans:"Space Grotesk",-apple-system,sans-serif;
  --mono:"Space Mono","SFMono-Regular",monospace;
}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--fg);font-family:var(--sans);-webkit-font-smoothing:antialiased}
.label{font-family:var(--mono);text-transform:uppercase;font-size:10px;letter-spacing:.3em;color:#888}
h1,h2,h3{font-family:var(--serif);font-weight:300;letter-spacing:-.02em}
```

### FIXED STRUCTURAL GRID (BEHIND EVERYTHING, `position:fixed; z-index:0; pointer-events:none`)

Two stacked layers inside a `.bg-grid` fixed full-viewport element:
1. Vertical guides — a centered `max-w` column with three 1px `--border` verticals at 25/50/75%. Implement as a centered `1280px` div with `border-left/right` plus two absolutely-positioned 1px lines, OR a repeating linear-gradient sized to the column.
2. 40px square grid: `background-image: linear-gradient(var(--border) 1px,transparent 1px), linear-gradient(90deg,var(--border) 1px,transparent 1px); background-size:40px 40px;` masked with `-webkit-mask-image: radial-gradient(ellipse at center, rgba(0,0,0,.4) 0%, transparent 70%)` so it fades to the edges. All real content sits in a `z-index:1` wrapper.

### NAV (FIXED, SCROLL STATE)

`position:fixed; top:0; padding-top:32px; transition: all .7s var(--ease)`. JS toggles `.scrolled` after `window.scrollY>40`, which sets `padding-top:0`, adds `border-bottom:1px solid var(--border)`, `background:rgba(247,246,242,.8)`, `backdrop-filter:blur(12px)`. Brand: serif `SUPERDESIGN` 20px flanked left/right by two stacked `<span>` bars `height:1px; background:var(--fg)` widths `24px` and `32px`. Links: `.label` style (10px mono, 0.3em). Right side: an "Animated CTA Button".

### HERO

Center column, `min-height:90vh`, flex column centered. Pulse-dot badge: a `6px` `--primary` dot with `@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}` `2s var(--ease) infinite`, next to a `.label` ("V1.0 — NOW IN PRIVATE BETA"). H1 `font-size:9vw; line-height:.95; text-transform:uppercase` with chosen words wrapped in `<em>` → `font-style:italic; color:var(--muted)`. Below: a `--sans` paragraph (max-width ~520px, color `#666`). Primary CTA = Animated CTA Button.

### ANIMATED CTA BUTTON (`.btn`)

```css
.btn{position:relative;overflow:hidden;background:var(--primary);color:#fff;
  font-family:var(--mono);font-size:10px;text-transform:uppercase;letter-spacing:.25em;
  padding:16px 32px;border:0;border-radius:2px;cursor:pointer;transition:letter-spacing .7s var(--ease)}
.btn:hover{letter-spacing:.4em}
.btn::after{content:"";position:absolute;inset:0;background:rgba(255,255,255,.2);
  transform:translateY(100%);transition:transform .7s var(--ease);z-index:0}
.btn:hover::after{transform:translateY(0)}
.btn span{position:relative;z-index:1}
```

### STATISTICS GRID

`display:grid; grid-template-columns:repeat(3,1fr)` with 1px dividers via `gap:1px; background:var(--border)` over `--bg` cells (each cell `background:var(--bg); padding:40px; transition:background .7s var(--ease)`; `:hover{background:#fff}`). Icon box `48px` square, `border:1px solid var(--border)`. Number serif `4xl` (~2.25rem). Label `.label`. Values e.g. `98%`, `12K+`, `0.4S`.

### TEXT REVEAL (EDITORIAL WORD REVEAL)

Large serif paragraph, font-size `clamp(1.875rem,5vw,3.75rem)` (3xl→6xl), each word a `<span class="word">` default `opacity:.15; transition:opacity .3s linear`. JS on scroll computes container progress `p = (vh - rect.top)/(vh + rect.height)` clamped 0..1, then activates `Math.floor(p*words.length)` spans to `opacity:1`.

### INTERACTIVE WORKFLOW

Two columns. LEFT: three steps `01/02/03` (mono number + serif title + collapsible `--sans` description). Active step `opacity:1`, inactive `opacity:.4`; clicking sets active, expands its description (`max-height` transition `.7s var(--ease)`). RIGHT: `position:sticky; top:120px` card, 1px border, holding a vendored image `filter:grayscale(1); opacity:.6; mix-blend-mode:multiply`, plus the Scan-Line Progress Bar and a small mono status caption.

### SCAN-LINE PROGRESS BAR

```css
.scan{height:2px;background:var(--border);overflow:hidden;position:relative}
.scan::before{content:"";position:absolute;top:0;height:100%;width:40%;background:var(--scan);
  animation:slide 2s cubic-bezier(0.8,0,0.2,1) infinite}
@keyframes slide{from{left:-100%}to{left:100%}}
```

### USE CASE TABS

Centered pill switcher: buttons `border-radius:2px` (NOT pill >2px — honor the no-rounded rule by using `border:1px solid var(--border)` pills with `border-radius:2px`; the active pill gets `background:var(--primary); color:#fff`). Below, a large bordered card `min-height:360px; background:var(--bg)` with a `240px` serif ghost glyph absolutely centered at `opacity:.05`, tab body copy, and a bottom 3-column benefit grid (mono labels + short serif lines), JS swaps content per tab.

### CONTACT FORM

Two columns: LEFT serif `REQUEST ACCESS` heading + mono sublabel; RIGHT form, inputs `border:0; border-bottom:1px solid var(--border); background:transparent; padding:12px 0; font-family:var(--sans)`, placeholders `.label` 10px mono. Submit = full-width Animated CTA Button with `letter-spacing:.4em` and `box-shadow:0 12px 30px -10px rgba(61,112,104,.6)`.

### GLOBAL ANIMATION RULES

- ALL transitions/reveals use `var(--ease)` at 700–1000ms (word-reveal opacity is the only fast linear exception).
- 1px `--border` separators between every section; NO box-shadows for separation (the CTA drop-shadow is the sole intentional shadow).
- `border-radius` never exceeds 2px anywhere. Solid fills only — no vibrant gradients.
- Section reveal-on-scroll: IntersectionObserver adds `.in` → `opacity:0;translateY(24px)` to `opacity:1;translateY(0)` over `.9s var(--ease)`.
