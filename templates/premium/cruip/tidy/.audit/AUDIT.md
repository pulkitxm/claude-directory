# Cruip Tidy audit

Reference wrapper: `https://cruip.com/demos/tidy/`

Reference content: `https://preview.cruip.com/tidy/`

## Scope

The live crawl confirmed 12 pages: Home, Pricing, About, Blog, Blog Post, Wall of Love, Wall of Love Story, 404, Support, Sign In, Request Demo, and Reset Password. The clone contained every route, but its compiled markup and assets had drifted from the current reference.

## Repairs

- Rebuilt all 12 routes from the current reference markup and styles.
- Restored every current section, card, testimonial, pricing row, FAQ item, article block, form, and footer item in reference order.
- Vendored the current CSS, JavaScript, favicon, images, SVGs, and explainer video.
- Removed analytics dependencies and public attribution text.
- Preserved exact typography while representing em dash glyphs through HTML entities.
- Preserved the mobile menu, video modal, pricing switch, FAQ accordion, dropdowns, tabs, hover states, and AOS reveals.
- Reconciled the project README with the current route structure.

## Verification

The responsive suite contains 36 reference and 36 clone screenshots at 390, 768, and 1280 pixels. All 36 pairs have identical dimensions and zero normalized mean pixel error.

Interaction replay matched for mobile navigation, video modal opening, monthly pricing selection, and FAQ expansion.

The current reference uses one fixed visual theme and has no theme toggle.

## Page results

| Page | Repair loop | Result |
| --- | ---: | --- |
| Home | 2 | Faithful |
| Pricing | 2 | Faithful |
| About | 1 | Faithful |
| Blog | 1 | Faithful |
| Blog Post | 1 | Faithful |
| Wall of Love | 2 | Faithful |
| Wall of Love Story | 1 | Faithful |
| 404 | 1 | Faithful |
| Support | 1 | Faithful |
| Sign In | 1 | Faithful |
| Request Demo | 1 | Faithful |
| Reset Password | 1 | Faithful |

The second loop on Home, Pricing, and Wall of Love restored exact line wrapping with source-safe HTML entities. No residual page, section, style, breakpoint, state, behavior, or theme gaps remain.

## Evidence

- `reference/`: current live captures, DOM outlines, computed source CSS, and hover states
- `initial/`: pre-repair clone captures
- `final/`: repaired clone captures
- `responsive/`: 72 responsive screenshots
- `interactions/`: reference and clone state screenshots plus structured results
- `measurements.json`: final responsive dimensions and pixel error
