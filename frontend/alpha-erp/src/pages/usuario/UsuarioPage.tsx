//Es lo mismo que ClientPage 

import { mockUsuarios } from '../../utils/mockDataUsuarios';

import {CirculoAvatar} from '../../components/clientPage/CirculoAvatar'
import { CuadroBuscador } from '../../components/clientPage/CuadroBuscador'

import {CirclePlus} from 'lucide-react'
import { BotonBase } from '../../components/clientPage/BotonBase';

import { useState } from 'react';
import { Paginacion } from '../../components/clientPage/Paginacion';
import { EdicionTabla } from '../../components/clientPage/EdicionTabla';
import { FiltroTabla } from '../../components/clientPage/FiltroTabla';

//FUNCIONES-----------------------------

//Botón añadir
const botonAnadir = () =>{
    alert("Presionaste --Añadir--")
}

//Editar usuario
const editar = (key:string) =>{
    alert("Enviando a ..." + key)
}

//Eliminar cliente
const eliminar = (key:string) =>{
    alert("Eliminando ..." + key)
}

//FIN FUNCIONES-----------------------------



//Total de items que se muestran en la tabla
const ITEMS_POR_PAGINA = 20

export const UsuarioPage = () =>  {
    
    //Buscador----------------------
    const [textoBusqueda, setTextoBusqueda] = useState('')

    //Filtrar los datos
    const contactosFiltrados = mockUsuarios.filter(usuario => {
    const nombre = usuario.nombre_usuario
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
                <h1 className="text-2xl font-bold text-white">Usuarios</h1>
            </div>
            
            {/* Header con propiedades de clientes, buscador y botón añadir*/}
            <div className="flex items-center justify-between  mb-6">
                {/*Boton añadir */}
                <BotonBase onPresionar={botonAnadir} texto='Añadir' color='blue' icono={CirclePlus}/>

                {/*Buscador */}
                <CuadroBuscador buscar={manejarBuscador} />

                {/*Filtro*/}
                <FiltroTabla/>

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
                                Correo
                            </th>
                            <th className="text-left px-6 py-3 text-gray-300 font-semibold text-sm uppercase tracking-wider">
                                Telefono
                            </th>
                            <th className="text-left px-6 py-3 text-gray-300 font-semibold text-sm uppercase tracking-wider">
                                Cargo
                            </th>
                            <th className="text-left px-6 py-3 text-gray-300 font-semibold text-sm uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    
                    {/*Por el momento con datos mock*/}
                    <tbody className="divide-y divide-gray-600">
                        {contactosPaginados.map(usuario => {

                            const key = usuario.id_usuario

                            const nombre = usuario.nombre_usuario

                            const correo = usuario.email

                            const telefono = usuario.telefono

                            const cargo = usuario.id_tipo_usuario

                            const nombreCargo:string = cargo == 1 ?  "Administrador" : "Usuario"

                            return(
                                <tr key={key} className="hover:bg-gray-700/80 transition-colors">
                                    <td className="px-6 py-4 text-gray-300">
                                        <div className="flex items-center">

                                            <CirculoAvatar nombre={nombre} />

                                            {nombre}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-300">{correo}</td>
                                    <td className="px-6 py-4 text-gray-300">{telefono}</td>
                                    <td className="px-6 py-4 text-gray-300">{nombreCargo}</td>
                                    <td className="px-6 py-4 text-gray-300">
                                        <EdicionTabla 
                                        onEditar={() => editar(nombre)} 
                                        onEliminar={() => eliminar(nombre)}/>
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