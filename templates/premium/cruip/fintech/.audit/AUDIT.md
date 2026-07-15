# Fintech audit

## Source

- Listed reference: https://cruip.com/demos/fintech/
- Direct template: https://preview.cruip.com/fintech/
- Captured: 2026-07-15

## Routes

- `index.html`
- `apply.html`
- `support.html`

The source and clone contain the same three routes.

## Initial findings

- All routes used an older source revision with stale compiled styles and scripts.
- The home page omitted content present in the current source revision.
- Current favicon assets were absent.
- The source markup and compiled responsive rules had drifted across desktop, tablet, and mobile.

## Repair

- Rebuilt all three pages from the current live source.
- Updated compiled Tailwind styles, AOS, Swiper, Alpine, and page initialization code.
- Refreshed every local image and font asset from the current source.
- Added the current favicon set.

## Verification

All three pages converged after one rebuild iteration.

| Route | Desktop height | 390px height | 768px height | 1280px height | Lowest SSIM |
| --- | ---: | ---: | ---: | ---: | ---: |
| Home | 6618 | 12328 | 7694 | 6618 | 1.000000 |
| Apply | 900 | 1441 | 1242 | 900 | 1.000000 |
| Support | 1165 | 1748 | 1661 | 1165 | 1.000000 |

Every reference and clone screenshot is pixel-identical at desktop, tablet, mobile, and both tested operating-system color preferences. The template has no dark theme, and both color preferences correctly retain the same white surface. AOS scroll reveal, Swiper pagination, form focus and required validation, support topic expansion, and the mobile support drawer produced identical DOM deltas and state captures.
