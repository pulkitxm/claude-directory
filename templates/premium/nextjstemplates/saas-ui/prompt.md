> A SELF-CONTAINED, PIXEL-FAITHFUL REPRODUCTION OF THE SAAS UI NEXT.JS LANDING PAGE TEMPLATE — A DARK-BY-DEFAULT (LIGHT-MODE-CAPABLE) REACT/CHAKRA UI SAAS MARKETING SITE WITH A HERO, FEATURE GRID, PRICING TABLE, TESTIMONIALS, FAQ, AND DEDICATED LOGIN/SIGNUP PAGES. REBUILT AS PLAIN HTML + CSS + VANILLA JS WITH NO BUILD STEP REQUIRED. EVERY PAGE, THE FULL LOOK & FEEL, HOVER STATES, THEME TOGGLE, MOBILE MENU, AND SCROLL/ENTRANCE ANIMATIONS ARE REPRODUCED FROM CAPTURED REFERENCE ARTIFACTS. ALL ASSETS (FONTS, IMAGES, ICONS) ARE VENDORED LOCALLY AND IT RUNS OFFLINE.

REFERENCE: `https://saas-ui-nextjs-landing-page.netlify.app`

## SUMMARY

Saas UI is the official Next.js landing page for the "Saas UI" React component library (saas-js/saas-ui). It is a single main marketing page (`/`) with in-page anchor sections (Features, Pricing, FAQ), plus two dedicated auth-style pages: `/login` and `/signup`. The whole site is built with Next.js + Chakra UI, defaults to **dark mode**, and ships a working light/dark **theme toggle** (sun/moon icon, top-right of the header) that flips Chakra's `data-theme`/`chakra-ui-light`/`chakra-ui-dark` state instantly with no page reload. The header also includes a mobile hamburger menu that slides open a full-width dropdown nav panel on narrow viewports.

## STYLE

- **Font:** `InterVariable, Inter, sans-serif` (Inter variable font, weights 100–900), loaded via `@font-face` with `font-display: swap`. Base body font-size 16px / line-height 24px.
- **Palette (dark, default):**
  - Page background: `#171a1d` (rgb(23,26,29))
  - Text: `#ffffff` primary, muted gray (`~#a0a8b0`) for secondary copy
  - Card/panel surfaces: near-black translucent panels with 1px hairline borders `rgba(255,255,255,0.08)`
  - Accent/brand purple/violet ramp: `#3b1676` (darkest) → `#4f1d9e` → `#6023c0` → `#7434db` → `#8952e0` → `#a379e7` → `#b795ec` → `#d3bef4` → `#e5daf8` → `#f9f6fd` (lightest) — primary CTA buttons (Sign Up) use the mid-purple `#6c4fe0`-ish button fill with hover darken/lighten
  - Accent/info teal-cyan ramp used for the badge/banner background gradient and dashboard screenshot mockup accents: `#135567` → `#196e85` → `#1d979e` → `#1e86a2` → `#24a2c4` → `#2ab4d9` → `#53c2e1` → `#a2deee` → `#bae7f3` → `#d0eef7` → `#f4fbfd`
  - Hero/banner background: a diagonal dark violet → dark teal gradient
- **Palette (light mode):** background shifts to a soft lavender→pale-cyan gradient wash, near-white panels, dark slate text; the same purple/teal accent ramps are reused for buttons/badges/links.
- **Radii:** buttons/badges ~6–8px (chakra `md`/`lg`), cards ~12–16px (chakra `xl`/`2xl`), pill badges fully rounded.
- **Shadows:** soft, low-opacity card shadows on pricing cards and the testimonial cards; a colored glow shadow on the primary Sign Up button on hover.
- **Buttons:** primary = solid purple fill, white text, subtle darken + slight lift on hover with a smooth ~150–200ms ease transition (Chakra's default `background 0.2s, box-shadow 0.2s` easing, roughly `cubic-bezier(0.4, 0, 0.2, 1)`); secondary = outline/ghost button with hairline border, background fill fade-in on hover; nav links fade color from muted → white/black on hover with an underline/accent-color transition; the theme-toggle icon button gets a soft circular hover background.
- **Scroll/entrance:** sections fade/slide in softly as they enter the viewport (subtle opacity + translateY reveal), consistent with Chakra/Framer-style page transitions; header stays static (non-sticky in the captured build).
- **Theme switch:** driven by CSS custom properties + a `data-theme="dark"|"light"` attribute and matching `chakra-ui-dark`/`chakra-ui-light` class on `<body>`; toggling swaps the whole palette (background gradient, text, borders, card surfaces) instantly. `prefers-color-scheme` is honored on first load when no stored preference exists; choice persists via `localStorage`.

## LAYOUT & STRUCTURE

### Page 1 — Home (`index.html`, anchors `#features`, `#pricing`, `#faq`)
1. **Top announcement banner** — pill-shaped badge, "Get 50% off Saas UI Pro while in beta." + "Read more →" link, gradient dark violet→teal background bar.
2. **Header/nav** — logo ("Saas UI" wordmark + colored square-grid icon, left), center-right nav links (Features, Pricing, FAQ, Login), primary "Sign Up" button, theme-toggle icon button, and (on narrow viewports) a hamburger "Open menu" icon that replaces the nav links and opens a full-width dropdown panel with all nav items stacked + Login/Sign Up.
3. **Hero** — large two-line headline "Build beautiful / software faster", supporting paragraph mentioning "React component library", small "NEXT." + "⚡ chakra" tech-badge row, "Sign Up" (solid) + "View demo →" (outline) button pair, and a right-side dashboard-mockup screenshot (browser-window chrome with traffic-light dots, a fake CRM/contacts table UI) that overflows off the right edge of the viewport.
4. **Feature strip** — four-column row of icon + label + one-line description: Accessible, Themable, Composable, Productive.
5. **Two-panel "Core components" / "Solid foundations"** — two side-by-side cards; left card has a headline, copy with a bolded "30+ open source components" link, and a copyable `yarn add @saas-ui/react` code snippet chip with a copy-icon button; right card is plain copy about foundations.
6. **Testimonial highlight card + "Start next idea" panel** — left: a purple-tinted card with avatar, name/title (Renata Alink, Founder), and a pull-quote; right: dark card with headline "Start your next idea two steps ahead", intro copy, and a wrapped pill/tag cloud (authentication, navigation, crud, settings, multi-tenancy, layouts, billing, a11y testing, server-side rendering, documentation, onboarding, storybooks, theming, upselling, unit testing, feature flags, responsiveness).
7. **"Not your standard dashboard template." feature grid** — heading + subcopy, then a 3-column × 3-row icon-grid of feature call-outs (Components, Starterkits, Documentation, Onboarding, Feature flags, Upselling, Themes, Generators, Monorepo), each with a small colored icon, bold label lead-in, and one-line description.
8. **"Loved by tech people" testimonials** — section heading + 3-column grid of testimonial cards (avatar, name, role, quote): Eelco Wiersma, Caroline Yahaya, Alberto Vazquez.
9. **Pricing** (`#pricing`) — teal/violet gradient section background; heading "Pricing for every stage" + subcopy; 3-column pricing card grid: Open Source (Free), Bootstrap (Free, highlighted/bordered as most-popular), Startup (€499,- with strikethrough €999,-); each card has plan name, price, checklist of included features (checkmark icon rows), and a Sign Up button; below the cards a small print note about VAT.
10. **FAQ** (`#faq`) — heading "Frequently asked questions" + 2×2 question/answer grid (static text, not an accordion): "How many products can I use Saas UI Pro for?", "Can I use Saas UI Pro for client work?", "Can I use Saas UI for Open Source projects?", "Does Saas UI include Figma, Sketch or other design files?".
11. **Footer** — logo + tagline "The React component library for startups", "Built by Eelco Wiersma", "Contact" link, and Twitter/GitHub icon links.

### Page 2 — Login (`login.html`)
Centered single-column card on the same gradient hero background as the home page hero, with the shared header (logo, nav, Sign Up button, theme toggle) above it: "Log in" heading, "Continue with Google" and "Continue with Github" outline buttons (each with a brand icon), an "or continue with" divider, an "Email" labeled input, a full-width "Log in" submit button, and a "No account yet? Sign up" footer link. Page footer matches the home page footer.

### Page 3 — Signup (`signup.html`)
Two-column split layout: left column (dark, no gradient) lists the same four feature check-items as the home page's feature strip (Accessible, Themable, Composable, Productive) each with a small circular checkmark icon, under the Saas UI logo; right column (gradient background matching hero) has "Start building with Saas UI" heading, the same Google/Github continue buttons, email input, fine-print "By signing up you agree to our Terms of Service and Privacy Policy" (both linked), and a full-width "Sign up" button plus "Already have an account? Log in" link. Shared footer at the bottom.

### Shared interactive behavior (reproduce on every page)
- **Theme toggle** (`aria-label="theme toggle"`): click flips `data-theme`/body class between `dark`/`light`, instantly recoloring background gradient, text, card surfaces, and borders across the whole page; persists via `localStorage` and respects `prefers-color-scheme` on first load.
- **Mobile hamburger menu** (`aria-label="Open menu"`, visible under the nav-link breakpoint): click opens a full-width dropdown panel beneath the header listing Features / Pricing / FAQ / Login / Sign Up stacked vertically, dimming/blurring page content behind it; click again (now an X icon) closes it.
- **Hover states:** nav links, Sign Up/Login buttons, outline buttons, pricing-card CTA buttons, and social/icon links all have distinct `:hover` treatments (color shift, background fade-in, border brighten, or subtle lift/shadow) captured in the reference `states/` screenshots — reproduce each with matching transition timing.
- **Copy-to-clipboard** on the `yarn add @saas-ui/react` code chip (copy icon button, `aria-label="Copy install command"`).
