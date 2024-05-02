import * as React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SpeedInsights } from "@vercel/speed-insights/next"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Let's Assist",
  description: "A Handy-Dandy Volunteering Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <SpeedInsights />
      <body className={inter.className}>
        <NextUIProvider>
          <Navbar />
          <div className="bg-secondary">
            {children}
          </div>
        </NextUIProvider>
      </body>
    </html>
  );
}
