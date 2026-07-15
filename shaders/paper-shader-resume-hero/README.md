# Jessi.cv — Paper Shader Resume Hero with Dithering (React + Vite + Tailwind CSS v4 + paper-design/shaders-react)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A shadcn `components/ui` integration of a split-screen designer résumé hero whose right half is a live **`Dithering`** shader from `@paper-design/shaders-react`. The component drops in verbatim and the surrounding page frames it as a **darkroom proof**: the as-shipped component sits in a crop-marked plate, an "ink console" promotes every shader prop to a live fader, and a documentary dock explains installation, placement in `components/ui`, and each `Dithering` prop. A perfect portfolio hero or "about" splash with a procedural ink visual — no stock photography required. Generated with Claude Fable 5.

## The proof, as-shipped

The hero is the **unmodified component** (`<ResumePage />`). It owns its own
internal `isDarkMode` state (the prompt's `useState`), so its light/dark toggle
flips the CV between black-on-white and white-on-black while the dither swaps
between magenta (dark) and cyan (light) ink — independently of the studio
chrome's own theme. It's mounted in a contained, crop-marked plate rather than
left full-bleed, so it reads as a press proof.

> **One integration fix.** The pasted component set `shape="cat"`, which is not
> a valid `DitheringShape` in `@paper-design/shaders-react@0.0.76` (the union is
> `simplex · warp · dots · wave · ripple · swirl · sphere`). It fails the strict
> TypeScript build and renders an empty field at runtime, so it's corrected to
> the package's own default, **`sphere`**. The fix is flagged inline in the
> component and in the integration notes.

## Ink console — the same shader, on the faders

A second live `Dithering` stage is wired to a control rack so you can feel the
shader before shipping it. Every control writes straight to a real prop:

| Control | Prop | Range |
|---------|------|-------|
| **px size** fader | `pxSize` | `1 – 8` |
| **scale** fader | `scale` | `0.2 – 1.6` |
| **speed** fader | `speed` | `0 – 1×` |
| **bayer matrix** | `type` | `random · 2x2 · 4x4 · 8x8` |
| **shape** tiles | `shape` | `simplex · warp · dots · wave · ripple · swirl · sphere` |
| **ink pair** swatches | `colorBack` / `colorFront` | five named pairs |

The shape/type lists are **derived from the real exported unions**, so they can
never drift from the package. The telemetry strip mirrors the live props plus a
real `requestAnimationFrame` `fps`, the active ink's parsed luminance, and an
estimated coverage from the dither matrix + scale. (paper-shaders renders into a
non-preserved WebGL buffer, so post-composite `readPixels` returns zeros — the
screenshot-based CLI verifier is what proves the shader is genuinely painting.)

## Applied in context

A small "team" gallery shows the component's idea reused as portfolio cards. To
keep the project **fully offline** (no remote image dependency), every portrait
is the Dithering shader itself rather than stock photography — different shape
and ink per face.

## Integrating it into your own project

The codebase must support a **shadcn project structure**, **Tailwind CSS** and
**TypeScript**. This project ships all three (Vite + React 19, Tailwind v4,
strict TS) with a `components.json` aliasing `ui → @/components/ui`.

```bash
# scaffold a shadcn-ready Vite + React + TypeScript app
npm create vite@latest my-app -- --template react-ts
cd my-app

# Tailwind CSS v4 (the @tailwindcss/vite plugin) + the @/* path alias
npm install -D tailwindcss @tailwindcss/vite

# init shadcn — creates components.json and the components/ui folder
npx shadcn@latest init

# the component's one external dependency
npm install @paper-design/shaders-react

# drop the files into the shadcn-default UI directory
#   src/components/ui/portfolio-hero-with-paper-shaders.tsx
#   src/components/ui/demo.tsx
```

**Why `/components/ui`?** It's shadcn's default UI path. Keeping the files there
is what makes the verbatim import
`@/components/ui/portfolio-hero-with-paper-shaders` resolve unchanged, lets the
shadcn CLI add/update components in the expected place, and keeps primitives
separate from app composition. If your alias points elsewhere, create the folder
(or adjust the alias) so drop-in components keep working.

### Integration checklist

- **Props / data:** none. `ResumePage` is self-contained; the only state is
  `isDarkMode`. No context providers or external hooks required.
- **Assets:** none — the visual is the shader. The component's inline sun/moon
  SVGs are swapped for `lucide-react` icons in the surrounding chrome.
- **Responsive:** the source is a fixed `w-1/2` split; stack the panels
  (`flex-col` + `w-full`) for a real mobile layout.
- **Best placement:** a portfolio / landing hero or an "about" splash.

## Run

```bash
npm install        # installs deps incl. @paper-design/shaders-react
npm run dev        # Vite dev server
npm run build      # tsc -b && vite build (strict typecheck + production build)
npm run verify     # headless Chromium: asserts the shader renders + UI works
```

## Verification

`npm run verify` boots the dev server, drives a headless Chromium (WebGL forced
on via SwiftShader) and asserts: the hero proof renders the verbatim
`<ResumePage>` (`Jessi.cv` / `DESIGNER`); its canvas has a live WebGL context
and paints ink; the console stage shader animates over time; the studio clock
and the console telemetry advance; the speed fader sweeps `0.00× → 1.00×`;
a shape tile latches `aria-pressed`; the theme toggle flips `.light`; every
story section is present; and no page/console errors fire.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · `@paper-design/shaders-react`
(`Dithering`) · shadcn/ui structure · Lucide.

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
