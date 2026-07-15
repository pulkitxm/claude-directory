const root = document.documentElement;

for (const button of document.querySelectorAll('[data-theme-toggle="true"]')) {
	button.addEventListener("click", () => {
		const dark = !root.classList.contains("dark");
		root.classList.toggle("dark", dark);
		root.classList.toggle("light", !dark);
		root.style.colorScheme = dark ? "dark" : "light";
		localStorage.setItem("sonic-theme", dark ? "dark" : "light");
	});
}

const closeBanner = document.querySelector('button[aria-label="Close banner"]');
closeBanner?.addEventListener("click", () => closeBanner.parentElement.parentElement.remove());

const menuButton = [...document.querySelectorAll("button")].find((button) =>
	button.textContent.includes("Open main menu"),
);
const mobileMenu = menuButton?.closest("header")?.querySelector("div.fixed.inset-x-0");

const setMenu = (open) => {
	if (!mobileMenu || !menuButton) return;
	mobileMenu.classList.toggle("invisible", !open);
	const backdrop = mobileMenu.firstElementChild;
	const panel = mobileMenu.querySelector("nav");
	backdrop.classList.toggle("opacity-0", !open);
	backdrop.classList.toggle("opacity-100", open);
	panel.classList.toggle("translate-x-full", !open);
	panel.classList.toggle("opacity-0", !open);
	panel.classList.toggle("translate-x-0", open);
	panel.classList.toggle("opacity-100", open);
	menuButton.setAttribute("aria-expanded", String(open));
	document.body.style.overflow = open ? "hidden" : "";
	const bars = menuButton.querySelectorAll("div > span");
	bars[0]?.classList.toggle("rotate-45", open);
	bars[0]?.classList.toggle("translate-y-0", open);
	bars[1]?.classList.toggle("-rotate-45", open);
	bars[1]?.classList.toggle("translate-y-0", open);
};

menuButton?.addEventListener("click", () =>
	setMenu(menuButton.getAttribute("aria-expanded") !== "true"),
);
mobileMenu?.firstElementChild.addEventListener("click", () => setMenu(false));
for (const link of mobileMenu?.querySelectorAll("a") || []) {
	link.addEventListener("click", () => setMenu(false));
}
document.addEventListener("keydown", (event) => {
	if (event.key === "Escape") setMenu(false);
});

const answers = {
	"What makes your speakers stand out?":
		"Our speakers deliver premium sound quality, sleek design, and long-lasting durability, ensuring an unmatched listening experience.",
	"Are your speakers compatible with all devices?":
		"Yes, our speakers connect seamlessly with phones, tablets, laptops, televisions, and other Bluetooth-enabled devices.",
	"How long does the battery last?":
		"A full charge provides all-day listening, with up to 24 hours of playback depending on volume and usage.",
	"Are the speakers waterproof?":
		"Our portable speakers are water resistant and built to handle splashes, making them ready for everyday indoor and outdoor use.",
	"Do you offer a warranty?":
		"Yes, every Sonic speaker includes a limited warranty covering manufacturing defects and dedicated product support.",
};

const accordionButtons = document.querySelectorAll(
	'button[data-slot="accordion-trigger"]',
);

const updateAccordion = (button, open) => {
	const item = button.closest('[data-slot="accordion-item"]');
	const heading = button.parentElement;
	const content = document.getElementById(button.getAttribute("aria-controls"));
	button.setAttribute("aria-expanded", String(open));
	button.setAttribute("aria-disabled", String(open));
	button.dataset.state = open ? "open" : "closed";
	item.dataset.state = open ? "open" : "closed";
	heading.dataset.state = open ? "open" : "closed";
	content.dataset.state = open ? "open" : "closed";
	content.hidden = !open;
	content.innerHTML = open
		? `<div class="pt-0 pb-4 text-base md:pb-6">${answers[button.textContent.trim()]}</div>`
		: "";
};

for (const button of accordionButtons) {
	button.addEventListener("click", () => {
		if (button.getAttribute("aria-expanded") === "true") return;
		for (const current of accordionButtons) updateAccordion(current, current === button);
	});
}

for (const checkbox of document.querySelectorAll('button[role="checkbox"]')) {
	checkbox.addEventListener("click", () => {
		const checked = checkbox.getAttribute("aria-checked") !== "true";
		checkbox.setAttribute("aria-checked", String(checked));
		checkbox.dataset.state = checked ? "checked" : "unchecked";
		const input = checkbox.nextElementSibling;
		if (input instanceof HTMLInputElement) input.checked = checked;
	});
}

for (const form of document.querySelectorAll("form")) {
	form.addEventListener("submit", (event) => event.preventDefault());
}
