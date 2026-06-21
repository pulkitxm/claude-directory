import { ShaderAnimation } from "@/components/ui/shader-animation";

/**
 * The canonical demo from the integration brief: the shader filling a bordered
 * card with a large centred label on top. Reproduced verbatim (only the fixed
 * `h-screen` default is overridden via `className` so it sits inside the card)
 * and reused live in the showcase below.
 */
export default function DemoOne() {
	return (
		<div className="relative flex h-[650px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-graphite-line bg-blue-700">
			<ShaderAnimation className="absolute inset-0 h-full w-full" />
			<span className="pointer-events-none absolute z-10 whitespace-pre-wrap text-center text-5xl font-semibold leading-none tracking-tighter text-white sm:text-7xl">
				Shader Animation
			</span>
		</div>
	);
}
