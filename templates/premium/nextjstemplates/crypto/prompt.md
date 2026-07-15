> SELF-CONTAINED, PIXEL-FAITHFUL REPRODUCTION OF A NEXTJSTEMPLATES DEMO SITE. PLAIN HTML/CSS/VANILLA-JS, NO BUILD STEP, ASSETS VENDORED LOCALLY.
REFERENCE: `https://crypto.demo.nextjstemplates.com`

## SUMMARY

A "CRYPTO" NEXT.JS TEMPLATE AND BOILERPLATE FOR CRYPTOCURRENCY, ICO, AND WEB3 LANDING SITES. LIGHT THEME WITH A BLUE (`#465FF1`-ISH) ACCENT, INTER TYPEFACE, SOFT LIGHT-BLUE (`rgb(245,248,255)`) SECTION BACKGROUNDS, ROUNDED CARDS, DECORATIVE BLOB/GRADIENT SVG BACKGROUNDS, AND SCROLL-REVEAL ANIMATIONS ON MOST SECTIONS. THE SITE IS A ONE-PAGE MARKETING HOME (HERO, PARTNER LOGOS, FEATURES, ROADMAP, TOKEN STATS, TEAM, TESTIMONIALS, FAQ, DOWNLOAD/APP CTA, NEWSLETTER, BLOG PREVIEW, CONTACT/SUPPORT FORM, FOOTER) PLUS SEVERAL LINKED PAGES: A BLOG LISTING, THREE BLOG POST DETAIL PAGES, A BLOG AUTHOR PAGE, A DEDICATED TOKEN-SALE PAGE, A SUPPORT PAGE, AND AUTH PAGES (SIGN IN, SIGN UP, FORGOT PASSWORD).

## STYLE

- FONT: `Inter` (GOOGLE FONT / NEXT/FONT), FALLBACK SYSTEM SANS. BASE `16px` / `24px` LINE-HEIGHT, WEIGHT 400 BODY, 600-800 FOR HEADINGS.
- PALETTE (LIGHT THEME, TAILWIND-DRIVEN, DARK-MODE CLASSES PRESENT IN MARKUP SO THE CLONE MUST SUPPORT A DARK VARIANT TOO):
  - BODY BG: `#FFFFFF` · TEXT: `#000000` / DARK GRAY BODY COPY
  - SECTION ALT BG: `rgb(245, 248, 255)` (very light blue-tinted)
  - PRIMARY ACCENT / BUTTON: BLUE `#465FF1`-RANGE (TAILWIND `primary` BLUE), HOVER SLIGHTLY DARKER
  - CARD BG: WHITE WITH SOFT SHADOW, ROUNDED (`rounded-lg`/`rounded-xl`, ~8-16px RADIUS)
  - DECORATIVE BACKGROUND: SOFT BLUE GRADIENT BLOB SVGS BEHIND HERO/ROADMAP/CTA SECTIONS
- TYPE SCALE: HERO H1 ~44-56px/BOLD, SECTION H2 ~32-40px/BOLD, BODY 16px, SMALL/META 14px.
- RADII: BUTTONS/PILLS FULLY ROUNDED OR ~8px; CARDS ~12-16px.
- SHADOWS: SOFT DIFFUSE CARD SHADOWS (`shadow-md`/`shadow-lg` STYLE), NO HARSH BORDERS.
- ANIMATION: HEADER IS `fixed`/STICKY, TRANSPARENT AT TOP THEN SOLID WHITE + SHADOW ON SCROLL; SECTIONS REVEAL ON SCROLL (FADE/SLIDE UP, INTERSECTIONOBSERVER-STYLE); CARDS/BUTTONS HAVE HOVER LIFT/COLOR TRANSITIONS (~150-300ms EASE); MOBILE HAMBURGER MENU SLIDES/TOGGLES.

## LAYOUT & STRUCTURE

Discovered pages (all reproduced):

1. **`index.html`** (home, `/`) — sticky header w/ logo, nav (Home, Features, Roadmap, Pages dropdown, Support), search icon, notification icon, Sign In + "Buy Tokens 47% OFF" CTA buttons; hero headline + subcopy + email/social icons + CTA; "20,000+ companies" partner-logo strip (uideck, TailGrids, Lineicons, Ayro UI, PlainAdmin); features grid; roadmap timeline; token/coin stats with mini charts (ApexCharts, e.g. bitcoin/ethereum/chainlink/polygon % change chips); team section; testimonials; FAQ accordion; download/app CTA banner; newsletter signup; "Recent News & Blogs" 3-card preview (author/date meta, title, excerpt, Read More); contact/support form section; footer w/ logo, quick links, supports links, news/post mini-list, social icons, copyright.
2. **`blog.html`** (`/blog`) — blog grid/listing page reusing header/footer, grid of post cards (image, author/date meta, title, excerpt, Read More), pagination.
3. **`blog-post-1.html`, `blog-post-2.html`, `blog-post-3.html`** (`/blog/<slug>` — "expenses-as-material-bre-mate-insisted-building", "laboris-nisi-aliquip-dium-exiuliym-commo-cons", "quis-nostrud-exercitati-ullamc-laboris-nisi-aliquip") — blog post detail: hero image, title, author/date meta, article body, tags/share, related posts / sidebar.
4. **`blog-author.html`** (`/blog/author/juhan-ahamed`) — author profile page: avatar, bio, social links, grid of the author's posts.
5. **`token-sale.html`** (`/token-sale`) — dedicated ICO/token-sale landing section: countdown, sale progress bar, tokenomics stats, buy-token CTA.
6. **`support.html`** (`/support`) — support/contact page: contact form, support channels/FAQ.
7. **`signin.html`** (`/auth/signin`) — sign-in form card (email, password, remember me, social sign-in, link to sign up / forgot password).
8. **`signup.html`** (`/auth/signup`) — sign-up form card (name, email, password, terms checkbox, social sign-up, link to sign in).
9. **`forget-password.html`** (`/auth/forget-password`) — forgot-password form card (email, submit, back-to-signin link).

Shared chrome: fixed header/nav with "Pages" dropdown (linking Blog Grid, Token Sale, Support, Sign In, Sign Up) and mobile hamburger menu; footer with logo, Quick Links, Supports, News & Post, social icons, copyright — identical across every page. All interactive elements (nav dropdown, mobile menu toggle, FAQ accordion, hover states on cards/buttons/links, scroll-reveal animations, sticky-header transition) are reproduced from captured reference states in `.reference/<page>/states/`.
