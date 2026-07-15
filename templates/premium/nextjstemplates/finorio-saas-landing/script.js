// ===== Finorio clone — interactions =====
(function () {
	"use strict";

	// Mobile menu toggle
	const header = document.querySelector(".site-header");
	const toggle = document.querySelector(".menu-toggle");
	if (header && toggle) {
		const setMenuOpen = (open) => {
			header.classList.toggle("open", open);
			toggle.setAttribute("aria-expanded", String(open));
			document.body.style.overflow = open ? "hidden" : "";
		};
		toggle.setAttribute("aria-expanded", "false");
		toggle.addEventListener("click", () =>
			setMenuOpen(!header.classList.contains("open")),
		);
		header.querySelectorAll("a").forEach((link) =>
			link.addEventListener("click", () => setMenuOpen(false)),
		);
		document.addEventListener("keydown", (event) => {
			if (event.key === "Escape") setMenuOpen(false);
		});
	}

	// FAQ accordion
	document.querySelectorAll(".faq-item").forEach((item) => {
		const q = item.querySelector(".faq-q");
		const a = item.querySelector(".faq-a");
		if (!q || !a) return;
		const setOpen = (open) => {
			item.classList.toggle("open", open);
			a.style.maxHeight = open ? a.scrollHeight + "px" : "0px";
			const icon = q.querySelector(".icon use, .icon");
			const plus = q.querySelector(".faq-plus");
			const minus = q.querySelector(".faq-minus");
			if (plus && minus) {
				plus.style.display = open ? "none" : "block";
				minus.style.display = open ? "block" : "none";
			}
		};
		// initialise based on .open class present in markup
		setOpen(item.classList.contains("open"));
		q.addEventListener("click", () =>
			setOpen(!item.classList.contains("open")),
		);
	});

	// Pricing monthly/annually toggle
	const billing = document.querySelector("#billing-toggle");
	if (billing) {
		const apply = () => {
			const annual = billing.checked; // checked = Annually (default)
			document.querySelectorAll("[data-monthly][data-annual]").forEach((el) => {
				el.textContent = annual ? el.dataset.annual : el.dataset.monthly;
			});
		};
		billing.addEventListener("change", apply);
		apply();
	}

	// Password eye toggles
	document.querySelectorAll(".eye").forEach((eye) => {
		const input = eye.parentElement.querySelector("input");
		if (!input) return;
		eye.addEventListener("click", () => {
			input.type = input.type === "password" ? "text" : "password";
			eye.classList.toggle("on");
		});
	});

	// Scroll reveal
	const reveals = document.querySelectorAll(".reveal");
	if ("IntersectionObserver" in window && reveals.length) {
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e, i) => {
					if (e.isIntersecting) {
						const delay = e.target.dataset.delay || 0;
						e.target.style.transitionDelay = delay + "ms";
						e.target.classList.add("in");
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
		);
		reveals.forEach((r) => io.observe(r));
	} else {
		reveals.forEach((r) => r.classList.add("in"));
	}

	// Prevent form submit navigation (demo only)
	document.querySelectorAll("form[data-demo]").forEach((form) => {
		form.addEventListener("submit", (event) => {
			event.preventDefault();
			const button = form.querySelector('button[type="submit"]');
			const original = button?.textContent;
			if (button) {
				button.disabled = true;
				button.textContent = "Sending...";
			}
			setTimeout(() => {
				let status = form.querySelector(".form-status");
				if (!status) {
					status = document.createElement("p");
					status.className = "form-status";
					status.setAttribute("role", "status");
					form.append(status);
				}
				status.textContent = "Thanks, your request has been received.";
				if (button) {
					button.disabled = false;
					button.textContent = original;
				}
			}, 500);
		});
	});
})();
