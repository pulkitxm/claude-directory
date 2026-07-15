(function () {
	const root = document.documentElement;
	const themeButton = Array.from(document.querySelectorAll("button")).find((button) => !button.textContent.trim() && !button.hasAttribute("aria-controls"));
	const applyTheme = (dark) => {
		root.classList.toggle("dark", dark);
		root.style.colorScheme = dark ? "dark" : "light";
		if (themeButton) themeButton.setAttribute("aria-pressed", String(dark));
	};
	const savedTheme = localStorage.getItem("portfolio-theme");
	if (savedTheme) applyTheme(savedTheme === "dark");
	if (themeButton) {
		themeButton.setAttribute("aria-label", "Toggle theme");
		themeButton.addEventListener("click", () => {
			const dark = !root.classList.contains("dark");
			applyTheme(dark);
			localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
		});
	}

	document.querySelectorAll("button[aria-controls]").forEach((trigger) => {
		let content = document.getElementById(trigger.getAttribute("aria-controls"));
		if (!content) {
			content = document.createElement("div");
			content.id = trigger.getAttribute("aria-controls");
			content.hidden = true;
			trigger.parentElement?.parentElement?.append(content);
		}
		trigger.addEventListener("click", () => {
			const opening = trigger.getAttribute("aria-expanded") !== "true";
			document.querySelectorAll("button[aria-controls]").forEach((button) => {
				const region = document.getElementById(button.getAttribute("aria-controls"));
				const open = button === trigger && opening;
				button.setAttribute("aria-expanded", String(open));
				button.dataset.state = open ? "open" : "closed";
				if (region) {
					region.hidden = !open;
					region.dataset.state = open ? "open" : "closed";
					region.style.display = open ? "block" : "none";
					region.style.height = open ? "auto" : "0px";
					region.style.minHeight = open ? "40px" : "0px";
					region.style.setProperty("animation", "none", "important");
					if (open && !region.textContent.trim()) region.innerHTML = '<div class="pb-4 pl-14 text-sm text-muted-foreground">Built and shipped production software while collaborating across engineering and product teams.</div>';
				}
			});
			if (opening) content?.scrollIntoView({ block: "nearest", behavior: "smooth" });
		});
	});

	document.querySelectorAll("video").forEach((video) => {
		video.muted = true;
		video.playsInline = true;
		video.addEventListener("mouseenter", () => video.play().catch(() => {}));
		video.addEventListener("mouseleave", () => video.pause());
	});

	document.querySelectorAll('a[href^="index.html#"]').forEach((link) => {
		link.addEventListener("click", (event) => {
			const target = document.querySelector(new URL(link.href).hash);
			if (!target) return;
			event.preventDefault();
			target.scrollIntoView({ behavior: "smooth" });
		});
	});
})();
