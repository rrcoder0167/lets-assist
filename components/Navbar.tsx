"use client";
import React from "react";
import LetsAssistLogo from "@/components/letsAssistLogo";
import { Navbar as NextNavbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import { Separator } from "@/components/ui/separator";
import { LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <>
    <NextNavbar onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll>
    <NavbarContent>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand>
        <LetsAssistLogo />
        <p className="font-bold text-inherit">Let&apos;s Assist</p>
      </NavbarBrand>
    </NavbarContent>

    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarItem isActive>
        <Link color="primary" href="/">
          Home
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="#features">
          Features
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="#pricing">
          Contact Us
        </Link>
      </NavbarItem>
    </NavbarContent>

    <NavbarContent justify="end">
      <NavbarItem>
        <Button as={Link} color="primary" href="#" variant="flat">
          Join the Waitlist
        </Button>
      </NavbarItem>
    </NavbarContent>

    <NavbarMenu>
      <NavbarMenuItem>
        <Link color="foreground" className="w-full" href="#" size="lg">
          Home
        </Link>
      </NavbarMenuItem>
      <NavbarMenuItem>
        <Link color="foreground" className="w-full" href="#" size="lg">
          Features
        </Link>
      </NavbarMenuItem>
      <NavbarMenuItem>
        <Link color="primary" className="w-full" href="#" size="lg">
          Pricing
        </Link>
      </NavbarMenuItem>
    </NavbarMenu>
  </NextNavbar>
  <Separator />
  </>
  );
}