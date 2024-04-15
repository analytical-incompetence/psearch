"use client"
import {
    Button, Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle
} from "@nextui-org/react";
import Link from "next/link";
import { ThemeSwitcher } from "./ui/ThemeSwitcher";
import { UserDropdown } from "./ui/user-dropdown";

export function Header({session}) {
    return (
        <Navbar isBordered>
            <NavbarContent>
                <NavbarMenuToggle
                    className="sm:hidden"
                />
                <NavbarBrand>
                    {/* <Link href="/"><Text color="secondary">pSearch</Text></Link> */}
                    <Link href="/" color="secondary" size="lg">pSearch</Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Button as={Link} color="secondary" href="/search" variant="flat">
                        Search
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="secondary" href="/history" variant="flat">
                        History
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <ThemeSwitcher/>
                </NavbarItem>
                <NavbarItem>
                    {session ? <UserDropdown session={session}/> : <Button as={Link} color="secondary" href="/api/auth/signin?callbackUrl=/search">Sign In</Button>}
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                <NavbarMenuItem key="search">
                    <Link
                        color="foreground"
                        className="w-full"
                        href="/search"
                        // size="lg"
                    >
                        Search
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem key="history">
                    <Link
                        color="foreground"
                        className="w-full"
                        href="/history"
                        // size="lg"
                    >
                        History
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
}

                    {/* <Dropdown>
                        <DropdownTrigger>
                        <Button 
                            variant="bordered" 
                        >
                            Open Menu
                        </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="new"></DropdownItem>

                        <DropdownItem key="delete" className="text-danger" color="danger">
                            Delete file
                        </DropdownItem>
                        </DropdownMenu>
                    </Dropdown> */}
                    {/* <Button as={Link} color="secondary"
href={session ? "/api/auth/signout?callbackUrl=/" : "/api/auth/signin?callbackUrl=/search"}
variant="flat">
{session ? "Sign Out" : "Sign In"}
</Button> */}