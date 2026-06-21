(() => {
	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	// ---- nav scroll state ----
	var nav = document.getElementById("nav");
	function onScroll() {
		if (window.scrollY > 50) nav.classList.add("solid");
		else nav.classList.remove("solid");
	}
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();

	// ---- mobile overlay ----
	var btn = document.getElementById("menuBtn");
	var overlay = document.getElementById("overlay");
	function setMenu(open) {
		overlay.classList.toggle("open", open);
		overlay.setAttribute("aria-hidden", open ? "false" : "true");
		btn.setAttribute("aria-expanded", open ? "true" : "false");
		btn.textContent = open ? "Close" : "Menu";
		document.body.style.overflow = open ? "hidden" : "";
	}
	btn.addEventListener("click", () => {
		setMenu(!overlay.classList.contains("open"));
	});
	overlay.querySelectorAll(".overlay__link").forEach((a) => {
		a.addEventListener("click", () => {
			setMenu(false);
		});
	});

	// ---- reveal on scroll ----
	var revs = document.querySelectorAll(".reveal");
	if (reduce || !("IntersectionObserver" in window)) {
		revs.forEach((r) => {
			r.classList.add("in");
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
			{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
		);
		revs.forEach((r) => {
			io.observe(r);
		});
	}

	// ---- stat counters ----
	var nums = document.querySelectorAll(".stat__num");
	function animateNum(el) {
		var target = parseInt(el.getAttribute("data-to"), 10) || 0;
		if (reduce) {
			el.textContent = target;
			return;
		}
		var start = performance.now(),
			dur = 1400;
		function tick(now) {
			var p = Math.min((now - start) / dur, 1);
			var eased = 1 - (1 - p) ** 3;
			el.textContent = Math.round(target * eased);
			if (p < 1) requestAnimationFrame(tick);
			else el.textContent = target;
		}
		requestAnimationFrame(tick);
	}
	if (!("IntersectionObserver" in window)) {
		nums.forEach(animateNum);
	} else {
		var sio = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						animateNum(e.target);
						sio.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.5 },
		);
		nums.forEach((n) => {
			sio.observe(n);
		});
	}
})();
