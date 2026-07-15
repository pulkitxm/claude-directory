# Mosaic Template Audit

Reference: <https://cruip.com/demos/mosaic/>

Direct template source: <https://preview.cruip.com/mosaic/>

Audit date: 2026-07-15

## Scope

The current live template contains 75 routes. The repaired clone contains the same 75 routes:

- 10 dashboards
- 13 e-commerce and checkout pages
- 10 community pages
- 2 finance pages
- 3 job board pages
- 2 task pages
- 2 messaging pages
- 1 calendar page
- 1 campaigns page
- 6 settings pages
- 5 utility pages
- 3 authentication pages
- 4 onboarding pages
- 13 component showcase pages

The live release added 12 routes that were absent from the previous clone: `add-customer.html`, `add-order.html`, `add-user.html`, `create-invoice.html`, `dashboard-crm.html`, `dashboard-ecommerce.html`, `dashboard-marketing.html`, `dashboard-monitoring.html`, `dashboard-projects.html`, `dashboard-saas.html`, `dashboard-support.html`, and `users-list.html`. The obsolete local-only `transaction-details.html` route was removed.

## Drift repaired

The previous clone was an older 64-page release using an obsolete generated class and asset layout. All live pages were rebuilt from the current source. Shared navigation, headers, tables, charts, forms, component examples, responsive behavior, dark mode, current copy, current data sets, scripts, images, favicons, and exact current Inter font files were restored. Assets referenced dynamically by the table data scripts were also vendored. The messages page now repeats its initial bottom-scroll after media and fonts settle, eliminating the tablet timing offset found during comparison.

## Verification

Fresh initial clone, live reference, repaired clone, responsive, theme, and interaction evidence is stored in this directory.

- Route coverage: 75 of 75 live routes
- Responsive coverage: 390, 768, and 1280 pixels on every route
- Theme coverage: explicit light and dark mode on every route
- Responsive comparisons: 450 reference and 450 clone screenshots
- Responsive geometry: zero width or height mismatches across all 450 comparisons
- Responsive screenshot median SSIM: 0.999934
- Responsive screenshots at or above 0.999 SSIM: 415 of 450
- Lowest responsive SSIM: 0.967569 on the animated analytics chart at 390 pixels
- Interaction-state SSIM: 0.999887 to 1.000000

The lower chart-page similarity values come from independently timed Chart.js canvas animations. The chart source, data, dimensions, colors, labels, and completed states are the same. Static pages and deterministic interaction states converge at near-identical pixel output.

Representative behavior replay covers the shared desktop and mobile sidebar, search dialog, notifications dropdown, light and dark theme storage, accordion expansion, modal open and Escape close, tooltip hover, customer table filters and sorting, calendar navigation, the mobile messages sidebar, form focus, and required-field validity. `states/interactions.json` records each trigger and observed delta.

## Verdict

All 75 pages converged in one source repair iteration, with a second targeted pass for dynamically referenced data-table imagery and the messages scroll timing. Pages, sections, routes, styles, responsive layouts, themes, controls, charts, table behavior, and interactions match the current original. There are no residual structural or behavioral gaps.
