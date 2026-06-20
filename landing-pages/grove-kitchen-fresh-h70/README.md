# Grove Kitchen

A full, multi-section, responsive landing page for a fictional direct-to-consumer fresh dog food brand named Grove Kitchen — "real food, gently cooked, delivered chilled." The named aesthetic is **Forest Deli**: a warm, produce-forward farmers-market look — kraft-paper menus, chalkboard signage, deli-counter warmth — selling a weekly fresh-food subscription for dogs. Signature motifs include dashed-border "stamp" pill badges, a faint kraft-paper noise texture, and scalloped ticket-edge dividers.

Sections run from a fixed header with a floating menu card, a hero with a cross-fading background slider and a popup menu card, a trust strip, a recipe catalog grid, a forest-band ticker, a benefits section, numbered "how it works" steps, testimonials, an FAQ accordion, and a footer/CTA with a bouncing "FRESH." word and an overlapping contact card. Motion is vanilla JS: the hero slider cross-fade, the load popup, IntersectionObserver reveals, card lifts, the marquee ticker, and the FAQ — respecting `prefers-reduced-motion`.

Typography pairs Fraunces (display serif, with italic emphasis words) and DM Sans (body). All assets vendored locally.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
