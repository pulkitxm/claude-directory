// Theme toggle with localStorage persistence. The no-flash boot script in
// <head> already applies the stored/OS theme before paint; this wires the
// toggle button and enables transitions after first paint.
(function () {
	function current() {
		const root = document.documentElement;
		if (root.classList.contains("dark")) return "dark";
		if (root.classList.contains("light")) return "light";
		return window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
	}
	function apply(mode) {
		const root = document.documentElement;
		root.classList.remove("light", "dark");
		root.classList.add(mode);
		try {
			localStorage.setItem("dusk-theme", mode);
		} catch (e) {}
	}
	document.addEventListener("DOMContentLoaded", () => {
		// enable smooth transitions only after first paint
		requestAnimationFrame(() =>
			document.documentElement.classList.add("theme-ready"),
		);
		document.querySelectorAll("#theme-toggle").forEach((btn) => {
			btn.addEventListener("click", () => {
				apply(current() === "dark" ? "light" : "dark");
			});
		});
	});
})();
