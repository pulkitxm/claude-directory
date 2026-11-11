import { forwardRef } from "react";
import type { ReactNode, HTMLAttributes, InputHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { fadeInUp, stagger, viewportOnce } from "../motion";

// ─────────────────────────────────────────────────────────────────────────────
// Small shared primitives so sections never reinvent the system's atoms:
// section label, accent bar, card, input, and the two scroll-reveal wrappers.
// ─────────────────────────────────────────────────────────────────────────────


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


export function AccentBar({ className = "" }: { className?: string }) {
	return <span aria-hidden className={`accent-bar ${className}`} />;
}

// ── Card ─────────────────────────────────────────────────────────────────────
type CardProps = {
	children: ReactNode;

	bordered?: boolean;

	highlighted?: boolean;

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

// ── Input ──────────────────────────────────────────────────────────────────,
type InputProps = {

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

// ── Scroll reveal wrappers ─────────────────────────────────────────────────,
type RevealProps = {
	children: ReactNode;
	className?: string;
	as?: "div" | "section" | "li" | "article" | "header";
};


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
