const root = document.documentElement;
const toggle = document.getElementById("theme-toggle");
toggle.addEventListener("click", () => {
	const isDark = root.classList.toggle("dark");
	try {
		localStorage.setItem("theme", isDark ? "dark" : "light");
	} catch (e) {}
});
document.querySelectorAll(".accordion-trigger").forEach((btn) => {
	btn.addEventListener("click", () => {
		const open = btn.getAttribute("aria-expanded") === "true";
		btn.setAttribute("aria-expanded", String(!open));
		const content = btn.parentElement.nextElementSibling;
		content.setAttribute("data-state", open ? "closed" : "open");
	});
});
document.querySelectorAll(".code-copy").forEach((btn) => {
	btn.addEventListener("click", () => {
		const code = btn.closest(".code-figure").querySelector("code");
		if (code && navigator.clipboard) {
			navigator.clipboard.writeText(code.innerText).catch(() => {});
		}
	});
});
