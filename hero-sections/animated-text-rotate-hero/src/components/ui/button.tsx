import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline" | "ghost" | "secondary";
    size?: "default" | "sm" | "lg" | "icon";
};
const variants = {
    default: "bg-primary text-primary-foreground hover:opacity-90",
    outline: "border border-current/20 bg-transparent hover:bg-current/10",
    ghost: "bg-transparent hover:opacity-75",
    secondary: "bg-secondary text-secondary-foreground hover:opacity-80",
};
const sizes = { default: "min-h-10 px-5 py-2", sm: "min-h-9 px-3 py-1.5 text-sm", lg: "min-h-12 px-6 py-3", icon: "h-10 w-10 p-2" };
export function Button({ variant = "default", size = "default", type = "button", className, ...props }: ButtonProps) {
    return <button type={type} className={cn("relative inline-flex shrink-0 items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 disabled:opacity-50", variants[variant], sizes[size], className)} {...props}/>;
}
