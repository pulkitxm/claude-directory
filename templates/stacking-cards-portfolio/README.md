# Stacking Cards Portfolio

A single-page, self-contained portfolio template whose core experiment is the "stacking cards" scroll effect: as you scroll, each project card pins to the top of the viewport while the next card slides up and over it — like dealing a deck of cards. The page runs a fixed pill navbar, a full-height hero, a section header, a five-card deck, and a dark contact footer.

The aesthetic is calm and editorial — warm off-white paper (`#ECE9E2`), near-black ink, and a single terracotta accent (`#C8553D`), with fluid `clamp()` typography pairing Inter (UI/body) and Instrument Serif (display + italic accents), both vendored locally, plus a subtle SVG fractal-noise grain. The signature mechanic combines pure-CSS sticky pinning (each card `position: sticky` at an increasing `top` offset so the deck fans downward) with a scroll-linked JS scrub: a single `requestAnimationFrame` loop computes how far the next card has covered each card and applies `scale`, `brightness`, and a darkening overlay (eased with `easeOutCubic`) so buried cards shrink and dim into depth. Each of the five cards (Lumen, Atlas Type, Harbor, Solène, Field Notes) carries its own tinted surface and unique CSS/SVG art panel. All fonts are local and all imagery is CSS/SVG, so it opens offline with zero network requests and honors `prefers-reduced-motion`.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
