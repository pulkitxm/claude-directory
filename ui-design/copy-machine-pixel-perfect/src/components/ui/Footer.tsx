import { CircuitBoard, Github, Linkedin, Twitter } from "lucide-react";

const COLUMNS: { heading: string; links: string[] }[] = [
	{
		heading: "Studio",
		links: [
			"Schematic editor",
			"Layout & routing",
			"DRC engine",
			"Signal integrity",
			"Component library",
		],
	},
	{
		heading: "Manufacturing",
		links: [
			"Gerber export",
			"Assembly ordering",
			"Fab partners",
			"Stack-up builder",
			"BOM tools",
		],
	},
	{
		heading: "Company",
		links: ["About", "Changelog", "Careers", "Hardware blog", "Status"],
	},
];

const SOCIALS = [
	{ Icon: Github, label: "GitHub" },
	{ Icon: Twitter, label: "X" },
	{ Icon: Linkedin, label: "LinkedIn" },
];

export function Footer() {
	return (
		<footer className="relative border-t border-substrate-600/60 bg-substrate-900/60 px-5 pb-10 pt-16">
			<div className="mx-auto max-w-6xl">
				<div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
					{/* brand */}
					<div className="col-span-2">
						<a
							href="#top"
							className="flex items-center gap-2.5"
							aria-label="Foundry home"
						>
							<span className="relative grid h-8 w-8 place-items-center rounded-[10px] border border-copper/40 bg-copper/[0.08]">
								<CircuitBoard className="h-[18px] w-[18px] text-copper" />
								<span className="absolute right-1 top-1 h-1 w-1 rounded-full bg-mask" />
							</span>
							<span className="font-display text-[17px] font-bold tracking-tightest text-silk">
								Foundry
							</span>
						</a>
						<p className="mt-4 max-w-xs text-sm leading-relaxed text-silk-dim">
							The browser-native board studio for hardware teams. Route copper,
							run DRC, and ship assembled boards — without the export dance.
						</p>
						<div className="mt-5 flex items-center gap-2">
							{SOCIALS.map(({ Icon, label }) => (
								<a
									key={label}
									href="#cta"
									aria-label={label}
									className="grid h-9 w-9 place-items-center rounded-full border border-substrate-500 text-silk-dim transition-colors hover:border-copper/40 hover:text-copper"
								>
									<Icon className="h-4 w-4" />
								</a>
							))}
						</div>
					</div>

					{COLUMNS.map((col) => (
						<div key={col.heading}>
							<h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-silk-faint">
								{col.heading}
							</h4>
							<ul className="mt-4 space-y-2.5">
								{col.links.map((link) => (
									<li key={link}>
										<a
											href="#cta"
											className="text-sm text-silk-dim transition-colors hover:text-silk"
										>
											{link}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-substrate-600/60 pt-6 sm:flex-row">
					<p className="font-mono text-[11px] text-silk-faint">
						© {new Date().getFullYear()} Foundry Labs · Routed at 0.1mm
					</p>
					<div className="flex items-center gap-5 font-mono text-[11px] text-silk-faint">
						<a href="#cta" className="transition-colors hover:text-silk-dim">
							Privacy
						</a>
						<a href="#cta" className="transition-colors hover:text-silk-dim">
							Terms
						</a>
						<a href="#cta" className="transition-colors hover:text-silk-dim">
							Security
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
