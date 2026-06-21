/* SLATE & STONE — interactions */
(() => {
	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	document.addEventListener("DOMContentLoaded", () => {
		document.body.classList.add("loaded");

		/* ---- Scroll reveals ---- */
		var revealEls = document.querySelectorAll(".reveal");
		if (reduce || !("IntersectionObserver" in window)) {
			revealEls.forEach((el) => {
				el.classList.add("in");
			});
		} else {
			var io = new IntersectionObserver(
				(entries) => {
					entries.forEach((e) => {
						if (e.isIntersecting) {
							var el = e.target;
							var delay = parseInt(el.getAttribute("data-delay") || "0", 10);
							setTimeout(() => {
								el.classList.add("in");
							}, delay);
							io.unobserve(el);
						}
					});
				},
				{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
			);
			revealEls.forEach((el) => {
				io.observe(el);
			});
		}

		/* ---- Header scrolled state ---- */
		var header = document.querySelector(".site-header");
		var onScroll = () => {
			if (window.scrollY > 80) header.classList.add("scrolled");
			else header.classList.remove("scrolled");
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();

		/* ---- Mobile menu ---- */
		var burger = document.querySelector(".burger");
		var mobileLinks = document.querySelectorAll(".mobile-menu a");
		var close = () => {
			document.body.classList.remove("menu-open");
			document.body.style.overflow = "";
			burger.setAttribute("aria-expanded", "false");
		};
		burger.addEventListener("click", () => {
			var open = document.body.classList.toggle("menu-open");
			document.body.style.overflow = open ? "hidden" : "";
			burger.setAttribute("aria-expanded", open ? "true" : "false");
		});
		mobileLinks.forEach((a) => {
			a.addEventListener("click", close);
		});
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") close();
		});

		/* ---- Stats count-up ---- */
		var stats = document.querySelectorAll(".stat__num[data-to]");
		var animateNum = (el) => {
			var to = parseFloat(el.getAttribute("data-to"));
			var dec = parseInt(el.getAttribute("data-dec") || "0", 10);
			var prefix = el.getAttribute("data-prefix") || "";
			var suffix = el.getAttribute("data-suffix") || "";
			if (reduce) {
				el.textContent = prefix + to.toFixed(dec) + suffix;
				return;
			}
			var dur = 1400,
				start = null;
			var step = (ts) => {
				if (!start) start = ts;
				var p = Math.min((ts - start) / dur, 1);
				var eased = 1 - (1 - p) ** 3;
				el.textContent = prefix + (to * eased).toFixed(dec) + suffix;
				if (p < 1) requestAnimationFrame(step);
				else el.textContent = prefix + to.toFixed(dec) + suffix;
			};
			requestAnimationFrame(step);
		};
		if ("IntersectionObserver" in window) {
			var sio = new IntersectionObserver(
				(entries) => {
					entries.forEach((e) => {
						if (e.isIntersecting) {
							animateNum(e.target);
							sio.unobserve(e.target);
						}
					});
				},
				{ threshold: 0.6 },
			);
			stats.forEach((el) => {
				sio.observe(el);
			});
		} else {
			stats.forEach(animateNum);
		}

		/* ---- Contact form ---- */
		var form = document.querySelector("#enquiry-form");
		if (form) {
			form.addEventListener("submit", (e) => {
				e.preventDefault();
				var note = form.querySelector(".form-note");
				var name = (
					form.querySelector('input[name="name"]').value || ""
				).trim();
				note.textContent =
					"Thank you" +
					(name ? `, ${name.split(" ")[0]}` : "") +
					" — we will be in touch within one business day.";
				note.classList.add("show");
				form.reset();
			});
		}
	});
})();
