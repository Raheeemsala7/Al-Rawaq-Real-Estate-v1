"use client"

import { IPagination } from "@/shared/lib/types/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Property } from "../types/property"
import { useSearchParams } from "next/navigation"
import { createPropertyAction, deletePropertyAction } from "../apis/properties.action"

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