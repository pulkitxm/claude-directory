(() => {
	var reduceMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	// ---- Scroll reveal ----
	var reveals = document.querySelectorAll(".reveal");
	if (reduceMotion || !("IntersectionObserver" in window)) {
		reveals.forEach((el) => {
			el.classList.add("in");
		});
	} else {
		var io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("in");
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.12 },
		);
		reveals.forEach((el) => {
			io.observe(el);
		});
	}

	// ---- Stat count-up ----
	var counters = document.querySelectorAll(".num[data-count]");
	function animateCount(el) {
		var target = parseFloat(el.getAttribute("data-count"));
		var suffix = el.getAttribute("data-suffix") || "";
		if (reduceMotion) {
			el.textContent = target + suffix;
			return;
		}
		var start = null;
		var dur = 1100;
		function step(ts) {
			if (start === null) start = ts;
			var p = Math.min((ts - start) / dur, 1);
			var eased = 1 - (1 - p) ** 3;
			el.textContent = Math.round(eased * target) + suffix;
			if (p < 1) requestAnimationFrame(step);
		}
		requestAnimationFrame(step);
	}
	if ("IntersectionObserver" in window) {
		var cio = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						animateCount(e.target);
						cio.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.6 },
		);
		counters.forEach((el) => {
			cio.observe(el);
		});
	} else {
		counters.forEach(animateCount);
	}

	// ---- Smooth anchor scroll with header offset ----
	document.querySelectorAll('a[href^="#"]').forEach((a) => {
		a.addEventListener("click", function (e) {
			var id = this.getAttribute("href");
			if (id === "#" || id.length < 2) return;
			var target = document.querySelector(id);
			if (!target) return;
			e.preventDefault();
			var top = target.getBoundingClientRect().top + window.pageYOffset - 90;
			window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
		});
	});

	// ---- Parallax drift on hero wedge ----
	var wedge = document.querySelector(".hero-wedge");
	if (wedge && !reduceMotion) {
		var ticking = false;
		window.addEventListener(
			"scroll",
			() => {
				if (ticking) return;
				ticking = true;
				requestAnimationFrame(() => {
					var y = window.pageYOffset * 0.08;
					wedge.style.transform = `rotate(15deg) translateY(${y}px)`;
					ticking = false;
				});
			},
			{ passive: true },
		);
	}
})();
