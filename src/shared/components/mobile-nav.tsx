"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/shared/components/ui/sheet";
import { Button } from "@/shared/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import Logo from "../../../public/assets/Logo";

export function MobileNav({ links }: { links: { href: string; label: string }[] }) {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80vw] sm:w-[350px]">
                <div className="flex justify-center mb-8">
                    <Logo />
                </div>
                <nav className="flex flex-col gap-4">
                    {links.map(({ href, label }) => (
                        <Link
                            key={label}
                            href={href}
                            onClick={() => setOpen(false)}
                            className="block px-2 py-1 text-lg font-medium text-foreground hover:text-primary transition-colors"
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
}
