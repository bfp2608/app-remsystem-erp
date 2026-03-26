//
//

import { Columns3Cog } from "lucide-react"
import { PanelLateral } from "../utilidades/PanelLateral"
import { TipoColumnasClientes } from "../../types/filtros/filtrosClientes"

//COMPONENTE



type PropMostrarColumnas = {
    columnas : TipoColumnasClientes
    onCambiar: (columna: keyof TipoColumnasClientes) => void
}

export function MostrarColumnasClientes({columnas, onCambiar}:PropMostrarColumnas) {

    return(
        <PanelLateral 
            icono={Columns3Cog}
            texto="Columnas"
        >
            <div className="flex accent-teal-600 items-center gap-2 mb-2">
                <input className="hover:cursor-pointer size-5" type="checkbox" checked={columnas.correo} onChange={() => onCambiar("correo")} /> Correo
            </div>
            <div className="flex accent-teal-600 items-center gap-2 mb-2">
                <input className="hover:cursor-pointer size-5"  type="checkbox" checked={columnas.telefono} onChange={() => onCambiar("telefono")} />  Teléfono
            </div>
            <div className="flex accent-teal-600 items-center gap-2 mb-2">
                <input className="hover:cursor-pointer size-5"  type="checkbox" checked={columnas.ruc} onChange={() => onCambiar("ruc")} />  Ruc
            </div>
            <div className="flex accent-teal-600 items-center gap-2 mb-2">
                <input className="hover:cursor-pointer size-5" type="checkbox" checked={columnas.tipo} onChange={() => onCambiar("tipo")} /> Tipo
            </div>
            <div className="flex accent-teal-600 items-center gap-2 mb-2">
                <input className="hover:cursor-pointer size-5"  type="checkbox" checked={columnas.sitioWeb} onChange={() => onCambiar("sitioWeb")} />  Sitio Web
            </div>
            <div className="flex accent-teal-600 items-center gap-2 mb-2">
                <input className="hover:cursor-pointer size-5"  type="checkbox" checked={columnas.actividadEconomica} onChange={() => onCambiar("actividadEconomica")} />  Actividad Económica
            </div>
            <div className="flex accent-teal-600 items-center gap-2 mb-2">
                <input className="hover:cursor-pointer size-5"  type="checkbox" checked={columnas.cargo} onChange={() => onCambiar("cargo")} />  Cargo
            </div>
        </PanelLateral>
    )
}