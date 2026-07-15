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

	function alignArticles() {
		document.querySelectorAll("article").forEach(function (article) {
			article.style.paddingBottom = "0px";
			article.querySelectorAll("img").forEach(function (image) {
				if (image.naturalWidth && image.naturalHeight) {
					const ratio = image.naturalHeight / image.naturalWidth + 0.00051;
					image.style.height = image.getBoundingClientRect().width * ratio + "px";
				}
			});
			const content = article.firstElementChild;
			if (!content) return;
			const remainder = content.getBoundingClientRect().height % 8;
			article.style.paddingBottom = (8 - remainder) + "px";
		});
	}

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

	const form = document.querySelector("[data-signup]");
	if (form) {
		form.addEventListener("submit", function (e) {
			e.preventDefault();
			const input = form.querySelector('input[type="email"]');
			if (input && input.value) {
				input.value = "";
				input.blur();
			}
		});
	}

	updateLabel();
	alignArticles();
	document.fonts.ready.then(alignArticles);
	document.querySelectorAll("article img").forEach(function (image) {
		image.addEventListener("load", alignArticles, { once: true });
	});
	window.addEventListener("resize", alignArticles);
})();
