import { Briefcase, Phone, PlusCircle } from "lucide-react"
import { useState } from "react"

interface RelatedDataTabsProps {
    data: any
    onContactAdd?: () => void
}

export const RelatedDataTabs = ({ data, onContactAdd }:RelatedDataTabsProps) =>{

    const [activeTab, setActiveTab] = useState('contacts')

    const tabs = [
        { id: 'contacts', label: 'Contactos'},
        { id: 'sales', label: 'Ventas y Compras'},
        { id: 'partners', label: 'Asignación de Socios'},
        { id: 'notes', label: 'Notas'}
    ]

    return(
        <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 flex flex-col overflow-hidden mt-2">

            <div className="flex border-b border-b-slate-700 bg-slate-900/50 px-4">
                {tabs.map((tab) =>{
                    const currentTab = activeTab === tab.id
                    return(
                    <button
                    type="button"
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 text-sm font-semibold transition-all relative
                    ${currentTab 
                        ? 'text-teal-400'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
                    >
                        {tab.label}
                        {currentTab && (
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-500 rounded-t-md"></span>
                        )}
                    </button>
                    )
                })}
            </div>
            
            <div className="p-6 min-h-[250px]">

                {activeTab === 'contacts' && (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                        <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 flex gap-4 hover:border-slate-600 transition-colors">
                            <div className="w-16 h-16 bg-fuchsia-600 rounded-md flex items-center justify-center text-white text-3xl font-light shrink-0">
                                C
                            </div>

                            <div className="flex flex-col overflow-hidden">
                                <h4 className="text-white font-bold text-sm truncate">
                                    CHRISTY ANGELA RODRIGUEZ
                                </h4>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-3.5 h-3.5"/>
                                    <span>+51 958632589</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-500 font-semibold mt-1">
                                    <Briefcase className="w-3.5 h-3.5" />
                                    <span>DIRECTOR</span>
                                </div>
                            </div>

                        </div>

                        <button
                        type="button"
                        onClick={onContactAdd}
                        className="bg-slate-800/50 border-2 border-dashed border-slate-600 rounded-lg p-4 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-teal-400 hover:border-teal-500 hover:bg-slate-800 transition-all min-h-[140px] group"
                        >
                            <PlusCircle className="w-8 h-8 text-slate-500 group-hover:text-teal-400 transition-colors"/>
                            <span className="font-semibold text-sm">Nuevo contacto</span>
                        </button>

                    </div>

                )}

                { activeTab === 'sales' && (

                    <div className="flex items-center justify-center h-full text-slate-500 text-sm py-10">
                        Historial de ventas y compras
                    </div>
                    
                )}

                { activeTab === 'partners' && (

                    <div className="flex items-center justify-center h-full text-slate-500 text-sm py-10">
                        Asignación de socios
                    </div>

                )}

                { activeTab === 'notes' && (

                    <div className="flex items-center justify-center h-full text-slate-500 text-sm py-10">
                        Notas internas
                    </div>

                )}
                
            </div>

        </div>
    )
}