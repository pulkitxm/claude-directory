import { Warp } from "@paper-design/shaders-react";
import type { ReactNode } from "react";
import { DEFAULT_WARP, type WarpConfig, warpProps } from "@/lib/warp";
export interface WrapperProps {
	config?: WarpConfig;
	rail?: ReactNode;
	children?: ReactNode;
}
export default function WarpField({
	config = DEFAULT_WARP,
	rail,
	children,
}: WrapperProps) {
	return (
		<div className="relative min-h-screen">
			<div className="pointer-events-none fixed inset-0 -z-10">
				<Warp
					{...warpProps(config)}
					style={{ width: "100%", height: "100%" }}
				/>
			</div>
			{rail && (
				<aside className="absolute left-8 top-1/2 z-10 -translate-y-1/2">
					{rail}
				</aside>
			)}
			<main className="relative z-10 p-8">{children}</main>
		</div>
	);
}
