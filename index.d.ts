export interface ProfileA {
    id: string
    name: string
    profilePic: "red" | "blue" | "yellow" | "green" | "darkblue"| "kids";
    createdAt?: Date | string
    updatedAt?: Date | string
    favouriteIds?: string[];
    favourites: Movie[]
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

export type Genre = 'Thriller'| 'Action'| 'Drama'| 'Tragedy'| 'Comedy'| 'SciFi'| 'History'| 'Horror'| 'Crime'| 'Romance'| 'Adventure'| 'Fantasy'| 'Animation'| 'Period_piece'| 'Biography';
export interface Movie{
    id: string
    title: string
    description: string
    imageUrl: string
    imageTitle: string
    thumbnailUrl: string
    trailerUrl: string
    videoUrl: string
    year: number
    duration: string
    limit: number
    genre: Genre[]
    isSeries: boolean
    createdAt: Date 
    updatedAt: Date
    listIDs: string[]
}