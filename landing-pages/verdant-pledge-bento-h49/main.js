// Verdant Pledge — interactions
(() => {
	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	// Mobile menu
	var burger = document.getElementById("burger");
	var menu = document.getElementById("mobileMenu");
	if (burger && menu) {
		burger.addEventListener("click", () => {
			burger.classList.toggle("open");
			menu.classList.toggle("open");
		});
		menu.querySelectorAll("a").forEach((a) => {
			a.addEventListener("click", () => {
				burger.classList.remove("open");
				menu.classList.remove("open");
			});
		});
	}

	// Scroll reveal
	var reveals = document.querySelectorAll(".reveal");
	if (reduce) {
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
			{ threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
		);
		reveals.forEach((el) => {
			io.observe(el);
		});
	}

	// Count-up stats
	var nums = document.querySelectorAll(".num[data-target]");
	function animateNum(el) {
		var target = parseFloat(el.getAttribute("data-target"));
		var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
		var prefix = el.getAttribute("data-prefix") || "";
		var suffix = el.getAttribute("data-suffix") || "";
		if (reduce) {
			el.textContent = prefix + target.toFixed(decimals) + suffix;
			return;
		}
		var start = null,
			dur = 1600;
		function step(ts) {
			if (!start) start = ts;
			var p = Math.min((ts - start) / dur, 1);
			var eased = 1 - (1 - p) ** 3;
			var val = (target * eased).toFixed(decimals);
			el.textContent = prefix + val + suffix;
			if (p < 1) requestAnimationFrame(step);
			else el.textContent = prefix + target.toFixed(decimals) + suffix;
		}
		requestAnimationFrame(step);
	}
	if (nums.length) {
		var sObs = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						animateNum(e.target);
						sObs.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.5 },
		);
		nums.forEach((n) => {
			sObs.observe(n);
		});
	}
})();
