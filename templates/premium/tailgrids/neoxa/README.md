# Neoxa — SaaS Dashboard Template (Vanilla HTML/CSS/JS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

Neoxa is a premium, pixel-faithful clone of a modern SaaS dashboard template, reconstructed as a static multi-page site using semantic Vanilla HTML5, custom CSS utility tokens, and interactive JavaScript. Designed with a clean, card-based minimalist dashboard layout, it includes fully-realized views for analytics, user management tables, invoice drawers, order summaries, a support ticket board, user settings, and multi-step authorization flows. Key animations and interactive charts are implemented client-side with native JavaScript and ApexCharts.

## Run

This is a static project that requires no compilation or build steps. To run and preview locally, serve the directory with any static web server:

```sh
# Using Python's built-in HTTP server
python3 -m http.server 8080

# Or using Node's serve utility
npx serve .
```

Once the server is running, open `http://localhost:8080` in your web browser to explore the template.

## Features

- **10 Core SaaS Pages**: Recreates an entire dashboard environment:
  - **Dashboard (`index.html`)**: Visual charts, statistic counters, device distribution breakdown, and traffic listing.
  - **User Management (`users.html`)**: Searchable and filterable data table with bulk actions and pagination.
  - **Order Tracking (`orders.html`)**: Itemized list, status badges, and transaction details.
  - **Invoices (`invoices.html`)**: Invoice billing list and interactive detail drawer.
  - **Support Tickets (`support.html`)**: High/Medium/Low priority cards organized by agent assignment and status.
  - **Settings (`settings.html`)**: Forms for user profile edit, notifications toggle, and security rules.
  - **Authentication flows**: Sign In (`signin.html`), Sign Up (`signup.html`), Reset Password (`resetpassword.html`), and Two-Step Verification (`twostepverification.html`).
- **Interactive Visualization**: Area charts representing Monthly/Annually/Lifetime revenue metrics and donut charts showing device distributions, powered by ApexCharts.
- **Responsive Layout**: Sidebar drawer slides out on mobile screens and collapses dynamically on desktop screen sizes.

The complete build specification is documented in [prompt.md](./prompt.md), and [demo.mp4](./demo.mp4) showcases the interactive state transitions.

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Tailgrids — <https://neoxa.demos.tailgrids.com>

---

Part of the [Templates](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
