// Inline theme init — prevents flash of wrong theme
(function () {
	var stored = localStorage.getItem("theme");
	var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	var isDark = stored ? stored === "dark" : prefersDark;
	if (isDark) document.documentElement.classList.add("dark");
})();
