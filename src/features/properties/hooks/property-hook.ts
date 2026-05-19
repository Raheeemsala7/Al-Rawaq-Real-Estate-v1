"use client"

import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { getAllProperties } from "../apis/properties.api"

export const useGetInfinteProperties = () => {

    return useInfiniteQuery({
        queryKey: ["properties"],
        initialPageParam: 1,
        queryFn: async ({ pageParam }) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/properties`)

            const payload = await res.json()

            return payload
        },
        getNextPageParam: (lastpage) => {
            if (lastPage.metadata.page === lastPage.metadata.totalPages) {
                return undefined
            }
            return  undefined
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