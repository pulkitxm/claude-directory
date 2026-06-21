// Verdigris Trail — scroll reveals + animated stat counters
(() => {
	var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	// ---- Scroll reveal ----
	var revealEls = Array.prototype.slice.call(
		document.querySelectorAll("[data-reveal]"),
	);

	if (reduced || !("IntersectionObserver" in window)) {
		revealEls.forEach((el) => {
			el.classList.add("is-visible");
		});
	} else {
		var io = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
						io.unobserve(entry.target);
						maybeCount(entry.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
		);

		revealEls.forEach((el) => {
			io.observe(el);
		});
	}

	// ---- Animated number counters ----
	function maybeCount(scope) {
		var nums = scope.matches?.(".stat")
			? [scope.querySelector("[data-count]")].filter(Boolean)
			: scope.querySelectorAll
				? Array.prototype.slice.call(scope.querySelectorAll("[data-count]"))
				: [];
		nums.forEach(animateCount);
	}

	function animateCount(el) {
		if (!el || el.dataset.counted) return;
		el.dataset.counted = "1";
		var target = parseInt(el.getAttribute("data-count"), 10) || 0;
		if (reduced) {
			el.textContent = target;
			return;
		}
		var start = performance.now();
		var dur = 1400;
		function step(now) {
			var t = Math.min((now - start) / dur, 1);
			var eased = 1 - (1 - t) ** 3;
			el.textContent = Math.round(target * eased);
			if (t < 1) requestAnimationFrame(step);
		}
		requestAnimationFrame(step);
	}

	// If reduced motion (no IO path), still fill counters
	if (reduced) {
		Array.prototype.slice
			.call(document.querySelectorAll("[data-count]"))
			.forEach(animateCount);
	}

	// ---- Header subtle elevation on scroll ----
	var header = document.querySelector(".site-header");
	var lastShadow = false;
	window.addEventListener(
		"scroll",
		() => {
			var on = window.scrollY > 24;
			if (on !== lastShadow) {
				header.style.background = on ? "rgba(236,243,229,0.86)" : "transparent";
				header.style.backdropFilter = on ? "saturate(120%) blur(6px)" : "none";
				header.style.borderBottom = on
					? "1px solid rgba(7,14,1,0.08)"
					: "1px solid transparent";
				lastShadow = on;
			}
		},
		{ passive: true },
	);
})();
