import type { Metadata } from "next";
import { Archivo, Chivo_Mono } from "next/font/google";
import "./globals.css";

const display = Archivo({
	subsets: ["latin"],
	axes: ["wdth"],
	variable: "--font-display",
});

const mono = Chivo_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

export const metadata: Metadata = {
	title: "Apex — Zero to Two Hundred",
	description:
		"A five-second film, scrubbed by your scroll: zero to 200 km/h, through the rear wing, into an orange sunset.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${display.variable} ${mono.variable}`}>
			<body>{children}</body>
		</html>
	);
}
