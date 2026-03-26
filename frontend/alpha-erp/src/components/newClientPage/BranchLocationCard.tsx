import { Map, MapPin, Plus } from "lucide-react"

interface BranchLocationCardProps {
    data:any
    onChange: (field:string, value:any) =>void
}

export const BranchLocationCard = ({ data, onChange }:BranchLocationCardProps) =>{

    const {
        branchName= '',
        streetAddress= '',
        distric= '',
        pronvince= '',
        state= '',
        country= 'PE'
    } = data || {}

    return(
        <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700 flex flex-col gap-6">

            <div className="flex items-center justify-between border-b shadow-lg border-slate-700 pb-3">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <MapPin className="text-teal-500 w-5 h-5" />
                    Ubicación de la Sucursal
                </h3>

                <button className="text-xs flex items-center gap-1 text-teal-400 hover:text-teal-300 font-semibold transition-colors">
                    <Plus className="h4 w-4"/>
                    Añadir Sucursal
                </button>
            </div>

            <div className="flex flex-col gap-5 mt-2">

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="branchName" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Sucursal
                    </label>
                    <input
                    id="branchName"
                    type="text"
                    value={branchName}
                    onChange={(e)=> onChange('branchName', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white text-lg px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="Jr. Puno 250, Lima"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="streetAddress" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Dirección
                    </label>
                    <div className="relative">
                        <input
                        id="streetAddress"
                        type="text"
                        value={streetAddress}
                        onChange={(e)=> onChange('streetAddress', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 text-white text-lg px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all pl-10"
                        placeholder="Calle, Número, etc."
                        />
                        <Map className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4"/>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="country" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            País
                        </label>
                        <select
                        name="country" 
                        id="country"
                        value={country}
                        onChange={(e) => onChange('country', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all appearance-none"
                        >
                            <option value="">Seleccionar</option>
                            <option value="PE">Perú</option>
                            <option value="CO">Colombia</option>
                            <option value="AR">Argentina</option>
                        </select>
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="state" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Departamento
                        </label>
                        <select
                        name="state" 
                        id="state"
                        value={state}
                        onChange={(e) => onChange('state', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all appearance-none"
                        >
                            <option value="">Seleccionar</option>
                            <option value="LMA">Lima</option>
                            <option value="ARQ">Arequipa</option>
                        </select>
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="pronvince" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Provincia
                        </label>
                        <select
                        name="pronvince" 
                        id="pronvince"
                        value={pronvince}
                        onChange={(e) => onChange('pronvince', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all appearance-none"
                        >
                            <option value="">Seleccionar</option>
                            <option value="LMA_P">Lima</option>
                            <option value="CLL">Callao</option>
                        </select>
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="distric" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Distrito
                        </label>
                        <select
                        name="distric" 
                        id="distric"
                        value={distric}
                        onChange={(e) => onChange('distric', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all appearance-none"
                        >
                            <option value="">Seleccionar</option>
                            <option value="MIRA">Miraflores</option>
                            <option value="SISI">San Isidro</option>
                        </select>

                    </div>

                </div>

            </div>

        </div>
    )
}