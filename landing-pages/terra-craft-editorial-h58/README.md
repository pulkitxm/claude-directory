# Terra Studio — Quiet Craft Editorial

A full, multi-section landing page for **Terra Studio**, a fictional artisan furniture and interior-design house ("Crafting spaces where life unfolds"). The "Quiet Craft Editorial" design language is a warm, gallery-like, paper-stock aesthetic that reads like a printed monograph about modern furniture rather than an e-commerce store — calm, tactile, and expensive. Everything is flat, matte, and square-cornered, divided by hairline ink rules, with timeless pieces shot in sunlit rooms set on cream paper, anchored by ink-black serif type and punctuated by terracotta and oak tones.

Type pairs IBM Plex Serif display headings (with italic emphasis words) against JetBrains Mono uppercase labels and a clean grotesque sans body. The layout moves through a sticky transparent header, a two-column hero with three overlapping framed image cards over a charcoal panel, an infinite mono marquee strip, a collection grid, a philosophy/craft split, a count-up stats band, a newsletter CTA, and a charcoal footer. Motion is restrained: staggered load-in, mouse-move card parallax, IntersectionObserver reveals, a seamless marquee, and scroll-triggered count-ups — all respecting `prefers-reduced-motion`.

A single self-contained static site with all fonts (WOFF2) and imagery vendored locally and referenced via relative paths, so it runs offline with no build step.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
