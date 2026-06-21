import { Cpu, Radio, Activity } from "lucide-react";
import { cx } from "./primitives";

/**
 * The hero "device" — a 3D control unit built ENTIRELY in CSS/SVG, no raster
 * image. Outer carbon-fibre bezel with a recessed CRT screen (scanlines), a
 * live abstract dashboard, hardware side-buttons, and a power LED. Scales on
 * hover for tactility.
 */
export function DeviceMockup({ className }: { className?: string }) {
	return (
		<div
			className={cx("group/device relative select-none", className)}
			aria-label="SCHEMATIC SX-1 control unit, live dashboard"
			role="img"
		>
			{/* Hardware side buttons (left edge) */}
			<div className="absolute -left-2 top-[26%] z-20 flex flex-col gap-3">
				{[0, 1, 2].map((i) => (
					<span
						key={i}
						className="h-9 w-3 rounded-l-md bg-recessed"
						style={{
							boxShadow:
								"inset 1px 1px 2px rgba(0,0,0,0.25), -2px 2px 4px rgba(0,0,0,0.15)",
						}}
					/>
				))}
			</div>
			{/* Tactile knob (right edge) */}
			<div className="absolute -right-3 top-[42%] z-20">
				<span
					className="block h-12 w-6 rounded-r-xl bg-chassis"
					style={{ boxShadow: "var(--shadow-floating)" }}
				>
					<span className="mt-1 ml-1 block h-1 w-3 rounded-full bg-edge-deep" />
					<span className="mt-1 ml-1 block h-1 w-3 rounded-full bg-edge-deep" />
					<span className="mt-1 ml-1 block h-1 w-3 rounded-full bg-edge-deep" />
				</span>
			</div>

			{/* Outer bezel */}
			<div
				className="relative rounded-[24px] p-3 transition-transform duration-500 ease-mech group-hover/device:scale-[1.02]"
				style={{
					background: "linear-gradient(145deg, #353d44, #1c2227)",
					boxShadow:
						"18px 18px 40px rgba(108,118,134,0.55), -10px -10px 28px rgba(255,255,255,0.65), inset 1px 1px 1px rgba(255,255,255,0.12)",
				}}
			>
				<div className="carbon pointer-events-none absolute inset-0 rounded-[24px] opacity-20 mix-blend-overlay" />

				{/* Top hardware strip: brand etch + power LED + vents */}
				<div className="mb-2.5 flex items-center justify-between px-1.5">
					<span className="stamp text-[0.55rem] text-slate-soft/70">
						SX-1&nbsp;//&nbsp;CTRL
					</span>
					<div className="flex items-center gap-2">
						<span className="stamp text-[0.5rem] text-slate-soft/60">PWR</span>
						<span
							className="h-2 w-2 animate-pulse rounded-full bg-accent"
							style={{ boxShadow: "var(--shadow-glow)" }}
						/>
						<div className="ml-1 flex gap-[3px]">
							{[0, 1, 2, 3].map((i) => (
								<span
									key={i}
									className="h-3 w-[2px] rounded-full bg-black/40"
								/>
							))}
						</div>
					</div>
				</div>

				{/* Recessed screen */}
				<div
					className="relative aspect-square w-full overflow-hidden rounded-[14px] md:aspect-[4/3]"
					style={{
						background:
							"radial-gradient(120% 120% at 30% 0%, #182029, #0a0e12 70%)",
						boxShadow:
							"inset 6px 6px 14px rgba(0,0,0,0.85), inset -2px -2px 6px rgba(80,100,120,0.15)",
					}}
				>
					<Dashboard />
					{/* Scanlines + glass glare */}
					<div className="scanlines pointer-events-none absolute inset-0 opacity-60" />
					<div
						className="pointer-events-none absolute inset-0"
						style={{
							background:
								"linear-gradient(120deg, rgba(255,255,255,0.12), rgba(255,255,255,0) 40%)",
						}}
					/>
				</div>

				{/* Bottom control row: speaker grille + buttons */}
				<div className="mt-2.5 flex items-center justify-between px-1.5">
					<div className="flex gap-[3px]">
						{Array.from({ length: 7 }).map((_, i) => (
							<span key={i} className="h-1.5 w-1.5 rounded-full bg-black/35" />
						))}
					</div>
					<div className="flex items-center gap-2">
						<span
							className="grid h-5 w-5 place-items-center rounded-full"
							style={{
								background: "#2a323a",
								boxShadow:
									"inset 1px 1px 2px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.06)",
							}}
						>
							<span className="h-1.5 w-1.5 rounded-sm bg-slate-soft/50" />
						</span>
						<span
							className="h-5 w-9 rounded-full bg-accent/90"
							style={{ boxShadow: "var(--shadow-glow)" }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

/* The abstract on-screen dashboard — glowing readouts, loaders, EQ, status. */
function Dashboard() {
	return (
		<div className="absolute inset-0 flex flex-col gap-3 p-4 font-mono text-[#9fe7c4]">
			{/* Header readout */}
			<div className="flex items-center justify-between">
				<span className="flex items-center gap-1.5 text-[0.6rem] tracking-widest text-[#7fb0cc]">
					<Activity size={12} strokeWidth={2} className="text-accent" />
					TELEMETRY
				</span>
				<span className="text-[0.6rem] tracking-widest text-[#7fb0cc]/70">
					0x4F2A
				</span>
			</div>

			{/* Big metric */}
			<div className="flex items-end gap-2">
				<span className="text-[2.1rem] font-bold leading-none text-white drop-shadow-[0_0_8px_rgba(159,231,196,0.5)]">
					98.6
				</span>
				<span className="mb-1 text-[0.65rem] text-[#9fe7c4]/70">
					%&nbsp;UPTIME
				</span>
				<span className="ml-auto inline-flex items-center gap-1 text-[0.6rem] text-online">
					<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-online shadow-[0_0_6px_#22c55e]" />
					STABLE
				</span>
			</div>

			{/* Loading status bars */}
			<div className="flex flex-col gap-2">
				{[
					{ label: "CORE", w: "animate-bar-load" },
					{ label: "MESH", w: "" },
				].map((row, idx) => (
					<div key={row.label} className="flex items-center gap-2">
						<span className="w-9 shrink-0 text-[0.55rem] text-[#7fb0cc]/80">
							{row.label}
						</span>
						<div
							className="h-2 flex-1 overflow-hidden rounded-full"
							style={{
								background: "rgba(127,176,204,0.12)",
								boxShadow: "inset 0 1px 2px rgba(0,0,0,0.6)",
							}}
						>
							<div
								className={cx(
									"h-full rounded-full bg-gradient-to-r from-[#7fb0cc] to-accent",
									row.w,
								)}
								style={{
									width: row.w ? undefined : "64%",
									boxShadow: "0 0 8px rgba(255,71,87,0.6)",
								}}
							/>
						</div>
						<span className="w-7 text-right text-[0.55rem] text-[#9fe7c4]/70">
							{idx === 0 ? "" : "64%"}
						</span>
					</div>
				))}
			</div>

			{/* Bottom row: spinner + EQ + node grid */}
			<div className="mt-auto grid grid-cols-3 items-end gap-2">
				{/* Spinner */}
				<div className="flex flex-col items-center gap-1.5">
					<span
						className="block h-9 w-9 animate-spin rounded-full border-2 border-[#7fb0cc]/25 border-t-accent"
						style={{ animationDuration: "1s" }}
					/>
					<span className="text-[0.5rem] tracking-wider text-[#7fb0cc]/70">
						SYNC
					</span>
				</div>
				{/* EQ */}
				<div className="flex h-12 items-end justify-center gap-[3px]">
					{[0.2, 0.45, 0.3, 0.6, 0.35, 0.5].map((d, i) => (
						<span
							key={i}
							className="eq-bar w-1.5 rounded-full bg-gradient-to-t from-[#7fb0cc] to-[#9fe7c4]"
							style={{
								height: "100%",
								animationDelay: `${d}s`,
							}}
						/>
					))}
				</div>
				{/* Node grid */}
				<div className="flex flex-col items-end gap-1.5">
					<div className="grid grid-cols-3 gap-1">
						{Array.from({ length: 9 }).map((_, i) => (
							<span
								key={i}
								className={cx(
									"h-1.5 w-1.5 rounded-sm",
									[0, 2, 4, 5, 8].includes(i)
										? "bg-accent shadow-[0_0_5px_rgba(255,71,87,0.7)]"
										: "bg-[#7fb0cc]/30",
								)}
							/>
						))}
					</div>
					<span className="flex items-center gap-1 text-[0.5rem] tracking-wider text-[#7fb0cc]/70">
						<Cpu size={9} strokeWidth={2} /> 5/9
					</span>
				</div>
			</div>

			{/* Corner watermark */}
			<Radio
				size={64}
				strokeWidth={1}
				className="pointer-events-none absolute -right-3 -top-3 text-[#7fb0cc]/5"
			/>
		</div>
	);
}
