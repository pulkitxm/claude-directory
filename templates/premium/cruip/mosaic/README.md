# Mosaic — Admin Dashboard UI Kit Clone (Tailwind CSS + Alpine.js + Chart.js)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A faithful, self-contained reproduction of the Cruip Mosaic admin dashboard template — a comprehensive 64-page admin UI kit covering dashboards, e-commerce, community, finance, job board, task management, messaging, calendar, campaigns, settings, authentication, onboarding, and UI component showcases. Built with Tailwind CSS for styling, Alpine.js for interactive behavior (collapsible sidebar, dropdowns, accordions), and Chart.js with Moment.js for data visualization. Features a dark/light mode toggle and a card-based layout system with a fixed left sidebar and top header bar. No build step required — all assets are vendored under `assets/`.

## Run

No build step. Serve the project root with any static file server and open `index.html`:

```sh
# Python (built in)
python3 -m http.server 8080
# then open http://localhost:8080

# Node.js (if npx is available)
npx serve .
```

Alternatively, open `index.html` directly in a browser — relative asset paths work without a server for most pages.

## Pages (64 total)

| Section | Pages |
|---|---|
| Dashboards | `index.html`, `analytics.html`, `fintech.html` |
| E-commerce | `customers.html`, `orders.html`, `invoices.html`, `shop.html`, `shop-2.html`, `product.html`, `cart.html`, `cart-2.html`, `cart-3.html`, `pay.html` |
| Community | `users-tabs.html`, `users-tiles.html`, `profile.html`, `feed.html`, `forum.html`, `forum-post.html`, `meetups.html`, `meetups-post.html` |
| Finance | `credit-cards.html`, `transactions.html`, `transaction-details.html` |
| Job Board | `job-listing.html`, `job-post.html`, `company-profile.html` |
| Tasks | `tasks-kanban.html`, `tasks-list.html` |
| Messages | `messages.html`, `inbox.html` |
| Calendar | `calendar.html` |
| Campaigns | `campaigns.html` |
| Settings | `settings.html`, `notifications.html`, `connected-apps.html`, `plans.html`, `billing.html`, `feedback.html` |
| Utility | `changelog.html`, `roadmap.html`, `faqs.html`, `empty-state.html`, `404.html` |
| Auth | `signin.html`, `signup.html`, `reset-password.html` |
| Onboarding | `onboarding-01.html` – `onboarding-04.html` |
| Components | `component-accordion.html`, `component-alert.html`, `component-avatar.html`, `component-badge.html`, `component-breadcrumb.html`, `component-button.html`, `component-dropdown.html`, `component-form.html`, `component-icons.html`, `component-modal.html`, `component-pagination.html`, `component-tabs.html`, `component-tooltip.html` |

## Assets

All dependencies are vendored — no CDN calls required:

- `assets/css/style.css` — compiled Tailwind CSS
- `assets/js/main.js` — Alpine.js component logic (sidebar, dark mode, dropdowns)
- `assets/js/vendors/alpinejs.min.js` — Alpine.js
- `assets/js/vendors/chart.js` + `chartjs-adapter-moment.js` + `moment.js` — charts
- `assets/js/vendors/flatpickr.js` — date picker (calendar page)
- `assets/js/dashboard-charts.js`, `analytics-charts.js`, `fintech-charts.js` — page-specific Chart.js configs
- `assets/images/` — all images and icons

## Notes

`prompt.md` holds the full build spec. `demo.mp4` shows the template in motion.

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Cruip — <https://cruip.com/demos/mosaic/>

---

Part of the [Templates](../) collection in the [fable](../../) repo — an open-source gallery of UI experiments and clones.
