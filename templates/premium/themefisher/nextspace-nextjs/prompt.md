> SELF-CONTAINED, PIXEL-FAITHFUL REPRODUCTION OF THE "NEXTSPACE" NEXT.JS TEMPLATE BY THEMEFISHER, REBUILT AS PLAIN HTML/CSS/VANILLA JS (NO BUILD STEP), INCLUDING EVERY DISCOVERED PAGE, HOVER STATES, AND SCROLL/ENTRANCE ANIMATIONS.

REFERENCE: `https://themefisher.com/demo?theme=nextspace-nextjs`

> NOTE: THE THEMEFISHER DEMO PAGE REDIRECTS/EMBEDS THE ACTUAL TEMPLATE, WHICH IS SERVED FROM `https://nextspace-nextjs.vercel.app/`, THE GROUND TRUTH USED FOR ALL RECON AND BUILDING. THE PREVIEW HOST'S OWN CHROME ("GET THIS TEMPLATE" BUTTON, ETC) WAS IGNORED.

## SUMMARY

NEXTSPACE IS A LIGHT, EDITORIAL-STYLE MARKETING TEMPLATE FOR AN INTERIOR-DESIGN / ARCHITECTURE STUDIO. IT PAIRS A DEEP TEAL PRIMARY COLOR WITH A CREAM SECONDARY ACCENT ON A WHITE BASE, SET IN "DM SANS" THROUGHOUT. THE HEADER IS A FLOATING PILL-SHAPED NAVBAR (FULLY ROUNDED, TRANSLUCENT WHITE, BLURRED BACKGROUND) FIXED TO THE TOP. SECTIONS REVEAL ON SCROLL WITH OPACITY/TRANSFORM TRANSITIONS, PROJECT AND BLOG CARDS SCALE/LIFT ON HOVER WITH IMAGE ZOOM, AND BUTTONS HAVE FILL/COLOR-SWAP HOVER STATES. THE SITE IS A MULTI-PAGE NEXT.JS BUILD WITH HOME, ABOUT, SERVICES, PROJECTS (LISTING + 7 DETAIL PAGES), BLOG (PAGINATED LISTING + 6 POSTS), REVIEWS, FAQS, GALLERY, CONTACT, CAREER, ELEMENTS (UI KIT SHOWCASE), TERMS, PRIVACY, AND A 404 PAGE.

## STYLE

**PALETTE (LIGHT — SOURCE DEFAULT, ONLY THEME):**
- `--color-body: #ffffff` (page background)
- `--color-black: #000000`
- `--color-dark: #040404` (headings / dark surfaces)
- `--color-primary: #004643` (deep teal — CTA buttons, links, icon accents, borders on hover)
- `--color-secondary: #faf4d3` (cream — badges, soft section backgrounds, accent chips)
- `--color-border: #eaeaea`
- `--color-light: #e9e9e9`
- `--color-text: #525b5bd9` (body copy, ~85% opacity slate)
- `--color-text-light: #f8f9fa` (text on dark surfaces)
- `--color-white: #ffffff`
- Occasional link/util blue `#007aff` on isolated elements.

**PALETTE (DARK — ADDED FOR THIS CLONE, SOURCE HAS NO TOGGLE):**
- Background `#0b0c0c`, surface `#111312`, border `#232725`, text `#e9e9e9`, muted text `#9aa39f`, primary accent stays `#2fae9e` (lightened teal for contrast), secondary accent `#faf4d3` kept as warm highlight. All colors are driven through CSS custom properties (`:root` = light/source palette; `[data-theme="dark"]` = the override above) so the whole clone reflows correctly in both modes, honoring `prefers-color-scheme` on first load and persisting the user's choice to `localStorage`. A theme toggle is added to the header (source has none) since the brief requires both modes to work well.

**TYPE:**
- Font family: `"DM Sans", sans-serif` (Google Fonts, vendored locally as woff2), fallback `ui-sans-serif, system-ui, sans-serif`.
- Body: 16px / 26px line-height, weight 400, color `--color-text`.
- Headings: bold, `--color-dark`, tight leading; hero H1 ~56-64px, section H2 ~36-44px, card titles ~20-22px.
- Nav links: 16px, medium weight.

**SHAPE / RADIUS / SPACING:**
- Header/navbar pill: fully rounded (`border-radius: 3.4e38px` i.e. effectively `9999px`), translucent white bg with blur, 1px hairline border.
- Cards/images: `0.25rem`–`0.375rem` radius on most panels, large `2xl`/`3xl` radius tokens on feature/gallery imagery, `50%`/`100%` on avatars and icon circles.
- Container max-width matches the navbar's 1225px-ish inner width; consistent section vertical padding (~96–128px desktop).

**MOTION:**
- Scroll-triggered fade/slide-up reveals on section content (opacity 0→1, translateY ~24px→0, ease-in-out, staggered per card).
- Hover: opacity transitions (`0.3s ease-in-out`) on link/icon hover, `transform 0.2s`/`0.3s ease-in-out` scale+lift on project/blog/service cards with an inner image `scale(1.05–1.1)` zoom, buttons swap from teal-outline to teal-filled (or invert) on hover with `0.2s–0.3s` ease transitions.
- Mobile menu slides/fades in with `transform`/`opacity` transition matching the drawer classes captured in `source.css`.

## LAYOUT & STRUCTURE

Pages discovered and cloned (base `https://nextspace-nextjs.vercel.app/`):

1. **Home (`/`)** — floating pill navbar w/ logo, nav links, dropdown, CTA button; hero with heading, subtext, CTA, hero imagery; about/intro strip; services grid; featured projects carousel/grid; stats/counters; testimonials/reviews teaser; blog teaser grid; CTA banner ("Book an appointment"); footer with contact info, social links, nav columns, newsletter.
2. **About (`/about`)** — hero/intro, company story, team/values section, stats, CTA banner, footer.
3. **Services (`/services`)** — services hero, full services grid/list with icons, process steps, CTA ("View All Services" cross-link), footer.
4. **Projects listing (`/projects`)** — hero, filterable project grid (7 cards linking to detail pages), CTA, footer.
5. **Project detail (`/projects/project-1` … `/projects/project-7`)** — shared detail template (hero image, project meta/info panel, description, gallery, next-project nav) populated per project (D-Orex Home Interior, Orion Home Studio Interior, Home Corner Interior, Orex Home Interior, Office Interior, Titan Office Interior, Home Corner Interior).
6. **Blog listing (`/blog`, `/blog/page/2`)** — hero, paginated post grid (6 posts across 2 pages), sidebar/pagination controls, footer.
7. **Blog post detail (`/blog/post-1` … `/blog/post-6`)** — shared article template (cover image, title, meta, rich body content, share links, related/next post), populated per post.
8. **Reviews (`/reviews`)** — hero, testimonial/review cards grid, CTA, footer.
9. **FAQs (`/faqs`)** — hero, accordion FAQ list ("See All FAQs" link target), CTA, footer.
10. **Gallery (`/gallery`)** — hero, masonry/grid image gallery with lightbox-style hover, footer.
11. **Contact (`/contact`)** — hero, contact form, contact info cards (phone/email/address w/ map link), footer.
12. **Career (`/career`)** — hero, open positions list/cards, culture/benefits section, CTA, footer.
13. **Elements (`/elements`)** — UI kit / component showcase page (buttons, badges, typography, cards) used as a style-guide page in the source.
14. **Terms and Conditions (`/terms-and-conditions`)** — legal copy page with header/footer chrome only.
15. **Privacy Policy (`/privacy-policy`)** — legal copy page with header/footer chrome only.
16. **404 (`/404`)** — not-found state with heading, message, "back home" CTA, footer.

Shared chrome across all pages: floating pill header/nav (with mobile hamburger drawer) and a multi-column dark-on-cream(ish) footer with nav columns, contact details, and social icons — built once and reused verbatim on every page.
