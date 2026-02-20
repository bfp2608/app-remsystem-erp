import { FC, useState } from "react"
import { LoginFormData, LoginResponse } from "../types/login"
import LoginForm from "../components/LoginForm"

interface LoginPageProps {
    onLoginSuccess: (response: LoginResponse) => void
}

const LoginPage: FC<LoginPageProps> = ({ onLoginSuccess }) =>{
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    //Mover esta función cuando se haga la llamada a la API
    const mockLoginApi = async( credentials: LoginFormData ): Promise<LoginResponse> =>{
            await new Promise(resolve => setTimeout(resolve, 1000))

            if(credentials.email === 'admin@erp.com' && credentials.password === '12345'){
                return{
                    user: {
                        id: '1',
                        email: credentials.email,
                        name: 'Administrador',
                        role: 'admin',
                        lastLogin:  new Date()
                    },
                    token: 'mock-jwt-token-' + Math.random().toString(36).substring(2),
                    expiresIn: 3600
                }
            }else{
                throw new Error('Credenciales Inválidas')
            }
        }

    const handleSubmit = async ( credentials: LoginFormData) =>{

        setIsLoading(true)
        setError('')

        console.log('Datos a enviar: ',credentials)

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
    }

    return(
        <LoginForm onSubmit={ handleSubmit } isLoading={ isLoading } error={ error } />
    )
}

export default LoginPage