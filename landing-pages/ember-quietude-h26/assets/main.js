(() => {
	// ---- scroll reveal ----
	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
						var d = e.target.getAttribute("data-delay") || 0;
						setTimeout(() => {
							e.target.classList.add("in");
						}, d * 90);
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

	// ---- navbar shadow + back-to-top ----
	var header = document.querySelector(".header");
	var totop = document.querySelector(".totop");
	function onScroll() {
		var y = window.scrollY;
		if (header) header.classList.toggle("scrolled", y > 60);
		if (totop) totop.classList.toggle("show", y > 400);
	}
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();
	if (totop)
		totop.addEventListener("click", () => {
			window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
		});

	// ---- mobile menu ----
	var burger = document.getElementById("burger");
	var overlay = document.getElementById("mobileOverlay");
	var closeBtn = document.getElementById("mobClose");
	function setMenu(open) {
		if (!overlay) return;
		overlay.classList.toggle("open", open);
		document.body.style.overflow = open ? "hidden" : "";
	}
	if (burger)
		burger.addEventListener("click", () => {
			setMenu(true);
		});
	if (closeBtn)
		closeBtn.addEventListener("click", () => {
			setMenu(false);
		});
	if (overlay)
		overlay.querySelectorAll("a").forEach((a) => {
			a.addEventListener("click", () => {
				setMenu(false);
			});
		});
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") setMenu(false);
	});

	// ---- pricing toggle ----
	var toggle = document.querySelector(".price-toggle");
	if (toggle) {
		var btns = toggle.querySelectorAll("button");
		var amts = document.querySelectorAll(".amt[data-monthly]");
		btns.forEach((b) => {
			b.addEventListener("click", () => {
				btns.forEach((x) => {
					x.classList.remove("on");
				});
				b.classList.add("on");
				var annual = b.getAttribute("data-period") === "annual";
				amts.forEach((a) => {
					a.textContent = annual
						? a.getAttribute("data-annual")
						: a.getAttribute("data-monthly");
				});
				document.querySelectorAll(".per").forEach((p) => {
					if (p.getAttribute("data-per"))
						p.textContent = annual
							? "/ mo, billed yearly"
							: p.getAttribute("data-per");
				});
			});
		});
	}

	// ---- live focus timer (cosmetic countdown) ----
	var timeEl = document.querySelector(".timer .time");
	if (timeEl && !reduce) {
		var secs = 24 * 60 + 59;
		setInterval(() => {
			secs = secs > 0 ? secs - 1 : 24 * 60 + 59;
			var m = Math.floor(secs / 60),
				s = secs % 60;
			timeEl.textContent = `${m}:${s < 10 ? `0${s}` : s}`;
		}, 1000);
	}
})();
