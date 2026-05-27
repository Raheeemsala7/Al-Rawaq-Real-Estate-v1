"use server"

import { HEADERS } from "@/shared/constant/api.constant"
import { RESPONSES } from "@/shared/constant/api.responses"
import { getNextAuthToken } from "@/shared/lib/auth.util"
import { CreatePropertyFormData, Property } from "../types/property"
import { IApiResponse } from "@/shared/lib/types/api"

export const createPropertyAction = async (data: CreatePropertyFormData) => {
    const token = await getNextAuthToken()

    if (!token?.token) return RESPONSES.unauthorized

    const formData = new FormData()

    console.log(token.user._id)

    // fields العادية
    formData.append("listedBy", token.user._id)
    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("price", String(data.price))
    formData.append("area", String(data.area))
    formData.append("purpose", data.purpose)
    formData.append("type", data.type)
    formData.append("paymentMethod", data.paymentMethod)
    formData.append("advertiserType", data.advertiserType)
    formData.append("status", data.status)
    formData.append("bedrooms", String(data.bedrooms))
    formData.append("bathrooms", String(data.bathrooms))

    // object لازم يتحول string
    formData.append("location", JSON.stringify(data.location))
    // array
    formData.append("amenities", JSON.stringify(data.amenities))
    // object
    formData.append("details", JSON.stringify(data.details))
    // الصور
    data.images.forEach((file: File) => {
        formData.append("images", file)
    })


    const res = await fetch(`${process.env.API_URL}/property/create`, {
        method: "POST",
        headers: {
            ...HEADERS.authorize(token.token),
        },
        body: formData
    })
    const payload: IApiResponse<{ property: Property }> = await res.json()

    if (!payload.success) {
        return payload
    }
    return payload
}

export const deletePropertyAction = async (id: string) => {

    const token = await getNextAuthToken()
    if (!token?.token) return RESPONSES.unauthorized

    const res = await fetch(`${process.env.API_URL}/property/${id}`, {
        method: "DELETE",
        headers: {
            ...HEADERS.authorize(token.token),
        },
    })
    const payload :IApiResponse<null> = await res.json()

    return payload
}