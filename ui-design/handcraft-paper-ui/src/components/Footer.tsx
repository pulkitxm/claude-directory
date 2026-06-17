import { Heart } from "lucide-react";
import { Logo } from "./Logo";
import { WavyDivider } from "./primitives";

const COLUMNS: { heading: string; links: string[] }[] = [
	{
		heading: "Product",
		links: ["Features", "The board", "Pricing", "Templates", "Changelog"],
	},
	{
		heading: "Company",
		links: ["About", "The sketchbook", "Careers", "Press kit"],
	},
	{
		heading: "Help",
		links: ["Getting started", "Keyboard shortcuts", "Status", "Contact us"],
	},
];

export function Footer() {
	return (
		<footer className="px-6 pb-10 pt-8">
			<div className="mx-auto max-w-5xl">
				<WavyDivider className="mb-12 text-ink/40" />

				<div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
					{/* brand */}
					<div>
						<Logo />
						<p className="mt-4 max-w-xs text-lg text-ink/70">
							The messy-on-purpose whiteboard for teams who think with
							their hands.
						</p>
						<div className="mt-5 flex gap-2">
							{["✏️", "📌", "🗒️", "🖍️"].map((e, i) => (
								<span
									key={i}
									className="grid h-9 w-9 place-items-center border-2 border-ink bg-card text-lg"
									style={{
										borderRadius: "40% 60% 55% 45% / 50% 40% 60% 50%",
										transform: `rotate(${i % 2 === 0 ? "-6" : "6"}deg)`,
									}}
									aria-hidden
								>
									{e}
								</span>
							))}
						</div>
					</div>

					{/* link columns */}
					{COLUMNS.map((col) => (
						<div key={col.heading}>
							<h3 className="mb-4 inline-block font-[var(--font-marker)] text-xl text-ink underline-wavy">
								{col.heading}
							</h3>
							<ul className="space-y-2.5">
								{col.links.map((l) => (
									<li key={l}>
										<a
											href="#top"
											className="text-lg text-ink/70 transition-colors duration-100 hover:text-ink hover:line-through hover:decoration-accent hover:decoration-2"
										>
											{l}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-12 flex flex-col items-center justify-between gap-4 border-t-2 border-dashed border-ink/40 pt-7 text-base text-ink/60 md:flex-row">
					<p className="inline-flex items-center gap-1.5">
						Drawn with{" "}
						<Heart size={16} strokeWidth={2.75} className="text-accent" fill="currentColor" />{" "}
						by the Scribbly crew · © {new Date().getFullYear()}
					</p>
					<div className="flex gap-5">
						<a href="#top" className="transition-colors hover:text-ink hover:line-through hover:decoration-accent hover:decoration-2">
							Privacy
						</a>
						<a href="#top" className="transition-colors hover:text-ink hover:line-through hover:decoration-accent hover:decoration-2">
							Terms
						</a>
						<a href="#top" className="transition-colors hover:text-ink hover:line-through hover:decoration-accent hover:decoration-2">
							Cookies
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
