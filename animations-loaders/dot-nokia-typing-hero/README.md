# dot. — Nokia Typing Hero Landing Page (React 19 + Tailwind CSS v4 + Motion)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A single-screen React landing page for "dot.", a calm-messaging product: a full-bleed background video of a Nokia-style phone with a live typewriter animation rendered in an authentic Nokia Cellphone FC font layered precisely over the in-video phone screen, cycling through short messages. Features a glassmorphic pill navbar with backdrop-blur and custom cubic-bezier entrance animations. Built with React 19, Tailwind CSS v4, and Motion. Generated with Claude Fable 5.

The page is built in React 19 with Tailwind CSS v4 (single `@import "tailwindcss"` entry) and Motion (`motion/react`). The typewriter is a hand-rolled `useState`/`useEffect`/`setTimeout` effect (type at 100ms/char, 2s pause, delete at 50ms/char, advance) with a blinking cursor. A floating glass pill navbar with a backdrop-blur sits at top, and the headline/sub-headline fade and scale in with custom cubic-bezier eases. Typography pairs Instrument Serif (display) and Inter (UI) over a warm `#F3F4ED` canvas with a `#0871E7` CTA.

## Run

```sh
npm install
npm run dev       # dev server
npm run build     # production build
npm run preview   # serve the build
npm run verify    # project verification script
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.

---

Part of the [Animations & loaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
