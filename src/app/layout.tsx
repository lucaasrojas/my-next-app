import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidenav from "./ui/components/sidenav";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "My Marketplace",
	description: "Where I sell my stuff",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}
			>
				<div className="flex h-full">
					<div className="flex w-1/4">
						<Sidenav />
					</div>
					<main className="flex w-3/4">{children}</main>
				</div>
			</body>
		</html>
	);
}
