import { forwardRef } from "react";
import type { ReactNode, HTMLAttributes, InputHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { fadeInUp, stagger, viewportOnce } from "../motion";

// ─────────────────────────────────────────────────────────────────────────────
// Small shared primitives so sections never reinvent the system's atoms:
// section label, accent bar, card, input, and the two scroll-reveal wrappers.
// ─────────────────────────────────────────────────────────────────────────────

/** All-caps mono eyebrow with an accent tick. Anchors every section header. */
export function SectionLabel({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<span className={`inline-flex items-center gap-3 label-mono ${className}`}>
			<span aria-hidden className="h-px w-8 bg-accent" />
			{children}
		</span>
	);
}

/** Thin horizontal accent bar (h-1 w-16) used as a visual anchor on key blocks. */
export function AccentBar({ className = "" }: { className?: string }) {
	return <span aria-hidden className={`accent-bar ${className}`} />;
}

// ── Card ─────────────────────────────────────────────────────────────────────
type CardProps = {
	children: ReactNode;
	/** draw the 1px border (default true) */
	bordered?: boolean;
	/** featured tier: 2px accent border instead of 1px */
	highlighted?: boolean;
	/** lighten the border on hover */
	interactive?: boolean;
	className?: string;
} & HTMLAttributes<HTMLDivElement>;

export function Card({
	children,
	bordered = true,
	highlighted = false,
	interactive = false,
	className = "",
	...rest
}: CardProps) {
	const borderCls = highlighted
		? "border-thick border-accent"
		: bordered
			? "border border-border"
			: "border border-transparent";
	const hoverCls = interactive
		? "transition-colors duration-150 ease-crisp hover:border-border-hover"
		: "";
	return (
		<div
			className={`bg-transparent p-6 md:p-8 ${borderCls} ${hoverCls} ${className}`}
			{...rest}
		>
			{children}
		</div>
	);
}

// ── Input ──────────────────────────────────────────────────────────────────—
type InputProps = {
	/** invert palette for use on the light Final-CTA ground */
	inverted?: boolean;
	className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
	{ inverted = false, className = "", ...rest },
	ref,
) {
	// Sharp corners, 16px text (no iOS zoom), h-12 → h-14, accent border on focus.
	const baseCls =
		"block w-full h-12 md:h-14 px-4 text-base rounded-none outline-none " +
		"transition-colors duration-150 ease-crisp " +
		"disabled:cursor-not-allowed disabled:opacity-50";
	const palette = inverted
		? "bg-transparent border border-[rgba(10,10,10,0.3)] text-background placeholder:text-[rgba(10,10,10,0.5)] focus:border-accent"
		: "bg-input border border-border text-foreground placeholder:text-muted-foreground focus:border-accent";
	return (
		<input
			ref={ref}
			className={`${baseCls} ${palette} ${className}`}
			{...rest}
		/>
	);
});

// ── Scroll reveal wrappers ─────────────────────────────────────────────────—
type RevealProps = {
	children: ReactNode;
	className?: string;
	as?: "div" | "section" | "li" | "article" | "header";
};

/** A single fade-in-up element triggered once when scrolled into view. */
export function Reveal({ children, className = "", as = "div" }: RevealProps) {
	const Comp = motion[as];
	return (
		<Comp
			variants={fadeInUp}
			initial="hidden"
			whileInView="visible"
			viewport={viewportOnce}
			className={className}
		>
			{children}
		</Comp>
	);
}

/** A container that staggers its <RevealItem> children by 80ms. */
export function RevealGroup({
	children,
	className = "",
	as = "div",
}: RevealProps) {
	const Comp = motion[as];
	return (
		<Comp
			variants={stagger}
			initial="hidden"
			whileInView="visible"
			viewport={viewportOnce}
			className={className}
		>
			{children}
		</Comp>
	);
}

/** A child of <RevealGroup> that fades up as part of the stagger sequence. */
export function RevealItem({
	children,
	className = "",
	as = "div",
}: RevealProps) {
	const Comp = motion[as];
	return (
		<Comp variants={fadeInUp} className={className}>
			{children}
		</Comp>
	);
}
