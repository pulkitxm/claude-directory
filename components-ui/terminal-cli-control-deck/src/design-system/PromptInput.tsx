import { type InputHTMLAttributes, useId, useState } from "react";
export function PromptInput({
  prompt = "user@acme:~$",
  value,
  onChange,
  placeholder = "",
  label,
  tone = "primary",
  className = "",
  ...rest
}: {
  prompt?: string;
  value: string;
  onChange: (v: string) => void;
  label: string;
  tone?: "primary" | "secondary";
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "className">) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const promptColor = tone === "secondary" ? "text-secondary" : "text-primary";
  return <label htmlFor={id} className={`group/inp flex w-full cursor-text items-center gap-2 border-b border-dashed border-border py-1.5 text-sm transition-colors focus-within:border-primary ${className}`}>
			<span className={`shrink-0 font-bold ${promptColor} glow select-none`}>
				{prompt}
			</span>
			<span className="relative inline-flex min-w-0 flex-1 items-center">
				{}
				<span aria-hidden className="pointer-events-none flex min-w-0 items-center overflow-hidden whitespace-pre">
					<span className="truncate text-primary">
						{value || <span className="text-muted">{placeholder}</span>}
					</span>
					<span className={`ml-px inline-block translate-y-px text-primary ${focused ? "[animation:none] opacity-100" : "[animation:var(--animate-blink)]"}`}>
						█
					</span>
				</span>
				{}
				<input id={id} aria-label={label} value={value} onChange={e => onChange(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} className="absolute inset-0 w-full bg-transparent text-transparent caret-transparent outline-none" {...rest} />
			</span>
		</label>;
}
