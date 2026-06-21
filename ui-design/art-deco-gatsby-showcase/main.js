/* ==========================================================================
   THE GILDED HOUR — interactions
   Vanilla JS, no dependencies. Progressive enhancement: if any of this fails,
   the page still reads correctly (reveal elements fall back to visible).
   ========================================================================== */
(function () {
	"use strict";

	var doc = document;
	var prefersReduced =
		window.matchMedia &&
		window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	/* ----------------------------------------------------------------------
     1. SCROLL REVEAL — staggered fade/slide via IntersectionObserver.
        Each element reads an optional data-reveal-delay for the stagger.
     ---------------------------------------------------------------------- */
	function initReveal() {
		var items = Array.prototype.slice.call(
			doc.querySelectorAll("[data-reveal]"),
		);
		if (!items.length) return;

		// Apply per-element stagger delay as a CSS custom property.
		items.forEach(function (el) {
			var d = el.getAttribute("data-reveal-delay");
			if (d) el.style.setProperty("--reveal-delay", d);
		});

		// Fallback: no IO support, or reduced motion -> show everything now.
		if (prefersReduced || !("IntersectionObserver" in window)) {
			items.forEach(function (el) {
				el.classList.add("is-visible");
			});
			return;
		}

		// Hero content lives at/above the fold, so it should perform its staggered
		// entrance on load rather than waiting for a scroll intersection (some of it
		// sits just below the 800px fold and would otherwise never trigger at rest).
		var hero = doc.querySelector(".hero");
		var heroItems = hero
			? Array.prototype.slice.call(hero.querySelectorAll("[data-reveal]"))
			: [];
		if (heroItems.length) {
			// next frame so the initial opacity:0 state paints first, then transitions.
			window.requestAnimationFrame(function () {
				window.requestAnimationFrame(function () {
					heroItems.forEach(function (el) {
						el.classList.add("is-visible");
					});
				});
			});
		}

		var io = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
						io.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
		);

		// Observe everything except the hero items already handled on load.
		items.forEach(function (el) {
			if (heroItems.indexOf(el) === -1) io.observe(el);
		});

		// Safety net: anything still hidden after 3.5s (e.g. tall pages where
		// the observer never fires for offscreen-then-resized content) is revealed.
		window.setTimeout(function () {
			items.forEach(function (el) {
				if (!el.classList.contains("is-visible"))
					el.classList.add("is-visible");
			});
		}, 3500);
	}

	/* ----------------------------------------------------------------------
     2. HEADER — gold underline + shadow once the page is scrolled.
     ---------------------------------------------------------------------- */
	function initHeader() {
		var header = doc.getElementById("site-header");
		if (!header) return;
		var update = function () {
			if (window.scrollY > 24) header.classList.add("is-scrolled");
			else header.classList.remove("is-scrolled");
		};
		update();
		window.addEventListener("scroll", update, { passive: true });
	}

	/* ----------------------------------------------------------------------
     3. MOBILE NAV — toggle the drawer, manage aria + hidden.
     ---------------------------------------------------------------------- */
	function initMobileNav() {
		var toggle = doc.getElementById("nav-toggle");
		var nav = doc.getElementById("mobile-nav");
		if (!toggle || !nav) return;

		var setOpen = function (open) {
			toggle.setAttribute("aria-expanded", String(open));
			toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
			if (open) {
				nav.hidden = false;
				nav.setAttribute("data-open", "true");
			} else {
				nav.removeAttribute("data-open");
				nav.hidden = true;
			}
		};

		toggle.addEventListener("click", function () {
			setOpen(toggle.getAttribute("aria-expanded") !== "true");
		});

		// Close after picking a destination.
		nav.addEventListener("click", function (e) {
			if (e.target.closest("a")) setOpen(false);
		});

		// Close on Escape.
		doc.addEventListener("keydown", function (e) {
			if (
				e.key === "Escape" &&
				toggle.getAttribute("aria-expanded") === "true"
			) {
				setOpen(false);
				toggle.focus();
			}
		});
	}

	/* ----------------------------------------------------------------------
     4. FAQ ACCORDION — accessible single-or-multi open with smooth height.
     ---------------------------------------------------------------------- */
	function initAccordion() {
		var triggers = Array.prototype.slice.call(
			doc.querySelectorAll(".acc-trigger"),
		);
		if (!triggers.length) return;

		triggers.forEach(function (trigger) {
			var panel = doc.getElementById(trigger.getAttribute("aria-controls"));
			if (!panel) return;

			trigger.addEventListener("click", function () {
				var isOpen = trigger.getAttribute("aria-expanded") === "true";

				// Close siblings for a tidy, accordion-like feel.
				triggers.forEach(function (other) {
					if (other === trigger) return;
					var otherPanel = doc.getElementById(
						other.getAttribute("aria-controls"),
					);
					other.setAttribute("aria-expanded", "false");
					if (otherPanel) otherPanel.style.maxHeight = "";
				});

				if (isOpen) {
					trigger.setAttribute("aria-expanded", "false");
					panel.style.maxHeight = "";
				} else {
					trigger.setAttribute("aria-expanded", "true");
					panel.style.maxHeight = panel.scrollHeight + "px";
				}
			});
		});

		// Keep an open panel correctly sized if the viewport reflows.
		window.addEventListener("resize", function () {
			triggers.forEach(function (trigger) {
				if (trigger.getAttribute("aria-expanded") === "true") {
					var panel = doc.getElementById(trigger.getAttribute("aria-controls"));
					if (panel) panel.style.maxHeight = panel.scrollHeight + "px";
				}
			});
		});
	}

	/* ----------------------------------------------------------------------
     5. ENQUIRE FORM — lightweight client validation + faux confirmation.
     ---------------------------------------------------------------------- */
	function initForm() {
		var form = doc.getElementById("enquire-form");
		var status = doc.getElementById("form-status");
		if (!form || !status) return;

		var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		form.addEventListener("submit", function (e) {
			e.preventDefault();
			var name = form.elements.name.value.trim();
			var email = form.elements.email.value.trim();

			if (!name) {
				status.textContent = "Kindly leave your name, so we may address you.";
				status.classList.add("is-error");
				form.elements.name.focus();
				return;
			}
			if (!emailRe.test(email)) {
				status.textContent = "A valid address is required for our reply.";
				status.classList.add("is-error");
				form.elements.email.focus();
				return;
			}

			status.classList.remove("is-error");
			var tier = form.elements.tier.value;
			status.textContent =
				"Thank you, " +
				name +
				". Your card for " +
				tier +
				" is received — the maître d’ will reply by hand.";
			form.reset();
		});
	}

	/* ----------------------------------------------------------------------
     Boot.
     ---------------------------------------------------------------------- */
	function init() {
		initReveal();
		initHeader();
		initMobileNav();
		initAccordion();
		initForm();
	}

	if (doc.readyState === "loading") {
		doc.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}
})();
