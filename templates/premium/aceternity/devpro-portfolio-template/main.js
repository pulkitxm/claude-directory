const mobileMenu = document.getElementById("mobileMenu");
const menuButton = document.querySelector(".hamburger");

function setMenuOpen(open) {
	if (!mobileMenu || !menuButton) return;
	mobileMenu.classList.toggle("open", open);
	menuButton.setAttribute("aria-expanded", String(open));
	document.body.style.overflow = open ? "hidden" : "";
}

window.toggleMenu = () => {
	setMenuOpen(!mobileMenu?.classList.contains("open"));
};

menuButton?.setAttribute("aria-expanded", "false");
menuButton?.setAttribute("aria-controls", "mobileMenu");

mobileMenu?.querySelectorAll("a").forEach((link) => {
	link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape") setMenuOpen(false);
});

document.addEventListener("click", (event) => {
	if (!mobileMenu?.classList.contains("open")) return;
	if (mobileMenu.contains(event.target) || menuButton?.contains(event.target)) return;
	setMenuOpen(false);
});

document.getElementById("showMoreBtn")?.addEventListener(
	"click",
	(event) => {
		event.preventDefault();
		event.stopImmediatePropagation();
		window.location.href = "contributions.html";
	},
	true,
);
