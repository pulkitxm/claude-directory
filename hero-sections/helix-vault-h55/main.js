/* Helix Vault — hero interactions */
(() => {
	var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	/* ---- scan-line travel distance matches dashboard width ---- */
	function sizeScan() {
		var dash = document.querySelector(".dash");
		var line = document.querySelector(".scanline");
		if (dash && line) {
			line.style.setProperty("--scan-end", `${dash.offsetWidth + 120}px`);
		}
	}
	sizeScan();
	window.addEventListener("resize", sizeScan);

	/* ---- count-up for net worth ---- */
	function formatMoney(cents) {
		var dollars = cents / 100;
		return (
			"$" +
			dollars.toLocaleString("en-US", {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			})
		);
	}
	function countUp(el) {
		var target = parseInt(el.getAttribute("data-target"), 10); // cents
		if (reduced) {
			el.textContent = formatMoney(target);
			return;
		}
		var start = performance.now();
		var dur = 1600;
		function tick(now) {
			var p = Math.min((now - start) / dur, 1);
			var eased = 1 - (1 - p) ** 3;
			el.textContent = formatMoney(Math.round(target * eased));
			if (p < 1) requestAnimationFrame(tick);
		}
		requestAnimationFrame(tick);
	}

	/* ---- reveal + trigger child animations ---- */
	var io = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				entry.target.classList.add("in");

				var net = entry.target.querySelector("#netWorth");
				if (net && !net.dataset.done) {
					net.dataset.done = "1";
					countUp(net);
				}

				var chart = entry.target.querySelector("#chart");
				if (chart && !chart.classList.contains("grow")) {
					chart.querySelectorAll(".bar").forEach((bar, i) => {
						setTimeout(
							() => {
								bar.style.height =
									getComputedStyle(bar).getPropertyValue("--h");
							},
							reduced ? 0 : i * 70,
						);
					});
					chart.classList.add("grow");
				}
				io.unobserve(entry.target);
			});
		},
		{ threshold: 0.18 },
	);

	document.querySelectorAll("[data-reveal]").forEach((el) => {
		io.observe(el);
	});

	/* fallback: ensure reveal even if observer misses (small viewports) */
	setTimeout(() => {
		document.querySelectorAll("[data-reveal]:not(.in)").forEach((el) => {
			var r = el.getBoundingClientRect();
			if (r.top < window.innerHeight) {
				el.classList.add("in");
				var net = el.querySelector("#netWorth");
				if (net && !net.dataset.done) {
					net.dataset.done = "1";
					countUp(net);
				}
				var chart = el.querySelector("#chart");
				if (chart && !chart.classList.contains("grow"))
					chart.classList.add("grow");
			}
		});
	}, 1200);

	/* ---- live-feel ticker flicker ---- */
	var solEl = document.getElementById("solPrice");
	if (solEl && !reduced) {
		var base = 145.2;
		setInterval(() => {
			var v = base + (Math.random() - 0.45) * 1.6;
			base = v;
			solEl.style.opacity = "0.5";
			solEl.textContent = `$${v.toFixed(2)}`;
			setTimeout(() => {
				solEl.style.opacity = "1";
			}, 120);
		}, 2600);
		solEl.style.transition = "opacity 0.18s ease";
	}

	/* ---- cursor glow ---- */
	var glow = document.getElementById("cursorGlow");
	if (glow && !reduced && window.matchMedia("(pointer:fine)").matches) {
		window.addEventListener("pointermove", (e) => {
			glow.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
			glow.style.opacity = "1";
		});
		window.addEventListener("pointerleave", () => {
			glow.style.opacity = "0";
		});
	}
})();
