import { Columns3Cog } from "lucide-react"
import { PanelLateral } from "../utilidades/PanelLateral"
import { CustomerColumnType } from "../../types/filtros/filtrosClientes"

//COMPONENTE

type PropMostrarcolumns = {
    columns : CustomerColumnType
    onChange: (columna: keyof CustomerColumnType) => void
}

export function MostrarColumnasClientes({columns, onChange}:PropMostrarcolumns) {

    return(
        <PanelLateral 
            icono={Columns3Cog}
            texto="columns"
        >
            <div className="flex accent-teal-600 items-center gap-2 mb-2">
                <input className="hover:cursor-pointer size-5" type="checkbox" checked={columns.email} onChange={() => onChange("email")} /> Correo
            </div>
            <div className="flex accent-teal-600 items-center gap-2 mb-2">
                <input className="hover:cursor-pointer size-5"  type="checkbox" checked={columns.phone} onChange={() => onChange("phone")} />  Teléfono
            </div>
            <div className="flex accent-teal-600 items-center gap-2 mb-2">
                <input className="hover:cursor-pointer size-5"  type="checkbox" checked={columns.taxId} onChange={() => onChange("taxId")} />  Ruc
            </div>
            <div className="flex accent-teal-600 items-center gap-2 mb-2">
                <input className="hover:cursor-pointer size-5" type="checkbox" checked={columns.type} onChange={() => onChange("type")} /> Tipo
            </div>
            <div className="flex accent-teal-600 items-center gap-2 mb-2">
                <input className="hover:cursor-pointer size-5"  type="checkbox" checked={columns.website} onChange={() => onChange("website")} />  Sitio Web
            </div>
            <div className="flex accent-teal-600 items-center gap-2 mb-2">
                <input className="hover:cursor-pointer size-5"  type="checkbox" checked={columns.economicActivity} onChange={() => onChange("economicActivity")} />  Actividad Económica
            </div>
            <div className="flex accent-teal-600 items-center gap-2 mb-2">
                <input className="hover:cursor-pointer size-5"  type="checkbox" checked={columns.jobTitle} onChange={() => onChange("jobTitle")} />  Cargo
            </div>
        </PanelLateral>
    )
}