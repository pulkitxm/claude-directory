import { ChevronRight } from "lucide-react";
import DashboardPreview from "./components/DashboardPreview";
import Navbar from "./components/Navbar";

const VIDEO_SRC =
	"./assets/hf_20260424_064411_9e9d7f84-9277-41f4-ab10-59172d89e6be.mp4";
const POSTER_SRC = "./assets/unsplash-photo-1557683316-973673baf926.jpg";

const legacyPlaysInlineAttrs = {
	"webkit-playsinline": "true",
	"x5-playsinline": "true",
};

export default function App() {
	return (
		<main
			className="min-h-screen w-full bg-[#ededed] p-3 sm:p-4"
			style={{ fontFamily: "'Inter', sans-serif" }}
		>
			<section className="relative h-[calc(100vh-24px)] w-full overflow-hidden rounded-2xl bg-[#d9d9d9] sm:h-[calc(100vh-32px)] sm:rounded-3xl">
				<video
					className="pointer-events-none absolute inset-0 h-full w-full object-cover"
					src={VIDEO_SRC}
					poster={POSTER_SRC}
					autoPlay
					loop
					muted
					playsInline
					preload="auto"
					disableRemotePlayback
					{...legacyPlaysInlineAttrs}
				/>
				<div className="absolute inset-0 bg-white/10" aria-hidden="true" />

				<div className="relative z-10">
					<Navbar />

					<div className="flex flex-col items-center px-4 pb-8 pt-10 text-center sm:pb-12 sm:pt-16">
						<span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[13px] shadow-sm">
							<span
								className="h-2 w-2 rounded-full bg-[#ef4d23]"
								aria-hidden="true"
							/>
							Convix Software
						</span>

						<h1
							className="mt-5 max-w-4xl text-neutral-900 sm:mt-6"
							style={{
								fontSize: "clamp(36px, 8vw, 72px)",
								lineHeight: 1.05,
								fontWeight: 500,
								letterSpacing: "-0.02em",
							}}
						>
							Shaping{" "}
							<span
								style={{
									fontFamily: "'Instrument Serif', serif",
									fontStyle: "italic",
									fontWeight: 400,
								}}
							>
								Agencies
							</span>
							<br />
							of tomorrow
						</h1>

						<p
							className="mt-4 px-2 text-neutral-700 sm:mt-6"
							style={{ fontSize: "clamp(13px, 3.5vw, 16px)" }}
						>
							The All-In-One Software Powering the Future of PR Agencies
						</p>

						<button
							type="button"
							className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#0b0f1a] py-2 pl-6 pr-2 text-[14px] font-medium text-white sm:mt-8 sm:py-2.5 sm:pl-7"
						>
							Get Started
							<span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 sm:h-7 sm:w-7">
								<ChevronRight className="h-4 w-4" strokeWidth={2} />
							</span>
						</button>
					</div>

					<DashboardPreview />
				</div>
			</section>
		</main>
	);
}
