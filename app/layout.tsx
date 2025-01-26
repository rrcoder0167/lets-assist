// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from 'next-themes'
import { SpeedInsights } from "@vercel/speed-insights/next"
import Navbar from "@/components/Navbar"
import localFont from "next/font/local";
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const overusedgrotesk = localFont({
  src: '../public/fonts/OverusedGrotesk-VF.woff2',
  display: 'swap',
  variable: '--font-overusedgrotesk',
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();

  // Create Supabase server client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  // Fetch user on the server
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${overusedgrotesk.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="bg-background text-foreground">
            {/* Pass server-fetched user to Navbar */}
            <Navbar initialUser={user} />
            <main className="p-4">
              {children}
            </main>
            <SpeedInsights />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}