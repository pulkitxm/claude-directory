const root = document.documentElement;
const savedTheme = localStorage.getItem("hatch-theme");
const applyTheme = (theme) => {
	root.classList.toggle("dark", theme === "dark");
	root.classList.toggle("light", theme !== "dark");
	root.style.colorScheme = theme;
};
if (savedTheme) applyTheme(savedTheme);

document.addEventListener("click", (event) => {
	const button = event.target.closest("button");
	if (!button) return;
	const label = button.getAttribute("aria-label") || "";
	if (/close banner/i.test(label)) {
		button.closest(".bg-primary")?.remove();
		return;
	}
	if (/theme/i.test(label) || button.querySelector(".lucide-sun")) {
		const theme = root.classList.contains("dark") ? "light" : "dark";
		applyTheme(theme);
		localStorage.setItem("hatch-theme", theme);
		return;
	}
	if (/menu/i.test(label)) {
		const open = button.getAttribute("aria-expanded") !== "true";
		button.setAttribute("aria-expanded", String(open));
		const navigation = document.querySelectorAll("header nav")[1];
		const panel = navigation?.parentElement?.parentElement?.parentElement?.parentElement;
		const viewport = navigation?.parentElement?.parentElement?.parentElement;
		const content = navigation?.parentElement;
		if (panel) {
			panel.style.height = open ? "calc(100vh - 80px)" : "0px";
			panel.setAttribute("aria-hidden", String(!open));
		}
		if (viewport) open ? viewport.removeAttribute("inert") : viewport.setAttribute("inert", "");
		content?.classList.toggle("translate-y-2", !open);
		content?.classList.toggle("opacity-0", !open);
		content?.classList.toggle("translate-y-0", open);
		content?.classList.toggle("opacity-100", open);
		const lines = button.querySelectorAll("div > span");
		if (lines.length === 3) {
			lines[0].style.transform = open ? "translateY(7px) rotate(45deg)" : "";
			lines[1].style.opacity = open ? "0" : "1";
			lines[2].style.transform = open ? "translateY(-7px) rotate(-45deg)" : "";
		}
	}
});

for (const form of document.querySelectorAll("form")) {
	form.addEventListener("submit", (event) => event.preventDefault());
}
