import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import clockLamp from "@/assets/clock-lamp.png";
import doctorComputer from "@/assets/doctor-computer.png";
import pills from "@/assets/pills.png";
import waitlist from "@/assets/waitlist.png";
import {
	AnimatedHeading,
	AnimatedText,
	MaskedImage,
} from "@/components/AnimatedHeading";
import { Header } from "@/components/Header";
import { TeamCarousel } from "@/components/TeamCarousel";

const TT_HOVES = '"TT Hoves", "Helvetica Neue", Helvetica, Arial, sans-serif';

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	useEffect(() => {
		document.title = "Pelmatech - Your Personal Health Companion";
	}, []);

	return (
		<div className="bg-background text-foreground">
			<Header />
			<main>
				<Hero />
				<TeamSection />
				<BenefitsSection />
			</main>
		</div>
	);
}

function Hero() {
	return (
		<section className="relative h-screen min-h-[780px] w-full overflow-hidden">
			<img
				src={doctorComputer}
				alt="Doctor working at computer"
				className="absolute inset-0 w-full h-full object-cover"
			/>
			<div className="absolute inset-0 bg-black/25" />
			<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

			<div className="absolute inset-0 flex flex-col justify-end pb-16 px-8 md:px-12">
				<div className="pel-hero-row flex items-end justify-between gap-8">
					<div className="max-w-3xl">
						<AnimatedHeading
							as="h1"
							className="text-white font-medium leading-[1.05]"
						>
							<span
								className="pel-hero-title"
								style={{
									fontSize: "72.73px",
									lineHeight: 1.05,
									display: "block",
								}}
							>
								Your Personal
								<br />
								Health Companion
							</span>
						</AnimatedHeading>

						<div className="pel-hero-copy-wrap mt-8 w-max">
							<AnimatedText className="text-white/85 max-w-xl leading-relaxed">
								<span
									className="pel-hero-copy"
									style={{
										fontSize: "20.99px",
										lineHeight: "28.21px",
										display: "block",
										width: "608px",
									}}
								>
									Meet your personal online health companion, a comprehensive
									platform offering tools for tracking your fitness goals,
									monitoring your nutrition, and scheduling your workouts.
								</span>
							</AnimatedText>
						</div>
					</div>

					<div className="pel-hero-actions flex items-center gap-6 shrink-0 pb-1">
						<button
							type="button"
							className="bg-white text-foreground rounded-full pl-6 pr-2 py-2 flex items-center gap-3 font-medium text-sm hover:bg-white/90 transition"
						>
							Try for Free
							<span className="w-9 h-9 rounded-full bg-foreground text-white flex items-center justify-center">
								<ArrowUpRight className="w-4 h-4" />
							</span>
						</button>
						<a
							href="#"
							className="text-white flex items-center gap-1 text-sm font-medium"
						>
							Schedule Demo <ArrowUpRight className="w-4 h-4" />
						</a>
					</div>
				</div>

				<div
					className="pel-hero-footer mt-12 pt-5 border-t border-white/20 flex items-center justify-between tracking-[0.2em] text-white/70 uppercase"
					style={{ fontSize: "12px" }}
				>
					<span>Enterprise Management Applications</span>
					<span className="flex items-center gap-6">
						<span>
							<span className="text-white">01</span> / 04
						</span>
						<span>Next</span>
					</span>
					<span>Scroll to Explore</span>
				</div>
			</div>
		</section>
	);
}

function TeamSection() {
	return (
		<section className="py-32 px-8 md:px-12" style={{ fontFamily: TT_HOVES }}>
			<div className="pel-team-heading" style={{ paddingLeft: "335.26px" }}>
				<div
					className="mb-16 flex gap-24 tracking-[0.2em] uppercase text-muted-foreground"
					style={{ fontSize: "11.26px", fontFamily: TT_HOVES }}
				>
					<span>Pelmatech</span>
					<span>Our Team</span>
				</div>

				<AnimatedHeading className="font-medium leading-[1.05]">
					<span
						style={{
							fontSize: "58.55px",
							lineHeight: 1.05,
							display: "block",
							fontFamily: TT_HOVES,
						}}
					>
						Get to Know the People
						<br />
						that Get It All Done
					</span>
				</AnimatedHeading>
			</div>

			<div className="mt-20">
				<TeamCarousel
					intro={
						<AnimatedText className="text-muted-foreground leading-relaxed">
							<span
								style={{
									fontSize: "16.89px",
									lineHeight: 1.5,
									display: "block",
									width: "270px",
									fontFamily: TT_HOVES,
								}}
							>
								On our platform, our devoted team works ceaselessly to enhance
								our online presence and ensure the best possible customer
								experience.
							</span>
						</AnimatedText>
					}
				/>
			</div>
		</section>
	);
}

type Benefit = {
	num: string;
	title: string;
	desc: string;
	img: string;
	reversed: boolean;
};

const BENEFITS: Benefit[] = [
	{
		num: "01",
		title: "Unavailable",
		desc: "We understand that there may be times when a doctor is not available to assist you.",
		img: clockLamp,
		reversed: false,
	},
	{
		num: "02",
		title: "Unethical",
		desc: "When a doctor lacks integrity, they may prescribe medications for promotional purposes instead of the patient's actual needs, leading to serious consequences for health.",
		img: pills,
		reversed: true,
	},
	{
		num: "03",
		title: "Waitlist",
		desc: "Patients may experience long waiting times, sometimes for hours, before receiving assistance from the doctor.",
		img: waitlist,
		reversed: false,
	},
];

function BenefitsSection() {
	return (
		<section className="pel-benefits py-32 px-8 md:px-12 bg-surface">
			<div className="mb-24 grid grid-cols-12 gap-12">
				<div className="col-span-12 md:col-span-7">
					<AnimatedHeading className="text-5xl md:text-6xl font-medium leading-[1.05]">
						Explore the Benefits of
						<br />
						Our Platform
					</AnimatedHeading>
				</div>
				<div className="col-span-12 md:col-span-4 md:col-start-9 md:pt-4">
					<AnimatedText className="text-base text-muted-foreground leading-relaxed">
						By choosing an online platform over an offline one, artists can
						reach a global audience more easily, connect with fans worldwide,
						and shape the future of music in a dynamic way.
					</AnimatedText>
				</div>
			</div>

			<div
				className="relative grid grid-cols-1 md:grid-cols-3"
				style={{
					backgroundImage:
						"linear-gradient(to right, rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.45) 1px, transparent 1px)",
					backgroundSize: "1px 100%, 1px 100%",
					backgroundPosition: "33.3333% 0, 66.6666% 0",
					backgroundRepeat: "no-repeat",
				}}
			>
				<span
					aria-hidden
					className="pointer-events-none absolute left-0 right-0 top-0 h-px"
					style={{
						background:
							"linear-gradient(to right, transparent 0%, rgba(255,255,255,0.45) 15%, rgba(255,255,255,0.45) 85%, transparent 100%)",
					}}
				/>
				<span
					aria-hidden
					className="pointer-events-none absolute left-0 right-0 bottom-0 h-px"
					style={{
						background:
							"linear-gradient(to right, transparent 0%, rgba(255,255,255,0.45) 15%, rgba(255,255,255,0.45) 85%, transparent 100%)",
					}}
				/>

				{BENEFITS.map((b, i) => {
					const content = (
						<div>
							<div className="flex items-start gap-3 mb-4">
								<span className="text-xs text-muted-foreground mt-2">
									({b.num})
								</span>
								<AnimatedHeading
									as="h3"
									className="text-3xl font-medium"
									delay={i * 0.1}
								>
									{b.title}
								</AnimatedHeading>
							</div>
							<AnimatedText
								className="text-sm text-muted-foreground leading-relaxed max-w-sm"
								delay={0.2 + i * 0.1}
							>
								{b.desc}
							</AnimatedText>
						</div>
					);

					const image = (
						<div className="aspect-square overflow-hidden">
							<MaskedImage
								src={b.img}
								alt={b.title}
								className="w-full h-full"
								delay={i * 0.12}
							/>
						</div>
					);

					return (
						<div key={b.num} className="p-10 flex flex-col gap-8">
							{b.reversed ? (
								<>
									{image}
									<div className="mt-auto">{content}</div>
								</>
							) : (
								<>
									{content}
									<div className="mt-auto">{image}</div>
								</>
							)}
						</div>
					);
				})}
			</div>
		</section>
	);
}
