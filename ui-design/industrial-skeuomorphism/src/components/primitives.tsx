import {
	forwardRef,
	type ButtonHTMLAttributes,
	type HTMLAttributes,
	type InputHTMLAttributes,
	type ReactNode,
} from "react";

/* ----------------------------------------------------------------------------
   cx — tiny class joiner (no dependency needed for this scale).
   -------------------------------------------------------------------------- */
export function cx(...parts: Array<string | false | null | undefined>) {
	return parts.filter(Boolean).join(" ");
}

/* ============================================================================
   CONTAINER — the mounting deck. Centralizes max-width + responsive padding.
   ========================================================================== */
export function Container({
	className,
	children,
	...rest
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cx("mx-auto w-full max-w-deck px-6 md:px-12", className)}
			{...rest}
		>
			{children}
		</div>
	);
}

/* ============================================================================
   LED — status indicator. Solid fill + glow + breathing pulse. Always paired
   with a label by the caller. Accessible: conveys state via aria-label text.
   ========================================================================== */
const LED_TONE = {
	online: { dot: "bg-online", glow: "var(--shadow-glow-green)" },
	alert: { dot: "bg-accent", glow: "var(--shadow-glow)" },
	warning: { dot: "bg-warning", glow: "0 0 10px 2px rgba(245,166,35,0.7)" },
} as const;

export function Led({
	tone = "online",
	size = 10,
	pulse = true,
	className,
	label,
}: {
	tone?: keyof typeof LED_TONE;
	size?: number;
	pulse?: boolean;
	className?: string;
	label?: string;
}) {
	const t = LED_TONE[tone];
	return (
		<span
			role={label ? "img" : undefined}
			aria-label={label}
			className={cx(
				"inline-block shrink-0 rounded-full",
				t.dot,
				pulse && "animate-pulse",
				className,
			)}
			style={{ width: size, height: size, boxShadow: t.glow }}
		/>
	);
}

/* ============================================================================
   MONO LABEL — stamped/printed technical text. Optional leading LED.
   ========================================================================== */
export function MonoLabel({
	children,
	tone,
	className,
}: {
	children: ReactNode;
	tone?: keyof typeof LED_TONE;
	className?: string;
}) {
	return (
		<span
			className={cx(
				"stamp inline-flex items-center gap-2 text-[0.7rem] text-label",
				className,
			)}
		>
			{tone && <Led tone={tone} size={8} label={`status: ${tone}`} />}
			{children}
		</span>
	);
}

/* ============================================================================
   BADGE — small recessed pill, used for eyebrow tags above headings.
   ========================================================================== */
export function Badge({
	children,
	className,
	tone,
}: {
	children: ReactNode;
	className?: string;
	tone?: keyof typeof LED_TONE;
}) {
	return (
		<span
			className={cx(
				"inline-flex items-center gap-2 rounded-full bg-chassis px-4 py-1.5",
				"text-[0.7rem] text-label stamp",
				className,
			)}
			style={{ boxShadow: "var(--shadow-recessed-soft)" }}
		>
			{tone && <Led tone={tone} size={8} label={`status: ${tone}`} />}
			{children}
		</span>
	);
}

/* ============================================================================
   SCREWS + VENTS — the signature manufacturing details. Decorative only.
   ========================================================================== */
export function Vents({ className }: { className?: string }) {
	return (
		<div
			className={cx("flex gap-1", className)}
			aria-hidden="true"
		>
			{[0, 1, 2].map((i) => (
				<span
					key={i}
					className="h-6 w-1 rounded-full bg-recessed"
					style={{ boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.18)" }}
				/>
			))}
		</div>
	);
}

/* ============================================================================
   PANEL — a "bolted module". Core surface primitive: chassis card with the
   neumorphic dual shadow, optional corner screws, vents and hover lift.
   ========================================================================== */
type PanelProps = HTMLAttributes<HTMLDivElement> & {
	elevated?: boolean;
	screws?: boolean;
	vents?: boolean;
	hover?: boolean;
	as?: "div" | "article" | "li" | "section";
};

export function Panel({
	elevated,
	screws,
	vents,
	hover,
	as: Tag = "div",
	className,
	children,
	style,
	...rest
}: PanelProps) {
	return (
		<Tag
			className={cx(
				"relative rounded-lg bg-chassis",
				screws && "screws",
				hover &&
					"transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1",
				className,
			)}
			style={{
				boxShadow: elevated
					? "var(--shadow-floating)"
					: "var(--shadow-card)",
				...style,
			}}
			{...(rest as HTMLAttributes<HTMLElement>)}
		>
			{vents && <Vents className="absolute right-4 top-4" />}
			{children}
		</Tag>
	);
}

/* ============================================================================
   ICON HOUSING — recessed circular mount so icons are never "floating".
   ========================================================================== */
export function IconHousing({
	children,
	size = 56,
	recessed = false,
	className,
}: {
	children: ReactNode;
	size?: number;
	recessed?: boolean;
	className?: string;
}) {
	return (
		<span
			className={cx(
				"flex items-center justify-center rounded-full bg-chassis",
				className,
			)}
			style={{
				width: size,
				height: size,
				boxShadow: recessed
					? "var(--shadow-recessed)"
					: "var(--shadow-floating)",
			}}
		>
			{children}
		</span>
	);
}

/* ============================================================================
   BUTTON — "physical key". Three variants; depresses with shadow inversion.
   ========================================================================== */
const SIZES = {
	sm: "min-h-[44px] px-5 text-[0.72rem] rounded-md",
	md: "min-h-[48px] px-7 text-xs rounded-lg",
	lg: "min-h-[56px] px-9 text-sm rounded-lg",
} as const;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "secondary" | "ghost";
	size?: keyof typeof SIZES;
	full?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ variant = "primary", size = "md", full, className, children, ...rest },
		ref,
	) => {
		const base =
			"group/btn relative inline-flex items-center justify-center gap-2 select-none stamp " +
			"tracking-[0.06em] font-bold transition-[transform,box-shadow,filter,color,background-color] " +
			"duration-150 ease-mech active:translate-y-[2px] disabled:pointer-events-none disabled:opacity-50";

		const variants = {
			primary: "text-white border border-white/20 hover:brightness-110",
			secondary: "bg-chassis text-ink hover:text-accent",
			ghost: "bg-transparent text-label hover:text-ink",
		} as const;

		// Per-variant resting + pressed shadows (pressed = inset inversion).
		const restShadow =
			variant === "primary"
				? "var(--shadow-accent)"
				: variant === "secondary"
					? "var(--shadow-card)"
					: "none";

		return (
			<button
				ref={ref}
				className={cx(
					base,
					SIZES[size],
					variants[variant],
					full && "w-full",
					variant === "ghost" &&
						"hover:[box-shadow:var(--shadow-recessed-soft)]",
					className,
				)}
				style={{
					backgroundColor:
						variant === "primary" ? "var(--color-accent)" : undefined,
					// Ghost has no resting shadow — leave it to the hover CSS class
					// so an inline value never overrides it.
					boxShadow: variant === "ghost" ? undefined : restShadow,
				}}
				onPointerDown={(e) => {
					// Tactile shadow inversion on press for primary/secondary only;
					// ghost's feedback is the hover class + active:translate-y.
					if (variant !== "ghost") {
						(e.currentTarget as HTMLButtonElement).style.boxShadow =
							"var(--shadow-pressed)";
					}
					rest.onPointerDown?.(e);
				}}
				onPointerUp={(e) => {
					if (variant !== "ghost") {
						(e.currentTarget as HTMLButtonElement).style.boxShadow =
							restShadow;
					}
					rest.onPointerUp?.(e);
				}}
				onPointerLeave={(e) => {
					if (variant !== "ghost") {
						(e.currentTarget as HTMLButtonElement).style.boxShadow =
							restShadow;
					}
					rest.onPointerLeave?.(e);
				}}
				{...rest}
			>
				{children}
			</button>
		);
	},
);
Button.displayName = "Button";

/* ============================================================================
   INPUT — "data slot". Recessed well, monospace, accent LED-backlight focus.
   ========================================================================== */
type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, ...rest }, ref) => {
		return (
			<input
				ref={ref}
				className={cx(
					"h-14 w-full rounded-md border-none bg-chassis px-6 font-mono text-sm text-ink",
					"placeholder:text-label/50 outline-none transition-shadow duration-200",
					className,
				)}
				style={{ boxShadow: "var(--shadow-recessed)" }}
				onFocus={(e) => {
					e.currentTarget.style.boxShadow =
						"var(--shadow-recessed), 0 0 0 2px var(--color-accent), var(--shadow-glow)";
					rest.onFocus?.(e);
				}}
				onBlur={(e) => {
					e.currentTarget.style.boxShadow = "var(--shadow-recessed)";
					rest.onBlur?.(e);
				}}
				{...rest}
			/>
		);
	},
);
Input.displayName = "Input";

/* ============================================================================
   SECTION HEADING — consistent eyebrow + title + lede block.
   ========================================================================== */
export function SectionHeading({
	eyebrow,
	title,
	lede,
	align = "center",
	tone,
	dark = false,
	className,
}: {
	eyebrow: string;
	title: ReactNode;
	lede?: ReactNode;
	align?: "center" | "left";
	tone?: keyof typeof LED_TONE;
	dark?: boolean;
	className?: string;
}) {
	return (
		<div
			className={cx(
				"flex flex-col gap-4",
				align === "center" ? "items-center text-center" : "items-start",
				className,
			)}
		>
			<Badge tone={tone}>{eyebrow}</Badge>
			<h2
				className={cx(
					"max-w-2xl text-3xl font-extrabold tracking-[-0.03em] md:text-[2.6rem] md:leading-[1.08]",
					dark ? "text-white emboss-dark" : "text-ink emboss",
				)}
			>
				{title}
			</h2>
			{lede && (
				<p
					className={cx(
						"max-w-[60ch] text-base leading-relaxed md:text-lg",
						dark ? "text-slate-soft" : "text-label",
						align === "center" && "mx-auto",
					)}
				>
					{lede}
				</p>
			)}
		</div>
	);
}
