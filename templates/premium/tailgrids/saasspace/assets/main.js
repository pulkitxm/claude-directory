document.addEventListener("DOMContentLoaded", () => {
	// --- Dark Mode Switcher ---
	const themeToggle = document.getElementById("theme-toggle");
	if (themeToggle) {
		themeToggle.addEventListener("click", () => {
			if (document.documentElement.classList.contains("dark")) {
				document.documentElement.classList.remove("dark");
				localStorage.setItem("theme", "light");
			} else {
				document.documentElement.classList.add("dark");
				localStorage.setItem("theme", "dark");
			}
		});
	}

	// --- Mobile Menu Toggle ---
	const mobileMenuBtn = document.querySelector(
		'button[aria-label="Toggle menu"]',
	);
	const mobileMenu = document.getElementById("mobile-menu");
	if (mobileMenuBtn && mobileMenu) {
		mobileMenuBtn.addEventListener("click", () => {
			mobileMenu.classList.toggle("hidden");
		});
	}

	// --- Accordion Panels ---
	const accordions = document.querySelectorAll(
		".bg-background-soft-100.rounded-xl.p-5",
	);
	accordions.forEach((acc) => {
		const trigger = acc.querySelector(".flex.cursor-pointer");
		const content = acc.querySelector(".overflow-hidden");
		const icon = trigger.querySelector("svg");

		if (trigger && content) {
			trigger.addEventListener("click", () => {
				const isCollapsed =
					content.style.height === "0px" || !content.style.height;

				// Collapse all others first
				accordions.forEach((otherAcc) => {
					const otherTrigger = otherAcc.querySelector(".flex.cursor-pointer");
					const otherContent = otherAcc.querySelector(".overflow-hidden");
					const otherIcon = otherTrigger.querySelector("svg");
					if (otherContent && otherContent !== content) {
						otherContent.style.height = "0px";
						otherContent.style.opacity = "0";
						if (otherIcon) otherIcon.classList.remove("rotate-180");
					}
				});

				if (isCollapsed) {
					content.style.height = content.scrollHeight + "px";
					content.style.opacity = "1";
					if (icon) icon.classList.add("rotate-180");
				} else {
					content.style.height = "0px";
					content.style.opacity = "0";
					if (icon) icon.classList.remove("rotate-180");
				}
			});

			// Initialize heights
			if (icon && icon.classList.contains("rotate-180")) {
				content.style.height = content.scrollHeight + "px";
				content.style.opacity = "1";
			} else {
				content.style.height = "0px";
				content.style.opacity = "0";
			}
		}
	});

	// --- Monthly / Yearly Pricing Toggle ---
	const pricingContainer = document.querySelector(
		".bg-background-soft-100.relative.inline-flex.h-11",
	);
	if (pricingContainer) {
		const buttons = pricingContainer.querySelectorAll("button");
		const monthlyBtn = buttons[0];
		const yearlyBtn = buttons[1];

		if (monthlyBtn && yearlyBtn) {
			const togglePricingMode = (isYearly) => {
				// Toggle active button background indicator
				const indicator = pricingContainer.querySelector(
					".bg-background-50.absolute",
				);
				if (indicator) {
					if (isYearly) {
						indicator.parentElement.removeChild(indicator);
						yearlyBtn.insertBefore(indicator, yearlyBtn.firstChild);
						monthlyBtn.classList.remove("text-title-50");
						monthlyBtn.classList.add("text-text-100");
						yearlyBtn.classList.remove("text-text-100");
						yearlyBtn.classList.add("text-title-50");
					} else {
						indicator.parentElement.removeChild(indicator);
						monthlyBtn.insertBefore(indicator, monthlyBtn.firstChild);
						yearlyBtn.classList.remove("text-title-50");
						yearlyBtn.classList.add("text-text-100");
						monthlyBtn.classList.remove("text-text-100");
						monthlyBtn.classList.add("text-title-50");
					}
				}

				// Toggle price texts
				document.querySelectorAll(".price-monthly").forEach((el) => {
					if (isYearly) el.classList.add("hidden");
					else el.classList.remove("hidden");
				});
				document.querySelectorAll(".price-yearly").forEach((el) => {
					if (isYearly) el.classList.remove("hidden");
					else el.classList.add("hidden");
				});

				// Toggle struck-out values
				document.querySelectorAll(".price-strike-monthly").forEach((el) => {
					if (isYearly) el.classList.add("hidden");
					else el.classList.remove("hidden");
				});
				document.querySelectorAll(".price-strike-yearly").forEach((el) => {
					if (isYearly) el.classList.remove("hidden");
					else el.classList.add("hidden");
				});

				// Toggle billing label ("One time payment" vs "Billed annually")
				document.querySelectorAll(".billing-label-monthly").forEach((el) => {
					if (isYearly) el.classList.add("hidden");
					else el.classList.remove("hidden");
				});
				document.querySelectorAll(".billing-label-yearly").forEach((el) => {
					if (isYearly) el.classList.remove("hidden");
					else el.classList.add("hidden");
				});
			};

			monthlyBtn.addEventListener("click", () => togglePricingMode(false));
			yearlyBtn.addEventListener("click", () => togglePricingMode(true));
		}
	}
});
