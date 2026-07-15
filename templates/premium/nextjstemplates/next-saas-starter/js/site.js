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
		document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
			btn.setAttribute("aria-label", mode === "dark" ? "Switch to light theme" : "Switch to dark theme");
			btn.setAttribute("aria-pressed", String(mode === "dark"));
		});
	}

	document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
		btn.setAttribute("aria-label", window.colorMode === "dark" ? "Switch to light theme" : "Switch to dark theme");
		btn.setAttribute("aria-pressed", String(window.colorMode === "dark"));
		btn.addEventListener("click", function () {
			var next = window.colorMode === "dark" ? "light" : "dark";
			setColorMode(next);
		});
	});

	/* ---------- Mobile drawer ---------- */
	var drawer = document.querySelector(".my-drawer");
	var drawerOpeners = document.querySelectorAll("[data-drawer-open]");
	var lastDrawerTrigger = null;
	function closeDrawer() {
		if (!drawer) return;
		drawer.classList.remove("drawer-opened");
		drawer.classList.add("drawer-closed");
		drawer.setAttribute("aria-hidden", "true");
		document.body.classList.remove("drawer-lock");
		drawerOpeners.forEach(function (btn) {
			btn.setAttribute("aria-expanded", "false");
		});
		if (lastDrawerTrigger) lastDrawerTrigger.focus();
	}
	drawerOpeners.forEach(function (btn) {
		btn.setAttribute("aria-controls", drawer ? drawer.id : "mobile-drawer");
		btn.setAttribute("aria-expanded", "false");
		btn.addEventListener("click", function () {
			if (!drawer) return;
			lastDrawerTrigger = btn;
			drawer.classList.remove("drawer-closed");
			drawer.classList.add("drawer-opened");
			drawer.setAttribute("aria-hidden", "false");
			document.body.classList.add("drawer-lock");
			btn.setAttribute("aria-expanded", "true");
			var closeButton = drawer.querySelector("[data-drawer-close]");
			if (closeButton) closeButton.focus();
		});
	});
	document.querySelectorAll("[data-drawer-close]").forEach(function (btn) {
		btn.addEventListener("click", closeDrawer);
	});
	if (drawer) {
		drawer.querySelectorAll("a").forEach(function (a) {
			a.addEventListener("click", closeDrawer);
		});
	}
	document.addEventListener("keydown", function (event) {
		if (event.key === "Escape" && drawer && drawer.classList.contains("drawer-opened")) closeDrawer();
	});

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
		items.forEach(function (item, index) {
			var trigger = item.querySelector("[data-accordion-trigger]");
			var panel = item.querySelector("[data-accordion-panel]");
			var chevron = item.querySelector("[data-accordion-chevron]");
			if (!trigger || !panel) return;
			var panelId = "faq-panel-" + index;
			panel.id = panelId;
			trigger.setAttribute("role", "button");
			trigger.setAttribute("tabindex", "0");
			trigger.setAttribute("aria-controls", panelId);
			trigger.setAttribute("aria-expanded", "false");
			function toggleItem() {
				var isOpen = item.classList.contains("is-open");
				items.forEach(function (other) {
					other.classList.remove("is-open");
					var otherPanel = other.querySelector("[data-accordion-panel]");
					var otherTrigger = other.querySelector("[data-accordion-trigger]");
					var otherChevron = other.querySelector("[data-accordion-chevron]");
					if (otherPanel) otherPanel.style.height = "0px";
					if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
					if (otherChevron) otherChevron.style.transform = "rotateZ(0deg)";
				});
				if (!isOpen) {
					item.classList.add("is-open");
					panel.style.height = panel.scrollHeight + "px";
					trigger.setAttribute("aria-expanded", "true");
					if (chevron) chevron.style.transform = "rotateZ(180deg)";
				}
			}
			trigger.addEventListener("click", toggleItem);
			trigger.addEventListener("keydown", function (event) {
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					toggleItem();
				}
			});
		});
	});

	document.querySelectorAll("[data-contact-form]").forEach(function (form) {
		form.addEventListener("submit", function (event) {
			event.preventDefault();
			if (!form.checkValidity()) {
				form.reportValidity();
				return;
			}
			var status = form.querySelector("[data-form-status]");
			if (!status) {
				status = document.createElement("p");
				status.setAttribute("data-form-status", "");
				status.setAttribute("role", "status");
				form.appendChild(status);
			}
			status.textContent = "Thanks, your message is ready to send.";
			form.reset();
		});
	});

})();
