import {
	DashboardMockup,
	EditorMockup,
	KanbanMockup,
} from "@/components/mockups";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

type Stage = {
	id: string;
	index: string;
	kicker: string;
	title: string;
	highlight: string;
	body: React.ReactNode;
};

const stages: Stage[] = [
	{
		id: "stage-dashboard",
		index: "01",
		kicker: "Frame a dashboard",
		title: "Unleash the power of",
		highlight: "Scroll Animations",
		body: <DashboardMockup />,
	},
	{
		id: "stage-kanban",
		index: "02",
		kicker: "Frame a live board",
		title: "Your product, framed in",
		highlight: "a tilting device",
		body: <KanbanMockup />,
	},
	{
		id: "stage-editor",
		index: "03",
		kicker: "Frame the code itself",
		title: "Two lines of transform,",
		highlight: "zero layout shift",
		body: <EditorMockup />,
	},
];

function StageTitle({ stage }: { stage: Stage }) {
	return (
		<div className="mx-auto flex flex-col items-center">
			<span className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-iris/80">
				<span className="grid h-6 w-6 place-items-center rounded-md border border-iris/30 bg-iris/10 text-iris-bright">
					{stage.index}
				</span>
				{stage.kicker}
			</span>
			<h2 className="font-display text-3xl font-semibold leading-tight text-white md:text-4xl">
				{stage.title}
				<br />
				<span className="mt-1 block bg-gradient-to-r from-iris-bright via-white to-ember bg-clip-text text-4xl font-bold leading-none text-transparent md:text-[5.5rem]">
					{stage.highlight}
				</span>
			</h2>
		</div>
	);
}

export function Stages() {
	return (
		<section id="stages" className="relative">
			{/* anchored intro band */}
			<div className="relative z-10 mx-auto max-w-3xl px-6 pb-2 pt-10 text-center">
				<p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/35">
					Three stages · one primitive
				</p>
				<p className="mt-3 text-pretty text-[15px] leading-relaxed text-white/55">
					Each card below is the same{" "}
					<code className="font-mono text-iris-bright">ContainerScroll</code>{" "}
					component — only its{" "}
					<code className="font-mono text-white/70">children</code> change. Keep
					scrolling and watch every device tilt upright in sync with the live
					readout on the right.
				</p>
			</div>

			{stages.map((stage) => (
				<div key={stage.id} id={stage.id} className="relative">
					{/* faint per-stage backdrop wash */}
					<div className="bg-dotgrid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] opacity-40" />
					{/* Explicit offset: forces Framer to recompute progress from the
					    target's viewport-relative edges on every scroll. Without it only
					    the first ContainerScroll instance on the page receives updates
					    (later targets keep a stale/degenerate measured range and freeze
					    at 20°). Range runs "section entering bottom" → "section centered",
					    so the card stands flat right as it reaches mid-screen. */}
					<ContainerScroll
						titleComponent={<StageTitle stage={stage} />}
						offset={["start end", "center center"]}
					>
						{stage.body}
					</ContainerScroll>
				</div>
			))}
		</section>
	);
}
