import React, { FC, useState } from "react"
import { LoginFormData } from "../types/login"

interface LoginFormProps {
    onSubmit: (credentials: LoginFormData) => void
    isLoading: boolean
    error: string
}

const LoginForm: FC<LoginFormProps> = ({ onSubmit, isLoading, error }) =>{

    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
        rememberMe: false
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        //Extraemos los datos del input que acaba de cambiar
        const { name, value, type, checked } = e.target

        const valueSaved = type === 'checkbox' ? checked : value

        setFormData((prevState) =>({
            ...prevState,
            [name] : valueSaved
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        onSubmit(formData)
    }

    return(
        <div className="h-screen overflow-hidden">
        <section className="relative bg-linear-to-br from-slate-400 via-slate-600 to-slate-800  h-lvh flex justify-center items-center">

            <img src="img/background.svg" className="absolute inset-0 opacity-30 w-full h-full object-cover mix-blend-overlay pointer-events-none" alt="" />

            <div className="bg-gray-100 z-10 rounded-2xl shadow-lg w-full max-w-sm p-8 mx-4">
                <span className="block text-3xl text-slate-900 text-center font-bold mb-4 -mt-3">REMSYSTEM - CRM</span>
                <form onSubmit={ handleSubmit } id="loginForm">
                    <article className="flex flex-col gap-4">
                        <label htmlFor="" className="block text-slate-700 text-xl font-semibold mb-2 ml-1">Correo Electrónico</label>
                        <input type="email" onChange={ handleInputChange} value={ formData.email } name="email" id="email" className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-300 ease-in-out shadow-sm" placeholder="nombre@empresa.com" />

                        <label htmlFor="" className="block text-slate-700 text-xl font-semibold mb-2 ml-1">Contraseña</label>
                        <input type="password" onChange={ handleInputChange } value={formData.password } name="password" id="password" className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-300 ease-in-out shadow-sm" placeholder="********" />
                        
                        { error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                        <button disabled={ isLoading } className="mt-5 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-slate-900/30 transform transition active:scale-95 cursor-pointer">
                            { isLoading ? 'Cargando...': 'Ingresar' }
                        </button>

                        <div>
                            <input onChange={ handleInputChange } checked={ formData.rememberMe } type="checkbox" name="rememberMe" /> Recuérdame 
                        </div>

                        <a href="#" className="text-center text-slate-800 underline">
                            ¿Olvidaste tu contraseña?
                        </a>

                        <a href="#" className="text-center text-slate-800 underline">
                            Registrarse
                        </a>
                    </article>
                </form>
                <span className="mt-4 block text-sm text-center text-gray-600 w-full">Copyright © 2017-2026 REMSYSTEM S.A.C.<br />Todos los derechos reservados.</span>
            </div>

        </section>
    </div>
    )
} 

export default LoginForm