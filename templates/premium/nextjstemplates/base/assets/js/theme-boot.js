// No-flash dark mode boot. Runs synchronously in <head>, before first paint.
(function () {
	try {
		var stored = localStorage.getItem("base-theme");
		var dark = stored
			? stored === "dark"
			: window.matchMedia("(prefers-color-scheme: dark)").matches;
		if (dark) document.documentElement.classList.add("dark");
	} catch (e) {}
})();
