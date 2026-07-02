# Neo-Brutalist Acid — Bold Store Template (HTML + CSS + JS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A single-page, self-contained store landing page built on a bold neo-brutalist design system with an "acid" palette: a paper-like background (`#F8F4E8`), ink-black primary elements (`#09090B`), and a signature acid yellow-green accent (`#D2E823`) — a high-contrast e-commerce template with hard offset shadows and no blur effects. Generated with Claude Fable 5.

Every card and button carries a 2px solid black border and a hard, zero-blur offset shadow. Typography pairs the ultra-heavy Dela Gothic One for display headings with the technical Space Grotesk for body text. The layout uses modular sections: a sticky blurred nav pill, an acid marquee band, a 12-column hero with a glitch-on-hover headline and floating asset card, a bento category grid, a horizontal-scrolling "New Drops" product rail (with a grayscale "sold out" state), and an inverted dark footer with a newsletter signup. Micro-interactions include a glitch text effect (rapid ±2px jitter), a continuous 20s marquee loop, floating accent cards, hard-shadow buttons that translate `[2px, 2px]` and lose their shadow on press, and a custom `mix-blend-difference` cursor with smooth lerp follow.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.

---

Part of the [Templates](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
