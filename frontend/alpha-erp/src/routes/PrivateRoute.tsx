import { Navigate } from "react-router-dom"
import { useAuth } from "../auth/useAuth"
import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

export const PrivateRoute = ({ children }: Props) => {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
        return null
    }
    if (!isAuthenticated) {
        return <Navigate to="/" replace />
    }

    return <> {children} </>
}