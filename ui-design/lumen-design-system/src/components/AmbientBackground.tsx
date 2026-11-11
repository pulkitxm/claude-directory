import { usePrefersReducedMotion } from "../hooks/useReducedMotion";

// Inline SVG fractal-noise texture (data URI) ,  keeps the project self-contained.
const NOISE_URI =
	"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";


export function AmbientBackground() {
	const reduced = usePrefersReducedMotion();
	const floatA = reduced ? "" : "animate-float-a";
	const floatB = reduced ? "" : "animate-float-b";
	const floatC = reduced ? "" : "animate-float-c";
	const pulse = reduced ? "" : "animate-pulse-glow";

	return (
		<div
			aria-hidden
			className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
		>
			{}
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0a0a0f_0%,#050506_50%,#020203_100%)]" />

			{}
			<div
				className={`absolute -top-[28rem] left-1/2 h-[44rem] w-[58rem] -translate-x-1/2 rounded-full blur-[150px] ${floatA}`}
				style={{
					background:
						"radial-gradient(circle, rgba(94,106,210,0.30) 0%, rgba(94,106,210,0.06) 45%, transparent 70%)",
				}}
			/>
			<div
				className={`absolute top-[14rem] -left-40 h-[34rem] w-[26rem] rounded-full blur-[120px] ${floatB}`}
				style={{
					background:
						"radial-gradient(circle, rgba(168,85,247,0.16) 0%, rgba(236,72,153,0.08) 50%, transparent 72%)",
				}}
			/>
			<div
				className={`absolute top-[34rem] -right-32 h-[30rem] w-[22rem] rounded-full blur-[110px] ${floatC}`}
				style={{
					background:
						"radial-gradient(circle, rgba(59,130,246,0.14) 0%, rgba(94,106,210,0.08) 50%, transparent 72%)",
				}}
			/>
			<div
				className={`absolute bottom-[-10rem] left-1/3 h-[36rem] w-[40rem] -translate-x-1/2 rounded-full blur-[150px] ${pulse}`}
				style={{
					background:
						"radial-gradient(circle, rgba(94,106,210,0.12) 0%, transparent 68%)",
				}}
			/>

			{}
			<div className="bg-grid absolute inset-0 opacity-[0.02] [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_85%)]" />

			{}
			<div
				className="absolute inset-0 opacity-[0.015] mix-blend-soft-light"
				style={{ backgroundImage: NOISE_URI, backgroundSize: "200px 200px" }}
			/>

			{}
			<div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-bg-deep to-transparent" />
		</div>
	);
}
