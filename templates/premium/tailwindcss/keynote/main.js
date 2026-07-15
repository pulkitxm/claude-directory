const groups = [...document.querySelectorAll('[role="tablist"]')];
const scheduleTabs = [...groups[1].querySelectorAll('[role="tab"]')];
const schedulePanels = scheduleTabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));
const desktopScheduleLists = [...document.querySelectorAll("section > ol")];
const mobileListClass = schedulePanels[0].querySelector("ol").className;

schedulePanels.slice(1).forEach((panel, index) => {
	const list = desktopScheduleLists[index + 1].cloneNode(true);
	list.className = mobileListClass;
	panel.replaceChildren(list);
});

const selectTab = (tablist, index) => {
	const tabs = [...tablist.querySelectorAll('[role="tab"]')];
	const schedule = tablist === groups[1];
	if (schedule && innerWidth >= 1024) index = 0;
	tabs.forEach((tab, position) => {
		const selected = position === index;
		const panel = document.getElementById(tab.getAttribute("aria-controls"));
		tab.setAttribute("aria-selected", String(selected));
		tab.toggleAttribute("data-selected", selected);
		tab.setAttribute("data-headlessui-state", selected ? "selected" : "");
		tab.tabIndex = selected ? 0 : -1;
		if (!panel) return;
		panel.toggleAttribute("data-selected", selected);
		panel.setAttribute("data-headlessui-state", selected ? "selected" : "");
		panel.tabIndex = selected ? 0 : -1;
		panel.hidden = !selected;
		if (selected) {
			panel.removeAttribute("style");
			panel.removeAttribute("aria-hidden");
		} else {
			panel.style.display = "none";
			panel.setAttribute("aria-hidden", "true");
		}
	});
};

groups.forEach((tablist) => {
	const tabs = [...tablist.querySelectorAll('[role="tab"]')];
	tabs.forEach((tab, index) => {
		tab.addEventListener("click", () => selectTab(tablist, index));
		tab.addEventListener("keydown", (event) => {
			const directions = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"];
			if (!directions.includes(event.key) && !["Home", "End"].includes(event.key)) return;
			event.preventDefault();
			let next = index;
			if (["ArrowDown", "ArrowRight"].includes(event.key)) next = (index + 1) % tabs.length;
			if (["ArrowUp", "ArrowLeft"].includes(event.key)) next = (index - 1 + tabs.length) % tabs.length;
			if (event.key === "Home") next = 0;
			if (event.key === "End") next = tabs.length - 1;
			selectTab(tablist, next);
			tabs[next].focus();
		});
	});
	const selected = tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true");
	selectTab(tablist, Math.max(0, selected));
});

addEventListener("resize", () => {
	groups.forEach((tablist) => {
		const selected = [...tablist.querySelectorAll('[role="tab"]')].findIndex((tab) => tab.getAttribute("aria-selected") === "true");
		selectTab(tablist, Math.max(0, selected));
	});
});

document.querySelectorAll('a[href="#"]').forEach((link) => {
	link.addEventListener("click", (event) => {
		event.preventDefault();
		document.querySelector("form")?.scrollIntoView({ behavior: "smooth", block: "center" });
	});
});

document.querySelector("form")?.addEventListener("submit", (event) => {
	event.preventDefault();
	const input = event.currentTarget.querySelector('input[type="email"]');
	if (!input?.checkValidity()) {
		input?.reportValidity();
		return;
	}
	const button = event.currentTarget.querySelector('button[type="submit"], button');
	button.textContent = "You're on the list";
	button.disabled = true;
});
