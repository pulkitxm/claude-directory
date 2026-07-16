import {
	ArrowRight,
	Facebook,
	Instagram,
	Linkedin,
	Music2,
	Twitter,
	Youtube,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

const displayFont: CSSProperties = { fontFamily: "'Instrument Serif', serif" };

const VIDEOS = {
	hero: "./assets/hf_20260419_064822_f120e48a-d545-45dd-a02d-facb07829888.mp4",
	transform:
		"./assets/hf_20260419_065931_e3ca7b53-d32e-4ad5-81de-dc9d6fcfda6d.mp4",
	roadmap:
		"./assets/hf_20260417_110451_9f82b157-dc92-4a9f-a341-c25594ec20e1.mp4",
} as const;

const STEPS = [
	"Learn how to spot AI opportunities that boost productivity across roles and deliver visible results.",
	"Build structures that support your team so AI efficiencies multiply across the organization.",
	"Gain the skills to drive culture change like securing buy-in and reducing resistance.",
	"Get frameworks to deliver AI pilots that prove impact fast and build credibility with measurable results.",
];

const SOCIALS = [
	{ label: "Facebook", Icon: Facebook },
	{ label: "Twitter", Icon: Twitter },
	{ label: "Instagram", Icon: Instagram },
	{ label: "YouTube", Icon: Youtube },
	{ label: "LinkedIn", Icon: Linkedin },
	{ label: "TikTok", Icon: Music2 },
];

function Step({ number, children }: { number: number; children: ReactNode }) {
	return (
		<div className="flex items-start gap-5 mb-6 last:mb-0">
			<div className="flex-shrink-0 w-7 h-7 rounded-md bg-[#DCFF00] flex items-center justify-center text-[#0A0A0A] font-bold text-xs mt-1">
				{number}.
			</div>
			<p className="text-[17px] leading-[1.55] text-[#E8E8E8]">{children}</p>
		</div>
	);
}

function Divider() {
	return (
		<div className="py-8 flex justify-center">
			<div className="h-px w-24 bg-white/20" />
		</div>
	);
}

function PrimaryButton({ label }: { label: string }) {
	return (
		<a
			href="#"
			className="inline-flex items-center gap-3 bg-[#DCFF00] text-[#0A0A0A] font-bold rounded-lg px-6 py-3 hover:bg-[#c9ea00] hover:-translate-y-0.5 transition-all duration-200"
		>
			{label}
			<ArrowRight className="w-5 h-5" strokeWidth={2.5} />
		</a>
	);
}

function SolidButton({ label }: { label: string }) {
	return (
		<a
			href="#"
			className="inline-block bg-white text-[#0A0A0A] font-bold rounded-lg px-8 py-3 hover:bg-[#E8E8E8] hover:-translate-y-0.5 transition-all duration-200"
		>
			{label}
		</a>
	);
}

function VideoCard({ src }: { src: string }) {
	return (
		<div className="px-[42px] pb-10">
			<a href="#" className="block overflow-hidden rounded-[14px] group">
				<video
					src={src}
					autoPlay
					muted
					loop
					playsInline
					className="w-full h-[370px] object-cover rounded-[14px] transition-transform duration-700 group-hover:scale-[1.03]"
				/>
			</a>
		</div>
	);
}

function Hero() {
	return (
		<section
			className="relative w-full overflow-hidden"
			style={{ aspectRatio: "640 / 820" }}
		>
			<video
				src={VIDEOS.hero}
				autoPlay
				muted
				loop
				playsInline
				className="absolute inset-0 w-full h-full object-cover"
			/>
			<div
				className="absolute inset-0"
				style={{
					background:
						"linear-gradient(to bottom, rgba(17,17,17,0) 45%, rgba(17,17,17,0.45) 68%, rgba(17,17,17,0.9) 88%, rgba(17,17,17,1) 100%)",
				}}
			/>
			<div className="relative z-10 h-full flex flex-col items-center text-center px-6 pt-12 pb-10">
				<div className="text-white">
					<p
						className="text-[28px] leading-[0.95] tracking-tight"
						style={displayFont}
					>
						Design Rocket
					</p>
					<p className="text-[13px] tracking-[0.22em] font-medium mt-1">
						CERTIFICATES
					</p>
				</div>
				<p className="mt-40 text-white text-[13px] tracking-[0.28em] font-semibold">
					NOW AVAILABLE
				</p>
				<div className="flex-1" />
				<h1
					className="text-white text-[58px] leading-[1.02] tracking-tight max-w-[560px]"
					style={displayFont}
				>
					Learn to lead AI
					<br />
					and unlock new value
				</h1>
				<a
					href="#"
					className="mt-10 inline-flex items-center gap-3 bg-[#D8F90A] text-[#1E1E1E] font-semibold rounded-full px-8 py-4 hover:bg-[#c9ea00] hover:-translate-y-0.5 transition-all duration-200"
				>
					Enroll Now
					<ArrowRight className="w-5 h-5" strokeWidth={2.5} />
				</a>
			</div>
		</section>
	);
}

function IntroSection() {
	return (
		<section>
			<div className="px-[78px] pb-8 pt-4">
				<p className="text-center text-[18px] leading-[1.55]">
					Built in collaboration with Microsoft, this certificate course gives
					you the toolkit to lead AI transformation across your organization.
					Learn to spot opportunities, launch AI pilots, and scale adoption
					grounded in responsible practices and proven frameworks.
				</p>
			</div>
			<div className="flex justify-center pb-14">
				<PrimaryButton label="Get Started" />
			</div>
			<Divider />
		</section>
	);
}

function TransformSection() {
	return (
		<section>
			<div className="px-9 pb-8">
				<h2
					className="text-center text-[46px] leading-[1.05] tracking-tight"
					style={displayFont}
				>
					Transform how you lead with AI
				</h2>
			</div>
			<VideoCard src={VIDEOS.transform} />
			<div className="px-[76px] pb-10">
				<div className="max-w-[489px] mx-auto">
					{STEPS.map((step, i) => (
						<Step key={step} number={i + 1}>
							{step}
						</Step>
					))}
				</div>
			</div>
			<div className="flex justify-center pb-14">
				<SolidButton label="Enroll Now" />
			</div>
			<Divider />
		</section>
	);
}

function RoadmapSection() {
	return (
		<section>
			<div className="pb-7 px-9">
				<h2
					className="text-center text-[46px] leading-[1.05] tracking-tight"
					style={displayFont}
				>
					Build your AI
					<br />
					transformation roadmap
				</h2>
			</div>
			<VideoCard src={VIDEOS.roadmap} />
			<div className="px-[78px] pb-8">
				<p className="text-center text-[18px] leading-[1.55]">
					You'll finish this hands-on course with a personal AI Transformation
					Plan: your playbook for pilot proposals, data strategy and governance.
					Use it to help secure buy-in, guide rollout, and scale adoption
					responsibly.
				</p>
			</div>
			<div className="flex justify-center pb-14">
				<SolidButton label="Learn More" />
			</div>
		</section>
	);
}

function LimeCtaSection() {
	return (
		<section className="px-14 pb-12">
			<div className="bg-[#D8F90A] rounded-[10px] px-8 py-12 text-center">
				<h2
					className="text-[#1E1E1E] text-[52px] leading-[1.02] tracking-tight mb-3"
					style={displayFont}
				>
					Ready to lead AI
					<br />
					at work?
				</h2>
				<p className="text-[#1E1E1E] text-[18px] leading-[1.5] mb-8 px-4">
					Enroll now and be the leader your team has been waiting for.
				</p>
				<PrimaryButton label="Enroll Now" />
			</div>
		</section>
	);
}

function Footer() {
	return (
		<footer className="bg-[#080808] text-white pt-12 px-10 text-center border-t border-white/5">
			<div className="pb-8 flex justify-center">
				<a
					href="#"
					className="text-[30px] font-bold tracking-tight text-white hover:text-[#DCFF00] transition-colors"
				>
					Design Rocket
				</a>
			</div>
			<p className="text-[12px] text-[#83837D] leading-[1.5] pb-8">
				Microsoft is a collaborator on this specific course. Microsoft does not
				endorse
				<br />
				Design Rocket generally or other Design Rocket products.
			</p>
			<div className="flex justify-center pb-8">
				<div className="h-px w-24 bg-white/20" />
			</div>
			<div className="flex justify-center gap-5 pb-5">
				{SOCIALS.map(({ label, Icon }) => (
					<a
						key={label}
						href="#"
						aria-label={label}
						className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#1E1E1E] hover:border-white transition-colors"
					>
						<Icon className="w-[18px] h-[18px]" />
					</a>
				))}
			</div>
			<p className="text-[10px] text-[#83837D] pb-4 leading-[1.6]">
				If you no longer want to receive updates on Design Rocket Certificates,
				<br />
				you can unsubscribe at any time by clicking "unsubscribe" below.
			</p>
			<div className="text-[12px] pb-3 space-x-2">
				<a href="#" className="hover:underline">
					Support
				</a>
				<span className="text-[#8F8E88]">|</span>
				<a href="#" className="hover:underline">
					Privacy
				</a>
				<span className="text-[#8F8E88]">|</span>
				<a href="#" className="hover:underline">
					Terms
				</a>
				<span className="text-[#8F8E88]">|</span>
				<a href="#" className="hover:underline">
					Unsubscribe
				</a>
			</div>
			<a
				href="#"
				className="text-[12px] text-white/80 hover:text-white inline-block"
			>
				©2026 Design Rocket, 660 4th Street #443, San Francisco, CA 94107 USA
			</a>
			<div className="pb-10" />
		</footer>
	);
}

export default function App() {
	return (
		<div className="min-h-screen bg-[#050505] py-10 px-4 font-sans">
			<div className="max-w-[640px] mx-auto shadow-2xl overflow-hidden ring-1 ring-white/5">
				<main className="bg-[#111111] text-[#F2F2F2]">
					<Hero />
					<IntroSection />
					<TransformSection />
					<RoadmapSection />
					<LimeCtaSection />
				</main>
				<Footer />
			</div>
		</div>
	);
}
