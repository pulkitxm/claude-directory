/* Protocol clone — vanilla JS shim reproducing the Next.js/Headless-UI/Framer behaviours */
(function () {
	"use strict";

	/* ---------- Theme toggle (persisted) ---------- */
	function applyTheme(t) {
		var root = document.documentElement;
		root.classList.remove("light", "dark");
		root.classList.add(t);
		root.style.colorScheme = t;
	}
	function currentTheme() {
		try {
			var s = localStorage.getItem("theme");
			if (s === "light" || s === "dark") return s;
		} catch (e) {}
		return window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
	}
	document.addEventListener("click", function (e) {
		var btn = e.target.closest('button[aria-label*="theme"]');
		if (!btn) return;
		var next = document.documentElement.classList.contains("dark")
			? "light"
			: "dark";
		try {
			localStorage.setItem("theme", next);
		} catch (err) {}
		applyTheme(next);
		document
			.querySelectorAll('button[aria-label*="theme"]')
			.forEach(function (b) {
				b.setAttribute(
					"aria-label",
					next === "dark" ? "Switch to light theme" : "Switch to dark theme",
				);
			});
	});

	/* ---------- Top-bar frosted hairline on scroll ---------- */
	var header = document.querySelector("header > div");
	function onScroll() {
		var y = window.scrollY;
		document.querySelectorAll("[data-topbar]").forEach(function (el) {
			el.style.setProperty("--bg-opacity-light", y > 4 ? "90%" : "50%");
			el.style.setProperty("--bg-opacity-dark", y > 4 ? "80%" : "20%");
		});
	}
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();

	/* ---------- Search modal ---------- */
	var searchDialog = document.getElementById("search-dialog");
	function openSearch() {
		if (!searchDialog) return;
		searchDialog.classList.remove("hidden");
		searchDialog.dataset.open = "";
		document.body.style.overflow = "hidden";
		var input = searchDialog.querySelector("input");
		if (input)
			setTimeout(function () {
				input.focus();
			}, 30);
	}
	function closeSearch() {
		if (!searchDialog) return;
		searchDialog.classList.add("hidden");
		delete searchDialog.dataset.open;
		document.body.style.overflow = "";
	}
	document.addEventListener("click", function (e) {
		if (e.target.closest("[data-search-open]")) {
			e.preventDefault();
			openSearch();
		} else if (e.target.closest("[data-search-backdrop]")) closeSearch();
	});
	document.addEventListener("keydown", function (e) {
		if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
			e.preventDefault();
			if (searchDialog && searchDialog.classList.contains("hidden"))
				openSearch();
			else closeSearch();
		} else if (e.key === "Escape") {
			closeSearch();
			closeMobileNav();
		}
	});

	/* ---------- Mobile nav drawer ---------- */
	var mnav = document.getElementById("mobile-nav");
	function openMobileNav() {
		if (!mnav) return;
		mnav.classList.remove("hidden");
		document.body.style.overflow = "hidden";
	}
	function closeMobileNav() {
		if (!mnav) return;
		mnav.classList.add("hidden");
		document.body.style.overflow = "";
	}
	document.addEventListener("click", function (e) {
		if (e.target.closest('[aria-label="Toggle navigation"]')) {
			e.preventDefault();
			openMobileNav();
		} else if (e.target.closest("[data-mobilenav-backdrop]")) closeMobileNav();
		else if (
			mnav &&
			!mnav.classList.contains("hidden") &&
			e.target.closest("#mobile-nav a")
		)
			closeMobileNav();
	});

	/* ---------- Code panel tabs ---------- */
	document.querySelectorAll("[data-tab-group]").forEach(function (group) {
		// panels live in a sibling container; scope to the enclosing .not-prose / rounded-2xl wrapper
		var scope =
			group.closest(".not-prose") || group.parentElement.parentElement;
		var tabs = group.querySelectorAll('[role="tab"]');
		var panels = scope.querySelectorAll('[role="tabpanel"]');
		function select(idx) {
			tabs.forEach(function (t, i) {
				var on = i === idx;
				t.setAttribute("aria-selected", on ? "true" : "false");
				t.tabIndex = on ? 0 : -1;
				t.classList.toggle("border-emerald-500", on);
				t.classList.toggle("text-emerald-400", on);
				t.classList.toggle("border-transparent", !on);
				t.classList.toggle("text-zinc-400", !on);
				if (on) {
					t.dataset.selected = "";
				} else {
					delete t.dataset.selected;
				}
			});
			panels.forEach(function (p, i) {
				p.hidden = i !== idx;
			});
		}
		tabs.forEach(function (t, i) {
			t.addEventListener("click", function () {
				select(i);
			});
		});
		select(0);
	});

	/* ---------- Copy buttons ---------- */
	document.addEventListener("click", function (e) {
		var btn = e.target.closest("[data-copy]");
		if (!btn) return;
		var panel = btn.closest("[data-code-panel]") || btn.parentElement;
		var pre = panel ? panel.querySelector("pre") : null;
		var text = pre ? pre.innerText : "";
		if (navigator.clipboard)
			navigator.clipboard.writeText(text).catch(function () {});
		var label = btn.querySelector("[data-copy-label]");
		if (label) {
			var orig = label.textContent;
			label.textContent = "Copied!";
			btn.dataset.copied = "";
			setTimeout(function () {
				label.textContent = orig;
				delete btn.dataset.copied;
			}, 1600);
		}
	});

	/* ---------- "Was this page helpful?" ---------- */
	document.querySelectorAll("[data-helpful]").forEach(function (form) {
		var question = form.querySelector("[data-helpful-question]");
		var thanks = form.querySelector("[data-helpful-thanks]");
		form.addEventListener("submit", function (e) {
			e.preventDefault();
		});
		form.querySelectorAll("button[data-response]").forEach(function (b) {
			b.addEventListener("click", function () {
				if (question) {
					question.style.opacity = "0";
					question.style.pointerEvents = "none";
				}
				if (thanks) {
					thanks.style.opacity = "1";
				}
			});
		});
	});

	/* ---------- Sidebar active highlight + scroll-spy ---------- */
	function setupSidebar(nav) {
		if (!nav) return;
		var path = location.pathname
			.replace(/\/index\.html$/, "/")
			.replace(/\.html$/, "");
		if (path === "") path = "/";
		if (path === "/index") path = "/";
		var links = Array.prototype.slice.call(nav.querySelectorAll("a[href]"));
		var activeTop = null;
		links.forEach(function (a) {
			var href = a.getAttribute("href");
			var hp = href.replace(/\.html$/, "").replace(/\/index$/, "/");
			if (hp === "") hp = "/";
			if (hp === "/index") hp = "/";
			// top-level link (no hash)
			if (href.indexOf("#") === -1) {
				if (hp === path) {
					a.setAttribute("aria-current", "page");
					a.classList.add("text-zinc-900", "dark:text-white");
					a.classList.remove(
						"text-zinc-600",
						"hover:text-zinc-900",
						"dark:text-zinc-400",
						"dark:hover:text-white",
					);
					activeTop = a;
				}
			}
		});

		var visGroup = nav.querySelector("[data-active-pill]");
		var bar = nav.querySelector("[data-active-bar]");
		var subList = activeTop
			? activeTop.parentElement.querySelector("ul")
			: null;
		if (subList) subList.style.opacity = "1";

		// scroll spy over headings referenced by sub-links / TOC anchors
		var hashLinks = links.filter(function (a) {
			return a.getAttribute("href").indexOf("#") !== -1;
		});
		var spy = [];
		hashLinks.forEach(function (a) {
			var id = a.getAttribute("href").split("#")[1];
			if (!id) return;
			var sec = document.getElementById(id);
			if (sec) spy.push({ link: a, sec: sec });
		});

		function moveHighlight(target) {
			if (!target) return;
			var navRect = nav.getBoundingClientRect();
			var r = target.getBoundingClientRect();
			var top = r.top - navRect.top + nav.scrollTop;
			if (bar) {
				bar.style.top = top + "px";
				bar.style.height = r.height + "px";
				bar.style.opacity = "1";
			}
			if (visGroup) {
				visGroup.style.top = top + "px";
				visGroup.style.height = r.height + "px";
				visGroup.style.opacity = "1";
			}
		}

		function update() {
			var current = activeTop;
			if (spy.length) {
				var best = null,
					bestTop = -Infinity;
				var probe = 140;
				spy.forEach(function (s) {
					var t = s.sec.getBoundingClientRect().top;
					if (t - probe <= 0 && t > bestTop) {
						bestTop = t;
						best = s;
					}
				});
				spy.forEach(function (s) {
					s.link.classList.toggle("text-zinc-900", false);
				});
				if (best) {
					current = best.link;
					best.link.classList.add("text-zinc-900", "dark:text-white");
					best.link.classList.remove("text-zinc-600", "dark:text-zinc-400");
				}
			}
			moveHighlight(current);
		}
		window.addEventListener("scroll", update, { passive: true });
		window.addEventListener("resize", update);
		setTimeout(update, 50);
	}
	document.querySelectorAll("[data-sidebar-nav]").forEach(setupSidebar);
})();
