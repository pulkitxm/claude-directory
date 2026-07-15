(function () {
	const sizeCanvases = () => {
		document.querySelectorAll("canvas").forEach((canvas) => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			canvas.style.width = `${window.innerWidth}px`;
			canvas.style.height = `${window.innerHeight}px`;
		});
	};
	sizeCanvases();
	window.addEventListener("resize", sizeCanvases);

	const createPanel = () => {
		const panel = document.createElement("div");
		panel.setAttribute("role", "dialog");
		panel.setAttribute("aria-modal", "true");
		panel.setAttribute("aria-label", "Navigation menu");
		Object.assign(panel.style, {
			position: "fixed",
			inset: "0",
			zIndex: "100",
			display: "grid",
			placeItems: "start center",
			padding: "80px 24px 24px",
			background: "rgb(0 0 0 / 0.82)",
			backdropFilter: "blur(12px)",
		});
		panel.innerHTML = '<nav class="relative grid w-full max-w-sm gap-5 rounded-2xl border border-white/15 bg-black p-8 text-xl text-white"><button data-close class="absolute right-5 top-4 text-2xl" aria-label="Close menu">×</button><a href="index.html#hero">Features</a><a href="index.html#pricing">Pricing</a><a href="signin.html">Log in</a><a href="signup.html">Sign up</a></nav>';
		const close = () => panel.remove();
		panel.addEventListener("click", (event) => {
			if (event.target === panel || event.target.closest("[data-close]")) close();
		});
		document.addEventListener("keydown", function escape(event) {
			if (event.key === "Escape") {
				close();
				document.removeEventListener("keydown", escape);
			}
		});
		document.body.append(panel);
		panel.querySelector("button")?.focus();
	};

	document.querySelectorAll("button").forEach((button) => {
		if (button.textContent.trim() === "Toggle menu") {
			button.setAttribute("aria-label", "Toggle menu");
			button.addEventListener("click", createPanel);
		}
	});

	const switchButton = document.querySelector('button[role="switch"]');
	const monthly = [10, 20, 50, 80];
	const annual = [8, 16, 40, 64];
	const priceNodes = () => Array.from(document.querySelectorAll("span")).filter((span) => /^\$(10|20|50|80|8|16|40|64)\s*\/ month$/.test(span.textContent.trim()));
	switchButton?.addEventListener("click", () => {
		const checked = switchButton.getAttribute("aria-checked") !== "true";
		switchButton.setAttribute("aria-checked", String(checked));
		switchButton.dataset.state = checked ? "checked" : "unchecked";
		const thumb = switchButton.firstElementChild;
		if (thumb) thumb.dataset.state = checked ? "checked" : "unchecked";
		priceNodes().forEach((node, index) => {
			const suffix = node.querySelector("span");
			for (const child of node.childNodes) {
				if (child.nodeType === Node.TEXT_NODE && child.textContent.includes("$")) child.textContent = `$${(checked ? annual : monthly)[index]}`;
			}
			if (suffix) suffix.textContent = " / month";
		});
	});

	document.querySelectorAll("button").forEach((button) => {
		if (button.textContent.trim() === "Get Started for free" || button.textContent.trim() === "Subscribe") {
			button.addEventListener("click", () => {
				window.location.href = "signup.html";
			});
		}
	});

	document.querySelectorAll("form").forEach((form) => {
		form.addEventListener("submit", (event) => {
			event.preventDefault();
			if (!form.reportValidity()) return;
			const submit = form.querySelector('button[type="submit"]');
			if (submit) {
				submit.textContent = "Check your inbox";
				submit.setAttribute("aria-live", "polite");
			}
		});
	});

	document.querySelectorAll('a[href="#"]').forEach((link) => link.addEventListener("click", (event) => event.preventDefault()));
})();
