# Spydea — SaaS Document Management Landing Page Clone

A pixel-faithful HTML/CSS/JS clone of the [Spydea Next.js template](https://themefisher.com/demo?theme=spydea-nextjs) by Themefisher. No build step required — open `index.html` directly in a browser.

## Features

- **5 pages**: Home, About, Pricing, Contact, Blog
- Black-and-white design with colorful accents (mint green, salmon, yellow, blue)
- Decorative vertical dashed-line grid background
- Diagonal section dividers via CSS `clip-path`
- Sticky header with scroll shrink and announcement bar
- Mobile hamburger menu with dropdown navigation
- AOS scroll-triggered animations throughout
- Infinite-scrolling brand logos marquee
- Interactive feature tabs, pricing toggle (monthly/annual), and FAQ accordion
- Locally vendored images — zero external image CDN dependency

## Pages

| File | Description |
|------|-------------|
| `index.html` | Home — hero, brands, features tabs, integrations, testimonials, stats, pricing, blog preview, CTA |
| `about.html` | About — mission/vision, stats, 8-person team grid |
| `pricing.html` | Pricing — 3-tier cards with monthly/annual toggle, FAQ accordion |
| `contact.html` | Contact — info boxes, full contact form |
| `blog.html` | Blog — 6-article grid with pagination |

## Run

```bash
# No build step — open directly in browser
open index.html
# Or serve with any static server
python3 -m http.server 8080
```

## Design Tokens

- **Fonts**: Maven Pro (headings) + Merriweather (body) via Google Fonts
- **Primary**: `#000000` | **Secondary (mint)**: `#73CFA8` | **Tertiary (salmon)**: `#FB9289`
- **Gold**: `#FDE077` | **Blue**: `#73B1FF` | **Background**: `#FFFFFF`

---

> Template source: [Themefisher Spydea Next.js](https://themefisher.com/demo?theme=spydea-nextjs)
> Browse more clones: [templates/](../) | [Root directory](../../../)
