# Carbon Bloom

A multi-section landing page for **Carbon Bloom**, a fictional independent design-and-engineering agency, built in a "Molten Paper" design language — a warm, tactile, editorial agency-portfolio aesthetic on a soft bone-beige canvas (`#EEE9E3`), anchored by pure ink-black and detonated by a single molten-orange accent (`#F43C00`). Blocks swap between beige, pure-black, and pure-white as you scroll, each curling up over the previous one with a large rounded top edge like stacked sheets of paper.

Display type is Space Grotesk (huge tight uppercase, up to ~150px) over Inter Tight body. The signature device is sticky-stack panels: the two-panel hero and the dark services cards use `position: sticky` with ascending z-index so they overlap on scroll. Other sections include two infinite marquees (fast and slow), a two-tone philosophy statement, a single-open FAQ accordion, and a masonry featured-work grid. Motion uses directional IntersectionObserver reveals and hover image scales, respecting `prefers-reduced-motion`.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
