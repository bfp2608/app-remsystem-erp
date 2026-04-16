import { CuadroBuscador } from '../../components/clientPage/CuadroBuscador'
import {CirclePlus } from 'lucide-react'
import { Paginacion } from '../../components/clientPage/Paginacion';
import { Link } from 'react-router-dom';
import { ROLE_TYPES, RUTAS } from '../../constans';
import { useUserTable } from '../../hooks/useUserTable';
import { UserTable } from '../../components/usuariosPage/userTable';
import { useAuth } from '../../auth/useAuth';
import { toast } from 'sonner';
import { useUserStore } from '../../store/userStore';
import { useEffect } from 'react';

export const UserPage = () =>  {

    const { updateUser } = useUserStore()
    const { user: currentUser } = useAuth()
    const isAdmin = currentUser?.tipoUsuario === ROLE_TYPES.admin
    const { fetchUsers, users } = useUserStore()

    useEffect(() =>{
        if(users.length === 0 && currentUser?.id_organizacion){
            fetchUsers(currentUser.id_organizacion)
        }
    }, [users.length, fetchUsers, currentUser?.id_organizacion])

    const {
        isLoading,
        paginatedUsers,
        totalItems,
        itemsPerPage,
        currentPage,
        orden,
        setOrder,
        handleSearch,
        setCurrentPage,
    } = useUserTable()

    if(isLoading) return <strong className='h-screen flex flex-col p-4 items-center justify-center text-white text-xl'>Cargando usuarios...</strong>

    const handleToggleStatus = async (id: number, currentStatus: boolean) =>{
        try{
            await updateUser(id, { activo: !currentStatus })
            toast.success(currentStatus ?  "Usuario desactivado" : "Usuario reactivado")
        }catch(error){
            console.error("Error al cambiar el estado del usuario", error)
            toast.error("Error al cambiar el estado del usuario")
        }
    }

    return (
        <div className="h-screen flex flex-col bg-gray-800 p-4">
            <div className='shrink-0'>
                <div className='mb-3 pb-3 flex border-b border-gray-700 items-center justify-between'>
                    <h1 className="text-2xl font-bold text-white">Usuarios del sistema</h1>

                    {/* Por si luego se agrega filtros */}
                    <div className='flex items-center gap-4'></div>
                </div>
            
                <div className="flex items-center justify-between mb-3">
                    {isAdmin &&
                        <Link 
                        to={RUTAS.NEW_USUARIO} 
                        className='add-button'
                        >
                            <span><CirclePlus /></span>Añadir
                        </Link>
                    }

                    {/*Buscador */}
                    <CuadroBuscador buscar={handleSearch} />

                    {/* Paginación */}
                    <Paginacion 
                        totalItems={totalItems}
                        itemsPorPagina={itemsPerPage}
                        paginaActual={currentPage}
                        onAnterior={() => setCurrentPage(p => p - 1)}
                        onSiguiente={() => setCurrentPage(p => p + 1)}
                    />
                    
                </div>
            </div>

            <UserTable 
                users={paginatedUsers} 
                order={orden}
                onOrderChange={(campo, dir) => setOrder({campo, direccion: dir})}
                onToggleStatus={handleToggleStatus}
            />

        </div>
    )
}