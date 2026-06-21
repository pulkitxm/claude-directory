# Flatline — Flat Design System Marketing Page (React, TypeScript, Tailwind CSS v4, Vite)

A complete marketing page that showcases the Flatline flat design system: confident reduction, bold color blocking, geometric purity, and typography that carries the full visual hierarchy — with zero box-shadows anywhere. Solid color sections rotate White → Blue hero → Fog features → Emerald benefits → dark how-it-works → Pricing → FAQ → Amber CTA → dark footer, using color as structure rather than dividing lines. The Outfit typeface is self-hosted in `public/fonts/*.woff2` for fully offline use, and all design tokens — palette, radii, the Outfit font stack — live in a single Tailwind v4 `@theme` block in `src/index.css`. Every specified component is present: primary / secondary / outline buttons with thick `border-4` outlines that fill on hover, tinted color-block cards with icons in solid circles, a gray-to-hard-blue-border input, pill tags, multi-color stat count-ups, a scaled popular pricing tier, and a bold FAQ with thick `border-2` rules. Generated with Claude Fable 5.

## Stack

React 18, TypeScript, Vite 6, Tailwind CSS v4, Motion, lucide-react.

The **Outfit** typeface is self-hosted (`public/fonts/*.woff2`) so the project runs
fully offline — no font CDN.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

## Verify

Headless CLI verification asserts the design-system contract — no shadows on any
element, the exact palette tokens, the self-hosted Outfit font, every color block,
button/card/input/focus behaviours, the scaled pricing tier, the thick FAQ rules,
and the responsive mobile menu:

```bash
npm run build
npm run preview -- --port 4173 --strictPort &
npm run verify http://localhost:4173
# Use a specific browser binary if needed:
# CHROME_PATH=/path/to/chrome npm run verify http://localhost:4173
```

---

Part of the [UI design](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
