import { Link, useNavigate } from "react-router-dom"
import React, { useState } from "react"
import { useAuth } from "../auth/useAuth"
import { ROLE_TYPES, RUTAS } from "../constans"
import { toast } from "sonner"
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react"

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
        try {
            const meResponse = await login(email, password)
            const rol = meResponse.tipoUsuario;

            switch(rol){
                case ROLE_TYPES.admin:
                case ROLE_TYPES.user:
                    navigate('/dashboard')
                    break;
                default:
                    toast.error("Rol no reconocido")
                    break;
            }
        } catch(e) {
            console.error(e);
            toast.error("Credenciales incorrectas")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        // Mismo fondo para ambas vistas
        <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-slate-900">
            
            {/* El SVG de fondo con opacity 30 como pediste */}
            <img 
                src="img/background.svg" 
                className="absolute inset-0 opacity-30 w-full h-full object-cover mix-blend-overlay pointer-events-none" 
                alt="Fondo decorativo" 
            />

            <div className="bg-slate-800/95 backdrop-blur-sm z-10 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-sm p-8 mx-4">
                
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">REMSYSTEMS</h1>
                    <span className="block text-teal-400 text-sm font-bold tracking-widest uppercase">CRM</span>
                </div>

                <form id="loginForm" onSubmit={handleSubmit} className="flex flex-col gap-6">
                    
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="block text-slate-300 text-xs font-bold uppercase tracking-wider ml-1">
                            Correo Electrónico
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                            <input 
                                type="email" 
                                onChange={e => setEmail(e.target.value)} 
                                name="email" 
                                id="email" 
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 shadow-inner" 
                                placeholder="nombre@empresa.com" 
                            />
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="block text-slate-300 text-xs font-bold uppercase tracking-wider ml-1">
                            Contraseña
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                            <input 
                                type={showPassword ? "text" : "password"} 
                                onChange={e => setPassword(e.target.value)} 
                                name="password" 
                                id="password" 
                                className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-700 bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 shadow-inner"
                                placeholder="********" 
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-teal-400 focus:outline-none transition-colors cursor-pointer"
                                disabled={isLoading}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>                            

                    <button 
                        className={`mt-2 w-full text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transform transition-all duration-300 flex justify-center items-center gap-2 
                        ${isLoading 
                            ? 'bg-teal-600/50 cursor-not-allowed text-white/50 shadow-none' 
                            : 'bg-teal-500 hover:bg-teal-400 hover:shadow-teal-500/25 active:scale-[0.98]'}`}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading && <Loader2 className="w-5 h-5 animate-spin" /> }
                        {isLoading ? "Ingresando..." : "Ingresar"}
                    </button>
                </form>

                <div className="mt-8 flex flex-col items-center gap-4 border-t border-slate-700 pt-6">
                    <p className="text-slate-400 text-sm">
                        ¿No tienes una cuenta?{' '}
                        <Link to={RUTAS.REGISTRO} className="text-teal-400 hover:text-teal-300 hover:underline font-medium transition-colors">
                            Regístrate aquí
                        </Link>
                    </p>
                    <span className="block text-xs text-center text-slate-500 leading-relaxed">
                        Copyright © 2017-2026 REMSYSTEMS S.A.C.<br />Todos los derechos reservados.
                    </span>
                </div>
            </div>
        </div>
    )
}