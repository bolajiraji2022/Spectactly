import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Spectacly — 3D property scanning",
  description:
    "Millimetre-accurate 3D capture converted into an interactive walkthrough anyone can explore from a browser. One engagement, one fee, yours to keep.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistSans.className} bg-[#050507] font-sans text-text antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
