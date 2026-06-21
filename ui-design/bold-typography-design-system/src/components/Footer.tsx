import { Twitter, Linkedin, Github } from "lucide-react";
import { brand, footer } from "../data/content";

// ─────────────────────────────────────────────────────────────────────────────
// Footer — a 2 → 4 → 5 column layout. The first (wide) column carries the
// wordmark, blurb and social icons (lucide, 1.5px, 18px, outline only); the
// remaining columns are mono-labelled link lists. A full-width rule and a fine
// mono baseline close the page.
// ─────────────────────────────────────────────────────────────────────────────

const socials = [
	{ Icon: Twitter, label: "Twitter", href: "#" },
	{ Icon: Linkedin, label: "LinkedIn", href: "#" },
	{ Icon: Github, label: "GitHub", href: "#" },
];

export function Footer() {
	return (
		<footer className="bg-background py-16 md:py-20">
			<div className="container-bold">
				<div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
					{/* Brand column spans wide */}
					<div className="col-span-2">
						<a
							href="#top"
							className="inline-flex items-baseline gap-1.5 text-foreground"
						>
							<span className="text-2xl font-extrabold tracking-tight">
								{brand.name}
							</span>
							<span aria-hidden className="h-1.5 w-1.5 bg-accent" />
						</a>
						<p className="mt-5 max-w-xs text-sm leading-normal text-muted-foreground">
							{footer.blurb}
						</p>
						<div className="mt-6 flex items-center gap-4">
							{socials.map(({ Icon, label, href }) => (
								<a
									key={label}
									href={href}
									aria-label={label}
									className="inline-flex h-11 w-11 items-center justify-center text-muted-foreground transition-colors duration-150 hover:text-accent"
								>
									<Icon size={18} strokeWidth={1.5} aria-hidden />
								</a>
							))}
						</div>
					</div>

					{/* Link columns */}
					{footer.columns.map((col) => (
						<nav key={col.title} aria-label={col.title}>
							<h3 className="label-mono">{col.title}</h3>
							<ul className="mt-5 space-y-3">
								{col.links.map((link) => (
									<li key={link}>
										<a
											href="#"
											className="group relative inline-block text-sm text-foreground/80 transition-colors duration-150 hover:text-foreground"
										>
											{link}
											<span
												aria-hidden
												className="absolute -bottom-0.5 left-0 right-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-150 ease-crisp group-hover:scale-x-100"
											/>
										</a>
									</li>
								))}
							</ul>
						</nav>
					))}
				</div>

				<div className="mt-14 flex flex-col gap-3 border-t border-border pt-8 font-mono text-xs uppercase tracking-wide text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
					<span>
						© 2026 {brand.name}. {brand.tagline}.
					</span>
					<span>
						Set in Inter Tight, Playfair Display &amp; JetBrains Mono.
					</span>
				</div>
			</div>
		</footer>
	);
}
