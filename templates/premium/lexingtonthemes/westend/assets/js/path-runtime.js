(function () {
	const script = document.currentScript;
	if (!script) return;

	const projectRoot = new URL("../../", script.src);
	const attributes = ["href", "action"];

	function localize(element) {
		for (const attribute of attributes) {
			const value = element.getAttribute(attribute);
			if (!value || !value.startsWith("/") || value.startsWith("//")) continue;
			element.setAttribute(attribute, new URL(value.slice(1), projectRoot).href);
		}
	}

	function localizeTree(root) {
		if (root.nodeType !== Node.ELEMENT_NODE && root !== document) return;
		if (root !== document) localize(root);
		for (const element of root.querySelectorAll("[href], [action]")) localize(element);
	}

	localizeTree(document);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			for (const node of mutation.addedNodes) localizeTree(node);
		}
	}).observe(document.documentElement, { childList: true, subtree: true });
})();
