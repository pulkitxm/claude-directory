# Ink & Vermilion

A single-page, responsive personal-brand landing page for a fictional independent marketing consultant named Marlowe Vane. The named design language is **Ink & Vermilion Editorial** — a warm, paper-stock editorial aesthetic like an art-directed print magazine spread crossed with a hand-annotated notebook. Everything sits on a warm paper-white canvas, anchored by ink-black type, and punctuated by a single decisive vermilion-red accent, with hand-drawn SVG scribbles, underlines, stars, and arrows that make the page feel personally annotated.

Sections span a sticky nav, a two-column hero with an inline contact card and a portrait paste-up frame, a rotated full-bleed vermilion marquee strip, a three-column services row, a dark gallery strip, a "words work" editorial row with hand-drawn node-graph SVGs, a "missing piece" CTA band, a speaking section, a four-up journal grid, a newsletter CTA, and a footer. Motion is vanilla JS: IntersectionObserver reveals, the seamless marquee, a 6s float on a decorative element, grayscale-to-color and invert hovers, and animated focus states — respecting `prefers-reduced-motion`.

Typography pairs Playfair Display (italic emphasis) with Inter Tight (everything else), vendored locally. Hand-drawn decorations are inline SVG; all assets local.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
