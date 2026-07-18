import BackgroundVideo from "@/components/BackgroundVideo";
import LogoMarquee from "@/components/LogoMarquee";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const VIDEO_URL = `${import.meta.env.BASE_URL}assets/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4`;

export default function Index() {
	return (
		<div className="relative min-h-screen overflow-hidden bg-background">
			<BackgroundVideo src={VIDEO_URL} />

			<div className="relative z-10">
				<section className="relative flex min-h-screen flex-col overflow-visible">
					{/* Blurred plate that keeps the headline legible over the video */}
					<div
						className="pointer-events-none absolute left-1/2 top-1/2 h-[527px] w-[984px] -translate-x-1/2 -translate-y-1/2 bg-gray-950 opacity-90 blur-[82px]"
						aria-hidden="true"
					/>

					<Navbar />

					<div className="relative flex flex-1 items-center justify-center">
						<div className="flex flex-col items-center px-6 text-center">
							<h1
								className="animate-rise font-display text-[88px] font-normal leading-[1.02] tracking-[-0.024em] sm:text-[120px] md:text-[160px] lg:text-[200px] xl:text-[220px]"
								style={{ animationDelay: "0.1s" }}
							>
								<span className="text-foreground">Power </span>
								<span
									className="bg-clip-text text-transparent"
									style={{
										backgroundImage:
											"linear-gradient(to left, #6366f1, #a855f7, #fcd34d)",
									}}
								>
									AI
								</span>
							</h1>

							<p
								className="mt-[9px] max-w-md animate-rise text-lg leading-8 text-hero-sub opacity-80"
								style={{ animationDelay: "0.25s" }}
							>
								The most powerful AI ever deployed
								<br />
								in talent acquisition
							</p>

							<Button
								variant="heroSecondary"
								className="mt-[25px] animate-rise px-[29px] py-[24px] text-base"
								style={{ animationDelay: "0.35s" }}
							>
								Schedule a Consult
							</Button>
						</div>
					</div>

					<LogoMarquee />
				</section>
			</div>
		</div>
	);
}
