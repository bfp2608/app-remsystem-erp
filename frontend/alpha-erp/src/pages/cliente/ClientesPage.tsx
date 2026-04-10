import { CuadroBuscador } from '../../components/clientPage/CuadroBuscador'
import {CirclePlus} from 'lucide-react'
import { Paginacion } from '../../components/clientPage/Paginacion';
import { FiltroTablaClientes } from '../../components/clientPage/FiltroTablaClientes'
import { MostrarColumnasClientes } from '../../components/clientPage/MostrarColumnasClientes';
import { Link } from 'react-router-dom';
import { RUTAS } from '../../constans';
import { useCustomerTable } from '../../hooks/useCustomerTable';
import { CustomerTable } from '../../components/clientPage/CustomerTable';

export const ClientesPage = () =>  {
    
    const {
        isLoading,
        contactosPaginados,
        totalItems,
        itemsPerPage,
        orden,
        columnasVisibles,
        paginaActual,
        setOrden,
        setFiltrosActivos,
        handleColumna,
        manejarBuscador,
        setPaginaActual
    } = useCustomerTable()

    if(isLoading){
        return <strong className='h-screen flex flex-col bg-gray-800 p-4 items-center justify-center text-white text-xl'>Cargando clientes...</strong>
    }

    return (
        <div className="h-screen flex flex-col bg-gray-800 p-4">
            <div className='shrink-0'>
                {/* Header*/}
            <div className="mb-3 pb-3 flex border-b border-gray-700  items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Clientes</h1>
                <div className='flex items-center gap-4'>
                    {/*Filtro*/}
                    <FiltroTablaClientes onAplicar={(filtros) =>{
                        setFiltrosActivos(filtros)
                        setPaginaActual(1)
                    }}/>
                    
                    <MostrarColumnasClientes columns={columnasVisibles} onChange={handleColumna}/>
                </div>
            </div>
            
            {/* Header con propiedades de clientes, buscador y botón añadir*/}
            <div className="flex items-center justify-between mb-3">
                <Link 
                to={RUTAS.NEW_CLIENTE} 
                className='add-button'
                >
                    <span><CirclePlus /></span>Añadir
                </Link>

                <CuadroBuscador buscar={manejarBuscador} />

                {/* Paginación */}
                <Paginacion 
                    totalItems={totalItems}
                    itemsPorPagina={itemsPerPage}
                    paginaActual={paginaActual}
                    onAnterior={() => setPaginaActual(p => p - 1)}
                    onSiguiente={() => setPaginaActual(p => p + 1)}
                />
            </div>
            </div>
            <CustomerTable 
                contacts={contactosPaginados}
                visibleColumns={columnasVisibles}
                order={orden}
                onOrderChange={(campo, dir) => setOrden({campo, direccion: dir})}
            />
        </div>
    )
}