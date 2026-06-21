import { Github, Twitter, Radio } from "lucide-react";
import { Logo } from "./Logo";
import { Shell } from "./primitives";

const COLS: { title: string; links: string[] }[] = [
	{ title: "System", links: ["Modules", "Boot Seq", "Filesystem", "Licenses"] },
	{ title: "Relay", links: ["Documentation", "Changelog", "Status", "Readme"] },
	{
		title: "Operators",
		links: ["Discord", "Community", "Showcase", "Careers"],
	},
];

export function Footer() {
	return (
		<footer className="relative z-10 border-t-2 border-[var(--color-edge)] bg-[var(--color-void)]/70 pt-16 backdrop-blur-sm">
			<Shell>
				<div className="grid grid-cols-2 gap-10 pb-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
					<div className="col-span-2 md:col-span-1">
						<Logo />
						<p className="mt-5 max-w-xs font-mono text-sm leading-relaxed text-[var(--color-chrome)]/55">
							A retro-futuristic design system for interfaces that command a
							synthetic reality. Broadcasting from the year 2088.
						</p>
						<div className="mt-6 flex gap-3">
							{[Github, Twitter, Radio].map((Icon, i) => (
								<a
									key={i}
									href="#top"
									aria-label="social link"
									className="grid h-10 w-10 place-items-center border-2 border-[var(--color-edge)] text-[var(--color-chrome)]/70 transition-all duration-200 ease-linear hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)] hover:shadow-[0_0_12px_#00FFFF]"
								>
									<Icon size={18} />
								</a>
							))}
						</div>
					</div>

					{COLS.map((col) => (
						<div key={col.title}>
							<h4 className="font-heading text-sm font-bold uppercase tracking-widest text-[var(--color-magenta)]">
								{col.title}
							</h4>
							<ul className="mt-4 space-y-2.5">
								{col.links.map((link) => (
									<li key={link}>
										<a
											href="#top"
											className="font-mono text-sm text-[var(--color-chrome)]/60 transition-colors duration-200 ease-linear hover:text-[var(--color-cyan)]"
										>
											{link}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="flex flex-col items-center justify-between gap-3 border-t border-[var(--color-edge)] py-6 font-mono text-xs uppercase tracking-widest text-[var(--color-chrome)]/40 sm:flex-row">
					<span>&copy; 2088 NEONWAVE OS — all realities reserved</span>
					<span className="flex items-center gap-2">
						<span className="pulse-dot inline-block h-2 w-2 rounded-full bg-[var(--color-orange)] text-[var(--color-orange)]" />
						synthwave servers nominal
					</span>
				</div>
			</Shell>
		</footer>
	);
}
