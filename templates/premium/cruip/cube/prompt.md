> SELF-CONTAINED, PIXEL-FAITHFUL REPRODUCTION OF THE CRUIP "CUBE" TEMPLATE. REFERENCE: `https://cruip.com/demos/cube/`

## SUMMARY

CUBE IS A DARK-THEMED SAAS LANDING PAGE TEMPLATE FOR A FICTIONAL USER-ANALYTICS / PRODUCT-MANAGEMENT PLATFORM CALLED "CUBE". THE TEMPLATE HAS FOUR PAGES: A FULL-FEATURED MARKETING HOME PAGE, A SIGN-IN PAGE, A SIGN-UP (REQUEST DEMO) PAGE, AND A RESET-PASSWORD PAGE. THE DESIGN USES A DEEP SLATE-900 DARK BACKGROUND WITH INDIGO/VIOLET ACCENTS, THE INTER TYPEFACE, AND RICH INTERACTIVITY VIA ALPINE.JS (PRICING TOGGLE, FEATURE-CATEGORY TABS), SWIPER.JS (FEATURE CAROUSEL), AND AOS (SCROLL REVEAL ANIMATIONS ON HERO COPY, INTEGRATION ICONS, TESTIMONIALS, CTA).

## STYLE

### PALETTE
- BACKGROUND BODY: `#0F172A` (SLATE-900)
- BACKGROUND CARD / BOX: `#1E293B` (SLATE-800)
- TEXT PRIMARY: `#E2E8F0` (SLATE-200)
- TEXT MUTED: `#94A3B8` (SLATE-400)
- ACCENT CTA BUTTON BG: `#6366F1`, HOVER `#4F46E5`
- SECONDARY BUTTON: `#1E293B` BG, `#334155` BORDER
- POSITIVE CHECK: `#34D399` (EMERALD-400)
- HIGHLIGHT BADGE: `#A3E635` (LIME-400)
- LOGO: `#3730A3` / `#4F46E5` / `#818CF8`→`#C7D2FE`

### TYPOGRAPHY
- FONT: Inter, sans-serif
- BASE: 16px / 24px, letter-spacing -0.01em
- H1 HERO: ~3rem 700
- H2 SECTION: ~2.25rem 700
- BUTTON: 0.875rem 500

### ANIMATIONS
- AOS EASING: ease-out-cubic, 500ms
- SWIPER: draggable carousel
- INTEGRATIONS HALO: pulsing concentric SVG rings

## LAYOUT & STRUCTURE

### PAGES DISCOVERED: 4

1. index.html — HOME: Header, Hero, Testimonials Strip, Features Carousel, Features Tabs, Integrations Hub, Pricing Table, Quote, FAQs, CTA, Footer
2. signin.html — SIGN IN: Logo, auth illustration, sign-in form + Google OAuth, links
3. signup.html — REQUEST DEMO: Split layout (left: avatars + feature list, right: contact form)
4. reset-password.html — RESET PASSWORD: Centered form, email input, back to sign-in link

### HOME SECTIONS
- HEADER: Logo SVG + Sign In link + Get Started CTA button
- HERO: hero-illustration.svg bg, H1 "A powerful suite of user-centric products", two CTAs, hero-image.png
- TESTIMONIALS: 3 review cards (Trustpilot 4.9, Capterra 4.7, G2 4.9), 5-star ratings, AOS stagger
- FEATURES #1: Section header + Swiper carousel (Collaboration, Experiences, Animation, Modeling icons)
- FEATURES #2: Tab switcher (Everyone/Freelancers/Organizations) via Alpine.js + features-image.png
- INTEGRATIONS: Central Cube logo with pulsing SVG halo + 6 icon boxes (integration-icon-01..06)
- PRICING: Monthly/Yearly toggle (Alpine.js), 3-plan comparison (Starter $29, Agency $49, Team $79), feature rows with checkmarks
- TESTIMONIAL QUOTE: Large pull-quote from Mirta Jiang / Paid Apps
- FAQS: 2-column grid of 6 Q&A pairs
- CTA: "Join the most flexible..." with two CTAs + cta-illustration.svg
- FOOTER: 5 columns (Logo, Products, Resources, Projects, Company) + social icons + legal links

### INTERACTIONS
- PRICING TOGGLE: Alpine.js checkbox switches prices monthly↔yearly
- FEATURES TABS: Alpine.js category switcher (Everyone / Freelancers / Organizations)
- SWIPER CAROUSEL: Draggable, prev/next arrows
- AOS: fade-up reveals on hero, testimonials, integration icons, CTA section
- FORM VALIDATION: HTML5 required attributes on auth/contact forms
