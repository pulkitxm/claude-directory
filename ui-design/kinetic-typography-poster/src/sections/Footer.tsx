import { KineticMarquee } from "../components/KineticMarquee";

const NAV_COLUMNS = [
	{
		title: "Festival",
		links: ["Program", "Speakers", "Venue", "Schedule"],
	},
	{
		title: "Tickets",
		links: ["Floor", "Front Row", "Studio", "Groups"],
	},
	{
		title: "Studio",
		links: ["Work", "Process", "Writing", "Contact"],
	},
	{
		title: "Social",
		links: ["Instagram", "Are.na", "Read.cv", "RSS"],
	},
];

/**
 * Acid-flooded footer: a closing display lockup, a four-column nav grid, and a
 * final perpetual marquee so the page is still moving as it ends. Black on acid
 * keeps the contrast extreme.
 */
export function Footer() {
	return (
		<footer className="bg-acid text-acid-foreground">
			<div className="mx-auto max-w-[95vw] py-20 md:py-28">
				<div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
					<a
						href="#top"
						className="font-bold uppercase leading-[0.8] tracking-tighter text-[clamp(3rem,11vw,11rem)]"
					>
						Move
						<br />
						Type.
					</a>

					<nav className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:gap-12">
						{NAV_COLUMNS.map((col) => (
							<div key={col.title}>
								<h3 className="mb-4 text-xs font-bold uppercase tracking-widest md:text-sm">
									{col.title}
								</h3>
								<ul className="flex flex-col gap-2">
									{col.links.map((link) => (
										<li key={link}>
											<a
												href="#top"
												className="text-base font-medium underline-offset-4 transition-all hover:underline md:text-lg"
											>
												{link}
											</a>
										</li>
									))}
								</ul>
							</div>
						))}
					</nav>
				</div>

				<div className="mt-16 flex flex-col gap-2 border-t-2 border-acid-foreground/30 pt-8 text-sm font-bold uppercase tracking-tight sm:flex-row sm:items-center sm:justify-between">
					<span>© {new Date().getFullYear()} MotionType Festival</span>
					<span>Built kinetic. Made loud.</span>
				</div>
			</div>

			{/* Closing perpetual marquee — black band so motion persists to the end. */}
			<div className="border-t-2 border-acid-foreground bg-ink py-4 text-bone">
				<KineticMarquee speed={70} label="Sign-off">
					<span className="px-8 text-xl font-bold uppercase tracking-tighter md:text-3xl">
						Make Type Move
					</span>
					<span
						aria-hidden="true"
						className="px-8 text-xl text-acid md:text-3xl"
					>
						✳
					</span>
				</KineticMarquee>
			</div>
		</footer>
	);
}
