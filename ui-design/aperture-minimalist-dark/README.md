# Aperture — Minimalist Dark

A landing page built to express the "Minimalist Dark" design system: atmospheric depth created not through color saturation but through carefully orchestrated layers of darkness. At least three distinct slate tones stack (`#0A0A0F` → `#12121A` → `#1A1A24`), with a single warm amber accent (`#F59E0B`) glowing like an ember against the cool dark. Built with Vite, React, TypeScript, and Tailwind CSS, with Lucide icons.

The aesthetic leans on its signature ambient glow effects (soft blurred glows behind key elements and massive 100–150px blurred background orbs), glass-effect cards (semi-transparent at 0.6 opacity with 8px backdrop blur and 8%-opacity borders), and geometric typography (Space Grotesk for display, Inter for body). Spacing is deliberately generous, motion is smooth and subtle (200–300ms ease-out, with card scale-up and button press micro-interactions), and all focus states use the amber accent for brand-coherent accessibility.

## Run

```sh
npm install
npm run dev      # start the Vite dev server
npm run build    # type-check (tsc -b) and build for production
npm run preview  # preview the production build
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
