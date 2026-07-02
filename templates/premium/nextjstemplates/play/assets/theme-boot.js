// No-flash theme boot: reproduces the original next-themes inline script.
// Reads localStorage "theme" (falls back to "light") and applies it to <html> before paint.
(function (attribute, storageKey, fallback, forcedTheme, valueList) {
	var el = document.documentElement;
	function apply(theme) {
		var isClassAttr = attribute === "class";
		var classesToRemove = valueList;
		if (isClassAttr) {
			el.classList.remove.apply(el.classList, classesToRemove);
			el.classList.add(theme);
		} else {
			el.setAttribute(attribute, theme);
		}
		if (valueList.indexOf(theme) !== -1) {
			el.style.colorScheme = theme;
		}
	}
	if (forcedTheme) {
		apply(forcedTheme);
	} else {
		try {
			var stored = localStorage.getItem(storageKey) || fallback;
			apply(stored);
		} catch (e) {
			apply(fallback);
		}
	}
})("class", "theme", "light", null, ["light", "dark"]);
