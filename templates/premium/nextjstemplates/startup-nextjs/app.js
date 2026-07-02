// Startup — shared interactivity for every page (mobile menu, theme toggle,
// sticky header, pricing period switch, and no-backend form feedback).
// Faithfully reproduces the behavior observed on https://startup.demo.nextjstemplates.com
(function () {
	"use strict";

	/* ---------------------------------------------------------------------
	 * Theme toggle (light/dark) — the boot script in <head> already applies
	 * the persisted/preferred theme before paint to avoid a flash; this just
	 * wires the button click.
	 * ------------------------------------------------------------------- */
	function initThemeToggle() {
		var btn = document.querySelector('button[aria-label="theme toggler"]');
		if (!btn) return;
		btn.addEventListener("click", function () {
			var root = document.documentElement;
			var isDark = root.classList.contains("dark");
			var next = isDark ? "light" : "dark";
			root.classList.remove("light", "dark");
			root.classList.add(next);
			root.style.colorScheme = next;
			try {
				localStorage.setItem("theme", next);
			} catch (e) {
				/* storage unavailable — theme just won't persist */
			}
		});
	}

	/* ---------------------------------------------------------------------
	 * Mobile hamburger menu — toggles the collapsed nav panel + animates the
	 * three bars into an "X".
	 * ------------------------------------------------------------------- */
	function initMobileMenu() {
		var toggler = document.getElementById("navbarToggler");
		var nav = document.getElementById("navbarCollapse");
		if (!toggler || !nav) return;
		toggler.addEventListener("click", function () {
			toggler.classList.toggle("navbar-open");
			nav.classList.toggle("navbar-open");
		});
		// Close the mobile menu after a nav link is tapped.
		nav.querySelectorAll("a").forEach(function (a) {
			a.addEventListener("click", function () {
				toggler.classList.remove("navbar-open");
				nav.classList.remove("navbar-open");
			});
		});
	}

	/* ---------------------------------------------------------------------
	 * Sticky header — becomes opaque + shadowed once the page scrolls past
	 * 80px, matching the source template's header scroll behavior.
	 * ------------------------------------------------------------------- */
	function initStickyHeader() {
		var header = document.querySelector(".header");
		if (!header) return;
		function handleScroll() {
			if (window.scrollY > 80) {
				header.classList.add("header-scrolled");
			} else {
				header.classList.remove("header-scrolled");
			}
		}
		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
	}

	/* ---------------------------------------------------------------------
	 * Pricing monthly/yearly switch (home page) — toggles the sliding knob
	 * and the bold/muted label styling.
	 * ------------------------------------------------------------------- */
	function initPricingSwitch() {
		var wrap = document.querySelector(".shadow-switch-1");
		if (!wrap) return;
		var switchTrack = wrap.closest(".flex.cursor-pointer.items-center");
		if (!switchTrack) return;
		var monthlyLabel = switchTrack.previousElementSibling;
		var yearlyLabel = switchTrack.nextElementSibling;
		var knob = wrap;
		var yearly = false;
		switchTrack.addEventListener("click", function () {
			yearly = !yearly;
			if (yearly) {
				knob.style.left = "28px";
				if (monthlyLabel) {
					monthlyLabel.classList.add("pointer-events-none");
					monthlyLabel.classList.remove("text-dark", "dark:text-white");
					monthlyLabel.classList.add("text-primary");
				}
				if (yearlyLabel) {
					yearlyLabel.classList.remove("pointer-events-none");
					yearlyLabel.classList.add("text-dark", "dark:text-white");
					yearlyLabel.classList.remove("text-primary");
				}
			} else {
				knob.style.left = "0px";
				if (yearlyLabel) {
					yearlyLabel.classList.add("pointer-events-none");
					yearlyLabel.classList.remove("text-dark", "dark:text-white");
					yearlyLabel.classList.add("text-primary");
				}
				if (monthlyLabel) {
					monthlyLabel.classList.remove("pointer-events-none");
					monthlyLabel.classList.add("text-dark", "dark:text-white");
					monthlyLabel.classList.remove("text-primary");
				}
			}
		});
	}

	/* ---------------------------------------------------------------------
	 * Forms — this static clone has no backend, so every form just shows
	 * inline confirmation text instead of the button label, then resets.
	 * ------------------------------------------------------------------- */
	function initForms() {
		document.querySelectorAll("form").forEach(function (form) {
			form.addEventListener("submit", function (e) {
				e.preventDefault();
				var btn = form.querySelector('button[type="submit"], button');
				if (!btn) return;
				var original = btn.textContent;
				btn.textContent = "Sent!";
				btn.disabled = true;
				setTimeout(function () {
					btn.textContent = original;
					btn.disabled = false;
					form.reset();
				}, 1800);
			});
		});
	}

	/* ---------------------------------------------------------------------
	 * Video play button (home page) — purely decorative on the reference
	 * site (no real video source), so we just give it a pressed feedback.
	 * ------------------------------------------------------------------- */
	function initVideoButton() {
		var btn = document.querySelector('button[aria-label="video play button"]');
		if (!btn) return;
		btn.addEventListener("click", function () {
			btn.classList.add("scale-90");
			setTimeout(function () {
				btn.classList.remove("scale-90");
			}, 150);
		});
	}

	document.addEventListener("DOMContentLoaded", function () {
		initThemeToggle();
		initMobileMenu();
		initStickyHeader();
		initPricingSwitch();
		initForms();
		initVideoButton();
	});
})();
