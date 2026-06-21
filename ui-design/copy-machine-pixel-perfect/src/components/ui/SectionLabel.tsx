import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
	/** Schematic-style reference designator that encodes section order (U1, R4…) */
	designator: string;
	label: string;
	className?: string;
	align?: "left" | "center";
}

/**
 * The structural eyebrow used across the page. The designator is not decoration:
 * it numbers each board "part" in the order the reader meets it, the way a real
 * schematic references components.
 */
export function SectionLabel({
	designator,
	label,
	className,
	align = "left",
}: SectionLabelProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 8 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-80px" }}
			transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
			className={cn(
				"flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-silk-dim",
				align === "center" && "justify-center",
				className,
			)}
		>
			<span className="inline-flex h-5 items-center rounded-[3px] border border-copper/40 bg-copper/[0.08] px-1.5 font-medium text-copper">
				{designator}
			</span>
			<span aria-hidden className="h-px w-6 trace-line" />
			<span>{label}</span>
		</motion.div>
	);
}
