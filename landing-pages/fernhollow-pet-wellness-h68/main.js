(() => {
	var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	/* ---- scroll reveals ---- */
	var revealEls = document.querySelectorAll(".reveal");
	if (reduced) {
		revealEls.forEach((el) => {
			el.classList.add("is-visible");
		});
	} else {
		var io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("is-visible");
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
		);
		revealEls.forEach((el) => {
			io.observe(el);
		});
	}

	/* ---- stat counters ---- */
	var counters = document.querySelectorAll(".counter");
	function runCounter(el) {
		var target = parseInt(el.getAttribute("data-target"), 10) || 0;
		if (reduced) {
			el.textContent = target;
			return;
		}
		var dur = 1200,
			start = null;
		function step(ts) {
			if (start === null) start = ts;
			var p = Math.min((ts - start) / dur, 1);
			var eased = 1 - (1 - p) ** 3;
			el.textContent = Math.round(target * eased);
			if (p < 1) requestAnimationFrame(step);
			else el.textContent = target;
		}
		requestAnimationFrame(step);
	}
	var cio = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					runCounter(e.target);
					cio.unobserve(e.target);
				}
			});
		},
		{ threshold: 0.6 },
	);
	counters.forEach((el) => {
		cio.observe(el);
	});

	/* ---- mobile menu ---- */
	var burger = document.getElementById("burger");
	var menu = document.getElementById("mobileMenu");
	var close = document.getElementById("menuClose");
	function openMenu() {
		menu.classList.add("is-open");
		menu.setAttribute("aria-hidden", "false");
		burger.setAttribute("aria-expanded", "true");
		document.body.style.overflow = "hidden";
	}
	function closeMenu() {
		menu.classList.remove("is-open");
		menu.setAttribute("aria-hidden", "true");
		burger.setAttribute("aria-expanded", "false");
		document.body.style.overflow = "";
	}
	if (burger) burger.addEventListener("click", openMenu);
	if (close) close.addEventListener("click", closeMenu);
	menu?.querySelectorAll("a").forEach((a) => {
		a.addEventListener("click", closeMenu);
	});
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") closeMenu();
	});

	/* ---- nav active pill on scroll ---- */
	var pills = Array.prototype.slice.call(
		document.querySelectorAll(".nav__pills .pill"),
	);
	var sectionMap = pills
		.map((p) => {
			var id = p.getAttribute("href").replace("#", "");
			return { pill: p, el: document.getElementById(id) };
		})
		.filter((m) => m.el);
	function syncPills() {
		var y = window.scrollY + 140;
		var current = sectionMap[0];
		sectionMap.forEach((m) => {
			if (m.el.offsetTop <= y) current = m;
		});
		pills.forEach((p) => {
			p.classList.remove("is-active");
		});
		if (current) current.pill.classList.add("is-active");
	}
	window.addEventListener("scroll", syncPills, { passive: true });
	syncPills();

	/* ---- FAQ accordion (single open) ---- */
	var accs = document.querySelectorAll(".acc");
	function setHeight(acc) {
		var body = acc.querySelector(".acc__a");
		body.style.maxHeight = acc.classList.contains("is-open")
			? `${body.scrollHeight}px`
			: "0px";
	}
	accs.forEach((acc) => {
		var btn = acc.querySelector(".acc__q");
		setHeight(acc);
		btn.addEventListener("click", () => {
			var willOpen = !acc.classList.contains("is-open");
			accs.forEach((a) => {
				a.classList.remove("is-open");
				a.querySelector(".acc__q").setAttribute("aria-expanded", "false");
				setHeight(a);
			});
			if (willOpen) {
				acc.classList.add("is-open");
				btn.setAttribute("aria-expanded", "true");
				setHeight(acc);
			}
		});
	});
	window.addEventListener("resize", () => {
		accs.forEach((a) => {
			if (a.classList.contains("is-open")) setHeight(a);
		});
	});

	/* ---- newsletter ---- */
	var form = document.getElementById("newsletter");
	if (form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			var input = form.querySelector("input");
			if (!input.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
				input.focus();
				return;
			}
			var success = document.getElementById("ctaSuccess");
			input.style.display = "none";
			form.querySelector(".cta__submit").style.display = "none";
			if (success) success.hidden = false;
		});
	}
})();
