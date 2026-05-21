import { HEADERS } from "@/shared/constant/api.constant"
import { RESPONSES } from "@/shared/constant/api.responses"
import { IPagination } from "@/shared/lib/types/api"
import { getToken } from "next-auth/jwt"
import { NextRequest } from "next/server"
import { DataUser } from "../types/users"



export const getUsersApi = async ({ req }: { req: NextRequest }) => {
    const token = await getToken({ req })

    if (!token?.token) return RESPONSES.unauthorized

    const page = req.nextUrl.searchParams.get("page") || "1";
    const limit = req.nextUrl.searchParams.get("limit") || "12";

    const search = req.nextUrl.searchParams.get("search") || "";

    const query = new URLSearchParams({
        page,
        limit,
    });

    if (search) query.append("search", search);

    const res = await fetch(`${process.env.API_URL}/admin/users?${query.toString()}`, {
        headers: {
            ...HEADERS.authorize(token.token)
        }
    })

    const payload: IPagination<DataUser[]> = await res.json()


    return payload.data

}