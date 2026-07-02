(function () {
	"use strict";

	var root = document.documentElement;
	var themeSwitch = document.getElementById("themeSwitch");

	function isDark() {
		return root.classList.contains("dark-theme");
	}

	function syncSwitch() {
		if (themeSwitch) themeSwitch.setAttribute("aria-pressed", String(isDark()));
	}
	syncSwitch();

	if (themeSwitch) {
		themeSwitch.addEventListener("click", function () {
			var next = isDark() ? "light" : "dark";
			root.classList.remove("light-theme", "dark-theme");
			root.classList.add(next + "-theme");
			try {
				localStorage.setItem("theme", next);
			} catch (e) {}
			syncSwitch();
		});
	}

	// Features dropdown
	var trigger = document.getElementById("featuresTrigger");
	var panel = document.getElementById("featuresPanel");

	function closeDropdown() {
		if (!trigger || !panel) return;
		trigger.setAttribute("aria-expanded", "false");
		panel.classList.remove("open");
	}

	function toggleDropdown() {
		if (!trigger || !panel) return;
		var expanded = trigger.getAttribute("aria-expanded") === "true";
		if (expanded) {
			closeDropdown();
		} else {
			trigger.setAttribute("aria-expanded", "true");
			panel.classList.add("open");
		}
	}

	if (trigger) {
		trigger.addEventListener("click", function (e) {
			e.stopPropagation();
			toggleDropdown();
		});
	}

	document.addEventListener("click", function (e) {
		if (panel && trigger && !panel.contains(e.target) && !trigger.contains(e.target)) {
			closeDropdown();
		}
	});

	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape") closeDropdown();
	});

	// Mobile menu overlay
	var mobileOpen = document.getElementById("mobileOpen");
	var mobileClose = document.getElementById("mobileClose");
	var mobileOverlay = document.getElementById("mobileOverlay");

	function openMobile() {
		if (mobileOverlay) mobileOverlay.classList.add("open");
		if (mobileOpen) mobileOpen.setAttribute("aria-expanded", "true");
		document.body.style.overflow = "hidden";
	}

	function closeMobile() {
		if (mobileOverlay) mobileOverlay.classList.remove("open");
		if (mobileOpen) mobileOpen.setAttribute("aria-expanded", "false");
		document.body.style.overflow = "";
	}

	if (mobileOpen) mobileOpen.addEventListener("click", openMobile);
	if (mobileClose) mobileClose.addEventListener("click", closeMobile);
	if (mobileOverlay) {
		mobileOverlay.querySelectorAll("a").forEach(function (a) {
			a.addEventListener("click", closeMobile);
		});
	}
})();
