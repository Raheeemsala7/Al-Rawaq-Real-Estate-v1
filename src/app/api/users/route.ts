import { getAllUsersApi } from "@/features/user/apis/users.api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const payload = await getAllUsersApi({ req })

    return NextResponse.json(payload)
}