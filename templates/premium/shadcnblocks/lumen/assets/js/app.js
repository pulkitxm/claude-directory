// Lumen — shared interactions (theme, nav, accordion, reveal, marquee, pricing)
(function () {
	"use strict";

	/* ---------- Theme toggle ---------- */
	const root = document.documentElement;
	function setTheme(dark) {
		root.classList.toggle("dark", dark);
		root.classList.toggle("light", !dark);
		try {
			localStorage.setItem("lumen-theme", dark ? "dark" : "light");
		} catch (e) {}
	}
	document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
		btn.addEventListener("click", () =>
			setTheme(!root.classList.contains("dark")),
		);
	});

	/* ---------- Mobile menu ---------- */
	const hamburger = document.querySelector("[data-hamburger]");
	if (hamburger) {
		hamburger.addEventListener("click", () => {
			document.body.classList.toggle("menu-open");
		});
	}

	/* ---------- Features nav dropdown (click on touch) ---------- */
	document.querySelectorAll("[data-nav-trigger]").forEach((trigger) => {
		const item = trigger.closest(".nav-item");
		trigger.addEventListener("click", (e) => {
			e.preventDefault();
			item.classList.toggle("open");
		});
		document.addEventListener("click", (e) => {
			if (!item.contains(e.target)) item.classList.remove("open");
		});
	});

	/* ---------- Accordion ---------- */
	document.querySelectorAll(".accordion").forEach((acc) => {
		acc.querySelectorAll(".accordion-trigger").forEach((trigger) => {
			trigger.addEventListener("click", () => {
				const item = trigger.closest(".accordion-item");
				const isOpen = item.classList.contains("open");
				// single-open behaviour
				if (!acc.hasAttribute("data-multi")) {
					acc.querySelectorAll(".accordion-item.open").forEach((el) => {
						el.classList.remove("open");
						el.querySelector(".accordion-trigger").setAttribute(
							"aria-expanded",
							"false",
						);
					});
				}
				item.classList.toggle("open", !isOpen);
				trigger.setAttribute("aria-expanded", String(!isOpen));
			});
		});
	});

	/* ---------- Reveal on scroll ---------- */
	const reveals = document.querySelectorAll(".reveal");
	if (reveals.length && "IntersectionObserver" in window) {
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
						io.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
		);
		reveals.forEach((el) => io.observe(el));
		// Safety net: if a reveal element is already in/near viewport on load but the
		// observer hasn't fired (e.g. headless full-page capture), reveal after a beat.
		requestAnimationFrame(() => {
			reveals.forEach((el) => {
				const r = el.getBoundingClientRect();
				if (r.top < window.innerHeight * 1.2) el.classList.add("is-visible");
			});
		});
		// Fallback: if the user never scrolls (or this is a headless full-page
		// capture), reveal everything so no content stays hidden.
		setTimeout(
			() => reveals.forEach((el) => el.classList.add("is-visible")),
			1200,
		);
	} else {
		reveals.forEach((el) => el.classList.add("is-visible"));
	}

	/* ---------- Marquee: duplicate track for seamless loop ---------- */
	document.querySelectorAll(".marquee__track").forEach((track) => {
		track.innerHTML += track.innerHTML;
	});

	/* ---------- Pricing monthly/annual toggle ---------- */
	document.querySelectorAll("[data-billing]").forEach((control) => {
		const setPeriod = (period) => {
			control
				.querySelectorAll("[data-period]")
				.forEach((b) =>
					b.classList.toggle("is-active", b.dataset.period === period),
				);
			document.querySelectorAll("[data-price]").forEach((el) => {
				const val = el.dataset[period];
				if (val !== undefined) el.textContent = val;
			});
			document
				.querySelectorAll("[data-period-suffix]")
				.forEach(
					(el) => (el.textContent = period === "annual" ? "/year" : "/mo"),
				);
		};
		control.querySelectorAll("[data-period]").forEach((btn) => {
			btn.addEventListener("click", () => setPeriod(btn.dataset.period));
		});
	});

	/* ---------- Blog filter tabs + sort ---------- */
	const blogGrid = document.querySelector("[data-blog-grid]");
	if (blogGrid) {
		const cards = Array.from(blogGrid.children);
		document.querySelectorAll("[data-filter]").forEach((tab) => {
			tab.addEventListener("click", () => {
				document
					.querySelectorAll("[data-filter]")
					.forEach((t) => t.classList.toggle("is-active", t === tab));
				const cat = tab.dataset.filter;
				cards.forEach((c) => {
					c.style.display =
						cat === "all" || c.dataset.category === cat ? "" : "none";
				});
			});
		});
	}
})();
