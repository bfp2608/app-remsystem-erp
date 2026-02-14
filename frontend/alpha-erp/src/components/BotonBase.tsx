import { LucideIcon } from "lucide-react"


type ColorVariante = 'blue' | 'green' | 'red' | 'teal'

const colores: Record<ColorVariante, string> = {
        blue: 'bg-blue-600 hover:bg-blue-700',
        green: 'bg-green-600 hover:bg-green-700',
        red: 'bg-red-600 hover:bg-red-700',
        teal: 'bg-teal-600 hover:bg-teal-700'
    }

type PropBotonBase = {
    onPresionar : () => void;
    texto : string;
    icono? : LucideIcon;    
    color? : ColorVariante
}

export function BotonBase ({
    onPresionar, 
    texto, 
    icono:Icono, 
    color = 'blue'
}:PropBotonBase){

    return(
        <button 
        onClick={onPresionar} 
        className={`flex items-center gap-2 ${colores[color]} hover:cursor-pointer text-gray-200 px-3 py-2 rounded font-medium transition-colors`}>
            {Icono ? <Icono size={20} /> : null}
            {texto}
        </button>
    )
}





