import { useNavigate } from "react-router-dom"
import React, { useState } from "react"
import { useAuth } from "../auth/useAuth"
import { router } from '../api/authApi'
import { getToken } from "../auth/tokenStorage"
import { ROLE_TYPES } from "../constans"
import { toast} from "sonner"
import { Eye, EyeOff } from "lucide-react"

export const LoginPage = () => {

    const navigate = useNavigate()
    const { login } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        setIsLoading(true)
        try{
            await login(email, password); 

            const token = getToken();
            const meResponse = await router(token!)
            const rol = meResponse.tipoUsuario;

            switch(rol){
                case ROLE_TYPES.admin:
                    console.log("es admin")
                    navigate('/dashboard')
                    break;
                case ROLE_TYPES.user:
                    console.log("es usuario");
                    navigate('/dashboard')
                        break;
                default:
                    toast.error("Rol no reconocido")
                    break;
            }
        }catch(e){
            console.error(e);
            toast.error("Credenciales incorrectas")
        } finally{
            setIsLoading(false)
        }
    }

    return (
        <div className="h-screen overflow-hidden">
            <section className="relative bg-linear-to-br from-slate-400 via-slate-600 to-slate-800  h-lvh flex justify-center items-center">

                <img src="img/background.svg" className="absolute inset-0 opacity-30 w-full h-full object-cover mix-blend-overlay pointer-events-none" alt="" />

                <div className="bg-gray-100 z-10 rounded-2xl shadow-lg w-full max-w-sm p-8 mx-4">
                    <span className="block text-3xl text-slate-900 text-center font-bold mb-4 -mt-3">REMSYSTEMS - CRM</span>
                    <form id="loginForm" onSubmit={handleSubmit}>
                        <article className="flex flex-col gap-4">
                            
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="block text-slate-700 text-xl font-semibold mb-2 ml-1">Correo Electrónico</label>
                                <input type="email" onChange={e => setEmail(e.target.value)} name="email" id="email" className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-300 ease-in-out shadow-sm login-input" placeholder="nombre@empresa.com" />
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <label htmlFor="password" className="block text-slate-700 text-xl font-semibold mb-2 ml-1">Contraseña</label>

                                <div className="relative">
                                    <input 
                                    type={showPassword ? "text" : "password"} 
                                    onChange={e => setPassword(e.target.value)} 
                                    name="password" 
                                    id="password" 
                                    className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-300 ease-in-out shadow-sm login-input"
                                    placeholder="********" />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors cursor-pointer"
                                        disabled={isLoading}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>                            

                            <button  className={`mt-5 w-full text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-slate-900/30 transform transition cursor-pointer flex justify-center items-center gap-2 ${isLoading ? 'bg-slate-700 cursor-not-allowed opacity-80' : 'bg-slate-900 hover:bg-slate-800 active:scale-95'}`}
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? "Ingresando..." : "Ingresar"}
                            </button>
                        </article>
                    </form>
                    <span className="mt-4 block text-sm text-center text-gray-600 w-full">Copyright © 2017-2026 REMSYSTEMS S.A.C.<br />Todos los derechos reservados.</span>
                </div>

            </section>
        </div>
    )
} 