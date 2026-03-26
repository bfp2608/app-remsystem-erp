import { ClienteNormalizado } from '../../types/client';
import { mockClientes } from '../../utils/mockDataClientes'

import {CirculoAvatar} from '../../components/clientPage/CirculoAvatar'
import { CuadroBuscador } from '../../components/clientPage/CuadroBuscador'

import {CirclePlus, Pencil } from 'lucide-react'

import { useState } from 'react';
import { Paginacion } from '../../components/clientPage/Paginacion';

import { FiltroTablaClientes } from '../../components/clientPage/FiltroTablaClientes'
import { MostrarColumnasClientes } from '../../components/clientPage/MostrarColumnasClientes';
import { Header_th } from '../../components/tabla/Header_th';
import { Link } from 'react-router-dom';
import { TipoFiltrosCliente, filtroVacioCliente, columnasInicioClientes, aplicarFiltroClientes } from '../../types/filtros/filtrosClientes';
import { normalizar } from '../../utils/normalizarClientes';

//FIN FUNCIONES-----------------------------

const clientesNormalizados:ClienteNormalizado[] = normalizar(mockClientes)

//Total de items que se muestran en la tabla
const ITEMS_POR_PAGINA = 20

export const ClientesPage = () =>  {

    const [orden, setOrden] = useState<{campo: keyof ClienteNormalizado, direccion: "up" | "down"}>({campo: 'nombre', direccion: "up"})
        
    const [filtrosActivos, setFiltrosActivos] = useState<TipoFiltrosCliente>(filtroVacioCliente)


    const [columnasVisibles, setColumnasVisibles] = useState(columnasInicioClientes)

    const handleColumna = (columna: keyof typeof columnasVisibles) => {
        setColumnasVisibles(prev => ({
            ...prev,
            [columna]: !prev[columna]
        }))
    }
    
    //Buscador----------------------
    const [textoBusqueda, setTextoBusqueda] = useState('')

    //Filtrar los datos del buscador y del filtro de la tabla
    const contactosFiltrados = clientesNormalizados.filter(cliente => {

        const coincideNombre = cliente.nombre.toLowerCase().includes(textoBusqueda.toLowerCase())
        const coincideCorreo = aplicarFiltroClientes(filtrosActivos.correo, cliente.correo)
        const coincideTipo = aplicarFiltroClientes(filtrosActivos.tipo,cliente.tipo)
        const coincideTelefono = aplicarFiltroClientes(filtrosActivos.telefono, cliente.telefono)
        const coincideWeb = aplicarFiltroClientes(filtrosActivos.sitioWeb, cliente.sitioWeb)


        const coincideActividadEco = filtrosActivos.actividadEconomica === "" ||
            cliente.actividadEconomica === filtrosActivos.actividadEconomica
        const coincideCargo = filtrosActivos.cargo === "" ||
            cliente.cargo === filtrosActivos.cargo   

        return coincideNombre && coincideCorreo && coincideTelefono && coincideTipo && coincideWeb && coincideActividadEco && coincideCargo
    })

    const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
        if (!orden) return 0

        const valA = a[orden.campo] ?? null
        const valB = b[orden.campo] ?? null
        

        // Valores vacíos siempre al final, sin importar la dirección
        if (!valA && !valB) return 0
        if (!valA) return 1
        if (!valB) return -1

        return orden.direccion === "up" 
            ? String(valA).localeCompare(String(valB), 'es')
            : String(valB).localeCompare(String(valA), 'es')
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
    const contactosPaginados = contactosOrdenados.slice(inicio, inicio + ITEMS_POR_PAGINA)

    //Fin paginación------------------

    return (
        <div className="h-screen flex flex-col bg-gray-800 p-4">
            <div className='shrink-0'>
                {/* Header*/}
            <div className="mb-3 pb-3 flex border-b border-gray-700  items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Clientes</h1>
                <div className='flex items-center gap-4'>
                    {/*Filtro*/}
                    <FiltroTablaClientes onAplicar={(filtros) =>{
                        setFiltrosActivos(filtros)
                        setPaginaActual(1)
                    }}/>
                    
                    <MostrarColumnasClientes columnas={columnasVisibles} onCambiar={handleColumna}/>
                </div>
            </div>
            
            {/* Header con propiedades de clientes, buscador y botón añadir*/}
            <div className="flex items-center justify-between mb-3">
                <Link 
                to="#" 
                className='add-button'
                >
                    <span><CirclePlus /></span>Añadir
                </Link>

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
            </div>
            <div className="overflow-auto flex-1 min-h-0">
                {/* Tabla */}
            <div>
                <table className="w-full bg-gray-700/60 rounded-lg">
                    <thead className="bg-gray-600 sticky top-0 z-10">
                        <tr>
                            <Header_th 
                                texto='Nombre'
                                tipo={'texto'}
                                onOrdenar={(dir) =>{
                                setOrden({
                                    campo: "nombre",
                                    direccion: dir
                                })
                            }}
                                estaActivo = {orden?.campo === "nombre"}
                                direccionActual={orden?.campo === "nombre" ? orden.direccion : "up"}
                            />
                            {
                                columnasVisibles.correo &&
                            <Header_th texto='Correo electrónico'/>
                            }
                            
                            {
                                columnasVisibles.telefono &&
                                <Header_th texto='Teléfono'/>
                            }
                            {
                                columnasVisibles.ruc &&
                                <Header_th texto='Ruc'/>
                            }
                            {
                                columnasVisibles.tipo &&
                                <Header_th texto='Tipo'
                                    tipo={'texto'}
                                    onOrdenar={(dir) =>{
                                        setOrden({
                                            campo: "tipo",
                                            direccion: dir
                                        })
                                    }}
                                    estaActivo = {orden?.campo === "tipo"}
                                    direccionActual={orden?.campo === "tipo" ? orden.direccion : "up"}
                                />
                            }
                            {
                                columnasVisibles.sitioWeb &&
                                <Header_th texto='Sitio web'/>
                            }
                            {
                                columnasVisibles.actividadEconomica &&
                                <Header_th texto='Actividad económica'
                                    tipo={'texto'}
                                    onOrdenar={(dir) =>{
                                        setOrden({
                                            campo: "actividadEconomica",
                                            direccion: dir
                                        })
                                    }}
                                    estaActivo = {orden?.campo === "actividadEconomica"}
                                    direccionActual={orden?.campo === "actividadEconomica" ? orden.direccion : "up"}
                                />
                            }
                            {
                                columnasVisibles.cargo &&
                                <Header_th texto='Cargo'
                                    tipo={'texto'}
                                    onOrdenar={(dir) =>{
                                        setOrden({
                                            campo: "cargo",
                                            direccion: dir
                                        })
                                    }}
                                    estaActivo = {orden?.campo === "cargo"}
                                    direccionActual={orden?.campo === "cargo" ? orden.direccion : "up"}
                                />
                            }
                            <Header_th texto='Acciones'/>
                        </tr>
                    </thead>
                    
                    {/*Por el momento con datos mock*/}
                    <tbody className="divide-y divide-gray-600">
                        {contactosPaginados.map(cliente => {

                            const key = cliente.id

                            const nombre = cliente.nombre

                            const ruc = cliente.ruc

                            const correo = cliente.correo

                            const celular = cliente.telefono

                            const tipo = cliente.tipo

                            const web = cliente.sitioWeb

                            const actividadEconomica = cliente.actividadEconomica

                            const cargo = cliente.cargo

                            return(
                                <tr key={key} className="hover:bg-gray-700/80 transition-colors">
                                    <td className="px-6 py-4 text-gray-300 max-w-[100px] truncate" title={nombre}>
                                        <div className="flex items-center">

                                            <CirculoAvatar nombre={nombre} />

                                            {nombre}
                                        </div>
                                    </td>
                                    {
                                        columnasVisibles.correo && 
                                        <td className="px-6 py-4 text-gray-300 max-w-[100px] truncate" title={correo}>{correo}</td>
                                    }
                                    {
                                        columnasVisibles.telefono && 
                                        <td className="px-6 py-4 text-gray-300 max-w-[100px] truncate" title={celular}>{celular}</td>
                                    }
                                    {
                                        columnasVisibles.ruc && 
                                        <td className="px-6 py-4 text-gray-300 max-w-[100px] truncate" title={ruc}>{ruc}</td>
                                    }
                                    {
                                        columnasVisibles.tipo && 
                                        <td className="px-6 py-4 text-gray-300 max-w-[100px] truncate" title={tipo}>{tipo}</td>
                                    }
                                    {
                                        columnasVisibles.sitioWeb && 
                                        <td className="px-6 py-4 text-gray-300 max-w-[100px] truncate" title={web}>{web}</td>
                                    }
                                    {
                                        columnasVisibles.actividadEconomica && 
                                        <td className="px-6 py-4 text-gray-300 max-w-[100px] truncate" title={actividadEconomica}>{actividadEconomica}</td>
                                    }
                                    {
                                        columnasVisibles.cargo && 
                                        <td className="px-6 py-4 text-gray-300 max-w-[100px] truncate" title={cargo}>{cargo}</td>
                                    }
                                    <td className="px-6 py-4 text-gray-300 max-w-[140px] truncate items-start">
                                        <div className='flex gap-2 items-center'>
                                            <Link 
                                            to={`/dashboard/clientes/edit/${key}`}
                                            className='edit-button'
                                            title='Editar'
                                            >
                                                <Pencil width={20} />
                                                <span>Editar</span>
                                            </Link>
                                        </div>
                                    </td>   
                                </tr>
                            )
                        })}
                        
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    )
}