# Superdesign Red Noir — AI Design Tool Landing Page (TanStack Start + React 19 + Tailwind v4)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A pixel-faithful recreation of the "Red Noir" Superdesign AI design tool landing page, built with **TanStack Start v1**, **React 19**, **TypeScript**, **Tailwind v4**, and **lucide-react** — a dark maroon-and-red hero landing page with parallax starfields, animated gradients, and a bento feature grid. Generated with Claude Fable 5.

The page is one scrolling document composed of stacked sections, in order:

1. **Hero** — pill badge with a pinging red dot, gradient-clipped `Design Intelligence
   / for the Future` headline (with a hand-drawn underline SVG under "Future"), the
   signature conic-gradient **shiny CTA**, a "View on GitHub" secondary button, and an
   "Integrated with" logo strip (OpenAI, Figma, React, Vercel, Stripe). Elements
   stagger in with a `fade-in-up` keyframe.
2. **Features** — a 4-card bento grid (`lg:h-[700px]`): a 2×2 "Generative UI Systems"
   main card with a hover "EXPLORE FEATURE" footer, "Code Export", "Smart Iteration",
   and "Team Sync", each with a per-card radial color glow on hover.
3. **Testimonial** — a full-bleed `#ef233c` banner with five black stars and the Alex
   Morgan / CPO at TechFlow quote.
4. **Pricing** — three tiers (Starter $0, **Pro $49** featured with a RECOMMENDED pill
   and red glow, Team $199) with `lucide:check` feature lists.
5. **Waitlist** — a `Ready to Build?` CTA with an email capture form (visual only).
6. **Footer** — Platform / Company link columns and a giant `15vw` outlined
   `SUPERDESIGN` text-stroke wordmark.

## Global background

A fixed, behind-everything layer: a `#1a0505 → black` maroon glow, **two parallax
box-shadow starfields** drifting upward (`animStar` at 50s / 80s), a centered 800×800
red radial glow, and a faint masked 40px grid. A fixed top gradient-blur header masks
the page edge.

## Stack

- TanStack Start (`@tanstack/react-start`), file-based routing (`src/routes/index.tsx`),
  helper components in `src/components/`
- Tailwind CSS v4 via `@tailwindcss/vite`
- lucide-react for all icons
- Custom CSS (`src/styles.css`): `@property --gradient-angle`, the `border-spin`,
  `fade-in-up`, `animStar`, and `shimmer` keyframes, the `.shiny-cta`, `.stars-1/2`,
  `.gradient-blur`, `.text-stroke`, and red `::selection`

## Assets

The **Manrope** (200/400/600/700/800) and **Inter** (300/400/500/600) webfonts are
vendored locally as woff2 under `public/fonts/` and declared via `@font-face`, so the
page renders offline with no Google Fonts request.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # client + SSR + Nitro node-server bundle, then tsc --noEmit
```

## Verify

```bash
npm run typecheck   # tsc --noEmit
```

A walkthrough recording lives at [`demo.mp4`](./demo.mp4).

---

Part of the [Templates](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
