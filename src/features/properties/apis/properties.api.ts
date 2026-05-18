import { NextRequest } from "next/server"
import { Property } from "../types/property"
import { getToken } from "next-auth/jwt"
import { HEADERS } from "@/shared/constant/api.constant"

export const getAllProperties = async ({ req }: { req: NextRequest }) => {

    const token = await getToken({ req })

    const res = await fetch(`${process.env.API_URL}/property`, {
        headers: {
            ...HEADERS.authorize(token?.token || "")
        }
    }
    )

    const data: Property[] = await res.json()

    console.log("DATA RES" , data)

    if (!res.ok) {
        return data
    }
    return data
}