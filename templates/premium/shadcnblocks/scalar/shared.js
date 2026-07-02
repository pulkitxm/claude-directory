/* ===== no-flash theme boot (also inline in <head>) ===== */
(function () {
	try {
		var t = localStorage.getItem("scalar-theme");
		if (!t)
			t = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		if (t === "dark") document.documentElement.classList.add("dark");
	} catch (e) {}
})();

const ICON = {
	github:
		'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z"/></svg>',
	sun: '<svg class="sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
	moon: '<svg class="moon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
	menu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
	x: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
	chev: '<svg class="chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg>',
	check:
		'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 6 9 17l-5-5"/></svg>',
	discord:
		'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.2.4a18 18 0 0 1 4.3 1.4 16 16 0 0 0-15-.0A18 18 0 0 1 8.8 3.4L8.6 3a19.8 19.8 0 0 0-4.9 1.4C.6 9 .0 13.5.3 17.9a20 20 0 0 0 6 3l.8-1.4c-.7-.3-1.3-.6-1.9-1l.5-.3a14 14 0 0 0 12 0l.5.3c-.6.4-1.2.7-1.9 1l.8 1.4a20 20 0 0 0 6-3c.4-5.1-.6-9.6-3.1-13.5ZM8.3 15.3c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm7.4 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z"/></svg>',
	x_social:
		'<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
	linkedin:
		'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.34 18.34V9.96H5.56v8.38zM6.95 8.73a1.61 1.61 0 1 0 0-3.22 1.61 1.61 0 0 0 0 3.22zm11.39 9.61v-4.6c0-2.46-1.31-3.6-3.06-3.6-1.41 0-2.04.78-2.4 1.33v-1.14h-2.77v8.38h2.77v-4.68c0-.25.02-.5.09-.67.2-.49.65-1 1.41-1 .99 0 1.39.76 1.39 1.87v4.48z"/></svg>',
};

const NAV = [
	{ t: "About", h: "about.html" },
	{ t: "Roadmap", h: "roadmap.html" },
	{ t: "FAQs", h: "faq.html" },
	{ t: "Blog", h: "blog.html" },
	{ t: "Docs", h: "docs.html" },
	{ t: "Contact", h: "contact.html" },
];
const PRODUCT_ITEMS = [
	{ t: "Content Modeling", d: "Design schemas with code or UI", i: "▣" },
	{ t: "API & GraphQL", d: "REST and GraphQL endpoints", i: "{}" },
	{ t: "Visual Editor", d: "Edit content in real time", i: "✎" },
	{ t: "Collaboration", d: "Realtime multiplayer editing", i: "⚇" },
];

function logo(prefix) {
	return `<a class="brand" href="${prefix}index.html"><img class="logo-icon" src="${prefix}assets/layout/logo-icon.svg" alt=""><span>Scalar</span></a>`;
}

function renderChrome(opts) {
	opts = opts || {};
	const active = opts.active || "";
	const prefix = opts.prefix || "";
	const promo = `<div class="promo" id="promo"><div class="promo-inner"><span>Purchase this theme on <a class="promo-strong" href="https://www.shadcnblocks.com/template/scalar" target="_blank" rel="noopener">shadcnblocks.com</a></span><a class="promo-btn" href="https://www.shadcnblocks.com/template/scalar" target="_blank" rel="noopener">Get Template</a></div><button class="promo-close" id="promoClose" aria-label="Dismiss">${ICON.x}</button></div>`;

	const navHtml = NAV.map(
		(n) =>
			`<a class="nav-link ${active === n.t ? "active text-accent" : ""}" href="${prefix}${n.h}">${n.t}</a>`,
	).join("");
	const productMenu = PRODUCT_ITEMS.map(
		(p) =>
			`<a class="dropdown-item" href="${prefix}docs.html"><span class="di-icon">${p.i}</span><span><span class="di-title">${p.t}</span><br><span class="di-desc">${p.d}</span></span></a>`,
	).join("");

	const header = `<header class="header"><div class="header-inner">
    ${logo(prefix)}
    <nav class="nav">
      <div class="dropdown" id="productDd"><button class="nav-link" id="productBtn">Product ${ICON.chev}</button>
        <div class="dropdown-menu">${productMenu}</div></div>
      ${navHtml}
    </nav>
    <div class="header-right">
      <a class="gh-stars" href="#">${ICON.github}<span>14.3k</span></a>
      <button class="icon-btn theme-toggle desktop-only" id="themeToggle" aria-label="Toggle theme">${ICON.sun}${ICON.moon}</button>
      <a class="btn btn-ghost desktop-only" href="${prefix}login.html">Log In</a>
      <a class="btn btn-primary desktop-only" href="${prefix}signup.html">Start Free Trial</a>
      <button class="icon-btn hamburger" id="hamburger" aria-label="Menu">${ICON.menu}</button>
    </div>
  </div></header>
  <div class="mobile-overlay" id="mobileOverlay"></div>
  <aside class="mobile-menu" id="mobileMenu">
    <div style="display:flex;justify-content:flex-end"><button class="icon-btn" id="mobileClose">${ICON.x}</button></div>
    <a href="${prefix}index.html">Home</a>
    ${NAV.map((n) => `<a href="${prefix}${n.h}">${n.t}</a>`).join("")}
    <button id="mobileTheme">Toggle theme</button>
    <a href="${prefix}login.html">Log In</a>
    <a class="btn btn-primary" style="margin-top:12px" href="${prefix}signup.html">Start Free Trial</a>
  </aside>`;

	return promo + header;
}

function renderCTA() {
	const osList = [
		"Self-host on your own infrastructure",
		"Full access to the Scalar CMS core",
		"GitHub community support",
		"Ideal for developers and internal tools",
	];
	const cloudList = [
		"Fully managed infrastructure",
		"Realtime collaboration & autosave",
		"Role-based access & team permissions",
		"Built-in CDN for media delivery",
		"Email support & usage analytics",
	];
	const li = (arr) => arr.map((x) => `<li>${ICON.check}${x}</li>`).join("");
	return `<section class="cta"><div class="cta-inner"><h2 class="cta-title">Start free. Scale confidently.</h2></div>
    <div class="cta-grid" style="border-top:1px solid oklch(22% 0 0)">
      <div class="cta-col"><h3>Open Source</h3><div class="cta-price">0$ / forever</div>
        <ul class="cta-list">${li(osList)}</ul>
        <a class="btn btn-pill cta-btn-dark" href="#">View on GitHub</a></div>
      <div class="cta-col"><span class="cta-most">Most popular</span><h3>Cloud</h3><div class="cta-price">From $29 / month</div>
        <ul class="cta-list">${li(cloudList)}</ul>
        <a class="btn btn-pill cta-btn-white" href="signup.html">Start Free Trial</a></div>
    </div></section>`;
}

function renderFooter(prefix) {
	prefix = prefix || "";
	return `<footer class="footer">
    <div class="footer-top">
      <div class="footer-socials">
        <a href="#" aria-label="Discord">${ICON.discord}</a>
        <a href="#" aria-label="GitHub">${ICON.github}</a>
        <a href="#" aria-label="X">${ICON.x_social}</a>
        <a href="#" aria-label="LinkedIn">${ICON.linkedin}</a>
      </div>
      <div class="footer-status"><span class="dot"></span>All systems operational</div>
    </div>
    <div class="footer-legal"><a href="${prefix}privacy-policy.html">Privacy Policy</a><span>·</span><a href="${prefix}terms-of-service.html">Terms of Service</a></div>
    <div class="footer-watermark" aria-hidden="true">Scalar</div>
  </footer>`;
}

/* ===== mount + wire interactions ===== */
function mountChrome(active, prefix) {
	prefix = prefix || "";
	const h = document.getElementById("site-header");
	if (h) h.innerHTML = renderChrome({ active, prefix });
	const c = document.getElementById("site-cta");
	if (c) c.innerHTML = renderCTA();
	const f = document.getElementById("site-footer");
	if (f) f.innerHTML = renderFooter(prefix);
	wire();
}

function setTheme(dark) {
	document.documentElement.classList.toggle("dark", dark);
	try {
		localStorage.setItem("scalar-theme", dark ? "dark" : "light");
	} catch (e) {}
}

function wire() {
	// promo dismiss
	const promo = document.getElementById("promo");
	const pc = document.getElementById("promoClose");
	if (pc) pc.onclick = () => promo.classList.add("hidden");

	// theme
	const tt = document.getElementById("themeToggle");
	if (tt)
		tt.onclick = () =>
			setTheme(!document.documentElement.classList.contains("dark"));
	const mt = document.getElementById("mobileTheme");
	if (mt)
		mt.onclick = () =>
			setTheme(!document.documentElement.classList.contains("dark"));

	// product dropdown
	const dd = document.getElementById("productDd");
	const db = document.getElementById("productBtn");
	if (db) {
		db.onclick = (e) => {
			e.stopPropagation();
			dd.classList.toggle("open");
		};
		document.addEventListener("click", () => dd.classList.remove("open"));
	}

	// mobile
	const mm = document.getElementById("mobileMenu");
	const mo = document.getElementById("mobileOverlay");
	const openM = () => {
		mm.classList.add("open");
		mo.classList.add("open");
	};
	const closeM = () => {
		mm.classList.remove("open");
		mo.classList.remove("open");
	};
	const hb = document.getElementById("hamburger");
	if (hb) hb.onclick = openM;
	const mc = document.getElementById("mobileClose");
	if (mc) mc.onclick = closeM;
	if (mo) mo.onclick = closeM;

	initAccordions();
	initTabs();
	initReveal();
	initDocs();
}

const DOCS_NAV = [
	{ group: "", links: [["Overview", "docs.html"]] },
	{
		group: "Getting Started",
		links: [
			["Installation", "docs/getting-started/installation.html"],
			["Configuration", "docs/getting-started/configuration.html"],
		],
	},
	{
		group: "Guides",
		links: [
			["Guides", "docs/guides/guides.html"],
			["Tutorials", "docs/guides/tutorials.html"],
			["Examples", "docs/guides/examples.html"],
		],
	},
	{
		group: "API",
		links: [
			["API Reference", "docs/api/api-reference.html"],
			["Authentication", "docs/api/authentication.html"],
			["Webhooks", "docs/api/webhooks.html"],
		],
	},
	{
		group: "Advanced",
		links: [
			["Deployment", "docs/advanced/deployment.html"],
			["Performance", "docs/advanced/performance.html"],
		],
	},
];

function renderDocsSidebar(prefix, currentHref) {
	prefix = prefix || "";
	return DOCS_NAV.map((g) => {
		const head = g.group ? `<div class="docs-nav-head">${g.group}</div>` : "";
		const items = g.links
			.map(
				([label, href]) =>
					`<a class="docs-nav-link ${href === currentHref ? "active" : ""}" href="${prefix}${href}">${label}</a>`,
			)
			.join("");
		return `<div class="docs-nav-group">${head}${items}</div>`;
	}).join("");
}

function initDocs() {
	const shell = document.querySelector(".docs-shell");
	if (!shell || shell.dataset.wired) return;
	shell.dataset.wired = "1";

	// populate sidebar
	const sb = shell.querySelector(".docs-sidebar-nav");
	if (sb)
		sb.innerHTML = renderDocsSidebar(
			document.body.dataset.prefix || "",
			sb.dataset.current || "",
		);

	// mobile sidebar toggle
	const sidebar = shell.querySelector(".docs-sidebar");
	const toggle = shell.querySelector(".docs-sidebar-toggle");
	const backdrop = shell.querySelector(".docs-sidebar-backdrop");
	if (toggle && sidebar) {
		const close = () => {
			sidebar.classList.remove("open");
			if (backdrop) backdrop.classList.remove("open");
		};
		toggle.onclick = () => {
			sidebar.classList.add("open");
			if (backdrop) backdrop.classList.add("open");
		};
		if (backdrop) backdrop.onclick = close;
		sidebar
			.querySelectorAll(".docs-nav-link")
			.forEach((l) => l.addEventListener("click", close));
	}

	// TOC scroll-spy
	const toc = shell.querySelector(".docs-toc");
	if (!toc) return;
	const links = Array.from(toc.querySelectorAll("a[href^='#']"));
	if (!links.length) return;
	const map = new Map();
	links.forEach((l) => {
		const id = decodeURIComponent(l.getAttribute("href").slice(1));
		const el = document.getElementById(id);
		if (el) map.set(el, l);
	});
	const heads = Array.from(map.keys());
	const setActive = () => {
		let current = heads[0];
		const y = window.scrollY + 100;
		for (const h of heads) {
			if (h.offsetTop <= y) current = h;
			else break;
		}
		links.forEach((l) => l.classList.remove("active"));
		const active = map.get(current);
		if (active) active.classList.add("active");
	};
	setActive();
	let ticking = false;
	window.addEventListener(
		"scroll",
		() => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(() => {
				setActive();
				ticking = false;
			});
		},
		{ passive: true },
	);
}

function initAccordions() {
	document.querySelectorAll(".accordion-trigger").forEach((t) => {
		if (t.dataset.wired) return;
		t.dataset.wired = "1";
		t.onclick = () => t.closest(".accordion-item").classList.toggle("open");
	});
}
function initTabs() {
	document.querySelectorAll("[data-tabgroup]").forEach((group) => {
		if (group.dataset.wired) return;
		group.dataset.wired = "1";
		const tabs = group.querySelectorAll(".tab,[data-tab]");
		tabs.forEach((tab) => {
			tab.onclick = () => {
				tabs.forEach((x) => x.classList.remove("active"));
				tab.classList.add("active");
				const val = tab.dataset.tab;
				const scope = group.dataset.tabgroup;
				document.querySelectorAll(`[data-tabpanel="${scope}"]`).forEach((p) => {
					p.style.display =
						val === "all" || p.dataset.cat === val || !val ? "" : "none";
				});
			};
		});
	});
}
function initReveal() {
	const els = document.querySelectorAll(".reveal");
	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					e.target.classList.add("in");
					io.unobserve(e.target);
				}
			});
		},
		{ threshold: 0.05, rootMargin: "0px 0px -40px 0px" },
	);
	els.forEach((el) => io.observe(el));
	// safety: ensure nothing stays hidden (e.g. full-page capture / no-scroll)
	setTimeout(() => els.forEach((el) => el.classList.add("in")), 1200);
}

document.addEventListener("DOMContentLoaded", () => {
	const b = document.body;
	mountChrome(b.dataset.active || "", b.dataset.prefix || "");
});
