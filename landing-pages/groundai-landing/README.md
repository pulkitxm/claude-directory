# GroundAI — Interior Design AI Landing Page (TanStack Start, React 19, TypeScript, Tailwind v4, Framer Motion)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A single-page landing page for GroundAI, an interior-design AI product, built with TanStack Start v1 on file-based routing, React 19, TypeScript, Tailwind CSS v4, framer-motion for all animation, and lucide-react for icons. The page is composed of four stacked sections: a full-bleed autoplaying video hero with spring-animated header, expanding glass nav pill, and word-by-word animated description; a CSS marquee of partner brand wordmarks; a CraftExperiences section with a spring-driven style carousel, a skeleton-morphing chat card, and a staggered adaptable list; and a two-column testimonials block with animated word reveals. Generated with Claude Fable 5.

## Stack

- TanStack Start (`@tanstack/react-start`) on file-based routing (`src/routes/index.tsx`)
- Tailwind CSS v4 via `@tailwindcss/vite`
- framer-motion for all animation
- lucide-react for the mobile menu icons

## Assets

Every image and the hero video are vendored locally under `public/assets/` and referenced
exclusively through the single `A` object in `src/lib/assets.ts`. The original remote source
(`https://qclay.design/lovable/groundai`) is recorded in `REMOTE_BASE` for provenance, but the
running app loads only local files, so it works fully offline.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # client + SSR + Nitro node-server bundle
npm run start    # serve the production build
```

## Verify

```bash
npm run typecheck   # tsc --noEmit
```

A walkthrough recording lives at [`demo.mp4`](./demo.mp4).

---

Part of the [Landing pages](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
