import { useMemo, useState } from "react"
import { useClientsStore } from "../store/clientStore"
import { ClienteNormalizado } from "../types/client"
import { normalizar } from "../utils/normalizarClientes"
import { applyCustomerFilter, CustomerFilterType, emptyCustomerFilter, initialCustomerColumns } from "../types/filtros/filtrosClientes"

const ITEMS_PER_PAGE = 20

export const useCustomerTable = () =>{
    //Conexión al Store
    const { clients, isLoading} = useClientsStore()

    //Solo se ejecuta si clients cambia en la BD
    const normalizedClients = useMemo(() => normalizar(clients), [clients])

    //Estados de la tabla
    const [order, setOrder] = useState<{campo: keyof ClienteNormalizado, direccion: "up" | "down"}>({campo: 'nombre', direccion: "up"})        
    const [activeFilters, setActiveFilters] = useState<CustomerFilterType>(emptyCustomerFilter)
    const [visibleColumns, setVisibleColumns] = useState(initialCustomerColumns)
    const [searchText, setSearchText] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    //Handlers
    const handleColumnToggle = (column: keyof typeof visibleColumns) => {
        setVisibleColumns(prev => ({
            ...prev,
            [column]: !prev[column]
        }))
    }

    const handleSearch = (text : string) =>{
        setSearchText(text)
        setCurrentPage(1)
    }

    //Memoized Filtering
    const filteredContacts = useMemo(() =>{
        const searchLower = searchText.toLocaleLowerCase()

        return normalizedClients.filter(client =>{
            const matchesName = (client.nombre || '').toLocaleLowerCase().includes(searchLower)

            const matchesFilters = 
                applyCustomerFilter(activeFilters.email, client.correo) &&
                applyCustomerFilter(activeFilters.type, client.tipo) &&
                applyCustomerFilter(activeFilters.phone, client.telefono) &&
                applyCustomerFilter(activeFilters.website, client.sitioWeb) &&
                (activeFilters.economicActivity === "" || client.actividadEconomica === activeFilters.economicActivity) &&
                (activeFilters.cargo === "" || client.cargo === activeFilters.cargo)

                return matchesName && matchesFilters
        })
    },[normalizedClients, searchText, activeFilters])

    //Lógica de ordenamiento
    const sortedContacts = useMemo(() =>{
        return [...filteredContacts].sort((a, b) =>{
            if(!order) return 0

            const valA = a[order.campo] ?? null
            const valB = b[order.campo] ?? null

            //Valores vacios siempre al final, sin importar la dirección
            if(!valA && !valB) return 0
            if(!valA) return 1
            if(!valB) return -1

            const comparison = String(valA).localeCompare(String(valB), 'es')
            return order.direccion === "up" ? comparison : -comparison

        })
    }, [filteredContacts, order])

    //Paginación---------------------

    // Separar los datos según la página
    const paginatedContacts = useMemo (() =>{
        const inicio = (currentPage - 1) * ITEMS_PER_PAGE
        return sortedContacts.slice(inicio, inicio + ITEMS_PER_PAGE)
    }, [sortedContacts, currentPage])

    //Retornamos la data y controles
    return{
        isLoading,
        contactosPaginados: paginatedContacts,
        totalItems: filteredContacts.length,
        itemsPerPage: ITEMS_PER_PAGE,
        orden: order,
        columnasVisibles: visibleColumns,
        paginaActual: currentPage,
        setOrden: setOrder,
        setFiltrosActivos: setActiveFilters,
        handleColumna: handleColumnToggle,
        manejarBuscador: handleSearch,
        setPaginaActual: setCurrentPage
    }
}