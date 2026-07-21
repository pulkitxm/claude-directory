type Props = {
	src: string;
	className?: string;
};

export default function BoomerangVideoBg({ src, className }: Props) {
	return (
		<div className={className ?? "absolute inset-0 w-full h-full"}>
			<video
				src={src}
				className="w-full h-full object-cover"
				autoPlay
				loop
				muted
				playsInline
				preload="auto"
			/>
		</div>
	);
}
