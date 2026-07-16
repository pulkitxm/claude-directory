import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInViewAnimation } from "../hooks/useInViewAnimation";

interface Testimonial {
	quote: string;
	name: string;
	role: string;
	company: string;
	avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
	{
		quote:
			"With very little guidance team delivered designs that were consistently spot on. They understood our brand from day one, and every iteration landed closer than anything we could have briefed ourselves.",
		name: "Marcus Anderson",
		role: "CEO",
		company: "Data.storage",
		avatar: "./assets/pexels-2379004.jpg",
	},
	{
		quote:
			"Viktor led the creation of our best fundraising deck to date! Investors kept commenting on the design before we even got to the numbers. Worth every dollar and then some.",
		name: "alexwu",
		role: "Founder",
		company: "Nexgate",
		avatar: "./assets/pexels-220453.jpg",
	},
	{
		quote:
			"Working with Viktor transformed our product vision into an interface our users genuinely love. Every screen feels considered — nothing shipped until it earned its place.",
		name: "James Mitchell",
		role: "VP Product",
		company: "LaunchPad",
		avatar: "./assets/pexels-614810.jpg",
	},
	{
		quote:
			"The design quality exceeded our expectations at every single milestone. It felt like having a world-class in-house design team without the overhead of building one.",
		name: "Rachel Foster",
		role: "Co-founder",
		company: "Nexus Labs",
		avatar: "./assets/pexels-774909.jpg",
	},
	{
		quote:
			"Incredible work from start to finish. Fast, opinionated in the best way, and relentlessly polished. The crew moves like a team three times its size.",
		name: "David Zhang",
		role: "Head of Design",
		company: "Paradigm Labs",
		avatar: "./assets/pexels-1222271.jpg",
	},
];

const COUNT = TESTIMONIALS.length;
const TRIPLED = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
const GAP = 24;
const DESKTOP_CARD_WIDTH = 427.5;
const AUTOPLAY_MS = 3000;

function QuoteMark() {
	return (
		<svg
			width="28"
			height="22"
			viewBox="0 0 28 22"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path
				d="M0 22V14.3C0 11.5 0.56 9 1.68 6.8C2.84 4.56 4.72 2.3 7.32 0L11.6 3.1C10 4.62 8.82 6.04 8.06 7.36C7.34 8.68 6.94 10.06 6.86 11.5H12.2V22H0ZM15.8 22V14.3C15.8 11.5 16.36 9 17.48 6.8C18.64 4.56 20.52 2.3 23.12 0L27.4 3.1C25.8 4.62 24.62 6.04 23.86 7.36C23.14 8.68 22.74 10.06 22.66 11.5H28V22H15.8Z"
				fill="#0D212C"
			/>
		</svg>
	);
}

export default function TestimonialCarousel() {
	const { ref, animationClass } = useInViewAnimation<HTMLElement>();

	const [index, setIndex] = useState(COUNT);
	const [animate, setAnimate] = useState(true);
	const [hovered, setHovered] = useState(false);
	const [cardWidth, setCardWidth] = useState(DESKTOP_CARD_WIDTH);
	const indexRef = useRef(index);
	indexRef.current = index;

	useEffect(() => {
		const update = () =>
			setCardWidth(
				window.innerWidth >= 768 ? DESKTOP_CARD_WIDTH : window.innerWidth - 48,
			);
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	const next = useCallback(() => setIndex((i) => i + 1), []);
	const prev = useCallback(() => setIndex((i) => i - 1), []);

	useEffect(() => {
		if (hovered) return;
		const id = setInterval(next, AUTOPLAY_MS);
		return () => clearInterval(id);
	}, [hovered, next]);

	const handleTransitionEnd = useCallback(
		(event: React.TransitionEvent<HTMLDivElement>) => {
			if (event.target !== event.currentTarget) return;
			const i = indexRef.current;
			if (i >= COUNT * 2) {
				setAnimate(false);
				setIndex(i - COUNT);
			} else if (i < COUNT) {
				setAnimate(false);
				setIndex(i + COUNT);
			}
		},
		[],
	);

	useEffect(() => {
		if (animate) return;
		const frame = requestAnimationFrame(() =>
			requestAnimationFrame(() => setAnimate(true)),
		);
		return () => cancelAnimationFrame(frame);
	}, [animate]);

	const offset = index * (cardWidth + GAP);

	return (
		<section ref={ref} className="w-full overflow-hidden py-20">
			<div className="px-6">
				<div
					className={`flex flex-col gap-8 md:ml-auto md:max-w-4xl md:flex-row md:items-end md:justify-between ${animationClass}`}
					style={{ animationDelay: "0.1s" }}
				>
					<h2 className="text-[32px] leading-[1.1] tracking-tight text-[#0D212C] md:text-[40px] lg:text-[44px]">
						What <span className="font-serif">builders</span> say
					</h2>
					<div className="flex flex-col items-start gap-4 md:items-end">
						<div className="flex items-center gap-2">
							<div className="flex" aria-label="5 out of 5 stars">
								{Array.from({ length: 5 }, (_, i) => (
									<Star
										key={i}
										className="h-5 w-5 fill-black text-black"
										aria-hidden="true"
									/>
								))}
							</div>
							<span className="text-sm text-[#051A24]">Clutch 5/5</span>
						</div>
						<div className="flex gap-3">
							<button
								type="button"
								onClick={prev}
								aria-label="Previous testimonial"
								className="flex h-12 w-12 items-center justify-center rounded-full border border-[#0D212C]/20 text-[#0D212C] transition-colors hover:bg-[#0D212C]/5"
							>
								<ChevronLeft className="h-5 w-5" aria-hidden="true" />
							</button>
							<button
								type="button"
								onClick={next}
								aria-label="Next testimonial"
								className="flex h-12 w-12 items-center justify-center rounded-full border border-[#0D212C]/20 text-[#0D212C] transition-colors hover:bg-[#0D212C]/5"
							>
								<ChevronRight className="h-5 w-5" aria-hidden="true" />
							</button>
						</div>
					</div>
				</div>
			</div>

			<div
				className={`mt-12 pl-6 ${animationClass}`}
				style={{ animationDelay: "0.2s" }}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
			>
				<div
					className="flex gap-6 will-change-transform"
					style={{
						transform: `translateX(-${offset}px)`,
						transition: animate
							? "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
							: "none",
					}}
					onTransitionEnd={handleTransitionEnd}
				>
					{TRIPLED.map((testimonial, i) => {
						const exited = i < index;
						return (
							<article
								key={i}
								className="shrink-0 rounded-[32px] bg-white px-6 py-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)] md:rounded-[40px] md:pl-10 md:pr-24"
								style={{
									width: `${cardWidth}px`,
									opacity: exited ? 0 : 1,
									transform: exited ? "scale(0.9)" : "scale(1)",
									transition: animate
										? "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
										: "none",
								}}
							>
								<QuoteMark />
								<p className="mt-5 text-base leading-relaxed text-[#0D212C]">
									{testimonial.quote}
								</p>
								<div className="mt-7 flex items-center gap-4">
									<img
										src={testimonial.avatar}
										alt={testimonial.name}
										loading="lazy"
										className="h-12 w-12 rounded-full object-cover"
									/>
									<div>
										<p className="text-sm font-semibold text-[#051A24]">
											{testimonial.name}
										</p>
										<p className="text-sm text-[#273C46]">
											&rarr; {testimonial.role}, {testimonial.company}
										</p>
									</div>
								</div>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}
