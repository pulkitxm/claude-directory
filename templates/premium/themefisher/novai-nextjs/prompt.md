> SELF-CONTAINED, PIXEL-FAITHFUL REPRODUCTION OF THE "NOVAI" NEXT.JS TEMPLATE BY THEMEFISHER, REBUILT AS PLAIN HTML/CSS/VANILLA JS (NO BUILD STEP), INCLUDING EVERY DISCOVERED PAGE, HOVER STATES, AND SCROLL/ENTRANCE ANIMATIONS.

REFERENCE: `https://themefisher.com/demo?theme=novai-nextjs`

> NOTE: THE LIVE PREVIEW HOST WRAPS THE TEMPLATE IN ITS OWN CHROME (VIEWPORT TOGGLES, "GET THIS TEMPLATE" BUTTON, ETC). THE ACTUAL TEMPLATE IS SERVED FROM THE EMBEDDED PAGE AT `https://novai-nextjs.vercel.app/`, WHICH IS THE GROUND TRUTH USED FOR ALL RECON AND BUILDING. THE PREVIEW HOST'S OWN CHROME WAS IGNORED.

## SUMMARY

NOVAI IS A LIGHT-THEME AI-AGENT / SAAS MARKETING TEMPLATE FOR AN "AI AGENT CREATION" PRODUCT. IT USES A WARM OFF-WHITE BASE PALETTE WITH A BOLD ORANGE ACCENT AND NEAR-BLACK CONTRAST SECTIONS (HERO STATS BAR, TESTIMONIALS). TYPOGRAPHY PAIRS "OPEN SANS" FOR BODY COPY WITH "KANIT" FOR DISPLAY/HEADING ACCENTS. SECTIONS REVEAL ON SCROLL VIA AOS (ANIMATE-ON-SCROLL) FADE/SLIDE TRANSITIONS, THE HEADER BECOMES A FLOATING "STICKY" PILL ON SCROLL, FAQ ITEMS EXPAND/COLLAPSE VIA A MAX-HEIGHT/OPACITY ACCORDION, AND CARDS/BUTTONS/NAV LINKS HAVE HOVER STATE TRANSITIONS (BORDER, BACKGROUND, ARROW TRANSLATE).

## STYLE

**PALETTE (LIGHT — SOURCE'S ONLY THEME; THE SOURCE MARKUP CARRIES A `next-themes` BOOT SCRIPT BUT SHIPS NO DARK STYLES, NO VISIBLE TOGGLE, AND NO `.dark` RULES IN ITS COMPILED CSS — IT IS LIGHT-ONLY BY DESIGN, SO THE CLONE FAITHFULLY REPRODUCES LIGHT-ONLY):**
- `--color-body` / background: `#faf7f2` (warm off-white)
- `--color-light` surface: `#ffffff`
- `--color-dark` contrast sections: near-black `#0a0a0a` / `#111111` (hero stats bar, testimonials band)
- `--color-primary` accent: orange `#f4632a`-ish (buttons, badges, active states)
- Text: near-black headings `#111114`, muted body/secondary text mid-gray `#5b5b66`
- Borders: soft warm gray `#e7e2da`

**TYPE:**
- Body font: `"Open Sans", sans-serif` (Google Fonts, vendored locally as woff2, weights 400/600)
- Display/heading accent font: `Kanit, sans-serif` (Google Fonts, vendored locally as woff2, weights 500/600) — used for italic/emphasis words inside headings
- Base font size 18px (`--text-base: 18px`), fluid type scale from Tailwind v4 utility classes (`text-xl` … `text-7xl`)

**RADII / SHADOWS / MOTION:**
- Rounded-2xl (`1rem`) cards, pill-shaped (`rounded-full`) buttons and the sticky header pill
- Soft, large-blur box-shadows on the sticky header and cards
- AOS-driven scroll reveals: `fade-up`, `fade-right`, `fade-left` variants with staggered `data-aos-delay` (100ms increments), ease timing function
- FAQ accordion: `transition-[max-height,opacity] duration-[600ms,400ms] ease-in-out`
- Header: `.non_sticky` → `.sticky_top` class swap on scroll, animating into a floating rounded pill with border + shadow

## LAYOUT & STRUCTURE

The template is a Next.js site; ground truth is `https://novai-nextjs.vercel.app/`. All pages share a persistent header (logo, About/Features/Pricing/Contact links, a "Pages" dropdown for Blog/Case Studies/Careers/Elements/404, and a "Get Started" CTA button) and a persistent footer (logo + blurb, Quick Links, Support links, Newsletter signup form, social icons, copyright). Every discovered route was reconnoitered and cloned:

- **`index.html` (`/`)** — Hero ("AI Agents Creation With In Seconds", agent-builder chat mockup art with floating badges), "Which AI Agent is right for you?" 4-card feature grid with carousel dots, 4-step "Define / Customize / Deploy / Optimize" process strip, "Key features to automate & scale your business" 3-card carousel, pricing teaser ("Choose a plan") with monthly/yearly toggle and 4 tiers (Starter/Growth/Pro-highlighted/Enterprise), "Powerful Use Cases for Every Industry" split layout with a support-chart illustration, dark testimonials band with carousel dots, "Integration with your favorite tools" CTA with floating integration icons, footer.
- **`about.html` (`/about`)** — About banner/hero, company story, team/value content, stats, CTA sections, footer.
- **`features.html` (`/features`)** — Features overview grid linking to the 6 individual feature detail pages.
- **`feature.html` (`/features/feature-1` … `feature-6`, one shared template)** — Single feature detail hero + supporting content + CTA.
- **`pricing.html` (`/pricing`)** — Full pricing table (Starter/Growth/Pro/Enterprise) with monthly/yearly toggle, feature comparison, FAQ teaser, CTA.
- **`integrations.html` (`/integrations`)** — Integration logos grid (Slack, Figma, GitHub, Notion, Webflow, etc.), category filters, CTA.
- **`case-studies.html` (`/case-studies`)** — Case study listing/grid.
- **`case-study.html` (`/case-studies/post-1` … `post-9`, one shared template)** — Single case-study article layout (banner, stats, body copy, results).
- **`blog.html` (`/blog`)** — Blog listing/grid with card thumbnails, category tags, pagination.
- **`blog-post.html` (`/blog/post-1` … `post-16`, one shared template)** — Single article layout (banner, author meta, prose body, share/social row).
- **`careers.html` (`/careers`)** — Careers banner, open roles, culture/benefits sections, CTA.
- **`contact.html` (`/contact`)** — Contact banner, contact form, contact details/map-style info blocks.
- **`faqs.html` (`/faqs`)** — "Let's answer your common questions" accordion FAQ list with a "Can't Find Answer? Contact Support" side card, testimonials band, integration CTA, footer.
- **`elements.html` (`/elements`)** — UI element/component showcase page (buttons, badges, typography, etc.).
- **`privacy-policy.html` (`/privacy-policy`)** — Legal prose page.
- **`terms-conditions.html` (`/terms-conditions`)** — Legal prose page.
- **`404.html` (`/404`)** — Not-found error page.

Blog posts, case studies, and individual feature pages repeat the same layout with different copy/images in the live template, so — matching the established pattern used by sibling `templates/premium/themefisher/*` clones (e.g. `fortify-nextjs`'s single `blog-post.html`) — each repeating content type is built once as a shared, faithful template page rather than duplicated per slug.
