"use client"

import { signOut } from "next-auth/react"
import { Button } from "../ui/button"
import { SidebarTrigger } from "../ui/sidebar"
import { LanguageToggle } from "../language-toggle"
import { ThemeToggle } from "../theme-toggle"
import { LogOut } from "lucide-react"


export function SiteHeader() {
    return (
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) px-4 py-2">
            <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
                <div className="flex items-center">
                    {/* Logical margin for RTL/LTR sidebar trigger */}
                    <SidebarTrigger className="ltr:-ml-1 rtl:-mr-1 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground/70 transition-colors duration-200" />
                </div>
                <div className="flex gap-3 items-center">
                    <ThemeToggle />
                    <LanguageToggle />
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => signOut({ callbackUrl: "/auth/login" })}
                        className="flex items-center gap-1.5"
                    >
                        <LogOut className="size-3.5" />
                        <span>Logout</span>
                    </Button>
                </div>
            </div>
        </header>
    )
}