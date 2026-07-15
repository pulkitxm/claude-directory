> A SELF-CONTAINED, PIXEL-FAITHFUL REPRODUCTION OF THE STARTUP PRO TEMPLATE FROM NEXT.JS TEMPLATES. REPRODUCED AS PLAIN HTML + CSS + VANILLA JS WITH ALL ASSETS VENDORED LOCALLY.

REFERENCE: `https://startup-pro.demo.nextjstemplates.com/`

## SUMMARY

STARTUP PRO IS A PREMIUM SAAS STARTUP LANDING PAGE TEMPLATE BUILT WITH NEXT.JS. IT FEATURES TWO DISTINCT HOMEPAGE VARIANTS, A FULL BLOG SYSTEM (GRID AND LIST LAYOUTS + DETAIL PAGES), DOCS, PRICING, ABOUT, CONTACT, FAQ, AUTH (SIGN IN / SIGN UP), UTILITY PAGES, AND A DARK/LIGHT MODE TOGGLE. THE DESIGN IS CLEAN, MODERN, AND PROFESSIONAL — HEAVY USE OF BLUE (#4A6CF7) AS THE PRIMARY ACCENT ON A WHITE/NEAR-WHITE BACKGROUND (LIGHT MODE) OR NEAR-BLACK (#1D2144 / #040A22) BACKGROUND (DARK MODE). TYPOGRAPHY IS INTER (VARIABLE 100–900 WEIGHT). ALL INTERACTIVE ELEMENTS HAVE HOVER STATES, THE NAV HAS A DROPDOWN FOR HOME PAGES, AND THE THEME TOGGLE PERSISTS VIA LOCALSTORAGE.

## STYLE

### PALETTE

| TOKEN | LIGHT | DARK |
|---|---|---|
| `--color-bg` | `#FCFCFC` | `#040A22` |
| `--color-bg-dark` | `#F8F8F8` | `#1D2144` |
| `--color-primary` | `#4A6CF7` | `#4A6CF7` |
| `--color-primary-hover` | `#3959E3` | `#3959E3` |
| `--color-dark` | `#1C2334` | `#FFFFFF` |
| `--color-body` | `#637381` | `#8899AA` |
| `--color-border` | `#E5E7EB` | `#313A4D` |
| `--color-gray-light` | `#F0F2F9` | `#1B2447` |
| `--color-card-bg` | `#FFFFFF` | `#1D2144` |
| `--color-shadow` | `rgba(47, 62, 70, 0.07)` | `rgba(0,0,0,0.3)` |

### FONTS

- FAMILY: **Inter** (variable weight 100–900), with `Inter Fallback` (Arial-based) as system fallback
- LOADED VIA: Self-hosted woff2 (CDN URL: `https://startup-pro.demo.nextjstemplates.com/_next/static/media/83afe278b6a6bb3c-s.p.3a6ba036.woff2`)

### TYPE SCALE

| USAGE | SIZE | WEIGHT | LINE HEIGHT |
|---|---|---|---|
| H1 HERO | 2.5–4rem | 700 | 1.2 |
| H2 SECTION | 1.5–2.25rem | 700 | 1.3 |
| H3 CARD | 1.125–1.5rem | 600 | 1.4 |
| BODY | 1rem | 400 | 1.7 |
| SMALL/LABEL | 0.875rem | 400 | 1.5 |

### RADII

- BUTTONS: `5px`
- CARDS: `5px` (standard), `10px` (feature cards)
- INPUT FIELDS: `5px`
- BADGE/TAG: `3px`

### ANIMATION EASINGS

- NAV SUBMENU: `opacity/top` `transition 300ms ease`
- MOBILE NAV: `visibility/opacity` `transition 300ms ease`
- HERO SHAPES: `@keyframes` float / bounce effects
- SCROLL REVEAL: `AOS` (Animate On Scroll) library with `fade-up` / `fade-right` / `fade-left` patterns
- THEME TOGGLE: INSTANT CLASS SWAP ON `<html>` + ICON SWAP + LOCALSTORAGE PERSISTENCE
- FAQ ACCORDION: HEIGHT COLLAPSE `transition 300ms ease`

## LAYOUT & STRUCTURE

### PAGES DISCOVERED

1. **HOME PAGE 1** (`/` → `index.html`)
   - Sticky header with logo, nav with Home dropdown, About, Blog, Docs, Pages menu, Sign In + Get Started CTA
   - Hero: large headline + subtext + 2 CTA buttons + animated gradient shapes + Trust badges
   - Brands: "Trusted by" logos strip (FormBold, UIDeck, TailGrids, LineIcons, TailAdmin, PlainAdmin)
   - Features (6 cards): Crafted for SaaS Startups / High-quality Design / React+Next.js / Functional Blog & Docs / Database Auth Payment / Two Unique Homepages
   - Video section: feature image with play button
   - About section: 2-column image + bullet points
   - Testimonials: 3 testimonial cards with avatar + name + company
   - Pricing: 3 tiers (Basic $100 / Premium $200 / Business $300)
   - Contact section: map + contact form
   - Newsletter subscription banner
   - Footer: logo + description + links + social icons

2. **HOME PAGE 2** (`/home-2` → `home-2.html`)
   - Same header/footer
   - Different hero: centered layout with gradient text
   - Alternating feature sections with screenshots
   - Trust section with brand logos
   - Testimonials carousel
   - Pricing table
   - Newsletter CTA
   - FAQ accordion section

3. **ABOUT** (`/about` → `about.html`)
   - Breadcrumb hero banner
   - Mission/vision section
   - Team members grid
   - Brands / Trusted by section
   - CTA section

4. **BLOGS (GRID)** (`/blogs` → `blogs.html`)
   - Breadcrumb hero
   - Blog cards grid (3 columns desktop, 2 tablet, 1 mobile)
   - Sidebar: search, categories, tags, recent posts

5. **BLOGS 2 (LIST)** (`/blogs-2` → `blogs-2.html`)
   - Same breadcrumb hero
   - Blog posts in list/horizontal layout
   - Same sidebar

6. **BLOG DETAIL** (`/blogs/[slug]` → `blog-detail.html`)
   - Breadcrumb hero
   - Article content with code blocks, headings, images
   - Sidebar: related posts, tags, share buttons

7. **DOCS** (`/docs` → `docs.html`)
   - Left sidebar navigation (Bootstrap Template Guide / Configuring Contact Form / Sanity integration / Style Guide / Using Tailwind Components / Using Tailwind Templates)
   - Main content area with markdown-style documentation

8. **PRICING** (`/pricing` → `pricing.html`)
   - Breadcrumb hero
   - 3-column pricing cards with toggle (monthly/annual)
   - Feature comparison table
   - FAQ section

9. **CONTACT** (`/contact` → `contact.html`)
   - Breadcrumb hero
   - Map embed
   - Contact form (name, email, message)
   - Info cards (address, phone, email)

10. **FAQ** (`/faq` → `faq.html`)
    - Breadcrumb hero
    - Accordion FAQ sections

11. **SIGN IN** (`/auth/signin` → `signin.html`)
    - Centered card with social login buttons (Google, GitHub)
    - Email + password form
    - "Remember me" + "Forgot password" links

12. **SIGN UP** (`/auth/signup` → `signup.html`)
    - Same centered card layout
    - Name + email + password form
    - Social signup options

13. **ERROR** (`/error` → `error.html`)
    - 404 page with illustration and CTA
