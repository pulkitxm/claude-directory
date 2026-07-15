# Cruip Talent audit

Reference wrapper: `https://cruip.com/demos/talent/`

Reference content: `https://preview.cruip.com/talent/`

## Scope

The live crawl confirmed four distinct pages: Home, Schedule a Call, Sign In, and Reset Password. The clone contained all four routes, but every route had visual drift. The initial Home page was 87 pixels taller than the current reference.

## Repairs

- Rebuilt all four routes from the current reference markup and styles.
- Restored every current section, service item, feature panel, pricing card, FAQ row, profile card, and footer item in reference order.
- Vendored the current CSS, JavaScript, fonts, favicon, images, SVGs, and explainer video.
- Restored the referenced hero illustration that was absent from the stale asset set.
- Removed analytics dependencies.
- Preserved the video modal, feature tabs, carousel controls, pricing switch, hover states, AOS reveals, and responsive split layouts.
- Reconciled the project README with the current structure.

## Verification

All four local routes returned HTTP 200 at mobile and desktop widths. All required static resources are local. The explainer media is intentionally lazy and may report an aborted range request when automated capture navigates away before playback.

The responsive suite contains 12 reference and 12 clone screenshots at 390, 768, and 1280 pixels. All 12 pairs have identical dimensions. Aggregate normalized mean pixel error is `0.0000261547`; the maximum page result is `0.0001349597`.

Interaction replay matched for navigation hover decoration, video modal opening, feature tab selection, carousel next navigation, and annual pricing selection.

The current reference uses one fixed visual theme and has no theme toggle.

## Page results

| Page | Initial state | Repair loop | Result |
| --- | --- | ---: | --- |
| Home | Stale layout and dimensions | 1 | Faithful |
| Schedule a Call | Visual drift | 1 | Faithful |
| Sign In | Visual drift | 1 | Faithful |
| Reset Password | Visual drift | 1 | Faithful |

Every page converged in one repair loop. No residual page, section, style, breakpoint, state, behavior, or theme gaps remain.

## Evidence

- `reference/`: current live captures, DOM outlines, computed source CSS, and hover states
- `initial/`: pre-repair clone captures
- `final/`: repaired clone captures
- `responsive/`: 24 responsive screenshots
- `interactions/`: reference and clone state screenshots plus structured results
- `initial-measurements.json`: initial dimensions and pixel error
- `measurements.json`: final responsive dimensions and pixel error
