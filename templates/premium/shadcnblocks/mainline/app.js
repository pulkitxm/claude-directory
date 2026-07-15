const buttons = [...document.querySelectorAll("button")];
const buttonNamed = (name) => buttons.find((button) => button.textContent.trim().includes(name));
const themeButton = buttonNamed("Toggle theme");
const menuButton = buttonNamed("Open main menu");
const featuresButton = buttons.find((button) => button.textContent.trim().startsWith("Features") && button.closest("nav[aria-label='Main']"));
const answers = new Map([
	["How do I update my account without breaking my laptop?", "Open your account settings, review the available update, and save your changes. Your work stays safely in place."],
	["Is support free, or do I need to Google everything?", "Support is included for every plan, with priority response times available to paid teams."],
	["Are you going to be subsumed by AI?", "Mainline is built to help people plan and collaborate, with thoughtful automation supporting the work."],
]);

themeButton?.addEventListener("click", () => {
	const dark = !document.documentElement.classList.contains("dark");
	document.documentElement.classList.toggle("dark", dark);
	document.documentElement.classList.toggle("light", !dark);
	document.documentElement.style.colorScheme = dark ? "dark" : "light";
	localStorage.setItem("theme", dark ? "dark" : "light");
});

if (localStorage.getItem("theme") === "dark") themeButton?.click();

menuButton?.addEventListener("click", () => {
	const shell = menuButton.closest("section");
	const panel = shell?.children[1];
	const open = !panel?.classList.contains("mainline-menu-panel");
	panel?.classList.toggle("mainline-menu-panel", open);
	menuButton.setAttribute("aria-expanded", String(open));
});

featuresButton?.addEventListener("click", () => {
	const host = featuresButton.closest("nav")?.querySelector(".absolute.top-full");
	const open = featuresButton.getAttribute("aria-expanded") === "true";
	featuresButton.setAttribute("aria-expanded", String(!open));
	featuresButton.dataset.state = open ? "closed" : "open";
	if (!host) return;
	host.innerHTML = open ? "" : '<div class="mainline-dropdown"><a href="index.html#feature-modern-teams"><strong>Modern product teams</strong><div class="text-muted-foreground text-sm">Focused workflows for successful teams</div></a><a href="index.html#resource-allocation"><strong>Resource allocation</strong><div class="text-muted-foreground text-sm">Plan resources and execution</div></a></div>';
});

for (const button of buttons.filter((item) => item.hasAttribute("aria-controls") && item.closest("[data-orientation='vertical']"))) {
	button.addEventListener("click", () => {
		const open = button.getAttribute("aria-expanded") === "true";
		const region = document.getElementById(button.getAttribute("aria-controls"));
		button.setAttribute("aria-expanded", String(!open));
		button.dataset.state = open ? "closed" : "open";
		button.closest("[data-state]")?.setAttribute("data-state", open ? "closed" : "open");
		if (!region) return;
		region.hidden = open;
		region.dataset.state = open ? "closed" : "open";
		region.innerHTML = open ? "" : `<p class="mainline-answer">${answers.get(button.textContent.trim()) ?? "Everything you need is covered in your workspace and account settings."}</p>`;
	});
}

for (const toggle of document.querySelectorAll("[role='switch']")) {
	toggle.addEventListener("click", () => {
		const annual = toggle.getAttribute("aria-checked") === "true";
		for (const item of document.querySelectorAll("[role='switch']")) {
			item.setAttribute("aria-checked", String(!annual));
			item.dataset.state = annual ? "unchecked" : "checked";
			item.firstElementChild.dataset.state = annual ? "unchecked" : "checked";
			const card = item.closest(".p-6.flex.flex-col");
			const price = card?.querySelector(".text-lg.font-medium");
			const label = item.parentElement?.querySelector(".text-sm.font-medium");
			if (price?.firstChild) price.firstChild.textContent = annual ? "$8 " : "$6 ";
			if (label) label.textContent = annual ? "Billed monthly" : "Billed annually";
		}
	});
}

for (const carousel of document.querySelectorAll("[aria-roledescription='carousel']")) {
	const track = carousel.querySelector(".overflow-hidden > .flex");
	const slides = carousel.querySelectorAll("[aria-roledescription='slide']");
	let index = 0;
	for (const button of carousel.querySelectorAll("button")) {
		if (button.textContent.includes("Next slide")) button.addEventListener("click", () => {
			index = Math.min(index + 1, Math.max(0, slides.length - 1));
			track.style.transform = `translate3d(-${index * 28}%,0,0)`;
		});
		if (button.textContent.includes("Previous slide")) button.addEventListener("click", () => {
			index = Math.max(index - 1, 0);
			track.style.transform = `translate3d(-${index * 28}%,0,0)`;
		});
	}
}

for (const form of document.querySelectorAll("form")) form.addEventListener("submit", (event) => {
	event.preventDefault();
	const submit = form.querySelector("button[type='submit']");
	if (submit) submit.textContent = "Sent";
});
