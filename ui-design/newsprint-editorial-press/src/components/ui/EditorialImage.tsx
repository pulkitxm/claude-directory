import { cn } from "@/lib/utils";

/**
 * Grayscale-by-default editorial plate with a printer's "Fig. x.x" caption.
 * Sits in a bordered frame; on hover the photo warms to sepia. A halftone
 * layer sits behind the image so even while it decodes you see print dots.
 */
export function EditorialImage({
	src,
	alt,
	fig,
	caption,
	className,
	imgClassName,
	loading = "lazy",
}: {
	src: string;
	alt: string;
	fig?: string;
	caption?: string;
	className?: string;
	imgClassName?: string;
	loading?: "lazy" | "eager";
}) {
	return (
		<figure className={cn("group/photo", className)}>
			<div className="relative overflow-hidden border border-ink bg-divider">
				<div aria-hidden className="halftone absolute inset-0 opacity-25" />
				<img
					src={src}
					alt={alt}
					loading={loading}
					decoding="async"
					className={cn(
						"editorial-photo relative block h-full w-full object-cover",
						imgClassName,
					)}
				/>
			</div>
			{(fig || caption) && (
				<figcaption className="mt-2 flex items-baseline gap-2 border-t border-ink/30 pt-2">
					{fig && (
						<span className="shrink-0 font-mono text-[0.65rem] uppercase tracking-widest text-ink">
							{fig}
						</span>
					)}
					{caption && (
						<span className="font-body text-xs italic leading-snug text-ink/65">
							{caption}
						</span>
					)}
				</figcaption>
			)}
		</figure>
	);
}
