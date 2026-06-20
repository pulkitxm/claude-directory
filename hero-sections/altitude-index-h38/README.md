# Altitude Index

A full-viewport hero section for a fictional high-altitude expedition outfitter, built in a "Warm Cartography" design language — the opening spread of a printed expedition field guide. A warm paper-stock background (`#E8E5E2`), ink-black Space Grotesk display type, and a single ember-orange accent (`#FE5733`) carry a precise 4-column / 3-row bento grid of photo tiles and text panels. The mood is rugged yet refined: a curated atlas that happens to scroll.

The giant all-caps headline ("ALTITUDE") clamps from 56px to 184px and sits beside a masonry of mountaineering photographs. Notable techniques: a staggered on-load reveal of each grid cell (Intersection Observer), RAF-throttled pointer parallax that drifts the photo tiles opposite the cursor, a continuous CSS marquee coordinate ticker that pauses on hover, and a full-screen ink overlay menu that slides up from the bottom. All motion respects `prefers-reduced-motion`. Fonts, photos, and icons are vendored locally so the page runs fully offline.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
