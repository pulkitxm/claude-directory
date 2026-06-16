import { Heart } from "lucide-react";
import { Logo } from "./Logo";
import { Shell, display } from "./primitives";

const COLUMNS: { title: string; links: string[] }[] = [
	{
		title: "Product",
		links: ["Components", "Tokens", "Showcase", "Pricing", "Changelog"],
	},
	{
		title: "Resources",
		links: ["Docs", "Figma library", "Playground", "Templates"],
	},
	{
		title: "Company",
		links: ["About", "Makers", "Careers", "Contact"],
	},
];

export function Footer() {
	return (
		<footer className="px-5 pb-10 pt-8 sm:px-8">
			<div className="mx-auto w-full max-w-7xl">
				<div className="rounded-[40px] clay-tray p-8 shadow-clay-deep sm:p-12">
					<Shell className="px-0">
						<div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
							<div>
								<Logo />
								<p className="mt-4 max-w-xs text-base leading-relaxed text-clay-muted">
									The high-fidelity claymorphism design system. Tactile,
									accessible, and unreasonably fun to press.
								</p>
								<div className="mt-6 flex gap-3">
									{(
										[
											["linear-gradient(135deg,#c4b5fd,#7c3aed)", "Tw"],
											["linear-gradient(135deg,#f9a8d4,#db2777)", "Dr"],
											["linear-gradient(135deg,#7dd3fc,#0284c7)", "Gh"],
										] as const
									).map(([bg, label]) => (
										<a
											key={label}
											href="#top"
											aria-label={label}
											style={{ backgroundImage: bg }}
											className="grid h-11 w-11 place-items-center rounded-2xl text-white shadow-clay-button outline-none transition-all duration-200 hover:-translate-y-1 active:scale-90 active:shadow-clay-pressed focus-visible:ring-4 focus-visible:ring-clay-accent/35"
										>
											<span style={display} className="text-sm font-black">
												{label}
											</span>
										</a>
									))}
								</div>
							</div>

							{COLUMNS.map((col) => (
								<div key={col.title}>
									<h3
										style={display}
										className="text-sm font-extrabold uppercase tracking-[0.18em] text-clay-foreground"
									>
										{col.title}
									</h3>
									<ul className="mt-4 flex flex-col gap-3">
										{col.links.map((link) => (
											<li key={link}>
												<a
													href="#top"
													className="rounded-lg text-base font-medium text-clay-muted outline-none transition-colors duration-200 hover:text-clay-accent focus-visible:ring-4 focus-visible:ring-clay-accent/25"
												>
													{link}
												</a>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>

						<div className="mt-10 flex flex-col items-center justify-between gap-4 border-t-2 border-clay-foreground/8 pt-7 sm:flex-row">
							<p className="text-sm font-medium text-clay-muted">
								© {new Date().getFullYear()} Claymakers. A design-system showcase.
							</p>
							<p className="inline-flex items-center gap-1.5 text-sm font-medium text-clay-muted">
								Molded with
								<Heart size={14} className="text-clay-accent-alt" fill="currentColor" />
								and four shadow layers.
							</p>
						</div>
					</Shell>
				</div>
			</div>
		</footer>
	);
}
