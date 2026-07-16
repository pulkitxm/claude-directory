import { useEffect, useRef } from "react";

const MARQUEE_IMAGES = [
	"./assets/hero-space-voyage-preview-eECLH3Yc.gif",
	"./assets/hero-codenest-preview-Cgppc2qV.gif",
	"./assets/hero-vex-ventures-preview-BczMFIiw.gif",
	"./assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
	"./assets/hero-asme-preview-B_nGDnTP.gif",
	"./assets/hero-transform-data-preview-Cx5OU29N.gif",
	"./assets/hero-vitara-preview-Cjz2QYyU.gif",
	"./assets/hero-terra-preview-BFjrCr7T.gif",
	"./assets/hero-skyelite-preview-DHaZIgUv.gif",
	"./assets/hero-aethera-preview-DknSlcTa.gif",
	"./assets/hero-designpro-preview-D8c5_een.gif",
	"./assets/hero-stellar-ai-preview-D3HL6bw1.gif",
	"./assets/hero-xportfolio-preview-D4A8maiC.gif",
	"./assets/hero-orbit-web3-preview-BXt4OttD.gif",
	"./assets/hero-nexora-preview-cx5HmUgo.gif",
	"./assets/hero-evr-ventures-preview-DZxeVFEX.gif",
	"./assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
	"./assets/hero-new-era-preview-CocuDUm9.gif",
	"./assets/hero-wealth-preview-B70idl_u.gif",
	"./assets/hero-luminex-preview-CxOP7ce6.gif",
	"./assets/hero-celestia-preview-0yO3jXO8.gif",
];

const ROW_ONE = MARQUEE_IMAGES.slice(0, 11);
const ROW_TWO = MARQUEE_IMAGES.slice(11);

const rowTransform = (offsetPx: number) =>
	`translateX(calc(-33.3333% + ${offsetPx}px))`;

function MarqueeRow({
	images,
	rowRef,
	initialOffset,
}: {
	images: string[];
	rowRef: React.RefObject<HTMLDivElement>;
	initialOffset: number;
}) {
	const tripled = [...images, ...images, ...images];
	return (
		<div
			ref={rowRef}
			className="flex w-max gap-3"
			style={{
				transform: rowTransform(initialOffset),
				willChange: "transform",
			}}
		>
			{tripled.map((src, i) => (
				<img
					key={`${i}-${src}`}
					src={src}
					alt=""
					className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover"
				/>
			))}
		</div>
	);
}

export default function MarqueeSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const rowOneRef = useRef<HTMLDivElement>(null);
	const rowTwoRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const update = () => {
			const section = sectionRef.current;
			const rowOne = rowOneRef.current;
			const rowTwo = rowTwoRef.current;
			if (!section || !rowOne || !rowTwo) return;

			const offset =
				(window.scrollY - section.offsetTop + window.innerHeight) * 0.3;
			rowOne.style.transform = rowTransform(offset - 200);
			rowTwo.style.transform = rowTransform(-(offset - 200));
		};

		update();
		window.addEventListener("scroll", update, { passive: true });
		window.addEventListener("resize", update);
		return () => {
			window.removeEventListener("scroll", update);
			window.removeEventListener("resize", update);
		};
	}, []);

	return (
		<section
			ref={sectionRef}
			className="flex flex-col gap-3 bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40"
		>
			<MarqueeRow images={ROW_ONE} rowRef={rowOneRef} initialOffset={-200} />
			<MarqueeRow images={ROW_TWO} rowRef={rowTwoRef} initialOffset={200} />
		</section>
	);
}
