> A SELF-CONTAINED, PIXEL-FAITHFUL REPRODUCTION OF THE "SEOPTIC" NEXT.JS SEO ANALYTICS SAAS TEMPLATE BY THEMEFISHER, REBUILT AS PLAIN HTML + CSS + VANILLA JS WITH NO BUILD STEP. EVERY PAGE, THE FULL LOOK & FEEL, HOVER STATES, DROPDOWN/MOBILE-MENU INTERACTIONS, PRICING TOGGLE, FAQ ACCORDION, INFINITE-SCROLL MARQUEES, AND SCROLL/ENTRANCE ANIMATIONS ARE REPRODUCED FROM CAPTURED REFERENCE ARTIFACTS. ALL ASSETS (FONTS, IMAGES, ICONS) ARE VENDORED LOCALLY AND IT RUNS OFFLINE.

REFERENCE: `https://themefisher.com/demo?theme=seoptic-nextjs`

THE LIVE TEMPLATE ITSELF (INSIDE THE THEMEFISHER PREVIEW FRAME) IS SERVED FROM `https://seoptic-nextjs.vercel.app` — THAT IS THE ORIGIN THAT WAS CRAWLED AND CLONED. THE THEMEFISHER `/demo` PAGE IS ONLY THE PREVIEW HOST WRAPPING THE TEMPLATE IN AN IFRAME; ITS CHROME IS NOT PART OF THIS CLONE.

## SUMMARY

SEOPTIC IS A MODERN SEO ANALYTICS SAAS NEXT.JS TEMPLATE BY THEMEFISHER, SHOWCASING AN INTELLIGENT SEO ENGINE PRODUCT. THE TEMPLATE IS A LIGHT-MODE-FIRST DESIGN USING AN ORANGE PRIMARY (#FF5A03), YELLOW SECONDARY (#FFD350), AND PINK TERTIARY (#FF4EC5) ON A WHITE BACKGROUND. IT FEATURES 16 DISTINCT PAGES SHARING A COMMON HEADER/NAV AND FOOTER. ENTRANCE ANIMATIONS USE CSS KEYFRAMES (AOS-STYLE FADE/SLIDE-IN ON SCROLL VIA INTERSECTIONOBSERVER). THE HEADER HAS A "PAGES" DROPDOWN MENU AND A MOBILE HAMBURGER MENU. PRICING HAS A MONTHLY/ANNUAL TOGGLE. THERE IS AN INFINITE-SCROLL BRANDS MARQUEE.

## STYLE

### PALETTE
- `--color-primary: #ff5a03` (orange — CTAs, highlights)
- `--color-secondary: #ffd350` (yellow — accents)
- `--color-tertiary: #ff4ec5` (pink — accent)
- `--color-body: #ffffff` (page background)
- `--color-light: #faf9f8` (light section backgrounds)
- `--color-dark: #040404` (dark sections)
- `--color-text: #1a1a1a` (body text)
- `--color-text-dark: #1a1a1a` (headings)
- `--color-text-light: #4f5662` (secondary text)
- `--color-border: #d9d9d9` (borders)

### FONTS
- PRIMARY: `Inter, sans-serif` — body text, nav, buttons
- SECONDARY: `Inter Tight, sans-serif` — headings (h1–h6)
- LOADED VIA GOOGLE FONTS

### TYPE SCALE (MODULAR 1.2x)
- `--text-h1: 2.986rem` (sm: 2.687rem)
- `--text-h2: 2.488rem` (sm: 2.239rem)
- `--text-h3: 2.074rem` (sm: 1.866rem)
- `--text-h4: 1.728rem`
- `--text-h5: 1.44rem`
- `--text-h6: 1.2rem`
- `--text-base: 16px` (sm: 12.8px)
- HEADINGS: font-weight bold, line-height 1.25
- BODY: font-weight 400, line-height 1.625

### RADII
- `--radius-lg: 0.5rem`, `--radius-xl: 0.75rem`, `--radius-2xl: 1rem`, `--radius-3xl: 1.5rem`, `--radius-4xl: 2rem`

### ANIMATIONS & KEYFRAMES
- `hbs`: hero blob scale animation (opacity 0→1, scale 1→1.6→1.2), 4s, staggered
- `inf-scroll`: infinite marquee scroll (translateX 0→-50%), used for brand logos
- `inf-scroll-reverse`: reverse marquee
- `pricing_shade_slide`: animated gradient background on pricing cards
- `text-reveal` / `text-hide`: fade+blur+translateY for pricing toggle
- `int-logo-reveal`: blur/opacity animation for integration logos
- `slide-gradient`: animated border gradient on feature cards
- ENTRANCE ANIMATIONS: fade-in-up via IntersectionObserver (data-aos style)

### DARK MODE
- THE TEMPLATE IS LIGHT-MODE ONLY; DARK SECTIONS USE bg `#040404` (dark). IMPLEMENT LIGHT/DARK THEME TOKENS WITH PREFERS-COLOR-SCHEME SUPPORT.

## LAYOUT & STRUCTURE

### SHARED CHROME
- **HEADER/NAV**: White sticky top bar. Logo (left) + nav links (center: Home, Pricing, Integrations, Pages dropdown [Our Team, Features, Blog, Careers, Changelogs, FAQ, Contact, Authors, Elements, 404 Page], About) + CTA "Get Started" button (right). Mobile: hamburger toggle reveals full-page nav overlay.
- **FOOTER**: Dark background (#040404). Brand description column, 3 link columns (Quick Links: About Us, Pricing, Features, Careers, Integrations / Support: FAQ's, Changelogs, Privacy Policy, Terms of Service, Contact), address & phone info, copyright line. Large footer background image (seoptic-footer-lg.webp).

### PAGES

1. **HOME** (`index.html`) — 13 sections:
   - HERO: Bold headline "The intelligent engine for organic traffic growth", subtext, 2 CTAs (Get Started, Contact Sales), hero dashboard screenshot (Dashboard.webp), animated blobs (hbs animation), star ratings badge
   - BRANDS: Infinite-scroll marquee of 6 brand SVG logos (obsidian.svg + brands/1-6.svg)
   - FEATURES OVERVIEW: "AI-Driven Features" heading, 4 feature cards with icons and hover animations (feature_1-4.webp), gradient border animation
   - SOLUTIONS: "Solutions Tailored for Your Needs" — 3 tabbed cards (Small Business / Enterprise / Agency) with solution images
   - HOW IT WORKS: "How SEO Vision Works" — 3 steps with icons and connecting visuals
   - USER TYPES: "Built for Every SEO Need" — 3 column cards (For Businesses / Agencies / SEO Professionals)
   - TESTIMONIALS: 4 testimonial cards with avatars (avatar-1-4.webp), names, ratings
   - PRICING PREVIEW: "Simple, Flexible Pricing" — 3 tiers (Starter / Professional / Enterprise) with monthly/annual toggle
   - INTEGRATIONS: "Connect your workflow" — grid of 9 integration app icons with animated logos
   - FAQ: "Frequently Asked Questions" — accordion-style Q&A
   - CTA SECTION: "Ready to See Your SEO Clearly?" with Start Free Trial button
   - VIDEO SECTION: Dashboard overview with video thumbnail (video_thumbnail.webp) and play button

2. **PRICING** (`pricing.html`) — sections:
   - HERO: Pricing page header
   - PRICING CARDS: Monthly/Annual toggle, 3 tiers with feature lists
   - FAQ: Frequently asked questions accordion
   - CTA: Bottom call to action

3. **FEATURES** (`features.html`) — sections:
   - HERO: Features page header
   - FEATURE GRID: Detailed feature cards with images
   - CTA: Bottom section

4. **INTEGRATIONS** (`integrations.html`) — sections:
   - HERO: Integrations header
   - INTEGRATION GRID: 9 app icons (app_1-9.svg) with animated logos
   - CTA: Bottom section

5. **ABOUT** (`about.html`) — sections:
   - HERO: About us header
   - MISSION: Company mission statement
   - STATS: Key metrics
   - TESTIMONIALS: Team/customer testimonials
   - CTA: Join the team

6. **OUR TEAM** (`our-team.html`) — sections:
   - HERO: Team header
   - TEAM GRID: 8 team member cards (profile-1-8.webp), names, roles, social links

7. **BLOG** (`blog.html`) — sections:
   - HERO: Blog header with search
   - BLOG GRID: 7 blog post cards (blog_poster_1-7.webp), category tags, dates, titles

8. **CAREERS** (`careers.html`) — sections:
   - HERO: Careers header
   - BENEFITS: 6 benefit cards (calender-icon, case-icon, gift-icon, heart-icon, lunch-icon, salary-icon SVGs)
   - JOB LISTINGS: Open positions list

9. **CHANGELOGS** (`changelogs.html`) — sections:
   - HERO: Changelogs header
   - TIMELINE: Version history entries with dates, tags, descriptions

10. **FAQ** (`faq.html`) — sections:
    - HERO: FAQ header
    - FAQ ACCORDION: Categorized questions
    - CTA: Support section

11. **CONTACT** (`contact.html`) — sections:
    - HERO: Contact header
    - CONTACT FORM: Name, Email, Message fields + submit
    - ADDRESS: Location, phone, email

12. **AUTHORS** (`authors.html`) — sections:
    - HERO: Authors header
    - AUTHOR CARDS: Author profiles with avatars

13. **ELEMENTS** (`elements.html`) — sections:
    - UI COMPONENTS: Buttons, form elements, typography, cards showcase

14. **PRIVACY POLICY** (`privacy-policy.html`) — legal content page

15. **TERMS OF SERVICE** (`terms-of-service.html`) — legal content page

16. **404** (`404.html`) — 404 error page with CTA to go home
