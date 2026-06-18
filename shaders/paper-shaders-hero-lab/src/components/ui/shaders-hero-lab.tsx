"use client"

import { MeshGradient, PulsingBorder } from "@paper-design/shaders-react"
import { motion } from "framer-motion"
import type React from "react"
import { forwardRef } from "react"

/*
 * shaders-hero-lab.tsx
 * --------------------
 * A *parameterised* sibling of the verbatim `shaders-hero-section.tsx` drop-in.
 *
 * The verbatim component bakes its shader constants in (two hard-coded
 * <MeshGradient> layers + a hard-coded <PulsingBorder>). That is exactly what
 * 21st.dev ships and it stays untouched in `components/ui/shaders-hero-section`.
 *
 * To let the Hero Lab drive those constants live, this file:
 *   - re-exports the verbatim `Header` and `HeroContent` (genuine reuse — the
 *     chrome and copy are identical to the drop-in), and
 *   - promotes the baked-in shader numbers to props on a configurable
 *     `<ConfigurableShaderBackground>` and `<ConfigurablePulsingCircle>`.
 *
 * Every default below is the *literal* value from the verbatim component, so
 * `<ConfigurableShaderBackground>` with no props renders pixel-identically to
 * `<ShaderBackground>`.
 */

export { Header, HeroContent } from "@/components/ui/shaders-hero-section"

/* ------------------------------------------------------------------ *
 * Configurable shader background — the two MeshGradient layers, exposed
 * ------------------------------------------------------------------ */

export interface ShaderConfig {
	/** Primary mesh-gradient colour stops (verbatim: black / saddle-brown / white / espresso). */
	baseColors: string[]
	/** Wireframe overlay colour stops (verbatim: black / white / saddle-brown / black). */
	wireColors: string[]
	/** Animation speed of the base mesh layer (verbatim: 0.3). */
	baseSpeed: number
	/** Animation speed of the wireframe overlay (verbatim: 0.2). */
	wireSpeed: number
	/** Organic noise distortion (paper-shaders default). */
	distortion: number
	/** Vortex distortion (paper-shaders default). */
	swirl: number
	/** Opacity of the wireframe overlay (verbatim: 0.6). */
	wireOpacity: number
	/** Whether the wireframe overlay is drawn at all (verbatim: on). */
	wireframe: boolean
}

export const SHADER_DEFAULTS: ShaderConfig = {
	baseColors: ["#000000", "#8B4513", "#ffffff", "#3E2723", "#5D4037"],
	wireColors: ["#000000", "#ffffff", "#8B4513", "#000000"],
	baseSpeed: 0.3,
	wireSpeed: 0.2,
	distortion: 0.8,
	swirl: 0.6,
	wireOpacity: 0.6,
	wireframe: true,
}

interface ConfigurableShaderBackgroundProps {
	children: React.ReactNode
	config?: Partial<ShaderConfig>
}

/**
 * The verbatim `ShaderBackground`, but with its two MeshGradient layers driven
 * by `config`. The SVG filter <defs> (glass-effect / gooey-filter) are kept
 * byte-for-byte so the header pill and login button render identically.
 *
 * Forwards a ref to the host <div> so the lab can sample the live shader canvas.
 */
export const ConfigurableShaderBackground = forwardRef<HTMLDivElement, ConfigurableShaderBackgroundProps>(
	function ConfigurableShaderBackground({ children, config }, ref) {
		const c: ShaderConfig = { ...SHADER_DEFAULTS, ...config }

		return (
			<div ref={ref} className="min-h-screen w-full relative overflow-hidden">
				{/* SVG Filters — identical to the verbatim drop-in */}
				<svg className="absolute inset-0 w-0 h-0">
					<defs>
						<filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
							<feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
							<feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
							<feColorMatrix
								type="matrix"
								values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
								result="tint"
							/>
						</filter>
						<filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
							<feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
							<feColorMatrix
								in="blur"
								mode="matrix"
								values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
								result="gooey"
							/>
							<feComposite in="SourceGraphic" in2="gooey" operator="atop" />
						</filter>
					</defs>
				</svg>

				{/* Background Shaders — live-driven.
				 * Note: the verbatim drop-in passes `backgroundColor` / `wireframe`
				 * to <MeshGradient>, but at @paper-design/shaders-react@0.0.76 those
				 * props are NOT consumed by the component — they leak onto the host
				 * <div> and make React log an "unrecognized DOM attribute" warning.
				 * The two layers are already visually distinct via their colour stops,
				 * opacity and speed, so this parameterised variant simply omits the
				 * two no-op props and stays console-clean. (The verbatim file keeps
				 * them, byte-for-byte as 21st.dev ships it.) */}
				<MeshGradient
					className="absolute inset-0 w-full h-full"
					colors={c.baseColors}
					distortion={c.distortion}
					swirl={c.swirl}
					speed={c.baseSpeed}
				/>
				{c.wireframe && (
					<MeshGradient
						className="absolute inset-0 w-full h-full"
						style={{ opacity: c.wireOpacity }}
						colors={c.wireColors}
						distortion={c.distortion}
						swirl={c.swirl}
						speed={c.wireSpeed}
					/>
				)}

				{children}
			</div>
		)
	},
)

/* ------------------------------------------------------------------ *
 * Configurable pulsing circle — the corner emblem, exposed
 * ------------------------------------------------------------------ */

export interface PulseConfig {
	/** Border spot colours (verbatim: 7-stop rainbow). */
	colors: string[]
	/** Pulse animation speed (verbatim: 1.5). */
	speed: number
	/** Glow intensity (verbatim: 5). */
	intensity: number
	/** Border thickness 0..1 (verbatim: 0.1). */
	thickness: number
	/** Pulse depth 0..1 (verbatim: 0.1). */
	pulse: number
	/** Orbiting marquee text. */
	label: string
}

export const PULSE_DEFAULTS: PulseConfig = {
	colors: ["#BEECFF", "#E77EDC", "#FF4C3E", "#00FF88", "#FFD700", "#FF6B35", "#8A2BE2"],
	speed: 1.5,
	intensity: 5,
	thickness: 0.1,
	pulse: 0.1,
	label: "21st.dev is cool • 21st.dev is cool • 21st.dev is cool • 21st.dev is cool •",
}

interface ConfigurablePulsingCircleProps {
	config?: Partial<PulseConfig>
}

export function ConfigurablePulsingCircle({ config }: ConfigurablePulsingCircleProps) {
	const c: PulseConfig = { ...PULSE_DEFAULTS, ...config }

	return (
		<div className="absolute bottom-8 right-8 z-30">
			<div className="relative w-20 h-20 flex items-center justify-center">
				{/* `spots` is the consumed prop at 0.0.76 (the verbatim drop-in passes
				 * `spotsPerColor`, which leaks to the DOM at this version); everything
				 * else here is a real PulsingBorder uniform. */}
				<PulsingBorder
					colors={c.colors}
					colorBack="#00000000"
					speed={c.speed}
					roundness={1}
					thickness={c.thickness}
					softness={0.2}
					intensity={c.intensity}
					spots={5}
					spotSize={0.1}
					pulse={c.pulse}
					smoke={0.5}
					smokeSize={4}
					scale={0.65}
					rotation={0}
					frame={9161408.251009725}
					style={{
						width: "60px",
						height: "60px",
						borderRadius: "50%",
					}}
				/>

				<motion.svg
					className="absolute inset-0 w-full h-full"
					viewBox="0 0 100 100"
					animate={{ rotate: 360 }}
					transition={{
						duration: 20,
						repeat: Number.POSITIVE_INFINITY,
						ease: "linear",
					}}
					style={{ transform: "scale(1.6)" }}
				>
					<defs>
						<path id="circle-lab" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
					</defs>
					<text className="text-sm fill-white/80 instrument">
						<textPath href="#circle-lab" startOffset="0%">
							{c.label}
						</textPath>
					</text>
				</motion.svg>
			</div>
		</div>
	)
}
