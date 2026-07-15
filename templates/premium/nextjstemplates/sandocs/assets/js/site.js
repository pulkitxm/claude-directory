(function () {
	"use strict";

	var root = document.documentElement;
	var themeToggle = document.querySelector(".theme-toggle");
	function currentTheme() {
		return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
	}
	function syncThemeLabel() {
		if (!themeToggle) return;
		var label = currentTheme() === "dark" ? "Switch to light mode" : "Switch to dark mode";
		themeToggle.setAttribute("aria-label", label);
		themeToggle.setAttribute("title", label);
	}
	if (themeToggle) {
		syncThemeLabel();
		themeToggle.addEventListener("click", function () {
			var next = currentTheme() === "dark" ? "light" : "dark";
			root.setAttribute("data-theme", next);
			syncThemeLabel();
			try {
				localStorage.setItem("sandocs-theme", next);
			} catch (error) {}
		});
	}

	var menuToggle = document.querySelector(".menu-toggle");
	var sidebar = document.querySelector(".sticky.border-r");
	var headerNav = document.querySelector("header nav");
	var menuPanel = sidebar || headerNav;
	function closeMenu() {
		if (!menuToggle || !menuPanel) return;
		menuPanel.classList.remove(sidebar ? "is-open" : "mobile-header-menu");
		menuToggle.setAttribute("aria-expanded", "false");
	}
	if (menuToggle && menuPanel) {
		if (!menuPanel.id) menuPanel.id = sidebar ? "docs-navigation" : "site-navigation";
		menuToggle.setAttribute("aria-controls", menuPanel.id);
		menuToggle.addEventListener("click", function () {
			var className = sidebar ? "is-open" : "mobile-header-menu";
			var open = menuPanel.classList.toggle(className);
			menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
		});
		menuPanel.querySelectorAll("a").forEach(function (link) {
			link.addEventListener("click", closeMenu);
		});
		document.addEventListener("click", function (event) {
			if (!menuPanel.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
		});
		document.addEventListener("keydown", function (event) {
			if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
				closeMenu();
				menuToggle.focus();
			}
		});
	}

	document.querySelectorAll("[data-copy]").forEach(function (button) {
		button.addEventListener("click", function () {
			var text = button.getAttribute("data-copy");
			var pill = button.closest(".copy-pill") || button.parentElement;
			var done = function () {
				if (!pill) return;
				pill.classList.add("copied");
				button.setAttribute("aria-label", "Install command copied");
				setTimeout(function () {
					pill.classList.remove("copied");
					button.setAttribute("aria-label", "Copy install command");
				}, 1400);
			};
			if (navigator.clipboard && navigator.clipboard.writeText) {
				navigator.clipboard.writeText(text).then(done, done);
			} else {
				done();
			}
		});
	});

	var tocLinks = Array.prototype.slice.call(document.querySelectorAll("nav.w-64 a[href^='#']"));
	if (tocLinks.length) {
		var targets = tocLinks
			.map(function (link) {
				var id = decodeURIComponent(link.getAttribute("href").slice(1));
				return { link: link, element: document.getElementById(id) };
			})
			.filter(function (target) {
				return !!target.element;
			});

		function onScroll() {
			var y = window.scrollY + 90;
			var active = null;
			targets.forEach(function (target) {
				if (target.element.offsetTop <= y) active = target;
			});
			tocLinks.forEach(function (link) {
				link.classList.remove("is-active");
				link.removeAttribute("aria-current");
			});
			if (active) {
				active.link.classList.add("is-active");
				active.link.setAttribute("aria-current", "location");
			}
		}
		document.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
	}
})();
