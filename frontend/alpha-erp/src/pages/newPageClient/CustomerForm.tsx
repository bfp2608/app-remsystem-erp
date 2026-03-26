import { useState } from "react"
import BasicInformationCard from "../../components/newClientPage/BasicInformationCard"
import { OperationDetailsCard } from "../../components/newClientPage/OperationalDetailsCard"
import { BranchLocationCard } from "../../components/newClientPage/BranchLocationCard"
import { RelatedDataTabs } from "../../components/newClientPage/RelatedDataTabs"

export const CustomerForm = () => {

    const [formData, setFormData] = useState({
        entityType: 'company',
        commercialName: '',
        taxId: '',
        emailAddress: '',
        phoneNumber: ''
    })

    const handleInputChange = (field, value) =>{
        setFormData((prevData) =>({
            ...prevData,
            [field] : value
        }))
    }

    return(
        <form onSubmit={() =>{}} className="flex flex-col gap-6 p-8 bg-gray-900 min-h-screen">

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