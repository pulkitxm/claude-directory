import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * Consistent section intro: mono eyebrow, gradient headline, muted lead.
 * Centralized so every section shares the same rhythm and type treatment.
 */
export function SectionHeader({
	eyebrow,
	title,
	lead,
	align = "center",
}: {
	eyebrow: string;
	title: ReactNode;
	lead?: ReactNode;
	align?: "center" | "left";
}) {
	const alignment =
		align === "center" ? "items-center text-center" : "items-start text-left";

	return (
		<Reveal className={`flex max-w-2xl flex-col ${alignment}`}>
			<span className="eyebrow mb-4">
				<span className="h-1 w-1 rounded-full bg-accent" />
				{eyebrow}
			</span>
			<h2 className="text-grad text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
				{title}
			</h2>
			{lead && (
				<p className="mt-4 text-base leading-relaxed text-fg-muted sm:text-lg">
					{lead}
				</p>
			)}
		</Reveal>
	);
}
