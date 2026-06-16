import { Logo } from "./Logo";
import { Shell } from "./primitives";

const COLUMNS: { title: string; links: string[] }[] = [
	{
		title: "Product",
		links: ["Features", "Tonal engine", "Pricing", "Changelog", "Roadmap"],
	},
	{
		title: "Developers",
		links: ["Documentation", "Token API", "Figma plugin", "Native SDKs", "Status"],
	},
	{
		title: "Company",
		links: ["About", "Journal", "Careers", "Brand kit", "Contact"],
	},
];

export function Footer() {
	return (
		<footer className="bg-[var(--color-md-surface)] pb-10 pt-16">
			<Shell>
				<div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
					<div className="max-w-sm">
						<Logo />
						<p className="mt-4 leading-relaxed text-[var(--color-md-on-variant)]">
							A theming toolkit built on Material You. Seed one color, ship a
							whole tonal system — warm, personal and accessible by default.
						</p>
						<div className="mt-6 flex gap-2">
							{["X", "Dribbble", "GitHub"].map((s) => (
								<a
									key={s}
									href="#"
									aria-label={s}
									className="focus-ring grid h-11 w-11 place-items-center rounded-full bg-[var(--color-md-container)] text-sm font-medium text-[var(--color-md-on-variant)] transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-[var(--color-md-secondary-container)] hover:text-[var(--color-md-on-secondary-container)] active:scale-95"
								>
									{s[0]}
								</a>
							))}
						</div>
					</div>

					{COLUMNS.map((col) => (
						<nav key={col.title} aria-label={col.title}>
							<h3 className="t-label-s mb-4 uppercase tracking-[0.1em] text-[var(--color-md-on-variant)]">
								{col.title}
							</h3>
							<ul className="flex flex-col gap-3">
								{col.links.map((l) => (
									<li key={l}>
										<a
											href="#"
											className="focus-ring rounded-md text-[var(--color-md-on-bg)] transition-colors duration-200 hover:text-[var(--color-md-primary)]"
										>
											{l}
										</a>
									</li>
								))}
							</ul>
						</nav>
					))}
				</div>

				<div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[var(--color-md-outline-variant)] pt-7 sm:flex-row">
					<p className="text-sm text-[var(--color-md-on-variant)]">
						© {new Date().getFullYear()} Lumi Labs. Crafted with Material You.
					</p>
					<div className="flex gap-5 text-sm text-[var(--color-md-on-variant)]">
						<a href="#" className="focus-ring rounded-md hover:text-[var(--color-md-on-bg)]">
							Privacy
						</a>
						<a href="#" className="focus-ring rounded-md hover:text-[var(--color-md-on-bg)]">
							Terms
						</a>
						<a href="#" className="focus-ring rounded-md hover:text-[var(--color-md-on-bg)]">
							Cookies
						</a>
					</div>
				</div>
			</Shell>
		</footer>
	);
}
