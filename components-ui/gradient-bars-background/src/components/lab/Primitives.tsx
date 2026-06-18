import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
	id,
	children,
	className,
}: {
	id?: string;
	children: ReactNode;
	className?: string;
}) {
	return (
		<section
			id={id}
			className={cn(
				"relative mx-auto w-full max-w-6xl scroll-mt-24 px-5 sm:px-8",
				className,
			)}
		>
			{children}
		</section>
	);
}

export function Eyebrow({ children }: { children: ReactNode }) {
	return (
		<div className="flex items-center gap-3">
			<span className="h-px w-8 bg-gradient-to-r from-flame to-transparent" />
			<span className="font-mono text-[11px] uppercase tracking-[0.32em] text-flame-soft">
				{children}
			</span>
		</div>
	);
}

export function SectionTitle({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<h2
			className={cn(
				"font-display text-3xl font-semibold tracking-tight text-fog-200 sm:text-4xl",
				className,
			)}
		>
			{children}
		</h2>
	);
}

export function Lead({ children }: { children: ReactNode }) {
	return (
		<p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-fog-400">
			{children}
		</p>
	);
}

export function Card({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"rounded-2xl border border-line bg-ink-850/70 p-5 backdrop-blur-sm",
				className,
			)}
		>
			{children}
		</div>
	);
}

export function CheckPill({ label }: { label: string }) {
	return (
		<span className="inline-flex items-center gap-2 rounded-full border border-flame/25 bg-flame/5 px-3 py-1 font-mono text-[11px] text-ember">
			<span className="h-1.5 w-1.5 rounded-full bg-flame-soft shadow-[0_0_8px_var(--color-flame)]" />
			{label}
		</span>
	);
}

/**
 * Step marker for the "setup" list — a flame-ringed number.
 */
export function StepNum({ n }: { n: number }) {
	return (
		<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-flame/40 bg-flame/10 font-mono text-xs font-semibold text-ember">
			{n}
		</span>
	);
}
