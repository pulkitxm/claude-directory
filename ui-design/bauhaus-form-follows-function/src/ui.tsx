/* ----------------------------------------------------------------------------
   WERKBUND — design-system primitives.

   These are the composable atoms every section is constructed from. Centralizing
   them here keeps the Bauhaus tokens (thick black borders, hard offset shadows,
   binary radii, uppercase type) in ONE place instead of being re-typed as
   one-off utility soups across the page.
---------------------------------------------------------------------------- */
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/** Tiny className joiner (avoids a clsx dependency for this small surface). */
export function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(" ");
}

export type Accent = "red" | "blue" | "yellow";

export const ACCENT_BG: Record<Accent, string> = {
	red: "bg-bauhaus-red",
	blue: "bg-bauhaus-blue",
	yellow: "bg-bauhaus-yellow",
};

export const ACCENT_TEXT_ON: Record<Accent, string> = {
	red: "text-white",
	blue: "text-white",
	yellow: "text-ink",
};

/* ------------------------------------------------------------------ Shape -- */

type ShapeKind = "circle" | "square" | "triangle";

/**
 * A pure geometric primitive — the literal building block of the system.
 * Circles use rounded-full, squares rounded-none, triangles a clip-path.
 */
export function Shape({
	kind,
	className,
	bordered = false,
	style,
}: {
	kind: ShapeKind;
	className?: string;
	bordered?: boolean;
	style?: React.CSSProperties;
}) {
	if (kind === "triangle") {
		return (
			<span
				aria-hidden
				className={cx("clip-triangle inline-block", className)}
				style={style}
			/>
		);
	}
	return (
		<span
			aria-hidden
			className={cx(
				"inline-block",
				kind === "circle" ? "rounded-full" : "rounded-none",
				bordered && "border-2 border-ink",
				className,
			)}
			style={style}
		/>
	);
}

/* -------------------------------------------------------------- BrandMark -- */

/** Three primary shapes forming the brand identity. Spins gently on hover. */
export function BrandMark({ size = 36 }: { size?: number }) {
	return (
		<span
			className="group inline-flex items-center gap-1.5"
			style={{ height: size }}
			aria-hidden
		>
			<Shape
				kind="circle"
				bordered
				className="bg-bauhaus-red transition-transform duration-300 group-hover:scale-110"
				style={{ width: size * 0.62, height: size * 0.62 }}
			/>
			<Shape
				kind="square"
				bordered
				className="bg-bauhaus-blue transition-transform duration-300 group-hover:rotate-45"
				style={{ width: size * 0.62, height: size * 0.62 }}
			/>
			<span
				className="relative transition-transform duration-300 group-hover:-translate-y-0.5"
				style={{ width: size * 0.62, height: size * 0.62 }}
			>
				<Shape
					kind="triangle"
					className="absolute inset-0 bg-ink"
					style={{ width: size * 0.62, height: size * 0.62 }}
				/>
				<Shape
					kind="triangle"
					className="absolute inset-x-[2px] bottom-0 top-[3px] bg-bauhaus-yellow"
					style={{ width: size * 0.62 - 4, height: size * 0.62 - 3 }}
				/>
			</span>
		</span>
	);
}

/* ------------------------------------------------------------- Eyebrow ---- */

/** Uppercase, wide-tracked label with a leading shape tick. */
export function Eyebrow({
	children,
	accent = "red",
	onDark = false,
	className,
}: {
	children: ReactNode;
	accent?: Accent;
	onDark?: boolean;
	className?: string;
}) {
	return (
		<span
			className={cx(
				"inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.25em] sm:text-sm",
				onDark ? "text-white" : "text-ink",
				className,
			)}
		>
			<Shape kind="square" className={cx("size-3", ACCENT_BG[accent])} />
			{children}
		</span>
	);
}

/* --------------------------------------------------------------- Button --- */

type BtnVariant = "red" | "blue" | "yellow" | "outline" | "ghost" | "ondark";
type BtnShape = "square" | "pill";

const BTN_VARIANT: Record<BtnVariant, string> = {
	red: "bg-bauhaus-red text-white border-2 border-ink shadow-hard-sm hover:bg-bauhaus-red/90",
	blue: "bg-bauhaus-blue text-white border-2 border-ink shadow-hard-sm hover:bg-bauhaus-blue/90",
	yellow:
		"bg-bauhaus-yellow text-ink border-2 border-ink shadow-hard-sm hover:bg-bauhaus-yellow/90",
	outline:
		"bg-white text-ink border-2 border-ink shadow-hard-sm hover:bg-muted",
	ghost:
		"bg-transparent text-ink border-2 border-transparent hover:bg-black/10",
	ondark:
		"bg-white text-ink border-2 border-white shadow-[4px_4px_0px_0px_#000] hover:bg-white/90",
};

export function Btn({
	variant = "red",
	shape = "square",
	className,
	children,
	...rest
}: {
	variant?: BtnVariant;
	shape?: BtnShape;
	children: ReactNode;
} & ComponentPropsWithoutRef<"button">) {
	return (
		<button
			{...rest}
			className={cx(
				"inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider",
				"transition-all duration-200 ease-out",
				"active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
				shape === "pill" ? "rounded-full" : "rounded-none",
				BTN_VARIANT[variant],
				className,
			)}
		>
			{children}
		</button>
	);
}

/* ---------------------------------------------------------------- Card ---- */

/**
 * The base bordered card with a hard shadow and a rotating corner shape.
 * The corner decoration cycles through the three primaries to keep the page
 * feeling hand-composed rather than templated.
 */
export function Card({
	children,
	className,
	corner = "red",
	cornerKind = "square",
	shadow = "lg",
	lift = true,
}: {
	children: ReactNode;
	className?: string;
	corner?: Accent | "none";
	cornerKind?: ShapeKind;
	shadow?: "sm" | "md" | "lg";
	lift?: boolean;
}) {
	const shadowClass =
		shadow === "sm"
			? "shadow-hard-sm"
			: shadow === "md"
				? "shadow-hard-md"
				: "shadow-hard-lg";
	return (
		<div
			className={cx(
				"relative border-2 border-ink bg-white sm:border-4",
				shadowClass,
				lift &&
					"transition-transform duration-200 ease-out hover:-translate-y-1.5",
				className,
			)}
		>
			{corner !== "none" && (
				<Shape
					kind={cornerKind}
					className={cx(
						"absolute right-3 top-3 size-4",
						cornerKind === "triangle" ? "" : "border-2 border-ink",
						ACCENT_BG[corner],
					)}
				/>
			)}
			{children}
		</div>
	);
}

/* ------------------------------------------------------------- Section ---- */

/** Standard section wrapper with the mandatory 4px bottom divider. */
export function Section({
	id,
	children,
	className,
	divide = true,
}: {
	id?: string;
	children: ReactNode;
	className?: string;
	divide?: boolean;
}) {
	return (
		<section
			id={id}
			className={cx(divide && "border-b-2 border-ink sm:border-b-4", className)}
		>
			{children}
		</section>
	);
}

/** Centered max-width container — poster-like breadth. */
export function Container({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cx(
				"mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24",
				className,
			)}
		>
			{children}
		</div>
	);
}
