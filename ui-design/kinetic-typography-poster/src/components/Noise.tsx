/**
 * Fixed, full-viewport SVG noise overlay. feTurbulence (baseFrequency 0.8,
 * numOctaves 4) gives a print/poster grain; it sits at opacity 0.03 with
 * mix-blend-overlay so it never touches readability. Decorative, so it's
 * aria-hidden — but the SVG keeps a <title> for any tooling that inspects it.
 */
export function Noise() {
	return (
		<div
			aria-hidden="true"
			className="pointer-events-none fixed inset-0 z-[100] opacity-[0.03] mix-blend-overlay"
		>
			<svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
				<title>Poster grain texture</title>
				<filter id="poster-noise">
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.8"
						numOctaves={4}
						stitchTiles="stitch"
					/>
				</filter>
				<rect width="100%" height="100%" filter="url(#poster-noise)" />
			</svg>
		</div>
	);
}
