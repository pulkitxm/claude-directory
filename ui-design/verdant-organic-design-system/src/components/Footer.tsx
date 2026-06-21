import { Instagram, Twitter, Youtube, Sprout } from "lucide-react";
import { Logo } from "./Logo";
import { brand } from "../lib/content";

const columns = [
	{
		title: "Apothecary",
		links: [
			"All blends",
			"Morning teas",
			"Evening tonics",
			"Seasonal & rare",
			"Gift tins",
		],
	},
	{
		title: "The house",
		links: [
			"Our story",
			"Foraging journal",
			"Stewardship pledge",
			"Stockists",
			"Visit the table",
		],
	},
	{
		title: "Care",
		links: [
			"Brewing notes",
			"Shipping & returns",
			"Refill a tin",
			"Contact us",
			"FAQ",
		],
	},
];

const socials = [
	{ icon: Instagram, label: "Instagram" },
	{ icon: Twitter, label: "Twitter" },
	{ icon: Youtube, label: "YouTube" },
];

/**
 * Grounding footer with a brand column, three link columns, and social icons
 * in moss-tinted round containers that fill on hover. A faint top border in
 * timber separates it from the page above.
 */
export function Footer() {
	return (
		<footer className="relative border-t border-border/60 bg-background px-4 pb-10 pt-20 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
					{/* brand column */}
					<div className="max-w-sm">
						<Logo />
						<p className="mt-5 text-base leading-relaxed text-muted-foreground">
							{brand.tagline}. Foraged in season, cured slowly, packed in paper,
							and planted back into the earth.
						</p>
						<div className="mt-6 flex gap-3">
							{socials.map(({ icon: Icon, label }) => (
								<a
									key={label}
									href="#top"
									aria-label={label}
									className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary transition-all duration-300 ease-organic hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
								>
									<Icon size={19} />
								</a>
							))}
						</div>
					</div>

					{/* link columns */}
					{columns.map((col) => (
						<nav key={col.title} aria-label={col.title}>
							<h3 className="font-serif text-base font-semibold text-foreground">
								{col.title}
							</h3>
							<ul className="mt-4 space-y-2.5">
								{col.links.map((link) => (
									<li key={link}>
										<a
											href="#top"
											className="text-sm font-semibold text-muted-foreground transition-colors duration-300 hover:text-primary"
										>
											{link}
										</a>
									</li>
								))}
							</ul>
						</nav>
					))}
				</div>

				<div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row">
					<p className="text-sm font-semibold text-muted-foreground">
						© {new Date().getFullYear()} {brand.name} Apothecary. Shaped by
						hand.
					</p>
					<p className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
						<Sprout size={15} className="text-primary" />
						Carbon-light shipping · 1.4k trees planted with you
					</p>
				</div>
			</div>
		</footer>
	);
}
