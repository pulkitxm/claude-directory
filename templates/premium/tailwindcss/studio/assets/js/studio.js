/* Studio clone — vanilla-JS shim reproducing the Framer-Motion / Headless-UI behaviours
   of the Tailwind Plus "Studio" template:
     1. Header nav flyout: hamburger expands a black panel (height 0.5rem -> full),
        pushing the white page sheet down; the icon morphs hamburger <-> X.
     2. FadeIn scroll-reveal: elements rendered with
        style="opacity:0;transform:translateY(24px)" fade up into view, staggered. */
(function () {
	"use strict";

	function initNav() {
		var toggle = document.querySelector(
			'button[aria-controls][aria-label="Toggle navigation"]',
		);
		if (!toggle) return;
		var panel = document.getElementById(toggle.getAttribute("aria-controls"));
		if (!panel) return;

		var COLLAPSED = "0.5rem";
		var open = false;
		var icon = toggle.querySelector("svg");
		var hamburgerHTML = icon ? icon.innerHTML : "";
		var closeHTML =
			'<path d="M5.636 4.223 4.222 5.637 10.586 12l-6.364 6.363 1.414 1.415L12 13.414l6.364 6.364 1.414-1.415L13.414 12l6.364-6.363-1.414-1.414L12 10.586 5.636 4.223Z"></path>';

		panel.style.transition = "height .5s cubic-bezier(.165,.84,.44,1)";
		panel.style.height = COLLAPSED;

		function fullHeight() {
			var prev = panel.style.height;
			panel.style.height = "auto";
			var h = panel.scrollHeight;
			panel.style.height = prev;
			return h + "px";
		}
		function setOpen() {
			open = true;
			panel.removeAttribute("inert");
			panel.setAttribute("aria-hidden", "false");
			toggle.setAttribute("aria-expanded", "true");
			if (icon) icon.innerHTML = closeHTML;
			panel.style.height = fullHeight();
			panel.addEventListener("transitionend", function te(e) {
				if (e.propertyName === "height" && open) panel.style.height = "auto";
				panel.removeEventListener("transitionend", te);
			});
		}
		function setClosed() {
			open = false;
			panel.style.height = panel.scrollHeight + "px";
			void panel.offsetHeight;
			panel.style.height = COLLAPSED;
			toggle.setAttribute("aria-expanded", "false");
			if (icon) icon.innerHTML = hamburgerHTML;
			window.setTimeout(function () {
				if (!open) {
					panel.setAttribute("inert", "");
					panel.setAttribute("aria-hidden", "true");
				}
			}, 520);
		}

		// The X-close button(s) inside the panel.
		panel
			.querySelectorAll('button[aria-label="Toggle navigation"]')
			.forEach(function (b) {
				if (b === toggle) return;
				b.addEventListener("click", setClosed);
				var s = b.querySelector("svg");
				if (s) s.innerHTML = closeHTML;
			});

		toggle.addEventListener("click", function () {
			open ? setClosed() : setOpen();
		});
		window.addEventListener("resize", function () {
			if (open) panel.style.height = "auto";
		});
		document.addEventListener("keydown", function (e) {
			if (e.key === "Escape" && open) setClosed();
		});
	}

	function initFadeIn() {
		var nodes = Array.prototype.slice.call(
			document.querySelectorAll(
				'[style*="opacity:0"][style*="translateY"], [style*="opacity: 0"][style*="translateY"]',
			),
		);
		if (!nodes.length) return;
		var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		nodes.forEach(function (el) {
			el.style.transition = reduce
				? "none"
				: "opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1)";
			el.style.willChange = "opacity, transform";
		});
		function reveal(el) {
			el.style.opacity = "1";
			el.style.transform = "none";
		}
		if (reduce || !("IntersectionObserver" in window)) {
			nodes.forEach(reveal);
			return;
		}
		var io = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (!entry.isIntersecting) return;
					var el = entry.target;
					var sibs = Array.prototype.slice
						.call(el.parentNode ? el.parentNode.children : [el])
						.filter(function (c) {
							return nodes.indexOf(c) !== -1;
						});
					var idx = Math.max(0, sibs.indexOf(el));
					window.setTimeout(function () {
						reveal(el);
					}, Math.min(idx, 8) * 90);
					io.unobserve(el);
				});
			},
			{ rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
		);
		nodes.forEach(function (el) {
			io.observe(el);
		});
		// Reveal above-the-fold content immediately so the resting state is correct.
		window.setTimeout(function () {
			nodes.forEach(function (el) {
				var r = el.getBoundingClientRect();
				if (r.top < window.innerHeight && el.style.opacity === "0") reveal(el);
			});
		}, 200);
		// Safety net: any element still hidden after a beat (e.g. a non-scrolling
		// full-page capture, or a layout where IO never fires) is force-revealed so
		// nothing is ever permanently invisible. The on-scroll entrance still plays
		// for elements that intersect before this fires.
		window.setTimeout(function () {
			nodes.forEach(function (el) {
				if (el.style.opacity === "0") reveal(el);
			});
		}, 1600);
	}

	function init() {
		initNav();
		initFadeIn();
	}
	if (document.readyState === "loading")
		document.addEventListener("DOMContentLoaded", init);
	else init();
})();
