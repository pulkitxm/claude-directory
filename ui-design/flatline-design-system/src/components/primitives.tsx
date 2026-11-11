import type {
	ReactNode,
	ButtonHTMLAttributes,
	AnchorHTMLAttributes,
} from "react";
import { motion } from "motion/react";
import { fadeUp, reveal } from "../lib/motion";



type Tone = "light" | "fog" | "brand" | "grass" | "sun" | "ink";

const toneBg: Record<Tone, string> = {
	light: "bg-[var(--color-canvas)] text-[var(--color-ink)]",
	fog: "bg-[var(--color-fog)] text-[var(--color-ink)]",
	brand: "bg-[var(--color-brand)] text-white on-color",
	grass: "bg-[var(--color-grass)] text-white on-color",
	sun: "bg-[var(--color-sun)] text-[var(--color-ink)] on-color",
	ink: "bg-[var(--color-ink)] text-white on-dark",
};


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


export function Shell({
	className = "",
	children,
}: {
	className?: string;
	children: ReactNode;
}) {
	return <div className={`shell ${className}`}>{children}</div>;
}


export function Eyebrow({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) {
	return <span className={`eyebrow ${className}`}>{children}</span>;
}




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
