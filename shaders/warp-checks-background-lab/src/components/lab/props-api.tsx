import { Braces } from "lucide-react";
import { Glass, Kicker } from "@/components/lab/primitives";
import { cn, fmt } from "@/lib/utils";
import type { WarpConfig } from "@/lib/warp";
import { PROMPT_WARP, parseHsl } from "@/lib/warp";

/** One row of the Warp prop reference. */
interface PropRow {
	name: string;
	type: string;
	get: (c: WarpConfig) => string;
}

const ROWS: PropRow[] = [
	{ name: "proportion", type: "number", get: (c) => fmt(c.proportion) },
	{ name: "softness", type: "number", get: (c) => fmt(c.softness) },
	{ name: "distortion", type: "number", get: (c) => fmt(c.distortion) },
	{ name: "swirl", type: "number", get: (c) => fmt(c.swirl) },
	{
		name: "swirlIterations",
		type: "number",
		get: (c) => String(c.swirlIterations),
	},
	{ name: "shape", type: '"checks"…', get: (c) => `"${c.shape}"` },
	{ name: "shapeScale", type: "number", get: (c) => fmt(c.shapeScale) },
	{ name: "scale", type: "number", get: (c) => fmt(c.scale) },
	{ name: "rotation", type: "number", get: (c) => String(c.rotation) },
	{ name: "speed", type: "number", get: (c) => fmt(c.speed) },
	{
		name: "colors",
		type: "string[4]",
		// Compact hue signature of the four stops, so a palette change is actually
		// detected (length is always 4 and would never flag divergence).
		get: (c) => c.colors.map((s) => parseHsl(s)?.h ?? "·").join(","),
	},
];

/**
 * A live `<Warp>` props/API reference. The "Live" column reflects the current
 * background state in real time; the "Prompt" column shows the brief's verbatim
 * default, so any drift from the original component is visible at a glance.
 */
export function PropsApi({ config }: { config: WarpConfig }) {
	return (
		<Glass as="section" className="flex flex-col gap-4 p-6">
			<div className="flex items-center gap-2">
				<Braces className="h-4 w-4 text-white/70" aria-hidden />
				<Kicker>{"<Warp />"} props · live vs prompt</Kicker>
			</div>

			<div className="overflow-hidden rounded-xl border border-white/10">
				<table className="w-full border-collapse text-left">
					<thead>
						<tr className="bg-white/[0.06]">
							<th className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
								Prop
							</th>
							<th className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
								Type
							</th>
							<th className="px-3 py-2 text-right font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
								Live
							</th>
							<th className="px-3 py-2 text-right font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
								Prompt
							</th>
						</tr>
					</thead>
					<tbody>
						{ROWS.map((r, i) => {
							const live = r.get(config);
							const base = r.get(PROMPT_WARP);
							const changed = live !== base;
							return (
								<tr
									key={r.name}
									className={cn(
										"border-t border-white/[0.06]",
										i % 2 ? "bg-white/[0.015]" : "",
									)}
								>
									<td className="px-3 py-1.5 font-mono text-[12px] text-white/85">
										{r.name}
									</td>
									<td className="px-3 py-1.5 font-mono text-[11px] text-white/45">
										{r.type}
									</td>
									<td
										className={cn(
											"px-3 py-1.5 text-right font-mono text-[12px] tabular-nums",
											changed ? "text-emerald-300" : "text-white/80",
										)}
									>
										{live}
									</td>
									<td className="px-3 py-1.5 text-right font-mono text-[12px] tabular-nums text-white/40">
										{base}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			<p className="font-mono text-[10px] leading-relaxed text-white/40">
				Green = diverged from the brief's verbatim value. Reset the console to
				return every prop to the prompt.
			</p>
		</Glass>
	);
}
