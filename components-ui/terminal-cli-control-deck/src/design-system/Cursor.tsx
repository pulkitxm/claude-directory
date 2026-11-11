export function Cursor({
  char = "█",
  className = ""
}: {
  char?: string;
  className?: string;
}) {
  return <span aria-hidden="true" className={`inline-block [animation:var(--animate-blink)] text-primary glow ${className}`}>
			{char}
		</span>;
}
