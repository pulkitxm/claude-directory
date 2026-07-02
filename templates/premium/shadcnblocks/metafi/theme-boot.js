// No-flash theme boot — runs in <head> before paint
(function () {
	try {
		var t = localStorage.getItem("metafi-theme");
		if (!t)
			t = window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
		if (t === "dark") document.documentElement.classList.add("dark");
	} catch (e) {}
})();
