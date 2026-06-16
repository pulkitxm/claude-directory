/* ============================================================================
   VERDANT — design-system primitives.

   Reusable atoms that encode the Botanical / Organic Serif rules ONCE. Pages
   compose these instead of re-deriving pill shapes, sage focus rings, arch
   masks, halos, eased reveals, etc. This is where "centralize tokens, minimize
   one-off styles" actually lives.
   ========================================================================== */

import {
	useEffect,
	useRef,
	useState,
	type ButtonHTMLAttributes,
	type AnchorHTMLAttributes,
	type ReactNode,
} from "react";
import type { LucideIcon } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Reveal-on-scroll: gently fade + float content into place. Honors RM via CSS */
/* -------------------------------------------------------------------------- */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
	const ref = useRef<T>(null);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						e.target.classList.add("is-visible");
						io.unobserve(e.target);
					}
				}
			},
			// Reveal as soon as any sliver enters the viewport. A 0% bottom inset
			// (rather than a negative one) guarantees even the last full-height
			// block before the footer reveals when scrolled to the page bottom.
			{ threshold: 0.01, rootMargin: "0px 0px 0px 0px" },
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);
	return ref;
}

/** A block that fades/floats up when scrolled into view, with optional stagger. */
export function Reveal({
	children,
	delay = 0,
	className = "",
	as: As = "div",
}: {
	children: ReactNode;
	delay?: number;
	className?: string;
	as?: "div" | "li" | "article" | "section" | "header";
}) {
	const ref = useReveal<HTMLElement>();
	return (
		<As
			ref={ref as never}
			className={`reveal ${className}`}
			style={delay ? { transitionDelay: `${delay}ms` } : undefined}
		>
			{children}
		</As>
	);
}

/* -------------------------------------------------------------------------- */
/* Count-up: stat numbers tick up the first time they enter the viewport.      */
/* -------------------------------------------------------------------------- */
export function useCountUp(target: number, duration = 1600) {
	const [value, setValue] = useState(0);
	const ref = useRef<HTMLSpanElement>(null);
	const done = useRef(false);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const reduce = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (reduce) {
			setValue(target);
			return;
		}
		const io = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && !done.current) {
				done.current = true;
				const start = performance.now();
				const tick = (now: number) => {
					const t = Math.min(1, (now - start) / duration);
					// easeOutCubic — settles gently, never snaps
					const eased = 1 - Math.pow(1 - t, 3);
					setValue(Math.round(target * eased));
					if (t < 1) requestAnimationFrame(tick);
				};
				requestAnimationFrame(tick);
			}
		});
		io.observe(el);
		return () => io.disconnect();
	}, [target, duration]);
	return { value, ref };
}

/* -------------------------------------------------------------------------- */
/* Eyebrow — uppercase, wide-tracked label, optionally with a leaf bullet.     */
/* -------------------------------------------------------------------------- */
export function Eyebrow({
	children,
	className = "",
	centered = false,
}: {
	children: ReactNode;
	className?: string;
	centered?: boolean;
}) {
	return (
		<span
			className={`inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.28em] text-sage ${
				centered ? "justify-center" : ""
			} ${className}`}
		>
			<span
				aria-hidden
				className="h-px w-7 bg-sage/60"
				style={{ display: "inline-block" }}
			/>
			{children}
		</span>
	);
}

/* -------------------------------------------------------------------------- */
/* Button — pill, uppercase, wide tracking. Primary forest, secondary sage.    */
/* -------------------------------------------------------------------------- */
type Variant = "primary" | "secondary" | "ghost";
const BUTTON_BASE =
	"inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300 ease-organic focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-sage disabled:opacity-60";
const BUTTON_VARIANTS: Record<Variant, string> = {
	// Forest -> terracotta on hover, with a gentle lift.
	primary:
		"bg-forest text-paper shadow-soft hover:bg-terracotta hover:-translate-y-0.5 hover:shadow-bloom active:translate-y-0",
	// Transparent with a 1px sage border; fills softly on hover.
	secondary:
		"border border-sage/70 text-sage hover:bg-sage hover:text-paper hover:-translate-y-0.5",
	ghost: "text-forest hover:text-terracotta",
};

export function Button({
	variant = "primary",
	className = "",
	children,
	...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: Variant;
}) {
	return (
		<button
			className={`${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${className}`}
			{...rest}
		>
			{children}
		</button>
	);
}

/** Same styling as Button, rendered as an anchor (for in-page nav CTAs). */
export function ButtonLink({
	variant = "primary",
	className = "",
	children,
	...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
	variant?: Variant;
}) {
	return (
		<a
			className={`${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${className}`}
			{...rest}
		>
			{children}
		</a>
	);
}

/* -------------------------------------------------------------------------- */
/* IconHalo — a thin-stroke Lucide icon floating in a soft, pale circle.       */
/* -------------------------------------------------------------------------- */
export function IconHalo({
	icon: Icon,
	tone = "sage",
	size = 56,
}: {
	icon: LucideIcon;
	tone?: "sage" | "clay" | "terracotta";
	size?: number;
}) {
	const bg =
		tone === "clay"
			? "bg-clay/50"
			: tone === "terracotta"
				? "bg-terracotta/15"
				: "bg-sage/15";
	const stroke =
		tone === "terracotta" ? "text-terracotta" : "text-forest";
	return (
		<span
			className={`inline-flex shrink-0 items-center justify-center rounded-full ${bg}`}
			style={{ width: size, height: size }}
		>
			<Icon
				strokeWidth={1.5}
				className={stroke}
				size={Math.round(size * 0.46)}
				aria-hidden
			/>
		</span>
	);
}

/* -------------------------------------------------------------------------- */
/* ArchImage — a vendored illustration masked into a Roman arch, with a soft    */
/* hover scale. The whole "iconic architectural moment" of the design.         */
/* -------------------------------------------------------------------------- */
export function ArchImage({
	src,
	alt,
	className = "",
	imgClassName = "",
	rounded = "arch",
	priority = false,
}: {
	src: string;
	alt: string;
	className?: string;
	imgClassName?: string;
	rounded?: "arch" | "soft" | "blob";
	priority?: boolean;
}) {
	const shape =
		rounded === "soft"
			? "rounded-[2.5rem]"
			: rounded === "blob"
				? "blob"
				: "arch rounded-b-[2.5rem]";
	return (
		<div
			className={`group/arch overflow-hidden border border-stone bg-clay-soft shadow-bloom ${shape} ${className}`}
		>
			<img
				src={src}
				alt={alt}
				loading={priority ? "eager" : "lazy"}
				decoding="async"
				className={`h-full w-full object-cover transition-transform duration-700 ease-organic group-hover/arch:scale-105 ${imgClassName}`}
			/>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/* VineDivider — a fine, meandering 1px SVG line with leaves, "growing" in.     */
/* Mimics a vine/root connecting sections.                                      */
/* -------------------------------------------------------------------------- */
export function VineDivider({ className = "" }: { className?: string }) {
	const ref = useRef<SVGPathElement>(null);
	const [grow, setGrow] = useState(false);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				setGrow(true);
				io.disconnect();
			}
		});
		io.observe(el);
		return () => io.disconnect();
	}, []);
	const leaves = [
		{ x: 150, up: true },
		{ x: 360, up: false },
		{ x: 600, up: true },
		{ x: 840, up: false },
		{ x: 1050, up: true },
	];
	return (
		<div className={`flex justify-center ${className}`} aria-hidden>
			<svg
				viewBox="0 0 1200 80"
				className="h-12 w-full max-w-3xl text-sage"
				fill="none"
			>
				<path
					ref={ref}
					d="M10 40 C 180 -10, 300 90, 470 40 S 760 -10, 930 40 S 1100 80, 1190 40"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeDasharray="1600"
					strokeDashoffset={grow ? 0 : 1600}
					style={{
						transition: "stroke-dashoffset 2.4s cubic-bezier(0.22,0.61,0.36,1)",
						opacity: 0.7,
					}}
				/>
				{leaves.map((l, i) => {
					// approximate the curve's y at each x (sinusoidal sway around 40)
					const y = 40 - Math.sin((l.x / 1200) * Math.PI * 3) * 22;
					const dir = l.up ? -1 : 1;
					return (
						<g
							key={i}
							transform={`translate(${l.x} ${y}) rotate(${dir * 38})`}
							style={{
								transition: "opacity 0.8s ease",
								transitionDelay: `${1.1 + i * 0.22}s`,
								opacity: grow ? 0.85 : 0,
							}}
						>
							<path
								d="M0 0 Q 9 -7 20 0 Q 9 7 0 0 Z"
								fill="currentColor"
							/>
						</g>
					);
				})}
			</svg>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/* SectionHeading — eyebrow + big Playfair title (with italic emphasis word).  */
/* -------------------------------------------------------------------------- */
export function SectionHeading({
	eyebrow,
	title,
	intro,
	centered = false,
	className = "",
}: {
	eyebrow: string;
	title: ReactNode;
	intro?: ReactNode;
	centered?: boolean;
	className?: string;
}) {
	return (
		<div
			className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
		>
			<Reveal>
				<Eyebrow centered={centered}>{eyebrow}</Eyebrow>
			</Reveal>
			<Reveal delay={90}>
				<h2 className="mt-5 text-4xl leading-[1.05] sm:text-5xl">{title}</h2>
			</Reveal>
			{intro && (
				<Reveal delay={160}>
					<p className="mt-5 text-lg text-forest/70">{intro}</p>
				</Reveal>
			)}
		</div>
	);
}
