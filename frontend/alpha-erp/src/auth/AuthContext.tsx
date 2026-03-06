import { createContext, useState, useEffect, ReactNode } from "react"

interface User {
    email: string
    role: string
}

interface AuthContextType {
    user: User | null
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
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        const storedUser = localStorage.getItem("user")

        if (storedToken && storedUser) {
            try {
                setToken(storedToken)
                setUser(JSON.parse(storedUser))
            } catch {
                localStorage.clear()
            }
        }
        console.log("AuthProvider render")
        setIsLoading(false)
    }, [])

    const login = async (email: string, password: string) => {
        const { loginRequest } = await import("../api/authApi")

        const response = await loginRequest({ email, password })

        setToken(response.token)
        setUser(response.user)

        localStorage.setItem("token", response.token)
        localStorage.setItem("user", JSON.stringify(response.user))
    }

    const logout = () => {
        setToken(null)
        setUser(null)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                isAuthenticated: !!token,
                isLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}