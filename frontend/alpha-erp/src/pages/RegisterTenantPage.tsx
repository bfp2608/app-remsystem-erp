import { Building2, CreditCard, Mail, User, LockIcon, Eye, EyeOff } from "lucide-react"
import { useTenantForm } from "../hooks/useTenantForm"
import { handlePressKey } from "../utils/validators"
import { Link } from "react-router-dom"
import { useState } from "react"

export const RegisterTenantPage = () =>{
    const { formData, isSubmitting, handleInputChange, handleSubmit } = useTenantForm()
    
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false) // Este era el que faltaba en tu código

    return(
        // Mismo fondo oscuro
        <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-slate-900">
            
            {/* El SVG de fondo */}
            <img 
                src="img/background.svg" 
                className="absolute inset-0 opacity-30 w-full h-full object-cover mix-blend-overlay pointer-events-none" 
                alt="Fondo decorativo" 
            />

            <div className="max-w-2xl w-full bg-slate-800/95 backdrop-blur-sm z-10 rounded-xl shadow-2xl border border-slate-700 p-8">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Crea tu cuenta empresarial</h1>
                    <p className="text-slate-400">Registra tu organización y a tu administrador principal</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    <fieldset disabled={isSubmitting} className="flex flex-col gap-4">
                        <h2 className="text-sm font-bold text-teal-400 uppercase tracking-wider border-b border-slate-700 pb-2">
                            Datos de la organización
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5"/>
                                <input 
                                    type="text"
                                    placeholder="RUC"
                                    maxLength={11}
                                    onKeyDown={handlePressKey}
                                    value={formData.ruc}
                                    onChange={(e) => handleInputChange('ruc', e.target.value)}
                                    className="w-full bg-slate-900/50 border border-slate-700 text-white pl-10 py-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition-all shadow-inner"
                                />
                            </div>

                            <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5"/>
                                <input 
                                    type="text"
                                    placeholder="Razón Social"
                                    value={formData.razon_social}
                                    onChange={(e) => handleInputChange('razon_social', e.target.value)}
                                    className="w-full bg-slate-900/50 border border-slate-700 text-white pl-10 py-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition-all shadow-inner"
                                />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset disabled={isSubmitting} className="flex flex-col gap-4">
                        <h2 className="text-sm font-bold text-teal-400 uppercase tracking-wider border-b border-slate-700 pb-2">
                            Administrador Principal
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div className="relative md:col-span-2">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5"/>
                                <input 
                                    type="text" 
                                    placeholder="Nombre Completo"
                                    value={formData.nombre_usuario}
                                    onChange={(e) => handleInputChange('nombre_usuario', e.target.value)}
                                    className="w-full bg-slate-900/50 border border-slate-700 text-white pl-10 py-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition-all shadow-inner"
                                />
                            </div>
                            
                            <div className="relative md:col-span-2">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5"/>
                                <input 
                                    type="email" 
                                    placeholder="Correo electrónico"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className="w-full bg-slate-900/50 border border-slate-700 text-white pl-10 py-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition-all shadow-inner"
                                />
                            </div>

                            {/* Input Contraseña */}
                            <div className="relative">
                                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5"/>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Contraseña"
                                    value={formData.contrasenia}
                                    onChange={(e) => handleInputChange('contrasenia', e.target.value)}
                                    className="w-full bg-slate-900/50 border border-slate-700 text-white pl-10 pr-12 py-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition-all shadow-inner"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-teal-400 focus:outline-none transition-colors cursor-pointer"
                                    disabled={isSubmitting}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            {/* Input Confirmar Contraseña (Usa su propio estado showConfirmPassword) */}
                            <div className="relative">
                                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5"/>
                                <input 
                                    type={showConfirmPassword ? "text" : "password"} 
                                    placeholder="Confirmar Contraseña"
                                    value={formData.confirmar_contrasenia}
                                    onChange={(e) => handleInputChange('confirmar_contrasenia', e.target.value)}
                                    className="w-full bg-slate-900/50 border border-slate-700 text-white pl-10 pr-12 py-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition-all shadow-inner"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-teal-400 focus:outline-none transition-colors cursor-pointer"
                                    disabled={isSubmitting}
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                        </div>

                    </fieldset>

                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className={`mt-4 w-full py-3.5 rounded-xl font-bold transition-all duration-300 shadow-lg
                            ${isSubmitting 
                                ? 'bg-teal-600/50 text-white/50 cursor-not-allowed shadow-none' 
                                : 'bg-teal-500 hover:bg-teal-400 text-white active:scale-[0.98] hover:shadow-teal-500/25'
                            }`}
                    >
                        {isSubmitting ? 'Registrando cuenta...' : 'Crear Organización'}
                    </button>

                    <div className="text-center mt-4 border-t border-slate-700 pt-6">
                        <p className="text-slate-400 text-sm">
                            ¿Ya tienes una cuenta?{' '}
                            <Link 
                                to="/" 
                                className="text-teal-400 hover:text-teal-300 hover:underline font-medium transition-colors"
                            >
                                Iniciar sesión
                            </Link>
                        </p>
                    </div>

                </form>
            </div>
        </div>
    )
}