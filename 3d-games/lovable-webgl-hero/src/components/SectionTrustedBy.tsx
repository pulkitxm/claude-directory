import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { vendorAsset } from "@/lib/assets";

const LOGOS = [
	"logo-1.svg",
	"logo-2.svg",
	"logo-3.svg",
	"logo-4.svg",
	"logo-5.svg",
	"logo-6.svg",
];

const useIsMobile = () => {
	const [m, setM] = useState(false);
	useEffect(() => {
		const mq = window.matchMedia("(max-width: 640px)");
		const on = () => setM(mq.matches);
		on();
		mq.addEventListener("change", on);
		return () => mq.removeEventListener("change", on);
	}, []);
	return m;
};

const SectionTrustedBy = () => {
	const isMobile = useIsMobile();
	const containerRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const innerRefs = useRef<HTMLDivElement[]>([]);
	const slotRefs = useRef<HTMLDivElement[]>([]);
	const offsetRef = useRef(0);
	const pausedRef = useRef(false);
	const setWidthRef = useRef(0);

	const REPEATS = 6;
	const strip = Array.from({ length: REPEATS }).flatMap((_, r) =>
		LOGOS.map((file, i) => ({
			file,
			key: `${r}-${i}-${file}`,
			idx: r * LOGOS.length + i,
		})),
	);

	const measure = () => {
		const slots = slotRefs.current;
		if (!slots.length) return;
		const perSet = LOGOS.length;
		let w = 0;
		for (let i = 0; i < perSet; i++) {
			const s = slots[i];
			if (!s) return;
			const r = s.getBoundingClientRect();
			w += r.width;
		}
		const gap = isMobile ? 56 : 88;
		w += gap * perSet;
		setWidthRef.current = w;
	};

	useEffect(() => {
		measure();
		const onResize = () => measure();
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [measure]);

	useEffect(() => {
		let raf = 0;
		let last = performance.now();
		const speed = isMobile ? 55 : 80;

		const tick = (now: number) => {
			const dt = Math.min(0.05, (now - last) / 1000);
			last = now;
			if (!pausedRef.current) offsetRef.current += speed * dt;

			const container = containerRef.current;
			const track = trackRef.current;
			const setWidth = setWidthRef.current;
			if (!container || !track) {
				raf = requestAnimationFrame(tick);
				return;
			}
			if (setWidth > 0) {
				offsetRef.current =
					((offsetRef.current % setWidth) + setWidth) % setWidth;
			}
			track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;

			const cw = container.clientWidth;
			const cx = cw / 2;
			const cLeft = container.getBoundingClientRect().left;
			const slots = slotRefs.current;
			const inners = innerRefs.current;

			for (let i = 0; i < slots.length; i++) {
				const slot = slots[i];
				const inner = inners[i];
				if (!slot || !inner) continue;
				const r = slot.getBoundingClientRect();
				const elCenter = r.left + r.width / 2 - cLeft;
				const t = (elCenter - cx) / (cx || 1);
				const ct = Math.max(-1.3, Math.min(1.3, t));
				const bulge = Math.cos(Math.max(-1, Math.min(1, ct)) * (Math.PI / 2));
				const rotY = -ct * 26;
				const yArc = (1 - bulge) * -8;
				const tz = bulge * 140;
				const scale = 0.72 + bulge * 0.5;
				const edge = Math.max(0, 1 - Math.abs(ct) ** 1.5);
				const opacity = edge * (0.5 + bulge * 0.5);
				const blur = (1 - bulge) * 1.4;

				inner.style.transform = `translateY(${yArc}px) translateZ(${tz}px) rotateY(${rotY}deg) scale(${scale})`;
				inner.style.opacity = String(opacity);
				inner.style.filter = `brightness(0) invert(1) blur(${blur}px)`;
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [isMobile]);

	return (
		<section
			className="trusted-by-section"
			style={{
				background: "#1c1c1c",
				color: "#fff",
				padding: "70px 24px",
				width: "100%",
			}}
		>
			<div
				style={{
					maxWidth: 1280,
					margin: "0 auto",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 56,
				}}
			>
				<motion.div
					initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
					whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
					viewport={{ once: true, amount: 0.4 }}
					transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: 28,
					}}
				>
					<h2
						style={{
							fontFamily: '"Inter Tight", sans-serif',
							fontWeight: 300,
							fontSize: "1rem",
							lineHeight: 1.4,
							color: "#fff",
							opacity: 0.6,
							textAlign: "center",
							maxWidth: 720,
							margin: 0,
						}}
					>
						Teams from top companies build with Lovable
					</h2>
				</motion.div>

				<motion.div
					ref={containerRef}
					className="trusted-by-track"
					initial={{ opacity: 0, filter: "blur(8px)" }}
					whileInView={{ opacity: 1, filter: "blur(0px)" }}
					viewport={{ once: true, amount: 0.4 }}
					transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
					style={{
						width: "100%",
						height: isMobile ? 110 : 140,
						position: "relative",
						overflow: "hidden",
						perspective: "1200px",
						perspectiveOrigin: "50% 50%",
						maskImage:
							"linear-gradient(90deg, transparent 0%, #000 20%, #000 80%, transparent 100%)",
						WebkitMaskImage:
							"linear-gradient(90deg, transparent 0%, #000 20%, #000 80%, transparent 100%)",
					}}
					onMouseEnter={() => {
						pausedRef.current = true;
					}}
					onMouseLeave={() => {
						pausedRef.current = false;
					}}
				>
					<div
						ref={trackRef}
						style={{
							display: "flex",
							alignItems: "center",
							gap: isMobile ? 56 : 88,
							width: "max-content",
							height: "100%",
							transformStyle: "preserve-3d",
							willChange: "transform",
						}}
					>
						{strip.map(({ file, key, idx }) => (
							<div
								key={key}
								ref={(el) => {
									if (el) slotRefs.current[idx] = el;
								}}
								style={{
									flex: "0 0 auto",
									height: isMobile ? 28 : 38,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									transformStyle: "preserve-3d",
									pointerEvents: "none",
								}}
							>
								<div
									ref={(el) => {
										if (el) innerRefs.current[idx] = el;
									}}
									style={{
										transformStyle: "preserve-3d",
										willChange: "transform, opacity, filter",
										transformOrigin: "center center",
									}}
								>
									<img
										src={vendorAsset(file)}
										alt=""
										draggable={false}
										style={{
											height: isMobile ? 28 : 38,
											width: "auto",
											display: "block",
											userSelect: "none",
										}}
										onLoad={measure}
									/>
								</div>
							</div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default SectionTrustedBy;
