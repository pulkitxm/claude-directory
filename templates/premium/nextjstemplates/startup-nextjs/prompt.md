> A SELF-CONTAINED, PIXEL-FAITHFUL REPRODUCTION OF THE "STARTUP" NEXT.JS TEMPLATE (BY NEXTJSTEMPLATES / ULDECK), REBUILT AS PLAIN HTML + CSS + VANILLA JS WITH NO BUILD STEP. EVERY PAGE, THE FULL LOOK & FEEL, HOVER STATES, MOBILE MENU, DROPDOWN NAV, STICKY HEADER, LIGHT/DARK THEME TOGGLE, AND SCROLL/ENTRANCE BEHAVIOR ARE REPRODUCED FROM CAPTURED REFERENCE ARTIFACTS. ALL ASSETS (FONTS, IMAGES, ICONS) ARE VENDORED LOCALLY AND IT RUNS OFFLINE.

REFERENCE: `https://startup.demo.nextjstemplates.com`

## SUMMARY

STARTUP IS A FREE, OPEN-SOURCE NEXT.JS + TAILWIND CSS TEMPLATE FOR STARTUP, SAAS, AND BUSINESS MARKETING SITES. IT SHIPS WITH A DARK-BY-DEFAULT UI (WITH A LIGHT MODE TOGGLE), A LANDING PAGE WITH FEATURES/PRICING/TESTIMONIALS/BLOG-PREVIEW/CONTACT SECTIONS, PLUS SECONDARY PAGES: ABOUT, BLOG GRID, BLOG DETAILS (TWO VARIANTS — WITH AND WITHOUT SIDEBAR), CONTACT/SUPPORT, SIGN IN, SIGN UP, AND A 404/ERROR PAGE. THE HEADER, FOOTER, THEME TOGGLE, MOBILE HAMBURGER MENU, AND "PAGES" DROPDOWN ARE SHARED ACROSS EVERY PAGE.

## STYLE

- **PALETTE (DARK — DEFAULT):** PAGE BACKGROUND `#000000`/`rgb(18,23,35)` (BODY DARK BG), CARD/PANEL SURFACES `rgba(255,255,255,0.03)`–`#1b2331`-ISH TRANSLUCENT WHITE OVERLAYS, BORDER `rgba(255,255,255,0.1)`, PRIMARY TEXT WHITE, MUTED TEXT `#8899ac`/GRAY-400 TAILWIND SHADES, DIVIDER LINES `rgba(255,255,255,0.1)`.
- **PALETTE (LIGHT):** PAGE BACKGROUND `#FCFCFC`, CARD SURFACES WHITE/`#F8F9FF`, PRIMARY TEXT `#1D2144`-ISH DARK NAVY, MUTED TEXT GRAY-600.
- **PRIMARY ACCENT:** `#4A6CF7` (BLUE/INDIGO) — USED FOR PRIMARY BUTTONS, LINKS, ACTIVE NAV STATE, ICON CHIPS, CHECKBOX FILLS. HOVER STATE DARKENS TO A DEEPER BLUE (`#3B5BDB`-ISH) VIA TAILWIND'S HOVER OPACITY/SHADE UTILITIES.
- **FONT:** `Inter` (VARIABLE, WEIGHTS 100–900) LOADED FROM LOCAL WOFF2 FILES VENDORED INTO `assets/fonts/`, WITH `"Inter Fallback"` AS FALLBACK. BODY TEXT ~16PX/24PX LINE HEIGHT; HERO H1 ~44–52PX BOLD; SECTION HEADINGS ~28–36PX SEMIBOLD/BOLD; CARD TITLES ~18–20PX SEMIBOLD.
- **TYPE SCALE:** HERO TITLE 3XL–5XL, SECTION TITLE 2XL–4XL, BODY BASE (16PX), SMALL/LABEL TEXT SM (14PX).
- **RADII:** BUTTONS/INPUTS/CARDS USE ROUNDED-MD/LG (~6–10PX); PILLS/BADGES (CATEGORY TAGS ON BLOG CARDS) FULLY ROUNDED; AVATAR IMAGES CIRCULAR.
- **SHADOWS:** SOFT, LOW-OPACITY DROP SHADOWS ON CARDS AND THE STICKY HEADER; SUBTLE GLOW BEHIND HERO DECORATIVE SHAPES (BLURRED BLUE SPHERES/POLYGON OUTLINES).
- **ANIMATION / EASING:** HEADER TOGGLER "HAMBURGER→X" BARS ANIMATE WITH `transition-all duration-300`; NAV LINKS, BUTTONS, AND CARDS USE `transition` / `duration-300` COLOR & TRANSFORM EASING ON HOVER; STICKY HEADER TRANSITIONS BACKGROUND/SHADOW ON SCROLL; MOBILE MENU PANEL SLIDES/FADES OPEN; "PAGES" DROPDOWN FADES/SLIDES IN ON HOVER/CLICK; THEME TOGGLE ICON (SUN/MOON) SWAPS INSTANTLY WITH THE ROOT `dark` CLASS (BOOT SCRIPT WRITES THE CLASS BEFORE PAINT TO AVOID FLASH, READING/WRITING `localStorage.theme`).

## LAYOUT & STRUCTURE

**Shared chrome (every page):**
- **Header:** logo (light/dark variants swapped via `dark:hidden` / `dark:block`), nav links (Home, About, Blog, Support) plus a "Pages" dropdown (Blog Grid / Blog Details / Blog Sidebar / Sign In / Sign Up / Error), Sign In link + Sign Up button, and a sun/moon theme-toggle button. Header is `position: absolute` + transparent over the hero on the home page and turns sticky/opaque with a shadow once the user scrolls. A hamburger button (3 animated bars) opens a mobile nav panel below `lg` breakpoint.
- **Footer:** logo + short blurb + social icons (Facebook, X, YouTube, LinkedIn), three link columns ("Useful Links", "Terms", "Support & Help"), a decorative blurred sphere graphic, and a centered "Template by Uideck and Next.js Templates" credit line.

**Pages discovered and cloned:**
1. **Home (`/`)** — Hero (headline, subcopy, "Get Pro"/"Star on GitHub" CTAs, decorative blurred sphere + wire-polygon shapes), Brands/logo strip, "Main Features" 6-card grid (icon chip + title + copy), video/image feature block with play button overlay, "Crafted for Startup, SaaS and Business Sites" split section with checklist, 3-column feature-highlight rows (Bug free code / Premier support / Next.js), "What Our Users Say" 3-card testimonial grid (star rating, quote, avatar, name/role), "Simple and Affordable Pricing" with monthly/yearly toggle switch and 3 pricing cards (Lite/Basic/Plus), "Our Latest Blogs" 3-card preview grid with category pill, contact/support two-panel CTA (support ticket form + newsletter subscribe form), footer.
2. **About (`/about`)** — Breadcrumb header ("About Page" + Home > About Page), "Crafted for Startup, SaaS and Business Sites" split section (checklist + image collage), image + 3-row feature list section ("Bug free code" / "Premier support" / "Next.js"), footer.
3. **Blog Grid (`/blog`)** — Breadcrumb header ("Blog Grid"), 3-column blog card grid (cover image, category pill, title, excerpt, avatar + author/role + date), numbered pagination (Prev / 1 2 3 … 12 / Next), footer.
4. **Blog Details (`/blog-details`)** — Breadcrumb-less article header (title, author avatar/name, date/comment-count/view-count, category pill), full-width cover image, rich-text body (bold/underlined inline emphasis, subheading, bullet list, blockquote-style highlighted callout with corner blob decoration), popular-tags row, share-icon row, footer.
5. **Blog Sidebar (`/blog-sidebar`)** — Same article body as Blog Details plus a right sidebar: search box, "Related Posts" list (thumbnail + title + date), "Popular Category" list, "Popular Tags" pill row, and a "Subscribe to receive future updates" newsletter card, footer.
6. **Contact / Support (`/contact`)** — Breadcrumb header ("Contact Page"), two-panel layout: "Need Help? Open a Ticket" form (Name/Email/Message + Submit Ticket button) and "Subscribe to receive future updates" newsletter form (with decorative corner blobs), footer.
7. **Sign In (`/signin`)** — Centered card: "Sign in to your account" heading, "Sign in with Google" / "Sign in with Github" OAuth buttons (with brand icons), divider ("Or, sign in with your email"), Email/Password fields, "Keep me signed in" checkbox + "Forgot Password?" link, primary "Sign in" button, "Don't you have an account? Sign up" link, footer.
8. **Sign Up (`/signup`)** — Centered card: "Create your account" heading, same OAuth buttons/divider pattern, Full Name/Work Email/Password fields, terms-agreement checkbox with linked "Terms and Conditions"/"Privacy Policy", primary "Sign up" button, "Already using Startup? Sign in" link, footer.
9. **Error / 404 (`/error`)** — Centered "404" numeral art with a decorative sphere between the digits, "Sorry, the page can't be found" heading, subcopy, "Back to Homepage" button, decorative wireframe cube shapes in the corners, footer.

All interactive elements — theme toggle (persisted via `localStorage`, no-flash boot script, `prefers-color-scheme` fallback), mobile hamburger menu, "Pages" nav dropdown, sticky/transparent header swap on scroll, pricing monthly/yearly toggle switch, hover states on nav links/buttons/cards/pagination, and form submit handlers (no backend — shows inline feedback) — are reproduced from the captured reference states in `.reference/<page>/states/` and the extracted Tailwind CSS rules in `.reference/<page>/source.css` / `full-source.css`.
