# Appy: Mobile App Landing Page Template Clone

[![Watch Demo](./poster.jpg)](./demo.mp4)

A pixel-faithful, self-contained HTML clone of the **Appy** landing page template by Cruip, a polished multi-page mobile app marketing site built with Tailwind CSS, Alpine.js, AOS scroll animations, and Swiper carousel. No build step required: open any HTML file directly in a browser or serve from any static host.

## Features

- **12 fully-cloned pages**: Home, Products, Product, About, Blog, Blog Post, Testimonials, Help Center, Contact, 404, Privacy, and Terms
- **Dark / light theme toggle**: driven by CSS custom properties with `localStorage` persistence and a no-flash boot script
- **Alpine.js interactions**: mobile hamburger menu, dropdown nav, video modal, FAQ accordions
- **AOS scroll animations**: fade-in/up entrance effects on all major sections (ease-out-quart, 750 ms)
- **Swiper carousel**: full-width auto-playing touch carousel of app screenshot images
- **Inter + Red Hat Display typography**: loaded from Google Fonts
- **All assets vendored locally**: images, vendor JS/CSS, and demo video included; no external runtime dependencies except Google Fonts

## Pages

| File | Description |
|------|-------------|
| `index.html` | Hero, feature sections, carousel, pricing, testimonials, CTA |
| `products.html` | Product catalog and service cards |
| `product.html` | Product detail and service feature content |
| `about.html` | Company story, stats, team grid, careers section |
| `blog.html` | 6-post grid with author avatars, tags, and pagination |
| `blog-post.html` | Full article layout with related posts sidebar |
| `testimonials.html` | 16-quote grid + video testimonial modal |
| `help.html` | Searchable FAQ with Alpine.js accordion |
| `contact.html` | Contact form + address/email/phone cards |
| `404.html` | Illustrated 404 page with back-home link |
| `privacy.html` | Privacy policy content |
| `terms.html` | Terms of service content |

## Run Locally

```bash
# Any static server works, no build step needed
python3 -m http.server 8080
# then open http://localhost:8080/index.html
```

Or simply open `index.html` directly in your browser (note: the video modal requires a server for `video.mp4` to load).

## Directory Structure

```
appy/
├── index.html
├── products.html
├── product.html
├── about.html
├── blog.html
├── blog-post.html
├── testimonials.html
├── help.html
├── contact.html
├── 404.html
├── privacy.html
├── terms.html
├── style.css
├── css/vendors/
├── js/
│   ├── vendors/
│   └── main.js
├── images/
└── videos/
    └── video.mp4
```

## Tech Stack

- **Tailwind CSS** (compiled, vendored): utility-first styling with dark-mode variant
- **Alpine.js**: lightweight reactive JS for menus, modals, accordions, toggles
- **AOS** (Animate On Scroll): scroll-triggered entrance animations
- **Swiper**: touch-enabled carousel with autoplay and navigation

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Cruip, <https://cruip.com/demos/appy/>

---

[Browse all premium templates](../../README.md) · [Back to templates root](../../../README.md)
