import { Pencil } from "lucide-react";
import { Usuario } from "../../types/usuario";
import { CirculoAvatar } from "../clientPage/CirculoAvatar";
import { Header_th } from "../tabla/Header_th";
import { Link } from "react-router-dom";
import { RUTAS } from "../../constans";

type UserTableProps = {
    users: Usuario[]
    order: {campo: keyof Usuario, direccion: "up" | "down" }
    onOrderChange: (campo: keyof Usuario, dir: "up" | "down") => void
}

export const UserTable = ({ users, order, onOrderChange }: UserTableProps) =>{
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
                        <Header_th text="Acciones"/>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-600">
                    {users.map((user, index) => (
                        <tr key={`${user.id_usuario}-${index}`} className="hover:bg-gray-700/80 transition-colors">
                            <td className="px-6 py-4 text-gray-300">
                                <div className="flex items-center">
                                    <CirculoAvatar nombre={user.nombre_usuario} />
                                    {user.nombre_usuario}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-gray-300">{user.email}</td>
                            <td className="px-6 py-4 text-gray-300">{user.telefono || 'N/A'}</td>
                            <td className="px-6 py-4 text-gray-300 max-w-[100px]">
                                <div className="flex gap-2 items-center">
                                    <Link 
                                        to={RUTAS.EDIT_USUARIO.replace(':id',user.id_usuario.toString())}
                                        className="edit-button"
                                        title="Editar"
                                    >
                                        <Pencil size={20}/>
                                        <span>Editar</span>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}