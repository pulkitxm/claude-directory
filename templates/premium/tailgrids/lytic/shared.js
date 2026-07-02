/**
 * Lytic Analytics Dashboard — Shared JS
 * Theme toggle, sidebar collapse, mobile menu
 */

(function () {
	"use strict";

	// ---------- THEME ----------
	var html = document.documentElement;

	function isDark() {
		return html.classList.contains("dark");
	}

	function setTheme(dark) {
		if (dark) {
			html.classList.add("dark");
			html.classList.remove("light");
		} else {
			html.classList.remove("dark");
			html.classList.add("light");
		}
		localStorage.setItem("lytic-theme", dark ? "dark" : "light");

		// Update logo
		var logoImgs = document.querySelectorAll("#sidebar-logo-img");
		logoImgs.forEach(function (img) {
			img.src = dark ? "assets/logo-white.svg" : "assets/logo-black.svg";
		});

		// Update theme toggle icons
		var sunIcon = document.getElementById("themeIconSun");
		var moonIcon = document.getElementById("themeIconMoon");
		if (sunIcon) sunIcon.style.display = dark ? "block" : "none";
		if (moonIcon) moonIcon.style.display = dark ? "none" : "block";

		// Notify chart scripts
		window.dispatchEvent(
			new CustomEvent("lytic-theme-change", { detail: { dark: dark } }),
		);
	}

	function initTheme() {
		var savedDark = html.classList.contains("dark");
		// Logo init
		var logoImgs = document.querySelectorAll("#sidebar-logo-img");
		logoImgs.forEach(function (img) {
			img.src = savedDark ? "assets/logo-white.svg" : "assets/logo-black.svg";
		});
		// Toggle icons init
		var sunIcon = document.getElementById("themeIconSun");
		var moonIcon = document.getElementById("themeIconMoon");
		if (sunIcon) sunIcon.style.display = savedDark ? "block" : "none";
		if (moonIcon) moonIcon.style.display = savedDark ? "none" : "block";
	}

	// ---------- SIDEBAR COLLAPSE ----------
	var COLLAPSE_KEY = "lytic-sidebar-collapsed";

	function initSidebar() {
		var sidebar = document.getElementById("sidebar");
		var collapseBtn = document.getElementById("collapseBtn");
		if (!sidebar || !collapseBtn) return;

		var collapsed = localStorage.getItem(COLLAPSE_KEY) === "true";
		if (collapsed) sidebar.classList.add("collapsed");

		collapseBtn.addEventListener("click", function () {
			var isCollapsed = sidebar.classList.toggle("collapsed");
			localStorage.setItem(COLLAPSE_KEY, isCollapsed);
		});
	}

	// ---------- MOBILE MENU ----------
	function initMobileMenu() {
		var sidebar = document.getElementById("sidebar");
		var overlay = document.getElementById("sidebarOverlay");
		var menuToggle = document.getElementById("mobileMenuToggle");
		if (!sidebar || !overlay || !menuToggle) return;

		menuToggle.addEventListener("click", function () {
			sidebar.classList.toggle("mobile-open");
			overlay.classList.toggle("visible");
		});

		overlay.addEventListener("click", function () {
			sidebar.classList.remove("mobile-open");
			overlay.classList.remove("visible");
		});
	}

	// ---------- THEME TOGGLE BUTTON ----------
	function initThemeToggle() {
		var btn = document.getElementById("themeToggle");
		if (!btn) return;
		btn.addEventListener("click", function () {
			setTheme(!isDark());
		});
	}

	// ---------- INIT ----------
	document.addEventListener("DOMContentLoaded", function () {
		initTheme();
		initSidebar();
		initMobileMenu();
		initThemeToggle();
	});
})();
