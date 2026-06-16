/**
 * Reusable primitives for the Playful Geometric system.
 *
 * Everything that has a recurring "look" lives here exactly once — buttons,
 * sticker cards, enclosed icon badges, form fields, decorative shapes,
 * squiggle dividers, the marquee, and the pop-in reveal. Organisms in App.tsx
 * are composed entirely from these, so the system stays DRY and any visual
 * tweak happens in one place.
 */
import {
	useEffect,
	useRef,
	useState,
	type ButtonHTMLAttributes,
	type CSSProperties,
	type ReactNode,
} from "react";
import { ArrowRight, type LucideIcon } from "lucide-react";

/* Chunky icon defaults applied to every Lucide icon in the system. */
export const ICON = {
	strokeWidth: 2.5,
	strokeLinecap: "round" as const,
	strokeLinejoin: "round" as const,
};

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

export type Pop = "violet" | "pink" | "amber" | "mint" | "dark" | "soft";

const POP_VARS: Record<Pop, CSSProperties> = {
	violet: { ["--pop-color" as string]: "var(--color-accent)" },
	pink: { ["--pop-color" as string]: "var(--color-secondary)" },
	amber: { ["--pop-color" as string]: "var(--color-tertiary)" },
	mint: { ["--pop-color" as string]: "var(--color-quaternary)" },
	dark: { ["--pop-color" as string]: "var(--color-foreground)" },
	soft: { ["--pop-color" as string]: "var(--color-border)" },
};

/* ---------------------------------------------------------------------------
   Button — "The Candy Button" (primary) + outline (secondary) + ghost.
   Pill shape, dark border, hard pop shadow that lifts on hover / presses on
   click. Primary carries an ArrowRight inside a circular white chip.
   --------------------------------------------------------------------------- */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "secondary" | "ghost";
	size?: "md" | "lg";
	icon?: boolean;
	as?: "button" | "a";
	href?: string;
};

export function Button({
	variant = "primary",
	size = "md",
	icon = false,
	as = "button",
	href,
	className,
	children,
	...rest
}: ButtonProps) {
	const base =
		"group/btn inline-flex items-center justify-center gap-2.5 font-heading font-bold rounded-full border-2 border-foreground select-none focus-visible:outline-none";
	const sizes = {
		md: "h-12 pl-6 pr-5 text-[0.95rem]",
		lg: "h-14 pl-8 pr-6 text-step-1",
	};
	const variants = {
		primary: "pop pop-press bg-accent text-accent-foreground",
		secondary:
			"pop pop-press bg-background text-foreground transition-colors hover:bg-tertiary",
		ghost:
			"border-transparent bg-transparent text-foreground hover:bg-muted transition-colors",
	};
	const style = variant === "ghost" ? undefined : POP_VARS.dark;
	const content = (
		<>
			<span>{children}</span>
			{icon && (
				<span className="grid size-7 place-items-center rounded-full bg-background text-foreground transition-transform duration-300 ease-bounce group-hover/btn:translate-x-0.5">
					<ArrowRight size={16} {...ICON} />
				</span>
			)}
		</>
	);
	const cls = cx(base, sizes[size], variants[variant], className);

	if (as === "a") {
		return (
			<a
				href={href}
				className={cls}
				style={style}
				{...(rest as Record<string, unknown>)}
			>
				{content}
			</a>
		);
	}
	return (
		<button className={cls} style={style} {...rest}>
			{content}
		</button>
	);
}

/* ---------------------------------------------------------------------------
   IconBadge — an icon is never naked: always enclosed in a colored shape with
   a dark border. Supports a "floating" mode that sits half-out of a card edge.
   --------------------------------------------------------------------------- */
type Tone = "violet" | "pink" | "amber" | "mint";
const TONE_BG: Record<Tone, string> = {
	violet: "bg-accent",
	pink: "bg-secondary",
	amber: "bg-tertiary",
	mint: "bg-quaternary",
};
/* Amber needs dark glyphs for contrast; the others read well in white. */
const TONE_FG: Record<Tone, string> = {
	violet: "text-white",
	pink: "text-white",
	amber: "text-foreground",
	mint: "text-foreground",
};

export function IconBadge({
	icon: Icon,
	tone = "violet",
	size = 56,
	shape = "circle",
	className,
}: {
	icon: LucideIcon;
	tone?: Tone;
	size?: number;
	shape?: "circle" | "blob" | "squircle";
	className?: string;
}) {
	const radius =
		shape === "circle"
			? "rounded-full"
			: shape === "squircle"
				? "rounded-2xl"
				: "rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-none";
	return (
		<span
			className={cx(
				"grid place-items-center border-2 border-foreground",
				TONE_BG[tone],
				TONE_FG[tone],
				radius,
				className,
			)}
			style={{ width: size, height: size }}
			aria-hidden="true"
		>
			<Icon size={Math.round(size * 0.46)} {...ICON} />
		</span>
	);
}

/* ---------------------------------------------------------------------------
   StickerCard — white, dark-bordered, hard shadow; wiggles (rotate + scale)
   on hover when interactive. Accepts a tone for the shadow color.
   --------------------------------------------------------------------------- */
export function StickerCard({
	children,
	pop = "soft",
	large = false,
	interactive = true,
	className,
	style,
}: {
	children: ReactNode;
	pop?: Pop;
	large?: boolean;
	interactive?: boolean;
	className?: string;
	style?: CSSProperties;
}) {
	return (
		<div
			className={cx(
				"relative rounded-[var(--radius-lg)] border-2 border-foreground bg-card pop",
				large && "pop-lg",
				interactive &&
					"transition-transform duration-300 ease-bounce hover:-rotate-1 hover:scale-[1.02]",
				className,
			)}
			style={{ ...POP_VARS[pop], ...style }}
		>
			{children}
		</div>
	);
}

/* ---------------------------------------------------------------------------
   Form field — bold uppercase label + input/textarea with a focus-only hard
   color shadow and accent border. Color is never the sole signal: invalid
   fields also show a text hint and a triangle marker.
   --------------------------------------------------------------------------- */
const fieldBase =
	"w-full rounded-[var(--radius-md)] border-2 border-[var(--color-input-border)] bg-card px-4 text-foreground placeholder:text-muted-foreground transition-[box-shadow,border-color] duration-200 focus:border-accent focus:outline-none focus:shadow-[4px_4px_0_0_var(--color-accent)]";

export function Field({
	label,
	hint,
	htmlFor,
	children,
}: {
	label: string;
	hint?: string;
	htmlFor: string;
	children: ReactNode;
}) {
	return (
		<label htmlFor={htmlFor} className="block">
			<span className="mb-2 flex items-center gap-2 text-step--1 font-bold uppercase tracking-[0.12em] text-foreground">
				{label}
				{hint && (
					<span className="font-body text-[0.65rem] font-medium normal-case tracking-normal text-muted-foreground">
						{hint}
					</span>
				)}
			</span>
			{children}
		</label>
	);
}

export function Input({
	className,
	...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
	return <input className={cx(fieldBase, "h-12", className)} {...rest} />;
}

export function Textarea({
	className,
	...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
	return (
		<textarea className={cx(fieldBase, "py-3 resize-none", className)} {...rest} />
	);
}

/* ---------------------------------------------------------------------------
   SectionLabel — small pill "eyebrow" with a colored dot, plus a heading and
   optional lede. Used to introduce each organism consistently.
   --------------------------------------------------------------------------- */
export function Eyebrow({
	children,
	tone = "violet",
	className,
}: {
	children: ReactNode;
	tone?: Tone;
	className?: string;
}) {
	return (
		<span
			className={cx(
				"inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-card px-3.5 py-1.5 text-step--1 font-bold uppercase tracking-[0.14em]",
				className,
			)}
		>
			<span
				className={cx("size-2.5 rounded-full border-2 border-foreground", TONE_BG[tone])}
				aria-hidden="true"
			/>
			{children}
		</span>
	);
}

/* ---------------------------------------------------------------------------
   Squiggle — a hand-drawn-feeling SVG underline / divider. Doubles as a
   horizontal divider on desktop; callers swap it for a vertical rule on mobile.
   --------------------------------------------------------------------------- */
export function Squiggle({
	color = "var(--color-accent)",
	width = 220,
	className,
}: {
	color?: string;
	width?: number;
	className?: string;
}) {
	return (
		<svg
			viewBox="0 0 220 20"
			width={width}
			height={(width / 220) * 20}
			fill="none"
			className={className}
			aria-hidden="true"
			preserveAspectRatio="none"
		>
			<path
				d="M2 12C20 2 30 2 48 12s28 10 46 0 28-10 46 0 28 10 46 0 28-10 30-4"
				stroke={color}
				strokeWidth="5"
				strokeLinecap="round"
			/>
		</svg>
	);
}

/* ---------------------------------------------------------------------------
   Marquee — infinite horizontal scroller. Renders its children twice and
   slides -50% so the loop is seamless. Pauses on hover; honors reduced motion
   via the CSS guard. role/aria-hidden left to caller for context.
   --------------------------------------------------------------------------- */
export function Marquee({
	children,
	reverse = false,
	className,
}: {
	children: ReactNode;
	reverse?: boolean;
	className?: string;
}) {
	return (
		<div className={cx("group/marquee flex overflow-hidden", className)}>
			<div
				className={cx(
					"flex shrink-0 items-center group-hover/marquee:[animation-play-state:paused]",
					reverse ? "animate-marquee-reverse" : "animate-marquee",
				)}
			>
				{children}
				{children}
			</div>
		</div>
	);
}

/* ---------------------------------------------------------------------------
   Reveal — pop-in entrance via IntersectionObserver. Children appear with a
   bounce, scale 0.92 -> 1, with an optional stagger delay. Reduced motion
   short-circuits to visible. The deterministic recorder advances timers, so
   reveals fire correctly on scroll during capture.
   --------------------------------------------------------------------------- */
export function Reveal({
	children,
	delay = 0,
	as: Tag = "div",
	className,
	style,
}: {
	children: ReactNode;
	delay?: number;
	as?: "div" | "li" | "span" | "section";
	className?: string;
	style?: CSSProperties;
}) {
	const ref = useRef<HTMLElement | null>(null);
	const [show, setShow] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const reduce = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (reduce) {
			setShow(true);
			return;
		}
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						setShow(true);
						io.disconnect();
					}
				}
			},
			{ threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	const Comp = Tag as "div";
	return (
		<Comp
			ref={ref as React.Ref<HTMLDivElement>}
			data-reveal=""
			data-show={show ? "true" : "false"}
			style={{ ["--d" as string]: `${delay}ms`, ...style }}
			className={className}
		>
			{children}
		</Comp>
	);
}

/* ---------------------------------------------------------------------------
   CheckRow — a feature/inclusion line. The check is never bare: it sits inside
   a mint circle (icon + shape + text label, so meaning never relies on color).
   --------------------------------------------------------------------------- */
export function CheckRow({
	children,
	tone = "mint",
}: {
	children: ReactNode;
	tone?: Tone;
}) {
	return (
		<li className="flex items-start gap-3">
			<span
				className={cx(
					"mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border-2 border-foreground",
					TONE_BG[tone],
					TONE_FG[tone],
				)}
				aria-hidden="true"
			>
				<svg viewBox="0 0 24 24" className="size-3.5" fill="none">
					<path
						d="m5 13 4 4L19 7"
						stroke="currentColor"
						strokeWidth="3.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</span>
			<span className="text-step-0 leading-snug text-foreground">{children}</span>
		</li>
	);
}
