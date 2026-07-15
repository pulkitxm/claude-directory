(function () {
	try {
		var stored = localStorage.getItem("saas-ui-theme");
		var theme = stored === "light" || stored === "dark" ? stored : "dark";
		document.documentElement.setAttribute("data-theme", theme);
	} catch (e) {
		document.documentElement.setAttribute("data-theme", "dark");
	}
})();
