import { useEffect, useMemo } from "react"
import { useAuth } from "../auth/useAuth"
import { ROLE_TYPES, RUTAS } from "../constans"
import { useClientsStore } from "../store/clientStore"
import { useUserStore } from "../store/userStore"
import { ArrowRight, Building2, PlusCircle, User, UserCog, UserPlus } from "lucide-react"
import { Link } from "react-router-dom"

export const DashboardPage = () =>{
    const { user: currentUser } = useAuth()
    const isAdmin = currentUser?.tipoUsuario === ROLE_TYPES.admin

    const { clients, fetchClients, isLoading: loadingClients } = useClientsStore()
    const { users, fetchUsers, isLoading: loadingUsers } = useUserStore()

    useEffect(() =>{
        if(currentUser?.id_organizacion){
            if(clients.length === 0) fetchClients(currentUser.id_organizacion)
            if(users.length === 0) fetchUsers(currentUser.id_organizacion)
        }
    }, [currentUser?.id_organizacion, clients.length, users.length, fetchClients, fetchUsers])

    const stats = useMemo(() =>{
        const totalClients = clients.length
        const totalCompanys = clients.filter(c => c.tipo_entidad === "Empresa").length
        const totalPersons = clients.filter(p => p.tipo_entidad === "Persona").length
        //Solo usuarios que estén activos
        const totalUsers = users.filter(u => u.activo !== false).length

        return { totalClients, totalCompanys, totalPersons, totalUsers }
    }, [clients, users])

    return(
        <div className="p-8 bg-slate-900 min-h-screen">

            <div className="mb-8 border-b border-s-slate-700 pb-6">
                <h1 className="text-3xl font-bold text-white mb-2">
                    Bienvenido, <span className="text-teal-400">{currentUser?.nombres || "Administrador"}</span>
                </h1>
                <p className="text-slate-400">
                    Aquí tienes un resumen de la organización <span className="font-semibold text-slate-300">{currentUser?.organizacion_nombre}</span>
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-lg flex flex-col overflow-hidden group">
                    <div className="p-6 flex-1">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-white">Cartera de Clientes</h2>
                            <div className="p-3 bg-teal-500/20 rounded-lg text-teal-400">
                                <User size={24}/>
                            </div>
                        </div>

                        {loadingClients 
                            ? (<div className="animate-pulse h-10 w-16 bg-slate-700 rounded mb-2"></div>)
                            : (<span className="text-4xl font-black text-white">{stats.totalClients}</span>)
                        }

                        <div className="mt-4 flex gap-4 text-sm text-slate-400">
                            <div className="flex items-center gap-1">
                                <Building2 size={16} className="text-slate-500" />
                                {stats.totalCompanys} Empresas
                            </div>
                            <div className="flex items-center gap-1">
                                <User size={16} className="text-slate-500" />
                                {stats.totalPersons} Personas
                            </div>
                        </div>

                    </div>

                    <Link 
                        to={RUTAS.CLIENTES}
                        className="bg-slate-700/50 hover:bg-slate-700 px-6 py-4 flex items-center justify-between text-teal-400 font-medium transition-colors"
                    >
                        Ver todos los clientes
                        <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform"/>
                    </Link>

                </div>
                
                <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-lg flex flex-col overflow-hidden group">
                    <div className="p-6 flex-1">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-white">Usuarios del Sistema</h2>
                            <div className="p-3 bg-teal-500/20 rounded-lg text-teal-400">
                                <UserCog size={24}/>
                            </div>
                        </div>

                        {loadingUsers 
                            ? (<div className="animate-pulse h-10 w-16 bg-slate-700 rounded mb-2"></div>)
                            : (<span className="text-4xl font-black text-white">{stats.totalUsers}</span>)
                        }

                        <p className="mt-4 text-sm text-slate-400 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                            Trabajadores activos actualmente
                        </p>

                    </div>

                    <Link 
                        to={RUTAS.USUARIOS}
                        className="bg-slate-700/50 hover:bg-slate-700 px-6 py-4 flex items-center justify-between text-teal-400 font-medium transition-colors"
                    >
                        Gestionar Usuarios
                        <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform"/>
                    </Link>

                </div>
                
                <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-lg p-6">
                    <h2 className="text-lg font-bold text-white mb-6">Accesos Rápidos</h2>

                    <div className="flex flex-col gap-3">
                        <Link 
                            to={RUTAS.NEW_CLIENTE}
                            className="flex items-center gap-3 w-full p-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-teal-500 hover:bg-teal-500/10 text-slate-300 hover:text-white transition-all group"
                        >
                            <PlusCircle size={20} className="text-teal-400 group-hover:scale-110 transition-transform" />
                            <span className="font-medium">Resgistrar Nuevo Cliente</span>
                        </Link>

                        {isAdmin &&
                            <Link
                                to={RUTAS.NEW_USUARIO}
                                className="flex items-center gap-3 w-full p-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500 hover:bg-indigo-500/10 text-slate-300 hover:text-white transition-all group"
                            >
                                <UserPlus size={20} className="text-indigo-400 group-hover:scale-110 transition-transform" />
                                <span>Añadir Nuevo Usuario</span>
                            </Link>
                        }
                    </div>


                </div>
                
            </div>

        </div>
    )
}