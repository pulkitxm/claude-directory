import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Apex: Scroll Through Light",
  description: "An original abstract gradient film, scrubbed by scroll."
};
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="en">
			<body>{children}</body>
		</html>;
}
