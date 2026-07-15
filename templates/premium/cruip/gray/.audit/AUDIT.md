# Gray audit

## Source

- Listed reference: https://cruip.com/demos/gray/
- Direct template: https://preview.cruip.com/gray/
- Captured: 2026-07-15

## Routes

- `index.html`
- `login.html`
- `request-demo.html`
- `reset-password.html`

The live source and clone contain the same four routes.

## Initial findings

- The home page used a simplified and abridged reconstruction of the current source.
- Authentication and request pages had different markup, content, typography, spacing, and header structure.
- The current source image set, fonts, favicons, compiled styles, and Alpine runtime were absent.
- Responsive rules and interactive component states differed substantially from the current template.

## Repair

- Rebuilt all four pages from the current live source.
- Vendored all required images, fonts, favicons, and Alpine.js locally.
- Ported current tabs, counters, pricing, tooltips, FAQ, and testimonial behavior.

## Verification

All four routes converged after one rebuild iteration.

| Route | Desktop height | 390px height | 768px height | 1280px height | Lowest responsive SSIM |
| --- | ---: | ---: | ---: | ---: | ---: |
| Home | 7453 | 10571 | 8657 | 7453 | 0.989390 |
| Login | 900 | 900 | 900 | 900 | 0.999973 |
| Request demo | 1707 | 2208 | 1729 | 1707 | 0.999887 |
| Reset password | 900 | 900 | 900 | 900 | 0.999856 |

Every reference and clone height matches at every tested width. Home screenshot differences come from independently timed counters and infinite testimonial animation. Deterministic interactive states match at 0.999812 to 0.999984 SSIM. Feature tabs, pricing tiers, tooltip visibility, FAQ expansion, form focus, and native required validation produce identical observed DOM deltas. The source has no dark theme, and both operating-system color preferences correctly retain the same page colors.
