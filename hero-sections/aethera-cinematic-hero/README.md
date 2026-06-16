# Aethera — Cinematic Hero

Fullscreen single-page hero section with a looping video background.
React + Vite + Tailwind CSS v4 + TypeScript.

The background video does not use the native `loop` attribute — a
`requestAnimationFrame` loop in `src/components/VideoBackground.tsx`
samples `currentTime`/`duration` every frame and drives opacity:
fade-in over the first 0.5s, fade-out over the final 0.5s, and on
`ended` it snaps to opacity 0, waits 100ms, rewinds, and replays.

Type system: Instrument Serif (display) + Inter (body), imported in
`src/styles/fonts.css`. Theme tokens and the `fade-rise` entrance
choreography live in `src/styles/theme.css`.

## Dark mode

A navbar toggle flips light/dark. Every surface paints from three palette
tokens (`--color-background`/`--color-ink`/`--color-muted`), so dark mode is
just an override of those tokens under `html.dark` in `src/styles/theme.css` —
one swap inverts the whole page, eased by a 0.5s color transition. The initial
theme is applied before first paint by an inline script in `index.html`
(stored choice in `localStorage`, falling back to the OS `prefers-color-scheme`),
so there's no flash.

## Run

```sh
npm install
npm run dev       # dev server
npm run build     # type-check + production build
npm run preview   # serve the production build
```

## Verify

A headless Playwright suite asserts every visual and behavioral spec
(fonts, colors, spacing, animations, video fade-loop lifecycle,
responsiveness) against the production build:

```sh
npm run build
node scripts/verify.mjs
```

Screenshots from the latest run are in `screenshots/` (`desktop-1440.png` light,
`dark-1440.png` dark, `mobile-390.png`).

## Demo recording

This project ships its own recorder (instead of the shared
`scripts/record-demos`) so `demo.mp4` shows the theme switch: hold light →
toggle dark → dwell → toggle back. Requires ffmpeg on `PATH`.

```sh
npm run build
node scripts/record-demo.mjs   # writes demo.mp4
```
