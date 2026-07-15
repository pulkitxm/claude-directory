# Fortify — Cybersecurity Website Template

[![Watch Demo](./poster.jpg)](./demo.mp4)

Pixel-faithful reproduction of the Fortify Next.js cybersecurity template by ThemeFisher, rebuilt as a self-contained plain HTML/CSS/JS project with no build step required. The design features a dark-primary palette (`#1d1d1d`) with a lime-green secondary accent (`#dcf986`) and a teal tertiary (`#5ea977`), Satoshi body typography paired with Clash Grotesk display headings, IntersectionObserver-driven scroll-fade animations, a marquee client logo strip, an interactive pricing toggle, an FAQ accordion, and a counter animation on the About stats row. The project ships 9 complete pages — home, about, features, pricing, contact, blog, blog post, integration, and changelog — all sharing a single `assets/css/style.css` design system and `assets/js/main.js`. Generated with Claude Sonnet 4.6.

## Run

No build step required. Open any page directly in a browser:

```
open index.html
```

Or serve the folder over HTTP (recommended, so relative paths resolve correctly):

```sh
cd templates/premium/themefisher/fortify-nextjs
python3 -m http.server
# then visit http://localhost:8000
```

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `about.html` | About |
| `features.html` | Features |
| `pricing.html` | Pricing |
| `contact.html` | Contact |
| `blog.html` | Blog |
| `blog-post.html` | Blog Post Detail |
| `integration.html` | Integrations |
| `changelog.html` | Changelog |

## Notable techniques

- **CSS custom properties design system** — `assets/css/style.css` defines all colour tokens, typography scale, spacing, shadow, border-radius, and transition values as CSS custom properties, enabling consistent theming across all 9 pages from a single source of truth.
- **IntersectionObserver scroll animations** — elements marked with `[data-fade]` and optional `[data-delay]` attributes fade and slide into view as they enter the viewport, using a lightweight native API with no external library dependency.
- **Clients marquee** — the brand logo strip uses a pure CSS `@keyframes` translate animation with `animation-play-state: paused` on hover for a smooth infinite loop.
- **Pricing toggle** — `pricing.html` includes a monthly/yearly billing switch; clicking it swaps `[data-monthly]` and `[data-yearly]` price elements via JavaScript class toggling.
- **FAQ accordion** — collapsible answer panels with CSS `max-height` transitions driven by a single click handler in `main.js`; only one item can be open at a time.
- **Counter animation** — the About page stats row (1000+ businesses, 99.9% satisfaction, 24/7 support) counts up from zero using `requestAnimationFrame` when the section enters the viewport.
- **Mobile hamburger nav** — a slide-down mobile navigation overlay is toggled by a three-bar hamburger button with animated span transitions; the body scroll is locked while the menu is open.
- **Sticky scrolled navbar** — the navigation bar adds a `.scrolled` class on scroll, which applies a background colour, border, and backdrop-blur effect for legibility over page content.
- **Alternating feature blocks** — `features.html` uses a `.feature-block.reverse` modifier to flip the image-content order on every other row, creating visual rhythm without duplicating layout code.
- **Changelog timeline** — `changelog.html` displays a two-column version/content grid with colour-coded `New`, `Improved`, and `Fixed` tag pills.

`prompt.md` holds the full visual specification and `demo.mp4` shows the template in motion.

## Tech stack

- Vanilla HTML5, CSS3, JavaScript (ES6+) — zero dependencies, zero build step
- [Satoshi](https://fonts.google.com/specimen/Satoshi) — body font via Google Fonts
- [Clash Grotesk](https://www.fontshare.com/fonts/clash-grotesk) — display headings via Fontshare CDN
- All images vendored locally under `assets/images/`

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** ThemeFisher — <https://themefisher.com/demo?theme=fortify-nextjs>

---
