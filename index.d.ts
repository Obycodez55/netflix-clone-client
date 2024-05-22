export interface ProfileA {
    id: string
    name: string
    profilePic: "red" | "blue" | "yellow" | "green" | "darkblue"| "kids";
    createdAt?: Date | string
    updatedAt?: Date | string
    favouriteIds?: string[]
}
export interface User {
    id?: string
    username: string
    email: string
    password: string
    emailVerified?: boolean
    emailVerifiedDate?: Date | string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profiles: ProfileA[],
    sessions?: any
    accounts?: any
}