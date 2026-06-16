import type { ButtonHTMLAttributes, ReactNode } from "react";

type Tone = "primary" | "secondary" | "error";

const toneText: Record<Tone, string> = {
	primary: "text-primary",
	secondary: "text-secondary",
	error: "text-error",
};
const toneFill: Record<Tone, string> = {
	primary: "hover:bg-primary",
	secondary: "hover:bg-secondary",
	error: "hover:bg-error",
};
const toneBorder: Record<Tone, string> = {
	primary: "border-border hover:border-primary",
	secondary: "border-secondary/50 hover:border-secondary",
	error: "border-error/50 hover:border-error",
};

/**
 * `[ INITIATE ]` — text wrapped in literal brackets. On hover the background
 * fills with the tone colour and the text inverts to black (inverted video).
 * On press the label nudges 1px down.
 */
export function BracketButton({
	children,
	tone = "primary",
	className = "",
	...props
}: {
	children: ReactNode;
	tone?: Tone;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			type="button"
			{...props}
			className={`group/btn relative inline-flex items-center gap-1 border ${toneBorder[tone]} ${toneText[tone]} ${toneFill[tone]} bg-transparent px-3 py-1.5 text-xs font-bold tracking-[0.16em] uppercase transition-colors duration-150 select-none hover:text-bg focus-visible:text-bg ${toneFill[tone].replace("hover:", "focus-visible:")} active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-current ${className}`}
		>
			<span aria-hidden className="opacity-70 group-hover/btn:opacity-100">
				[
			</span>
			<span className="translate-y-0">{children}</span>
			<span aria-hidden className="opacity-70 group-hover/btn:opacity-100">
				]
			</span>
		</button>
	);
}
