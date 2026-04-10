import {ArrowDownZA, ArrowUpAZ, ArrowDown10, ArrowUp01} from 'lucide-react'

const iconostext = {
    up : <ArrowUpAZ  size={22}/>,
    down : <ArrowDownZA  size={22}/>
}

const iconosNumero = {
    up : <ArrowUp01  size={22}/>,
    down : <ArrowDown10  size={22}/>
}


type PropHeader_th = {
    text : string
    type? : "text" | "numero" | null
    onSort?: (orden: "up" | "down") => void
    isActive?: boolean
    currentDirection?: "up" | "down"
}

export function Header_th({text, type = null, onSort, isActive, currentDirection }:PropHeader_th){

    const iconos = type === "text" ? iconostext : iconosNumero

    return(
        <th className="text-left px-6 py-3 text-gray-300 font-semibold text-sm uppercase tracking-wider">
            <div className='flex items-center justify-between'>
                {text}
            {
                type != null && 
                <button 
                onClick={() => {
                    if(!isActive){
                        onSort?.("up")
                    }else{
                        const nuevo = currentDirection === "up" ? "down" : "up"
                    onSort?.(nuevo)
                    }
                }} 
                className={`ml-3 hover:cursor-pointer ${isActive ? "bg-gray-800" : "text-gray-400"} hover:bg-gray-800 p-2 border-transparent rounded-sm`}>
                    {isActive ? iconos[currentDirection ?? "up"] : iconos["up"]}
                </button>
            }
            </div>
        </th>
    )
}