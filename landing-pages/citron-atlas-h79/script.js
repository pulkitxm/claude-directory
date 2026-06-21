(() => {
	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	/* ---- Seamless marquee: duplicate track content so the -50% loop is gapless ---- */
	if (!reduce) {
		document.querySelectorAll("[data-marquee]").forEach((m) => {
			var track = m.querySelector(".marquee-track");
			if (track) track.innerHTML += track.innerHTML;
		});
	}

	/* ---- Mobile menu ---- */
	var menu = document.getElementById("mobileMenu");
	var openBtn = document.getElementById("hamburger");
	var closeBtn = document.getElementById("mmClose");
	function setMenu(open) {
		if (!menu) return;
		menu.classList.toggle("open", open);
		menu.setAttribute("aria-hidden", open ? "false" : "true");
		document.body.style.overflow = open ? "hidden" : "";
	}
	if (openBtn)
		openBtn.addEventListener("click", () => {
			setMenu(true);
		});
	if (closeBtn)
		closeBtn.addEventListener("click", () => {
			setMenu(false);
		});
	document.querySelectorAll(".mm-link, .mm-cta").forEach((l) => {
		l.addEventListener("click", () => {
			setMenu(false);
		});
	});
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") setMenu(false);
	});

	/* ---- Scroll reveal ---- */
	var revealEls = document.querySelectorAll(".reveal");
	if (reduce || !("IntersectionObserver" in window)) {
		revealEls.forEach((el) => {
			el.classList.add("in");
		});
	} else {
		var io = new IntersectionObserver(
			(entries) => {
				entries.forEach((en) => {
					if (en.isIntersecting) {
						en.target.classList.add("in");
						io.unobserve(en.target);
					}
				});
			},
			{ threshold: 0.12 },
		);
		revealEls.forEach((el) => {
			io.observe(el);
		});
	}

	/* ---- Industry slider ---- */
	function wireSlider(trackId, prevId, nextId, step) {
		var track = document.getElementById(trackId);
		var prev = document.getElementById(prevId);
		var next = document.getElementById(nextId);
		if (!track) return;
		var amount = step || (() => track.clientWidth);
		if (prev)
			prev.addEventListener("click", () => {
				track.scrollBy({
					left: -(typeof amount === "function" ? amount() : amount),
					behavior: "smooth",
				});
			});
		if (next)
			next.addEventListener("click", () => {
				track.scrollBy({
					left: typeof amount === "function" ? amount() : amount,
					behavior: "smooth",
				});
			});
	}
	wireSlider("indTrack", "indPrev", "indNext", () => 420);
	wireSlider(
		"caseTrack",
		"casePrev",
		"caseNext",
		() => document.getElementById("caseTrack").clientWidth,
	);

	/* ---- Services accordion + pane swap ---- */
	var tabs = document.querySelectorAll(".svc-tab");
	var panes = document.querySelectorAll(".svc-pane");
	tabs.forEach((tab) => {
		tab.addEventListener("click", () => {
			var target = tab.getAttribute("data-target");
			tabs.forEach((t) => {
				t.classList.toggle("is-open", t === tab);
			});
			panes.forEach((p) => {
				p.classList.toggle("is-active", p.getAttribute("data-pane") === target);
			});
		});
	});

	/* ---- Stat count-up ---- */
	var stats = document.querySelectorAll(".stat-num");
	function countUp(el) {
		var target = parseInt(el.getAttribute("data-count"), 10) || 0;
		var suffix = el.getAttribute("data-suffix") || "";
		if (reduce) {
			el.textContent = target + suffix;
			return;
		}
		var dur = 1300,
			start = null;
		function frame(ts) {
			if (!start) start = ts;
			var p = Math.min((ts - start) / dur, 1);
			var eased = 1 - (1 - p) ** 3;
			el.textContent = Math.round(eased * target) + suffix;
			if (p < 1) requestAnimationFrame(frame);
		}
		requestAnimationFrame(frame);
	}
	if (!("IntersectionObserver" in window) || reduce) {
		stats.forEach(countUp);
	} else {
		var sio = new IntersectionObserver(
			(entries) => {
				entries.forEach((en) => {
					if (en.isIntersecting) {
						countUp(en.target);
						sio.unobserve(en.target);
					}
				});
			},
			{ threshold: 0.6 },
		);
		stats.forEach((s) => {
			sio.observe(s);
		});
	}

	/* ---- Solutions trigger aria ---- */
	var trigger = document.querySelector(".ncap-trigger");
	var dd = document.querySelector(".ncap-dd");
	if (trigger && dd) {
		dd.addEventListener("mouseenter", () => {
			trigger.setAttribute("aria-expanded", "true");
		});
		dd.addEventListener("mouseleave", () => {
			trigger.setAttribute("aria-expanded", "false");
		});
	}
})();
