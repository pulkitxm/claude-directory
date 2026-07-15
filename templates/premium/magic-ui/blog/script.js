(function () {
	const root = document.documentElement;
	const stored = localStorage.getItem("theme");
	if (stored === "dark") {
		root.classList.remove("light");
		root.classList.add("dark");
	}
	const themeButton = document.querySelector("header button");
	if (themeButton) {
		themeButton.setAttribute("aria-label", "Toggle theme");
		themeButton.addEventListener("click", () => {
			const dark = !root.classList.contains("dark");
			root.classList.toggle("dark", dark);
			root.classList.toggle("light", !dark);
			root.style.colorScheme = dark ? "dark" : "light";
			localStorage.setItem("theme", dark ? "dark" : "light");
		});
	}
})();

function startGrid(canvas) {
	if (!canvas) return;
	const context = canvas.getContext("2d");
	let columns = 0;
	let rows = 0;
	let opacity = new Float32Array();
	const resize = () => {
		const ratio = window.devicePixelRatio || 1;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		canvas.width = Math.round(width * ratio);
		canvas.height = Math.round(height * ratio);
		context.setTransform(ratio, 0, 0, ratio, 0, 0);
		columns = Math.ceil(width / 10) + 1;
		rows = Math.ceil(height / 10) + 1;
		opacity = Float32Array.from({ length: columns * rows }, () => Math.random() * 0.2);
	};
	const draw = () => {
		context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
		context.fillStyle = "#6B7280";
		for (let row = 0; row < rows; row += 1) {
			for (let column = 0; column < columns; column += 1) {
				const index = row * columns + column;
				if (Math.random() < 0.05) opacity[index] = Math.random() * 0.2;
				context.globalAlpha = opacity[index];
				context.fillRect(column * 10, row * 10, 4, 4);
			}
		}
		context.globalAlpha = 1;
		requestAnimationFrame(draw);
	};
	resize();
	window.addEventListener("resize", resize);
	draw();
}

function startFilters() {
	const desktop = document.querySelector(".hidden.md\\:flex.flex-wrap.gap-2");
	if (!desktop) return;
	const buttons = [...desktop.querySelectorAll("button")];
	const mobile = desktop.parentElement.querySelector("button.md\\:hidden");
	const cards = [...document.querySelectorAll("main a[href*='blog/'], .grid a[href*='blog/']")];
	const tags = [
		["Components", "React", "UI Frameworks"],
		["Landing Page Examples", "Portfolio"],
		["Animation", "React", "UI Frameworks"],
		["Landing Page Examples", "React", "Templates"],
		["Animation", "Mobile", "React Native", "UI Frameworks"],
		["Landing Page Examples", "Portfolio", "React"],
	];
	const normal = "border-border hover:bg-muted";
	const active = "border-primary bg-primary text-primary-foreground";
	const select = (label) => {
		buttons.forEach((button) => {
			const current = button.querySelector("span")?.textContent.trim() === label;
			button.classList.remove(...normal.split(" "), ...active.split(" "));
			button.classList.add(...(current ? active : normal).split(" "));
			button.setAttribute("aria-pressed", String(current));
		});
		cards.forEach((card, index) => {
			card.hidden = label !== "All" && !tags[index]?.includes(label);
		});
		const labelNode = mobile?.querySelector("span");
		if (labelNode) labelNode.textContent = label;
	};
	buttons.forEach((button) => button.addEventListener("click", () => select(button.querySelector("span")?.textContent.trim() || "All")));
	if (!mobile) return;
	mobile.setAttribute("aria-expanded", "false");
	mobile.setAttribute("aria-haspopup", "menu");
	const menu = document.createElement("div");
	menu.className = "audit-mobile-menu";
	menu.setAttribute("role", "menu");
	buttons.forEach((button) => {
		const item = document.createElement("button");
		item.type = "button";
		item.setAttribute("role", "menuitem");
		item.textContent = button.querySelector("span")?.textContent.trim() || "All";
		item.addEventListener("click", () => {
			select(item.textContent);
			menu.classList.remove("open");
			mobile.setAttribute("aria-expanded", "false");
		});
		menu.append(item);
	});
	mobile.insertAdjacentElement("afterend", menu);
	mobile.addEventListener("click", () => {
		const open = menu.classList.toggle("open");
		mobile.setAttribute("aria-expanded", String(open));
	});
	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			menu.classList.remove("open");
			mobile.setAttribute("aria-expanded", "false");
		}
	});
}

function startAnchors() {
	document.querySelectorAll('a[href^="#"]').forEach((link) => {
		link.addEventListener("click", (event) => {
			const target = document.querySelector(link.getAttribute("href"));
			if (!target) return;
			event.preventDefault();
			target.scrollIntoView({ behavior: "smooth", block: "start" });
			history.replaceState(null, "", link.getAttribute("href"));
		});
	});
}

function startToc() {
	const buttons = [...document.querySelectorAll("button.block.w-full.text-left")];
	const headings = [...document.querySelectorAll("h2, h3")];
	const pairs = [];
	buttons.forEach((button) => {
		const target = headings.find((heading) => heading.textContent.trim() === button.textContent.trim());
		if (!target) return;
		button.addEventListener("click", () => target.scrollIntoView({ behavior: "smooth", block: "start" }));
		pairs.push([button, target]);
	});
	const update = () => {
		let active = pairs[0];
		pairs.forEach((pair) => { if (pair[1].getBoundingClientRect().top <= 120) active = pair; });
		pairs.forEach(([button]) => {
			const selected = button === active?.[0];
			button.classList.toggle("text-primary", selected);
			button.classList.toggle("font-medium", selected);
			button.classList.toggle("underline", selected);
			button.classList.toggle("text-muted-foreground", !selected);
		});
	};
	window.addEventListener("scroll", update, { passive: true });
	update();
	const floating = document.querySelector("button.lg\\:hidden.fixed");
	if (!floating || !pairs.length) return;
	floating.setAttribute("aria-label", "Open table of contents");
	floating.setAttribute("aria-expanded", "false");
	const menu = document.createElement("div");
	menu.hidden = true;
	menu.className = "fixed bottom-20 right-6 z-50 w-72 max-h-96 overflow-auto rounded-lg border border-border bg-background p-3 shadow-xl";
	pairs.forEach(([, target]) => {
		const item = document.createElement("button");
		item.type = "button";
		item.className = "block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted";
		item.textContent = target.textContent.trim();
		item.addEventListener("click", () => {
			target.scrollIntoView({ behavior: "smooth", block: "start" });
			menu.hidden = true;
			floating.setAttribute("aria-expanded", "false");
		});
		menu.append(item);
	});
	floating.insertAdjacentElement("beforebegin", menu);
	floating.addEventListener("click", () => {
		menu.hidden = !menu.hidden;
		floating.setAttribute("aria-expanded", String(!menu.hidden));
	});
	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			menu.hidden = true;
			floating.setAttribute("aria-expanded", "false");
		}
	});
}

function startCopyButtons() {
	document.querySelectorAll('button[aria-label="Copy Text"]').forEach((button) => {
		button.addEventListener("click", async () => {
			const text = button.closest("figure")?.querySelector("code")?.innerText || "";
			if (navigator.clipboard) await navigator.clipboard.writeText(text);
			button.setAttribute("aria-label", "Copied");
			setTimeout(() => button.setAttribute("aria-label", "Copy Text"), 1200);
		});
	});
}

document.addEventListener("DOMContentLoaded", () => {
	startGrid(document.querySelector(".audit-grid"));
	startFilters();
	startAnchors();
	startToc();
	startCopyButtons();
});
