import { AppSidebar } from '@/shared/components/sidebar/app-sidebar'
import { SiteHeader } from '@/shared/components/sidebar/site-header'
import { SidebarInset, SidebarProvider } from '@/shared/components/ui/sidebar'
import React from 'react'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col bg-[#f6f7f9]">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
                            {children}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default AdminLayout