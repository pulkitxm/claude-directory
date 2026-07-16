import type { MotionValue } from "framer-motion";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import FadeIn from "../components/FadeIn";
import LiveProjectButton from "../components/LiveProjectButton";

interface Project {
	number: string;
	name: string;
	category: string;
	col1: [string, string];
	col2: string;
}

const PROJECTS: Project[] = [
	{
		number: "01",
		name: "Nextlevel Studio",
		category: "Client",
		col1: [
			"./assets/hf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.webp",
			"./assets/hf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.webp",
		],
		col2: "./assets/hf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.webp",
	},
	{
		number: "02",
		name: "Aura Brand Identity",
		category: "Personal",
		col1: [
			"./assets/hf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.webp",
			"./assets/hf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.webp",
		],
		col2: "./assets/hf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.webp",
	},
	{
		number: "03",
		name: "Solaris Digital",
		category: "Client",
		col1: [
			"./assets/hf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.webp",
			"./assets/hf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.webp",
		],
		col2: "./assets/hf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.webp",
	},
];

const CARD_RADIUS = "rounded-[40px] sm:rounded-[50px] md:rounded-[60px]";

function ProjectCard({
	project,
	index,
	total,
	progress,
}: {
	project: Project;
	index: number;
	total: number;
	progress: MotionValue<number>;
}) {
	const targetScale = 1 - (total - 1 - index) * 0.03;
	const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

	return (
		<div className="h-[85vh]">
			<div className="sticky top-24 md:top-32">
				<motion.div
					className={`${CARD_RADIUS} border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8`}
					style={{
						scale,
						top: `${index * 28}px`,
						position: "relative",
						transformOrigin: "top center",
					}}
				>
					<div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 px-2 pb-4 sm:px-4 sm:pb-6 md:px-6 md:pb-8">
						<div className="flex items-center gap-4 sm:gap-6 md:gap-8">
							<span
								className="hero-heading font-black leading-none"
								style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
							>
								{project.number}
							</span>
							<div className="flex flex-col gap-1">
								<span
									className="font-light uppercase tracking-widest text-[#D7E2EA]"
									style={{
										fontSize: "clamp(0.7rem, 1.2vw, 1rem)",
										opacity: 0.6,
									}}
								>
									{project.category}
								</span>
								<h3
									className="font-medium uppercase leading-tight text-[#D7E2EA]"
									style={{ fontSize: "clamp(1.1rem, 2.4vw, 2.2rem)" }}
								>
									{project.name}
								</h3>
							</div>
						</div>
						<LiveProjectButton />
					</div>

					<div className="flex gap-3 sm:gap-4">
						<div className="flex w-[40%] flex-col gap-3 sm:gap-4">
							<img
								src={project.col1[0]}
								alt={`${project.name} — visual 1`}
								loading="lazy"
								className={`${CARD_RADIUS} w-full object-cover`}
								style={{ height: "clamp(130px, 16vw, 230px)" }}
							/>
							<img
								src={project.col1[1]}
								alt={`${project.name} — visual 2`}
								loading="lazy"
								className={`${CARD_RADIUS} w-full object-cover`}
								style={{ height: "clamp(160px, 22vw, 340px)" }}
							/>
						</div>
						<div className="w-[60%]">
							<img
								src={project.col2}
								alt={`${project.name} — visual 3`}
								loading="lazy"
								className={`${CARD_RADIUS} h-full w-full object-cover`}
							/>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}

export default function ProjectsSection() {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	return (
		<section
			id="projects"
			className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-16 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10"
		>
			<FadeIn delay={0} y={40}>
				<h2
					className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
					style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
				>
					Project
				</h2>
			</FadeIn>

			<div ref={containerRef} className="mx-auto max-w-7xl">
				{PROJECTS.map((project, i) => (
					<ProjectCard
						key={project.number}
						project={project}
						index={i}
						total={PROJECTS.length}
						progress={scrollYProgress}
					/>
				))}
			</div>
		</section>
	);
}
