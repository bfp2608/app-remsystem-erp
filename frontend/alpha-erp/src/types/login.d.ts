import { ROLE_TYPES } from "../constans"

export type Roles = keyof typeof ROLE_TYPES

export interface User {
    id: string,
    email: string
    name: string
    role: Roles
    lastLogin: Date
}

export interface LoginFormData {
    email: string
    password: string
}

export interface LoginResponse {
    user: User
    token: string
    expiresIn: number
}