"use client";

import { GrainGradient } from "@paper-design/shaders-react";

/* ------------------------------------------------------------------ *
 * GradientBackground — the prompt's verbatim drop-in.
 *
 * A full-bleed, absolutely-positioned grain-gradient that paints the
 * "corners" shape (two rounded rectangles) of @paper-design's
 * GrainGradient behind whatever sits in front of it. The original
 * component is preserved exactly as supplied so it stays a faithful
 * copy-paste; the lab around it (App.tsx) re-renders the same shader
 * with live props to expose the full GrainGradient surface.
 * ------------------------------------------------------------------ */
export function GradientBackground() {
	return (
		<div className="absolute inset-0 -z-10">
			<GrainGradient
				style={{ height: "100%", width: "100%" }}
				colorBack="hsl(0, 0%, 0%)"
				softness={0.76}
				intensity={0.45}
				noise={0}
				shape="corners"
				offsetX={0}
				offsetY={0}
				scale={1}
				rotation={0}
				speed={1}
				colors={[
					"hsl(14, 100%, 57%)",
					"hsl(45, 100%, 51%)",
					"hsl(340, 82%, 52%)",
				]}
			/>
		</div>
	);
}
