# Terra Siena — Handcrafted Ceramics Atelier

A full, multi-section landing page for **Terra Siena**, a fictional ceramics studio. The "Sun-Fired Earth" aesthetic is a warm, editorial, artisanal e-commerce page that feels like a printed craft catalog — hand-thrown stoneware, kiln smoke, raw clay, and Mediterranean light. The mood is tactile, unhurried, and expensive, with generous negative space, large editorial serif display type, earthen terracotta/ochre/bone-cream tones, subtle paper grain, and arch motifs that echo kiln openings.

The layout runs through a fixed translucent header with a fullscreen overlay menu, a split editorial hero with a full-bleed pottery image marquee, a brand-values strip, a **collections deck** of portrait cards that begin fanned and spread out horizontally when scrolled into view, a 12-column testimonial/atmosphere grid, a "Why Terra Siena" section of **3D flip cards**, an FAQ accordion, a final CTA, and a dark-clay footer with its own craft-claim marquee. Motion includes word-by-word text reveals, IntersectionObserver fade-and-rise, seamless marquee loops, the one-shot deck spread, `rotateY` flip cards (tap-to-flip on touch), and single-open accordions.

Self-contained: plain HTML + Tailwind + vanilla JS, with all fonts, icons, and imagery vendored locally so it runs fully offline with no build step.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
