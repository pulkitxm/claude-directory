/* ============================================================
   Primer clone — interactions
   ============================================================ */
(function () {
	"use strict";

	/* ---------- Reveal on scroll ---------- */
	var reveals = document.querySelectorAll(".reveal");
	if ("IntersectionObserver" in window) {
		var revObs = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (e) {
					if (e.isIntersecting) {
						e.target.classList.add("in");
						revObs.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
		);
		reveals.forEach(function (el) {
			revObs.observe(el);
		});
		// Safety net: if the page never scrolls (e.g. full-page screenshot
		// capture), reveal everything that the observer hasn't caught so no
		// content stays invisible.
		window.addEventListener("load", function () {
			setTimeout(function () {
				reveals.forEach(function (el) {
					el.classList.add("in");
				});
			}, 1600);
		});
	} else {
		reveals.forEach(function (el) {
			el.classList.add("in");
		});
	}

	/* ---------- Sticky tab nav: active section tracking + glow ---------- */
	var tabnav = document.getElementById("tabnav");
	var glow = document.getElementById("tabGlow");
	var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
	var sectionIds = tabs.map(function (t) {
		return t.getAttribute("data-target");
	});
	var sections = sectionIds.map(function (id) {
		return document.getElementById(id);
	});
	var pillLabel = document.getElementById("tocPillLabel");

	function setActive(idx) {
		tabs.forEach(function (t, i) {
			t.classList.toggle("active", i === idx);
		});
		if (idx >= 0 && glow && tabs[idx]) {
			var rect = tabs[idx].getBoundingClientRect();
			var parentRect = tabs[idx].parentElement.getBoundingClientRect();
			glow.style.width = rect.width + "px";
			glow.style.left = rect.left - parentRect.left + "px";
			tabnav.classList.add("show-glow");
		} else {
			tabnav.classList.remove("show-glow");
		}
		if (pillLabel && idx >= 0) {
			pillLabel.textContent = tabs[idx].querySelector(".tlabel").textContent;
		}
	}

	// Determine active section via scroll position
	function onScroll() {
		var navH = tabnav ? tabnav.offsetHeight : 0;
		var probe = navH + 24;
		var active = -1;
		for (var i = 0; i < sections.length; i++) {
			var s = sections[i];
			if (!s) continue;
			var r = s.getBoundingClientRect();
			if (r.top <= probe && r.bottom > probe) {
				active = i;
			}
		}
		// if scrolled past last into footer, keep last
		if (active === -1) {
			var last = sections[sections.length - 1];
			if (last && last.getBoundingClientRect().top < probe)
				active = sections.length - 1;
		}
		setActive(active);
	}

	var ticking = false;
	window.addEventListener(
		"scroll",
		function () {
			if (!ticking) {
				window.requestAnimationFrame(function () {
					onScroll();
					ticking = false;
				});
				ticking = true;
			}
		},
		{ passive: true },
	);
	window.addEventListener("resize", onScroll);
	onScroll();

	// smooth scroll with offset for sticky nav
	function scrollToId(id) {
		var el = document.getElementById(id);
		if (!el) return;
		var navH = tabnav ? tabnav.offsetHeight : 0;
		var y = el.getBoundingClientRect().top + window.pageYOffset - navH - 8;
		window.scrollTo({ top: y, behavior: "smooth" });
	}
	document.querySelectorAll('a[href^="#"]').forEach(function (a) {
		a.addEventListener("click", function (e) {
			var id = a.getAttribute("href").slice(1);
			if (id && document.getElementById(id)) {
				e.preventDefault();
				scrollToId(id);
				closeMobileMenu();
			}
		});
	});

	/* ---------- Mobile menu ---------- */
	var menuBtn = document.getElementById("mobileMenuBtn");
	var menu = document.getElementById("mobileMenu");
	var menuClose = document.getElementById("mobileMenuClose");
	function openMobileMenu() {
		if (menu) {
			menu.classList.add("open");
			document.body.style.overflow = "hidden";
		}
	}
	function closeMobileMenu() {
		if (menu) {
			menu.classList.remove("open");
			document.body.style.overflow = "";
		}
	}
	if (menuBtn) menuBtn.addEventListener("click", openMobileMenu);
	if (menuClose) menuClose.addEventListener("click", closeMobileMenu);

	/* ---------- Table of contents "See more" ---------- */
	var seeMore = document.getElementById("seeMore");
	var tocExtra = document.getElementById("tocExtra");
	if (seeMore && tocExtra) {
		seeMore.addEventListener("click", function () {
			var open = tocExtra.classList.toggle("open");
			seeMore.classList.toggle("open", open);
			seeMore.querySelector(".see-more-text").textContent = open
				? "See less"
				: "See more";
		});
	}

	/* ---------- Forms: prevent submit (no backend) ---------- */
	document.querySelectorAll("form[data-no-submit]").forEach(function (f) {
		f.addEventListener("submit", function (e) {
			e.preventDefault();
			var inp = f.querySelector("input");
			var btn = f.querySelector("button");
			if (inp && inp.value) {
				var orig = btn.textContent;
				btn.textContent = "Thanks!";
				inp.value = "";
				setTimeout(function () {
					btn.textContent = orig;
				}, 2000);
			}
		});
	});

	/* ---------- Free-chapters decorative square/circle glyph grid ---------- */
	var deco = document.getElementById("fcDeco");
	if (deco) {
		var cols = 7,
			rows = 4,
			cell = 84,
			pad = 8,
			ns = "http://www.w3.org/2000/svg";
		for (var r = 0; r < rows; r++) {
			for (var c = 0; c < cols; c++) {
				var x = c * cell,
					y = r * cell;
				var opacity = 0.08 + Math.random() * 0.22;
				var g = document.createElementNS(ns, "g");
				g.setAttribute(
					"transform",
					"translate(" + (x + pad) + "," + (y + pad) + ")",
				);
				g.setAttribute("opacity", opacity.toFixed(2));
				var outer = document.createElementNS(ns, "rect");
				outer.setAttribute("width", 64);
				outer.setAttribute("height", 64);
				outer.setAttribute("rx", Math.random() > 0.5 ? 32 : 8);
				outer.setAttribute("fill", "none");
				outer.setAttribute("stroke", "#fff");
				outer.setAttribute("stroke-width", "3");
				var inner = document.createElementNS(ns, "rect");
				inner.setAttribute("x", 20);
				inner.setAttribute("y", 20);
				inner.setAttribute("width", 24);
				inner.setAttribute("height", 24);
				inner.setAttribute("rx", Math.random() > 0.5 ? 12 : 4);
				inner.setAttribute("fill", "#fff");
				g.appendChild(outer);
				g.appendChild(inner);
				deco.appendChild(g);
			}
		}
	}
})();
