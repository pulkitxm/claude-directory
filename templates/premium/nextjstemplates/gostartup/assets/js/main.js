// GoStartup clone — shared chrome behavior: theme toggle, mobile menu,
// "Pages" dropdown, search panel, scroll-reveal, page-load progress bar.
(function () {
	"use strict";

	/* ---------- page-load progress bar (nprogress-style) ---------- */
	var bar = document.getElementById("page-progress");
	if (bar) {
		requestAnimationFrame(function () {
			bar.style.width = "70%";
		});
		window.addEventListener("load", function () {
			bar.style.width = "100%";
			setTimeout(function () {
				bar.style.opacity = "0";
			}, 250);
		});
	}

	/* ---------- theme toggle ---------- */
	var THEME_KEY = "gostartup-theme";
	function syncLogos(theme) {
		document.querySelectorAll("[data-logo]").forEach(function (img) {
			img.src =
				theme === "light"
					? "assets/images/logo/logo-dark.svg"
					: "assets/images/logo/logo-light.svg";
		});
	}
	function applyTheme(theme) {
		document.documentElement.setAttribute("data-theme", theme);
		syncLogos(theme);
	}
	syncLogos(document.documentElement.getAttribute("data-theme") || "dark");
	var toggle = document.querySelector("[data-theme-toggle]");
	if (toggle) {
		toggle.addEventListener("click", function () {
			var current =
				document.documentElement.getAttribute("data-theme") ||
				(window.matchMedia("(prefers-color-scheme: light)").matches
					? "light"
					: "dark");
			var next = current === "dark" ? "light" : "dark";
			applyTheme(next);
			try {
				localStorage.setItem(THEME_KEY, next);
			} catch (e) {}
		});
	}

	/* ---------- mobile hamburger menu ---------- */
	var header = document.querySelector(".site-header");
	var hamburger = document.querySelector(".hamburger");
	if (header && hamburger) {
		hamburger.addEventListener("click", function () {
			header.classList.toggle("menu-open");
			var expanded = header.classList.contains("menu-open");
			hamburger.setAttribute("aria-expanded", String(expanded));
		});
	}

	/* ---------- "Pages" dropdown (click-to-toggle, also hover on desktop via CSS) ---------- */
	document.querySelectorAll(".nav__item--dropdown").forEach(function (item) {
		var trigger = item.querySelector(".nav__trigger");
		if (!trigger) return;
		trigger.addEventListener("click", function (e) {
			e.stopPropagation();
			var isOpen = item.classList.contains("is-open");
			document
				.querySelectorAll(".nav__item--dropdown.is-open")
				.forEach(function (o) {
					if (o !== item) o.classList.remove("is-open");
				});
			item.classList.toggle("is-open", !isOpen);
		});
	});
	document.addEventListener("click", function () {
		document
			.querySelectorAll(".nav__item--dropdown.is-open")
			.forEach(function (o) {
				o.classList.remove("is-open");
			});
	});

	/* ---------- search icon → inline search panel ---------- */
	var searchBtn = document.querySelector("[data-search-toggle]");
	var searchPanel = document.querySelector(".search-panel");
	if (searchBtn && searchPanel) {
		searchBtn.addEventListener("click", function () {
			searchPanel.classList.toggle("is-open");
			if (searchPanel.classList.contains("is-open")) {
				var input = searchPanel.querySelector("input");
				if (input) setTimeout(function () { input.focus(); }, 300);
			}
		});
	}

	/* ---------- scroll-reveal ---------- */
	var revealEls = document.querySelectorAll(".reveal");
	if ("IntersectionObserver" in window && revealEls.length) {
		var io = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
						io.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
		);
		revealEls.forEach(function (el, i) {
			el.style.transitionDelay = (i % 6) * 60 + "ms";
			io.observe(el);
		});
		// Fallback: some automated full-page capture tools resize/clip the
		// viewport without dispatching real scroll/resize events, so
		// IntersectionObserver never fires for below-the-fold elements.
		// Force-reveal everything shortly after load so those tools (and
		// slow scrollers) still see the finished page.
		window.addEventListener("load", function () {
			setTimeout(function () {
				revealEls.forEach(function (el) {
					el.classList.add("is-visible");
				});
			}, 1200);
		});
	} else {
		revealEls.forEach(function (el) {
			el.classList.add("is-visible");
		});
	}

	/* ---------- generic form submit (no backend — show local success state) ---------- */
	document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
		form.addEventListener("submit", function (e) {
			e.preventDefault();
			var note = form.querySelector("[data-form-note]");
			if (note) {
				note.textContent = "Thanks! This is a static demo — no message was actually sent.";
				note.classList.add("is-visible");
			}
		});
	});

	/* ---------- tabs (About Us / Our Mission / Our Vision) ---------- */
	document.querySelectorAll("[data-tabs]").forEach(function (group) {
		var buttons = group.querySelectorAll("[data-tab-target]");
		var panels = group.querySelectorAll("[data-tab-panel]");
		buttons.forEach(function (btn) {
			btn.addEventListener("click", function () {
				var target = btn.getAttribute("data-tab-target");
				buttons.forEach(function (b) {
					b.classList.toggle("is-active", b === btn);
				});
				panels.forEach(function (p) {
					p.classList.toggle(
						"is-active",
						p.getAttribute("data-tab-panel") === target,
					);
				});
			});
		});
	});

	/* ---------- portfolio filter tabs ---------- */
	document.querySelectorAll("[data-filter-group]").forEach(function (group) {
		var buttons = group.querySelectorAll("[data-filter]");
		var itemsRoot = document.querySelector(
			group.getAttribute("data-filter-group"),
		);
		if (!itemsRoot) return;
		var items = itemsRoot.querySelectorAll("[data-category]");
		buttons.forEach(function (btn) {
			btn.addEventListener("click", function () {
				var filter = btn.getAttribute("data-filter");
				buttons.forEach(function (b) {
					b.classList.toggle("is-active", b === btn);
				});
				items.forEach(function (item) {
					var show =
						filter === "all" || item.getAttribute("data-category") === filter;
					item.style.display = show ? "" : "none";
				});
			});
		});
	});

	/* ---------- testimonial carousel (simple slider, swiper-style) ---------- */
	document.querySelectorAll("[data-carousel]").forEach(function (carousel) {
		var track = carousel.querySelector("[data-carousel-track]");
		var slides = track ? Array.prototype.slice.call(track.children) : [];
		var dotsWrap = carousel.querySelector("[data-carousel-dots]");
		var prev = carousel.querySelector("[data-carousel-prev]");
		var next = carousel.querySelector("[data-carousel-next]");
		if (!track || slides.length < 2) return;
		var index = 0;
		var dots = [];
		if (dotsWrap) {
			slides.forEach(function (_, i) {
				var dot = document.createElement("button");
				dot.type = "button";
				dot.setAttribute("aria-label", "Go to slide " + (i + 1));
				dot.addEventListener("click", function () {
					goTo(i);
				});
				dotsWrap.appendChild(dot);
				dots.push(dot);
			});
		}
		function goTo(i) {
			index = (i + slides.length) % slides.length;
			track.style.transform = "translateX(-" + index * 100 + "%)";
			dots.forEach(function (d, di) {
				d.classList.toggle("is-active", di === index);
			});
		}
		if (prev) prev.addEventListener("click", function () { goTo(index - 1); });
		if (next) next.addEventListener("click", function () { goTo(index + 1); });
		goTo(0);
		var timer = setInterval(function () { goTo(index + 1); }, 6000);
		carousel.addEventListener("mouseenter", function () { clearInterval(timer); });
	});
})();
