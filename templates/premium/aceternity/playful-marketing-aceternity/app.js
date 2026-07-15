(function () {
	"use strict";

	var menuButton = document.getElementById("hamburger");
	var menu = document.getElementById("mobileMenu");
	if (menuButton && menu) {
		menuButton.setAttribute("aria-expanded", String(menu.classList.contains("open")));
		menuButton.setAttribute("aria-controls", "mobileMenu");
		new MutationObserver(function () {
			menuButton.setAttribute("aria-expanded", String(menu.classList.contains("open")));
		}).observe(menu, { attributes: true, attributeFilter: ["class"] });
	}

	document.querySelectorAll(".faq-item").forEach(function (item, index) {
		var button = item.querySelector(".faq-q");
		var answer = item.querySelector(".faq-a");
		if (!button || !answer) return;
		answer.id = `faq-answer-${index + 1}`;
		button.setAttribute("aria-controls", answer.id);
		button.setAttribute("aria-expanded", String(item.classList.contains("open")));
		new MutationObserver(function () {
			button.setAttribute("aria-expanded", String(item.classList.contains("open")));
		}).observe(item, { attributes: true, attributeFilter: ["class"] });
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

	document.addEventListener("keydown", function (event) {
		if (event.key !== "Escape") return;
		menu?.classList.remove("open");
		document.getElementById("tocMobile")?.classList.remove("open");
		menuButton?.focus();
	});
})();
