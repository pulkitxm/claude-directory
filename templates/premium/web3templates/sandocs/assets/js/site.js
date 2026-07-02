(function () {
	"use strict";

	// ---------- theme toggle ----------
	var root = document.documentElement;
	var toggle = document.querySelector(".theme-toggle");
	function currentTheme() {
		return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
	}
	if (toggle) {
		toggle.addEventListener("click", function () {
			var next = currentTheme() === "dark" ? "light" : "dark";
			root.setAttribute("data-theme", next);
			try {
				localStorage.setItem("sandocs-theme", next);
			} catch (e) {}
		});
	}

	// ---------- mobile sidebar drawer ----------
	var menuToggle = document.querySelector(".menu-toggle");
	var sidebar = document.querySelector(".sticky.border-r");
	if (menuToggle && sidebar) {
		menuToggle.addEventListener("click", function () {
			var open = sidebar.classList.toggle("is-open");
			menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
		});
		document.addEventListener("click", function (e) {
			if (
				sidebar.classList.contains("is-open") &&
				!sidebar.contains(e.target) &&
				!menuToggle.contains(e.target)
			) {
				sidebar.classList.remove("is-open");
				menuToggle.setAttribute("aria-expanded", "false");
			}
		});
	}

	// ---------- copy-to-clipboard for the home CLI install pill ----------
	document.querySelectorAll("[data-copy]").forEach(function (el) {
		el.addEventListener("click", function () {
			var text = el.getAttribute("data-copy");
			var pill = el.closest(".copy-pill") || el.parentElement;
			var done = function () {
				if (pill) {
					pill.classList.add("copied");
					setTimeout(function () {
						pill.classList.remove("copied");
					}, 1400);
				}
			};
			if (navigator.clipboard && navigator.clipboard.writeText) {
				navigator.clipboard.writeText(text).then(done, done);
			} else {
				done();
			}
		});
	});

	// ---------- TOC scroll-spy (right "On This Page" rail) ----------
	var tocLinks = Array.prototype.slice.call(document.querySelectorAll("nav.w-64 a[href^='#']"));
	if (tocLinks.length) {
		var targets = tocLinks
			.map(function (a) {
				var id = decodeURIComponent(a.getAttribute("href").slice(1));
				return { link: a, el: document.getElementById(id) };
			})
			.filter(function (t) {
				return !!t.el;
			});

		function onScroll() {
			var y = window.scrollY + 90;
			var active = null;
			targets.forEach(function (t) {
				if (t.el.offsetTop <= y) active = t;
			});
			tocLinks.forEach(function (a) {
				a.classList.remove("is-active");
			});
			if (active) active.link.classList.add("is-active");
		}
		document.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
	}
})();
