(function () {
	"use strict";

	var root = document.documentElement;
	try {
		var storedTheme = localStorage.getItem("theme");
		if (storedTheme) {
			root.classList.toggle("dark", storedTheme === "dark");
			root.classList.toggle("light", storedTheme !== "dark");
		}
	} catch (error) {}
	root.style.colorScheme = root.classList.contains("dark") ? "dark" : "light";

	document.addEventListener("click", function (event) {
		var closeBanner = event.target.closest('[aria-label="Close banner"]');
		if (closeBanner) {
			var banner = closeBanner.closest(".bg-primary.relative");
			if (banner) banner.style.display = "none";
			return;
		}
		var themeButton = event.target.closest('[aria-label="Toggle theme"]');
		if (themeButton) {
			var dark = !root.classList.contains("dark");
			root.classList.toggle("dark", dark);
			root.classList.toggle("light", !dark);
			root.style.colorScheme = dark ? "dark" : "light";
			try {
				localStorage.setItem("theme", dark ? "dark" : "light");
			} catch (error) {}
			return;
		}
		var copyButton = event.target.closest("button");
		if (copyButton && /copy link/i.test(copyButton.textContent)) {
			var label = copyButton.querySelector("div") || copyButton;
			var previous = label.textContent;
			label.textContent = "Copied";
			try {
				if (navigator.clipboard) {
					navigator.clipboard.writeText(location.href).catch(function () {});
				}
			} catch (error) {}
			setTimeout(function () {
				label.textContent = previous;
			}, 1400);
		}
	});

	var categories = {
		"Echo UI v3": ["featured"],
		JustOS: ["featured"],
		"Happy Stats": ["featured"],
		"Cactus Plant": ["open-source"],
		Stellar: ["personal"],
		Neobase: ["open-source"],
		Charter: ["personal"],
		Echo: ["open-source"],
		Plasma: ["personal"],
		Scalar: ["open-source"],
		Sonic: ["personal"],
		Streamline: ["personal"],
		Relative: ["personal"],
		Bloom: ["personal"],
	};
	var tabList = document.querySelector('[role="tablist"]');
	if (tabList) {
		var tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
		var cards = Array.from(document.querySelectorAll("main ul.grid > li"));
		cards.forEach(function (card) {
			var title = Object.keys(categories).find(function (name) {
				return card.textContent.includes(name);
			});
			card.dataset.categories = title ? categories[title].join(" ") : "";
		});
		tabs.forEach(function (tab) {
			tab.addEventListener("click", function () {
				var filter = tab.textContent.trim().toLowerCase().replaceAll(" ", "-");
				tabs.forEach(function (candidate) {
					var active = candidate === tab;
					candidate.setAttribute("aria-selected", String(active));
					candidate.setAttribute("data-state", active ? "active" : "inactive");
				});
				cards.forEach(function (card) {
					card.hidden =
						filter !== "all" &&
						!card.dataset.categories.split(" ").includes(filter);
				});
			});
		});
	}
})();
