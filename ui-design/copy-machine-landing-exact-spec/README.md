# copy-machine-landing-exact-spec

The **scaffold / setup phase** of a multi-turn landing-page experiment.

The prompt (preserved verbatim in [`prompt.md`](./prompt.md)) is a strict
"copy machine" brief: stand up a single-page landing-page project to an **exact**
specification first, then — in later turns — paste in component code that must be
reproduced character-for-character (no theme adaptation, no redesigns, no value
changes). This folder is the result of that setup phase: the project skeleton,
configured exactly as specified and verified to build and run, with an empty
`App.tsx` ready for components to stack into.

## Stack (exactly as specified, do not change)

- **Vite + React** (`@vitejs/plugin-react`, React 18)
- **TypeScript**
- **Tailwind CSS** (classic `@tailwind base/components/utilities` directives) +
  **tailwind-merge** + **clsx** (via the `cn()` helper)
- **Framer Motion** (animations)
- **Lucide React** (icons)

## Folder structure

```
/src
  /components
    /ui               ← All UI components go here
  /lib
    utils.ts          ← cn() utility function
  App.tsx             ← Main landing page (components stack here)
  main.tsx            ← Entry point
  index.css           ← Tailwind base styles
```

## Path alias

`@/` resolves to `/src/` in both `vite.config.ts` (Vite `resolve.alias`) and
`tsconfig.json` (`baseUrl` + `paths`), so components can import e.g.
`import { cn } from "@/lib/utils"`.

## Run it

```bash
npm install
npm run dev        # start the Vite dev server
npm run build      # type-check (tsc --noEmit) + production build
npm run verify     # automated CLI verification (see below)
```

## Verification

`npm run verify` (`scripts/verify.mjs`) is CLI-only — no GUI — and asserts that
the scaffold matches the brief:

1. Every required file exists at its exact path (incl. `src/components/ui/`).
2. `src/lib/utils.ts`, `src/index.css`, `src/main.tsx` and `src/App.tsx` match
   the specified source **character-for-character**.
3. The `@/` → `/src/` alias is configured in `vite.config.ts` **and**
   `tsconfig.json`.
4. The required dependencies (framer-motion, lucide-react, clsx, tailwind-merge,
   tailwindcss, react, vite, typescript) are all declared.
5. `npm run build` succeeds and emits `dist/` with compiled Tailwind CSS.
6. In a real headless Chromium: the dev server boots, the page renders the exact
   `<main class="relative min-h-screen flex flex-col">`, Tailwind is actually
   applied (`min-h-screen` ⇒ full viewport height), `@/lib/utils`'s `cn()`
   resolves through the alias at runtime, and there are **no** console/page
   errors.

A `demo.mp4` walkthrough (recorded with the repo's `scripts/record-demos`
recorder) sits alongside this README.
