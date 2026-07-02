/* Shared site behavior: theme toggle (persisted), mobile drawer, sticky
   header shadow-on-scroll, and FAQ accordion (react-accordion-height port). */
(function () {
	"use strict";

	/* ---------- Theme toggle ---------- */
	function setColorMode(mode) {
		document.body.classList.remove("next-light-theme", "next-dark-theme");
		document.body.classList.add("next-" + mode + "-theme");
		localStorage.setItem("nextColorMode", mode);
		window.colorMode = mode;
	}

	document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
		btn.addEventListener("click", function () {
			var next = window.colorMode === "dark" ? "light" : "dark";
			setColorMode(next);
		});
	});

	/* ---------- Mobile drawer ---------- */
	var drawer = document.querySelector(".my-drawer");
	document.querySelectorAll("[data-drawer-open]").forEach(function (btn) {
		btn.addEventListener("click", function () {
			if (!drawer) return;
			drawer.classList.remove("drawer-closed");
			drawer.classList.add("drawer-opened");
			drawer.setAttribute("aria-hidden", "false");
		});
	});
	document.querySelectorAll("[data-drawer-close]").forEach(function (btn) {
		btn.addEventListener("click", function () {
			if (!drawer) return;
			drawer.classList.remove("drawer-opened");
			drawer.classList.add("drawer-closed");
			drawer.setAttribute("aria-hidden", "true");
		});
	});
	if (drawer) {
		drawer.querySelectorAll("a").forEach(function (a) {
			a.addEventListener("click", function () {
				drawer.classList.remove("drawer-opened");
				drawer.classList.add("drawer-closed");
			});
		});
	}

	/* ---------- Sticky header shadow on scroll ---------- */
	var navbar = document.querySelector(".navbar");
	if (navbar) {
		var lastY = window.scrollY;
		window.addEventListener(
			"scroll",
			function () {
				var y = window.scrollY;
				navbar.style.boxShadow = y > 4 ? "rgba(0,0,0,0.08) 0 2px 6px 0" : "rgba(0,0,0,0.05) 0 1px 2px 0";
				lastY = y;
			},
			{ passive: true }
		);
	}

	/* ---------- FAQ accordion ----------
	   Matches the observed source behavior: each item is a clickable header
	   row; clicking toggles a sibling panel between height:0 and
	   height:auto with a 0.3s height/opacity transition, and rotates the
	   chevron 180deg. Only one panel is open at a time (accordion mode). */
	document.querySelectorAll("[data-accordion]").forEach(function (accordion) {
		var items = accordion.querySelectorAll("[data-accordion-item]");
		items.forEach(function (item) {
			var trigger = item.querySelector("[data-accordion-trigger]");
			var panel = item.querySelector("[data-accordion-panel]");
			var chevron = item.querySelector("[data-accordion-chevron]");
			if (!trigger || !panel) return;
			trigger.addEventListener("click", function () {
				var isOpen = item.classList.contains("is-open");
				items.forEach(function (other) {
					other.classList.remove("is-open");
					var otherPanel = other.querySelector("[data-accordion-panel]");
					var otherChevron = other.querySelector("[data-accordion-chevron]");
					if (otherPanel) otherPanel.style.height = "0px";
					if (otherChevron) otherChevron.style.transform = "rotateZ(0deg)";
				});
				if (!isOpen) {
					item.classList.add("is-open");
					panel.style.height = panel.scrollHeight + "px";
					if (chevron) chevron.style.transform = "rotateZ(180deg)";
				}
			});
		});
	});

})();
