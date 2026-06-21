import type {
	ReactNode,
	ButtonHTMLAttributes,
	AnchorHTMLAttributes,
	CSSProperties,
	InputHTMLAttributes,
} from "react";
import { forwardRef } from "react";
import { useReveal } from "../lib/useReveal";

/* ============================================================================
   CLAYMORPHISM PRIMITIVES
   ----------------------------------------------------------------------------
   The composable building blocks every section shares. The clay "physics"
   (convex bulge, concave press, super-rounded radii, the squish, the float)
   live here exactly once. Sections compose these — they never re-declare a
   shadow stack or a radius by hand.
   ========================================================================== */

/* The Nunito display face, applied via inline style as the system mandates for
   all headings / numbers / labels. Centralized so it's literally one object. */
export const display: CSSProperties = { fontFamily: "Nunito, sans-serif" };

const cx = (...parts: (string | false | undefined)[]) =>
	parts.filter(Boolean).join(" ");

/* ---------------------------------------------------------------------------
   1. THE UNIVERSAL CARD
   Glass-clay surface, super-rounded, floats up on hover with a deeper shadow.
   `as="article"` keeps semantics meaningful where it matters (feature grid).
   ------------------------------------------------------------------------- */
export function Card({
	children,
	className = "",
	hover = true,
	as: Tag = "div",
	style,
	...rest
}: {
	children: ReactNode;
	className?: string;
	hover?: boolean;
	as?: "div" | "article" | "li";
	style?: CSSProperties;
} & React.HTMLAttributes<HTMLElement>) {
	return (
		<Tag
			style={style}
			className={cx(
				"group/card relative overflow-hidden rounded-[28px] bg-clay-cardBg p-6 text-clay-foreground shadow-clay-card backdrop-blur-xl transition-all duration-500 sm:rounded-[32px] sm:p-8",
				hover && "hover:-translate-y-2 hover:shadow-clay-card-hover",
				className,
			)}
			{...rest}
		>
			{/* Inner content wrapper so absolute-positioned decorations can peek
			    behind the content without affecting layout. */}
			<div className="relative z-10 flex h-full flex-col">{children}</div>
		</Tag>
	);
}

/* ---------------------------------------------------------------------------
   2. THE CLAY BUTTON
   Bulges out (convex), lifts on hover, and squishes hard on click
   (scale-[0.92] + the pressed/recessed shadow). One element, every variant.
   ------------------------------------------------------------------------- */
type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const sizeClass: Record<Size, string> = {
	sm: "h-11 px-5 text-sm",
	md: "h-14 px-7 text-base",
	lg: "h-16 px-9 text-lg",
};

const variantClass: Record<Variant, string> = {
	primary:
		"bg-gradient-to-br from-clay-accent-light to-clay-accent text-white shadow-clay-button hover:-translate-y-1 hover:shadow-clay-button-hover active:scale-[0.92] active:shadow-clay-pressed active:from-clay-accent active:to-clay-accent",
	secondary:
		"bg-white text-clay-foreground shadow-clay-button-soft hover:-translate-y-1 active:scale-[0.92] active:shadow-clay-pressed",
	outline:
		"border-2 border-clay-accent/25 bg-transparent text-clay-accent hover:-translate-y-1 hover:border-clay-accent hover:bg-clay-accent/5 active:scale-[0.94]",
	ghost:
		"bg-transparent text-clay-foreground hover:bg-clay-accent/10 hover:text-clay-accent active:scale-[0.94]",
};

const buttonBase =
	"inline-flex select-none items-center justify-center gap-2 rounded-[20px] font-bold tracking-wide transition-all duration-200 outline-none focus-visible:ring-4 focus-visible:ring-clay-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-clay-canvas disabled:pointer-events-none disabled:opacity-60";

export const Button = forwardRef<
	HTMLButtonElement,
	{
		variant?: Variant;
		size?: Size;
	} & ButtonHTMLAttributes<HTMLButtonElement>
>(function Button(
	{ variant = "primary", size = "md", className = "", children, ...rest },
	ref,
) {
	return (
		<button
			ref={ref}
			style={display}
			className={cx(
				buttonBase,
				sizeClass[size],
				variantClass[variant],
				className,
			)}
			{...rest}
		>
			{children}
		</button>
	);
});

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
			style={display}
			className={cx(
				buttonBase,
				sizeClass[size],
				variantClass[variant],
				className,
			)}
			{...rest}
		>
			{children}
		</a>
	);
}

/* ---------------------------------------------------------------------------
   3. THE RECESSED INPUT
   Pressed INTO the surface at rest; pops to a raised white surface on focus.
   ------------------------------------------------------------------------- */
export const Input = forwardRef<
	HTMLInputElement,
	InputHTMLAttributes<HTMLInputElement>
>(function Input({ className = "", ...rest }, ref) {
	return (
		<input
			ref={ref}
			className={cx(
				"h-16 w-full rounded-2xl border-0 bg-clay-recess px-6 py-4 text-lg text-clay-foreground shadow-clay-pressed outline-none transition-all duration-200",
				"placeholder:text-clay-muted",
				"focus:bg-white focus:shadow-none focus:ring-4 focus:ring-clay-accent/25",
				className,
			)}
			{...rest}
		/>
	);
});

/* ---------------------------------------------------------------------------
   ICON ORB — the gradient pill behind every feature/benefit icon. The drop
   shadow is tinted to the orb's own hue via the --orb custom property so the
   colored light reads correctly. Square (rounded-2xl) or circular.
   ------------------------------------------------------------------------- */
export type OrbHue = "violet" | "pink" | "sky" | "emerald" | "amber" | "indigo";

const orbGradient: Record<OrbHue, string> = {
	violet: "linear-gradient(135deg, #c4b5fd, #7c3aed)",
	pink: "linear-gradient(135deg, #f9a8d4, #db2777)",
	sky: "linear-gradient(135deg, #7dd3fc, #0284c7)",
	emerald: "linear-gradient(135deg, #6ee7b7, #059669)",
	amber: "linear-gradient(135deg, #fcd34d, #d97706)",
	indigo: "linear-gradient(135deg, #a5b4fc, #4f46e5)",
};
const orbShadowTint: Record<OrbHue, string> = {
	violet: "rgba(124, 58, 237, 0.4)",
	pink: "rgba(219, 39, 119, 0.4)",
	sky: "rgba(2, 132, 199, 0.4)",
	emerald: "rgba(5, 150, 105, 0.4)",
	amber: "rgba(217, 119, 6, 0.4)",
	indigo: "rgba(79, 70, 229, 0.4)",
};

export function IconOrb({
	children,
	hue = "violet",
	round = false,
	size = "md",
	className = "",
}: {
	children: ReactNode;
	hue?: OrbHue;
	round?: boolean;
	size?: "sm" | "md" | "lg";
	className?: string;
}) {
	const dims =
		size === "lg" ? "h-20 w-20" : size === "sm" ? "h-12 w-12" : "h-16 w-16";
	return (
		<span
			aria-hidden
			style={
				{
					backgroundImage: orbGradient[hue],
					"--orb": orbShadowTint[hue],
				} as CSSProperties
			}
			className={cx(
				"inline-flex shrink-0 items-center justify-center text-white shadow-clay-orb transition-transform duration-300",
				round ? "rounded-full" : "rounded-2xl",
				dims,
				className,
			)}
		>
			{children}
		</span>
	);
}

/* ---------------------------------------------------------------------------
   BADGE / PILL — small rounded-full chip. Tone tints text + tinted fill.
   ------------------------------------------------------------------------- */
type BadgeTone = "violet" | "pink" | "sky" | "emerald" | "amber" | "neutral";
const badgeTone: Record<BadgeTone, string> = {
	violet: "bg-clay-accent/12 text-clay-accent",
	pink: "bg-clay-accent-alt/12 text-clay-accent-alt",
	sky: "bg-clay-sky/15 text-[#0369a1]",
	emerald: "bg-clay-emerald/15 text-[#047857]",
	amber: "bg-clay-amber/18 text-[#b45309]",
	neutral: "bg-clay-foreground/8 text-clay-foreground",
};

export function Badge({
	children,
	tone = "violet",
	className = "",
}: {
	children: ReactNode;
	tone?: BadgeTone;
	className?: string;
}) {
	return (
		<span
			style={display}
			className={cx(
				"inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-bold tracking-wide",
				badgeTone[tone],
				className,
			)}
		>
			{children}
		</span>
	);
}

/* Uppercase tracked eyebrow label. */
export function Eyebrow({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<span
			style={display}
			className={cx(
				"inline-block text-xs font-extrabold uppercase tracking-[0.2em] text-clay-accent",
				className,
			)}
		>
			{children}
		</span>
	);
}

/* Constrained content shell. */
export function Shell({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div className={cx("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>
			{children}
		</div>
	);
}

/* A standard section title block (eyebrow + heading + lead) used across the
   page so every section header has identical rhythm. */
export function SectionHeading({
	eyebrow,
	title,
	lead,
	align = "center",
	className = "",
}: {
	eyebrow: string;
	title: ReactNode;
	lead?: ReactNode;
	align?: "center" | "left";
	className?: string;
}) {
	const reveal = useReveal();
	return (
		<div
			ref={reveal.ref}
			data-shown={reveal.shown}
			className={cx(
				"clay-reveal flex flex-col gap-4",
				align === "center"
					? "items-center text-center"
					: "items-start text-left",
				className,
			)}
		>
			<Eyebrow>{eyebrow}</Eyebrow>
			<h2
				style={display}
				className="max-w-3xl text-3xl font-extrabold tracking-tight text-clay-foreground sm:text-4xl md:text-5xl"
			>
				{title}
			</h2>
			{lead && (
				<p
					className={cx(
						"max-w-2xl text-base leading-relaxed text-clay-muted sm:text-lg",
						align === "center" && "mx-auto",
					)}
				>
					{lead}
				</p>
			)}
		</div>
	);
}

/* A reveal wrapper for arbitrary blocks — keeps the one-shot entrance
   consistent without each call wiring its own observer. `pop` swaps the rise
   for a springy pop (used for orbs / badges). */
export function Reveal({
	children,
	className = "",
	delay = 0,
	pop = false,
}: {
	children: ReactNode;
	className?: string;
	delay?: number;
	pop?: boolean;
}) {
	const reveal = useReveal();
	return (
		<div
			ref={reveal.ref}
			data-shown={reveal.shown}
			style={{ animationDelay: `${delay}ms` }}
			className={cx(pop ? "clay-pop" : "clay-reveal", className)}
		>
			{children}
		</div>
	);
}

/* ---------------------------------------------------------------------------
   FLOATING BLOBS — the ambient colored lighting that shows through the glass
   cards. Fixed, behind everything, drifting on two axes. Rendered once at the
   app root so every section sits in the same lit "world".
   ------------------------------------------------------------------------- */
export function Blobs() {
	return (
		<div
			aria-hidden
			className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
		>
			<div className="absolute -left-[12%] -top-[10%] h-[58vh] w-[58vh] animate-clay-blob rounded-full bg-clay-accent/15 blur-3xl" />
			<div className="animation-delay-2000 absolute -right-[10%] top-[14%] h-[60vh] w-[60vh] animate-clay-blob-alt rounded-full bg-clay-accent-alt/12 blur-3xl" />
			<div className="animation-delay-4000 absolute -bottom-[14%] left-[8%] h-[62vh] w-[62vh] animate-clay-blob rounded-full bg-clay-sky/12 blur-3xl" />
			<div className="absolute bottom-[6%] right-[6%] hidden h-[46vh] w-[46vh] animate-clay-blob-alt rounded-full bg-clay-emerald/10 blur-3xl lg:block" />
		</div>
	);
}

/* A decorative free-floating clay shape (used to orbit the hero headline). */
export function ClayShape({
	className = "",
	style,
	hue = "violet",
	round = true,
}: {
	className?: string;
	style?: CSSProperties;
	hue?: OrbHue;
	round?: boolean;
}) {
	return (
		<span
			aria-hidden
			style={
				{
					backgroundImage: orbGradient[hue],
					"--orb": orbShadowTint[hue],
					...style,
				} as CSSProperties
			}
			className={cx(
				"absolute shadow-clay-orb",
				round ? "rounded-full" : "rounded-[28px]",
				className,
			)}
		/>
	);
}
