import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BoardCanvas, type LayerKey } from "@/components/ui/BoardCanvas";

const LAYERS: {
	key: LayerKey;
	name: string;
	designator: string;
	note: string;
}[] = [
	{
		key: "all",
		name: "Assembled",
		designator: "ASM",
		note: "All layers composited as the fab sees it.",
	},
	{
		key: "copper",
		name: "Top copper",
		designator: "L1",
		note: "Signal traces, pours, and pads on layer 1.",
	},
	{
		key: "mask",
		name: "Solder mask",
		designator: "SM",
		note: "The green coat — openings expose pads only.",
	},
	{
		key: "silk",
		name: "Silkscreen",
		designator: "SK",
		note: "Reference designators and part outlines.",
	},
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Showcase() {
	const [active, setActive] = useState<LayerKey>("all");
	const current = LAYERS.find((l) => l.key === active) ?? LAYERS[0];

	return (
		<section id="showcase" className="relative px-5 py-24 sm:py-32">
			<div className="mx-auto max-w-6xl">
				<SectionLabel designator="U3" label="The canvas" />
				<div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
					<motion.h2
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-80px" }}
						transition={{ duration: 0.6, ease }}
						className="max-w-xl text-balance font-display text-3xl font-bold leading-tight tracking-tightest text-silk sm:text-[2.6rem]"
					>
						See every layer the way the fab will.
					</motion.h2>
					<p className="max-w-xs text-sm leading-relaxed text-silk-dim">
						Toggle the stack to inspect copper, mask, and silkscreen
						independently — the same view your manufacturer renders from your
						Gerbers.
					</p>
				</div>

				<div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.45fr_1fr]">
					{/* the live board canvas */}
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-60px" }}
						transition={{ duration: 0.6, ease }}
						className="relative overflow-hidden rounded-3xl border border-substrate-600/70 bg-substrate-900/60 p-4 shadow-panel sm:p-6"
					>
						{/* canvas chrome */}
						<div className="mb-4 flex items-center justify-between font-mono text-[11px] text-silk-faint">
							<span className="flex items-center gap-1.5">
								<span className="h-1.5 w-1.5 rounded-full bg-mask-bright" />
								board · rev_C.kicad_pcb
							</span>
							<span>{current.designator} · 1:1</span>
						</div>
						<BoardCanvas layer={active} />
					</motion.div>

					{/* layer selector */}
					<div className="flex flex-col gap-3">
						{LAYERS.map((layer) => {
							const selected = layer.key === active;
							return (
								<button
									key={layer.key}
									type="button"
									onClick={() => setActive(layer.key)}
									aria-pressed={selected}
									className={cn(
										"group relative flex items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-200",
										selected
											? "border-copper/50 bg-copper/[0.06]"
											: "border-substrate-600/70 bg-substrate-800/30 hover:border-substrate-500 hover:bg-substrate-800/60",
									)}
								>
									<span
										className={cn(
											"mt-0.5 inline-flex h-7 items-center rounded-md border px-1.5 font-mono text-[10px] font-medium tracking-wider transition-colors",
											selected
												? "border-copper/50 bg-copper/10 text-copper"
												: "border-substrate-500 bg-substrate-900/60 text-silk-faint group-hover:text-silk-dim",
										)}
									>
										{layer.designator}
									</span>
									<span className="flex-1">
										<span
											className={cn(
												"block font-display text-base font-semibold tracking-tight transition-colors",
												selected
													? "text-silk"
													: "text-silk-dim group-hover:text-silk",
											)}
										>
											{layer.name}
										</span>
										<span className="mt-1 block text-xs leading-relaxed text-silk-faint">
											{layer.note}
										</span>
									</span>
									<span
										className={cn(
											"mt-1 h-2 w-2 shrink-0 rounded-full transition-all",
											selected
												? "bg-mask-bright shadow-mask-glow"
												: "bg-substrate-500 group-hover:bg-silk-faint",
										)}
									/>
								</button>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
