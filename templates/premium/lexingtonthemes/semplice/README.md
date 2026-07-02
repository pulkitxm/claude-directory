# Semplice — Minimal Photography Portfolio Template Clone (Vanilla HTML/CSS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A pixel-faithful static clone of the Lexington Themes "Semplice" template — a minimal, editorial photography portfolio spanning three pages: home (gallery listing), gallery detail, and a design-system overview. The implementation uses plain HTML and a single shared CSS file with custom properties; no build step, no framework, no JavaScript runtime. Typography pairs Inter (sans-serif) with Newsreader (serif) against a warm neutral palette (`#dedad0` gallery tan, `oklch(95.81% 0 0)` warm white) with sharp zero-radius edges throughout. Standout details include a full-width SVG wordmark that anchors both the top and footer of the home page, a responsive six-column editorial image grid on the gallery detail page, and CSS custom-property design tokens covering the complete `base-*` and `gallery-*` color scales.

## Pages

| File | Description |
|---|---|
| `index.html` | Home — full-width "Semplice" SVG wordmark, four-column editorial nav, single gallery image |
| `gallery/posts/1/index.html` | Gallery detail — 5-image responsive CSS grid on warm tan background |
| `system/overview/index.html` | Design-system overview — links to all pages/components in a four-column grid |

## Run

No build step required. Open `index.html` directly in a browser, or serve the folder over HTTP:

```sh
python3 -m http.server
# then open http://localhost:8000
```

## Source notes

- `styles.css` — all design tokens (fonts, palette, spacing, transitions) and layout utilities shared across the three pages
- `assets/images/` — six vendored `.webp` images
- `prompt.md` holds the full build specification; `demo.mp4` shows the template in motion

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Lexington Themes — https://lexingtonthemes.com/viewports/semplice

---

Part of the [Lexington Themes](../) provider collection in [Templates](../../) — browse all templates in the [claude-directory](../../../README.md).
