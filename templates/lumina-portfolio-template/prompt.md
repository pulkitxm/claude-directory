# LUMINA — PREMIUM EDITORIAL PORTFOLIO TEMPLATE

> A SAME-TO-SAME REBUILD OF A SUPERDESIGN DRAFT (LIVE TARGET:
> `HTTPS://P.SUPERDESIGN.DEV/DRAFT/98723433-9EF9-4E9D-AF7A-9D206BD08034`).
> THIS FILE PRESERVES THE VERBATIM ORIGINAL BRIEF, THEN RECORDS THE CORE CODE
> AND IMPLEMENTATION DETAILS APPLIED SO THE OUTPUT CAN BE REPRODUCED EXACTLY.

---

## VERBATIM ORIGINAL PROMPT

### SUMMARY

CREATE A HIGH-END, PREMIUM PORTFOLIO SYSTEM USING A DARK NAVY BASE (#171E19), MASSIVE ANTON DISPLAY TYPOGRAPHY, AND AN ASYMMETRIC LAYOUT. THE DESIGN SHOULD FEEL EDITORIAL AND CINEMATIC, UTILIZING GENEROUS NEGATIVE SPACE, SMOOTH CSS TRANSITIONS, AND HIGH-CONTRAST SECTIONS.

### STYLE

THE STYLE IS A MIX OF BRUTALIST TYPOGRAPHY AND LUXURY MINIMALISM. IT USES ANTON (UPPERCASE, HEAVY) FOR ALL PRIMARY HEADINGS AND PLUS JAKARTA SANS FOR CLEAN, LEGIBLE BODY TEXT. THE PRIMARY COLORS ARE NAVY (#171E19) AND SAGE (#B7C6C2), SUPPORTED BY CYAN (#D5F4F9) AND TAUPE (#9F8D8B). INTERACTIONS FOCUS ON FLUID MOTION (CUBIC-BEZIER(0.16, 1, 0.3, 1)) AND DEPTH THROUGH BLURRED FLOATING SHAPES AND HOVER-REVEAL MASKS.

#### SPEC

APPLY A DESIGN SYSTEM WITH THE FOLLOWING SPECIFICATIONS: COLORS: NAVY (#171E19), SAGE (#B7C6C2), WHITE (#FFFFFF), TAUPE (#9F8D8B), BEIGE (#D7C5B2), CYAN (#D5F4F9), SOFT BLUE (#BBE2F5), AND CHARCOAL (#302B2F). TYPOGRAPHY: PRIMARY HEADINGS IN 'ANTON', UPPERCASE, TRACKING-TIGHTER, WITH FONT-SIZES RANGING FROM 8XL TO 18VW. BODY TEXT IN 'PLUS JAKARTA SANS' (WEIGHTS 300, 400, 600). ELEMENTS: USE 1PX BORDERS, CROSSHAIR CURSOR STYLE, AND MIX-BLEND-MODE: DIFFERENCE FOR FIXED NAVIGATION. ANIMATIONS: FLOATING AMBIENT BLURS USING 120PX BLUR RADIUS, AND SCROLL REVEALS WITH TRANSFORM: TRANSLATEY(10PX) AND OPACITY TRANSITION OVER 1000MS. HOVER STATES: SCALE 1.1X ON IMAGES, CIRCULAR 'VIEW' BUTTONS WITH 0.5S CUBIC-BEZIER TIMING.

### LAYOUT & STRUCTURE

THE LAYOUT USES A MULTI-SECTION STRUCTURE ALTERNATING BETWEEN DARK AND LIGHT BACKGROUNDS. IT FEATURES A FULL-SCREEN HERO, AN ASYMMETRIC MASONRY PORTFOLIO GRID, A FEATURED PROJECT SECTION WITH OFFSET IMAGERY, AND A MASSIVE FOOTER.

#### NAVIGATION

FIXED TOP BAR, FULL WIDTH, 32PX-48PX PADDING. MIX-BLEND-MODE: DIFFERENCE. LOGO IN ANTON FONT, 2XL, TRACKING-WIDEST. NAV LINKS IN SMALL (12PX) UPPERCASE TRACKING-WIDEST FONT. 'GET IN TOUCH' BUTTON WITH 1PX WHITE BORDER, TRANSITIONING TO WHITE BACKGROUND ON HOVER.

#### HERO SECTION

FULL VIEWPORT HEIGHT. BACKGROUND: NAVY (#171E19). INCLUDE TWO FLOATING, BLURRED CIRCLES (SAGE AND SOFT BLUE) AT 20% OPACITY. CENTRAL TEXT: ANTON FONT, SIZE 18VW, LEADING 0.85, UPPERCASE. SECOND LINE OF TEXT USES '.TEXT-OUTLINE' (1PX SAGE STROKE, TRANSPARENT FILL). BOTTOM ROW: SMALL UPPERCASE TAUPE TEXT (MAX-WIDTH 320PX) ON THE LEFT, BOUNCING ARROW ICON IN A CIRCULAR BORDER ON THE RIGHT.

#### PORTFOLIO GRID

BACKGROUND: WHITE (#FFFFFF). HEADING: 'SELECTED WORKS' IN ANTON, 9XL, NAVY. GRID: 2-COLUMN MASONRY; EVEN-NUMBERED ITEMS SHOULD HAVE A 4REM (64PX) TOP MARGIN. PROJECT CARDS: 3:4 OR 4:5 ASPECT RATIO IMAGES. ON HOVER: IMAGE SCALES 1.1X AND A NAVY 60% OVERLAY APPEARS WITH A WHITE CIRCULAR 'VIEW' TAG IN THE CENTER.

#### FEATURED ASYMMETRIC SECTION

BACKGROUND: NAVY. TWO-COLUMN LAYOUT. LEFT: GRAYSCALE IMAGE WITH A CYAN DECORATIVE BACKGROUND SQUARE (#D5F4F9, 20% OPACITY) OFFSET BY -48PX. RIGHT: SAGE COLORED 'ANTON' LABEL, FOLLOWED BY A 7XL HEADING AND TAUPE BODY TEXT. INCLUDE AN ARROW ICON LINK THAT SHIFTS +8PX RIGHT ON HOVER.

#### CAPABILITIES SECTION

BACKGROUND: LIGHT GRAY (#FAFAFA). SPLIT 12-COLUMN GRID. COLUMNS 1-4: 'CAPABILITIES' LABEL IN TAUPE, FOLLOWED BY A LIST WHERE ITEMS HAVE A 40PX HORIZONTAL LINE PREFIX THAT EXTENDS TO 64PX ON HOVER. COLUMNS 5-12: LARGE 6XL LIGHT-WEIGHT HEADING WITH ITALICIZED ACCENT WORDS IN TAUPE.

#### TESTIMONIAL CAROUSEL

BACKGROUND: CHARCOAL (#302B2F). FEATURES A DECORATIVE QUOTATION MARK IN THE BACKGROUND (NAVY, 30REM SIZE, 30% OPACITY). MAIN QUOTE: ANTON FONT, 5XL, UPPERCASE. BIO SECTION: 64PX COLORED CIRCULAR AVATAR AND ANTON-STYLE NAME TITLE.

#### FOOTER

BACKGROUND: NAVY. MASSIVE 'LET'S CREATE' HEADING IN ANTON (9XL). EMAIL LINK IN SAGE, SIZE 4XL, UNDERLINED WITH 8PX OFFSET. FOOTER BOTTOM: 1PX TOP BORDER (WHITE, 10% OPACITY), COPYRIGHT ON LEFT, LEGAL LINKS ON RIGHT, ALL IN 12PX UPPERCASE TRACKING-WIDEST TYPOGRAPHY.

### SPECIAL COMPONENTS

#### HOVER REVEAL VIEWPORT

A CIRCULAR 'VIEW' BADGE THAT APPEARS ON IMAGE HOVER.

INSIDE A RELATIVE CONTAINER WITH OVERFLOW-HIDDEN, CREATE AN ABSOLUTE INSET-0 OVERLAY WITH BACKGROUND NAVY/60 AND OPACITY-0. ON PARENT HOVER, TRANSITION OPACITY TO 100. CENTER A 96PX X 96PX WHITE CIRCLE CONTAINING 'VIEW' IN ANTON FONT, 14PX, TRACKING-WIDEST.

#### AMBIENT BACKGROUND ORBS

SLOW-MOVING, BLURRED DECORATIVE BACKGROUND ELEMENTS.

CREATE 384PX (W/H) DIV ELEMENTS WITH 120PX GAUSSIAN BLUR. SET OPACITY TO 20%. APPLY A CSS ANIMATION 'FLOAT' MOVING TRANSLATEY FROM 0 TO -20PX OVER 6 SECONDS WITH EASE-IN-OUT INFINITE LOOP.

#### MIX-BLEND NAVIGATION

NAVIGATION THAT CHANGES COLOR BASED ON THE BACKGROUND IT PASSES OVER.

APPLY 'MIX-BLEND-MODE: DIFFERENCE' TO THE FIXED NAV CONTAINER. ENSURE NAVIGATION ITEMS ARE WHITE SO THEY INVERT TO BLACK OVER WHITE BACKGROUNDS AND STAY WHITE OVER DARK BACKGROUNDS.

---

## IMPLEMENTATION NOTES (DISCOVERED & APPLIED)

THE TARGET LINK COULD NOT BE FETCHED FROM THE BUILD ENVIRONMENT (HOST
`P.SUPERDESIGN.DEV` IS OUTSIDE THE NETWORK EGRESS ALLOWLIST — HTTP 403). THE
REBUILD THEREFORE FOLLOWS THE FULL DESIGN SPEC ABOVE, WHICH IS A COMPLETE,
GROUND-TRUTH DESCRIPTION OF THE DRAFT. EVERY VALUE BELOW WAS APPLIED VERBATIM.

### TECH STACK

- **SINGLE STATIC PAGE** — `index.html` + `styles.css` + `main.js`. NO BUILD STEP,
  NO FRAMEWORK, NO CDN. RUNS OFFLINE.
- **FONTS VENDORED LOCALLY** in `assets/fonts/`: `anton.ttf` (Anton 400) and
  `plus-jakarta-sans-latin.woff2` (variable, weights 300–700).
- **IMAGERY VENDORED LOCALLY** as hand-authored SVGs in `assets/img/` —
  editorial duotone/grayscale compositions (no external image hosts were
  reachable; all art is generated and self-contained).
- **NO `cursor: crosshair` GLOBALLY** beyond interactive/hero affordances to keep
  the page usable; crosshair is applied to the hero per the brutalist intent.

### DESIGN TOKENS (`:root`)

```css
:root{
  --navy:#171e19; --sage:#b7c6c2; --white:#fff; --taupe:#9f8d8b;
  --beige:#d7c5b2; --cyan:#d5f4f9; --soft-blue:#bbe2f5; --charcoal:#302b2f;
  --gray:#fafafa;
  --ease:cubic-bezier(0.16,1,0.3,1);
  --pad:clamp(20px,4vw,48px);
}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--navy);color:var(--white);
  font-family:"Plus Jakarta Sans",system-ui,sans-serif;font-weight:400}
.anton{font-family:"Anton",Impact,sans-serif;text-transform:uppercase;
  letter-spacing:-.02em;font-weight:400}
```

### FONT FACES (LOCAL)

```css
@font-face{font-family:"Anton";src:url("assets/fonts/anton.ttf") format("truetype");
  font-weight:400;font-display:swap}
@font-face{font-family:"Plus Jakarta Sans";
  src:url("assets/fonts/plus-jakarta-sans-latin.woff2") format("woff2");
  font-weight:300 700;font-display:swap}
```

### KEY MECHANICS

**Mix-blend fixed nav** — white items over a `mix-blend-mode:difference` bar so
they invert to near-black over the white Portfolio/Capabilities sections:

```css
.nav{position:fixed;inset:0 0 auto;display:flex;justify-content:space-between;
  align-items:center;padding:clamp(20px,3vw,32px) var(--pad);z-index:50;
  mix-blend-mode:difference;color:#fff}
.nav a,.nav .logo{color:#fff}
.nav .links a{font-size:12px;text-transform:uppercase;letter-spacing:.18em}
.cta{border:1px solid #fff;padding:10px 22px;border-radius:999px;
  transition:background .4s var(--ease),color .4s var(--ease)}
.cta:hover{background:#fff;color:#000}
```

**Ambient orbs** — 384px circles, 120px blur, 20% opacity, float keyframe:

```css
.orb{position:absolute;width:384px;height:384px;border-radius:50%;
  filter:blur(120px);opacity:.2;animation:float 6s var(--ease) infinite}
.orb.sage{background:var(--sage);top:8%;left:-6%}
.orb.blue{background:var(--soft-blue);bottom:6%;right:-4%;animation-delay:-3s}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
```

**Hero headline** — 18vw Anton, leading .85, second line is the sage outline:

```css
.hero h1{font-size:18vw;line-height:.85}
.text-outline{color:transparent;-webkit-text-stroke:1px var(--sage)}
```

**Hover-reveal "VIEW" viewport** on every portfolio card:

```css
.card{position:relative;overflow:hidden}
.card img{transition:transform .7s var(--ease)}
.card:hover img{transform:scale(1.1)}
.card .overlay{position:absolute;inset:0;background:rgba(23,30,25,.6);
  opacity:0;display:grid;place-items:center;transition:opacity .5s var(--ease)}
.card:hover .overlay{opacity:1}
.view-badge{width:96px;height:96px;border-radius:50%;background:#fff;color:var(--navy);
  display:grid;place-items:center;font-family:"Anton";font-size:14px;letter-spacing:.18em}
```

**Asymmetric masonry** — 2 columns, even cards pushed down 4rem:

```css
.grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,4vw,64px)}
.grid .card:nth-child(even){margin-top:4rem}
```

**Featured offset square** — cyan 20% square behind a grayscale image, -48px offset:

```css
.featured .media{position:relative}
.featured .media::before{content:"";position:absolute;inset:-48px auto auto -48px;
  width:60%;height:60%;background:rgba(213,244,249,.2);z-index:0}
.featured img{filter:grayscale(1);position:relative;z-index:1}
.arrow-link:hover .arrow{transform:translateX(8px)}
.arrow{transition:transform .4s var(--ease)}
```

**Capabilities line prefix** — 40px line that grows to 64px on hover:

```css
.cap-item::before{content:"";display:inline-block;width:40px;height:1px;
  background:currentColor;margin-right:16px;transition:width .4s var(--ease)}
.cap-item:hover::before{width:64px}
```

**Testimonial carousel** — charcoal bg, giant 30rem navy quote glyph at 30%
opacity behind a 5xl Anton quote; JS cycles slides every ~5s with fade. Avatars
are colored 64px circles. Bio name in Anton.

**Scroll reveals** — `IntersectionObserver` toggles `.in` (was
`translateY(10px);opacity:0` → `translateY(0);opacity:1` over 1000ms):

```js
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
```

### SECTION ORDER & COPY

1. **Nav** — logo `LUMINA`; links `WORK · STUDIO · PROCESS`; CTA `GET IN TOUCH`.
2. **Hero** — `CREATIVE` / `STUDIO`(outline); kicker `INDEPENDENT DESIGN STUDIO
   CRAFTING EDITORIAL, BRAND & DIGITAL EXPERIENCES.`; bouncing circular arrow.
3. **Selected Works** (white) — 6 cards: `MERIDIAN`, `AURELIA`, `NOVA TYPE`,
   `SAGE & STONE`, `HORIZON`, `MONOLITH` with category + year.
4. **Featured** (navy) — label `FEATURED PROJECT`; heading `A QUIET
   REVOLUTION IN BRAND IDENTITY`; taupe body; `VIEW CASE STUDY →`.
5. **Capabilities** (#fafafa) — list: `BRAND IDENTITY`, `ART DIRECTION`,
   `EDITORIAL DESIGN`, `DIGITAL PRODUCT`, `MOTION`, `TYPOGRAPHY`; big light
   heading with italic taupe accents.
6. **Testimonials** (charcoal) — 3 rotating quotes with name/role/colored avatar.
7. **Footer** (navy) — `LET'S CREATE`; email `hello@lumina.studio` (sage, 4xl,
   underline 8px offset); bottom bar `© 2026 LUMINA STUDIO` + legal links.

### VERIFICATION

- STATIC SERVE + HEADLESS CHROMIUM SMOKE CHECK (NO CONSOLE ERRORS, ALL SECTIONS
  PRESENT, FONTS LOADED, IO REVEALS FIRE, CAROUSEL ADVANCES).
- `demo.mp4` RECORDED VIA `scripts/record-demos/record-one.sh`; `poster.jpg` AND
  `posters.json` GENERATED VIA `scripts/generate-posters`.
