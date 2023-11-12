import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import '../public/catppuccin-frappe.css';
import BootstrapJS from '@/components/BootstrapJS';
import React from 'react';
import { GeistSans, GeistMono } from 'geist/font';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Script from 'next/script'
import { NextAuthProvider } from "./providers";
import type { Metadata } from 'next';
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Let's Assist",
  description: 'Volunteering for everyone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.className} ${GeistMono.className}`}>
      <head>
        <Script src="https://kit.fontawesome.com/3e19042953.js" crossOrigin="anonymous"></Script>
      </head>
      <body className={GeistSans.className}>
        <NextAuthProvider>
          <BootstrapJS />
          <Navbar />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}