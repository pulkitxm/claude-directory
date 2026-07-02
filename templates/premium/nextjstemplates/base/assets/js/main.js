// Shared interactivity for every page of the Base clone:
// dark-mode toggle, mobile nav, "Pages" dropdown, sticky header,
// smooth-scroll anchors, and scroll-entrance reveal.

(function () {
	"use strict";

	/* ---------- Dark mode toggle ---------- */
	function initThemeToggle() {
		var btn = document.querySelector("[data-theme-toggle]");
		if (!btn) return;
		btn.addEventListener("click", function () {
			var root = document.documentElement;
			var isDark = root.classList.toggle("dark");
			try {
				localStorage.setItem("base-theme", isDark ? "dark" : "light");
			} catch (e) {}
		});
	}

	/* ---------- Mobile hamburger nav ---------- */
	function initMobileNav() {
		var openBtn = document.querySelector(".navbarOpen");
		var closeBtn = document.querySelector(".navbarClose");
		var nav = document.querySelector(".menu-wrapper nav");
		if (!openBtn || !nav) return;
		openBtn.addEventListener("click", function () {
			nav.classList.add("nav-open");
		});
		if (closeBtn) {
			closeBtn.addEventListener("click", function () {
				nav.classList.remove("nav-open");
			});
		}
		nav.querySelectorAll("a").forEach(function (a) {
			a.addEventListener("click", function () {
				nav.classList.remove("nav-open");
			});
		});
	}

	/* ---------- "Pages" submenu (click toggle for touch/mobile) ---------- */
	function initSubmenu() {
		var submenuItems = document.querySelectorAll(".submenu-item");
		submenuItems.forEach(function (item) {
			var trigger = item.querySelector(":scope > a");
			if (!trigger) return;
			trigger.addEventListener("click", function (e) {
				if (window.innerWidth < 1024) {
					e.preventDefault();
					item.classList.toggle("submenu-open");
				}
			});
		});
	}

	/* ---------- Sticky header on scroll ---------- */
	function initStickyHeader() {
		var header = document.querySelector("header.navbar");
		if (!header) return;
		function onScroll() {
			if (window.scrollY > 20) {
				header.classList.add("sticky");
			} else {
				header.classList.remove("sticky");
			}
		}
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
	}

	/* ---------- Smooth scroll for in-page anchors ---------- */
	function initSmoothScroll() {
		var onIndex =
			location.pathname.endsWith("/") ||
			location.pathname.endsWith("index.html");
		document.querySelectorAll('a[href*="#"]').forEach(function (a) {
			var href = a.getAttribute("href");
			if (!href) return;
			var hashIndex = href.indexOf("#");
			if (hashIndex === -1) return;
			var path = href.slice(0, hashIndex);
			var hash = href.slice(hashIndex + 1);
			if (!hash) return;
			if (path !== "" && path !== "/" && path !== "index.html") return;
			if (path !== "" && !onIndex) return;
			var target = document.getElementById(hash);
			if (!target) return;
			a.addEventListener("click", function (e) {
				e.preventDefault();
				target.scrollIntoView({ behavior: "smooth", block: "start" });
				var nav = document.querySelector(".menu-wrapper nav");
				if (nav) nav.classList.remove("nav-open");
			});
		});
	}

	/* ---------- Scroll-entrance reveal ---------- */
	function initReveal() {
		var els = document.querySelectorAll(
			".animate_top, .animate_left, .animate_right",
		);
		if (!("IntersectionObserver" in window) || !els.length) {
			els.forEach(function (el) {
				el.classList.add("in-view");
			});
			return;
		}
		var io = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						entry.target.classList.add("in-view");
						io.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
		);
		els.forEach(function (el) {
			io.observe(el);
		});
		// Safety net: full-page captures (and users who never scroll) must
		// still end up with fully visible content, so force-reveal anything
		// still hidden a short while after load.
		window.setTimeout(function () {
			els.forEach(function (el) {
				el.classList.add("in-view");
			});
		}, 1200);
	}

	/* ---------- Pricing monthly/annually toggle ---------- */
	function initPricingToggle() {
		var toggle = document.querySelector("[data-pricing-toggle]");
		var wrap = document.querySelector("[data-billing]");
		if (!toggle || !wrap) return;
		toggle.addEventListener("click", function () {
			var pressed = toggle.getAttribute("aria-pressed") === "true";
			toggle.setAttribute("aria-pressed", String(!pressed));
			wrap.setAttribute("data-billing", pressed ? "monthly" : "annual");
		});
	}

	/* ---------- Portfolio category filter ---------- */
	function initPortfolioFilter() {
		var pills = document.querySelectorAll("[data-filter]");
		var items = document.querySelectorAll("[data-category]");
		if (!pills.length || !items.length) return;
		pills.forEach(function (pill) {
			pill.addEventListener("click", function () {
				pills.forEach(function (p) {
					p.setAttribute("aria-pressed", "false");
				});
				pill.setAttribute("aria-pressed", "true");
				var filter = pill.getAttribute("data-filter");
				items.forEach(function (item) {
					var show =
						filter === "all" || item.getAttribute("data-category") === filter;
					item.hidden = !show;
				});
			});
		});
	}

	/* ---------- Testimonial carousel (real Swiper, matches source) ---------- */
	function initSwiperTestimonial() {
		var el = document.querySelector(".mySwiper");
		if (!el || typeof window.Swiper === "undefined") return false;
		new window.Swiper(el, {
			slidesPerView: 1,
			spaceBetween: 24,
			loop: true,
			navigation: {
				nextEl: '[aria-label="Testimonial next arrow"]',
				prevEl: '[aria-label="Testimonial prev arrow"]',
			},
		});
		return true;
	}

	/* ---------- Testimonial carousel (fallback, no Swiper available) ---------- */
	function initTestimonialCarousel() {
		if (initSwiperTestimonial()) return;
		var track = document.querySelector(".testimonial-track");
		if (!track) return;
		var slides = track.querySelectorAll(".testimonial-slide");
		var prev = document.querySelector('[aria-label="Testimonial prev arrow"]');
		var next = document.querySelector('[aria-label="Testimonial next arrow"]');
		var dotsWrap = document.querySelector(".testimonial-dots");
		var index = 0;

		function render() {
			track.style.transform = "translateX(-" + index * 100 + "%)";
			if (dotsWrap) {
				dotsWrap.querySelectorAll(".testimonial-dot").forEach(function (d, i) {
					d.setAttribute("aria-current", String(i === index));
				});
			}
		}
		function go(delta) {
			index = (index + delta + slides.length) % slides.length;
			render();
		}
		if (prev)
			prev.addEventListener("click", function () {
				go(-1);
			});
		if (next)
			next.addEventListener("click", function () {
				go(1);
			});
		if (dotsWrap) {
			dotsWrap.querySelectorAll(".testimonial-dot").forEach(function (dot, i) {
				dot.addEventListener("click", function () {
					index = i;
					render();
				});
			});
		}
		render();
	}

	/* ---------- Stat counters (count up when scrolled into view) ---------- */
	function initCounters() {
		var counters = document.querySelectorAll(".counter[data-count]");
		if (!counters.length) return;
		function animate(el) {
			var target = parseInt(el.getAttribute("data-count"), 10) || 0;
			var duration = 1500;
			var start = null;
			function step(ts) {
				if (!start) start = ts;
				var progress = Math.min((ts - start) / duration, 1);
				el.textContent = Math.floor(progress * target);
				if (progress < 1) {
					requestAnimationFrame(step);
				} else {
					el.textContent = target;
				}
			}
			requestAnimationFrame(step);
		}
		if (!("IntersectionObserver" in window)) {
			counters.forEach(animate);
			return;
		}
		var done = new Set();
		var io = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						done.add(entry.target);
						animate(entry.target);
						io.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.3 },
		);
		counters.forEach(function (el) {
			io.observe(el);
		});
		// Safety net for full-page captures / non-scrolling visits.
		window.setTimeout(function () {
			counters.forEach(function (el) {
				if (!done.has(el)) {
					el.textContent = el.getAttribute("data-count");
				}
			});
		}, 1800);
	}

	document.addEventListener("DOMContentLoaded", function () {
		initThemeToggle();
		initMobileNav();
		initSubmenu();
		initStickyHeader();
		initSmoothScroll();
		initReveal();
		initPricingToggle();
		initPortfolioFilter();
		initTestimonialCarousel();
		initCounters();
	});
})();
