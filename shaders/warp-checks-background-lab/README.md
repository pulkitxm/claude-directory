# Warp Checks Background Lab — Animated Checks-Warp GLSL Background with Live Console (React + @paper-design/shaders-react + Tailwind CSS v4)

A full-viewport animated checks-warp shader background using `@paper-design/shaders-react`'s `<Warp shape="checks" />` component, integrated in a shadcn/Tailwind/TypeScript project and wrapped in a live instrument console. The `<Warp>` element runs fixed in a `fixed inset-0 -z-10` layer behind glassy, backdrop-blurred content; a live console lets you dial every shader prop in real time, switch between three Warp shapes, apply mood presets, and reset to the prompt's exact verbatim configuration. A telemetry strip reads live FPS and frame count off `requestAnimationFrame`. Generated with Claude Fable 5.

## What it does

- **Fixed, full-viewport shader background** — one `<Warp>` in a
  `fixed inset-0 -z-10` layer (verbatim from the prompt) paints the whole page
  behind glassy, backdrop-blurred content.
- **Live Warp console** — every continuous uniform the prompt lists is a fader:
  `proportion`, `softness`, `distortion`, `swirl`, `swirlIterations`,
  `shapeScale`, `scale`, `rotation`, `speed`. A segmented selector switches the
  Warp `shape` (`checks` / `stripes` / `edge`), and four mood presets (**Prism**
  — the prompt's verbatim blue·violet·green·purple checks — plus Tide, Ember,
  Obsidian) re-tint and re-shape the same component. Touch anything and the page
  background updates in real time.
- **Props, live vs prompt** — a `<Warp>` props/API table whose "Live" column
  tracks the current background and whose "Prompt" column shows the brief's
  verbatim default, so any drift is visible at a glance. **Reset to prompt**
  returns every prop to the literal starting values.
- **shadcn integration write-up** — how to scaffold Vite + TypeScript + Tailwind
  v4 + shadcn from scratch, why `@/components/ui` is the path that matters, the
  one install step, the steps-to-integrate, and the brief's "Questions to Ask"
  answered.
- **Live telemetry** — a strip reads real FPS / frame count / uptime off
  `requestAnimationFrame` and echoes the shader speed, so you can see the
  background is genuinely running, not a still.

## The component, verbatim

`src/components/ui/background-shaders.tsx` is the prompt's component
(JSX corrected) and `src/components/ui/demo.tsx` is the prompt's example usage
(`<Wrapper/>`). The adjustable lab UI lives separately under
`src/components/lab/` so the drop-in files stay close to the brief.

## Stack

React 19, TypeScript, Vite 7, Tailwind CSS v4, `@paper-design/shaders-react`
(pinned `0.0.76`), `lucide-react`.

## Design

| Token | Value |
|-------|-------|
| Background (fallback) | `#05070b` |
| Glass panels | `bg-black/35` + `backdrop-blur-xl`, `border-white/15` |
| Ring / accent | `hsl(203, 100%, 62%)` (the prompt's sky-blue Warp stop) |
| Live status | `emerald-300` |
| Type | Geist Sans + Geist Mono (vendored locally) |

Signature: legible, glassy UI floated directly on the moving checks-warp field —
a frosted control deck, a live props ledger, an integration brief, and a vertical
engraved side rail (the prompt's empty `left-8 top-1/2` slot) that reads the
shader's live coordinates.

## Assets

The shader is **fully procedural** — no images or textures. The **Geist Sans**
and **Geist Mono** variable fonts are **vendored locally** under
`assets/fonts/*.woff2` and bundled by Vite, so the project runs entirely offline
with no CDN or remote font calls. Icons are `lucide-react`; the favicon is an
inline local SVG. The only remote reference anywhere is a single informational
link to `github.com/paper-design/shaders`.

## Run

```bash
npm install
npm run dev       # dev server
npm run build     # type-check (tsc -b) + production build
npm run preview   # serve the production build
npm run verify    # headless Playwright checks (boots its own dev server)
```

`npm run verify` boots a dev server, drives a headless Chromium with software
WebGL, and asserts: the lab wordmark + hero render, the prompt's exact config is
surfaced (shape `"checks"`, proportion `0.45`, all four HSL stops), the `<Warp>`
shader paints a live full-viewport WebGL canvas, the speed fader sweeps
`0 → 3`, switching a preset re-tints the palette, reset restores the prompt
palette, and no page/console errors fire.

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
