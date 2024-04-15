"use client"

import {Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {type SessionProps} from "@/utils/sessionProps";

export function UserDropdown({session}: SessionProps) {
    return (
        <Dropdown>
            <DropdownTrigger>
                {
                    session?.user?.image && (
                        <Avatar size="sm" src={session.user.image} color="secondary" isBordered/>
                    )
                }
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" disabledKeys={["profile"]}>
                <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>

                    {
                        session?.user?.email && (
                            <p className="font-semibold">{session.user.email}</p>
                        )
                    }
                </DropdownItem>
                <DropdownItem key="sign-out" className="text-danger" color="danger"
                              href="/api/auth/signout?callbackUrl=/">
                    Sign Out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}