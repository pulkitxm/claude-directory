import BottomNav from "./components/BottomNav";
import Button from "./components/Button";
import CopyrightBar from "./components/CopyrightBar";
import Footer from "./components/Footer";
import PartnerSection from "./components/PartnerSection";
import PricingSection from "./components/PricingSection";
import ProjectsSection from "./components/ProjectsSection";
import TestimonialCarousel from "./components/TestimonialCarousel";
import TestimonialSection from "./components/TestimonialSection";
import { useInViewAnimation } from "./hooks/useInViewAnimation";

const MARQUEE_IMAGES = [
	"./assets/hero-space-voyage-preview-eECLH3Yc.gif",
	"./assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif",
	"./assets/hero-velorah-preview-CJNTtbpd.gif",
	"./assets/hero-asme-preview-B_nGDnTP.gif",
	"./assets/hero-transform-data-preview-Cx5OU29N.gif",
	"./assets/hero-aethera-preview-DknSlcTa.gif",
	"./assets/hero-orbit-web3-preview-BXt4OttD.gif",
	"./assets/hero-nexora-preview-cx5HmUgo.gif",
];

const BOOK_URL = "https://halaskastudio.com/./book";

function Hero() {
	const { ref, animationClass } = useInViewAnimation<HTMLElement>();

	return (
		<section
			id="about"
			ref={ref}
			className="mx-auto w-full max-w-[440px] px-6 pt-12 md:pt-16"
		>
			<h1
				className={`mb-4 font-serif text-[32px] font-semibold tracking-tight text-[#051A24] md:text-[40px] lg:text-[44px] ${animationClass}`}
				style={{ animationDelay: "0.1s" }}
			>
				Viktor Oddy
			</h1>

			<p
				className={`mb-2 font-mono text-xs text-[#051A24] md:text-sm ${animationClass}`}
				style={{ animationDelay: "0.2s" }}
			>
				The creative studio of Viktor Oddy
			</p>

			<h2
				className={`whitespace-nowrap text-[32px] leading-[1.1] tracking-tight text-[#0D212C] md:text-[40px] lg:text-[44px] ${animationClass}`}
				style={{ animationDelay: "0.3s" }}
			>
				Build the <span className="font-serif">next wave</span>,
				<br />
				the <span className="font-serif">bold way.</span>
			</h2>

			<div
				className={`mt-5 flex flex-col gap-6 text-sm leading-relaxed text-[#051A24] md:mt-6 md:text-base ${animationClass}`}
				style={{ animationDelay: "0.4s" }}
			>
				<p>
					I spent seven years at Apple crafting products used by over a billion
					people. I founded Vortex Studio to bring that same level of thinking
					to innovators shaping what comes next.
				</p>
				<p>
					The studio is deliberately small. I guide the creative vision on every
					project, backed by a veteran design crew that moves fast without
					cutting corners.
				</p>
				<p>Projects start at $5,000 per month.</p>
			</div>

			<div
				className={`mt-5 flex flex-col gap-3 sm:flex-row md:mt-6 md:gap-4 ${animationClass}`}
				style={{ animationDelay: "0.5s" }}
			>
				<Button variant="primary" href={BOOK_URL}>
					Start a chat
				</Button>
				<Button variant="secondary" href="#work">
					View projects
				</Button>
			</div>
		</section>
	);
}

function Marquee() {
	return (
		<div className="mb-16 mt-16 w-full overflow-hidden md:mt-20">
			<div className="animate-marquee flex w-max">
				{[...MARQUEE_IMAGES, ...MARQUEE_IMAGES].map((src, i) => (
					<img
						key={i}
						src={src}
						alt=""
						aria-hidden={i >= MARQUEE_IMAGES.length}
						className="mx-3 h-[280px] w-auto rounded-2xl object-cover shadow-lg md:h-[500px]"
					/>
				))}
			</div>
		</div>
	);
}

export default function App() {
	return (
		<div id="top" className="min-h-screen bg-white pb-32">
			<Hero />
			<Marquee />
			<TestimonialSection />
			<PricingSection />
			<TestimonialCarousel />
			<ProjectsSection />
			<PartnerSection images={MARQUEE_IMAGES} />
			<Footer />
			<CopyrightBar />
			<BottomNav />
		</div>
	);
}
