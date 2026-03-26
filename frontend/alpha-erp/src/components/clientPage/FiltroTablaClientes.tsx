//Filtro apto solo para la tabla CLIENTES, por el momento

import { SelectForm } from '../editClientPage/SelectForm';

import { useFiltros } from '../../hooks/useFiltros';

import { mockClientes } from "../../utils/mockDataClientes";
import { esEmpresa } from "../../types/client";

import { TipoFiltrosCliente, filtroVacioCliente, OPCIONES_FILTRO_CLIENTE, TIPO_CLIENTE } from "../../types/filtros/filtrosClientes";

import { PanelLateral } from "../utilidades/PanelLateral";
import { ListFilter } from "lucide-react";
import { BotonBase } from "./BotonBase";

//COMPONENTE
type PropFiltroTabla = {
    onAplicar: (filtros:TipoFiltrosCliente) => void
}

export function FiltroTablaClientes({onAplicar}:PropFiltroTabla) {

    const { filtros, handleChange, limpiar } = useFiltros(filtroVacioCliente, onAplicar)

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
                    <SelectForm name="correo" value={filtros.correo} onChange={handleChange} label="Todos" options={[
                        OPCIONES_FILTRO_CLIENTE.CON_CORREO,
                        OPCIONES_FILTRO_CLIENTE.SIN_CORREO
                    ]}/>
                </div>
                <div className="my-5">
                    <h1 className="text-lg font-semibold text-gray-100">Tipo</h1>
                    <SelectForm name="tipo" value={filtros.tipo} onChange={handleChange} label="Todos" options={[
                        TIPO_CLIENTE.EMPRESA,
                        TIPO_CLIENTE.PERSONA
                    ]}/>
                </div>
                <div className="my-5">
                    <h1 className="text-lg font-semibold text-gray-100">Teléfono</h1>
                    <SelectForm name="telefono" value={filtros.telefono} onChange={handleChange} label="Todos" options={[
                        OPCIONES_FILTRO_CLIENTE.CON_TELEFONO,
                        OPCIONES_FILTRO_CLIENTE.SIN_TELEFONO
                    ]}/>
                </div>
                <div className="my-5">
                    <h1 className="text-lg font-semibold text-gray-100">Sitio web</h1>
                    <SelectForm name="sitioWeb" value={filtros.sitioWeb} onChange={handleChange} label="Todos" options={[
                        OPCIONES_FILTRO_CLIENTE.CON_WEB,
                        OPCIONES_FILTRO_CLIENTE.SIN_WEB
                    ]}/>
                </div>
                <div className="my-5">
                    <h1 className="text-lg font-semibold text-gray-100">Actividad económica</h1>
                    <SelectForm name="actividadEconomica" value={filtros.actividadEconomica} onChange={handleChange} label="Todos" options={[...new Set(
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