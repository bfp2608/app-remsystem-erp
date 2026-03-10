//Calcula y muestra el total de items, items por pagina y pagina actual
//Recibe el control de volver y siguiente pagina del padre

import { ArrowRight, ArrowLeft } from "lucide-react"


//COMPONENTE

type PropPaginacion = {
    totalItems: number
    itemsPorPagina: number
    paginaActual: number
    onAnterior: () => void
    onSiguiente: () => void
}

export function Paginacion({
    totalItems,
    itemsPorPagina,
    paginaActual,
    onAnterior,
    onSiguiente
}: PropPaginacion) {
    
    // Calcular texto del contador
    const inicio = (paginaActual - 1) * itemsPorPagina + 1
    const fin = Math.min(paginaActual * itemsPorPagina, totalItems)
    const textoContador = `${inicio}-${fin} / ${totalItems}`
    
    // Calcular si deshabilitar botones
    const totalPaginas = Math.ceil(totalItems / itemsPorPagina)
    const enPrimeraPagina = paginaActual === 1
    const enUltimaPagina = paginaActual >= totalPaginas
    
    return (
        <div className="flex gap-5 items-center justify-between text-gray-300 text-sm">
            <span>{textoContador}</span>
            
            <div className="flex gap-2">
                <button 
                    onClick={onAnterior}
                    disabled={enPrimeraPagina}
                    className="px-3 py-1 bg-gray-900 hover:bg-gray-700 rounded text-gray-300 transition-colors disabled:opacity-50 hover:cursor-pointer disabled:cursor-default disabled:hover:bg-gray-800"
                >
                    <ArrowLeft/>
                </button>
                
                <button 
                    onClick={onSiguiente}
                    disabled={enUltimaPagina}
                    className="px-3 py-1 bg-gray-900 hover:bg-gray-700 rounded text-gray-300 transition-colors disabled:opacity-50 hover:cursor-pointer disabled:cursor-default disabled:hover:bg-gray-800"
                >
                    <ArrowRight/>
                </button>
            </div>
        </div>
    )
}