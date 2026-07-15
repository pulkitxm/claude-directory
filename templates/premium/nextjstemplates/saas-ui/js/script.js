(function () {
	function setThemeClass(theme) {
		document.body.classList.remove("chakra-ui-light", "chakra-ui-dark");
		document.body.classList.add(theme === "light" ? "chakra-ui-light" : "chakra-ui-dark");
	}

	document.addEventListener("DOMContentLoaded", function () {
		var root = document.documentElement;
		setThemeClass(root.getAttribute("data-theme") || "dark");

		var toggle = document.querySelector('[aria-label="theme toggle"]');
		if (toggle) {
			toggle.addEventListener("click", function () {
				var current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
				var next = current === "light" ? "dark" : "light";
				root.setAttribute("data-theme", next);
				setThemeClass(next);
				try {
					localStorage.setItem("saas-ui-theme", next);
				} catch (error) {}
			});
		}

		var burger = document.querySelector(".hamburger");
		var menuPanel = document.getElementById("mobile-menu");
		function closeMenu() {
			if (!burger || !menuPanel) return;
			menuPanel.classList.remove("is-open");
			burger.classList.remove("is-open");
			burger.setAttribute("aria-expanded", "false");
			burger.setAttribute("aria-label", "Open menu");
			document.body.classList.remove("menu-open");
		}
		if (burger && menuPanel) {
			burger.setAttribute("aria-controls", menuPanel.id);
			burger.setAttribute("aria-expanded", "false");
			burger.addEventListener("click", function () {
				var isOpen = menuPanel.classList.toggle("is-open");
				burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
				burger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
				burger.classList.toggle("is-open", isOpen);
				document.body.classList.toggle("menu-open", isOpen);
			});
			menuPanel.querySelectorAll("a").forEach(function (link) {
				link.addEventListener("click", closeMenu);
			});
			document.addEventListener("click", function (event) {
				if (!menuPanel.contains(event.target) && !burger.contains(event.target)) closeMenu();
			});
			document.addEventListener("keydown", function (event) {
				if (event.key === "Escape" && menuPanel.classList.contains("is-open")) {
					closeMenu();
					burger.focus();
				}
			});
		}

		var copyBtn = document.querySelector('[aria-label="Copy install command"]');
		if (copyBtn) {
			copyBtn.addEventListener("click", function () {
				var code = copyBtn.closest(".code-chip");
				var value = code ? code.querySelector("code").textContent.trim() : "yarn add @saas-ui/react";
				if (navigator.clipboard) navigator.clipboard.writeText(value).catch(function () {});
				copyBtn.classList.add("copied");
				copyBtn.setAttribute("aria-label", "Install command copied");
				setTimeout(function () {
					copyBtn.classList.remove("copied");
					copyBtn.setAttribute("aria-label", "Copy install command");
				}, 1500);
			});
		}

		document.querySelectorAll("[data-auth-form]").forEach(function (form) {
			form.querySelectorAll(".auth-provider-btn").forEach(function (button) {
				button.addEventListener("click", function () {
					var status = form.querySelector(".auth-status");
					if (status) status.textContent = "Provider sign-in is available in the full application.";
				});
			});
			form.addEventListener("submit", function (event) {
				event.preventDefault();
				var status = form.querySelector(".auth-status");
				if (status) status.textContent = "Demo submitted successfully.";
			});
		});

		var revealEls = document.querySelectorAll("[data-reveal]");
		if ("IntersectionObserver" in window && revealEls.length) {
			var observer = new IntersectionObserver(
				function (entries) {
					entries.forEach(function (entry) {
						if (entry.isIntersecting) {
							entry.target.classList.add("is-visible");
							observer.unobserve(entry.target);
						}
					});
				},
				{ threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
			);
			revealEls.forEach(function (element) {
				observer.observe(element);
			});
		} else {
			revealEls.forEach(function (element) {
				element.classList.add("is-visible");
			});
		}
	});
})();
