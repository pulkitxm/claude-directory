import { Section } from "@/components/ui/primitives";

const COLUMNS = [
	{
		title: "Product",
		links: ["Ritual", "Soundscapes", "Pricing", "iOS app", "What's new"],
	},
	{
		title: "Company",
		links: ["The two of us", "Field notes", "Press kit", "Contact"],
	},
	{
		title: "Quiet stuff",
		links: ["Privacy", "Terms", "Security", "Status"],
	},
];

export function Footer() {
	return (
		<footer className="relative border-t border-line">
			<Section className="py-16">
				<div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
					<div className="max-w-xs">
						<div className="flex items-center gap-2.5">
							<svg viewBox="0 0 28 28" className="h-6 w-6" aria-hidden="true">
								<path
									d="M4 18c2.2 0 2.2 2 4.4 2s2.2-2 4.4-2 2.2 2 4.4 2 2.2-2 4.4-2"
									fill="none"
									stroke="rgb(var(--glow))"
									strokeWidth="2"
									strokeLinecap="round"
								/>
								<path
									d="M4 13c2.2 0 2.2 2 4.4 2s2.2-2 4.4-2 2.2 2 4.4 2 2.2-2 4.4-2"
									fill="none"
									stroke="rgb(var(--tide))"
									strokeWidth="2"
									strokeLinecap="round"
									opacity="0.7"
								/>
							</svg>
							<span className="font-display text-lg font-semibold text-foam">
								Tide
							</span>
						</div>
						<p className="mt-4 text-sm leading-relaxed text-mist">
							A deep-work ritual for people who do their best thinking when the
							noise drops away. Made by two people, by the water.
						</p>
					</div>

					{COLUMNS.map((col) => (
						<div key={col.title}>
							<h4 className="label mb-4">{col.title}</h4>
							<ul className="space-y-2.5">
								{col.links.map((l) => (
									<li key={l}>
										<a
											href="#top"
											className="text-sm text-mist transition-colors duration-200 hover:text-foam"
										>
											{l}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
					<p className="font-mono text-[0.6875rem] tracking-data text-haze">
						© {new Date().getFullYear()} TIDE AUDIO · GO MAKE SOMETHING
					</p>
					<p className="font-mono text-[0.6875rem] tracking-data text-haze">
						BUILT BY THE WATER · 41° N
					</p>
				</div>
			</Section>
		</footer>
	);
}
