import {
	useEffect,
	useRef,
	useState,
	type AnchorHTMLAttributes,
	type ButtonHTMLAttributes,
	type ReactNode,
} from "react";

/* ============================================================================
   PRIMITIVES
   Small, composable building blocks shared by every section. The MD3 rules —
   tonal surfaces, pill buttons, state layers, large radii, the signature
   easing — are expressed once (here + index.css) and reused, so no one-off
   styles creep in downstream.
   ========================================================================== */

/* ---- Scroll reveal ------------------------------------------------------- */
/* Adds `.is-in` once an element scrolls into view. The CSS does the fade+rise
   on the signature easing; `prefers-reduced-motion` neutralizes it in CSS. */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
	const ref = useRef<T | null>(null);
	const [shown, setShown] = useState(false);
	useEffect(() => {
		const el = ref.current;
		if (!el || shown) return;
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						setShown(true);
						io.disconnect();
					}
				}
			},
			{ threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
		);
		io.observe(el);
		return () => io.disconnect();
	}, [shown]);
	return { ref, shown };
}

export function Reveal({
	children,
	className = "",
	delay = 0,
	as: Tag = "div",
}: {
	children: ReactNode;
	className?: string;
	delay?: number;
	as?: "div" | "li" | "article" | "section";
}) {
	const { ref, shown } = useReveal<HTMLElement>();
	return (
		<Tag
			ref={ref as never}
			className={`reveal ${shown ? "is-in" : ""} ${className}`}
			style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
		>
			{children}
		</Tag>
	);
}

/* ---- Layout -------------------------------------------------------------- */
export function Shell({
	className = "",
	children,
}: {
	className?: string;
	children: ReactNode;
}) {
	return <div className={`shell ${className}`}>{children}</div>;
}

type SectionTone = "bg" | "surface";
export function Section({
	id,
	tone = "bg",
	className = "",
	children,
}: {
	id?: string;
	tone?: SectionTone;
	className?: string;
	children: ReactNode;
}) {
	const bg =
		tone === "surface"
			? "bg-[var(--color-md-surface)]"
			: "bg-[var(--color-md-bg)]";
	return (
		<section id={id} className={`relative overflow-hidden ${bg} ${className}`}>
			{children}
		</section>
	);
}

/* ---- Eyebrow / section heading cluster ----------------------------------- */
export function Eyebrow({
	children,
	icon,
	className = "",
}: {
	children: ReactNode;
	icon?: ReactNode;
	className?: string;
}) {
	return (
		<span className={`eyebrow ${className}`}>
			{icon}
			{children}
		</span>
	);
}

export function SectionHead({
	eyebrow,
	eyebrowIcon,
	title,
	lead,
	align = "center",
	className = "",
}: {
	eyebrow: string;
	eyebrowIcon?: ReactNode;
	title: ReactNode;
	lead?: ReactNode;
	align?: "center" | "left";
	className?: string;
}) {
	const a =
		align === "center"
			? "items-center text-center mx-auto"
			: "items-start text-left";
	return (
		<div className={`flex max-w-2xl flex-col gap-5 ${a} ${className}`}>
			<Reveal>
				<Eyebrow icon={eyebrowIcon}>{eyebrow}</Eyebrow>
			</Reveal>
			<Reveal delay={80}>
				<h2 className="t-headline text-[var(--color-md-on-bg)]">{title}</h2>
			</Reveal>
			{lead && (
				<Reveal delay={140}>
					<p className="t-body-l text-[var(--color-md-on-variant)]">{lead}</p>
				</Reveal>
			)}
		</div>
	);
}

/* ---- Buttons (pills; thin wrappers over the centralized .btn tokens) ----- */
type Variant =
	| "filled"
	| "tonal"
	| "outlined"
	| "text"
	| "on-color"
	| "ghost-on-color";

const variantClass: Record<Variant, string> = {
	filled: "btn-filled",
	tonal: "btn-tonal",
	outlined: "btn-outlined",
	text: "btn-text",
	"on-color": "btn-on-color",
	"ghost-on-color": "btn-ghost-on-color",
};

export function Button({
	variant = "filled",
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
	variant = "filled",
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
			className={`btn focus-ring ${variantClass[variant]} ${size === "lg" ? "btn-lg" : ""} ${className}`}
			{...rest}
		>
			{children}
		</a>
	);
}

/* ---- Decorative organic blur shape --------------------------------------- */
/* Signature MD3 atmosphere: a heavily-blurred tonal shape. One corner is less
   rounded for the organic squircle silhouette. Purely decorative -> aria-hidden. */
export function Blob({
	className = "",
	float,
}: {
	className?: string;
	float?: "a" | "b" | "c";
}) {
	return (
		<div
			aria-hidden
			className={`pointer-events-none absolute rounded-[100px] rounded-tr-[28px] blur-3xl mix-blend-multiply ${
				float ? `blob-${float}` : ""
			} ${className}`}
		/>
	);
}
