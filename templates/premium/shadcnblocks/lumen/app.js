const root = document.documentElement;
const applyTheme = (theme) => {
	root.classList.toggle("dark", theme === "dark");
	root.classList.toggle("light", theme !== "dark");
	root.style.colorScheme = theme;
};
const storedTheme = localStorage.getItem("lumen-theme");
if (storedTheme) applyTheme(storedTheme);

const flowHeaders = [...document.querySelectorAll("header.relative")];
const fixedHeaders = [...document.querySelectorAll("header.fixed")];
const promo = document.querySelector("button[aria-label='Close banner']")?.closest(".bg-primary");
if (promo) promo.style.zIndex = "60";
for (const menu of document.querySelectorAll("header .fixed.inset-0.translate-x-full")) menu.style.display = "none";
const updateHeader = () => {
	const compact = window.scrollY > 8;
	document.body.style.setProperty("--header-height", compact ? "calc(var(--spacing) * 18)" : "calc(var(--spacing) * 23)");
	for (const header of fixedHeaders) header.style.top = compact ? "0" : `${promo?.offsetHeight || 0}px`;
	for (const header of flowHeaders) {
		header.classList.toggle("relative", !compact);
		header.classList.toggle("fixed", compact);
		header.classList.toggle("top-0", compact);
		header.classList.toggle("right-0", compact);
		header.classList.toggle("left-0", compact);
	}
};
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

document.addEventListener("click", (event) => {
	const button = event.target.closest("button");
	if (!button) return;
	const label = `${button.getAttribute("aria-label") || ""} ${button.textContent || ""}`;
	if (button.matches("[data-theme-toggle]") || /theme/i.test(label) || button.querySelector(".lucide-sun")) {
		const theme = root.classList.contains("dark") ? "light" : "dark";
		applyTheme(theme);
		localStorage.setItem("lumen-theme", theme);
		return;
	}
	if (button.getAttribute("aria-label") === "Close banner") {
		const banner = button.closest(".bg-primary");
		if (banner) {
			banner.style.gridTemplateRows = "0fr";
			banner.style.maxHeight = "0";
			banner.style.opacity = "0";
			for (const header of fixedHeaders) header.style.top = "0";
		}
		return;
	}
	if (button.querySelector(".sr-only")?.textContent.trim() === "Open main menu") {
		const menu = button.closest("header")?.querySelector(".fixed.inset-0");
		if (menu) {
			const open = menu.classList.contains("translate-x-full");
			menu.style.display = open ? "flex" : "none";
			menu.classList.toggle("-z-10", !open);
			menu.classList.toggle("translate-x-full", !open);
			menu.classList.toggle("opacity-0", !open);
			menu.classList.toggle("pointer-events-none", !open);
			menu.classList.toggle("z-40", open);
			button.setAttribute("aria-expanded", String(open));
		}
		return;
	}
	if (button.getAttribute("role") === "switch") {
		const checked = button.getAttribute("aria-checked") !== "true";
		button.setAttribute("aria-checked", String(checked));
		button.dataset.state = checked ? "checked" : "unchecked";
		const thumb = button.querySelector("[data-slot='switch-thumb']");
		if (thumb) thumb.dataset.state = checked ? "checked" : "unchecked";
		const prices = checked ? ["19", "44"] : ["25", "59"];
		const priceNodes = [...document.querySelectorAll("main *")].filter((element) => element.children.length === 0 && ["19", "25", "44", "59"].includes(element.textContent.trim()));
		for (const [index, element] of priceNodes.slice(0, 2).entries()) element.textContent = prices[index];
		const labels = button.parentElement?.querySelectorAll("span");
		if (labels?.length >= 2) {
			labels[0].classList.toggle("text-foreground", !checked);
			labels[0].classList.toggle("text-muted-foreground/70", checked);
			labels[labels.length - 1].classList.toggle("text-foreground", checked);
			labels[labels.length - 1].classList.toggle("text-muted-foreground/70", !checked);
		}
		return;
	}
	if (button.matches("[data-slot='accordion-trigger']")) {
		const region = document.getElementById(button.getAttribute("aria-controls") || "");
		if (!region) return;
		const open = button.getAttribute("aria-expanded") !== "true";
		const accordion = button.closest("[data-slot='accordion']");
		for (const trigger of accordion?.querySelectorAll("[data-slot='accordion-trigger']") || []) {
			const target = document.getElementById(trigger.getAttribute("aria-controls") || "");
			trigger.setAttribute("aria-expanded", "false");
			trigger.dataset.state = "closed";
			trigger.closest("[data-slot='accordion-item']")?.setAttribute("data-state", "closed");
			if (target) {
				target.hidden = true;
				target.dataset.state = "closed";
			}
		}
		if (open) {
			if (!region.textContent.trim() && /What is Lumen/.test(button.textContent)) region.innerHTML = '<div class="pb-4 text-muted-foreground">Lumen is a task and workflow management platform designed for product teams, developers, and creatives who want to move faster with clarity and control.</div>';
			button.setAttribute("aria-expanded", "true");
			button.dataset.state = "open";
			button.closest("[data-slot='accordion-item']")?.setAttribute("data-state", "open");
			region.hidden = false;
			region.dataset.state = "open";
		}
	}
});

for (const form of document.querySelectorAll("form")) form.addEventListener("submit", (event) => event.preventDefault());
