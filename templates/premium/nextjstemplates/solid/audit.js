(function () {
	"use strict";

	var themeToggle = document.querySelector("#themeToggle, .theme-toggle");
	function syncThemeLabel() {
		if (!themeToggle) return;
		var dark = document.documentElement.classList.contains("dark");
		var label = dark ? "Switch to light mode" : "Switch to dark mode";
		themeToggle.setAttribute("aria-label", label);
		themeToggle.setAttribute("title", label);
	}
	if (themeToggle) {
		syncThemeLabel();
		themeToggle.addEventListener("click", function () {
			setTimeout(syncThemeLabel, 0);
		});
	}

	var menuToggle = document.querySelector("#hamburger, #hamburgerBtn, .hamburger");
	var menu = document.querySelector("#main-nav, #navWrapper, #navWrap, .nav-wrapper, .header-nav-wrap");
	function closeMenu() {
		if (!menuToggle || !menu) return;
		menu.classList.remove("open");
		menuToggle.setAttribute("aria-expanded", "false");
		var overlay = document.querySelector(".nav-overlay");
		if (overlay) overlay.classList.remove("active");
	}
	if (menuToggle && menu) {
		if (!menu.id) menu.id = "site-navigation";
		menuToggle.setAttribute("aria-controls", menu.id);
		if (!menuToggle.hasAttribute("aria-expanded")) menuToggle.setAttribute("aria-expanded", "false");
		menuToggle.addEventListener("click", function () {
			setTimeout(function () {
				menuToggle.setAttribute("aria-expanded", menu.classList.contains("open") ? "true" : "false");
			}, 0);
		});
		menu.querySelectorAll("a").forEach(function (link) {
			link.addEventListener("click", closeMenu);
		});
		document.addEventListener("keydown", function (event) {
			if (event.key === "Escape" && (menu.classList.contains("open") || menuToggle.getAttribute("aria-expanded") === "true")) {
				closeMenu();
				menuToggle.focus();
			}
		});
	}

	document.querySelectorAll("form").forEach(function (form) {
		form.addEventListener("submit", function (event) {
			if (!form.action || form.getAttribute("action") === "#" || form.hasAttribute("novalidate")) event.preventDefault();
		});
	});

	document.querySelectorAll("input, textarea, select").forEach(function (field) {
		var id = field.id;
		var hasLabel =
			field.hasAttribute("aria-label") ||
			field.hasAttribute("aria-labelledby") ||
			field.closest("label") ||
			(id && document.querySelector("label[for='" + id + "']"));
		if (!hasLabel && field.getAttribute("placeholder")) field.setAttribute("aria-label", field.getAttribute("placeholder"));
	});
})();
