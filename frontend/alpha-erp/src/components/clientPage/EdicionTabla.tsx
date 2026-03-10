//Botones para eliminar y editar
//Reciben funcion vacia del padre para cada accion

import { Pencil, Trash2 } from "lucide-react"


//COMPONENTE

type PropEdicionTabla = {
    onEditar : () => void
    onEliminar : () => void
}

export function EdicionTabla ({onEditar, onEliminar}:PropEdicionTabla){
    return(
        <div className="w-28 flex gap-4 bg-gray-900 hover:bg-cyan-400 justify-center rounded-3xl transition-colors">
            <button 
                onClick={onEditar}
                title="Editar"
                className="p-2 flex gap-2 items-center hover:cursor-pointer  text-gray-100 hover:text-gray-950 transition-colors"
            >   
                <Pencil size={16} /> 
                Detalles
            </button>
            {/* <button 
                onClick={onEliminar}
                title="Eliminar"
                className="p-2 hover:text-red-400 hover:cursor-pointer hover:scale-110 text-gray-100 transition-colors"
            >
                <Trash2 size={16} />
            </button> */}
        </div>
    )
}