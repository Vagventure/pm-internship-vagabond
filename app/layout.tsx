
import type React from "react";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Khand } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";

// Your local login/register
import ChatbotEmbed from "@/components/chatbot";
// import {
//   ClerkProvider,
//   SignInButton,
//   SignUpButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs";

// Upstream session/auth
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/providers/session-provider";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // <SessionProvider>
      <html lang="en">
        <body className={`${manrope.variable} ${khand.variable}`}>
          <AuthProvider>
            {children}
            <Analytics />
            <Toaster />
          </AuthProvider>
        </body>
      </html>

  );
}