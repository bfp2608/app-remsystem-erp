import { Activity, CalendarDays, Globe } from "lucide-react"
import { FormState } from "../../utils/mapFormToBackend"
import Select from "react-select"
import { customStyles } from "../../utils/customStyleSelect"
import { useSelectOptions } from "../../hooks/useSelectOptions"
import { useAuth } from "../../auth/useAuth"
import { ROLE_TYPES } from "../../constans"

interface OperationDetailsCardProps {
    data:FormState,
    onChange: <K extends keyof FormState>(field: K, value: FormState[K]) => void
}

type SelectOption = { value: string | number, label: string}

export const OperationDetailsCard = ({ data, onChange }: OperationDetailsCardProps) =>{

    const { companyOptions, ciiuOptions } = useSelectOptions()
    const { user } = useAuth()

    const isAdmin = user?.tipoUsuario === ROLE_TYPES.admin

    const {
        companyId= '',
        jobTitle = '',
        activityStartDate = '',
        webSiteUrl = '',
        taxCondition = 'habido',
        economicActivities = '',
    } = data || {}

    const isCompany = data.customerType === "COMPANY"

    const selectedCompany = companyOptions.find(opt => opt.value === companyId) || null

    const handleCompanyChange = (selected: SelectOption | null) =>{
        const newValue = selected ? Number(selected.value) : undefined as any
        onChange('companyId', newValue)
    }

    const currentCiiuCode = economicActivities ? economicActivities.split('|')[0] : ''
    const selectedCiiu = ciiuOptions.find(opt => opt.value === currentCiiuCode) || null

    const handleCiiuChange = (selected: SelectOption | null) =>{
        if(selected){
            const code = String(selected.value)
            const description = selected.label.split(' - ')[1] || ''

            onChange('economicActivities', `${code}|${description}`)
        }else{
            onChange('economicActivities', '')
        }
    }

    return(
        <div className=" bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700 flex flex-col gap-6">
            <div className="border-b border-b-slate-700 pb-3">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Activity className="text-teal-500 w-5 h-5" />
                    Detalles Operativos
                </h3>
            </div>

            <div className="flex flex-col gap-5 mt-2">

                {!isCompany && 
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="companyName" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Empresa
                        </label>
                        <Select 
                            options={companyOptions}
                            styles={customStyles}
                            placeholder="Buscar empresa..."
                            noOptionsMessage={() => "No se encontraron empresas"}
                            isClearable
                            isDisabled={!isAdmin}
                            value={selectedCompany}
                            onChange={handleCompanyChange}
                        />
                    </div>
                }

                {isCompany ? 
                    <>
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
                    </>
                :
                <>
                    <div className="flex flex-col gap-1.5">
                            <label htmlFor="jobTitle" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Puesto de trabajo
                            </label>
                            <input 
                            id="jobTitle"
                            type="text"
                            value={jobTitle}
                            onChange={(e) => onChange('jobTitle', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 text-white text-lg px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            placeholder="Ej: Director de ventas"
                            />
                    </div>
                </>
                }

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="economicActivities" className="text-xs font-semibold text-slate-400 uppercase tracking-wider" >
                        {isCompany ? "Actividades Económicas" : "Etiquetas"}
                    </label>
                    <Select
                        options={ciiuOptions}
                        styles={customStyles}
                        placeholder="Buscar código CIIU..."
                        noOptionsMessage={() => "Actividad no encontrada"}
                        isClearable
                        isDisabled={!isAdmin}
                        value={selectedCiiu}
                        onChange={handleCiiuChange}
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="webSiteUrl" className="text-xs font-semibold text-slate-400 uppercase tracking-wider" >
                        Sitio Web
                    </label>
                    <div className="relative">
                        <input
                        id="webSiteUrl" 
                        type="text" 
                        value={webSiteUrl}
                        onChange={(e) => onChange('webSiteUrl', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all pl-10 custom-date-input"
                        placeholder="www.acme.com.pe"
                        />
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4"/> 
                    </div>
                </div>

                {isCompany &&
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
                            <option value="por-verificar">POR VERIFICAR</option>
                            <option value="suspendido">SUSPENDIDO</option>
                        </select>
                    </div>
                }
            </div>
        </div>
    )
}