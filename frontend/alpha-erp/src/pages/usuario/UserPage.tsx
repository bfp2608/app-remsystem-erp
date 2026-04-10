import { CuadroBuscador } from '../../components/clientPage/CuadroBuscador'
import {CirclePlus } from 'lucide-react'
import { Paginacion } from '../../components/clientPage/Paginacion';
import { Link } from 'react-router-dom';
import { RUTAS } from '../../constans';
import { useUserTable } from '../../hooks/useUserTable';
import { UserTable } from '../../components/usuariosPage/userTable';

export const UserPage = () =>  {

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

    return (
        <div className="h-screen flex flex-col bg-gray-800 p-4">
            <div className='shrink-0'>
                <div className='mb-3 pb-3 flex border-b border-gray-700 items-center justify-between'>
                    <h1 className="text-2xl font-bold text-white">Usuarios del sistema</h1>

                    {/* Por si luego se agrega filtros */}
                    <div className='flex items-center gap-4'></div>
                </div>
            
                <div className="flex items-center justify-between mb-3">
                    <Link 
                    to={RUTAS.NEW_USUARIO} 
                    className='add-button'
                    >
                        <span><CirclePlus /></span>Añadir
                    </Link>

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
            />

        </div>
    )
}