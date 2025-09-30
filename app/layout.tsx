import type React from "react";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Khand } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const khand = Khand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-khand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PM Internship Scheme - Government of India",
  description:
    "Prime Minister Internship Scheme for Youth - Ministry of Corporate Affairs, Government of India",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${manrope.variable} ${khand.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  );
}
