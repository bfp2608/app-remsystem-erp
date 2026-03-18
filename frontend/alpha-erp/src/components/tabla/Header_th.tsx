

import {ArrowDownZA, ArrowUpAZ, ArrowDown10, ArrowUp01} from 'lucide-react'

const iconosTexto = {
    up : <ArrowUpAZ  size={22}/>,
    down : <ArrowDownZA  size={22}/>
}

const iconosNumero = {
    up : <ArrowUp01  size={22}/>,
    down : <ArrowDown10  size={22}/>
}


type PropHeader_th = {
    texto : string
    tipo? : "texto" | "numero" | null
    onOrdenar?: (orden: "up" | "down") => void
    estaActivo?: boolean
    direccionActual?: "up" | "down"
}

export function Header_th({texto, tipo=null, onOrdenar, estaActivo, direccionActual }:PropHeader_th){

    const iconos = tipo === "texto" ? iconosTexto : iconosNumero

    return(
        <th className="text-left px-6 py-3 text-gray-300 font-semibold text-sm uppercase tracking-wider">
            <div className='flex items-center justify-between'>
                {texto}
            {
                tipo != null && 
                <button 
                onClick={() => {
                    if(!estaActivo){
                        onOrdenar?.("up")
                    }else{
                        const nuevo = direccionActual === "up" ? "down" : "up"
                    onOrdenar?.(nuevo)
                    }
                }} 
                className={`ml-3 hover:cursor-pointer ${estaActivo ? "bg-gray-800" : "text-gray-400"} hover:bg-gray-800 p-2 border-transparent rounded-sm`}>
                    {estaActivo ? iconos[direccionActual ?? "up"] : iconos["up"]}
                </button>
            }
            </div>
        </th>
    )
}