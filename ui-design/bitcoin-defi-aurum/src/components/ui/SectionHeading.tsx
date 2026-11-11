import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

interface SectionHeadingProps {

	kicker: string;

	title: ReactNode;

	accent?: string;
	description?: ReactNode;
	align?: "center" | "left";
	className?: string;
}


export function SectionHeading({
	kicker,
	title,
	accent,
	description,
	align = "center",
	className,
}: SectionHeadingProps) {
	return (
		<div
			className={cn(
				"flex flex-col gap-5",
				align === "center"
					? "items-center text-center"
					: "items-start text-left",
				className,
			)}
		>
			<Badge live>{kicker}</Badge>
			<h2 className="max-w-3xl font-heading text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
				{title} {accent && <span className="text-gradient">{accent}</span>}
			</h2>
			{description && (
				<p className="max-w-2xl text-base leading-relaxed text-stardust md:text-lg">
					{description}
				</p>
			)}
		</div>
	);
}
