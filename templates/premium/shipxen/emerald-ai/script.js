// Emerald AI clone — vanilla interactions
// 1) Mobile slide-in nav  2) scroll-entrance reveals  3) decorative theme toggle

(function () {
	"use strict";

	/* ---------- Mobile nav (hamburger -> slide-in panel) ---------- */
	function initMobileNav() {
		// The original MobileNav: a hamburger button toggles a fixed full-screen
		// panel that starts at translate-x-full and slides to translate-x-0.
		const panels = document.querySelectorAll(
			'.fixed.left-0.top-0.z-20.h-full.w-full'
		);
		const panel = panels[0];
		if (!panel) return;
		panel.classList.add("mobile-nav-panel");

		const openBtns = document.querySelectorAll('button[aria-label="Toggle Menu"]');
		openBtns.forEach((btn) => {
			btn.addEventListener("click", () => {
				const opening = panel.classList.toggle("is-open");
				if (opening) {
					panel.classList.remove("translate-x-full");
				} else {
					panel.classList.add("translate-x-full");
				}
			});
		});
	}

	/* ---------- Scroll entrance reveals (IntersectionObserver) ---------- */
	function initReveals() {
		const main = document.querySelector('[data-sentry-component="EmeraldAi"]') || document.body;
		// Tag major sections + cards for staggered reveal
		const targets = main.querySelectorAll(
			"section, .grid > *, [data-sentry-component='LandingTestimonial'], [data-sentry-component='LandingFeature']"
		);
		if (!("IntersectionObserver" in window) || !targets.length) return;

		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("is-visible");
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
		);

		const observed = [];
		targets.forEach((t) => {
			// Skip the hero/header region so above-the-fold is instantly visible.
			const rect = t.getBoundingClientRect();
			if (rect.top < window.innerHeight * 0.9) return;
			// Never hide media-bearing blocks (images/videos) — only animate text/cards.
			if (t.querySelector("img, video")) return;
			t.classList.add("reveal-on-scroll");
			io.observe(t);
			observed.push(t);
		});

		// Safety net: if a non-scrolling renderer (e.g. a full-page screenshot tool)
		// never scrolls these into view, reveal them so content is never hidden.
		const revealAll = () => observed.forEach((t) => t.classList.add("is-visible"));
		window.setTimeout(revealAll, 1200);
		window.addEventListener("load", () => window.setTimeout(revealAll, 200));
	}

	/* ---------- Decorative dark-mode toggle (kept visual, no-op routing) ---- */
	function initThemeToggle() {
		const toggles = document.querySelectorAll(
			'button[aria-label="Toggle Dark Mode"]'
		);
		const root = document.documentElement;
		toggles.forEach((btn) => {
			btn.addEventListener("click", () => {
				root.classList.toggle("dark");
				document.body.classList.toggle("dark");
			});
		});
	}

	/* ---------- Prevent dead-link navigation jumping the page ---------- */
	function initDeadLinks() {
		document.querySelectorAll('a[href="#"]').forEach((a) => {
			a.addEventListener("click", (ev) => {
				ev.preventDefault();
			});
		});
	}

	function init() {
		initMobileNav();
		initReveals();
		initThemeToggle();
		initDeadLinks();
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}
})();
