import BasicInformationCard from "../../components/newClientPage/BasicInformationCard"
import { OperationDetailsCard } from "../../components/newClientPage/OperationalDetailsCard"
import { BranchLocationCard } from "../../components/newClientPage/BranchLocationCard"
import { RelatedDataTabs } from "../../components/newClientPage/RelatedDataTabs"
import { useParams } from "react-router-dom"
import { useCustomerForm } from "../../hooks/useCustomerForm"

export const CustomerForm = () => {

    const { id } = useParams()

    const { formData, handleInputChange, handleSubmit } = useCustomerForm(id)

    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8 bg-gray-900 min-h-screen">

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

            <div className="flex justify-end gap-4 mt-4">
                <button type="button" className="text-gray-400">Cancelar</button>
                <button type="submit" className="bg-teal-500 text-white px-3 py-2 rounded-md" >Guardar</button>
            </div>
        </form>
    )
}