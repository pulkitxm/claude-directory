(() => {
	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	document.addEventListener("DOMContentLoaded", () => {
		/* ---- Scroll reveal ---- */
		var reveals = document.querySelectorAll(".reveal");
		if (reduce || !("IntersectionObserver" in window)) {
			reveals.forEach((el) => {
				el.classList.add("in");
			});
		} else {
			var io = new IntersectionObserver(
				(entries) => {
					entries.forEach((e, _i) => {
						if (e.isIntersecting) {
							var sibs = Array.prototype.indexOf.call(
								e.target.parentNode.children,
								e.target,
							);
							e.target.style.transitionDelay = `${Math.min(sibs, 5) * 60}ms`;
							e.target.classList.add("in");
							io.unobserve(e.target);
						}
					});
				},
				{ threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
			);
			reveals.forEach((el) => {
				io.observe(el);
			});
		}

		/* ---- Nav shadow on scroll ---- */
		var nav = document.getElementById("nav");
		var onScroll = () => {
			nav.classList.toggle("scrolled", window.scrollY > 40);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });

		/* ---- Mobile menu ---- */
		var menu = document.getElementById("mobileMenu");
		var openBtn = document.getElementById("menuOpen");
		var closeBtn = document.getElementById("menuClose");
		function setMenu(open) {
			menu.classList.toggle("open", open);
			menu.setAttribute("aria-hidden", open ? "false" : "true");
			openBtn.setAttribute("aria-expanded", open ? "true" : "false");
			document.body.style.overflow = open ? "hidden" : "";
		}
		openBtn.addEventListener("click", () => {
			setMenu(true);
		});
		closeBtn.addEventListener("click", () => {
			setMenu(false);
		});
		menu.querySelectorAll("a").forEach((a) => {
			a.addEventListener("click", () => {
				setMenu(false);
			});
		});
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape" && menu.classList.contains("open")) setMenu(false);
		});

		/* ---- Count-up stats ---- */
		var statsGrid = document.getElementById("statsGrid");
		var nums = statsGrid.querySelectorAll(".stat__num");
		function runCount() {
			nums.forEach((el) => {
				var target = parseInt(el.getAttribute("data-count"), 10);
				var suffix = el.getAttribute("data-suffix") || "";
				var prefix = el.getAttribute("data-prefix") || "";
				if (reduce) {
					el.textContent = prefix + target + suffix;
					return;
				}
				var start = null,
					dur = 1500;
				function step(ts) {
					if (!start) start = ts;
					var p = Math.min((ts - start) / dur, 1);
					var eased = 1 - (1 - p) ** 3;
					el.textContent = prefix + Math.round(eased * target) + suffix;
					if (p < 1) requestAnimationFrame(step);
				}
				requestAnimationFrame(step);
			});
		}
		if ("IntersectionObserver" in window) {
			var sObs = new IntersectionObserver(
				(entries) => {
					entries.forEach((e) => {
						if (e.isIntersecting) {
							runCount();
							sObs.disconnect();
						}
					});
				},
				{ threshold: 0.4 },
			);
			sObs.observe(statsGrid);
		} else {
			runCount();
		}

		/* ---- Story slider ---- */
		var slider = document.getElementById("storySlider");
		var prev = document.getElementById("prevStory");
		var next = document.getElementById("nextStory");
		function step() {
			var card = slider.querySelector(".story");
			if (!card) return 400;
			var gap = parseFloat(getComputedStyle(slider).columnGap || "24") || 24;
			return card.getBoundingClientRect().width + gap;
		}
		next.addEventListener("click", () => {
			slider.scrollBy({ left: step(), behavior: "smooth" });
		});
		prev.addEventListener("click", () => {
			slider.scrollBy({ left: -step(), behavior: "smooth" });
		});
	});
})();
