# MODERN OBSIDIAN — ELITE WAITLIST / DESIGN SYSTEM

> NOTE: THIS PROMPT IS THE ORIGINAL BRIEF (REPRODUCED VERBATIM BELOW) AUGMENTED WITH THE
> CONCRETE IMPLEMENTATION DETAILS REQUIRED TO REPRODUCE THE SAME-TO-SAME OUTPUT — EXACT HEX,
> FONTS/WEIGHTS, COPY, SECTION LAYOUT, ANIMATION CURVES, AND THE CORE COMPONENT CODE
> (COUNTDOWN TIMER, FLOATING MOBILE BOTTOM NAV, MEMBER REGISTRY CARD, GLASS/NOISE EFFECTS,
> SILVER BUTTON). REFERENCE DESIGN: A SUPERDESIGN DRAFT (`ace14be0-7bef-49c3-bdc1-c13fd975c283`).

---

## SUMMARY

A MINIMALIST, DARK-THEMED DESIGN SYSTEM CHARACTERIZED BY EDITORIAL TYPOGRAPHY, TECHNICAL MONOSPACE LABELS, AND FROSTED-GLASS UI ELEMENTS FOR A PREMIUM 'ELITE' DIGITAL EXPERIENCE.

## STYLE

THE STYLE ESSENCE IS 'MODERN OBSIDIAN'. IT PAIRS HIGH-IMPACT SERIF ITALICS WITH TECHNICAL MONOSPACE AND FUNCTIONAL SANS-SERIF. THE PALETTE IS STRICTLY MONOCHROMATIC (#080808 TO #FFFFFF) WITH SILVER GRADIENTS. LAYOUTS USE EXTREME SPACING (FLUID 92VW) AND A NOISE-TEXTURED BACKGROUND TO CREATE DEPTH WITHOUT COLOR. ANIMATION IS PURPOSEFUL, USING CUBIC-BEZIER CURVES FOR SLIDE-UP ENTRY AND SMOOTH TRANSITIONS.

### CORE STYLE SPECS

- **PALETTE**: OBSIDIAN BACKGROUND (#080808), PURE WHITE (#FFFFFF), SILVER TEXT (#E2E8F0), SILVER GRADIENT (LINEAR-GRADIENT 135DEG, #F8FAFC 0%, #94A3B8 100%).
- **TYPOGRAPHY**:
  - **SERIF (HEADLINES)**: 'DM SERIF DISPLAY', ITALICIZED, TRACKING-TIGHTER, LEADING-0.85. HERO SIZE: CLAMP(42PX, 10VW, 140PX).
  - **MONO (SYSTEM/UI)**: 'GEIST MONO', WEIGHT 100-900. USED FOR LABELS, BUTTONS, AND METADATA AT 10PX-14PX. TRACKING: 0.2EM TO 0.5EM UPPERCASE.
  - **SANS (BODY)**: 'INTER', WEIGHT 300-600. USED FOR READABILITY AT 14PX-18PX.
- **BORDERS & CORNERS**: BORDER COLOR `rgba(255, 255, 255, 0.08)`. HERO RADIUS: 4REM (DESKTOP), 2REM (MOBILE). CARD RADIUS: 1REM (16PX).
- **EFFECTS**:
  - **NOISE**: SVG FRACTAL NOISE OVERLAY AT 0.05 OPACITY.
  - **GLASS**: `background: rgba(255, 255, 255, 0.02)`, `backdrop-filter: blur(24px)`.
  - **BUTTONS**: SILVER GRADIENT BACKGROUND, BLACK TEXT, 1PX LIFT ON HOVER WITH `box-shadow: 0 0 20px rgba(255,255,255,0.15)`.
- **TRANSITIONS**: `cubic-bezier(0.16, 1, 0.3, 1)` FOR ALL ENTRY ANIMATIONS (0.8S DURATION).

## LAYOUT & STRUCTURE

THE PAGE FOLLOWS A VERTICAL NARRATIVE FLOW: NAVIGATION -> EXPLOSIVE HERO -> DATA METADATA -> CAPTURE FORM -> URGENCY/SOCIAL PROOF -> FEATURE BENTO -> VALUE PROPOSITION -> TESTIMONIALS -> FINAL CTA -> FOOTER.

### HEADER / NAVIGATION

FULL WIDTH (92VW), PADDING 8 (32PX). LEFT SIDE: MONOSPACE BRAND LOGO WITH UPPERCASE TRACKING. RIGHT SIDE (DESKTOP): FLEX CONTAINER WITH BORDER-SEPARATED LINKS (`bg-white/5`, `border-white/10`) AND A SOLID WHITE 'JOIN' BUTTON. MOBILE: SINGLE HAMBURGER ICON OR MINIMALIST LABEL.

### HERO SECTION

CONTAINER: 92VW. CENTERED LAYOUT. BACKGROUND: FAINT FROSTED GLASS CONTAINER (`opacity-30`) WITH LARGE 4REM RADIUS. CONTENT: MASSIVE SERIF HEADLINE WITH ITALICIZED SILVER-GRADIENT SPAN. BELOW HEADLINE: A FLUID THREE-COLUMN 'METADATA BAR' IN MONOSPACE (EST. DATE, DESCRIPTION, LOCATION/LIMIT). SPACING: `py-12` TO `py-32` DEPENDING ON VIEWPORT.

### BETA CAPTURE FORM

WIDTH: MAX-W-2XL. STRUCTURE: HORIZONTAL FLEX (SM:ROW) INSIDE A `frosted-glass` 2XL-ROUNDED CONTAINER. INPUT: TRANSPARENT BACKGROUND, `font-mono` TEXT, NO-BORDER, 100% WIDTH. BUTTON: `silver-btn`, HIGH-CONTRAST BLACK TEXT, `font-mono` BOLD, UPPERCASE TRACKING, `rounded-xl`.

### BENTO FEATURE GRID

GRID: 1 COL (MOBILE), 2 COL (MD), 4 COL (LG). BORDERS: `border-y` AND `border-r` USING `white/10` TO CREATE A TECHNICAL GRID LOOK. CARDS: `bento-card` WITH HOVER EFFECTS (BACKGROUND `white/0.03` AND BORDER `white/0.2`). CONTENT: TOP-LEFT INDEX (E.G., 01 / EFFICIENCY) IN 10PX MONO, FOLLOWED BY 4XL SERIF HEADLINE AND MONO-CASE BODY TEXT.

### TESTIMONIALS

FULL WIDTH BACKGROUND `white/[0.01]`. HEADLINE: MASSIVE CENTERED SERIF ITALICS. CONTENT: TWO-COLUMN GRID WITH DEEP `pl-16` BORDER-LEFT ACCENT. TYPOGRAPHY: 5XL SERIF FOR THE QUOTE, MONOSPACE FOR THE ATTRIBUTION/TITLE. AVATARS: GRAYSCALE WITH CONTRAST-125 FILTER.

## SPECIAL COMPONENTS

### COUNTDOWN TIMER

EDITORIAL STYLE COUNTDOWN WITH SERIF NUMERALS AND SLASH SEPARATORS.

FONT: 'DM SERIF DISPLAY', SIZE: 5XL TO 120PX. COLOR: WHITE/90. SEPARATORS: `/` AT OPACITY-10. LAYOUT: FLEX-ROW WITH INDIVIDUAL CONTAINERS FOR HH / MM / SS. SUB-LABELS (IF ANY) IN 10PX MONOSPACE ABOVE DIGITS.

### FLOATING MOBILE BOTTOM NAV

A PILL-SHAPED NAVIGATION BAR THAT APPEARS ONLY AFTER THE HERO SECTION IS PASSED.

POSITION: FIXED, BOTTOM-6, CENTERED. STYLE: `mobile-nav-blur` (BLUR 24PX, OBSIDIAN 85% OPACITY). SHAPE: FULLY ROUNDED (PILL). CONTENT: 5-ITEM FLEX LAYOUT. MIDDLE ITEM IS A PRIMARY ACTION BUTTON (WHITE BG, BLACK TEXT). OTHER ITEMS: ICON + 8PX MONOSPACE LABEL. TRANSITION: `translate-y-32` AND `opacity-0` WHEN HIDDEN.

### MEMBER REGISTRY CARD

A BENTO CARD SHOWING SMALL USER BADGES WITH HOVER INTERACTIONS.

GRID: 2X2 LAYOUT INSIDE A BENTO CARD. ITEMS: 10PX GRAYSCALE AVATAR + 8PX MONOSPACE TITLE. HOVER: `translate-x-1`, TEXT COLOR TRANSITIONS TO FULL WHITE, AVATAR SCALES TO 1.1X. BACKGROUND: LARGE DECORATIVE ICON (E.G., ID CARD) AT 5% OPACITY IN BOTTOM RIGHT.

## SPECIAL NOTES

MUST MAINTAIN THE STRICT MONOCHROME/SILVER PALETTE; ANY STANDARD COLORS (BLUE, RED, GREEN) WILL BREAK THE PREMIUM AESTHETIC. MUST USE 'GEIST MONO' FOR ALL TECHNICAL LABELS TO MAINTAIN THE 'ENGINEERED' FEEL. MUST USE FLUID WIDTH (92VW) INSTEAD OF STANDARD TAILWIND CONTAINERS TO MAXIMIZE EDITORIAL IMPACT. MUST NOT USE STANDARD BOX-SHADOWS; USE BORDERS OR BACKDROP-BLURS FOR DEPTH. MUST NOT USE NON-ITALICIZED SERIF FOR HEADLINES.

---

## IMPLEMENTATION NOTES (AUGMENTED — FOR SAME-TO-SAME REPRODUCTION)

### TECH & DELIVERY

- SINGLE SELF-CONTAINED STATIC BUILD: `index.html` + `styles.css` + `app.js`. NO BUILD STEP, NO FRAMEWORK.
- VENDOR ALL FONTS LOCALLY UNDER `assets/fonts/` AND SERVE VIA `@font-face` (NO REMOTE FONT HOTLINKS):
  - **DM SERIF DISPLAY** — REGULAR + ITALIC (WEIGHT 400).
  - **GEIST MONO** — VARIABLE / WEIGHTS 100–900.
  - **INTER** — VARIABLE / WEIGHTS 300–600.
- AVATARS: VENDOR LOCALLY AS GENERATED GRAYSCALE SVG MONOGRAM BADGES UNDER `assets/avatars/` (NO REMOTE PHOTO HOTLINKS); APPLY `filter: grayscale(1) contrast(1.25)`.

### EXACT TOKENS (`:root`)

```css
:root{
  --obsidian:#080808; --obsidian-soft:#0c0c0c;
  --white:#ffffff; --silver:#e2e8f0;
  --silver-grad:linear-gradient(135deg,#f8fafc 0%,#94a3b8 100%);
  --border:rgba(255,255,255,.08); --border-strong:rgba(255,255,255,.18);
  --glass:rgba(255,255,255,.02); --glass-2:rgba(255,255,255,.03);
  --ease:cubic-bezier(.16,1,.3,1);
  --fluid:92vw;
}
```

### NOISE OVERLAY (FIXED, BEHIND CONTENT, 0.05 OPACITY)

```css
.noise{position:fixed;inset:0;z-index:1;pointer-events:none;opacity:.05;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}
```
PLUS A SUBTLE RADIAL VIGNETTE: `radial-gradient(ellipse at 50% 0%, rgba(255,255,255,.04), transparent 60%)` ON `body`.

### GLASS + SILVER BUTTON (CORE)

```css
.frosted-glass{background:var(--glass);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid var(--border);}
.silver-btn{background:var(--silver-grad);color:#080808;font-family:"Geist Mono",monospace;font-weight:700;
  text-transform:uppercase;letter-spacing:.2em;border:none;cursor:pointer;transition:transform .4s var(--ease),box-shadow .4s var(--ease);}
.silver-btn:hover{transform:translateY(-1px);box-shadow:0 0 20px rgba(255,255,255,.15);}
```

### SILVER-GRADIENT TEXT (HERO ITALIC SPAN)

```css
.silver-text{background:var(--silver-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
```

### ENTRY ANIMATION (SLIDE-UP, INTERSECTIONOBSERVER, STAGGERED)

```css
.reveal{opacity:0;transform:translateY(40px);transition:opacity .8s var(--ease),transform .8s var(--ease);}
.reveal.in{opacity:1;transform:none;}
```
```js
const io=new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){
  e.target.style.transitionDelay=(e.target.dataset.delay||0)+'ms';
  e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
```

### COUNTDOWN TIMER (CORE — SERIF NUMERALS, SLASH SEPARATORS)

```html
<div class="countdown">
  <div class="cd-unit"><span class="cd-label">DAYS</span><span class="cd-num" id="cd-d">00</span></div>
  <span class="cd-sep">/</span>
  <div class="cd-unit"><span class="cd-label">HRS</span><span class="cd-num" id="cd-h">00</span></div>
  <span class="cd-sep">/</span>
  <div class="cd-unit"><span class="cd-label">MIN</span><span class="cd-num" id="cd-m">00</span></div>
  <span class="cd-sep">/</span>
  <div class="cd-unit"><span class="cd-label">SEC</span><span class="cd-num" id="cd-s">00</span></div>
</div>
```
```css
.cd-num{font-family:"DM Serif Display",serif;font-style:italic;font-size:clamp(48px,9vw,120px);
  line-height:.85;color:rgba(255,255,255,.9);}
.cd-sep{font-family:"DM Serif Display",serif;font-style:italic;font-size:clamp(40px,8vw,100px);color:rgba(255,255,255,.1);}
.cd-label{font-family:"Geist Mono",monospace;font-size:10px;letter-spacing:.4em;color:rgba(255,255,255,.4);text-transform:uppercase;}
```
```js
const target=new Date(Date.now()+1000*60*60*24*42); // ~42 days out
function tick(){let s=Math.max(0,(target-Date.now())/1000);
  const d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60),sec=Math.floor(s%60);
  const p=n=>String(n).padStart(2,'0');
  cdD.textContent=p(d);cdH.textContent=p(h);cdM.textContent=p(m);cdS.textContent=p(sec);}
setInterval(tick,1000);tick();
```

### FLOATING MOBILE BOTTOM NAV (CORE — APPEARS AFTER HERO)

```css
.mobile-nav{position:fixed;left:50%;bottom:1.5rem;transform:translateX(-50%) translateY(8rem);opacity:0;
  z-index:60;display:flex;align-items:center;gap:.25rem;padding:.5rem;border-radius:999px;
  background:rgba(8,8,8,.85);backdrop-filter:blur(24px);border:1px solid var(--border);
  transition:transform .5s var(--ease),opacity .5s var(--ease);}
.mobile-nav.show{transform:translateX(-50%) translateY(0);opacity:1;}
.mobile-nav .mid{background:#fff;color:#080808;border-radius:999px;}
@media(min-width:768px){.mobile-nav{display:none;}}
```
```js
const heroEnd=document.querySelector('#hero');
new IntersectionObserver(([e])=>nav.classList.toggle('show',!e.isIntersecting),{threshold:0})
  .observe(heroEnd);
```

### MEMBER REGISTRY CARD (CORE — 2×2 BADGES, HOVER SLIDE)

```css
.registry{display:grid;grid-template-columns:1fr 1fr;gap:.75rem 1rem;position:relative;}
.reg-item{display:flex;align-items:center;gap:.6rem;transition:transform .4s var(--ease);}
.reg-item:hover{transform:translateX(.25rem);}
.reg-item img{width:24px;height:24px;border-radius:999px;filter:grayscale(1) contrast(1.25);transition:transform .4s var(--ease);}
.reg-item:hover img{transform:scale(1.1);}
.reg-item span{font-family:"Geist Mono",monospace;font-size:8px;letter-spacing:.2em;color:rgba(255,255,255,.5);text-transform:uppercase;transition:color .4s var(--ease);}
.reg-item:hover span{color:#fff;}
.registry .deco{position:absolute;right:0;bottom:0;opacity:.05;width:120px;height:120px;} /* ID-card SVG */
```

### REAL COPY / CONTENT

- BRAND / LOGO: `OBSIDIAN` (MONO, UPPERCASE, `letter-spacing:.3em`). NAV LINKS: `MANIFESTO`, `SYSTEM`, `ACCESS`; CTA BUTTON `JOIN`.
- NAV STATUS PILL (DESKTOP): `● PRIVATE BETA — 2026`.
- HERO EYEBROW (MONO 10PX, `letter-spacing:.5em`): `THE ELITE DIGITAL REGISTRY`.
- HERO HEADLINE (SERIF ITALIC, SILVER SPAN ON ONE WORD): `Access is not given. It is *earned.*` (THE WORD `earned.` IS THE SILVER-GRADIENT ITALIC SPAN).
- HERO METADATA BAR (3 COLUMNS, MONO): `EST. / 2026.06`, `A CURATED REGISTRY FOR THE FEW WHO BUILD THE FUTURE.`, `GLOBAL · 500 SEATS`.
- COUNTDOWN EYEBROW: `ENROLLMENT CLOSES IN`.
- BETA FORM EYEBROW: `REQUEST AN INVITATION`; PLACEHOLDER `your@email.com`; BUTTON `REQUEST`; SUCCESS MESSAGE `✓ RECEIVED. WE WILL BE IN TOUCH.`
- URGENCY / SOCIAL PROOF STRIP (MONO): `347 / 500 SEATS CLAIMED` WITH A THIN SILVER PROGRESS BAR (~69%), AND `+200 ON THE WAITLIST`.
- BENTO SECTION HEADER: EYEBROW `THE SYSTEM`, SERIF ITALIC `Engineered for the *obsessive.*`. FOUR CARDS:
  - `01 / SIGNAL` — `Pure Signal` — "NO NOISE. NO ADS. NO ALGORITHMS. ONLY THE WORK AND THE PEOPLE BEHIND IT."
  - `02 / VELOCITY` — `Built for Velocity` — "INSTANT. PRIVATE. RELENTLESSLY FAST. THE SYSTEM DISAPPEARS SO YOU DON'T."
  - `03 / REGISTRY` — `The Registry` — RENDERED AS THE **MEMBER REGISTRY CARD** (2×2 BADGES: `A. VOSS / FOUNDER`, `K. MORI / DESIGN`, `R. KHAN / ENGINEER`, `E. LANG / RESEARCH`).
  - `04 / CRAFT` — `Obsession with Craft` — "EVERY PIXEL, EVERY MILLISECOND, EVERY WORD — ACCOUNTED FOR."
- VALUE PROPOSITION BLOCK: EYEBROW `THE THESIS`, SERIF ITALIC `We believe the future belongs to those who *refuse to settle.*` PLUS A SHORT INTER BODY PARAGRAPH.
- TESTIMONIALS: HEADER SERIF ITALIC `Words from the *registry.*` TWO QUOTES (SERIF 5XL), EACH WITH GRAYSCALE AVATAR + MONO ATTRIBUTION:
  - "OBSIDIAN IS THE ONLY PLACE THAT FEELS BUILT FOR PEOPLE WHO ACTUALLY SHIP." — `MAYA OKONKWO / FOUNDER, NULLSPACE`.
  - "I DELETED EVERYTHING ELSE. THIS IS THE LAST NETWORK I'LL EVER NEED." — `D. ASHRAF / PRINCIPAL DESIGNER`.
- FINAL CTA: SERIF ITALIC `The door is closing.` + MONO SUBLINE `500 SEATS. NO EXCEPTIONS.` + SILVER BUTTON `REQUEST ACCESS`.
- FOOTER: LEFT `OBSIDIAN` WORDMARK + MONO `© 2026 — ALL RIGHTS RESERVED.`; RIGHT MONO LINK COLUMNS (`SYSTEM / MANIFESTO / ACCESS / CONTACT`). BOTTOM HAIRLINE GIANT SERIF WATERMARK `OBSIDIAN` AT LOW OPACITY (OPTIONAL).
- FLOATING MOBILE NAV ITEMS (ICON + 8PX MONO LABEL): `HOME`, `SYSTEM`, **MID PRIMARY** `JOIN` (WHITE PILL), `REGISTRY`, `MENU`.

### LAYOUT RULES (RECAP)

- ALL MAIN SECTIONS CENTERED IN A `width:92vw; margin-inline:auto` WRAPPER (NO FIXED MAX CONTAINER EXCEPT FORM = `max-width:42rem`).
- HERO GLASS PANEL: `border-radius:4rem` DESKTOP / `2rem` MOBILE, `opacity:.3`, ABSOLUTE BEHIND HERO CONTENT.
- BENTO GRID: 1/2/4 COLS RESPONSIVE; `border-y` + `border-r` HAIRLINES (`white/10`); CARD HOVER → BG `white/.03`, BORDER `white/.2`.
- DEPTH FROM BORDERS + BLUR ONLY — NO STANDARD BOX-SHADOWS EXCEPT THE SILVER-BUTTON GLOW.
- ENTRY ANIMATIONS: `.reveal` SLIDE-UP, `0.8s cubic-bezier(.16,1,.3,1)`, STAGGERED VIA `data-delay`.
