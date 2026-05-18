import { getAllProperties } from "@/features/properties/apis/properties.api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req :NextRequest) {
    const payload = await getAllProperties({req})

    return NextResponse.json(payload)
}