import { createContext, useState, useEffect, ReactNode } from "react"
import { meResponse, router, signIn } from "../api/authApi"
import { saveToken, getToken, removeToken } from "./tokenStorage"
import { useUserStore } from "../store/userStore"
import { useClientsStore } from "../store/clientStore"

interface AuthContextType {
    token: string | null
    user: meResponse | null
    login: (email: string, password: string) => Promise<meResponse>
    logout: () => void
    isAuthenticated: boolean
    isLoading: boolean
}

export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<meResponse | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkSession = async () =>{
            const stored = getToken()
            if(stored){
                setToken(stored)
                try{
                    const userData = await router(stored)
                    setUser(userData)
                }catch(error){
                    removeToken()
                    setToken(null)
                    setUser(null)
                    console.log(error)
                }
            }
            setIsLoading(false)
        }
        checkSession()
    }, [])

    const login = async (email: string, password: string) => {
        const response = await signIn({ email, password })
        saveToken(response.token) // ← guardar
        setToken(response.token)

        const userData = await router(response.token)
        setUser(userData)
        return userData
    }

    const logout = () => {
        removeToken() // ← eliminar
        setToken(null)
        setUser(null)
        useUserStore.getState().clearUsers()
        useClientsStore.getState().clearClients()
    }

    return (
        <AuthContext.Provider 
            value={{ token, user, login, logout, isAuthenticated: !!token, isLoading }}
        >
            {children}
        </AuthContext.Provider>
    )
}