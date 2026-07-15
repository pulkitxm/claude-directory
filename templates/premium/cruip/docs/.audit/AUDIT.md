# Docs audit

## Source

- Listed reference: https://cruip.com/demos/docs/
- Direct template: https://preview.cruip.com/docs/
- Captured: 2026-07-15

## Routes

- `index.html`
- `guides.html`
- `help.html`

The live source and clone both contain all three routes. No extra clone routes remain.

## Initial findings

- All three routes used a simplified custom reconstruction instead of the current live markup.
- Typography used Inter instead of Aspekta, Nothing You Could Do, and PT Mono.
- Current source illustrations, feedback icons, article images, favicons, and video were absent.
- Search, nested navigation, sidebar, theme, video modal, FAQ, and scrollspy implementations differed from the live source.
- Compiled style coverage and responsive source behavior were incomplete.

## Repair

- Rebuilt all three pages from the current live source.
- Vendored every required font, image, favicon, script, and video asset locally.
- Ported the current compiled stylesheet, Alpine components, theme persistence, and scrollspy behavior.
- Removed the obsolete custom stylesheet and script.

## Verification

Each route converged after one rebuild iteration.

| Route | Desktop height | 390px height | 768px height | 1280px height | Lowest responsive SSIM |
| --- | ---: | ---: | ---: | ---: | ---: |
| Home | 3237 | 4751 | 4096 | 3237 | 0.999061 |
| Guides | 3230 | 3609 | 3357 | 3230 | 0.997601 |
| Help | 1655 | 2135 | 1850 | 1655 | 0.996954 |

Reference and clone heights match at every tested width. Light and dark captures match at every route and tested size. Search, mobile sidebar, nested navigation, theme persistence, video modal, FAQ, and scroll states produced the same observed DOM deltas. State SSIM values range from 0.995756 to 1.000000, with differences limited to video and transition timing.
