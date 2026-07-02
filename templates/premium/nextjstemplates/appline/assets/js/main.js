(function () {
	"use strict";

	// ---- Theme (light/dark) ----
	function getStoredTheme() {
		try {
			return localStorage.getItem("appline-theme");
		} catch (e) {
			return null;
		}
	}
	function applyTheme(theme) {
		var root = document.documentElement;
		root.classList.remove("light", "dark");
		root.classList.add(theme);
		root.style.colorScheme = theme;
	}
	function setTheme(theme) {
		applyTheme(theme);
		try {
			localStorage.setItem("appline-theme", theme);
		} catch (e) {}
	}
	window.__applineSetTheme = setTheme;

	document.addEventListener("DOMContentLoaded", function () {
		var toggles = document.querySelectorAll("[data-theme-toggle]");
		toggles.forEach(function (btn) {
			btn.addEventListener("click", function () {
				var current = document.documentElement.classList.contains("dark")
					? "dark"
					: "light";
				setTheme(current === "dark" ? "light" : "dark");
			});
		});

		// ---- Mobile nav ----
		var navOpen = document.querySelector(".navbarOpen");
		var navClose = document.querySelector(".navbarClose");
		var menuWrapper = document.querySelector(".menu-wrapper");
		if (navOpen && menuWrapper) {
			navOpen.addEventListener("click", function () {
				menuWrapper.classList.remove("hidden");
				menuWrapper.classList.add("flex");
			});
		}
		if (navClose && menuWrapper) {
			navClose.addEventListener("click", function () {
				menuWrapper.classList.add("hidden");
				menuWrapper.classList.remove("flex");
			});
		}

		// ---- Submenu (Pages dropdown) ----
		document.querySelectorAll(".submenu-item").forEach(function (item) {
			var toggler = item.querySelector(".submenu-taggler");
			var submenu = item.querySelector(".submenu");
			if (!toggler || !submenu) return;
			toggler.addEventListener("click", function (e) {
				e.preventDefault();
				submenu.classList.toggle("hidden");
			});
		});

		// ---- Sticky header on scroll ----
		var header = document.querySelector("header.navbar");
		if (header) {
			var onScroll = function () {
				if (window.scrollY > 30) {
					header.classList.add("sticky-navbar");
				} else {
					header.classList.remove("sticky-navbar");
				}
			};
			window.addEventListener("scroll", onScroll, { passive: true });
			onScroll();
		}

		// ---- Pricing monthly/yearly toggle ----
		var pricingSwitch = document.querySelector("[data-pricing-toggle]");
		if (pricingSwitch) {
			pricingSwitch.addEventListener("click", function () {
				var isYearly = pricingSwitch.getAttribute("aria-checked") === "true";
				pricingSwitch.setAttribute("aria-checked", String(!isYearly));
				document.body.classList.toggle("is-yearly", !isYearly);
				document
					.querySelectorAll("[data-price-monthly]")
					.forEach(function (el) {
						el.classList.toggle("hidden", !isYearly);
					});
				document.querySelectorAll("[data-price-yearly]").forEach(function (el) {
					el.classList.toggle("hidden", isYearly);
				});
			});
		}

		// ---- FAQ accordion ----
		var faqItems = document.querySelectorAll("[data-faq-item]");
		faqItems.forEach(function (item) {
			var trigger = item.querySelector("[data-faq-trigger]");
			var panel = item.querySelector("[data-faq-panel]");
			if (!trigger || !panel) return;
			trigger.addEventListener("click", function () {
				var isOpen = item.classList.contains("faq-open");
				faqItems.forEach(function (other) {
					other.classList.remove("faq-open");
					var otherPanel = other.querySelector("[data-faq-panel]");
					if (otherPanel) otherPanel.style.maxHeight = null;
				});
				if (!isOpen) {
					item.classList.add("faq-open");
					panel.style.maxHeight = panel.scrollHeight + "px";
				}
			});
		});

		// ---- WOW-style entrance animations (wow fadeInUp, etc.) ----
		// Runs once on load (matches the reference site, which animates
		// content in on mount rather than gating it behind real scroll).
		var wowEls = document.querySelectorAll(".wow");
		wowEls.forEach(function (el) {
			var delay = el.getAttribute("data-wow-delay");
			if (delay) {
				el.style.animationDelay = delay;
			}
			el.classList.add("animated");
		});

		// ---- Scroll reveal ----
		// Runs once on load (matches the reference site, which animates
		// content in on mount rather than gating it behind real scroll;
		// gating large wrapper elements behind an intersection ratio meant
		// they could stay invisible forever if they never crossed the
		// visibility threshold while in view).
		var revealEls = document.querySelectorAll("[data-reveal]");
		revealEls.forEach(function (el) {
			el.classList.add("reveal-visible");
		});

		// ---- App screenshots carousel (Swiper) ----
		if (window.Swiper) {
			var swiperEl = document.querySelector(".mySwiper");
			if (swiperEl) {
				new window.Swiper(".mySwiper", {
					slidesPerView: 1,
					spaceBetween: 24,
					loop: true,
					pagination: { el: ".swiper-pagination", clickable: true },
					navigation: {
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev",
					},
					breakpoints: {
						768: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
					},
				});
			}
		}
	});
})();
