(function () {
	"use strict";

	function setButtonFeedback(button, message) {
		var original = button.value || button.textContent;
		if ("value" in button && button.tagName === "INPUT") {
			button.value = message;
		} else {
			button.textContent = message;
		}
		button.disabled = true;
		setTimeout(function () {
			if ("value" in button && button.tagName === "INPUT") {
				button.value = original;
			} else {
				button.textContent = original;
			}
			button.disabled = false;
		}, 1800);
	}

	function initThemeToggle() {
		var button = document.querySelector('button[aria-label="theme toggler"]');
		if (!button) return;
		function sync() {
			var dark = document.documentElement.classList.contains("dark");
			button.setAttribute("aria-pressed", String(dark));
			button.setAttribute("title", dark ? "Switch to light theme" : "Switch to dark theme");
		}
		button.addEventListener("click", function () {
			var root = document.documentElement;
			var next = root.classList.contains("dark") ? "light" : "dark";
			root.classList.remove("light", "dark");
			root.classList.add(next);
			root.style.colorScheme = next;
			try {
				localStorage.setItem("theme", next);
			} catch (error) {
				return;
			}
			sync();
		});
		sync();
	}

	function initMobileMenu() {
		var toggler = document.getElementById("navbarToggler");
		var nav = document.getElementById("navbarCollapse");
		if (!toggler || !nav) return;
		toggler.setAttribute("aria-controls", "navbarCollapse");
		toggler.setAttribute("aria-expanded", "false");
		function close(returnFocus) {
			toggler.classList.remove("navbar-open");
			nav.classList.remove("navbar-open");
			toggler.setAttribute("aria-expanded", "false");
			if (returnFocus) toggler.focus();
		}
		function toggle() {
			var open = !nav.classList.contains("navbar-open");
			toggler.classList.toggle("navbar-open", open);
			nav.classList.toggle("navbar-open", open);
			toggler.setAttribute("aria-expanded", String(open));
		}
		toggler.addEventListener("click", toggle);
		nav.querySelectorAll("a").forEach(function (link) {
			link.addEventListener("click", function () {
				close(false);
			});
		});
		document.addEventListener("click", function (event) {
			if (nav.classList.contains("navbar-open") && !nav.contains(event.target) && !toggler.contains(event.target)) close(false);
		});
		document.addEventListener("keydown", function (event) {
			var pagesOpen = document.querySelector('[aria-controls="pages-submenu"][aria-expanded="true"]');
			if (event.key === "Escape" && nav.classList.contains("navbar-open") && !pagesOpen) close(true);
		});
	}

	function initPagesMenu() {
		var trigger = Array.from(document.querySelectorAll("nav button")).find(function (element) {
			return element.textContent.trim().startsWith("Pages");
		});
		if (!trigger) return;
		var submenu = trigger.nextElementSibling;
		if (!submenu) return;
		if (!submenu.id) submenu.id = "pages-submenu";
		trigger.setAttribute("aria-controls", submenu.id);
		trigger.setAttribute("aria-expanded", "false");
		function toggle() {
			if (window.matchMedia("(min-width: 1024px)").matches) return;
			var open = submenu.classList.contains("hidden");
			if (open) {
				submenu.classList.remove("hidden");
			} else {
				submenu.classList.add("hidden");
			}
			trigger.setAttribute("aria-expanded", String(open));
		}
		trigger.addEventListener("click", toggle);
		document.addEventListener("keydown", function (event) {
			if (event.key === "Escape" && trigger.getAttribute("aria-expanded") === "true") {
				submenu.classList.add("hidden");
				trigger.setAttribute("aria-expanded", "false");
				trigger.focus();
			}
		});
	}

	function initStickyHeader() {
		var header = document.querySelector(".header");
		if (!header) return;
		function update() {
			header.classList.toggle("header-scrolled", window.scrollY > 80);
		}
		window.addEventListener("scroll", update, { passive: true });
		update();
	}

	function initPricingSwitch() {
		var knob = document.querySelector(".shadow-switch-1");
		if (!knob) return;
		var track = knob.closest(".flex.cursor-pointer.items-center");
		if (!track) return;
		var monthly = track.previousElementSibling;
		var yearly = track.nextElementSibling;
		var yearlyActive = false;
		track.setAttribute("role", "switch");
		track.setAttribute("tabindex", "0");
		track.setAttribute("aria-label", "Use yearly billing");
		track.setAttribute("aria-checked", "false");
		function toggle() {
			yearlyActive = !yearlyActive;
			knob.style.left = yearlyActive ? "28px" : "0px";
			track.setAttribute("aria-checked", String(yearlyActive));
			monthly.classList.toggle("pointer-events-none", yearlyActive);
			monthly.classList.toggle("text-primary", yearlyActive);
			monthly.classList.toggle("text-dark", !yearlyActive);
			monthly.classList.toggle("dark:text-white", !yearlyActive);
			yearly.classList.toggle("pointer-events-none", !yearlyActive);
			yearly.classList.toggle("text-primary", !yearlyActive);
			yearly.classList.toggle("text-dark", yearlyActive);
			yearly.classList.toggle("dark:text-white", yearlyActive);
		}
		track.addEventListener("click", toggle);
		track.addEventListener("keydown", function (event) {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				toggle();
			}
		});
	}

	function initFields() {
		document.querySelectorAll("input, textarea, select").forEach(function (field) {
			if (field.type === "submit" || field.type === "button" || field.type === "hidden") return;
			if (!field.getAttribute("aria-label") && !field.closest("label") && !(field.id && document.querySelector('label[for="' + field.id + '"]'))) {
				field.setAttribute("aria-label", field.placeholder || field.name || field.type);
			}
		});
	}

	function initForms() {
		document.querySelectorAll("form").forEach(function (form) {
			form.addEventListener("submit", function (event) {
				event.preventDefault();
				var button = form.querySelector('button[type="submit"], input[type="submit"], button');
				if (!button) return;
				setButtonFeedback(button, "Sent!");
				setTimeout(function () {
					form.reset();
				}, 1800);
			});
		});
		document.querySelectorAll('input[type="submit"]').forEach(function (button) {
			if (button.closest("form")) return;
			button.addEventListener("click", function (event) {
				event.preventDefault();
				setButtonFeedback(button, "Subscribed!");
			});
		});
	}

	function initVideoButton() {
		var button = document.querySelector('button[aria-label="video play button"]');
		if (!button) return;
		button.addEventListener("click", function () {
			button.classList.add("scale-90");
			setTimeout(function () {
				button.classList.remove("scale-90");
			}, 150);
		});
	}

	document.addEventListener("DOMContentLoaded", function () {
		initThemeToggle();
		initMobileMenu();
		initPagesMenu();
		initStickyHeader();
		initPricingSwitch();
		initFields();
		initForms();
		initVideoButton();
	});
})();
