# NODUS AGENT TEMPLATE

> A SELF-CONTAINED, PIXEL-FAITHFUL REPRODUCTION OF THE ACETERNITY NODUS AGENT TEMPLATE. REFERENCE: `https://ui.aceternity.com/template-preview/nodus-agent-template`

## SUMMARY

- NODUS (BRANDED "NOTUS" IN THE LIVE BUILD) IS A MARKETING / LANDING-PAGE TEMPLATE FOR AN AI AGENTIC-WORKFLOW SAAS PRODUCT — A PLATFORM TO "MANAGE AND SIMULATE AGENTIC WORKFLOWS".
- THE UNDERLYING LIVE APP IS A NEXT.JS + TAILWIND V4 SITE SERVED AT `https://notus-agent-marketing-template.vercel.app/`. THIS CLONE IS A STATIC, FRAMEWORK-FREE HTML/CSS/VANILLA-JS REBUILD.
- KEY FEATURES: LIGHT/DARK THEME TOGGLE (CLASS-BASED, LOCALSTORAGE-PERSISTED, NO-FLASH BOOT), STICKY CENTERED NAV, MULTIPLE MARKETING SECTIONS WITH SCROLL-REVEAL ENTRANCES, DOTTED-GRID DECORATIVE PANELS, A MONTHLY/YEARLY PRICING TOGGLE, A PRICING COMPARISON TABLE, AN ACCORDION FAQ, AND A SHARED HEADER/FOOTER ACROSS EVERY PAGE.

## STYLE

- PALETTE:
  - BRAND / ACCENT: `#f17463` (CORAL). USED FOR EYEBROW LABELS, THE HIGHLIGHTED HEADLINE WORD, THE FEATURED PRICING CTA, AND "SAVE 20%" PILL.
  - LIGHT THEME: TEXT/PRIMARY `--color-neutral-900` (oklch 21%), CANVAS LINES `--color-neutral-200`, DOTTED GRID `#eaedf1` (gray-300), CARD FILL `#f9f9f9`/`#f5f5f5`, BORDERS `#eaedf1`, FOOTER LINK `#676767`. PAGE BG `#fff`.
  - DARK THEME (`.dark` ON `<html>`): PRIMARY `--color-neutral-100`, CANVAS LINES neutral-700, DOTTED GRID neutral-800, CARD FILL neutral-800, PAGE BG `#0a0a0a`/black, FOOTER LINK neutral-300.
  - NEUTRAL RAMP: gray-100 `#f9f9f9`, gray-200 `#f5f5f5`, gray-300 `#eaedf1`, gray-400 `#d7d7d7`, gray-600 `#8b8b8b`; charcoal-900 `#202020`, charcoal-700 `#343434`.
- FONTS:
  - PRIMARY: "Inter Display", sans-serif (HEADINGS + BODY) — INTER USED AS THE WEB-SAFE STAND-IN.
  - MONO: "DM Mono", monospace (EYEBROW LABELS LIKE "TRUSTED BY FAST GROWING STARTUPS", CODE, SMALL CAPS LABELS).
  - WEIGHTS: 400 / 500 / 600 / 700.
- TYPE SCALE (Tailwind v4 defaults): xs .75rem, sm .875rem, base 1rem, lg 1.125rem, xl 1.25rem, 2xl 1.5rem, 3xl 1.875rem, 4xl 2.25rem, 6xl 3.75rem, 7xl 4.5rem. HERO HEADLINE ~6xl/7xl, SECTION HEADINGS ~4xl, TRACKING-TIGHT (-.025em) ON HEADINGS.
- RADII: sm .25rem, md .375rem, lg .5rem, xl .75rem, 2xl 1rem, 3xl 1.5rem. BUTTONS/CARDS MOSTLY lg–xl; PILL TOGGLES FULLY ROUNDED.
- ANIMATION EASINGS: ease-out `cubic-bezier(0,0,.2,1)`, default `cubic-bezier(.4,0,.2,1)` @ .15s. SCROLL-REVEAL: FADE + TRANSLATE-Y ON ENTER. DECORATIVE ORBIT ANIMATIONS (24s linear). ACCORDION HEIGHT TRANSITION.

## LAYOUT & STRUCTURE

SHARED: centered sticky header (logo left, nav center: Pricing/About/Careers/Blog, theme toggle + "Start building" right; mobile hamburger). Shared footer (brand + tagline + Start building; Product / Company / Legal link columns; Newsletter signup; copyright + social icons). A reusable "Connect your Current Stack and Start Automating" CTA band precedes the footer on most pages.

PAGES (12 distinct + 7 blog posts):
- `index.html` (HOME): hero (eyebrow, headline w/ coral "workflows", subtext, Start building / View pricing, Gartner rating) -> dashboard product image -> "Trusted by Fast Growing Startups" logo grid (8) -> "Integrates easily" how-it-works (3 steps + connected-tools diagram) -> "Built for Agentic Intelligence" features (LLM model selector + text-to-workflow builder) -> "Native Tools Integration" diagram (+ One Click Auth / Realtime Sync / Custom Connector SDK) -> "Across various Industries" use-case grid (6) -> "Making Engineers 10x faster" benefits grid -> testimonial (James Fincher) + 10x stat + logos -> "Simple and Feasible Pricing" (3 plans, monthly/yearly toggle) -> "Scale securely with confidence" security band (CCPA/GDPR/ISO) -> FAQ accordion -> CTA band -> footer.
- `pricing.html`: hero + monthly/yearly toggle, 3 plan cards, full comparison table, FAQ, CTA, footer.
- `about.html`: hero (text + image), As-featured logos, testimonial, "Helping Engineering Teams Focus" stats + values, "Team of Industry Leaders" (6), "Let's Change How Modern Enterprise Teams Function" + open positions, investors, CTA, footer.
- `careers.html`: hero + View Roles, investors, As-featured, image grid, "Checkout Our Open Roles" categorized list, "Why Work at Nodus?" 6 value cards, CTA, footer.
- `blog.html`: hero "Writing for the World", 3 featured cards, post list with dates, footer.
- 7 blog post pages (`blog-*.html`): cover, title, lead, prose article body, footer.
- `contact.html`: "Contact us" form (Name/Email/Message) + testimonial gradient card, footer.
- `sign-up.html`: "Create an account" form + social auth + testimonial card, footer.
- `sign-in.html`: "Sign in" form + social auth + testimonial card, footer.
- `privacy-policy.html`, `terms-of-service.html`, `cookie-policy.html`: reproduce the original's 404 state (these routes return "404 — This page could not be found." on the live site) with shared header/footer.
