import {Search} from 'lucide-react'
import { useState } from 'react'

//COMPONENTE

//Se recibe una función del padre que recibe texto
type PropCuadroBuscador = {
    buscar : (texto:string) => void
}

export function CuadroBuscador({buscar}:PropCuadroBuscador) {

    //Se guarda y actualiza el texto según el input
    const [texto, setTexto] = useState("")

    //Solo se envía cuando se presiona el botón buscar

    return (
        <div className='flex items-center w-80 h-10 rounded-r-xl rounded-l-xs bg-gray-800 border border-gray-700 overflow-hidden'>
            <input
                type="text" 
                placeholder="Buscar..."
                value={texto}
                onChange={(e)=>setTexto(e.target.value)}
                className="flex-1 h-full px-4 text-white placeholder-gray-400 focus:outline-none border border-gray-800 focus:border-cyan-500 transition-colors"
            />

            <button 
            onClick={()=>buscar(texto)}
            className='px-4 h-full text-gray-300 bg-gray-900 hover:bg-gray-950 border-gray-800 hover:cursor-pointer transition-colors'>
                <Search size={20}/>
            </button>
        </div>
    )
}