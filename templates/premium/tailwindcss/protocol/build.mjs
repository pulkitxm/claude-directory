import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REF = path.join(__dirname, ".reference");
const codePanels = JSON.parse(
	fs.readFileSync(path.join(REF, "codepanels.json"), "utf8"),
);

const PAGES = [
	{ slug: "home", file: "index.html", title: "API Documentation" },
	{ slug: "quickstart", file: "quickstart.html", title: "Quickstart" },
	{ slug: "sdks", file: "sdks.html", title: "SDKs" },
	{
		slug: "authentication",
		file: "authentication.html",
		title: "Authentication",
	},
	{ slug: "pagination", file: "pagination.html", title: "Pagination" },
	{ slug: "errors", file: "errors.html", title: "Errors" },
	{ slug: "webhooks", file: "webhooks.html", title: "Webhooks" },
	{
		slug: "contacts",
		file: "contacts.html",
		title: "Contacts",
		resource: true,
	},
	{
		slug: "conversations",
		file: "conversations.html",
		title: "Conversations",
		resource: true,
	},
	{
		slug: "messages",
		file: "messages.html",
		title: "Messages",
		resource: true,
	},
	{ slug: "groups", file: "groups.html", title: "Groups", resource: true },
	{
		slug: "attachments",
		file: "attachments.html",
		title: "Attachments",
		resource: true,
	},
];
const slugToFile = { home: "index.html" };
PAGES.forEach((p) => (slugToFile[p.slug] = p.file));

function extractContent(html) {
	const start = html.indexOf('<div class="w-full">');
	// content ends at the last </footer> closing structure before scripts
	const announcer = html.indexOf("<next-route-announcer");
	let end = html.lastIndexOf("</footer>", announcer);
	// include the wrappers after the page footer: </footer></div></div></div>
	end = html.indexOf("</div></div></div>", end);
	end = end + "</div></div></div>".length;
	return html.slice(start, end);
}

function cleanNext(s) {
	// remove RSC comment markers
	s = s
		.replace(/<!--\$-->/g, "")
		.replace(/<!--\/\$-->/g, "")
		.replace(/<!--\s*-->/g, "");
	// strip headlessui state attrs and generated ids
	s = s.replace(/\s+data-headlessui-state="[^"]*"/g, "");
	s = s.replace(/\s+id="headlessui-[^"]*"/g, "");
	s = s.replace(/\s+aria-controls="headlessui-[^"]*"/g, "");
	s = s.replace(/\s+aria-labelledby="headlessui-[^"]*"/g, "");
	s = s.replace(/\s+id="_R_[^"]*"/g, "");
	// year placeholder
	s = s.replace(
		/©\s*Copyright\s*<!--\s*-->\s*\d{4}\s*<!--\s*-->\./g,
		"© Copyright 2026.",
	);
	s = s.replace(/Copyright\s*2026\s*\.\s*All/g, "Copyright 2026. All");
	return s;
}

function rewriteAssets(s) {
	// Next.js optimized media (SDK logos) -> vendored assets/img
	s = s.replace(
		/src="\/_next\/static\/media\/([a-z0-9]+)\.[a-z0-9]+\.svg"/g,
		'src="assets/img/$1.svg"',
	);
	return s;
}

function rewriteLinks(s) {
	// internal hrefs: href="/" -> index.html, href="/slug" -> slug.html, keep hashes
	s = s.replace(/href="\/(#[^"]*)"/g, 'href="index.html$1"'); // href="/#guides"
	s = s.replace(/href="\/"/g, 'href="index.html"');
	s = s.replace(/href="\/([a-z-]+)(#[^"]*)?"/g, (m, slug, hash) => {
		const f = slugToFile[slug];
		if (!f) return m;
		return `href="${f}${hash || ""}"`;
	});
	return s;
}

// add behaviour hooks
function addHooks(s) {
	// frosted topbar
	s = s.replace(
		/(<div class="fixed inset-x-0 top-0 z-50 flex h-14 [^"]*"[^>]*style="--bg-opacity-light:50%;--bg-opacity-dark:20%")/,
		"$1 data-topbar",
	);
	// search pill button (desktop) -> data-search-open
	s = s.replace(
		/(<button type="button" class="hidden h-8 w-full items-center gap-2 rounded-full[^"]*"[^>]*)>/,
		"$1 data-search-open>",
	);
	// mobile search icon button
	s = s.replace(
		/(<button type="button" class="relative flex size-6 items-center justify-center rounded-md transition hover:bg-zinc-900\/5 lg:hidden[^"]*" aria-label="Find something\.\.\.")/,
		"$1 data-search-open",
	);
	// sidebar nav (the lg:block nav with the highlight)
	s = s.replace(
		/(<nav class="hidden lg:mt-10 lg:block">)/,
		'<nav class="hidden lg:mt-10 lg:block" data-sidebar-nav>',
	);
	// mark the active pill (the will-change-transform bg div) and the emerald bar
	s = s.replace(
		/<div class="absolute inset-x-0 top-0 bg-zinc-800\/2.5 will-change-transform dark:bg-white\/2.5"[^>]*><\/div>/,
		'<div class="absolute inset-x-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5" data-active-pill style="height:0;top:0;opacity:0;border-radius:8px;transition:top .2s,height .2s,opacity .2s"></div>',
	);
	s = s.replace(
		/<div class="absolute left-2 h-6 w-px bg-emerald-500"[^>]*><\/div>/,
		'<div class="absolute left-2 w-px bg-emerald-500" data-active-bar style="left:8px;top:0;height:0;opacity:0;transition:top .2s,height .2s,opacity .2s"></div>',
	);
	// helpful form
	s = s.replace(/<form([^>]*class="[^"]*")>/g, (m, attrs) => {
		if (
			m.includes("Was this page helpful") ||
			s.indexOf("data-response", s.indexOf(m)) !== -1
		) {
			// we'll tag below more precisely
		}
		return m;
	});
	return s;
}

// The "Was this page helpful?" block: wrap & tag question/thanks
function tagHelpful(s) {
	// The footer contains a form with question + Yes/No. There may also be a hidden "Thanks" sibling.
	// In rendered DOM only the question form is present; we add a thanks node.
	const qMarker =
		'<p class="text-sm text-zinc-600 dark:text-zinc-400">Was this page helpful?</p>';
	if (s.includes(qMarker)) {
		// find the enclosing <form ...> ... </form>
		const idx = s.indexOf(qMarker);
		const formStart = s.lastIndexOf("<form", idx);
		const formEnd = s.indexOf("</form>", idx) + "</form>".length;
		const formHtml = s.slice(formStart, formEnd);
		const wrapper =
			'<div data-helpful class="relative">' +
			'<div data-helpful-question style="transition:opacity .3s">' +
			formHtml +
			"</div>" +
			'<p data-helpful-thanks class="absolute inset-0 flex items-center justify-center gap-6 text-sm text-zinc-600 md:justify-start dark:text-zinc-400" style="opacity:0;transition:opacity .3s;pointer-events:none">Thanks for your feedback!</p>' +
			"</div>";
		s = s.slice(0, formStart) + wrapper + s.slice(formEnd);
	}
	return s;
}

// Build multi-language code panels for resource pages
function buildResourcePanels(s, slug) {
	const groups = codePanels[slug];
	if (!groups) return s;
	let gi = 0;
	// Each tab group container is <div ... role="tablist"> ... </div> followed by the panels wrapper.
	// We replace from the tablist's tab buttons + the single rendered panel with all panels.
	// Strategy: locate each `role="tablist"` and the following first `role="tabpanel"`, rebuild.
	// The structure: <div class="...border-b...">  <h3>Request|Response</h3> <div role="tablist">TABS</div></div> <div> <div role="tabpanel"...>PANEL</div> </div>
	// We rebuild the whole `<div class="my-6 overflow-hidden rounded-2xl ...">` ... no — simpler: replace the inner tablist+panel.
	const tablistRe =
		/<div class="-mb-px flex gap-4 text-xs font-medium" role="tablist"[^>]*>([\s\S]*?)<\/div>/g;
	// We'll process sequentially using indices.
	let result = "";
	let cursor = 0;
	const re =
		/<div class="-mb-px flex gap-4 text-xs font-medium" role="tablist"[^>]*>/g;
	let m;
	while ((m = re.exec(s)) !== null) {
		const langs = groups[gi] || [];
		gi++;
		// find end of tablist div (balanced) — tablist has button children, find matching close
		const tabsStart = m.index;
		// tablist content end: find the first occurrence of `</div></div>` that closes tablist then header
		// The header wrapper closes after tablist: ...role=tablist> BUTTONS </div></div>
		// Find the index where tablist closes by counting buttons region: it ends right before `</div></div><div>`
		const afterTabs = s.indexOf("</div></div><div>", tabsStart);
		// panel region begins at <div> after that
		const panelRegionStart = afterTabs + "</div></div>".length; // points at <div>
		// find the single tabpanel and its end: <div><div role="tabpanel"...>...</div></div>
		const tpStart = s.indexOf('<div role="tabpanel"', panelRegionStart);
		// its close: the panel wrapper closes with `</div></div>` followed by close of the rounded-2xl group.
		// Find the matching close of the outer <div> (panel container). We use the next occurrence of
		// `</div></div></div></div>` heuristic is unreliable; instead, capture until the close of the
		// rounded-2xl wrapper which is `</div></div></div>` then maybe more. Use marker: the rounded-2xl
		// wrapper for each group ends right before next `<div class="my-6 overflow-hidden rounded-2xl` OR end.
		// We rebuild from tabsStart (tablist) through the end of the current group's panel container.

		// Build new tablist buttons
		let tabBtns = "";
		langs.forEach((l, i) => {
			const on = i === 0;
			tabBtns += `<button class="border-b py-3 transition data-selected:not-data-focus:outline-hidden ${
				on
					? "border-emerald-500 text-emerald-400"
					: "border-transparent text-zinc-400 hover:text-zinc-300"
			}" role="tab" type="button" aria-selected="${on}" tabindex="${on ? 0 : -1}"${on ? " data-selected" : ""}>${l.name}</button>`;
		});
		// Build panels
		let panelsHtml = "";
		langs.forEach((l, i) => {
			panelsHtml += `<div role="tabpanel"${i === 0 ? "" : " hidden"} data-code-panel>${l.panelHtml}</div>`;
		});

		// locate the header wrapper start to grab the <h3>Request/Response</h3> label preceding tablist
		const headerStart = s.lastIndexOf(
			'<div class="flex min-h-[calc(',
			tabsStart,
		);
		const h3m = s.slice(headerStart, tabsStart).match(/<h3[^>]*>(.*?)<\/h3>/);
		const h3 = h3m
			? h3m[0]
			: '<h3 class="mr-auto pt-3 text-xs font-semibold text-white">Request</h3>';

		// find the end of the whole group rounded-2xl wrapper
		// group wrapper: <div class="my-6 overflow-hidden rounded-2xl bg-zinc-900 ...">  <div class="not-prose"> HEADER PANELS </div></div>
		const groupStart = s.lastIndexOf(
			'<div class="my-6 overflow-hidden rounded-2xl',
			headerStart,
		);
		// find matching end of groupStart by counting divs
		const groupEnd = matchDiv(s, groupStart);

		// emit everything before groupStart
		result += s.slice(cursor, groupStart);
		// rebuild group
		const wrapperOpen = s.slice(groupStart, headerStart); // <div my-6...><div not-prose...>... up to header
		result +=
			wrapperOpen +
			`<div class="flex min-h-[calc(--spacing(12)+1px)] flex-wrap items-start gap-x-4 border-b border-zinc-700 bg-zinc-800 px-4 dark:border-zinc-800 dark:bg-transparent">` +
			h3 +
			`<div class="-mb-px flex gap-4 text-xs font-medium" role="tablist" aria-orientation="horizontal" data-tab-group>${tabBtns}</div></div>` +
			`<div>${panelsHtml}</div>` +
			`</div></div>`;
		cursor = groupEnd;
		re.lastIndex = groupEnd;
	}
	result += s.slice(cursor);
	return result;
}

// match the close of a <div ...> starting at idx (idx points at "<div")
function matchDiv(s, idx) {
	let depth = 0;
	const re = /<div\b|<\/div>/g;
	re.lastIndex = idx;
	let m;
	while ((m = re.exec(s)) !== null) {
		if (m[0] === "</div>") {
			depth--;
			if (depth === 0) return re.lastIndex;
		} else {
			depth++;
		}
	}
	return s.length;
}

// search dialog + mobile nav markup (appended once per page)
function chrome() {
	return `
<div id="search-dialog" class="fixed inset-0 z-50 hidden" role="dialog" aria-modal="true">
  <div data-search-backdrop class="fixed inset-0 bg-zinc-400/25 backdrop-blur-xs dark:bg-black/40"></div>
  <div class="fixed inset-0 overflow-y-auto px-4 py-4 sm:px-6 sm:py-20 md:py-32 lg:px-8 lg:py-[15vh]">
    <div class="mx-auto transform-gpu overflow-hidden rounded-lg bg-zinc-50 shadow-xl ring-1 ring-zinc-900/7.5 sm:max-w-xl dark:bg-zinc-900 dark:ring-zinc-800">
      <div class="group relative flex h-12">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" class="pointer-events-none absolute top-0 left-3 h-full w-5 stroke-zinc-500"><path stroke-linecap="round" stroke-linejoin="round" d="M12.01 12a4.25 4.25 0 1 0-6.02-6 4.25 4.25 0 0 0 6.02 6Zm0 0 3.24 3.25"></path></svg>
        <input type="search" placeholder="Find something..." class="flex-auto appearance-none bg-transparent pl-10 text-zinc-900 outline-hidden placeholder:text-zinc-500 focus:w-full focus:flex-none sm:text-sm dark:text-white [&amp;::-webkit-search-cancel-button]:hidden [&amp;::-webkit-search-decoration]:hidden [&amp;::-webkit-search-results-button]:hidden [&amp;::-webkit-search-results-decoration]:hidden" />
      </div>
      <div class="border-t border-zinc-200 px-6 py-14 text-center text-sm sm:px-14 dark:border-zinc-100/5">
        <p class="text-xs text-zinc-600 dark:text-zinc-400">Search is a demo feature in this static clone.</p>
      </div>
    </div>
  </div>
</div>
`;
}

function mobileNav(sidebarNavHtml) {
	return `
<div id="mobile-nav" class="fixed inset-0 z-50 hidden lg:hidden">
  <div data-mobilenav-backdrop class="fixed inset-0 top-14 bg-zinc-400/20 backdrop-blur-xs dark:bg-black/40"></div>
  <div class="fixed top-14 bottom-0 left-0 w-full overflow-y-auto bg-white px-4 pt-6 pb-4 shadow-lg ring-1 shadow-zinc-900/10 ring-zinc-900/7.5 sm:px-6 sm:pb-10 min-[416px]:max-w-sm dark:bg-zinc-900 dark:ring-zinc-800">
    ${sidebarNavHtml}
  </div>
</div>
`;
}

function pageHtml(p, content) {
	const themeBoot = `<script>(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(t);r.style.colorScheme=t;}catch(e){}})();</script>`;
	return `<!DOCTYPE html>
<html lang="en" class="h-full light" style="color-scheme: light;">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${p.title}</title>
<meta name="description" content="Learn everything there is to know about the Protocol API and integrate Protocol into your product.">
<link rel="icon" href="assets/favicon.ico" type="image/x-icon" sizes="48x48">
<link rel="stylesheet" href="assets/css/app.css">
${themeBoot}
</head>
<body class="flex min-h-full bg-white antialiased dark:bg-zinc-900">
${content}
<script src="assets/js/app.js"></script>
</body>
</html>`;
}

// Extract the sidebar nav HTML from home for mobile nav reuse (cleaned per page links)
function getSidebarNav(content) {
	const i = content.indexOf('<nav class="hidden lg:mt-10 lg:block"');
	if (i === -1) return "";
	const end = matchTag(content, i, "nav");
	let nav = content.slice(i, end);
	// make it visible inside mobile drawer
	nav = nav.replace(
		'class="hidden lg:mt-10 lg:block" data-sidebar-nav',
		'class="mt-4"',
	);
	return nav;
}
function matchTag(s, idx, tag) {
	const open = new RegExp(`<${tag}\\b`, "g");
	const close = new RegExp(`</${tag}>`, "g");
	const re = new RegExp(`<${tag}\\b|</${tag}>`, "g");
	re.lastIndex = idx;
	let depth = 0,
		m;
	while ((m = re.exec(s)) !== null) {
		if (m[0].startsWith("</")) {
			depth--;
			if (depth === 0) return re.lastIndex;
		} else depth++;
	}
	return s.length;
}

for (const p of PAGES) {
	const raw = fs.readFileSync(path.join(REF, p.slug, "page.html"), "utf8");
	let content = extractContent(raw);
	content = cleanNext(content);
	if (p.resource) content = buildResourcePanels(content, p.slug);
	content = addHooks(content);
	content = tagHelpful(content);
	content = rewriteAssets(content);
	content = rewriteLinks(content);
	const navHtml = getSidebarNav(content);
	content += chrome();
	content += mobileNav(navHtml);
	const out = pageHtml(p, content);
	fs.writeFileSync(path.join(__dirname, p.file), out);
	console.log("wrote", p.file, out.length, "bytes");
}
console.log("BUILD DONE");
