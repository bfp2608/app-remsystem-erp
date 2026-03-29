import { Building2, User } from "lucide-react"
import { FormState } from "../../utils/mapFormToBackend"

interface BasicInformationCardProps {
    data: FormState
    onChange: <K extends keyof FormState>(field: K, value: FormState[K]) => void
}

export const BasicInformationCard = ({data, onChange}: BasicInformationCardProps) =>{

    const { 
        businessName = '',
        commercialName = '',
        fullName = '',
        taxId = '' , 
        emailAddress = '' , 
        phoneNumber  = '' 
    } = data || {}

    const isCompany = data?.customerType === 'COMPANY'

    return(
        <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700 flex flex-col gap-6 h-full">

            <div className="flex items-center justify-between">
                
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow-md">
                    { isCompany ? <Building2 /> : <User /> }
                </div>
                
                <div className="bg-slate-900 p-1 rounded-lg inline-flex shadow-inner">
                    <button
                        type="button"
                        className={`px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 
                            ${!isCompany 
                            ? 'bg-teal-500 text-white shadow' 
                            : 'text-slate-400 hover:text-slate-200'}`}
                        onClick={() => onChange('customerType', 'PERSON')}
                    >
                        Persona
                    </button>
                    <button
                        type="button"
                        className={`px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 
                            ${isCompany 
                            ? 'bg-teal-500 text-white shadow' 
                            : 'text-slate-400 hover:text-slate-200'}`}
                        onClick={() => onChange('customerType', 'COMPANY')}
                    >
                        Empresa
                    </button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                
                {isCompany ? (
                    <>
                        <div className="md:col-span-2 flex flex-col gap-1.5">
                            <label htmlFor="businessName" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Razón Social
                            </label>
                            <input 
                            id="businessName"
                            type="text"
                            value={businessName}
                            onChange={(e) => onChange('businessName', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 text-white text-lg px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            placeholder="Razón Social"
                            />
                        </div>
                        
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="commercialName" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Nombre Comercial
                            </label>
                            <input 
                            id="commercialName"
                            type="text"
                            value={commercialName}
                            onChange={(e) => onChange('commercialName', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 text-white text-lg px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            placeholder="Nombre Comercial"
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="fullName" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Nombre y Apellidos
                        </label>
                        <input 
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => onChange('fullName', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 text-white text-lg px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        placeholder="Juan Pérez Robles"
                        />
                    </div>
                )}
                
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="taxId" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        RUC
                    </label>
                    <input 
                    id="taxId"
                    type="text"
                    value={taxId}
                    onChange={(e) =>onChange('taxId', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="20123456789"
                     />
                </div>
                
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="emailAddress" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Correo Electrónico
                    </label>
                    <input 
                    id="emailAddress"
                    type="email"
                    value={emailAddress}
                    onChange={(e) =>onChange('emailAddress', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="contacto@empresa.com"
                     />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="phoneNumber" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Teléfono
                    </label>
                    <input 
                    id="phoneNumber"
                    type="text"
                    value={phoneNumber}
                    onChange={(e) =>onChange('phoneNumber', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="Teléfono"
                     />
                </div>

            </div>
        </div>
    )
}

export default BasicInformationCard