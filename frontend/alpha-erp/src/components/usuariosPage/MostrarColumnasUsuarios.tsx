//
//

import { Columns3Cog,  } from "lucide-react"

import { PanelLateral } from "../utilidades/PanelLateral"
import { TipoColumnasUsuario,  } from "../../types/filtros/filtrosUsuarios"

//COMPONENTE


type PropMostrarColumnas = {
    columnas : TipoColumnasUsuario
    onCambiar: (columna: keyof TipoColumnasUsuario) => void
}

export function MostrarColumnasUsuarios({columnas, onCambiar}:PropMostrarColumnas) {

    return(
        <PanelLateral 
            icono={Columns3Cog}
            texto="Columnas"
        >
            <div>
                <div className="flex accent-teal-600 items-center gap-2 mb-2">
                    <input className="hover:cursor-pointer size-5" type="checkbox" checked={columnas.correo} onChange={() => onCambiar("correo")} />
                    <h1>Correo</h1>
                </div>
                <div className="flex accent-teal-600 items-center gap-2 mb-2">
                    <input className="hover:cursor-pointer size-5"  type="checkbox" checked={columnas.telefono} onChange={() => onCambiar("telefono")} />  Teléfono
                </div>
                <div className="flex accent-teal-600 items-center gap-2 mb-2">
                    <input className="hover:cursor-pointer size-5"  type="checkbox" checked={columnas.cargo} onChange={() => onCambiar("cargo")} />  Cargo
                </div>
            </div>
        </PanelLateral>
    )
}