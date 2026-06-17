import { cx } from "./primitives";

/**
 * SCHEMATIC wordmark. The mark is a machined housing with a recessed
 * accent core — a screw-head / LED motif that echoes the favicon and the
 * design system's signature manufacturing details.
 */
export function Logo({ className }: { className?: string }) {
	return (
		<span className={cx("inline-flex items-center gap-2.5", className)}>
			<span
				className="relative grid h-9 w-9 place-items-center rounded-lg bg-chassis"
				style={{ boxShadow: "var(--shadow-floating)" }}
				aria-hidden="true"
			>
				<span
					className="grid h-6 w-6 place-items-center rounded-full bg-recessed"
					style={{ boxShadow: "var(--shadow-recessed-soft)" }}
				>
					<span
						className="h-2.5 w-2.5 rounded-full bg-accent"
						style={{ boxShadow: "var(--shadow-glow)" }}
					/>
				</span>
			</span>
			<span className="flex flex-col leading-none">
				<span className="text-[1.05rem] font-extrabold tracking-[-0.02em] text-ink">
					SCHEMATIC
				</span>
				<span className="stamp text-[0.5rem] text-label">
					CONTROL&nbsp;SYSTEMS
				</span>
			</span>
		</span>
	);
}
