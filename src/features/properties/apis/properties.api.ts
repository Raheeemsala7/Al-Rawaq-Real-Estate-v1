import { NextRequest } from "next/server"
import { Property } from "../types/property"
import { getToken } from "next-auth/jwt"
import { HEADERS } from "@/shared/constant/api.constant"
import { IApiResponse, IPagination } from "@/shared/lib/types/api"
import { RESPONSES } from "@/shared/constant/api.responses"

export const getAllProperties = async ({ req }: { req: NextRequest }) => {

    const token = await getToken({ req })

    const searchParams = req.nextUrl.searchParams
    const query = new URLSearchParams()
    searchParams.forEach((value, key) => {
        if (value) {
            query.set(key, value)
        }
    })

    const page = req.nextUrl.searchParams.get("page")
    const limit = req.nextUrl.searchParams.get("limit")
    const purpose = req.nextUrl.searchParams.get("purpose")
    const type = req.nextUrl.searchParams.get("type") || ""
    const maxPrice = req.nextUrl.searchParams.get("maxPrice")
    const minPrice = req.nextUrl.searchParams.get("minPrice")
    const location = req.nextUrl.searchParams.get("location")
    const search = req.nextUrl.searchParams.get("search")



    // const query = new URLSearchParams({
    //     page: String(page),
    //     limit: String(limit),
    // })

    // if (purpose) {
    //     query.set("purpose", purpose)
    // }
    // if (type) {
    //     query.set("type", type)
    // }
    // if (maxPrice) {
    //     query.set("maxPrice", maxPrice)
    // }
    // if (minPrice) {
    //     query.set("minPrice", minPrice)
    // }
    // if (location) {
    //     query.set("location", location)
    // }
    // if (search) {
    //     query.set("search", search)
    // }

    const res = await fetch(`${process.env.API_URL}/property?${query.toString()}`, {
        headers: {
            ...HEADERS.authorize(token?.token || "")
        }
    }
    )

    const data: IPagination<Property> = await res.json()
    if (!data.success) {
        return data
    }
    return data
}


export const getAdminAllProperties = async ({ req }: { req: NextRequest }) => {

    const token = await getToken({ req })

    if (!token) return RESPONSES.unauthorized

    const page = req.nextUrl.searchParams.get("page") || 1
    const limit = req.nextUrl.searchParams.get("limit") || 12
    const search = req.nextUrl.searchParams.get("search") || ""

    const query = new URLSearchParams({
        page: String(page),
        limit: String(limit),
    })
    if (search) {
        query.append("search", search)
    }

    const res = await fetch(`${process.env.API_URL}/admin/properties`, {
        headers :{
            ...HEADERS.authorize(token.token)
        }
    })

    const payload : IPagination<Property> = await res.json()

    if (!payload.success) {
        return payload
    }

    return payload


}