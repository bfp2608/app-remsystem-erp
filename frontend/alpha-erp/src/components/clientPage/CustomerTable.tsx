import { Link } from "react-router-dom"
import { ClienteNormalizado } from "../../types/client"
import { CustomerColumnType } from "../../types/filtros/filtrosClientes"
import { Header_th } from "../tabla/Header_th"
import { CirculoAvatar } from "./CirculoAvatar"
import { RUTAS } from "../../constans"
import { Pencil } from "lucide-react"

type CustomerTableProps = {
    contacts : ClienteNormalizado[]
    visibleColumns: CustomerColumnType
    order: { campo: keyof ClienteNormalizado, direccion: "up" | "down" }
    onOrderChange: ( campo: keyof ClienteNormalizado, dir: "up" | "down" ) => void
}

export const CustomerTable = ({ contacts, visibleColumns, order, onOrderChange}: CustomerTableProps) =>{
    return(
        <div className="overflow-auto flex-1 min-h-0">
            <table className="w-full bg-gray-700/60 rounded-lg">
                <thead className="bg-gray-600 sticky top-0 z-10">
                    <tr>
                        <Header_th 
                            text="Nombre"
                            type={'text'}
                            onSort={(dir) => onOrderChange("nombre", dir)}
                            isActive={order?.campo === "nombre"}
                            currentDirection={order?.campo === "nombre" ? order.direccion : 'up'}
                        />
                        {visibleColumns.email && <Header_th text="Correo electrónico" />}
                        {visibleColumns.phone && <Header_th text="Teléfono"/>}
                        {visibleColumns.taxId && <Header_th text="RUC" />}
                        {visibleColumns.type &&
                            <Header_th 
                                text="Tipo"
                                type={'text'}
                                onSort={(dir) => onOrderChange("tipo", dir)}
                                isActive={order?.campo === "tipo"}
                                currentDirection={order?.campo === "tipo" ? order.direccion : "up"}
                            />
                        }
                        {visibleColumns.website && <Header_th text="Sitio Web"/>}
                        {visibleColumns.economicActivity && 
                            <Header_th 
                            text="Actividad económica"
                            type={"text"}
                            onSort={(dir) => onOrderChange("actividadEconomica", dir)}
                            isActive={order.campo === "actividadEconomica"}
                            currentDirection={order?.campo === "actividadEconomica" ? order.direccion : "up"}
                            />
                        }
                        {visibleColumns.jobTitle && 
                            <Header_th 
                                text="Cargo"
                                type={"text"}
                                onSort={(dir) => onOrderChange("cargo", dir)}
                                isActive={order?.campo === "cargo"}
                                currentDirection={order?.campo === "cargo" ? order.direccion : "up"}
                            />
                        }
                        <Header_th text="Acciones"/>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-600">
                    {contacts.map((client, index) =>(
                        <tr key={`${client.id}-${index}`} className="hover:bg-gray-700/80 transition-colors">
                            <td className="px-6 py-4 text-gray-300 max-w-[100px] truncate" title={client.nombre}>
                                <div className="flex items-center uppercase">
                                    <CirculoAvatar nombre={client.nombre} />
                                    {client.nombre}
                                </div>
                            </td>
                            {visibleColumns.email && <td className="px-6 py-4 text-gray-300 max-w-[100px] truncate">{client.correo}</td>}
                            {visibleColumns.phone && <td className="px-6 py-4 text-gray-300 max-w-[100px] truncate">{client.telefono}</td>}
                            {visibleColumns.taxId && <td className="px-6 py-4 text-gray-300 max-w-[100px] truncate">{client.ruc}</td>}
                            {visibleColumns.type && <td className="px-6 py-4 text-gray-300 max-w-[100px] truncate">{client.tipo}</td>}
                            {visibleColumns.website && <td className="px-6 py-4 text-gray-300 max-w-[100px] truncate">{client.sitioWeb}</td>}
                            {visibleColumns.economicActivity && <td className="px-6 py-4 text-gray-300 max-w-[100px] truncate">{client.actividadEconomica}</td>}
                            {visibleColumns.jobTitle && <td className="px-6 py-4 text-gray-300 max-w-[100px] truncate">{client.cargo}</td>}
                            <td className="px-6 py-4 text-gray-300 max-w-[100px] truncate">
                                <div className="flex gap-2 items-center">
                                    <Link 
                                        to={RUTAS.EDIT_CLIENTE.replace(':id', client.id.toString())}
                                        className="edit-button"
                                        title="Editar"
                                    >
                                        <Pencil width={20} />
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