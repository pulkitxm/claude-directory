// oatmeal.js — vanilla-JS reimplementation of the interaction behaviors the
// original Tailwind Plus "Oatmeal" kit drives via the proprietary
// @tailwindplus/elements module (command / commandfor invoker API),
// plus an IntersectionObserver entrance-reveal system. No build step.
(function () {
	"use strict";

	function byId(id) {
		return document.getElementById(id);
	}

	// ---- command / commandfor invoker API --------------------------------
	function handleInvoke(btn) {
		var cmd = btn.getAttribute("command");
		var targetId = btn.getAttribute("commandfor");
		if (!cmd || !targetId) return;
		var target = byId(targetId);
		if (!target) return;

		if (cmd === "show-modal") {
			if (typeof target.showModal === "function") target.showModal();
			else target.setAttribute("open", "");
		} else if (cmd === "close") {
			if (typeof target.close === "function") target.close();
			else target.removeAttribute("open");
		} else if (cmd === "--toggle") {
			// disclosure: toggle hidden on panel + aria-expanded on the button
			var willOpen = target.hasAttribute("hidden");
			if (willOpen) target.removeAttribute("hidden");
			else target.setAttribute("hidden", "");
			btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
		} else if (cmd === "--copy") {
			var text = (target.textContent || "").trim();
			var done = function () {
				btn.classList.add("copied");
				setTimeout(function () {
					btn.classList.remove("copied");
				}, 1500);
			};
			if (navigator.clipboard && navigator.clipboard.writeText) {
				navigator.clipboard.writeText(text).then(done, done);
			} else {
				var ta = document.createElement("textarea");
				ta.value = text;
				document.body.appendChild(ta);
				ta.select();
				try {
					document.execCommand("copy");
				} catch (e) {}
				document.body.removeChild(ta);
				done();
			}
		}
	}

	document.addEventListener("click", function (e) {
		var btn = e.target.closest("[command][commandfor]");
		if (btn) handleInvoke(btn);
	});

	// ---- tab groups (Monthly / Yearly etc.) ------------------------------
	function selectTab(tab) {
		var list = tab.closest('[role="tablist"]') || tab.parentElement;
		if (!list) return;
		var tabs = list.querySelectorAll('[role="tab"]');
		tabs.forEach(function (t) {
			var sel = t === tab;
			t.setAttribute("aria-selected", sel ? "true" : "false");
			t.setAttribute("tabindex", sel ? "0" : "-1");
			var panelId = t.getAttribute("aria-controls");
			var panel = panelId && byId(panelId);
			if (panel) {
				if (sel) panel.removeAttribute("hidden");
				else panel.setAttribute("hidden", "");
			}
		});
	}
	document.addEventListener("click", function (e) {
		var tab = e.target.closest('[role="tab"]');
		if (tab) selectTab(tab);
	});
	document.addEventListener("keydown", function (e) {
		var tab = e.target.closest && e.target.closest('[role="tab"]');
		if (!tab) return;
		if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
			var list = tab.closest('[role="tablist"]');
			var tabs = Array.prototype.slice.call(
				list.querySelectorAll('[role="tab"]'),
			);
			var i = tabs.indexOf(tab);
			var next =
				tabs[
					(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length
				];
			next.focus();
			selectTab(next);
			e.preventDefault();
		}
	});

	// ---- entrance reveal on scroll ---------------------------------------
	function setupReveal() {
		if (!("IntersectionObserver" in window)) return;
		var prefersReduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (prefersReduced) return;
		var targets = document.querySelectorAll("[data-reveal]");
		var io = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (en) {
					if (en.isIntersecting) {
						en.target.classList.add("is-revealed");
						io.unobserve(en.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
		);
		targets.forEach(function (t) {
			io.observe(t);
		});
	}

	// The original Oatmeal kit is static Tailwind HTML with no scroll-driven
	// entrance animation, so reveal is opt-in only: elements that explicitly
	// carry [data-reveal] in the markup are animated, nothing is auto-hidden.
	// This keeps the clone pixel-faithful to the static reference.
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", function () {
			setupReveal();
		});
	} else {
		setupReveal();
	}
})();
