> SELF-CONTAINED, PIXEL-FAITHFUL REPRODUCTION OF THE "ATEMP" NEXT.JS TEMPLATE BY THEMEFISHER, REBUILT AS PLAIN HTML/CSS/VANILLA JS (NO BUILD STEP), INCLUDING EVERY DISCOVERED PAGE, HOVER STATES, AND SCROLL/ENTRANCE ANIMATIONS.

REFERENCE: `https://themefisher.com/demo?theme=atemp-nextjs`

> NOTE: THE LIVE PREVIEW HOST WRAPS THE TEMPLATE IN ITS OWN CHROME (VIEWPORT TOGGLES, "GET THIS TEMPLATE" BUTTON, ETC). THE ACTUAL TEMPLATE IS SERVED FROM `https://atemp-nextjs.vercel.app/`, WHICH IS THE GROUND TRUTH USED FOR ALL RECON AND BUILDING. THE PREVIEW HOST'S OWN CHROME WAS IGNORED.

## SUMMARY

ATEMP IS A LIGHT, CLEAN SAAS/MULTIPURPOSE MARKETING TEMPLATE FOR A SOCIAL-MEDIA-ANALYTICS PRODUCT. IT USES A WHITE/OFF-WHITE BASE PALETTE WITH A BRIGHT LIME-GREEN ACCENT AND A DEEP NAVY FOOTER/CTA BAND. TYPOGRAPHY IS SET IN "MONTSERRAT" THROUGHOUT. THE SITE IS BUILT WITH TAILWIND UTILITY CLASSES LAYERED OVER A BOOTSTRAP-STYLE GRID, WITH ROUNDED CARD PANELS, SOFT DROP SHADOWS, DASHBOARD-MOCKUP ILLUSTRATIONS, AND DECORATIVE CIRCULAR/TRIANGLE SVG SHAPES SCATTERED IN SECTION CORNERS. SECTIONS REVEAL ON SCROLL, NAV/DROPDOWN MENUS OPEN ON HOVER/CLICK, AND CARDS/BUTTONS HAVE SUBTLE HOVER LIFT + COLOR-SHIFT TRANSITIONS.

## STYLE

**PALETTE (LIGHT — DEFAULT / SOURCE THEME):**
- `--color-body: #ffffff` (page background)
- `--color-surface: #f7f7f7` / `#f4f4f4` (alternating section backgrounds)
- `--color-card: #ffffff` (card surface, subtle shadow)
- `--color-border: #e5e7eb` / `#dadada`
- `--color-accent: #6ee272` (lime-green accent — CTAs, icons, highlights)
- `--color-dark: #061237` (navy — footer background, CTA band background, dark headings)
- `--color-heading: #111827`
- `--color-text: #374151`
- `--color-muted: #6b7280` / `#9ca3af`
- `--color-link: #2563eb` (occasional blue link/ring accent)
- White text on navy sections.

**PALETTE (DARK — ADDED FOR THIS CLONE, SOURCE HAS NO TOGGLE):**
- Background `#0b0f14`, surface `#12161c`, card `#171c23`, border `#262c35`, heading `#f5f6f7`, text `#c7ccd3`, muted `#8b93a1`. Accent stays `#6ee272`, navy band becomes `#050912`. All colors are driven through CSS custom properties (`:root` = light source palette; `[data-theme="dark"]` override) honoring `prefers-color-scheme` on first load and persisted via `localStorage`, with a toggle added to the header.

**TYPE:**
- Font family: `Montserrat, sans-serif` (Google Fonts, vendored locally as woff2), weights 300/400/500/600/700.
- Base body ~16px/400 line-height 1.6. Headline scale: nav/eyebrow ~14px, H3 card titles ~20-22px, H2 section titles ~34-40px, H1 hero ~48-56px (clamps down responsively). Eyebrow labels use uppercase, letter-spacing, small green dot/icon prefix.

**RADII / BORDERS / SHAPE:**
- Buttons: pill-shaped (`border-radius: 9999px`), green fill with dark text, or dark-navy fill with white text; outline/ghost variant with border.
- Cards/panels: `rounded-2xl` (16-20px), soft `box-shadow: 0 1px 3px rgba(0,0,0,.1), 0 1px 2px rgba(0,0,0,.1)`, white/near-white fill.
- Decorative circular badge icons (green ring) sit above card headings; dashboard mockup illustrations use rounded-xl white panels with tiny colored data-viz elements (bars, dots, sparkline).

**MOTION:**
- Scroll-entrance reveal on section headings/cards (opacity/translateY fade-in via IntersectionObserver-driven classes).
- Header dropdown ("Pages ▾") opens on hover/click revealing a panel of links (About, Elements, Career, Pricing, Terms, Integration index) with fade/slide transition.
- Mobile hamburger menu slides in an off-canvas panel.
- Buttons/cards use standard Tailwind transition (`.15s cubic-bezier(.4,0,.2,1)`) for hover background/shadow/transform (slight lift `translateY(-2px)`) changes.
- Pricing tab toggle (Monthly/Yearly) switches displayed price with a fade.
- Testimonial section has a play-button hover state on avatar video thumbnails.

## LAYOUT & STRUCTURE

Shared chrome on every page: sticky header (logo, nav: Home / About Us / Pricing / Pages ▾ dropdown, language switcher, "Contact Sales" ghost button, "Get Started" green pill button, mobile hamburger) and a dark-navy footer (brand blurb + social icons, Sydney/France office addresses, newsletter signup form, 4 link columns: Company / Integration / Pages / Support, bottom bar with copyright + legal links).

**Home (`/`)**
- Hero: eyebrow badge, H1 "Bring Your Ideas To Life With Atemp — SaaS Multipurpose Template", subcopy, Get Started + Contact Sales buttons, dashboard-mockup illustration with floating stat cards (revenue, growth chart), decorative circular shapes.
- Client logo strip ("See Our Client's") — 4-5 grayscale/brand logos.
- "Main Features Of Atemp" — 3-card feature grid (Manage Your Social Media, Improve Your Workflow, Understand Audience) each with icon badge, heading, copy, and a small illustrative panel (chart/graph mockup).
- About/stat band — eyebrow, H2 "Build & Launch Without Problems", 3 stat cards (3,524 / 1.24% / 652) with icon, bullet list of value props, avatar/testimonial mini card at right with play button.
- "Don't Let Your Media Be Just Hunches And Guess" — 3 pill feature tags + illustrated stat card ("Customer Andrew Achieved 12s ROI In The First Month!") with supporting paragraph.
- "Seamless Integration With All Your Favorite Tools" — logo grid of integrations (Shopify, Dribbble, Twitter, Component, Amazon, Skype, etc.) + "All Integrated Software" button.
- Pricing teaser — Monthly/Yearly tab toggle, 3 plan cards (Standard $50, Business $64, Enterprise $79) each with plan blurb, price, feature bullet list, Get Started button.
- CTA band (dark navy) — "Build & Launch Without Problems" heading, Get Started + Contact Sales buttons, floating dashboard illustration cards.
- Footer as above.

**About (`/about/`)** — page header banner, company story/mission copy, team/stat sections, values grid, CTA band, footer.

**Pricing (`/pricing/`)** — page header, Monthly/Yearly toggle, 3 plan cards (same as home teaser but full page context), FAQ accordion, CTA band, footer.

**Features (`/features/`)** — page header, extended feature grid (icon + heading + copy cards), supporting illustration sections, CTA band, footer.

**Elements (`/elements/`)** — UI kit / style-guide showcase page: typography samples, button variants, color swatches, form elements, card variants, alert/badge components — used as the template's component reference page.

**Career (`/career/`)** — page header, open-positions list/cards (role, department, location, apply link), culture/values copy, CTA band, footer.

**Contact (`/contact/`)** — page header, contact form (name/email/subject/message, submit button) + office info cards (Sydney, France) with map/illustration, footer.

**Terms & Conditions (`/terms-conditions/`)** — page header, long-form legal copy in prose sections, footer.

**Blog index (`/blog/`, `/blog/page/2/`, `/blog/page/3/`)** — page header, grid of blog post cards (cover image, category tag, title, excerpt, author/date), pagination control at bottom.

**Blog posts (`/blog/post-1/` … `/blog/post-5/`)** — post header (title, author, date, cover image), prose article body, tags, author bio card, related-posts grid, comment/share affordances.

**Integration index (`/integration/`)** — page header, grid of integration cards (icon, name, short blurb, "Learn more" link) linking to each integration detail page.

**Integration detail pages (`/integration/mailchimp/`, `/airtable/`, `/discord/`, `/gmail/`, `/google-meet/`, `/slack/`, `/stripe/`, `/zoom/`)** — shared template: hero with integration logo + name + "Connect"/CTA button, feature/benefit list, screenshot mockup, related-integrations grid, CTA band, footer.
