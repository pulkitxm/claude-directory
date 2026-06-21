/**
 * Ambience — the fixed atmospheric backdrop that sits behind the entire page.
 *
 * Layers, from back to front:
 *   1. Deep-slate base + a faint top radial bloom.
 *   2. Two massive, heavily-blurred amber orbs that drift slowly (top-center,
 *      bottom-right) — the "light in the darkness". Smaller on mobile.
 *   3. A barely-there 44px grid for technical texture.
 *   4. A 1.5%-opacity fractal-noise film over everything so flat darks never
 *      look like a cheap inverted theme.
 *
 * Everything is pointer-events-none and aria-hidden — purely decorative.
 */
export function Ambience() {
	return (
		<div
			aria-hidden="true"
			className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
		>
			{/* base + top bloom */}
			<div className="absolute inset-0 bg-background" />
			<div className="radial-ambience absolute inset-0" />

			{/* drifting amber orbs */}
			<div className="absolute left-1/2 top-[-18%] h-[400px] w-[400px] -translate-x-1/2 animate-drift-slow rounded-full bg-accent/[0.07] blur-[100px] md:h-[640px] md:w-[640px] md:blur-[150px]" />
			<div className="absolute bottom-[-12%] right-[-10%] h-[360px] w-[360px] animate-drift-slow-rev rounded-full bg-amber-600/[0.06] blur-[100px] md:h-[560px] md:w-[560px] md:blur-[140px]" />
			<div className="absolute left-[-8%] top-1/2 h-[300px] w-[300px] animate-drift-slow rounded-full bg-orange-500/[0.04] blur-[90px] md:h-[420px] md:w-[420px] md:blur-[130px]" />

			{/* fine grid + noise film */}
			<div className="grid-layer absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_30%,#000,transparent)]" />
			<div className="noise-layer absolute inset-0" />

			{/* subtle vignette to ground the edges */}
			<div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55))]" />
		</div>
	);
}
