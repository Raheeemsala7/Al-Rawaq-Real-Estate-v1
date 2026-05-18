import { HEADERS } from "@/shared/constant/api.constant"
import { RESPONSES } from "@/shared/constant/api.responses"
import { getNextAuthToken } from "@/shared/lib/auth.util"
import { IApiResponse } from "@/shared/lib/types/api"
import { DashboardStats } from "../types/stats"



export const getStatsAdminApi = async () => {

    const token = await getNextAuthToken()
    if (!token?.token)  return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/admin/stats`, {
        headers :{
            ...HEADERS.authorize(token.token)
        }
    })

    console.log("RES" , res)

    const payload : IApiResponse<DashboardStats> = await res.json()

    console.log(payload)

    if (!payload.success) {
        return payload
    }

    return payload as IApiResponse<DashboardStats>

}