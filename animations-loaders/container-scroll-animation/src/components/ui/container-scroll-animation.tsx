"use client";
import {
	type MotionValue,
	motion,
	type UseScrollOptions,
	useScroll,
	useTransform,
} from "framer-motion";
import React, { useRef } from "react";

/**
 * ContainerScroll — the Aceternity "Container Scroll Animation" primitive.
 *
 * As the wrapping section scrolls through the viewport, the perspective Card
 * tilts up from a 20deg rotateX to flat, scales toward 1, and the heading
 * drifts upward. Behaviour and public API are faithful to the original
 * `@/components/ui/container-scroll-animation` component; the only change for a
 * plain Vite/React (non-Next.js) app is that the `"use client"` directive is a
 * harmless no-op and assets are passed in as `children` rather than via
 * `next/image`.
 *
 * Props:
 *   - titleComponent: heading / eyebrow rendered above the card (string or node)
 *   - children:       whatever you want framed inside the device card
 *   - offset:         optional `useScroll` offset. Omit for the original
 *                     behaviour; pass e.g. ["start end", "center center"] to
 *                     spread the tilt across "section enters" → "section
 *                     centered" (used by this showcase so every stacked instance
 *                     animates and lands flat at mid-screen).
 */
export const ContainerScroll = ({
	titleComponent,
	children,
	offset,
}: {
	titleComponent: string | React.ReactNode;
	children: React.ReactNode;
	offset?: UseScrollOptions["offset"];
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		// `offset` is omitted entirely when not provided, preserving the
		// component's original default scroll mapping.
		...(offset ? { offset } : {}),
	});
	const [isMobile, setIsMobile] = React.useState(false);

	React.useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => {
			window.removeEventListener("resize", checkMobile);
		};
	}, []);

	const scaleDimensions = () => {
		return isMobile ? [0.7, 0.9] : [1.05, 1];
	};

	const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
	const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
	const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

	return (
		// Only the scroll-runway layout is tuned for this multi-stage page: the
		// container height and vertical padding are reduced from the source's
		// `h-[60rem] md:h-[80rem]` / `py-10 md:py-40` so three stacked instances
		// compose without large dead gaps. The transform behaviour and public API
		// are unchanged.
		<div
			className="h-[44rem] md:h-[58rem] flex items-center justify-center relative p-2 md:p-20"
			ref={containerRef}
		>
			<div
				className="py-8 md:py-24 w-full relative"
				style={{
					perspective: "1000px",
				}}
			>
				<Header translate={translate} titleComponent={titleComponent} />
				<Card rotate={rotate} translate={translate} scale={scale}>
					{children}
				</Card>
			</div>
		</div>
	);
};

export const Header = ({ translate, titleComponent }: any) => {
	return (
		<motion.div
			style={{
				translateY: translate,
			}}
			className="div max-w-5xl mx-auto text-center"
		>
			{titleComponent}
		</motion.div>
	);
};

export const Card = ({
	rotate,
	scale,
	children,
}: {
	rotate: MotionValue<number>;
	scale: MotionValue<number>;
	translate: MotionValue<number>;
	children: React.ReactNode;
}) => {
	return (
		<motion.div
			style={{
				rotateX: rotate,
				scale,
				boxShadow:
					"0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
			}}
			className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
		>
			<div className=" h-full w-full  overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4 ">
				{children}
			</div>
		</motion.div>
	);
};
