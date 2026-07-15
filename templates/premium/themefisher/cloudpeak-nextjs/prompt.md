> SELF-CONTAINED, PIXEL-FAITHFUL REPRODUCTION OF THE "CLOUDPEAK-NEXTJS" THEMEFISHER TEMPLATE, REBUILT AS PLAIN HTML/CSS/VANILLA-JS (NO BUILD STEP), INCLUDING HOVER STATES, SCROLL/ENTRANCE ANIMATIONS, AND ALL DISCOVERED PAGES.

REFERENCE: `https://themefisher.com/demo?theme=cloudpeak-nextjs`

> NOTE: THE THEMEFISHER DEMO PAGE WRAPS THE ACTUAL TEMPLATE IN AN IFRAME POINTING AT `https://cloudpeak-nextjs.vercel.app` (THE LIVE NEXT.JS DEPLOY OF THE TEMPLATE ITSELF). ALL RECON WAS PERFORMED DIRECTLY AGAINST THAT VERCEL URL SO THAT THE THEMEFISHER PREVIEW CHROME (VIEWPORT TOGGLES, "BACK TO THEME DETAILS", THEME PICKER DROPDOWN) IS EXCLUDED FROM THE CLONE.

## SUMMARY

CLOUDPEAK IS A DARK, SAAS/FINTECH-STYLE MARKETING TEMPLATE FOR A CLOUD FINANCE/BUSINESS PLATFORM PRODUCT. IT USES A DEEP-NAVY BASE PALETTE WITH AN ELECTRIC-BLUE PRIMARY ACCENT AND A GREEN SECONDARY ACCENT, THE "SORA" GOOGLE FONT THROUGHOUT, ROUNDED CARDS/BUTTONS, SOFT GLOW/BLUR BACKGROUND DECORATIONS, AND SCROLL-TRIGGERED FADE/SLIDE-UP ENTRANCE ANIMATIONS (AOS LIBRARY) ON NEARLY EVERY SECTION. IT IS A MULTI-PAGE NEXT.JS SITE WITH A MARKETING HOME PAGE, FEATURE/PRICING/ABOUT/INTEGRATION/CHANGELOG PAGES, A BLOG WITH INDIVIDUAL POST PAGES AND CATEGORY FILTERS, A CASE-STUDY LISTING WITH INDIVIDUAL CASE PAGES, A "BOOK A DEMO" FORM PAGE, A CONTACT PAGE, A UI "ELEMENTS" KITCHEN-SINK PAGE, LEGAL PAGES (PRIVACY POLICY, TERMS & CONDITIONS), AND A 404 PAGE.

## STYLE

**PALETTE (DARK, DEFAULT THEME — SOURCE'S NATIVE THEME):**
- `--color-body` / background: `#05071a` (near-black navy)
- `--color-light` (card/section surface): `#101636`
- `--color-border`: `#1c244c`
- `--color-shadow`: `#1a2248`
- `--color-tertiary`: `#334679`
- `--color-primary` (accent blue, buttons/links/icons): `#376aed`
- `--color-secondary` (accent green, stats/badges): `#47cc88`
- `--color-text` (body copy, muted lavender-gray): `#9ea3bf`
- `--color-white`: `#ffffff`
- `--color-black`: `#000000`

**LIGHT THEME (CLONE ADDITION FOR THEME-TOGGLE SUPPORT — SOURCE IS DARK-ONLY):**
Since the source template ships no light mode, the clone derives an analogous light palette so the UI is genuinely theme-dependent (CSS custom properties, `prefers-color-scheme`-aware, no hardcoded colors in markup):
- background `#f5f7ff`, surface `#ffffff`, border `#e2e6f5`, text `#4b5171`, primary/secondary accents unchanged (`#376aed` / `#47cc88`) for brand consistency.

**TYPOGRAPHY:** Font family `Sora, sans-serif` (Google Fonts) for all text, weights 300/400/500/600/700. Base body `16px` / `28.8px` line-height, muted text color `#9ea3bf`. Headings use large, tight-leading Sora bold/semibold, hero H1 around `4.5rem` desktop with `1.2` line-height.

**RADII:** sm `4px`, default `6px`, lg `12px`, xl `16px`, 2xl `16px`, 3xl `24px`, 4xl `32px`. Buttons and nav pill use `12px`. Cards typically `16px`–`24px`.

**SHADOWS / GLOW:** Soft ambient shadow `0px 4px 40px rgba(0,0,0,0.05)`; large radial blue glow blobs (`filter: blur(...)`, low-opacity blue/primary radial gradients) behind hero and CTA sections.

**EASINGS / TRANSITIONS:** Tailwind defaults — `ease-out: cubic-bezier(0,0,.2,1)`, `ease-in-out: cubic-bezier(.4,0,.2,1)`, default transition duration `150ms`. Scroll-entrance animations are driven by the AOS (Animate On Scroll) library: `data-aos="fade-up-sm"` / `data-aos="fade-in"` with per-element `data-aos-delay` staggering, transition-duration classes like `data-aos-duration="600"` etc. Accordion panels animate `max-height` from `0px` to the content's scrollHeight on toggle. Pricing plan toggle is a CSS-styled checkbox (`peer-checked` translate-x) swapping Monthly/Yearly labels and prices.

**ICONOGRAPHY:** Inline SVG/PNG icon set under `/images/icons/*` (green tick, arrows, social icons), plus a dashboard mock illustration in the hero.

## LAYOUT & STRUCTURE

**SHARED CHROME (every page):**
- **Header/Nav:** Logo "CloudPeak" (icon + wordmark) left; center pill nav with "All Pages" dropdown (Elements, About, Changelog, Integration, Case Studies, Terms & Conditions, Blog, Book a Free Demo, Privacy Policy, 404 Page), "Features", "Pricing", "Contact Us"; right-aligned "Get This Theme" outline button. Hamburger checkbox-driven mobile menu below `lg` breakpoint (slide/reveal nav list).
- **Footer:** Logo + one-line description; link columns (Integration, Pricing, Contact Us / Privacy Policy, Terms & Conditions); social icons (Facebook, Instagram, X, LinkedIn); copyright line "Copyright © 2025 ThemeFisher. All Rights Reserved." Background radial blue glow decoration.

**PAGES DISCOVERED AND CLONED (17 templates covering 32 live routes):**

1. **`/` (home)** — Hero (eyebrow pill "New version available. Download now!", H1 "Elevate Your Business with CloudPeak", subtitle, Get Free/Pro Version CTAs, dashboard mock screenshot with glow); logo/brand strip; feature highlight cards (stat cards: "25% Average revenue growth", "120K Happy customers worldwide", etc.); feature grid with icons; testimonial/quote section; pricing teaser; FAQ accordion ("Common Questions"); final CTA band ("Ready to Transform Your Experience?"); footer.
2. **`/features`** — Feature-detail sections with alternating image/text rows, icon feature grid, CTA band.
3. **`/pricing`** — Plan cards intro + Monthly/Yearly toggle switch, 3-tier pricing table (Basic $19, Premium $49, Enterprise $99 per person/month) with full feature-comparison table below, FAQ, CTA band.
4. **`/about`** — Company story hero, mission/values sections, team member grid (photo, name, role), stats, CTA band.
5. **`/integration`** — Integration hero, logo/partner grid, feature callouts, CTA band.
6. **`/changelog`** — Version history timeline entries (version tag, date, change list).
7. **`/contact`** — Contact form (name/email/subject/message), contact info cards (address/phone/email), map/illustration.
8. **`/book-demo`** — Lead-gen form (name, email, company, message) plus supporting copy/illustration.
9. **`/elements`** — UI kitchen-sink: typography scale, buttons, badges, alerts, form controls, accordion demo, tab demo — showcases every reusable component/style used across the theme.
10. **`/blog`** (listing) — Category filter pills (Business, Company, Guides, Technology), blog post card grid (cover image, category tag, title, excerpt, author/date).
11. **`/blog/post-1` … `/blog/post-8`** (8 instances of one post-detail template) — Post hero title, published/author meta, cover image, rich-text article body, tags, share row.
12. **`/categories/business`, `/company`, `/guides`, `/technology`** (4 instances of the blog-listing template pre-filtered by tag) — Same layout as `/blog` filtered to the category's posts.
13. **`/case`** (listing) — Case-study card grid (cover image, client/industry tag, title, summary).
14. **`/case/case-1` … `/case/case-6`** (6 instances of one case-detail template) — Case hero, client info sidebar (client, industry, duration, result stat), rich-text body, results/stat callouts, related-case CTA.
15. **`/privacy-policy`** — Legal prose page (headings + paragraphs), last-updated note.
16. **`/terms-conditions`** — Legal prose page (headings + paragraphs).
17. **`/404`** — Not-found illustration, heading, "Back to home" CTA.

## INTERACTIONS TO REPRODUCE

- **Nav "All Pages" dropdown** — hover/focus reveals a panel of all secondary page links; closes on mouse-leave.
- **Mobile hamburger menu** — checkbox-driven (`#nav-toggle`) slide-down/overlay nav panel with animated 3-bar-to-X icon.
- **Card / button hover** — CTA buttons lighten/shift background (`btn-primary`/`btn-secondary` hover states), feature/blog/case cards lift with border/shadow change on hover.
- **FAQ accordion (home, pricing)** — click toggles `.accordion-content` `max-height` from `0px` to full height with an eased transition; the `+` icon (two overlaid bars) rotates/fades one bar to form a `−` when open; only one panel or independently toggled panels per section.
- **Pricing Monthly/Yearly switch** — checkbox toggle (`#pricing-switch`) slides a pill knob and swaps the active label color/prices between Monthly and Yearly figures.
- **Scroll entrance animations (every page)** — AOS-driven `data-aos="fade-up-sm"` / `"fade-in"` with staggered `data-aos-delay`, elements start translated/opacity-0 and animate in as they enter the viewport; re-usable IntersectionObserver-driven reveal is ported 1:1 (same easing/durations) rather than guessed.
- **Logo/partner strip** — auto-scrolling marquee (Swiper, linear timing, infinite loop) on the integration/home brand strip.
- **Theme toggle (clone addition)** — since the source has no toggle, the clone adds a light/dark toggle driven by CSS custom properties with `localStorage` persistence and a no-flash boot script, defaulting to the source's dark theme and honoring `prefers-color-scheme` otherwise.
