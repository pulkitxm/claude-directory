const root = document.documentElement;
const storedTheme = localStorage.getItem("hive-theme");

if (storedTheme === "dark") {
	root.classList.remove("light");
	root.classList.add("dark");
	root.style.colorScheme = "dark";
}

document.querySelectorAll("[data-theme-toggle]").forEach((toggle) => {
	toggle.addEventListener("click", () => {
		const dark = root.classList.toggle("dark");
		root.classList.toggle("light", !dark);
		root.style.colorScheme = dark ? "dark" : "light";
		localStorage.setItem("hive-theme", dark ? "dark" : "light");
		toggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
	});
});

document.querySelectorAll('[aria-label="Close banner"]').forEach((button) => {
	button.addEventListener("click", () => {
		const banner = button.closest("body > div:not([hidden])");
		if (banner) banner.style.display = "none";
		document.querySelectorAll("header").forEach((header) => {
			header.style.marginTop = "0";
		});
	});
});

const nestedPage = /\/(projects|services)\/[^/]+\.html$/.test(location.pathname);
const prefix = nestedPage ? "../" : "";
const overlay = document.createElement("div");
overlay.id = "hive-menu";
overlay.hidden = true;
overlay.innerHTML = `<div class="hive-menu-top"><span>HIVE</span><div><a href="https://instagram.com/hive">Instagram</a><a href="https://x.com/hive">X / Twitter</a></div></div><nav><a href="${prefix}index.html">Home</a><a href="${prefix}services.html">Services</a><a href="${prefix}projects.html">Work</a><a href="${prefix}about.html">Studio</a><a href="${prefix}contact.html">Contact</a></nav><a class="hive-menu-mail" href="mailto:contact@hive.com">contact@hive.com</a>`;
document.body.append(overlay);

const menuStyle = document.createElement("style");
menuStyle.textContent = '#hive-menu{position:fixed;inset:0;z-index:40;background:var(--foreground);color:var(--background);padding:2rem;display:grid;grid-template-rows:auto 1fr auto;opacity:1;transition:opacity .3s ease}#hive-menu[hidden]{display:none}.hive-menu-top{display:flex;justify-content:space-between;text-transform:uppercase}.hive-menu-top div{display:flex;gap:1.5rem}#hive-menu nav{display:flex;flex-direction:column;align-items:center;justify-content:center}#hive-menu nav a{font-size:clamp(3rem,8vw,7rem);line-height:.95;letter-spacing:-.05em;text-transform:uppercase}.hive-menu-mail{font-size:1.25rem}body.hive-menu-open{overflow:hidden}body.hive-menu-open header{color:var(--background)!important;transform:translateY(0)!important;margin-top:0!important}';
document.head.append(menuStyle);

document.querySelectorAll('[aria-label="Toggle menu"]').forEach((button) => {
	button.addEventListener("click", () => {
		const open = overlay.hidden;
		overlay.hidden = !open;
		document.body.classList.toggle("hive-menu-open", open);
		button.setAttribute("aria-expanded", String(open));
		button.querySelector(".sr-only").textContent = open ? "Close main menu" : "Open main menu";
	});
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
	link.addEventListener("click", (event) => {
		const target = document.querySelector(link.getAttribute("href"));
		if (!target) return;
		event.preventDefault();
		target.scrollIntoView({ behavior: "smooth" });
	});
});

const clock = () =>
	new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		minute: "2-digit",
	}).format(new Date());

const updateClocks = () => {
	document.querySelectorAll("button").forEach((button) => {
		if (!button.querySelector(".lucide-clock")) return;
		button.lastChild.textContent = clock();
	});
};

updateClocks();
setInterval(updateClocks, 30_000);

let previousScroll = 0;
addEventListener("scroll", () => {
	const current = scrollY;
	document.querySelectorAll("header").forEach((header) => {
		header.style.transform = current > 120 && current > previousScroll ? "translateY(-120%)" : "translateY(0)";
	});
	previousScroll = current;
});

const filterNames = new Set(["All", "Logo Design", "Brand Identity", "Icon Design"]);
document.querySelectorAll("button").forEach((button) => {
	const label = button.textContent.trim();
	if (!filterNames.has(label)) return;
	button.addEventListener("click", () => {
		document.querySelectorAll("button").forEach((candidate) => {
			if (!filterNames.has(candidate.textContent.trim())) return;
			candidate.setAttribute("aria-pressed", String(candidate === button));
			candidate.style.opacity = candidate === button ? "1" : ".55";
		});
	});
});

document.querySelectorAll("form button:not([type='submit'])").forEach((button) => {
	button.addEventListener("click", () => {
		const selected = button.getAttribute("aria-pressed") === "true";
		button.setAttribute("aria-pressed", String(!selected));
		button.style.outline = selected ? "" : "2px solid currentColor";
	});
});

document.querySelectorAll('[aria-label="Next slide"], [aria-label="Previous slide"]').forEach((button) => {
	button.addEventListener("click", () => {
		const section = button.closest("section") || button.parentElement.parentElement;
		const dots = [...section.querySelectorAll('[aria-label^="Go to slide"]')];
		if (!dots.length) return;
		const current = Number(section.dataset.slide || 0);
		const step = button.getAttribute("aria-label") === "Next slide" ? 1 : -1;
		const next = (current + step + dots.length) % dots.length;
		section.dataset.slide = String(next);
		dots.forEach((dot, index) => {
			dot.setAttribute("aria-current", String(index === next));
			dot.style.opacity = index === next ? "1" : ".45";
		});
	});
});

document.querySelectorAll('[aria-label^="Go to slide"]').forEach((dot, index) => {
	dot.addEventListener("click", () => {
		const section = dot.closest("section") || dot.parentElement.parentElement;
		section.dataset.slide = String(index);
		section.querySelectorAll('[aria-label^="Go to slide"]').forEach((candidate) => {
			candidate.setAttribute("aria-current", String(candidate === dot));
			candidate.style.opacity = candidate === dot ? "1" : ".45";
		});
	});
});
