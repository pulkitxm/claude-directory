# Stacking Cards Portfolio — Scroll-Driven Sticky Card Deck Template (HTML, CSS, Vanilla JS, Inter, Instrument Serif)

A single-page, self-contained portfolio template whose core experiment is the "stacking cards" scroll effect: as you scroll, each project card pins to the top of the viewport while the next card slides up and over it — like dealing a deck of cards — with scroll-linked JS applying scale, brightness, and a darkening overlay so buried cards shrink and dim into depth. The calm editorial aesthetic uses a warm off-white paper canvas (`#ECE9E2`), near-black ink, and a single terracotta accent (`#C8553D`), with fluid `clamp()` typography pairing locally vendored Inter and Instrument Serif, plus a subtle SVG fractal-noise grain; five project cards (Lumen, Atlas Type, Harbor, Solène, Field Notes) each carry unique tinted surfaces and CSS/SVG art panels, and the whole page opens offline with zero network requests while honoring `prefers-reduced-motion`. Generated with Claude Fable 5.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.

---

Part of the [Templates](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
