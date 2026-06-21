(() => {
	var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	// Split headings into word spans for staggered reveal
	document.querySelectorAll("[data-split]").forEach((el) => {
		var nodes = Array.prototype.slice.call(el.childNodes);
		el.innerHTML = "";
		nodes.forEach((node) => {
			if (node.nodeType === Node.TEXT_NODE) {
				var words = node.textContent.split(/(\s+)/);
				words.forEach((w) => {
					if (w.trim() === "") {
						el.appendChild(document.createTextNode(w));
						return;
					}
					var span = document.createElement("span");
					span.className = "char";
					span.textContent = w;
					el.appendChild(span);
				});
			} else {
				// preserve inline elements (e.g. .accent, <br>)
				if (node.nodeName === "BR") {
					el.appendChild(node.cloneNode());
					return;
				}
				var span = document.createElement("span");
				span.className = "char";
				if (node.className) span.className += ` ${node.className}`;
				span.innerHTML =
					node.innerHTML !== undefined ? node.innerHTML : node.textContent;
				el.appendChild(span);
			}
		});
	});

	function staggerChars(container) {
		var chars = container.querySelectorAll(".char");
		chars.forEach((c, i) => {
			c.style.transitionDelay = `${i * 0.06}s`;
		});
	}
	document.querySelectorAll("[data-split]").forEach(staggerChars);

	if (reduced) {
		document.querySelectorAll(".reveal").forEach((el) => {
			el.classList.add("visible");
		});
		document.querySelectorAll("[data-split]").forEach((el) => {
			el.querySelectorAll(".char").forEach((c) => {
				c.classList.add("show");
			});
		});
		return;
	}

	var observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("visible");
					// reveal split headings inside (covers standalone H1)
					entry.target.querySelectorAll("[data-split] .char").forEach((c) => {
						c.classList.add("show");
					});
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
	);

	document.querySelectorAll(".reveal").forEach((el) => {
		observer.observe(el);
	});

	// Standalone headings that aren't wrapped in a .reveal (hero H1 is inside one already,
	// but ensure any [data-split] without a reveal ancestor still animates)
	var headObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.querySelectorAll(".char").forEach((c) => {
						c.classList.add("show");
					});
					headObserver.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.25 },
	);
	document.querySelectorAll("[data-split]").forEach((el) => {
		if (!el.closest(".reveal")) headObserver.observe(el);
	});
})();
