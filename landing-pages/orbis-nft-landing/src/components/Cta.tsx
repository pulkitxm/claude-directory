import { SOCIALS } from "../socials";
import { assetUrl } from "../assets";

const CTA_VIDEO = assetUrl(
	"assets/hf_20260331_055729_72d66327-b59e-4ae9-bb70-de6ccb5ecdb0.mp4",
);

export default function Cta() {
	return (
		<section id="contact" className="relative overflow-hidden">
			<video
				className="block h-auto w-full"
				src={CTA_VIDEO}
				autoPlay
				loop
				muted
				playsInline
			/>

			<div className="absolute inset-0 flex items-center justify-end px-6 sm:px-10 lg:pl-[15%] lg:pr-[20%]">
				<div className="relative text-right">
					<span className="absolute -left-6 -top-4 -rotate-2 font-condiment text-[17px] normal-case text-neon mix-blend-exclusion sm:-left-12 sm:-top-8 sm:text-[34px] md:-left-20 md:text-[51px] lg:-left-28 lg:-top-12 lg:text-[68px]">
						Go beyond
					</span>
					<h2 className="font-grotesk text-[16px] uppercase leading-[1.15] text-cream sm:text-[30px] md:text-[45px] lg:text-[60px]">
						<span className="mb-4 block sm:mb-6 md:mb-8 lg:mb-12">
							Join us.
						</span>
						Reveal what&rsquo;s hidden.
						<br />
						Define what&rsquo;s next.
						<br />
						Follow the signal.
					</h2>
				</div>
			</div>

			<div className="liquid-glass absolute bottom-[12%] left-[8%] flex flex-col rounded-[0.5rem] sm:bottom-[14%] sm:rounded-[0.75rem] md:bottom-[16%] md:rounded-[1rem] lg:bottom-[20%] lg:rounded-[1.25rem]">
				{SOCIALS.map(({ label, href, Icon }, index) => (
					<a
						key={label}
						href={href}
						aria-label={label}
						className={`flex h-[10vw] w-[14vw] items-center justify-center text-cream transition hover:bg-white/10 sm:h-[4.5rem] sm:w-[14.375rem] md:h-[3.75rem] md:w-[10.78125rem] lg:h-[5.25rem] lg:w-[16.77rem] ${
							index < SOCIALS.length - 1 ? "border-b border-white/10" : ""
						}`}
					>
						<Icon
							className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6"
							strokeWidth={1.75}
						/>
					</a>
				))}
			</div>
		</section>
	);
}
