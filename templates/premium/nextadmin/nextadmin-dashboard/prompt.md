> A SELF-CONTAINED, PIXEL-FAITHFUL REPRODUCTION OF THE NEXTADMIN NEXT.JS ADMIN DASHBOARD KIT DEMO. BUILT AS PLAIN HTML + CSS + VANILLA JAVASCRIPT, WITH ALL FONTS, ICONS, AND IMAGES VENDORED LOCALLY, REPRODUCING EVERY DISCOVERED PAGE (DASHBOARDS, CALENDAR, PROFILE, TASKS, FORMS, TABLES, PAGES GROUP, CHARTS, UI-ELEMENTS SHOWCASE, MESSAGING, INVOICE, AUTH, AND UTILITY PAGES) INCLUDING LIGHT/DARK THEME SUPPORT AND THE SIDEBAR ACCORDION NAVIGATION.

REFERENCE: `https://demo.nextadmin.co/`

## SUMMARY

NEXTADMIN IS A NEXT.JS + TAILWIND CSS ADMIN DASHBOARD KIT. THE LIVE DEMO IS A LARGE MULTI-PAGE APPLICATION (51 ROUTES DISCOVERED BY CRAWLING THE SIDEBAR NAVIGATION) COVERING FOUR DASHBOARD VARIANTS (ECOMMERCE, ANALYTICS, MARKETING, CRM, STOCKS), CALENDAR, PROFILE, MANAGE TEAM, A TASKS MODULE (LIST/KANBAN), A FORMS MODULE (FORM ELEMENTS/LAYOUT, PLUS "PRO" VARIANTS), A TABLES MODULE (BASIC/PRO/DATA TABLES), A "PAGES" GROUP (SETTINGS, FILE MANAGER, PRICING TABLES, ERROR PAGE, TEAMS, TERMS & CONDITIONS, MAIL SUCCESS), MESSAGES, INBOX, INVOICE, A CHARTS MODULE (BASIC/ADVANCED), AN 18-PAGE UI-ELEMENTS COMPONENT SHOWCASE (ACCORDION, ALERTS, BADGE, BREADCRUMBS, BUTTONS, BUTTONS GROUP, CARDS, CAROUSEL, DROPDOWNS, IMAGES, MODALS, NOTIFICATIONS, PAGINATION, POPOVERS, PROGRESS, TABS, TOOLTIPS, VIDEOS), STANDALONE "COMING SOON"/"UNDER MAINTENANCE" PAGES, AND AUTH SIGN-IN/SIGN-UP SCREENS. THE DASHBOARD SHELL (SIDEBAR + STICKY HEADER) IS SHARED ACROSS EVERY IN-APP PAGE; AUTH AND UTILITY PAGES ARE STANDALONE SPLIT-SCREEN LAYOUTS.

## STYLE

- **PALETTE:**
  - PRIMARY (INDIGO): `#5750F1`
  - BODY BG (LIGHT): GRAY-2 `#F7F9FC` · CARD BG: WHITE `#FFFFFF`
  - BODY BG (DARK): `#020D1A` · CARD BG (DARK): GRAY-DARK
  - TEXT (LIGHT): DARK `#1C2434`, DARK-4/DARK-5/DARK-6 MUTED GRAYS
  - TEXT (DARK): WHITE, DARK-6 MUTED
  - BORDERS: STROKE `#E8E9EA` (LIGHT) / STROKE-DARK (DARK)
  - ACCENTS: GREEN (UP-METRICS), ORANGE, PURPLE, CYAN FOR STAT ICONS; RED-LIGHT FOR NOTIFICATION BADGES; "PRO" BADGE = PRIMARY INDIGO PILL

- **FONTS:** SATOSHI (SELF-HOSTED WOFF2, WEIGHTS 300/400/500/700/900 + ITALICS), FALLBACK TO UI-SANS-SERIF/SYSTEM-UI

- **TYPE SCALE:** HEADING-5 (STAT NUMBERS, ~28PX BOLD), TEXT-2XL/26PX BOLD PAGE TITLES (H1 BREADCRUMB HEADINGS), TEXT-SM/MEDIUM FOR LABELS AND SIDEBAR ITEMS, TEXT-XS FOR BADGES

- **RADII:** ROUNDED-[10PX] FOR CARDS, ROUNDED-2XL FOR DROPDOWN PANELS AND ILLUSTRATION CONTAINERS, ROUNDED-LG FOR SIDEBAR NAV ITEMS AND BUTTONS, ROUNDED-FULL FOR AVATARS/PILLS/ICON CHIPS

- **SHADOWS:** SHADOW-1/SHADOW-CARD (SUBTLE, LOW-OPACITY) ON DASHBOARD CARDS; DROPDOWN PANELS USE A SLIGHTLY STRONGER SHADOW-LG

- **ANIMATION EASINGS:** SIDEBAR ACCORDION CHEVRON ROTATE 200MS EASE; DROPDOWN PANEL FADE/SLIDE-IN 150MS EASE-OUT; THEME-TOGGLE PILL SLIDE 200MS; HOVER BACKGROUND/TEXT-COLOR TRANSITIONS 200MS ON NAV LINKS AND BUTTONS; CHARTS ARE APEXCHARTS-RENDERED INLINE SVG CAPTURED AT REST

## LAYOUT & STRUCTURE

**Shared shell (all in-app pages):** sticky left sidebar (logo, MAIN MENU / SUPPORT / OTHERS sections, collapsible accordion groups, active-route highlighting, mobile off-canvas toggle) + sticky top header (mobile sidebar toggle, static "Dashboard" title, search field, light/dark theme toggle, notifications dropdown, user-menu dropdown) + `<main>` content area.

**Pages (51 total, one static HTML file per route):**
- `index.html` — eCommerce dashboard: stat cards (views/profit/products/users), Payments Overview area chart, Profit this week bar chart, Used Devices donut, Region labels US map, Top Channels table, Chats list
- `analytics.html`, `marketing.html`, `crm.html`, `stocks.html` — alternate dashboard variants with their own chart/table mixes
- `calendar.html` — month grid calendar
- `profile.html` — cover photo, avatar, bio, personal info
- `manage-team.html` — team member table/cards
- `tasks-task-list.html`, `tasks-task-kanban.html` — To Do/In Progress/Completed list and Kanban board
- `forms-form-elements.html`, `forms-pro-form-elements.html`, `forms-form-layout.html`, `forms-pro-form-layout.html` — form field showcases and layout patterns
- `tables.html`, `tables-pro-tables.html`, `tables-data-tables.html` — table variants
- `pages-settings.html`, `pages-file-manager.html`, `pages-pricing-tables.html`, `pages-error-page.html`, `pages-team.html`, `pages-terms-conditions.html`, `pages-mail-success.html`
- `messages.html`, `inbox.html`, `invoice.html`
- `charts-basic-chart.html`, `charts-advanced-chart.html`
- `ui-elements-accordion.html`, `-alerts`, `-badge`, `-breadcrumbs`, `-buttons`, `-buttons-group`, `-cards`, `-carousel`, `-dropdowns`, `-images`, `-modals`, `-notifications`, `-pagination`, `-popovers`, `-progress`, `-tabs`, `-tooltips`, `-videos` — one component showcase per file
- `coming-soon.html`, `under-maintenance.html` — standalone countdown pages with illustration
- `auth-sign-in.html`, `auth-sign-up.html` — standalone split-screen auth forms
