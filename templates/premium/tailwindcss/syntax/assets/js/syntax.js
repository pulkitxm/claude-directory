// Syntax template — vanilla JS shim reproducing the Next + Headless UI + Framer Motion behaviours.
(function () {
	"use strict";

	/* ---------- Theme listbox (Light / Dark / System) ---------- */
	function applyTheme(theme) {
		var isDark =
			theme === "dark" ||
			(theme === "system" &&
				window.matchMedia("(prefers-color-scheme: dark)").matches);
		document.documentElement.classList.toggle("dark", isDark);
	}

	function initTheme() {
		var btn = document.querySelector("[data-theme-button]");
		if (!btn) return;
		var menu = document.querySelector("[data-theme-menu]");
		var stored = localStorage.getItem("theme") || "system";

		function setActiveOption() {
			menu.querySelectorAll("[data-theme-option]").forEach(function (o) {
				var on =
					o.getAttribute("data-theme-option") ===
					(localStorage.getItem("theme") || "system");
				o.setAttribute("aria-selected", on ? "true" : "false");
				o.classList.toggle("text-sky-500", on);
			});
		}

		function open() {
			menu.classList.remove("hidden");
			btn.setAttribute("aria-expanded", "true");
			setTimeout(function () {
				document.addEventListener("click", onDocClick);
				document.addEventListener("keydown", onKey);
			});
		}
		function close() {
			menu.classList.add("hidden");
			btn.setAttribute("aria-expanded", "false");
			document.removeEventListener("click", onDocClick);
			document.removeEventListener("keydown", onKey);
		}
		function onDocClick(e) {
			if (!menu.contains(e.target) && !btn.contains(e.target)) close();
		}
		function onKey(e) {
			if (e.key === "Escape") close();
		}

		btn.addEventListener("click", function (e) {
			e.stopPropagation();
			if (menu.classList.contains("hidden")) {
				setActiveOption();
				open();
			} else close();
		});

		menu.querySelectorAll("[data-theme-option]").forEach(function (o) {
			o.addEventListener("click", function () {
				var t = o.getAttribute("data-theme-option");
				localStorage.setItem("theme", t);
				applyTheme(t);
				close();
			});
		});

		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", function () {
				if ((localStorage.getItem("theme") || "system") === "system")
					applyTheme("system");
			});
	}

	/* ---------- Search modal (Ctrl/Cmd K) ---------- */
	function initSearch() {
		var triggers = document.querySelectorAll("[data-search-open]");
		if (!triggers.length) return;
		var overlay = null;

		function close() {
			if (!overlay) return;
			overlay.remove();
			overlay = null;
			document.removeEventListener("keydown", onKey);
		}
		function onKey(e) {
			if (e.key === "Escape") close();
		}
		function open() {
			if (overlay) return;
			overlay = document.createElement("div");
			overlay.setAttribute("role", "dialog");
			overlay.className = "fixed inset-0 z-50";
			overlay.innerHTML =
				'<div data-search-backdrop class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"></div>' +
				'<div class="fixed inset-0 overflow-y-auto px-4 py-4 sm:px-6 sm:py-20 md:py-32 lg:px-8 lg:py-[15vh]">' +
				'<div data-search-panel class="mx-auto transform-gpu overflow-hidden rounded-xl bg-white shadow-xl sm:max-w-xl dark:bg-slate-800 dark:ring-1 dark:ring-slate-700">' +
				'<form action="" novalidate role="search"><div class="group relative flex h-12">' +
				'<svg viewBox="0 0 20 20" class="pointer-events-none absolute top-0 left-3 h-full w-5 stroke-slate-500"><path d="M16.293 17.707a1 1 0 0 0 1.414-1.414l-1.414 1.414ZM9 14a5 5 0 0 1-5-5H2a7 7 0 0 0 7 7v-2ZM4 9a5 5 0 0 1 5-5V2a7 7 0 0 0-7 7h2Zm5-5a5 5 0 0 1 5 5h2a7 7 0 0 0-7-7v2Zm8.707 12.293-3.757-3.757-1.414 1.414 3.757 3.757 1.414-1.414ZM14 9a4.98 4.98 0 0 1-1.464 3.536l1.414 1.414A6.98 6.98 0 0 0 16 9h-2Zm-1.464 3.536A4.98 4.98 0 0 1 9 14v2a6.98 6.98 0 0 0 4.95-2.05l-1.414-1.414Z" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>' +
				'<input data-search-input class="flex-auto appearance-none bg-transparent pl-10 text-slate-900 outline-hidden placeholder:text-slate-400 focus:w-full focus:flex-none sm:text-sm dark:text-white [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden" placeholder="Find something..." type="search">' +
				"</div></form>" +
				'<div class="border-t border-slate-200 px-6 py-8 text-center text-sm text-slate-700 dark:border-slate-400/10 dark:text-slate-400">Search for anything in the CacheAdvance docs.</div>' +
				"</div></div>";
			document.body.appendChild(overlay);
			overlay
				.querySelector("[data-search-backdrop]")
				.addEventListener("click", close);
			var input = overlay.querySelector("[data-search-input]");
			if (input) input.focus();
			document.addEventListener("keydown", onKey);
		}

		triggers.forEach(function (t) {
			t.addEventListener("click", open);
		});
		document.addEventListener("keydown", function (e) {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				open();
			}
		});
	}

	/* ---------- Mobile nav slide-over ---------- */
	function initMobileNav() {
		var open = document.querySelector("[data-mobile-open]");
		var drawer = document.querySelector("[data-mobile-drawer]");
		if (!open || !drawer) return;
		var backdrop = drawer.querySelector("[data-mobile-backdrop]");
		var closeBtn = drawer.querySelector("[data-mobile-close]");

		function show() {
			drawer.classList.remove("hidden");
			document.body.style.overflow = "hidden";
			document.addEventListener("keydown", onKey);
		}
		function hide() {
			drawer.classList.add("hidden");
			document.body.style.overflow = "";
			document.removeEventListener("keydown", onKey);
		}
		function onKey(e) {
			if (e.key === "Escape") hide();
		}
		open.addEventListener("click", show);
		if (closeBtn) closeBtn.addEventListener("click", hide);
		if (backdrop) backdrop.addEventListener("click", hide);
	}

	/* ---------- TOC scroll-spy ---------- */
	function initScrollSpy() {
		var tocLinks = Array.prototype.slice.call(
			document.querySelectorAll("[data-toc] a"),
		);
		if (!tocLinks.length) return;
		var ids = tocLinks
			.map(function (a) {
				return a.getAttribute("href");
			})
			.filter(function (h) {
				return h && h.charAt(0) === "#";
			})
			.map(function (h) {
				return h.slice(1);
			});
		var headings = ids
			.map(function (id) {
				return document.getElementById(id);
			})
			.filter(Boolean);

		function setActive(id) {
			tocLinks.forEach(function (a) {
				var on = a.getAttribute("href") === "#" + id;
				a.classList.toggle("text-sky-500", on);
				a.classList.toggle("font-normal", !on || a.closest("h3") == null);
				a.classList.toggle("text-slate-500", !on && a.closest("h3") != null);
			});
		}
		function onScroll() {
			var top = window.scrollY + 120;
			var current = headings[0] ? headings[0].id : null;
			headings.forEach(function (h) {
				if (h.offsetTop <= top) current = h.id;
			});
			if (current) setActive(current);
		}
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
	}

	/* ---------- Sidebar active-section highlight band ---------- */
	function initSidebarHighlight() {
		var nav = document.querySelector("[data-sidebar-nav]");
		if (!nav) return;
		var active = nav.querySelector("a[data-active]");
		if (!active) return;
		var group = active.closest("li[data-nav-group]");
		if (!group) return;
		var band = document.createElement("div");
		band.className =
			"absolute inset-x-0 top-0 bg-slate-800/2.5 will-change-transform dark:bg-white/2.5";
		band.style.position = "absolute";
		band.style.borderRadius = "0.5rem";
		var list = group.querySelector("ul");
		if (!list) return;
		list.style.position = "relative";
		var top = active.offsetTop - 6;
		band.style.top = top + "px";
		band.style.left = "0";
		band.style.right = "0";
		band.style.height = active.offsetHeight + 12 + "px";
		band.style.background = "rgba(15,23,42,0.025)";
		band.style.zIndex = "0";
		list.insertBefore(band, list.firstChild);
		active.parentElement.style.position = "relative";
		active.parentElement.style.zIndex = "1";
	}

	function boot() {
		initTheme();
		initSearch();
		initMobileNav();
		initScrollSpy();
		initSidebarHighlight();
	}

	if (document.readyState === "loading")
		document.addEventListener("DOMContentLoaded", boot);
	else boot();
})();
