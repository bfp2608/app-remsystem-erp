import { ListFilter } from "lucide-react"
import { useState } from "react"

export function FiltroTabla() {

    
    return(
        <div>
            <button 
                onClick={()=>{}}
                title="Filtrar"
                className="px-3 py-2 flex gap-2 bg-transparent hover:bg-gray-900 border border-gray-500 rounded items-center hover:cursor-pointer  text-gray-100 transition-colors"
            >   
                <ListFilter size={16} /> 
                Filtrar
            </button>
        </div>
    )
}