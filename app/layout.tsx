import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import React from 'react'
const inter = Inter({ subsets: ['latin'] })
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