(() => {
	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	/* ---------- Scroll reveal ---------- */
	var reveals = document.querySelectorAll(".reveal");
	if (reduce || !("IntersectionObserver" in window)) {
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
			{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
		);
		reveals.forEach((el) => {
			io.observe(el);
		});
	}

	/* ---------- Nav scroll state + mobile menu ---------- */
	var nav = document.getElementById("nav");
	function onScroll() {
		if (window.scrollY > 40) nav.classList.add("scrolled");
		else nav.classList.remove("scrolled");
	}
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();

	var toggle = document.getElementById("navToggle");
	var panel = document.getElementById("mobilePanel");
	toggle.addEventListener("click", () => {
		panel.classList.toggle("open");
	});
	panel.querySelectorAll("a").forEach((a) => {
		a.addEventListener("click", () => {
			panel.classList.remove("open");
		});
	});

	/* ---------- Generic cross-fade slider ---------- */
	function makeSlider(slides, dotsHost, opts) {
		opts = opts || {};
		var i = 0,
			timer = null,
			paused = false;
		var dots = [];
		if (dotsHost) {
			slides.forEach((_, idx) => {
				var b = document.createElement("button");
				b.setAttribute("aria-label", `Slide ${idx + 1}`);
				b.addEventListener("click", () => {
					go(idx);
					restart();
				});
				dotsHost.appendChild(b);
				dots.push(b);
			});
		}
		function go(n) {
			i = (n + slides.length) % slides.length;
			slides.forEach((s, idx) => {
				s.classList.toggle("active", idx === i);
			});
			dots.forEach((d, idx) => {
				d.classList.toggle("active", idx === i);
			});
		}
		function next() {
			go(i + 1);
		}
		function start() {
			if (reduce || opts.interval <= 0) return;
			timer = setInterval(() => {
				if (!paused) next();
			}, opts.interval);
		}
		function restart() {
			clearInterval(timer);
			start();
		}
		if (opts.pauseEl) {
			opts.pauseEl.addEventListener("mouseenter", () => {
				paused = true;
			});
			opts.pauseEl.addEventListener("mouseleave", () => {
				paused = false;
			});
		}
		go(0);
		start();
	}

	var heroFrame = document.getElementById("heroFrame");
	makeSlider(
		Array.prototype.slice.call(document.querySelectorAll(".hero-slide")),
		document.getElementById("heroDots"),
		{ interval: 4000, pauseEl: heroFrame },
	);

	makeSlider(
		Array.prototype.slice.call(document.querySelectorAll("#edText .ed-slide")),
		document.getElementById("edDots"),
		{ interval: 5000, pauseEl: document.getElementById("edText") },
	);

	/* ---------- Marquee: duplicate for seamless loop ---------- */
	if (!reduce) {
		var track = document.getElementById("marquee");
		track.innerHTML += track.innerHTML;
	}

	/* ---------- Newsletter ---------- */
	var form = document.getElementById("newsForm");
	var email = document.getElementById("newsEmail");
	var card = document.getElementById("newsCard");
	var success = document.getElementById("newsSuccess");
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		var v = (email.value || "").trim();
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
			email.style.borderColor = "#e8590c";
			email.focus();
			return;
		}
		card.classList.add("done");
		success.classList.add("show");
	});
	email.addEventListener("input", () => {
		email.style.borderColor = "";
	});
})();
