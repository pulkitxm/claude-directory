# Voltline

A single-page, multi-section personal portfolio / digital resume for a senior software engineer, staged as a loud, printable neo-brutalist broadsheet on warm cream "paper" with a faint orange dot-grid. Everything is defined by thick ink-black outlines, hard no-blur offset drop shadows, high-contrast orange-on-ink blocks, and a few deliberately skewed bands that tilt the layout just enough to feel hand-set — no soft gradients, no pillowy rounded cards, no shadow blur.

Display type is Bebas Neue (the giant hero name, section titles, big stat numbers), with Space Grotesk for labels/buttons and Inter for body (all self-hosted). The sticky header's "DOWNLOAD" button triggers `window.print()`, and the resume scrolls through a full-viewport hero and the engineer's work, stack, and education sections in printable broadsheet order.

Plain static build (HTML + CSS + a small vanilla JS file), all assets vendored locally, runs fully offline.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
