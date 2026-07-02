// ===== AIStarterkit clone — interactions =====
(function () {
	"use strict";

	// ---- Theme toggle ----
	var themeBtn = document.querySelector(".theme-toggle");
	if (themeBtn) {
		themeBtn.addEventListener("click", function () {
			var root = document.documentElement;
			var isDark = root.classList.toggle("dark");
			try {
				localStorage.setItem("theme", isDark ? "dark" : "light");
			} catch (e) {}
		});
	}

	// ---- Nav dropdowns (Products / Pages) ----
	var dropdowns = document.querySelectorAll(".nav-dropdown");
	function closeAllDropdowns(except) {
		dropdowns.forEach(function (d) {
			if (d !== except) d.classList.remove("open");
		});
	}
	dropdowns.forEach(function (dd) {
		var trigger = dd.querySelector(".nav-dropdown-trigger");
		if (!trigger) return;
		trigger.addEventListener("click", function (e) {
			e.stopPropagation();
			var willOpen = !dd.classList.contains("open");
			closeAllDropdowns();
			dd.classList.toggle("open", willOpen);
		});
	});
	document.addEventListener("click", function (e) {
		if (!e.target.closest(".nav-dropdown")) closeAllDropdowns();
	});
	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape") closeAllDropdowns();
	});

	// ---- Mobile menu ----
	var menuToggle = document.querySelector(".menu-toggle");
	var mobileMenu = document.querySelector(".mobile-menu");
	if (menuToggle && mobileMenu) {
		menuToggle.addEventListener("click", function () {
			mobileMenu.classList.toggle("open");
			menuToggle.classList.toggle("active");
		});
	}

	// ---- FAQ accordion ----
	document.querySelectorAll(".faq-item").forEach(function (item) {
		var q = item.querySelector(".faq-q");
		var a = item.querySelector(".faq-a");
		if (!q || !a) return;
		function setOpen(open) {
			item.classList.toggle("open", open);
			q.setAttribute("aria-expanded", String(open));
			a.style.maxHeight = open ? a.scrollHeight + "px" : "0px";
		}
		setOpen(item.classList.contains("open"));
		q.addEventListener("click", function () {
			setOpen(!item.classList.contains("open"));
		});
	});

	// ---- Pricing monthly / annually toggle ----
	var monthlyBtn = document.querySelector(".billing-monthly");
	var annualBtn = document.querySelector(".billing-annual");
	if (monthlyBtn && annualBtn) {
		function setBilling(annual) {
			monthlyBtn.classList.toggle("active", !annual);
			annualBtn.classList.toggle("active", annual);
			document
				.querySelectorAll("[data-monthly][data-annual]")
				.forEach(function (el) {
					el.textContent = annual ? el.dataset.annual : el.dataset.monthly;
				});
		}
		monthlyBtn.addEventListener("click", function () {
			setBilling(false);
		});
		annualBtn.addEventListener("click", function () {
			setBilling(true);
		});
	}

	// ---- Testimonials "Show more" ----
	var showMoreBtn = document.querySelector(".testimonials-show-more");
	var testimonialsSection = document.querySelector(".testimonials-section");
	if (showMoreBtn && testimonialsSection) {
		showMoreBtn.addEventListener("click", function () {
			testimonialsSection.classList.add("expanded");
			showMoreBtn.style.display = "none";
		});
	}

	// ---- Password visibility toggle ----
	document.querySelectorAll(".eye-toggle").forEach(function (eye) {
		var input = eye.parentElement.querySelector("input");
		if (!input) return;
		eye.addEventListener("click", function () {
			input.type = input.type === "password" ? "text" : "password";
			eye.classList.toggle("shown");
		});
	});

	// ---- Scroll reveal ----
	// Elements above/near the fold reveal via IntersectionObserver as the user
	// scrolls. A load-time fallback also force-reveals everything shortly after
	// load so content is never permanently stuck invisible for tools (or users)
	// that render the full page without scrolling (e.g. full-page screenshots).
	var reveals = document.querySelectorAll(".reveal");
	if ("IntersectionObserver" in window && reveals.length) {
		var io = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						var delay = entry.target.dataset.delay || 0;
						entry.target.style.transitionDelay = delay + "ms";
						entry.target.classList.add("in");
						io.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
		);
		reveals.forEach(function (r) {
			io.observe(r);
		});
		setTimeout(function () {
			reveals.forEach(function (r) {
				if (!r.classList.contains("in")) r.classList.add("in");
			});
			io.disconnect();
		}, 900);
	} else {
		reveals.forEach(function (r) {
			r.classList.add("in");
		});
	}

	// Prevent form submit navigation (demo only)
	document.querySelectorAll("form[data-demo]").forEach(function (f) {
		f.addEventListener("submit", function (e) {
			e.preventDefault();
		});
	});
})();
