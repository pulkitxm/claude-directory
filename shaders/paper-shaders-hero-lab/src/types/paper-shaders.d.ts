/*
 * Module augmentation for @paper-design/shaders-react (0.0.76).
 *
 * The verbatim 21st.dev component passes a few props that the runtime accepts
 * (they flow through the shader's loose uniform passthrough) but that are NOT
 * declared in the package's published .d.ts at this version:
 *
 *   <MeshGradient>   backgroundColor, wireframe
 *   <PulsingBorder>  colorBack, spotsPerColor, scale, rotation, frame
 *
 * Rather than edit the copy-pasted component to satisfy the type-checker, we
 * widen the component prop types here so the drop-in compiles exactly as shipped.
 * `backgroundColor` / `colorBack` are real string uniforms; the rest are numeric
 * shader controls. Typing them precisely keeps `strict` honest.
 */
import "@paper-design/shaders-react"

declare module "@paper-design/shaders-react" {
	interface MeshGradientProps {
		/** Solid backdrop colour painted behind the mesh (string uniform). */
		backgroundColor?: string
		/** Render the mesh as a wireframe. Accepts the string "true"/"false" too. */
		wireframe?: boolean | "true" | "false"
	}

	interface PulsingBorderProps {
		/** Backdrop colour behind the ring (e.g. "#00000000" for transparent). */
		colorBack?: string
		/** Number of glow spots rendered per colour stop. */
		spotsPerColor?: number
		/** Uniform scale of the ring within its box. */
		scale?: number
		/** Static rotation offset, in turns. */
		rotation?: number
		/** Fixed animation frame seed (freezes/sets the noise phase). */
		frame?: number
	}
}
