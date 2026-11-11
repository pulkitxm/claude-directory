import { LiquidMetal } from "@paper-design/shaders-react";
import type { ComponentProps } from "react";
export type LiquidMetalShape = NonNullable<
	ComponentProps<typeof LiquidMetal>["shape"]
>;
export type LiquidMetalBackgroundProps = Omit<
	ComponentProps<typeof LiquidMetal>,
	"style"
> & { blur?: number; asBackground?: boolean; animate?: boolean };
export default function LiquidMetalBackground({
	blur = 0,
	asBackground = true,
	animate = true,
	className = "",
	...parameters
}: LiquidMetalBackgroundProps) {
	return (
		<div
			className={`${asBackground ? "pointer-events-none fixed inset-0 -z-10" : "relative h-full w-full overflow-hidden"} ${className}`}
		>
			<div
				className="h-full w-full"
				style={{
					animation: animate
						? "field-breathe 9s ease-in-out infinite alternate"
						: "none",
				}}
			>
				<LiquidMetal
					{...parameters}
					style={{
						width: "100%",
						height: "100%",
						filter: blur > 0 ? `blur(${blur}px)` : undefined,
					}}
				/>
			</div>
		</div>
	);
}
