
import {
    BookOpen,
    ChevronDownIcon,
    HomeIcon,
    LayoutDashboard,
    LogOutIcon,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/shared/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import Link from "next/link";
import SignOutButton from "./signout-btn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export default async function UserData() {
    const session = await getServerSession(authOptions)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-fit rounded-lg ">
                        <AvatarImage src={session?.user.name ?? ` `} alt={session?.user.name} />
                        <AvatarFallback className="size-8 rounded-full">
                            {session?.user.name && session?.user.name.length > 1
                                ? `${session?.user.name.charAt(0).toUpperCase()}${session?.user.name.charAt(1).toUpperCase()}`
                                : session?.user.name
                                    ? session?.user.name.charAt(0).toUpperCase()
                                    : session?.user.email.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <ChevronDownIcon
                        size={16}
                        className="opacity-60"
                        aria-hidden="true"
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="flex min-w-0 flex-col">
                        <span className="text-foreground truncate text-sm font-medium">
                            {session?.user.name}
                        </span>
                        <span className="text-muted-foreground truncate text-xs font-normal">
                            {session?.user.email}
                        </span>
                    </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link href="/" className={"flex items-center gap-2"}>
                            <HomeIcon size={16} />
                            <span>Home</span>
                        </Link>
                    </DropdownMenuItem>
                    {
                        session?.user.role === "admin" && (
                            <DropdownMenuItem>
                                <Link href={"/dashboard"} className={"flex items-center gap-2"}>
                                    <BookOpen size={16} />
                                    <span>Dashboard</span>
                                </Link>
                            </DropdownMenuItem>
                        )
                    }
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <SignOutButton />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}