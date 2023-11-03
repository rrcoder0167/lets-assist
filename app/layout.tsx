import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import React from 'react';
import { GeistSans, GeistMono } from 'geist/font';
const inter = Inter({ subsets: ['latin'] });
import bootstrapJS from "@/components/bootstrapJS";

export const metadata: Metadata = {
  title: "Let's Assist",
  description: 'Volunteering for everyone',
}

export default function RootLayout({
  children,
}: {
children: React.ReactNode;}) {
  return (
    <html lang="en" className={`${GeistSans.className} ${GeistMono.className}`}>
      <body className = {GeistSans.className}>
        <bootstrapJS/>
        {children}
      </body>
    </html>
  );
}