import { useEffect, useMemo, useState } from "react"
import { useUserStore } from "../store/userStore"
import { Usuario } from "../types/usuario"

const ITEMS_PER_PAGE = 20

export const useUserTable = () =>{
    //Conexión al Store
    const { users, isLoading, fetchUsers} = useUserStore()

    useEffect(() =>{
        if(users.length === 0){
            fetchUsers()
        }
    },[users.length, fetchUsers])

    const [searchText, setSearchText] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [order, setOrder] = useState<{campo: keyof Usuario, direccion: "up" | "down"}>({campo: "nombre_usuario", direccion:"up"})

    const handleSearch = (text : string) =>{
        setSearchText(text)
        setCurrentPage(1)
    }

    //Memoized Filtering
    const filteredUsers = useMemo(() =>{
        const searchLower = searchText.toLocaleLowerCase()

        return users.filter(user =>
            user.nombre_usuario.toLocaleLowerCase().includes(searchLower) ||
            user.email.toLocaleLowerCase().includes(searchLower)
        )
    },[users, searchText])

    const sortedUsers = useMemo(() =>{
        return [...filteredUsers].sort((a, b) =>{
            if(!order) return 0

            const valA = a[order.campo] ?? null
            const valB = b[order.campo] ?? null

            if(!valA && !valB) return 0
            if(!valA) return 1
            if(!valB) return -1

            const comparison = String(valA).localeCompare(String(valB), "es")
            return order.direccion === "up" ? comparison : -comparison
        })
    }, [filteredUsers, order])

    //Paginación---------------------
    // Separar los datos según la página
    const paginatedUsers = useMemo (() =>{
        const inicio = (currentPage - 1) * ITEMS_PER_PAGE
        return sortedUsers.slice(inicio, inicio + ITEMS_PER_PAGE)
    }, [sortedUsers, currentPage])

    //Retornamos la data y controles
    return{
        isLoading,
        paginatedUsers,
        totalItems: filteredUsers.length,
        itemsPerPage: ITEMS_PER_PAGE,
        currentPage,
        orden: order,
        setOrder,
        handleSearch,
        setCurrentPage
    }
}