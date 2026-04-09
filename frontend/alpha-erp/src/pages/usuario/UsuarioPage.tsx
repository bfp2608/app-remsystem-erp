//Es lo mismo que ClientPage 

import { mockUsuarios } from '../../utils/mockDataUsuarios';

import {CirculoAvatar} from '../../components/clientPage/CirculoAvatar'
import { CuadroBuscador } from '../../components/clientPage/CuadroBuscador'

import {CirclePlus } from 'lucide-react'

import { useState } from 'react';
import { Paginacion } from '../../components/clientPage/Paginacion';
import { EdicionTabla } from '../../components/clientPage/EdicionTabla';
import { FiltroTablaUsuarios } from '../../components/usuariosPage/FiltroTablaUsuarios';
import { Header_th } from '../../components/tabla/Header_th';
import { MostrarColumnasUsuarios } from '../../components/usuariosPage/MostrarColumnasUsuarios';
import { aplicarFiltroUsuario, columnasInicioUsuarios } from '../../types/filtros/filtrosUsuarios';

import { Link } from 'react-router-dom';
import { RUTAS } from '../../constans';

//FUNCIONES-----------------------------

//Editar usuario
const editar = (key:string) =>{
    alert("Enviando a ..." + key)
}

//Eliminar cliente
const eliminar = (key:string) =>{
    alert("Eliminando ..." + key)
}

//FIN FUNCIONES-----------------------------

const CARGO_LABEL: Record<number,string> = {1:"Administrador", 2: "Usuario"}
const ERROR_NO_HAY_CARGO:string = "No se encontró el cargo"

//Total de items que se muestran en la tabla
const ITEMS_POR_PAGINA = 20

export const UsuarioPage = () =>  {

    const [orden, setOrden] = useState<{campo: keyof typeof mockUsuarios[0] | "cargo", direccion: "up" | "down"}>({campo: "nombre_usuario", direccion: "up"})
    
    const [filtrosActivos, setFiltrosActivos] = useState({ cargo: "", telefono: "" })

    const [columnasVisibles, setColumnasVisibles] = useState(columnasInicioUsuarios)

    const handleColumna = (columna: keyof typeof columnasVisibles) => {
        setColumnasVisibles(prev => ({
            ...prev,
            [columna]: !prev[columna]
        }))
    }

    //Buscador----------------------
    const [textoBusqueda, setTextoBusqueda] = useState('')

    //Filtrar los datos del buscador y del filtro de la tabla
    const contactosFiltrados = mockUsuarios.filter(usuario => {
        const nombre = usuario.nombre_usuario
        const coincideNombre = nombre.toLowerCase().includes(textoBusqueda.toLowerCase())
        const coincideCargo = aplicarFiltroUsuario(
            filtrosActivos.cargo,
            CARGO_LABEL[usuario.id_tipo_usuario]
        )
        const coincideTelefono = aplicarFiltroUsuario(filtrosActivos.telefono,usuario.telefono)
        return coincideNombre && coincideCargo && coincideTelefono
    })

    const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
        if (!orden) return 0

        let valA: string | number | null | undefined
        let valB: string | number | null | undefined

        if (orden.campo === 'cargo') {
            valA = CARGO_LABEL[a.id_tipo_usuario] ?? ERROR_NO_HAY_CARGO
            valB = CARGO_LABEL[b.id_tipo_usuario] ?? ERROR_NO_HAY_CARGO
        } else {
            valA = a[orden.campo] ?? null
            valB = b[orden.campo] ?? null
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
                <h1 className="text-2xl font-bold text-white">Usuarios</h1>
                <div className='flex items-center gap-4'>
                    {/*Filtro*/}
                    <FiltroTablaUsuarios onAplicar={(filtros) => {
                        setFiltrosActivos(filtros)
                        setPaginaActual(1)
                    }}/>
                    <MostrarColumnasUsuarios columnas={columnasVisibles} onCambiar={handleColumna}/>
                </div>
            </div>
            
            {/* Header con propiedades de clientes, buscador y botón añadir*/}
            <div className="flex items-center justify-between  mb-3">
                <Link 
                to={RUTAS.NEW_CLIENTE} 
                className='add-button'
                >
                    <span><CirclePlus /></span>Añadir
                </Link>

                {/*Buscador */}
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
                                    campo: "nombre_usuario",
                                    direccion: dir
                                })
                            }}
                            estaActivo = {orden?.campo === "nombre_usuario"}
                            direccionActual={orden?.campo === "nombre_usuario" ? orden.direccion : "up"}
                            />
                            {
                                columnasVisibles.correo && 
                                <Header_th 
                                texto='Correo'
                                />
                            }
                            {
                                columnasVisibles.telefono &&
                                <Header_th 
                                texto='Telefono'
                                />
                            }
                            {
                                columnasVisibles.cargo &&
                                <Header_th 
                                texto='Cargo'
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
                            <Header_th 
                            texto='Acciones'
                            />
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
                            

                            
                            const nombreCargo = CARGO_LABEL[cargo] ?? ERROR_NO_HAY_CARGO

                            return(
                                <tr key={key} className="hover:bg-gray-700/80 transition-colors">
                                    <td className="px-6 py-4 text-gray-300">
                                        <div className="flex items-center">

                                            <CirculoAvatar nombre={nombre} />

                                            {nombre}
                                        </div>
                                    </td>
                                    {
                                        columnasVisibles.correo &&
                                        <td className="px-6 py-4 text-gray-300">{correo}</td>
                                    }
                                    {
                                        columnasVisibles.telefono &&
                                        <td className="px-6 py-4 text-gray-300">{telefono}</td>
                                    }
                                    {
                                        columnasVisibles.cargo && 
                                        <td className="px-6 py-4 text-gray-300">{nombreCargo}</td>
                                    }
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
        </div>
    )
}