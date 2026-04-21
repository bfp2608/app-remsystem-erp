// hooks/useFiltros.ts
import { useState, ChangeEvent } from "react"

export function useFiltros<T>(filtroVacio: T, onAplicar: (f: T) => void) {
    const [filtros, setFiltros] = useState<T>(filtroVacio)

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const nuevos = { ...filtros, [e.target.name]: e.target.value }
        setFiltros(nuevos)
        onAplicar(nuevos)
    }

    const limpiar = () => {
        setFiltros(filtroVacio)
        onAplicar(filtroVacio)
    }

    return { filtros, handleChange, limpiar }
}