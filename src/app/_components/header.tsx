import { getServerAuthSession } from "@/server/auth";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import Link from "next/link";

export async function Header() {
    const session = await getServerAuthSession();
    return (
        <Navbar>
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <span className="text-[hsl(280,100%,70%)]"><Link href="/">pSearch</Link></span>
        </NavbarBrand>
        {session ?
        <NavbarContent justify="center">
            <NavbarItem>
                <Link href="/search" color="foreground">
                    Search
                </Link>
            </NavbarItem>
            <NavbarItem>
                <Link href="/history" color="foreground">
                    History
                </Link>
            </NavbarItem>
        </NavbarContent>
        : null}
        <NavbarContent justify="end">
          <NavbarItem>
            <Link
                href={session ? "/api/auth/signout?callbackUrl=/" : "/api/auth/signin?callbackUrl=/search"}
                // className="rounded-full bg-white/10 px-8 py-3 font-semibold no-underline transition hover:bg-white/20"
                color="foreground"
                >
                {session ? "Sign out" : "Sign in"}
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    )
}