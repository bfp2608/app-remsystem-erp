import { CirculoAvatar } from "../clientPage/CirculoAvatar"


import { mockClientes } from '../../utils/mockDataClientes';
import { mockUsuarios } from "../../utils/mockDataUsuarios";


type PropTabla = {
    cabecera : string[],
}

const cabecera : string[] = ["Nombre","Correo","Telefono","Ruc","Tipo"]

export function Tabla() {
    return(
        <div className="bg-gray-700/60 rounded-lg overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-600/60">
                    <tr>
                        {
                            cabecera.map((nombre, index) => 
                                <th key={index} className="text-left px-6 py-3 text-gray-300 font-semibold text-sm uppercase tracking-wider">
                                {nombre}
                                </th>
                            )
                        } 
                    </tr>
                </thead>
                
                {/*Por el momento con datos mock*/}
                <tbody className="divide-y divide-gray-600">
                    {if contactosPaginados
                        contactosPaginados.map(contacto => {

                        const key = esEmpresa(contacto) ? 'empresa-'+contacto.id_empresa : 'persona-'+contacto.id_persona

                        const nombre = esEmpresa(contacto) ? contacto.razon_social : contacto.nombres_completos

                        const ruc = esEmpresa(contacto) ? contacto.ruc : ""

                        const correo = esEmpresa(contacto) ? contacto.correo_corporativo : contacto.correo_personal

                        const celular = esEmpresa(contacto) ? contacto.celular_corporativo : contacto.celular_personal

                        const tipo = esEmpresa(contacto) ? "Empresa" : "Persona"

                        return(
                            <tr key={key} className="hover:bg-gray-700/80 transition-colors">
                                <td className="px-6 py-4 text-gray-300">
                                    <div className="flex items-center">

                                        <CirculoAvatar nombre={nombre} />

                                        {nombre}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-300">{correo}</td>
                                <td className="px-6 py-4 text-gray-300">{celular}</td>
                                <td className="px-6 py-4 text-gray-300">{ruc}</td>
                                <td className="px-6 py-4 text-gray-300">{tipo}</td>
                                <td className="px-6 py-4 text-gray-300">
                                    <EdicionTabla 
                                    onEditar={() => editarCliente(nombre)} 
                                    onEliminar={() => eliminarCliente(nombre)}/>
                                </td>   
                            </tr>
                        )
                    })}
                    
                </tbody>
            </table>
        </div>
    )
}