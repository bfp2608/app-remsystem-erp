import { Activity, Briefcase, CalendarDays, Globe } from "lucide-react"
import { FormState } from "../../utils/mapFormToBackend"

interface OperationDetailsCardProps {
    data:FormState,
    onChange: <K extends keyof FormState>(field: K, value: FormState[K]) => void
}

export const OperationDetailsCard = ({ data, onChange }: OperationDetailsCardProps) =>{

    const {
        activityStartDate = '',
        websiteUrl = '',
        taxCondition = 'habido',
        economicActivities = ''
    } = data || {}

    return(
        <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700 flex-col gap-6 h-full">
            <div className="border-b border-b-slate-700 pb-3">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Activity className="text-teal-500 w-5 h-5" />
                    Detalles Operativos
                </h3>
            </div>

            <div className="flex flex-col gap-5 mt-2">

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="activityStartDate" className="text-xs font-semibold text-slate-400 uppercase tracking-wider" >
                        Fecha de Inicio de Actividad
                    </label>
                    <div className="relative">
                        <input
                        id="activityStartDate" 
                        type="date" 
                        value={activityStartDate}
                        onChange={(e) => onChange('activityStartDate', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all pl-10 custom-date-input"
                        />
                        <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4"/> 
                    </div>
                </div>
                
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="websiteUrl" className="text-xs font-semibold text-slate-400 uppercase tracking-wider" >
                        Sitio Web
                    </label>
                    <div className="relative">
                        <input
                        id="websiteUrl" 
                        type="url" 
                        value={websiteUrl}
                        onChange={(e) => onChange('websiteUrl', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all pl-10 custom-date-input"
                        placeholder="www.acme.com.pe"
                        />
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4"/> 
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="economicActivities" className="text-xs font-semibold text-slate-400 uppercase tracking-wider" >
                        Actividades Económicas
                    </label>
                    <div className="relative flex items-center bg-slate-900 border-slate-700 rounded-lg px-2 py-1.5 focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-transparent transition-all">
                        <Briefcase className="text-slate-500 w-4 h-4 ml-1 mr-2"/>
                        
                        <div className="bg-teal-900/50 text-teal-400 border border-teal-700/50 text-xs px-2 py-1 rounded-md flex items-center gap-3 mr-2">
                            <span>8510 / ENSEÑANZA PREESCOLAR...</span>
                            <button type="button" className="hover:text-teal-200">×</button>
                        </div>

                        <input
                        id="economicActivities" 
                        type="text" 
                        value={economicActivities}
                        onChange={(e) => onChange('economicActivities', e.target.value)}
                        className="flex-1 bg-transparent text-white focus:outline-none py-1 text-sm"
                        placeholder="Añadir actividad..."
                        /> 
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="taxCondition" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Condición
                    </label>
                    <select 
                    name="taxCondition" 
                    id="taxCondition"
                    value={taxCondition}
                    onChange={(e) => onChange('taxCondition', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring focus:ring-teal-500 focus:border-transparent transition-all appearance-none"
                    >
                        <option value="habido">HABIDO</option>
                        <option value="no-habido">NO HABIDO</option>
                        <option value="suspendido">SUSPENDIDO</option>
                    </select>
                </div>

            </div>
        </div>
    )
}