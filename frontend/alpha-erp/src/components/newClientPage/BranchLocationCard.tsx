import { Map, MapPin, Plus } from "lucide-react"
import { FormState } from "../../utils/mapFormToBackend"
import { useLocationStore } from "../../store/locationStore"
import { useEffect } from "react"

interface BranchLocationCardProps {
    data:FormState
    onChange: <K extends keyof FormState>(field: K, value: FormState[K]) =>void
}

export const BranchLocationCard = ({ data, onChange }:BranchLocationCardProps) =>{

    const { paises, departamentos, provincias, distritos, isLoading, fetchLocations } = useLocationStore()

    const isCompany = data.customerType === "COMPANY"

    useEffect(() =>{
        if(departamentos.length === 0){
            fetchLocations()
        }
    },[departamentos.length, fetchLocations])

    const {
        branchName= '',
        streetAddress= '',
        district= '',
        province= '',
        department= '',
        country= ''
    } = data || {}

    const currentCountryId = Number(country)
    const currentDeptId = department
    const currentProvId = province

    const departamentosFiltrados = departamentos.filter(d => d.id_pais === currentCountryId)
    const provinciasFiltradas = provincias.filter(p => p.id_departamento === currentDeptId)
    const distritosFiltrados = distritos.filter(d => d.id_provincia === currentProvId)

    const handleCountryChange = (val: string) =>{
        onChange('country', val)
        onChange('department', '')
        onChange('province', '')
        onChange('district', '')
    }

    const handleDepartmentChange = (val: string) =>{
        onChange('department', val)
        onChange('province', '')
        onChange('district', '')
    }

    const handleProvinceChange = (val: string) =>{
        onChange('province', val)
        onChange('district', '')
    }

    return(
        <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700 flex flex-col gap-6  h-full">

            <div className="flex items-center justify-between border-b shadow-lg border-slate-700 pb-3">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <MapPin className="text-teal-500 w-5 h-5" />
                    Ubicación de la Sucursal
                </h3>

                <button 
                type="button"
                className="text-xs flex items-center gap-1 text-teal-400 hover:text-teal-300 font-semibold transition-colors">
                    <Plus className="h4 w-4"/>
                    Añadir Sucursal
                </button>
            </div>

            <div className="flex flex-col gap-5 mt-2">
                {isCompany &&
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
                }
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
                        onChange= {(e) => handleCountryChange(e.target.value)}
                        disabled={isLoading}
                        className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all appearance-none"
                        >
                            <option value="">Seleccionar</option>
                            {paises.map(p => <option key={p.id_pais} value={p.id_pais}>{p.nombre}</option>)}
                        </select>
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="department" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Departamento
                        </label>
                        <select
                        name="department" 
                        id="department"
                        value={department}
                        disabled={!country || isLoading}
                        onChange={(e) => handleDepartmentChange(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all appearance-none"
                        >
                            <option value="">Seleccionar</option>
                            {departamentosFiltrados.map(d => <option key={d.id_departamento} value={d.id_departamento}>{d.departamento}</option>)}
                        </select>
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="province" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Provincia
                        </label>
                        <select
                        name="province" 
                        id="province"
                        value={province}
                        disabled={!department || isLoading}
                        onChange={(e) => handleProvinceChange(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all appearance-none"
                        >
                            <option value="">Seleccionar</option>
                            {provinciasFiltradas.map(p => <option key={p.id_provincia} value={p.id_provincia}>{p.provincia}</option>)}
                        </select>
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="district" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Distrito
                        </label>
                        <select
                        name="district" 
                        id="district"
                        value={district}
                        disabled={!province || isLoading}
                        onChange={(e) => onChange('district', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all appearance-none"
                        >
                            <option value="">Seleccionar</option>
                            {distritosFiltrados.map(d => <option key={d.id_distrito} value={d.id_distrito}>{d.distrito}</option>)}
                        </select>

                    </div>

                </div>

            </div>

        </div>
    )
}