import "~/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ConvexProvider } from "./ConvexProvider";

export const metadata: Metadata = {
	title: "Chat App - A proof of concept using Convex and Next.js",
	description: "A simple chat application built with Convex and Next.js.",
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html className={`${geist.variable}`} lang="en">
			<body>
				<ConvexProvider>{children}</ConvexProvider>
			</body>
		</html>
	);
}
