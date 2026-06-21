(() => {
	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	/* ---- mobile menu ---- */
	var burger = document.getElementById("hamburger");
	var sheet = document.getElementById("mobileSheet");
	if (burger && sheet) {
		burger.addEventListener("click", () => {
			var open = sheet.classList.toggle("open");
			burger.classList.toggle("open", open);
			burger.setAttribute("aria-expanded", open);
		});
		sheet.querySelectorAll("a").forEach((a) => {
			a.addEventListener("click", () => {
				sheet.classList.remove("open");
				burger.classList.remove("open");
				burger.setAttribute("aria-expanded", "false");
			});
		});
	}

	/* ---- reveal on scroll ---- */
	var revealEls = document.querySelectorAll(".reveal, .reveal-s");
	if (reduce) {
		revealEls.forEach((el) => {
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
		revealEls.forEach((el) => {
			io.observe(el);
		});
	}

	/* ---- count up ---- */
	function animateCount(el) {
		var target = parseFloat(el.getAttribute("data-target"));
		var dec = parseInt(el.getAttribute("data-dec") || "0", 10);
		var suffix = el.getAttribute("data-suffix") || "";
		if (reduce) {
			el.textContent = target.toFixed(dec) + suffix;
			return;
		}
		var dur = 1500,
			start = null;
		function fmt(v) {
			var s = dec ? v.toFixed(dec) : Math.round(v).toLocaleString("en-US");
			return s + suffix;
		}
		function step(ts) {
			if (!start) start = ts;
			var p = Math.min((ts - start) / dur, 1);
			var eased = 1 - (1 - p) ** 3;
			el.textContent = fmt(target * eased);
			if (p < 1) requestAnimationFrame(step);
			else el.textContent = fmt(target);
		}
		requestAnimationFrame(step);
	}

	var counters = document.querySelectorAll(".counter");
	var cio = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					animateCount(e.target);
					cio.unobserve(e.target);
				}
			});
		},
		{ threshold: 0.4 },
	);
	counters.forEach((c) => {
		cio.observe(c);
	});

	/* ---- console + chart draw on enter ---- */
	var console_ = document.querySelector(".console");
	var chartLine = document.getElementById("chartLine");
	if (chartLine) {
		var len = chartLine.getTotalLength();
		chartLine.style.strokeDasharray = len;
		chartLine.style.strokeDashoffset = reduce ? 0 : len;
	}
	if (console_) {
		var conIo = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						console_.classList.add("in");
						if (chartLine && !reduce) {
							chartLine.style.transition =
								"stroke-dashoffset 1.8s cubic-bezier(.2,.7,.2,1) .3s";
							requestAnimationFrame(() => {
								chartLine.style.strokeDashoffset = 0;
							});
						}
						conIo.unobserve(console_);
					}
				});
			},
			{ threshold: 0.25 },
		);
		conIo.observe(console_);
	}

	/* ---- header border on scroll ---- */
	var header = document.querySelector(".site-header");
	function onScroll() {
		header.style.borderBottomColor =
			window.scrollY > 8 ? "rgba(0,0,0,.07)" : "transparent";
	}
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();
})();
