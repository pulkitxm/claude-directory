# Mainframe Contact Hero

An interactive contact-page hero for the fictional studio **Mainframe®**, built with React 18,
TypeScript, Tailwind CSS, and Framer Motion (`motion/react`).

## Highlights

- **Mouse-scrubbed background video** — on desktop (≥1024px) the clip never autoplays; horizontal
  mouse movement seeks through it, throttled via the `seeked` event so frames track the cursor
  smoothly. Below 1024px it falls back to muted looping autoplay.
- **Typewriter headline** — a custom `useTypewriter(text, speed, startDelay)` hook reveals
  "we'd love to / hear from you!" with a blinking block cursor (`@keyframes blink`).
- **Multi-select service pills** — Brand / Digital / Campaign / Other toggle with a spring-mounted
  check icon, and an `AnimatePresence mode="wait"` status banner that springs open with the
  joined selection ("Ready to inquire about: …") and a "Let's Go" CTA.
- **Responsive navbar** — desktop links with comma dividers, and a hamburger that morphs into an X
  while a blurred full-screen overlay fades in.

## Commands

```bash
npm install
npm run dev      # vite dev server
npm run build    # tsc --noEmit && vite build
npm test         # vitest unit tests (jsdom)
npm run verify   # headless Playwright E2E against vite preview
```
