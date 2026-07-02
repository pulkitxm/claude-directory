// Theme management
(function initTheme() {
	var t = localStorage.getItem("theme") || "system";
	var d = window.matchMedia("(prefers-color-scheme: dark)").matches;
	var s = t === "dark" || (t === "system" && d);
	document.documentElement.classList.toggle("dark", s);
})();

document.addEventListener("DOMContentLoaded", function () {
	initThemeToggle();
	initMobileSidebar();
	initAccordions();
	autoOpenCurrentSection();
	highlightActiveLink();
	initSearch();
	initTabs();
	initCopyButtons();
	initTOC();
	initFeedback();
});

function initThemeToggle() {
	var containers = document.querySelectorAll("[data-theme-toggle-container]");
	containers.forEach(function (container) {
		var btns = container.querySelectorAll("[data-theme-option]");
		var current = localStorage.getItem("theme") || "system";
		updateThemeBtns(btns, current);
		btns.forEach(function (btn) {
			btn.addEventListener("click", function () {
				var theme = btn.getAttribute("data-theme-option");
				localStorage.setItem("theme", theme);
				var d = window.matchMedia("(prefers-color-scheme: dark)").matches;
				var shouldDark = theme === "dark" || (theme === "system" && d);
				document.documentElement.classList.toggle("dark", shouldDark);
				document
					.querySelectorAll("[data-theme-toggle-container]")
					.forEach(function (c) {
						updateThemeBtns(c.querySelectorAll("[data-theme-option]"), theme);
					});
			});
		});
	});
}

function updateThemeBtns(btns, current) {
	btns.forEach(function (b) {
		var isActive = b.getAttribute("data-theme-option") === current;
		b.setAttribute("aria-checked", isActive ? "true" : "false");
		if (isActive) {
			b.classList.add("active");
		} else {
			b.classList.remove("active");
		}
	});
}

function initMobileSidebar() {
	var sidebar = document.getElementById("sidebar");
	var backdrop = document.getElementById("sidebar-backdrop");
	var openBtn = document.getElementById("sidebar-open");
	var closeBtn = document.getElementById("sidebar-close");
	if (!sidebar) return;

	function open() {
		sidebar.classList.add("open");
		if (backdrop) backdrop.classList.add("active");
		document.body.style.overflow = "hidden";
	}

	function close() {
		sidebar.classList.remove("open");
		if (backdrop) backdrop.classList.remove("active");
		document.body.style.overflow = "";
	}

	if (openBtn) openBtn.addEventListener("click", open);
	if (closeBtn) closeBtn.addEventListener("click", close);
	if (backdrop) backdrop.addEventListener("click", close);

	// Close on link click (mobile)
	sidebar.querySelectorAll("a").forEach(function (a) {
		a.addEventListener("click", function () {
			if (window.innerWidth < 1024) close();
		});
	});
}

function initAccordions() {
	setTimeout(function () {
		var sections = document.querySelectorAll(".accordion-section");
		sections.forEach(function (section) {
			var trigger = section.querySelector("[data-accordion-trigger]");
			var content = section.querySelector(".accordion-content");
			var bg = section.querySelector("[data-background]");
			if (!trigger || !content) return;

			trigger.addEventListener("click", function () {
				var isExpanded = trigger.getAttribute("aria-expanded") === "true";
				// Close all others
				sections.forEach(function (other) {
					if (other !== section) {
						var ot = other.querySelector("[data-accordion-trigger]");
						var oc = other.querySelector(".accordion-content");
						var ob = other.querySelector("[data-background]");
						if (oc && ot) {
							oc.style.height = "0";
							oc.style.opacity = "0";
							oc.style.transform = "translateY(-0.5rem)";
							ot.setAttribute("aria-expanded", "false");
							if (ob) {
								ob.classList.remove("opacity-100");
								ob.classList.add("opacity-0");
							}
						}
					}
				});
				if (isExpanded) {
					content.style.height = "0";
					content.style.opacity = "0";
					content.style.transform = "translateY(-0.5rem)";
					trigger.setAttribute("aria-expanded", "false");
					if (bg) {
						bg.classList.remove("opacity-100");
						bg.classList.add("opacity-0");
					}
				} else {
					content.style.height = content.scrollHeight + "px";
					content.style.opacity = "1";
					content.style.transform = "translateY(0)";
					trigger.setAttribute("aria-expanded", "true");
					if (bg) {
						bg.classList.add("opacity-100");
						bg.classList.remove("opacity-0");
					}
				}
			});
		});
	}, 100);
}

function autoOpenCurrentSection() {
	var currentPath = window.location.pathname;
	setTimeout(function () {
		document.querySelectorAll(".accordion-section").forEach(function (section) {
			var links = section.querySelectorAll("a");
			var hasActive = Array.from(links).some(function (a) {
				var href = a.getAttribute("href");
				if (!href) return false;
				var norm = currentPath.replace("/index.html", "").replace(".html", "");
				var normHref = href.replace("/index.html", "").replace(".html", "");
				return (
					norm === normHref || (normHref !== "/" && norm.endsWith(normHref))
				);
			});
			if (hasActive) {
				var trigger = section.querySelector("[data-accordion-trigger]");
				var content = section.querySelector(".accordion-content");
				var bg = section.querySelector("[data-background]");
				if (trigger && content) {
					content.style.height = content.scrollHeight + "px";
					content.style.opacity = "1";
					content.style.transform = "translateY(0)";
					trigger.setAttribute("aria-expanded", "true");
					if (bg) {
						bg.classList.add("opacity-100");
						bg.classList.remove("opacity-0");
					}
				}
			}
		});
	}, 150);
}

function highlightActiveLink() {
	var currentPath = window.location.pathname;
	var sidebar = document.getElementById("sidebar");
	if (!sidebar) return;
	sidebar.querySelectorAll("a").forEach(function (link) {
		var href = link.getAttribute("href");
		if (!href) return;
		var normPath = currentPath.replace("/index.html", "").replace(".html", "");
		var normHref = href.replace("/index.html", "").replace(".html", "");
		if (
			normPath === normHref ||
			(normHref.length > 1 && normPath.endsWith(normHref))
		) {
			link.classList.add("active-link");
		}
	});
}

// Search
var DOCS = [
	{
		title: "Accordion",
		content:
			"Expandable section UI using native details for accessibility and progressive enhancement.",
		category: "components",
		url: "docs/components/accordion.html",
	},
	{
		title: "Alert",
		content:
			"Contextual alert banners for feedback, messaging, or inline warnings.",
		category: "components",
		url: "docs/components/alerts.html",
	},
	{
		title: "Badge",
		content:
			"Small, contextual indicators for labeling, categorizing, or status messaging.",
		category: "components",
		url: "docs/components/badges.html",
	},
	{
		title: "Button",
		content:
			"A flexible button component with multiple variants, sizes, and icon support for ZeroIndex",
		category: "components",
		url: "docs/components/buttons.html",
	},
	{
		title: "Tabs",
		content:
			"An accessible tab interface with buttons and panels for switching between related content.",
		category: "components",
		url: "docs/components/tabs.html",
	},
	{
		title: "Typography",
		content:
			"A flexible typography component for semantic text with custom sizing and styling in ZeroIndex.",
		category: "components",
		url: "docs/components/typography.html",
	},
	{
		title: "Wrapper",
		content:
			"A utility layout component for wrapping content with standard or prose-style layouts.",
		category: "components",
		url: "docs/components/wrappers.html",
	},
	{
		title: "Introduction",
		content: "Welcome to our documentation. Learn how to get started quickly.",
		category: "getting-started",
		url: "docs/getting-started/introduction.html",
	},
	{
		title: "Quick Start Guide",
		content:
			"Get up and running in just a few minutes with this quick start guide.",
		category: "getting-started",
		url: "docs/getting-started/quick-start.html",
	},
	{
		title: "Frequently Asked Questions",
		content:
			"Answers to common questions about using and contributing to our documentation.",
		category: "help",
		url: "docs/help/faq.html",
	},
	{
		title: "Sidebar",
		content: "Understanding the sidebar navigation component.",
		category: "navigation",
		url: "docs/navigation/sidebar.html",
	},
	{
		title: "Sidebar Links",
		content: "Understanding the sidebar accordion links.",
		category: "navigation",
		url: "docs/navigation/sidebar-links.html",
	},
	{
		title: "Shiki Code Highlighting",
		content: "How syntax highlighting and styling works in ZeroIndex",
		category: "shiki",
		url: "docs/shiki/code-highlighter.html",
	},
	{
		title: "Shiki Annotation Examples",
		content: "Simple examples to get you started with basic functionality.",
		category: "shiki",
		url: "docs/shiki/shiki-examples.html",
	},
	{
		title: "Integrations",
		content: "The coolest way to integrate Astro with your favorite tools.",
		category: "integrations",
		url: "integrations.html",
	},
	{
		title: "Changelog",
		content: "Stay up to date with the latest updates and changes to ZeroIndex",
		category: "changelog",
		url: "changelog.html",
	},
	{
		title: "Licensing",
		content: "Licensing information for ZeroIndex template.",
		category: "info",
		url: "infopages/licensing.html",
	},
	{
		title: "Blog",
		content: "Read the latest news and tutorials from ZeroIndex.",
		category: "blog",
		url: "blog/index.html",
	},
];

var searchSelectedIndex = -1;

function initSearch() {
	document.addEventListener("keydown", function (e) {
		if ((e.metaKey || e.ctrlKey) && e.key === "k") {
			e.preventDefault();
			openSearch();
		}
		if (e.key === "Escape") closeSearch();
	});

	var input = document.getElementById("search-input");
	if (input) {
		input.addEventListener("input", function () {
			renderSearchResults(input.value);
		});
		input.addEventListener("keydown", function (e) {
			var items = document.querySelectorAll(".search-result-item");
			if (e.key === "ArrowDown") {
				e.preventDefault();
				searchSelectedIndex = Math.min(
					searchSelectedIndex + 1,
					items.length - 1,
				);
				updateSearchSelection(items);
			} else if (e.key === "ArrowUp") {
				e.preventDefault();
				searchSelectedIndex = Math.max(searchSelectedIndex - 1, 0);
				updateSearchSelection(items);
			} else if (
				e.key === "Enter" &&
				searchSelectedIndex >= 0 &&
				items[searchSelectedIndex]
			) {
				items[searchSelectedIndex].click();
			}
		});
	}
}

function openSearch() {
	var modal = document.getElementById("search-modal");
	if (!modal) return;
	modal.classList.remove("hidden");
	var input = document.getElementById("search-input");
	if (input) {
		input.value = "";
		input.focus();
	}
	renderSearchResults("");
	searchSelectedIndex = -1;
}

function closeSearch() {
	var modal = document.getElementById("search-modal");
	if (modal) modal.classList.add("hidden");
}

function renderSearchResults(query) {
	var container = document.getElementById("search-results");
	if (!container) return;
	query = query.trim().toLowerCase();
	var results = query
		? DOCS.filter(function (d) {
				return (
					d.title.toLowerCase().includes(query) ||
					d.content.toLowerCase().includes(query) ||
					d.category.toLowerCase().includes(query)
				);
			})
		: DOCS.slice(0, 8);

	if (results.length === 0) {
		container.innerHTML =
			'<div class="search-empty">No results for "' +
			escapeHtml(query) +
			'"</div>';
		return;
	}

	container.innerHTML = results
		.map(function (r, i) {
			return (
				'<a href="' +
				escapeHtml(r.url) +
				'" class="search-result-item" onclick="closeSearch()">' +
				'<div class="search-result-title">' +
				escapeHtml(r.title) +
				"</div>" +
				'<div class="search-result-category">' +
				escapeHtml(r.category) +
				"</div>" +
				"</a>"
			);
		})
		.join("");
	searchSelectedIndex = -1;
}

function updateSearchSelection(items) {
	items.forEach(function (item, i) {
		item.classList.toggle("selected", i === searchSelectedIndex);
	});
}

function escapeHtml(str) {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

function initTabs() {
	document.querySelectorAll(".tabs").forEach(function (tabs) {
		var btns = tabs.querySelectorAll(".tab-btn");
		var panels = tabs.querySelectorAll(".tab-panel");
		btns.forEach(function (btn, i) {
			btn.addEventListener("click", function () {
				btns.forEach(function (b) {
					b.classList.remove("active");
				});
				panels.forEach(function (p) {
					p.classList.remove("active");
				});
				btn.classList.add("active");
				if (panels[i]) panels[i].classList.add("active");
			});
		});
		// Activate first
		if (btns[0]) btns[0].classList.add("active");
		if (panels[0]) panels[0].classList.add("active");
	});
}

function initCopyButtons() {
	document.querySelectorAll("pre code").forEach(function (block) {
		var pre = block.parentElement;
		if (!pre) return;
		var btn = document.createElement("button");
		btn.className = "copy-btn";
		btn.title = "Copy code";
		btn.innerHTML =
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="12" height="12"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"/><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"/></svg>';
		pre.style.position = "relative";
		pre.appendChild(btn);
		btn.addEventListener("click", function () {
			navigator.clipboard.writeText(block.textContent).then(function () {
				btn.innerHTML =
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="12" height="12"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/><path d="M9 12l2 2l4 -4"/></svg>';
				setTimeout(function () {
					btn.innerHTML =
						'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="12" height="12"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"/><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"/></svg>';
				}, 2000);
			});
		});
	});
}

function initTOC() {
	var links = document.querySelectorAll(".toc-link");
	var headings = document.querySelectorAll("h2, h3");
	if (!links.length || !headings.length) return;

	function onScroll() {
		var active = null;
		var scrollY = window.scrollY + 100;
		var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
		if (scrollY >= maxScroll - 100 && headings.length) {
			active = headings[headings.length - 1];
		} else {
			headings.forEach(function (h) {
				if (scrollY >= h.offsetTop) active = h;
			});
		}
		links.forEach(function (l) {
			var isActive = active && l.dataset.headingId === active.id;
			l.classList.toggle("active", !!isActive);
		});
	}

	onScroll();
	window.addEventListener("scroll", onScroll);
	window.addEventListener("hashchange", function () {
		setTimeout(onScroll, 100);
	});
}

function initFeedback() {
	var yes = document.getElementById("yes-btn");
	var no = document.getElementById("no-btn");
	var btns = document.getElementById("feedback-buttons");
	var thanks = document.getElementById("thank-you");
	if (!yes || !no || !btns || !thanks) return;
	function done() {
		btns.classList.add("hidden");
		thanks.classList.remove("hidden");
	}
	yes.addEventListener("click", done);
	no.addEventListener("click", done);
}
