# Cruip Stellar audit

Reference wrapper: `https://cruip.com/demos/stellar/`

Reference content: `https://preview.cruip.com/stellar/`

## Scope

The live reference crawl discovered 16 distinct pages: Home, About, Integrations, Integration Detail, Pricing, Customers, Customer Story, Changelog, Blog, Blog Post, Sign In, Sign Up, Reset Password, Contact, Terms, and Privacy.

The initial clone contained 11 pages. Blog, Blog Post, Contact, Terms, and Privacy were missing. Eight of the existing marketing pages also had different full-page dimensions from the current reference.

## Repairs

- Rebuilt all existing routes from the current reference markup and styles.
- Added the five missing routes.
- Restored every current page section, card, row, testimonial, pricing cell, navigation item, footer item, and legal content block in reference order.
- Vendored the current CSS, JavaScript, favicon, font, image, and SVG assets.
- Removed analytics and Cloudflare email-decoding dependencies.
- Restored readable local email links on Contact, Terms, and Privacy.
- Preserved the current mobile navigation, feature tabs, pricing switch, carousel controls, hover states, particle animation, highlighter behavior, and AOS reveals.
- Reconciled the project README with the 16-page structure.

## Verification

All 16 local routes returned HTTP 200 with zero failed asset requests at 390 and 1280 pixels.

The responsive suite contains 48 reference and 48 clone screenshots at 390, 768, and 1280 pixels. All 48 pairs have identical dimensions. Aggregate normalized mean pixel error is `0.0000498206`; the maximum page result is `0.0005858702`.

Interaction replay matched for mobile navigation, feature tab selection, navigation hover color, carousel next navigation, and monthly pricing selection. Both reference and clone produced the same observed state changes.

The reference uses a single dark visual theme. It has no light theme or theme toggle to reproduce.

## Page results

| Page | Initial state | Repair loop | Result |
| --- | --- | ---: | --- |
| Home | Stale layout and dimensions | 1 | Faithful |
| About | Stale layout and dimensions | 1 | Faithful |
| Integrations | Stale layout and dimensions | 1 | Faithful |
| Integration Detail | Stale layout and dimensions | 1 | Faithful |
| Pricing | Stale layout and dimensions | 1 | Faithful |
| Customers | Stale layout and dimensions | 1 | Faithful |
| Customer Story | Stale layout and dimensions | 1 | Faithful |
| Changelog | Stale layout and dimensions | 1 | Faithful |
| Blog | Missing | 1 | Faithful |
| Blog Post | Missing | 1 | Faithful |
| Sign In | Present with minor rendering drift | 1 | Faithful |
| Sign Up | Present with minor rendering drift | 1 | Faithful |
| Reset Password | Present with minor rendering drift | 1 | Faithful |
| Contact | Missing | 1 | Faithful |
| Terms | Missing | 1 | Faithful |
| Privacy | Missing | 1 | Faithful |

Every page converged in one repair loop. No residual layout, section, breakpoint, state, behavior, or theme gaps remain.

## Evidence

- `reference/`: current live page captures, DOM outlines, computed source CSS, and hover states
- `initial/`: pre-repair clone captures
- `final/`: repaired clone captures
- `responsive/`: 96 responsive screenshots
- `interactions/`: reference and clone state screenshots plus structured results
- `initial-measurements.json`: initial page coverage and dimension comparison
- `measurements.json`: final responsive dimensions and pixel error
