//Panel lateral
import { SquareX } from "lucide-react"
import { useState, useRef, useEffect, ReactNode } from "react"

//COMPONENTE
type PropPanelLateral = {
    icono : React.ElementType
    texto : string
    cabecera? : ReactNode
    children : ReactNode
}

export function PanelLateral({ icono: Icon, texto, cabecera, children }:PropPanelLateral) {

    const [mostrarPanel, estadoPanel] = useState(false)

    const abrir = () => {
        estadoPanel(true)
    }

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                estadoPanel(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    return(
        <div ref={ref}>
            <button 
                onClick={abrir}
                title={texto}
                className="px-3 py-2 flex gap-2 bg-transparent hover:bg-gray-900 border border-gray-500 rounded items-center hover:cursor-pointer  text-gray-100 transition-colors"
            >   
                <Icon size={16}/>
                {texto}
            </button>

            {
                mostrarPanel && 
                <div className="flex flex-col p-6 h-full w-80 bg-gray-900 absolute right-0 top-0 z-20 shadow-gray-600 shadow-xl">
                    {/*Cabecera */}
                    <div className="mb-6 pb-3 border-b border-gray-600 shrink-0">
                        <div className="flex justify-between mb-3">
                            <h1 className="font-bold text-2xl">{texto}</h1>
                            <button className="hover:cursor-pointer text-gray-100 hover:text-red-300 transition-colors" onClick={()=>estadoPanel(!mostrarPanel)}>
                                <SquareX size={36}/>
                            </button>
                        </div>
                        {cabecera}
                    </div>
                    {/*Contenido*/}
                    <div className="overflow-y-auto flex-1">
                        {children}
                    </div>
                </div>
            }
        </div>
    )
}