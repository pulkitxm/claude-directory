(() => {
	// ---- Mobile menu ----
	var burger = document.getElementById("hamburger");
	var sheet = document.getElementById("mobileSheet");
	if (burger && sheet) {
		burger.addEventListener("click", (e) => {
			e.stopPropagation();
			var open = sheet.classList.toggle("open");
			burger.setAttribute("aria-expanded", open ? "true" : "false");
		});
		sheet.querySelectorAll("a").forEach((a) => {
			a.addEventListener("click", () => {
				sheet.classList.remove("open");
				burger.setAttribute("aria-expanded", "false");
			});
		});
		document.addEventListener("click", (e) => {
			if (!sheet.contains(e.target) && !burger.contains(e.target)) {
				sheet.classList.remove("open");
				burger.setAttribute("aria-expanded", "false");
			}
		});
	}

	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	// ---- Scroll reveals (staggered within a section) ----
	var revealObserver = new IntersectionObserver(
		(entries, obs) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("in");
					obs.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.12 },
	);

	var seenParents = new Map();
	document.querySelectorAll(".reveal").forEach((el) => {
		if (!reduce) {
			var parent = el.parentElement;
			var idx = seenParents.get(parent) || 0;
			el.style.transitionDelay = `${idx * 0.09}s`;
			seenParents.set(parent, idx + 1);
			revealObserver.observe(el);
		} else {
			el.classList.add("in");
		}
	});

	// ---- Animated stat counters ----
	function runCounters() {
		document.querySelectorAll(".counter").forEach((el) => {
			var target = +el.getAttribute("data-target");
			if (reduce) {
				el.textContent = target;
				return;
			}
			var duration = 1400,
				start = null;
			function step(ts) {
				if (!start) start = ts;
				var p = Math.min((ts - start) / duration, 1);
				var eased = 1 - (1 - p) ** 3;
				el.textContent = Math.round(target * eased);
				if (p < 1) requestAnimationFrame(step);
				else el.textContent = target;
			}
			requestAnimationFrame(step);
		});
	}

	var stats = document.getElementById("stats");
	if (stats) {
		var statObserver = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						runCounters();
						obs.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.3 },
		);
		statObserver.observe(stats);
	}
})();
