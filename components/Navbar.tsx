"use client"

import * as React from "react"
import Link from "next/link"
import { Rocket, Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ModeToggle } from "@/components/theme-toggle"
import { Separator } from "@/components/ui/separator"

const features = [
  {
    title: "Personalized Project Matching",
    href: "/features/feature-1",
    description: "Smart project recommendations",
  },
  {
    title: "Stay Updated, Stay Involved",
    href: "/features/feature-2",
    description: "Real-time updates on projects",
  },
  {
    title: "Celebrate Your Contributions",
    href: "/features/feature-3",
    description: "Certificates, Badges, and more",
  },
]

export default function Navbar() {
  return (
    <>
    <div>
    <nav className="flex items-center justify-between p-3 bg-background">
 
    <Link href="/">
      <div className="flex items-center space-x-2">
        <Rocket className="h-6 w-6" />
        <span className="text-lg font-bold">letsassist</span>
      </div>
    </Link>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-4 ml-auto">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <Rocket className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          letsassist
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Helping communities and volunteers connect
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  {features.map((feature) => (
                    <ListItem
                      key={feature.title}
                      title={feature.title}
                      href={feature.href}
                    >
                      {feature.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Button variant="ghost">Volunteering Near Me</Button>
        <Button variant="ghost">Connected Organizations</Button>
        </div>
        <div className="hidden sm:flex items-center space-x-4 ml-auto">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/signup">
          <Button>Sign Up</Button>
          </Link>
        </div>
        <div className="hidden sm:flex items-center space-x-4 ml-4 mr-4">
        <ModeToggle/>
        </div>

      {/* Mobile Navigation */}
      <Sheet>
      <div className="sm:hidden flex ml-auto mr-4">
            <ModeToggle />
        </div>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <nav className="flex flex-col space-y-4">
            <Button variant="ghost" className="justify-start">Volunteering Near Me</Button>
            <Button variant="ghost" className="justify-start">Connected Organizations</Button>
            <hr className="my-4" />
            <Link href="/login">
            <Button variant="ghost" className="justify-start">Login</Button>
            </Link>
            
            <Link href="/signup">
            <Button className="justify-start">Sign Up</Button>
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
    </div>
    <Separator />
    </>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"