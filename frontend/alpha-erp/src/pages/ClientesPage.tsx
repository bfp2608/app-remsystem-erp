// import {useState} from 'react'

// import {Contacto} from '../AaronTypes'
// import { mockContactos } from '../AaronUtils/AaronMockDataClientes'

import {CirculoAvatar} from '../components/CirculoAvatar'

import {ArrowLeft, ArrowRight, CirclePlus} from 'lucide-react'
import { CuadroBuscador } from '../components/CuadroBuscador'


//Función que se manda al buscador para obtener su texto
const manejarBuscador = (texto:string) =>{
    alert("Buscaste: " + texto)
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
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-gray-200 px-3 py-2 rounded font-medium transition-colors">
                    <CirclePlus/> 
                    Añadir
                </button>

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
                                País
                            </th>
                        </tr>
                    </thead>
                    
                    <tbody className="divide-y divide-gray-600">
                        {/* Fila 1 - Empresa */}
                        <tr className="hover:bg-gray-600 transition-colors divide-x divide-gray-500">
                            <td className="px-6 py-4 text-white ">
                                <div className="flex items-center">


                                    <CirculoAvatar nombre='ACME SOLUCIONES S.A.C.' />


                                    ACME SOLUCIONES S.A.C.
                                </div>
                            </td>
                            <td className="px-6 py-4 text-gray-300">info@acme.com</td>
                            <td className="px-6 py-4 text-gray-300">+51 987 654 321</td>
                            <td className="px-6 py-4 text-gray-300">20123456789</td>
                            <td className="px-6 py-4 text-gray-300">Perú</td>
                        </tr>
                        
                        {/* Fila 2 - Persona */}
                        <tr className="hover:bg-gray-600 transition-colors divide-x divide-gray-500">
                            <td className="px-6 py-4 text-white">
                                <div className="flex items-center">
                                    <CirculoAvatar nombre='Juan Pérez' />
                                    ACME SOLUCIONES S.A.C., Juan Pérez
                                </div>
                            </td>
                            <td className="px-6 py-4 text-gray-300">juan@gmail.com</td>
                            <td className="px-6 py-4 text-gray-300">+51 912 345 678</td>
                            <td className="px-6 py-4 text-gray-300">-</td>
                            <td className="px-6 py-4 text-gray-300">Perú</td>
                        </tr>
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