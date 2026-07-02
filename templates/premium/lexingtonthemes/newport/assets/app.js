/* Newport HOA — shared behavior (vanilla JS) */
(function () {
	"use strict";

	/* ---------- Theme toggle (light/dark, prefers-color-scheme, localStorage) ---------- */
	var root = document.documentElement;
	function applyTheme(t) {
		root.classList.remove("light", "dark");
		if (t === "light" || t === "dark") root.classList.add(t);
	}
	// boot is handled inline in <head> to avoid flash; here we just wire the toggle
	document.addEventListener("click", function (e) {
		var btn = e.target.closest("[data-theme-toggle]");
		if (!btn) return;
		var isDark = root.classList.contains("dark");
		var prefersDark =
			!root.classList.contains("light") &&
			!root.classList.contains("dark") &&
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches;
		var next = isDark || prefersDark ? "light" : "dark";
		applyTheme(next);
		try {
			localStorage.setItem("newport-theme", next);
		} catch (err) {}
	});

	/* ---------- Mobile nav ---------- */
	var mnav = document.querySelector("[data-mobile-nav-root]");
	if (mnav) {
		var toggle = mnav.querySelector("[data-mobile-nav-toggle]");
		var panel = mnav.querySelector("[data-mobile-nav-panel]");
		var overlay = mnav.querySelector("[data-mobile-nav-overlay]");
		function setNav(open) {
			mnav.classList.toggle("open", open);
			if (toggle) toggle.setAttribute("aria-expanded", String(open));
			if (panel) panel.setAttribute("aria-hidden", String(!open));
		}
		if (toggle)
			toggle.addEventListener("click", function () {
				setNav(!mnav.classList.contains("open"));
			});
		if (overlay)
			overlay.addEventListener("click", function () {
				setNav(false);
			});
		mnav.querySelectorAll("[data-mobile-nav-panel] a").forEach(function (a) {
			a.addEventListener("click", function () {
				setNav(false);
			});
		});
		document.addEventListener("keydown", function (e) {
			if (e.key === "Escape") setNav(false);
		});
	}

	/* ---------- Search modal (Fuse.js) ---------- */
	var modal = document.getElementById("searchModal");
	var openBtn = document.getElementById("searchButton");
	var closeBtn = document.getElementById("closeSearch");
	var input = document.getElementById("searchInput");
	var results = document.getElementById("searchResults");
	var fuse = null;

	function buildFuse() {
		if (fuse || typeof Fuse === "undefined" || !window.NEWPORT_SEARCH_ITEMS)
			return;
		fuse = new Fuse(window.NEWPORT_SEARCH_ITEMS, {
			keys: ["title", "description", "type", "meta"],
			threshold: 0.4,
			ignoreLocation: true,
		});
	}
	function openSearch() {
		if (!modal) return;
		buildFuse();
		modal.classList.add("open");
		document.body.style.overflow = "hidden";
		setTimeout(function () {
			if (input) input.focus();
		}, 50);
	}
	function closeSearch() {
		if (!modal) return;
		modal.classList.remove("open");
		document.body.style.overflow = "";
		if (input) input.value = "";
		if (results) {
			results.innerHTML = "";
			results.classList.add("hidden");
		}
	}
	function render(list) {
		if (!results) return;
		if (!list.length) {
			results.innerHTML = '<div class="search-empty">No results found.</div>';
			results.classList.remove("hidden");
			return;
		}
		results.innerHTML = list
			.slice(0, 12)
			.map(function (r) {
				var it = r.item || r;
				return (
					'<a class="search-result" href="' +
					it.href +
					'"><div class="search-result__top"><span class="search-result__type">' +
					it.type +
					'</span><span class="search-result__meta">' +
					(it.meta || "") +
					'</span></div><div class="search-result__title">' +
					it.title +
					'</div><div class="search-result__desc">' +
					(it.description || "") +
					"</div></a>"
				);
			})
			.join("");
		results.classList.remove("hidden");
	}
	if (openBtn) openBtn.addEventListener("click", openSearch);
	if (closeBtn) closeBtn.addEventListener("click", closeSearch);
	if (modal)
		modal.addEventListener("click", function (e) {
			if (
				e.target === modal ||
				e.target.closest(".search-modal__wrap") === e.target
			)
				closeSearch();
		});
	if (input)
		input.addEventListener("input", function () {
			var q = input.value.trim();
			if (!q) {
				if (results) {
					results.innerHTML = "";
					results.classList.add("hidden");
				}
				return;
			}
			buildFuse();
			render(fuse ? fuse.search(q) : []);
		});
	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape" && modal && modal.classList.contains("open"))
			closeSearch();
		if ((e.key === "/" || (e.metaKey && e.key === "k")) && modal) {
			var tag = (document.activeElement || {}).tagName;
			if (tag !== "INPUT" && tag !== "TEXTAREA") {
				e.preventDefault();
				openSearch();
			}
		}
	});

	/* ---------- Scroll reveal ---------- */
	var reveals = document.querySelectorAll(".reveal");
	if (reveals.length && "IntersectionObserver" in window) {
		var io = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (en) {
					if (en.isIntersecting) {
						en.target.classList.add("in");
						io.unobserve(en.target);
					}
				});
			},
			{ rootMargin: "0px 0px 80px 0px", threshold: 0.01 },
		);
		reveals.forEach(function (el) {
			io.observe(el);
		});
		// Safety: ensure any still-hidden reveal becomes visible (covers full-page
		// captures / no-scroll contexts) so content is never permanently hidden.
		window.addEventListener("load", function () {
			setTimeout(function () {
				document.querySelectorAll(".reveal:not(.in)").forEach(function (el) {
					el.classList.add("in");
				});
			}, 1200);
		});
	} else {
		reveals.forEach(function (el) {
			el.classList.add("in");
		});
	}

	/* ---------- TOC active state ---------- */
	var tocLinks = document.querySelectorAll(".toc__list a[href^='#']");
	if (tocLinks.length && "IntersectionObserver" in window) {
		var map = {};
		tocLinks.forEach(function (a) {
			var id = a.getAttribute("href").slice(1);
			var sec = document.getElementById(id);
			if (sec) map[id] = a;
		});
		var so = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (en) {
					if (en.isIntersecting) {
						tocLinks.forEach(function (a) {
							a.classList.remove("active");
						});
						if (map[en.target.id]) map[en.target.id].classList.add("active");
					}
				});
			},
			{ rootMargin: "-20% 0px -70% 0px" },
		);
		Object.keys(map).forEach(function (id) {
			so.observe(document.getElementById(id));
		});
	}
})();
