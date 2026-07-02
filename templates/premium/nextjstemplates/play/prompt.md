> A SELF-CONTAINED, PIXEL-FAITHFUL REPRODUCTION OF THE "PLAY" NEXT.JS SAAS STARTER KIT AND BOILERPLATE TEMPLATE, REBUILT AS PLAIN HTML + CSS + VANILLA JS WITH NO BUILD STEP. EVERY PAGE, THE FULL LOOK & FEEL, HOVER STATES, LIGHT/DARK THEME TOGGLE, MOBILE MENU, DROPDOWN NAV, FAQ ACCORDION, AND SCROLL/ENTRANCE ANIMATIONS ARE REPRODUCED FROM CAPTURED REFERENCE ARTIFACTS. ALL ASSETS (FONTS, IMAGES, ICONS) ARE VENDORED LOCALLY AND IT RUNS OFFLINE.

REFERENCE: `https://play.demo.nextjstemplates.com`

## SUMMARY

"Play" is an open-source Next.js SaaS starter kit / boilerplate marketing template by GrayGrids / Next.js Templates (built on the TailGrids design system). It is a multi-page site: a long-form marketing home page (hero, features, toolkit/about band, CTA, pricing, testimonials, FAQ accordion, team, blog preview, contact form, footer), plus standalone About, Pricing, Contact, Blog (grid + 3 detail posts), Sign In, Sign Up, and Error (404-style) pages. Shared header (logo, nav with "Pages" dropdown, dark-mode toggle, Sign In / Sign Up buttons, mobile hamburger menu) and shared dark-navy footer (link columns, socials, bottom bar) appear on every page. The template supports light and dark mode via a moon/sun toggle in the header, persisted and applied via a `dark` class on `<html>`.

## STYLE

- **Font:** Inter (sans-serif), loaded via Google Fonts / self-hosted, weights 400/500/600/700/800.
- **Palette (light):**
  - Primary blue: `#3758F9` (buttons, links, active nav, accents)
  - Ink/heading dark: `#101828`, `#090E34` / `#090e34`, `#1D2144`
  - Body text gray: `#374151`, `#1f2937`
  - Muted text: `#8890A4`, `A6AFC3`, `#637381`
  - Surfaces: white `#FFFFFF`, light section bg `#F4F7FF`, alt light bg `#E9F9FF`, border `#E5E7EB`/`#DFE4EA`, hairline `#F1F1F1`
  - Accent/status: amber star `#FBB040`, success green `#0BB489`
  - Footer: dark navy `#090E34`/near-black gradient overlay, white/70% text
- **Palette (dark):** background flips to dark navy/near-black (`#090E34`/`#151830`-family), card surfaces to a dark slate, body text to light gray/white, borders to low-opacity white; primary blue and accent colors stay the same for brand consistency. Implemented as CSS custom properties with a `:root` (light) block and `.dark` (or `html.dark`) override, honoring `prefers-color-scheme` for first paint and a no-flash boot script.
- **Type scale:** hero H1 ~40-44px/800, section H2 ~34-36px/700, card/H3 ~20-22px/600-700, body 16px/400 line-height 24-28px, small/eyebrow 14px/600 uppercase-tracking primary-blue label above section headings.
- **Radii:** buttons/inputs ~6-8px (`rounded-md`/`rounded-lg`), cards ~8-10px, pill badges fully rounded, avatar/team photos circular.
- **Shadows:** soft card shadow on pricing/testimonial/team cards, slightly deeper shadow on hover/highlighted pricing tier.
- **Spacing/grid:** Tailwind-style container (max-width ~1170-1320px), 12-col responsive grid collapsing to 1-2 cols on mobile/tablet.
- **Animation/easing:** header is `absolute`/`bg-transparent` over the hero and becomes a solid `sticky` header with shadow on scroll (transition ~300ms ease); nav dropdown ("Pages") and mobile menu slide/fade open; FAQ accordion items expand/collapse height with a rotating chevron/plus icon (~300ms ease); buttons/links/nav items/cards use `transition-colors`/`transition-all` ~150-300ms on hover (color shift to primary blue, subtle translateY/shadow lift on cards and pricing CTA buttons); theme toggle icon crossfades sun/moon.

## LAYOUT & STRUCTURE

Shared chrome on every page: fixed/sticky header — logo ("N" mark + "PLAY" wordmark), nav (Home, About, Pricing, Contact, Blog, "Pages" dropdown listing About Page/Pricing Page/Contact Page/Blog Grid Page/Sign Up Page/Sign In Page/Error Page), dark-mode toggle, Sign In link + Sign Up button, hamburger menu on mobile — and a dark-navy footer (brand blurb + socials, "About Us" links, "Features" links, "Our Products" links, "Useful Links" incl. FAQ/Blogs/Support/About, bottom bar with Privacy/Legal/Terms links and "Designed and Developed by TailGrids and Next.js Templates" credit).

Pages discovered and cloned:

1. **Home** (`/`) — transparent-over-hero header; hero (eyebrow, H1 "Open-source SaaS Starter Kit and Boilerplate for Next.js", subcopy, Download Now / Star on GitHub buttons, "Play is now available for popular frameworks" tech-icon row, dashboard product screenshot); "Main Features of Play" 4-col icon-card grid; "Brilliant Toolkit to Build Next.js SaaS Websites" two-image + stat-badge (09 years) about band with CTA; full-bleed blue "What Are You Looking For? Get Started Now" CTA band; "Our Pricing Plan" 3-tier pricing cards (Basic/Premium/Business, Premium highlighted); "What our Client Say" 3-card testimonials with star ratings; "Any Questions? Answered" 2-col FAQ accordion (6 items); "Meet Our Team" 4-card team grid with social icons; "Our Recent News" 3-card blog preview; split contact band (info + "Send us a Message" form); footer.
2. **About** (`/about`) — breadcrumb hero ("About Us Page" / Home / About Us Page), toolkit/about band (headline, two paragraphs, Know More button, two images, 09-years stat badge), "Meet Our Team" 4-card grid, footer.
3. **Pricing** (`/pricing`) — breadcrumb hero, "Our Pricing Plan" section (same 3-tier cards as home), footer.
4. **Contact** (`/contact`) — breadcrumb hero, split contact band (Our Location / How Can We Help? info + "Send us a Message" form: name/email/phone/message + Send button), footer.
5. **Blog grid** (`/blogs`) — breadcrumb hero ("Blog Grid Page"), 3-card blog grid (date tag, title, excerpt, "Blog Example with MDX" / "Bootstrap Template Guide" / "Configuring Contact Form"), footer.
6. **Blog detail — Blog Example with MDX** (`/blogs/blog-example-with-mdx-file`) — breadcrumb hero, single-column article body (cover image, title, meta, prose), footer.
7. **Blog detail — Bootstrap Template Guide** (`/blogs/bootstrap-templates`) — same article layout, different content.
8. **Blog detail — Configuring Contact Form** (`/blogs/contact-form`) — same article layout, different content.
9. **Sign Up** (`/signup`) — centered card: "Create your account", email/password fields, social sign-up buttons, "Sign in" link.
10. **Sign In** (`/signin`) — centered card: "Sign in to your account", email/password fields, social sign-in buttons, "Sign up" link.
11. **Error** (`/error`) — breadcrumb-style hero, large "404"/error illustration or code, message, "Go Home" button, footer.

All interactive elements (nav "Pages" dropdown, mobile hamburger menu, dark/light theme toggle, FAQ accordion, hover states on nav links/buttons/cards/pricing CTAs/team socials, sticky-header scroll transition, scroll-reveal entrance animations) are reproduced from captured reference states in `.reference/<page>/states/`.
