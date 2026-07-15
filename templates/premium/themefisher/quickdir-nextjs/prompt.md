> SELF-CONTAINED, PIXEL-FAITHFUL REPRODUCTION OF THE "QUICKDIR" NEXT.JS TEMPLATE BY THEMEFISHER, REBUILT AS PLAIN HTML/CSS/VANILLA JS (NO BUILD STEP), INCLUDING EVERY DISCOVERED PAGE, HOVER STATES, AND SCROLL/ENTRANCE ANIMATIONS.

REFERENCE: `https://themefisher.com/demo?theme=quickdir-nextjs`

> NOTE: THE LIVE PREVIEW HOST WRAPS THE TEMPLATE IN ITS OWN CHROME (VIEWPORT TOGGLES, "GET THIS TEMPLATE" BUTTON, ETC). THE ACTUAL TEMPLATE IS SERVED FROM THE EMBEDDED IFRAME AT `https://quickdir-nextjs.vercel.app/`, WHICH IS THE GROUND TRUTH USED FOR ALL RECON AND BUILDING. THE PREVIEW HOST'S OWN CHROME WAS IGNORED.

## SUMMARY

QUICKDIR IS A DIRECTORY / PRODUCT-LISTING SAAS MARKETING TEMPLATE (LIKE A PRODUCT-HUNT-STYLE DIRECTORY OR TOOLS DIRECTORY). IT HAS A LIGHT DEFAULT THEME WITH A BLUE ACCENT, CARD-BASED PRODUCT LISTINGS WITH LOGOS/BADGES/UPVOTE COUNTS, A PRICING TABLE, A DOCS/CHANGELOG SECTION, AUTHOR PROFILES, A BLOG, AND A "SUBMIT" FORM PAGE FOR ADDING A NEW LISTING. TYPOGRAPHY IS SET IN "INTER" THROUGHOUT. THE UI IS BUILT ON A SHADCN/TAILWIND-STYLE DESIGN SYSTEM (CSS CUSTOM PROPERTIES FOR BACKGROUND/FOREGROUND/CARD/BORDER/ACCENT/DESTRUCTIVE TOKENS), WITH SUBTLE HOVER-STATE BORDER/SHADOW/COLOR TRANSITIONS ON CARDS, BUTTONS, AND NAV LINKS, AND FADE/SLIDE SCROLL-REVEAL ANIMATIONS ON SECTION ENTRY.

## STYLE

**PALETTE (LIGHT — DEFAULT / SOURCE THEME):**
- `--body-color: #fff` (page background)
- `--border-color: #eaeaea`
- `--dark-color: #1c1f26` (dark surfaces / footer)
- `--accent-color: #0af` / `#007bff` (link + CTA accent, blue)
- `--danger-color: #e63946` / `red` (destructive)
- `--background: var(--body-color)`, `--foreground: var(--text-default-color)`, `--card: var(--body-color)`, `--card-foreground`, `--border: var(--border-color)`, `--accent: var(--accent-color)`, `--destructive: var(--danger-color)` — shadcn-style semantic aliases layered on top of the raw color tokens.
- Neutral gray scale `--gray1`…`--gray12` (hsl 0,0% lightness ramp 99%→9%) used for muted text/backgrounds/borders.

**PALETTE (DARK — ADDED FOR THIS CLONE, SOURCE THEME TOKENS INCLUDE DARK-MODE OVERRIDES IN THE SAME STYLESHEET):**
- `--body-color: #01040f`, `--border-color: #121627`, `--dark-color: #f2f2f2` (inverted), `--info-bg: hsl(215,100%,6%)`, `--error-bg: hsl(358,76%,10%)` etc. — the source stylesheet ships both light and dark values for these tokens (Tailwind `dark:` variants); the clone wires them to `:root` (light) and `[data-theme="dark"]` (dark), honoring `prefers-color-scheme` on first load and persisting the choice via `localStorage`, since the source has no visible in-page toggle but ships full dark-mode tokens.

**TYPE:**
- Font family: `Inter, "Inter Fallback"` (Google/Next Font, vendored locally as woff2 subsets), fallback `ui-sans-serif, system-ui, sans-serif`.
- Monospace: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` (used for code/docs snippets).
- Font weights used: 300 (light), 400 (normal), 500 (medium), 600 (semibold), 700 (bold).
- `--font-scale: 1.2` modular scale for heading sizes.

**RADII / SPACING / TRANSITIONS:**
- `--border-radius: 8px` base radius for cards/buttons/inputs; larger cards ~12-16px.
- Bootstrap-grid-derived gutters: `--bs-gutter-x: 1.5rem`/`3rem`, `--bs-gutter-y: 0`/`3rem` for responsive container spacing.
- `--default-transition-duration: .15s`, `--default-transition-timing-function: cubic-bezier(.4,0,.2,1)` (Tailwind default) used for hover/focus color, border, background, and shadow transitions on cards, buttons, links, and nav items.
- Scroll-reveal: sections fade/slide in (opacity 0→1, translateY ~20px→0) as they enter the viewport, driven by IntersectionObserver-style triggers.

## LAYOUT & STRUCTURE

Shared chrome across all pages: sticky top navbar (logo, nav links: Products/Pricing/Blog/Docs, "Submit" CTA button, search), and a multi-column footer (brand blurb, link columns: Product/Company/Resources/Legal, social icons, copyright).

Pages discovered and cloned:

1. **Home (`/`)** — hero with headline + search/CTA, "trusted by" logos strip, featured/trending product listing cards grid (logo, name, tagline, category badges, upvote count), category browse section, testimonials, pricing teaser, CTA banner, footer.
2. **About (`/about`)** — mission statement, story/timeline section, team/stats, CTA banner.
3. **Authors (`/authors`)** — grid of author/contributor profile cards (avatar, name, role, bio, social links).
4. **Blog (`/blog`)** — blog post card grid (cover image, category tag, title, excerpt, author, date), pagination.
5. **Changelog (`/changelog`)** — version-by-version release timeline (date, version tag, list of changes).
6. **Contact (`/contact`)** — contact form (name/email/subject/message), contact info cards (address/email/phone), map/illustration.
7. **Docs (`/docs`)** — sidebar navigation of doc sections, article content pane with headings/code blocks, prev/next links.
8. **Pricing (`/pricing`)** — monthly/yearly toggle, pricing tier cards (Free/Pro/Business) with feature lists and CTA buttons, FAQ accordion.
9. **Privacy Policy (`/privacy-policy`)** — long-form legal text with heading anchors.
10. **Products (`/products`)** — full directory listing grid with filter/sort controls and category sidebar, pagination.
11. **Product listing detail (`/products/listing-1`, representative of `/products/listing-*`)** — product header (logo, name, tagline, upvote/save buttons), screenshot gallery, description, feature list, pricing/CTA sidebar, related products.
12. **Submit (`/submit`)** — multi-field "submit your product" form (name, URL, tagline, description, category select, logo upload, pricing type), submit CTA.
13. **Terms & Conditions (`/terms-conditions`)** — long-form legal text with heading anchors.
14. **404 (`/404`)** — not-found illustration, message, back-to-home CTA.

Interactive behavior reproduced: nav/dropdown hover states, card hover elevation/border-color shifts, pricing monthly/yearly toggle, FAQ accordion expand/collapse, mobile hamburger menu open/close, docs sidebar active-link highlighting, scroll-reveal fade/slide-in animations on section entry, sticky header shadow-on-scroll.
