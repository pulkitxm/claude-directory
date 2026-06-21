/* ============================================================
   COBALT BENTO FOLIO — interactions
   ============================================================ */
(() => {
	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	/* ---- Staggered panel reveal ---- */
	var reveals = Array.prototype.slice.call(
		document.querySelectorAll(".reveal"),
	);
	if ("IntersectionObserver" in window && !reduce) {
		var revObs = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						var i = reveals.indexOf(e.target);
						e.target.style.transitionDelay = `${Math.min((i % 4) * 80, 240)}ms`;
						e.target.classList.add("in");
						revObs.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
		);
		reveals.forEach((el) => {
			revObs.observe(el);
		});
	} else {
		reveals.forEach((el) => {
			el.classList.add("in");
		});
	}

	/* ---- Hero pointer parallax + specular ---- */
	var hero = document.getElementById("hero");
	var ring = hero ? hero.querySelector(".hero-ring") : null;
	var spec = document.getElementById("spec");
	if (hero && !reduce) {
		hero.addEventListener("pointermove", (ev) => {
			var r = hero.getBoundingClientRect();
			var px = (ev.clientX - r.left) / r.width;
			var py = (ev.clientY - r.top) / r.height;
			if (spec) {
				spec.style.setProperty("--mx", `${px * 100}%`);
				spec.style.setProperty("--my", `${py * 100}%`);
			}
			if (ring) {
				ring.style.transform = `translate(${(px - 0.5) * 22}px,${(py - 0.5) * 22}px)`;
			}
		});
		hero.addEventListener("pointerleave", () => {
			if (ring) ring.style.transform = "";
		});
	}

	/* ---- Typewriter rotator ---- */
	var typed = document.getElementById("typed");
	if (typed) {
		var roles = [
			"Design Engineer",
			"Systems Thinker",
			"Open-Source Maintainer",
			"Full-Stack Builder",
		];
		if (reduce) {
			typed.textContent = roles[0];
		} else {
			var ri = 0,
				ci = 0,
				deleting = false;
			(function tick() {
				var word = roles[ri];
				typed.textContent = word.slice(0, ci);
				if (!deleting) {
					if (ci < word.length) {
						ci++;
						setTimeout(tick, 70);
					} else {
						deleting = true;
						setTimeout(tick, 1400);
					}
				} else {
					if (ci > 0) {
						ci--;
						setTimeout(tick, 38);
					} else {
						deleting = false;
						ri = (ri + 1) % roles.length;
						setTimeout(tick, 320);
					}
				}
			})();
		}
	}

	/* ---- Skill ring ---- */
	var ringEl = document.getElementById("ring");
	var ringNum = document.getElementById("ring-num");
	var ringPanel = document.getElementById("ring-panel");
	if (ringEl) {
		var C = 2 * Math.PI * 50,
			target = 0.92;
		ringEl.style.strokeDasharray = C;
		ringEl.style.strokeDashoffset = C;
		function fillRing() {
			ringEl.style.strokeDashoffset = C * (1 - target);
			if (ringNum) {
				if (reduce) {
					ringNum.textContent = "92%";
					return;
				}
				var s = null;
				(function step(t) {
					if (s === null) s = t;
					var p = Math.min((t - s) / 1400, 1);
					ringNum.textContent = `${Math.round(p * 92)}%`;
					if (p < 1) requestAnimationFrame(step);
				})(performance.now());
			}
		}
		if ("IntersectionObserver" in window && ringPanel) {
			var ro = new IntersectionObserver(
				(es) => {
					es.forEach((e) => {
						if (e.isIntersecting) {
							fillRing();
							ro.disconnect();
						}
					});
				},
				{ threshold: 0.4 },
			);
			ro.observe(ringPanel);
		} else {
			fillRing();
		}
	}

	/* ---- Count-up stats ---- */
	var stats = document.getElementById("stats");
	if (stats) {
		var nums = Array.prototype.slice.call(stats.querySelectorAll("[data-to]"));
		function runCounts() {
			nums.forEach((n) => {
				var to = parseInt(n.getAttribute("data-to"), 10);
				if (reduce) {
					n.textContent = to;
					return;
				}
				var s = null,
					dur = 1500;
				(function step(t) {
					if (s === null) s = t;
					var p = Math.min((t - s) / dur, 1);
					var eased = 1 - (1 - p) ** 3;
					n.textContent = Math.round(eased * to);
					if (p < 1) requestAnimationFrame(step);
				})(performance.now());
			});
		}
		if ("IntersectionObserver" in window) {
			var so = new IntersectionObserver(
				(es) => {
					es.forEach((e) => {
						if (e.isIntersecting) {
							runCounts();
							so.disconnect();
						}
					});
				},
				{ threshold: 0.5 },
			);
			so.observe(stats);
		} else {
			runCounts();
		}
	}

	/* ---- Scroll-spy nav ---- */
	var navLinks = Array.prototype.slice.call(
		document.querySelectorAll(".nav-pill a"),
	);
	var sections = ["work", "about", "stack", "contact"].map((id) =>
		document.getElementById(id),
	);
	if ("IntersectionObserver" in window) {
		var spy = new IntersectionObserver(
			(es) => {
				es.forEach((e) => {
					if (e.isIntersecting) {
						navLinks.forEach((a) => {
							a.classList.toggle(
								"active",
								a.getAttribute("href") === `#${e.target.id}`,
							);
						});
					}
				});
			},
			{ threshold: 0.4, rootMargin: "-20% 0px -50% 0px" },
		);
		sections.forEach((s) => {
			if (s) spy.observe(s);
		});
	}

	/* ---- Mobile sheet ---- */
	var sheet = document.getElementById("sheet");
	var open = document.getElementById("open-sheet");
	var close = document.getElementById("close-sheet");
	if (open)
		open.addEventListener("click", () => {
			sheet.classList.add("open");
		});
	if (close)
		close.addEventListener("click", () => {
			sheet.classList.remove("open");
		});
	document.querySelectorAll("[data-sheet]").forEach((a) => {
		a.addEventListener("click", () => {
			sheet.classList.remove("open");
		});
	});

	/* ---- FAB ---- */
	var fab = document.getElementById("fab");
	if (fab)
		fab.addEventListener("click", () => {
			var c = document.getElementById("contact");
			if (c) c.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
		});

	/* ---- Contact form ---- */
	var form = document.getElementById("contact-form");
	if (form) {
		function fail(id) {
			document.getElementById(id).classList.add("err");
		}
		function clearErr(id) {
			document.getElementById(id).classList.remove("err");
		}
		["name", "email", "message"].forEach((id) => {
			var input = document.getElementById(id);
			input.addEventListener("input", () => {
				clearErr(`f-${id}`);
			});
		});
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			var ok = true;
			var name = document.getElementById("name").value.trim();
			var email = document.getElementById("email").value.trim();
			var msg = document.getElementById("message").value.trim();
			if (!name) {
				fail("f-name");
				ok = false;
			} else clearErr("f-name");
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
				fail("f-email");
				ok = false;
			} else clearErr("f-email");
			if (msg.length < 4) {
				fail("f-message");
				ok = false;
			} else clearErr("f-message");
			if (!ok) return;
			form.style.display = "none";
			document.getElementById("success").classList.add("show");
		});
	}
})();
