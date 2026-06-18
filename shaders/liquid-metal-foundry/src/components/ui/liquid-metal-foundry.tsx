"use client";

import { LiquidMetal, type LiquidMetalParams } from "@paper-design/shaders-react";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";

/**
 * The set of generative shapes LiquidMetal accepts when no `image` is supplied.
 * `@paper-design/shaders-react@0.0.76` re-exports `LiquidMetalParams` but not the
 * bare `LiquidMetalShape` alias, so we derive it from the params type — staying
 * fully typed without reaching into the core package's deep export path.
 */
export type LiquidMetalShape = NonNullable<LiquidMetalParams["shape"]>;

/**
 * LiquidMetalBackground
 * ---------------------
 * The production-ready integration of the prompt's verbatim `ShadersBackground`
 * (kept untouched in `./background-shades.tsx`). It preserves that component's
 * intent — a full-bleed, framer-motion–animated `@paper-design/shaders-react`
 * `LiquidMetal` field living behind the page on a fixed, `pointer-events-none`
 * layer — while exposing every real `LiquidMetal` prop so it can be themed and
 * driven live.
 *
 * Two upstream-API reconciliations vs. the verbatim paste (see the studio's
 * "Integration notes" dock):
 *   1. The verbatim file imports `PulsingBorder` but never renders it; it's
 *      dropped here since the design is a single liquid-metal plane.
 *   2. The verbatim file passes `shape="plane"`, which is NOT a valid
 *      `LiquidMetalShape` in shaders-react@0.0.76 (the shapes are
 *      none | circle | daisy | diamond | metaballs). With no `image`, an
 *      invalid shape renders an empty mask, so the default here is `circle`
 *      (the package's own default) and the shape is selectable in the studio.
 */
export interface LiquidMetalBackgroundProps {
	/** Transparent/solid backdrop color behind the metal (RGBA-aware string). */
	colorBack?: string;
	/** Overlay tint, color-burn blended over the metal sheen. */
	colorTint?: string;
	/** Density of the animated stripe pattern (1–10). */
	repetition?: number;
	/** Color-transition sharpness: 0 = hard edge, 1 = smooth gradient (0–1). */
	softness?: number;
	/** Red-channel chromatic dispersion (−1…1). */
	shiftRed?: number;
	/** Blue-channel chromatic dispersion (−1…1). */
	shiftBlue?: number;
	/** Noise distortion over the stripes (0–1). */
	distortion?: number;
	/** Strength of distortion at the shape edges (0–1). */
	contour?: number;
	/** Generative mask shape (no image provided). */
	shape?: LiquidMetalShape;
	/** Horizontal center offset (−1…1). */
	offsetX?: number;
	/** Vertical center offset (−1…1). */
	offsetY?: number;
	/** Overall zoom of the graphic (0.01–4). */
	scale?: number;
	/** Overall rotation in degrees (0–360). */
	rotation?: number;
	/** Animation time multiplier. */
	speed?: number;
	/** Gaussian blur applied to the canvas, in px (the verbatim look = 10). */
	blur?: number;
	/** When true, layer the field full-screen behind the page (verbatim look). */
	asBackground?: boolean;
	/** Extra classes on the motion wrapper. */
	className?: string;
	/** Disable the breathing framer-motion loop (e.g. reduced-motion). */
	animate?: boolean;
}

export default function LiquidMetalBackground({
	colorBack = "hsl(0, 0%, 0%, 0)",
	colorTint = "hsl(29, 77%, 49%)",
	repetition = 4,
	softness = 0.6,
	shiftRed = 0.25,
	shiftBlue = 0.25,
	distortion = 0.12,
	contour = 1,
	shape = "circle",
	offsetX = 0,
	offsetY = 0,
	scale = 1,
	rotation = 25,
	speed = 2,
	blur = 10,
	asBackground = true,
	className = "",
	animate = true,
}: LiquidMetalBackgroundProps) {
	const canvasStyle: CSSProperties = {
		width: "100%",
		height: "100%",
		filter: blur > 0 ? `blur(${blur}px)` : undefined,
	};

	const field = (
		<motion.div
			className={`w-full h-full ${className}`}
			initial={animate ? { opacity: 0.5, scale: 1 } : false}
			animate={animate ? { opacity: 0.7, scale: 1.02, rotate: 2 } : { opacity: 0.7 }}
			transition={
				animate
					? { duration: 8, repeat: Infinity, repeatType: "mirror" }
					: { duration: 0 }
			}
		>
			<LiquidMetal
				style={canvasStyle}
				colorBack={colorBack}
				colorTint={colorTint}
				repetition={repetition}
				softness={softness}
				shiftRed={shiftRed}
				shiftBlue={shiftBlue}
				distortion={distortion}
				contour={contour}
				shape={shape}
				offsetX={offsetX}
				offsetY={offsetY}
				scale={scale}
				rotation={rotation}
				speed={speed}
			/>
		</motion.div>
	);

	if (!asBackground) {
		return <div className="relative h-full w-full overflow-hidden">{field}</div>;
	}

	return (
		<div className="relative min-h-screen">
			<div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
				{field}
			</div>
		</div>
	);
}
