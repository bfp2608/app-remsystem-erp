import BasicInformationCard from "../../components/newClientPage/BasicInformationCard"
import { OperationDetailsCard } from "../../components/newClientPage/OperationalDetailsCard"
import { BranchLocationCard } from "../../components/newClientPage/BranchLocationCard"
import { RelatedDataTabs } from "../../components/newClientPage/RelatedDataTabs"
import { useNavigate, useParams } from "react-router-dom"
import { useCustomerForm } from "../../hooks/useCustomerForm"
import { ROLE_TYPES, RUTAS } from "../../constans"
import { useAuth } from "../../auth/useAuth"
import { Loader2 } from "lucide-react"

export const CustomerForm = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()

    const { formData, isSubmitting, handleInputChange, handleSubmit } = useCustomerForm(id)

    const isAdmin = user?.tipoUsuario === ROLE_TYPES.admin

    const handleClickNavigateClients = () => {
        navigate(RUTAS.CLIENTES)
    }

    return(
        
        <form onSubmit={handleSubmit} className="flex flex-col justify-between bg-slate-900 min-h-screen p-8">
            
            <div className="flex flex-col gap-6">
                
                <fieldset disabled={!isAdmin} className="flex flex-col gap-6 group">

                    <BasicInformationCard data={formData} onChange={handleInputChange} />

                    <div className="flex gap-6">
                        <div className="w-1/2">
                            <BranchLocationCard data={formData} onChange={handleInputChange} />
                        </div>
                        <div className="w-1/2">
                            <OperationDetailsCard data={formData} onChange={handleInputChange} />
                        </div>
                    </div>

                    <RelatedDataTabs data={formData} onContactAdd={() => console.log('Abrir modal')} />

                </fieldset>
            </div>

            <div className="flex justify-end gap-3 mt-4 pt-3 border-t border-slate-700">
                <button 
                    type="button"
                    className={`text-slate-300 font-medium px-4 py-2 rounded-lg cursor-pointer hover:bg-slate-800 
                        ${isAdmin 
                            ? 'hover:text-white transition-colors duration-300' 
                            : 'bg-teal-500 text-white cursor-pointer hover:bg-teal-400 hover:shadow-teal-500/25 active:scale-95'} `}
                    onClick={handleClickNavigateClients}
                    disabled={isSubmitting}
                >
                    {isAdmin ? 'Cancelar' : 'Volver'}
                </button>

                {isAdmin && (
                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className={`flex justify-center items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg
                        ${isSubmitting
                            ? 'bg-teal-600/50 cursor-not-allowed text-white/70 shadow-none'
                            : 'bg-teal-500 text-white cursor-pointer hover:bg-teal-400 hover:shadow-teal-500/25 active:scale-95'
                        }`}
                    >
                        {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" /> }
                        {isSubmitting ? 'Guardando...' : 'Guardar Cliente'}
                    </button>
                )}
            </div>
        </form>
    )
}