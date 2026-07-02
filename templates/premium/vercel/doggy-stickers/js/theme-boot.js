// Runs before paint (loaded in <head>) to avoid a flash of the wrong theme.
(function () {
	try {
		var stored = localStorage.getItem("doggy-theme");
		var theme =
			stored ||
			(window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light");
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		}
	} catch (e) {
		/* ignore */
	}
})();
