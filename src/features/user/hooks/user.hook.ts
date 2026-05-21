"use client"

import { useQuery } from "@tanstack/react-query"



const useGetAllUsers = () => {
    return useQuery({
        queryKey : ["users" , ],
        queryFn :async () => {  
            const res = await fetch(`/api/users`)

            const payload = await res.json()
        }
    })
}