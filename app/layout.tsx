import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { reckless } from "./fonts";
import Navbar from "@/src/component/navbar/Navbar";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Draconic Arena",
  description: "Draconic Arena trading interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${reckless.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="h-screen overflow-hidden bg-transparent">
        {/* Fixed background layer */}
        <div className="pointer-events-none fixed inset-0 -z-10 app-root-bg" />

        {/* App shell */}
        <div className="relative flex h-screen w-full flex-col overflow-hidden">
          {/* Fixed / sticky top navbar */}
          <Navbar />

          {/* Children area below navbar */}
          <main className="layout-main flex-1 overflow-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}