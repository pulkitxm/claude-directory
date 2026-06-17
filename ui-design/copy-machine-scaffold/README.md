# copy-machine-scaffold

The **setup phase** of a single-page landing-page build, scaffolded to an exact
specification (a "copy machine" base — components arrive verbatim in later turns
and stack into `App.tsx`). This is the foundation that UI components get stacked into later —
`src/App.tsx` is intentionally an empty `<main>` shell with a
`{/* Components will be stacked here */}` placeholder, exactly as the prompt
([`prompt.md`](./prompt.md)) dictates.

Part of the [claude-directory](../../README.md) (category: **UI Desgin**).

## Stack

- **Vite + React** (React 18, `@vitejs/plugin-react`)
- **TypeScript** (strict)
- **Tailwind CSS** + **tailwind-merge** + **clsx** (merged via the `cn()` helper)
- **Framer Motion** — animations
- **Lucide React** — icons

## Project structure

Exactly the structure the prompt specified:

```
landing-page-scaffold/
├── index.html
├── vite.config.ts          # @/ → ./src alias
├── tsconfig.json           # baseUrl + paths for @/*
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── components/
    │   └── ui/             # ← all UI components go here
    ├── lib/
    │   └── utils.ts        # cn() utility
    ├── App.tsx             # main landing page (components stack here)
    ├── main.tsx            # entry point
    └── index.css           # Tailwind base styles
```

The `@/` path alias resolves to `./src/`, so components import the utility as
`import { cn } from "@/lib/utils"`.

## The `cn()` utility

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

`clsx` resolves conditional/array/object class inputs; `tailwind-merge` then
de-duplicates conflicting Tailwind utilities (e.g. `cn("py-2", "py-1")` → `py-1`).

## Run it

```bash
npm install
npm run dev        # Vite dev server
npm run build      # tsc -b && vite build  (type-checked production build)
npm run preview    # preview the production build
```

## Verification

A CLI-only check (`node scripts/verify.mjs`) bundles the source against the real
Vite config and asserts, with no browser or GUI:

1. the `@/` alias resolves to `./src/` (imports `cn` through `@/lib/utils`);
2. `cn()` merges and de-duplicates conflicting Tailwind classes;
3. `App.tsx` renders the exact `<main className="relative min-h-screen flex flex-col">`;
4. **framer-motion** and **lucide-react** are installed and render server-side;
5. every file exists at its spec'd path.

```bash
npm run build            # type-checks + builds for production
node scripts/verify.mjs  # asserts the scaffold contract
```

This project is fully self-contained — all dependencies are npm packages with no
external/CDN assets, so it clones and runs offline.
