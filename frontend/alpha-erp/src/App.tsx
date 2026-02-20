
import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import { LoginResponse  } from "./types/login"
import { saveAuthToken, getAuthToken, clearAuthToken } from "./utils/validators";
import { ClientesPage } from "./pages/ClientesPage";

export function App (){

    const [isAuth, setIsAuth] = useState(false)

    useEffect(() =>{
        const savedToken = getAuthToken()
        if(savedToken){
            setIsAuth(true)
        }
    }, [])

    const handleLoginSuccess = (response: LoginResponse) =>{
        saveAuthToken(response.token)
        setIsAuth(true)
    }

    const handleLogout = () =>{
        clearAuthToken()
        setIsAuth(false)
    }

    return(
        <>
            { isAuth ? <ClientesPage onLogout={ handleLogout } /> : <LoginPage onLoginSuccess={ handleLoginSuccess } />}
        </>
    )
    
}