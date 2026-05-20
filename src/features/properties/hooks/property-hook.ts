"use client"

import { IApiResponse, IPagination } from "@/shared/lib/types/api"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Property } from "../types/property"
import { useSearchParams } from "next/navigation"

export const useGetInfinteProperties = () => {
    // Search params
    const searchParams = useSearchParams()


    // Variables
    const filters = {
        purpose: searchParams.get("purpose") || "",
        type: searchParams.get("type") || "",
        minPrice: searchParams.get("minPrice") || "",
        maxPrice: searchParams.get("maxPrice") || "",
        location: searchParams.get("location") || "",
        search: searchParams.get("search") || "",
        limit: searchParams.get("limit") || "6",
    }


    return useInfiniteQuery({
        queryKey: ["properties" , filters],
        initialPageParam: 1,
        queryFn: async ({ pageParam }) => {
            const params = new URLSearchParams({
                page: String(pageParam),
                ...filters,
            })
            const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/properties?${params.toString()}`)

            const payload: IPagination<Property> = await res.json()

            return payload
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.metadata.currentPage === lastPage.metadata.totalPages) {
                return undefined
            }
            return lastPage.metadata.currentPage + 1
        }

    })


}
// export const useGetInfinteProperties = () => {

//     return useQuery({
//         queryKey: ["properties"],
//         queryFn: async () => {
//             const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/properties`)

//             const payload = await res.json()

//             return payload
//         },


//     })


// }