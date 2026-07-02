// inline-loaded first to avoid theme flash
(function () {
	try {
		var t = localStorage.getItem("kinto-theme");
		if (!t)
			t = window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
		if (t === "dark") document.documentElement.classList.add("dark");
	} catch (e) {}
})();
