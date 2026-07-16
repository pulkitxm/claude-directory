import { SOCIALS } from "../socials";
import { assetUrl } from "../assets";

const HERO_VIDEO = assetUrl(
	"assets/hf_20260331_045634_e1c98c76-1265-4f5c-882a-4276f2080894.mp4",
);

const NAV_LINKS = [
	{ label: "Homepage", href: "#homepage" },
	{ label: "Gallery", href: "#gallery" },
	{ label: "Buy NFT", href: "#gallery" },
	{ label: "FAQ", href: "#about" },
	{ label: "Contact", href: "#contact" },
];

function SocialButton({ label, href, Icon }: (typeof SOCIALS)[number]) {
	return (
		<a
			href={href}
			aria-label={label}
			className="liquid-glass flex h-14 w-14 items-center justify-center rounded-[1rem] text-cream transition hover:bg-white/10"
		>
			<Icon className="h-5 w-5" strokeWidth={1.75} />
		</a>
	);
}

export default function Hero() {
	return (
		<section
			id="homepage"
			className="relative h-screen overflow-hidden rounded-b-[32px]"
		>
			<video
				className="absolute inset-0 h-full w-full object-cover"
				src={HERO_VIDEO}
				autoPlay
				loop
				muted
				playsInline
			/>

			<div className="relative z-10 mx-auto flex h-full max-w-[1831px] flex-col px-5 sm:px-8 lg:px-12">
				<header className="relative flex items-center justify-between pt-6 lg:pt-8">
					<a
						href="#homepage"
						className="font-grotesk text-[16px] uppercase tracking-wide text-cream"
					>
						Orbis.Nft
					</a>

					<nav className="liquid-glass absolute left-1/2 hidden -translate-x-1/2 rounded-[28px] px-[52px] py-[24px] lg:block">
						<ul className="flex items-center gap-10">
							{NAV_LINKS.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										className="font-grotesk text-[13px] uppercase tracking-wide text-cream transition-colors hover:text-neon"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</nav>

					<div className="hidden flex-col gap-3 lg:flex">
						{SOCIALS.map((social) => (
							<SocialButton key={social.label} {...social} />
						))}
					</div>
				</header>

				<div className="flex flex-1 flex-col items-start justify-center">
					<div className="relative lg:ml-32">
						<h1 className="max-w-[640px] font-grotesk text-[40px] uppercase leading-[1.05] text-cream sm:text-[60px] sm:leading-[1] md:text-[75px] lg:max-w-[780px] lg:text-[90px]">
							Beyond earth
							<br />
							and ( its ) familiar boundaries
						</h1>
						<span className="absolute -right-2 bottom-[18%] -rotate-1 font-condiment text-[24px] normal-case text-neon opacity-90 mix-blend-exclusion sm:-right-6 sm:text-[32px] md:text-[40px] lg:-right-16 lg:text-[48px]">
							Nft collection
						</span>
					</div>

					<div className="mt-10 flex w-full justify-center gap-4 lg:hidden">
						{SOCIALS.map((social) => (
							<SocialButton key={social.label} {...social} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
