const menuToggle = document.getElementById("mobile-toggle") ?? document.getElementById("hamburger");
const menu = document.getElementById("mobile-menu");

if (menuToggle && menu) {
	const syncMenu = () => menuToggle.setAttribute("aria-expanded", String(menu.classList.contains("open")));
	menuToggle.setAttribute("aria-controls", "mobile-menu");
	menuToggle.setAttribute("aria-label", "Toggle navigation");
	syncMenu();
	new MutationObserver(syncMenu).observe(menu, { attributes: true, attributeFilter: ["class"] });
	document.addEventListener("keydown", event => {
		if (event.key === "Escape" && menu.classList.contains("open")) {
			menu.classList.remove("open");
			menuToggle.focus();
		}
	});
}

document.querySelectorAll(".faq-item").forEach((item, index) => {
	const question = item.querySelector(".faq-q");
	const answer = item.querySelector(".faq-body");
	if (!question || !answer) return;
	const answerId = `faq-answer-${index + 1}`;
	answer.id = answerId;
	question.setAttribute("role", "button");
	question.setAttribute("tabindex", "0");
	question.setAttribute("aria-controls", answerId);
	const syncQuestion = () => question.setAttribute("aria-expanded", String(item.classList.contains("open")));
	syncQuestion();
	new MutationObserver(syncQuestion).observe(item, { attributes: true, attributeFilter: ["class"] });
	question.addEventListener("keydown", event => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			question.click();
		}
	});
});

document.querySelectorAll(".tab-item").forEach(tab => {
	tab.setAttribute("role", "button");
	tab.setAttribute("tabindex", "0");
	tab.addEventListener("keydown", event => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			tab.click();
		}
	});
});
