# WEBMASTER 95 — Retro / 90s Nostalgia Design System Showcase (HTML + CSS + Vanilla JS)

A self-contained living documentation page for the **Retro / 90s Nostalgia** design system, rendered as it would have looked on a **Windows 95** machine in 1997 — silver button-face gray, pure-saturation system colors, beveled everything, and zero border-radius anywhere. The page presents as a faux Windows 95 desktop / GeoCities homepage that documents its own design DNA through a colorful scrolling marquee, windowed UI cards, a live hit counter, and a fully working guestbook. Generated with Claude Fable 5.

## What it demonstrates

- **Centralized token system** — every color, the 3D bevel `box-shadow`s, the
  4-value `border-color` signatures, type stacks, spacing and motion live as CSS
  custom properties in `:root`. Change a token, the whole page shifts.
- **The signature 3D bevel** — `--edge-out` / `--edge-in` (white→gray vs gray→white)
  plus `--bevel-out` / `--bevel-in` inset shadows, exposed as `.bevel-out` /
  `.bevel-in` utilities and applied to every control and window.
- **Mandatory "bold factor" elements** — CSS marquee, 4s rainbow text, Windows 95
  title-bar gradient cards, the tiled crosshatch body background, classic
  blue/underlined→red hyperlinks, alternating rows, groove `<hr>` dividers, a green
  monospace hit counter, pulsing NEW!/HOT! badges, a construction-stripe section,
  decorative beveled color squares, and table-like grid layouts.
- **Snappy, digital motion** — instant/50ms button presses (inset + `translate(1px,1px)`),
  linear color cycling, `ease-in-out` pulse glow. No organic easing.
- **Accessibility** — dotted 2px Windows-95 focus rings, 7.5:1+ contrast, a skip
  link, ARIA tablist/progressbar/live regions, navy/white custom selection, and full
  `prefers-reduced-motion` fallbacks (rainbow → solid red, marquee/pulse frozen,
  counters snap to final).
- **Responsive** — multi-column on desktop, collapses to a single column with a
  burger nav on mobile; bevels and bold weights are kept everywhere.

## Stack

- Plain HTML + CSS + vanilla JavaScript — **no build step, no framework, runs offline**
- Fonts vendored locally in `assets/fonts/`:
  - **MS Sans Serif** (regular + bold) — authentic Windows UI body font (from 98.css)
  - **Anton** — an Impact / Arial-Black-style heavy display face for headings
  - **VT323** — pixel terminal monospace for the hit counter and metadata
  - **Pixelify Sans** — the playful "fun" accent (Comic Sans stand-in)
- Lucide-style icons inlined as an SVG sprite (`stroke-width=2`, square caps) — no
  remote icon dependency

## Run

It is a static site — open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 5199
# then open http://localhost:5199/
```

## Verify (CLI only)

```bash
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
PW_DIR=../../scripts/record-demos \
node verify.mjs
```

Headless Chromium (Playwright) at desktop (1280) and mobile (390). It walks the
prompt's **Signature Visual Checklist** item by item (marquee, rainbow text, beveled
buttons, title-bar cards, tiled background, link states, alternating rows, groove HR,
green hit counter, pulse badges, construction stripes, dotted focus, pressed state,
2px icons, zero radius) and also asserts tokens/fonts/forms/tabs/start-menu wiring and
no console errors. 67 assertions.

## Files

| File | Role |
|------|------|
| `index.html` | Structure + content + inline icon sprite |
| `assets/styles.css` | The design system: tokens, bevels, patterns, every component |
| `assets/app.js` | Clock, token copy, color mixer, tabs, hit counter, meter, forms, start menu |
| `assets/fonts/*` | MS Sans Serif, Anton, VT323, Pixelify Sans — vendored locally |
| `verify.mjs` | Headless verification script (checklist + interactivity + a11y) |
| `prompt.md` | The originating prompt (verbatim) |

---

Part of the [UI design](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
