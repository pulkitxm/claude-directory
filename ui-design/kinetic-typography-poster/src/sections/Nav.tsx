import { Button } from "../components/Button";

const LINKS = ["Program", "Process", "Pricing", "FAQ"];

/**
 * Sticky brutalist nav: 2px bottom line, zero radius, ink background. The
 * wordmark uses an acid block so the brand reads even at micro scale.
 */
export function Nav() {
	return (
		<header className="sticky top-0 z-50 border-b-2 border-line bg-ink/90 backdrop-blur-sm">
			<nav className="mx-auto flex h-16 max-w-[95vw] items-center justify-between md:h-20">
				<a
					href="#top"
					className="flex items-center gap-2 text-lg font-bold uppercase tracking-tighter md:text-2xl"
				>
					<span
						className="inline-block h-5 w-5 bg-acid md:h-6 md:w-6"
						aria-hidden="true"
					/>
					Motion<span className="text-acid">Type</span>
				</a>

				<ul className="hidden items-center gap-8 lg:flex">
					{LINKS.map((link) => (
						<li key={link}>
							<a
								href={`#${link.toLowerCase()}`}
								className="text-sm font-bold uppercase tracking-tight text-muted-foreground transition-colors hover:text-acid md:text-base"
							>
								{link}
							</a>
						</li>
					))}
				</ul>

				<a href="#tickets" className="shrink-0">
					<Button size="sm">Get Tickets</Button>
				</a>
			</nav>
		</header>
	);
}
