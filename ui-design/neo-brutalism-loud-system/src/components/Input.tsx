import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { useId } from "react";

type FieldProps = {
	label: string;
	/** visually hide the label but keep it for screen readers */
	hideLabel?: boolean;
};

/* Shared field chrome: tall (h-16, >44px), thick black border, sharp corners,
   bold oversized text. The signature focus treatment is NOT a soft glow — the
   field floods YELLOW and gains a hard shadow. We do this via :focus-within on
   the wrapper-less input plus a peer-free utility, with the browser's default
   outline suppressed in favor of the color flood + shadow. */
const FIELD =
	"w-full rounded-none border-4 border-neo-ink bg-neo-white px-4 text-lg font-bold text-neo-ink placeholder:font-bold placeholder:text-black/40 transition-colors duration-100 ease-out focus:bg-neo-secondary focus:shadow-neo-sm focus:outline-none";

export function Input({
	label,
	hideLabel = false,
	id,
	className = "",
	...rest
}: InputHTMLAttributes<HTMLInputElement> & FieldProps) {
	const autoId = useId();
	const fieldId = id ?? autoId;
	return (
		<div className={className}>
			<label
				htmlFor={fieldId}
				className={
					hideLabel
						? "sr-only"
						: "mb-2 block text-xs font-bold uppercase tracking-widest text-neo-ink"
				}
			>
				{label}
			</label>
			<input id={fieldId} className={`h-16 ${FIELD}`} {...rest} />
		</div>
	);
}

export function Textarea({
	label,
	hideLabel = false,
	id,
	className = "",
	rows = 4,
	...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement> & FieldProps) {
	const autoId = useId();
	const fieldId = id ?? autoId;
	return (
		<div className={className}>
			<label
				htmlFor={fieldId}
				className={
					hideLabel
						? "sr-only"
						: "mb-2 block text-xs font-bold uppercase tracking-widest text-neo-ink"
				}
			>
				{label}
			</label>
			<textarea
				id={fieldId}
				rows={rows}
				className={`resize-none py-3 ${FIELD}`}
				{...rest}
			/>
		</div>
	);
}
