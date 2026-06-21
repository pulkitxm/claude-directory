import { ArrowUp, Github, Rss, Send, Twitter } from "lucide-react";

const COLUMNS = [
	{
		head: "The Desks",
		links: ["Front Page", "The Wire", "Investigations", "Standards", "Op-Ed"],
	},
	{
		head: "The Paper",
		links: ["About", "Charter", "Corrections", "Ethics", "Masthead"],
	},
	{
		head: "Subscribe",
		links: [
			"Home Delivery",
			"The Bureau",
			"Gift an edition",
			"The Wire",
			"RSS",
		],
	},
];

const SOCIAL = [
	{ icon: Twitter, label: "Follow on X" },
	{ icon: Github, label: "Source on GitHub" },
	{ icon: Rss, label: "Subscribe by RSS" },
	{ icon: Send, label: "Contact the desk" },
];

/**
 * The colophon / footer. Asymmetric link grid (2-col nameplate + three link
 * columns), bordered social boxes, and the printer's imprint line. Closes the
 * edition the way a broadsheet does — with where, when, and by whom it was set.
 */
export function Colophon() {
	return (
		<footer className="bg-ink text-paper">
			<div className="mx-auto max-w-screen-xl px-4">
				<div className="grid grid-cols-2 border-l border-t border-paper/20 lg:grid-cols-5">
					{/* Nameplate block — 2 columns. */}
					<div className="col-span-2 border-b border-r border-paper/20 p-8 lg:p-10">
						<div className="flex items-baseline gap-2">
							<span className="font-serif text-2xl font-black uppercase tracking-tight lg:text-3xl">
								The Newsprint
							</span>
							<span className="inline-block h-2.5 w-2.5 bg-editorial" />
						</div>
						<p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-neutral-400">
							A publication of record for the age of machine intelligence. All
							the signal that's fit to print — set in cold metal type, filed
							before dawn, and kept on the record.
						</p>
						<div className="mt-7 flex gap-2">
							{SOCIAL.map(({ icon: Icon, label }) => (
								<a
									key={label}
									href="#top"
									aria-label={label}
									className="flex h-11 w-11 items-center justify-center border border-paper/40 text-paper transition-all duration-200 hover:bg-paper hover:text-ink"
								>
									<Icon className="h-5 w-5" strokeWidth={1.5} />
								</a>
							))}
						</div>
					</div>

					{/* Link columns. */}
					{COLUMNS.map((col) => (
						<nav
							key={col.head}
							aria-label={col.head}
							className="border-b border-r border-paper/20 p-8"
						>
							<h2 className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-neutral-400">
								{col.head}
							</h2>
							<ul className="mt-5 space-y-3">
								{col.links.map((link) => (
									<li key={link}>
										<a
											href="#top"
											className="font-body text-sm text-neutral-300 transition-colors duration-200 hover:text-editorial"
										>
											{link}
										</a>
									</li>
								))}
							</ul>
						</nav>
					))}
				</div>

				{/* Imprint line. */}
				<div className="flex flex-col items-start justify-between gap-4 py-7 sm:flex-row sm:items-center">
					<p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-neutral-400">
						Edition: Vol 1.0 · Printed in NYC · &copy;{" "}
						{new Date().getFullYear()} The Newsprint
					</p>
					<p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-neutral-400">
						Set in Playfair · Lora · Inter · JetBrains Mono
					</p>
					<a
						href="#top"
						className="group inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-paper transition-colors hover:text-editorial"
					>
						Back to the front page
						<span className="flex h-8 w-8 items-center justify-center border border-paper/40 transition-all duration-200 group-hover:bg-paper group-hover:text-ink">
							<ArrowUp className="h-4 w-4" strokeWidth={1.5} />
						</span>
					</a>
				</div>
			</div>
		</footer>
	);
}
