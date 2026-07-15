(function () {
	const buttons = () => Array.from(document.querySelectorAll("button"));
	const setState = (button, open) => {
		button.setAttribute("aria-expanded", String(open));
		button.dataset.state = open ? "open" : "closed";
	};
	const makeOverlay = (content, label) => {
		const overlay = document.createElement("div");
		overlay.setAttribute("role", "dialog");
		overlay.setAttribute("aria-modal", "true");
		overlay.setAttribute("aria-label", label);
		Object.assign(overlay.style, {
			position: "fixed",
			inset: "0",
			zIndex: "100",
			display: "grid",
			placeItems: "center",
			padding: "24px",
			background: "rgb(0 0 0 / 0.7)",
		});
		overlay.innerHTML = content;
		const close = () => overlay.remove();
		overlay.addEventListener("click", (event) => {
			if (event.target === overlay || event.target.closest("[data-close]")) close();
		});
		document.addEventListener("keydown", function escape(event) {
			if (event.key === "Escape") {
				close();
				document.removeEventListener("keydown", escape);
			}
		});
		document.body.append(overlay);
		overlay.querySelector("button, a")?.focus();
		return overlay;
	};

	document.querySelectorAll('[data-slot="navigation-menu-trigger"]').forEach((trigger) => {
		trigger.addEventListener("click", () => {
			const open = trigger.getAttribute("aria-expanded") !== "true";
			document.querySelectorAll("[data-nav-panel]").forEach((panel) => panel.remove());
			document.querySelectorAll('[data-slot="navigation-menu-trigger"]').forEach((item) => setState(item, item === trigger && open));
			if (!open) return;
			const panel = document.createElement("div");
			panel.dataset.navPanel = "true";
			panel.className = "absolute top-full mt-2 w-64 rounded-lg border bg-background p-3 shadow-xl";
			panel.innerHTML = trigger.textContent.includes("Features")
				? '<a class="block rounded-md p-3 hover:bg-accent" href="#features">AI automation</a><a class="block rounded-md p-3 hover:bg-accent" href="#how-it-works">Workflow insights</a>'
				: '<a class="block rounded-md p-3 hover:bg-accent" href="#pricing">For growing teams</a><a class="block rounded-md p-3 hover:bg-accent" href="#testimonials">Customer stories</a>';
			trigger.parentElement.append(panel);
		});
	});

	const drawerTrigger = document.querySelector('button[aria-haspopup="dialog"]');
	drawerTrigger?.addEventListener("click", () => {
		setState(drawerTrigger, true);
		const overlay = makeOverlay('<nav class="relative w-full max-w-sm rounded-xl bg-background p-8 shadow-2xl"><button data-close class="absolute right-4 top-4 text-2xl" aria-label="Close menu">×</button><div class="grid gap-5 text-xl"><a href="index.html#features">Features</a><a href="index.html#pricing">Pricing</a><a href="blog.html">Blog</a><a href="login.html">Login</a><a href="signup.html">Get started</a></div></nav>', "Navigation menu");
		overlay.addEventListener("click", () => setState(drawerTrigger, false), { once: true });
	});

	const heroImage = document.querySelector('img[alt="Hero Video"]');
	const heroTrigger = heroImage?.closest(".cursor-pointer");
	if (heroTrigger) {
		heroTrigger.tabIndex = 0;
		heroTrigger.setAttribute("role", "button");
		heroTrigger.setAttribute("aria-label", "Play product video");
		const openVideo = () => makeOverlay(`<div class="relative w-full max-w-5xl rounded-xl bg-background p-3 shadow-2xl"><button data-close class="absolute right-5 top-5 z-10 rounded-full bg-background px-3 py-1 text-xl" aria-label="Close video">×</button><img class="w-full rounded-lg" src="${heroImage.currentSrc || heroImage.src}" alt="Acme.ai product dashboard"></div>`, "Acme.ai product video");
		heroTrigger.addEventListener("click", openVideo);
		heroTrigger.addEventListener("keydown", (event) => {
			if (event.key === "Enter" || event.key === " ") openVideo();
		});
	}

	const stepButtons = buttons().filter((button) => /^[123]\./.test(button.textContent.trim()));
	stepButtons.forEach((button) => {
		button.addEventListener("click", () => {
			const control = button.getAttribute("aria-controls");
			stepButtons.forEach((item) => setState(item, item.getAttribute("aria-controls") === control));
		});
	});

	const featureLabels = ["AI-Powered Dashboard", "Natural Language Processing", "Predictive Analytics", "Automated Reporting"];
	const featureButtons = buttons().filter((button) => featureLabels.includes(button.textContent.trim()));
	featureButtons.forEach((button) => {
		button.addEventListener("click", () => {
			featureButtons.forEach((item) => {
				const active = item === button;
				setState(item, active);
				item.setAttribute("aria-selected", String(active));
			});
		});
	});

	const carouselButtons = buttons().filter((button) => /^(Previous|Next) slide$/.test(button.textContent.trim()));
	const carouselContent = document.querySelector('[data-slot="carousel-content"]');
	if (carouselContent && carouselButtons.length) {
		let index = 0;
		const count = carouselContent.children.length;
		carouselButtons.forEach((button) => {
			button.addEventListener("click", () => {
				index = (index + (button.textContent.trim().startsWith("Next") ? 1 : -1) + count) % count;
				carouselContent.style.transform = `translateX(-${index * 100}%)`;
				carouselContent.style.transition = "transform 350ms ease";
			});
		});
	}

	const pricingSwitch = document.querySelector('button[role="switch"]');
	pricingSwitch?.addEventListener("click", () => {
		const annual = pricingSwitch.getAttribute("aria-checked") !== "true";
		pricingSwitch.setAttribute("aria-checked", String(annual));
		pricingSwitch.dataset.state = annual ? "checked" : "unchecked";
		const replacements = annual ? { "$19": "$16", "$49": "$40", "$99": "$82" } : { "$16": "$19", "$40": "$49", "$82": "$99" };
		document.querySelectorAll("body *").forEach((element) => {
			if (element.children.length === 0 && replacements[element.textContent.trim()]) element.textContent = replacements[element.textContent.trim()];
		});
	});

	document.querySelectorAll('[data-slot="accordion-trigger"]').forEach((trigger) => {
		trigger.addEventListener("click", () => {
			const opening = trigger.getAttribute("aria-expanded") !== "true";
			document.querySelectorAll('[data-slot="accordion-trigger"]').forEach((item) => {
				const content = document.getElementById(item.getAttribute("aria-controls"));
				const open = item === trigger && opening;
				setState(item, open);
				if (content) {
					content.hidden = !open;
					content.dataset.state = open ? "open" : "closed";
					if (open && !content.textContent.trim()) content.innerHTML = '<div class="px-4 pb-4 text-muted-foreground">Our team provides onboarding guidance, product documentation, and responsive email support for every plan.</div>';
				}
			});
		});
	});

	document.querySelectorAll('a[href="#"]').forEach((link) => link.addEventListener("click", (event) => event.preventDefault()));
})();
