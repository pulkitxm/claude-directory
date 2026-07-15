(function () {
	"use strict";

	/* ---------- Theme (honor prefers-color-scheme, no toggle in source) ---------- */
	(function initTheme() {
		try {
			var stored = localStorage.getItem("theme");
			var prefersDark =
				window.matchMedia &&
				window.matchMedia("(prefers-color-scheme: dark)").matches;
			var root = document.documentElement;
			root.classList.remove("light", "dark");
			if (stored === "dark" || (!stored && prefersDark)) {
				root.classList.add("dark");
			} else {
				root.classList.add("light");
			}
		} catch (e) {}
	})();

	/* ---------- Sticky header ---------- */
	var header = document.querySelector(".site-header");
	function onScroll() {
		if (!header) return;
		if (window.scrollY > 80) header.classList.add("is-stuck");
		else header.classList.remove("is-stuck");
	}
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();

	/* ---------- Mobile menu ---------- */
	var hamburger = document.querySelector(".hamburger");
	var mobileNav = document.querySelector(".mobile-nav");
	if (hamburger && mobileNav) {
		hamburger.addEventListener("click", function () {
			hamburger.classList.toggle("is-open");
			mobileNav.classList.toggle("is-open");
			document.body.style.overflow = mobileNav.classList.contains("is-open")
				? "hidden"
				: "";
		});
		mobileNav.querySelectorAll("a").forEach(function (link) {
			link.addEventListener("click", function () {
				hamburger.classList.remove("is-open");
				mobileNav.classList.remove("is-open");
				document.body.style.overflow = "";
			});
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

	/* ---------- FAQ accordion ---------- */
	var faqItems = document.querySelectorAll(".faq-item");
	faqItems.forEach(function (item) {
		var btn = item.querySelector(".faq-question");
		if (!btn) return;
		btn.addEventListener("click", function () {
			var wasOpen = item.classList.contains("is-open");
			faqItems.forEach(function (i) {
				i.classList.remove("is-open");
			});
			if (!wasOpen) item.classList.add("is-open");
		});
	});

	/* ---------- Scroll-reveal (IntersectionObserver, staggered) ---------- */
	var revealEls = document.querySelectorAll(".reveal");
	if ("IntersectionObserver" in window && revealEls.length) {
		var io = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						var delay = entry.target.getAttribute("data-reveal-delay") || 0;
						setTimeout(function () {
							entry.target.classList.add("in-view");
						}, Number(delay));
						io.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
		);
		revealEls.forEach(function (el) {
			io.observe(el);
		});
	} else {
		revealEls.forEach(function (el) {
			el.classList.add("in-view");
		});
	}

	/* ---------- Generic form success handling (contact/newsletter/auth) ---------- */
	document.querySelectorAll("form[data-form]").forEach(function (form) {
		form.addEventListener("submit", function (e) {
			e.preventDefault();
			var note = form.querySelector(".form-note");
			if (note) {
				note.textContent = "Thanks! Your submission has been received.";
				note.classList.add("is-visible");
			}
			form.reset();
		});
	});

	var countdown = document.querySelector("[data-countdown]");
	if (countdown) {
		var parts = {
			days: document.querySelector('[data-countdown="days"]'),
			hours: document.querySelector('[data-countdown="hours"]'),
			minutes: document.querySelector('[data-countdown="minutes"]'),
			seconds: document.querySelector('[data-countdown="seconds"]'),
		};
		var remaining =
			Number(parts.days.textContent) * 86400 +
			Number(parts.hours.textContent) * 3600 +
			Number(parts.minutes.textContent) * 60 +
			Number(parts.seconds.textContent);
		var end = Date.now() + remaining * 1000;
		var updateCountdown = function () {
			var total = Math.max(0, Math.floor((end - Date.now()) / 1000));
			parts.days.textContent = String(Math.floor(total / 86400)).padStart(2, "0");
			parts.hours.textContent = String(Math.floor((total % 86400) / 3600)).padStart(2, "0");
			parts.minutes.textContent = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
			parts.seconds.textContent = String(total % 60).padStart(2, "0");
		};
		updateCountdown();
		window.setInterval(updateCountdown, 1000);
	}
})();
