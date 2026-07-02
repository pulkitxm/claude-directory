// Radiant clone — vanilla shim reimplementing Headless-UI / Framer-Motion behaviours.
(function () {
	// --- Mobile nav disclosure -------------------------------------------------
	// Headless-UI Disclosure: a button toggles an expandable panel below lg.
	document
		.querySelectorAll(
			'[data-mobile-nav-button], [aria-label="Open main menu"], [aria-label="Toggle navigation"]',
		)
		.forEach(function (btn) {
			var panel = document.querySelector("[data-mobile-nav-panel]");
			if (!panel) return;
			btn.addEventListener("click", function () {
				var open = panel.hasAttribute("data-open");
				if (open) {
					panel.removeAttribute("data-open");
					panel.style.display = "none";
				} else {
					panel.setAttribute("data-open", "");
					panel.style.display = "block";
				}
			});
		});

	// --- whileInView fade-up reveals (Framer-Motion equivalent) ----------------
	var revealEls = [];
	// Tag major sections / cards as reveal targets.
	var SEL = "section, [data-reveal], .reveal-on-scroll";
	document.querySelectorAll(SEL).forEach(function (el) {
		// skip the very first hero so it shows instantly
		revealEls.push(el);
	});
	if (
		"IntersectionObserver" in window &&
		!matchMedia("(prefers-reduced-motion: reduce)").matches
	) {
		var io = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (e) {
					if (e.isIntersecting) {
						e.target.classList.add("is-visible");
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
		);
		revealEls.forEach(function (el, i) {
			// only animate elements below the fold initially
			var r = el.getBoundingClientRect();
			if (r.top < window.innerHeight * 0.9) {
				el.classList.add("is-visible");
				return;
			}
			el.classList.add("reveal-init");
			io.observe(el);
		});
	} else {
		revealEls.forEach(function (el) {
			el.classList.add("is-visible");
		});
	}

	// --- Headless-UI data-hover / data-focus on interactive elements -----------
	function wire(el) {
		el.addEventListener("pointerenter", function () {
			el.setAttribute("data-hover", "");
		});
		el.addEventListener("pointerleave", function () {
			el.removeAttribute("data-hover");
		});
		el.addEventListener("focus", function () {
			el.setAttribute("data-focus", "");
		});
		el.addEventListener("blur", function () {
			el.removeAttribute("data-focus");
		});
		el.addEventListener("pointerdown", function () {
			el.setAttribute("data-active", "");
		});
		el.addEventListener("pointerup", function () {
			el.removeAttribute("data-active");
		});
	}
	document
		.querySelectorAll(
			"a[data-headlessui-state], button[data-headlessui-state], [data-hover-target]",
		)
		.forEach(wire);
})();
