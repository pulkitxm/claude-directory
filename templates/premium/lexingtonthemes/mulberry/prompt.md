> A SELF-CONTAINED, PIXEL-FAITHFUL REPRODUCTION OF THE MULBERRY TEMPLATE BY LEXINGTON THEMES, REBUILT AS PLAIN HTML + CSS + VANILLA JS WITH ALL ASSETS VENDORED LOCALLY AND NO BUILD STEP REQUIRED.
>
> REFERENCE: `https://lexingtonthemes.com/viewports/mulberry`

## SUMMARY

MULBERRY IS A PREMIUM MULTI-PAGE ACCOUNTING / FINANCIAL-SERVICES WEBSITE TEMPLATE BY LEXINGTON THEMES, BUILT WITH ASTRO AND TAILWIND CSS V4. THE CLONE REPRODUCES EVERY PAGE AS SELF-CONTAINED HTML/CSS/JS WITH IDENTICAL LAYOUT, TYPOGRAPHY, COLOR, AND INTERACTIONS. THE TEMPLATE REPRESENTS A FICTIONAL ACCOUNTING FIRM ("MULBERRY ACCOUNTING") WITH A REFINED EDITORIAL AESTHETIC — A SERIF DISPLAY TYPEFACE (STIX TWO TEXT) PAIRED WITH INTER, A WARM NEUTRAL GREY PALETTE, A GOLDEN-AMBER ACCENT, FULL-BLEED EDITORIAL IMAGERY, BORDERLESS `BG-BASE-50` SECTION PANELS, AND A BLACK FOOTER / CTA.

THE SOURCE TEMPLATE IS HOSTED AT: `https://mulberry-astro.pages.dev/`

## STYLE

### PALETTE
- ACCENT SCALE: OKLCH-BASED GOLDEN-AMBER FAMILY (HUE 93.61)
  - `--color-accent-50`:  `oklch(98.5% .013 93.61)` — LIGHTEST TINT
  - `--color-accent-500`: `oklch(81.6% .167 93.61)` — BRIGHT GOLD
  - `--color-accent-600`: `oklch(70.2% .144 93.61)` — PRIMARY ACCENT (GOLD PANELS, "MOST POPULAR", HOVER TEXT)
  - `--color-accent-900`: `oklch(32.6% .067 93.61)` — DEEP AMBER
  - `--color-accent-950`: `oklch(22.8% .047 93.61)` — DARKEST AMBER
- BASE NEUTRAL SCALE: WARM OKLCH GREY (HUE ~106, NEAR-ZERO CHROMA)
  - `--color-base-50`:  `oklch(98.8% .003 105.99)` — SECTION PANEL BG (NEAR WHITE WARM)
  - `--color-base-100`: `oklch(93.9% .005 106.28)` — BORDERS / DIVIDERS
  - `--color-base-300`: `oklch(76.6% .004 106.27)` — MUTED TEXT ON DARK
  - `--color-base-600`: `oklch(49.9% .003 106.32)` — BODY SUBTEXT ON LIGHT
  - `--color-base-700`: `oklch(40.5% .002 106.17)` — BODY TEXT ON LIGHT
  - `--color-base-900`: `oklch(22.6% .002 106.4)` — HEADINGS ON LIGHT
  - `--color-base-950`: `oklch(17.7% .002 106.5)` — NEAR BLACK
- BLACK: `oklch(14.5% 0 0)` (FOOTER, CTA, MEGAMENU, DARK BUTTONS) · WHITE: `#fff` (PAGE BG, CARD BG)

### FONTS
- DISPLAY / HEADINGS: `"STIX Two Text", serif` (VIA `fonts.googleapis.com/css2?family=STIX+Two+Text`) — APPLIED VIA `.font-display`
- BODY / UI: `"Inter", sans-serif` (VIA `https://rsms.me/inter/inter.css`)
- MONO: SYSTEM STACK (`ui-monospace, SFMono-Regular, Menlo, ...`)

### TYPE SCALE (TAILWIND V4 DEFAULTS)
- XS 0.75REM / SM 0.875REM / BASE 1REM / LG 1.125REM / XL 1.25REM
- 2XL 1.5REM / 3XL 1.875REM / 4XL 2.25REM / 5XL 3REM / 6XL 3.75REM / 7XL 4.5REM
- WEIGHTS: MEDIUM 500, SEMIBOLD 600, BOLD 700 (HEADINGS USE MEDIUM + `FONT-DISPLAY`)
- TRACKING TIGHT: `-0.025em` (HEADINGS) · TRACKING WIDE: `0.025em`
- LEADING RELAXED: 1.625 (BODY)

### RADII
- SM 0.25REM · MD 0.375REM · LG 0.5REM · FULL 9999PX

### ANIMATION / EASINGS
- EASE-IN-OUT: `cubic-bezier(.4, 0, .2, 1)` · EASE-OUT: `cubic-bezier(0, 0, .2, 1)`
- DURATIONS: 300MS (COLOR/LINK TRANSITIONS), 500MS (BUTTON HOVER)
- STATS COUNT-UP: NUMBERS ANIMATE 0 → TARGET WITH CUBIC EASE-OUT OVER 1400MS, TRIGGERED ON INTERSECTION (`INTERSECTIONOBSERVER`, THRESHOLD 0.2, ROOTMARGIN `0 0 -10% 0`)
- LINK / FOOTER-LINK HOVER: TEXT SHIFTS TO `ACCENT-600` AND AN ARROW ICON FADES IN ON `GROUP-HOVER`
- CARD HOVER: "READ FURTHER" LABEL SHIFTS TO `ACCENT-600`; WHOLE CARD IS A CLICK TARGET VIA AN ABSOLUTELY-POSITIONED OVERLAY ANCHOR

## LAYOUT & STRUCTURE

### CONTAINER SYSTEM
- MAX-WIDTH: `max-w-7xl` (80REM) WITH `px-8`; WIDE SECTIONS USE `2xl:max-w-[100rem]` / `[110rem]`
- SECTIONS ALTERNATE PLAIN WHITE AND `BG-BASE-50` PANELS WITH `P-8 LG:P-12` PADDING

### HEADER (SHARED)
- FIXED, FULL-WIDTH, WHITE, `Z-50`, BORDER-BOTTOM `BORDER-BASE-100`
- LEFT: "MULBERRY ACCOUNTING" SVG WORDMARK LOGO
- CENTER: "BUY MULBERRY" + "ALL PAGES" LINKS (ALL PAGES = MEGAMENU TRIGGER)
- RIGHT: HAMBURGER ICON (`#MENU-TOGGLE-ICON`)
- MEGAMENU (`#MEGAMENU`, TOGGLED BY `#MEGAMENU-TRIGGER`): FULL-WIDTH BLACK DROPDOWN — LEFT GOLD `ACCENT-600` "GET IN TOUCH" PANEL + CONTACT US BUTTON, THEN 4 LINK COLUMNS (OVERVIEW / SERVICES / INDUSTRIES WE SERVE / RESOURCES), BOTTOM BAR WITH PHONE, ADDRESS, AND X / LINKEDIN / EMAIL LINKS. CLOSES ON OUTSIDE-CLICK AND ESCAPE; HAMBURGER ROTATES 90°.

### FOOTER (SHARED)
- BLACK BG, BORDER-TOP `BORDER-BASE-900`
- COLUMN 1: LOGO + DESCRIPTION + COPYRIGHT (`#CURRENT-YEAR` AUTO-FILLED)
- COLUMNS: SERVICES / RESOURCES / QUICK LINKS / CONTACT INFORMATION (PHONE, EMAIL, ADDRESS, BUSINESS HOURS)
- BOTTOM BAR: CERTIFICATION BADGES (CPA / ENROLLED AGENTS / QUICKBOOKS) + PRIVACY / TERMS / SECURITY / ACCESSIBILITY LINKS
- A FULL-WIDTH BLACK CTA SECTION ("MAXIMIZE PROFITS, MINIMIZE COMPLEXITY") WITH A SIDE IMAGE PRECEDES THE FOOTER ON MOST PAGES

### PAGES DISCOVERED AND CLONED (68 TOTAL)

**CORE (6)**
1. **HOME** (`index.html`) — HERO + IMAGE, ANIMATED STATS, SERVICES PREVIEW, WHY-US + CERT BADGES, INDUSTRIES PREVIEW, CASE STUDIES PREVIEW, TESTIMONIAL, BLOG TEASERS, CTA, FOOTER
2. **ABOUT** (`about.html`) — STORY, STATS, MISSION & VALUES, CEO MESSAGE (VIDEO), TEAM PREVIEW, WHY-US
3. **CONTACT** (`contact.html`) — CONTACT INFO + FORM (NAME/EMAIL/PHONE/COMPANY/SERVICE/SUBJECT/MESSAGE/PRIVACY)
4. **PRICING** (`pricing.html`) — 3-TIER PACKAGE TABLE (SMALL / MID-MARKET "MOST POPULAR" / CUSTOM), À-LA-CARTE SERVICE GRID, PRICING FAQ ACCORDION
5. **FAQ** (`faq.html`) — CATEGORISED `<DETAILS>` ACCORDION GROUPS
6. **TESTIMONIALS** (`testimonials.html`) — TESTIMONIAL CARD GRID

**SERVICES (1 INDEX + 6 DETAIL = 7)**
7. **SERVICES** (`services.html`)
8–13. SERVICE DETAILS: `services-agricultural-accounting-farm-management.html`, `services-audit-support-assurance.html`, `services-bankruptcy-financial-restructuring-accounting.html`, `services-bookkeeping-accounting.html`, `services-business-formation-setup.html`, `services-business-valuation-appraisal.html`

**INDUSTRIES (1 INDEX + 8 DETAIL = 9)**
14. **INDUSTRIES** (`industries.html`)
15–22. INDUSTRY DETAILS: `industries-construction-development.html`, `industries-healthcare-medical.html`, `industries-manufacturing-industrial.html`, `industries-nonprofit-charitable.html`, `industries-professional-services.html`, `industries-real-estate-property.html`, `industries-retail-ecommerce.html`, `industries-technology-software.html`

**CASE STUDIES (1 INDEX + 6 DETAIL = 7)**
23. **CASE STUDIES** (`case-studies.html`)
24–29. CASE STUDY DETAILS: `case-studies-healthcare-turnaround.html`, `case-studies-manufacturing-optimization.html`, `case-studies-nonprofit-compliance.html`, `case-studies-real-estate-portfolio.html`, `case-studies-retail-expansion.html`, `case-studies-tech-startup-growth.html`

**BLOG (1 INDEX + 6 POSTS + 1 TAGS INDEX + 15 TAG PAGES = 23)**
30. **BLOG** (`blog.html`)
31–36. POSTS: `blog-posts-1.html` … `blog-posts-6.html`
37. **TAGS INDEX** (`blog-tags.html`)
38–52. TAG PAGES: `blog-tags-accounting-basics.html`, `blog-tags-bookkeeping.html`, `blog-tags-business-finance.html`, `blog-tags-business-fundamentals.html`, `blog-tags-business-growth.html`, `blog-tags-business-valuation.html`, `blog-tags-cash-flow.html`, `blog-tags-financial-literacy.html`, `blog-tags-financial-management.html`, `blog-tags-financial-organization.html`, `blog-tags-financial-planning.html`, `blog-tags-financial-statements.html`, `blog-tags-small-business.html`, `blog-tags-tax-planning.html`, `blog-tags-tax-savings.html`

**TEAM (1 INDEX + 6 PROFILES = 7)**
53. **TEAM** (`team.html`)
54–59. TEAM PROFILES: `team-david-lee.html`, `team-jennifer-walsh.html`, `team-maria-gonzalez.html`, `team-michael-rodriguez.html`, `team-robert-kim.html`, `team-sarah-chen.html`

**MISC + LEGAL + DESIGN SYSTEM (9)**
60. **LOCATIONS** (`locations.html`)
61. **LEGAL: PRIVACY** (`legal-privacy.html`)
62. **LEGAL: TERMS** (`legal-terms.html`)
63. **404** (`404.html`)
64. **DESIGN SYSTEM: OVERVIEW** (`system-overview.html`)
65. **DESIGN SYSTEM: BUTTONS** (`system-buttons.html`)
66. **DESIGN SYSTEM: COLORS** (`system-colors.html`)
67. **DESIGN SYSTEM: LINKS** (`system-link.html`)
68. **DESIGN SYSTEM: TYPOGRAPHY** (`system-typography.html`)

### NOTES
- THE WRAPPING LEXINGTON THEMES PREVIEW CHROME (TOP "MULBERRY / GET ALL ACCESS" TOOLBAR, DEVICE-VIEWPORT TOGGLES, BOTTOM-RIGHT SEARCH WIDGET) IS THE PREVIEW HOST'S UI AND IS NOT PART OF THE TEMPLATE — IT IS NOT REPRODUCED; THE CLONE IS NATIVELY RESPONSIVE.
- THEME: THE SOURCE RENDERS IN A SINGLE LIGHT PALETTE WITH BLACK DARK SECTIONS; ALL COLORS ARE DRIVEN THROUGH CSS CUSTOM PROPERTIES (TOKENS) AND THE CLONE HONORS `PREFERS-COLOR-SCHEME` WHILE PRESERVING THE SOURCE'S INTENDED LOOK.
