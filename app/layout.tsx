import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
const inter = Inter({ subsets: ['latin'] })
import "bootstrap/dist/css/bootstrap.min.css";
import ImportBsJS from "@/components/importBsJs";

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
    <html lang="en">
      <body>
        <ImportBsJS />
        <div>{children}</div>
      </body>
    </html>
  );
}