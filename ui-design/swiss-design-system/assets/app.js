/* ============================================================================
   SCHRIFT — interaction layer. Vanilla JS, no dependencies, progressive.
   Everything degrades gracefully: with JS off, all content is still readable,
   the FAQ is just expanded markup, and the page scrolls normally.
   ============================================================================ */
(function () {
	"use strict";

	const reduceMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	/* ---------------------------------------------------------------- 1 · MENU */
	const burger = document.getElementById("burger");
	const drawer = document.getElementById("drawer");
	if (burger && drawer) {
		const setMenu = (open) => {
			document.body.classList.toggle("menu-open", open);
			burger.setAttribute("aria-expanded", String(open));
		};
		burger.addEventListener("click", () => {
			setMenu(!document.body.classList.contains("menu-open"));
		});
		// Close when a drawer link is chosen or Escape is pressed.
		drawer
			.querySelectorAll("a")
			.forEach((a) => a.addEventListener("click", () => setMenu(false)));
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") setMenu(false);
		});
	}

	/* ----------------------------------------------------------------- 2 · FAQ */
	document.querySelectorAll(".faq__item").forEach((item) => {
		const btn = item.querySelector(".faq__q");
		const panel = item.querySelector(".faq__a");
		if (!btn || !panel) return;

		btn.addEventListener("click", () => {
			const isOpen = item.classList.toggle("is-open");
			btn.setAttribute("aria-expanded", String(isOpen));
			panel.style.maxHeight = isOpen ? panel.scrollHeight + "px" : "0px";
		});

		// Keep height correct on resize when open.
		window.addEventListener("resize", () => {
			if (item.classList.contains("is-open")) {
				panel.style.maxHeight = panel.scrollHeight + "px";
			}
		});
	});

	/* -------------------------------------------------------- 3 · TOGGLE GROUP */
	document.querySelectorAll(".demo-choices").forEach((group) => {
		const choices = group.querySelectorAll(".choice");
		choices.forEach((choice) => {
			choice.addEventListener("click", () => {
				choices.forEach((c) => c.setAttribute("aria-pressed", "false"));
				choice.setAttribute("aria-pressed", "true");
			});
		});
	});

	/* ---------------------------------------------------- 4 · SCROLL REVEAL */
	const reveals = document.querySelectorAll("[data-reveal]");
	if (reduceMotion || !("IntersectionObserver" in window)) {
		reveals.forEach((el) => el.classList.add("is-in"));
	} else {
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-in");
						io.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
		);
		reveals.forEach((el) => io.observe(el));
	}

	/* ------------------------------------------------- 5 · STAT COUNT-UP */
	const counters = document.querySelectorAll("[data-count]");
	const runCount = (el) => {
		const target = parseFloat(el.getAttribute("data-count")) || 0;
		const suffix = el.getAttribute("data-suffix") || "";
		if (reduceMotion) {
			el.textContent = target + suffix;
			return;
		}
		const duration = 1100;
		const start = performance.now();
		const tick = (now) => {
			const p = Math.min((now - start) / duration, 1);
			// easeOutCubic for a snappy settle
			const eased = 1 - Math.pow(1 - p, 3);
			el.textContent = Math.round(target * eased) + suffix;
			if (p < 1) requestAnimationFrame(tick);
			else el.textContent = target + suffix;
		};
		requestAnimationFrame(tick);
	};
	if (counters.length) {
		if (!("IntersectionObserver" in window)) {
			counters.forEach(runCount);
		} else {
			const co = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							runCount(entry.target);
							co.unobserve(entry.target);
						}
					});
				},
				{ threshold: 0.6 },
			);
			counters.forEach((el) => co.observe(el));
		}
	}

	/* ------------------------------------------------------- 6 · CTA FORM */
	const form = document.getElementById("cta-form");
	const note = document.getElementById("cta-note");
	if (form && note) {
		const input = form.querySelector("input");
		const defaultNote = note.textContent;
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			const value = (input && input.value.trim()) || "";
			const valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
			if (!valid) {
				note.textContent = "Enter a valid email address.";
				note.removeAttribute("data-state");
				if (input) input.focus();
				return;
			}
			note.textContent = "Request received — kit en route.";
			note.setAttribute("data-state", "ok");
			form.reset();
			window.setTimeout(() => {
				note.textContent = defaultNote;
				note.removeAttribute("data-state");
			}, 4000);
		});
	}

	/* --------------------------------------- 7 · ACTIVE NAV ON SCROLL (subtle) */
	// Mark the brand year etc. — purely decorative; no-op kept minimal.
})();
