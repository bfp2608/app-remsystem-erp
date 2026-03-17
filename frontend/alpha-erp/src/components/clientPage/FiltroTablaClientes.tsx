//Filtro apto solo para la tabla CLIENTES, por el momento
//

import { ListFilter, SquareX } from "lucide-react"
import { useState, useRef, useEffect, ChangeEvent } from "react"
import { SelectForm } from '../editClientPage/SelectForm';
import { BotonBase } from '../clientPage/BotonBase';
import { mockClientes } from "../../utils/mockDataClientes";
import { esEmpresa } from "../../types/cliente";


type FiltrosValor = { correo: string; tipo: string, telefono: string, sitioWeb:string, actividadEconomica: string, cargo: string }

const filtroInicio:FiltrosValor = {correo: "", tipo: "", telefono: "", sitioWeb: "",actividadEconomica: "", cargo: "" }

//COMPONENTE
type PropFiltroTabla = {
    onAplicar: (filtros:FiltrosValor) => void
}

export function FiltroTablaClientes({onAplicar}:PropFiltroTabla) {

    

    const [filtrosAplicados, setFiltrosAplicados] = useState<FiltrosValor>(filtroInicio)

    const [mostrarFiltro, estadoFiltro] = useState(false)

    const abrir = () => {
        estadoFiltro(true)
    }

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                estadoFiltro(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const nuevos = { ...filtrosAplicados, [e.target.name]: e.target.value }
        setFiltrosAplicados(nuevos)
        onAplicar(nuevos)
    }

    const limpiar = () => {
        setFiltrosAplicados(filtroInicio)
        onAplicar(filtroInicio)
    }

    return(
        <div ref={ref}>
            <button 
                onClick={abrir}
                title="Filtrar"
                className="px-3 py-2 flex gap-2 bg-transparent hover:bg-gray-900 border border-gray-500 rounded items-center hover:cursor-pointer  text-gray-100 transition-colors"
            >   
                <ListFilter size={16} /> 
                Filtrar
            </button>

            {
                mostrarFiltro && 
                <div className="flex flex-col p-6 h-full w-80 bg-gray-900 absolute right-0 top-0 z-20 shadow-gray-600 shadow-xl">
                    {/*Cabecera filtros*/}
                    <div className="mb-6 pb-3 border-b border-gray-600 shrink-0">
                        <div className="flex justify-between">
                            <h1 className="font-bold text-2xl">Filtros</h1>
                            <button className="hover:cursor-pointer text-gray-100 hover:text-red-300 transition-colors" onClick={()=>estadoFiltro(!mostrarFiltro)}>
                                <SquareX size={36}/>
                            </button>
                        </div>
                        <BotonBase onPresionar={limpiar} texto="Limpiar" color="teal" />
                    </div>
                    {/*Contenido filtros*/}
                    <div className="overflow-y-auto flex-1">
                        <div className="my-5">
                            <h1 className="text-lg font-semibold text-gray-100">Correo</h1>
                            <SelectForm name="correo" value={filtrosAplicados.correo} onChange={handleChange} label="Todos" options={["Con correo","Sin correo"]}/>
                        </div>
                        <div className="my-5">
                            <h1 className="text-lg font-semibold text-gray-100">Tipo</h1>
                            <SelectForm name="tipo" value={filtrosAplicados.tipo} onChange={handleChange} label="Todos" options={["Empresa","Persona"]}/>
                        </div>
                        <div className="my-5">
                            <h1 className="text-lg font-semibold text-gray-100">Teléfono</h1>
                            <SelectForm name="telefono" value={filtrosAplicados.telefono} onChange={handleChange} label="Todos" options={["Con teléfono","Sin teléfono"]}/>
                        </div>
                        <div className="my-5">
                            <h1 className="text-lg font-semibold text-gray-100">Sitio web</h1>
                            <SelectForm name="sitioWeb" value={filtrosAplicados.sitioWeb} onChange={handleChange} label="Todos" options={["Con sitio web", "Sin sitio web"]}/>
                        </div>
                        <div className="my-5">
                            <h1 className="text-lg font-semibold text-gray-100">Actividad económica</h1>
                            <SelectForm name="actividadEconomica" value={filtrosAplicados.actividadEconomica} onChange={handleChange} label="Todos" options={[...new Set(
                                mockClientes
                                    .map(c => esEmpresa(c) ? String(c.actividad_economica) : null)
                                    .filter(Boolean) as string[]
                            )]}/>
                        </div>
                        <div className="my-5">
                            <h1 className="text-lg font-semibold text-gray-100">Cargo</h1>
                            <SelectForm name="cargo" value={filtrosAplicados.cargo} onChange={handleChange} label="Todos" options={[...new Set(
                                mockClientes
                                    .map(c => !esEmpresa(c) ? String(c.cargo) : null)
                                    .filter(Boolean) as string[]
                            )]}/>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}