"use client"

import { signOut } from "next-auth/react"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { SidebarTrigger } from "../ui/sidebar"
import { LanguageToggle } from "../language-toggle"


export function SiteHeader() {



    return (
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) bg-[#000000] text-white border-[#262A32] px-4 py-2">
            <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
                <div className="flex items-center">
                    <SidebarTrigger className="-ml-1 hover:bg-[#262A33] hover:text-white text-[#BDC1CA]" />
                    {/* <Separator
                        orientation="vertical"
                        className="mx-2 data-[orientation=vertical]:h-4"
                    /> */}
                </div>
                <div className="flex gap-3 items-center">
                    <Button variant={"destructive"} onClick={() => signOut({callbackUrl :"/auth/login"})} >Logout</Button>
                    <LanguageToggle />
                </div>
            </div>
        </header>
    )
}