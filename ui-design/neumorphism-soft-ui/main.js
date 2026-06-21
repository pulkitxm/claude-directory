/* =============================================================================
   SOFTFORM — interactions
   Vanilla JS, no dependencies. Progressive enhancement: the page is fully
   readable without it; this layer adds the tactile behaviour.
   ============================================================================= */
(() => {
	"use strict";
	const $ = (sel, root = document) => root.querySelector(sel);
	const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
	const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
	const prefersReduced = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	/* -------------------------------------------------- Soft dark-mode toggle */
	const root = document.documentElement;
	const themeToggle = $("#theme-toggle");
	const THEME_KEY = "softform-theme";

	function applyTheme(mode) {
		if (mode === "dark") root.setAttribute("data-theme", "dark");
		else root.removeAttribute("data-theme");
		if (themeToggle)
			themeToggle.setAttribute("aria-pressed", String(mode === "dark"));
		const meta = $('meta[name="theme-color"]');
		if (meta)
			meta.setAttribute("content", mode === "dark" ? "#2c303a" : "#E0E5EC");
	}

	let stored = null;
	try {
		stored = localStorage.getItem(THEME_KEY);
	} catch (_) {}
	applyTheme(stored === "dark" ? "dark" : "light");

	if (themeToggle) {
		themeToggle.addEventListener("click", () => {
			const next =
				root.getAttribute("data-theme") === "dark" ? "light" : "dark";
			applyTheme(next);
			try {
				localStorage.setItem(THEME_KEY, next);
			} catch (_) {}
		});
	}

	/* ----------------------------------------------------- Mobile slide menu */
	const burger = $("#burger");
	const mobileMenu = $("#mobile-menu");
	function setMenu(open) {
		if (!burger || !mobileMenu) return;
		burger.setAttribute("aria-expanded", String(open));
		burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
		if (open) {
			mobileMenu.hidden = false;
		} else {
			mobileMenu.hidden = true;
		}
	}
	if (burger && mobileMenu) {
		burger.addEventListener("click", () =>
			setMenu(burger.getAttribute("aria-expanded") !== "true"),
		);
		// Close on link tap or Escape
		$$("a", mobileMenu).forEach((a) =>
			a.addEventListener("click", () => setMenu(false)),
		);
		document.addEventListener("keydown", (e) => {
			if (
				e.key === "Escape" &&
				burger.getAttribute("aria-expanded") === "true"
			) {
				setMenu(false);
				burger.focus();
			}
		});
		// Auto-close if the viewport grows into desktop layout
		window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
			if (e.matches) setMenu(false);
		});
	}

	/* ------------------------------------------------- Sticky-header shadow */
	const header = $(".site-header");
	if (header) {
		const onScroll = () =>
			header.classList.toggle("is-stuck", window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
	}

	/* ---------------------------------------------------- Seamless marquee */
	const track = $("#marquee-track");
	if (track) {
		// Duplicate the content once so a -50% translate loops seamlessly.
		track.innerHTML += track.innerHTML;
	}

	/* ------------------------------------------------------- Scroll reveals */
	const revealEls = $$(
		".section-head, .depth-card, .feature-card, .panel, .swatch-card, .ladder-card, .cta-card",
	);
	revealEls.forEach((el) => el.classList.add("reveal"));

	if (prefersReduced || !("IntersectionObserver" in window)) {
		revealEls.forEach((el) => el.classList.add("is-in"));
	} else {
		const io = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-in");
						obs.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
		);
		revealEls.forEach((el) => io.observe(el));
	}

	/* --------------------------------------------------- Hero stat count-ups */
	const stats = $$(".stat-num");
	function runCount(el) {
		const target = parseFloat(el.dataset.count || "0");
		const suffix = el.dataset.suffix || "";
		// A suffix that starts with a decimal (e.g. ".5:1") would read oddly mid-count
		// ("3.5:1"), so only attach it once the count lands on its final integer.
		const suffixDuringCount = suffix.startsWith(".") ? "" : suffix;
		if (prefersReduced) {
			el.textContent = target + suffix;
			return;
		}
		const dur = 1100;
		const start = performance.now();
		const tick = (now) => {
			const p = clamp((now - start) / dur, 0, 1);
			const eased = 1 - Math.pow(1 - p, 3);
			if (p < 1) {
				el.textContent = Math.round(target * eased) + suffixDuringCount;
				requestAnimationFrame(tick);
			} else {
				el.textContent = target + suffix;
			}
		};
		requestAnimationFrame(tick);
	}
	if (stats.length) {
		if (prefersReduced || !("IntersectionObserver" in window)) {
			stats.forEach(runCount);
		} else {
			const so = new IntersectionObserver(
				(entries, obs) =>
					entries.forEach((e) => {
						if (e.isIntersecting) {
							runCount(e.target);
							obs.unobserve(e.target);
						}
					}),
				{ threshold: 0.6 },
			);
			stats.forEach((el) => so.observe(el));
		}
	}

	/* ------------------------------------------------------------- Switch */
	const sw = $("#demo-switch");
	if (sw) {
		sw.addEventListener("click", () => {
			sw.setAttribute(
				"aria-checked",
				String(sw.getAttribute("aria-checked") !== "true"),
			);
		});
	}

	/* -------------------------------------------------- Segmented control */
	$$(".segmented").forEach((group) => {
		const segs = $$(".seg", group);
		segs.forEach((seg) => {
			seg.addEventListener("click", () => {
				segs.forEach((s) => s.setAttribute("aria-pressed", "false"));
				seg.setAttribute("aria-pressed", "true");
			});
		});
	});

	/* -------------------------------------------------------------- Slider */
	const slider = $("#slider");
	const fill = $("#slider-fill");
	const thumb = $("#slider-thumb");
	const out = $("#slider-out");
	if (slider && fill && thumb && out) {
		let value = 60;
		const setValue = (v) => {
			value = clamp(Math.round(v), 0, 100);
			fill.style.width = value + "%";
			thumb.style.left = value + "%";
			out.textContent = value;
			thumb.setAttribute("aria-valuenow", String(value));
		};
		const fromClientX = (clientX) => {
			const r = slider.getBoundingClientRect();
			if (r.width === 0) return value; // hidden/zero-width: keep current value
			return ((clientX - r.left) / r.width) * 100;
		};

		let dragging = false;
		const onMove = (e) => {
			if (!dragging) return;
			const x = e.touches ? e.touches[0].clientX : e.clientX;
			setValue(fromClientX(x));
			e.preventDefault();
		};
		const stop = () => {
			dragging = false;
		};

		const startDrag = (e) => {
			dragging = true;
			const x = e.touches ? e.touches[0].clientX : e.clientX;
			setValue(fromClientX(x));
			thumb.focus();
		};
		slider.addEventListener("mousedown", startDrag);
		slider.addEventListener("touchstart", startDrag, { passive: true });
		window.addEventListener("mousemove", onMove, { passive: false });
		window.addEventListener("touchmove", onMove, { passive: false });
		window.addEventListener("mouseup", stop);
		window.addEventListener("touchend", stop);

		// Keyboard support on the thumb
		thumb.addEventListener("keydown", (e) => {
			const step = e.shiftKey ? 10 : 5;
			if (e.key === "ArrowRight" || e.key === "ArrowUp") {
				setValue(value + step);
				e.preventDefault();
			} else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
				setValue(value - step);
				e.preventDefault();
			} else if (e.key === "Home") {
				setValue(0);
				e.preventDefault();
			} else if (e.key === "End") {
				setValue(100);
				e.preventDefault();
			}
		});

		setValue(60);
	}

	/* --------------------------------------------------- Signup validation */
	const form = $("#signup-form");
	const email = $("#signup-email");
	const note = $("#signup-note");
	if (form && email && note) {
		const valid = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			const v = email.value;
			if (!v.trim()) {
				note.textContent = "Enter an email so we know where to send updates.";
				note.dataset.state = "error";
			} else if (!valid(v)) {
				note.textContent = "That doesn't look like a valid email address.";
				note.dataset.state = "error";
			} else {
				note.textContent = "You're in. Watch for shadow updates.";
				note.dataset.state = "ok";
				email.value = "";
			}
		});
		email.addEventListener("input", () => {
			if (note.dataset.state === "error") {
				note.textContent = "No spam — just shadow updates.";
				note.dataset.state = "idle";
			}
		});
	}
})();
