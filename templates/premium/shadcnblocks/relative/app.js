const byText = (selector, value) =>
	[...document.querySelectorAll(selector)].find(
		(element) => element.textContent.trim() === value,
	);

const themeButton = [...document.querySelectorAll("button")].find((button) =>
	button.textContent.includes("Toggle theme"),
);

themeButton?.addEventListener("click", () => {
	const dark = !document.documentElement.classList.contains("dark");
	document.documentElement.classList.toggle("dark", dark);
	document.documentElement.classList.toggle("light", !dark);
	document.documentElement.style.colorScheme = dark ? "dark" : "light";
	localStorage.setItem("theme", dark ? "dark" : "light");
});

const closeBanner = document.querySelector('button[aria-label="Close banner"]');
closeBanner?.addEventListener("click", () => closeBanner.parentElement.parentElement.remove());

const menuButton = [...document.querySelectorAll("button")].find((button) =>
	button.textContent.includes("Open main menu"),
);
const mobileMenu = menuButton?.closest("header")?.lastElementChild;

menuButton?.addEventListener("click", () => {
	const open = mobileMenu.classList.contains("invisible");
	mobileMenu.classList.toggle("invisible", !open);
	mobileMenu.classList.toggle("translate-x-full", !open);
	mobileMenu.classList.toggle("opacity-0", !open);
	mobileMenu.classList.toggle("visible", open);
	mobileMenu.classList.toggle("translate-x-0", open);
	mobileMenu.classList.toggle("opacity-100", open);
	menuButton.setAttribute("aria-expanded", String(open));
	document.body.style.overflow = open ? "hidden" : "";
	const bars = menuButton.querySelectorAll("div > span");
	bars[0]?.classList.toggle("rotate-45", open);
	bars[0]?.classList.toggle("translate-y-0", open);
	bars[1]?.classList.toggle("opacity-0", open);
	bars[2]?.classList.toggle("-rotate-45", open);
	bars[2]?.classList.toggle("translate-y-0", open);
});

const featureItems = [
	["Smart Productivity", "Boost your productivity with AI-powered insights", "#smart-productivity"],
	["Adaptive Workflows", "Customize and automate your work processes", "#adaptive-workflows"],
	["Optimized Scheduling", "Intelligent time management and scheduling", "#optimized-scheduling"],
	["Accelerate Planning", "Strategic planning tools for faster execution", "#accelerate-planning"],
];

const desktopFeatures = [...document.querySelectorAll("nav button")].find(
	(button) => button.textContent.trim() === "Features" && button.hasAttribute("aria-expanded"),
);

desktopFeatures?.addEventListener("click", () => {
	const open = desktopFeatures.getAttribute("aria-expanded") !== "true";
	desktopFeatures.setAttribute("aria-expanded", String(open));
	desktopFeatures.dataset.state = open ? "open" : "closed";
	const viewport = desktopFeatures.closest("nav").lastElementChild;
	viewport.innerHTML = open
		? `<div data-state="open" data-orientation="horizontal" class="origin-top-center bg-popover text-popover-foreground relative mt-1.5 w-full overflow-hidden rounded-md border shadow md:w-auto"><div data-state="open" data-orientation="horizontal"><ul class="w-[400px] p-4">${featureItems.map(([title, description, hash]) => `<li><a class="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex items-center gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none" href="/index.html${hash}"><div><div class="text-sm leading-none font-medium">${title}</div><p class="text-muted-foreground line-clamp-2 text-sm leading-snug">${description}</p></div></a></li>`).join("")}</ul></div></div>`
		: "";
});

const mobileFeatures = mobileMenu
	? [...mobileMenu.querySelectorAll("button")].find(
			(button) => button.textContent.trim() === "Features",
		)
	: null;

mobileFeatures?.addEventListener("click", () => {
	const content = mobileFeatures.nextElementSibling;
	const open = content.classList.contains("max-h-0");
	content.classList.toggle("max-h-0", !open);
	content.classList.toggle("opacity-0", !open);
	content.classList.toggle("max-h-[500px]", open);
	content.classList.toggle("opacity-100", open);
	mobileFeatures.querySelector("svg")?.classList.toggle("rotate-90", open);
});

const answers = {
	"Is there a free version?": "Yes, we offer a free plan with essential features to help you get started. You can upgrade anytime for more advanced tools and capabilities.",
	"What apps can I integrate?": "You can connect popular tools including Google Calendar, Slack, Trello, Notion, and many more productivity apps.",
	"How does the AI work?": "The AI analyzes your tasks, calendar, and working habits to recommend priorities, schedule focused time, and surface useful productivity insights.",
	"Can I use this with a team?": "Yes. Shared dashboards, real-time collaboration, team analytics, and role-based access keep everyone aligned.",
	"Is my data safe?": "Your data is encrypted in transit and at rest, with modern security practices protecting your information.",
	"How do I manage my subscription?": "Manage your plan from account settings, where you can upgrade, downgrade, or cancel at any time.",
};

for (const button of document.querySelectorAll('button[aria-controls][data-orientation="vertical"]')) {
	button.addEventListener("click", () => {
		const item = button.closest('div[data-orientation="vertical"]');
		const content = document.getElementById(button.getAttribute("aria-controls"));
		const open = button.getAttribute("aria-expanded") !== "true";
		button.setAttribute("aria-expanded", String(open));
		button.dataset.state = open ? "open" : "closed";
		item.dataset.state = open ? "open" : "closed";
		item.querySelector("h3").dataset.state = open ? "open" : "closed";
		content.dataset.state = open ? "open" : "closed";
		content.hidden = !open;
		content.textContent = answers[button.textContent.trim()] || "";
	});
}

const monthlyButton = byText("button", "Monthly");
const yearlyButton = byText("button", "Yearly");
const activeBilling = [
	"bg-primary",
	"text-primary-foreground",
	"shadow",
	"hover:bg-zinc-600",
];
const inactiveBilling = [
	"border",
	"border-input",
	"bg-background",
	"shadow-sm",
	"hover:bg-accent",
	"hover:text-accent-foreground",
];

const selectBilling = (yearly) => {
	const active = yearly ? yearlyButton : monthlyButton;
	const inactive = yearly ? monthlyButton : yearlyButton;
	active?.classList.remove(...inactiveBilling);
	active?.classList.add(...activeBilling);
	inactive?.classList.remove(...activeBilling);
	inactive?.classList.add(...inactiveBilling);
};

monthlyButton?.addEventListener("click", () => selectBilling(false));
yearlyButton?.addEventListener("click", () => selectBilling(true));

for (const form of document.querySelectorAll("form")) {
	form.addEventListener("submit", (event) => event.preventDefault());
}
