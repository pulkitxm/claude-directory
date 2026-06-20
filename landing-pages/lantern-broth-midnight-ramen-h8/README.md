# Lantern Broth

A full, multi-section marketing landing page for a late-night Japanese ramen bar called Lantern Broth. The named design language is **Warm Modular Bento** — a cozy, nostalgic, earthy system built entirely from rounded rectangular "tiles" packed edge-to-edge into a bento-box grid, as if the whole page were a tray of neatly arranged dishes. Tile fills alternate between beige, terracotta, mustard, and teal so the grid reads like a colorful bento tray.

Sections include a sticky header, a two-column hero bento (a poster headline tile plus colored action tiles with tilted food photos beside a tall steaming-bowl photo), a "made with tradition" feature row, an earthy teal statement band, a top-picks product row, a promo split, a testimonial panel with chevron controls, a WhatsApp rewards CTA, a prep/rewards triptych, and a dark cocoa footer. Motion is vanilla JS (no library): IntersectionObserver tile reveals with stagger, hover de-tilt on hero photos, testimonial rotation, product lifts, and a drifting steam/glow over the hero bowl — respecting `prefers-reduced-motion`.

Typography pairs Oswald (condensed, all-caps display) with DM Sans (body). The bento grid is CSS Grid; all assets vendored locally.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
