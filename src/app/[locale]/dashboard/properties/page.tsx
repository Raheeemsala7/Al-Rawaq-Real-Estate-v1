import AdminPropertiesTable from '@/features/properties/_components/admin-properties-table'
import { buttonVariants } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { Building2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { getTranslations } from 'next-intl/server'

const AdminPageProperties = async () => {
    const t = await getTranslations("dashboard.properties")

    return (
        <div className="min-h-screen">
            <div className="mx-auto max-w-7xl space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                                <Building2 className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                                    {t("title")}
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    {t("subtitle")}
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/dashboard/properties/create"
                            className={cn(buttonVariants(), "bg-gradient-to-b from-[#A89989] to-[#7D6D5E] text-white shadow-sm hover:brightness-90 transition-all")}
                        >
                            {t("create")}
                        </Link>
                    </div>
                </div>
                <AdminPropertiesTable />
            </div>
        </div>
    )
}

export default AdminPageProperties