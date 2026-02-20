import React, { FC, useState } from "react"
import { LoginFormData, LoginResponse } from "../types/login"
import LoginForm from "../components/LoginForm"

interface LoginPageProps {
    onLoginSuccess: (response: LoginResponse) => void
}

const LoginPage: FC<LoginPageProps> = ({ onLoginSuccess }) =>{
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async ( credentials: LoginFormData) =>{

        setIsLoading(true)
        setError('')

        try{
            const response = await mockLoginApi(credentials)
            onLoginSuccess(response)
        }
        catch(e){
            setError('Correo o contraseña incorrectos. Intente de nuevo')
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }

        setIsLoading(false)
    }

    return(
        <LoginForm onSubmit={ handleSubmit } isLoading={ isLoading } error={ error } />
    )
}

export default LoginPage