import { ArrowRight } from "lucide-react";

const NARRATIV_VIDEO =
	"./assets/hf_20260516_122702_390f5305-8719-41d5-ae80-d23ab3796c28.mp4";
const LUMINAR_VIDEO =
	"./assets/hf_20260516_123323_f909c2b8-ff6c-4edf-882b-8ebcdbe389b5.mp4";
function LinkIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden="true"
		>
			<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
			<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
		</svg>
	);
}

export default function CaseStudies() {
	return (
		<section className="bg-[#F5F5F5] pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">
			<div className="mx-auto max-w-[1440px]">
				<div className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12">
					<span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white sm:h-7 sm:w-7 sm:text-[12px]">
						2
					</span>
					<span className="rounded-full border border-gray-300 px-3 py-1 text-[12px] font-medium text-gray-900 sm:px-4 sm:py-1.5 sm:text-[13px]">
						Featured client work
					</span>
				</div>

				<div className="px-5 sm:px-8 lg:px-12">
					<h2 className="mb-10 text-[length:clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 sm:mb-14 sm:text-[length:clamp(2.5rem,5vw,4.2rem)] lg:mb-16">
						Our projects
					</h2>
				</div>

				<div className="grid grid-cols-1 gap-5 px-5 sm:gap-6 sm:px-8 md:grid-cols-2 lg:gap-7 lg:px-12">
					<article>
						<div className="group relative aspect-[329/246] cursor-pointer overflow-hidden rounded-2xl bg-[#1a1d2e]">
							<video
								src={NARRATIV_VIDEO}
								autoPlay
								muted
								loop
								playsInline
								className="h-full w-full object-cover"
							/>
							<div className="absolute bottom-4 left-4 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white transition-all duration-300 ease-in-out group-hover:w-[148px]">
								<span className="max-w-0 overflow-hidden whitespace-nowrap text-[13px] font-medium text-gray-900 opacity-0 transition-all delay-100 duration-300 ease-in-out group-hover:mr-2 group-hover:max-w-[110px] group-hover:opacity-100">
									Learn more
								</span>
								<LinkIcon className="shrink-0 -rotate-45 text-gray-900 transition-transform duration-300 ease-in-out group-hover:rotate-0" />
							</div>
						</div>
						<p className="mt-4 text-[13px] leading-relaxed text-gray-600 sm:text-[14px]">
							Winner of Site of the Month 2025 - an interactive 3D showcase
							driving record engagement
						</p>
						<h3 className="mt-1 text-[14px] font-semibold text-gray-900 sm:text-[15px]">
							Narrativ
						</h3>
					</article>

					<article>
						<div className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-[#6b6b6b]">
							<video
								src={LUMINAR_VIDEO}
								autoPlay
								muted
								loop
								playsInline
								className="h-full w-full object-cover"
							/>
							<div className="absolute bottom-4 left-4 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gray-900 transition-all duration-300 ease-in-out group-hover:w-[168px]">
								<span className="max-w-0 overflow-hidden whitespace-nowrap text-[13px] font-medium text-white opacity-0 transition-all delay-100 duration-300 ease-in-out group-hover:mr-2 group-hover:max-w-[120px] group-hover:opacity-100">
									View case study
								</span>
								<ArrowRight
									size={14}
									className="shrink-0 -rotate-45 text-white transition-transform duration-300 ease-in-out group-hover:rotate-0"
								/>
							</div>
						</div>
						<p className="mt-4 text-[13px] leading-relaxed text-gray-600 sm:text-[14px]">
							Transforming a dated platform into a conversion-focused brand
							experience
						</p>
						<h3 className="mt-1 text-[14px] font-semibold text-gray-900 sm:text-[15px]">
							Luminar
						</h3>
					</article>
				</div>
			</div>
		</section>
	);
}
