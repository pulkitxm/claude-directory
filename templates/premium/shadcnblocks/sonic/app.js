/* SONIC — shared interactions: theme toggle, mobile menu, banner, FAQ, scroll reveal */
(function () {
	"use strict";

	/* ---- Mobile menu ---- */
	const burger = document.querySelector(".hamburger");
	const menu = document.querySelector(".mobile-menu");
	function closeMenu() {
		document.body.classList.remove("menu-open");
		if (burger) burger.setAttribute("aria-expanded", "false");
	}
	if (burger) {
		burger.addEventListener("click", function () {
			const open = document.body.classList.toggle("menu-open");
			burger.setAttribute("aria-expanded", String(open));
		});
	}
	if (menu) {
		menu
			.querySelectorAll("a")
			.forEach((a) => a.addEventListener("click", closeMenu));
		const bd = menu.querySelector(".backdrop");
		if (bd) bd.addEventListener("click", closeMenu);
	}
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") closeMenu();
	});

	/* ---- Promo banner dismiss ---- */
	const close = document.querySelector(".promo-close");
	if (close) {
		if (sessionStorage.getItem("sonic-promo") === "hidden")
			document.body.classList.add("promo-hidden");
		close.addEventListener("click", function () {
			document.body.classList.add("promo-hidden");
			try {
				sessionStorage.setItem("sonic-promo", "hidden");
			} catch (e) {}
		});
	}

	/* ---- Theme toggle (with view-transition circular mask) ---- */
	const toggle = document.querySelector(".theme-toggle");
	function applyTheme(t) {
		document.documentElement.classList.toggle("dark", t === "dark");
		try {
			localStorage.setItem("sonic-theme", t);
		} catch (e) {}
	}
	if (toggle) {
		toggle.addEventListener("click", function (ev) {
			const next = document.documentElement.classList.contains("dark")
				? "light"
				: "dark";
			const supportsVT =
				typeof document.startViewTransition === "function" &&
				!window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			if (!supportsVT) {
				applyTheme(next);
				return;
			}
			const x = ev.clientX,
				y = ev.clientY;
			const r = Math.hypot(
				Math.max(x, innerWidth - x),
				Math.max(y, innerHeight - y),
			);
			const tr = document.startViewTransition(() => applyTheme(next));
			tr.ready.then(() => {
				document.documentElement.animate(
					{
						clipPath: [
							`circle(0px at ${x}px ${y}px)`,
							`circle(${r}px at ${x}px ${y}px)`,
						],
					},
					{
						duration: 500,
						easing: "ease-in-out",
						pseudoElement: "::view-transition-new(root)",
					},
				);
			});
		});
	}

	/* ---- FAQ accordion ---- */
	document.querySelectorAll(".faq-q").forEach(function (q) {
		q.addEventListener("click", function () {
			const item = q.closest(".faq-item");
			const wasOpen = item.classList.contains("open");
			// single-open behavior within a list
			const list = item.closest(".faq");
			if (list)
				list.querySelectorAll(".faq-item.open").forEach((i) => {
					if (i !== item) i.classList.remove("open");
				});
			item.classList.toggle("open", !wasOpen);
			q.setAttribute("aria-expanded", String(!wasOpen));
		});
	});

	/* ---- Scroll reveal ---- */
	const reveals = document.querySelectorAll(".reveal");
	if (reveals.length) {
		if (!("IntersectionObserver" in window)) {
			reveals.forEach((r) => r.classList.add("in"));
		} else {
			const io = new IntersectionObserver(
				function (entries) {
					entries.forEach(function (e) {
						if (e.isIntersecting) {
							e.target.classList.add("in");
							io.unobserve(e.target);
						}
					});
				},
				{ threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
			);
			reveals.forEach((r) => io.observe(r));
			// Failsafe: guarantee no element stays permanently hidden if the
			// observer never fires for it (fast scroll, full-page capture, etc).
			// Above-fold items still animate via the observer; this only rescues
			// anything still hidden a moment after the page settles.
			const failsafe = () =>
				document
					.querySelectorAll(".reveal:not(.in)")
					.forEach((r) => r.classList.add("in"));
			window.addEventListener("load", () => setTimeout(failsafe, 1200));
			setTimeout(failsafe, 2500);
		}
	}
})();
