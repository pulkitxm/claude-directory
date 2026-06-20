# Lumen Grove

A full, multi-section, self-contained landing page for Lumen Grove, a fictional botanical bathhouse and forest-spa studio. The named aesthetic is **Verdant Apothecary** — a warm, organic, editorial wellness language that feels like a sun-warmed conservatory crossed with a modern herbal apothecary: deep forest-green ink on warm bone paper, punctuated by a single living chartreuse accent. The signature gesture is a large rounded "panel-within-a-panel" hero card that floats on the canvas, split between type and a full-bleed photograph.

Sections include a floating pill navbar, the signature split hero card with a three-line stacked headline and dual capsule CTAs, a rituals intro, a full-bleed marquee gallery, a pathway panel pairing a single-open accordion with a cross-fading image, a full-width testimonial panel, three-card membership pricing (one featured forest-ink card), a forest-ink newsletter panel, and a footer. Motion is vanilla JS: IntersectionObserver reveals, a trailing chartreuse custom cursor on desktop, the CSS marquee, the accordion image cross-fade, and smooth anchor scrolling.

Typography pairs Fraunces (display serif) with Inter (body). Single `index.html` + local `assets/`; everything vendored locally.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
