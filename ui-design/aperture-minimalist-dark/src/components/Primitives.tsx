import {
	type ButtonHTMLAttributes,
	type AnchorHTMLAttributes,
	type ReactNode,
	type CSSProperties,
} from "react";
import { cn } from "../lib/cn";
import { useReveal } from "../lib/useReveal";

/* ============================================================================
   Reveal — fade-up wrapper. Composable so any section can opt into the
   reveal-on-scroll motion with an optional stagger delay.
   ========================================================================= */
export function Reveal({
	children,
	className,
	delay = 0,
	as: Tag = "div",
}: {
	children: ReactNode;
	className?: string;
	delay?: number;
	as?: "div" | "li" | "section" | "header" | "span";
}) {
	const { ref, shown } = useReveal<HTMLDivElement>();
	return (
		<Tag
			ref={ref as never}
			className={cn(
				"transition-all duration-700 ease-out-soft will-change-transform",
				shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
				className,
			)}
			style={{ transitionDelay: `${delay}ms` } as CSSProperties}
		>
			{children}
		</Tag>
	);
}

/* ============================================================================
   Badge — pill with the signature pulsing amber dot.
   ========================================================================= */
export function Badge({
	children,
	className,
	withDot = true,
}: {
	children: ReactNode;
	className?: string;
	withDot?: boolean;
}) {
	return (
		<span
			className={cn(
				"inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5",
				"font-mono text-xs tracking-wide text-muted-foreground",
				"shadow-glow-sm backdrop-blur-sm",
				className,
			)}
		>
			{withDot && (
				<span className="relative flex h-1.5 w-1.5">
					<span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-accent" />
					<span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
				</span>
			)}
			{children}
		</span>
	);
}

/* ============================================================================
   Button — primary / secondary / ghost variants from the design system.
   Renders as <a> when href is provided, else <button>.
   ========================================================================= */
type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClass: Record<ButtonVariant, string> = {
	primary: "btn-primary",
	secondary: "btn-secondary",
	ghost: "btn-ghost",
};

type ButtonProps = {
	variant?: ButtonVariant;
	className?: string;
	children: ReactNode;
} & (
	| ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
	| ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
);

export function Button({
	variant = "primary",
	className,
	children,
	...rest
}: ButtonProps) {
	const classes = cn("btn", variantClass[variant], className);
	if ("href" in rest && rest.href !== undefined) {
		const { href, ...anchorRest } =
			rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
				href: string;
			};
		return (
			<a href={href} className={classes} {...anchorRest}>
				{children}
			</a>
		);
	}
	return (
		<button
			className={classes}
			{...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
		>
			{children}
		</button>
	);
}

/* ============================================================================
   GlassCard — semi-transparent, backdrop-blurred surface. Opt into hover
   lift via `interactive`, or amber emphasis via `highlight`.
   ========================================================================= */
export function GlassCard({
	children,
	className,
	interactive = false,
	highlight = false,
	style,
}: {
	children: ReactNode;
	className?: string;
	interactive?: boolean;
	highlight?: boolean;
	style?: CSSProperties;
}) {
	return (
		<div
			style={style}
			className={cn(
				"glass-card",
				interactive && "glass-card-interactive cursor-default",
				highlight && "glass-card-highlight",
				className,
			)}
		>
			{children}
		</div>
	);
}

/* ============================================================================
   SectionHeading — eyebrow + display headline + optional lede, centered.
   Keeps every section's header rhythm identical.
   ========================================================================= */
export function SectionHeading({
	eyebrow,
	title,
	lede,
	align = "center",
	className,
}: {
	eyebrow: string;
	title: ReactNode;
	lede?: ReactNode;
	align?: "center" | "left";
	className?: string;
}) {
	return (
		<div
			className={cn(
				"flex flex-col gap-5",
				align === "center"
					? "items-center text-center"
					: "items-start text-left",
				className,
			)}
		>
			<Reveal>
				<span className="eyebrow inline-flex items-center gap-2">
					<span className="h-px w-6 bg-accent/60" />
					{eyebrow}
				</span>
			</Reveal>
			<Reveal delay={80}>
				<h2
					className={cn(
						"max-w-2xl font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl",
						align === "center" && "mx-auto",
					)}
				>
					{title}
				</h2>
			</Reveal>
			{lede && (
				<Reveal delay={160}>
					<p
						className={cn(
							"max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg",
							align === "center" && "mx-auto",
						)}
					>
						{lede}
					</p>
				</Reveal>
			)}
		</div>
	);
}
