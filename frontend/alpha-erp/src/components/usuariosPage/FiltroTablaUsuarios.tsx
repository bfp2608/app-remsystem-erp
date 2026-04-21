//Filtro apto solo para la tabla USUARIOS, por el momento
//

import { ListFilter } from "lucide-react"
import { SelectForm } from '../editClientPage/SelectForm';
import { BotonBase } from '../clientPage/BotonBase';

import { PanelLateral } from "../utilidades/PanelLateral";

import { OPCIONES_FILTRO_USUARIO, TIPO_USUARIO, TipoFiltrosUsuario, filtroVacioUsuario } from "../../types/filtros/filtrosUsuarios";

import { useFiltros } from "../../hooks/useFiltros";

//COMPONENTE
type PropFiltroTabla = {
    onAplicar: (filtros:TipoFiltrosUsuario) => void
}

export function FiltroTablaUsuarios({onAplicar}:PropFiltroTabla) {

    const {filtros, handleChange, limpiar} = useFiltros(filtroVacioUsuario, onAplicar)

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
                    <h1 className="text-lg font-semibold text-gray-100">Cargo</h1>
                    <SelectForm name="cargo" value={filtros.cargo} onChange={handleChange} label="Todos" options={[
                        TIPO_USUARIO.ADMIN,
                        TIPO_USUARIO.USUARIO
                    ]}/>
                </div>
                <div className="my-5">
                    <h1 className="text-lg font-semibold text-gray-100">Teléfono</h1>
                    <SelectForm name="telefono" value={filtros.telefono} onChange={handleChange} label="Todos" options={[
                        OPCIONES_FILTRO_USUARIO.CON_TELEFONO,
                        OPCIONES_FILTRO_USUARIO.SIN_TELEFONO
                    ]}/>
                </div>
            </div>
        </PanelLateral>
    )
}