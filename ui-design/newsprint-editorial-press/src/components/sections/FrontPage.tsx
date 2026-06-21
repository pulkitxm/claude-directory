import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { Kicker } from "@/components/ui/Kicker";
import plateMachine from "@/assets/plate-machine.svg";

/**
 * The front page. An asymmetric 8/4 newspaper split: a viewport-dominating
 * serif headline and drop-capped lead on the left, a bordered "stop press"
 * rail of standalone items on the right. Everything is wrapped in collapsed
 * black grid borders so it reads as one printed page.
 */
export function FrontPage() {
	return (
		<section
			id="front-page"
			className="newsprint-texture border-b-4 border-ink"
		>
			<div className="mx-auto max-w-screen-xl px-4">
				{/* Front-page banner rule with edition metadata. */}
				<div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink py-2.5">
					<Kicker>Front Page · Friday Edition</Kicker>
					<p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-ink/60">
						Filed 04:00 EST · 12 pages · One dollar
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-12">
					{/* LEAD STORY — 8 columns. */}
					<div className="border-ink py-8 lg:col-span-8 lg:border-r lg:py-12 lg:pr-10">
						<p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-editorial [animation:rise_0.6s_cubic-bezier(0.22,1,0.36,1)_both]">
							Breaking · The Intelligence Desk
						</p>

						<h1 className="mt-4 font-serif text-5xl font-black uppercase leading-[0.86] tracking-tighter sm:text-7xl lg:text-[7.2rem]">
							<span className="block [animation:rise_0.7s_cubic-bezier(0.22,1,0.36,1)_both]">
								All the
							</span>
							<span className="block [animation:rise_0.7s_cubic-bezier(0.22,1,0.36,1)_0.08s_both]">
								signal
							</span>
							<span className="block [animation:rise_0.7s_cubic-bezier(0.22,1,0.36,1)_0.16s_both]">
								that's fit
								<span className="text-editorial">.</span>
							</span>
						</h1>

						<div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-12">
							<p className="dropcap col-span-1 text-justify font-body text-[0.95rem] leading-relaxed text-ink/85 sm:col-span-7 sm:text-base">
								Newsprint is a publication of record for the age of machine
								intelligence — a daily edition that sets every model, dataset
								and dispatch in cold metal type. We file the world's noise as
								front-page certainty: ranked, dated, sourced, and printed
								without a single rounded corner. No infinite scroll, no
								attention economy, only the column inch.
							</p>
							<p className="col-span-1 border-l border-ink/30 pl-4 font-body text-sm italic leading-relaxed text-ink/70 sm:col-span-5">
								"A publication should feel like it could be set in lead and run
								through a press at four in the morning. Newsprint does." So
								begins our charter, reproduced in the colophon on page twelve.
							</p>
						</div>

						<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
							<Button variant="primary" size="lg" className="w-full sm:w-auto">
								Read today's edition
								<ArrowRight className="h-4 w-4" strokeWidth={1.5} />
							</Button>
							<Button variant="link" className="w-full justify-start sm:w-auto">
								Browse the archive — 11,204 issues
							</Button>
						</div>
					</div>

					{/* STOP PRESS RAIL — 4 columns. */}
					<aside className="flex flex-col divide-y divide-ink border-t border-ink lg:col-span-4 lg:border-t-0 lg:pl-8">
						<div className="py-6 lg:pt-12">
							<EditorialImage
								src={plateMachine}
								alt="Engraving of a newspaper rotary press feeding a roll of paper"
								fig="Fig. 1.1"
								caption="The press, still warm. Newsprint sets the day's intelligence in metal before dawn."
								loading="eager"
								imgClassName="aspect-[4/5]"
							/>
						</div>

						<ul className="divide-y divide-ink/25">
							{STOP_PRESS.map((item, i) => (
								<li key={item.head}>
									<a
										href="#the-brief"
										className="group flex items-start gap-3 py-4 transition-colors duration-200 hover:bg-neutral-100"
									>
										<span className="mt-1 font-mono text-xs font-semibold tabular-nums text-editorial">
											{String(i + 1).padStart(2, "0")}
										</span>
										<span className="flex-1">
											<span className="font-serif text-lg font-bold leading-snug group-hover:underline group-hover:decoration-editorial group-hover:decoration-2 group-hover:underline-offset-4">
												{item.head}
											</span>
											<span className="mt-1 block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink/55">
												{item.desk}
											</span>
										</span>
										<ArrowUpRight
											className="mt-1 h-4 w-4 shrink-0 text-ink/40 transition-colors group-hover:text-editorial"
											strokeWidth={1.5}
										/>
									</a>
								</li>
							))}
						</ul>
					</aside>
				</div>
			</div>
		</section>
	);
}

const STOP_PRESS = [
	{
		head: "Models retract three claims after fact desk review",
		desk: "Correction · Page 2",
	},
	{
		head: "Latency falls below 40ms across the wire network",
		desk: "Infrastructure",
	},
	{
		head: "Editorial board adopts the open citation standard",
		desk: "Standards · Op-Ed",
	},
	{
		head: "Weekend long-read: the typographer who taught a machine to set",
		desk: "Culture · Magazine",
	},
];
