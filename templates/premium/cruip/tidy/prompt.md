> THIS IS A SELF-CONTAINED, PIXEL-FAITHFUL REPRODUCTION OF THE TIDY TEMPLATE BY CRUIP — A CLEAN, MODERN MULTI-PAGE SAAS LANDING PAGE AND MARKETING SITE WITH 12 PAGES, BUILT WITH TAILWIND CSS, ALPINE.JS, AND AOS SCROLL ANIMATIONS. ALL ASSETS ARE VENDORED LOCALLY AND THE CLONE RUNS FULLY OFFLINE WITH NO BUILD STEP REQUIRED. REFERENCE: `https://cruip.com/demos/tidy/`

## Pages

1. **Home** (`index.html`) — Hero section with video modal, feature blocks grid, two-column feature sections, CTA section, footer
2. **Pricing** (`pricing.html`) — Monthly/yearly toggle with three pricing tiers (Essential, Performance, Enterprise), CTA section
3. **About** (`about.html`) — About hero, intro, team grid with member cards, values section
4. **Blog** (`blog.html`) — Blog post grid with featured post, category filters, author avatars, CTA
5. **Blog Post** (`blog-post.html`) — Single article layout with sidebar, author info, related posts
6. **Wall of Love** (`wall-of-love.html`) — Testimonial grid with customer logos, featured testimonials, stats
7. **Wall of Love Post** (`wall-of-love-single.html`) — Single testimonial detail page
8. **404** (`404.html`) — Error page with navigation back to home
9. **Support** (`support.html`) — FAQ accordion, search bar, help categories, team avatars
10. **Sign In** (`signin.html`) — Split-panel auth form with background image and testimonial panel
11. **Reset Password** (`reset-password.html`) — Simple password reset form with background image
12. **Request Demo** (`request-demo.html`) — Lead capture form with background image and social proof

## Design System

- **Font**: Inter (primary body/UI), Playfair Display (auth page headings)
- **Colors**: Dark navy hero (#101d2d), white body (#ffffff), blue accent (#5091ee / #3b82f6), gray text (#6b7280)
- **Layout**: Max-width container (1280px), responsive grid with Tailwind utility classes
- **Animations**: AOS (Animate On Scroll) with `ease-out-cubic` easing, 500ms duration, fade-up/fade-left/fade-right variants
- **Interactivity**: Alpine.js v3 for mobile menu toggle, pricing toggle, video modal, dropdown menus, FAQ accordion
- **Logo**: Cruip SVG logo (32x32 fluid path design)

## Tech Stack

- Vanilla HTML5 with obfuscated Tailwind CSS class names (compiled output)
- Alpine.js v3 (local vendor)
- AOS v2 scroll animation library (local vendor)
- No build step required — open index.html directly in browser
