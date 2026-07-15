> A SELF-CONTAINED, PIXEL-FAITHFUL REPRODUCTION OF THE NEXTBLOG TEMPLATE FROM NEXTJSTEMPLATES. REFERENCE: `https://nextblog.demo.nextjstemplates.com`

## SUMMARY

NEXTBLOG IS A FULL-FEATURED PREMIUM BLOG TEMPLATE BUILT WITH NEXT.JS, FEATURING BUSINESS AND PERSONAL BLOG LAYOUTS, DARK MODE SUPPORT, AUTHOR PAGES, BLOG ARCHIVE, SEARCH FUNCTIONALITY, AND A NEWSLETTER SUBSCRIPTION SECTION. THIS CLONE REPRODUCES IT AS SELF-CONTAINED PLAIN HTML/CSS/JS WITH NO BUILD STEP OR FRAMEWORK DEPENDENCY.

## STYLE

- PALETTE: PRIMARY #625DF5 (PURPLE), DARK #15171A, BODY TEXT #5C6A78, ORANGE ACCENT #F39F10, GRAY BG #F9FAFB, WHITE #FFFFFF, BLUE #2D68F8, GREEN #22AD5C, PURPLE #8646F4, TEAL #02AAA4
- FONTS: INTER (300, 400, 500, 600, 700, 800) — LOADED FROM GOOGLE FONTS
- TYPE SCALE: HEADING-1 CLAMP(2REM,5VW,3.5REM), HEADING-2 2REM, HEADING-3 1.5REM, HEADING-4 1.25REM, BASE 16PX, SM 14PX, XS 12PX
- RADII: SM 4PX, MD 6PX, LG 8PX, XL 12PX, 2XL 16PX (HERO IMAGE BOTTOM CORNERS 50PX)
- ANIMATION: DEFAULT TRANSITION 0.3S EASE, HOVER TRANSLATE -2PX ON CARDS
- SHADOWS: 0PX 8PX 12PX RGBA(13,10,44,0.04), 0PX 10PX 30PX RGBA(13,10,44,0.05)
- DARK MODE: NOT IMPLEMENTED IN THIS HTML CLONE (LIGHT MODE ONLY)

## ASSETS

- BLOG IMAGES: `./assets/images/blog/blog1.png`, `blog2.jpg`, `blog3.png`, `blog4.jpg`, `blog5.jpg`, `blog6.png`
- AUTHOR AVATARS: `./assets/images/authors/author1.png`, `author2.png`, `author3.png`, `author4.png`
- CSS: `./styles.css`
- JS: `./script.js`

## LAYOUT & STRUCTURE

### SHARED HEADER (ALL PAGES)
- FIXED TOP HEADER WITH `.site-header` CLASS THAT ADDS `scrolled` CLASS ON SCROLL
- LOGO: SVG TEXT "Next" (DARK) + "Blog" (PRIMARY) — LINKS TO `./index.html`
- MOBILE HAMBURGER: `.nav-toggle` BUTTON WITH 3 `<span>` BARS — TOGGLES `open` CLASS ON `.nav-menu`
- NAV DROPDOWNS: `.nav-item` WITH `.nav-dropdown` `<ul>` CHILD — TOGGLED VIA JS `open` CLASS
- NAV LINKS:
  - HOME (DROPDOWN: BUSINESS BLOG → `./index.html`, PERSONAL BLOG → `./personal-blog.html`)
  - ABOUT US → `./about.html`
  - AUTHOR PAGE → `./author.html`
  - SEARCH PAGE → `./search.html`
  - PAGES (DROPDOWN: BLOG POST → `./blog-post.html`, BLOG ARCHIVE → `./archive.html`, SIGN IN → `./auth/signin.html`, SIGN UP → `./auth/signup.html`, PRIVACY & POLICY → `./privacy-policy.html`)
- NAV ACTIONS: `.btn-signin` (SIGN IN) + `.btn-getstarted` (GET STARTED)

### SHARED FOOTER (ALL PAGES)
- `.site-footer` WITH `.footer-inner` FLEX ROW
- COPYRIGHT TEXT `.footer-copy`
- FOOTER LINKS `.footer-links`: PRIVACY, TERMS, CONTACT
- SOCIAL LINKS `.footer-social`: FACEBOOK SVG + TWITTER/X SVG

### PAGES DISCOVERED

1. `./index.html` — BUSINESS BLOG HOME
2. `./personal-blog.html` — PERSONAL BLOG HOME
3. `./about.html` — ABOUT US PAGE
4. `./blog-post.html` — BLOG POST DETAIL
5. `./archive.html` — BLOG ARCHIVE PAGE
6. `./author.html` — AUTHOR LISTING PAGE
7. `./search.html` — SEARCH PAGE
8. `./auth/signin.html` — SIGN IN PAGE
9. `./auth/signup.html` — SIGN UP PAGE
10. `./privacy-policy.html` — PRIVACY & POLICY PAGE

### HOME (BUSINESS BLOG) — `index.html`
- HERO SECTION (`.hero-section`): GRAY BACKGROUND, LARGE FEATURED POST CARD (`.featured-card`) LEFT + SMALL POSTS GRID (`.small-posts-grid`) RIGHT WITH 3 SMALLER CARDS (`.small-post-card`)
- FEATURED CARD: PRO BADGE (`.pro-badge`), CATEGORY BADGE (`.category-badge`), POST TITLE (`.post-title`), EXCERPT (`.post-excerpt`), AUTHOR META (`.post-meta`, `.author-link`, `.author-avatar`, `.author-name`, `.meta-dot`, `.post-date`)
- RECENT POSTS SECTION (`.posts-section`): SECTION HEADER (`.section-header`, `.section-title`, `.see-all-link`), 3-COLUMN POSTS GRID (`.posts-grid`) WITH 6 CARDS (`.post-card`, `.post-card-img`, `.post-card-body`, `.post-card-title`, `.post-card-excerpt`)
- AUTHORS SECTION (`.authors-section`): 3-COLUMN AUTHORS GRID (`.authors-grid`) WITH AUTHOR CARDS (`.author-card`, `.author-card-avatar`, `.author-card-name`, `.author-card-role`, `.author-card-posts`)
- NEWSLETTER CTA (`.newsletter-section`): `.newsletter-card` WITH TEXT LEFT + FORM RIGHT (`.newsletter-input-wrap`, `.newsletter-input`, `.btn-subscribe`)

### PERSONAL BLOG — `personal-blog.html`
- PERSONAL HERO (`.personal-hero`): TWO-COLUMN LAYOUT (`.personal-hero-inner`) — TEXT LEFT (`.personal-hero-text`) WITH CATEGORY BADGE, H1, DESCRIPTION, CTA BUTTONS, AUTHOR PROFILE — IMAGE RIGHT (`.personal-hero-img`)
- LATEST POSTS (`.posts-section`): 3-COLUMN POSTS GRID (`.posts-grid`) WITH 6 POST CARDS
- NEWSLETTER SECTION

### ABOUT — `about.html`
- ABOUT HERO (`.about-hero`): CENTERED BREADCRUMB, H1, SUBTITLE
- ABOUT CONTENT (`.about-content`): TWO-COLUMN GRID (`.about-grid`) — IMAGE (`.about-img`) + TEXT (`.about-text`) WITH "OUR STORY" COPY
- STATS BLOCK: 2×2 GRID WITH 4 NUMBERS (150+ ARTICLES, 50K+ READERS, 12 WRITERS, 8 CATEGORIES)
- MISSION GRID: TEXT LEFT + IMAGE RIGHT WITH "OUR MISSION" COPY AND CTA BUTTON
- TEAM SECTION: GRAY BACKGROUND, 4-COLUMN AUTHOR CARDS GRID (`.author-card`)
- NEWSLETTER SECTION

### BLOG POST DETAIL — `blog-post.html`
- BREADCRUMB BAR: HOME / BLOG / POST TITLE
- TWO-COLUMN LAYOUT (`.blog-detail-layout`): ARTICLE LEFT + SIDEBAR RIGHT (`.sidebar`)
- ARTICLE STRUCTURE: CATEGORY BADGE → H1 → POST META (AUTHOR, DATE, READ TIME) → FEATURED IMAGE (`.blog-detail-img`) → ARTICLE BODY (`.blog-detail-content`) WITH H4 HEADINGS, PARAGRAPHS, BLOCKQUOTES, TIP BOXES
- TAGS (`.tags-list`, `.tag`) + AUTHOR BIO BOX (`.author-bio-box`, `.author-bio-avatar`, `.author-bio-name`, `.author-bio-role`, `.author-bio-desc`) + "VIEW ALL POSTS" BUTTON
- RELATED POSTS: 3-CARD POSTS GRID
- SIDEBAR WIDGETS: SEARCH, CATEGORIES (`.sidebar-categories`, `.sidebar-category-item`), POPULAR POSTS (THUMBNAIL + TITLE + DATE), TAGS, NEWSLETTER CTA

### BLOG ARCHIVE — `archive.html`
- PAGE HEADER (`.page-header`): CENTERED BREADCRUMB, H1, SUBTITLE
- ARCHIVE LAYOUT (`.archive-layout`): POST LIST LEFT + SIDEBAR RIGHT
- FILTER TABS: CATEGORY LINKS (ALL, HEALTH, LIFESTYLE, TRAVEL, TECH, BUSINESS) AS TAG BUTTONS
- POST LIST: HORIZONTAL BLOG LIST CARDS (`.blog-list-card`, `.blog-list-img`, `.blog-list-body`) WITH IMAGE LEFT + CONTENT RIGHT
- PAGINATION (`.pagination`): PREV ARROW, PAGE NUMBERS (`.pagination-page`, `.active`), NEXT ARROW
- SIDEBAR: SAME WIDGET PATTERN AS BLOG POST PAGE (SEARCH, CATEGORIES, POPULAR POSTS, TAGS)

## JAVASCRIPT BEHAVIOR (`script.js`)

- `.site-header` SCROLL: ADDS `scrolled` CLASS WHEN `window.scrollY > 10`
- MOBILE MENU: `.nav-toggle` CLICK TOGGLES `open` CLASS ON `.nav-menu`
- DROPDOWN: `.nav-item` CLICK (MOBILE) TOGGLES `open` CLASS ON CLICKED ITEM, CLOSES OTHERS
- NEWSLETTER FORM: PREVENTS DEFAULT, SHOWS ALERT, CLEARS INPUT
- ACTIVE NAV LINK: DETECTS CURRENT PAGE BY `window.location.pathname` AND ADDS `active` CLASS
