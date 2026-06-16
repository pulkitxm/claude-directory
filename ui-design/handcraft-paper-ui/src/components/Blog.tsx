import { ArrowUpRight } from "lucide-react";
import { StickyTag } from "./primitives";
import { useReveal } from "../lib/reveal";
import { radius } from "../lib/tokens";

type Post = {
	tag: string;
	title: string;
	excerpt: string;
	emoji: string;
	bg: string;
	readTime: string;
	tilt: string;
};

const POSTS: Post[] = [
	{
		tag: "Field notes",
		title: "Why your best ideas are ugly first",
		excerpt: "A short defense of the bad sketch, the wrong arrow, and the note you almost didn't write.",
		emoji: "💡",
		bg: "#fff9c4",
		readTime: "4 min",
		tilt: "-rotate-1",
	},
	{
		tag: "How we work",
		title: "Running a workshop with zero slides",
		excerpt: "Swap the deck for a wall. A playbook for facilitating a room that actually wants to draw.",
		emoji: "🧠",
		bg: "#cfe0f5",
		readTime: "6 min",
		tilt: "rotate-1",
	},
	{
		tag: "Product",
		title: "Building a pencil cursor that feels real",
		excerpt: "The tiny rendering tricks behind a cursor that looks like it's actually leaving graphite.",
		emoji: "✏️",
		bg: "#ffd9d9",
		readTime: "5 min",
		tilt: "-rotate-1",
	},
];

export function Blog() {
	const { ref, shown } = useReveal<HTMLDivElement>();
	return (
		<section className="px-6 py-20">
			<div ref={ref} className="mx-auto max-w-5xl">
				<div className="mb-14 flex flex-col items-center gap-5 text-center md:flex-row md:items-end md:justify-between md:text-left">
					<div>
						<StickyTag color="muted" tilt="-rotate-2">
							From the sketchbook
						</StickyTag>
						<h2 className="mt-6 text-4xl text-ink md:text-5xl">
							Things we scribbled down
						</h2>
					</div>
					<a
						href="#notes"
						className="inline-flex items-center gap-1 text-lg text-ink/70 transition-colors hover:text-ink hover:underline-wavy"
					>
						Read the whole notebook <ArrowUpRight size={18} strokeWidth={2.75} />
					</a>
				</div>

				<div className="grid gap-9 md:grid-cols-3">
					{POSTS.map((p, i) => (
						<a
							key={p.title}
							href="#notes"
							className={
								"group block border-2 border-ink bg-card shadow-[var(--shadow-hard-sm)] transition-all duration-100 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[var(--shadow-hard-xl)] " +
								p.tilt
							}
							style={{
								borderRadius: radius.wobblyLg,
								opacity: shown ? 1 : 0,
								transform: shown ? undefined : "translateY(22px)",
								transition:
									"opacity .5s ease, transform .1s ease, box-shadow .1s ease",
								transitionDelay: `${i * 90}ms`,
							}}
						>
							{/* emoji-sketch placeholder image */}
							<div
								className="m-3 grid h-36 place-items-center border-2 border-dashed border-ink/40"
								style={{ background: p.bg, borderRadius: radius.wobblyMd }}
							>
								<span className="text-5xl transition-transform duration-200 group-hover:scale-110" aria-hidden>
									{p.emoji}
								</span>
							</div>
							<div className="px-5 pb-6 pt-2">
								<div className="mb-3 flex items-center gap-2 text-base text-ink/60">
									<span
										className="border border-ink/50 px-2 py-0.5"
										style={{ borderRadius: radius.wobblyMd }}
									>
										{p.tag}
									</span>
									<span>· {p.readTime} read</span>
								</div>
								<h3 className="text-2xl leading-tight text-ink">{p.title}</h3>
								<p className="mt-2 text-lg text-ink/70">{p.excerpt}</p>
								<span className="mt-4 inline-flex items-center gap-1 font-[var(--font-marker)] text-lg text-pen group-hover:underline-wavy">
									Read it <ArrowUpRight size={18} strokeWidth={2.75} />
								</span>
							</div>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}
