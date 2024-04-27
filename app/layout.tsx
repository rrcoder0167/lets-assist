import * as React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NextUIProvider } from "@nextui-org/react";
import { Button as ButtonSCN, buttonVariants } from "@/components/ui/button";
import LetsAssistLogo from "@/components/logos/letsAssist";
import "./globals.css";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Contact, Proportions, SquareUser, Telescope, UserCog } from "lucide-react";
import { redirect } from "next/navigation";

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
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          {/* Navbar */}
          <Navbar shouldHideOnScroll className="bg-primary">
            <NavbarBrand>
              <ButtonSCN asChild>
                <Link href="/home">
                  <span className="w-7"><LetsAssistLogo /></span>
                  <span className="pl-3">Let&apos;s Assist</span>
                </Link>
              </ButtonSCN>
            </NavbarBrand>
            <NavbarContent justify="center">
              <NavbarItem>
                <ButtonSCN variant="default"><Proportions className="w-5 pr-1" /> Dashboard</ButtonSCN>
              </NavbarItem>
              <NavbarItem>
                <ButtonSCN><Telescope className="w-5 pr-1" />Discover</ButtonSCN>
              </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
              <NavbarItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <ButtonSCN><SquareUser className="w-5" /></ButtonSCN>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-25">
                    <DropdownMenuLabel>My Stuff</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <UserCog className="w-5 pr-1" />
                        <span>Account</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Contact className="w-5 pr-1" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavbarItem>
            </NavbarContent>
          </Navbar>
          {children}
        </NextUIProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
