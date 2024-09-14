"use client"

import * as React from "react"
import Link from "next/link"
import { Rocket } from "lucide-react"

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

const features = [
  {
    title: "Feature 1",
    href: "/features/feature-1",
    description: "Description of Feature 1",
  },
  {
    title: "Feature 2",
    href: "/features/feature-2",
    description: "Description of Feature 2",
  },
  {
    title: "Feature 3",
    href: "/features/feature-3",
    description: "Description of Feature 3",
  },
]

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-background">
      <div className="flex items-center space-x-2">
        <Rocket className="h-6 w-6" />
        <span className="text-lg font-bold">letsassist</span>
      </div>
      
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
                        Empowering your business with intelligent assistance.
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

      <div className="flex items-center space-x-2">
        <Link href="/login">
        <Button variant="ghost">Login</Button>
        </Link>
        <Button>Sign Up</Button>
      </div>
    </nav>
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