import ContactButton from "../components/ContactButton";
import FadeIn from "../components/FadeIn";
import Magnet from "../components/Magnet";

const PORTRAIT_URL = "./assets/Rectangle_40443.81459862.png";

const NAV_LINKS = [
	{ label: "About", href: "#about" },
	{ label: "Price", href: "#price" },
	{ label: "Projects", href: "#projects" },
	{ label: "Contact", href: "mailto:hello@jack.studio" },
];

export default function HeroSection() {
	return (
		<section
			className="relative flex h-screen flex-col"
			style={{ overflowX: "clip" }}
		>
			<FadeIn
				as="nav"
				delay={0}
				y={-20}
				className="flex items-center justify-between px-6 pt-6 md:px-10 md:pt-8"
			>
				{NAV_LINKS.map(({ label, href }) => (
					<a
						key={label}
						href={href}
						className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
					>
						{label}
					</a>
				))}
			</FadeIn>

			<div className="overflow-hidden">
				<FadeIn delay={0.15} y={40}>
					<h1 className="hero-heading mt-6 w-full whitespace-nowrap text-center text-[14vw] font-black uppercase leading-none tracking-tight sm:mt-4 sm:text-[15vw] md:-mt-5 md:text-[16vw] lg:text-[17.5vw]">
						Hi, i&apos;m jack
					</h1>
				</FadeIn>
			</div>

			<div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:translate-y-0">
				<FadeIn delay={0.6} y={30}>
					<Magnet
						padding={150}
						strength={3}
						activeTransition="transform 0.3s ease-out"
						inactiveTransition="transform 0.6s ease-in-out"
					>
						<img
							src={PORTRAIT_URL}
							alt="Portrait of Jack, 3D creator"
							className="pointer-events-none w-[280px] select-none sm:w-[360px] md:w-[440px] lg:w-[520px]"
							draggable={false}
						/>
					</Magnet>
				</FadeIn>
			</div>

			<div className="mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
				<FadeIn delay={0.35} y={20}>
					<p
						className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]"
						style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
					>
						a 3d creator driven by crafting striking and unforgettable projects
					</p>
				</FadeIn>
				<FadeIn delay={0.5} y={20} className="relative z-20">
					<ContactButton />
				</FadeIn>
			</div>
		</section>
	);
}
