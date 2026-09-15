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

// Menu items — hardcoded in Arabic since the dashboard is admin-only (Arabic locale)
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
        icon: MessageCircleWarning,
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
        <Sidebar
            collapsible="icon"
            style={{ direction: isRTL ? "rtl" : "ltr", right: isRTL ? "0" : "auto", left: isRTL ? "auto" : "0" }}
        >
            {/* Sidebar header with brand accent color and bottom separator */}
            <SidebarHeader className="border-b border-sidebar-border pt-4 px-2 pb-3">
                <SidebarMenuButton
                    size={"lg"}
                    className="data-[state=open]:text-sidebar-accent-foreground hover:bg-transparent active:bg-transparent flex gap-3"
                >
                    <span className="truncate text-3xl font-semibold text-[#A89989]">
                        الرِّواقْ
                    </span>
                </SidebarMenuButton>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <Link href={item.href}>
                                        <SidebarMenuButton className="transition-colors duration-200">
                                            <item.icon className="shrink-0" />
                                            <span>{item.title}</span>
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                {/* NavUser can be added here in the future */}
            </SidebarFooter>
        </Sidebar>
    )
}