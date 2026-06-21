import { Star, Bell } from "lucide-react";
import { Shell, Reveal, Eyebrow, Button } from "./primitives";

/* SHOWCASE — an explicit specimen of the system itself: the palette as solid
   swatches, every button variant, the input field, and tag styles. White
   section so each component reads as a clean graphic. */

const SWATCHES = [
	{ name: "Primary", sub: "Blue 500", value: "var(--color-brand)", on: "#fff" },
	{
		name: "Secondary",
		sub: "Emerald 500",
		value: "var(--color-grass)",
		on: "#fff",
	},
	{
		name: "Accent",
		sub: "Amber 500",
		value: "var(--color-sun)",
		on: "#111827",
	},
	{
		name: "Foreground",
		sub: "Gray 900",
		value: "var(--color-ink)",
		on: "#fff",
	},
	{ name: "Muted", sub: "Gray 100", value: "var(--color-fog)", on: "#111827" },
	{ name: "Canvas", sub: "White", value: "var(--color-canvas)", on: "#111827" },
];

function Panel({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className="rounded-lg bg-[var(--color-fog)] p-7">
			<p className="mb-5 text-xs font-bold uppercase tracking-wider text-gray-500">
				{title}
			</p>
			{children}
		</div>
	);
}

export function Showcase() {
	return (
		<section className="bg-[var(--color-canvas)] py-20 lg:py-28">
			<Shell>
				<Reveal className="max-w-2xl">
					<Eyebrow className="text-[var(--color-brand)]">The kit</Eyebrow>
					<h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
						Every part, on the table.
					</h2>
					<p className="mt-5 text-lg leading-relaxed text-gray-600">
						The palette, the buttons, the inputs, the tags — laid out flat so
						you can see exactly what you're composing with.
					</p>
				</Reveal>

				{/* Palette */}
				<Reveal className="mt-14">
					<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
						{SWATCHES.map((s) => (
							<div
								key={s.name}
								className={`group flex aspect-[4/3] flex-col justify-end rounded-lg p-4 transition-transform duration-200 hover:scale-[1.03] ${
									s.value === "var(--color-canvas)"
										? "border-2 border-[var(--color-hair)]"
										: ""
								}`}
								style={{ backgroundColor: s.value, color: s.on }}
							>
								<span className="text-sm font-bold tracking-tight">
									{s.name}
								</span>
								<span className="text-xs opacity-70">{s.sub}</span>
							</div>
						))}
					</div>
				</Reveal>

				{/* Components */}
				<div className="mt-6 grid gap-6 lg:grid-cols-3">
					<Reveal>
						<Panel title="Buttons">
							<div className="flex flex-wrap items-center gap-3">
								<Button className="!h-12 !px-5">Primary</Button>
								<Button variant="secondary" className="!h-12 !px-5">
									Secondary
								</Button>
								<Button variant="outline" className="!h-12 !px-5">
									Outline
								</Button>
								<Button variant="outline-ink" className="!h-12 !px-5">
									Outline ink
								</Button>
							</div>
						</Panel>
					</Reveal>

					<Reveal delay={0.08}>
						<Panel title="Input field">
							<input
								type="text"
								placeholder="Focus me — hard blue border"
								className="field !bg-white"
								aria-label="Demo input field"
							/>
							<p className="mt-3 text-sm text-gray-500">
								Gray block at rest, snaps to a solid 2px primary border on
								focus. No glow.
							</p>
						</Panel>
					</Reveal>

					<Reveal delay={0.16}>
						<Panel title="Tags & badges">
							<div className="flex flex-wrap items-center gap-2.5">
								<span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-brand)] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
									<Star size={13} strokeWidth={2.5} />
									New
								</span>
								<span className="inline-flex items-center rounded-full bg-[var(--color-grass)] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
									Stable
								</span>
								<span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-sun)] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-ink)]">
									<Bell size={13} strokeWidth={2.5} />
									Beta
								</span>
								<span className="inline-flex items-center rounded-full bg-[var(--color-ink)] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
									Pro
								</span>
							</div>
						</Panel>
					</Reveal>
				</div>
			</Shell>
		</section>
	);
}
