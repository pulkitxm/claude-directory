# Tidy — 12-Page SaaS Landing Page & Marketing Site (Vanilla HTML + Tailwind CSS + Alpine.js)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A pixel-faithful clone of the Cruip Tidy template: a clean, modern multi-page SaaS marketing site spanning 12 fully realized pages, built with vanilla HTML5, compiled Tailwind CSS utility classes, Alpine.js v3 for all interactivity, and AOS v2 for scroll-triggered fade animations. Ideal as a reference for SaaS landing page structure, pricing page patterns, auth page layouts, and blog/testimonial templates — no build step required, runs entirely offline. Generated with Claude Fable 5.

## Pages

| File | Page |
|------|------|
| `index.html` | Home — hero with video modal, feature grid, two-column feature sections, CTA, footer |
| `pricing.html` | Pricing — monthly/yearly toggle, three-tier pricing cards (Essential / Performance / Enterprise) |
| `about.html` | About — team grid with member cards, company values section |
| `blog.html` | Blog — post grid with featured post, category filters, author avatars |
| `blog-post.html` | Blog Post — single article layout with sidebar, author info, related posts |
| `wall-of-love.html` | Wall of Love — testimonial grid, customer logos, featured testimonials, stats |
| `wall-of-love-single.html` | Wall of Love Post — single testimonial detail page |
| `404.html` | 404 — error page with navigation back to home |
| `support.html` | Support — FAQ accordion, search bar, help categories |
| `signin.html` | Sign In — split-panel auth form with testimonial sidebar |
| `reset-password.html` | Reset Password — password reset form with background image |
| `request-demo.html` | Request Demo — lead capture form with social proof panel |

## Design System

- **Fonts:** Inter (body/UI), Playfair Display (auth page headings)
- **Colors:** Dark navy hero (`#101d2d`), white body, blue accent (`#5091ee` / `#3b82f6`), gray text (`#6b7280`)
- **Layout:** 1280px max-width container, responsive Tailwind utility grid
- **Animations:** AOS `fade-up`, `fade-left`, `fade-right` with `ease-out-cubic` easing, 500ms duration
- **Interactivity:** Alpine.js v3 — mobile menu toggle, pricing toggle, video modal, dropdown menus, FAQ accordion

## Run

No build step required. All assets are vendored locally and the site runs fully offline.

**Option 1 — Open directly:**
```sh
open index.html
```

**Option 2 — Local dev server:**
```sh
python3 -m http.server 8080
```
Then visit `http://localhost:8080`.

## Reference

- `prompt.md` holds the full build specification.
- `demo.mp4` shows the site in motion (with `poster.jpg` as the preview thumbnail).

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Cruip — https://cruip.com/demos/tidy/

---

Part of the [Templates](../../../) collection in the [claude-directory](../../../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
