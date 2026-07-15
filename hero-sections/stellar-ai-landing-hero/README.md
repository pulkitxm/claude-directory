# Stellar.ai — AI Productivity Landing Hero (React + Vite + Tailwind CSS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A single-screen, centered hero section for an AI-productivity SaaS landing page featuring a navbar, a black-to-gray gradient headline, a primary CTA, an auto-cycling tab bar with four workflow stages (Analyse, Train, Testing, Deploy), a looping background video with tab-driven overlay cards, and a company logo row — all entering with staggered fade-in-up animations. Built with React 18, Vite, Tailwind CSS 3, and Lucide icons with the Inter typeface. Generated with Claude Fable 5.

Notable techniques: custom CSS keyframe animations driven by staggered inline `animationDelay`, an auto-cycling tab state (`setInterval` advancing every 4s) and conditional overlay components keyed off the active tab — each overlay is remounted via `key` to retrigger its entrance. The four overlays (Analyse setup wizard, Train metrics panel, Testing results, Deploy checklist) sit over a looping muted autoplay video vendored locally under `public/assets/`. The color system uses only Tailwind's default palette, including the black→gray heading gradient.

## Run

```sh
npm install
npm run dev      # start the Vite dev server
npm run build    # build for production
npm run preview  # preview the production build
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.

---

Part of the [Hero sections](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
