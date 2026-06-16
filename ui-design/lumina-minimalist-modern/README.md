# Lumina — "Minimalist Modern" design-system landing page

A full landing page for the fictional product-analytics platform **Lumina**, built
end to end as a reference implementation of the **Minimalist Modern** design
system: minimalism through bold choices, not absence. Restraint in element count,
confidence in execution — an Electric Blue signature gradient, inverted slate
sections, a dual-font (Calistoga + Inter) voice, and motion that makes the
interface feel alive.

## Sections

1. **Navbar** — floating glass pill that solidifies on scroll, with a mobile drawer.
2. **Hero** — asymmetric `1.1fr / 0.9fr` grid, gradient headline word with a soft
   underline bar, and an animated abstract graphic (slow-rotating dashed ring,
   counter-rotating inner ring, two bobbing glass cards, a sculptural gradient
   blob, a 3×3 dot grid, and a solid accent corner block).
3. **Stats** — inverted dark section with a dot-grid texture, corner glows, and
   numbers that count up on scroll into view.
4. **Features** — bento grid of capability cards with full-gradient icon tiles
   and a hover gradient wash; the lead card spans on wider screens.
5. **How it works** — three-step timeline with oversized step numbers and
   gradient circular arrow connectors between steps (desktop).
6. **Pricing** — three tiers; the featured tier floats above its siblings inside
   a 2px gradient-border stroke.
7. **Testimonials** — offset center card, oversized decorative quote marks, and
   gradient accent bars.
8. **Final CTA** — inverted section with a working email-capture form (validates
   and confirms inline) over an accent glow.
9. **Footer** — link columns plus a live "all systems operational" pulse.

## Signature elements ("Bold Factor")

Gradient text highlights, two inverted sections with dot texture, the animated
hero graphic, gradient icon backgrounds, the 2px gradient-border featured card,
oversized decorative elements (120px quote marks, large step numbers), pulsing
indicators, and arrow connectors — all driven by centralized design tokens.

## Stack

- React 18 + Vite + TypeScript (strict)
- Tailwind CSS v3 — every design token (colors, shadows, fonts) is a CSS custom
  property in `src/index.css`, mapped through `tailwind.config.ts`
- Framer Motion for entrance choreography and continuous motion
  (`<MotionConfig reducedMotion="user">` honors `prefers-reduced-motion`)
- lucide-react icons
- Local UI primitives (`Button`, `Card`/`GradientBorderCard`, `Input`,
  `SectionLabel`, `Reveal`, `BrandMark`) built with `cva` + `tailwind-merge`,
  shadcn-style

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check (tsc --noEmit) + production build
npm run verify   # headless Chromium checks (Playwright) — see below
```

## Verification

`npm run verify` builds, serves `vite preview`, and drives headless Chromium to
assert: no console/page errors, all sections present, the Calistoga / Inter /
JetBrains Mono fonts actually loaded, gradient highlights present, an inverted
dark section exists, three pricing tiers render, the CTA form confirms on submit,
and the mobile menu button appears at a phone viewport. All 15 checks pass.

## Assets

Fully self-contained and offline-runnable. The three Google Fonts are vendored
locally as latin-subset `woff2` in `src/assets/fonts/` (Inter and JetBrains Mono
are variable fonts, so one file each covers the full weight range; Calistoga is
static). No remote fonts, images, or CDNs are referenced at runtime. The favicon
is an inline SVG in `public/`.
