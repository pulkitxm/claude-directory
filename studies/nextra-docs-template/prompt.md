> A SELF-CONTAINED, PIXEL-FAITHFUL PLAIN HTML/CSS/VANILLA-JS REPRODUCTION OF THE NEXTRA DOCS TEMPLATE, INCLUDING EVERY PAGE, HOVER STATE, AND SCROLL/ENTRANCE BEHAVIOR. NO BUILD STEP; RUNS OFFLINE.

REFERENCE: `https://nextra-docs-template.vercel.app`

## SUMMARY

RECREATE THE OFFICIAL NEXTRA "DOCS TEMPLATE" (THE STARTER THEME SHIPPED AT `nextra-docs-template.vercel.app`, SOURCE `github.com/shuding/nextra-docs-template`) AS A STATIC, DEPENDENCY-FREE CLONE. THIS IS THE CLASSIC NEXTRA "DOCS THEME" CHROME: A STICKY TOP NAVBAR WITH LOGO/NAV LINKS/SEARCH BOX/SOCIAL ICONS, A LEFT TREE-STYLE SIDEBAR (WITH A COLLAPSIBLE FOLDER), A CENTERED PROSE CONTENT COLUMN WITH BREADCRUMB + H1 + MDX-STYLE PROSE + CODE BLOCKS + PREV/NEXT PAGINATION, A RIGHT "ON THIS PAGE" TABLE-OF-CONTENTS RAIL, AND A FOOTER WITH A THEME SWITCHER (SYSTEM/LIGHT/DARK) AND COPYRIGHT LINE. FIVE PAGES WERE DISCOVERED AND MUST ALL BE REPRODUCED.

## STYLE

- **PALETTE (LIGHT MODE, DEFAULT):** BODY BG `#ffffff`; PROSE BODY TEXT `rgb(51,65,85)` (SLATE-700); HEADINGS/NAV TEXT NEAR-BLACK `#111` / `rgb(17,17,17)`; MUTED TEXT `#6b7280` (GRAY-500/600); SIDEBAR HOVER/ACTIVE BG `rgb(239,246,255)`-ISH LIGHT BLUE (TAILWIND `primary-50`, HUE 212DEG); ACTIVE LINK / PRIMARY ACCENT BLUE `#2f80ed`-`#1976d2` RANGE (TAILWIND CUSTOM "PRIMARY" HUE `212deg`, ~`#2563eb`); BORDERS/HAIRLINES `#e5e7eb` (GRAY-200); FOOTER BG `rgb(243,244,246)` (GRAY-100); CODE BLOCK BG LIGHT GRAY-BLUE `rgb(241,245,249)`-ISH WITH SYNTAX COLORS: KEYWORD/STRING `#d32f2f`-ISH RED FOR STRINGS, NUMBERS `#1976d2` BLUE, COMMENTS `#6b737c`, FUNCTION NAMES `#6f42c1`/`#b392f0` PURPLE, VARIABLES `#e36209`/`#ffab70` ORANGE (GITHUB-LIGHT-STYLE PRISM PALETTE). DARK MODE (VIA "SYSTEM"/"DARK" TOGGLE): BODY BG NEAR-BLACK `#111` / `rgb(17,17,17)`, TEXT LIGHT GRAY, SIDEBAR/FOOTER `neutral-900`, BORDERS `neutral-800`.
- **FONTS:** UI/BODY — `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", Ubuntu, Cantarell, "Helvetica Neue", Arial, sans-serif` (SYSTEM FONT STACK, NO WEBFONT DOWNLOAD NEEDED). CODE/MONO — `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`.
- **TYPE SCALE:** BODY 16PX/24PX (1.5 LINE-HEIGHT); H1 ~2.25REM (36PX) BOLD/EXTRABOLD; H2 ~1.5REM (24PX) BOLD WITH A BOTTOM HAIRLINE BORDER; PAGE BREADCRUMB/EYEBROW ~14PX MUTED; SIDEBAR LINKS ~14PX; TOC RAIL LABELS ~13-14PX; "LAST UPDATED" / FOOTER CAPTION TEXT ~13PX MUTED.
- **RADII:** SMALL, 4-8PX (`rounded-md`) ON BUTTONS, SEARCH BOX, CODE BLOCKS, SIDEBAR ACTIVE-ITEM PILL, PAGINATION CARDS.
- **SPACING/GRID:** 3-COLUMN DOCS LAYOUT — LEFT SIDEBAR FIXED `256px` (STICKY, TOP OFFSET `4rem` = NAVBAR HEIGHT), CENTER CONTENT MAX-WIDTH CONSTRAINED PROSE COLUMN, RIGHT TOC RAIL FIXED `256px` (HIDDEN BELOW `xl` BREAKPOINT). OUTER CONTAINER MAX-WIDTH `90rem`, HORIZONTAL PADDING `24px`. NAVBAR HEIGHT VAR `--nextra-navbar-height: 4rem`; MENU HEIGHT VAR `3.75rem`; BANNER HEIGHT VAR `2.5rem`.
- **ANIMATIONS/EASINGS:** NAVBAR IS `position: sticky; top: 0` WITH A BACKDROP-BLURRED TRANSLUCENT BG (`rgba(255,255,255,.85)` + BLUR) THAT STAYS PINNED ON SCROLL — NO SHRINK, JUST A BLURRED GLASS BAR OVER CONTENT SCROLLING BENEATH IT. SIDEBAR FOLDER TOGGLE ROTATES ITS CHEVRON AND SLIDE/FADES ITS CHILD LIST OPEN-CLOSED (CSS "MOTION-REDUCE" CLASSES PRESENT — USE A SHORT `max-height`/`opacity` TRANSITION, EASE-OUT, ~150-200MS). LINKS/BUTTONS USE TAILWIND'S `transition-colors` (COLOR/BG FADE ~150MS EASE) ON HOVER. THEME-SWITCHER AND SEARCH ARE HEADLESSUI-STYLE POPUP/MODAL: FADE + SLIGHT SCALE-IN, ~150MS.

## LAYOUT & STRUCTURE

**SHARED CHROME (ALL 5 PAGES):**
- **NAVBAR** (sticky, blurred, `h-16`): left — "My Project" wordmark/logo linking home; center-right nav — "About" link, "Contact ↗" external link (opens new tab, arrow icon); a rounded search input styled as a button reading "Search documentation..." with a "CTRL K" kbd pill on its right edge; GitHub icon button; Discord icon button. Bottom hairline border separates navbar from content.
- **LEFT SIDEBAR** (256px, sticky under navbar, scrollable, hidden on mobile behind a hamburger): a flat tree of nav items — "Introduction" (→ `/`), "Another Page" (→ `/another`), "Advanced (A Folder)" (→ `/advanced`, has a chevron toggle and one nested child "Satori" → `/advanced/satori`). The active page's item gets a light-blue rounded pill background and blue bold text. Below the tree (pinned to sidebar bottom) is a "☀ System" theme-switcher button spanning the sidebar width, with a top hairline separating it from the tree.
- **MAIN CONTENT COLUMN** (centered prose, ~928px at 1440 viewport): breadcrumb-style eyebrow line (current section, e.g. "Introduction"/"Another Page"/"Advanced (A Folder)"/"Advanced (A Folder) › Satori"), large bold H1 page title, MDX prose body (paragraphs, bold spans, H2s with bottom-border rule, code blocks, links), a right-aligned muted "Last updated on <date>" line, a full-width hairline divider, then a prev/next pagination row (chevron + label cards, left = previous page, right = next page, hidden when absent).
- **RIGHT TOC RAIL** (256px, `xl:` breakpoint only): bold "On This Page" heading, list of in-page H2 anchor links (first/current one styled blue+bold, rest muted), a hairline divider, then "Question? Give us feedback →" (links to a prefilled GitHub issue URL) and "Edit this page" (links to the GitHub source file) as small muted links.
- **FOOTER**: light-gray full-bleed band; centered "Nextra Docs Template" text plus year/license framing.

**PAGE 1 — HOME / INDEX (`index.html`, slug `home`), route `/`:**
- Eyebrow "Introduction", H1 "Introduction", paragraph "Welcome to Nextra! This is a basic docs template. You can use it as a starting point for your own project :)".
- H2 "What is Nextra?" (bordered rule) + paragraph with **simple**, **powerful**, **flexible** bolded inline, "site generation framework with everything you love from Next.js."
- H2 "Documentation" (bordered rule) + paragraph "The documentation is available at https://nextra.site." (styled as a link).
- "Last updated on December 2, 2022" right-aligned, divider, pagination row with only a right/next card: "Another Page ›".
- TOC rail links: "What is Nextra?" (active/blue), "Documentation".

**PAGE 2 — ABOUT (`about.html`), route `/about`:**
- No sidebar tree highlight needed beyond nav ("About" navbar link is bold/active here). H1 "About", paragraph "This is the about page! This page is shown on the navbar." (the word "navbar" or full sentence styled as a link/blue). "Last updated on December 2, 2022". No TOC rail content besides the feedback/edit links (this page has no H2s so "On This Page" heading/list is omitted — only "Question? Give us feedback →" / "Edit this page" show). No pagination row (About is outside the sidebar tree).

**PAGE 3 — ANOTHER PAGE (`another.html`), route `/another`:**
- Eyebrow "Another Page", H1 "Another Page".
- A code block titled "demo.js" (small filename tab above the block) containing:
  ```js
  let a = 1;

  console.log(a);
  ```
  with syntax highlighting (keyword `let` colored, number `1`, function call `console.log` highlighted) and the `console.log(a);` line has a subtle highlighted/diff-style row background.
- H2 "Component" (bordered rule) + an outlined pill button "Clicked 0 times" that increments its own label text on click (`Clicked N times`) — a self-contained interactive counter.
- H2 "External Component" (bordered rule) + a second, identical "Clicked 0 times" counter button, independent state from the first.
- "Last updated on December 4, 2022", divider, pagination row: left "‹ Introduction", right "Advanced (A Folder) ›".
- TOC rail: "Component" (active/blue), "External Component".

**PAGE 4 — ADVANCED (`advanced.html`, folder index), route `/advanced`:**
- Eyebrow "Advanced (A Folder)", H1 "Advanced", paragraph "This is the index page for the Advanced folder!".
- "Last updated on December 2, 2022", divider, pagination row: left "‹ Another Page", right "Satori ›".
- Sidebar: "Advanced (A Folder)" item is active (blue pill) and its child "Satori" is visible/expanded underneath. No "On This Page" H2 list (only feedback/edit links in the TOC rail, right-aligned at the very top since there's no in-page heading list).

**PAGE 5 — SATORI (`advanced/satori.html`, nested under Advanced), route `/advanced/satori`:**
- Eyebrow breadcrumb "Advanced (A Folder) › Satori" (two-part breadcrumb with a chevron separator, first part muted/linked, second part current/muted-bold), H1 "Satori", paragraph: `Satori (悟り) is a Japanese Buddhist term for awakening, "comprehension; understanding".` (includes CJK glyph "悟り").
- "Last updated on December 2, 2022", divider, pagination row: only a left/previous card "‹ Advanced (A Folder)" (no next).
- Sidebar: "Satori" child item under "Advanced (A Folder)" is active (blue pill), parent folder shown expanded.

**INTERACTIONS TO REPRODUCE (ALL PAGES SHARE THE CHROME BEHAVIOR):**
- **Theme switcher** (footer of sidebar, "☀ System"): click opens a small popup listbox with "Light" / "Dark" / "System" options; selecting one applies/persists the theme (toggle a `dark` class on `<html>` swapping the palette per the dark-mode values above) and updates the button label + icon.
- **Search box**: click opens a centered modal dialog (dimmed backdrop) with a search input and empty-state hint text; `Esc` or backdrop click closes it. A working client-side substring search across the 5 pages' titles/headings is a reasonable-scope implementation (no need for a real search index backend).
- **Sidebar folder toggle** ("Advanced (A Folder)"): clicking the row (not just navigating) rotates the trailing chevron and expands/collapses the "Satori" child link with a short height/opacity transition; the folder row itself still navigates to `/advanced` on click of its label per the reference.
- **Mobile nav**: below the `md` breakpoint the sidebar and TOC rail collapse; a hamburger icon appears in the navbar (next to the GitHub/Discord icons) and toggles a full-width mobile nav overlay containing the same sidebar tree.
- **Hover states**: navbar links, sidebar items, TOC links, pagination cards, and the counter buttons all get a subtle background/text color shift on `:hover` (Tailwind `transition-colors`, ~150ms) — see `.reference/*/states/` and `.reference/_shared-sources/theme.css` for exact rules.
- **Interactive counters** (Another Page): two independent "Clicked N times" buttons that increment on click, styled as small outlined rounded buttons.
