const buttons = [...document.querySelectorAll("button")];
const buttonNamed = (name) => buttons.find((button) => button.textContent.trim().includes(name));
const themeButton = buttonNamed("Toggle theme");
const menuButton = buttons.find((button) => button.getAttribute("aria-label") === "Toggle main menu");

themeButton?.addEventListener("click", () => {
	const dark = !document.documentElement.classList.contains("dark");
	document.documentElement.classList.toggle("dark", dark);
	document.documentElement.classList.toggle("light", !dark);
	document.documentElement.style.colorScheme = dark ? "dark" : "light";
	localStorage.setItem("metafi-theme", dark ? "dark" : "light");
});

if (localStorage.getItem("metafi-theme") === "dark") themeButton?.click();

menuButton?.addEventListener("click", () => {
	const open = menuButton.getAttribute("aria-expanded") !== "true";
	const panel = menuButton.closest("header")?.children[1]?.firstElementChild;
	const nav = panel?.querySelector("nav");
	menuButton.setAttribute("aria-expanded", String(open));
	if (panel) {
		panel.setAttribute("aria-hidden", String(!open));
		panel.style.height = open ? `${panel.scrollHeight}px` : "0px";
	}
	if (nav) {
		nav.classList.toggle("translate-y-2", !open);
		nav.classList.toggle("opacity-0", !open);
	}
});

for (const button of buttons.filter((item) => item.hasAttribute("aria-controls"))) {
	button.addEventListener("click", () => {
		const open = button.getAttribute("aria-expanded") !== "true";
		const region = document.getElementById(button.getAttribute("aria-controls"));
		for (const peer of buttons.filter((item) => item !== button && item.hasAttribute("aria-controls"))) {
			const peerRegion = document.getElementById(peer.getAttribute("aria-controls"));
			peer.setAttribute("aria-expanded", "false");
			if (peerRegion) {
				peerRegion.setAttribute("aria-hidden", "true");
				peerRegion.style.height = "0px";
			}
		}
		button.setAttribute("aria-expanded", String(open));
		if (region) {
			region.setAttribute("aria-hidden", String(!open));
			region.style.height = open ? `${region.scrollHeight}px` : "0px";
		}
	});
}

for (const toggle of document.querySelectorAll("[role='switch']")) {
	toggle.addEventListener("click", () => {
		const yearly = toggle.getAttribute("aria-checked") === "true";
		toggle.setAttribute("aria-checked", String(!yearly));
		toggle.dataset.state = yearly ? "unchecked" : "checked";
		if (toggle.firstElementChild) toggle.firstElementChild.dataset.state = yearly ? "unchecked" : "checked";
		const checkbox = toggle.nextElementSibling;
		if (checkbox instanceof HTMLInputElement) checkbox.checked = !yearly;
		for (const node of document.querySelectorAll("main div")) {
			if (node.childNodes.length === 1 && node.textContent.trim() === (yearly ? "$15.99" : "$22.99")) node.textContent = yearly ? "$22.99" : "$15.99";
			if (node.childNodes.length === 1 && node.textContent.trim() === (yearly ? "Per user / billed yearly" : "Per user / billed monthly")) node.textContent = yearly ? "Per user / billed monthly" : "Per user / billed yearly";
		}
	});
}

for (const button of buttons.filter((item) => item.getAttribute("aria-label") === "Show password")) {
	button.addEventListener("click", () => {
		const input = button.parentElement?.querySelector("input");
		if (input) input.type = input.type === "password" ? "text" : "password";
	});
}

for (const form of document.querySelectorAll("form")) {
	form.addEventListener("submit", (event) => {
		event.preventDefault();
		const submit = form.querySelector("button[type='submit']");
		if (submit) submit.textContent = "Submitted";
	});
}
