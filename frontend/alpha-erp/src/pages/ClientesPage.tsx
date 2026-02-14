// import {useState} from 'react'

import { esEmpresa } from '../types/contactos';
import { mockContactos } from '../utils/mockDataClientes'

import {CirculoAvatar} from '../components/CirculoAvatar'
import { CuadroBuscador } from '../components/CuadroBuscador'

import {ArrowLeft, ArrowRight, CirclePlus} from 'lucide-react'
import { BotonBase } from '../components/BotonBase';

//Función que se manda al buscador para obtener su texto
const manejarBuscador = (texto:string) =>{
    alert("Buscaste: " + texto)
}

const botonAnadir = () =>{
    alert("Presionaste --Añadir--")
}

export function ClientesPage() {
    return (
        <div className="min-h-screen bg-gray-900 p-6">
            {/* Header*/}
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Contactos</h1>
            </div>
            
            {/* Header con propiedades de clientes, buscador y botón añadir*/}
            <div className="flex items-center justify-between mb-4">
                <BotonBase onPresionar={botonAnadir} texto='Añadir' color='blue' icono={CirclePlus}/>

                <CuadroBuscador buscar={manejarBuscador} />
            </div>
            
            {/* Tabla */}
            <div className="bg-gray-700 rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-800">
                        <tr className='divide-x divide-gray-700'>
                            <th className="text-left px-6 py-3 text-gray-300 font-semibold text-sm uppercase tracking-wider">
                                Nombre
                            </th>
                            <th className="text-left px-6 py-3 text-gray-300 font-semibold text-sm uppercase tracking-wider">
                                Correo electrónico
                            </th>
                            <th className="text-left px-6 py-3 text-gray-300 font-semibold text-sm uppercase tracking-wider">
                                Teléfono
                            </th>
                            <th className="text-left px-6 py-3 text-gray-300 font-semibold text-sm uppercase tracking-wider">
                                RUC
                            </th>
                            <th className="text-left px-6 py-3 text-gray-300 font-semibold text-sm uppercase tracking-wider">
                                Tipo
                            </th>
                        </tr>
                    </thead>
                    
                    <tbody className="divide-y divide-gray-600">
                        {mockContactos.map(contacto => {
                            const key = esEmpresa(contacto) ? 'empresa-'+contacto.id_empresa : 'persona-'+contacto.id_persona
                            const nombre = esEmpresa(contacto) ? contacto.razon_social : contacto.nombres_completos
                            const ruc = esEmpresa(contacto) ? contacto.ruc : ""
                            const correo = esEmpresa(contacto) ? contacto.correo_corporativo : contacto.correo_personal
                            const celular = esEmpresa(contacto) ? contacto.celular_corporativo : contacto.celular_personal
                            const tipo = esEmpresa(contacto) ? "Empresa" : "Persona"

                            return(
                                <tr key={key} className="hover:bg-gray-600 transition-colors divide-x divide-gray-500">
                                    <td className="px-6 py-4 text-white ">
                                        <div className="flex items-center">


                                            <CirculoAvatar nombre={nombre} />


                                            {nombre}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-300">{correo}</td>
                                    <td className="px-6 py-4 text-gray-300">{celular}</td>
                                    <td className="px-6 py-4 text-gray-300">{ruc}</td>
                                    <td className="px-6 py-4 text-gray-300">{tipo}</td>
                                </tr>
                            )
                        })}
                        
                    </tbody>
                </table>
            </div>
            
            {/* Paginación */}
            <div className="mt-4 flex items-center justify-between text-gray-400 text-sm">
                <span>1-80 / 100</span>
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 hover:cursor-pointer rounded text-gray-300 transition-colors">
                        <ArrowLeft/>
                    </button>
                    <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 hover:cursor-pointer rounded text-gray-300 transition-colors">
                        <ArrowRight/>
                    </button>
                </div>
            </div>
        </div>
    )
}