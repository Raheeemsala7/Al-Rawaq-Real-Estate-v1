import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { IApiResponse } from "./shared/lib/types/api";
import { IAuthResponse } from "./features/auth/types/auth";


export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
                token: {},
                user: {}
            },
            authorize: async (credentials) => {

                const res = await fetch(`${process.env.API_URL}/auth/login`, {
                    method: "POST",
                    body: JSON.stringify({ email: credentials?.email, password: credentials?.password }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

                console.log("CREDENTIALS:", credentials);

            

                
                const payload: IApiResponse<IAuthResponse> = await res.json()
                console.log("payload login", payload)
                if (!payload.success ) {
                    throw Error(payload.message)
                }

                    console.log("STATUS:", res.status);
                console.log("LOGIN RESPONSE:", payload);

                return {
                    id: payload.data.user._id,
                    token: payload.data.token,
                    user: payload.data.user
                }
            }
        })
    ],

    callbacks: {
        jwt: async ({ token, user }) => {

            if (user) {
                token.token = user.token
                token.user = user.user
            }
            return token
        },
        session: async ({ session, token }) => {
            session.user = token.user
            session.token = token.token

            return session
        }
    }
}