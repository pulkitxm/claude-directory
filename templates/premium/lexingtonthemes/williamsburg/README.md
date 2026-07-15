# Williamsburg — Lexington Themes E-Commerce Template

[![Watch Demo](./poster.jpg)](./demo.mp4)

A pixel-faithful static clone of the Williamsburg premium e-commerce template from [Lexington Themes](https://lexingtonthemes.com/). Built with Inter and Instrument Serif fonts, Tailwind CSS utility classes, and Keen Slider for carousels.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Home page — hero, featured products, categories, blog articles |
| `store-home.html` | Store landing page |
| `all-products.html` | Product grid with filters and sorting |
| `product-detail.html` | Single product page with image gallery and add-to-cart |
| `blog.html` | Blog index with article cards |
| `blog-post.html` | Single article page |
| `contact.html` | Contact form with business information |
| `pricing.html` | Pricing tiers |
| `helpcenter.html` | FAQ and support categories |
| `membership.html` | Membership plans and benefits |
| `affiliates.html` | Affiliate program page |
| `sign-in.html` | Sign-in form |
| `sign-up.html` | Registration form |
| `about.html` | Brand story and team |
| `store-tags.html` | Tag/category browsing |
| `checkout.html` | Checkout with order summary and payment fields |

## Design System

### Fonts
- **Inter** (variable) — loaded from rsms.me/inter — body text, UI, navigation
- **Instrument Serif** — loaded from Google Fonts — headings, hero text, editorial

### Colors
- Neutral base: white backgrounds with zinc/gray scale
- Primary text: zinc-900 (`#18181B`)
- Muted: zinc-100/200 for cards, dividers, secondary backgrounds
- Framework: Tailwind CSS utility classes

## Interactive Features

- Cart drawer (slide-in sidebar)
- Search modal (full-screen overlay with Fuse.js fuzzy search)
- Mega menu with tab navigation
- Hamburger mobile menu
- Keen Slider carousels

## How to Run

```bash
cd templates/premium/lexingtonthemes/williamsburg
python3 -m http.server 8765
```

Then open http://localhost:8765 in your browser.

## Reference

Live demo: https://williamsburg-astro.pages.dev/
