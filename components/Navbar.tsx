import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Contact, Proportions, SquareUser, Telescope, UserCog } from "lucide-react";
import { Button as ButtonSCN, buttonVariants } from "@/components/ui/button";
import LetsAssistLogo from "@/components/logos/letsAssist";
import { Link, Navbar as NextNavbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";

export default function Navbar() {
    return (
        <NextNavbar shouldHideOnScroll className="bg-primary">
            <NavbarBrand>
              <ButtonSCN asChild>
                <Link href="/">
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
          </NextNavbar>
    )
}