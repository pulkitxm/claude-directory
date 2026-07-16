import { Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useInViewAnimation } from "../hooks/useInViewAnimation";

const PARALLAX_MAX_OFFSET = 200;

const PARALLAX_IMAGE =
	"./assets/hf_20260330_103804_7aa5494f-4d5b-432e-9dc7-20715275f143.webp";

const COMPANY_LOGOS = [
	{ name: "Apple", width: 80 },
	{ name: "IDEO", width: 83 },
	{ name: "Polygon", width: 110 },
];

function useParallax<T extends HTMLElement>() {
	const ref = useRef<T | null>(null);
	const [offset, setOffset] = useState(0);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		let visible = false;
		let frame = 0;

		const update = () => {
			frame = 0;
			const rect = element.getBoundingClientRect();
			const viewportHeight = window.innerHeight;
			const progress =
				(viewportHeight - rect.top) / (viewportHeight + rect.height);
			const clamped = Math.max(0, Math.min(1, progress));
			const next = (clamped - 0.5) * 2 * PARALLAX_MAX_OFFSET;
			setOffset(
				Math.max(-PARALLAX_MAX_OFFSET, Math.min(PARALLAX_MAX_OFFSET, next)),
			);
		};

		const requestUpdate = () => {
			if (visible && !frame) {
				frame = requestAnimationFrame(update);
			}
		};

		const observer = new IntersectionObserver((entries) => {
			visible = entries[0]?.isIntersecting ?? false;
			requestUpdate();
		});

		observer.observe(element);
		window.addEventListener("scroll", requestUpdate, { passive: true });
		window.addEventListener("resize", requestUpdate);

		return () => {
			observer.disconnect();
			window.removeEventListener("scroll", requestUpdate);
			window.removeEventListener("resize", requestUpdate);
			if (frame) cancelAnimationFrame(frame);
		};
	}, []);

	return { ref, offset };
}

export default function TestimonialSection() {
	const { ref, animationClass } = useInViewAnimation<HTMLElement>();
	const { ref: parallaxRef, offset } = useParallax<HTMLDivElement>();

	return (
		<section ref={ref} className="mx-auto max-w-2xl px-6 py-12 text-center">
			<div className={animationClass} style={{ animationDelay: "0.1s" }}>
				<Quote className="mx-auto h-6 w-6 text-slate-900" aria-hidden="true" />
			</div>

			<blockquote
				className={`mt-6 text-[32px] leading-[1.1] tracking-tight text-[#0D212C] md:text-[40px] lg:text-[44px] ${animationClass}`}
				style={{ animationDelay: "0.2s" }}
			>
				&lsquo;I left <span className="font-serif">Apple</span> to build the
				studio I always wanted to work with&rsquo;
			</blockquote>

			<p
				className={`mt-6 text-sm italic text-[#273C46] ${animationClass}`}
				style={{ animationDelay: "0.3s" }}
			>
				Viktor Oddy
			</p>

			<div
				className={`mt-12 flex items-center justify-center gap-8 ${animationClass}`}
				style={{ animationDelay: "0.4s" }}
			>
				{COMPANY_LOGOS.map((logo) => (
					<span
						key={logo.name}
						className="text-[24px] font-medium text-slate-900"
						style={{ width: `${logo.width}px` }}
					>
						{logo.name}
					</span>
				))}
			</div>

			<div
				ref={parallaxRef}
				className={`mt-16 ${animationClass}`}
				style={{ animationDelay: "0.5s" }}
			>
				<img
					src={PARALLAX_IMAGE}
					alt="Chris Halaska"
					loading="lazy"
					className="mx-auto w-full max-w-xs rounded-2xl shadow-lg will-change-transform"
					style={{ transform: `translateY(${offset.toFixed(2)}px)` }}
				/>
			</div>
		</section>
	);
}
