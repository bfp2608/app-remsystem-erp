
import {  useState } from "react";
import LoginPage from "./pages/LoginPage";
import { LoginResponse  } from "./types/login"
import { saveAuthToken, getAuthToken, clearAuthToken } from "./utils/validators";
import Sidebar from "./components/sidebar/Sidebar";
import { EditClientsPage } from "./pages/EditClientsPage";


export function App (){

    const [isAuth, setIsAuth] = useState(() => !!getAuthToken())

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
            <EditClientsPage/>
        </>
    )
    
}