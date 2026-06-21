import {
	Columns3,
	Crosshair,
	FileSearch,
	Gauge,
	Quote,
	ShieldCheck,
	type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Kicker } from "@/components/ui/Kicker";

interface Desk {
	icon: LucideIcon;
	name: string;
	body: string;
}

const DESKS: Desk[] = [
	{
		icon: FileSearch,
		name: "The Fact Desk",
		body: "Every claim is sourced, dated, and ranked before it earns a column inch. Nothing runs on the front page unattributed.",
	},
	{
		icon: Gauge,
		name: "The Wire",
		body: "A real-time crawl files models, datasets and dispatches to the page with a median latency of thirty-eight milliseconds.",
	},
	{
		icon: Columns3,
		name: "Layout & Setting",
		body: "A strict twelve-column grid in cold metal type. Zero radius, visible rules, collapsed borders — the page as a printed object.",
	},
	{
		icon: ShieldCheck,
		name: "Standards Desk",
		body: "Open citation, reproducible methods, public corrections. Authority earned the old way: by being right, in print, on the record.",
	},
	{
		icon: Crosshair,
		name: "Investigations",
		body: "Long-form audits of the systems shaping the day. We follow the dataset, not the hype cycle, wherever the trail runs.",
	},
	{
		icon: Quote,
		name: "Op-Ed & Letters",
		body: "Signed argument and dissent, set in justified columns. The masthead does not always agree with the masthead.",
	},
];

/**
 * The Desks: a six-up feature grid built as a collapsed newspaper column
 * matrix. Bordered icon boxes invert black/white on hover; each cell warms to
 * grey. Vertical rules persist on desktop and dissolve to horizontal rules on
 * mobile, exactly as the responsive strategy prescribes.
 */
export function Desks() {
	return (
		<section
			id="desks"
			className="newsprint-texture border-b-4 border-ink bg-paper"
		>
			<div className="mx-auto max-w-screen-xl px-4 py-14 lg:py-16">
				<div className="grid grid-cols-1 items-end gap-6 border-b-4 border-ink pb-6 lg:grid-cols-12">
					<div className="lg:col-span-8">
						<Kicker>Section 02 · The Desks</Kicker>
						<h2 className="mt-4 font-serif text-4xl font-black uppercase leading-[0.95] tracking-tight lg:text-6xl">
							Six desks. One <span className="text-editorial">edition</span>.
						</h2>
					</div>
					<p className="font-body text-sm leading-relaxed text-ink/70 lg:col-span-4 lg:text-right">
						The newsroom is organized like a broadsheet, not an app. Each desk
						owns its column and answers for every line that runs beneath its
						standing head.
					</p>
				</div>

				<div className="grid grid-cols-1 border-l border-t border-ink sm:grid-cols-2 lg:grid-cols-3">
					{DESKS.map((desk, i) => {
						const Icon = desk.icon;
						return (
							<Reveal
								key={desk.name}
								as="article"
								delay={(i % 3) * 70}
								className="group flex flex-col border-b border-r border-ink p-7 transition-colors duration-200 hover:bg-neutral-100 lg:p-8"
							>
								<div className="flex items-center justify-between">
									<span className="flex h-12 w-12 items-center justify-center border border-ink text-ink transition-all duration-200 group-hover:bg-ink group-hover:text-paper">
										<Icon className="h-6 w-6" strokeWidth={1.25} />
									</span>
									<span className="font-mono text-xs uppercase tracking-[0.25em] text-ink/40">
										{String(i + 1).padStart(2, "0")}
									</span>
								</div>
								<h3 className="mt-6 font-serif text-2xl font-bold leading-tight lg:text-3xl">
									{desk.name}
								</h3>
								<p className="mt-3 text-justify font-body text-sm leading-relaxed text-ink/70">
									{desk.body}
								</p>
								<span className="mt-5 h-px w-full bg-ink/15 transition-colors duration-200 group-hover:bg-editorial" />
							</Reveal>
						);
					})}
				</div>
			</div>
		</section>
	);
}
