# Emerald Glass — Glassmorphism Design System Landing Page (Vanilla JS, Inter, CSS backdrop-filter)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A sophisticated glassmorphism design-system showcase branded **Obsidian**, built as a single self-contained static page with no build step required. It transitions between a dark immersive hero (deep black, translucent glass layers with `rgba(255,255,255,0.05)` and 12–20px backdrop blur, grain overlay) and a clean light-mode feature set on soft zinc gray (`#F4F4F5`), with vibrant emerald highlights (`#34D399`) throughout. The page tiers through a floating glass navbar, a dark hero with a massive low-opacity background word and glass stat cards, a light feature grid with a floating "system analysis" panel, a dark productivity block with a 3D-transformed mock window, a bento pricing grid, and a dark footer. All animations use `fade-in-up` entries on `cubic-bezier(0.16, 1, 0.3, 1)` with 105% hover scales. Fully offline with Inter font vendored locally. Generated with Claude Fable 5.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.

---

Part of the [Templates](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
