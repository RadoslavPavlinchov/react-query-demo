export interface Post {
    id: number
    title: string
    body: string
}

export interface Comment {
    id: number
    email: string
    body: string
}

export interface PersonProps {
    name: string
    hair_color: string
    eye_color: string
}

export interface PeopleResponse {
    count: number
    next: string | null
    previous: string | null
    results: PersonProps[]
}

export interface Meeting {
    id: string
    title: string
    time: string
    type: "work" | "personal" | "team" | "other"
    createdAt: string
    updatedAt?: string
}
