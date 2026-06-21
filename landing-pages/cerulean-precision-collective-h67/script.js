(() => {
	var reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

	document.addEventListener("DOMContentLoaded", () => {
		// Sticky header style on scroll
		var header = document.getElementById("site-header");
		var onScroll = () => {
			if (window.scrollY > 40) header.classList.add("scrolled");
			else header.classList.remove("scrolled");
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });

		// Mobile menu
		var toggle = document.getElementById("menu-toggle");
		var nav = document.getElementById("nav-menu");
		if (toggle && nav) {
			toggle.addEventListener("click", () => {
				nav.classList.toggle("open");
			});
			nav.addEventListener("click", (e) => {
				if (e.target.tagName === "A") nav.classList.remove("open");
			});
		}

		// Split headings into chars
		document.querySelectorAll("[data-split]").forEach((el) => {
			var text = el.textContent;
			el.textContent = "";
			[].forEach.call(text, (ch, i) => {
				var span = document.createElement("span");
				span.className = "char";
				span.textContent = ch;
				span.style.transitionDelay = `${i * 25}ms`;
				el.appendChild(span);
			});
		});

		if (reduce) {
			document
				.querySelectorAll(
					"[data-reveal],.reveal-left,.reveal-right,[data-split]",
				)
				.forEach((el) => {
					el.classList.add("in");
				});
			return;
		}

		// Char reveal observer
		var splitObs = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.querySelectorAll(".char").forEach((c) => {
							c.classList.add("in");
						});
						splitObs.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.1 },
		);
		document.querySelectorAll("[data-split]").forEach((el) => {
			splitObs.observe(el);
		});

		// Generic reveal observer
		var revObs = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("in");
						revObs.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.08 },
		);
		document
			.querySelectorAll("[data-reveal],.reveal-left,.reveal-right")
			.forEach((el) => {
				revObs.observe(el);
			});

		// Form handling
		var form = document.getElementById("intake-form");
		var status = document.getElementById("form-status");
		if (form) {
			form.addEventListener("submit", (e) => {
				e.preventDefault();
				var first = form.querySelector('input[name="first"]');
				var last = form.querySelector('input[name="last"]');
				if (!first.value.trim() || !last.value.trim()) {
					status.textContent = "Please enter your first and last name.";
					status.style.color = "#b91c1c";
					return;
				}
				status.style.color = "";
				status.textContent =
					"Thank you, " +
					first.value.trim() +
					". Our intake team will be in touch shortly.";
				form.reset();
			});
		}
	});
})();
