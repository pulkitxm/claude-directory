// Commit changelog template — vanilla-JS shim reproducing the next-themes
// behaviour (theme toggle + persistence) and the decorative signup form.
(function () {
	"use strict";

	const root = document.documentElement;

	function resolvedTheme() {
		return root.classList.contains("dark") ? "dark" : "light";
	}

	function applyTheme(theme) {
		root.classList.remove("light", "dark");
		root.classList.add(theme);
		root.style.colorScheme = theme;
		updateLabel();
	}

	function updateLabel() {
		const label = document.querySelector("[data-theme-label]");
		if (label) {
			const next = resolvedTheme() === "dark" ? "light" : "dark";
			label.textContent = "Switch to " + next + " theme";
		}
	}

	// Theme toggle button: flip light/dark, persist to localStorage["theme"].
	const toggle = document.querySelector("[data-theme-toggle]");
	if (toggle) {
		toggle.addEventListener("click", function () {
			const next = resolvedTheme() === "dark" ? "light" : "dark";
			applyTheme(next);
			try {
				localStorage.setItem("theme", next);
			} catch (e) {}
		});
	}

	// Keep in sync with the OS preference while in "system" mode.
	const mq = window.matchMedia("(prefers-color-scheme: dark)");
	mq.addEventListener("change", function (e) {
		let stored;
		try {
			stored = localStorage.getItem("theme");
		} catch (err) {
			stored = null;
		}
		if (!stored || stored === "system") {
			applyTheme(e.matches ? "dark" : "light");
		}
	});

	// Decorative email-signup form (no backend) — just acknowledge submission.
	const form = document.querySelector("[data-signup]");
	if (form) {
		form.addEventListener("submit", function (e) {
			e.preventDefault();
			const input = form.querySelector('input[type="email"]');
			if (input && input.value) {
				input.value = "";
				input.placeholder = "Thanks — you're on the list!";
				input.blur();
			}
		});
	}

	updateLabel();
})();
