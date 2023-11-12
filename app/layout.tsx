import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import '../public/catppuccin-frappe.css';
import BootstrapJS from "../components/BootstrapJS";
import React from 'react';
import { GeistSans, GeistMono } from 'geist/font';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { NextAuthProvider } from "./providers";
import type { Metadata } from 'next';
import Navbar from '../components/Navbar';

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