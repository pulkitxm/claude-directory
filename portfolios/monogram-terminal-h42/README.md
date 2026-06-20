# Monogram Terminal

A single-page, forced-dark personal portfolio for a fictional full-stack / systems developer (Ren Okada) in a "Monochrome Terminal Editorial" design language — a strictly greyscale, near-black canvas that reads like a code editor and a finely-set print magazine fused together. There is no hue anywhere: the palette is black, white, and grey, with white itself as the only accent, so typography and spacing do all the talking. A narrow centered column is framed by hairline vertical borders, with monospace section labels formatted like file paths (`~/work`, `cd projects/`) and a faint film-grain / scanline overlay.

Type is JetBrains Mono for display and labels, Inter for body, and Merriweather italic for pull-quote emphasis. Sections run a sticky blurred header, a mono hero with social chips, an auto-advancing cross-fading featured slider, about, four-up stack cards, a work timeline, projects, a paginated articles grid, and a contact footer. Vanilla JS drives the fade-rise reveals, the slider (auto-advance, pause-on-hover, animating dots), grayscale→color hovers, and a slide-in mobile menu — respecting `prefers-reduced-motion`.

Self-contained static build, all fonts and imagery vendored locally, runs fully offline.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
