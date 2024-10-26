import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Navbar from "@/components/Navbar"
import localFont from "next/font/local";


const overusedgrotesk = localFont({
  src: '../public/fonts/OverusedGrotesk-VF.woff2',
  display: 'swap',
  variable: '--font-overusedgrotesk',
})

const inter = Inter(
  { subsets: ["latin"],
    display: "swap",
    variable: "--font-inter" }
);

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${overusedgrotesk.variable} bg-background text-foreground`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
          <Navbar />
        {children}
        <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
