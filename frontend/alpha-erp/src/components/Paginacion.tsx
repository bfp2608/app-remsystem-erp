import { ArrowRight, ArrowLeft } from "lucide-react"

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
        <div className="flex gap-5 items-center justify-between text-gray-400 text-sm">
            <span>{textoContador}</span>
            
            <div className="flex gap-2">
                <button 
                    onClick={onAnterior}
                    disabled={enPrimeraPagina}
                    className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-800"
                >
                    <ArrowLeft/>
                </button>
                
                <button 
                    onClick={onSiguiente}
                    disabled={enUltimaPagina}
                    className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-800"
                >
                    <ArrowRight/>
                </button>
            </div>
        </div>
    )
}