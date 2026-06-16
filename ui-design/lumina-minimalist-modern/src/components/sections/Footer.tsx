import { BrandMark } from "@/components/ui/BrandMark";

const COLUMNS = [
	{
		title: "Product",
		links: ["Features", "Pricing", "Integrations", "Changelog"],
	},
	{
		title: "Company",
		links: ["About", "Careers", "Blog", "Contact"],
	},
	{
		title: "Resources",
		links: ["Docs", "API", "Status", "Security"],
	},
];

export function Footer() {
	return (
		<footer className="border-t border-border bg-background">
			<div className="mx-auto max-w-6xl px-5 py-16">
				<div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
					<div>
						<BrandMark />
						<p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
							Product clarity, made effortless. One calm overview for the
							metrics that move your business.
						</p>
					</div>

					{COLUMNS.map((col) => (
						<div key={col.title}>
							<h4 className="font-mono text-xs uppercase tracking-label text-muted-foreground">
								{col.title}
							</h4>
							<ul className="mt-4 flex flex-col gap-3">
								{col.links.map((link) => (
									<li key={link}>
										<a
											href="#top"
											className="text-sm text-foreground/70 transition-colors hover:text-accent"
										>
											{link}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
					<p className="text-sm text-muted-foreground">
						© {new Date().getFullYear()} Lumina, Inc. All rights reserved.
					</p>
					<div className="flex items-center gap-6">
						<a
							href="#top"
							className="text-sm text-muted-foreground transition-colors hover:text-foreground"
						>
							Privacy
						</a>
						<a
							href="#top"
							className="text-sm text-muted-foreground transition-colors hover:text-foreground"
						>
							Terms
						</a>
						<span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
							<span className="relative flex h-2 w-2">
								<span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-accent" />
								<span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
							</span>
							All systems operational
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
