# Interactive 3D — Spline Scene

A hero card that pairs gradient-clipped marketing copy on the left with an interactive, lazily-loaded Spline 3D scene on the right, set on a near-black card with a sweeping spotlight effect.

Built in React + TypeScript with Vite and Tailwind CSS (shadcn-style component structure). The `SplineScene` component wraps `@splinetool/react-spline` in `Suspense` with a loader fallback and lazy-imports the runtime so the heavy 3D bundle only loads when needed. The composition combines a shadcn `Card`, an Aceternity-style animated `Spotlight` (inline SVG with a Gaussian-blur filter), and the embedded Spline scene. Framer Motion is included as a dependency for the alternate spotlight variant.

## Run

```sh
npm install
npm run dev       # dev server
npm run build     # production build
npm run preview   # serve the build
npm run lint      # type-check
npm run verify    # project verification script
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
