import {
	useEffect,
	useRef,
	useState,
	type ElementType,
	type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-triggered reveal: a column of type "rises" into place once it enters
 * the viewport. Motion is opacity + transform only (GPU-friendly) and is
 * neutralized by the reduced-motion media query in index.css.
 */
export function Reveal({
	children,
	as: Tag = "div",
	className,
	delay = 0,
}: {
	children: ReactNode;
	as?: ElementType;
	className?: string;
	delay?: number;
}) {
	const ref = useRef<HTMLElement | null>(null);
	const [shown, setShown] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setShown(true);
						observer.disconnect();
					}
				}
			},
			{ threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<Tag
			ref={ref}
			style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
			className={cn(
				"transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
				shown ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
				className,
			)}
		>
			{children}
		</Tag>
	);
}
