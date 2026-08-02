"use client"

import { Skeleton } from "@/shared/components/ui/skeleton"

export default function loading() {
    return (
        <div className="grid h-[36rem] grid-cols-3 grid-rows-2 gap-2">
            {/* Main Image */}
            <div className="relative col-span-2 row-span-2">
                <Skeleton className="h-full w-full rounded-lg" />

                <div className="absolute bottom-2 left-4 flex items-center gap-1 rounded-lg bg-white px-2 py-1 shadow">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-6" />
                </div>
            </div>

            {/* Top Right */}
            <div className="relative">
                <Skeleton className="h-full w-full rounded-lg" />
            </div>

            {/* Bottom Right */}
            <div className="relative">
                <Skeleton className="h-full w-full rounded-lg" />
            </div>
        </div>
    )
}
