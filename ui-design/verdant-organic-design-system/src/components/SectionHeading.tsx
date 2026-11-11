import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
	eyebrow: string;
	title: ReactNode;

	intro?: ReactNode;
	align?: "left" | "center";

	onDark?: boolean;
	className?: string;
};


export function SectionHeading({
	eyebrow,
	title,
	intro,
	align = "center",
	onDark = false,
	className,
}: SectionHeadingProps) {
	const centered = align === "center";
	return (
		<div
			className={cn(
				"flex flex-col",
				centered ? "items-center text-center" : "items-start text-left",
				className,
			)}
		>
			<Reveal>
				<Eyebrow
					onDark={onDark}
					icon={
						<span
							aria-hidden
							className={cn(
								"h-1.5 w-1.5 rounded-full",
								onDark ? "bg-primary-foreground" : "bg-secondary",
							)}
						/>
					}
				>
					{eyebrow}
				</Eyebrow>
			</Reveal>

			<Reveal delay={0.08}>
				<h2
					className={cn(
						"mt-5 max-w-3xl text-balance text-4xl font-semibold md:text-5xl",
						onDark ? "text-primary-foreground" : "text-foreground",
					)}
				>
					{title}
				</h2>
			</Reveal>

			{intro && (
				<Reveal delay={0.16}>
					<p
						className={cn(
							"mt-5 max-w-2xl text-lg leading-relaxed",
							onDark ? "text-primary-foreground/80" : "text-muted-foreground",
						)}
					>
						{intro}
					</p>
				</Reveal>
			)}
		</div>
	);
}
