import { esEmpresa } from '../../types/cliente';
import { mockClientes } from '../../utils/mockDataClientes'

import {CirculoAvatar} from '../../components/clientPage/CirculoAvatar'
import { CuadroBuscador } from '../../components/clientPage/CuadroBuscador'

import {CirclePlus} from 'lucide-react'
import { BotonBase } from '../../components/clientPage/BotonBase';

import { useState } from 'react';
import { Paginacion } from '../../components/clientPage/Paginacion';
import { EdicionTabla } from '../../components/clientPage/EdicionTabla';

import { FiltroTablaClientes } from '../../components/clientPage/FiltroTablaClientes'
import { MostrarColumnasClientes } from '../../components/clientPage/MostrarColumnasClientes';
import { Header_th } from '../../components/tabla/Header_th';


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

type CampoOrdenCliente = 'nombre' | 'correo' | 'telefono' | 'tipo' | 'ruc' | 'cargo' | 'sitioWeb' | 'actividadEconomica'

type FiltrosValor = { correo: string; tipo: string, telefono: string, sitioWeb:string, actividadEconomica: string, cargo: string }

const filtroInicio:FiltrosValor = {correo: "", tipo: "", telefono: "", sitioWeb: "",actividadEconomica: "", cargo: "" }

//Total de items que se muestran en la tabla
const ITEMS_POR_PAGINA = 20

export const ClientesPage = () =>  {

    const [orden, setOrden] = useState<{campo: CampoOrdenCliente, direccion: "up" | "down"}>({campo: 'nombre', direccion: "up"})
        
    const [filtrosActivos, setFiltrosActivos] = useState<FiltrosValor>(filtroInicio)

    const [columnasVisibles, setColumnasVisibles] = useState({
        correo: true,
        telefono: true,
        ruc: true,
        tipo: true,
        sitioWeb: true,
        actividadEconomica: true,
        cargo: true   
    })

    const handleColumna = (columna: keyof typeof columnasVisibles) => {
        setColumnasVisibles(prev => ({
            ...prev,
            [columna]: !prev[columna]
        }))
    }
    
    //Buscador----------------------
    const [textoBusqueda, setTextoBusqueda] = useState('')

    //Filtrar los datos del buscador y del filtro de la tabla
        const contactosFiltrados = mockClientes.filter(cliente => {
            const nombre = esEmpresa(cliente) ? cliente.razon_social : cliente.nombres_completos
            const correo = esEmpresa(cliente) ? cliente.correo_corporativo : cliente.correo_personal
            const telefono = esEmpresa(cliente) ? cliente.celular_corporativo : cliente.celular_personal
            const tipo = esEmpresa(cliente)
            const web = esEmpresa(cliente) ? cliente.sitio_web : null
            const actividadEconomica = esEmpresa(cliente) ? cliente.actividad_economica : null
            const cargo = esEmpresa(cliente) ? null : cliente.cargo

            const coincideNombre = nombre.toLowerCase().includes(textoBusqueda.toLowerCase())


            const coincideCorreo = filtrosActivos.correo === "" || 
                (filtrosActivos.correo === "Con correo" ? !!correo : !correo)
            const coincideTipo = filtrosActivos.tipo === "" ||
                (filtrosActivos.tipo === "Empresa" ? !!tipo : !tipo)
            const coincideTelefono = filtrosActivos.telefono === "" ||
                (filtrosActivos.telefono === "Con teléfono" ? !!telefono : !telefono)
            const coincideWeb = filtrosActivos.sitioWeb === "" ||
                (filtrosActivos.sitioWeb === "Con sitio web" ? !!web : !web)  
            const coincideActividadEco = filtrosActivos.actividadEconomica === "" ||
                actividadEconomica === filtrosActivos.actividadEconomica
            const coincideCargo = filtrosActivos.cargo === "" ||
                cargo === filtrosActivos.cargo    
            return coincideNombre && coincideCorreo && coincideTelefono && coincideTipo && coincideWeb && coincideActividadEco && coincideCargo
        })
    
        const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
            if (!orden) return 0
    
            let valA: string | number | null | undefined
            let valB: string | number | null | undefined
    
           
            if (orden.campo === 'nombre') {
                valA = esEmpresa(a) ? a.razon_social : a.nombres_completos
                valB = esEmpresa(b) ? b.razon_social : b.nombres_completos
            } else if (orden.campo === 'correo') {
                valA = esEmpresa(a) ? a.correo_corporativo : a.correo_personal
                valB = esEmpresa(b) ? b.correo_corporativo : b.correo_personal
            } else if (orden.campo === 'telefono') {
                valA = esEmpresa(a) ? a.celular_corporativo : a.celular_personal
                valB = esEmpresa(b) ? b.celular_corporativo : b.celular_personal
            } else if (orden.campo === 'tipo') {
                valA = esEmpresa(a) ? "Empresa" : "Persona"
                valB = esEmpresa(b) ? "Empresa" : "Persona"
            } else if (orden.campo === 'ruc') {
                valA = esEmpresa(a) ? a.ruc : null
                valB = esEmpresa(b) ? b.ruc : null
            } else if (orden.campo === 'sitioWeb') {
                valA = esEmpresa(a) ? a.sitio_web : null
                valB = esEmpresa(b) ? b.sitio_web : null
            } else if (orden.campo === 'actividadEconomica') {
                valA = esEmpresa(a) ? a.actividad_economica : null
                valB = esEmpresa(b) ? b.actividad_economica : null
            } else if (orden.campo === 'cargo') {
                valA = esEmpresa(a) ? null : a.cargo
                valB = esEmpresa(b) ? null : b.cargo
            }
            
    
            // Valores vacíos siempre al final, sin importar la dirección
            if (!valA && !valB) return 0
            if (!valA) return 1
            if (!valB) return -1
    
            const comp = typeof valA === 'number'
                ? valA - (valB as number)
                : valA.localeCompare(valB as string, 'es')
    
            return orden.direccion === "up" ? comp : -comp
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
                    <FiltroTablaClientes onAplicar={(filtros) => {
                        setFiltrosActivos(filtros)
                        setPaginaActual(1)
                    }}/>
                    <MostrarColumnasClientes columnas={columnasVisibles} onCambiar={handleColumna}/>
                </div>
            </div>
            
            {/* Header con propiedades de clientes, buscador y botón añadir*/}
            <div className="flex items-center justify-between mb-3">
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
                        {contactosPaginados.map(contacto => {

                            const key = esEmpresa(contacto) ? 'empresa-'+contacto.id_empresa : 'persona-'+contacto.id_persona

                            const nombre = esEmpresa(contacto) ? contacto.razon_social : contacto.nombres_completos

                            const ruc = esEmpresa(contacto) ? contacto.ruc : ""

                            const correo = esEmpresa(contacto) ? contacto.correo_corporativo : contacto.correo_personal

                            const celular = esEmpresa(contacto) ? contacto.celular_corporativo : contacto.celular_personal

                            const tipo = esEmpresa(contacto) ? "Empresa" : "Persona"

                            const web = esEmpresa(contacto) ? contacto.sitio_web : ""

                            const actividadEconomica = esEmpresa(contacto) ? contacto.actividad_economica : ""

                            const cargo = !esEmpresa(contacto) ? contacto.cargo : ""

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
                                    <td className="px-6 py-4 text-gray-300 max-w-[140px] truncate">
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
        </div>
    )
}