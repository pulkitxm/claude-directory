(function () {
	"use strict";

	function setTheme(theme) {
		var root = document.documentElement;
		root.classList.toggle("dark", theme === "dark");
		localStorage.setItem("theme", theme);
		document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
			button.setAttribute("aria-label", theme === "dark" ? "Use light theme" : "Use dark theme");
		});
	}

	function setMenu(open) {
		var menu = document.querySelector("[data-mobile-menu]");
		var button = document.querySelector("[data-menu-toggle]");
		if (!menu || !button) return;
		menu.classList.toggle("open", open);
		button.setAttribute("aria-expanded", String(open));
		if (open) menu.querySelector("a")?.focus();
	}

	function setCycle(cycle) {
		document.querySelectorAll("[data-pricing-toggle] button").forEach(function (button) {
			button.classList.toggle("active", button.dataset.cycle === cycle);
			button.setAttribute("aria-pressed", String(button.dataset.cycle === cycle));
		});
		document.querySelectorAll("[data-price]").forEach(function (price) {
			var value = price.dataset[cycle];
			if (value != null) price.firstChild.textContent = value;
		});
		document.querySelectorAll("[data-cycle-label]").forEach(function (label) {
			label.textContent = cycle === "yearly" ? "billed yearly" : "billed monthly";
		});
	}

	document.querySelectorAll("[data-menu-toggle]").forEach(function (button) {
		button.setAttribute("aria-expanded", "false");
		button.setAttribute("aria-controls", "mobile-navigation");
	});
	var mobileMenu = document.querySelector("[data-mobile-menu]");
	if (mobileMenu) mobileMenu.id = "mobile-navigation";

	document.querySelectorAll(".faq-item").forEach(function (item, index) {
		var button = item.querySelector(".faq-q");
		var answer = item.querySelector(".faq-a");
		if (!button || !answer) return;
		answer.id = `faq-answer-${index + 1}`;
		button.setAttribute("aria-controls", answer.id);
		button.setAttribute("aria-expanded", "false");
	});

	document.addEventListener("click", function (event) {
		var themeButton = event.target.closest("[data-theme-toggle]");
		if (themeButton) {
			setTheme(document.documentElement.classList.contains("dark") ? "light" : "dark");
			return;
		}
		var menuButton = event.target.closest("[data-menu-toggle]");
		if (menuButton) {
			setMenu(!document.querySelector("[data-mobile-menu]")?.classList.contains("open"));
			return;
		}
		var question = event.target.closest(".faq-q");
		if (question) {
			var item = question.closest(".faq-item");
			var answer = item.querySelector(".faq-a");
			var open = item.classList.toggle("open");
			question.setAttribute("aria-expanded", String(open));
			answer.style.maxHeight = open ? `${answer.scrollHeight}px` : "0";
			return;
		}
		var cycleButton = event.target.closest("[data-pricing-toggle] button");
		if (cycleButton) {
			setCycle(cycleButton.dataset.cycle);
			return;
		}
		if (!event.target.closest("[data-mobile-menu]") && !event.target.closest("[data-menu-toggle]")) setMenu(false);
		if (event.target.closest('a[href="#"]')) event.preventDefault();
	});

	document.addEventListener("keydown", function (event) {
		if (event.key === "Escape") {
			setMenu(false);
			document.querySelector("[data-menu-toggle]")?.focus();
		}
	});

	document.querySelectorAll(".split-left .step").forEach(function (step) {
		step.addEventListener("mouseenter", function () {
			document.querySelectorAll(".split-left .step").forEach(function (item) {
				item.classList.toggle("is-active", item === step);
			});
		});
	});

	document.querySelectorAll("form").forEach(function (form) {
		form.addEventListener("submit", function (event) {
			event.preventDefault();
			var status = form.querySelector("[role=status]") || document.createElement("p");
			status.setAttribute("role", "status");
			status.className = "form-status";
			status.textContent = "Thanks, your request has been received.";
			if (!status.parentElement) form.append(status);
		});
	});

	var reveals = document.querySelectorAll(".reveal");
	if ("IntersectionObserver" in window && reveals.length) {
		var observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (!entry.isIntersecting) return;
				entry.target.classList.add("in");
				observer.unobserve(entry.target);
			});
		}, { threshold: 0, rootMargin: "0px 0px -5% 0px" });
		reveals.forEach(function (reveal) {
			observer.observe(reveal);
		});
		setTimeout(function () {
			reveals.forEach(function (reveal) {
				reveal.classList.add("in");
			});
		}, 1200);
	} else {
		reveals.forEach(function (reveal) {
			reveal.classList.add("in");
		});
	}

	setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
	setCycle("monthly");
})();
