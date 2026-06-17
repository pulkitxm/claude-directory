# Landing Page — Copy Machine Setup

A precision-scaffolded **Vite + React + TypeScript** landing-page project, built
to an exact specification as the foundation for a strict "copy machine" workflow:
the user supplies component code later and it gets transcribed **character for
character** — no theme adaptation, no redesigns, no value changes — and stacked
into `App.tsx`.

This folder is the **initial project setup** for that workflow. Per the prompt's
final instruction, the build stops at the scaffold and waits for the first
component before any UI is added, so `App.tsx` is the empty stacking shell
exactly as the prompt dictates.

> "Your job is to be a COPY MACHINE, not a designer."

## Tech stack (fixed by the prompt — not to be changed)

- **Vite + React**
- **TypeScript**
- **Tailwind CSS** + `tailwind-merge` + `clsx`
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

## What the setup gives you

- **`@/` path alias → `/src/`**, wired in both `vite.config.ts` (`resolve.alias`)
  and `tsconfig.json` (`baseUrl` + `paths`), so `import { cn } from "@/lib/utils"`
  resolves everywhere.
- **`cn()` utility** in `src/lib/utils.ts` — `twMerge(clsx(inputs))` for safe,
  conflict-resolving Tailwind class composition.
- **Tailwind base styles** in `src/index.css` (`@tailwind base/components/utilities`
  plus antialiased font smoothing on `body`).
- **Entry point** `src/main.tsx` mounting `<App />` in `React.StrictMode`.
- **Empty stacking shell** `src/App.tsx` — a `relative min-h-screen flex flex-col`
  `<main>` where components will be stacked.
- **`src/components/ui/`** — the destination directory for every future component.

The "copy machine" rules from the prompt (preserve every className, color, hex,
number, and structure verbatim; ignore global themes; never redesign; translate
only `/components/ui/ → /src/components/ui/`, `/app/page.tsx → /src/App.tsx`,
`/lib/utils → /src/lib/utils`; keep any `"use client"`) govern how components get
added later.

## Run it

```bash
npm install
npm run dev        # Vite dev server
npm run build      # tsc type-check + production build
npm run preview    # preview the production build
```

Node 18+ recommended. No external assets — the project is fully self-contained.

## Verification

- `npm install` — dependencies resolve cleanly.
- `npm run build` (`tsc && vite build`) — the project type-checks and builds with
  no errors.
- The `@/lib/utils` alias resolves and `cn()` composes Tailwind classes correctly
  (checked with a small Node/Vite resolution test).
- `demo.mp4` — a recording of the running dev server (the blank stacking shell,
  exactly as the prompt specifies at this stage).
