import { MeshGradient } from "@paper-design/shaders-react";

/**
 * The page backdrop. This is the *exact* MeshGradient configuration the prompt's
 * verbatim `background-shader.tsx` ships (same deep-blue color stops, distortion,
 * swirl, speed, offsets), lifted out so the full waitlist site can sit on top of
 * the same living shader the component defines — rather than a separate one.
 *
 * It is fixed behind everything (z-0) and spans the viewport. A dark gradient
 * scrim is layered over it so white copy and the glass card stay legible as the
 * mesh churns underneath.
 */
export default function MeshBackdrop() {
	return (
		<div className="fixed inset-0 z-0" aria-hidden="true">
			<MeshGradient
				style={{ height: "100%", width: "100%" }}
				distortion={0.8}
				swirl={0.1}
				offsetX={0}
				offsetY={0}
				scale={1}
				rotation={0}
				speed={1}
				colors={[
					"hsl(216, 90%, 27%)",
					"hsl(243, 68%, 36%)",
					"hsl(205, 91%, 64%)",
					"hsl(211, 61%, 57%)",
				]}
			/>
			{/* Legibility scrim: darkens top + bottom, keeps the centre luminous. */}
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,transparent_30%,rgba(4,10,30,0.55)_100%)]" />
			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#040a1e]/80 via-[#040a1e]/20 to-transparent" />
			{/* Subtle film grain for depth (CSS-only, no asset). */}
			<div className="grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" />
		</div>
	);
}
