# Meridian Drafthouse

A single-page, fully responsive portfolio for a fictional architect and spatial designer (Marlowe Fenn) in a "Drafting-Table Brutalism" aesthetic — a warm, paper-cream, Swiss-archival design language that reads like a licensed architect's working drawing set: blueprint grids, 1px ink hairlines, mono annotation labels, and one electric highlighter-yellow accent. Everything is flat, matte, and sharp-cornered, deliberately avoiding gradients, glass, and neon. Type is Instrument Serif display with Space Grotesk labels (both self-hosted), and one hero word rendered as an outlined italic.

Sections run a fixed header, a full-viewport blueprint-grid hero with masked type-rise and a sliding image-reveal overlay, a count-up stats strip, selected work, about, a design-focus grid, an inverted-ink process table, testimonials, a contact CTA, and a footer. Vanilla JS drives IntersectionObserver reveals, the overflow-masked headline rise, scale-X image unveils, a pulsing status dot, and stat count-ups — all respecting `prefers-reduced-motion`.

Plain HTML + CSS + a little vanilla JS, all assets vendored locally, runs fully offline.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
