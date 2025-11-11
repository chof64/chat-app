import "~/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import { ConvexProvider } from "./convex-provider";

export const metadata: Metadata = {
  title: "Chat App - A proof of concept using Convex and Next.js",
  description: "A simple chat application built with Convex and Next.js.",
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const buildDate = new Date().toISOString().substring(0, 10).replace(/-/g, ".");

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${geist.variable}`} lang="en">
      <body className="flex min-h-screen flex-col">
        <div className="flex-1">
          <ConvexProvider>{children}</ConvexProvider>
        </div>
        <footer className="flex h-14 items-center justify-center text-center text-gray-500 text-xs">
          <span>
            <Link href="https://madebydev.com" target="_blank">
              madebydev.com
            </Link>{" "}
            - Version {buildDate}
          </span>
        </footer>
      </body>
    </html>
  );
}
