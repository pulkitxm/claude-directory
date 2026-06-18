import { Palette, RotateCcw, Sliders, Sparkles } from "lucide-react";
import {
	WARP_CONTROLS,
	WARP_PRESETS,
	WARP_SHAPES,
	parseHsl,
	type WarpConfig,
} from "@/lib/warp";
import { cn, fmt } from "@/lib/utils";
import { Glass, Kicker } from "@/components/lab/primitives";

interface DeckProps {
	config: WarpConfig;
	activePreset: string | null;
	dirty: boolean;
	onChange: (patch: Partial<WarpConfig>) => void;
	onPreset: (id: string) => void;
	onReset: () => void;
}

/**
 * The control deck — a glass console that promotes the Warp props to live,
 * drivable inputs. Faders for every continuous uniform, a shape selector, four
 * mood presets, and the editable four-stop palette. Every change flows straight
 * back into the `<Warp>` element painting the page background. The deck *starts*
 * on the prompt's exact configuration ("Prism" preset) and "Reset to prompt"
 * always returns to those literal values.
 */
export function ControlDeck({
	config,
	activePreset,
	dirty,
	onChange,
	onPreset,
	onReset,
}: DeckProps) {
	return (
		<Glass as="aside" className="flex w-full flex-col gap-5 p-5">
			{/* Header */}
			<div className="flex items-center justify-between gap-3">
				<div className="flex items-center gap-2">
					<Sliders className="h-4 w-4 text-white/70" aria-hidden />
					<Kicker>Warp Console</Kicker>
				</div>
				<button
					type="button"
					onClick={onReset}
					disabled={!dirty}
					className={cn(
						"inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5",
						"font-mono text-[10px] uppercase tracking-[0.14em] transition",
						dirty
							? "border-white/25 bg-white/10 text-white/90 hover:bg-white/20"
							: "cursor-not-allowed border-white/10 bg-white/5 text-white/30",
					)}
				>
					<RotateCcw className="h-3 w-3" aria-hidden />
					Reset to prompt
				</button>
			</div>

			{/* Presets */}
			<div>
				<div className="mb-2 flex items-center gap-1.5">
					<Sparkles className="h-3.5 w-3.5 text-white/55" aria-hidden />
					<Kicker>Moods</Kicker>
				</div>
				<div className="grid grid-cols-2 gap-2">
					{WARP_PRESETS.map((p) => {
						const on = activePreset === p.id;
						return (
							<button
								key={p.id}
								type="button"
								onClick={() => onPreset(p.id)}
								aria-pressed={on}
								title={p.blurb}
								className={cn(
									"group rounded-xl border px-3 py-2 text-left transition",
									on
										? "border-white/40 bg-white/15"
										: "border-white/12 bg-white/[0.04] hover:border-white/25 hover:bg-white/10",
								)}
							>
								<span className="block text-[13px] font-medium text-white/90">
									{p.name}
								</span>
								<span className="mt-0.5 flex gap-1">
									{p.config.colors.map((c, i) => (
										<span
											key={i}
											className="h-2 w-4 rounded-full ring-1 ring-white/10"
											style={{ background: c }}
										/>
									))}
								</span>
							</button>
						);
					})}
				</div>
			</div>

			{/* Shape selector */}
			<div>
				<div className="mb-2">
					<Kicker>Shape</Kicker>
				</div>
				<div className="grid grid-cols-3 gap-2" role="group" aria-label="Warp shape">
					{WARP_SHAPES.map((s) => {
						const on = config.shape === s;
						return (
							<button
								key={s}
								type="button"
								onClick={() => onChange({ shape: s })}
								aria-pressed={on}
								className={cn(
									"rounded-lg border py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition",
									on
										? "border-white/40 bg-white/15 text-white"
										: "border-white/12 bg-white/[0.04] text-white/60 hover:border-white/25 hover:text-white/90",
								)}
							>
								{s}
							</button>
						);
					})}
				</div>
			</div>

			{/* Faders */}
			<div className="flex flex-col gap-3.5">
				<Kicker>Uniforms</Kicker>
				{WARP_CONTROLS.map((ctrl) => {
					const value = config[ctrl.key] as number;
					const pct = ((value - ctrl.min) / (ctrl.max - ctrl.min)) * 100;
					return (
						<label key={ctrl.key} className="block" title={ctrl.hint}>
							<div className="mb-1 flex items-center justify-between">
								<span className="font-mono text-[11px] tracking-wide text-white/65">
									{ctrl.label}
								</span>
								<span className="font-mono text-[11px] tabular-nums text-white/90">
									{ctrl.step >= 1 ? value.toFixed(0) : fmt(value)}
								</span>
							</div>
							<input
								type="range"
								className="fader"
								min={ctrl.min}
								max={ctrl.max}
								step={ctrl.step}
								value={value}
								style={{ ["--fill" as string]: `${pct}%` }}
								aria-label={ctrl.label}
								data-fader={ctrl.key}
								onChange={(e) =>
									onChange({ [ctrl.key]: Number(e.target.value) } as Partial<WarpConfig>)
								}
							/>
						</label>
					);
				})}
			</div>

			{/* Palette */}
			<div>
				<div className="mb-2 flex items-center gap-1.5">
					<Palette className="h-3.5 w-3.5 text-white/55" aria-hidden />
					<Kicker>Palette · 4 stops</Kicker>
				</div>
				<div className="grid grid-cols-2 gap-2">
					{config.colors.map((c, i) => {
						const hsl = parseHsl(c);
						return (
							<div
								key={i}
								className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.04] p-2"
							>
								<span
									className="h-7 w-7 shrink-0 rounded-md ring-1 ring-white/20"
									style={{ background: c }}
								/>
								<div className="min-w-0">
									<div className="font-mono text-[10px] uppercase tracking-wide text-white/45">
										Stop {i + 1}
									</div>
									<div className="truncate font-mono text-[11px] text-white/80">
										{hsl ? `${hsl.h} ${hsl.s} ${hsl.l}` : c}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</Glass>
	);
}
