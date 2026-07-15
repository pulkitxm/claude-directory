> SELF-CONTAINED, PIXEL-FAITHFUL REPRODUCTION OF THE "BIGSPRING" NEXT.JS TEMPLATE BY THEMEFISHER, REBUILT AS PLAIN HTML/CSS/VANILLA JS (NO BUILD STEP), INCLUDING EVERY DISCOVERED PAGE, HOVER STATES, AND SCROLL/ENTRANCE ANIMATIONS.

REFERENCE: `https://themefisher.com/demo?theme=bigspring-nextjs`

> NOTE: THE LIVE PREVIEW HOST WRAPS THE TEMPLATE IN ITS OWN CHROME (VIEWPORT TOGGLES, "GET THIS TEMPLATE" BUTTON, ETC). THE ACTUAL TEMPLATE IS SERVED FROM THE EMBEDDED IFRAME AT `https://bigspring-nextjs.vercel.app/`, WHICH IS THE GROUND TRUTH USED FOR ALL RECON AND BUILDING. THE PREVIEW HOST'S OWN CHROME WAS IGNORED.

## SUMMARY

BIGSPRING IS A LIGHT, FRIENDLY SAAS/STARTUP MARKETING TEMPLATE (CRM/PRODUCTIVITY-TOOL POSITIONING) WITH A WHITE BASE, MINT/PALE-TEAL SECTION BANDS, A SOLID TEAL ACCENT, AND HAND-DRAWN "UNDRAW"-STYLE ILLUSTRATION ART IN HEROES AND CTA BLOCKS. HEADINGS ARE SET IN "URBANIST" (BOLD), BODY COPY IN "POPPINS". THE TEMPLATE SHIPS WITH A REAL LIGHT/DARK TOGGLE (NEXT-THEMES STYLE `.dark` CLASS ON `<html>`, ANIMATED SUN/MOON SVG BUTTON, BOOT SCRIPT THAT HONORS `prefers-color-scheme` AND PERSISTS TO `localStorage`). INTERACTIVE WIDGETS INCLUDE A MEGA-MENU DROPDOWN NAV, A SWIPER TESTIMONIAL/LOGO CAROUSEL, AN FAQ ACCORDION, A STICKY HEADER, AND HOVER STATE-CHANGES ON BUTTONS/CARDS/LINKS.

## STYLE

**PALETTE (LIGHT — DEFAULT / SOURCE THEME):**
- `--color-body: #ffffff` (page background)
- `--color-dark: #222222` (heading/ink text)
- `--color-text: #777777` (body/paragraph text)
- `--color-border: #eaeaea`
- `--color-light: #edf6f5` (mint/pale-teal section band + accordion fill)
- `--color-primary: #0aa8a7` (solid teal accent — buttons, links, active nav, icons)
- `--color-white: #ffffff`

**PALETTE (DARK — SOURCE HAS A NATIVE TOGGLE, TAILWIND `.dark` CLASS):**
- Body background `#1e262c`, body text `#cbcbcb`, headings turn `#ffffff`, surfaces/cards darken accordingly, accent stays `#0aa8a7`. Theme resolution: stored `localStorage.theme` -> `prefers-color-scheme` -> light default, matching the source's inline boot script (adds/removes `light`/`dark` class on `<html>` pre-paint to avoid flash).

**TYPE:**
- Headings (`h1`–`h6`): `Urbanist, sans-serif`, weight 700, line-height 1.25. Vendored locally as `.ttf` (weights 500/600/700).
- Body/UI text: `Poppins, sans-serif`, weight 400 (body copy) / 500 (buttons, nav links, labels). Vendored locally as `.ttf` (weights 400/500).
- Base body 16px/1.625. `h1` ≈ 2.44rem desktop (clamps down on mobile), `h2`/section titles smaller step down, `h5`/`h6` used for eyebrow/sub-headings.

**RADII / BORDERS / SHAPE:**
- Buttons: fully rounded pill (`border-radius: 9999px` primary / `50px` outline).
- Cards/accordion panels: `border-radius: 5px`–`13px`. 1px `--color-border` borders on outlined cards/accordion headers.
- Avatars/icon chips: circular.

**MOTION:**
- Buttons: `.btn-primary` hover fades to `rgba(10,168,167,.8)`; `.btn-outline-primary` hover fills solid teal with white text. Both use Tailwind's default easing `cubic-bezier(.4,0,.2,1)`, durations `.15s`–`.3s`.
- Nav links/dropdown items: color transition `.15s`, dropdown chevron rotates on hover/open via `transition-transform`.
- FAQ accordion: header `background/color` transition `.3s`; content panel animates `max-height: 0 -> 50vh` with `transition: all .6s cubic-bezier(.4,0,.2,1)`; chevron icon rotates 180deg (`transition-transform .2s`).
- Theme toggle: animated sun/moon SVG icon (masked paths cross-fade/rotate) on click, matching `next-themes`-style toggle.
- Testimonial/logo strips use a Swiper carousel (`.swiper-pagination-bullet` / `-active` dot states); autoplay + pagination dots.
- Sticky header (`position: sticky; top: 0`) persists across scroll.

## LAYOUT & STRUCTURE

Site is a Next.js marketing template. Header (logo + mega-menu nav: Home / Company dropdown (About, Team, How It Works, Careers) / Products dropdown (4 products) / Blog dropdown / Pages dropdown (Pricing, FAQ, Case Studies, Terms, Privacy, 404) / Contact + "Get Demo" pill CTA + sun/moon theme toggle + mobile hamburger) and footer (Company/Product/Support link columns + Bigspring logo/blurb + social icon row + copyright bar) are shared chrome across every page. All pages discovered and cloned:

1. **Home** (`/`) — Hero (H1, subhead, banner illustration). Client-logo trust strip (Toshiba, Airbnb, Facebook, Tinder, Microsoft, HubSpot). "The ultimate platform" feature intro + 4 icon-feature cards (Cloud Support, Object Oriented, 24h Service, Faster Response) on a mint band. "Built exclusively for you" video/image block. Alternating text+illustration feature rows (4 sections) on alternating white/mint bands. Testimonials (2-up quote cards) on mint band with carousel dots. "Integrate with all the tools" logo grid. Final "Ready to get started?" CTA band. Footer.
2. **About** (`/about`) — Hero (H1 + photo). Founder quote/mission band (avatar, name, title) on mint, with "Who we are?" / "Our mission" 2-up cards. 4-stat icon row. 3 icon-feature cards on mint band. "Our Office Culture" gallery section. "Want to Join our Team?" CTA. Footer.
3. **Team** (`/team`) — Hero + team-member grid (photo, name, role, socials).
4. **How It Works** (`/how-it-works`) — Step-by-step process sections with illustrations.
5. **Careers** (`/careers`) — Hero + open-positions listing / culture content.
6. **Products index** (`/products`) — Grid of product cards, each linking to a detail page.
7. **Product detail** (shared template, 4 data variants): `/products/product-1` … `/products/product-4` — hero, feature breakdown, CTA.
8. **Blog index** (`/blog`, paginated `/blog/page/2`) — Grid of post cards (thumbnail, title, excerpt, author/date meta).
9. **Blog post** (shared template, 8 data variants): `/blog/post-1` … `/blog/post-8` — cover image, title, meta, long-form article body, author bio/share.
10. **Authors index** (`/authors`) — Grid of author cards (avatar, name, role, bio excerpt).
11. **Author detail** (shared template, 2 data variants): `/authors/awab-husameldin`, `/authors/joseph-gonzalez` — author bio + list of their posts.
12. **Case studies index** (`/case-study`) — Grid of case-study cards (client logo, title, excerpt).
13. **Case study detail** (shared template, 6 data variants): `/case-study/google`, `/iconsquare`, `/jira`, `/slack`, `/spotify`, `/trello` — client hero, challenge/solution/result copy, stats.
14. **Pricing** (`/pricing`) — 3-tier pricing cards (Basic $0 / Professional $49 "most popular" raised card / Business $199), FAQ accordion (4 Q&A), "Let's work together" CTA with illustration. Footer.
15. **FAQ** (`/faq`) — Standalone FAQ accordion page.
16. **Contact** (`/contact`) — Contact form (name/email/message) + contact info panel/illustration.
17. **Terms & Conditions** (`/terms-condition`) — Legal copy page.
18. **Privacy Policy** (`/privacy-policy`) — Legal copy page.
19. **404** (`/404`) — "Page not found" illustration + "Go Back To Home" CTA.
