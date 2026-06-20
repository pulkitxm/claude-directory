# Vellum & Verdigris — Archival Apothecary & Wellness Sanctuary

A self-contained, multi-section landing page for **Vellum & Verdigris**, a fictional high-end wellness sanctuary and apothecary. The named aesthetic is **"Archival Apothecary"** — a vintage, sepia-toned, museum-catalogue feel that reads like a leather-bound ledger of forgotten healing rituals: aged paper, pressed botanicals, ink stamps, catalogue codes, and three-foot stone walls. Every decision leans print-editorial — hairline rules, catalogue numbering, tracked-out small caps, and oversized serif display type — over a warm, low-contrast paper palette with no pure black or white. Type pairs huge Playfair Display headlines, italic Instrument Serif pull-quotes, and Courier Prime monospace labels, all vendored locally.

Sections run through a fixed transparent header with a centered logo plate, a full-height two-column hero, a "Volume I" philosophy grid of numbered principles, a signature-rituals gallery with catalogue-code stamps, a split sanctuary editorial, an ink-backed memoirs/testimonials band, a booking CTA with underline-style form fields, and a four-column footer. A low-opacity SVG fractal-turbulence paper-grain overlay sits above the page and all photography is treated with a sepia, low-contrast filter.

Motion includes a staggered hero text entrance, an image reveal where a cream overlay slides up while the photo zooms out, `IntersectionObserver` scroll reveals with animated hairline under-rules, slow image zooms and italicizing titles on hover, and a hollow ink ring custom cursor on pointer-fine devices. Everything respects `prefers-reduced-motion`, and the build is vanilla HTML/CSS/JS with semantic landmarks, labelled fields, and a keyboard-operable menu.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
