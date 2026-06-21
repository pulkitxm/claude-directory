import { forwardRef } from "react";
import type {
	ButtonHTMLAttributes,
	AnchorHTMLAttributes,
	ReactNode,
} from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Button — the system's primary interactive affordance is an underline, not a
// fill. Three variants, three sizes, all sharp-cornered and uppercase. Renders
// as <a> when `href` is present, otherwise <button>, so the same styling drives
// nav links and form actions alike.
//
// Variants:
//   primary  — accent text, animated underline grows scale-x-100 → 110 on hover
//   outline  — 1px foreground border, full color inversion on hover
//   ghost    — muted text → foreground, a thin (1px) underline scales 0 → 100
// ─────────────────────────────────────────────────────────────────────────────

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "default" | "lg";

const base =
	"group relative inline-flex items-center justify-center whitespace-nowrap " +
	"font-semibold uppercase tracking-wider select-none " +
	"transition-all duration-150 ease-crisp " +
	"active:translate-y-px " +
	"focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
	"disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50";

// px-0 for primary (the underline hugs the text); horizontal padding for the
// others. py + gap scale with size; min-heights keep touch targets >= 44px.
const sizes: Record<Variant, Record<Size, string>> = {
	primary: {
		sm: "py-2 px-0 gap-2 text-sm min-h-[44px]",
		default: "py-3 px-0 gap-2.5 text-base min-h-[48px]",
		lg: "py-4 px-0 gap-3 text-base md:text-lg min-h-[52px]",
	},
	outline: {
		sm: "py-2 px-6 gap-2 text-sm min-h-[44px]",
		default: "py-3 px-6 gap-2.5 text-base min-h-[48px]",
		lg: "py-4 px-8 gap-3 text-base md:text-lg min-h-[52px]",
	},
	ghost: {
		sm: "py-2 px-4 gap-2 text-sm min-h-[44px]",
		default: "py-3 px-4 gap-2.5 text-base min-h-[48px]",
		lg: "py-4 px-4 gap-3 text-base md:text-lg min-h-[52px]",
	},
};

const variants: Record<Variant, string> = {
	primary: "text-accent",
	outline:
		"border border-foreground text-foreground hover:bg-foreground hover:text-background",
	ghost: "text-muted-foreground hover:text-foreground",
};

function Underline({ variant }: { variant: Variant }) {
	if (variant === "outline") return null;
	if (variant === "primary") {
		// 2px accent rule, always visible, scales 100 → 110 on hover/focus.
		return (
			<span
				aria-hidden
				className="pointer-events-none absolute -bottom-0.5 left-0 right-0 h-0.5 origin-left bg-accent transition-transform duration-150 ease-crisp scale-x-100 group-hover:scale-x-110 group-focus-visible:scale-x-110"
			/>
		);
	}
	// ghost: thinner (1px) rule that appears on hover/focus.
	return (
		<span
			aria-hidden
			className="pointer-events-none absolute bottom-1 left-4 right-4 h-px origin-left bg-foreground transition-transform duration-150 ease-crisp scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"
		/>
	);
}

type CommonProps = {
	variant?: Variant;
	size?: Size;
	children: ReactNode;
	className?: string;
};

type ButtonAsButton = CommonProps &
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
		href?: undefined;
	};

type ButtonAsAnchor = CommonProps &
	Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export const Button = forwardRef<
	HTMLButtonElement | HTMLAnchorElement,
	ButtonProps
>(function Button(
	{ variant = "primary", size = "default", className = "", children, ...rest },
	ref,
) {
	const cls = `${base} ${variants[variant]} ${sizes[variant][size]} ${className}`;
	const content = (
		<>
			{children}
			<Underline variant={variant} />
		</>
	);

	if ("href" in rest && rest.href !== undefined) {
		return (
			<a
				ref={ref as React.Ref<HTMLAnchorElement>}
				className={cls}
				{...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
			>
				{content}
			</a>
		);
	}
	return (
		<button
			ref={ref as React.Ref<HTMLButtonElement>}
			className={cls}
			{...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
		>
			{content}
		</button>
	);
});
