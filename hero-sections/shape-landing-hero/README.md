# Shape Landing Hero — Animated Geometric Shapes Hero Component (React + Vite + Framer Motion + Tailwind CSS v4 + shadcn/ui)

[![Watch Demo](./poster.jpg)](./demo.mp4)

An integration of the `HeroGeometric` component from Kokonut UI — five blurred, gradient-filled shapes drift behind a gradient-clipped headline on a near-black `#030303` canvas, all driven by Framer Motion. The component is dropped into a proper shadcn/ui project structure and wrapped in a landing experience (floating navbar, CTAs, a live props playground, feature grid, install band) that showcases it above the fold. This animated hero section is an ideal starting point for dark-themed SaaS, design tool, or portfolio landing pages. Generated with Claude Fable 5.

## Stack

- Vite + React 19 + TypeScript (strict)
- Tailwind CSS v4 (`@tailwindcss/vite`)
- `framer-motion` (animation), `lucide-react` (icons)
- `clsx` + `tailwind-merge` (the shadcn `cn` helper), `class-variance-authority`

## Run

```sh
npm install
npm run dev      # dev server
npm run build    # type-check + production build
npm run verify   # headless Playwright checks against the production build
```

`npm run verify` boots `vite preview`, asserts every observable prompt
requirement (the integrated component renders with the demo props, the five
animated shapes, the gradient headline, the badge, responsive type scaling, the
interactive playground, no console errors), and saves desktop + mobile
screenshots to `screenshots/`.

---

## Integration notes (answering the prompt)

### Does the codebase support shadcn / Tailwind / TypeScript?

Yes — this project is configured for all three out of the box. If you are
starting from scratch, here is the setup the component expects:

```sh
# 1. A TypeScript React app (Vite shown here; Next.js works too)
npm create vite@latest my-app -- --template react-ts
cd my-app

# 2. Tailwind CSS v4
npm install tailwindcss @tailwindcss/vite
#    then add `tailwindcss()` to vite.config plugins and `@import "tailwindcss";`
#    to your global stylesheet.

# 3. Initialise shadcn/ui (creates components.json + @/lib/utils with cn())
npx shadcn@latest init

# 4. The component's runtime dependencies
npm install framer-motion lucide-react
#    (shadcn init already adds clsx + tailwind-merge for cn)
```

### Default paths for components and styles

`components.json` (the shadcn config) declares the defaults used here:

| Alias        | Path                  |
| ------------ | --------------------- |
| `components` | `@/components`        |
| `ui`         | `@/components/ui`     |
| `utils`      | `@/lib/utils`         |
| styles (css) | `src/index.css`       |

The `@` alias resolves to `src/` via both `vite.config.ts` (`resolve.alias`) and
`tsconfig.json` (`compilerOptions.paths`).

### Why `/components/ui` matters

shadcn's convention is that every primitive lives in **`components/ui`**. The
component imports its sibling/helpers with that exact path
(`@/components/ui/shape-landing-hero`, `@/lib/utils`). Keeping that folder means:

- the `npx shadcn@latest add <name>` CLI drops new primitives in the right place
  with zero edits;
- the documented import paths in pasted snippets just work;
- UI primitives stay separated from your app-specific composition components.

If your project does not have it yet, create `src/components/ui/` and paste the
component there before importing it.

### Component API — what props are passed?

`HeroGeometric` is presentational and fully prop-driven (no global state, no
context, no required assets):

| Prop     | Type     | Default                          |
| -------- | -------- | -------------------------------- |
| `badge`  | `string` | `"Design Collective"`            |
| `title1` | `string` | `"Elevate Your Digital Vision"`  |
| `title2` | `string` | `"Crafting Exceptional Websites"`|

This integration renders it with the demo's values
(`badge="Kokonut UI"`, `title1="Elevate Your"`, `title2="Digital Vision"`), and
the **Playground** section lets you edit all three live.

### State management

None required. The only stateful bits are local UI niceties added around the
component (the navbar scroll/menu state and the playground's `useState` for the
prop inputs). The unused `useMotionValue / useTransform / animate / useEffect /
useState` imports from the original snippet were removed so the file compiles
under the repo's strict `noUnusedLocals` TypeScript config; the rendered output
is identical.

### Required assets

The component itself needs **no images** — the visuals are pure CSS gradients +
Framer Motion + one `lucide-react` `Circle` icon. The prompt suggested filling
image slots with Unsplash photos, but `images.unsplash.com` is not reachable from
this sandbox's network allowlist, so rather than hotlink a remote URL the
supporting sections use self-contained CSS gradient art and the **fonts (Inter,
Instrument Serif) are vendored locally** under `src/assets/fonts/`. The result is
fully offline-runnable.

### Responsive behavior

Mobile-first. Headline scales `text-4xl → text-6xl → text-8xl` (36 → 60 → 96 px),
shapes reposition at the `md:` breakpoint, and the navbar collapses to a
hamburger menu under `md`. Verified at 1440×900 and 390×844.

---

Part of the [Hero sections](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
