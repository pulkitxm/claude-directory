# Mainframe® — A.R.I.A Hero

Full-screen hero landing page for the fictional creative agency **Mainframe**, fronted by
**A.R.I.A** (Adaptive Response Interface Agent). Built with React, TypeScript, Vite, and
Tailwind CSS.

## Highlights

- **Mouse-scrub background video** — the fixed full-screen video never autoplays; horizontal
  mouse movement scrubs the timeline forward/backward, with seeks serialized through the
  `seeked` event to avoid seek-flooding.
- **Blurred A.R.I.A intro label** plus a character-by-character **typewriter line** with a
  blinking cursor (custom `useTypewriter` hook).
- **Action pills** that fade/slide in 400ms after load, including an outline pill that copies
  `hello@mainframe.co` to the clipboard.
- **Responsive navbar** with desktop links and an animated hamburger + full-screen mobile
  overlay.
- Helvetica Now Display webfonts wired through `--font-heading` / `--font-body` CSS variables.

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build
npm run verify   # headless Playwright behavior checks (build first)
```
