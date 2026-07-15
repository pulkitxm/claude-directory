(function () {
	"use strict";
	var THEME_KEY = "nextra-clone-theme";
	var root = document.documentElement;
	var themeBtn = document.querySelector("[data-theme-btn]");
	var themeMenu = document.querySelector("[data-theme-menu]");
	var themeLabel = document.querySelector("[data-theme-label]");

	function systemPrefersDark() {
		return (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		);
	}

	function applyTheme(mode) {
		var isDark = mode === "dark" || (mode === "system" && systemPrefersDark());
		root.classList.toggle("dark", isDark);
		if (themeLabel) {
			themeLabel.textContent =
				mode.charAt(0).toUpperCase() + mode.slice(1);
		}
		if (themeMenu) {
			themeMenu.querySelectorAll("[data-theme-option]").forEach(function (btn) {
				btn.setAttribute(
					"aria-selected",
					btn.getAttribute("data-theme-option") === mode ? "true" : "false",
				);
			});
		}
	}

	var savedTheme = localStorage.getItem(THEME_KEY) || "system";
	applyTheme(savedTheme);

	if (themeBtn && themeMenu) {
		themeBtn.setAttribute("aria-haspopup", "menu");
		themeBtn.setAttribute("aria-expanded", "false");
		themeMenu.setAttribute("role", "menu");
		themeBtn.addEventListener("click", function (e) {
			e.stopPropagation();
			themeMenu.classList.toggle("open");
			themeBtn.setAttribute("aria-expanded", String(themeMenu.classList.contains("open")));
		});
		themeMenu.querySelectorAll("[data-theme-option]").forEach(function (btn) {
			btn.addEventListener("click", function () {
				var mode = btn.getAttribute("data-theme-option");
				localStorage.setItem(THEME_KEY, mode);
				applyTheme(mode);
				themeMenu.classList.remove("open");
				themeBtn.setAttribute("aria-expanded", "false");
			});
		});
		document.addEventListener("click", function (e) {
			if (!themeMenu.contains(e.target) && e.target !== themeBtn) {
				themeMenu.classList.remove("open");
				themeBtn.setAttribute("aria-expanded", "false");
			}
		});
		document.addEventListener("keydown", function (e) {
			if (e.key === "Escape" && themeMenu.classList.contains("open")) {
				themeMenu.classList.remove("open");
				themeBtn.setAttribute("aria-expanded", "false");
				themeBtn.focus();
			}
		});
	}
	document.querySelectorAll("[data-folder-toggle]").forEach(function (toggle) {
		var chevron = toggle.querySelector(".chevron");
		var childrenId = toggle.getAttribute("data-folder-toggle");
		var children = document.getElementById(childrenId);
		toggle.setAttribute("aria-controls", childrenId);
		toggle.setAttribute("aria-expanded", String(toggle.classList.contains("open")));
		toggle.addEventListener("click", function (e) {
			if (e.target.closest(".chevron-hit")) {
				e.preventDefault();
				var open = toggle.classList.toggle("open");
				toggle.setAttribute("aria-expanded", String(open));
				if (children) children.classList.toggle("open", open);
			}
		});
	});
	var hamburger = document.querySelector("[data-hamburger]");
	var sidebar = document.querySelector("[data-sidebar]");
	var scrim = document.querySelector("[data-sidebar-scrim]");

	function closeSidebar(restoreFocus) {
		if (sidebar) sidebar.classList.remove("open");
		if (scrim) scrim.classList.remove("open");
		if (hamburger) hamburger.setAttribute("aria-expanded", "false");
		document.body.style.overflow = "";
		if (restoreFocus && hamburger) hamburger.focus();
	}

	if (hamburger && sidebar) {
		if (!sidebar.id) sidebar.id = "docs-sidebar";
		hamburger.setAttribute("aria-controls", sidebar.id);
		hamburger.setAttribute("aria-expanded", "false");
		hamburger.addEventListener("click", function () {
			var open = sidebar.classList.toggle("open");
			if (scrim) scrim.classList.toggle("open", open);
			hamburger.setAttribute("aria-expanded", String(open));
			document.body.style.overflow = open ? "hidden" : "";
		});
	}
	if (scrim) scrim.addEventListener("click", function () { closeSidebar(true); });
	var SEARCH_INDEX = [
		{ title: "Introduction", section: "What is Nextra?", href: "index.html#what-is-nextra" },
		{ title: "Introduction", section: "Documentation", href: "index.html#documentation" },
		{ title: "About", section: "About", href: "about.html" },
		{ title: "Another Page", section: "Component", href: "another.html#component" },
		{ title: "Another Page", section: "External Component", href: "another.html#external-component" },
		{ title: "Advanced", section: "Advanced (A Folder)", href: "advanced.html" },
		{ title: "Satori", section: "Satori", href: "advanced-satori.html" },
	];

	var searchBox = document.querySelector("[data-search-box]");
	var searchBackdrop = document.querySelector("[data-search-backdrop]");
	var searchInput = document.querySelector("[data-search-input]");
	var searchResults = document.querySelector("[data-search-results]");

	function renderResults(query) {
		if (!searchResults) return;
		searchResults.innerHTML = "";
		var q = query.trim().toLowerCase();
		var matches = !q
			? []
			: SEARCH_INDEX.filter(function (item) {
					return (
						item.title.toLowerCase().indexOf(q) !== -1 ||
						item.section.toLowerCase().indexOf(q) !== -1
					);
				});
		if (!q) {
			var hint = document.createElement("div");
			hint.className = "search-empty";
			hint.textContent = "Start typing to search the docs...";
			searchResults.appendChild(hint);
			return;
		}
		if (matches.length === 0) {
			var empty = document.createElement("div");
			empty.className = "search-empty";
			empty.textContent = "No results found.";
			searchResults.appendChild(empty);
			return;
		}
		matches.forEach(function (item) {
			var a = document.createElement("a");
			a.className = "search-result";
			a.href = item.href;
			a.textContent = item.title + " > " + item.section;
			searchResults.appendChild(a);
		});
	}

	function openSearch() {
		if (!searchBackdrop) return;
		searchBackdrop.classList.add("open");
		searchBackdrop.setAttribute("aria-hidden", "false");
		if (searchBox) searchBox.setAttribute("aria-expanded", "true");
		document.body.style.overflow = "hidden";
		renderResults("");
		if (searchInput) {
			searchInput.value = "";
			setTimeout(function () {
				searchInput.focus();
			}, 50);
		}
	}

	function closeSearch(restoreFocus) {
		if (searchBackdrop) searchBackdrop.classList.remove("open");
		if (searchBackdrop) searchBackdrop.setAttribute("aria-hidden", "true");
		if (searchBox) searchBox.setAttribute("aria-expanded", "false");
		document.body.style.overflow = "";
		if (restoreFocus && searchBox) searchBox.focus();
	}

	if (searchBox) {
		searchBox.setAttribute("role", "button");
		searchBox.setAttribute("tabindex", "0");
		searchBox.setAttribute("aria-haspopup", "dialog");
		searchBox.setAttribute("aria-expanded", "false");
		searchBox.addEventListener("click", openSearch);
		searchBox.addEventListener("keydown", function (event) {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				openSearch();
			}
		});
	}
	if (searchBackdrop) {
		searchBackdrop.setAttribute("role", "dialog");
		searchBackdrop.setAttribute("aria-modal", "true");
		searchBackdrop.setAttribute("aria-hidden", "true");
		searchBackdrop.addEventListener("click", function (e) {
			if (e.target === searchBackdrop) closeSearch(true);
		});
	}
	if (searchInput) {
		searchInput.addEventListener("input", function () {
			renderResults(searchInput.value);
		});
	}
	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape") {
			if (searchBackdrop && searchBackdrop.classList.contains("open")) {
				closeSearch(true);
			}
			if (sidebar && sidebar.classList.contains("open")) {
				closeSidebar(true);
			}
		}
		if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
			e.preventDefault();
			openSearch();
		}
	});
	document.querySelectorAll("[data-counter]").forEach(function (btn) {
		var count = 0;
		btn.addEventListener("click", function () {
			count += 1;
			btn.textContent = "Clicked " + count + " time" + (count === 1 ? "" : "s");
		});
	});
	var tocLinks = document.querySelectorAll("[data-toc-link]");
	if (tocLinks.length) {
		var headings = Array.prototype.map
			.call(tocLinks, function (link) {
				var id = link.getAttribute("href").replace("#", "");
				return document.getElementById(id);
			})
			.filter(Boolean);

		var observer = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						tocLinks.forEach(function (l) {
							l.classList.toggle(
								"active",
								l.getAttribute("href") === "#" + entry.target.id,
							);
						});
					}
				});
			},
			{ rootMargin: "-20% 0px -70% 0px" },
		);
		headings.forEach(function (h) {
			observer.observe(h);
		});
	}
})();
