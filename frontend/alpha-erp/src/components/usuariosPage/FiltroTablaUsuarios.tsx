//Filtro apto solo para la tabla USUARIOS, por el momento
//

import { ListFilter, SquareX } from "lucide-react"
import { useState, useRef, useEffect, ChangeEvent } from "react"
import { SelectForm } from '../editClientPage/SelectForm';
import { BotonBase } from '../clientPage/BotonBase';



type FiltrosValor = { cargo: string; telefono: string }

//COMPONENTE
type PropFiltroTabla = {
    onAplicar: (filtros:FiltrosValor) => void
}

export function FiltroTablaUsuarios({onAplicar}:PropFiltroTabla) {

    const [filtrosAplicados, setFiltrosAplicados] = useState<FiltrosValor>({ cargo: "", telefono: "" })
    const [filtrosTemp, setFiltrosTemp] = useState<FiltrosValor>({ cargo: "", telefono: "" })

    const [mostrarFiltro, estadoFiltro] = useState(false)

    const abrir = () => {
        setFiltrosTemp(filtrosAplicados)
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
        setFiltrosTemp(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const aplicar = () => {
        setFiltrosAplicados(filtrosTemp)
        onAplicar(filtrosTemp)
        estadoFiltro(false)
    }

    const sinCambios = filtrosTemp.cargo === filtrosAplicados.cargo && 
                   filtrosTemp.telefono === filtrosAplicados.telefono

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
                <div className="flex flex-col p-6 h-full w-90 bg-gray-900 absolute right-0 top-0 z-20 shadow-gray-600 shadow-xl">
                    {/*Cabecera filtros*/}
                    <div className="mb-6 pb-3 border-b border-gray-600 shrink-0">
                        <div className="flex justify-between">
                            <h1 className="font-bold text-2xl">Filtros</h1>
                            <button className="hover:cursor-pointer text-gray-100 hover:text-red-300 transition-colors" onClick={()=>estadoFiltro(!mostrarFiltro)}>
                                <SquareX size={36}/>
                            </button>
                        </div>
                        <div className="flex justify-start mt-3">
                            <BotonBase onPresionar={aplicar} texto="Aplicar" color="teal" disable={sinCambios} />
                        </div>
                    </div>
                    {/*Contenido filtros*/}
                    <div className="overflow-y-auto flex-1">
                        <div className="my-5">
                            <h1 className="text-lg font-semibold text-gray-100">Cargo</h1>
                            <SelectForm name="cargo" value={filtrosTemp.cargo} onChange={handleChange} label="Todos" options={["Administrador","Usuario"]}/>
                        </div>
                        <div className="my-5">
                            <h1 className="text-lg font-semibold text-gray-100">Teléfono</h1>
                            <SelectForm name="telefono" value={filtrosTemp.telefono} onChange={handleChange} label="Todos" options={["Con teléfono","Sin teléfono"]}/>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}