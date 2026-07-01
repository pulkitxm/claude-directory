// ── Dark mode toggle ─────────────────────────────────────────────────────────
(function () {
	const STORAGE_KEY = "dark-mode";

	function applyMode(isDark) {
		document.documentElement.classList.toggle("dark", isDark);
		document.querySelectorAll(".light-switch").forEach((el) => {
			el.checked = isDark;
		});
	}

	function handleToggle(e) {
		const isDark = e.target.checked;
		applyMode(isDark);
		localStorage.setItem(STORAGE_KEY, isDark ? "true" : "false");
	}

	document.querySelectorAll(".light-switch").forEach((el) => {
		el.addEventListener("change", handleToggle);
	});

	// Sync checkboxes to current state on load
	const stored = localStorage.getItem(STORAGE_KEY);
	const isDark =
		stored !== null
			? stored === "true"
			: window.matchMedia("(prefers-color-scheme: dark)").matches;
	applyMode(isDark);
})();

// ── Testimonial carousel ──────────────────────────────────────────────────────
(function () {
	const track = document.getElementById("carousel-track");
	if (!track) return;

	const GAP = 16; // 1rem
	let autoTimer = null;
	let paused = false;

	function getCardWidth() {
		const card = track.querySelector(".testimonial-card");
		if (!card) return 0;
		return card.getBoundingClientRect().width + GAP;
	}

	function getCurrentX() {
		const m = new DOMMatrix(getComputedStyle(track).transform);
		return m.m41;
	}

	function setX(x, animated) {
		track.style.transition = animated
			? "transform 500ms cubic-bezier(0.4,0,0.2,1)"
			: "none";
		track.style.transform = `translateX(${x}px)`;
	}

	// Clone last child to front to enable seamless looping
	function prependClone() {
		const cards = track.querySelectorAll(".testimonial-card");
		if (!cards.length) return;
		const clone = cards[cards.length - 1].cloneNode(true);
		track.insertBefore(clone, track.firstChild);
		setX(-getCardWidth(), false);
	}

	function removeTransitionJump(x) {
		track.style.transition = "none";
		track.style.transform = `translateX(${x}px)`;
		// force reflow
		void track.offsetHeight;
	}

	function next() {
		const cardW = getCardWidth();
		const x = getCurrentX() - cardW;
		setX(x, true);
	}

	track.addEventListener("transitionend", () => {
		const cards = track.querySelectorAll(".testimonial-card");
		const cardW = getCardWidth();
		const x = getCurrentX();
		const minX = -(cards.length - 1) * cardW;

		// Reached the (cloned) last-appended card at front → jump to real end
		if (x >= 0) {
			removeTransitionJump(-(cards.length - 2) * cardW);
		}
		// Went past the real last card → jump to first real card position
		if (x <= minX) {
			removeTransitionJump(-cardW);
		}
	});

	// Pause on hover / focus
	const outer = track.closest(".carousel-outer") || track.parentElement;
	if (outer) {
		outer.addEventListener("mouseenter", () => {
			paused = true;
		});
		outer.addEventListener("mouseleave", () => {
			paused = false;
		});
		outer.addEventListener("focusin", () => {
			paused = true;
		});
		outer.addEventListener("focusout", () => {
			paused = false;
		});
	}

	function startAuto() {
		autoTimer = setInterval(() => {
			if (!paused) next();
		}, 3000);
	}

	// Init: prepend clone and start
	prependClone();
	startAuto();
})();
