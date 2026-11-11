import { GrainGradient } from "@paper-design/shaders-react";
import type { ComponentProps } from "react";
export type GrainShape = NonNullable<
	ComponentProps<typeof GrainGradient>["shape"]
>;
export type GrainGradientStageProps = Omit<
	ComponentProps<typeof GrainGradient>,
	"style"
> & { paused?: boolean };
export function GrainGradientStage({
	paused = false,
	speed = 1,
	...parameters
}: GrainGradientStageProps) {
	return (
		<GrainGradient
			{...parameters}
			speed={paused ? 0 : speed}
			style={{ width: "100%", height: "100%" }}
		/>
	);
}
