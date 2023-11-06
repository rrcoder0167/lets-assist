import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import React from 'react';
import { GeistSans, GeistMono } from 'geist/font';
import BootstrapJS from "@/components/bootstrapJS";
//import Navbar from '@/components/navbar'; once we figure out the login, we do this

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
        <BootstrapJS />
        {children}
      </body>
    </html>
  );
}