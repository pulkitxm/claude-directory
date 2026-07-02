REFERENCE: https://nextjs-demo.tailadmin.com/

# TAILADMIN NEXT.JS DASHBOARD — PIXEL-FAITHFUL HTML/CSS/JS CLONE

## STYLE BREAKDOWN

### COLORS
- PRIMARY BRAND: #465fff (brand-500) — used for buttons, active states, accents
- BRAND RANGE: #ecf3ff (50) → #161950 (950), key shades #dde9ff (100), #465fff (500), #3641f5 (600)
- BACKGROUND LIGHT: #f9fafb (gray-50)
- BACKGROUND DARK: #1a2231 (gray-dark)
- SIDEBAR DARK: #1e2635
- TEXT PRIMARY: #101828 (gray-900)
- TEXT SECONDARY: #667085 (gray-500)
- TEXT MUTED: #98a2b3 (gray-400)
- BORDER: #e4e7ec (gray-200)
- SUCCESS: #12b76a (success-500)
- ERROR: #f04438 (error-500)
- WARNING: #f79009 (warning-500)
- WHITE: #ffffff
- CARD BACKGROUND: #ffffff (light), #1e2635 (dark)

### FONTS
- PRIMARY: Outfit (Google Fonts / local fallback)
- WEIGHTS: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- SCALE: xs=12px, sm=14px, base=16px, lg=18px, xl=20px, 2xl=24px, 3xl=30px
- BODY: 14px/20px (theme-sm)

### LAYOUT
- SIDEBAR: 290px wide, fixed left, collapsible to icon-only (90px)
- TOPBAR: 60px tall, sticky top
- CONTENT: flex-1, padding 24px
- CARD: white background, 10px border-radius, subtle shadow
- GRID: 12-column, 20px gap
- BREAKPOINTS: sm=640px, md=768px, lg=1024px, xl=1280px, 2xl=1536px

### DESIGN TOKENS
- BORDER RADIUS: xs=2px, sm=4px, md=6px, lg=8px, xl=12px, 2xl=16px, 3xl=24px
- SHADOWS: subtle box-shadow: 0 1px 3px rgba(0,0,0,0.08)
- TRANSITIONS: 0.15s ease-in-out
- DARK MODE: supported via class="dark" on html element

---

## PAGES DISCOVERED

### DASHBOARDS
- / (index.html) — Ecommerce dashboard (main)
- /analytics (analytics.html) — Analytics dashboard
- /marketing (marketing.html) — Marketing dashboard
- /crm (crm.html) — CRM dashboard
- /stocks (stocks.html) — Stocks dashboard
- /saas (saas.html) — SaaS dashboard
- /logistics (logistics.html) — Logistics dashboard
- /ai (ai.html) — AI dashboard
- /sales (sales.html) — Sales dashboard
- /finance (finance.html) — Finance dashboard

### AI PAGES
- /text-generator (text-generator.html)
- /image-generator (image-generator.html)
- /code-generator (code-generator.html)
- /video-generator (video-generator.html)
- /ai-settings (ai-settings.html)

### E-COMMERCE
- /products-list (products-list.html)
- /add-product (add-product.html)
- /billing (billing.html)
- /invoices (invoices.html)
- /single-invoice (single-invoice.html)
- /create-invoice (create-invoice.html)
- /transactions (transactions.html)
- /single-transaction (single-transaction.html)

### PAGES
- /calendar (calendar.html)
- /profile (profile.html)
- /task-list (task-list.html)
- /task-kanban (task-kanban.html)
- /file-manager (file-manager.html)
- /pricing-tables (pricing-tables.html)
- /faq (faq.html)
- /api-keys (api-keys.html)
- /integrations (integrations.html)
- /blank (blank.html)

### TABLES
- /basic-tables (basic-tables.html)
- /data-tables (data-tables.html)

### FORMS
- /form-elements (form-elements.html)
- /form-layout (form-layout.html)

### AUTH
- /signin (auth/signin.html)
- /signup (auth/signup.html)
- /reset-password (auth/reset-password.html)
- /two-step-verification (auth/two-step-verification.html)

### ERROR PAGES
- /error-404 (error-404.html)
- /error-500 (error-500.html)
- /error-503 (error-503.html)
- /coming-soon (coming-soon.html)
- /maintenance (maintenance.html)
- /success (success.html)

### UI ELEMENTS (COMPONENTS)
- /alerts (alerts.html)
- /avatars (avatars.html)
- /badge (badge.html)
- /breadcrumb (breadcrumb.html)
- /buttons (buttons.html)
- /cards (cards.html)
- /carousel (carousel.html)
- /dropdowns (dropdowns.html)
- /modals (modals.html)
- /notifications (notifications.html)
- /pagination (pagination.html)
- /tabs (tabs.html)
- /tooltips (tooltips.html)

### CHART PAGES
- /chart/basic-chart (chart/basic-chart.html)
- /chart/advanced-chart (chart/advanced-chart.html)
