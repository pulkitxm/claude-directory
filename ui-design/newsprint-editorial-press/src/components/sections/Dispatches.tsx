import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Kicker } from "@/components/ui/Kicker";
import { Button } from "@/components/ui/Button";
import plateSkyline from "@/assets/plate-skyline.svg";
import plateGlobe from "@/assets/plate-globe.svg";
import plateTypecase from "@/assets/plate-typecase.svg";
import plateQuill from "@/assets/plate-quill.svg";

interface Dispatch {
	img: string;
	alt: string;
	desk: string;
	title: string;
	excerpt: string;
	byline: string;
	read: string;
	lead?: boolean;
}

const DISPATCHES: Dispatch[] = [
	{
		img: plateSkyline,
		alt: "Engraved metropolis skyline at dusk with lit windows",
		desk: "Investigations",
		title: "The city that files itself: inside the always-on newsroom",
		excerpt:
			"For three months our investigations desk lived on the wire. What we found was less a machine than a metropolis — a skyline of desks, each lit at four in the morning, each setting its own column of the record.",
		byline: "By E. Marlowe",
		read: "12 min read",
		lead: true,
	},
	{
		img: plateGlobe,
		alt: "Engraved globe wrapped in meridians with a red transmission arc",
		desk: "The Wire",
		title: "Sixty-two desks, one dateline",
		excerpt:
			"How a dispatch in Tokyo reaches the New York front page in under forty milliseconds.",
		byline: "By R. Okafor",
		read: "6 min read",
	},
	{
		img: plateTypecase,
		alt: "Engraving of a compositor's type case full of metal sorts",
		desk: "Culture",
		title: "The typographer who taught a machine to set",
		excerpt:
			"A weekend long-read on cold metal, hot takes, and the last hands to touch the page.",
		byline: "By J. Castellane",
		read: "9 min read",
	},
	{
		img: plateQuill,
		alt: "Engraving of a quill, nib and inkwell with red ink",
		desk: "Op-Ed",
		title: "In defense of the column inch",
		excerpt:
			"Against the infinite scroll: why constraint is the last honest editor we have left.",
		byline: "By The Editorial Board",
		read: "5 min read",
	},
];

/**
 * Dispatches: the day's long-form. A lead story spans the full width, then a
 * three-up rail of cards. Each card lifts with the signature hard offset
 * shadow and warms its grayscale plate on hover.
 */
export function Dispatches() {
	const [lead, ...rest] = DISPATCHES;

	return (
		<section
			id="dispatches"
			className="newsprint-texture border-b-4 border-ink bg-paper"
		>
			<div className="mx-auto max-w-screen-xl px-4 py-14 lg:py-16">
				<div className="flex flex-wrap items-end justify-between gap-4 border-b-4 border-ink pb-6">
					<div>
						<Kicker>Section 04 · Dispatches</Kicker>
						<h2 className="mt-4 font-serif text-4xl font-black uppercase leading-[0.95] tracking-tight lg:text-6xl">
							From the desks today
						</h2>
					</div>
					<Button variant="secondary" size="md">
						All dispatches
						<ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
					</Button>
				</div>

				{/* LEAD DISPATCH — asymmetric 7/5 split. */}
				<Reveal
					as="article"
					className="hard-shadow-hover group mt-10 grid grid-cols-1 border border-ink bg-paper lg:grid-cols-12"
				>
					<a
						href="#dispatches"
						className="block overflow-hidden border-b border-ink lg:col-span-7 lg:border-b-0 lg:border-r"
						aria-label={lead.title}
					>
						<img
							src={lead.img}
							alt={lead.alt}
							loading="lazy"
							decoding="async"
							className="editorial-photo aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
						/>
					</a>
					<div className="flex flex-col justify-between gap-6 p-7 lg:col-span-5 lg:p-10">
						<div>
							<div className="flex items-center gap-3">
								<span className="bg-editorial px-2 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-paper">
									Lead
								</span>
								<span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-ink/55">
									{lead.desk}
								</span>
							</div>
							<h3 className="mt-4 font-serif text-3xl font-black leading-[0.98] tracking-tight lg:text-4xl">
								{lead.title}
							</h3>
							<p className="mt-4 text-justify font-body text-sm leading-relaxed text-ink/75">
								{lead.excerpt}
							</p>
						</div>
						<div className="flex items-center justify-between border-t border-ink pt-4">
							<span className="font-sans text-xs font-semibold uppercase tracking-[0.15em]">
								{lead.byline}
							</span>
							<span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink/55">
								{lead.read}
							</span>
						</div>
					</div>
				</Reveal>

				{/* DISPATCH RAIL. */}
				<div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{rest.map((d, i) => (
						<Reveal
							key={d.title}
							as="article"
							delay={i * 80}
							className="hard-shadow-hover group flex flex-col border border-ink bg-paper"
						>
							<a
								href="#dispatches"
								className="block overflow-hidden border-b border-ink"
								aria-label={d.title}
							>
								<img
									src={d.img}
									alt={d.alt}
									loading="lazy"
									decoding="async"
									className="editorial-photo aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
								/>
							</a>
							<div className="flex flex-1 flex-col p-6">
								<span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-editorial">
									{d.desk}
								</span>
								<h3 className="mt-3 font-serif text-xl font-bold leading-snug lg:text-2xl">
									{d.title}
								</h3>
								<p className="mt-3 flex-1 font-body text-sm leading-relaxed text-ink/70">
									{d.excerpt}
								</p>
								<div className="mt-5 flex items-center justify-between border-t border-ink/25 pt-3">
									<span className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.12em]">
										{d.byline}
									</span>
									<span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink/50">
										{d.read}
									</span>
								</div>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
