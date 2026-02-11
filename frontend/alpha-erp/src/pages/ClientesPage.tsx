// import {useState} from 'react'

// import {Contacto} from '../AaronTypes'
// import { mockContactos } from '../AaronUtils/AaronMockDataClientes'

export function ClientesPage() {
    return (
        <div className="min-h-screen bg-gray-900 p-6">
            {/* Header con búsqueda */}
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Contactos</h1>
                
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium">
                    + Nuevo
                </button>
            </div>
            
            {/* Búsqueda */}
            <div className="mb-4">
                <input 
                    type="text" 
                    placeholder="Buscar..."
                    className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
                />
            </div>
            
            {/* Tabla */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-700">
                        <tr>
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
                    
                    <tbody className="divide-y divide-gray-700">
                        {/* Fila 1 - Empresa */}
                        <tr className="hover:bg-gray-700 transition-colors">
                            <td className="px-6 py-4 text-white">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                                        A
                                    </div>
                                    ACME SOLUCIONES S.A.C.
                                </div>
                            </td>
                            <td className="px-6 py-4 text-gray-300">info@acme.com</td>
                            <td className="px-6 py-4 text-gray-300">+51 987 654 321</td>
                            <td className="px-6 py-4 text-gray-300">20123456789</td>
                            <td className="px-6 py-4 text-gray-300">Perú</td>
                        </tr>
                        
                        {/* Fila 2 - Persona */}
                        <tr className="hover:bg-gray-700 transition-colors">
                            <td className="px-6 py-4 text-white">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                                        J
                                    </div>
                                    ACME SOLUCIONES S.A.C., Juan Pérez
                                </div>
                            </td>
                            <td className="px-6 py-4 text-gray-300">juan@gmail.com</td>
                            <td className="px-6 py-4 text-gray-300">+51 912 345 678</td>
                            <td className="px-6 py-4 text-gray-300">-</td>
                            <td className="px-6 py-4 text-gray-300">Perú</td>
                        </tr>
                        
                        {/* Duplica más filas para ver cómo se ve llena */}
                    </tbody>
                </table>
            </div>
            
            {/* Paginación */}
            <div className="mt-4 flex items-center justify-between text-gray-400 text-sm">
                <span>1-80 / 100</span>
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded disabled:opacity-50">
                        ←
                    </button>
                    <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded">
                        →
                    </button>
                </div>
            </div>
        </div>
    )
}