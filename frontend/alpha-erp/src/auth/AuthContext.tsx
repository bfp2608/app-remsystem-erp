import { createContext, useState, useEffect, ReactNode } from "react"
import { signIn } from "../api/authApi"
import { saveToken, getToken, removeToken } from "./tokenStorage"

interface AuthContextType {
    token: string | null
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    isAuthenticated: boolean
    isLoading: boolean
}

export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const stored = getToken() // ← obtener
        if (stored) setToken(stored)
        setIsLoading(false)
    }, [])

    const login = async (email: string, password: string) => {
        const response = await signIn({ email, password })
        saveToken(response.token) // ← guardar
        setToken(response.token)
    }

    const logout = () => {
        removeToken() // ← eliminar
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}