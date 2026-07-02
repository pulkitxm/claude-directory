/* No-flash color-mode boot script — must run as the first thing inside
   <body>, before any other markup renders (same placement as the source).
   Faithful port of the source's inline boot script: reads localStorage
   "nextColorMode", falls back to prefers-color-scheme, and stamps
   body.next-light-theme / body.next-dark-theme before CSS renders. */
(function () {
	var selectedColorMode = localStorage.getItem("nextColorMode");

	function setupPreferredColorMode() {
		var darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		window.prefersDarkMode = darkModeMediaQuery.matches;
	}

	function appendThemeClassName(colorMode) {
		document.body.classList.remove("next-light-theme");
		document.body.classList.remove("next-dark-theme");
		document.body.classList.add("next-" + colorMode + "-theme");
	}

	if (!selectedColorMode) {
		setupPreferredColorMode();
		window.colorMode = window.prefersDarkMode ? "dark" : "light";
	} else {
		window.colorMode = selectedColorMode;
	}

	appendThemeClassName(window.colorMode);
})();
