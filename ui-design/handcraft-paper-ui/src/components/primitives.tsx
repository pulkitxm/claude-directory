/* ============================================================================
   Hand-Drawn primitives — the reusable atoms of the system.

   Everything visual in the page is composed from these so there is a single
   place that owns each recipe (wobbly button, taped card, sticky tag, the SVG
   scribbles). Components stay declarative; no duplicated magic strings.
   ========================================================================= */
import type {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	CSSProperties,
	InputHTMLAttributes,
	ReactNode,
	TextareaHTMLAttributes,
} from "react";
import type { LucideIcon } from "lucide-react";
import { radius } from "../lib/tokens";

const cx = (...c: (string | false | undefined | null)[]) =>
	c.filter(Boolean).join(" ");

/* ---- Button -------------------------------------------------------------- */
/* Irregular wobbly oval. White → red on hover (primary) or muted → blue
   (secondary). Hard offset shadow that reduces on hover and disappears on
   active so the button "presses flat". */
type ButtonVariant = "primary" | "secondary";
type ButtonProps = {
	variant?: ButtonVariant;
	asChild?: false;
	className?: string;
	children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const buttonBase =
	"group relative inline-flex h-12 items-center justify-center gap-2 px-6 text-lg md:text-xl font-[var(--font-hand)] border-[3px] border-ink cursor-pointer select-none transition-all duration-100 " +
	"shadow-[var(--shadow-hard)] hover:shadow-[var(--shadow-hard-sm)] hover:translate-x-[2px] hover:translate-y-[2px] " +
	"active:!shadow-none active:translate-x-[4px] active:translate-y-[4px] " +
	"focus-visible:outline-3 focus-visible:outline-dashed focus-visible:outline-offset-2";

const buttonVariant: Record<ButtonVariant, string> = {
	primary:
		"bg-card text-ink hover:bg-accent hover:text-white focus-visible:outline-accent",
	secondary:
		"bg-muted text-ink hover:bg-pen hover:text-white focus-visible:outline-pen",
};

export function Button({
	variant = "primary",
	className,
	children,
	style,
	...rest
}: ButtonProps) {
	return (
		<button
			className={cx(buttonBase, buttonVariant[variant], className)}
			style={{ borderRadius: radius.wobblyPill, ...style }}
			{...rest}
		>
			{children}
		</button>
	);
}

/* Anchor styled identically to Button, for in-page nav CTAs. */
type LinkButtonProps = {
	variant?: ButtonVariant;
	className?: string;
	children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export function LinkButton({
	variant = "primary",
	className,
	children,
	style,
	...rest
}: LinkButtonProps) {
	return (
		<a
			className={cx(buttonBase, buttonVariant[variant], className)}
			style={{ borderRadius: radius.wobblyPill, ...style }}
			{...rest}
		>
			{children}
		</a>
	);
}

/* ---- Card ---------------------------------------------------------------- */
/* White stock, wobbly black border, soft cut-paper shadow. Optional tape or
   thumbtack decoration, optional post-it yellow stock, optional hover jiggle. */
type Decoration = "none" | "tape" | "tack";
type CardProps = {
	decoration?: Decoration;
	postit?: boolean;
	tilt?: string;
	hoverJiggle?: boolean;
	radiusValue?: string;
	className?: string;
	style?: CSSProperties;
	children: ReactNode;
};

export function Card({
	decoration = "none",
	postit = false,
	tilt,
	hoverJiggle = true,
	radiusValue = radius.wobblyMd,
	className,
	style,
	children,
}: CardProps) {
	return (
		<div
			className={cx(
				"relative border-2 border-ink shadow-[var(--shadow-card)] transition-transform duration-100",
				postit ? "bg-postit" : "bg-card",
				tilt,
				hoverJiggle && "hover:-rotate-1 hover:-translate-y-1",
				className,
			)}
			style={{ borderRadius: radiusValue, ...style }}
		>
			{decoration === "tape" && <Tape />}
			{decoration === "tack" && <Tack />}
			{children}
		</div>
	);
}

/* ---- Sticky-note tag (section eyebrow / label) --------------------------- */
export function StickyTag({
	children,
	color = "postit",
	tilt = "-rotate-2",
	className,
}: {
	children: ReactNode;
	color?: "postit" | "accent" | "pen" | "muted";
	tilt?: string;
	className?: string;
}) {
	const tone: Record<string, string> = {
		postit: "bg-postit text-ink",
		accent: "bg-accent text-white",
		pen: "bg-pen text-white",
		muted: "bg-muted text-ink",
	};
	return (
		<span
			className={cx(
				"inline-block border-2 border-ink px-4 py-1.5 text-base md:text-lg shadow-[var(--shadow-hard-sm)]",
				tone[color],
				tilt,
				className,
			)}
			style={{ borderRadius: radius.wobblyMd }}
		>
			{children}
		</span>
	);
}

/* ---- Icon enclosed in a rough hand-drawn circle -------------------------- */
export function IconCircle({
	icon: Icon,
	tone = "ink",
	size = 28,
	className,
}: {
	icon: LucideIcon;
	tone?: "ink" | "accent" | "pen";
	size?: number;
	className?: string;
}) {
	const tones: Record<string, string> = {
		ink: "bg-card text-ink",
		accent: "bg-accent text-white",
		pen: "bg-pen text-white",
	};
	return (
		<span
			className={cx(
				"inline-grid h-14 w-14 place-items-center border-[3px] border-ink shadow-[var(--shadow-hard-sm)]",
				tones[tone],
				className,
			)}
			style={{ borderRadius: radius.blob }}
		>
			<Icon size={size} strokeWidth={2.75} />
		</span>
	);
}

/* ---- Inputs -------------------------------------------------------------- */
export function Input({
	className,
	style,
	...rest
}: InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			className={cx(
				"h-12 w-full border-2 border-ink bg-card px-4 text-lg text-ink placeholder:text-ink/40 outline-none transition-all duration-100",
				"focus:border-pen focus:ring-2 focus:ring-pen/20",
				className,
			)}
			style={{ borderRadius: radius.wobblyMd, ...style }}
			{...rest}
		/>
	);
}

export function Textarea({
	className,
	style,
	...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
	return (
		<textarea
			className={cx(
				"w-full border-2 border-ink bg-card px-4 py-3 text-lg text-ink placeholder:text-ink/40 outline-none transition-all duration-100 resize-none",
				"focus:border-pen focus:ring-2 focus:ring-pen/20",
				className,
			)}
			style={{ borderRadius: radius.wobblyMd, ...style }}
			{...rest}
		/>
	);
}

/* ============================================================================
   Hand-drawn SVG decorations & paper effects
   ========================================================================= */

/* Strip of translucent "tape" across the top center of a card. */
export function Tape({ className }: { className?: string }) {
	return (
		<span
			aria-hidden
			className={cx(
				"pointer-events-none absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 -rotate-3 border border-white/40 bg-ink/15 backdrop-blur-[1px]",
				className,
			)}
			style={{ borderRadius: "4px" }}
		/>
	);
}

/* Red circular thumbtack pinned at the top center of a card. */
export function Tack({
	color = "var(--color-accent)",
	className,
}: {
	color?: string;
	className?: string;
}) {
	return (
		<span
			aria-hidden
			className={cx(
				"pointer-events-none absolute -top-3 left-1/2 z-10 h-6 w-6 -translate-x-1/2 rounded-full border-2 border-ink shadow-[var(--shadow-hard-sm)]",
				className,
			)}
			style={{ background: color }}
		>
			<span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70" />
		</span>
	);
}

/* Dashed hand-drawn arrow that curves toward a CTA. */
export function ScribbleArrow({ className }: { className?: string }) {
	return (
		<svg
			aria-hidden
			viewBox="0 0 120 90"
			className={className}
			fill="none"
			stroke="var(--color-ink)"
			strokeWidth="3"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M10 12 C 38 6, 74 14, 96 52" strokeDasharray="2 9" />
			<path d="M86 40 L98 56 L80 60" />
		</svg>
	);
}

/* Squiggly hand-drawn connector used between How-It-Works steps. */
export function SquigglyLine({ className }: { className?: string }) {
	return (
		<svg
			aria-hidden
			viewBox="0 0 220 40"
			preserveAspectRatio="none"
			className={className}
			fill="none"
			stroke="var(--color-ink)"
			strokeWidth="3"
			strokeLinecap="round"
		>
			<path
				className="anim-dash"
				d="M4 20 Q 30 2 56 20 T 108 20 T 160 20 T 212 20"
			/>
			<path d="M198 12 L214 20 L198 28" />
		</svg>
	);
}

/* Corner frame marks for the hero canvas placeholder. */
export function CornerFrames() {
	const corner = (cls: string, d: string) => (
		<svg
			aria-hidden
			viewBox="0 0 40 40"
			className={cx("absolute h-9 w-9", cls)}
			fill="none"
			stroke="var(--color-ink)"
			strokeWidth="3.5"
			strokeLinecap="round"
		>
			<path d={d} />
		</svg>
	);
	return (
		<>
			{corner("-left-4 -top-4", "M36 6 Q6 6 6 36")}
			{corner("-right-4 -top-4 -scale-x-100", "M36 6 Q6 6 6 36")}
			{corner("-bottom-4 -left-4 -scale-y-100", "M36 6 Q6 6 6 36")}
			{corner("-bottom-4 -right-4 -scale-100", "M36 6 Q6 6 6 36")}
		</>
	);
}

/* A torn, hand-drawn wavy horizontal divider. */
export function WavyDivider({ className }: { className?: string }) {
	return (
		<svg
			aria-hidden
			viewBox="0 0 1200 24"
			preserveAspectRatio="none"
			className={cx("h-6 w-full", className)}
			fill="none"
			stroke="var(--color-ink)"
			strokeWidth="2.5"
			strokeLinecap="round"
		>
			<path
				strokeDasharray="1 12"
				d="M0 12 Q 40 2 80 12 T 160 12 T 240 12 T 320 12 T 400 12 T 480 12 T 560 12 T 640 12 T 720 12 T 800 12 T 880 12 T 960 12 T 1040 12 T 1120 12 T 1200 12"
			/>
		</svg>
	);
}

/* Overlapping avatar cluster (hand-drawn doodle faces) for social proof. */
const AVATAR_TONES = ["#ffd4d4", "#cfe0f5", "#fff3b0", "#d6f0d6", "#e9d6f5"];
export function AvatarStack({ count = 5 }: { count?: number }) {
	return (
		<div className="flex -space-x-4">
			{Array.from({ length: count }).map((_, i) => (
				<span
					key={i}
					className="grid h-11 w-11 place-items-center rounded-full border-2 border-ink"
					style={{
						background: AVATAR_TONES[i % AVATAR_TONES.length],
						zIndex: count - i,
					}}
				>
					<svg
						viewBox="0 0 24 24"
						className="h-7 w-7"
						fill="none"
						stroke="var(--color-ink)"
						strokeWidth="1.8"
						strokeLinecap="round"
					>
						<circle cx="12" cy="9" r="4" />
						<path d="M5 21 Q12 14 19 21" />
					</svg>
				</span>
			))}
		</div>
	);
}

export { cx };
