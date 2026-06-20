# Botanical / Organic Serif

A landing page built to express the "Botanical / Organic Serif" design system — a digital ode to nature that is soft, sophisticated, and deeply intentional. It rejects rigid hyper-digital sharpness in favor of warmth and tactility: an earthbound palette drawn from forest floors and clay pottery (warm alabaster `#F9F8F4` background, deep forest-green foreground `#2D3A31`, sage `#8C9A84`, terracotta `#C27B66`) and typography as the protagonist — Playfair Display headlines with italic emphasis, paired with Source Sans 3 for body. Built with Vite, React, TypeScript, and Tailwind CSS, with Lucide icons.

Bold choices define it: arch-shaped imagery via clip-path / border-radius, highly rounded corners (`rounded-3xl`, pill buttons), a staggered grid where alternating cards translate vertically for an organic rhythm, and a mandatory fixed SVG paper-grain overlay at `opacity-0.015` that turns flat pixels into warm, tactile surfaces. Motion is slow and fluid (durations 300–700ms, ease-out) — card lifts, luxurious image scales, and gentle fade-up scroll reveals.

## Run

```sh
npm install
npm run dev      # start the Vite dev server
npm run build    # type-check (tsc --noEmit) and build for production
npm run preview  # preview the production build
npm run verify   # run the project's verify script
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
