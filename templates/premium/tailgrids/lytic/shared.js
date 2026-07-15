(function () {
	"use strict";

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

		var logoImgs = document.querySelectorAll("#sidebar-logo-img");
		logoImgs.forEach(function (img) {
			img.src = dark ? "assets/logo-white.svg" : "assets/logo-black.svg";
		});

		var sunIcon = document.getElementById("themeIconSun");
		var moonIcon = document.getElementById("themeIconMoon");
		if (sunIcon) sunIcon.style.display = dark ? "block" : "none";
		if (moonIcon) moonIcon.style.display = dark ? "none" : "block";

		window.dispatchEvent(
			new CustomEvent("lytic-theme-change", { detail: { dark: dark } }),
		);
	}

	function initTheme() {
		var savedDark = html.classList.contains("dark");
		var logoImgs = document.querySelectorAll("#sidebar-logo-img");
		logoImgs.forEach(function (img) {
			img.src = savedDark ? "assets/logo-white.svg" : "assets/logo-black.svg";
		});
		var sunIcon = document.getElementById("themeIconSun");
		var moonIcon = document.getElementById("themeIconMoon");
		if (sunIcon) sunIcon.style.display = savedDark ? "block" : "none";
		if (moonIcon) moonIcon.style.display = savedDark ? "none" : "block";
	}

	var COLLAPSE_KEY = "lytic-sidebar-collapsed";

	function initSidebar() {
		var sidebar = document.getElementById("sidebar");
		var collapseBtn = document.getElementById("collapseBtn");
		if (!sidebar || !collapseBtn) return;

		var collapsed = localStorage.getItem(COLLAPSE_KEY) === "true";
		if (collapsed) sidebar.classList.add("collapsed");
		collapseBtn.setAttribute("aria-controls", "sidebar");
		collapseBtn.setAttribute("aria-pressed", String(collapsed));
		if (!collapseBtn.getAttribute("aria-label")) {
			collapseBtn.setAttribute("aria-label", "Collapse sidebar");
		}

		collapseBtn.addEventListener("click", function () {
			var isCollapsed = sidebar.classList.toggle("collapsed");
			localStorage.setItem(COLLAPSE_KEY, isCollapsed);
			collapseBtn.setAttribute("aria-pressed", String(isCollapsed));
			collapseBtn.setAttribute(
				"aria-label",
				isCollapsed ? "Expand sidebar" : "Collapse sidebar",
			);
		});
	}

	function initMobileMenu() {
		var sidebar = document.getElementById("sidebar");
		var overlay = document.getElementById("sidebarOverlay");
		var menuToggle = document.getElementById("mobileMenuToggle");
		if (!sidebar || !overlay || !menuToggle) return;
		menuToggle.setAttribute("aria-controls", "sidebar");
		menuToggle.setAttribute("aria-expanded", "false");
		if (!menuToggle.getAttribute("aria-label")) {
			menuToggle.setAttribute("aria-label", "Open navigation");
		}
		overlay.setAttribute("aria-hidden", "true");

		function setOpen(open, restoreFocus) {
			sidebar.classList.toggle("mobile-open", open);
			overlay.classList.toggle("visible", open);
			menuToggle.setAttribute("aria-expanded", String(open));
			menuToggle.setAttribute(
				"aria-label",
				open ? "Close navigation" : "Open navigation",
			);
			overlay.setAttribute("aria-hidden", String(!open));
			if (restoreFocus) menuToggle.focus();
		}

		menuToggle.addEventListener("click", function () {
			setOpen(!sidebar.classList.contains("mobile-open"), false);
		});

		overlay.addEventListener("click", function () {
			setOpen(false, true);
		});

		document.addEventListener("keydown", function (event) {
			if (event.key === "Escape" && sidebar.classList.contains("mobile-open")) {
				setOpen(false, true);
			}
		});

		window.addEventListener("resize", function () {
			if (window.innerWidth > 1024 && sidebar.classList.contains("mobile-open")) {
				setOpen(false, false);
			}
		});
	}

	function initThemeToggle() {
		var btn = document.getElementById("themeToggle");
		if (!btn) return;
		btn.setAttribute("aria-label", "Toggle color theme");
		btn.setAttribute("aria-pressed", String(isDark()));
		btn.addEventListener("click", function () {
			setTheme(!isDark());
			btn.setAttribute("aria-pressed", String(isDark()));
		});
	}

	function initCurrentPage() {
		var page = window.location.pathname.split("/").pop() || "index.html";
		document.querySelectorAll(".sidebar a[href]").forEach(function (link) {
			if (link.getAttribute("href").split("#")[0] === page) {
				link.setAttribute("aria-current", "page");
			}
		});
	}

	function initControlLabels() {
		document.querySelectorAll("button").forEach(function (button, index) {
			if (
				!button.getAttribute("aria-label") &&
				!button.getAttribute("title") &&
				!button.textContent.trim()
			) {
				button.setAttribute("aria-label", "Dashboard action " + (index + 1));
			}
		});
		document.querySelectorAll("input, select, textarea").forEach(function (field, index) {
			if (!field.id) field.id = "dashboard-field-" + (index + 1);
			var hasLabel = document.querySelector('label[for="' + field.id + '"]');
			if (!hasLabel && !field.getAttribute("aria-label")) {
				field.setAttribute(
					"aria-label",
					field.getAttribute("placeholder") || field.name || field.type || "Dashboard field",
				);
			}
		});
	}

	document.addEventListener("DOMContentLoaded", function () {
		initTheme();
		initSidebar();
		initMobileMenu();
		initThemeToggle();
		initCurrentPage();
		initControlLabels();
	});
})();
