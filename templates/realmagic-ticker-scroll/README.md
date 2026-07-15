# Real Magic — Horizontal Ticker-Tape Scroll (GSAP ScrollTrigger, Vanilla JS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A horizontal scroll experiment driven by GSAP ScrollTrigger that turns the entire page into a single continuous ticker-tape sentence: *"In every bottle, discover the undeniable Real Magic of sharing pure Refreshment that brings us Together."* The full flat-red Coca-Cola "Real Magic" stage (`#f40009`) with cream type, inline SVG glyphs (bottle, bubbles, ribbon swoosh, drop, clinking bottles, heart) sitting between words like punctuation, and idle scroll-independent GSAP loops (drawing ribbon, rising bubbles, beating heart) make this a richly animated, single-line reading experience. Anton handles running uppercase words while Instrument Serif covers faint connective and italic accent words; `prefers-reduced-motion` is respected throughout. Generated with Claude Fable 5.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.

---

Part of the [Templates](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
