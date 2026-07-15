const root = document.documentElement;
const applyTheme = (theme) => {
	root.classList.toggle("dark", theme === "dark");
	root.classList.toggle("light", theme !== "dark");
	root.style.colorScheme = theme;
};
const storedTheme = localStorage.getItem("kinto-theme");
if (storedTheme) applyTheme(storedTheme);

document.addEventListener("click", (event) => {
	const button = event.target.closest("button");
	if (!button) return;
	const label = `${button.getAttribute("aria-label") || ""} ${button.textContent || ""}`;
	if (/close banner/i.test(label)) {
		button.closest(".bg-primary")?.remove();
		return;
	}
	if (/theme/i.test(label) || button.querySelector(".lucide-sun")) {
		const theme = root.classList.contains("dark") ? "light" : "dark";
		applyTheme(theme);
		localStorage.setItem("kinto-theme", theme);
		return;
	}
	if (button.textContent?.trim() === "Menu") {
		const navigation = button.closest("nav");
		const logo = navigation?.querySelector("a")?.innerHTML || "<span>Kinto</span>";
		const overlay = document.createElement("div");
		overlay.className = "fixed inset-0 z-50 flex flex-col bg-background px-4 py-6";
		overlay.innerHTML = `<div class="flex items-center justify-between"><a class="text-foreground flex items-center gap-2 px-1 font-display text-base" href="index.html">${logo}</a><button class="font-mono text-[0.625rem] tracking-wider uppercase text-muted-foreground" data-menu-close>Close</button></div><div class="mt-44"><a class="flex items-center gap-5 border-b border-dashed border-border py-5" href="about.html"><span class="font-mono text-xs text-accent">01</span><span class="font-display text-4xl">About</span></a><a class="flex items-center gap-5 border-b border-dashed border-border py-5" href="pricing.html"><span class="font-mono text-xs text-accent">02</span><span class="font-display text-4xl">Pricing</span></a><a class="flex items-center gap-5 border-b border-dashed border-border py-5" href="blog.html"><span class="font-mono text-xs text-accent">03</span><span class="font-display text-4xl">Blog</span></a><a class="flex items-center gap-5 border-b border-dashed border-border py-5" href="changelog.html"><span class="font-mono text-xs text-accent">04</span><span class="font-display text-4xl">Changelog</span></a></div><div class="mt-auto grid grid-cols-2 gap-3"><a class="flex h-12 items-center justify-center rounded-lg border border-border" href="login.html">Sign in</a><a class="flex h-12 items-center justify-center rounded-lg bg-primary text-primary-foreground" href="signup.html">Start writing</a></div>`;
		document.body.append(overlay);
		document.body.style.overflow = "hidden";
		overlay.querySelector("[data-menu-close]")?.addEventListener("click", () => {
			overlay.remove();
			document.body.style.overflow = "";
		});
		return;
	}
	if (/load more/i.test(button.textContent || "")) {
		const wrap = document.createElement("div");
		wrap.innerHTML = `<a class="group border-accent-light flex gap-4 border-b py-5 no-underline last:border-b-0 md:gap-6 md:py-6" href="blog/journaling-prompts-that-work.html"><span class="text-muted-foreground w-16 shrink-0 pt-0.5 font-mono text-[0.625rem] md:w-24">Jan 5</span><div class="min-w-0 flex-1"><h3 class="group-hover:text-accent text-base tracking-tight transition-colors duration-300 md:text-lg">Journaling prompts that actually lead somewhere</h3><p class="text-muted-foreground mt-1.5 text-sm leading-relaxed">Most prompt lists are surface-level. Here are the ones that consistently unlock deeper thinking and honest self-reflection.</p></div></a><a class="group border-accent-light flex gap-4 border-b py-5 no-underline last:border-b-0 md:gap-6 md:py-6" href="blog/journaling-at-night.html"><span class="text-muted-foreground w-16 shrink-0 pt-0.5 font-mono text-[0.625rem] md:w-24">Dec 28</span><div class="min-w-0 flex-1"><h3 class="group-hover:text-accent text-base tracking-tight transition-colors duration-300 md:text-lg">Why nighttime journaling helps you sleep better</h3><p class="text-muted-foreground mt-1.5 text-sm leading-relaxed">A racing mind at bedtime is the enemy of good sleep. A short journaling practice before bed can quiet the noise and help you let go of the day.</p></div></a><a class="group border-accent-light flex gap-4 border-b py-5 no-underline last:border-b-0 md:gap-6 md:py-6" href="blog/rereading-your-journal.html"><span class="text-muted-foreground w-16 shrink-0 pt-0.5 font-mono text-[0.625rem] md:w-24">Dec 15</span><div class="min-w-0 flex-1"><h3 class="group-hover:text-accent text-base tracking-tight transition-colors duration-300 md:text-lg">The hidden value of rereading your journal</h3><p class="text-muted-foreground mt-1.5 text-sm leading-relaxed">Most people write in their journal but never look back. Rereading is where the real insights live, and it is easier than you think.</p></div></a>`;
		const parent = button.parentElement;
		while (wrap.firstChild) parent?.parentElement?.insertBefore(wrap.firstChild, parent);
		parent?.remove();
	}
});

for (const form of document.querySelectorAll("form")) form.addEventListener("submit", (event) => event.preventDefault());
