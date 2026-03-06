import { esEmpresa } from '../../types/contactos';
import { mockContactos } from '../../utils/mockDataClientes'

import {CirculoAvatar} from '../../components/clientPage/CirculoAvatar'
import { CuadroBuscador } from '../../components/clientPage/CuadroBuscador'

import {CirclePlus} from 'lucide-react'
import { BotonBase } from '../../components/clientPage/BotonBase';

import { useState } from 'react';
import { Paginacion } from '../../components/clientPage/Paginacion';
import { EdicionTabla } from '../../components/clientPage/EdicionTabla';

//FUNCIONES-----------------------------

//Botón añadir
const botonAnadir = () =>{
    alert("Presionaste --Añadir--")
}

//Editar cliente
const editarCliente = (key:string) =>{
    alert("Enviando a editCliente..." + key)
}

//Eliminar cliente
const eliminarCliente = (key:string) =>{
    alert("Eliminando cliente..." + key)
}

//FIN FUNCIONES-----------------------------



//Total de items que se muestran en la tabla
const ITEMS_POR_PAGINA = 20

export const ClientesPage = () =>  {
    
    //Buscador----------------------
    const [textoBusqueda, setTextoBusqueda] = useState('')

    //Filtrar los datos
    const contactosFiltrados = mockContactos.filter(contacto => {
    const nombre = esEmpresa(contacto) 
        ? contacto.razon_social 
        : contacto.nombres_completos
    return nombre.toLowerCase().includes(textoBusqueda.toLowerCase())
    })

    const manejarBuscador = (texto:string) =>{
        setTextoBusqueda(texto)
        setPaginaActual(1)
    }
    //Fin Buscador----------------------

    //Paginación---------------------
    const [paginaActual, setPaginaActual] = useState(1)

    // Separar los datos según la página
    const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA
    const contactosPaginados = contactosFiltrados.slice(inicio, inicio + ITEMS_POR_PAGINA)

    //Fin paginación------------------

    return (
        <div className="min-h-screen bg-gray-800 p-6">
            {/* Header*/}
            <div className="mb-8 pb-4 flex border-b border-gray-700  items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Clientes</h1>
            </div>
            
            {/* Header con propiedades de clientes, buscador y botón añadir*/}
            <div className="flex items-center justify-between  mb-6">
                <BotonBase onPresionar={botonAnadir} texto='Añadir' color='blue' icono={CirclePlus}/>

                <CuadroBuscador buscar={manejarBuscador} />

                {/* Paginación */}
                <Paginacion 
                    totalItems={contactosFiltrados.length}
                    itemsPorPagina={ITEMS_POR_PAGINA}
                    paginaActual={paginaActual}
                    onAnterior={() => setPaginaActual(p => p - 1)}
                    onSiguiente={() => setPaginaActual(p => p + 1)}
                />
            </div>
            
            
            
            {/* Tabla */}
            <div className="bg-gray-700/60 rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-600/60">
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
                                Tipo
                            </th>
                            <th className="text-left px-6 py-3 text-gray-300 font-semibold text-sm uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    
                    {/*Por el momento con datos mock*/}
                    <tbody className="divide-y divide-gray-600">
                        {contactosPaginados.map(contacto => {

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
        </div>
    )
}