/* Nodus Agent Template — interactions (vanilla JS) */
(function () {
	"use strict";

	/* ---- theme toggle (persisted, class-based) ---- */
	function setTheme(t) {
		const root = document.documentElement;
		root.classList.toggle("dark", t === "dark");
		try {
			localStorage.setItem("theme", t);
		} catch (e) {}
	}
	function currentTheme() {
		return document.documentElement.classList.contains("dark")
			? "dark"
			: "light";
	}
	document.addEventListener("click", function (e) {
		const tog = e.target.closest("[data-theme-toggle]");
		if (tog) {
			setTheme(currentTheme() === "dark" ? "light" : "dark");
		}
	});

	/* ---- mobile menu ---- */
	document.addEventListener("click", function (e) {
		const burger = e.target.closest("[data-menu-toggle]");
		if (burger) {
			const menu = document.querySelector("[data-mobile-menu]");
			if (menu) menu.classList.toggle("open");
		}
	});

	/* ---- FAQ accordion ---- */
	document.addEventListener("click", function (e) {
		const q = e.target.closest(".faq-q");
		if (!q) return;
		const item = q.parentElement;
		const ans = item.querySelector(".faq-a");
		const open = item.classList.toggle("open");
		ans.style.maxHeight = open ? ans.scrollHeight + "px" : "0";
	});

	/* ---- pricing toggle (monthly / yearly) ---- */
	function bindPricing() {
		document.querySelectorAll("[data-pricing-toggle]").forEach(function (grp) {
			const btns = grp.querySelectorAll("button");
			btns.forEach(function (b) {
				b.addEventListener("click", function () {
					btns.forEach((x) => x.classList.remove("active"));
					b.classList.add("active");
					const cycle = b.getAttribute("data-cycle");
					document.querySelectorAll("[data-price]").forEach(function (el) {
						const v = el.getAttribute(
							cycle === "yearly" ? "data-yearly" : "data-monthly",
						);
						if (v != null) el.firstChild.textContent = v;
					});
					document
						.querySelectorAll("[data-cycle-label]")
						.forEach(function (el) {
							el.textContent =
								cycle === "yearly" ? "billed yearly" : "billed monthly";
						});
				});
			});
		});
	}
	bindPricing();

	/* ---- careers "how it works" step highlight on hover ---- */
	document.querySelectorAll(".split-left .step").forEach(function (step) {
		step.addEventListener("mouseenter", function () {
			document
				.querySelectorAll(".split-left .step")
				.forEach((s) => s.classList.remove("is-active"));
			step.classList.add("is-active");
		});
	});

	/* ---- scroll reveal ---- */
	const reveals = document.querySelectorAll(".reveal");
	if ("IntersectionObserver" in window && reveals.length) {
		const io = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (en) {
					if (en.isIntersecting) {
						en.target.classList.add("in");
						io.unobserve(en.target);
					}
				});
			},
			{ threshold: 0, rootMargin: "0px 0px -5% 0px" },
		);
		reveals.forEach((r) => io.observe(r));
		// reveal anything already in/above the viewport on load so no section
		// is ever stuck hidden (also covers no-scroll / full-page renders)
		function revealInView() {
			reveals.forEach(function (r) {
				const rect = r.getBoundingClientRect();
				if (rect.top < window.innerHeight * 1.05) {
					r.classList.add("in");
					io.unobserve(r);
				}
			});
		}
		revealInView();
		window.addEventListener("scroll", revealInView, { passive: true });
		window.addEventListener("resize", revealInView, { passive: true });
		// failsafe: nothing stays hidden if the observer misses fast scrolls
		setTimeout(function () {
			reveals.forEach((r) => r.classList.add("in"));
		}, 1200);
	} else {
		reveals.forEach((r) => r.classList.add("in"));
	}

	/* ---- prevent dead-link nav jump ---- */
	document.addEventListener("click", function (e) {
		const a = e.target.closest('a[href="#"]');
		if (a) e.preventDefault();
	});
})();
