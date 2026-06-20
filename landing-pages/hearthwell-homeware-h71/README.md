# Hearthwell

A full, multi-section, responsive e-commerce landing page for a fictional direct-to-consumer homeware essentials brand named Hearthwell — "everyday objects, made to be lived with." The named design language is **Marmalade Editorial**: a warm, boutique-retail aesthetic like an art-directed home-goods catalogue crossed with a slow-living magazine — soft warm-grey paper, near-black ink, and a single saturated marmalade-orange accent used sparingly but decisively.

Sections span a dismissible announcement bar, a floating pill nav that tightens on scroll, a centered hero with a 3-slide cross-fade image slider and a "featured item" overlay card, a marquee trust strip, a collections grid, a bestsellers product grid, a rotating editorial "made to last" split panel, a testimonial band, a newsletter CTA with email validation and an inline success state, and a footer. Motion is vanilla JS: IntersectionObserver reveals, the auto-advancing hero and editorial sliders with clickable dots, the marquee, a `scrolled` nav state, and hover micro-interactions — respecting `prefers-reduced-motion`.

Typography pairs Fraunces (editorial serif) with Inter, vendored locally. Plain `index.html` + one CSS + one JS file; all images, fonts, and inline-SVG icons local.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
