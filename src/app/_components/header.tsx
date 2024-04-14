import { getServerAuthSession } from "@/server/auth";
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
import { ThemeSwitcher } from "./ThemeSwitcher";

export async function Header() {
    const session = await getServerAuthSession();
    return (
        <Navbar>
            <NavbarContent>
                <NavbarMenuToggle
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <p className="font-bold text-inherit"><Link href="/">pSearch</Link></p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Button as={Link} color="secondary" href="/search" variant="flat">
                        Search
                    </Button>
                </NavbarItem>
                <NavbarItem isActive>
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
                    <Button as={Link} color="secondary"
                            href={session ? "/api/auth/signout?callbackUrl=/" : "/api/auth/signin?callbackUrl=/search"}
                            variant="flat">
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
