const root = document.documentElement;
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const menuButton = document.querySelector(".hamburger");
const themeButton = document.querySelector('[onclick="toggleTheme()"]');

const syncThemeIcons = () => {
	const isDark = root.getAttribute("data-theme") === "dark";
	const moon = document.getElementById("moonIcon");
	const sun = document.getElementById("sunIcon");
	if (moon) moon.style.display = isDark ? "none" : "";
	if (sun) sun.style.display = isDark ? "" : "none";
};

const applyTheme = (theme) => {
	root.setAttribute("data-theme", theme);
	localStorage.setItem("theme", theme);
	syncThemeIcons();
};

window.toggleTheme = () => {
	applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
};

const closeSidebar = (restoreFocus = false) => {
	if (!sidebar || !sidebarOverlay) return;
	sidebar.classList.remove("open");
	sidebarOverlay.classList.remove("active");
	if (menuButton) {
		menuButton.setAttribute("aria-expanded", "false");
		if (restoreFocus) menuButton.focus();
	}
};

window.toggleSidebar = () => {
	if (!sidebar || !sidebarOverlay) return;
	const opens = !sidebar.classList.contains("open");
	sidebar.classList.toggle("open", opens);
	sidebarOverlay.classList.toggle("active", opens);
	if (menuButton) menuButton.setAttribute("aria-expanded", String(opens));
};

applyTheme(localStorage.getItem("theme") === "dark" ? "dark" : "light");

if (themeButton) themeButton.setAttribute("aria-label", "Toggle color theme");
if (menuButton) {
	menuButton.setAttribute("aria-controls", "sidebar");
	menuButton.setAttribute("aria-expanded", "false");
}
document.querySelectorAll(".nav-item.active").forEach((link) => link.setAttribute("aria-current", "page"));
document.querySelectorAll("button").forEach((button) => {
	if (button.getAttribute("aria-label") || button.getAttribute("title") || (button.textContent || "").trim()) return;
	button.setAttribute("aria-label", button.classList.contains("action-btn") ? "Open row actions" : "Interactive control");
});
document.querySelectorAll("input, textarea, select").forEach((field) => {
	if (field.getAttribute("aria-label") || field.closest("label") || (field.id && document.querySelector(`label[for="${field.id}"]`))) return;
	field.setAttribute("aria-label", field.getAttribute("placeholder") || field.getAttribute("name") || field.id || field.getAttribute("type") || "Form field");
});
document.addEventListener("keydown", (event) => {
	if (event.key === "Escape" && sidebar?.classList.contains("open")) closeSidebar(true);
});
window.addEventListener("resize", () => {
	if (window.innerWidth > 1024) closeSidebar();
});
