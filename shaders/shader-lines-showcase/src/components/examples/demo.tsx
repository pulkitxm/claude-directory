import { ShaderAnimation } from "@/components/ui/shader-lines";
export default function DemoOne() {
	return (
		<div className="relative flex h-[650px] w-full flex-col items-center justify-center overflow-hidden rounded-xl">
			<ShaderAnimation />
			<span className="pointer-events-none z-10 whitespace-pre-wrap text-center text-7xl font-semibold leading-none tracking-tighter text-white">
				Shader Lines
			</span>
		</div>
	);
}
