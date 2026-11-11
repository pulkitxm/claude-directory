
import type { CSSProperties } from "react";
import { palette } from "./tokens.ts";

type ShapeProps = {
	className?: string;
	style?: CSSProperties;
	color?: string;

	float?: false | "float" | "slow";
	rotate?: number;
};

const floatClass = (f: ShapeProps["float"]) =>
	f === "float" ? "animate-float" : f === "slow" ? "animate-float-slow" : "";


function wrapRot(
	float: ShapeProps["float"],
	rotate: number | undefined,
): CSSProperties {
	if (rotate == null) return {};
	if (float)
		return { ["--float-rot" as string]: `${rotate}deg` } as CSSProperties;
	return { transform: `rotate(${rotate}deg)` };
}


function floatVar(
	float: ShapeProps["float"],
	rotate: number | undefined,
): CSSProperties {
	return float && rotate != null
		? ({ ["--float-rot" as string]: `${rotate}deg` } as CSSProperties)
		: {};
}

export function Circle({
	className,
	style,
	color = palette.tertiary,
	float = false,
	rotate,
}: ShapeProps) {
	return (
		<span
			aria-hidden="true"
			className={`pointer-events-none absolute block rounded-full border-2 border-foreground ${floatClass(float)} ${className ?? ""}`}
			style={{ background: color, ...wrapRot(float, rotate), ...style }}
		/>
	);
}

export function Square({
	className,
	style,
	color = palette.secondary,
	float = false,
	rotate = 12,
}: ShapeProps) {
	return (
		<span
			aria-hidden="true"
			className={`pointer-events-none absolute block rounded-[8px] border-2 border-foreground ${floatClass(float)} ${className ?? ""}`}
			style={{ background: color, ...wrapRot(float, rotate), ...style }}
		/>
	);
}

export function Pill({
	className,
	style,
	color = palette.accent,
	float = false,
	rotate = -18,
}: ShapeProps) {
	return (
		<span
			aria-hidden="true"
			className={`pointer-events-none absolute block rounded-full border-2 border-foreground ${floatClass(float)} ${className ?? ""}`}
			style={{ background: color, ...wrapRot(float, rotate), ...style }}
		/>
	);
}

export function Triangle({
	className,
	style,
	color = palette.quaternary,
	float = false,
	rotate = 0,
	size = 44,
}: ShapeProps & { size?: number }) {
	return (
		<span
			aria-hidden="true"
			className={`pointer-events-none absolute block ${floatClass(float)} ${className ?? ""}`}
			style={{ ...floatVar(float, rotate), ...style }}
		>
			<svg
				width={size}
				height={size}
				viewBox="0 0 48 48"
				fill="none"
				style={{ transform: `rotate(${rotate}deg)` }}
			>
				<path
					d="M24 5 45 42H3L24 5Z"
					fill={color}
					stroke={palette.foreground}
					strokeWidth="3"
					strokeLinejoin="round"
				/>
			</svg>
		</span>
	);
}


export function Plus({
	className,
	style,
	color = palette.accent,
	float = false,
	rotate = 0,
	size = 40,
}: ShapeProps & { size?: number }) {
	return (
		<span
			aria-hidden="true"
			className={`pointer-events-none absolute block ${floatClass(float)} ${className ?? ""}`}
			style={{ ...floatVar(float, rotate), ...style }}
		>
			<svg
				width={size}
				height={size}
				viewBox="0 0 40 40"
				fill="none"
				style={{ transform: `rotate(${rotate}deg)` }}
			>
				<path
					d="M20 4v32M4 20h32"
					stroke={color}
					strokeWidth="6"
					strokeLinecap="round"
				/>
			</svg>
		</span>
	);
}


export function Ring({
	className,
	style,
	color = palette.secondary,
	float = false,
	rotate,
	size = 40,
}: ShapeProps & { size?: number }) {
	return (
		<span
			aria-hidden="true"
			className={`pointer-events-none absolute block ${floatClass(float)} ${className ?? ""}`}
			style={{ ...floatVar(float, rotate), ...style }}
		>
			<svg
				width={size}
				height={size}
				viewBox="0 0 40 40"
				fill="none"
				style={
					rotate != null ? { transform: `rotate(${rotate}deg)` } : undefined
				}
			>
				<circle cx="20" cy="20" r="15" stroke={color} strokeWidth="5" />
			</svg>
		</span>
	);
}


export function Squig({
	className,
	style,
	color = palette.quaternary,
	rotate = 0,
	size = 64,
}: ShapeProps & { size?: number }) {
	return (
		<span
			aria-hidden="true"
			className={`pointer-events-none absolute block ${className ?? ""}`}
			style={{ transform: `rotate(${rotate}deg)`, ...style }}
		>
			<svg
				width={size}
				height={(size / 64) * 24}
				viewBox="0 0 64 24"
				fill="none"
			>
				<path
					d="M2 12C8 2 12 22 18 12S28 2 34 12s8 10 14 0 8-10 14 0"
					stroke={color}
					strokeWidth="5"
					strokeLinecap="round"
				/>
			</svg>
		</span>
	);
}
