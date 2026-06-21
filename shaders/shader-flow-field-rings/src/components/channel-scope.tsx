import { useEffect, useRef } from "react";
import type { ShaderFrame } from "@/components/ui/shader-animation";

const CHANNELS = [
	{ key: 0, label: "R · loop j=0", hex: "#FF2D55", css: "text-chan-r" },
	{ key: 1, label: "G · loop j=1", hex: "#39FF7A", css: "text-chan-g" },
	{ key: 2, label: "B · loop j=2", hex: "#2D7BFF", css: "text-chan-b" },
] as const;

/**
 * The signature element: a live decomposition of the shader into its three
 * additive colour loops. Each row mirrors one `color[j]` accumulator in the
 * fragment shader, drawing its own rolling sparkline plus a numeric readout, so
 * the page literally shows the RGB interference that the rings are made of.
 *
 * Reads telemetry imperatively via refs (set by an external onFrame handler) to
 * avoid re-rendering React 60 times a second.
 */
export function ChannelScope() {
	const sparkRefs = [
		useRef<HTMLCanvasElement>(null),
		useRef<HTMLCanvasElement>(null),
		useRef<HTMLCanvasElement>(null),
	];
	const valueRefs = [
		useRef<HTMLSpanElement>(null),
		useRef<HTMLSpanElement>(null),
		useRef<HTMLSpanElement>(null),
	];
	const barRefs = [
		useRef<HTMLDivElement>(null),
		useRef<HTMLDivElement>(null),
		useRef<HTMLDivElement>(null),
	];

	// Per-channel rolling history of recent intensity samples.
	const history = useRef<number[][]>([[], [], []]);

	useEffect(() => {
		const handler = (e: Event) => {
			const frame = (e as CustomEvent<ShaderFrame>).detail;
			for (let j = 0; j < 3; j++) {
				const v = frame.channels[j];
				const hist = history.current[j];
				hist.push(v);
				if (hist.length > 96) hist.shift();

				const value = valueRefs[j].current;
				if (value) value.textContent = v.toFixed(3);

				const bar = barRefs[j].current;
				if (bar) bar.style.transform = `scaleX(${Math.min(v * 1.4, 1)})`;

				drawSpark(sparkRefs[j].current, hist, CHANNELS[j].hex);
			}
		};
		window.addEventListener("shader:frame", handler as EventListener);
		return () =>
			window.removeEventListener("shader:frame", handler as EventListener);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [valueRefs, sparkRefs, barRefs]);

	return (
		<div className="grid gap-3 sm:gap-4">
			{CHANNELS.map((c, j) => (
				<div
					key={c.key}
					className="flex items-center gap-3 rounded-md border border-graphite-line bg-ink-800/70 px-3 py-2.5 sm:gap-4 sm:px-4"
				>
					<span
						className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
						style={{ background: c.hex, boxShadow: `0 0 10px ${c.hex}` }}
						aria-hidden
					/>
					<span
						className={`w-24 flex-shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] ${c.css} sm:text-[11px]`}
					>
						{c.label}
					</span>
					<canvas
						ref={sparkRefs[j]}
						width={220}
						height={28}
						className="hidden h-7 flex-1 rounded-sm bg-ink-900/80 sm:block"
						aria-hidden
					/>
					<div
						className="relative hidden h-1.5 w-16 overflow-hidden rounded-full bg-ink-900 md:block"
						aria-hidden
					>
						<div
							ref={barRefs[j]}
							className="absolute inset-y-0 left-0 w-full origin-left rounded-full"
							style={{ background: c.hex, transform: "scaleX(0)" }}
						/>
					</div>
					<span
						ref={valueRefs[j]}
						className="tnum w-12 flex-shrink-0 text-right font-mono text-xs text-phosphor/85"
					>
						0.000
					</span>
				</div>
			))}
		</div>
	);
}

function drawSpark(
	canvas: HTMLCanvasElement | null,
	hist: number[],
	hex: string,
) {
	if (!canvas) return;
	const ctx = canvas.getContext("2d");
	if (!ctx) return;
	const { width: w, height: h } = canvas;
	ctx.clearRect(0, 0, w, h);

	// Baseline.
	ctx.strokeStyle = "rgba(58,65,80,0.35)";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(0, h - 1);
	ctx.lineTo(w, h - 1);
	ctx.stroke();

	if (hist.length < 2) return;
	const max = 1;
	ctx.strokeStyle = hex;
	ctx.lineWidth = 1.5;
	ctx.shadowColor = hex;
	ctx.shadowBlur = 6;
	ctx.beginPath();
	for (let i = 0; i < hist.length; i++) {
		const x = (i / (hist.length - 1)) * w;
		const y = h - (Math.min(hist[i], max) / max) * (h - 2) - 1;
		if (i === 0) ctx.moveTo(x, y);
		else ctx.lineTo(x, y);
	}
	ctx.stroke();
	ctx.shadowBlur = 0;
}
