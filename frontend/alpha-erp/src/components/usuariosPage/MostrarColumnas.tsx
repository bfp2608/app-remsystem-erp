//
//

import { Columns3Cog, SquareX } from "lucide-react"
import { useState, useRef, useEffect } from "react"

//COMPONENTE
type ColumnasVisibles = {
    correo: boolean
    telefono: boolean
    cargo: boolean
}


type PropMostrarColumnas = {
    columnas : ColumnasVisibles
    onCambiar: (columna: keyof ColumnasVisibles) => void
}

export function MostrarColumnas({columnas, onCambiar}:PropMostrarColumnas) {

    const [mostrarPanel, estadoPanel] = useState(false)

    const abrir = () => {
        estadoPanel(true)
    }

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                estadoPanel(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    return(
        <div ref={ref}>
            <button 
                onClick={abrir}
                title="Filtrar"
                className="px-3 py-2 flex gap-2 bg-transparent hover:bg-gray-900 border border-gray-500 rounded items-center hover:cursor-pointer  text-gray-100 transition-colors"
            >   
                <Columns3Cog size={16} /> 
                Columnas
            </button>

            {
                mostrarPanel && 
                <div className="flex flex-col p-6 h-full w-90 bg-gray-900 absolute right-0 top-0 z-20 shadow-gray-600 shadow-xl">
                    {/*Cabecera filtros*/}
                    <div className="mb-6 pb-3 border-b border-gray-600 shrink-0">
                        <div className="flex justify-between">
                            <h1 className="font-bold text-2xl">Columnas</h1>
                            <button className="hover:cursor-pointer text-gray-100 hover:text-red-300 transition-colors" onClick={()=>estadoPanel(!mostrarPanel)}>
                                <SquareX size={36}/>
                            </button>
                        </div>
                    </div>
                    {/*Contenido filtros*/}
                    <div className="overflow-y-auto flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <input className="hover:cursor-pointer size-5" type="checkbox" checked={columnas.correo} onChange={() => onCambiar("correo")} />
                            <h1>Correo</h1>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <input className="hover:cursor-pointer size-5"  type="checkbox" checked={columnas.telefono} onChange={() => onCambiar("telefono")} />  Teléfono
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <input className="hover:cursor-pointer size-5"  type="checkbox" checked={columnas.cargo} onChange={() => onCambiar("cargo")} />  Cargo
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}