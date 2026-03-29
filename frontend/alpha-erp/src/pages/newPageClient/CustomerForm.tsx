import { FormEvent, useEffect, useState } from "react"
import BasicInformationCard from "../../components/newClientPage/BasicInformationCard"
import { OperationDetailsCard } from "../../components/newClientPage/OperationalDetailsCard"
import { BranchLocationCard } from "../../components/newClientPage/BranchLocationCard"
import { RelatedDataTabs } from "../../components/newClientPage/RelatedDataTabs"
import { mapFormToBackend } from "../../utils/mapFormToBackend"
import type { FormState } from "../../utils/mapFormToBackend"
import { useParams } from "react-router-dom"
import { useClientsStore } from "../../store/clientStore"
import { normalizar } from "../../utils/normalizarClientes"
import { mapNormalizedToForm } from "../../utils/mapNormalizedToForm"

export const CustomerForm = () => {

    const { id } = useParams()

    const { clients, fetchClients, getClient } = useClientsStore()

    const [formData, setFormData] = useState<FormState>({
        customerType: 'COMPANY',
        businessName: '',
        commercialName: '',
        fullName: '',
        taxId: '',
        emailAddress: '',
        phoneNumber: '',
        websiteUrl: '',
        taxCondition: '',
        economicActivities: ''
    })

    useEffect(() =>{
        if(clients.length === 0){
            fetchClients()
        }
    },[clients.length, fetchClients])

    useEffect(()=>{

        const fillFormWithClientData = async () =>{
            if(id && clients.length > 0){
                const rawClients = getClient(id)
    
                if(rawClients){
                    const normalizedArray = normalizar([rawClients])
                    const normalizedClient = normalizedArray[0]
    
                    const englishFormData = mapNormalizedToForm(normalizedClient)
    
                    setFormData(prev =>({
                        ... prev,
                        ... englishFormData
                    }))
                }
            }
        }

        fillFormWithClientData()

    },[id, clients, getClient])

    const handleInputChange = <K extends keyof FormState>(field: K, value: FormState[K]) =>{
        setFormData((prevData) =>({
            ...prevData,
            [field] : value
        }))
    }

    const handleSubmit = (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        if(formData.customerType === 'COMPANY'){
            if(!formData.businessName || !formData.taxId){
                alert("Por favor, ingresa la Razón social y el RUC")
                return
            }
        }else{
            if(!formData.fullName || !formData.taxId){
                alert("Por favor, ingrese el Nombre Completo y el DNI")
                return
            }
        }

        const payloadToAPI = mapFormToBackend(formData)

        console.log("=========================")
        console.log("ESTADO DEL FORMULARIO (Frontend):", formData)
        console.log("DATOS LISTOS PARA ENVIAR (Backend):", payloadToAPI)
        console.log("=========================")
    }

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