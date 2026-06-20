# Lumina Maternité

A single, self-contained, responsive landing page for a premium maternity & women's health sanctuary called Lumina Maternité. The named aesthetic is **Quiet Sanctuary** — a soft, editorial, organic-modern design language like a high-end birth center crossed with a slow-living magazine: generous whitespace, rounded organic shapes, subtle grain, and deep moss-green accents against a bone-white canvas with warm blush highlights. No hard black, no neon, no pure white; motion is slow and breathing.

Sections span a sticky header, a centered hero with drifting blurred organic blobs and a hover-pausing image-card marquee, a moss ticker strip, a care/specialties grid, a sticky-stacking "journey" scroll section, an interactive packages section where selecting a plan row swaps the left detail panel, a reverse-scrolling assurance strip, an about/facility split, a masonry stories grid, a single-open FAQ, a contact/booking form with an inline success state, and a footer. Motion is all vanilla JS respecting `prefers-reduced-motion`.

Typography pairs Fraunces (display serif, italic emphasis) with Geist (body). Plain `index.html` + `styles.css` + `main.js`; all imagery and fonts vendored locally under `assets/`.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
