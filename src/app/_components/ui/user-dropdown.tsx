"use client"

import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";

export function UserDropdown({ session }) {
    return (
    <Dropdown>
        <DropdownTrigger>
            <Avatar size="sm" src={session.user?.image}/>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" disabledKeys={["profile"]}>
        <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{session.user.email}</p>
        </DropdownItem>
        <DropdownItem key="sign-out" className="text-danger" color="danger" href="/api/auth/signout?callbackUrl=/">
            Sign Out
        </DropdownItem>
        </DropdownMenu>
    </Dropdown>
    );
}