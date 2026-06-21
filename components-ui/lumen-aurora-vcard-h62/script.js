/* ============================================================
   LUMEN AURORA — single source of truth + behaviour
   ============================================================ */

const PROFILE = {
	firstName: "Nova",
	lastName: "Härenberg",
	fullName: "Nova Härenberg",
	role: "Creative Technologist & Generative Artist",
	org: "Studio Lumen",
	bio: "I build living interfaces where code, light, and motion meet — shaders, generative systems, and the occasional impossible deadline. Based in the north, shipping everywhere.",
	tags: ["WebGL", "Creative Code", "Art Direction"],
	email: "nova@studio-lumen.art",
	phone: "+46701234567", // E.164, used for tel + vCard
	phoneDisplay: "+46 70 123 45 67",
	whatsapp: "46701234567", // wa.me number, no plus
	url: "https://nova-harenberg.art",
	location: "Stockholm, SE",
	timeZone: "Europe/Stockholm",
	tzLabel: "CET",
	socials: {
		x: "https://x.com/novaharenberg",
		gh: "https://github.com/novaharenberg",
		dr: "https://dribbble.com/novaharenberg",
		li: "https://linkedin.com/in/novaharenberg",
		ig: "https://instagram.com/novaharenberg",
	},
};

/* ---------- populate page from data ---------- */
function hydrate() {
	const set = (id, fn) => {
		const el = document.getElementById(id);
		if (el) fn(el);
	};
	set("name", (el) => (el.textContent = PROFILE.fullName));
	set("role", (el) => (el.innerHTML = PROFILE.role.replace("&", "&amp;")));
	set("bio", (el) => (el.textContent = PROFILE.bio));
	set("loc", (el) => (el.textContent = PROFILE.location));
	set("tz", (el) => (el.textContent = PROFILE.tzLabel));

	set("tags", (el) => {
		el.innerHTML = "";
		PROFILE.tags.forEach((t) => {
			const li = document.createElement("li");
			li.innerHTML = t.replace(/ /g, "&nbsp;");
			el.appendChild(li);
		});
	});

	set(
		"link-email",
		(el) =>
			(el.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent("Hello Nova")}`),
	);
	set("link-call", (el) => (el.href = `tel:${PROFILE.phone}`));
	set(
		"link-wa",
		(el) =>
			(el.href = `https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent("Hi Nova! I found your Lumen card.")}`),
	);

	const s = PROFILE.socials;
	set("soc-x", (el) => (el.href = s.x));
	set("soc-gh", (el) => (el.href = s.gh));
	set("soc-dr", (el) => (el.href = s.dr));
	set("soc-li", (el) => (el.href = s.li));
	set("soc-ig", (el) => (el.href = s.ig));
}

/* ---------- live clock in profile timezone ---------- */
function startClock() {
	const out = document.getElementById("clock");
	if (!out) return;
	const fmt = new Intl.DateTimeFormat("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
		timeZone: PROFILE.timeZone,
	});
	const tick = () => {
		try {
			out.textContent = fmt.format(new Date());
		} catch {
			out.textContent = new Date().toLocaleTimeString();
		}
	};
	tick();
	setInterval(tick, 1000);
}

/* ---------- vCard 3.0 generation, fully client-side ---------- */
function buildVCard() {
	const lines = [
		"BEGIN:VCARD",
		"VERSION:3.0",
		`N:${PROFILE.lastName};${PROFILE.firstName};;;`,
		`FN:${PROFILE.fullName}`,
		`ORG:${PROFILE.org}`,
		`TITLE:${PROFILE.role}`,
		`EMAIL;TYPE=INTERNET,WORK:${PROFILE.email}`,
		`TEL;TYPE=CELL:${PROFILE.phone}`,
		`URL:${PROFILE.url}`,
		`ADR;TYPE=WORK:;;;${PROFILE.location};;;`,
		`NOTE:${PROFILE.bio.replace(/\n/g, "\\n").replace(/,/g, "\\,")}`,
		`REV:${new Date().toISOString()}`,
		"END:VCARD",
	];
	return lines.join("\r\n");
}

function saveContact() {
	const blob = new Blob([buildVCard()], { type: "text/vcard;charset=utf-8" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `${PROFILE.fullName.replace(/\s+/g, "-")}.vcf`;
	document.body.appendChild(a);
	a.click();
	a.remove();
	setTimeout(() => URL.revokeObjectURL(url), 1500);
	toast("Contact downloaded");
}

/* ---------- copy link ---------- */
async function copyLink() {
	const link = window.location.href.split("#")[0];
	try {
		if (navigator.clipboard && window.isSecureContext) {
			await navigator.clipboard.writeText(link);
		} else {
			const t = document.createElement("textarea");
			t.value = link;
			t.style.position = "fixed";
			t.style.opacity = "0";
			document.body.appendChild(t);
			t.select();
			document.execCommand("copy");
			t.remove();
		}
		toast("Link copied");
	} catch {
		toast("Copy failed — long-press to copy");
	}
}

/* ---------- toast ---------- */
let toastTimer;
function toast(msg) {
	const el = document.getElementById("toast");
	if (!el) return;
	el.textContent = msg;
	el.classList.add("show");
	clearTimeout(toastTimer);
	toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

/* ---------- pointer parallax + specular (desktop only) ---------- */
function initParallax() {
	const card = document.getElementById("card");
	if (!card) return;
	const fine = window.matchMedia("(pointer: fine)").matches;
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (!fine || reduced) return;

	const MAX = 6;
	let raf = 0;
	function move(e) {
		const r = card.getBoundingClientRect();
		const px = (e.clientX - r.left) / r.width;
		const py = (e.clientY - r.top) / r.height;
		const rx = (0.5 - py) * MAX;
		const ry = (px - 0.5) * MAX;
		cancelAnimationFrame(raf);
		raf = requestAnimationFrame(() => {
			card.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
			card.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
			card.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
		});
	}
	function reset() {
		cancelAnimationFrame(raf);
		card.style.transform = "";
	}
	card.addEventListener("pointermove", move);
	card.addEventListener("pointerleave", reset);
}

/* ---------- boot ---------- */
function init() {
	hydrate();
	startClock();
	initParallax();
	document
		.getElementById("save-contact")
		?.addEventListener("click", saveContact);
	document.getElementById("copy-link")?.addEventListener("click", copyLink);
	requestAnimationFrame(() =>
		document.getElementById("card")?.classList.add("in"),
	);
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}
