import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Reveal — a quiet scroll-in for blocks of content                          */
/* -------------------------------------------------------------------------- */
const revealVariants: Variants = {
	hidden: { opacity: 0, y: 18 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
	},
};

export function Reveal({
	children,
	delay = 0,
	className,
	...rest
}: { children: ReactNode; delay?: number } & HTMLMotionProps<"div">) {
	return (
		<motion.div
			variants={revealVariants}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, margin: "-80px" }}
			transition={{ delay }}
			className={className}
			{...rest}
		>
			{children}
		</motion.div>
	);
}

/* stagger container for grids / lists */
export const staggerParent: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const staggerChild: Variants = {
	hidden: { opacity: 0, y: 20 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
	},
};

/* -------------------------------------------------------------------------- */
/*  Section — consistent rhythm + a max width                                 */
/* -------------------------------------------------------------------------- */
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
		<section id={id} className={cn("relative px-6 sm:px-8", className)}>
			<div className="mx-auto w-full max-w-6xl">{children}</div>
		</section>
	);
}

/* -------------------------------------------------------------------------- */
/*  Eyebrow — mono label + a growing rule. Encodes section order as a marker  */
/*  only where the page is genuinely sequential.                              */
/* -------------------------------------------------------------------------- */
export function Eyebrow({
	children,
	marker,
	align = "left",
}: {
	children: ReactNode;
	marker?: string;
	align?: "left" | "center";
}) {
	return (
		<div
			className={cn(
				"flex items-center gap-3",
				align === "center" && "justify-center",
			)}
		>
			{marker && (
				<span className="font-mono text-[0.6875rem] font-medium tracking-data text-tide">
					{marker}
				</span>
			)}
			<span className="label">{children}</span>
			<span className="rule h-px w-10 animate-rule-grow" />
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*  Button — three intents, all tuned to the tide palette                     */
/* -------------------------------------------------------------------------- */
type ButtonProps = {
	children: ReactNode;
	variant?: "primary" | "ghost" | "link";
	href?: string;
	icon?: boolean;
	className?: string;
	onClick?: () => void;
	type?: "button" | "submit";
};

export function Button({
	children,
	variant = "primary",
	href,
	icon = false,
	className,
	onClick,
	type = "button",
}: ButtonProps) {
	const base =
		"group inline-flex items-center justify-center gap-2 rounded-pill text-sm font-medium transition-all duration-300 ease-tide focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glow";

	const variants: Record<string, string> = {
		primary:
			"bg-tide px-6 py-3 text-abyss shadow-glow hover:bg-glow hover:-translate-y-0.5 active:translate-y-0",
		ghost:
			"border border-line-bright bg-shelf/30 px-6 py-3 text-foam hover:border-tide/60 hover:bg-shelf/50 hover:-translate-y-0.5",
		link: "px-0 py-1 text-foam hover:text-glow",
	};

	const content = (
		<>
			<span>{children}</span>
			{icon && (
				<ArrowUpRight
					className="h-4 w-4 transition-transform duration-300 ease-tide group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
					strokeWidth={2}
				/>
			)}
		</>
	);

	if (href) {
		return (
			<a href={href} className={cn(base, variants[variant], className)}>
				{content}
			</a>
		);
	}

	return (
		<button
			type={type}
			onClick={onClick}
			className={cn(base, variants[variant], className)}
		>
			{content}
		</button>
	);
}
