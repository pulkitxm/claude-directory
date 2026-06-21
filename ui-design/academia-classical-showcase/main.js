/* =====================================================================
   THE ATHENÆUM — interactions
   Dignified, deliberate behaviour. All scroll reveals use
   IntersectionObserver (position-driven), count-ups use rAF, and
   everything respects prefers-reduced-motion.
   ===================================================================== */
(function () {
	"use strict";

	var reduceMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	/* ---------- 1. Sticky header state ---------- */
	var header = document.getElementById("site-header");
	function onScroll() {
		if (!header) return;
		header.classList.toggle("is-scrolled", window.scrollY > 24);
	}
	onScroll();
	window.addEventListener("scroll", onScroll, { passive: true });

	/* ---------- 2. Mobile drawer ---------- */
	var toggle = document.getElementById("nav-toggle");
	var drawer = document.getElementById("drawer");
	function setDrawer(open) {
		if (!toggle || !drawer) return;
		toggle.setAttribute("aria-expanded", String(open));
		toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
		drawer.classList.toggle("is-open", open);
		drawer.setAttribute("aria-hidden", String(!open));
		document.body.style.overflow = open ? "hidden" : "";
	}
	if (toggle && drawer) {
		toggle.addEventListener("click", function () {
			setDrawer(toggle.getAttribute("aria-expanded") !== "true");
		});
		drawer.addEventListener("click", function (e) {
			if (e.target.tagName === "A") setDrawer(false);
		});
		document.addEventListener("keydown", function (e) {
			if (e.key === "Escape") setDrawer(false);
		});
	}

	/* ---------- 3. FAQ accordion (accessible) ---------- */
	var faqButtons = document.querySelectorAll(".faq__q");
	faqButtons.forEach(function (btn) {
		var panel = document.getElementById(btn.getAttribute("aria-controls"));
		btn.addEventListener("click", function () {
			var open = btn.getAttribute("aria-expanded") === "true";
			// Close siblings for a tidy single-open accordion.
			faqButtons.forEach(function (other) {
				if (other === btn) return;
				var op = document.getElementById(other.getAttribute("aria-controls"));
				other.setAttribute("aria-expanded", "false");
				if (op) op.style.maxHeight = null;
			});
			btn.setAttribute("aria-expanded", String(!open));
			if (panel)
				panel.style.maxHeight = open ? null : panel.scrollHeight + "px";
		});
	});

	/* ---------- 4. Scroll reveal via IntersectionObserver ---------- */
	var revealEls = Array.prototype.slice.call(
		document.querySelectorAll("[data-reveal]"),
	);
	if (reduceMotion || !("IntersectionObserver" in window)) {
		revealEls.forEach(function (el) {
			el.classList.add("is-in");
		});
	} else {
		var io = new IntersectionObserver(
			function (entries, obs) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-in");
						obs.unobserve(entry.target);
						maybeCount(entry.target);
					}
				});
			},
			{ threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
		);
		revealEls.forEach(function (el) {
			io.observe(el);
		});
	}

	/* ---------- 5. Stat count-ups (rAF; recorder-friendly) ---------- */
	function animateCount(el) {
		var target = parseFloat(el.getAttribute("data-count")) || 0;
		var suffix = el.getAttribute("data-suffix") || "";
		if (reduceMotion) {
			el.textContent = format(target) + suffix;
			return;
		}
		var dur = 1400;
		var start = null;
		function frame(ts) {
			if (start === null) start = ts;
			var p = Math.min((ts - start) / dur, 1);
			// ease-out cubic
			var eased = 1 - Math.pow(1 - p, 3);
			el.textContent = format(Math.round(target * eased)) + suffix;
			if (p < 1) requestAnimationFrame(frame);
			else el.textContent = format(target) + suffix;
		}
		requestAnimationFrame(frame);
	}
	function format(n) {
		return n.toLocaleString("en-US");
	}
	function maybeCount(container) {
		var nums =
			container.matches && container.matches("[data-count]")
				? [container]
				: container.querySelectorAll
					? container.querySelectorAll("[data-count]")
					: [];
		Array.prototype.forEach.call(nums, function (el) {
			if (el.getAttribute("data-counted")) return;
			el.setAttribute("data-counted", "1");
			animateCount(el);
		});
	}
	// Fallback: if reveal disabled, count immediately.
	if (reduceMotion) {
		document.querySelectorAll("[data-count]").forEach(function (el) {
			maybeCount(el);
		});
	}

	/* ---------- 6. Marquee: duplicate track for seamless loop ---------- */
	var track = document.getElementById("marquee-track");
	if (track) {
		track.innerHTML += track.innerHTML; // duplicate so -50% translate loops cleanly
	}

	/* ---------- 7. Enquiry form (client-side validation) ---------- */
	var form = document.getElementById("enquiry-form");
	var note = document.getElementById("form-note");
	function setInvalid(input, bad) {
		if (input) input.setAttribute("aria-invalid", String(bad));
	}
	if (form) {
		form.addEventListener("submit", function (e) {
			e.preventDefault();
			var name = form.elements["name"];
			var email = form.elements["email"];
			setInvalid(name, false);
			setInvalid(email, false);
			note.className = "form-note";

			var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
				(email.value || "").trim(),
			);
			if (!name.value.trim()) {
				note.textContent = "Pray, leave your name for the ledger.";
				note.className = "form-note is-error";
				setInvalid(name, true);
				name.focus();
				return;
			}
			if (!emailOk) {
				note.textContent =
					"A line of correspondence is required to write back.";
				note.className = "form-note is-error";
				setInvalid(email, true);
				email.focus();
				return;
			}
			var who = name.value.trim().split(/\s+/)[0];
			note.textContent =
				"Thank you, " +
				who +
				". Your name is entered — the Keeper will write with a date for your reading afternoon.";
			note.className = "form-note is-ok";
			form.reset();
		});
	}

	/* ---------- 8. Smooth-scroll for in-page anchors ---------- */
	document.querySelectorAll('a[href^="#"]').forEach(function (a) {
		a.addEventListener("click", function (e) {
			var id = a.getAttribute("href");
			if (id.length < 2) return;
			var el = document.querySelector(id);
			if (!el) return;
			e.preventDefault();
			el.scrollIntoView({
				behavior: reduceMotion ? "auto" : "smooth",
				block: "start",
			});
		});
	});
})();
