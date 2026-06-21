import { type StatusKind, status } from "./tokens";

const tone = {
	primary: "text-primary glow",
	secondary: "text-secondary glow-amber",
	error: "text-error glow-error",
} as const;

/** Bracketed status code: [OK] / [WARN] / [ERR] / [RUN]. */
export function StatusBadge({
	kind,
	pulse = false,
}: {
	kind: StatusKind;
	pulse?: boolean;
}) {
	const s = status[kind];
	return (
		<span
			className={`inline-flex items-center text-2xs font-bold tracking-[0.14em] tabular-nums ${tone[s.tone]} ${pulse ? "[animation:var(--animate-blink)]" : ""}`}
		>
			[{s.label}]
		</span>
	);
}
