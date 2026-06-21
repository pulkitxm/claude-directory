(() => {
	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	/* ---- Scroll reveal ---- */
	var revealEls = document.querySelectorAll(".reveal");
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
			{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
		);
		revealEls.forEach((el) => {
			io.observe(el);
		});
	}

	/* ---- Hero load-in (reveals fire immediately at top) ---- */
	window.addEventListener("load", () => {
		document
			.querySelectorAll(".hero .reveal, .hero-panel.reveal")
			.forEach((el) => {
				el.classList.add("in");
			});
	});

	/* ---- Marquee: duplicate track for seamless loop ---- */
	var track = document.getElementById("track");
	if (track) {
		track.innerHTML += track.innerHTML;
	}

	/* ---- Hero parallax (mouse + scroll) ---- */
	var panel = document.getElementById("heroPanel");
	if (panel && !reduce) {
		var cards = panel.querySelectorAll(".card");
		var mx = 0,
			my = 0,
			sy = 0,
			raf = null;
		function apply() {
			cards.forEach((c) => {
				var d = parseFloat(c.getAttribute("data-depth")) || 12;
				var f = d / 40;
				c.style.transform =
					"translate3d(" +
					(mx * f).toFixed(2) +
					"px," +
					(my * f + sy * f * 0.4).toFixed(2) +
					"px,0)";
			});
			raf = null;
		}
		function schedule() {
			if (!raf) raf = requestAnimationFrame(apply);
		}
		panel.addEventListener("mousemove", (ev) => {
			var r = panel.getBoundingClientRect();
			mx = ((ev.clientX - r.left) / r.width - 0.5) * 24;
			my = ((ev.clientY - r.top) / r.height - 0.5) * 24;
			schedule();
		});
		panel.addEventListener("mouseleave", () => {
			mx = 0;
			my = 0;
			schedule();
		});
		window.addEventListener(
			"scroll",
			() => {
				var r = panel.getBoundingClientRect();
				sy = (r.top + r.height / 2 - window.innerHeight / 2) / -20;
				schedule();
			},
			{ passive: true },
		);

		/* hover lift via inline style flag */
		cards.forEach((c) => {
			c.addEventListener("mouseenter", () => {
				c.style.zIndex = 5;
			});
		});
	}

	/* ---- Count-up stats ---- */
	var stats = document.querySelectorAll(".n[data-count]");
	function animateCount(el) {
		var target = parseInt(el.getAttribute("data-count"), 10);
		var unit = el.querySelector(".u");
		var prefix = unit ? unit.outerHTML : "";
		if (reduce) {
			el.innerHTML = prefix + target.toLocaleString();
			return;
		}
		var start = performance.now(),
			dur = 1500;
		function step(now) {
			var p = Math.min((now - start) / dur, 1);
			var eased = 1 - (1 - p) ** 3;
			var v = Math.round(eased * target);
			el.innerHTML = prefix + v.toLocaleString();
			if (p < 1) requestAnimationFrame(step);
		}
		requestAnimationFrame(step);
	}
	if (stats.length) {
		var sio = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						animateCount(e.target);
						sio.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.5 },
		);
		stats.forEach((s) => {
			sio.observe(s);
		});
	}

	/* ---- Mobile menu ---- */
	var menuBtn = document.getElementById("menuBtn");
	var closeBtn = document.getElementById("closeBtn");
	var menu = document.getElementById("mobileMenu");
	function closeMenu() {
		menu.classList.remove("open");
		document.body.style.overflow = "";
	}
	if (menuBtn)
		menuBtn.addEventListener("click", () => {
			menu.classList.add("open");
			document.body.style.overflow = "hidden";
		});
	if (closeBtn) closeBtn.addEventListener("click", closeMenu);
	menu.querySelectorAll("a").forEach((a) => {
		a.addEventListener("click", closeMenu);
	});

	/* ---- CTA form ---- */
	var form = document.getElementById("ctaForm");
	if (form) {
		form.addEventListener("submit", (ev) => {
			ev.preventDefault();
			var email = document.getElementById("ctaEmail").value.trim();
			if (!email) return;
			form.classList.add("done");
			form.innerHTML =
				'<span class="msg">Thank you — a note from the atelier is on its way.</span>';
		});
	}
})();
