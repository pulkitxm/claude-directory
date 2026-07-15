# Cathedral Raymarch Shader — Full-Screen WebGL2 Raymarching Fragment Shader (React + Vite + Tailwind + shadcn/ui)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A full-screen WebGL2 fragment shader using Shadertoy-style raymarching through a folded distance field to produce soft, vaulted, cathedral-like light volumes that drift over time — integrated as a shadcn/ui drop-in component with a self-contained React runtime. The compact GLSL loop steps a ray through nested `sin`/`cos` geometry, accumulates depth-weighted color from a `sin(p.y + …)` palette, and tone-maps with `tanh`, making it an atmospheric animated background for hero sections or dark landing pages. Generated with Claude Fable 5.

## Run

```sh
npm install
npm run dev       # dev server
npm run build     # type-check + production build
npm run preview   # serve the production build
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
