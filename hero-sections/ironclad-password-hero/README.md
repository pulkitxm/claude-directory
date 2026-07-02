# Ironclad — Password Manager Hero Section (React 18 + TypeScript + Framer Motion + Tailwind CSS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A single-screen landing page hero section for a password manager called Ironclad, featuring a full-viewport looping background video, a responsive navbar with a slide-in mobile sheet menu, and a centered hero block with an inline-icon headline, subtext, and a pill CTA whose elements fade up in sequence on load. The design uses Helvetica Now Display Bold for headings, Inter for body text, and a purple accent (`#7342E2`) for CTAs. Built with React 18, TypeScript, Vite, Tailwind CSS 3, and Framer Motion. Generated with Claude Fable 5.

- Full-viewport looping background video
- Geometric SVG logo + navbar (desktop links/pills, mobile hamburger)
- Framer Motion slide-in mobile menu (backdrop blur + staggered links)
- Animated hero: inline-icon headline, subtext, "Get It Free" CTA with shared `fadeUp` variants

## Run

```sh
npm install
npm run dev      # dev server
npm run build    # tsc + vite build
npm run preview  # serve dist on :4173
```

## Verify (headless, CLI-only)

```sh
npm run build && npm run preview &
node scripts/verify.mjs
```

Runs 50 Playwright checks across desktop (1440×900) and mobile (390×844): video attributes, CSS variables, fonts, navbar, hero styles, entrance animations, and the mobile menu open/dismiss flow. Screenshots land in `screenshots/`.

---

Part of the [Hero sections](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
