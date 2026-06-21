import { type ReactNode, useState } from "react";

/**
 * Wraps text and fires a one-shot RGB-split glitch on hover/focus. The offset
 * is purely transform/text-shadow so it never reflows the layout.
 */
export function Glitch({
	children,
	className = "",
	as: Tag = "span",
}: {
	children: ReactNode;
	className?: string;
	as?: "span" | "div" | "h1" | "h2";
}) {
	const [key, setKey] = useState(0);
	const trigger = () => setKey((k) => k + 1);
	return (
		<Tag
			key={key}
			onMouseEnter={trigger}
			onFocus={trigger}
			className={`inline-block [animation:var(--animate-glitch)] ${className}`}
		>
			{children}
		</Tag>
	);
}
