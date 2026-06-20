# Solstice Studio

A single-page, light-mode portfolio landing page for a fictional product/UX designer (Nova Ayala) under the studio identity Solstice Studio®, in a "Warm Editorial Craft" aesthetic: a bright, paper-white canvas, a single confident tangerine accent, a disciplined grotesque typesystem crossed with a loose handwritten signature script, and faint vertical "margin rule" lines that make the page feel like a designer's ruled sketchbook. Type is Space Grotesk with Caveat for the handwritten accent words (both self-hosted), and section headers use bracketed eyebrows like `[WORK]`.

Sections run a fullscreen-overlay menu header, a hero with mixed grotesque/handwritten type and a cluster of bobbing floating design-tool micro-cards, an infinite logo ticker, a 3D-perspective auto-scrolling selected-work shelf, expertise cards, an animating process timeline, testimonials, a gradient CTA, and an overlapping dark footer. Vanilla JS drives the floating cards, the ticker, the scroll-in progress line, count-ups, and hover micro-interactions.

Plain static site (one `index.html`, `styles.css`, `main.js`), all assets vendored locally, runs fully offline.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
