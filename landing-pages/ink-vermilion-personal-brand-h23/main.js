(function () {
	"use strict";

	// ---- Mobile menu ----
	var toggle = document.querySelector(".menu-toggle");
	var menu = document.getElementById("mobileMenu");
	if (toggle && menu) {
		toggle.addEventListener("click", function () {
			var open = menu.classList.toggle("open");
			toggle.setAttribute("aria-expanded", open ? "true" : "false");
		});
		menu.querySelectorAll("a").forEach(function (a) {
			a.addEventListener("click", function () {
				menu.classList.remove("open");
				toggle.setAttribute("aria-expanded", "false");
			});
		});
	}

	// ---- Scroll reveal ----
	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	var els = document.querySelectorAll(".reveal");
	if (reduce || !("IntersectionObserver" in window)) {
		els.forEach(function (el) {
			el.classList.add("visible");
		});
	} else {
		var io = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (e, i) {
					if (e.isIntersecting) {
						var t = e.target;
						setTimeout(
							function () {
								t.classList.add("visible");
							},
							(i % 4) * 80,
						);
						io.unobserve(t);
					}
				});
			},
			{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
		);
		els.forEach(function (el) {
			io.observe(el);
		});
	}

	// ---- Form fake-submit ----
	function wireForm(form, opts) {
		if (!form) return;
		form.addEventListener("submit", function (ev) {
			ev.preventDefault();
			var btn = form.querySelector("button[type=submit], button:not([type])");
			if (!btn) btn = form.querySelector("button");
			var def = btn.getAttribute("data-default") || btn.textContent;
			btn.disabled = true;
			btn.textContent = opts.sending;
			setTimeout(function () {
				btn.textContent = opts.done;
				if (opts.note) {
					var note = form.querySelector(".contact-note");
					if (note) note.hidden = false;
				}
				form.querySelectorAll("input").forEach(function (i) {
					i.value = "";
				});
				setTimeout(function () {
					btn.disabled = false;
					btn.textContent = def;
				}, 2600);
			}, 700);
		});
	}
	wireForm(document.getElementById("heroForm"), {
		sending: "Sending…",
		done: "Thank you ✓",
		note: true,
	});
	wireForm(document.getElementById("newsForm"), {
		sending: "…",
		done: "Subscribed ✓",
	});
})();
