"use client"

import { IApiResponse, IPagination } from "@/shared/lib/types/api"
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Property } from "../types/property"
import { useSearchParams } from "next/navigation"
import { createPropertyAction, deletePropertyAction } from "../apis/properties.action"

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
        queryKey: ["properties", filters],
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



export const useGetAdminProperties = () => {
    // searchParams
    const searchParams = useSearchParams()

    // variables
    const page = searchParams.get("page") || 1
    const search = searchParams.get("search")

    return useQuery({
        queryKey: ["admin-properties", page, search],
        queryFn: async () => {
            const query = new URLSearchParams()
            query.append("page", String(page));
            if (search) {
                query.append("search", search);
            }

            const res = await fetch(`/api/admin/properties?${query.toString()}`)
            const payload: IPagination<Property> = await res.json()

            if (!payload.success) {
                throw Error("something error")
            }
            return payload
        }
    })
}

export const useCreatePropertyMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createPropertyAction,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["properties"],
            })
        }
    })
}
export const useDeletePropertyMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deletePropertyAction,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["properties" ,"admin-properties" ],
            })
        }
    })
}