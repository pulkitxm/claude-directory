(function () {
	try {
		// Match the source: defaults to dark mode regardless of OS preference,
		// unless the visitor has explicitly toggled (and thus stored) a preference.
		// prefers-color-scheme is still honored via the CSS media-query fallback
		// below for the (rare) no-JS case.
		var stored = localStorage.getItem("saas-ui-theme");
		var theme = stored === "light" || stored === "dark" ? stored : "dark";
		document.documentElement.setAttribute("data-theme", theme);
	} catch (e) {
		document.documentElement.setAttribute("data-theme", "dark");
	}
})();
