(function () {
	function setThemeClass(theme) {
		document.body.classList.remove("chakra-ui-light", "chakra-ui-dark");
		document.body.classList.add(theme === "light" ? "chakra-ui-light" : "chakra-ui-dark");
	}

	document.addEventListener("DOMContentLoaded", function () {
		var root = document.documentElement;
		setThemeClass(root.getAttribute("data-theme") || "dark");

		// --- Theme toggle ---
		var toggle = document.querySelector('[aria-label="theme toggle"]');
		if (toggle) {
			toggle.addEventListener("click", function () {
				var current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
				var next = current === "light" ? "dark" : "light";
				root.setAttribute("data-theme", next);
				setThemeClass(next);
				try {
					localStorage.setItem("saas-ui-theme", next);
				} catch (e) {}
			});
		}

		// --- Mobile hamburger menu ---
		var burger = document.querySelector('[aria-label="Open menu"]');
		var menuPanel = document.getElementById("mobile-menu");
		if (burger && menuPanel) {
			burger.addEventListener("click", function () {
				var isOpen = menuPanel.classList.toggle("is-open");
				burger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
				burger.classList.toggle("is-open", isOpen);
				document.body.classList.toggle("menu-open", isOpen);
			});
		}

		// --- Copy install command ---
		var copyBtn = document.querySelector('[aria-label="Copy install command"]');
		if (copyBtn) {
			copyBtn.addEventListener("click", function () {
				var code = copyBtn.closest(".code-chip");
				var text = code ? code.querySelector("code").textContent.trim() : "yarn add @saas-ui/react";
				if (navigator.clipboard) {
					navigator.clipboard.writeText(text).catch(function () {});
				}
				copyBtn.classList.add("copied");
				setTimeout(function () {
					copyBtn.classList.remove("copied");
				}, 1500);
			});
		}

		// --- Scroll reveal ---
		var revealEls = document.querySelectorAll("[data-reveal]");
		if ("IntersectionObserver" in window && revealEls.length) {
			var io = new IntersectionObserver(
				function (entries) {
					entries.forEach(function (entry) {
						if (entry.isIntersecting) {
							entry.target.classList.add("is-visible");
							io.unobserve(entry.target);
						}
					});
				},
				{ threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
			);
			revealEls.forEach(function (el) {
				io.observe(el);
			});
		} else {
			revealEls.forEach(function (el) {
				el.classList.add("is-visible");
			});
		}
	});
})();
