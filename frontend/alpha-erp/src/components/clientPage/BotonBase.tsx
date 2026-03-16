//Boton base, permite pasar una funcion vacía, un texto
//un ícono opcional de lucide react
//el color es opcional, por defecto está en azul
//solo permite colores ya creados aqui


import { LucideIcon } from "lucide-react"


//colores disponibles
type ColorVariante = 'blue' | 'green' | 'red' | 'teal'

const colores: Record<ColorVariante, string> = {
        blue: 'bg-blue-600 hover:bg-blue-700 disabled:hover:bg-blue-600',
        green: 'bg-green-600 hover:bg-green-700 disabled:hover:bg-green-600',
        red: 'bg-red-600 hover:bg-red-700 disabled:hover:bg-red-600',
        teal: 'bg-teal-600 hover:bg-teal-700 disabled:hover:bg-teal-600'
    }

//------

//COMPONENTE
type PropBotonBase = {
    onPresionar : () => void;
    texto : string;
    icono? : LucideIcon;    
    color? : ColorVariante;
    disable? : boolean
}

export function BotonBase ({
    onPresionar, 
    texto, 
    icono:Icono, 
    color = 'blue',
    disable = false
}:PropBotonBase){

    return(
        <button 
        onClick={onPresionar} 
        disabled = {disable}
        className={`flex items-center gap-2 ${colores[color]} disabled:opacity-65 disabled:hover:cursor-default hover:cursor-pointer text-white px-3 py-2 rounded font-medium transition-colors`}>
            {Icono ? <Icono size={20} /> : null}
            {texto}
        </button>
    )
}





