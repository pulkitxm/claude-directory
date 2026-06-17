import { Star } from "lucide-react";
import { StickyTag } from "./primitives";
import { useReveal } from "../lib/reveal";
import { radius } from "../lib/tokens";

type Quote = {
	body: string;
	name: string;
	role: string;
	tone: string; // avatar bg
	tilt: string;
};

const QUOTES: Quote[] = [
	{
		body: "Our standups went from a spreadsheet nobody read to a wall everybody fights over. In a good way.",
		name: "Maya R.",
		role: "Product lead, Doodlr",
		tone: "#ffd4d4",
		tilt: "-rotate-2",
	},
	{
		body: "It finally feels okay to put a bad idea on the board. Half our best features started as an ugly scribble.",
		name: "Theo K.",
		role: "Designer, Napkin Co.",
		tone: "#cfe0f5",
		tilt: "rotate-1",
	},
	{
		body: "The tidy-up broom is witchcraft. Total chaos in, a shareable plan out, and I didn't have to align a single box.",
		name: "Priya S.",
		role: "Founder, Inklings",
		tone: "#fff3b0",
		tilt: "-rotate-1",
	},
];

function Avatar({ tone, name }: { tone: string; name: string }) {
	return (
		<span
			className="grid h-12 w-12 shrink-0 place-items-center border-2 border-ink"
			style={{ background: tone, borderRadius: radius.blob }}
			aria-hidden
			title={name}
		>
			<svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="#2d2d2d" strokeWidth="1.8" strokeLinecap="round">
				<circle cx="12" cy="9" r="4" />
				<path d="M5 21 Q12 14 19 21" />
			</svg>
		</span>
	);
}

export function Testimonials() {
	const { ref, shown } = useReveal<HTMLDivElement>();
	return (
		<section id="notes" className="px-6 py-20">
			<div ref={ref} className="mx-auto max-w-5xl">
				<div className="mb-16 text-center">
					<StickyTag color="pen" tilt="rotate-2">
						Notes on the fridge
					</StickyTag>
					<h2 className="mt-6 text-4xl text-ink md:text-5xl">
						People keep leaving us nice ones
					</h2>
				</div>

				<div className="grid gap-12 md:grid-cols-3 md:gap-8">
					{QUOTES.map((q, i) => (
						<figure
							key={q.name}
							className={"relative " + q.tilt}
							style={{
								opacity: shown ? 1 : 0,
								transform: shown ? undefined : "translateY(24px)",
								transition: "opacity .5s ease, transform .5s ease",
								transitionDelay: `${i * 110}ms`,
							}}
						>
							{/* speech bubble */}
							<div
								className="relative border-2 border-ink bg-card p-6 shadow-[var(--shadow-hard)]"
								style={{ borderRadius: radius.wobblyLg }}
							>
								<div className="mb-3 flex gap-0.5 text-accent" aria-label="5 out of 5 stars">
									{Array.from({ length: 5 }).map((_, s) => (
										<Star key={s} size={18} strokeWidth={2.5} fill="currentColor" />
									))}
								</div>
								<blockquote className="text-lg text-ink md:text-xl">
									“{q.body}”
								</blockquote>

								{/* geometric border-based tail extending past the card */}
								<span
									className="absolute -bottom-[18px] left-10 h-0 w-0 border-l-[18px] border-r-[18px] border-t-[18px] border-l-transparent border-r-transparent border-t-ink"
									aria-hidden
								/>
								<span
									className="absolute -bottom-[14px] left-[42px] h-0 w-0 border-l-[15px] border-r-[15px] border-t-[15px] border-l-transparent border-r-transparent border-t-card"
									aria-hidden
								/>
							</div>

							<figcaption className="mt-7 flex items-center gap-3 pl-2">
								<Avatar tone={q.tone} name={q.name} />
								<div>
									<div className="font-[var(--font-marker)] text-lg text-ink">
										{q.name}
									</div>
									<div className="text-base text-ink/60">{q.role}</div>
								</div>
							</figcaption>
						</figure>
					))}
				</div>
			</div>
		</section>
	);
}
