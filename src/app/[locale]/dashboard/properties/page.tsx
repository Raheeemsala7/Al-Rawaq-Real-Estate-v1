import AdminPropertiesTable from '@/features/properties/_components/admin-properties-table'
import { buttonVariants } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { Building2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const AdminPageProperties = () => {
    return (
        <div className="min-h-screen ">
            <div className="mx-auto max-w-7xl space-y-6 animate-fade-in">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-soft">
                                <Building2 className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                                    إدارة العقارات
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    عرض وتعديل وحذف جميع العقارات المسجلة
                                </p>
                            </div>
                        </div>
                        <Link href={"/dashboard/properties/create"} className={cn(buttonVariants(), )} >
                            انشاء عقار جديد
                        </Link>
                    </div>
                </div>
                <AdminPropertiesTable />
            </div>
        </div>
    )
}

export default AdminPageProperties