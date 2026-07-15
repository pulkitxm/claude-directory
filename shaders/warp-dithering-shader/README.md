# Warp Dither Lab — 1-Bit WebGL2 Dithering Shader with Live Console (React + WebGL2 + Tailwind CSS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A full-screen 1-bit dithering shader rendered via a raw WebGL2 fragment shader, integrated as a shadcn/Tailwind/TypeScript drop-in component and presented as a live CRT console. The shader renders seven procedural shape fields (simplex noise, warp, dots, sine wave, ripple, swirl, sphere) and thresholds them to one bit through random or Bayer 2×2/4×4/8×8 ordered dithering; the demo configuration features the Warp field (orange `#ff6600` over navy `#000033`, 4×4 dither). Every shader prop is wired live via an on-screen console, a click-to-apply shape library mounts live WebGL2 canvases, and Bayer-matrix explainers animate inline. Generated with Claude Fable 5.

## Highlights

- **The component, verbatim.** `src/components/ui/dithering-shader.tsx` is the
  unmodified upstream file. The app composes it rather than forking it.
- **Responsive by composition.** `DitheringShader` takes fixed pixel
  `width`/`height`; a `ResizeObserver` wrapper (`responsive-dither.tsx`) measures
  its container so the same component fills a hero or a thumbnail.
- **Every prop is live.** Shape, dither kernel, `pxSize`, `speed`, `colorBack`
  and `colorFront` are all driven from the on-screen console; the params object
  is debounced before reaching the shader so dragging stays smooth.
- **Bounded GL contexts.** Each canvas owns a WebGL2 context, so shaders mount
  via `IntersectionObserver` only while near the viewport.
- **Offline & self-contained.** The field is generated entirely in the fragment
  shader — no images, fonts, or textures to ship. System font stacks only.

## Props

| Prop | Type | Default | Maps to |
|------|------|---------|---------|
| `shape` | `"simplex" \| "warp" \| "dots" \| "wave" \| "ripple" \| "swirl" \| "sphere"` | `"simplex"` | `u_shape` |
| `type` | `"random" \| "2x2" \| "4x4" \| "8x8"` | `"8x8"` | `u_type` |
| `colorBack` | `string` (hex) | `"#000000"` | `u_colorBack` |
| `colorFront` | `string` (hex) | `"#ffffff"` | `u_colorFront` |
| `pxSize` | `number` | `4` | `u_pxSize` |
| `speed` | `number` | `1` | time scale (`0` = static) |
| `width` / `height` | `number` | `800` | `u_resolution` |

## Getting started

```bash
npm install
npm run dev      # vite dev server
npm run build    # tsc -b && vite build
npm run verify   # headless WebGL2 + interaction checks
```

## Integration notes (shadcn)

`components.json` carries the canonical shadcn aliases: components resolve to
**`@/components/ui`** and styles to **`src/index.css`**. The component imports
itself as `@/components/ui/dithering-shader`, so it must live in
`components/ui` — that is the folder the shadcn CLI writes primitives into and
the path the `@/` alias points at. If you are not on shadcn yet, run
`npx shadcn@latest init` in a TypeScript + Tailwind project to register the
alias, then drop the file in. `DitheringShader` itself is dependency-free
(React only); `clsx` + `tailwind-merge` back the `cn()` helper and
`lucide-react` supplies the surrounding icons.

## Verification

`scripts/verify.mjs` boots the dev server and drives a headless Chromium
(software WebGL via SwiftShader) to assert the hero paints a real WebGL2 field
(screenshot-analysed: tonal range + orange-over-navy), that all 7 shape and 4
dither controls exist and rewire the hero, that the shape-library tiles mount
live canvases, and that the page logs no console errors.

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
