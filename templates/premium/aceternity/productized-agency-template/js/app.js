/* Shared interactions for the Productized Agency clone.
   Replaces the original Framer-Motion / Radix runtime with vanilla equivalents:
   - scroll/entrance reveals (IntersectionObserver)
   - FAQ / accordion open-close (CSS height keyframes)
   - tabbed pricing cards
   - mobile nav menu
   - logo marquee duplication
*/
(function () {
	"use strict";

	const ready = (fn) =>
		document.readyState !== "loading"
			? fn()
			: document.addEventListener("DOMContentLoaded", fn);

	ready(() => {
		/* ---------- Scroll reveal (Framer Motion replacement) ---------- */
		const reveals = document.querySelectorAll("[data-reveal]");
		if (reveals.length) {
			const io = new IntersectionObserver(
				(entries, obs) => {
					entries.forEach((e) => {
						if (e.isIntersecting) {
							e.target.classList.add("is-visible");
							obs.unobserve(e.target);
						}
					});
				},
				{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
			);
			reveals.forEach((el) => io.observe(el));
		}

		/* ---------- FAQ accordion ---------- */
		document.querySelectorAll("[data-accordion]").forEach((root) => {
			const items = root.querySelectorAll("[data-accordion-item]");
			items.forEach((item) => {
				const trigger = item.querySelector("[data-accordion-trigger]");
				const content = item.querySelector("[data-accordion-content]");
				if (!trigger || !content) return;
				trigger.addEventListener("click", () => {
					const open = item.getAttribute("data-open") === "true";
					// close siblings (single-open behaviour)
					items.forEach((other) => {
						if (other !== item) {
							other.setAttribute("data-open", "false");
							const c = other.querySelector("[data-accordion-content]");
							if (c) c.style.maxHeight = "0px";
						}
					});
					item.setAttribute("data-open", open ? "false" : "true");
					content.style.maxHeight = open ? "0px" : content.scrollHeight + "px";
				});
			});
		});

		/* ---------- Tabs (pricing / generic) ---------- */
		document.querySelectorAll("[data-tabs]").forEach((tabs) => {
			const triggers = tabs.querySelectorAll("[data-tab-trigger]");
			const panels = tabs.querySelectorAll("[data-tab-panel]");
			triggers.forEach((t) => {
				t.addEventListener("click", () => {
					const key = t.getAttribute("data-tab-trigger");
					triggers.forEach((x) =>
						x.setAttribute("data-active", x === t ? "true" : "false"),
					);
					panels.forEach((p) =>
						p.setAttribute(
							"data-active",
							p.getAttribute("data-tab-panel") === key ? "true" : "false",
						),
					);
				});
			});
		});

		/* ---------- Mobile nav ---------- */
		const navToggle = document.querySelector("[data-nav-toggle]");
		const navMenu = document.querySelector("[data-nav-menu]");
		if (navToggle && navMenu) {
			const iconMenu =
				'<path d="M4 6l16 0"></path><path d="M4 12l16 0"></path><path d="M4 18l16 0"></path>';
			const iconClose =
				'<path d="M18 6l-12 12"></path><path d="M6 6l12 12"></path>';
			const svg = navToggle.querySelector("svg");
			const setOpen = (next) => {
				navMenu.setAttribute("data-open", next ? "true" : "false");
				navToggle.setAttribute("aria-expanded", next ? "true" : "false");
				document.body.style.overflow = next ? "hidden" : "";
				if (svg) svg.innerHTML = next ? iconClose : iconMenu;
			};
			navToggle.addEventListener("click", () => {
				setOpen(navMenu.getAttribute("data-open") !== "true");
			});
			navMenu
				.querySelectorAll("a")
				.forEach((a) => a.addEventListener("click", () => setOpen(false)));
		}

		/* ---------- Testimonial carousels (dot nav + autoplay) ---------- */
		document
			.querySelectorAll('[aria-label^="Show testimonial 1"]')
			.forEach((firstDot) => {
				const dotRow = firstDot.parentElement;
				if (!dotRow || dotRow.__carouselWired) return;
				dotRow.__carouselWired = true;
				const dots = Array.from(
					dotRow.querySelectorAll('[aria-label^="Show testimonial"]'),
				);
				// The track is the translate3d flex row that precedes the dot row.
				// Search previous siblings / ancestors for it.
				let track = null;
				let scope = dotRow;
				for (let i = 0; i < 6 && scope && !track; i++) {
					scope = scope.parentElement;
					if (scope)
						track = scope.querySelector(
							'div[style*="translate3d"], .flex[style*="translate3d"]',
						);
				}
				if (!track) return;
				const cards = Array.from(track.children);
				if (!cards.length) return;

				let index = 0;
				const maxIndex = Math.max(0, dots.length - 1);
				const go = (i) => {
					index = Math.max(0, Math.min(i, maxIndex));
					const card = cards[Math.min(index, cards.length - 1)];
					const gap = parseFloat(getComputedStyle(track).columnGap) || 24;
					const offset = index * (card.offsetWidth + gap);
					track.style.transform = `translate3d(-${offset}px, 0px, 0px)`;
					dots.forEach((d, di) => {
						const active = di === index;
						d.setAttribute("aria-current", active ? "true" : "false");
						d.classList.toggle("bg-heading", active);
						d.classList.toggle("bg-natural-black/15", !active);
						d.classList.toggle("hover:bg-natural-black/30", !active);
					});
				};
				dots.forEach((d, di) =>
					d.addEventListener("click", () => {
						go(di);
						restart();
					}),
				);

				let timer = null;
				const tick = () => go(index >= maxIndex ? 0 : index + 1);
				const start = () => (timer = setInterval(tick, 4500));
				const stop = () => timer && clearInterval(timer);
				const restart = () => {
					stop();
					start();
				};
				const wrap = track.closest("section") || track.parentElement;
				if (wrap) {
					wrap.addEventListener("mouseenter", stop);
					wrap.addEventListener("mouseleave", start);
				}
				go(0);
				start();
			});

		/* ---------- Sticky nav shadow on scroll ---------- */
		const nav = document.querySelector("[data-nav]");
		if (nav) {
			const onScroll = () => {
				if (window.scrollY > 24) nav.setAttribute("data-scrolled", "true");
				else nav.setAttribute("data-scrolled", "false");
			};
			onScroll();
			window.addEventListener("scroll", onScroll, { passive: true });
		}
	});
})();
