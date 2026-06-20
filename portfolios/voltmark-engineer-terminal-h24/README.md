# Voltmark

A single-page, dark-mode personal portfolio for a senior full-stack / systems engineer under the "Voltmark" identity. The mood is a high-contrast "developer workstation at 2am" — deepest near-black canvas, a single charged electric-yellow accent, monospace code texture, faint technical grid lines, and soft yellow glow bloom, deliberately avoiding generic SaaS gradients. Type is Space Grotesk display, Inter body, and JetBrains Mono for code/labels (all self-hosted), with VS Code-style syntax token colors for code blocks.

Sections run a fixed header, a hero with a mouse-following blurred yellow blob and inline floating "code chip" pills, a tech marquee, an about column beside a typewriter live-terminal window, a filterable projects grid (with rendered code-snippet previews), an experience accordion with animated skill bars, a numbered services grid, an FAQ accordion, and a contact footer with a form. Vanilla JS drives the IntersectionObserver reveals, the eased blob parallax, floating animations, the terminal typewriter, count-up counters, the marquee, and the project filters.

Static build (HTML + CSS + vanilla JS), all assets vendored locally, runs fully offline.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
