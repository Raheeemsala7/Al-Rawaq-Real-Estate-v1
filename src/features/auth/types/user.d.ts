



export interface IUser {
    _id: string
    name: string
    email: string
    firstName: string,
    lastName: string,
    is2FAEnabled: boolean,
    isEmailVerified: boolean,
    isGoogleUser: boolean,
    role: "admin" | "user",
    createdAt: string
    updatedAt: string
}


