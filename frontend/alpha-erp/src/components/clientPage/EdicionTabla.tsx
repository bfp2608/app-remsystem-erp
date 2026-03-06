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
        <div className="flex gap-4 bg-gray-900 justify-center rounded-3xl">
            <button 
                onClick={onEditar}
                title="Editar"
                className="p-2 hover:text-blue-400 hover:cursor-pointer hover:scale-110  text-gray-100 transition-colors"
            >
                <Pencil size={16} />
            </button>
            <button 
                onClick={onEliminar}
                title="Eliminar"
                className="p-2 hover:text-red-400 hover:cursor-pointer hover:scale-110 text-gray-100 transition-colors"
            >
                <Trash2 size={16} />
            </button>
        </div>
    )
}