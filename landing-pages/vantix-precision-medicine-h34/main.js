(() => {
	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	/* ---- Mobile menu ---- */
	var burger = document.getElementById("burger");
	var menu = document.getElementById("mobileMenu");
	var close = document.getElementById("closeMenu");
	function openMenu() {
		menu.classList.add("open");
		document.body.style.overflow = "hidden";
	}
	function closeMenu() {
		menu.classList.remove("open");
		document.body.style.overflow = "";
	}
	if (burger) burger.addEventListener("click", openMenu);
	if (close) close.addEventListener("click", closeMenu);
	document.querySelectorAll("[data-mlink]").forEach((a) => {
		a.addEventListener("click", closeMenu);
	});

	/* ---- Scroll reveals ---- */
	var revealEls = Array.prototype.slice.call(
		document.querySelectorAll(".reveal"),
	);
	if (reduce || !("IntersectionObserver" in window)) {
		revealEls.forEach((el) => {
			el.classList.add("visible");
		});
	} else {
		var io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (!e.isIntersecting) return;
					var d = parseInt(e.target.getAttribute("data-delay") || "0", 10);
					setTimeout(() => {
						e.target.classList.add("visible");
					}, d);
					io.unobserve(e.target);
				});
			},
			{ threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
		);
		revealEls.forEach((el) => {
			io.observe(el);
		});
	}

	/* ---- Metric count-up ---- */
	function runCount(el) {
		var text = el.getAttribute("data-text");
		if (text) {
			el.textContent = text;
			return;
		}
		var target = parseFloat(el.getAttribute("data-count"));
		var dec = parseInt(el.getAttribute("data-dec") || "0", 10);
		var suffix = el.getAttribute("data-suffix") || "";
		if (reduce) {
			el.textContent = target.toFixed(dec) + suffix;
			return;
		}
		var start = null,
			dur = 1500;
		function step(ts) {
			if (start === null) start = ts;
			var p = Math.min((ts - start) / dur, 1);
			var eased = 1 - (1 - p) ** 3;
			el.textContent = (target * eased).toFixed(dec) + suffix;
			if (p < 1) requestAnimationFrame(step);
			else el.textContent = target.toFixed(dec) + suffix;
		}
		requestAnimationFrame(step);
	}
	var counters = document.querySelectorAll("[data-count],[data-text]");
	if ("IntersectionObserver" in window && !reduce) {
		var cio = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						runCount(e.target);
						cio.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.5 },
		);
		counters.forEach((c) => {
			cio.observe(c);
		});
	} else {
		counters.forEach(runCount);
	}

	/* ---- Form ---- */
	var form = document.getElementById("consultForm");
	if (form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			var name = document.getElementById("name");
			var email = document.getElementById("email");
			if (!name.value.trim() || !email.value.trim()) {
				(name.value.trim() ? email : name).focus();
				return;
			}
			document.getElementById("formSuccess").classList.add("show");
			form.querySelector(".submit-btn").textContent = "Brief Transmitted ✓";
			setTimeout(() => {
				form.reset();
				document.getElementById("formSuccess").classList.remove("show");
				form.querySelector(".submit-btn").textContent = "Submit Clinical Brief";
			}, 4200);
		});
	}
})();
