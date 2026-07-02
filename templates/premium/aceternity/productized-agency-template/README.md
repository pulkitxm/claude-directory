# Productized Agency Template — Aceternity Landing Page Clone (Vanilla HTML/CSS/JS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A faithful, same-to-same clone of the Aceternity "Productized Agency" template, rebuilt as a self-contained static site in plain HTML, CSS, and vanilla JavaScript with no build step. This eleven-page agency marketing site — home, work, products, pricing, a blog index, and six blog article pages — recreates the warm editorial aesthetic (bone `#F0EFEC` background, signature yellow `#FFCC00` accent, dark glowing hero) along with the sticky "Chat with Alex" nav, bento feature grids, comparison table, FAQ accordions, logo marquee, and testimonial sections. The original is a Next.js + Tailwind CSS v4 app using Framer Motion; this clone preserves the Tailwind-compiled stylesheet and class-driven markup, self-hosts the Inter and DM Mono fonts, vendors all images locally so it runs offline, and replaces Framer Motion with an IntersectionObserver reveal system plus native CSS for accordions, marquees, tabs, and hover states. Generated with Claude Fable 5.

## Run

This is a plain static site — no build, no dependencies. Serve the folder over HTTP so the vendored fonts, images, and stylesheets load correctly:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000/index.html>. Other pages: `work.html`, `products.html`, `pricing.html`, `blog.html`, and the six `blog-*.html` article pages.

## Structure

- `index.html`, `work.html`, `products.html`, `pricing.html`, `blog.html` — the home, work gallery, products, pricing, and blog index pages.
- `blog-*.html` — six blog article pages (e.g. `blog-designing-for-accessibility-first.html`).
- `css/` — `fonts.css` (self-hosted Inter + DM Mono), `main.css` (Tailwind-compiled styles), and `app.css`.
- `js/app.js` — IntersectionObserver scroll reveals, accordion/tab/marquee/hover behavior, and mobile hamburger menu.
- `assets/` — vendored fonts and `.webp` images so the clone runs fully offline.

`prompt.md` holds the full style and layout breakdown (palette, typography, per-page sections), and `demo.mp4` shows the site in motion.

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Aceternity — <https://ui.aceternity.com/template-preview/productized-agency-template>

---

Part of the [Templates](../../../) collection in the [claude-directory](../../../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
