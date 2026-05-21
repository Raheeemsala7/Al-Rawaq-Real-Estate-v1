"use client"

import { IPagination } from "@/shared/lib/types/api"
import { useQuery } from "@tanstack/react-query"
import { DataUser } from "../types/users"
import { useSearchParams } from "next/navigation"



export const useGetAllUsers = () => {
    // searchParams
    const searchParams = useSearchParams()

    // variables
    const page = searchParams.get("page") || 1
    const search = searchParams.get("search")



    return useQuery({
        queryKey: ["users", page, search],
        queryFn: async () => {
            const query = new URLSearchParams();
            query.append("page", String(page));
            if (search) {
                query.append("search", search);
            }
            const res = await fetch(`/api/users?${query.toString()}`)

            const payload: IPagination<DataUser> = await res.json()

            if (!payload.success) {
                throw Error("Some Thing Error")
            }
            return payload
        }
    })
}