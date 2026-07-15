document.addEventListener("DOMContentLoaded", () => {
	const revealElements = document.querySelectorAll('[style*="opacity: 0"]');
	revealElements.forEach((element) => {
		element.style.transition = "none";
		element.style.opacity = "1";
		element.style.transform = "none";
	});

	const counters = document.querySelectorAll("h3.text-6xl.font-semibold span");
	const counterTargets = [
		{ value: 2, suffix: "M+" },
		{ value: 98, suffix: "%" },
		{ value: 20, suffix: "%" },
		{ value: 150, suffix: "+" },
	];
	counters.forEach((counter, index) => {
		const target = counterTargets[index % 4];
		counter.textContent = `${target.value}${target.suffix}`;
	});

	const mobileMenu = document.getElementById("mobile-menu");
	const mobileMenuButtons = document.querySelectorAll(
		"[data-mobile-menu-toggle]",
	);
	const setMenuOpen = (open) => {
		if (!mobileMenu) return;
		mobileMenu.classList.toggle("hidden", !open);
		mobileMenuButtons.forEach((button) => {
			button.setAttribute("aria-expanded", String(open));
		});
	};
	mobileMenuButtons.forEach((button) => {
		button.addEventListener("click", () => {
			setMenuOpen(mobileMenu?.classList.contains("hidden") ?? false);
		});
	});
	mobileMenu?.querySelectorAll("a").forEach((link) => {
		link.addEventListener("click", () => setMenuOpen(false));
	});

	const accordions = [
		...document.querySelectorAll(".bg-background-soft-100.rounded-xl.p-5"),
	].map((container, index) => {
		const trigger = container.querySelector(".flex.cursor-pointer");
		const content = container.querySelector(".overflow-hidden");
		if (!trigger || !content) return null;
		const contentId = `accordion-panel-${index + 1}`;
		content.id = contentId;
		trigger.setAttribute("role", "button");
		trigger.setAttribute("tabindex", "0");
		trigger.setAttribute("aria-controls", contentId);
		return { trigger, content, icon: trigger.querySelector("svg") };
	}).filter(Boolean);

	const setAccordionOpen = (accordion, open) => {
		accordion.trigger.setAttribute("aria-expanded", String(open));
		accordion.content.style.height = open
			? `${accordion.content.scrollHeight}px`
			: "0px";
		accordion.content.style.opacity = open ? "1" : "0";
		accordion.icon?.classList.toggle("rotate-180", open);
	};
	const toggleAccordion = (selected) => {
		const open = selected.trigger.getAttribute("aria-expanded") !== "true";
		accordions.forEach((accordion) => {
			setAccordionOpen(accordion, accordion === selected && open);
		});
	};
	accordions.forEach((accordion) => {
		setAccordionOpen(
			accordion,
			accordion.icon?.classList.contains("rotate-180") ?? false,
		);
		accordion.trigger.addEventListener("click", () =>
			toggleAccordion(accordion),
		);
		accordion.trigger.addEventListener("keydown", (event) => {
			if (event.key !== "Enter" && event.key !== " ") return;
			event.preventDefault();
			toggleAccordion(accordion);
		});
	});

	const pricingContainer = document.querySelector(
		".bg-background-soft-100.relative.inline-flex.h-11",
	);
	if (!pricingContainer) return;
	const [monthlyButton, yearlyButton] = pricingContainer.querySelectorAll("button");
	const indicator = pricingContainer.querySelector(".bg-background-50.absolute");
	if (!monthlyButton || !yearlyButton || !indicator) return;

	const setHidden = (selector, hidden) => {
		document.querySelectorAll(selector).forEach((element) => {
			element.classList.toggle("hidden", hidden);
		});
	};
	const setPricingMode = (yearly) => {
		const activeButton = yearly ? yearlyButton : monthlyButton;
		const inactiveButton = yearly ? monthlyButton : yearlyButton;
		activeButton.insertBefore(indicator, activeButton.firstChild);
		activeButton.classList.remove("text-text-100");
		activeButton.classList.add("text-title-50");
		inactiveButton.classList.remove("text-title-50");
		inactiveButton.classList.add("text-text-100");
		monthlyButton.setAttribute("aria-pressed", String(!yearly));
		yearlyButton.setAttribute("aria-pressed", String(yearly));
		setHidden(".price-monthly", yearly);
		setHidden(".price-yearly", !yearly);
		setHidden(".price-strike-monthly", yearly);
		setHidden(".price-strike-yearly", !yearly);
		setHidden(".billing-label-monthly", yearly);
		setHidden(".billing-label-yearly", !yearly);
	};
	monthlyButton.addEventListener("click", () => setPricingMode(false));
	yearlyButton.addEventListener("click", () => setPricingMode(true));
	setPricingMode(false);
});
