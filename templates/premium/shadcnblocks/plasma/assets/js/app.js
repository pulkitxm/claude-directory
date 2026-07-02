// Plasma — shared interactions
(function () {
	"use strict";

	// Theme toggle (boot script in <head> already applied stored/system theme)
	function setTheme(t) {
		document.documentElement.classList.toggle("light", t === "light");
		try {
			localStorage.setItem("plasma-theme", t);
		} catch (e) {}
	}
	document.addEventListener("click", function (e) {
		var tt = e.target.closest("[data-theme-toggle]");
		if (tt) {
			var isLight = document.documentElement.classList.contains("light");
			setTheme(isLight ? "dark" : "light");
		}
	});

	// Promo banner dismiss
	document.addEventListener("click", function (e) {
		if (e.target.closest("[data-promo-close]")) {
			var p = document.querySelector(".promo");
			if (p) p.classList.add("hidden");
		}
	});

	// Nav dropdown (click + hover)
	document.querySelectorAll(".nav-item").forEach(function (item) {
		var trigger = item.querySelector(".nav-trigger");
		if (!trigger) return;
		trigger.addEventListener("click", function (e) {
			e.stopPropagation();
			var wasOpen = item.classList.contains("open");
			document.querySelectorAll(".nav-item.open").forEach(function (i) {
				i.classList.remove("open");
			});
			if (!wasOpen) item.classList.add("open");
		});
		item.addEventListener("mouseenter", function () {
			item.classList.add("open");
		});
		item.addEventListener("mouseleave", function () {
			item.classList.remove("open");
		});
	});
	document.addEventListener("click", function () {
		document.querySelectorAll(".nav-item.open").forEach(function (i) {
			i.classList.remove("open");
		});
	});

	// Mobile menu
	document.addEventListener("click", function (e) {
		if (e.target.closest("[data-mobile-open]"))
			document.querySelector(".mobile-menu").classList.add("open");
		if (e.target.closest("[data-mobile-close]"))
			document.querySelector(".mobile-menu").classList.remove("open");
	});

	// Accordions
	document.querySelectorAll(".accordion-trigger").forEach(function (t) {
		t.addEventListener("click", function () {
			var item = t.closest(".accordion-item");
			var panel = item.querySelector(".accordion-panel");
			var open = item.classList.toggle("open");
			panel.style.maxHeight = open ? panel.scrollHeight + "px" : "0px";
		});
	});

	// Tabs
	document.querySelectorAll("[data-tabs]").forEach(function (group) {
		var triggers = group.querySelectorAll(".tab-trigger");
		triggers.forEach(function (tr) {
			tr.addEventListener("click", function () {
				var id = tr.getAttribute("data-tab");
				triggers.forEach(function (x) {
					x.classList.toggle("active", x === tr);
				});
				group.querySelectorAll(".tab-panel").forEach(function (p) {
					p.classList.toggle("active", p.getAttribute("data-panel") === id);
				});
			});
		});
	});

	// Password eye toggles
	document.querySelectorAll("[data-pw-toggle]").forEach(function (btn) {
		btn.addEventListener("click", function () {
			var input = btn.closest(".field").querySelector("input");
			input.type = input.type === "password" ? "text" : "password";
			btn.classList.toggle("revealed");
		});
	});

	// Copy buttons (docs code blocks)
	document.querySelectorAll("[data-copy]").forEach(function (btn) {
		btn.addEventListener("click", function () {
			var code = btn.closest(".code-block").querySelector("code");
			navigator.clipboard && navigator.clipboard.writeText(code.innerText);
			var prev = btn.getAttribute("aria-label");
			btn.classList.add("copied");
			setTimeout(function () {
				btn.classList.remove("copied");
			}, 1400);
		});
	});

	// Scroll reveal
	var io = new IntersectionObserver(
		function (entries) {
			entries.forEach(function (en) {
				if (en.isIntersecting) {
					en.target.classList.add("in");
					io.unobserve(en.target);
				}
			});
		},
		{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
	);
	var reveals = document.querySelectorAll(".reveal");
	reveals.forEach(function (el) {
		io.observe(el);
	});
	// Fallback: never leave content permanently hidden (e.g. no-scroll, prerender, reduced motion)
	setTimeout(function () {
		reveals.forEach(function (el) {
			el.classList.add("in");
		});
	}, 1200);
})();
