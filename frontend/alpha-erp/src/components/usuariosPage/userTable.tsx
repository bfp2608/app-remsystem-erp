import { useState } from "react";
import { Pencil, UserCheck, UserMinus } from "lucide-react";
import { Usuario } from "../../types/usuario";
import { CirculoAvatar } from "../clientPage/CirculoAvatar";
import { Header_th } from "../tabla/Header_th";
import { Link } from "react-router-dom";
import { ROLE_TYPES, RUTAS } from "../../constans";
import { useAuth } from "../../auth/useAuth";
import { ModalConfirmacion } from "../ModalConfirmacion";


type UserTableProps = {
    users: Usuario[]
    order: {campo: keyof Usuario, direccion: "up" | "down" }
    onOrderChange: (campo: keyof Usuario, dir: "up" | "down") => void
    onToggleStatus: (id: number, currentStatus: boolean) => void
}

export const UserTable = ({ users, order, onOrderChange, onToggleStatus }: UserTableProps) =>{

    const { user } = useAuth()

    const isAdmin = user?.tipoUsuario === ROLE_TYPES.admin

    // Estados para el Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToToggle, setUserToToggle] = useState<{ id: number, nombre: string, status: boolean } | null>(null);

    // Manejador del click en el botón de estado
    const handleStatusClick = (id: number, nombre: string, currentStatus: boolean) => {
        if (currentStatus) {
            // Si está activo (true), abrimos modal para confirmar desactivación
            setUserToToggle({ id, nombre, status: currentStatus });
            setIsModalOpen(true);
        } else {
            // Si está inactivo, lo activamos directamente sin preguntar
            onToggleStatus(id, currentStatus);
        }
    };

    const confirmToggle = () => {
        if (userToToggle) {
            onToggleStatus(userToToggle.id, userToToggle.status);
            setIsModalOpen(false);
            setUserToToggle(null);
        }
    };

    return(
        <div className="overflow-auto flex-1 min-h-0">
            <table className="w-full bg-gray-700/60 rounded-lg">
                <thead className="bg-gray-600 sticky top-0 z-10">
                    <tr>
                        <Header_th 
                            text="Nombre"
                            type={'text'}
                            onSort={(dir) => onOrderChange("nombre_usuario", dir)}
                            isActive={order?.campo === "nombre_usuario"}
                            currentDirection={order?.campo === "nombre_usuario" ? order.direccion : "up"}
                        />
                        <Header_th text="Correo"/>
                        <Header_th text="Teléfono"/>
                        <Header_th text="Rol / Tipo"
                            type={'text'}
                            onSort={(dir) => onOrderChange("tipo_usuario", dir)}
                            isActive={order?.campo === "tipo_usuario"}
                            currentDirection={order?.campo === "tipo_usuario" ? order.direccion : "up"}
                        />
                        {isAdmin && <Header_th text="Acciones"/>}
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-600">
                    {users.map((user, index) => {
                        const isActive = user.activo !== false
                        return (
                        <tr key={`${user.id_usuario}-${index}`} className={`transition-colors ${isActive ? 'hover:bg-gray-700/80' : 'bg-slate-900/50 opacity-60'}  `}>
                            <td className="px-6 py-4 text-gray-300">
                                <div className="flex items-center uppercase">
                                    <CirculoAvatar nombre={user.nombre_usuario} />
                                    <span className={!isActive ? 'line-through text-slate-500' : ''}>
                                        {user.nombre_usuario}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-gray-300">{user.email}</td>
                            <td className="px-6 py-4 text-gray-300">{user.telefono || 'N/A'}</td>
                            <td className="px-6 py-4 text-gray-300">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${isActive ? 'bg-teal-500/20 text-teal-300' : 'bg-slate-600/50 text-slate-400'}`}>
                                    {user.tipo_usuario?.tipo}
                                </span>
                            </td>
                            {isAdmin &&
                                <td className="px-6 py-4 text-gray-300 max-w-[100px]">
                                    <div className="flex gap-2 items-center">
                                        <Link 
                                            to={RUTAS.EDIT_USUARIO.replace(':id',user.id_usuario.toString())}
                                            className="edit-button "
                                            title="Editar"
                                        >
                                            <Pencil size={20}/>
                                        </Link>
                                        <button
                                                type="button"
                                                onClick={() => handleStatusClick(user.id_usuario, user.nombre_usuario, isActive)}
                                                className={isActive ? 'delete-button' : 'activate-button'}
                                                title={isActive ? "Desactivar" : "Activar"}
                                            >
                                                {isActive ? <UserMinus size={20}/> : <UserCheck size={20}/>}
                                            </button>
                                    </div>
                                </td>
                            }
                        </tr>
                    )})}
                </tbody>
            </table>

            {/* Modal de Confirmación */}
            <ModalConfirmacion 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmToggle}
                titulo="Confirmar Desactivación"
                mensaje={
                    <p>¿Estás seguro de que deseas desactivar al usuario <b>{userToToggle?.nombre}</b>? No podrá acceder al sistema hasta que sea reactivado.</p>
                }
                textoConfirmar="Desactivar Usuario"
                variante="danger"
            />
        </div>
    )
}