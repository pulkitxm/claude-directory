> A SELF-CONTAINED, PIXEL-FAITHFUL REPRODUCTION OF THE SHADCNBLOCKS ADMIN KIT — AN ECOMMERCE ADMIN DASHBOARD TEMPLATE WITH 9 DASHBOARD VARIANTS AND 2 DATA-TABLE PAGES — REBUILT AS PLAIN HTML + CSS + VANILLA JS WITH NO BUILD STEP. EVERY PAGE, THE FULL LOOK & FEEL, SIDEBAR NAVIGATION, CHART COMPONENTS, DATA TABLES, HOVER STATES, AND LIGHT/DARK THEME TOGGLE ARE REPRODUCED FROM CAPTURED REFERENCE ARTIFACTS. ALL ASSETS ARE VENDORED LOCALLY AND IT RUNS OFFLINE.

REFERENCE: `https://shadcnblocks-admin.vercel.app/`

## SUMMARY

AN ADMIN DASHBOARD UI KIT BUILT ON NEXT.JS + SHADCN/UI (CRUIP), FEATURING A PERSISTENT LEFT SIDEBAR, A TOP HEADER BAR WITH THEME TOGGLE AND SEARCH, AND 11 PAGES OF DEMO CONTENT ACROSS 9 ECOMMERCE DASHBOARD VARIANTS AND 2 ORIGINAL-STYLE DATA TABLES (USERS, TASKS). EVERY PAGE SHARES THE SAME SIDEBAR/HEADER CHROME AND IS INDIVIDUALLY SELECTABLE VIA THE SIDEBAR NAVIGATION. CHARTS ARE RENDERED WITH CHART.JS.

## STYLE

### PALETTE (LIGHT / DARK)

- **--background**: #ffffff / #0a0a0a
- **--foreground**: #0a0a0a / #fafafa
- **--card**: #ffffff / #171717
- **--card-foreground**: #0a0a0a / #fafafa
- **--popover**: #ffffff / #171717
- **--popover-foreground**: #0a0a0a / #fafafa
- **--primary**: #171717 / #e5e5e5
- **--primary-foreground**: #fafafa / #171717
- **--secondary**: #f5f5f5 / #262626
- **--secondary-foreground**: #171717 / #fafafa
- **--muted**: #f5f5f5 / #262626
- **--muted-foreground**: #737373 / #a1a1a1
- **--accent**: #f5f5f5 / #262626
- **--accent-foreground**: #171717 / #fafafa
- **--destructive**: #e40014 / #ff6568
- **--border**: #e5e5e5 / rgba(255,255,255,0.1)
- **--input**: #e5e5e5 / rgba(255,255,255,0.15)
- **--ring**: #a1a1a1 / #737373
- **--sidebar**: #fafafa / #171717
- **--sidebar-foreground**: #0a0a0a / #fafafa
- **--sidebar-primary**: #171717 / #1447e6
- **--sidebar-accent**: #f5f5f5 / #262626
- **--sidebar-border**: #e5e5e5 / rgba(255,255,255,0.1)
- **--chart-1**: #90c5ff (all modes)
- **--chart-2**: #3080ff
- **--chart-3**: #155dfc
- **--chart-4**: #1447e6
- **--chart-5**: #193cb8
- **--success**: #00884b / #2ec18c
- **--warning**: #dca600 / #e9b928
- **--priority-1** (critical): #e40014 / #ff6568
- **--priority-2** (high): #f27000 / #ff8b41
- **--priority-3** (medium): #dca600 / #e9b928
- **--priority-4** (low): #737373 / #a1a1a1

### TYPOGRAPHY

- **Font Family**: Inter (variable weight 100–900), with "Inter Fallback" (local Arial)
- **Base size**: 16px / line-height 24px / weight 400
- **Headings**: 14px–20px range; sidebar labels 12px/11px uppercase
- **Mono**: Geist Mono (code/dev areas)

### SPACING / RADII / SHADOWS

- **--radius**: 0.625rem (10px) — used for cards, buttons, inputs
- Sidebar width: 256px
- Header height: ~69px (padding 16px 24px)
- Card padding: typically 24px
- Grid gaps: 16px–24px

### ANIMATIONS / TRANSITIONS

- Sidebar collapse: CSS transition on width (sidebar toggle button)
- Theme toggle: instant class swap (`.dark` on `<html>`)
- Hover states: `hover:bg-accent` (f5f5f5/262626 transition), `transition-colors`
- Dropdown menus: appear/disappear without animation (instant)
- No entrance animations (content renders immediately)

## LAYOUT & STRUCTURE

THE CLONE IS ORGANIZED AS 11 HTML FILES WITH SHARED CHROME (SIDEBAR + HEADER) AND SHARED TOKENS (STYLES.CSS).

### SHARED CHROME

**LEFT SIDEBAR (256PX)**
- Logo area: "Shadcnblocks Admin Kit" + "Nextjs + shadcn/ui" subtitle
- Navigation sections:
  - **ECOMMERCE**: Dashboard (collapsible: links to dashboard-1 through dashboard-9), Products, Orders, Customers, Shipments
  - **PROJECT MANAGEMENT**: Projects, Teams, Members, Issues, Inbox, Todo, Tasks
  - **MANAGE**: Settings, Developers, Dev Tools
  - **PAGES**: Auth, Errors
- Footer: User avatar + "ausrobdev" + "rob@shadcnblocks.com" + settings cog

**TOP HEADER**
- Left: Toggle Sidebar button + breadcrumb ("Ecommerce App" or page name)
- Center: Search bar (⌘K placeholder)
- Right: Notification badge (count 2) + Theme toggle button

### PAGES

1. **index.html** → redirects / is ecommerce/dashboard-1.html
2. **ecommerce/dashboard-1.html** — KPI cards (Monthly Revenue $148,230 / Orders 18,452 / New Customers 4,120 / Refunds $9,821), Total Revenue line chart (this year vs prev year, Jan–Dec, up to $80K), Revenue by Channel horizontal bar chart (Online/In-Store/Wholesale/Marketplace), Average Order Value sparkline ($959 / +2.4%), Average Sales sparkline (837 / +1.3%), Product Categories donut (Electronics 38%, Clothing 27%, Home & Garden 21%, Sports 14%), Last 28 Days bar at bottom
3. **ecommerce/dashboard-2.html** — "Welcome Back, John! Today you have 12 orders to fulfill, 3 returns pending" header with Export button; alternate widget layout
4. **ecommerce/dashboard-3.html** — Similar welcome header; alternate stats layout
5. **ecommerce/dashboard-4.html** — Date range tabs (1 Year / 3 Months / 30 Days) with charts
6. **ecommerce/dashboard-5.html** — $276,000.00 Total Revenue (Last 6 Months) with This Year vs Prev Year toggle
7. **ecommerce/dashboard-6.html** — $1,800,000.00 Total Revenue / +12.0% / Avg Fulfillment 2.4 days / Orders 9,420 / 4.2% return rate
8. **ecommerce/dashboard-7.html** — "Dashboard Overview" header with Jan 1–31 2025 date range / All Platforms dropdown
9. **ecommerce/dashboard-8.html** — Total Revenue $485,000 / -12.5% vs Last Month / Conversion Rate 18.5%
10. **ecommerce/dashboard-9.html** — Tabs: Overview / Orders / Products / Customers / Analytics; breadcrumb "Acme Store / Overview"
11. **original/users.html** — Data table: users with columns (name, email, phone, created date, last active, status badge, role badge); 30 rows / 10 per page / pagination; row checkbox select; column sort; status filter; "Open menu" row actions
12. **original/tasks.html** — Data table: tasks with columns (TASK-ID, type badge, description, status badge, priority badge); 100 rows / 10 per page / pagination; row actions
