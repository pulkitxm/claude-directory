import type { ReactNode } from "react";
import { Warp } from "@paper-design/shaders-react";
import { PROMPT_WARP, warpProps, type WarpConfig } from "@/lib/warp";

/**
 * background-shaders.tsx — the brief's component, dropped into `@/components/ui`.
 *
 * The original snippet (see prompt.md) shipped malformed JSX: `className= "..."`
 * with stray spaces, a broken `< /div>` closing tag, props written as
 * `proportion = { 0.45}`, and three empty placeholder `<div>`s. This is the
 * SAME component — same layered structure and the same exact `<Warp>` props —
 * corrected so it compiles and type-checks, then opened up just enough to be
 * driven live by the lab:
 *
 *   • `config`  — the Warp parameters. Defaults to {@link PROMPT_WARP}, i.e. the
 *                 verbatim values from the brief, so the zero-arg default export
 *                 renders the literal component the prompt asked us to integrate.
 *   • `rail`    — content for the `left-8 top-1/2 -translate-y-1/2 z-10` side
 *                 rail the prompt left empty.
 *   • `children`— content for the `relative z-10 p-8` foreground the prompt left
 *                 empty.
 *
 * The shader lives in the `fixed inset-0 -z-10` layer exactly as written, so it
 * paints a full-viewport background behind whatever page content sits above it.
 */
export interface WrapperProps {
	config?: WarpConfig;
	rail?: ReactNode;
	children?: ReactNode;
}

export default function Wrapper({
	config = PROMPT_WARP,
	rail,
	children,
}: WrapperProps) {
	return (
		<div className="relative min-h-screen">
			{/* Fixed, full-viewport shader background — verbatim from the prompt. */}
			<div className="fixed inset-0 -z-10">
				<Warp style={{ width: "100%", height: "100%" }} {...warpProps(config)} />
			</div>

			{/* Left side rail (the prompt's empty `left-8 top-1/2` slot). */}
			<div className="absolute left-8 top-1/2 -translate-y-1/2 z-10">{rail}</div>

			{/* Foreground content (the prompt's empty `relative z-10 p-8` slot). */}
			<div className="relative z-10 p-8">{children}</div>
		</div>
	);
}
