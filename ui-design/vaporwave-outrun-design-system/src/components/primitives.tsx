import { motion } from "motion/react";
import type {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	InputHTMLAttributes,
	ReactNode,
} from "react";
import { fadeUp, REVEAL_TRANSITION, reveal } from "../lib/motion";




export function Section({
	id,
	className = "",
	children,
}: {
	id?: string;
	className?: string;
	children: ReactNode;
}) {
	return (
		<section id={id} className={`relative ${className}`}>
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
	return (
		<span className={`eyebrow ${className}`}>
			<span>{children}</span>
		</span>
	);
}


export function SectionHeading({
	prompt = ">",
	children,
	gradient = false,
	className = "",
}: {
	prompt?: string;
	children: ReactNode;
	gradient?: boolean;
	className?: string;
}) {
	return (
		<h2
			className={`font-heading font-black uppercase leading-tight text-3xl sm:text-5xl ${className}`}
		>
			<span className="text-[var(--color-cyan)]">{prompt} </span>
			<span className={gradient ? "text-sunset" : "text-glow-white"}>
				{children}
			</span>
		</h2>
	);
}


type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variantClass: Record<Variant, string> = {
	primary: "btn-primary",
	secondary: "btn-secondary",
	outline: "btn-outline",
	ghost: "btn-ghost",
};
const sizeClass: Record<Size, string> = { sm: "btn-sm", md: "", lg: "btn-lg" };

export function Button({
	variant = "primary",
	size = "md",
	className = "",
	children,
	...rest
}: {
	variant?: Variant;
	size?: Size;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			className={`btn ${variantClass[variant]} ${sizeClass[size]} ${className}`}
			{...rest}
		>
			<span>{children}</span>
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
	size?: Size;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
	return (
		<a
			className={`btn ${variantClass[variant]} ${sizeClass[size]} ${className}`}
			{...rest}
		>
			<span>{children}</span>
		</a>
	);
}


export function Card({
	hover = true,
	className = "",
	children,
}: {
	hover?: boolean;
	className?: string;
	children: ReactNode;
}) {
	return (
		<div className={`card ${hover ? "card-hover" : ""} ${className}`}>
			{children}
		</div>
	);
}


export function Window({
	title,
	className = "",
	children,
}: {
	title: string;
	className?: string;
	children: ReactNode;
}) {
	return (
		<div className={`window ${className}`}>
			<div className="window-bar">
				<div className="window-dots" aria-hidden>
					<i className="bg-[var(--color-magenta)]" />
					<i className="bg-[var(--color-cyan)]" />
					<i className="bg-[var(--color-orange)]" />
				</div>
				<span className="font-mono text-xs uppercase tracking-widest text-[var(--color-cyan)]">
					{title}
				</span>
			</div>
			{children}
		</div>
	);
}

export function Explorer({
	title,
	status,
	className = "",
	children,
}: {
	title: string;
	status?: ReactNode;
	className?: string;
	children: ReactNode;
}) {
	return (
		<div className={`explorer ${className}`}>
			<div className="explorer-bar flex items-center gap-3">
				<div className="window-dots" aria-hidden>
					<i className="bg-[var(--color-chrome)]/60" />
					<i className="bg-[var(--color-chrome)]/40" />
					<i className="bg-[var(--color-chrome)]/30" />
				</div>
				<span className="font-mono text-xs uppercase tracking-widest text-[var(--color-chrome)]/70">
					{title}
				</span>
			</div>
			{children}
			{status ? (
				<div className="explorer-status flex items-center justify-between font-mono uppercase tracking-widest">
					{status}
				</div>
			) : null}
		</div>
	);
}


export function Field({
	className = "",
	...rest
}: InputHTMLAttributes<HTMLInputElement>) {
	return <input className={`field ${className}`} {...rest} />;
}


export function Diamond({ children }: { children: ReactNode }) {
	return (
		<span className="diamond">
			<span>{children}</span>
		</span>
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
			transition={{ ...REVEAL_TRANSITION, delay }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
