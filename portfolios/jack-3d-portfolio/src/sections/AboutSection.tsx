import AnimatedText from "../components/AnimatedText";
import ContactButton from "../components/ContactButton";
import FadeIn from "../components/FadeIn";

const ABOUT_TEXT =
	"With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let’s build something incredible together!";

const DECOR_IMAGES = [
	{
		src: "./assets/moon_icon.11395d36.png",
		position: "top-[4%] left-[1%] sm:left-[2%] md:left-[4%]",
		width: "w-[120px] sm:w-[160px] md:w-[210px]",
		delay: 0.1,
		x: -80,
	},
	{
		src: "./assets/p59_1.4659672e.png",
		position: "bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]",
		width: "w-[100px] sm:w-[140px] md:w-[180px]",
		delay: 0.25,
		x: -80,
	},
	{
		src: "./assets/lego_icon-1.703bb594.png",
		position: "top-[4%] right-[1%] sm:right-[2%] md:right-[4%]",
		width: "w-[120px] sm:w-[160px] md:w-[210px]",
		delay: 0.15,
		x: 80,
	},
	{
		src: "./assets/Group_134-1.2e04f3ce.png",
		position: "bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]",
		width: "w-[130px] sm:w-[170px] md:w-[220px]",
		delay: 0.3,
		x: 80,
	},
];

export default function AboutSection() {
	return (
		<section
			id="about"
			className="relative flex min-h-screen flex-col items-center justify-center px-5 py-20 sm:px-8 md:px-10"
		>
			{DECOR_IMAGES.map(({ src, position, width, delay, x }) => (
				<div key={src} className={`pointer-events-none absolute ${position}`}>
					<FadeIn delay={delay} x={x} y={0} duration={0.9}>
						<img
							src={src}
							alt=""
							loading="lazy"
							className={width}
							draggable={false}
						/>
					</FadeIn>
				</div>
			))}

			<div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
				<div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
					<FadeIn delay={0} y={40}>
						<h2
							className="hero-heading text-center font-black uppercase leading-none tracking-tight"
							style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
						>
							About me
						</h2>
					</FadeIn>
					<AnimatedText
						text={ABOUT_TEXT}
						className="max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]"
						style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
					/>
				</div>
				<FadeIn delay={0.15} y={20}>
					<ContactButton />
				</FadeIn>
			</div>
		</section>
	);
}
