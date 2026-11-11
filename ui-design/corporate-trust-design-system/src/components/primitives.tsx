
import {
	forwardRef,
	type ElementType,
	type ReactNode,
	type HTMLAttributes,
} from "react";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { fadeUp, stagger, inView } from "../lib/motion";

const cx = (...c: (string | false | null | undefined)[]) =>
	c.filter(Boolean).join(" ");


type SectionProps = {
	id?: string;
	children: ReactNode;
	className?: string;

	dark?: boolean;
	as?: ElementType;
};
export function Section({
	id,
	children,
	className,
	dark,
	as: Tag = "section",
}: SectionProps) {
	return (
		<Tag
			id={id}
			className={cx(
				"relative py-16 sm:py-20 lg:py-24",
				dark && "on-dark",
				className,
			)}
		>
			{children}
		</Tag>
	);
}


export function Shell({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return <div className={cx("shell", className)}>{children}</div>;
}


export function Eyebrow({
	icon: Icon,
	children,
	className,
	tone = "light",
}: {
	icon?: LucideIcon;
	children: ReactNode;
	className?: string;
	tone?: "light" | "dark";
}) {
	return (
		<span
			className={cx(
				"eyebrow",
				tone === "dark" && "!text-indigo-300",
				className,
			)}
		>
			{Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
			{children}
		</span>
	);
}


export function Pill({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<span
			className={cx(
				"inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-4 py-1.5 text-sm font-medium text-slate-600 shadow-soft backdrop-blur",
				className,
			)}
		>
			{children}
		</span>
	);
}


type BlobProps = {
	className?: string;

	tone?: "indigo" | "violet" | "mixed";
	animate?: boolean;
	slow?: boolean;
};
export function Blob({
	className,
	tone = "mixed",
	animate = true,
	slow = false,
}: BlobProps) {
	const gradient =
		tone === "indigo"
			? "from-indigo-400/50 to-indigo-200/30"
			: tone === "violet"
				? "from-violet-400/50 to-fuchsia-300/20"
				: "from-indigo-400/40 to-violet-400/40";
	return (
		<div
			aria-hidden="true"
			className={cx(
				"pointer-events-none absolute rounded-full bg-gradient-to-br blur-3xl filter",
				gradient,
				animate && (slow ? "animate-blob-slow" : "animate-blob"),
				className,
			)}
		/>
	);
}


type CardProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode;
	className?: string;

	hover?: boolean;
	as?: ElementType;
};
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
	{ children, className, hover = true, as: Tag = "div", ...rest },
	ref,
) {
	return (
		<Tag
			ref={ref}
			className={cx("card", hover && "card-hover", className)}
			{...rest}
		>
			{children}
		</Tag>
	);
});


export function IconTile({
	icon: Icon,
	className,
	size = "md",
}: {
	icon: LucideIcon;
	className?: string;
	size?: "md" | "lg";
}) {
	const dims = size === "lg" ? "h-14 w-14" : "h-12 w-12";
	return (
		<span
			className={cx(
				"inline-flex shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600",
				dims,
				className,
			)}
		>
			<Icon
				className={size === "lg" ? "h-7 w-7" : "h-6 w-6"}
				aria-hidden="true"
			/>
		</span>
	);
}


export function Reveal({
	children,
	className,
	delay = 0,
	as = "div",
}: {
	children: ReactNode;
	className?: string;
	delay?: number;
	as?: "div" | "li" | "article" | "header";
}) {
	const MotionTag = motion[as];
	return (
		<MotionTag
			className={className}
			variants={fadeUp}
			initial="hidden"
			whileInView="show"
			viewport={inView}
			transition={{ delay }}
		>
			{children}
		</MotionTag>
	);
}


export function RevealGroup({
	children,
	className,
	stag = 0.09,
	delay = 0,
	as = "div",
}: {
	children: ReactNode;
	className?: string;
	stag?: number;
	delay?: number;
	as?: "div" | "ul";
}) {
	const MotionTag = motion[as];
	return (
		<MotionTag
			className={className}
			variants={stagger(stag, delay)}
			initial="hidden"
			whileInView="show"
			viewport={inView}
		>
			{children}
		</MotionTag>
	);
}

export { cx };
