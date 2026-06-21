/* VERDANT SALON — interactions */
(() => {
	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	/* ---- Build demask tile overlays ---- */
	document.querySelectorAll(".img-card, .case-media").forEach((card) => {
		var cols = parseInt(card.dataset.cols || "3", 10);
		var rows = parseInt(card.dataset.rows || "4", 10);
		var grid = document.createElement("div");
		grid.className = "demask";
		grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
		grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
		var total = cols * rows;
		for (var i = 0; i < total; i++) {
			var s = document.createElement("span");
			// pseudo-random but deterministic stagger
			var d = ((i * 137) % total) / total;
			s.style.transitionDelay = `${(100 + d * 750).toFixed(0)}ms`;
			grid.appendChild(s);
		}
		card.appendChild(grid);
	});

	/* ---- Scroll reveal + demask trigger ---- */
	var io = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (!e.isIntersecting) return;
				e.target.classList.add("in");
				if (e.target.matches(".img-card, .case-media"))
					e.target.classList.add("revealed");
				io.unobserve(e.target);
			});
		},
		{ threshold: 0.12 },
	);

	document.querySelectorAll(".reveal, .img-card, .case-media").forEach((el) => {
		io.observe(el);
	});

	/* ---- Stat count-up ---- */
	function animateCount(el) {
		var target = parseFloat(el.dataset.target);
		var suffix = el.dataset.suffix || "";
		var decimals = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0;
		if (reduce || Number.isNaN(target)) {
			el.textContent = format(target, decimals) + suffix;
			return;
		}
		var start = performance.now(),
			dur = 1600;
		function tick(now) {
			var p = Math.min((now - start) / dur, 1);
			var eased = 1 - (1 - p) ** 3;
			el.textContent = format(target * eased, decimals) + suffix;
			if (p < 1) requestAnimationFrame(tick);
			else el.textContent = format(target, decimals) + suffix;
		}
		requestAnimationFrame(tick);
	}
	function format(n, d) {
		return d > 0 ? n.toFixed(d) : Math.round(n).toLocaleString("en-US");
	}
	var statIO = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (!e.isIntersecting) return;
				animateCount(e.target);
				statIO.unobserve(e.target);
			});
		},
		{ threshold: 0.6 },
	);
	document.querySelectorAll("[data-target]").forEach((el) => {
		statIO.observe(el);
	});

	/* ---- Header scroll state ---- */
	var header = document.getElementById("header");
	function onScroll() {
		if (window.scrollY > 80) header.classList.add("scrolled");
		else header.classList.remove("scrolled");
	}
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();

	/* ---- Smooth anchor scroll w/ header offset ---- */
	document.querySelectorAll('a[href^="#"]').forEach((a) => {
		a.addEventListener("click", (ev) => {
			var id = a.getAttribute("href");
			if (id.length < 2) return;
			var t = document.querySelector(id);
			if (!t) return;
			ev.preventDefault();
			var y = t.getBoundingClientRect().top + window.scrollY - 90;
			window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
		});
	});

	/* ---- Fake inquiry form ---- */
	var form = document.getElementById("inquiry-form");
	if (form) {
		form.addEventListener("submit", (ev) => {
			ev.preventDefault();
			var btn = form.querySelector("button");
			if (btn.classList.contains("done")) return;
			btn.textContent = "Transmitting…";
			btn.disabled = true;
			setTimeout(() => {
				btn.textContent = "Received — we will be in touch";
				btn.classList.add("done");
				form.reset();
			}, 1400);
		});
	}
})();
