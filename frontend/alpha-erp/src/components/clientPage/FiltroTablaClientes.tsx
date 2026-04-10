//Filtro apto solo para la tabla CLIENTES, por el momento

import { SelectForm } from '../editClientPage/SelectForm';

import { useFiltros } from '../../hooks/useFiltros';

import { mockClientes } from "../../utils/mockDataClientes";
import { esEmpresa } from "../../types/client";

import { CustomerFilterType, emptyCustomerFilter, CUSTOMER_FILTER_OPTIONS, CUSTOMER_TYPE } from "../../types/filtros/filtrosClientes";

import { PanelLateral } from "../utilidades/PanelLateral";
import { ListFilter } from "lucide-react";
import { BotonBase } from "./BotonBase";

//COMPONENTE
type PropFiltroTabla = {
    onAplicar: (filters:CustomerFilterType) => void
}

export function FiltroTablaClientes({onAplicar}:PropFiltroTabla) {

    const { filtros, handleChange, limpiar } = useFiltros(emptyCustomerFilter, onAplicar)

    return(
        <PanelLateral 
            icono={ListFilter}
            texto="Filtrar"
            cabecera={
                <BotonBase onPresionar={limpiar} texto="Limpiar" color="teal" />
            } 
        >
            <div>
                <div className="my-5">
                    <h1 className="text-lg font-semibold text-gray-100">Correo</h1>
                    <SelectForm name="email" value={filtros.email} onChange={handleChange} label="Todos" options={[
                        CUSTOMER_FILTER_OPTIONS.WITH_EMAIL,
                        CUSTOMER_FILTER_OPTIONS.WITHOUT_EMAIL
                    ]}/>
                </div>
                <div className="my-5">
                    <h1 className="text-lg font-semibold text-gray-100">Tipo</h1>
                    <SelectForm name="type" value={filtros.type} onChange={handleChange} label="Todos" options={[
                        CUSTOMER_TYPE.COMPANY,
                        CUSTOMER_TYPE.PERSON
                    ]}/>
                </div>
                <div className="my-5">
                    <h1 className="text-lg font-semibold text-gray-100">Teléfono</h1>
                    <SelectForm name="phone" value={filtros.phone} onChange={handleChange} label="Todos" options={[
                        CUSTOMER_FILTER_OPTIONS.WITH_PHONE,
                        CUSTOMER_FILTER_OPTIONS.WITHOUT_PHONE
                    ]}/>
                </div>
                <div className="my-5">
                    <h1 className="text-lg font-semibold text-gray-100">Sitio web</h1>
                    <SelectForm name="website" value={filtros.website} onChange={handleChange} label="Todos" options={[
                        CUSTOMER_FILTER_OPTIONS.WITH_WEB,
                        CUSTOMER_FILTER_OPTIONS.WITHOUT_WEB
                    ]}/>
                </div>
                <div className="my-5">
                    <h1 className="text-lg font-semibold text-gray-100">Actividad económica</h1>
                    <SelectForm name="economicActivity" value={filtros.economicActivity} onChange={handleChange} label="Todos" options={[...new Set(
                        mockClientes
                            .map(c => esEmpresa(c) ? String(c.actividad_economica) : null)
                            .filter(Boolean) as string[]
                    )]}/>
                </div>
                <div className="my-5">
                    <h1 className="text-lg font-semibold text-gray-100">Cargo</h1>
                    <SelectForm name="cargo" value={filtros.cargo} onChange={handleChange} label="Todos" options={[...new Set(
                        mockClientes
                            .map(c => !esEmpresa(c) ? String(c.cargo) : null)
                            .filter(Boolean) as string[]
                    )]}/>
                </div>
            </div>
        </PanelLateral>
    )
}