(() => {
	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	/* ---- scroll reveals ---- */
	const reveals = document.querySelectorAll(".reveal");
	if (reduce || !("IntersectionObserver" in window)) {
		reveals.forEach((r) => r.classList.add("in"));
	} else {
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("in");
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
		);
		reveals.forEach((r) => io.observe(r));
	}

	/* ---- typewriter rotating word ---- */
	const rot = document.getElementById("rot");
	if (rot && !reduce) {
		const words = ["Designer", "Maker", "Thinker", "Builder"];
		let wi = 0,
			ci = words[0].length,
			deleting = false;
		const tick = () => {
			const word = words[wi];
			if (!deleting) {
				ci++;
				if (ci >= word.length) {
					ci = word.length;
					deleting = true;
					rot.textContent = word;
					return setTimeout(tick, 1600);
				}
			} else {
				ci--;
				if (ci <= 0) {
					deleting = false;
					wi = (wi + 1) % words.length;
					ci = 0;
				}
			}
			rot.textContent = words[wi].slice(0, ci);
			setTimeout(tick, deleting ? 55 : 105);
		};
		rot.textContent = words[0];
		setTimeout(tick, 1800);
	}

	/* ---- drag-scroll carousel ---- */
	const rail = document.getElementById("rail");
	if (rail) {
		let down = false,
			startX = 0,
			startScroll = 0,
			moved = 0;
		rail.addEventListener("pointerdown", (e) => {
			down = true;
			moved = 0;
			startX = e.clientX;
			startScroll = rail.scrollLeft;
			rail.classList.add("drag");
			rail.setPointerCapture(e.pointerId);
		});
		rail.addEventListener("pointermove", (e) => {
			if (!down) return;
			const dx = e.clientX - startX;
			moved = Math.max(moved, Math.abs(dx));
			rail.scrollLeft = startScroll - dx;
		});
		const end = (e) => {
			if (!down) return;
			down = false;
			rail.classList.remove("drag");
			try {
				rail.releasePointerCapture(e.pointerId);
			} catch (_) {}
		};
		rail.addEventListener("pointerup", end);
		rail.addEventListener("pointercancel", end);
		// prevent accidental link click after a drag
		rail.addEventListener(
			"click",
			(e) => {
				if (moved > 6) {
					e.preventDefault();
					e.stopPropagation();
				}
			},
			true,
		);
	}

	/* ---- contact form ---- */
	const form = document.getElementById("form");
	if (form) {
		const ok = document.getElementById("ok");
		const send = document.getElementById("send");
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			if (!form.checkValidity()) {
				form.reportValidity();
				return;
			}
			send.textContent = "Sending…";
			send.disabled = true;
			setTimeout(() => {
				form.querySelectorAll("input, textarea").forEach((f) => (f.value = ""));
				ok.hidden = false;
				send.textContent = "Send Message";
				send.disabled = false;
			}, 650);
		});
	}
})();
