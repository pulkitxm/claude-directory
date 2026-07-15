(function () {
	"use strict";

	function getElement() {
		for (var index = 0; index < arguments.length; index += 1) {
			var element = document.getElementById(arguments[index]);
			if (element) return element;
		}
		return null;
	}

	function initFields() {
		document.querySelectorAll("input, textarea, select").forEach(function (field) {
			if (["submit", "button", "hidden"].includes(field.type)) return;
			if (!field.getAttribute("aria-label") && !field.closest("label") && !(field.id && document.querySelector('label[for="' + field.id + '"]'))) {
				field.setAttribute("aria-label", field.placeholder || field.name || field.type);
			}
		});
	}

	function initMenu() {
		var button = getElement("hamburger");
		var menu = getElement("mobileNav", "mobile-nav");
		if (!button || !menu) return;
		if (!menu.id) menu.id = "mobile-navigation";
		button.setAttribute("aria-controls", menu.id);
		button.setAttribute("aria-expanded", String(menu.classList.contains("open")));
		function sync() {
			button.setAttribute("aria-expanded", String(menu.classList.contains("open")));
		}
		button.addEventListener("click", function () {
			setTimeout(sync);
		});
		menu.querySelectorAll("a").forEach(function (link) {
			link.addEventListener("click", function () {
				menu.classList.remove("open");
				sync();
			});
		});
		document.addEventListener("click", function (event) {
			if (menu.classList.contains("open") && !menu.contains(event.target) && !button.contains(event.target)) {
				menu.classList.remove("open");
				sync();
			}
		});
		document.addEventListener("keydown", function (event) {
			if (event.key === "Escape" && menu.classList.contains("open")) {
				menu.classList.remove("open");
				sync();
				button.focus();
			}
		});
		document.querySelectorAll(".mobile-nav-toggle").forEach(function (trigger, index) {
			var submenu = trigger.nextElementSibling;
			if (!submenu) return;
			if (!submenu.id) submenu.id = "mobile-submenu-" + index;
			trigger.setAttribute("aria-controls", submenu.id);
			trigger.setAttribute("aria-expanded", String(submenu.classList.contains("open")));
			trigger.addEventListener("click", function () {
				setTimeout(function () {
					trigger.setAttribute("aria-expanded", String(submenu.classList.contains("open")));
				});
			});
		});
	}

	function initTheme() {
		var button = getElement("themeToggle", "theme-toggle");
		if (!button) return;
		function sync() {
			var dark = document.documentElement.classList.contains("dark");
			button.setAttribute("aria-pressed", String(dark));
			button.setAttribute("title", dark ? "Switch to light theme" : "Switch to dark theme");
		}
		button.addEventListener("click", function () {
			setTimeout(sync);
		});
		sync();
	}

	function initForms() {
		document.querySelectorAll("form").forEach(function (form) {
			form.addEventListener("submit", function (event) {
				event.preventDefault();
			});
		});
		document.querySelectorAll('button[type="submit"], input[type="submit"]').forEach(function (button) {
			button.addEventListener("click", function () {
				var original = button.value || button.textContent;
				if (button.tagName === "INPUT") button.value = "Sent!";
				else button.textContent = "Sent!";
				button.disabled = true;
				setTimeout(function () {
					if (button.tagName === "INPUT") button.value = original;
					else button.textContent = original;
					button.disabled = false;
				}, 1800);
			});
		});
	}

	document.addEventListener("DOMContentLoaded", function () {
		initFields();
		initMenu();
		initTheme();
		initForms();
	});
})();
