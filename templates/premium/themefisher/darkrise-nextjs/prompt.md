> SELF-CONTAINED, PIXEL-FAITHFUL REPRODUCTION OF THE "DARKRISE" NEXT.JS TEMPLATE BY THEMEFISHER, REBUILT AS PLAIN HTML/CSS/VANILLA JS (NO BUILD STEP), INCLUDING EVERY DISCOVERED PAGE, HOVER STATES, AND SCROLL/ENTRANCE ANIMATIONS.

REFERENCE: `https://themefisher.com/demo?theme=darkrise-nextjs`

> NOTE: THE LIVE PREVIEW HOST WRAPS THE TEMPLATE IN ITS OWN CHROME (VIEWPORT TOGGLES, "GET THIS TEMPLATE" BUTTON, ETC). THE ACTUAL TEMPLATE IS SERVED FROM THE EMBEDDED IFRAME AT `https://darkrise-nextjs.vercel.app/`, WHICH IS THE GROUND TRUTH USED FOR ALL RECON AND BUILDING. THE PREVIEW HOST'S OWN CHROME WAS IGNORED.

## SUMMARY

DARKRISE IS A DARK-THEME SAAS/STARTUP MARKETING TEMPLATE FOR AN ANALYTICS/DASHBOARD PRODUCT. IT USES A NEAR-BLACK BASE PALETTE WITH A COBALT-BLUE ACCENT AND SOFT MULTICOLOR (BLUE-TO-PINK) GLOW/GRADIENT BACKGROUNDS BEHIND HERO AND CTA SECTIONS. TYPOGRAPHY IS SET IN "FIGTREE" THROUGHOUT. SECTIONS REVEAL ON SCROLL VIA AOS-STYLE (ANIMATE-ON-SCROLL) OPACITY/TRANSLATE TRANSITIONS, CARDS HAVE MARQUEE/ROTATE DECORATIVE KEYFRAMES, AND BUTTONS/CARDS HAVE SUBTLE HOVER STATE-CHANGES (BORDER/BACKGROUND-GRADIENT SHIFTS).

## STYLE

**PALETTE (DARK — DEFAULT / SOURCE THEME):**
- `--color-black: #000000`
- `--color-body: #000000` (page background)
- `--color-primary: #070707` (card/panel surface)
- `--color-dark: #0b0b0c` (secondary surface)
- `--color-border: #2c2c2c`
- `--color-secondary: #2d57ee` (accent blue — links, toggle, focus, gradient accents)
- `--color-text: #e9e9e9` (body text)
- `--color-text-light: #cdcdcd`
- `--color-text-dark: #4e4e59` (muted/secondary text)
- `--color-white: #ffffff`
- Decorative hero/CTA glow: radial/linear gradient blending blue (`#2d57ee`-ish) into magenta/pink into black, used as large blurred background art behind hero and CTA banner sections.

**PALETTE (LIGHT — ADDED FOR THIS CLONE, SOURCE HAS NO TOGGLE):**
- Background `#ffffff`, surface `#f5f5f7`, border `#e2e2e6`, text `#111114`, muted text `#5b5b66`, accent stays `#2d57ee`. All colors are driven through CSS custom properties (`:root` = light overrides mapped from source dark palette is inverted; `[data-theme="dark"]` = the source's native dark palette as documented above) so the whole clone reflows correctly in both modes, honoring `prefers-color-scheme` on first load and persisting the user choice to `localStorage`.

**TYPE:**
- Font family: `Figtree, sans-serif` (Google Fonts, vendored locally as woff2), fallback `ui-sans-serif, system-ui, sans-serif`.
- Base body: 16px/400. Headline scale runs roughly 20px (nav brand) → 36px (H2 section titles) → 56px+ (hero H1, clamps down responsively). Weights used: 400 normal, 500 medium, 600 semibold, 700 bold. Letter-spacing utilities: `tracking-wide` (.025em), `tracking-wider` (.05em) on eyebrows/labels.

**RADII / BORDERS / SHAPE:**
- Buttons and nav pill: fully rounded (`border-radius: 3.35544e7px` i.e. `9999px` pill).
- Cards/panels: `rounded-2xl`/`rounded-3xl` (16px–24px), 1px `--color-border` borders, `--color-primary`/`--color-dark` fills.

**MOTION:**
- Scroll-entrance reveal: AOS-style `[data-aos]` elements start `opacity:0` with a translate offset and animate to `opacity:1`/`translate:0` on intersection, `transition-timing-function: cubic-bezier(.4,0,.2,1)`, durations/delays driven by `data-aos-duration`/`data-aos-delay` attributes (50ms–100ms+ steps observed in source CSS).
- Decorative keyframes present in source: `@keyframes border-animation`, `@keyframes marquee`, `@keyframes marquee-reverse`, `@keyframes marquee-vertical`, `@keyframes rotate` (used for animated gradient borders, logo/testimonial marquees, and rotating decorative glows).
- Buttons/cards use Tailwind's default transition (`color, background-color, border-color, box-shadow, transform …` at `.15s` `cubic-bezier(.4,0,.2,1)`) for hover state changes.
- Pricing toggle (Monthly/Yearly) is an animated pill switch bound to `--color-secondary`.

## LAYOUT & STRUCTURE

Site is a Next.js marketing template. Header (logo + "All Pages" dropdown nav + Integrations/Pricing/Contact links + "Get This Template" pill CTA + mobile hamburger) and footer (columns of links, socials, legal links) are shared chrome across every page. All pages discovered and cloned:

1. **Home** (`/`) — Hero (eyebrow badge, H1, subhead, dual CTA buttons, trust row) with animated gradient glow art and a floating "browser window" dashboard mockup graphic (stat cards: Monthly Sales, Revenue Summary, Real-time). Logo/marquee strip. Feature cards row (3 rounded panels). Secondary feature band. Testimonials grid (3 columns, avatar + quote cards) with "Read All 5,700+ Reviews" CTA. Final CTA/newsletter band. Footer.
2. **Elements** (`/elements/`) — UI-kit / component showcase page listing template building blocks (buttons, badges, cards, etc.).
3. **About** (`/about/`) — Company story, team, mission sections.
4. **Pricing** (`/pricing/`) — Monthly/Yearly toggle, 3-tier pricing cards (Basic/Standard/Pro), detailed feature-comparison table (Basic/Standard/Premium columns, grouped rows under "Creation"/"Collaboration" headers), testimonials grid, FAQ accordion, final CTA, footer.
5. **Integrations index** (`/integration/`) — Grid of integration cards (Intercom, Hubspot ×2, Kickstarter, Mailchimp, Shopify ×2, Slack, Zapier), each "View Integration →".
6. **Integration detail** (shared template, 9 data variants): `/integration/Intercom/`, `/integration/hubspot/`, `/integration/hubspot-2/`, `/integration/kickstarter/`, `/integration/mailchimp/`, `/integration/shopify/`, `/integration/shopify-2/`, `/integration/slack/`, `/integration/zapier/` — left column: "How to integrate Darkrise with X?" copy + numbered steps + "Features available" copy + CTA button; right sidebar: integration logo/name/category card + description + "View Integration" link; below: decorative avatar/icon collage art panel.
7. **Feature** (`/feature/`) — Product feature deep-dive sections.
8. **Blog index** (`/blog/`, paginated `/blog/page/2/`) — Grid of 8 post cards (title, excerpt, date/author meta, thumbnail).
9. **Blog post** (shared template, 8 data variants): `/blog/post-1/` … `/blog/post-8/` — hero title/meta, cover image, long-form article body, author bio, related/share.
10. **Changelog** (`/changelog/`) — Version-by-version release log.
11. **Contact** (`/contact/`) — Contact form (name/email/message), contact info panel, map/CTA.
12. **Terms & Conditions** (`/terms-conditions/`) — Legal copy page.
13. **Privacy Policy** (`/privacy-policy/`) — Legal copy page.
14. **404** (`/404/`) — Large "404" gradient numerals, "Oops! page not found" copy, "Go Back To Home" CTA, decorative art panel.

Every page shares the same header/footer chrome and dark theme design tokens above; each builds on the same card/button/section primitives observed in `source.css` (Tailwind utility classes: `.btn`, `.btn-primary`, `.section`, `.container`, `.row`, `border-border`, `bg-primary`, `bg-dark`, `rounded-2xl/3xl`).
