import { getServerAuthSession } from "@/server/auth";
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import Link from "next/link";

export async function Header() {
    const session = await getServerAuthSession();  
    return (
        <Navbar >
            <NavbarContent>
            <NavbarMenuToggle
                className="sm:hidden"
            />
            <NavbarBrand>
                {/* <AcmeLogo /> */}
                <p className="font-bold text-inherit"><Link href="/">pSearch</Link></p>
            </NavbarBrand>
            </NavbarContent>
    
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
                <Link color="foreground" href="/search">
                Search
                </Link>
            </NavbarItem>
            <NavbarItem isActive>
                <Link href="/history" aria-current="page">
                History
                </Link>
            </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
            <NavbarItem>
                <Button as={Link} color="primary" href={session ? "/api/auth/signout?callbackUrl=/" : "/api/auth/signin?callbackUrl=/search"} variant="flat">
                {session ? "Sign Out" : "Sign In"}
                </Button>
            </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                <NavbarMenuItem key="search">
                    <Link
                        color="foreground"
                        className="w-full"
                        href="/search"
                        size="lg"
                    >
                        Search
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem key="history">
                    <Link
                        color="foreground"
                        className="w-full"
                        href="/history"
                        size="lg"
                    >
                        History
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
        );
    }