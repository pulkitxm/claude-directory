/* =============================================================================
   DOPAMINE — interaction layer
   Scroll-reveal · count-up · FAQ accordion · mobile drawer · newsletter form ·
   seamless marquee. All motion respects prefers-reduced-motion.
   ============================================================================= */
(function () {
	"use strict";

	const prefersReduced = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	/* ------------------------------------------ seamless marquees ---------- */
	// Duplicate the track content so the -50% keyframe loops with no gap.
	document.querySelectorAll("[data-marquee]").forEach((track) => {
		const item = track.firstElementChild;
		if (!item) return;
		const clone = item.cloneNode(true);
		clone.setAttribute("aria-hidden", "true");
		track.appendChild(clone);
	});

	/* ------------------------------------------ scroll reveal -------------- */
	const reveals = Array.from(document.querySelectorAll(".reveal"));
	if (prefersReduced || !("IntersectionObserver" in window)) {
		reveals.forEach((el) => el.classList.add("in"));
	} else {
		const io = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					// stagger siblings a touch for a livelier cascade
					const el = entry.target;
					const sibs = Array.from(el.parentElement.children).filter((c) =>
						c.classList.contains("reveal"),
					);
					const idx = Math.max(0, sibs.indexOf(el));
					el.style.transitionDelay = Math.min(idx, 6) * 70 + "ms";
					el.classList.add("in");
					obs.unobserve(el);
				});
			},
			{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
		);
		reveals.forEach((el) => io.observe(el));
	}

	/* ------------------------------------------ count-up stats ------------- */
	const counters = Array.from(document.querySelectorAll("[data-count]"));
	const runCount = (el) => {
		const target = parseFloat(el.getAttribute("data-count")) || 0;
		const suffix = el.getAttribute("data-suffix") || "";
		if (prefersReduced) {
			el.textContent = target + suffix;
			return;
		}
		const dur = 1400;
		const start = performance.now();
		const ease = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic
		const tick = (now) => {
			const p = Math.min(1, (now - start) / dur);
			el.textContent = Math.round(target * ease(p)) + suffix;
			if (p < 1) requestAnimationFrame(tick);
			else el.textContent = target + suffix;
		};
		requestAnimationFrame(tick);
	};
	if (counters.length) {
		if (!("IntersectionObserver" in window)) {
			counters.forEach(runCount);
		} else {
			const cio = new IntersectionObserver(
				(entries, obs) => {
					entries.forEach((e) => {
						if (!e.isIntersecting) return;
						runCount(e.target);
						obs.unobserve(e.target);
					});
				},
				{ threshold: 0.5 },
			);
			counters.forEach((c) => cio.observe(c));
		}
	}

	/* ------------------------------------------ FAQ accordion -------------- */
	const faqButtons = Array.from(document.querySelectorAll(".faq-q"));
	const setFaq = (btn, open) => {
		btn.setAttribute("aria-expanded", String(open));
		const item = btn.closest(".faq-item");
		if (item) item.setAttribute("data-open", String(open));
	};
	faqButtons.forEach((btn) => {
		btn.addEventListener("click", () => {
			const open = btn.getAttribute("aria-expanded") === "true";
			// single-open accordion: collapse the others
			faqButtons.forEach((b) => {
				if (b !== btn) setFaq(b, false);
			});
			setFaq(btn, !open);
		});
	});
	// roving keyboard nav (up/down/home/end) across questions
	faqButtons.forEach((btn, i) => {
		btn.addEventListener("keydown", (e) => {
			let next = null;
			if (e.key === "ArrowDown") next = faqButtons[(i + 1) % faqButtons.length];
			else if (e.key === "ArrowUp")
				next = faqButtons[(i - 1 + faqButtons.length) % faqButtons.length];
			else if (e.key === "Home") next = faqButtons[0];
			else if (e.key === "End") next = faqButtons[faqButtons.length - 1];
			if (next) {
				e.preventDefault();
				next.focus();
			}
		});
	});

	/* ------------------------------------------ mobile drawer -------------- */
	const toggle = document.getElementById("navToggle");
	const drawer = document.getElementById("drawer");
	const drawerClose = document.getElementById("drawerClose");
	const openDrawer = () => {
		drawer.setAttribute("data-open", "true");
		toggle.setAttribute("aria-expanded", "true");
		document.body.style.overflow = "hidden";
		const first = drawer.querySelector("a");
		if (first) first.focus();
	};
	const closeDrawer = () => {
		drawer.setAttribute("data-open", "false");
		toggle.setAttribute("aria-expanded", "false");
		document.body.style.overflow = "";
		toggle.focus();
	};
	if (toggle && drawer) {
		toggle.addEventListener("click", openDrawer);
		if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
		drawer.querySelectorAll("a").forEach((a) =>
			a.addEventListener("click", () => {
				drawer.setAttribute("data-open", "false");
				toggle.setAttribute("aria-expanded", "false");
				document.body.style.overflow = "";
			}),
		);
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape" && drawer.getAttribute("data-open") === "true")
				closeDrawer();
		});
	}

	/* ------------------------------------------ newsletter form ----------- */
	const form = document.getElementById("ctaForm");
	const msg = document.getElementById("ctaMsg");
	if (form && msg) {
		const input = form.querySelector("#cta-email");
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			const value = (input.value || "").trim();
			const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
			if (!valid) {
				msg.style.color = "var(--quaternary)";
				msg.textContent = "Hmm, that email looks quiet. Try again! ⚡";
				input.focus();
				return;
			}
			msg.style.color = "var(--secondary)";
			msg.textContent = "You're on the list! Brace for dopamine. 🎉";
			form.reset();
		});
		input.addEventListener("input", () => {
			if (msg.textContent) msg.textContent = "";
		});
	}

	/* ------------------------------------------ nav active-link state ------ */
	const navLinks = Array.from(document.querySelectorAll(".nav-link"));
	const sections = navLinks
		.map((l) => document.querySelector(l.getAttribute("href")))
		.filter(Boolean);
	if (sections.length && "IntersectionObserver" in window) {
		const setActive = (id) => {
			navLinks.forEach((l) => {
				const on = l.getAttribute("href") === "#" + id;
				l.style.color = on ? "var(--bg)" : "";
				l.style.background = on ? "var(--nav-link-c, var(--secondary))" : "";
				l.style.borderColor = on ? "var(--fg)" : "";
			});
		};
		const sio = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) setActive(e.target.id);
				});
			},
			{ rootMargin: "-45% 0px -50% 0px", threshold: 0 },
		);
		sections.forEach((s) => sio.observe(s));
	}
})();
