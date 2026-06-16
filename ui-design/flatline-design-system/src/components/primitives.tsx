import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { motion } from "motion/react";
import { fadeUp, reveal } from "../lib/motion";

/* ============================================================================
   PRIMITIVES
   Small, composable building blocks shared by every section. Keeping these in
   one place means the flat-design rules (no shadow, geometric purity, color
   blocking) are expressed once and reused — no one-off styles downstream.
   ========================================================================== */

type Tone = "light" | "fog" | "brand" | "grass" | "sun" | "ink";

const toneBg: Record<Tone, string> = {
	light: "bg-[var(--color-canvas)] text-[var(--color-ink)]",
	fog: "bg-[var(--color-fog)] text-[var(--color-ink)]",
	brand: "bg-[var(--color-brand)] text-white on-color",
	grass: "bg-[var(--color-grass)] text-white on-color",
	sun: "bg-[var(--color-sun)] text-[var(--color-ink)] on-color",
	ink: "bg-[var(--color-ink)] text-white on-dark",
};

/* A full-width color-blocked section. Tone sets the solid background — color,
   never lines or shadows, separates sections. */
export function Section({
	id,
	tone = "light",
	className = "",
	children,
}: {
	id?: string;
	tone?: Tone;
	className?: string;
	children: ReactNode;
}) {
	return (
		<section
			id={id}
			className={`relative overflow-hidden ${toneBg[tone]} ${className}`}
		>
			{children}
		</section>
	);
}

/* Constrained 12-col grid container (max-w-7xl). */
export function Shell({
	className = "",
	children,
}: {
	className?: string;
	children: ReactNode;
}) {
	return <div className={`shell ${className}`}>{children}</div>;
}

/* Uppercase tracked eyebrow. Pass a text-color class to tint it. */
export function Eyebrow({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) {
	return <span className={`eyebrow ${className}`}>{children}</span>;
}

/* ---- Decorative geometry ------------------------------------------------- */
/* Large flat shapes positioned absolutely for the "poster" look. They carry
   visual interest with zero depth — no blur, no shadow, just solid form at
   low opacity or solid color. */

export function Blob({ className = "" }: { className?: string }) {
	return (
		<div
			aria-hidden
			className={`pointer-events-none absolute rounded-full ${className}`}
		/>
	);
}

export function Square({
	className = "",
	rotate = 12,
}: {
	className?: string;
	rotate?: number;
}) {
	return (
		<div
			aria-hidden
			style={{ rotate: `${rotate}deg` }}
			className={`pointer-events-none absolute rounded-lg ${className}`}
		/>
	);
}

/* ---- Buttons (thin wrappers over the centralized .btn tokens) ----------- */
type Variant =
	| "primary"
	| "secondary"
	| "outline"
	| "outline-light"
	| "outline-ink";

const variantClass: Record<Variant, string> = {
	primary: "btn-primary",
	secondary: "btn-secondary",
	outline: "btn-outline",
	"outline-light": "btn-outline-light",
	"outline-ink": "btn-outline-ink",
};

export function Button({
	variant = "primary",
	size = "md",
	className = "",
	children,
	...rest
}: {
	variant?: Variant;
	size?: "md" | "lg";
} & ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			className={`btn ${variantClass[variant]} ${size === "lg" ? "btn-lg" : ""} ${className}`}
			{...rest}
		>
			{children}
		</button>
	);
}

export function ButtonLink({
	variant = "primary",
	size = "md",
	className = "",
	children,
	...rest
}: {
	variant?: Variant;
	size?: "md" | "lg";
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
	return (
		<a
			className={`btn ${variantClass[variant]} ${size === "lg" ? "btn-lg" : ""} ${className}`}
			{...rest}
		>
			{children}
		</a>
	);
}

/* A scroll-revealed wrapper so sections animate in with one consistent motion. */
export function Reveal({
	children,
	className = "",
	delay = 0,
}: {
	children: ReactNode;
	className?: string;
	delay?: number;
}) {
	return (
		<motion.div
			variants={fadeUp}
			{...reveal}
			transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
