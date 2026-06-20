# Ochre & Stone — Architectural Interiors

A multi-section landing page for Ochre & Stone, a fictional high-end interior-architecture studio. The named design language is "Warm Editorial Minimalism" — a gallery-like, print-magazine feel built on 1px hairline rules, generous whitespace, and a single burnt-ochre accent glowing against a warm bone-paper canvas and near-black ink.

Sections include a bordered floating nav with flip-up hover cells, a hero with an angled clip-path image cutout and an auto-rotating floating card, a marquee strip, an asymmetric bento grid of project tiles, a "studio method" section whose phase cards drop in and settle into a scattered, slightly rotated fan layout, an inverted ink testimonial, a CTA, and a four-column footer. Vanilla HTML/CSS/JS with IntersectionObserver scroll reveals, nav flip hovers, a 5s hero carousel, freefall card drop-in, a 12s spin on ✦ badges, and `prefers-reduced-motion` support. Self-contained and offline-runnable.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
