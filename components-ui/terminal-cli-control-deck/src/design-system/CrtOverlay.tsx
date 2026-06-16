/**
 * Pointer-events-none CRT layer: fixed scanlines, a slow bright sweep, a corner
 * vignette and a faint screen-curvature highlight. Subtle by design — it adds
 * depth without hurting the bright-green-on-black contrast.
 */
export function CrtOverlay() {
	return (
		<div
			aria-hidden
			className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
		>
			{/* static scanlines */}
			<div
				className="absolute inset-0 [background-size:100%_3px] opacity-[0.5]"
				style={{
					backgroundImage:
						"repeating-linear-gradient(0deg, rgba(0,0,0,0.32) 0px, rgba(0,0,0,0.32) 1px, transparent 1px, transparent 3px)",
				}}
			/>
			{/* travelling bright sweep */}
			<div
				className="absolute inset-x-0 h-24 [animation:var(--animate-scan)]"
				style={{
					background:
						"linear-gradient(to bottom, transparent, rgba(51,255,0,0.05) 45%, rgba(51,255,0,0.08) 50%, rgba(51,255,0,0.05) 55%, transparent)",
				}}
			/>
			{/* corner vignette + curvature */}
			<div
				className="absolute inset-0"
				style={{
					background:
						"radial-gradient(120% 120% at 50% 50%, transparent 62%, rgba(0,0,0,0.55) 100%)",
				}}
			/>
			<div
				className="absolute inset-0 mix-blend-screen opacity-[0.04]"
				style={{
					background:
						"linear-gradient(90deg, rgba(51,255,0,0.5), transparent 12%, transparent 88%, rgba(51,255,0,0.5))",
				}}
			/>
		</div>
	);
}
