import { ShaderAnimation } from "@/components/ui/shader-animation";
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
