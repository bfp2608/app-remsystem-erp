import { useNavigate, useParams } from "react-router-dom"
import { useUserForm } from "../../hooks/useUserForm"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { ROLE_TYPES, RUTAS } from "../../constans"

export const UserForm = () =>{
    const { id } = useParams()
    const navigate = useNavigate()
    const { formData, isSubmitting, handleInputChange, handleSubmit } = useUserForm(id)

    const [showPassword, setShowPassword] = useState(false)

    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8 bg-gray-900 min-h-screen">

            <div className="mb-2 pb-3 border-b border-gray-700">
                <h1 className="text-2xl font-bold text-white">
                    {id ? 'Editar usuario' : 'Nuevo usuario'}
                </h1>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">

                <h2 className="text-xl font-semibold text-white mb-6">
                    Datos de la cuenta
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="flex flex-col gap-2">
                        <label htmlFor="nombre_usuario" className="text-gray-300 font-medium">
                            Nombre Completo <span className="text-red-600">*</span>
                        </label>
                        <input 
                            type="text" 
                            name="nombre_usuario"
                            value={formData.nombre_usuario}
                            onChange={e => handleInputChange("nombre_usuario", e.target.value)}
                            className="bg-gray-900 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                            placeholder="Ej. Ana García"
                            disabled={isSubmitting}
                        />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-gray-300 font-medium">
                            Correo Electrónico <span className="text-red-600">*</span>
                        </label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={e => handleInputChange("email", e.target.value)}
                            className="bg-gray-900 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                            placeholder="ana@empresa.com"
                            disabled={isSubmitting}
                        />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <label htmlFor="telefono" className="text-gray-300 font-medium">
                            Teléfono <span className="text-red-600">*</span>
                        </label>
                        <input 
                            type="telefono" 
                            name="telefono"
                            value={formData.telefono}
                            onChange={e => handleInputChange("telefono", e.target.value)}
                            className="bg-gray-900 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                            placeholder="Teléfono"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="id_tipo_usurio" className="text-gray-300 font-medium">
                            Rol del Usuario <span className="text-red-600">*</span>
                        </label>
                        <select 
                            name="id_tipo_usurio"
                            value={formData.id_tipo_usuario}
                            onChange={e => handleInputChange("id_tipo_usuario", Number(e.target.value))}
                            className="appearance-none bg-gray-900 border border-gray-600 text-white rounded-lg
                            px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors cursor-pointer"
                            disabled={isSubmitting}
                        >
                            <option value="" disabled hidden>Seleccionar</option>
                            <option value={ROLE_TYPES.admin}>Administrador</option>
                            <option value={ROLE_TYPES.user}>Trabajador</option>
                            {/* <option value={ROLE_TYPES.manager}>Gerente</option> */}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="contrasenia" className="text-gray-300 font-medium">
                            Contraseña <span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                            <input 
                                type={showPassword ? 'text' : 'password'}
                                name="contrasenia"
                                value={formData.contrasenia}
                                onChange={e => handleInputChange("contrasenia", e.target.value)}
                                className="bg-gray-900 border border-gray-600 text-white rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                                placeholder="********"
                                disabled={isSubmitting}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                                disabled={isSubmitting}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="confirmar_contrasenia" className="text-gray-300 font-medium">
                            Confirmar Contraseña <span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                            <input 
                                type={showPassword ? 'text' : 'password'}
                                name="confirmar_contrasenia"
                                value={formData.confirmar_contrasenia}
                                onChange={e => handleInputChange("confirmar_contrasenia", e.target.value)}
                                className="bg-gray-900 border border-gray-600 text-white rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                                placeholder="********"
                                disabled={isSubmitting}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                                disabled={isSubmitting}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                </div>

            </div>

            <div className="flex justify-end items-center gap-2 mt-2">

                <button
                    type="button"
                    onClick={() => navigate(RUTAS.USUARIOS)}
                    disabled={isSubmitting}
                    className="text-gray-400 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-900 hover:text-white transition-colors duration-300"
                >
                    Cancelar
                </button>

                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex justify-center items-center gap-2 px-6 py-2 rounded-md font-medium transition-all duration-300
                        ${isSubmitting 
                            ? 'bg-teal-600/60 cursor-not-allowed text-white/80' 
                            : 'bg-teal-500 text-white cursor-pointer hover:bg-teal-400 active:scale-95'
                        }`}
                >
                    {isSubmitting ? 'Guardando...' : 'Guardar Usuario'}
                </button>
            </div>

        </form>
    )
}