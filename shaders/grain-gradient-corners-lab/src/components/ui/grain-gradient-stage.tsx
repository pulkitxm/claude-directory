"use client";

import { GrainGradient } from "@paper-design/shaders-react";

/* ------------------------------------------------------------------ *
 * GrainGradientStage — a parametric drop-in built around the same
 * @paper-design/shaders-react `GrainGradient` used by the verbatim
 * GradientBackground, but with every uniform promoted to a live prop
 * so a control deck can drive it. Keep this in `components/ui` next to
 * the verbatim copy; it is the surface the lab renders behind the UI.
 *
 * Shapes mirror the shader's `u_shape` enum:
 *   wave · dots · truchet · corners · ripple · blob · sphere
 * ------------------------------------------------------------------ */

export type GrainShape =
	| "wave"
	| "dots"
	| "truchet"
	| "corners"
	| "ripple"
	| "blob"
	| "sphere";

export interface GrainGradientStageProps {
	className?: string;
	/** Backdrop colour behind the gradient bands (CSS color string). */
	colorBack?: string;
	/** Up to 7 gradient colours (CSS color strings). */
	colors?: string[];
	/** 0..1 — blur between colour bands. */
	softness?: number;
	/** 0..1 — distortion between colour bands. */
	intensity?: number;
	/** 0..1 — grainy noise independent of softness. */
	noise?: number;
	/** Animated abstract shape the gradient flows over. */
	shape?: GrainShape;
	/** World offset of the graphic. */
	offsetX?: number;
	offsetY?: number;
	/** Graphic scale (1 = native). */
	scale?: number;
	/** Rotation in degrees. */
	rotation?: number;
	/** Animation speed (0 freezes the field). */
	speed?: number;
	/** When true, animation is paused (speed forced to 0). */
	paused?: boolean;
}

export function GrainGradientStage({
	className,
	colorBack = "hsl(0, 0%, 0%)",
	colors = [
		"hsl(14, 100%, 57%)",
		"hsl(45, 100%, 51%)",
		"hsl(340, 82%, 52%)",
	],
	softness = 0.76,
	intensity = 0.45,
	noise = 0,
	shape = "corners",
	offsetX = 0,
	offsetY = 0,
	scale = 1,
	rotation = 0,
	speed = 1,
	paused = false,
}: GrainGradientStageProps) {
	return (
		<GrainGradient
			className={className}
			style={{ height: "100%", width: "100%" }}
			colorBack={colorBack}
			colors={colors}
			softness={softness}
			intensity={intensity}
			noise={noise}
			shape={shape}
			offsetX={offsetX}
			offsetY={offsetY}
			scale={scale}
			rotation={rotation}
			speed={paused ? 0 : speed}
		/>
	);
}
