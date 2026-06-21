import { footer, brand, nav } from "../data/content";

export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="relative z-10 border-t border-border bg-background">
			<div className="container-wide py-20 md:py-24">
				<div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
					{/* brand block */}
					<div className="col-span-2 md:col-span-1">
						<a
							href="#top"
							className="inline-flex items-baseline gap-1.5 font-display text-2xl text-foreground"
						>
							<span>Roman</span>
							<span className="text-accent">&amp;</span>
							<span>Quill</span>
						</a>
						<p className="mt-5 max-w-xs text-[0.97rem] leading-relaxed text-muted-foreground">
							{footer.blurb}
						</p>
						<address className="small-caps mt-7 space-y-1 not-italic text-muted-foreground">
							{footer.address.map((line) => (
								<div key={line}>{line}</div>
							))}
						</address>
					</div>

					{/* link columns */}
					{footer.columns.map((col) => (
						<nav key={col.heading} aria-label={col.heading}>
							<h3 className="small-caps mb-5 text-foreground">{col.heading}</h3>
							<ul className="space-y-3">
								{col.links.map((link) => (
									<li key={link}>
										<a
											href="#"
											className="text-[0.95rem] text-muted-foreground transition-colors duration-200 hover:text-accent"
										>
											{link}
										</a>
									</li>
								))}
							</ul>
						</nav>
					))}
				</div>

				{/* decorative rule with ornament */}
				<div className="mt-16 flex items-center gap-4" aria-hidden>
					<span className="rule flex-1" />
					<span className="font-display text-accent">&#10086;</span>
					<span className="rule flex-1" />
				</div>

				{/* bottom row */}
				<div className="mt-8 flex flex-col items-center justify-between gap-5 md:flex-row">
					<p className="small-caps text-muted-foreground">
						&copy; {year} {brand.name} &middot; {brand.est}
					</p>
					<div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
						{nav.map((item) => (
							<a
								key={item.href}
								href={item.href}
								className="small-caps text-[0.66rem] text-muted-foreground transition-colors hover:text-accent"
							>
								{item.label}
							</a>
						))}
					</div>
					<p className="small-caps text-muted-foreground">{brand.tagline}</p>
				</div>
			</div>
		</footer>
	);
}
