(function () {
	"use strict";

	/* ---------- Sticky header ---------- */
	var header = document.querySelector(".site-header");
	function onScroll() {
		if (!header) return;
		if (window.scrollY > 80) header.classList.add("is-stuck");
		else header.classList.remove("is-stuck");
	}
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();

	/* ---------- Scrollspy for in-page nav (home only) ---------- */
	var scrollLinks = document.querySelectorAll(".menu-scroll");
	if (scrollLinks.length) {
		var sections = [];
		scrollLinks.forEach(function (a) {
			var id = a.getAttribute("href").split("#")[1];
			var el = id && document.getElementById(id);
			if (el) sections.push({ link: a, el: el });
		});
		function onSpy() {
			var y = window.scrollY + 140;
			var current = null;
			sections.forEach(function (s) {
				if (s.el.offsetTop <= y) current = s;
			});
			sections.forEach(function (s) {
				s.link.classList.remove("active");
			});
			if (current) current.link.classList.add("active");
		}
		window.addEventListener("scroll", onSpy, { passive: true });
		onSpy();
	}

	/* ---------- Mobile menu ---------- */
	var hamburger = document.querySelector(".hamburger");
	var mobileNav = document.querySelector(".mobile-nav");
	if (hamburger && mobileNav) {
		hamburger.addEventListener("click", function () {
			hamburger.classList.toggle("is-open");
			mobileNav.classList.toggle("is-open");
		});
	}

	/* ---------- Pages dropdown (click-toggle, also hover via CSS) ---------- */
	var dropdown = document.querySelector(".nav-dropdown");
	if (dropdown) {
		var trigger = dropdown.querySelector(".nav-link");
		trigger.addEventListener("click", function (e) {
			e.preventDefault();
			dropdown.classList.toggle("open");
		});
		document.addEventListener("click", function (e) {
			if (!dropdown.contains(e.target)) dropdown.classList.remove("open");
		});
	}

	/* ---------- Search overlay ---------- */
	var searchBtn = document.querySelector("[data-search-open]");
	var searchOverlay = document.querySelector(".search-overlay");
	if (searchBtn && searchOverlay) {
		var searchInput = searchOverlay.querySelector("input");
		searchBtn.addEventListener("click", function () {
			searchOverlay.classList.add("is-open");
			setTimeout(function () {
				searchInput && searchInput.focus();
			}, 50);
		});
		searchOverlay.addEventListener("click", function (e) {
			if (e.target === searchOverlay) searchOverlay.classList.remove("is-open");
		});
		document.addEventListener("keydown", function (e) {
			if (e.key === "Escape") searchOverlay.classList.remove("is-open");
		});
	}

	/* ---------- Theme toggle ---------- */
	var themeBtn = document.querySelector(".theme-toggle");
	if (themeBtn) {
		themeBtn.addEventListener("click", function () {
			var root = document.documentElement;
			var isDark = root.classList.toggle("dark");
			try {
				localStorage.setItem("agency-theme", isDark ? "dark" : "light");
			} catch (e) {}
		});
	}

	/* ---------- Portfolio filter (home + portfolio hub) ---------- */
	var filterBar = document.querySelector("[data-filter-bar]");
	if (filterBar) {
		var buttons = filterBar.querySelectorAll("[data-filter]");
		var items = document.querySelectorAll("[data-category]");
		buttons.forEach(function (btn) {
			btn.addEventListener("click", function () {
				buttons.forEach(function (b) {
					b.classList.remove("active");
				});
				btn.classList.add("active");
				var filter = btn.getAttribute("data-filter");
				items.forEach(function (item) {
					var show =
						filter === "all" || item.getAttribute("data-category") === filter;
					item.style.display = show ? "" : "none";
				});
			});
		});
	}

	/* ---------- Reveal-on-load (NOT scroll-gated) ----------
     The reference site has no AOS/IntersectionObserver-style scroll reveal —
     content is simply visible. To avoid any risk of elements getting stuck
     hidden (e.g. a headless full-page capture that never fires scroll-based
     intersection for below-the-fold nodes), every `.reveal` element just gets
     a single, immediate fade-in on first paint instead of waiting to scroll
     into view. */
	var revealEls = document.querySelectorAll(".reveal");
	revealEls.forEach(function (el) {
		el.classList.add("in-view");
	});
})();
