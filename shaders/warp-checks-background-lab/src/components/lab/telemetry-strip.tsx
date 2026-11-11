import { Activity, Clock, Layers, Zap } from "lucide-react";
import { Glass } from "@/components/lab/primitives";
import type { Telemetry } from "@/lib/useTelemetry";
import { fmt } from "@/lib/utils";
import type { WarpConfig } from "@/lib/warp";
function Cell({
	icon,
	label,
	value,
	accent,
}: {
	icon: React.ReactNode;
	label: string;
	value: string;
	accent?: boolean;
}) {
	return (
		<div className="flex items-center gap-3 px-4 py-3">
			<span className={accent ? "text-emerald-300" : "text-white/55"}>
				{icon}
			</span>
			<div className="leading-tight">
				<div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
					{label}
				</div>
				<div className="font-mono text-sm tabular-nums text-white/90">
					{value}
				</div>
			</div>
		</div>
	);
}
export function TelemetryStrip({
	telemetry,
	config,
}: {
	telemetry: Telemetry;
	config: WarpConfig;
}) {
	const measured = telemetry.frame > 0;
	const fps = telemetry.fps;
	return (
		<Glass className="flex flex-wrap items-center divide-x divide-white/10 overflow-hidden p-0">
			<div className="flex items-center gap-2 px-4 py-3">
				<span className="relative flex h-2 w-2">
					<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
					<span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
				</span>
				<span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-200/90">
					Live
				</span>
			</div>
			<Cell
				icon={<Activity className="h-4 w-4" aria-hidden />}
				label="FPS"
				value={measured ? String(fps) : ", "}
				accent={fps >= 50}
			/>
			<Cell
				icon={<Layers className="h-4 w-4" aria-hidden />}
				label="Frame"
				value={telemetry.frame.toLocaleString()}
			/>
			<Cell
				icon={<Clock className="h-4 w-4" aria-hidden />}
				label="Uptime"
				value={`${telemetry.uptime.toFixed(1)}s`}
			/>
			<Cell
				icon={<Zap className="h-4 w-4" aria-hidden />}
				label="Speed"
				value={`${fmt(config.speed)}×`}
			/>
		</Glass>
	);
}
