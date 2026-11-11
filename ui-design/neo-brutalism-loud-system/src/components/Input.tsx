import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { useId } from "react";

type FieldProps = {
	label: string;

	hideLabel?: boolean;
};


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
