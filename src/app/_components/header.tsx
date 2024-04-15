"use client"
import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle
} from "@nextui-org/react";
import Link from "next/link";
import {ThemeSwitcher} from "./ui/ThemeSwitcher";
import {UserDropdown} from "./ui/user-dropdown";
import {type SessionProps} from "@/utils/sessionProps"

export function Header({session}: SessionProps) {
    return (
        <Navbar isBordered>
            <NavbarContent>
                <NavbarMenuToggle
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link href="/" color="secondary">pSearch</Link>
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
                    {session ? <UserDropdown session={session}/> :
                        <Button as={Link} color="secondary" href="/api/auth/signin?callbackUrl=/search">Sign
                            In</Button>}
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                <NavbarMenuItem key="search">
                    <Link
                        color="foreground"
                        className="w-full"
                        href="/search"
                    >
                        Search
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem key="history">
                    <Link
                        color="foreground"
                        className="w-full"
                        href="/history"
                    >
                        History
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
}