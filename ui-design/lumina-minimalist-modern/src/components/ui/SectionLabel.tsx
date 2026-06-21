import { cn } from "@/lib/utils";

/**
 * SectionLabel — the consistent pill badge that opens every major section.
 * Accent dot (optionally pulsing) + uppercase mono text. Supports a dark
 * variant for use on the inverted slate sections.
 */
export function SectionLabel({
	children,
	pulse = false,
	tone = "light",
	className,
}: {
	children: React.ReactNode;
	pulse?: boolean;
	tone?: "light" | "dark";
	className?: string;
}) {
	const dark = tone === "dark";
	return (
		<div
			className={cn(
				"inline-flex items-center gap-3 rounded-full border px-5 py-2",
				dark ? "border-white/15 bg-white/5" : "border-accent/30 bg-accent/5",
				className,
			)}
		>
			<span className="relative flex h-2 w-2">
				{pulse && (
					<span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-accent" />
				)}
				<span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
			</span>
			<span
				className={cn(
					"font-mono text-xs uppercase tracking-label",
					dark ? "text-accent-secondary" : "text-accent",
				)}
			>
				{children}
			</span>
		</div>
	);
}
