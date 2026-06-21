(() => {
	document.addEventListener("DOMContentLoaded", () => {
		/* ---- Mobile menu ---- */
		var menu = document.getElementById("mobileMenu");
		var openBtn = document.getElementById("menuOpen");
		var closeBtn = document.getElementById("menuClose");
		function setMenu(open) {
			menu.classList.toggle("open", open);
			openBtn.setAttribute("aria-expanded", open ? "true" : "false");
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
		menu.querySelectorAll(".mm-nav a").forEach((a) => {
			a.addEventListener("click", () => {
				setMenu(false);
			});
		});

		/* ---- Scroll reveals ---- */
		var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		var targets = document.querySelectorAll(".reveal, .reveal-text");
		if (reduce || !("IntersectionObserver" in window)) {
			targets.forEach((t) => {
				t.classList.add("is-in");
			});
		} else {
			var io = new IntersectionObserver(
				(entries) => {
					entries.forEach((e) => {
						if (e.isIntersecting) {
							e.target.classList.add("is-in");
							io.unobserve(e.target);
						}
					});
				},
				{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
			);
			targets.forEach((t) => {
				io.observe(t);
			});
		}

		/* ---- Portfolio horizontal scroll ---- */
		var track = document.getElementById("portTrack");
		var prev = document.getElementById("portPrev");
		var next = document.getElementById("portNext");
		function step() {
			var card = track.querySelector(".prop");
			return card ? card.getBoundingClientRect().width + 28 : 428;
		}
		if (track && prev && next) {
			prev.addEventListener("click", () => {
				track.scrollBy({ left: -step(), behavior: "smooth" });
			});
			next.addEventListener("click", () => {
				track.scrollBy({ left: step(), behavior: "smooth" });
			});
		}

		/* ---- Stacked CTA fan-out ---- */
		var stack = document.getElementById("ctaStack");
		if (stack) {
			if (reduce || !("IntersectionObserver" in window)) {
				stack.classList.add("fan");
			} else {
				var io2 = new IntersectionObserver(
					(entries) => {
						entries.forEach((e) => {
							if (e.isIntersecting) {
								stack.classList.add("fan");
								io2.unobserve(e.target);
							}
						});
					},
					{ threshold: 0.35 },
				);
				io2.observe(stack);
			}
		}
	});
})();
