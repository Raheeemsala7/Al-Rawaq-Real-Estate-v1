import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/shared/components/ui/sidebar"
import { Building2, CheckCircle2, LayoutDashboard, MessageCircleWarning, Users } from "lucide-react"
import { getLocale } from "next-intl/server";
import Link from "next/link";


// Menu items.
const items = [
    {
        title: "لوحة التحكم",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "المستخدمين",
        href: "/dashboard/users",
        icon: Users,
    },
    {
        title: "العقارات",
        href: "/dashboard/properties",
        icon: Building2,
    },
    {
        title: "بلاغات",
        href: `/dashboard/reports`,
        icon: MessageCircleWarning ,
    },
    {
        title: "أرشيف",
        href: `/dashboard/achieved`,
        icon: CheckCircle2,
    },
];

export async function AppSidebar() {
    const locale = await getLocale(); 
    const isRTL = locale === "ar";
    return (
        <Sidebar collapsible="icon" style={{ direction: isRTL ? "rtl" : "ltr", right: isRTL ? "0" : "auto", left: isRTL ? "auto" : "0" }}>
            <SidebarHeader className="pt-4 px-2 pb-2 ">
                <SidebarMenuButton size={"lg"} className="data-[state=open]:text-sidebar-accent-foreground  hover:bg-transparent active:bg-transparent flex gap-3 ">
                    <span className="truncate text-3xl font-semibold">
                        الرِّواقْ
                    </span>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent className="">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <Link href={item.href}>
                                        <SidebarMenuButton >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter >
                {/* <NavUser /> */}
            </SidebarFooter>
        </Sidebar>
    )
}