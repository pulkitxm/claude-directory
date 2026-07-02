> THIS IS A SELF-CONTAINED, PIXEL-FAITHFUL REPRODUCTION OF AN EXISTING UI TEMPLATE, REBUILT AS PLAIN HTML + CSS + VANILLA JS FOR STUDY AND LEARNING.
> REFERENCE: `https://lexingtonthemes.com/viewports/primapersona`

## SUMMARY

PRIMAPERSONA IS A CLEAN, MINIMAL PERSONAL PORTFOLIO TEMPLATE FOR CREATIVE TECHNOLOGISTS. IT FEATURES A FIXED TOP NAVIGATION, A FULL-SCROLL SINGLE-PAGE LAYOUT WITH MULTIPLE ANCHOR-LINKED SECTIONS, AND A COMPANION DESIGN SYSTEM PAGE. THE DESIGN IS BUILT WITH INTER FONT AND A NEUTRAL MONOCHROMATIC PALETTE WITH AN ACCENT GREEN COLOR. IT SUPPORTS LIGHT AND DARK MODES VIA CSS CUSTOM PROPERTIES.

## STYLE

- **PALETTE:** WHITE BACKGROUND (#fff / oklch(98.5% 0 0) for light), NEAR-BLACK FOR DARK (#141414 / oklch(14.5% 0 0)), TEXT MUTED: oklch(43.9% 0 0) (base-600), HEADING: oklch(20.5% 0 0) (base-900), ACCENT GREEN: oklch(74.4% .209 135) (accent-500), BORDER: oklch(92.2% 0 0) (base-200 light) / oklch(26.9% 0 0) (base-800 dark)
- **FONTS:** INTER (VIA rsms.me/inter/inter.css), WEIGHTS: 400 (REGULAR), 500 (MEDIUM), 600 (SEMIBOLD)
- **TYPE SCALE:** xs=0.75rem/1rem, sm=0.875rem/1.25rem, base=1rem/1.5rem, lg=1.125rem/1.75rem, xl=1.25rem/1.75rem, 2xl=1.5rem/2rem, 3xl=1.875rem/2.25rem, 4xl=2.25rem/2.5rem, 5xl=3rem/1
- **LETTER-SPACING:** TRACKING-TIGHT=-0.025em, TRACKING-TIGHTER=-0.05em
- **SPACING:** 4px BASE UNIT (--spacing: 0.25rem)
- **RADII:** NONE ON MOST ELEMENTS, 2rem (rounded-4xl) ON ARTICLE IMAGES
- **ANIMATIONS/TRANSITIONS:** SIMPLE color transitions (0.15s cubic-bezier(0.4,0,0.2,1)), NO COMPLEX ENTRANCE ANIMATIONS. HOVER STATES: LINKS CHANGE COLOR.
- **DARK MODE:** CSS CLASS `dark` ON HTML ELEMENT, DRIVEN BY prefers-color-scheme MEDIA QUERY + TOGGLE

## LAYOUT & STRUCTURE

### PAGE 1: HOME (index.html)
- **NAV:** FIXED, FULL-WIDTH, 4-COLUMN GRID. COL1: LOGO "alessandro.p". COL2: "Helsinki, Finland / Creative Technologist" (HIDDEN ON MOBILE). COL3: NAV LINKS (Work, Projects, Education, Speaking, Components) HIDDEN BELOW lg. COL4: "Download" LINK ALIGNED RIGHT.
- **HERO SECTION:** LARGE HEADING "Creative technologist, Helsinki. Code. Design. Strategy. Digital products with intent." IN COLS 3-4 OF 4-COLUMN GRID.
- **WORK SECTION (#work):** SECTION HEADING + 3 ARTICLES (BRoom, Aurora Ride, Northwind). EACH ARTICLE HAS: YEAR / PROJECT NAME / DESCRIPTION / CATEGORY IN 4-COL GRID, FOLLOWED BY FULL-WIDTH ROUNDED IMAGE.
- **PROJECTS SECTION (#projects):** SECTION HEADING + 3 ARTICLES (Domestic Grid, Type Pressure, Haul State). SAME LAYOUT AS WORK.
- **EDUCATION SECTION (#education):** SECTION HEADING + 8 EDUCATION ENTRIES (Self-Directed Study, Design & Visual Systems, Frontend Engineering, Systems Thinking, Typography & Reading Discipline, Product & Decision Making, Computational Foundations, Critical Reading & Writing). NO IMAGES, JUST TEXT ROWS.
- **SPEAKING SECTION (#speaking):** SECTION HEADING + 5 TALK ENTRIES (Interface Truths Under Constraint, Typography as Infrastructure, State Machines for Humans, Speed is a Feature, Design Critique Without Mercy). EACH HAS AN ARROW ICON LINK.
- **FOOTER:** 4-COLUMN GRID. COL1: COPYRIGHT + NAME. COL2: SOCIAL LINKS (LinkedIn, Arena, GitHub).

### PAGE 2: SYSTEM OVERVIEW (system/overview/index.html)
- SIMPLE COMPONENT LISTING PAGE. HEADER: "Overview / All pages". SINGLE ROW: "Static" / TWO COLUMNS: "Landing Pages" (Home, 404) AND "System Pages" (Links, Buttons, Colors, Typography, License, Docs).

### PAGE 3: 404 (404.html)
- STANDARD 404 PAGE WITH SHARED NAV AND FOOTER.

### PAGE 4: SYSTEM LINKS (system/links/index.html)
- TYPOGRAPHY/LINKS SHOWCASE PAGE.

### PAGE 5: SYSTEM BUTTONS (system/buttons/index.html)
- BUTTONS SHOWCASE PAGE.

### PAGE 6: SYSTEM COLORS (system/colors/index.html)
- COLOR PALETTE SHOWCASE PAGE.

### PAGE 7: SYSTEM TYPOGRAPHY (system/typography/index.html)
- TYPOGRAPHY SCALE SHOWCASE PAGE.
